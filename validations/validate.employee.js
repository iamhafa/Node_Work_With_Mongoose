const res = require('express/lib/response');
const Joi = require('joi');

// schema of employee with POST method
const schemaEmployeePOST = Joi.object({
  employeeNumber: Joi.number().positive().not(null).required(),
  lastName: Joi.string().min(3).max(50).not(null),
  firstName: Joi.string().min(3).max(50).required(),
  extension: Joi.string().max(50).not(null).required(),
  email: Joi.string().email().min(10).max(100).not(null).required(),
  officeCode: Joi.string().max(10).not(null).required(),
  reportsTo: Joi.number().positive().allow(null),
  //   jobTitle: Joi.any().valid('President', 'Manager').required(),
  jobTitle: Joi.required(),
  customers: Joi.array().items({
    customerNumber: Joi.number().positive().not(null).required(),
    customerName: Joi.string().min(3).max(50).required().not(null),
    contactLastName: Joi.string().min(3).max(50).required().not(null),
    contactFirstName: Joi.string().min(3).max(50).required().not(null),
    phone: Joi.string().min(8).max(20).required().not(null),
    addressLine1: Joi.string().min(10).max(50).required().not(null),
    addressLine2: Joi.string().min(10).max(50).optional().allow(null),
    city: Joi.string().min(2).max(50).required().not(null),
    state: Joi.string().min(2).max(50).optional().allow(null),
    postalCode: Joi.string().min(5).max(15).optional().allow(null),
    country: Joi.string().min(2).max(50).required().not(null),
    salesRepEmployeeNumber: Joi.number().positive().required().allow(null),
    creditLimit: Joi.number().precision(2).optional().allow(null)
  })
});

// schema of employee with PUT method
const schemaEmployeePUT = Joi.object({
  employeeNumber: Joi.any()
    .forbidden()
    .error((field) => {
      res.status(403);
      return new Error(`${field} to change`);
    }),
  lastName: Joi.any()
    .forbidden()
    .error((field) => {
      res.status(403);
      return new Error(`${field} to change`);
    }),
  firstName: Joi.any()
    .forbidden()
    .error((field) => {
      res.status(403);
      return new Error(`${field} to change`);
    }),
  extension: Joi.string().max(50).not(null),
  email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
    .min(10)
    .max(100)
    .not(null),
  officeCode: Joi.string().max(10).not(null),
  reportsTo: Joi.number().positive().allow(null),
  jobTitle: Joi.any().valid('President', 'Manager')
});

class ValidateEmployee {
  async POST(req, res, next) {
    try {
      await schemaEmployeePOST.validateAsync(req.body, {abortEarly: true});
      next();
    } catch (error) {
      res.status(400).json({message: error.message});
    }
  }

  async PUT(req, res, next) {
    try {
      await schemaEmployeePUT.validateAsync(req.body);
      next();
    } catch (error) {
      res.json({message: error.message});
    }
  }
}

module.exports = new ValidateEmployee();
