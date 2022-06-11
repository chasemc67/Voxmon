import React from 'react';

import classNames from 'classnames';

// import DegradingImage from '../DegradingImage';
import './VotingGrid.scss';

const VotingGrid = (props) => {
    // eslint-disable-next-line no-unused-vars
    let imageURLs = props.imageUrls;

    const handleClick = (idx) => {
        if (props.voteState.indexOf(idx) === -1) {   
            if (props.voteState.length < props.allowedVotes) {
                props.setVoteState([...props.voteState, idx]);
            }
        } else {
            props.setVoteState(props.voteState.filter(item => item !== idx));
        }
    }

    return(
        <div className="voting-grid">
            {imageURLs.map( (image, idx) => {
                return (
                    <div className={classNames("degrading-image-frame", {"selected": props.voteState.indexOf(idx)> -1})} onClick={() => handleClick(idx)}>
                        <img className="degrading-image" src={image} alt={"a voxmon"} />
                    </div>
                )
            })}
        </div>
    )
}

export default VotingGrid;