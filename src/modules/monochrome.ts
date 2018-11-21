import {Rgb} from './rgb';

export class Monochrome {
    static monochromize() {
        const root = document.documentElement;
        if (root) {
            this.monochromizeElement(root);
        }
    }

    /**
     * エレメントをモノクロ化して子も全部やる．
     * @param element
     */
    static monochromizeElement(element: HTMLElement) {
        if (this.inspectColored(element)) {
            // グレースケールフィルタを追加．大体これで足りる．
            this.applyGrayscaleFilter(element);

            // bodyタグは何故かfilterが効かない？ 仕方ないので色を変更
            if (element.tagName.toUpperCase() === 'BODY') {
                this.applyMonochromeColor(element);
            }
        }
        // 子要素全部に再帰で同じ処理．
        const children = element.children;
        const length = element.children.length;
        for (let i = 0; i < length; ++i) {
            this.monochromizeElement(children[i] as HTMLElement);
        }
    }

    /**
     * 対象エレメントが何らか色の付いたものであるかどうかを調査
     * @param element
     */
    private static inspectColored(element: HTMLElement): boolean {
        // 特定タグは内容にかかわらず無条件
        if (['IMG', 'IFRAME'].includes(element.tagName.toUpperCase())) {
            // console.log([`${element.tagName}: 画像`, element]);
            return true;
        }
        for (const pseudElt of ['', '::before', '::after']) {
            const style = window.getComputedStyle(element, pseudElt);
            // バックグラウンド画像あり
            if (style.backgroundImage && style.backgroundImage !== 'none') {
                // console.log([`${element.tagName}: 背景画像 "${style.backgroundImage}"`, element]);
                return true;
            }
            // 色が付きそうな要素のどれが一つでも色付き
            const styleNames: (keyof CSSStyleDeclaration)[] = [
                'color', 'backgroundColor',
                'borderColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor',
            ];
            for (const styleName of styleNames) {
                if (style[styleName] && ! Rgb.parse(style[styleName]).isMonochrome()) {
                    // console.log([`${element.tagName}: ${styleName} "${style[styleName]}"`, element]);
                    return true;
                }
            }
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
        element.style.filter = 'grayscale(1)';
        element.dataset.monochromerModified = 'modified';
    }

    /**
     * color/background-color 直接変更によるモノクロ化
     * @param element
     */
    private static applyMonochromeColor(element: HTMLElement): void {
        const style = window.getComputedStyle(element);
        if (style.backgroundColor) {
            const rgb = Rgb.parse(style.backgroundColor);
            element.style.backgroundColor = rgb.monochromed().toString();
            element.dataset.monochromerModified = 'modified';
        }
        if (style.color) {
            const rgb = Rgb.parse(style.color);
            element.style.color = rgb.monochromed().toString();
            element.dataset.monochromerModified = 'modified';
        }
        if (style.backgroundImage) {
            element.style.backgroundImage = '';
            element.dataset.monochromerModified = 'modified';
        }
    }
}
