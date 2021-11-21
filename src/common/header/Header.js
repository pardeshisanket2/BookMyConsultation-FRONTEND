import React, { useState, useEffect } from "react";
import Logo from "./../../assets/logo.jpeg";
import Typography from "@material-ui/core/Typography";
import { Button, Tab, Tabs } from "@material-ui/core";
import Modal from "react-modal";
import Login from "./../../screens/login/Login";
import Register from "./../../screens/register/Register";

import TabPanel from "./../../util/uiUtils";
import { a11yProps } from "../../util/uiUtils";
import "./Header.css";
import {
  clearLocalStorage,
  getAccessToken,
} from "./../../services/localStorageService";
import { logoutUserRequest } from "./../../services/authService";

const Header = () => {
  const [modal, showModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState(0);

  const openModalHandler = () => {
    showModal(true);
  };

  const closeModalHandler = () => {
    showModal(false);
    checkLoggedIn();
  };

  const changeHandler = (event, value) => {
    setActiveModalTab(value);
  };

  const checkLoggedIn = () => {
    const loggedIn = getAccessToken() ? true : false;
    setLoggedIn(loggedIn);
  };

  const logoutClickHandler = () => {
    logoutUserRequest().then(() => {
      setLoggedIn(false);
      window.alert("Logged out successfully");
      clearLocalStorage();
    });
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="app-header">
      <div className="app-header-title">
        <img className="app-logo" src={Logo} alt="App Logo" />
        <Typography className="app-title-text" variant="h5" component="div">
          Doctor Finder
        </Typography>
      </div>
      <div>
        <Button
          variant="contained"
          color={loggedIn ? "secondary" : "primary"}
          onClick={() => {
            loggedIn ? logoutClickHandler() : openModalHandler();
          }}
        >
          {loggedIn ? "LOGOUT" : "LOGIN"}
        </Button>
      </div>
      <Modal
        isOpen={modal}
        ariaHideApp={false}
        contentLabel="Login Modal"
        className="login-modal"
        overlayClassName="login-overlay"
        onRequestClose={closeModalHandler}
      >
        <div className="login-dialog-container">
          <Typography
            className="login-dialog-header"
            variant="h6"
            component="div"
          >
            Authentication
          </Typography>
          <Tabs
            value={activeModalTab}
            onChange={changeHandler}
            indicatorColor="secondary"
            aria-label="Login Register Tabs"
          >
            <Tab label="Login" {...a11yProps(0)}></Tab>
            <Tab label="Register" {...a11yProps(1)}></Tab>
          </Tabs>
          <TabPanel value={activeModalTab} index={0}>
            <Login closeModal={closeModalHandler} />
          </TabPanel>
          <TabPanel value={activeModalTab} index={1}>
            <Register changeTab={changeHandler} />
          </TabPanel>
        </div>
      </Modal>
    </div>
  );
};
export default Header;
