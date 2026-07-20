require('dotenv').config();
const mongoose = require('mongoose');
require('./models');
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const Admin = mongoose.model('Admin');
  await Admin.deleteOne({ email: '24kb1a0517@nbkrist.org' });
  console.log('Stray admin deleted');
  process.exit(0);
});