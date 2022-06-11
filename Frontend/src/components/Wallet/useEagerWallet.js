import {useEffect, useState} from 'react';
import {useAsync} from '../../hooks/useAsync';
import {useWallet} from 'use-wallet';


export const useEagerConnect = (attemptConnect) => {
    const { _web3ReactContext, connectors } = useWallet();
    const { activate, active } = _web3ReactContext;
    let {loading, err, res} =  useAsync(connectors.injected[0])
    const [injected, setInjected] = useState(null);
    const [tried, setTried] = useState(false);
  
    useEffect(() => {
      if (loading || err) {
        return;
      }
      if(!injected) {
        setInjected(res.web3ReactConnector({ chainId: `${parseInt(process.env.REACT_APP_ETHEREUM_CHAIN_ID)}` }))
      }
    }, [loading, err, res, injected]);
  
    useEffect(() => {
      attemptConnect && injected && injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch((err) => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
    }, [loading, err, injected, activate, attemptConnect]); // intentionally only running on mount (make sure it's only mounted once :))
  
    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
      if (!tried && active) {
        setTried(true);
      }
    }, [tried, active]);
  
    return tried;
  };