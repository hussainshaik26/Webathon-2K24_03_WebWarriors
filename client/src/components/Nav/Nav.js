import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div className="nav-bar fs-3">
      <div className="d-flex justify-content-between align-items-center container">
        {/* <div className="logo">
          <img
            src="https://logo.com/image-cdn/images/kts928pd/production/d12dfdbd6b7501faf694ac42775f19451aee8805-324x328.png?w=1080&q=72"
            alt="logo" width="100px"
          />
        </div>
        <ul className="nav justify-content-around w-50">
          <li className="nav-item rounded">
            <NavLink className="nav-link" to="home">
              Home
            </NavLink>
          </li>
          <li className="nav-item rounded">
            <NavLink className="nav-link" to="signin">
              Signin
            </NavLink>
          </li>
          <li className="nav-item rounded">
            <NavLink className="nav-link" to="signup">
              Signup
            </NavLink>
          </li>
        </ul> */}

        <div>
          <img
            src="https://logo.com/image-cdn/images/kts928pd/production/d12dfdbd6b7501faf694ac42775f19451aee8805-324x328.png?w=1080&q=72"
            alt="logo"
            width="90"
            height="90"
          />
        </div>
        <div>
          <input placeholder="Search article" className="p-2 rounded search" />
        </div>
        <div>
          <ul className="nav justify-content-around">
            <li className="m-4 nav-item">
              <NavLink className="nav-link" to="/add-article">
                Write New Article
              </NavLink>
            </li>
            <li className="m-4 nav-item">
              <NavLink className="nav-link" to="/user-dashboard">
                User Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;