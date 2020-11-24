import {combineReducers} from 'redux'
import snackBarReducer from "./snackbarReducer"
import dialogReducer from "./dialogReducer"
import customerReducer from "./customerReducer"

  const rootReducer = combineReducers({
    snackBarReducer,
    dialogReducer,
    customerReducer
  })
  
  export default rootReducer