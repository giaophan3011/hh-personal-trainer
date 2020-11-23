import {combineReducers} from 'redux'
import snackBarReducer from "./snackbarReducer"
import dialogReducer from "./dialogReducer"

  const rootReducer = combineReducers({
    snackBarReducer,
    dialogReducer
  })
  
  export default rootReducer