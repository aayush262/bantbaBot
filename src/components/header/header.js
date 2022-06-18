import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import cogoToast from "cogo-toast";
import "./header.css";

const HeaderWithoutRouter = (props) => {
  const handleChange = (e) => {
    const { value } = e.target;
    props.onChangeColor(value);
  };
  const [isAcitveHeader, setHeader] = useState(false);
  const [isMenu, setMenu] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 32) {
        setHeader(true);
      } else {
        setHeader(false);
      }
    });

    if (window.innerWidth >= 1024) {
      setMenu(true);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        setMenu(true);
      } else {
        setMenu(false);
      }
    });
  }, []);
  const clickHandler = () => {
    if (localStorage.getItem("data")) {
      props.history.push("/dota2RPG");
    } else {
      cogoToast.error("Please sign in first.");
    }
  };

  const lobbyHandler = () => {
    if (localStorage.getItem("data")) {
      props.history.push("/lobbywithbobby");
    } else {
      cogoToast.error("Please sign in first.");
    }
  };

  return (
    <header
      className={`header animated headroom--not-bottom slideDown ${
        isAcitveHeader ? "headroom--not-top slideDown" : "headroom--top"
      }`}
      id="site-header"
    >
      <div className="container">
        <div className="header-content-wrapper">
          <a href="index-2.html" className="site-logo">
            <h4>BantabaBot</h4>
          </a>
          <nav id="primary-menu" className="primary-menu">
            {/* menu-icon-wrapper */}

            <a id="menu-icon-trigger" className="menu-icon-trigger showhide">
              <span className="mob-menu--title">Menu</span>
              {isMenu ? (
                <i
                  onClick={() => {
                    setMenu(false);
                  }}
                  className="fas fa-times"
                ></i>
              ) : (
                <i
                  onClick={() => {
                    setMenu(true);
                  }}
                  className="fas fa-bars"
                ></i>
              )}
            </a>
            <ul
              className="primary-menu-menu primary-menu-indented scrollable"
              style={{
                maxHeight: "460px",
                display: `${isMenu ? "inline-block" : "none"}`,
              }}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="menu-item-has-children">
                <a className="myNavButton" onClick={lobbyHandler}>
                  Lobby with Bobby
                </a>
              </li>
              <li className="menu-item-has-children">
                <a className="myNavButton" onClick={clickHandler}>
                  Dota2RPG
                </a>
              </li>
              <li className="menu-item-has-mega-menu menu-item-has-children">
                <Link to="/">Movies</Link>
              </li>
              <li className="menu-item-has-mega-menu menu-item-has-children">
                <Link to="/">TV Shows</Link>
              </li>
              <li className="menu-item-has-mega-menu menu-item-has-children">
                <Link to="/anime">Anime</Link>
              </li>
            </ul>
          </nav>
          {!props.profile ? (
            <select
              onChange={handleChange}
              className="woox--select language-switcher"
              data-minimum-results-for-search="Infinity"
              data-dropdown-css-class="language-switcher-dropdown"
            >
              <option value="Blue">Bantaba Blue</option>
              <option value="Green">Bantaba Green</option>
              <option value="Purple">Bantaba Purple</option>
              <option value="Card">Bantaba Card</option>
            </select>
          ) : (
            <>
              <div className="author-block">
                <div className="avatar avatar60">
                  <img src={props.user.avatar} alt="avatar" />
                </div>
                <div className="author-content">
                  <a href="#" className="author-name">
                    {props.user.name}
                  </a>
                  <div className="author-prof">
                    <button
                      className="myButton"
                      onClick={() => {
                        localStorage.clear();
                        props.history.push("/");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export const Header = withRouter(HeaderWithoutRouter);
