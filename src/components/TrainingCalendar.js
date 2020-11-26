import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getTrainingsMiddleware } from "../redux/middleware/trainingMiddleware";
import { useDispatch, useSelector } from "react-redux";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const TrainingCalendar = () => {
  const dispatch = useDispatch();
  const trainingsState = useSelector((state) => state.trainingReducer);

  const getTrainings = () => {
    dispatch(getTrainingsMiddleware());
  };

  const mapTrainingToEvent = () => {
    return trainingsState.trainings.map((training) => {
      return {
        title: training.activity,
        start: moment(training.date).toDate(),
        end: moment(training.date).add(training.duration, "minutes").toDate(),
      };
    });
  };
  React.useEffect(getTrainings, []);
  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={mapTrainingToEvent()}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default TrainingCalendar;
