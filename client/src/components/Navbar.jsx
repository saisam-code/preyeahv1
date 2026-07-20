import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaBars, FaXmark, FaHouse, FaBriefcase, FaCompass, FaCircleInfo,
  FaCircleUser, FaChevronDown, FaGauge, FaRightFromBracket,
} from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useBranch } from "../context/BranchContext";
import { setAccessToken } from "../services/api";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: FaHouse, exact: true },
  { to: "/roles", label: "Roles", icon: FaBriefcase, branchGated: true },
  { to: "/beyond", label: "Beyond", icon: FaCompass, branchGated: true },
  { to: "/about", label: "About", icon: FaCircleInfo },
];

function readAdminUser() {
  try {
    const raw = localStorage.getItem("pp_admin_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, logout } = useAuth();
  const { branch } = useBranch();
  const navigate = useNavigate();
  const location = useLocation();

  const [adminUser, setAdminUser] = useState(readAdminUser);

  useEffect(() => {
    const sync = () => setAdminUser(readAdminUser());
    window.addEventListener("admin-auth-changed", sync);
    return () => window.removeEventListener("admin-auth-changed", sync);
  }, []);

  const effectiveUser = user || adminUser;

  const linkTo = (item) => (item.branchGated && branch ? `${item.to}?branch=${branch}` : item.to);

  const handleSignOut = async () => {
    setMenuOpen(false);
    if (adminUser) {
      setAccessToken(null);
      localStorage.removeItem("pp_admin_user");
      setAdminUser(null);
      window.dispatchEvent(new Event("admin-auth-changed"));
    } else {
      await logout();
    }
    toast.success("Signed out");
    navigate("/");
  };

  const rawDashboardHref =
    effectiveUser?.role === "guide" ? "/guide" : effectiveUser?.role === "admin" ? "/admin" : null;
  const dashboardHref = rawDashboardHref && location.pathname !== rawDashboardHref ? rawDashboardHref : null;
  return (
    <>
      <nav>
        <NavLink to="/" className="nav-logo">Pre-<span>Yeah</span></NavLink>

        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={linkTo(item)}
              end={item.exact}
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-right">
          <ThemeToggle />

          {effectiveUser ? (
            <div className="user-dropdown-wrap visible" style={{ position: "relative" }}>
              <button className="user-chip-btn" onClick={() => setMenuOpen((o) => !o)}>
                <FaCircleUser />
                <span>
                  {effectiveUser.name?.split(" ")[0] || effectiveUser.email} ·{" "}
                  {effectiveUser.role[0].toUpperCase() + effectiveUser.role.slice(1)}
                </span>
                <FaChevronDown className="chip-caret" />
              </button>
              <div className={`user-dropdown-menu ${menuOpen ? "open" : ""}`}>
                {dashboardHref && (
                  <>
                    <NavLink to={dashboardHref} className="udm-item" onClick={() => setMenuOpen(false)}>
                      <FaGauge /> Dashboard
                    </NavLink>
                    <hr className="udm-divider" />
                  </>
                )}
                <button className="udm-item udm-danger" onClick={handleSignOut}>
                  <FaRightFromBracket /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button className="btn btn-outline btn-sm" onClick={() => setLoginOpen(true)}>Login</button>
          )}

          <button className="nav-hamburger" onClick={() => setDrawerOpen(true)}><FaBars /></button>
        </div>
      </nav>

      <div className={`nav-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="nav-drawer-backdrop" onClick={() => setDrawerOpen(false)} />
        <div className="nav-drawer-panel">
          <button className="nav-drawer-close" onClick={() => setDrawerOpen(false)}><FaXmark /></button>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={linkTo(item)}
              end={item.exact}
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <item.icon /> {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      <nav className="bottom-nav">
        <div className="bottom-nav-items">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={linkTo(item)}
              end={item.exact}
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
            >
              <item.icon />{item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}