import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import { Dota2RPG } from './pages/dota2RPG/dota2RPG';
import { Homepage } from './pages/homepage/homepage';


export const AppRoutes = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path= '/' component={Homepage} ></Route>
                    <Route exact path ='/dota2RPG' component={Dota2RPG}></Route>
                    <Redirect to='/'></Redirect>
                </Switch>
            </Router>
        </>
    )
}