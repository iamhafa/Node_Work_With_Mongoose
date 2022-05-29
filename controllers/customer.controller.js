const Customer = require('../models/customer.model');

class CustomerController {
  async createCustomer(req, res, next) {
    try {
      const checkExitCustomer = await Customer.findOne({
        customerNumber: req.body.customerNumber
      });

      // Check if customer exist
      if (typeof checkExitCustomer === 'object' && checkExitCustomer !== null) {
        res.status(400).json({
          status: 'failed',
          message: 'Customer number already exists'
        });
      } else {
        const customer = await Customer.create({
          customerNumber: req.body.customerNumber,
          customerName: req.body.customerName,
          contactLastName: req.body.contactLastName,
          contactFirstName: req.body.contactFirstName,
          phone: req.body.phone,
          addressLine1: req.body.addressLine1,
          addressLine2: req.body.addressLine2,
          city: req.body.city,
          state: req.body.state,
          postalCode: req.body.postalCode,
          country: req.body.country,
          salesRepEmployeeNumber: req.body.salesRepEmployeeNumber,
          creditLimit: req.body.creditLimit
        });

        res.status(201).json({
          status: 'success',
          data: customer
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async findCustomer(req, res, next) {
    try {
      // Check if customer exist
      //* populate to get all data of employee who manages this customer
      const findCustomer = await Customer.findOne({
        customerNumber: req.params.id
      }).populate({path: 'isCustomerOf'});

      if (typeof findCustomer === 'object' && findCustomer !== null) {
        res.status(200).json({
          status: 'success',
          data: findCustomer
        });
      } else {
        res.status(400).json({
          status: 'failed',
          message: 'Customer not found'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getAllCustomers(req, res, next) {
    try {
      // get all customers
      //* populate to get all data of employee who manages this customer
      const getAllCustomers = await Customer.find().populate({
        path: 'isCustomerOf'
      });

      if (Array.isArray(getAllCustomers) && getAllCustomers.length > 0) {
        res.status(200).json({
          status: 'success',
          data: getAllCustomers
        });
      } else {
        res.status(400).json({
          status: 'failed',
          message: 'Not have any customer'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async updateCustomer(req, res, next) {
    try {
      const checkExitCustomer = await Customer.findOne({
        customerNumber: req.params.id
      });

      if (typeof checkExitCustomer === 'object' && checkExitCustomer !== null) {
        const customer = await Customer.updateOne(
          {
            customerNumber: req.params.id
          },
          {
            customerName: req.body.customerName,
            contactLastName: req.body.contactLastName,
            contactFirstName: req.body.contactFirstName,
            phone: req.body.phone,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode,
            country: req.body.country,
            salesRepEmployeeNumber: req.body.salesRepEmployeeNumber,
            creditLimit: req.body.creditLimit
          }
        );
        res.status(200).json({
          status: 'success',
          data: customer
        });
      } else {
        res.status(400).json({
          status: 'failed',
          message: 'Customer not found'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      const checkExitCustomer = await Customer.findOne({
        customerNumber: req.params.id
      });

      if (typeof checkExitCustomer === 'object' && checkExitCustomer !== null) {
        const customer = await Customer.deleteOne({
          customerNumber: req.params.id
        });
        res.status(200).json({
          status: 'success',
          data: customer
        });
      } else {
        res.status(400).json({
          status: 'failed',
          message: 'Customer not found'
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CustomerController();
