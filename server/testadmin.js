require('dotenv').config();
const mongoose = require('mongoose');
require('./models');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const Admin = mongoose.model('Admin');

  await Admin.create({
    name: 'Sai Samslesh',
    email: '24kb1a0517@nbkrist.org',
    password: 'SAI_$@! 18'
  });

  console.log('Admin created');
  process.exit(0);
});