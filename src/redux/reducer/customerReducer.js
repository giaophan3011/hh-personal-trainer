const customerReducer = (state = {
    customers: []
}, action) => {
    switch (action.type) {
      case "ADD_CUSTOMER_ACTION":
        return {
            ...state,
            customers: state.customers.concat([action.data])
        };
    case "GET_CUSTOMERS_ACTION":
        return {
            ...state,
            customers: action.data
        };
      case "UPDATE_EDITED_CUSTOMER_ACTION":
        let newCustomerList = state.customers.map(customer => customer.links.find(element => element.rel === "self").href === action.data.links.find(element => element.rel === "self").href ? action.data : customer )
        return {
            ...state,
            customers: newCustomerList
        };
        case "DELETE_CUSTOMER_ACTION":
            let newList = state.customers.filter(customer => customer.links.find(element => element.rel === "self").href !== action.data.links.find(element => element.rel === "self").href )
            return {
                ...state,
                customers: newList
            };
      default:
        return state
    }
  }
  export default customerReducer;