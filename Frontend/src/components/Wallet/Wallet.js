import { Popover, PopoverContent } from "../Popover";
import './Wallet.css'
import {useWallet} from 'use-wallet';
import { useEagerConnect } from './useEagerWallet';
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {isMobile} from '../../utils/client';
import { useMetamaskDetect } from "../../hooks/useDetectMetamask";



const Wallet = () => {

  const wallet = useWallet();
  const walletAddress = wallet.account;
  const [walletWasConnected, setWalletWasConnected] =  useLocalStorage('__VOXMON_WALLET_CONNECTED', false);
  const hasMetaMask = useMetamaskDetect();
  
  useEagerConnect(walletWasConnected)


  const connectWalletPressed = async () => {
    if (wallet.status === 'disconnected' || (wallet.status === 'error')) {
      if (wallet.status === 'error') {
        console.error("You need to connect your wallet to the Ethereum Main Network");
      }

      //Determine Connector
      let connector;
      if (isMobile() && hasMetaMask) { //Metamask browser
        connector = process.env.REACT_APP_WALLET_DESKTOP_CONNECT;
      } else if (isMobile() && !hasMetaMask) { //Mobile browser
        connector = process.env.REACT_APP_WALLET_MOBILE_CONNECT;
      } else { // desktop browser
        connector = process.env.REACT_APP_WALLET_DESKTOP_CONNECT;
      }

      await wallet.connect(connector)
      setWalletWasConnected(true)
    }
    
  };

  const disconnectWalletPressed = async () => {
    wallet.reset()
    setWalletWasConnected(false)
  }

  return (
    <>
      <Popover>
        {!isMobile() && !hasMetaMask ? 
          (
            <button className="navButton">
              <a href="https://metamask.io/download">Install MetaMask</a>
            </button>
          )
        :
          (<button className="navButton" onClick={connectWalletPressed}>
            {walletAddress ? (
              "Connected: " +
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>
        )}
        <PopoverContent hidden={!walletAddress}>
          <button id="signout_button" onClick={disconnectWalletPressed}>
            Disconnect
          </button>
        </PopoverContent>
      </Popover>
    </>
  )
}
export default Wallet;