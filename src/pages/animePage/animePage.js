import React from 'react';
import { Anime } from '../../components/anime/anime';
import { Header } from '../../components/header/header';


export const AnimePage = () => {
   

    return (
        <>
            <Header></Header>
            <div className="main-content-wrapper">
                <Anime></Anime>
            </div>
        </>
    )
}