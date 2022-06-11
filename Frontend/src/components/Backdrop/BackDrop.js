import React from 'react';
import {Canvas} from '../Canvas';
import './BackDrop.css'

const BackDrop =  (props) => {
    const makeStars = (count) => {
        const out = [];
        for (let i = 0; i < count; i++) {
            const s = {
                x: Math.random() * 1600 - 800,
                y: Math.random() * 900 - 450,
                z: Math.random() * 1000
            };
            out.push(s);
        }
        return out;
    };

    const moveStars = (distance) => {
        const count = stars.length;
        for (var i = 0; i < count; i++) {
            const s = stars[i];
            s.z -= distance;
            while (s.z <= 1) {
                s.z += 1000;
            }
        }
    };

    let stars = makeStars(1000);

    const draw = function(ctx, frame) {

        if (frame % 5 !== 0) {
            return;
        }

        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
      
        let w = ctx.canvas.width
        let h = ctx.canvas.height;

        
        const clear = () => {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, w, h);
        };

        const putPixel = (x, y, brightness) => {
            const intensity = brightness * 255;
            const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
            ctx.fillStyle = rgb;
            let size = 2;
            ctx.fillRect(x, y+size, size, size);
            ctx.fillRect(x, y-size, size, size);
            ctx.fillRect(x, y, size, size);
            ctx.fillRect(x-size, y, size, size);
            ctx.fillRect(x+size, y, size, size);
        };

        moveStars(0.5);

        clear();

        const cx = w / 2;
        const cy = h / 2;

        const count = stars.length;
        for (var i = 0; i < count; i++) {
            const star = stars[i];

            const x = cx + star.x / (star.z * 0.001);
            const y = cy + star.y / (star.z * 0.001);

            if (x < 0 || x >= w || y < 0 || y >= h) {
                continue;
            }

            const d = star.z / 1000.0;
            const b = 1 - d * d;

            putPixel(x, y, b);
        }
    }


    return (
        <div className="canvasBackdrop">
            <Canvas draw={draw} options={{}} width={"100%"} height={"100%"}></Canvas>
        </div>
    );
}

export default BackDrop;