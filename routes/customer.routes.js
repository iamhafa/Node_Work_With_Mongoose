const customerRoutes = require('express').Router();

const ValidateCustomer = require('../validations/validate.customer');

const CustomerController = require('../controllers/customer.controller');

// validate field in body before call controller
customerRoutes.post('/', ValidateCustomer.POST, CustomerController.createCustomer);

customerRoutes.get('/', CustomerController.getAllCustomers);

customerRoutes.get('/:id', CustomerController.findCustomer);

// validate field in body before call controller
customerRoutes.put('/:id', ValidateCustomer.PUT, CustomerController.updateCustomer);

customerRoutes.delete('/:id', CustomerController.deleteCustomer);

module.exports = customerRoutes;
