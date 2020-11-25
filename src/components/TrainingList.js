import React, { useEffect } from "react";
import { TableCell, TableRow } from "@material-ui/core";
import EnhancedTable from "./EnhancedTable";
import moment from 'moment';
import { getTrainingsMiddleware, deleteTrainingMiddleware } from "../redux/middleware/trainingMiddleware";
import { useDispatch, useSelector } from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {displayConfirmDialog } from "../redux/actions/dialogActions";
const Row  = (props) => {
  const { row } = props;
  const dispatch = useDispatch()
  let customerName = row.customer == null ? "" : `${row.customer.firstname} ${row.customer.lastname}`

  const deleteTraining = (row) => dispatch(deleteTrainingMiddleware(row));
  return (
    <React.Fragment>
      <TableRow>
        <TableCell/>
        <TableCell component="th" scope="row">
          {moment(row.date).format('MMMM Do YYYY, h:mm:ss a')}
        </TableCell>
        <TableCell>{row.duration}</TableCell>
        <TableCell>{row.activity}</TableCell> 
        <TableCell>{customerName}</TableCell>
        <TableCell><DeleteForeverIcon color="secondary" onClick={() => dispatch(displayConfirmDialog( "Delete training ", row, deleteTraining))}/></TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const tableHeaders = [{id: "date", label: "Date"},
  {id: "duration", label: "Duration"},
  {id: "activity", label: "Activity"},
  {id: "customer", label: "Customer"}];

const TrainingList = () => {
  const dispatch = useDispatch()
  const trainingsState = useSelector(state => state.trainingReducer);
  const getTrainings = () => {
    dispatch(getTrainingsMiddleware());
  }
  useEffect(getTrainings, []);

  return (
    <div>
      <EnhancedTable 
        tableName="Trainings" 
        headers={tableHeaders} 
        rowData={trainingsState.trainings} 
        mapFunction={(row) => <Row key={row.id} row={row}/>}
        filterFunction={(row, searchValue) => row.date.includes(searchValue) || row.duration.toString().includes(searchValue) || row.activity.includes(searchValue) || (row.customer !== null && `${row.customer.firstname} ${row.customer.lastname}`.includes(searchValue))}/>
    </div>
  );
};

export default TrainingList;

