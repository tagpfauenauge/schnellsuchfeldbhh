import * as React from "react";
import { User24, CaretDown24, Upload24, CertificateCheck32 } from "@carbon/icons-react";
import { Workbook } from "exceljs";

import { UserName } from "./UsersTypes";
import { UploadButton } from "../upload/UploadButton";
import { DocReferrer } from "../othercomponents/DocReferrer";
import { HHSt } from "../store/HHStType";


const userNames: UserName[] = ["BearbeiterEpl01und02", "BearbeiterGesamtBHH"];

export type NavigationProps = {
  currentUser: UserName;
  setCurrentUser: (newCurrentUser: UserName) => void;
  setLocalData: (hhsts: HHSt[], firstYear: number) => void;
};

export function Navigation({ currentUser, setCurrentUser, setLocalData }: NavigationProps): JSX.Element {
  const [usersSelectable, setUsersSelectable] = React.useState<boolean>(false);
  function toggleUsersSelectable() {
    setUsersSelectable(!usersSelectable);
  }

  const [burgerActiveClassName, setBurgerActiveClassName] = React.useState<"is-active" | "">("");

  function toggleBurgerActiveClassName() {
    setBurgerActiveClassName(burgerActiveClassName ? "" : "is-active");
  }
  return <nav className="navbar has-background-info" key="Navbar">

    <div className="navbar-brand">
      <div className="navbar-item has-text-light" >
        <div className="media">
          <div className="media-left"><CertificateCheck32 /></div>
          <div className="media-content">

            <p className="title has-text-light">Universalsuche</p>
            <p className="subtitle has-text-light">Prototyp für die Suche im kameralen Haushalt</p>
          </div>
        </div>
      </div>
      <a role="button" className={`navbar-burger ${burgerActiveClassName}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={toggleBurgerActiveClassName}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div className={`navbar-menu  ${burgerActiveClassName}`}>


      <div className="navbar-end">

        <div className="navbar-item"><DocReferrer>Anleitung</DocReferrer></div>
        {/* ------------ user selection ------------------*/}
        <div className="navbar-item">


          <div className={`dropdown  ${usersSelectable ? "is-active " : ""}`} onClick={toggleUsersSelectable}>
            <div className="dropdown-trigger">
              <button className="button has-background-info" aria-haspopup="true" aria-controls="dropdown-menu">
                <span className="icon-text"> <span className="icon"><User24 /></span>
                  <span className="has-text-light">{currentUser}</span></span>
                <span className="icon is-small">
                  <CaretDown24 />
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {userNames.map(userName => {
                  return <a href="#" className="dropdown-item" key={userName} onClick={() => {
                    setCurrentUser(userName);
                    setUsersSelectable(false);
                  }} >
                    <span className="icon-text"> <span className="icon"><User24 /></span>
                      <span>{userName}</span></span>
                  </a>;
                })}
                <hr className="dropdown-divider" />
                <div className="dropdown-item">
                  <UploadButton setCurrentUser={(newCurrentUser) => {
                    setCurrentUser(newCurrentUser);
                    setUsersSelectable(false);
                  }}
                    setLocalData={setLocalData} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </nav>;
}