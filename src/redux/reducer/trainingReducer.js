const trainingReducer = (state = {
    trainings: []
}, action) => {
    switch (action.type) {
      case "GET_TRAININGS_ACTION":
        return {
            ...state,
            trainings: action.data
        };
        case "DELETE_TRAINING_ACTION":
          let newList = state.trainings.filter(t => t.id !== action.data.id )
         
          return {
              ...state,
              trainings: newList
          };
          case "ADD_TRAINING_ACTION":
            return {
                ...state,
                customers: state.trainings.concat([action.data])
            };
      default:
        return state
    }
  }
  export default trainingReducer;