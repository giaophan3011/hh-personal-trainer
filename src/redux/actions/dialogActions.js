export const displayAddCustomerDialog = () => {
    return { type: "DIALOG_ADD_CUSTOMER",          
         };
  };


  
export const displayAddTrainingDialog = (customer) => {
    return { type: "DIALOG_ADD_TRAINING",  
    data: customer      
         };
  };

export const displayConfirmDialog = ()=>{
    return { type: "DIALOG_CONFIRM"
         };
  };

export const closeDialog = ()=>{
    return { type: "DIALOG_CLOSE"
         };
  };
