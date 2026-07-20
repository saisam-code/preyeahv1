require('dotenv').config();
const mongoose = require('mongoose');
require('./models');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const Admin = mongoose.model('Admin');
  const admins = await Admin.find({}).select('+password');
  console.log(JSON.stringify(admins, null, 2));
  process.exit(0);
}).catch(err => {
  console.error('Connection failed:', err.message);
  process.exit(1);
});