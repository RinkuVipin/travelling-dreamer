import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "../UIElements/BackDrop/BackDrop";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const MainNavigation = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openSideDrawer = () => {
    setDrawerOpen(true);
  };

  const closeSideDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Fragment>
      {drawerOpen && <Backdrop onClick={closeSideDrawer} />}

      <SideDrawer closeSideDrawer={closeSideDrawer} show={drawerOpen}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openSideDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Track Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
