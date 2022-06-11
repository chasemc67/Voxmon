import React from 'react';
import './Navigation.css';
import {Link} from 'react-router-dom'
import Wallet from '../Wallet';
import {AccountButton} from '../../AccountButton';

const Navigation = (props) => {
    
    return (
        <nav className="navbar">
            <Link className="left nav-links" to="/home">VOXMON</Link>
            <ul className="right main-nav" id="js-menu">
                {/* <li>
                    <Link className="nav-links" to="/rarity">Rarity</Link>
                </li>
                <li>
                    <Link className="nav-links" to="/about">About</Link>
                </li>
                { process.env.REACT_APP_WALLET_ENABLED === 'true' && 
                    <li>
                        <Link className="nav-links" to="/mint">Mint</Link>
                    </li>
                }   */}
                <li>
                    <a className="nav-links" href="https://twitter.com/Voxmon_io">Twitter</a>  
                </li>
                <li>
                    <a className="nav-links" href="https://discord.gg/9373Sfespp">Discord</a>  
                </li>
                <li>
                    <a className="nav-links" href="https://metavrseman.medium.com/nft-drops-are-getting-boring-and-derivative-its-time-for-something-new-b8ad2c57e89a">Medium</a>  
                </li>
                    <li>
                        <AccountButton />
                    </li>
                {
                    process.env.REACT_APP_WALLET_ENABLED === 'true' && <li>
                        <Wallet />
                    </li>
                }
            </ul>
        </nav>
    )

}

export default Navigation;