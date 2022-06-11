import React , {useEffect, useRef} from 'react';
import { Canvas } from '../Canvas';
import './DegradingImage.scss';

const DegradingImage = (props) => {
    let imageWidth = useRef(0);
    let imageHeight = useRef(0);
	let originalImageData = useRef(null); 
    let imageData = useRef(null);
    let degradationLevel = 100;

	let key = props.arrIdx; // adding 1 so it makes sense for index 0
	let degradationRate = props.degradationRate;
	let degradationOffset = props.degradationOffset;

	const hasDrawn = useRef(false);
    const image = useRef(new Image());
	image.current.crossOrigin = "Anonymous";
	image.current.src = `${props.imageFile}`;
	useEffect(() => {
		image.current.addEventListener('load', function() {
			const canvas = document.createElement('canvas');
			canvas.width = image.current.width;
			canvas.height = image.current.height;
	
			imageWidth.current = canvas.width;
			imageHeight.current = canvas.height;
	
			const context = canvas.getContext('2d');
			context.drawImage(image.current, 0, 0);
	
			originalImageData.current = context.getImageData(0, 0, canvas.width, canvas.height);
			// copy image data
			var imageDataCopy = new Uint8ClampedArray(originalImageData.current.data);
			imageData.current = new ImageData(imageDataCopy, imageWidth.current, imageHeight.current);
			
		}, false);
	}, [])

    const draw = function(ctx, frame) {
		if (!imageData.current) {
			return;
		}
		if (!hasDrawn.current && imageData.current) {
			ctx.canvas.width = image.current.width;
        	ctx.canvas.height = image.current.height;

			hasDrawn.current = true
			// getPixels(imageWidth, imageHeight, imageWidth, imageHeight);
			// ctx.putImageData(imageData, 0, 0);
		}
        if (frame % 60 !== 0) {
            return; 
        }

		if (frame < key * degradationOffset * 60)
		{
			return;
		}

        degradationLevel = degradationLevel * degradationRate;
		if (degradationLevel < 1) {
			return;
		}

		if(!originalImageData.current) {
			return;
		}

		var imageDataCopy = new Uint8ClampedArray(originalImageData.current.data);
		imageData.current = new ImageData(imageDataCopy, imageWidth.current, imageHeight.current);

        const outputImageWidth = getOutputPixelWidthHeight(imageWidth.current, degradationLevel);
        const oputputImageHeight = getOutputPixelWidthHeight(imageHeight.current, degradationLevel);

        getPixels(outputImageWidth, oputputImageHeight, ctx.canvas.width, ctx.canvas.height);
        ctx.putImageData(imageData.current, 0, 0);
    }

    const getPixels = function (numXBlocks, numYBlocks, xsize, ysize) {
		const blockWidth = Math.ceil(xsize / numXBlocks);
		const blockHeight = Math.ceil(ysize / numYBlocks);
		
		for (let y = 0; y < numYBlocks; y++) {
			for (let x = 0; x < numXBlocks; x++) {
				const startX = x * blockWidth;
				const startY = y * blockHeight;
				const endX = Math.min((x + 1) * blockWidth, xsize);
				const endY = Math.min((y + 1) * blockHeight, ysize);
				const result = getAveragePixel(startX, startY, endX, endY, imageData.current);
				writeValueToImageSpan(startX, startY, endX, endY, result.red, result.green, result.blue, result.alpha, imageData.current);
			}
		}
	}

    // inputDimension: the width or height of the image you're trying to get the new pixel count for
    // percentrageDegraded: number from 1 to 100, one being not degraded at all
    const getOutputPixelWidthHeight = function(inputDimension, percentageDegraded) {
        const degradedVal = Math.max(percentageDegraded, 1);
        return inputDimension * (1/degradedVal);
    }

    const getPixelFromImage = function(x, y, imageData) {
        const index = (y * imageData.width + x) * 4;
		const pixel = {
			red: imageData.data[index],
			green: imageData.data[index + 1],
			blue: imageData.data[index + 2],
			alpha: imageData.data[index + 3]
		};
		return pixel
    }

    const writePixelToImage = function (x, y, imageData, r, g, b, a) {
        const index = (y * imageData.width + x) * 4;
		imageData.data[index] = r;
		imageData.data[index + 1] = g;
 		imageData.data[index + 2] = b;
 		imageData.data[index + 3] = a;
    }

    // Write an rgba pixel to some span in imageData
	const writeValueToImageSpan = function (start_x, start_y, end_x, end_y, r, g, b, a, imageData) {
		for (var m = start_y; m < end_y; m++){
			for (var n = start_x; n < end_x; n++) {
				writePixelToImage(n, m, imageData, r, g, b, a);
			}
		}
	}

    const getAveragePixel = function (start_x, start_y, end_x, end_y, imageData) {
		let pixelCount = 0;
		let averagePixel = {
			red: 0,
			green: 0,
			blue: 0,
			alpha: 0
		};	

		for (var i = start_y; i < end_y; i++){
			for (var j = start_x; j < end_x; j++) {
				pixelCount += 1;
				var pixel = getPixelFromImage(j, i, imageData);
				averagePixel.red += pixel.red;
				averagePixel.green += pixel.green;
				averagePixel.blue += pixel.blue;
				averagePixel.alpha += pixel.alpha;
			}
		}

		averagePixel.red = averagePixel.red / pixelCount;
		averagePixel.green = averagePixel.green / pixelCount;
		averagePixel.blue = averagePixel.blue / pixelCount;
		averagePixel.alpha = averagePixel.alpha / pixelCount;

		return averagePixel;
	}

    return (
        <div className="degrading-image">
            <Canvas draw={draw} options={{}} width={"100%"} height={"100%"}></Canvas>
        </div>
    )
}

export default DegradingImage;