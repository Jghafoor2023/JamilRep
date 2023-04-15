import { firestore } from "./firebase";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  getCountFromServer,
  doc,
  updateDoc
} from "firebase/firestore";

export default function RegStud() {
  const [crsnum, setCrsnum] = useState("");
  const [studid, setSid] = useState("");
  const [studs, setStuds] = useState([]);
  //initialize doc intstance for bothe course and classes

  const studRef = collection(firestore, "studinfo");
  const studRef2 = query(studRef, where("stpd", "==", "N"));
  const crsRef = collection(firestore, "courses");
  const classRef = collection(firestore, "Classes");
  const regRef = collection(firestore, "studReg");

  const [classCounter, setClassCounter] = useState(0);
  //define arrays for both courses and classes
  const [crsData, setCrsData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [clsno, setClsno] = useState(0);

  //initialize data from database when new intstance
  useEffect(() => {
    //initalize courses
    const crsSnapshot = getDocs(crsRef).then((crsSnapshot) => {
      crsSnapshot.forEach((doc) => {
        // alert(doc.data())

        setCrsData((crsData) => [...crsData, doc.data()]);
      });

      //handle and populate
      //stud list with names from database
      const studSnapshot = getDocs(studRef2).then((studSnapshot) => {
        studSnapshot.forEach((stud) => {
          setStuds((studs) => [...studs, stud.data()]);
        });
      });
    });
    // end courses populate
  }, []);

  const populateClass = () => {
    // alert("course number is :" + crsnum);

    //reset class array
    //setClassData([]);

    const classRef2 = query(classRef, where("crsNo", "==", crsnum));
    const clasCount = getCountFromServer(classRef2).then((clasCount) => {
      // alert("counter is  :" + clasCount.data().count);
      setClassCounter(clasCount.data().count);
    });
    const classSnapshot = getDocs(classRef2).then((classSnapshot) => {
      classSnapshot.forEach((doc) => {
        setClassData((classData) => [...classData, doc.data()]);
      });
    });
    //class population
  };

  const updateMark = () => {
    const regRefMrk = doc(firestore, "/studReg/jT9jbavu6MgpZDzggbEc");

    updateDoc(regRefMrk, {
      sid: "888899",
      crsNo: "0102",
      classNo: "2"
    });
  };

  const updateMark2 = () => {
    const q = query(regRef, where("sid", "==", "850437971"));
    let docId = "";
    const regSnapshot = getDocs(q).then((regSnapshot) => {
      regSnapshot.forEach((currRec) => {
        alert(currRec.id);
        //docId = doc.id;
        const currRegRec = doc(firestore, "/studReg/" + currRec.id);
        updateDoc(currRegRec, {
          ex1: 45,
          ex2: 55
        }).then(() => {
          alert("successfully updated");
        });
      });
    });
    // const currRecrd = doc(firestore,"/studReg/"+docId);

    /* updateDoc(currRecrd, {
      ex1: 45,
      ex2: 55
    });
    */
  };
  const completeRegistration = () => {
    {
      crsnum && studid && clsno
        ? addDoc(regRef, {
            classNo: clsno,
            crsNo: crsnum,
            sid: studid,
            ex1: 0,
            ex2: 0,
            mark: 0
          }).then(() => {
            alert("Registration Complete Successfully");
          })
        : alert("please enter all field correctly");
    }
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
        Registration Form
      </div>

      {/* <select
        className="form-select"
        defaultValue={crsnum}
        onChange={(e) => {
          setCrsnum(e.target.value);
          populateClass();
        }}
        style={{ marginTop: 5 }}
      >
        <option selected>Choose Course</option>
        {crsData.map((crs) => (
          <option value={crs.crsNo}>{crs.crsName}</option>
        ))}
      </select>
      */}

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

      <input
        type="text"
        className="form-control"
        placeholder="course"
        onKeyUp={(e) => {
          setClassData([]); //reset array of classes
          //alert('hello sss')
          setCrsnum(e.target.value);
          populateClass();
        }}
      />
      <select
        className="form-select"
        onChange={(e) => {
          setClsno(e.target.value);
        }}
        style={{ marginTop: 5 }}
      >
        <option selected>Choose Class</option>
        {classData.map((cls) => (
          <option value={cls.classNo}>{cls.classNo}</option>
        ))}
      </select>
      <button
        className="btn btn-success"
        onClick={completeRegistration}
        style={{ marginTop: 5 }}
      >
        Register Course
      </button>
      <button
        className="btn btn-info"
        onClick={updateMark2}
        style={{ marginLeft: 9, marginTop: 5 }}
      >
        update course
      </button>
    </div>
  );
}
