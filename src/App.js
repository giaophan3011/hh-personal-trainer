import "./App.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, CssBaseline, Typography, IconButton  } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import CustomerList from "./components/CustomerList";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TrainingList from "./components/TrainingList";
import DrawerMenu from "./components/DrawerMenu";

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
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
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
      <Router>
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
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerMenu open={open} handleDrawerClose= {handleDrawerClose}/>
      <main className={open ? classes.contentShift : classes.content}>
        <div className={classes.drawerHeader} />
        <Switch>
                <Route exact path="/" component={CustomerList}/>
                <Route path ="/trainings" component={TrainingList}/>
                <Route render={() => <h1> Coming soon </h1>}/>
              </Switch>
      </main>
      </Router>
    </div>
  );
}

export default App;
