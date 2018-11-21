
browser.browserAction.onClicked.addListener(async (tab) => {
    if (tab.id != null) {
        await browser.tabs.executeScript(tab.id, {file: 'js/content.js'});
    }
});
