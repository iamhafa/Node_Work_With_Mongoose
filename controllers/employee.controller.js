const Employee = require('../models/employee.model');

class EmployeeController {
  async createEmployee(req, res, next) {
    try {
      const checkExitEmployee = await Employee.findOne({
        employeeNumber: req.body.employeeNumber
      });

      // Check if employee exist
      if (typeof checkExitEmployee === 'object' && checkExitEmployee !== null) {
        res.status(400).json({
          status: 'failed',
          message: 'Employee number already exists'
        });
      } else {
        const employee = await Employee.create({
          employeeNumber: req.body.employeeNumber,
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          extension: req.body.extension,
          email: req.body.email,
          officeCode: req.body.officeCode,
          reportsTo: req.body.reportsTo,
          jobTitle: req.body.jobTitle
        });

        res.status(201).json({
          status: 'success',
          data: employee
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async findEmployee(req, res, next) {
    try {
      // Check if customer exist
      //* populate to get all data of employee who manages this customer
      const findEmployee = await Employee.findOne({
        employeeNumber: req.params.id
      }).populate({path: 'HaveCustomers'});

      if (typeof findEmployee === 'object' && findEmployee !== null) {
        res.status(200).json({
          status: 'success',
          data: findEmployee
        });
      } else {
        res.status(404).json({
          status: 'failed',
          message: 'Employee not found'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async findAllEmployee(req, res, next) {
    try {
      // get all employees
      //* populate to get all data of customer that have this employee
      const findAllEmployee = await Employee.find().populate({path: 'HaveCustomers'});

      if (Array.isArray(findAllEmployee) && findAllEmployee.length > 0) {
        res.status(200).json({
          status: 'success',
          data: findAllEmployee
        });
      } else {
        res.status(404).json({
          status: 'failed',
          message: 'Employee not found'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async updateEmployee(req, res, next) {
    try {
      const employee = await Employee.findOneAndUpdate(
        {
          employeeNumber: req.params.id
        },
        {
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          extension: req.body.extension,
          email: req.body.email,
          officeCode: req.body.officeCode,
          reportsTo: req.body.reportsTo,
          jobTitle: req.body.jobTitle
        },
        {
          //* Return updated employee instead of find before update
          new: true
        }
      );

      if (typeof employee === 'object' && employee !== null) {
        res.status(200).json({
          status: 'success',
          data: employee
        });
      } else {
        res.status(404).json({
          status: 'failed',
          message: 'Employee not found'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async deleteEmployee(req, res, next) {
    try {
      const employee = await Employee.findOneAndDelete(
        {
          employeeNumber: req.params.id
        },
        {new: true}
      );

      if (typeof employee === 'object' && employee !== null) {
        res.status(200).json({
          status: 'success',
          message: 'Employee deleted'
        });
      } else {
        res.status(404).json({
          status: 'failed',
          message: 'Employee not found'
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new EmployeeController();
