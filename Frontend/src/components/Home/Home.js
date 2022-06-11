import React from 'react';
import Navigation from '../Navigation';
import Routes from '../../routes/Routes';
import BackDrop from '../Backdrop';

import './Home.scss'
const Home = (props) => {

return (
    <>
        <BackDrop/>
        <div className="header">
            <Navigation />
        </div>
        <div className="mainContent">
            <Routes />
        </div>
    </>
)} 

export default Home;