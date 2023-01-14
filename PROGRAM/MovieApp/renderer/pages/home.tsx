import React, { useState } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import { AppBar, Toolbar } from '@material-ui/core';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

function Home() {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleMenuOpen() {
    setIsMenuOpen(true);
  }
  function handleMenuClose() {
    setIsMenuOpen(false);
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          
          <IconButton onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">MovieApp</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isMenuOpen} onClose={handleMenuClose}>
        <List>
          <ListItem button onClick={handleMenuClose}>
            <ListItemText primary="View Purchase Report"/>
          </ListItem>
          <ListItem button onClick={handleMenuClose}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={handleMenuClose}>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </>
    
  );
};

export default Home;
