import detectEthereumProvider from '@metamask/detect-provider';
import { useEffect , useState} from "react";

export const useMetamaskDetect = () => {
    const [hasMetamask, setHasMetamask] = useState(false);
    useEffect(() => {
      async function run () {
        const provider = await detectEthereumProvider();
  
        setHasMetamask(!!provider);
      }
      run();
    },[]);
    return hasMetamask;
  }
  