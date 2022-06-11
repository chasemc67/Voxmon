import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../../api'
import './SingleView.scss';


const transformIPFSURL = (url = '') => {
    let ipfsUrl = url.replace('ipfs://', 'https://ipfs.io/ipfs/');
    return ipfsUrl;
}

const SingleView = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    
    
    useEffect(() => {
        process.env.REACT_APP_ENABLE_SINGLE_VIEW && getToken(id).then((res) => {
            return res.json();
        }).then(data => {
            if (data.error) {
                setImageUrl(null);
                setErrorMessage(data.error);
            } else {
                let url = data.image;
                if (data.image.includes('ipfs://')) {
                    url = transformIPFSURL(data.image);
                }
                setErrorMessage('');
                setImageUrl(url);
            }
        }).catch(res => {
            setImageUrl(null);
            setErrorMessage(res.error);
        });

    }, [id])

       if ( process.env.REACT_APP_ENABLE_SINGLE_VIEW ) {
            return (
                <div className="singleview-frame">
                    <div className='content-heading'/>
                    {imageUrl && <img alt={`display`} className="content-image" src={imageUrl}></img>}
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            );
        } else {
          return (
                <div className="singleview-frame">
                    <div className='content-heading'/>
                    <p>View Voxmon details soon</p>
                </div>
            )
        }
}


export default SingleView;