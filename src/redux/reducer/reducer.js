import {combineReducers} from 'redux'
import snackBarReducer from "./snackbarReducer"
import dialogReducer from "./dialogReducer"
import customerReducer from "./customerReducer"
import trainingReducer from "./trainingReducer"

  const rootReducer = combineReducers({
    snackBarReducer,
    dialogReducer,
    customerReducer, 
    trainingReducer
  })
  
  export default rootReducer