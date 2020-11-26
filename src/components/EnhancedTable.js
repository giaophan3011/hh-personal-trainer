import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableSortLabel,
  Toolbar,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { displayAddCustomerDialog, displayAddTrainingDialog } from "../redux/actions/dialogActions";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableToolbar = ({ handleSearch, tableName }) => {
  const dispatch = useDispatch();
  return (
    <Toolbar>
      <Typography
        style={{ flex: "1 1 100%", textAlign: "left", fontWeight: "bold" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {tableName}
      </Typography>

      <div style={{ backgroundColor: "white", display: "flex" }}>
        <SearchIcon style={{ marginLeft: 2, marginTop: 3, marginRight: 5 }} />
        <InputBase
          placeholder="Search…"
          onChange={(event) => {
            //adding the onChange event
            handleSearch(event.target.value);
          }}
        />
      </div>
      {tableName === "Trainings" ? (
        <LibraryAddIcon
          style={{ marginLeft: 10 }}
          onClick={() => dispatch(displayAddTrainingDialog())}
        />
      ) : (
        <PersonAddIcon
          style={{ marginLeft: 10 }}
          onClick={() => dispatch(displayAddCustomerDialog())}
        />
      )}
    </Toolbar>
  );
};

const EnhancedTable = ({ tableName, headers, rowData, mapFunction, filterFunction }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("firstname");
  const [searchValue, setSearchValue] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div>
      <EnhancedTableToolbar handleSearch={setSearchValue} tableName={tableName} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {headers.map((header) => (
                <TableCell>
                  <TableSortLabel
                    active={orderBy === header.id}
                    direction={order}
                    onClick={() => handleRequestSort(header.id)}
                  >
                    {header.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(
              searchValue === ""
                ? rowData
                : rowData.filter((row) => filterFunction(row, searchValue)),
              getComparator(order, orderBy)
            ).map((row) => mapFunction(row))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EnhancedTable;
