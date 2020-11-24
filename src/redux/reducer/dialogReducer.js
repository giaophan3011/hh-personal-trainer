const dialogReducer = (state = {
    dialogOpen: false,
    dialogType: "DIALOG_ADD_CUSTOMER",
    dialogData: null,
}, action) => {
    switch (action.type) {
      case "DIALOG_ADD_CUSTOMER":
        return {
            ...state,
            dialogOpen: true
        };
      case "DIALOG_ADD_TRAINING":
        return {
            ...state,
            dialogOpen: true,
            dialogType: "DIALOG_ADD_TRAINING",
            dialogData: action.data
        };
    case "DIALOG_CONFIRM":
        return {
            ...state,
            dialogOpen: true,
            dialogType: "DIALOG_CONFIRM",
            dialogData: action.data
         
        };
    case "DIALOG_CLOSE":
        return {
            ...state,
            dialogOpen: false         
        };
      default:
        return state
    }
  }
  export default dialogReducer;
