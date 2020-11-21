import logo from "./logo.svg";
import "./App.css";
import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import CustomerList from "./components/CustomerList";
import GroupIcon from '@material-ui/icons/Group';
import PoolIcon from '@material-ui/icons/Pool';
import TodayIcon from '@material-ui/icons/Today';
import EqualizerIcon from '@material-ui/icons/Equalizer';
const drawerWidth = 240;
const drawerCloseWidth = 0;

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginLeft: drawerCloseWidth,
    zIndex: 1,
  },
  appBarShift: {
    left: drawerWidth,
  },
  drawerOpen: {
    width: drawerWidth,
  },
  drawerClose: {
    width: drawerCloseWidth,
    overflowX: "hidden",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
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
  content: {
    marginLeft: drawerCloseWidth,
  },
  contentShift: {
    marginLeft: drawerWidth,
  },
}));

function App() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <CssBaseline />
      <AppBar
        position="fixed"
        classes={{ root: open ? classes.appBarShift : classes.appBar }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
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
          {["Customers", "Trainings", "Calendar", "Statistics"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 ? <GroupIcon /> : index === 1 ? <PoolIcon/> : index == 2 ? <TodayIcon/> : <EqualizerIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={open ? classes.contentShift : classes.content}>
        <div className={classes.drawerHeader} />
        <CustomerList />
      </main>
    </div>
  );
}

export default App;
