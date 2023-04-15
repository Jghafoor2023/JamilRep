import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import { useState } from "react";

export default function DropDown() {
  const [val, setval] = useState();

  const handleSelect = (e) => {
    setval(e);

    alert("you choose :" + val);
  };
  return (
    <div>
      <DropdownButton
        alignRight
        title="Choose Course"
        id="dropdown-menu-align-left"
        onSelect={handleSelect}
      >
        <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
        <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
        <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
