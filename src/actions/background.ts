import {InspectMessage, Message, MessageType, MonochromizeMessage, RestoreMessage} from "../modules/message";

const monochromedTabs = new Map<number, boolean>();

/**
 * ツールボタン再描画処理
 * タブ側にメッセージを送信して，状況を返答させる
 * @param tabId
 */
async function redrawBrowserAction(tabId: number) {
    await browser.tabs.sendMessage(tabId, new InspectMessage(tabId));
}

/**
 * ツールボタンが押された時の処理
 * タブのモノクロ化状況に応じてモノクロ化/リストアのメッセージを送る．
 */
browser.browserAction.onClicked.addListener(async (tab) => {
    if (tab.id) {
        const message = (monochromedTabs.get(tab.id))
            ? new RestoreMessage(tab.id)
            : new MonochromizeMessage(tab.id);
        await browser.tabs.sendMessage(tab.id, message);
    }
});

/**
 * タブが切り替えられた時の処理
 * ツールボタン再描画を行なう
 */
browser.tabs.onUpdated.addListener(async (tabId) => {
    await redrawBrowserAction(tabId);
});

/**
 * タブ側からのメッセージ受信処理
 */
browser.runtime.onMessage.addListener(async (message: Message) => {
    switch (message.type) {
        case MessageType.inspect:
            // ページの現状に応じてボタンアイコンとテキストを更新する．
            const inspectMessage = message as InspectMessage;
            let path = "";
            let title = "";
            if (inspectMessage.monochromed) {
                path = "icons/monochromer-undo.svg";
                title = "Restore colors";
            } else {
                path = "icons/monochromer.svg";
                title = "Monochrome this page"
            }
            await browser.browserAction.setIcon({path: path});
            await browser.browserAction.setTitle({title: title});
            monochromedTabs.set(inspectMessage.tabId, inspectMessage.monochromed);
            break;
    }
});
