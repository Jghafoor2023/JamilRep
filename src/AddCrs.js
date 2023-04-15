import { useState, useEffect } from "react";
import { firestore } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
export default function AddCrs() {
  const CrsRef = collection(firestore, "courses");
  const [crsno, setCrsno] = useState();
  const [crsname, setCrsname] = useState();
  const saveCourseData = () => {
    addDoc(CrsRef, {
      crsNo: crsno,
      crsName: crsname
    }).then(() => {
      alert("Course info successfully saved");
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
        Save Course Data
      </div>
      <input
        type="text"
        placeholder="Course Number"
        className="form-control"
        onChange={(e) => {
          setCrsno(e.target.value);
        }}
        style={{ marginTop: 6 }}
      />

      <input
        type="text"
        placeholder="Course  Name"
        className="form-control"
        onChange={(e) => {
          setCrsname(e.target.value);
        }}
        style={{ marginTop: 6 }}
      />
      <button
        className="btn btn-success"
        onClick={saveCourseData}
        style={{ marginTop: 9, marginLeft: 80 }}
      >
        Save Course Data
      </button>
    </div>
  );
}
