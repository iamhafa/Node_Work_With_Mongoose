const employeeRoutes = require('express').Router();

const ValidateEmployee = require('../validations/validate.employee');

const EmployeeController = require('../controllers/employee.controller');

// validate field in body before call controller
employeeRoutes.post('/', ValidateEmployee.POST, EmployeeController.createEmployee);

employeeRoutes.get('/:id', EmployeeController.findEmployee);

employeeRoutes.get('/', EmployeeController.findAllEmployee);

// validate field in body before call controller
employeeRoutes.put('/:id', ValidateEmployee.PUT, EmployeeController.updateEmployee);

employeeRoutes.delete('/:id', EmployeeController.deleteEmployee);

module.exports = employeeRoutes;
