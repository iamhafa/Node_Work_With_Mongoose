const express = require('express');
const connectDB = require('./config/connectDB');

const app = express();
const customerRoutes = require('./routes/customer.routes');
const employeeRoutes = require('./routes/employee.routes');
const catchError = require('./middlewares/catchError');

// built in middleware to accept json data
app.use(express.json());

// routers
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use(catchError);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`>>> Server is running at http://localhost:${process.env.PORT}`);
});
