import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = React.createClass({
  render: function () {
    return (
      <div className="nav">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Photo Drop!
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link active" aria-current="page" href="#main">
                  Home
                </a>
                <a className="nav-link" href="#account">
                  Profile
                </a>
                <a className="nav-link" href="#search">
                  Search
                </a>
              </div>
              <ul className="navbar-nav mr-right">
                <li className="nav-item">
                  <a
                    className="nav-link dropdown-toggle"
                    href="http://example.com"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Login/Sign Up
                  </a>
                  <div
                    className="dropdown-menu"
                    style={{ padding: "15px", paddingBottom: "10px" }}
                  >
                    <form
                      className="form-horizontal"
                      method="post"
                      acceptCharset="UTF-8"
                    >
                      <input
                        className="form-control login"
                        type="text"
                        name="username"
                        placeholder="Username.."
                      />
                      <br />
                      <input
                        className="form-control login"
                        type="password"
                        name="password"
                        placeholder="Password.."
                      />
                      <br />
                      <input
                        className="btn btn-primary"
                        type="submit"
                        name="submit"
                        defaultValue="Login"
                      />
                      <input
                        className="form-control login"
                        type="text"
                        name="username"
                        placeholder="Username.."
                      />
                      <br />
                      <input
                        className="form-control login"
                        type="text"
                        name="Create Password"
                        placeholder="Create Password.."
                      />
                      <br />
                      <input
                        className="form-control login"
                        type="Re-enter Password"
                        name
                        placeholder="Re-Enter Password.."
                      />
                      <br />
                      <input
                        className="btn btn-primary"
                        type="submit"
                        name="submit"
                        defaultValue="Sign Up"
                      />
                    </form>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  },
});

export default Nav;
