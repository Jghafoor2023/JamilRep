import { firestore } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function AdTutur() {
  const [tname, setTname] = useState();
  const [tid, setTid] = useState();
  const TRef = collection(firestore, "tutorials");
  const saveTutorData = () => {
    addDoc(TRef, {
      tutName: tname,
      tutNo: tid
    }).then(() => {
      alert("tutorial data successfully saved");
    });
  };
  return (
    <div className="container">
      <input
        type="text"
        placeholder="Tutorial Id"
        className="form-control"
        onChange={(e) => {
          setTid(e.target.value);
        }}
        style={{ marginTop: 6 }}
      />

      <input
        type="text"
        placeholder="Tutorial Name"
        className="form-control"
        onChange={(e) => {
          setTname(e.target.value);
        }}
        style={{ marginTop: 6 }}
      />
      <button
        className="btn btn-success"
        onClick={saveTutorData}
        style={{ marginTop: 9, marginLeft: 80 }}
      >
        Save tutorial Data
      </button>
    </div>
  );
}
