import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import needed pages
import AdTutur from "./AdTutur";
import AddStud from "./AddStud";
import AddCrs from "./AddCrs";
import AddClass from "./AddClass";
import DropDown from "./DropDown";
import RegStud from "./RegStud";

import SaveMark from "./SaveMark";

export default function mnu() {
  return (
    <Router>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark rounded">
        <a class="navbar-brand" href="#">
          Exam Sys
        </a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/addstud">
                Add Student <span class="sr-only">(current)</span>
              </Link>
            </li>
            <li class="nav-item active">
              <Link class="nav-link" to="/addcrs">
                Add Course <span class="sr-only">(current)</span>
              </Link>
            </li>
            <li class="nav-item active">
              <Link class="nav-link" to="/addtut">
                Add Tutorial <span class="sr-only">(current)</span>
              </Link>
            </li>

            <li class="nav-item active">
              <Link class="nav-link" to="/addclass">
                Open Class
              </Link>
            </li>

            <li class="nav-item active">
              <Link class="nav-link" to="/regstud">
                Register
              </Link>
            </li>

            <li class="nav-item active">
              <Link class="nav-link" to="/smark">
                Save Marks
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/addstud" element={<AddStud />} />
        <Route path="/addtut" element={<AdTutur />} />
        <Route path="/addcrs" element={<AddCrs />} />
        <Route path="/addclass" element={<AddClass />} />
        <Route path="/regstud" element={<RegStud />} />
        <Route path="/smark" element={<SaveMark />} />
      </Routes>
    </Router>
  );
}
