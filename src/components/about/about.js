import React from 'react';
import './about.css'

export const About = () => {
    return (
        <section style={{backgroundColor:'white'}} className="medium-padding120 responsive-align-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <header className="crumina-module crumina-heading heading--h2 heading--with-decoration">
                            <div className="heading-sup-title">About</div>
                            <h2 className="heading-title weight-normal">
                  <span style={{color:'#ffba00'}} className="weight-bold">How it works</span></h2>
                            <div className="heading-text">Hi, I am Yugesh Chandra Bantawa Rai, creator of BantabaBot. Organize lobby games, get your game history and many more here on BantabaBot.
                </div>
                <div className="heading-text">BantabaBot, originally created as a discord bot is now available to all through our web app.
                            You can now get access to all the BantabaBot API via bantababot website. Login with steam or discord and start using it.
                </div>
                
                        </header>
                        
                        <div className="btn-market-wrap mt60">
                           
                            <a href="#" className="btn btn--market btn--google btn--with-icon btn--icon-left">
                                <svg className="woox-icon icon-if-59-play-843782">
                                    <use xlinkHref="svg-icons/sprites/icons.svg#icon-if-59-play-843782" />
                                </svg>
                                <div className="text">
                                    <span className="sup-title">Coming soon on</span>
                                    <span className="title">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mt30">
                        <img className="responsive-width-50" src="https://cdn.discordapp.com/attachments/816676404879556621/834827392307953754/10012809_650925188312610_8178983168984626864_o-removebg-preview.png" alt="phone" />
                    </div>
                </div>
            </div>
        </section>
    )
}