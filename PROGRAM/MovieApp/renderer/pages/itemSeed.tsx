import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseFIle";

export const seedItem = () => {
  var name;
  var description;
  var price;

  setDoc(doc(db, "ItemList"), {
    name: "Mac Book",
    description: "apple product",
    price: 2000000,
  });
  setDoc(doc(db, "ItemList"), {
    name: "Asus Book",
    description: "for employee computer",
    price: 3000000,
  });
  setDoc(doc(db, "ItemList"), {
    name: "Mac Book",
    description: "for ",
    price: 2000000,
  });
  setDoc(doc(db, "ItemList"), {
    name: "Sanitary",
    description: "for every floor",
    price: 3000000,
  });
};
