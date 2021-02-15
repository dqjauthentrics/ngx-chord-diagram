# chord-diagram
This package provides a basic Typescript class for drawing chord diagrams on HTML DOM canvasses within given parent elements.
It may be used in conjunction with @authentrics/ngx-chord-diagram for Angular applications.

This is the first npm package I have created, so patience and constructive suggestions are very welcome.

Chords may be shown for instruments with different numbers of strings.  Each array of positions for a chord indicates
the number of strings by its length.  Positions higher up the neck than the first 5 frets will 
automatically be interpreted, and the first fret used will be labeled appropriately.  It should be noted, however, that no
more than 5 frets may be spanned by a single chord.

The position array is simple the list of finger positions, starting from the lowest string to the highest.
Use a -1 for strings that are not played, and a 0 for those that are played open.

![Demo page image](Chord_Diagram_Demo.png?raw=true "Title")

The basic usage is shown in the demo index.html file:

```
<div id="chordArea"></div>
<script>const exports = {"__esModule": true};</script>
<script src="../dist/ChordDiagram.js"></script>
<script>
	const parentEl = document.getElementById('chordArea');
	const chords = [
		{parentElement:parentEl, name: 'C', positions: [-1,3,2,0,1,0]},
		{parentElement:parentEl, name: 'D', positions: [-1,-1,0,2,3,2], color: 'navy', dotColor: '#AAA'},
		{parentElement:parentEl, name: 'A7sus', positions: [-1,-1,7,9,8,10], dotColor: 'orange'},
	];
	const diagrammer = new ChordDiagram();
	for (const chord of chords) {
		diagrammer.draw(chord);
	}
</script>
```
##Chord Diagram Interface
The chord request structure is defined as follows:
```
export interface ChordDiagramInterface {
    parentElement: HTMLElement | undefined; // parent element on page, to hold canvasses
    name: string;                           // chord name, e.g., Cbm
    positions: number[];                    // array of numeric positions, one for each string; -1;unplayed, and 0=open
    color: string;                          // fretboard color
    dotColor: string;                       // position dot color
}
```
##Sizing
To control the size of diagrams, use CSS for canvas elements with 'chord-diagram' class, or via the parent.  E.g.,
```
#chordArea2 canvas {
    max-height: 120px;
}
canvas.chord-diagram {
    max-height: 180px;
}
```
