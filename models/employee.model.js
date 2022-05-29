const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    employeeNumber: {
      type: Number,
      required: true,
      unique: true
    },
    lastName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    extension: {
      type: String
    },
    email: {
      type: String
    },
    officeCode: {
      type: String,
      required: true
    },
    reportsTo: {
      type: Number
    },
    jobTitle: {
      type: String
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

//* Create a schema virtual for the employee number
//* this virtual references to salesRepEmployeeNumber of Customer model through employeeNumber
employeeSchema.virtual('HaveCustomers', {
  ref: 'Customer',
  localField: 'employeeNumber',
  foreignField: 'salesRepEmployeeNumber' //* like foreign key in SQL
});

module.exports = mongoose.model('Employee', employeeSchema);
