require('dotenv').config();
const mongoose = require('mongoose');
require('./models');
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const Admin = mongoose.model('Admin');
  const count = await Admin.countDocuments();
  if (count > 0) {
    console.log(`Refusing — ${count} admin account(s) already exist. Delete them first if you really mean to replace.`);
    process.exit(1);
  }
  await Admin.create({ name: 'Your Name', email: 'admin@preyeah.dev', password: 'ChangeThisPassword123' });
  console.log('Admin created');
  process.exit(0);
});