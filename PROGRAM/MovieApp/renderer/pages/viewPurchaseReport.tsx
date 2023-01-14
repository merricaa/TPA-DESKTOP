import { collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from './firebaseFIle';
 function Purchase(){
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "employee");

    useEffect(()=>{
        const getUsers = async () =>{

        }

    },[])

    

   

    return

};