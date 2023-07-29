const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
require('dotenv').config();

const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const User = require('./model/Users');
const Expense = require('./model/expense');
const Order = require('./model/order');
const ForgetPwd = require('./model/forgetPassword');
const File = require('./model/fileData');

const app = express();


const expenseRoutes = require('./routes/expense');
const passwordRoutes = require('./routes/password');
const premiumRoutes = require('./routes/premium');
const purchaseRoutes = require('./routes/purchase');
const userRoutes = require('./routes/user');

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags: 'a'});
app.use(cors());
app.use(helmet());
app.use(morgan('combined',{stream: accessLogStream}));

app.use(bodyParser.json({extended : false}));
app.use(expenseRoutes);
app.use(passwordRoutes);
app.use(premiumRoutes);
app.use(purchaseRoutes);
app.use(userRoutes);

User.hasMany(Expense);
Expense.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});

User.hasMany(Order);
Order.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});

User.hasMany(ForgetPwd);
ForgetPwd.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});

User.hasMany(File);
File.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});

sequelize.sync()
.then(result => {
app.listen(3000);
})
.catch(err => console.log(err));