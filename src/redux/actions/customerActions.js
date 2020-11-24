export const getCustomersAction = (customers) => {
    return { type: "GET_CUSTOMERS_ACTION",   
            data: customers       
         };
  };

  export const updateCustomerAction = (editedCustomer) => {
    return { type: "UPDATE_EDITED_CUSTOMER_ACTION",   
            data: editedCustomer       
         };
  };

  export const deleteCustomerAction = (deletedCustomer) => {
    return { type: "DELETE_CUSTOMER_ACTION",   
            data: deletedCustomer       
         };
  };

  export const addCustomerAction = (newCustomer) => {
    return { type: "ADD_CUSTOMER_ACTION",   
            data: newCustomer       
         };
  };