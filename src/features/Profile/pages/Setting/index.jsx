import React from "react";
import ChangePasswordTab from "../../components/Setting/ChangePasswordTab";
import EditProfileTab from "../../components/Setting/EditProfileTab";

const Setting = () => {
  const handleActive = (e) => {
    const tabContentList = document.querySelectorAll(".setting__tabPane");
    const currentElement = e.target;
    if (currentElement.nextSibling) {
      tabContentList[0].classList.add("tabPane-active");
      tabContentList[1].classList.remove("tabPane-active");
    } else {
      tabContentList[1].classList.add("tabPane-active");
      tabContentList[0].classList.remove("tabPane-active");
    }
    currentElement.nextSibling?.classList?.remove("tab-active");
    currentElement.previousSibling?.classList?.remove("tab-active");
    currentElement.classList.add("tab-active");
  };

  return (
    <div className="setting__container">
      <div className="setting__tabs">
        <div onClick={handleActive} className="setting__tabs-item tab-active">
          Edit Profile
        </div>
        <div onClick={handleActive} className="setting__tabs-item">
          Change Password
        </div>
      </div>
      <div className="setting__tabContent">
        <div className="setting__tabPane tabPane-active">
          <EditProfileTab />
        </div>
        <div className="setting__tabPane setting__changePassword">
          <ChangePasswordTab />
        </div>
      </div>
    </div>
  );
};

export default Setting;
