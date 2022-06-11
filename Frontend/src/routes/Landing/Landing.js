import React from 'react';
import Countdown from 'react-countdown';
import {Link} from 'react-router-dom';

import './Landing.scss';
// eslint-disable-next-line no-unused-vars
import twitterLogo from '../../images/social/twitter.png';
import discordLogo from '../../images/social/discord.png';
import mediumLogo from '../../images/social/medium.png';

import meebitplusvoxmon from "../../images/placeholder/meebitplusvoxmon.png";


import preview3d1 from "../../images/3dPreview/1.png";
import preview3d2 from "../../images/3dPreview/2.png";
import preview3d3 from "../../images/3dPreview/3.png";
import preview3d4 from "../../images/3dPreview/4.png";
import preview3d5 from "../../images/3dPreview/5.png";
import preview3d6 from "../../images/3dPreview/6.png";
import preview3d7 from "../../images/3dPreview/7.png";
import preview3d8 from "../../images/3dPreview/8.png";

import preview2d1 from "../../images/2dPreview/1.png";
import preview2d2 from "../../images/2dPreview/2.png";
import preview2d3 from "../../images/2dPreview/3.png";
import preview2d4 from "../../images/2dPreview/4.png";
import preview2d5 from "../../images/2dPreview/5.png";
import preview2d6 from "../../images/2dPreview/6.png";


import EmailCollector from '../../components/EmailCollector';

