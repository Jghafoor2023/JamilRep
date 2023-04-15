import { firestore } from "./firebase";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  where,
  query
} from "firebase/firestore";
import { useState, useEffect } from "react";

export default function SaveMark() {
  const [sidd, setSid] = useState("");
  const [crssno, setCrsno] = useState("");
  const [midd, setMd] = useState();
  const [fin, setFn] = useState();
  const [studs, setStuds] = useState([]);
  const [crses, setCourses] = useState([]);
  const studRef = collection(firestore, "studinfo");
  const crsRef = collection(firestore, "courses");
  const regRef = collection(firestore, "studReg");
  useEffect(() => {
    //populate stud array with studets data
    const studSnapshot = getDocs(studRef).then((studSnapshot) => {
      studSnapshot.forEach((Sdoc) => {
        setStuds((studs) => [...studs, Sdoc.data()]);
      });
    });
    const CrseSnapshot = getDocs(crsRef).then((CrseSnapshot) => {
      CrseSnapshot.forEach((cr) => {
        setCourses((crses) => [...crses, cr.data()]);
      });
    });
  }, []);

  const SaveMarks = () => {
    const reg = query(
      regRef,
      where("sid", "==", sidd),
      where("crsNo", "==", crssno)
    );

    const RegSnapshot = getDocs(reg).then((RegSnapshot) => {
      RegSnapshot.forEach((rg) => {
        const currReg = doc(firestore, "/studReg/" + rg.id);
        //calculate mark average
        const totMark = (parseInt(midd) + parseInt(fin)) / 2;
        alert(midd + fin);
        updateDoc(currReg, {
          ex1: midd,
          ex2: fin,
          mark: totMark
        }).then(() => {
          alert("mark successfully saved");
        });
      });
    });
  };

  return (
    <div>
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
        Save Student Marks
      </div>
      <select
        className="form-select"
        onChange={(e) => {
          setSid(e.target.value);
        }}
      >
        <option selected>choose stud..</option>
        {
          //populate list from studs data
          studs.map((stud) => (
            <option value={stud.sid}>{stud.sname}</option>
          ))
        }
      </select>

      <select
        className="form-select"
        onChange={(e) => {
          setCrsno(e.target.value);
        }}
      >
        <option selected>choose Course..</option>
        {
          //populate list from studs data
          crses.map((cr) => (
            <option value={cr.crsNo}>{cr.crsName}</option>
          ))
        }
      </select>
      <input
        type="text"
        className="form-control"
        placeholder="midterm"
        onChange={(e) => {
          setMd(e.target.value);
        }}
      />

      <input
        type="text"
        className="form-control"
        placeholder="Fnal"
        onChange={(e) => {
          setFn(e.target.value);
        }}
      />
      <button
        className="btn btn-success"
        onClick={SaveMarks}
        style={{ marginTop: 6 }}
      >
        Save Marks
      </button>
    </div>
  );
}
