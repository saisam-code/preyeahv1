require('dotenv').config();
const mongoose = require('mongoose');
require('./models');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const Admin = mongoose.model('Admin');
  const newPassword = 'Preyeah@2026';
  const hashed = await bcrypt.hash(newPassword, 12);
  const result = await Admin.updateOne(
    { email: 'admin@preyeah.dev' },
    { password: hashed }
  );
  console.log('Matched:', result.matchedCount, 'Modified:', result.modifiedCount);
  console.log('New password is:', newPassword);
  process.exit(0);
});