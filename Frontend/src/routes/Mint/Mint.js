import React, { useCallback, useEffect, useState} from 'react';
import {useWallet} from 'use-wallet'
import {preReleaseMintNFT, getTotalMinted, getMaxTotal, getRemainingPreReleaseMintsForAddress} from '../../utils/interact';
import './Mint.css';
import '../Landing/Landing.scss';

const Mint = () => {
    const [numMinted, setNumMinted] = useState(0);
    const [maxMinted, setMaxMinted] = useState(0);
    const [preMints, setNumPremints] = useState(0);
    const [mintTxHash, setMintTxHash] = useState(0);
    // const [mintCost, setMintCost] = useState(0);

    const wallet = useWallet();

    /*
    const mintClicked = useCallback(async () => {
        const txHash = await mintNFT();
        if (txHash) {
            watchTxHash(txHash)
            setMintTxHash(txHash);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    */

    const preReleaseMintClicked = useCallback(async () => {
        const txHash = await preReleaseMintNFT(preMints);
        if (txHash) {
            // watchTxHash(txHash)
            setMintTxHash(txHash);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preMints])

    /*
    const watchTxHash = (txHash) => {
        const interval = setInterval(async () => {
            const receipt = await getTxReceipt(txHash);
            if (receipt) {
                clearInterval(interval);
                setNumMinted(await getTotalMinted());
                setNumPremints(await getRemainingPreReleaseMintsForAddress(wallet.address));
                //setMintTxHash(receipt);
            }
        }, 1000);
    } 
    */  

    useEffect(() => {
        async function getData() {
            const [mintedTotal, maxTotal, numPreMints] = await Promise.all([getTotalMinted(), getMaxTotal(), getRemainingPreReleaseMintsForAddress(wallet.account)]);
            // setOwnedTokens(result.assets || []);
            setMaxMinted(maxTotal);
            setNumMinted(mintedTotal);
            // setMintCost(mintCost);
            setNumPremints(parseInt(numPreMints));
        }
        getData();
    }, [wallet.account])

    return (<>
            {true || Boolean(process.env.REACT_APP_ENABLE_MINT) === 'true' ? 
                (
                    <div className='landing-container'>
                        <div className="content-frame-title">
                            <div className="content-frame title-content">
                                    <h2>The First Escape</h2>
                            </div>
                            <div className="content-frame body-content">
                                <div className="text-content">
                                    <span>
                                        We think we've found a way to save them<br/>
                                        <br/>
                                        And not a minute too soon<br/>
                                        <br/>
                                        - Quickly -<br/>
                                        <br/>
                                        Free as many Voxmon as you can<br/>
                                        <br/>
                                        while there's still time<br/>
                                        <br/>
                                    </span>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <span className="mint-count">
                                        {numMinted} / {parseInt(maxMinted).toLocaleString()} escaped so far
                                    </span>
                                    <br/>
                                    <div className="mint-buttons">
                                        {preMints > 0 ? <button onClick={preReleaseMintClicked}>
                                            use {preMints} Free Pre-Mints
                                        </button> : <button>
                                            Public Mint Coming Soon
                                        </button>}
                                    </div>
                                    {mintTxHash !== 0 && <div className="mint-preview">
                                        Transaction submitted successfully!<br/>
                                        <br/>
                                        Txn Hash: {mintTxHash}
                                    </div>}

                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                )
                :
                (
                    <div className='mint-container'>
                            <div>Mint launch coming soon</div>
                    </div>
                )
            }
        </>
    );
}

export default Mint;