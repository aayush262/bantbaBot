import React, { useEffect, useState } from 'react';
import { Link,withRouter } from 'react-router-dom';
import cogoToast from 'cogo-toast';


const HeaderWithoutRouter= (props)=>{
    const handleChange=(e)=>{
      const {value} = e.target;
      props.onChangeColor(value)
     
    }
    const [isAcitveHeader,setHeader]= useState(false);
    useEffect(()=>{
      window.addEventListener('scroll',()=>{
        if(window.pageYOffset>32){
          setHeader(true)
        }else{
          setHeader(false);
        }
      })
    },[])
    const clickHandler=()=>{
      if(localStorage.getItem('data')){
        props.history.push('/dota2RPG')
      }else{
        cogoToast.error('Please sign in first.')
      }
    }
    
    return (
        <header className={`header animated headroom--not-bottom slideDown ${isAcitveHeader?'headroom--not-top slideDown':'headroom--top'}`} id="site-header">
        <div className="container">
          <div className="header-content-wrapper">
            <a href="index-2.html" className="site-logo">
              <h4>BantabaBot</h4>
            </a>
            <nav id="primary-menu" className="primary-menu">
              {/* menu-icon-wrapper */}
              <a href="#" id="menu-icon-trigger" className="menu-icon-trigger showhide">
                <span className="mob-menu--title">Menu</span>
                <span id="menu-icon-wrapper" className="menu-icon-wrapper">
                  <svg width="1000px" height="1000px">
                    <path id="pathD" d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800" />
                    <path id="pathE" d="M 300 500 L 700 500" />
                    <path id="pathF" d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200" />
                  </svg>
                </span>
              </a>
              <ul className="primary-menu-menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="menu-item-has-children">
                  <Link to="/">Lobby with Bobby</Link>
                 
                </li>
                <li className="menu-item-has-children">
                  <a className="myNavButton" onClick={clickHandler}>Dota2RPG</a>
                 
                </li>
                <li className="menu-item-has-mega-menu menu-item-has-children">
                  <Link to="/">Movies</Link>
                </li>
                <li className="menu-item-has-mega-menu menu-item-has-children">
                  <Link to="/">TV Shows</Link>
                </li>
                <li className="menu-item-has-mega-menu menu-item-has-children">
                  <Link to="/">More</Link>
                </li>
              </ul>
            </nav>
            {!props.profile?<select onChange={handleChange} className="woox--select language-switcher" data-minimum-results-for-search="Infinity" data-dropdown-css-class="language-switcher-dropdown">
              <option value="Blue">Bantaba Blue</option>
              <option value="Green">Bantaba Green</option>
              <option value="Purple">Bantaba Purple</option>
            </select>:<>
            <div className="author-block"><div className="avatar avatar60"><img src={props.user.avatar} alt="avatar" /></div><div className="author-content"><a href="#" className="author-name">{props.user.name}</a><div className="author-prof"><button className='myButton' onClick={()=>{localStorage.clear(); props.history.push('/')}}>Logout</button></div></div></div>
            </>}

          </div>
        </div>
      </header>
    )
}

export const Header = withRouter(HeaderWithoutRouter)