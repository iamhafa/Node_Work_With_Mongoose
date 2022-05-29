const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    customerNumber: {
      type: Number,
      required: true,
      unique: true
    },
    customerName: {
      type: String
    },
    contactLastName: {
      type: String
    },
    contactFirstName: {
      type: String
    },
    phone: {
      type: String
    },
    addressLine1: {
      type: String
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    postalCode: {
      type: String
    },
    country: {
      type: String
    },
    salesRepEmployeeNumber: {
      type: Number,
      required: true
    },
    creditLimit: {
      type: Number
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

//* Create a schema virtual for salesRepEmployeeNumber
//* this virtual references to employeeNumber of Employee model through salesRepEmployeeNumber
customerSchema.virtual('isCustomerOf', {
  ref: 'Employee',
  localField: 'salesRepEmployeeNumber',
  foreignField: 'employeeNumber'
});

module.exports = mongoose.model('Customer', customerSchema);
