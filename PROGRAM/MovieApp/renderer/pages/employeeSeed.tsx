import { EmailAuthCredential } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebaseFIle";

function getFirstName(sentence: string): string {
    const words = sentence.split(' ');
    return words[0];
  }

  function getLastName(sentence: string): string {
    const index = sentence.lastIndexOf(' ');
    return index === -1 ? sentence : sentence.substring(index + 1);
  }
  



export const seedEmployee = () =>{
    var name = "Anggara Setya"
    var fisrtName = getFirstName(name);
    var lastName = getLastName(name);
    // console.log(fisrtName);

    setDoc(doc(db, 'Employee', 'E001'), {
        name : name,
        age : 17,
        email : `${fisrtName}@email.com`,
        job : "Human Resource Department",
        warningLetter:0,
        salary: 1000000,
        personalLeave: 0,
        workingTime: "06.00-18.00"

    });
    name = "Jason Ady"
    fisrtName = getFirstName(name);
    lastName = getLastName(name);
    // console.log(fisrtName);


    setDoc(doc(db, 'Employee', 'E002'), {
        name : name,
        age : 18,
        email : `${fisrtName}@email.com`,
        job : "Accounting and Finance",
        warningLetter:0,
        salary: 1000000,
        personalLeave: 0,
        workingTime: "06.00-18.00"

    });

    name = "Putri Indah"
    fisrtName = getFirstName(name);
    lastName = getLastName(name);
    // console.log(fisrtName);

    setDoc(doc(db, 'Employee', 'E003'), {
        name : name,
        age : 18,
        email : `${fisrtName}@email.com`,
        job : "Manager",
        warningLetter:0,
        salary: 1000000,
        personalLeave: 0,
        workingTime: "06.00-18.00"

    });
    name = "Hady Surya"
    fisrtName = getFirstName(name);
    lastName = getLastName(name);
    // console.log(fisrtName);
    setDoc(doc(db, 'Employee', 'E004'), {
        name : name,
        age : 18,
        email : `${fisrtName}@email.com`,
        job : "Storage Department",
        warningLetter:0,
        salary: 1000000,
        personalLeave: 0,
        workingTime: "06.00-18.00"

    });
    name = "Erika Oroh"
    fisrtName = getFirstName(name);
    lastName = getLastName(name);
    // console.log(fisrtName);
    setDoc(doc(db, 'Employee', 'E005'), {
        name : name,
        age : 18,
        email : `${fisrtName}@email.com`,
        job : "External Department",
        warningLetter:0,
        salary: 1000000,
        personalLeave: 0,
        workingTime: "06.00-18.00"

    });
    name = "Supri Ady"
    fisrtName = getFirstName(name);
    lastName = getLastName(name);
    // console.log(fisrtName);
    setDoc(doc(db, 'Employee', 'E006'), {
        name : name,
        age : 18,
        email : `${fisrtName}@email.com`,
        job : "Promotion and Event Department",
        warningLetter:0,
        salary: 1000000,
        personalLeave: 0,
        workingTime: "06.00-18.00"

    });


}
