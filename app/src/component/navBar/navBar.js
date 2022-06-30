import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Button, Input, message, Space, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import './navBar.css';
const { Search } = Input;

const NavBar = ({onSearch}) => {

  const history = useHistory();
  const [loginCheck, setLoginCheck] = useState('');

  useEffect(() => {
    setLoginCheck(JSON.parse(sessionStorage.getItem("login")));
  }, []);
 


  return (
    <div className="navBarMainDiv">

    <div className="navBarNavSecond">
      <div className="navBarDivSecond">
        <Menu mode="horizontal" className="navBarDivSecondFirst">
          <Menu.Item key="image">
            <Link
              to="/"
              style={{ textDecoration: "none", color: "whitesmoke" }}
              >
              HOME
            </Link>
          </Menu.Item>


        <Menu.Item key="search" className="navBarFirstSearch">
          <Search placeholder="Mumbai, Delhi, Chennai, Bangalore" className="searchInputNav" onSearch={onSearch} style={{ width: 200 }} />
        </Menu.Item>
        </Menu>

        <Menu mode="horizontal" className="navBarDivSecondSecond">
          <Menu.Item key="login">
            {loginCheck ? (
              <span
              style={{ textDecoration: "none", color: "whitesmoke" }}
              className=""
              onClick={() => {
                if (window.confirm("Do you want to logout")) {
                  sessionStorage.removeItem("login");
                  history.push("/");
                    window.location.reload();
                  }
                }}
                >
                LOGOUT
              </span>
            ) : (
              <span
              >
                <Link
                  to="/logIn"
                    style={{ textDecoration: "none", color: "whitesmoke" }}
                    >
                  LOGIN
                </Link>
              </span>
            )}
          </Menu.Item>
        </Menu>

    </div>
    </div>
            </div>
  );
};

export default NavBar;
