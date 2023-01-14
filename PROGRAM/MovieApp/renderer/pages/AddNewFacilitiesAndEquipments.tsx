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
import { seedItem } from "./itemSeed";

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

export async function getItem() {
  var array = [];
  const q = collection(db, "ItemList");

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
  const [descValue, setDesc] = React.useState("");
  const handleDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };
  const [priceValue, setPrice] = React.useState("");
  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
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

  const [items, setItem] = useState([]);
  const userCollectionRef = collection(db, "ItemList");

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  var arr = [];

  const fillItemTable = () => {
    getItem().then((e) => {
      setItem(
        e.map((e) => {
          return {
            id: e.id,
            Name: e.name,
            Price: e.price,
            Description: e.description,
          };
        })
      );
    });
  };

  useEffect(() => fillItemTable(), []);

  const docRef = () => {
    addDoc(collection(db, "ItemList"), {
      name: nameValue,
      description: descValue,
      price: priceValue,
    });

    fillItemTable();

    handleCloseDialog();
  };

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
      field: "Description",
      headerName: "Description",
      width: 110,
      editable: true,
    },
    {
      field: "Price",
      headerName: "Price",
      type: "number",
      width: 200,
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
        <DataGrid rows={items} columns={columns} />

        <Button
          className={classes.dialogButton}
          variant="outlined"
          color="primary"
          onClick={handleOpenDialog}
        >
          Add New Equipments
        </Button>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add New Facilities and Equipments
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Please Insert New Item</DialogContentText>
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
              id="description"
              label="Description"
              type="text"
              fullWidth
              value={descValue}
              onChange={handleDesc}
            />
            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Item price"
              type="text"
              fullWidth
              value={priceValue}
              onChange={handlePrice}
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
