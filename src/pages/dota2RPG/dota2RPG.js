import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header/header';
import moment from 'moment';

export const Dota2RPG = () => {
  const [user, setUser] = useState({})
  const [isShowMatches, setShowMatches] = useState(false)
  const [matches, setMatches] = useState([{
    player_slot: '',
    radiant_win: '',
    hero_id: '',
    duration: '',
    lobby_type: '',
    game_mode: '',
    kills: 0,
    deaths: 0,
    assists: 0
  }]);
  const [character,setCharacter]=useState({
    Name:'',
    Race:'',
    Gold:'',
    XP:''
  })
  useEffect(() => {
    const { user } = JSON.parse(localStorage.getItem('data'))

    setUser(user);

    async function getDota2Stats() {
      try {
        const info = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile/${user.discordId}`);
        let data={};
       if(user.steamId){
         data = await axios.get(`https://api.opendota.com/api/players/${user.steamId}/matches`)
        
       }
       else{
         data = await axios.get(`https://api.opendota.com/api/players/${info.data.profile.SteamID}/matches`)
       }
        setMatches(data.data);
        
        setCharacter(info.data.profile)
       
      } catch (e) {
        console.log(e)
      }
    }
   
    getDota2Stats();

  }, [])
  
  const recentGame = matches[0];
  const heroes = require('./../../utils/heroes');
  const lobby_type = require('./../../utils/lobby_type');
  const game_mode = require('./../../utils/game_mode');

  const getTeamAndResult = (player_slot, radiant_win) => {
    let result = ''
    let Team = ''
    if (player_slot >= 0 && player_slot <= 127) {
      Team = 'Radiant'
      if (radiant_win) {
        result = 'Win'
      } else {
        result = 'Loss'
      }
    } else {
      Team = 'Dire'
      if (radiant_win) {
        result = 'Loss'
      } else {
        result = 'Win'
      }
    }
    return {
      Team,
      result
    }
  }

  const getHeroNameAndImage = (heroId) => {
    let heroName = '';
    let heroImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSECa11dQzB9SI5mmFy5ibqqOfxF3NGAXTIuQ&usqp=CAU';
    heroes.map(hero => {
      if (hero.id === heroId) {
        heroName = hero.localized_name
        if (hero.url_full_portrait) {
          heroImage = hero.url_full_portrait
        }
      }
    })
    return {
      heroName,
      heroImage
    }
  }
  const getTime = (duration) => {
    return moment.utc(duration * 1000).format('H:mm:ss');
  }


  const loadAllGames = () => {

    setShowMatches(true);


  }

  return (
    <><Header user={user} profile={true}></Header>
      <div className="main-content-wrapper">

        <section data-settings="particles-1" className="main-section crumina-flying-balls particles-js bg-1 medium-padding120">
          <div className="container">
            <div className="row align-center mb60">
              <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
                <header className="crumina-module crumina-heading heading--h2 heading--with-decoration">

                  <h2 className="heading-title heading--half-colored">Your <span className="weight-bold">Dota2RPG</span>
                  </h2>
                  <div style={{ color: 'white' }} className="heading-text">All BantabaBot commands are available here. For instance, use addxp button to add your experience and level up.</div>
                </header>
              </div>
            </div>
         
             {character? <div className="swiper-slide">
              <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${character.ImageUrl})`,backgroundSize:'cover',backgroundPosition:'center'}} className="crumina-module crumina-pricing-table pricing-table--small">
                <div className="pricing-thumb">
                  <img src={user.avatar} className="woox-icon" alt="ethereum" />
                  <h5 className="pricing-title">{character.Name} <span>{character.Race}</span></h5>
                  <div className="gain-drop-arrow">
                    <svg className="woox-icon icon-arrow-up arrow-up">
                      <use xlinkHref="svg-icons/sprites/icons.svg#icon-arrow-up" />
                    </svg>
                    <svg className="woox-icon icon-arrow-down arrow-down active">
                      <use xlinkHref="svg-icons/sprites/icons.svg#icon-arrow-down" />
                    </svg>
                  </div>
                </div>
                <div className="price">
                  <div className="price-sup-title">Your character Profile</div>
                  <div className="price-value">Lvl {character.Level}<div className="price-value"><i className="fas fa-coins"></i>&nbsp;${character.Gold}</div>
                    <div className="drop">XP: {character.XP}</div>
                  </div>
                </div>
                <button className="btn btn--small btn--green-light">Add XP</button>
              </div>
            </div>:<>
            <h6 style={{ color: 'white',textAlign:'center' }} className="heading-text">Seems Like you do not have a character.</h6>
            </>}
            

          </div>
        </section>
        <section className="medium-padding120">

          <div className="container">
            <div className="row sorting-container" id="portfolio-grid" data-layout="masonry" data-isotope="{&quot;masonry&quot;: { &quot;columnWidth&quot;: &quot;.grid-sizer&quot; }}">
              <div className="grid-sizer" />
              <h2>Your Recent Game</h2>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sorting-item">
                <div className="crumina-module crumina-event-item">
                  <div className="event-thumb bg-event5">
                    <div className="overlay" />
                  </div>
                  <div className="event-content">
                    <h4 className="event-title mb30">Played as {getHeroNameAndImage(recentGame.hero_id).heroName} <div style={{ color: `${getTeamAndResult(recentGame.player_slot, recentGame.radiant_win).result === 'Win' ? 'green' : 'red'}` }}><span style={{ color: 'white' }}>{getTeamAndResult(recentGame.player_slot, recentGame.radiant_win).Team}</span> ({getTeamAndResult(recentGame.player_slot, recentGame.radiant_win).result})</div></h4>
                    <a href="#" className="btn btn--medium btn--transparent btn--secondary">Details</a>
                  </div>
                  <div className="event-venue">
                    <div className="event-date">

                      <h6><i className="fas fa-clock"></i> &nbsp;{getTime(recentGame.duration)}</h6>
                    </div>
                    <div className="event-date">
                      <h6><i className="fas fa-clock"></i> &nbsp;{lobby_type[recentGame.lobby_type] ? lobby_type[recentGame.lobby_type].name : ''} ({game_mode[recentGame.game_mode] ? game_mode[recentGame.game_mode].name : ''})</h6>
                    </div>
                    <div className="author-block">
                      <div className="avatar avatar60">
                        <img src={getHeroNameAndImage(recentGame.hero_id).heroImage} alt="avatar" />
                      </div>
                      <div className="author-content">
                        <h5 className="author-name">Kills Deaths Assists</h5>
                        <h6 className="author-prof">{recentGame.kills}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{recentGame.deaths}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{recentGame.assists}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
          {!isShowMatches ?
            <div className="row align-center">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button onClick={loadAllGames} className="btn btn--large btn--transparent btn--dark-lighter" id="load-more-button" data-load-link="events-to-load.html" data-container="portfolio-grid">Load More Games</button>
              </div>
            </div>

            :
            <div className="container">
              <div className="row medium-padding120">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h6>Showing {matches.length} results.</h6>
                  <div className="mCustomScrollbar scrollable-responsive-table" data-mcs-theme="dark">
                    <table className="pricing-tables-wrap-table-blurring">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Team </th>
                          <th>Duration</th>
                          <th>Kills</th>
                          <th>Deaths</th>
                          <th>Assists</th>
                          <th>Lobby type</th>
                          <th>Game mode</th>

                          <th>More</th>
                        </tr>
                      </thead>
                      <tbody>
                        {matches.map((match, index) => {
                          return <tr key={index} className="crumina-module crumina-pricing-table pricing-table--style-table-blurring c-brown">
                            <td>
                              <div className="avatar avatar60"><img src={getHeroNameAndImage(match.hero_id).heroImage} alt="avatar" /></div>
                            </td>
                            <td>
                              <div className="pricing-thumb">

                                <h6 className="pricing-title"><span>{getHeroNameAndImage(match.hero_id).heroName}</span>&nbsp;(&nbsp;<span style={{ color: `${getTeamAndResult(match.player_slot, match.radiant_win).result === 'Win' ? 'green' : 'red'}` }}>{getTeamAndResult(match.player_slot, match.radiant_win).result}</span>&nbsp;)</h6>
                              </div>
                            </td>
                            <td>
                              <div className="currency-details-item">
                                <div className="value">{getTeamAndResult(match.player_slot, match.radiant_win).Team}</div>
                              </div>
                            </td>
                            <td>
                              <div className="currency-details-item">
                                <div className="value">{getTime(match.duration)}</div>
                              </div>
                            </td>
                            <td>
                              <div className="currency-details-item">
                                <div className="value c-green-succes">{match.kills}</div>
                              </div>
                            </td>
                            <td>
                              <div className="currency-details-item">
                                <div className="value">{match.deaths}</div>
                              </div>
                            </td>
                            <td>
                              <div className="currency-details-item">
                                <div className="value c-primary">{match.assists}</div>
                              </div>
                            </td>


                            <td>
                              <div className="pricing-thumb">

                                <h6 className="pricing-title">{lobby_type[recentGame.lobby_type] ? lobby_type[match.lobby_type].name : ''}</h6>
                              </div>
                            </td>

                            <td>
                              <div className="pricing-thumb">

                                <h6 className="pricing-title">{game_mode[recentGame.game_mode] ? game_mode[match.game_mode].name : ''}</h6>
                              </div>
                            </td>






                            <td>
                              <a href="#" className="btn btn--small btn--green-light">Details</a>
                            </td>
                          </tr>

                        })}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
            </div>
          }
        </section>







      </div>
    </>)
}