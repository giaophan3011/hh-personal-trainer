export const displayAddCustomerDialog = () => {
  return { type: "DIALOG_ADD_CUSTOMER" };
};

export const displayAddTrainingDialog = (customer) => {
  return { type: "DIALOG_ADD_TRAINING", data: customer };
};

export const displayConfirmDialog = (dialogTitle, dialogObject, callbackFunction) => {
  return {
    type: "DIALOG_CONFIRM",
    data: {
      dialogTitle: dialogTitle,
      dialogObject: dialogObject,
      callbackFunction: callbackFunction,
    },
  };
};

export const closeDialog = () => {
  return { type: "DIALOG_CLOSE" };
};
