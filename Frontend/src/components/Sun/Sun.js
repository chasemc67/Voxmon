/* eslint-disable no-redeclare */
import React from 'react';
import {Canvas} from '../Canvas';
import './Sun.scss';

const Sun = (props) => {
    const draw = function(ctx, frame) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        var x = ctx.canvas.width / 2;
        var y = -800;
        var radius = 1000; 
        var startAngle = 0;
        var endAngle = Math.PI;
        var counterclockwise = false;
        ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
        ctx.fill();

        ctx.lineWidth = 5;
        ctx.beginPath();
        var x = ctx.canvas.width / 2;
        var y = -800;
        var radius = 1000; 
        var startAngle = 0;
        var endAngle = Math.PI;
        var counterclockwise = false;
        ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
        ctx.stroke();

        drawRays(ctx, frame);
    }

    const drawRay = function(ctx, frame, ang) {
        var rayWidth = 25;
        var rayLength = 150;
        var rayOffset = 800 + (frame % 250);
        var midPoint = ctx.canvas.width / 2;

        var angle = (ang) % 360;
        // ctx.clearRect(0, 0, ctx.canvas.width, canvas.height);

        ctx.save();
        ctx.fillStyle = `rgba(255, 165, 0, ${1-(frame%250) / 250})`;

        ctx.translate(midPoint, -800); // First translate the context to the center you wish to rotate around.
        ctx.rotate( angle*Math.PI/180 ); // Then do the actual rotation.
        ctx.translate(midPoint * -1 ,0); // Then translate the context back.

        ctx.fillRect(midPoint - (rayWidth / 2), rayOffset, rayWidth, rayLength);

        ctx.restore();
    }

    const drawRays = function(ctx, frame) {
        for (var i = 0; i < 360; i += 8) {
            drawRay(ctx, frame, i);
        }
    }

    return (
        <div className="Sun">
            <Canvas draw={draw} options={{}} width={"1200"} height={"2500"}></Canvas>
        </div>
    )
}

export default Sun;