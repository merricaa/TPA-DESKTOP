
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from './firebaseFIle';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "./firebaseFIle";


import { async } from "@firebase/util";
import { useRouter } from 'next/router';




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export async function getUser(){
  var array = [];
  const q = collection(db, 'user1');

  const data = await getDocs(q).then((item) => {
      item.docs.map(e => {
          array.push({...e.data()});
      });
  });

  return array;
}



export default function Login() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [user, setUser] = useState({});
  
  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
      console.log(currentUser);
      
    })
  }, [])
  
  const classes = useStyles();
  

  const login = async()=>{
    try{
      console.log(loginEmail);
      console.log(loginPassword);
      const user = signInWithEmailAndPassword(auth, loginEmail, loginPassword).then((u)=>{
        console.log(u);
      });
      window.location.href = "/dashboard";

    }catch(error){
      console.log(error.message);

    }
    

  }

  const logout =async()=>{
    await signOut(auth);

  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
            <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Typography>Welcome To Stuck In The Movie</Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(event)=>{
              setLoginEmail(event.target.value);
              console.log("will");
            }}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(event)=>{
              setLoginPassword(event.target.value);
            }}

            autoComplete="current-password"
          />
          <Button 
            onClick={login}
            
            // onSubmit={handleClick}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
            </form>
            <button onClick={logout}> Sign Out</button>
      </div>
    </Container>
  );
}
