if (typeof DRAWGUITAR === 'undefined') DRAWGUITAR = {};

const scale=2;
const xStart =10;
const yStart =30;
const topWidth = 5;
const yFretStart =yStart + topWidth;

const fretHeight=50;
const fretWidth=30;

const circleRadius=20;
const halfTriangleLength=20;
const fretboardHeight=200;
const correctFillColor = "#00FF00";
const neutralFillColor = "#37FDFC";
var correctChordFlag = false;

const longestNoteLength = 1000;
const midiNotes = [
    [[40,64], [45,59], [50,55], [55,50], [59,45], [64,68]],          
    [[41,65], [46,60], [51,56], [56,51], [60,46], [65,41]],          
    [[42,66], [47,61], [52,57], [57,52], [61,47], [66,42]],
    [[43,67], [48,62], [53,58], [58,53], [62,48], [67,43]] 
];

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
    ctx.moveTo(xStart * scale, yStart * scale);
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

root.drawStrummer = function () {
    var c = document.getElementById("strummer");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0, c.width, c.height);
    // vertical lines
    // var xStart=10
    // var yStart=35
    const strummerHeight=50
    const strummerWidth=55;
    const xStartS=xStart+5;
    ctx.beginPath();
    ctx.moveTo(xStartS, yStart);
    ctx.lineTo(xStartS, yStart + strummerHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xStartS+(strummerWidth), yStart);
    ctx.lineTo(xStartS+(strummerWidth), yStart + strummerHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xStartS+(strummerWidth * 2), yStart);
    ctx.lineTo(xStartS+(strummerWidth * 2), yStart + strummerHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xStartS+(strummerWidth * 3), yStart);
    ctx.lineTo(xStartS+(strummerWidth * 3), yStart + strummerHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xStartS+(strummerWidth * 4), yStart);
    ctx.lineTo(xStartS+(strummerWidth * 4), yStart + strummerHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xStartS+(strummerWidth * 5), yStart);
    ctx.lineTo(xStartS+(strummerWidth * 5), yStart + strummerHeight);
    ctx.stroke();
    // horizontal lines
    ctx.beginPath();
    ctx.moveTo(xStartS, yStart);
    ctx.lineTo(xStartS+(strummerWidth * 5), yStart);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xStartS, yStart + strummerHeight);
    ctx.lineTo(xStartS+(strummerWidth * 5), yStart + strummerHeight);
    ctx.stroke();
};

function drawRectangle(strumString) {
    var strumStartX = 10;
	var strumStartY = 40;
	var strummerIndX = 55;
	var strummerIndHeigtht = 30;
    var strummerIndWidth = 11;

	var c = document.getElementById("strummer");
	var ctx = c.getContext("2d");

	ctx.beginPath();
	ctx.fillStyle = "blue";
	ctx.rect(strumStartX + (strummerIndX * strumString), strumStartY, strummerIndWidth, strummerIndHeigtht);
	ctx.fill();

};

root.drawCircle = function (row, col) {
    var c = document.getElementById("fretBoard");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    row = row + 1;
    var x = (xStart*scale) + ((col * fretWidth) * scale);
    var y = (yFretStart * scale) + (row * (fretHeight *scale)) - ((fretHeight*scale)/2)
    ctx.arc(x, y ,circleRadius,0,2*Math.PI);
    ctx.fillStyle= correctFillColor;
    ctx.fill();
};

root.drawTriangle = function (row, col) {
    var c = document.getElementById("fretBoard");
    var ctx = c.getContext("2d");
    row = row + 1;
    var x = (xStart*scale) + ((col * fretWidth) * scale);
    var y = (yFretStart * scale) + (row * (fretHeight *scale)) - ((fretHeight*scale)/2)
    ctx.beginPath();
    ctx.moveTo(x, y-halfTriangleLength);
    ctx.lineTo(x-halfTriangleLength, y+halfTriangleLength);
    ctx.lineTo((x-halfTriangleLength) + (halfTriangleLength * 2), y+halfTriangleLength);
    ctx.closePath();
    ctx.fillStyle= neutralFillColor;
    ctx.fill();
};


// frets 0 - 17
// C chord == [0][4], [1,2], [2,2]
// Em chord == [1,1], [1,2]
// D chord == [1, 5], [1, 3], [2, 4]
// G chord == [1, 1] [2,0][2,5]

var frets = [
    // 0, 1, 2 , 3, 4 , 5
    [false, false, false, false, false, false],
    // 6, 7, 8, 9, 10, 11
    [false, false, false, false, false, false],
    // 12, 13, 14, 15, 16, 17
    [false, false, false, false, false, false]
    ];
//   String	Fret	Midi ID	Midi ID (left)
//   0	0	40	64
//   0	1	41	65
//   0	2	42	66
//   1	0	45	59
//   1	1	46	60
//   1	2	47	61
//   2	0	50	55
//   2	1	51	56
//   2	2	52	57
//   3	0	55	50
//   3	1	56	51
//   3	2	57	52
//   4	1	59	45
//   4	2	60	46
//   4	2	61	47
//   5	0	64	40
//   5	1	65	41
//   5	2	66	42

