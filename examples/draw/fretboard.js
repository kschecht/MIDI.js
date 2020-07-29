
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
const correctFillColor = "#00FF00";
const neutralFillColor = "#37FDFC";
var correctChordFlag = false;

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

root.drawStrummer = function () {
    var scale = 2;

    var c = document.getElementById("strummer");
    var ctx = c.getContext("2d");
    // vertical lines
    ctx.beginPath();
    ctx.moveTo(10, 35);
    ctx.lineTo(10, 85);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(40, 35);
    ctx.lineTo(40, 85);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(70, 35);
    ctx.lineTo(70, 85);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 35);
    ctx.lineTo(100, 85);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(130, 35);
    ctx.lineTo(130, 85);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(160, 35);
    ctx.lineTo(160, 85);
    ctx.stroke();
    // horizontal lines
    ctx.beginPath();
    ctx.moveTo(10, 35);
    ctx.lineTo(160, 35);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(10, 85);
    ctx.lineTo(160, 85);
    ctx.stroke();
};

root.drawRectangle = function (strumString) {
    var c = document.getElementById("strummer");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.rect((strumString*30) + 5, 45, 10, 30);
    ctx.fill();
};


root.drawCircle = function (row, col, correctChord) {
    var c = document.getElementById("fretBoard");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    row = row + 1;
    var x = (xStart*scale) + ((col * fretWidth) * scale);
    var y = (yFretStart * scale) + (row * (fretHeight *scale)) - ((fretHeight*scale)/2)
    ctx.arc(x, y ,circleRadius,0,2*Math.PI);
    if (correctChord) {
        ctx.fillStyle= correctFillColor;
    } else {
        ctx.fillStyle= neutralFillColor;
    }
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

// var frets = [0,2,2,0,3,0]

var strums = [
    // [midi ID (int), unique strum ID (Guid)]
    [-1, null], [-1, null], [-1, null], [-1, null], [-1, null], [-1, null]
];

const notes = [
    [40, 41, 42, 43], 
    [45, 46, 47, 48], 
    [50, 51, 52, 53], 
    [55, 56, 57, 58], 
    [59, 60, 61, 62], 
    [64, 65, 66, 67]
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

function onStrum(strumString) {
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
            var midiNote = notes[strumString][fret]; // the MIDI note
        
            if (strums[strumString][0] != -1) {
                MIDI.noteOff(0, strums[strumString][0], 0);
            }
            MIDI.noteOn(0, midiNote, velocity, delay);
            // addStrumVisual();
            var currentStrum = new Guid();
            strums[strumString][1] = currentStrum;
            setTimeout(function(){
                if (strums[strumString][1] == currentStrum) {
                    MIDI.noteOff(0, midiNote, delay);
                    strums[strumString][1] = null;
                    // removeStrumVisual(string1);
                }
            },longestNoteLength);
		}
	});
};

function onPressFret(fret, neckString) {
    var currentFret = getFret(neckString);
    if (currentFret != fret && currentFret != 0) {
        // removePressVisual(string1);
        frets[currentFret][neckString] = false;
    }
    frets[fret][neckString] = true;
    if (strums[neckString][0] != -1) {
        MIDI.noteOff(0, strums[neckString][0], 0);
        strums[neckString][0] = -1;
        strums[neckString][1] = null;
        // removeStrumVisual(string1);
    }
	changeChord();
};

function onReleaseFret(neckString) {
    // removePressVisual(neckString);
    var currentFret = getFret(neckString);
    frets[currentFret][neckString] = 0;
    if (strums[neckString][0] != -1) {
        MIDI.noteOff(0, strums[neckString][0], 0);
        strums[neckString][0] = -1;
        strums[neckString][1] = null;
        //removeStrumVisual();
    }
	changeChord();
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
		(string4 == 0 || string4 == 1) &&
		string5 == 1) {
        correctChordFlag=true;
	} else if ((string0 == 0 || string0 == 3) && 
				string1 == 3 && 
				string2 == 2 && 
				string3 == 0 &&
				string4 == 1 &&
				(string5 == 0 || string5 == 3)) {
        correctChordFlag=true;
	} else if (string0 == 0 && 
				string1 == 2 && 
				string2 == 2 && 
				string3 == 0 &&
				string4 == 0 &&
				string5 == 0) {
        correctChordFlag=true;
	} else if (string0 == 0 && 
				string1 == 0 && 
				string2 == 0 && 
				string3 == 2 &&
				string4 == 3 &&
				string5 == 2) {
        correctChordFlag=true;
    }
	drawChord(frets, correctChordFlag);
}

root.showChord=function(chordName)
{
    // Clear fretBoard
     frets[0].fill(false);
     frets[1].fill(false);
     frets[2].fill(false);
     var c = document.getElementById("fretBoard");
     const context = c.getContext('2d');
     context.clearRect(0, 0, c.width, c.height);
     root.drawFretboard();

     correctChordFlag=false;

     switch (chordName) {
        case 'D':
        // D Chord
        frets[1][5]=true;
        frets[1][3]=true;
        frets[2][4]=true;
        correctChordFlag=true;
        break;
        case 'Em':
        // Em Chord
        frets[1][1]=true;
        frets[1][2]=true;
        correctChordFlag=true;
        break;
        case 'C':
        // C Chord
        frets[0][4]=true;
        frets[1][2]=true;
        frets[2][1]=true;
        correctChordFlag=true;
        break;
        case 'G':
        // G Chord
        frets[1][1]=true;
        frets[2][0]=true;
        frets[2][5]=true;
        correctChordFlag=true;
        break;
        case 'X':
        // X Chord - wrong chord
        frets[1][0]=true;
        frets[2][4]=true;
        frets[2][5]=true;
        break;

    }
    drawChord(frets, correctChordFlag);



}

function drawChord(frets, correctChordFlag) {

    var col=0, row=0;
    for (row=0;row<3;row++)
    {
        col=0;
        if (frets[row][col] == true)
        {
            root.drawCircle(row, col, correctChordFlag);
        }

        for (col=0;col<6;col++)
        {
            if (frets[row][col] == true)
            {
                root.drawCircle(row, col, correctChordFlag);
            }
        }
    }

}

})(DRAWGUITAR);