import axios from "axios";
import React, { useEffect, useState } from "react";
import { About } from "../../components/about/about";
import { Header } from "../../components/header/header";

export const Homepage = (props) => {
  const [imageColor, setImageColor] = useState("Blue");
  const [isSignIn, setSignIn] = useState(false);
  const [isLoggedIn, setLogin] = useState(false);
  const [user, setUser] = useState({});

  let counter = localStorage.getItem("counter");

  const changeColor = (arg) => {
    if (arg === "Card") {
      if (!counter) {
        localStorage.setItem("counter", 0);
        setImageColor(arg);
        return;
      }
      if (+counter >= 4) {
        localStorage["counter"] = 0;
        setImageColor(arg);
        return;
      }
      localStorage["counter"] = +counter + 1;
    }
    setImageColor(arg);
  };

  const CardList = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/English_pattern_jack_of_spades.svg/360px-English_pattern_jack_of_spades.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/English_pattern_ace_of_diamonds.svg/1200px-English_pattern_ace_of_diamonds.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Atlas_deck_10_of_hearts.svg/1200px-Atlas_deck_10_of_hearts.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/English_pattern_2_of_clubs.svg/1200px-English_pattern_2_of_clubs.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Queen_of_Hearts_%28Elizabeth_of_York%29.png",
  ];

  const colorUrl = {
    Blue: "https://cdn.discordapp.com/attachments/816676404879556621/834804868962058280/BantabaBot.png",
    Green:
      "https://cdn.discordapp.com/attachments/816676404879556621/834805990490767360/BantabaBot2.png",
    Purple:
      "https://cdn.discordapp.com/attachments/816676404879556621/834813188025221161/BantabaBot3.png",
    Card: CardList[+localStorage.getItem("counter")],
  };

  useEffect(() => {
    async function initialize() {
      try {
        if (localStorage.getItem("data")) {
          setLogin(true);
          setUser(JSON.parse(localStorage.getItem("data")).user);
        } else {
          if (props.location.search.split("=")[0] === "?userId") {
            const userId = props.location.search.split("=")[1];
            const { data } = await axios.get(
              `${process.env.REACT_APP_BASE_URL}/user/${userId}`
            );
            if (data) {
              window.localStorage.setItem("data", JSON.stringify(data));
              setLogin(true);
              setUser(data.user);
            } else {
              return;
            }
          } else {
            return;
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    initialize();
  }, [props.location.search]);

  return (
    <>
      <Header onChangeColor={changeColor}></Header>
      <div className="main-content-wrapper">
        <section
          data-settings="particles-1"
          className="main-section crumina-flying-balls particles-js bg-1 medium-padding120 responsive-align-center"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                <img
                  className="responsive-width-50"
                  src={colorUrl[imageColor]}
                  alt="image"
                />
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12">
                <header className="crumina-module crumina-heading heading--h1 heading--with-decoration">
                  <h1 className="heading-title f-size-90 weight-normal no-margin">
                    Welcome {isLoggedIn ? user.name : "Sir"}
                  </h1>
                  <h2 className="c-primary">Let's get started.</h2>
                </header>
                {isSignIn ? (
                  <>
                    <a
                      href={`${process.env.REACT_APP_BASE_URL}/auth`}
                      data-scroll
                      className="btn btn--large btn--transparent btn--secondary"
                    >
                      <i className="fab fa-discord"></i> &nbsp; Discord
                    </a>
                    <div style={{ marginTop: 30 }}>
                      <a
                        href={`${process.env.REACT_APP_BASE_URL}/auth/steam`}
                        data-scroll
                        className="btn btn--large btn--transparent btn--secondary"
                      >
                        <i className="fab fa-steam"></i> &nbsp; Steam
                      </a>
                    </div>
                  </>
                ) : isLoggedIn ? (
                  <button
                    onClick={() => {
                      window.localStorage.clear();
                      setLogin(false);
                      props.history.push("/");
                    }}
                    data-scroll
                    className="btn btn--large btn--transparent btn--secondary"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSignIn(true);
                    }}
                    data-scroll
                    className="btn btn--large btn--transparent btn--secondary"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
        <About></About>
      </div>
    </>
  );
};
