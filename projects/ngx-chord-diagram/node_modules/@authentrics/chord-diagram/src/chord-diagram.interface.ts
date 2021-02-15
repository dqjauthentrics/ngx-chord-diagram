export interface ChordDiagramInterface {
    parentElement: HTMLElement | undefined; // parent element on page, to hold canvasses
    name: string;                           // chord name, e.g., Cbm
    positions: number[];                    // array of numeric positions, one for each string; -1;unplayed, and 0=open
    color: string;                          // fretboard color
    dotColor: string;                       // position dot color
}
