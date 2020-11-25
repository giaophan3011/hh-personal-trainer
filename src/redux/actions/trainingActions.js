export const getTrainingsAction = (trainings) => {
    return { type: "GET_TRAININGS_ACTION",   
            data: trainings      
         };
  };


  export const deleteTrainingAction = (deletedTraining) => {
    return { type: "DELETE_TRAINING_ACTION",   
            data: deletedTraining      
         };
  };

  export const addTrainingAction = (newTraining) => {
        return { type: "ADD_TRAINING_ACTION",   
                data: newTraining       
             };
      };