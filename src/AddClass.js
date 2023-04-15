import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  where,
  query,
  getCountFromServer
} from "firebase/firestore";
import { firestore } from "./firebase";
export default function AddClass() {
  const [tutData, setTutData] = useState([]);
  const [crsData, setCrsData] = useState([]);
  const tutRef = collection(firestore, "tutorials");
  const crsRef = collection(firestore, "courses");
  const ClsRef = collection(firestore, "Classes");
  //const clsRef = collection(firestore,'Classes')
  const [crsnum, setCrsNum] = useState(0);
  const [tutno, setTutno] = useState(0);
  const [clsno, setClsno] = useState(0);
  const [totcls, setTotCls] = useState(1);
  /*const tutData = getDocs(tutRef).then(()=>{

    tutData.forEach(doc=>{
      alert(doc.data())
    })})
   */

  const handleCrschange = (val) => {
    setCrsNum(val);
    alert("crsuum" + crsnum);
  };

  const saveClassData = () => {
    addDoc(ClsRef, {
      classNo: clsno,
      crsNo: crsnum,
      tutNo: tutno
    }).then(() => {
      alert("class successfully opened");
    });
  };
  useEffect(() => {
    const tutSnapshot = getDocs(tutRef).then((tutSnapshot) => {
      tutSnapshot.forEach((doc) => {
        //alert(doc.data());
        setTutData((tutData) => [...tutData, doc.data()]);
      });
    });
    const crsSnapshot = getDocs(crsRef).then((crsSnapshot) => {
      crsSnapshot.forEach((doc) => {
        //alert(doc.data());
        setCrsData((crsData) => [...crsData, doc.data()]);
      });
    });

    //alert('tot classes'+ClsSnapshot.data())
  }, []);

  const updateClsNum = () => {
    const clsRef2 = query(ClsRef, where("crsNo", "==", crsnum));
    const ClsSnapshot = getCountFromServer(clsRef2).then((ClsSnapshot) => {
      // alert("clsnum" + crsnum);

      setClsno(ClsSnapshot.data().count + 1);
      //alert("classNo" + clsno);
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
        Save Class
      </div>

      <select
        className="form-select"
        style={{ marginTop: 5 }}
        /*   onChange={(e) => {
          setCrsNum(e.target.value);
          updateClsNum()
        //  alert('hello course')
        }}
        */
        //  onChange={updCrsnum}
        value={crsnum}
        onChange={(e) => {
          handleCrschange(e.target.value);
        }}
      >
        <option selected>choose Course</option>
        {crsData.map((crs) => (
          <option value={crs.crsNo}>{crs.crsName}</option>
        ))}
      </select>

      <select
        className="form-select"
        onChange={(e) => {
          setTutno(e.target.value);
        }}
        style={{ marginTop: 5 }}
      >
        <option selected>choose Tutor</option>
        {tutData.map((tut) => (
          <option value={tut.tutNo}>{tut.tutName}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Class No"
        className="form-control"
        value={clsno}
        onChange={(e) => {
          setClsno(e.target.value);
        }}
        onClick={updateClsNum}
        style={{ marginTop: 5 }}
      />
      <button
        className="btn btn-success"
        style={{ marginTop: 5 }}
        onClick={saveClassData}
      >
        Open Class
      </button>
    </div>
  );
}
