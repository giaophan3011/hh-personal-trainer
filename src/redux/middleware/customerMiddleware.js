import { displayErrorSnackbar, displaySuccessSnackbar } from "../actions/snackBarActions";

const { getCustomers, editCustomer, deleteCustomer,addCustomer } = require("../../services/api");
const { getCustomersAction, updateCustomerAction, deleteCustomerAction, addCustomerAction } = require("../actions/customerActions");

export function getCustomersMiddleware() {
    return function(dispatch) {
      return getCustomers().then(
        (data) => dispatch(getCustomersAction(data.content))
      );
    };
  }

  export function addCustomerMiddleware(newCustomer) {
    return function(dispatch) {
      return addCustomer(newCustomer).then(
        (data) => {
            dispatch(addCustomerAction(data))
            dispatch(displaySuccessSnackbar("New customer added!"));
        }        
      ).catch(err => displayErrorSnackbar(err));
    };
  }

  export function editCustomerMiddleware(customer) {
    return function(dispatch) {
      return editCustomer(customer).then(
        (data) => {
            dispatch(updateCustomerAction(data))
            dispatch(displaySuccessSnackbar("Customer edited successfully!"));
        }        
      ).catch(err => displayErrorSnackbar(err));
    };
  }

  export function deleteCustomerMiddleware(customer) {
    return function(dispatch) {
      return deleteCustomer(customer).then(
        (data) => {
            dispatch(deleteCustomerAction(customer))
            dispatch(displaySuccessSnackbar("Customer deleted successfully!"));
        }        
      ).catch(err => displayErrorSnackbar(err));
    };
  }
