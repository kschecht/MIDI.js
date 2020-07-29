// import "../js/midi/audioDetect.js";
// import "../js/midi/loader.js" 
// import "../js/midi/plugin.audiotag.js" 
// import "../js/midi/plugin.webaudio.js"
// import "../js/midi/plugin.webmidi.js"

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
      
      var midiNotes = [
          [[40,64], [45,59], [60,55], [55,50], [59,45], [64,68]],          
          [[41,65], [46,60], [51,56], [56,51], [60,46], [65,41]],          
          [[42,66], [47,61], [52,57], [57,52], [61,47], [68,42]],          
      ];

      var notesToPlay = [];

function updateNotesToPlay(row, col) {
    var note = midiNotes[row][col][1]
    notesToPlay.push(note);
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
        case 'D7':
        // D7 Chord
        frets[1][5]=true;
        frets[1][3]=true;
        frets[0][4]=true;
        correctChordFlag=true;
        break;
        case 'D':
        // D Chord
        frets[1][5]=true;
        frets[1][3]=true;
        frets[2][4]=true;
        correctChordFlag=true;
        break;
        case 'Em':
        // Em Chord
        frets[1][1]=true; // midi id 41
        frets[1][2]=true; // midi id 47
        correctChordFlag=true;
        break;
        case 'C':
        // C Chord
        frets[0][4]=true; 
        frets[1][2]=true; 
        frets[2][1]=true;
        correctChordFlag=true;
        playSound(48);
        playSound(52);
        playSound(55);
        playSound(60);
        playSound(64);
        break;
        case 'G':
        // G Chord
        frets[1][1]=true;
        frets[2][0]=true;
        frets[2][5]=true;
        correctChordFlag=true;
        break;
        case '?':
        // ? Chord - wrong chord
        frets[1][0]=true;
        frets[2][4]=true;
        frets[2][5]=true;
        break;

    }
    drawChord(frets, correctChordFlag);
    updateChordIndicator(chordName)
}


function playSound(note1) {
    MIDI.loadPlugin({
    soundfontUrl: "./soundfont_guitar/",
    instrument: "acoustic_guitar_steel",
    onprogress: function(state, progress) {
        console.log(state, progress);
    },
    onsuccess: function() {
        var delay = 0; // play one note every quarter second
        // var note1 = 41; // the MIDI note
        var velocity = 127; // how hard the note hits
        // play the note
        MIDI.programChange(0, MIDI.GM.byName["acoustic_guitar_steel"].number); // select correct instrument
        MIDI.setVolume(0, 300);
        MIDI.noteOn(0, note1, velocity, delay);
        MIDI.noteOff(0, note1, delay + 0.75);

        // var note2 = 52; // the MIDI note
        // MIDI.noteOn(0, note2, velocity, delay);
        // MIDI.noteOff(0, note2, delay + 0.75);

    }
});
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
        updateNotesToPlay(row,col)
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
            updateNotesToPlay(row,col)
        }
    }
}

}

})(DRAWGUITAR);