import {ChordDiagramInterface} from './chord-diagram.interface';

export class ChordDiagram {
    public error: string | null = null;

    private readonly CANVAS_WIDTH = 280;
    private readonly CANVAS_HEIGHT = 280;
    private margin = 0;
    private nFrets = 6;
    private nameHeight = 0;
    private nutThickness = 0;
    private nStrings = 0;
    private neckWidth = 0;
    private neckHeight = 0;
    private wdSpacing = 0;
    private htSpacing = 0;
    private dotRadius = 0;
    private chWidth = 0;
    private maxFret = 5;
    private minFret = 5;

    // Draw the diagram, after initializing the draw configuration based on options set by the caller.
    public draw(options: Partial<ChordDiagramInterface>) {
        const config: ChordDiagramInterface = {
            parentElement: options.parentElement,
            name: options.name || '',
            positions: options.positions || [],
            color: options.color || '#777',
            dotColor: options.dotColor || '#444',
        };
        try {
            if (config && config.parentElement && config.positions && config.positions.length > 0) {
                this.initialize(config);
                const canvas = document.createElement('canvas');
                canvas.setAttribute('class','chord-diagram');
                const context = canvas.getContext('2d');
                if (context) {
                    canvas.width = this.CANVAS_WIDTH;
                    canvas.height = this.CANVAS_HEIGHT;
                    this.drawNeck(config, context);
                    this.drawPositions(config, context);
                    //config.parentElement.appendChild(canvas);
                    const img = document.createElement('img');
                    img.className = 'chord-diagram';
                    img.setAttribute('width', this.CANVAS_WIDTH.toString());
                    img.setAttribute('height', this.CANVAS_HEIGHT.toString());
                    img.src = canvas.toDataURL();
                    config.parentElement.appendChild(img);
                }
            }
        } catch (exception) {
            console.warn('An error occurred in drawing a chord diagram.', config);
        }
    }

    // Calculate dimension values, based on requested configuration.
    private initialize(config: ChordDiagramInterface) {
        this.margin = Math.round(this.CANVAS_WIDTH / 7);
        this.nameHeight = Math.round(this.margin * 1.25);
        this.nutThickness = Math.round(this.margin / 5);
        this.nStrings = config.positions.length;
        this.neckWidth = this.CANVAS_WIDTH - (2 * this.margin);
        this.neckHeight = this.CANVAS_HEIGHT - (this.margin + this.nameHeight);
        this.wdSpacing = this.neckWidth / (this.nStrings - 1);
        this.htSpacing = this.neckHeight / (this.nFrets - 1);
        this.dotRadius = Math.round(this.htSpacing / 3);
        this.chWidth = this.htSpacing * 0.75;
        this.maxFret = Math.max(...config.positions);
        this.minFret = this.maxFret;
        for (const pos of config.positions) {
            if (pos < this.minFret && pos > 0) {
                this.minFret = pos;
            }
        }
        if (this.maxFret <= 5) {
            this.maxFret = 5;
            this.minFret = 1;
        } else {
            if (this.maxFret - this.minFret > 5) {
                this.error = 'Too many frets: min=' + this.minFret + ', max=' + this.maxFret;
            } else {
                for (let i = 0; i < config.positions.length; i++) {
                    if (config.positions[i] > 0) {
                        config.positions[i] -= (this.minFret - 1);
                    }
                }
            }
        }
    }

    private ordinal(n: number) {
        const j = n % 10;
        const k = n % 100;
        if (j === 1 && k !== 11) {
            return n + 'st';
        }
        if (j === 2 && k !== 12) {
            return n + 'nd';
        }
        if (j === 3 && k !== 13) {
            return n + 'rd';
        }
        return n + 'th';
    }

    private drawNeck(config: ChordDiagramInterface, context: CanvasRenderingContext2D) {
        // Chord Name
        context.beginPath();
        context.strokeStyle = config.color;
        context.font = this.nameHeight + 'px Arial';
        let middle = (this.margin + (this.neckWidth / 2)) - (context.measureText(config.name).width / 2);
        context.fillText(config.name, middle, this.nameHeight - 4);
        context.stroke();

        // Fret number
        if (this.minFret > 1) {
            context.beginPath();
            context.strokeStyle = config.color;
            const fretNumSize = (this.htSpacing * 0.35);
            context.font = fretNumSize + 'px Courier';
            const midFirst = this.nameHeight + this.margin + (this.htSpacing / 2);
            context.fillText(this.ordinal(this.minFret), 1, midFirst);
            context.fillText('Fret', 1, midFirst + fretNumSize + 2);
            context.stroke();
        }

        // Nut
        context.beginPath();
        context.lineWidth = this.nutThickness;
        context.moveTo(this.margin - 1, this.margin + this.nameHeight + 1);
        context.lineTo(this.margin + this.neckWidth + 1, this.margin + this.nameHeight + 1);
        context.stroke();

        // Strings
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = config.color;
        for (let i = 0; i < this.nStrings; i++) {
            const x = this.margin + (i * this.wdSpacing);
            context.moveTo(x, this.nameHeight + this.margin + this.nutThickness - 2);
            context.lineTo(x, this.nameHeight + this.margin + this.nutThickness + this.neckHeight - 2);
            context.stroke();
        }

        // Frets
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = config.color;
        for (let i = 1; i < this.nFrets; i++) {
            const y = this.nameHeight + this.margin + (i * this.htSpacing);
            context.moveTo(this.margin, y);
            context.lineTo(this.margin + this.neckWidth, y);
            context.stroke();
        }
    }

    private drawPositions(config: ChordDiagramInterface, context: CanvasRenderingContext2D) {
        context.strokeStyle = config.dotColor;
        for (let i = 0; i < config.positions.length; i++) {
            let pos = config.positions[i];
            let ch: string | null = null;
            if (pos === -1) {
                pos = 0;
                ch = 'x';
            } else if (pos === 0) {
                ch = 'o';
            }
            let y = this.nameHeight + this.margin - (this.htSpacing / 2) + (pos * this.htSpacing);
            let x = (this.margin + (i * this.wdSpacing));
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(x, y);
            if (ch) {
                context.font = this.chWidth + 'px Monospace';
                context.fillStyle = config.dotColor;
                const chWd = context.measureText(ch).width;
                x -= chWd / 2;
                y += Math.round(this.chWidth / 3);
                context.fillText(ch, x, y);
            } else {
                context.arc(x, y, this.dotRadius, 0, 2 * Math.PI, false);
                context.fillStyle = (pos === 0 ? '#FFFFFF' : config.dotColor);
                context.fill();
                context.stroke();
            }
        }
    }
}
