import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@material-ui/core";
import EnhancedTable from "./EnhancedTable";
import moment from 'moment';

const Row  = (props) => {
  const { row } = props;
  let customerName = row.customer == null ? "" : `${row.customer.firstname} ${row.customer.lastname}`
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
      </TableRow>
    </React.Fragment>
  );
}

const tableHeaders = [{id: "date", label: "Date"},
  {id: "duration", label: "Duration"},
  {id: "activity", label: "Activity"},
  {id: "customer", label: "Customer"}];

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);

  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
    .then(response => response.json())
    .then(data =>  setTrainings(data));
  }
  useEffect(getTrainings, []);

  return (
    <div>
      <EnhancedTable 
        tableName="Trainings" 
        headers={tableHeaders} 
        rowData={trainings} 
        mapFunction={(row) => <Row key={row.id} row={row}/>}
        filterFunction={(row, searchValue) => row.date.includes(searchValue) || row.duration.toString().includes(searchValue) || row.activity.includes(searchValue) || (row.customer !== null && `${row.customer.firstname} ${row.customer.lastname}`.includes(searchValue))}/>
    </div>
  );
};

export default TrainingList;

