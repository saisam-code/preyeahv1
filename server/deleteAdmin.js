require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function deleteAdmins() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const result = await User.deleteMany({
      role: "admin"
    });

    console.log(result);

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

deleteAdmins();