export const displaySuccessSnackbar = (message) => {
  return {
    type: "SNACKBAR_SUCCESS",
    data: {
      message: message,
    },
  };
};

export const displayErrorSnackbar = (message) => {
  return {
    type: "SNACKBAR_ERROR",
    data: {
      message: message,
    },
  };
};

export const closeSnackbar = () => {
  return { type: "SNACKBAR_CLOSE" };
};
