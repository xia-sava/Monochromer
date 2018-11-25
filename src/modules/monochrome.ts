import {Rgb} from './rgb';

export class Monochrome {
    /**
     * モノクロ化処理を実行する．
     */
    static monochromize() {
        const body = document.querySelector('body');
        if (body) {
            this.applyGrayscaleFilter(body);
            this.applyMonochromeColor(body);
        }
    }

    /**
     * リストア処理を実行する．
     */
    static restore() {
        const body = document.querySelector('body');
        if (body) {
            this.ceaseGrayscaleFilter(body);
            this.ceaseMonochromeColor(body);
        }
    }

    /**
     * モノクロ化済みかどうかを検査する．
     */
    static inspect() {
        const body = document.querySelector('body');
        if (body) {
            return (body.dataset.monochromerModified == 'modified')
        }
        return false;
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
        element.dataset.monochromerFilter = element.style.filter || '';
        element.style.filter = 'grayscale(1)';
        element.dataset.monochromerModified = 'modified';
    }

    /**
     * CSS filter によるモノクロ化を解除
     * @param element
     */
    private static ceaseGrayscaleFilter(element: HTMLElement): void {
        element.style.filter = element.dataset.monochromerFilter || '';
        element.dataset.monochromerModified = '';
    }

    /**
     * color/background-color 直接変更によるモノクロ化
     * @param element
     */
    private static applyMonochromeColor(element: HTMLElement): void {
        const style = window.getComputedStyle(element);
        if (style.backgroundColor) {
            const rgb = Rgb.parse(style.backgroundColor);
            if (! rgb.isMonochrome()) {
                element.dataset.monochromerBackgroundColor = style.backgroundColor;
                element.style.backgroundColor = rgb.monochromed().toString();
                element.dataset.monochromerModified = 'modified';
            }
        }
        if (style.color) {
            const rgb = Rgb.parse(style.color);
            if (! rgb.isMonochrome()) {
                element.dataset.monochromerColor = style.color;
                element.style.color = rgb.monochromed().toString();
                element.dataset.monochromerModified = 'modified';
            }
        }
        if (style.backgroundImage) {
            element.dataset.monochromerBackgroundImage = style.backgroundImage;
            element.style.backgroundImage = '';
            element.dataset.monochromerModified = 'modified';
        }
    }

    /**
     * color/background-color 直接変更によるモノクロ化を解除
     * @param element
     */
    private static ceaseMonochromeColor(element: HTMLElement): void {
        const backgroundColor = element.dataset.monochromerBackgroundColor;
        if (backgroundColor) {
            element.style.backgroundColor = backgroundColor;
        }
        const color = element.dataset.monochromerColor;
        if (color) {
            element.style.color = color;
        }
        const backgroundImage = element.dataset.monochromerBackgroundImage;
        if (backgroundImage) {
            element.style.backgroundImage= backgroundImage;
        }
        element.dataset.monochromerModified = '';
    }
}
