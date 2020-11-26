const snackBarReducer = (
  state = {
    snackbarOpen: false,
    message: "",
    severity: "success",
  },
  action
) => {
  switch (action.type) {
    case "SNACKBAR_SUCCESS":
      return {
        ...state,
        snackbarOpen: true,
        message: action.data.message,
      };
    case "SNACKBAR_ERROR":
      return {
        ...state,
        snackbarOpen: true,
        message: action.data.message,
        severity: "error",
      };
    case "SNACKBAR_CLOSE":
      return {
        ...state,
        snackbarOpen: false,
      };
    default:
      return state;
  }
};
export default snackBarReducer;