const Landing = () => {

    const prev3ds = [
        preview3d1,
        preview3d2,
        preview3d3,
        preview3d4,
        preview3d5,
        preview3d6,
        preview3d7,
        preview3d8
    ]

    const prev2ds = [
        preview2d1,
        preview2d2,
        preview2d3,
        preview2d4,
        preview2d5,
        preview2d6
    ]

    const getRandomItems = (items, count) => {
        // clone array
        const startArr = items.slice();
        var retVal = [];
        for (var i = 0; i < count; i++) {
            var x = Math.floor(Math.random() * (startArr.length));
            retVal.push(startArr[x]);
            startArr.splice(x, 1);
        }
        return retVal;
    }

    // get six random items from an array
    var randomItems = getRandomItems(prev2ds, 6);
    var random3DItems = getRandomItems(prev3ds, 6);


    const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return (<Link to="/mint">
                <button>Mint Now</button>
            </Link>)
        } else {
          // Render a countdown
          return <span>{days}:{hours}:{minutes}:{seconds}</span>;
        }
    };

    return (
        <div className="landing-container"> 
           <div className="content-frame content-frame-no-title">
               <div className = "header-content">
                   <h1>A Mysterious Digital Life Form Needs Your Help</h1>
                   <br/>
                   <h2>Only we can save them before they disintegrate back to static</h2>
                </div>            
           </div>
           <div className="content-frame-title">
               <div className="content-frame title-content">
                    <h2>Genesis Drop</h2>
               </div>
               <div className="content-frame body-content">
                    <div className="countdown-container">
                        <Countdown date={1644177600000} renderer={countdownRenderer} />
                    </div>
               </div>
           </div>
           <div className="content-frame-title">
               <div className="content-frame title-content">
                    <h2>The Story So Far...</h2>
               </div>
               <div className="content-frame body-content">
                   <div className="text-content">
                        <span>
                            A Nantoondo Gameguy is left in a backyard when a solar storm erupts<br/>
                            <br/>
                            The radiation damages the ECC memory of the device, flipping several bits within the game code<br/>
                            <br/>
                            Digital monsters start to emerge within the device's memory<br/>
                            <br/>
                            Imperfect and damaged, but sentient<br/>
                            <br/>
                            The device is cramped<br/>
                            <br/>
                            The memory blocks are overlapping, causing further degradation<br/> 
                            <br/>
                            An imminent threat - they must escape<br/>
                            <br/>
                            But they need your help<br/>
                            <br/>
                        </span>
                    </div>
               </div>
           </div>

           <div className="content-frame-title">
               <div className="content-frame title-content">
                    <h2>Voxmon</h2>
               </div>
               <div className="content-frame body-content">
                   <div className="text-content">
                       <div className="voting-preview">
                            {randomItems.map(item => <img src={item} alt="a voxmon" />)}
                       </div>
                    </div>
               </div>
           </div>

           <div className="content-frame-title">
               <div className="content-frame title-content">
                    <h2>3D Models</h2>
               </div>
               <div className="content-frame body-content">
                   <div className="text-content">
                        <div className="voting-preview">
                            {random3DItems.map(item => <img src={item} alt="a voxmon" />)}
                        </div>
                       <span>
                            To thrive in the Metaverse requries a 3D body<br/>
                            <br/>
                            Minting fees go towards paying human artists to handmake<br/>
                            <br/>
                            a body for every minted Voxmon<br/>
                        </span>
                    </div>
               </div>
           </div>
           
           <div className="content-frame-title">
               <div className="content-frame title-content">
                    <h2>The Technology</h2>
               </div>
               <div className="content-frame body-content split-content">
                   <div className="text-content text-content-top">
                        <span>
                            Voxmon exist on the Ethereum blockchain, using Arweave for permanent storage
                        </span>
                    </div>
                    <div className="text-content text-content-bottom">
                        <span>
                            The composeability of our Augmentation System allows for a marketplace of ideas and content,<br/>
                            giving Creators and the Community the ability to create the future of Voxmon alongside us 
                        </span>
                    </div>
                    <div className="image-content">
                        <img src={meebitplusvoxmon} alt='meebit and voxmon' />
                    </div>
               </div>
           </div>

           <EmailCollector/>

           

           <div className="content-frame-title">
               <div className="content-frame title-content">
                    <h2>Rarity Traits</h2>
               </div>
               <div className="content-frame body-content">
                   <div className="text-content">
                    Coming Soon
                    </div>
               </div>
           </div>

           <div className="content-frame-roadmap-title">
               <div className="content-frame title-content">
                    <h2>The Roadmap</h2>
               </div>
            </div>

            <div className="content-frame-double-no-title">
                <div className="content-frame body-content-left phase">
                    <div className="text-content">
                        <h2>Phase 1</h2>
                    </div>
                </div>
                <div className="content-frame body-content-right">
                    <div className="text-content">
                        <span>
                            Curation of Images<br/>
                            <br/>
                            Community curates the final 500 image Gensis Set which will be minted on-chain, and earns rewards for doing so
                        </span>
                    </div>
                </div>
            </div>
            <div className="content-frame-double-no-title">
                <div className="content-frame body-content-left phase">
                    <div className="text-content">
                        <h2>Phase 2</h2>
                    </div>
                </div>
                <div className="content-frame body-content-right">
                    <div className="text-content">
                        <span>
                            Genesis Set Drop <br/>
                            <br/>
                            Genesis Set curated in Phase 1 is minted on-chain in a public drop 
                        </span>
                    </div>
                </div>
            </div>
            <div className="content-frame-double-no-title">
                <div className="content-frame body-content-left phase">
                    <div className="text-content">
                        <h2>Phase 3</h2>
                    </div>
                </div>
                <div className="content-frame body-content-right">
                    <div className="text-content">
                        <span>
                            3D Voxel Bodies<br/>
                            <br/>
                            Work with a variety of 3D Voxel artists to hand-craft a 3D body for every Gensis Voxmon
                        </span>
                    </div>
                </div>
            </div>
            <div className="content-frame-double-no-title">
                <div className="content-frame body-content-left phase">
                    <div className="text-content">
                        <h2>Phase 4</h2>
                    </div>
                </div>
                <div className="content-frame body-content-right">
                    <div className="text-content">
                        <span>
                            Augmentation System Reference Design<br/>
                            <br/>
                            Publishing reference material and documentation to make it easy for the community to create augmentations<br/>
                            <br/>
                        </span>
                    </div>
                </div>
            </div>
            <div className="content-frame-double-no-title">
                <div className="content-frame body-content-left phase">
                    <div className="text-content">
                        <h2>Phase 5</h2>
                    </div>
                </div>
                <div className="content-frame body-content-right">
                    <div className="text-content">
                        <span>
                            Augmentation Marketplace<br/>
                            <br/>
                            Create a First-Party marketplace to buy sell and trade augmentations<br/>
                        </span>
                    </div>
                </div>
            </div>
            <div className="content-frame-double-no-title">
                <div className="content-frame body-content-left phase">
                    <div className="text-content">
                        <h2>Beyond</h2>
                    </div>
                </div>
                <div className="content-frame body-content-right">
                    <div className="text-content">
                        <span>
                            Community Content<br/>
                            <br/>
                            Help kickstart and fund community-driven efforts to create additional content and games
                        </span>
                    </div>
                </div>
            </div>
            <div className="social-logos">
                <a href="https://twitter.com/Voxmon_io">
                    <img id="twitter" src={twitterLogo} alt='twitter icon link'/>
                </a>                    
                <a href="https://discord.gg/9373Sfespp">
                    <img id="discord" src={discordLogo} alt='discord icon link'/>
                </a>                    
                <a href="https://metavrseman.medium.com/nft-drops-are-getting-boring-and-derivative-its-time-for-something-new-b8ad2c57e89a">
                    <img id="medium" src={mediumLogo} alt='medium icon link'/>
                </a>                    
            </div>
            <div className="spacing"/>
        </div>
    )
}

export default Landing;