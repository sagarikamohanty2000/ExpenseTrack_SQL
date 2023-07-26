const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const User = require('./model/Users');
const Expense = require('./model/expense');

const app = express();
const cors = require('cors');

const expenseTrackerRoutes = require('./routes/expenseTracker');

app.use(cors());
app.use(bodyParser.json({extended : false}));
app.use(expenseTrackerRoutes);

User.hasMany(Expense);
Expense.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});

sequelize.sync()
.then(result => {
app.listen(3000);
})
.catch(err => console.log(err));