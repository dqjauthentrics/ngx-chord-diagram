# NgxChordDiagram
This module builds on [@authentrics/chord-diagram](https://www.npmjs.com/package/@authentrics/chord-diagram) to provide an Angular
tag, **<chord-diagram>**, to display finger positions on a stringed instrument
fretboard.  The number of items in the given array of positions indicates the
number of strings to be represented, so it can be used for 3 and 4 string cigar boxes, mandolins, 
ukuleles and other instruments.

## Installation
```
npm install --save @authentrics/ngx-chord-diagram
```
## Usage
The position array is simple the list of finger positions, starting from the lowest string to the highest.
Use a -1 for strings that are not played, and a 0 for those that are played open.

In your component, or app module:
```
import {NgxChordDiagramModule} from '@authentrics/ngx-chord-diagram';
import {ChordDiagramInterface} from '@authentrics/chord-diagram/dist/chord-diagram.interface'
...
public chordSpec: Partial<ChordDiagramInterface> = {
  parentElement: document.getElementById('chordArea'),
  name: 'D',
  positions: [-1, -1, 0, 2, 3, 2],
  color: 'navy',
  dotColor: '#AAA'
}
```
In your Angular template:
```
<chord-diagram [chordSpec]="chordSpec"></chord-diagram>
```
## Examples
![Demo page image](src/assets/Chord_Diagram_Demo.png?raw=true "Title")
## Styling
To control the size of diagrams, use CSS for canvas elements with 'chord-diagram' class, or via the parent.  E.g.,
```
#chordArea2 canvas {
    max-height: 120px;
}
canvas.chord-diagram {
    max-height: 180px;
}
```
