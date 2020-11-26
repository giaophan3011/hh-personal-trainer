import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { getTrainingsMiddleware } from "../redux/middleware/trainingMiddleware";

const Statistics = () => {
  const dispatch = useDispatch();
  const trainingsState = useSelector((state) => state.trainingReducer);

  const getTrainings = () => {
    dispatch(getTrainingsMiddleware());
  };
  React.useEffect(getTrainings, []);

  const mapTrainingToStatistics = () => {
    return Array.from(
      trainingsState.trainings.reduce(
        (events, training) =>
          events.set(training.activity, (events.get(training.activity) || 0) + training.duration),
        new Map()
      ),
      ([activity, duration]) => ({ activity, duration })
    );
  };
  return (
    <div>
      <BarChart width={1000} height={500} data={mapTrainingToStatistics()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="activity" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="duration" fill="green" />
      </BarChart>
    </div>
  );
};

export default Statistics;
