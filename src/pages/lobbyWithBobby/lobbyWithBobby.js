import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header/header';
import { Lobby } from '../../components/lobby/lobby';

export const LobbyWithBobby = () => {
    const [user, setState] = useState({})
    useEffect(() => {
        const { user } = JSON.parse(localStorage.getItem('data'))

        setState(user);
    }, [])

    return (
        <>
            <Header user={user} profile={true}></Header>
            <div className="main-content-wrapper">
                <Lobby user={user}></Lobby>
               
            </div>
        </>
    )
}