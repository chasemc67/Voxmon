import React from 'react';

import voxmonPurple from "../../images/placeholder/voxmon_purple.png";
import voxmonBlue from "../../images/placeholder/voxmon_blue.png";
import voxmonRed from "../../images/placeholder/voxmon_red.png";
import voxmonGold from "../../images/placeholder/voxmon_gold.png";
import voxmonGreen from "../../images/placeholder/voxmon_green.png";
import voxmonOrange from "../../images/placeholder/voxmon_orange.png";

import DegradingImage from '../DegradingImage';

const DegradingGrid = (props) => {
    // eslint-disable-next-line no-unused-vars
    let imageURLs = props.images;

    let imageArr = [
        voxmonPurple,
        voxmonBlue,
        voxmonRed,
        voxmonGold,
        voxmonGreen,
        voxmonOrange
    ]

    return(
        <div className="Degrading-Grid">
            {imageArr.map( (image, idx) => {
                return <DegradingImage imageFile={image} arrIdx={idx} degradationRate={0.6} degradationOffset={0} />
            })}
        </div>
    )
}

export default DegradingGrid;