
export enum MessageType {
    monochromize = 'monochromize',
    restore = 'restore',
    inspect = 'inspect',
}

export abstract class Message {
    type: MessageType;
    tabId: number;

    protected constructor(type: MessageType, tabId: number) {
        this.type = type;
        this.tabId = tabId;
    }
}

export class MonochromizeMessage extends Message {
    constructor(tabId: number) {
        super(MessageType.monochromize, tabId);
    }
}

export class RestoreMessage extends Message {
    constructor(tabId: number) {
        super(MessageType.restore, tabId);
    }
}

export class InspectMessage extends Message {
    monochromed: boolean = false;

    constructor(tabId: number, monochromed: boolean = false) {
        super(MessageType.inspect, tabId);
        this.monochromed = monochromed;
    }
}