var strums = [
    // [midi ID (int), unique strum ID (string)]
    [-1, ""], [-1, ""], [-1, ""], [-1, ""], [-1, ""], [-1, ""]
];

function getFret(guitarString) {
    if (frets[0][guitarString]) {
        return 1;
    } else if (frets[1][guitarString]) {
        return 2;
    } else if (frets[2][guitarString]) {
        return 3;
    } else {
        return 0;
    }
}

// source: https://www.tutorialspoint.com/how-to-create-guid-uuid-in-javascript
function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }

 root.onStrum = function(strumString) {

    MIDI.loadPlugin({
		soundfontUrl: "./soundfont_guitar/",
		instrument: "acoustic_guitar_steel",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
            var delay = 0;
            var velocity = 127; // how hard the note hits
            MIDI.programChange(0, MIDI.GM.byName["acoustic_guitar_steel"].number); // select correct instrument
            MIDI.setVolume(0, 300);

            var fret = getFret(strumString);
            var midiNote = midiNotes[fret][strumString][0]; // the MIDI note

            if (strums[strumString][0] != -1) {
                //MIDI.noteOff(0, strums[strumString][0], 0);
            }
            MIDI.noteOn(0, midiNote, velocity, delay);
            var currentStrum = createUUID();
            strums[strumString][1] = currentStrum;
            updateStrummer();
            setTimeout(function(){
            //     if (strums[strumString][1] == currentStrum) {
                    //MIDI.noteOff(0, midiNote, delay);
                    strums[strumString][1] = "";
                    strums[strumString][0] = -1;
                    updateStrummer();
            //     }
            },longestNoteLength);
        }
    });

};

root.onPressFret = function(fret, neckString) {
    if (fret != 0)
        frets[fret-1][neckString] = true;
    if (strums[neckString][0] != -1) {
        // MIDI.noteOff(0, strums[neckString][0], 0);
        strums[neckString][0] = -1;
        strums[neckString][1] = "";
        updateStrummer();
    }
    changeChord();
   
};

root.onReleaseFret = function(neckString) {
    var currentFret = getFret(neckString);
    if (currentFret != 0) {
        frets[currentFret-1][neckString] = false;
        if (strums[neckString][0] != -1) {
            // MIDI.noteOff(0, strums[neckString][0], 0);
            strums[neckString][0] = -1;
            strums[neckString][1] = "";
            updateStrummer();
        }
        changeChord();
    }
};

function changeChord() {
    var string0 = getFret(0);
    var string1 = getFret(1);
    var string2 = getFret(2);
    var string3 = getFret(3);
    var string4 = getFret(4);
    var string5 = getFret(5);
    correctChordFlag=false;
	if (string0 == 3 && 
		string1 == 2 && 
		string2 == 0 && 
		string3 == 0 &&
		string4 == 0 &&
		string5 == 3) {
        correctChordFlag=true;
        updateChordIndicator('G');
	} else if ((string0 == 0 || string0 == 3) && 
				string1 == 3 && 
				string2 == 2 && 
				string3 == 0 &&
				string4 == 1 &&
				string5 == 0) {
        correctChordFlag=true;
        updateChordIndicator('C');
	} else if (string0 == 0 && 
				string1 == 2 && 
				string2 == 2 && 
				string3 == 0 &&
				string4 == 0 &&
				string5 == 0) {
        correctChordFlag=true;
        updateChordIndicator('Em');
	} else if (string0 == 0 && 
				string1 == 0 && 
				string2 == 0 && 
				string3 == 2 &&
				string4 == 3 &&
				string5 == 2) {
        correctChordFlag=true;
        updateChordIndicator('D');
    } else if (string0 == 0 && 
        string1 == 0 && 
        string2 == 0 && 
        string3 == 2 &&
        string4 == 1 &&
        string5 == 2) {
        correctChordFlag=true;
        updateChordIndicator('D7');
        }

    var c = document.getElementById("fretBoard");
    const context = c.getContext('2d');
    context.clearRect(0, 0, c.width, c.height);
    root.drawFretboard();
    if (!correctChordFlag) {
        updateChordIndicator('?');
    }
    drawChord(frets, correctChordFlag);
}

function updateChordIndicator(chordName)
{
    var cn = document.getElementById("chordName");
    cn.innerText=chordName;
}

function drawChord(frets, correctChordFlag) {

    var col=0, row=0;
    for (row=0;row<3;row++)
    {
        col=0;
        if (frets[row][col] == true)
        {
            if (correctChordFlag) {
                root.drawCircle(row, col);
            } else {
                root.drawTriangle(row, col);
            }
        }

        for (col=0;col<6;col++)
        {
            if (frets[row][col] == true)
            {
                if (correctChordFlag) {
                    root.drawCircle(row, col);
                } else {
                    root.drawTriangle(row, col);
                }
            }
        }
    }
}

function updateStrummer() {
    root.drawStrummer();
    var col=0;
    for (col=0;col<6;col++)
    {
        if (strums[col][1] != "")
        {
            drawRectangle(col);
        }
    }
}

})(DRAWGUITAR);