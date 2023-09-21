import DropdownWrapper from "./Dropdown.style";
import { useState } from "react";

import BnbIcon from "../../assets/images/token/bnb.png";
import BusdIcon from "../../assets/images/token/busd.png";
import { payWith } from "../../contracts/config";

const Dropdown = () => {
  const dropdownList = [
    {
      id: "1",
      icon: BnbIcon,
      title: "BNB",
    },

  ];

  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [titleText, setTitleText] = useState(payWith);
  const [selectedImg, setSelectedImg] = useState(BnbIcon);

  const dropdownHandle = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleDropdownData = (item) => {
    setTitleText(item.title);
    setSelectedImg(item.icon);
    setIsDropdownActive(false);
  };

  return (
    <DropdownWrapper onClick={dropdownHandle}>
      <button className="dropdown-toggle">
        <img src={selectedImg} alt="icon" />
        <span>{titleText}</span>
      </button>
    </DropdownWrapper>
  );
};

export default Dropdown;
