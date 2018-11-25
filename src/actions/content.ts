import {InspectMessage, Message, MessageType} from "../modules/message";
import {Monochrome} from "../modules";

browser.runtime.onMessage.addListener(async (message: Message) => {
    switch (message.type) {
        case MessageType.monochromize:
            Monochrome.monochromize();
            await browser.runtime.sendMessage(new InspectMessage(message.tabId, true));
            break;
        case MessageType.restore:
            Monochrome.restore();
            await browser.runtime.sendMessage(new InspectMessage(message.tabId, false));
            break;
        case MessageType.inspect:
            const inspectMessage = message as InspectMessage;
            inspectMessage.monochromed = Monochrome.inspect();
            await browser.runtime.sendMessage(inspectMessage);
            break;
    }
});
