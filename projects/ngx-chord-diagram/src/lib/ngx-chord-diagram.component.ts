import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ChordDiagramInterface} from '@authentrics/chord-diagram/dist/chord-diagram.interface';
import {ChordDiagram} from '@authentrics/chord-diagram/dist/ChordDiagram';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'chord-diagram',
  template: `
    <span class="chord-diagram-parent" #chord></span>`
})
export class NgxChordDiagramComponent implements AfterViewInit {
  @Input() chordSpec: Partial<ChordDiagramInterface> | null = null;
  @ViewChild('chord', {read: ElementRef}) private chord: ElementRef | null = null;

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    const hdl = setInterval(() => {
      if (this.chord && this.chordSpec) {
        const el = this.chord.nativeElement;
        if (el) {
          const cd = new ChordDiagram();
          this.chordSpec.parentElement = el;
          cd.draw(this.chordSpec);
          clearInterval(hdl);
        }
      }
    }, 100);
  }
}
