
if (typeof DRAWGUITAR === 'undefined') DRAWGUITAR = {}; 

const scale=2;
const xStart =10;
const yStart =30;
const topWidth = 5;
const yFretStart =yStart + topWidth;

const fretHeight=50;
const fretWidth=30;

const circleRadius=20;
const fretboardHeight=200;

(function(root) { 'use strict';
root.drawFretboard = function () {
    var scale = 2;
    var c = document.getElementById("fretBoard");
    var ctx = c.getContext("2d");

    // vertical lines
    ctx.beginPath();
    ctx.moveTo(xStart * scale, yStart * scale);
    ctx.lineTo(xStart * scale, fretboardHeight * scale);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(40 * scale, 30 * scale);
    ctx.lineTo(40 * scale, 200 * scale);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(70 * scale, 30 * scale);
    ctx.lineTo(70 * scale, 200 * scale);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100 * scale, 30 * scale);
    ctx.lineTo(100 * scale, 200 * scale);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(130 * scale, 30 * scale);
    ctx.lineTo(130 * scale, 200 * scale);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(160 * scale, 30 * scale);
    ctx.lineTo(160 * scale, 200 * scale);
    ctx.stroke();
    // horizontal lines
    ctx.beginPath();
    ctx.moveTo(10 * scale, 30 * scale);
    ctx.lineTo(160 * scale, 30 * scale);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(10 * scale, 35 * scale);
    ctx.lineTo(160 * scale, 35 * scale);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(10 * scale, 85 * scale);
    ctx.lineTo(160 * scale, 85 * scale);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(10 * scale, 135 * scale);
    ctx.lineTo(160 * scale, 135 * scale);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(10 * scale, 185 * scale);
    ctx.lineTo(160 * scale, 185 * scale);
    ctx.stroke();
    };

    root.drawCircle = function (row, col) {
        var c = document.getElementById("fretBoard");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        row = row + 1;
        var x = (xStart*scale) + ((col * fretWidth) * scale);
        var y = (yFretStart * scale) + (row * (fretHeight *scale)) - ((fretHeight*scale)/2)
        ctx.arc(x, y ,circleRadius,0,2*Math.PI);
        ctx.fillStyle="#37FDFC";
        ctx.fill();        
    
    };


    // frets 0 - 17
    // C chord == [0][4], [1,2], [2,2]
    // Em chord == [1,1], [1,2]
    // D chord == [1, 5], [1, 3], [2, 2]
    // G chord == [1, 1] [2,0][2,5]

    var frets = [
        // 0, 1, 2 , 3, 4 , 5 
        [false, false, false, false, false, false],
        // 6, 7, 8, 9, 10, 11
        [false, false, false, false, false, false],
        // 12, 13, 14, 15, 16, 17
        [false, false, false, false, false, false]
      ];


root.demoChords= function() {     
// G Chord 
frets[1][5]=true;
frets[1][3]=true;
frets[2][2]=true;

var col=0, row=0;
for (row=0;row<2;row++)
{
    for (col=0;col<5;col++)
    {
        if (frets[row][col] == true)
        {
            root.drawCircle(row, col);
        }
    }
}





}







})(DRAWGUITAR);