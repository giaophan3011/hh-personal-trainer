import React from "react";
import {
  Drawer,
  Divider,
  ListItemIcon,
  List,
  ListItemText,
  ListItem,
  IconButton,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GroupIcon from "@material-ui/icons/Group";
import PoolIcon from "@material-ui/icons/Pool";
import TodayIcon from "@material-ui/icons/Today";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { getTrainingsMiddleware } from "../redux/middleware/trainingMiddleware";
import { useDispatch } from "react-redux";

const drawerWidth = 240;
const drawerCloseWidth = 0;

const useStyles = makeStyles((theme) => ({
  drawerOpen: {
    width: drawerWidth,
  },
  drawerClose: {
    width: drawerCloseWidth,
    overflowX: "hidden",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    toolbar: theme.mixins.toolbar,
  },
  toolbarHidden: {
    zIndex: -1,
    toolbar: theme.mixins.toolbar,
  },
}));

const drawerMenu = [
  { text: "Customers", route: "/" },
  { text: "Trainings", route: "/trainings" },
  { text: "Calendar", route: "/calendar" },
  { text: "Statistics", route: "/statistics" },
];

export default function DrawerMenu({ open, handleDrawerClose }) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleNavigate = (route) => {
    if (route === "/calendar") dispatch(getTrainingsMiddleware());
    history.push(route);
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      className={open ? classes.drawerOpen : classes.drawerClose}
    >
      <div className={open ? classes.toolbar : classes.toolbarHidden}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider />
      <List style={{ width: drawerWidth }}>
        {drawerMenu.map((item, index) => (
          <ListItem button key={item.text} onClick={() => handleNavigate(item.route)}>
            <ListItemIcon>
              {index === 0 ? (
                <GroupIcon />
              ) : index === 1 ? (
                <PoolIcon />
              ) : index === 2 ? (
                <TodayIcon />
              ) : (
                <EqualizerIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
