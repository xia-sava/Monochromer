
export class Rgb {
    public R: number = 0;
    public G: number = 0;
    public B: number = 0;
    public A: number = 1.0;

    constructor(r: number | null = null, g: number | null = null, b: number | null = null, a: number | null = null) {
        if (r) {
            this.R = r;
        }
        if (g) {
            this.G = g;
        }
        if (b) {
            this.B = b;
        }
        if (a) {
            this.A = a;
        }
    }

    /**
     * 文字列を分解してRgbオブジェクトを生成する．
     * @param colorStr
     */
    static parse(colorStr: string) {
        if (colorStr.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+(?:\.\d+)?)\s*\)/i)) {
            const r = parseInt(RegExp.$1);
            const g = parseInt(RegExp.$2);
            const b = parseInt(RegExp.$3);
            const a = parseInt(RegExp.$4);
            return new Rgb(r, g, b, a);
        } else if (colorStr.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\s*\)/i)) {
            const r = parseInt(RegExp.$1);
            const g = parseInt(RegExp.$2);
            const b = parseInt(RegExp.$3);
            return new Rgb(r, g, b);
        } else {
            console.log(`謎の色指定 "${colorStr}"`);
        }
        return new Rgb();
    }

    public toString() {
        return `rgba(${this.R}, ${this.G}, ${this.B}, ${this.A})`;
    }

    /**
     * 色がモノクロであるかどうかを取得する．
     */
    public isMonochrome(): boolean {
        return this.R === this.G && this.G === this.B;
    }

    /**
     * モノクロ化したRgbオブジェクトを取得する．
     */
    public monochromed(): Rgb {
        const gray = Math.round(0.2126 * this.R + 0.7152 * this.G + 0.0722 * this.B);
        return new Rgb(gray, gray, gray);
    }
}
