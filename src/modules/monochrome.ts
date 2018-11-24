import {Rgb} from './rgb';

export class Monochrome {
    static monochromize() {
        const body = document.querySelector('body');
        if (body) {
            this.applyGrayscaleFilter(body);
            this.applyMonochromeColor(body);
        }
    }

    /**
     * CSS filter によるモノクロ化
     * @param element
     */
    private static applyGrayscaleFilter(element: HTMLElement): void {
        const filter = window.getComputedStyle(element).filter;
        if (filter && filter !== 'none') {
            console.log(`既存filter "${filter}"`);
        }
        element.style.filter = 'grayscale(1)';
        element.dataset.monochromerModified = 'modified';
    }

    /**
     * color/background-color 直接変更によるモノクロ化
     * @param element
     */
    private static applyMonochromeColor(element: HTMLElement): void {
        const style = window.getComputedStyle(element);
        console.log([style.backgroundColor, style.color, style.backgroundImage]);
        if (style.backgroundColor) {
            const rgb = Rgb.parse(style.backgroundColor);
            if (! rgb.isMonochrome()) {
                element.style.backgroundColor = rgb.monochromed().toString();
                element.dataset.monochromerModified = 'modified';
            }
        }
        if (style.color) {
            const rgb = Rgb.parse(style.color);
            if (! rgb.isMonochrome()) {
                element.style.color = rgb.monochromed().toString();
                element.dataset.monochromerModified = 'modified';
            }
        }
        if (style.backgroundImage) {
            element.style.backgroundImage = '';
            element.dataset.monochromerModified = 'modified';
        }
    }
}
