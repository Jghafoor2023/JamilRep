import { useState, useEffect } from "react";
import { firestore } from "./firebase";
import { addDoc, getDoc, collection } from "firebase/firestore";

export default function AddStud() {
  const studRef = collection(firestore, "studinfo");
  //define constant for use it in database
  const [sid, setSid] = useState();
  const [sname, setSname] = useState();
  //function to add data to database
  const SaveStudInfo = () => {
    addDoc(studRef, {
      sid: sid,
      sname: sname,
      stpd: "N"
    }).then(() => {
      alert("successfully stud data saved");
    });
  };
  return (
    <div className="container">
      <div
        style={{
          padding: 3,
          textAlign: "center",
          fontSize: 25,
          color: "white",
          backgroundColor: "olive",
          borderRadius: 6,
          marginTop: 8
        }}
      >
        Save Student Data
      </div>
      <input
        type="text"
        placeholder="Student Id"
        className="form-control"
        onChange={(e) => {
          setSid(e.target.value);
        }}
        style={{ marginTop: 6 }}
      />

      <input
        type="text"
        placeholder="Student name"
        className="form-control"
        onChange={(e) => {
          setSname(e.target.value);
        }}
        style={{ marginTop: 6 }}
      />
      <button
        className="btn btn-success"
        onClick={SaveStudInfo}
        style={{ marginTop: 9, marginLeft: 80 }}
      >
        Save Stud Data
      </button>
    </div>
  );
}
