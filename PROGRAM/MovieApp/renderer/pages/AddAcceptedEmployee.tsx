import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItem";
import { seedEmployee } from "./employeeSeed";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "./firebaseFIle";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export function FormDialog() {
  return <div></div>;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  dialogButton: {
    marginBottom: 10,
    alignItems: "center",
    display: "flex",
  },
}));

export async function getEmployee() {
  var array = [];
  const q = collection(db, "Employee");

  const data = await getDocs(q).then((item) => {
    item.docs.map((e) => {
      array.push({ id: e.id, ...e.data() });
    });
  });

  return array;
}

export default function Dashboard() {
  const [nameValue, setName] = React.useState("");
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const [ageValue, setAge] = React.useState("");
  const handleAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };
  const [emailValue, setEmail] = React.useState("");
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const [salaryValue, setSalary] = React.useState("");
  const handleSalary = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(event.target.value);
  };
  const [jobValue, setJob] = React.useState("");
  const handleJob = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJob(event.target.value);
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [employee, setEmployees] = useState([]);
  const userCollectionRef = collection(db, "Employee");

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  var arr = [];

  const fillEmployeeTable = () => {
    getEmployee().then((e) => {
      setEmployees(
        e.map((e) => {
          return {
            id: e.id,
            Name: e.name,
            Age: e.age,
            Email: e.email,
            Job: e.job,
            Salary: e.salary,
            PersonalLeave: e.personalLeave,
          };
        })
      );
    });
  };

  useEffect(() => fillEmployeeTable(), []);

  const docRef = () => {
    addDoc(collection(db, "Employee"), {
      name: nameValue,
      age: ageValue,
      email: emailValue,
      job: jobValue,
      salary: salaryValue,
    });

    fillEmployeeTable();

    handleCloseDialog();
  };

  // seedEmployee();

  //table component
  var columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Name",
      headerName: "Full Name",
      width: 150,
      editable: true,
    },
    {
      field: "Age",
      headerName: "Age",
      width: 110,
      editable: true,
    },
    {
      field: "Email",
      headerName: "Email",
      type: "number",
      width: 200,
      editable: true,
    },
    {
      field: "Job",
      headerName: "Job Detail",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "Salary",
      headerName: "Salary",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "PersonalLeave",
      headerName: "PersonalLeave",
      type: "number",
      width: 150,
      editable: true,
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Add Employee
            <link rel="stylesheet" href="/home" />
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <DataGrid rows={employee} columns={columns} />

        <Button
          className={classes.dialogButton}
          variant="outlined"
          color="primary"
          onClick={handleOpenDialog}
        >
          Add New Employee
        </Button>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add Accepted Employee
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Please Insert Employee Data !</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Employee Name"
              type="text"
              fullWidth
              value={nameValue}
              onChange={handleName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="age"
              label="Age"
              type="text"
              fullWidth
              value={ageValue}
              onChange={handleAge}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={emailValue}
              onChange={handleEmail}
            />

            <TextField
              autoFocus
              margin="dense"
              id="job"
              label="Job Detail"
              type="text"
              fullWidth
              value={jobValue}
              onChange={handleJob}
            />
            <TextField
              autoFocus
              margin="dense"
              id="salary"
              label="Salary"
              type="text"
              fullWidth
              value={salaryValue}
              onChange={handleSalary}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={docRef} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
}
