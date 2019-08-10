/**
 * 事件数据定义类
 *
 * @author Tim Wars
 * @date 2019-01-20 00:23
 * @project firebolt
 * @copyright (C) DONOPO
 *
 */
export class EventData {

    constructor(cmd: string, obj: any = null, isStop: boolean = false) {
        this.cmd = cmd;
        this.data = obj;
        this.isStop = false;
    }

    public cmd: string;
    public data: any;
    public isStop = false;

    /**
     * 快速创建事件数据
     * @param cmd
     * @param data
     * @param isStop
     */
    public static create(cmd: string, data: any = null, isStop: boolean = false): EventData {
        return new EventData(cmd, data, isStop);
    }

    public stop() {
        this.isStop = true
    }
}

/**
 * 事件回调函数定义
 *
 * @author Tim Wars
 * @date 2019-01-20 00:24
 * @project firebolt
 * @copyright (C) DONOPO
 *
 */
export class EventFunc {

    private m_this: any;
    private m_cb: Function;

    public constructor(thisObj: any, callBack: Function) {
        this.m_this = thisObj;
        this.m_cb = callBack;
    }

    public invoke(...args: any[]) {
        this.m_cb.call(this.m_this, ...args);
    }
}


