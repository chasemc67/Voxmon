
import React, {useState, useEffect, useCallback} from 'react';
import VotingGrid from '../../components/VotingGrid'
// import { Link } from 'react-router-dom'
import {useWallet} from 'use-wallet';
import { submitVote, getVoxmonPreviews} from '../../api';

import { getAnalytics, logEvent } from "firebase/analytics";

import twitterLogo from '../../images/social/twitter.png';
import discordLogo from '../../images/social/discord.png';
import mediumLogo from '../../images/social/medium.png';
import loadingSpinner from '../../images/placeholder/Loading.png';

import './Voting.scss'

const Voting = () => {
    const [voteState, setVoteState] = useState([]);
    const [previewItems, setPreviewItems] = useState([{url: loadingSpinner},{url: loadingSpinner},{url: loadingSpinner},{url: loadingSpinner},{url: loadingSpinner},{url: loadingSpinner}]);
    const [hasFetched, setHasFetched] = useState(false);
    const allowedVotes = 3;
    const wallet = useWallet();
    const walletAddress = wallet.account;

    const fetchPreviews = useCallback(() => {
        setPreviewItems([{url: loadingSpinner},{url: loadingSpinner},{url: loadingSpinner},{url: loadingSpinner},{url: loadingSpinner},{url: loadingSpinner}]);
        let get = async () => {
            logEvent(getAnalytics(), 'Voting_Page_Loaded');
            const result = await getVoxmonPreviews();
            const response = await result.json();
            const items = response.map(item => ({
                ...item,
                url: item.url
            }));
            setPreviewItems(items);
            setHasFetched(true);
        }
        get();
    }, [])

    useEffect(() => {
        fetchPreviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getIdFromImageUrl = (imageUrl) => {
        const fileName = imageUrl.split('/').pop();
        return fileName.split('.')[0];
    }


    const onVoteClicked = async () => {
        submitVote(voteState.map(v => {
            return getIdFromImageUrl(previewItems[v].url);
        }), walletAddress);
        setVoteState([]);
        fetchPreviews();
    }


    const onRefreshClicked = useCallback(() => {
        logEvent(getAnalytics(), 'Voting_Refresh_Clicked');
        let _fetch = async () => {
            await fetchPreviews();
        }
        _fetch();
    }, [fetchPreviews]);

    return (
        <div className="voting">
            <div className="voting-frame">
                <div className="content-frame">
                    { !!(previewItems.length) &&
                        <VotingGrid imageUrls={previewItems.map(item => item.url)} voteState={voteState} setVoteState={setVoteState} allowedVotes={allowedVotes}/>
                    } 
                    { !!(previewItems.length === 0 && hasFetched) && 
                        <p> There aren't any voxmon to vote on at the moment </p>
                    }
                </div>
                <div className="info-frame">
                    {walletAddress ? (
                        <span id="connected-wallet-text">Connected Wallet: {String(walletAddress).substring(0, 6) +
                            "..." +
                            String(walletAddress).substring(38)}</span>
                    ) : (
                        <span id="disconnected-wallet-text">Please connect your wallet</span>
                    )}
                    <p id="votes-selected">{voteState.length}/{allowedVotes} selected</p>
                </div>
                <div className="button-frame">
                    <button id="refresh-button" onClick={onRefreshClicked}>Refresh</button>
                    <button id="vote-button" disabled={!walletAddress} onClick={onVoteClicked}>Vote</button>
                </div>
            </div>

            <div className="instructions-frame">
                <div className="content-frame">
                    <h2>Voting Instructions</h2>
                </div>
                <div className="content-frame body">
                    <span>
                            More Voxmon have come into existance than can be saved<br/>
                            <br/>
                            It's up to You, the Community, to decide who will escape first<br/>
                            <br/>
                            <br/>
                            Connect your wallet and vote on your favorite Voxmon<br/>
                            <br/>
                            The highest voted Voxmon will be minted as our Genesis Set<br/>
                            <br/>
                            <br/>
                            Any wallets which cast votes AND mint a Genesis Voxmon in the initial drop,<br/>
                            will be eligible to receive ongoing rewards for the life of the project<br/>
                            <br/>
                            <br/>
                            Rewards will be announced soon!<br/>
                            <br/>
                            Check the Discord for the most up-to-date information. 

                    </span>
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

export default Voting