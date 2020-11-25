import { displayErrorSnackbar, displaySuccessSnackbar } from "../actions/snackBarActions";

const { getAllTrainings, deleteTrainingById, addNewTraining } = require("../../services/trainingApi");
const { getTrainingsAction, deleteTrainingAction, addTrainingAction } = require("../actions/trainingActions");

export function getTrainingsMiddleware() {
    return function(dispatch) {
      return getAllTrainings().then(
        (data) => dispatch(getTrainingsAction(data))
      );
    };
  }

  export function deleteTrainingMiddleware(training) {
    return function(dispatch) {
      return deleteTrainingById(training).then(
        (data) => {          
            dispatch(deleteTrainingAction(training))
            dispatch(displaySuccessSnackbar("Training deleted successfully!"));
        }        
      ).catch(err => displayErrorSnackbar(err));
    };
  }  

  export function addTrainingMiddleware(newTraining) {
    return function(dispatch) {
      return addNewTraining(newTraining).then(
        (data) => {
            dispatch(addTrainingAction(data))
            dispatch(displaySuccessSnackbar("New training added!"));
            //Reload list of trainings
            dispatch(getTrainingsMiddleware());
        }        
      ).catch(err => displayErrorSnackbar(err));
    };
  }


 