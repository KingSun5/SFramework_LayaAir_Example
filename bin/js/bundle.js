var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./framework/runtime/engine");
/**
 * @author Sun
 * @time 2019-08-11 19:05
 * @project SFramework_LayaAir
 * @description 游戏启动入口
 *
 */
class Main {
    // 	Laya["Physics"] && Laya["Physics"].enable();
    // 	Laya["DebugPanel"] && Laya["DebugPanel"].enable();
    // 	//兼容微信不支持加载scene后缀场景
    // 	Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
    // 	//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
    // 	if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
    // 	if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
    // 	if (GameConfig.stat) Laya.Stat.show();
    // 	Laya.alertGlobalError = true;
    // 	//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
    // 	// Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    // 	let view = new LoadingView();
    // 	Laya.stage.addChild(view);
    // }
    // onVersionLoaded(): void {
    // 	//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    // 	Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    // }
    // onConfigLoaded(): void {
    // 	//加载IDE指定的场景
    // 	GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
    // }
    constructor() {
        engine_1.Engine.$.run();
    }
}
//激活启动类
new Main();
},{"./framework/runtime/engine":21}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scene_base_1 = require("../../framework/manager/ui/scene-base");
var LyScene = scene_base_1.CustomScene.LyScene;
/**
* @author Sun
* @time 2019-08-11 11:20
* @project SFramework_LayaAir
* @description 主场景
*
*/
class MainScene extends LyScene {
    constructor() {
        super();
        // this.firstWind = BgView;
        this.needLoadRes
            .add("res/atlas/res/main/game.atlas", Laya.Loader.ATLAS, true)
            .add("res/atlas/res/main/game/rock.atlas", Laya.Loader.ATLAS, true)
            .add("res/atlas/res/main/effect.atlas", Laya.Loader.ATLAS, true)
            .add("res/atlas/res/base.atlas", Laya.Loader.ATLAS, true);
    }
}
exports.MainScene = MainScene;
},{"../../framework/manager/ui/scene-base":19}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../setting/config");
/**
* @author Sun
* @time 2019-08-09 15:59
* @project SFramework_LayaAir
* @description 输出信息管理
*/
class Log {
    static debug(...args) {
        if (config_1.ConfigDebug.$.isDebug)
            console.debug("[debug]", args.toString());
    }
    static info(...args) {
        if (config_1.ConfigDebug.$.isDebug)
            console.info("[info]", args.toString());
    }
    static warn(...args) {
        if (config_1.ConfigDebug.$.isDebug)
            console.warn("[warn]", args.toString());
    }
    static error(...args) {
        if (config_1.ConfigDebug.$.isDebug)
            console.error("[error]", args.toString());
    }
    static exception(...args) {
        if (config_1.ConfigDebug.$.isDebug)
            console.exception("[exce]", args.toString());
    }
    static log(...args) {
        if (config_1.ConfigDebug.$.isDebug)
            console.log("[log]", args.toString());
    }
    /**打印设备信息*/
    static printDeviceInfo() {
        if (config_1.ConfigDebug.$.isDebug && navigator) {
            let agentStr = navigator.userAgent;
            let start = agentStr.indexOf("(");
            let end = agentStr.indexOf(")");
            if (start < 0 || end < 0 || end < start) {
                return;
            }
            let infoStr = agentStr.substring(start + 1, end);
            let device, system, version;
            let infos = infoStr.split(";");
            if (infos.length == 3) {
                //如果是三个的话， 可能是android的， 那么第三个是设备号
                device = infos[2];
                //第二个是系统号和版本
                let system_info = infos[1].split(" ");
                if (system_info.length >= 2) {
                    system = system_info[1];
                    version = system_info[2];
                }
            }
            else if (infos.length == 2) {
                system = infos[0];
                device = infos[0];
                version = infos[1];
            }
            else {
                system = navigator.platform;
                device = navigator.platform;
                version = infoStr;
            }
            Log.info(system, device, version);
        }
    }
}
exports.Log = Log;
},{"../setting/config":22}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./log");
/**
 * @author Sun
 * @time 2019-08-09 23:25
 * @project SFramework_LayaAir
 * @description  对象池
 *
 */
class ObjectPool {
    /**
     * 获取一个对象，不存在则创建
     * @param classDef  类名
     */
    static get(classDef) {
        let sign = "dc." + classDef.name;
        let obj = Laya.Pool.getItem(sign);
        if (!obj) {
            if (!Laya.ClassUtils.getRegClass(sign)) {
                log_1.Log.debug("[pools]注册对象池:" + sign);
                Laya.ClassUtils.regClass(sign, classDef);
            }
            obj = Laya.ClassUtils.getInstance(sign);
        }
        if (obj && obj["init"])
            obj.init();
        return obj;
    }
    /**
     * 回收对象
     * @param obj  对象实例
     */
    static recover(obj) {
        if (!obj)
            return;
        let proto = Object.getPrototypeOf(obj);
        let clazz = proto["constructor"];
        let sign = "dc." + clazz.name;
        obj.close();
        Laya.Pool.recover(sign, obj);
    }
}
exports.ObjectPool = ObjectPool;
},{"./log":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./log");
/**
* @author Sun
* @time 2019-08-09 15:57
* @project SFramework_LayaAir
* @description 单例工具类
*/
class Singleton {
    constructor() {
        let clazz = this["constructor"];
        if (!clazz) {
            console.warn("Not support constructor!");
            log_1.Log.warn("Not support constructor!");
            return;
        }
        // 防止重复实例化
        if (Singleton.classKeys.indexOf(clazz) != -1)
            throw new Error(this + "Only instance once!");
        else {
            Singleton.classKeys.push(clazz);
            Singleton.classValues.push(this);
        }
    }
}
Singleton.classKeys = [];
Singleton.classValues = [];
exports.Singleton = Singleton;
},{"./log":3}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Sun
 * @time 2019-08-09 23:31
 * @project SFramework_LayaAir
 * @description  事件任务属性
 *
 */
class TimeDelayData {
    set(interval, repeat, callback, thisObj, param) {
        this.interval = interval;
        this.repeat = repeat;
        this.callback = callback;
        this.param = param;
        this.thisObj = thisObj;
    }
}
exports.TimeDelayData = TimeDelayData;
/**
* @author Sun
* @time 2019-08-09 23:25
* @project SFramework_LayaAir
* @description  时间控制核心类
*
*/
const singleton_1 = require("./singleton");
class TimeDelay extends singleton_1.Singleton {
    constructor() {
        super();
        /**当前事件执行的次数 */
        this.repeat = 0;
        this.items = new Array();
        this.toAdd = new Array();
        this.toRemove = new Array();
        this.pool = new Array();
        this.lastTime = 0;
        this.deltaTime = 0;
        Laya.timer.frameLoop(0.01, this, this.update);
    }
    static get $() {
        if (this.mInstance == null) {
            this.mInstance = new TimeDelay();
        }
        return this.mInstance;
    }
    /**
     * 从池子中获取data类
     */
    getFromPool() {
        let t;
        if (this.pool.length > 0) {
            t = this.pool.pop();
        }
        else
            t = new TimeDelayData();
        return t;
    }
    /**
     * data类放回池子
     * @param t
     */
    returnToPool(t) {
        t.set(0, 0, null, null, null);
        t.elapsed = 0;
        t.deleted = false;
        this.pool.push(t);
    }
    exists(callback, thisObj) {
        let t = this.toAdd.find((value, index, obj) => {
            return value.callback == callback && value.thisObj == thisObj;
        });
        if (t != null) {
            return true;
        }
        t = this.items.find((value, index, obj) => {
            return value.callback == callback && value.thisObj == thisObj;
        });
        if (t != null && !t.deleted) {
            return true;
        }
        return false;
    }
    add(interval, repeat, callback, thisObj, callbackParam = null) {
        let t;
        t = this.items.find((value, index, obj) => {
            return value.callback == callback && value.thisObj == thisObj;
        });
        if (t == null) {
            t = this.toAdd.find((value, index, obj) => {
                return value.callback == callback && value.thisObj == thisObj;
            });
        }
        if (t == null) {
            t = this.getFromPool();
            this.toAdd.push(t);
        }
        t.set(interval, repeat, callback, thisObj, callbackParam);
        t.deleted = false;
        t.elapsed = 0;
    }
    addUpdate(callback, thisObj, callbackParam = null) {
        this.add(0.001, 0, callback, thisObj, callbackParam);
    }
    remove(callback, thisObj) {
        let findindex = -1;
        let t = this.toAdd.find((value, index, obj) => {
            if (value.callback == callback && value.thisObj == thisObj) {
                findindex = index;
                return true;
            }
            else {
                return false;
            }
        });
        if (t != null) {
            this.toAdd.splice(findindex, 1);
            this.returnToPool(t);
        }
        t = this.items.find((value, index, obj) => {
            return value.callback == callback && value.thisObj == thisObj;
        });
        if (t != null)
            t.deleted = true;
    }
    start() {
        this.lastTime = Laya.timer.currTimer;
    }
    update() {
        this.deltaTime = (Laya.timer.currTimer - this.lastTime) / 1000;
        this.lastTime = Laya.timer.currTimer;
        for (let index = 0; index < this.items.length; index++) {
            let t = this.items[index];
            if (t.deleted) {
                this.toRemove.push(t);
                continue;
            }
            t.elapsed += this.deltaTime;
            if (t.elapsed < t.interval) {
                continue;
            }
            t.elapsed = 0;
            if (t.repeat > 0) {
                t.repeat--;
                if (t.repeat == 0) {
                    t.deleted = true;
                    this.toRemove.push(t);
                }
            }
            this.repeat = t.repeat;
            if (t.callback != null) {
                try {
                    t.callback.call(t.thisObj, t.param);
                }
                catch (error) {
                    t.deleted = true;
                }
            }
        }
        let len = this.toRemove.length;
        while (len) {
            let t = this.toRemove.pop();
            let index = this.items.indexOf(t);
            if (t.deleted && index != -1) {
                this.items.splice(index, 1);
                this.returnToPool(t);
            }
            len--;
        }
        len = this.toAdd.length;
        while (len) {
            let t = this.toAdd.pop();
            this.items.push(t);
            len--;
        }
    }
}
TimeDelay.mInstance = null;
exports.TimeDelay = TimeDelay;
},{"./singleton":5}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_node_1 = require("../event/event-node");
/**
 * @author Sun
 * @time 2019-08-09 15:51
 * @project SFramework_LayaAir
 * @description 数据管理类
 */
class DataManager extends event_node_1.EventNode {
    constructor() {
        super();
        this.datas = new Map();
    }
    static get $() {
        if (!this.instance)
            this.instance = new DataManager();
        return this.instance;
    }
    setup() {
    }
    update() {
    }
    destroy() {
        this.datas.clear();
    }
    register(data) {
        this.datas.set(data.cmd, data);
        return this;
    }
    get(cmd) {
        return this.datas.get(cmd);
    }
}
DataManager.instance = null;
exports.DataManager = DataManager;
},{"../event/event-node":9}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 事件数据定义类
 *
 * @author Tim Wars
 * @date 2019-01-20 00:23
 * @project firebolt
 * @copyright (C) DONOPO
 *
 */
class EventData {
    constructor(cmd, obj = null, isStop = false) {
        this.isStop = false;
        this.cmd = cmd;
        this.data = obj;
        this.isStop = false;
    }
    /**
     * 快速创建事件数据
     * @param cmd
     * @param data
     * @param isStop
     */
    static create(cmd, data = null, isStop = false) {
        return new EventData(cmd, data, isStop);
    }
    stop() {
        this.isStop = true;
    }
}
exports.EventData = EventData;
/**
 * 事件回调函数定义
 *
 * @author Tim Wars
 * @date 2019-01-20 00:24
 * @project firebolt
 * @copyright (C) DONOPO
 *
 */
class EventFunc {
    constructor(thisObj, callBack) {
        this.m_this = thisObj;
        this.m_cb = callBack;
    }
    invoke(...args) {
        this.m_cb.call(this.m_this, ...args);
    }
}
exports.EventFunc = EventFunc;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_data_1 = require("./event-data");
const log_1 = require("../../core/log");
const singleton_1 = require("../../core/singleton");
/**
 * 所有需要监控事件节点的基类
 *
 * @author Tim Wars
 * @date 2019-01-18 16:20
 * @project firebolt
 * @copyright (C) DONOPO
 *
 */
class EventNode extends singleton_1.Singleton {
    constructor() {
        super();
        // ==================================================
        // ==============  Local Event Section ==============
        // ==================================================
        this.m_eventData = new Array();
        this.m_eventDict = {};
        EventContext.eventNodes.set(this, this);
    }
    static createGlobalData(cmd, data) {
        let ed;
        if (EventNode.m_globalEventData.length > 0) {
            ed = EventNode.m_globalEventData.pop();
            ed.cmd = cmd;
            ed.data = data;
            ed.isStop = false;
        }
        else {
            ed = new event_data_1.EventData(cmd, data);
        }
        return ed;
    }
    static returnGlobalEventData(ed) {
        ed.data = null;
        ed.cmd = null;
        ed.isStop = false;
        EventNode.m_globalEventData.push(ed);
    }
    /**
     * 添加一个消息监听器
     * @param type 消息类型
     * @param callBack 回调函数
     * @param target 作用对象
     * @param priority 消息的优先级
     * @param once 是否只监听一次
     */
    static addGlobalListener(type, callBack, target, priority = 0, once = false) {
        type = type.toString();
        let info = {
            type: type,
            callBack: callBack,
            target: target,
            priority: priority,
            once: once
        };
        let array = EventNode.m_globalEventDict[type];
        let has = false;
        let pos = 0;
        if (array != null) {
            array.forEach(element => {
                if (element.target == target && element.callBack == callBack) {
                    has = true;
                }
                if (element.priority > info.priority) {
                    pos++;
                }
            });
        }
        else {
            array = new Array();
            EventNode.m_globalEventDict[type] = array;
        }
        if (has) {
            // console.error("重复注册消息：type=" + type);
            log_1.Log.error("重复注册消息：type=" + type);
        }
        else {
            array.splice(pos, 0, info);
        }
    }
    /**
     * 移除一个消息监听器
     * @param type 消息id
     * @param callBack 回调函数
     * @param target 作用的对象
     */
    static removeGlobalListener(type, callBack, target) {
        type = type.toString();
        let info = null;
        let array = EventNode.m_globalEventDict[type];
        if (array != null) {
            let infoIndex = -1;
            array.every((value, index, array) => {
                if (value.target == target && value.callBack == callBack) {
                    infoIndex = index;
                    info = value;
                    return false;
                }
                return true;
            });
            if (infoIndex != -1) {
                array.splice(infoIndex, 1);
            }
        }
    }
    /**
     * 是否存在这个监听消息
     * @param type 消息类型
     * @param callBack 回调类型
     * @param target 回调对象
     */
    static hasGlobalListener(type, callBack, target) {
        let flag = false;
        let array = EventNode.m_globalEventDict[type];
        if (array) {
            // @ts-ignore
            let index = array.findIndex((obj, index, any) => {
                return obj.target == target && obj.callBack == callBack;
            });
            flag = index != -1;
        }
        return flag;
    }
    /**
     * 派发消息
     * @param ed 派发的消息内容
     */
    static dispatchGlobal(ed) {
        EventNode._dispatchGlobal(ed);
    }
    /**
     * 派发消息
     * @param cmd 消息id
     * @param data 消息内容
     */
    static dispatchGlobalByCmd(cmd, data = null) {
        let ed = EventNode.createGlobalData(cmd, data);
        EventNode._dispatchGlobal(ed);
        if (ed != null) {
            EventNode.returnGlobalEventData(ed);
        }
    }
    static _dispatchGlobal(ed) {
        let array = EventNode.m_globalEventDict[ed.cmd];
        if (array != null) {
            for (let i = 0; i < array.length; i++) {
                let info = array[i];
                if (info.callBack != null) {
                    info.callBack.call(info.target, ed);
                }
                if (info.once) {
                    array.splice(i--, 1);
                }
                if (ed.isStop) {
                    break;
                }
            }
        }
    }
    createEventData(cmd, data) {
        let ed;
        if (this.m_eventData.length > 0) {
            ed = this.m_eventData.pop();
            ed.cmd = cmd;
            ed.data = data;
            ed.isStop = false;
        }
        else {
            ed = new event_data_1.EventData(cmd, data);
        }
        return ed;
    }
    returnEventData(ed) {
        ed.data = null;
        ed.cmd = null;
        ed.isStop = false;
        this.m_eventData.push(ed);
    }
    /**
     * 添加一个消息监听器
     * @param type 消息类型
     * @param callBack 回调函数
     * @param target 作用对象
     * @param priority 消息的优先级
     * @param once 是否只监听一次
     */
    addEventListener(type, callBack, target, priority = 0, once = false) {
        type = type.toString();
        let info = {
            type: type,
            callBack: callBack,
            target: target,
            priority: priority,
            once: once
        };
        let array = this.m_eventDict[type];
        let has = false;
        let pos = 0;
        if (array != null) {
            array.forEach(element => {
                if (element.target == target && element.callBack == callBack) {
                    has = true;
                }
                if (element.priority > info.priority) {
                    pos++;
                }
            });
        }
        else {
            array = new Array();
            this.m_eventDict[type] = array;
        }
        if (has) {
            // console.error("重复注册消息：type=" + type);
            log_1.Log.error("重复注册消息：type=" + type);
            return null;
        }
        else {
            array.splice(pos, 0, info);
            return info;
        }
    }
    /**
     * 移除一个消息监听器
     * @param type 消息id
     * @param callBack 回调函数
     * @param target 作用的对象
     */
    removeEventListener(type, callBack, target) {
        type = type.toString();
        let info = null;
        let array = this.m_eventDict[type];
        if (array != null) {
            let infoIndex = -1;
            array.every((value, index, array) => {
                if (value.target == target && value.callBack == callBack) {
                    infoIndex = index;
                    info = value;
                    return false;
                }
                return true;
            });
            if (infoIndex != -1) {
                array.splice(infoIndex, 1);
            }
        }
    }
    removeEventListenerAll() {
        this.m_eventData = new Array();
        this.m_eventDict = {};
    }
    /**
     * 是否存在这个监听消息
     * @param type 消息类型
     * @param callBack 回调类型
     * @param target 回调对象
     */
    hasEventListener(type, callBack, target) {
        let flag = false;
        let array = this.m_eventDict[type];
        if (array) {
            // @ts-ignore
            let index = array.findIndex((obj, index, any) => {
                return obj.target == target && obj.callBack == callBack;
            });
            flag = index != -1;
        }
        return flag;
    }
    /**
     * 派发消息
     * @param ed 派发的消息内容
     */
    dispatchEvent(ed) {
        this._dispatchEvent(ed);
    }
    /**
     * 派发消息
     * @param cmd 消息id
     * @param data 消息内容
     */
    dispatchEventByCmd(cmd, data = null) {
        let ed = this.createEventData(cmd, data);
        this._dispatchEvent(ed);
        if (ed != null) {
            this.returnEventData(ed);
        }
    }
    _dispatchEvent(ed) {
        let array = this.m_eventDict[ed.cmd];
        if (array != null) {
            for (let i = 0; i < array.length; i++) {
                let info = array[i];
                if (info.callBack != null) {
                    info.callBack.call(info.target, ed);
                }
                if (info.once) {
                    array.splice(i--, 1);
                }
                if (ed.isStop) {
                    break;
                }
            }
        }
    }
}
// ==================================================
// ==============  Local Event Section ==============
// ==================================================
EventNode.m_globalEventData = new Array();
EventNode.m_globalEventDict = {};
exports.EventNode = EventNode;
class EventContext {
}
EventContext.eventNodes = new Map();
exports.EventContext = EventContext;
},{"../../core/log":3,"../../core/singleton":5,"./event-data":8}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_data_1 = require("../event/event-data");
const res_item_1 = require("./res-item");
/**
* @author Sun
* @time 2019-08-09 19:31
* @project SFramework_LayaAir
* @description 场景管理器所需的资源包定义
*
*/
class ResGroup {
    constructor() {
        /**加载进度 */
        this.progress = 0;
        /**加载资源 */
        this.needLoad = new Array();
    }
    /**
     * 向资源组添加目标
     * @param url 相对路径
     * @param type 类型
     * @param isKeepMemory 是否常驻内存
     */
    add(url, type, isKeepMemory = false) {
        let index = this.needLoad.findIndex((value, index, obj) => {
            return value.url == url;
        });
        if (index == -1) {
            let info = new res_item_1.ResItem();
            info.isKeepMemory = isKeepMemory;
            info.url = url;
            info.type = type;
            this.needLoad.push(info);
        }
        return this;
    }
    /**
     * 资源加载完成回调
     * @param callback 回调
     * @param thisObjs 作用域
     */
    onCompletion(callback, thisObjs) {
        this.finish = new event_data_1.EventFunc(thisObjs, callback);
        return this;
    }
}
exports.ResGroup = ResGroup;
},{"../event/event-data":8,"./res-item":11}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Sun
 * @time 2019-08-09 19:18
 * @project SFramework_LayaAir
 * @description 资源属性
 *
 */
class ResItem {
    constructor() {
        this.isKeepMemory = false;
    }
    get fullUrl() {
        return this.url;
    }
}
exports.ResItem = ResItem;
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_1 = require("../../util/time");
/**
 * @author Sun
 * @time 2019-08-09 19:36
 * @project SFramework_LayaAir
 * @description  加载过得资源信息
 *
 */
class ResLoaded {
    constructor(_url) {
        this.url = _url;
        this.ctime = time_1.UtilTime.timeSinceStartup;
        this.utime = time_1.UtilTime.timeSinceStartup;
    }
}
exports.ResLoaded = ResLoaded;
},{"../../util/time":28}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handler = Laya.Handler;
const event_node_1 = require("../event/event-node");
const dictionary_1 = require("../../structure/dictionary");
const log_1 = require("../../core/log");
const time_1 = require("../../util/time");
const res_loaded_1 = require("./res-loaded");
const scene_manager_1 = require("../scene/scene-manager");
const enum_1 = require("../../setting/enum");
const array_1 = require("../../util/array");
/**
 * @author Sun
 * @time 2019-08-09 19:12
 * @project SFramework_LayaAir
 * @description  资源管理
 *
 */
class ResManager extends event_node_1.EventNode {
    constructor() {
        super();
        this.m_oldRes = new Array();
        // 通过场景加载器加载的资源
        this.m_dictResItem = new Map();
        // 手工加载的资源
        this.m_dictResManual = null;
        // 手工加载的资源组名
        this.m_manualGroup = 'manual';
        if (ResManager.mInstance == null)
            ResManager.mInstance = this;
    }
    static get $() {
        if (this.mInstance == null)
            new ResManager();
        return this.mInstance;
    }
    setup() {
        this.m_dictResManual = new dictionary_1.Dictionary();
    }
    update() {
    }
    destroy() {
        if (this.m_dictResManual) {
            this.m_dictResManual.clear();
            this.m_dictResManual = null;
        }
    }
    /**
     * 更新资源使用时间
     * @param url
     * @param is_create
     */
    refreshTime(url, is_create) {
        if (is_create) {
            let loader_info = this.m_dictResManual.value(url);
            if (!loader_info) {
                loader_info = new res_loaded_1.ResLoaded(url);
                this.m_dictResManual.add(url, loader_info);
            }
            else
                loader_info.ctime = time_1.UtilTime.timeSinceStartup;
        }
        else {
            let loader_info = this.m_dictResManual.value(url);
            if (loader_info) {
                loader_info.utime = time_1.UtilTime.timeSinceStartup;
            }
        }
    }
    /**
     * 通过URL获取资源
     * @param url
     */
    getRes(url) {
        this.refreshTime(url, false);
        return Laya.loader.getRes(url);
    }
    /**
     * 加载主场景资源包
     * @param loads 资源组
     */
    loadGroup(loads) {
        let urls = new Array();
        loads.needLoad.forEach(element => {
            urls.push({ url: element.url, type: element.type });
        });
        Laya.loader.load(urls, Handler.create(this, (success) => {
            if (success) {
                scene_manager_1.SceneManager.$.loadingView.onCompleted();
                for (let index = 0; index < loads.needLoad.length; index++) {
                    let info = loads.needLoad[index];
                    if (!this.m_dictResItem.has(info.url)) {
                        this.m_dictResItem.set(info.url, info);
                    }
                }
                if (loads.finish != null) {
                    loads.finish.invoke();
                }
            }
            else {
                log_1.Log.error("Load Resource Error：");
                log_1.Log.debug(urls);
            }
        }), Handler.create(this, (progress) => {
            loads.progress = progress * 100;
            scene_manager_1.SceneManager.$.onLoading(loads.progress);
            if (loads.loadItem != null) {
                loads.loadItem.invoke();
            }
        }, null, false));
    }
    /**
     * 释放资源
     * @param forced 是否强制释放所有
     */
    pop(forced = false) {
        if (forced) {
            this.m_oldRes.splice(0, this.m_oldRes.length);
            this.m_dictResItem.forEach((v, key) => {
                this.m_oldRes.push(key);
            });
        }
        while (this.m_oldRes.length > 0) {
            let url = this.m_oldRes.pop();
            let info = this.m_dictResItem.get(url);
            if (info != null) {
                this.m_dictResItem.delete(info.url);
            }
            Laya.loader.clearRes(url);
        }
        if (forced) {
            this.m_dictResItem.clear();
        }
        else {
        }
    }
    /**
     * 压入要释放的资源
     */
    push() {
        this.m_dictResItem.forEach((v, key) => {
            if (!v.isKeepMemory)
                this.m_oldRes.push(key);
        });
    }
    /**
     * 释放资源
     * @param    type    释放策略
     */
    clearUnused(type) {
        this.clear(type);
    }
    /**
     * 释放指定资源
     * @param    url    资源路径
     */
    clearRes(url) {
        this.m_dictResManual.remove(url);
        Laya.loader.clearRes(url);
        log_1.Log.info("[res]释放资源:" + url);
    }
    clear(type) {
        switch (type) {
            case enum_1.enumClearStrategy.ALL:
                {
                    for (let key in this.m_dictResManual) {
                        Laya.loader.clearRes(key);
                    }
                    this.m_dictResManual.clear();
                    log_1.Log.info("[res]释放所有资源");
                }
                break;
            case enum_1.enumClearStrategy.FIFO:
                {
                    let list = this.m_dictResManual.values();
                    array_1.UtilArray.sort(list, "ctime", enum_1.enumArraySortOrder.Ascending);
                    for (let i = 0; i < list.length * 0.5; ++i) {
                        this.clearRes(list[i].url);
                    }
                }
                break;
            case enum_1.enumClearStrategy.FILO:
                {
                    let list = this.m_dictResManual.values();
                    array_1.UtilArray.sort(list, "ctime", enum_1.enumArraySortOrder.Descending);
                    for (let i = 0; i < list.length * 0.5; ++i) {
                        this.clearRes(list[i].url);
                    }
                }
                break;
            case enum_1.enumClearStrategy.LRU:
                {
                    let list = this.m_dictResManual.values();
                    array_1.UtilArray.sort(list, "utime", enum_1.enumArraySortOrder.Ascending);
                    for (let i = 0; i < list.length * 0.5; ++i) {
                        this.clearRes(list[i].url);
                    }
                }
                break;
            case enum_1.enumClearStrategy.UN_USED:
                {
                    //TODO
                }
                break;
        }
    }
    /**
     * 加载资源
     * @param    url        单个资源地址
     * @param    type        资源类型
     * @param    complete    结束回调(参数：string 加载的资源url)
     * @param    progress    进程回调(参数：string 加载的资源url)
     * @param    priority    优先级，0-4，5个优先级，0优先级最高，默认为1。
     * @param    cache        是否缓存加载结果。
     * @param    ignoreCache 是否忽略缓存，强制重新加载
     */
    loadManual(url, type = "", complete = null, progress = null, priority = 1, cache = true, ignoreCache = false) {
        this.refreshTime(url, true);
        Laya.loader.load(url, complete, progress, 
        // Laya.Handler.create(this, complete, [url]),
        // Laya.Handler.create(this, progress, [1], false),
        type, priority, cache, this.m_manualGroup, ignoreCache);
    }
    /**
     * 加载资源组
     * @param    url        需要加载的资源数组
     * @param    complete    结束回调(参数：string 加载的资源url)
     * @param    priority    优先级，0-4，5个优先级，0优先级最高，默认为1。
     * @param    cache        是否缓存加载结果。
     * @param    ignoreCache 是否忽略缓存，强制重新加载
     */
    loadManualAny(url, complete = null, progress = null, priority = 1, cache = true, ignoreCache = false) {
        let has_unload = false;
        let assets = [];
        let urls = [];
        for (let res of url) {
            assets.push({ url: res.url, type: res.type });
            urls.push(res.url);
            //判断是否有未加载资源
            if (!has_unload && !Laya.loader.getRes(res.url))
                has_unload = true;
            //添加到加载目录
            this.refreshTime(res.url, true);
        }
        Laya.loader.load(assets, complete, progress, undefined, priority, cache, this.m_manualGroup, ignoreCache);
    }
}
ResManager.mInstance = null;
exports.ResManager = ResManager;
},{"../../core/log":3,"../../setting/enum":23,"../../structure/dictionary":24,"../../util/array":25,"../../util/time":28,"../event/event-node":9,"../scene/scene-manager":14,"./res-loaded":12}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_node_1 = require("../event/event-node");
const log_1 = require("../../core/log");
const config_1 = require("../../setting/config");
/**
 * @author Sun
 * @time 2019-08-09 23:22
 * @project SFramework_LayaAir
 * @description  场景管理器
 *
 */
class SceneManager extends event_node_1.EventNode {
    constructor() {
        super();
        this.mScenes = new Map();
        this.loadingView = null;
        this.mCurScene = null;
        if (SceneManager.mInstance == null)
            SceneManager.mInstance = this;
    }
    static get $() {
        if (this.mInstance == null)
            new SceneManager();
        return this.mInstance;
    }
    currentScene() {
        return this.mCurScene;
    }
    /**
     * 显示loading页面
     */
    showLoadingView() {
        if (this.loadingView == null) {
            let scrpt = config_1.ConfigUI.$.defaultLoadView;
            if (scrpt != undefined) {
                this.loadingView = new scrpt();
                Laya.stage.addChild(this.loadingView);
            }
        }
        return this.loadingView;
    }
    /**
     * 隐藏loading页面
     */
    hideLoadingView() {
        if (this.loadingView != null) {
            this.loadingView.removeSelf();
        }
    }
    onLoading(progress) {
        if (this.loadingView != null) {
            let view = this.loadingView;
            view.onProgress(progress);
        }
    }
    /**
     * 跳转场景
     * @param script
     * @param param 参数
     */
    goToScene(script, param = null) {
        if (!this.mScenes.has(script)) {
            if (this.mCurScene != null) {
                this.mCurScene.leave();
                this.mCurScene.destroy();
                this.mScenes.delete(script);
            }
            let scene = new script();
            this.mScenes.set(script, scene);
            this.mCurScene = scene;
            Laya.stage.addChild(scene);
            this.mCurScene.enter(param);
        }
        else {
            let scene = this.mScenes.get(script);
            if (scene == this.mCurScene) {
                log_1.Log.error("当前场景与目标场景一样无法重新进入这个场景");
                return;
            }
            else {
                if (this.mCurScene != null) {
                    this.mCurScene.leave();
                    this.mCurScene = this.mScenes.get(script);
                    this.mCurScene.enter(param);
                }
            }
        }
    }
    destroy() {
    }
    setup() {
    }
    update() {
    }
}
SceneManager.mInstance = null;
exports.SceneManager = SceneManager;
},{"../../core/log":3,"../../setting/config":22,"../event/event-node":9}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_1 = require("../../util/time");
const timer_interval_1 = require("./timer-interval");
/**
 * @author Sun
 * @time 2019-08-10 20:06
 * @project SFramework_LayaAir
 * @description  计时器基类
 *
 */
class TimerEntity {
    constructor() {
        this.mTime = new timer_interval_1.TimerInterval();
    }
    init() {
    }
    close() {
    }
    clear() {
        if (this.handle != null) {
            this.handle.recover();
            this.handle = null;
        }
    }
    set(id, rate, ticks, handle) {
        this.id = id;
        this.mRate = rate < 0 ? 0 : rate;
        this.mTicks = ticks < 0 ? 0 : ticks;
        this.handle = handle;
        this.mTicksElapsed = 0;
        this.isActive = true;
        this.mTime.init(this.mRate, false);
    }
    update(removeTimer) {
        if (this.isActive && this.mTime.update(time_1.UtilTime.deltaTime)) {
            if (this.handle != null)
                this.handle.run();
            this.mTicksElapsed++;
            if (this.mTicks > 0 && this.mTicks == this.mTicksElapsed) {
                this.isActive = false;
                removeTimer(this.id);
            }
        }
    }
}
exports.TimerEntity = TimerEntity;
},{"../../util/time":28,"./timer-interval":16}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Sun
 * @time 2019-08-10 20:02
 * @project SFramework_LayaAir
 * @description  定时执行
 *
 */
class TimerInterval {
    constructor() {
        this.m_now_time = 0;
    }
    /**
     * 初始化定时器
     * @param    interval    触发间隔
     * @param    first_frame    是否第一帧开始执行
     */
    init(interval, first_frame) {
        this.m_interval_time = interval;
        if (first_frame)
            this.m_now_time = this.m_interval_time;
    }
    reset() {
        this.m_now_time = 0;
    }
    update(elapse_time) {
        this.m_now_time += elapse_time;
        if (this.m_now_time >= this.m_interval_time) {
            this.m_now_time -= this.m_interval_time;
            return true;
        }
        return false;
    }
}
exports.TimerInterval = TimerInterval;
},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handler = Laya.Handler;
const array_1 = require("../../util/array");
const scene_manager_1 = require("../scene/scene-manager");
const event_node_1 = require("../event/event-node");
const time_delay_1 = require("../../core/time-delay");
const object_pool_1 = require("../../core/object-pool");
const timer_entity_1 = require("./timer-entity");
/**
 * @author Sun
 * @time 2019-08-09 23:22
 * @project SFramework_LayaAir
 * @description  定时管理器
 *
 */
class TimerManager extends event_node_1.EventNode {
    constructor() {
        super(...arguments);
        this.m_idCounter = 0;
        this.m_RemovalPending = [];
        this.m_Timers = [];
    }
    static get $() {
        if (!this.instance)
            this.instance = new TimerManager();
        return this.instance;
    }
    setup() {
        this.m_idCounter = 0;
        time_delay_1.TimeDelay.$.add(0.1, 0, this.remove, this);
        time_delay_1.TimeDelay.$.addUpdate(this.tick, this);
    }
    update() {
    }
    destroy() {
        array_1.UtilArray.clear(this.m_RemovalPending);
        array_1.UtilArray.clear(this.m_Timers);
        time_delay_1.TimeDelay.$.remove(this.remove, this);
        time_delay_1.TimeDelay.$.remove(this.tick, this);
    }
    tick() {
        for (let i = 0; i < this.m_Timers.length; i++) {
            this.m_Timers[i].update(this.removeTimer);
        }
    }
    /**
     * 定时重复执行
     * @param    rate    间隔时间(单位毫秒)。
     * @param    ticks    执行次数
     * @param    caller    执行域(this)。
     * @param    method    定时器回调函数：注意，返回函数第一个参数为定时器id，后面参数依次时传入的参数。例OnTime(timer_id:number, args1:any, args2:any,...):void
     * @param    args    回调参数。
     */
    addLoop(rate, ticks, caller, method, args = null) {
        if (ticks <= 0)
            ticks = 0;
        let newTimer = object_pool_1.ObjectPool.get(timer_entity_1.TimerEntity);
        ++this.m_idCounter;
        if (args != null)
            array_1.UtilArray.insert(args, this.m_idCounter, 0);
        newTimer.set(this.m_idCounter, rate, ticks, Handler.create(caller, method, args, false));
        this.m_Timers.push(newTimer);
        scene_manager_1.SceneManager.$.currentScene().sceneTimers.push(newTimer.id);
        return newTimer.id;
    }
    /**
     * 单次执行
     */
    addOnce(rate, caller, method, args = null) {
        let newTimer = object_pool_1.ObjectPool.get(timer_entity_1.TimerEntity);
        ++this.m_idCounter;
        if (args != null)
            array_1.UtilArray.insert(args, this.m_idCounter, 0);
        newTimer.set(this.m_idCounter, rate, 1, Handler.create(caller, method, args, false));
        this.m_Timers.push(newTimer);
        scene_manager_1.SceneManager.$.currentScene().sceneTimers.push(newTimer.id);
        return newTimer.id;
    }
    /**
     * 移除定时器
     * @param    timerId    定时器id
     */
    removeTimer(timerId) {
        this.m_RemovalPending.push(timerId);
    }
    /**
     * 移除过期定时器
     */
    remove() {
        let timer;
        if (this.m_RemovalPending.length > 0) {
            for (let id of this.m_RemovalPending) {
                for (let i = 0; i < this.m_Timers.length; i++) {
                    timer = this.m_Timers[i];
                    if (timer.id == id) {
                        timer.clear();
                        object_pool_1.ObjectPool.recover(timer);
                        this.m_Timers.splice(i, 1);
                        break;
                    }
                }
            }
            array_1.UtilArray.clear(this.m_RemovalPending);
        }
    }
}
TimerManager.instance = null;
exports.TimerManager = TimerManager;
},{"../../core/object-pool":4,"../../core/time-delay":6,"../../util/array":25,"../event/event-node":9,"../scene/scene-manager":14,"./timer-entity":15}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tween = Laya.Tween;
var Ease = Laya.Ease;
var Handler = Laya.Handler;
const display_1 = require("../../util/display");
var CustomDialog;
(function (CustomDialog) {
    /**
     * @author Sun
     * @time 2019-08-09 17:41
     * @project SFramework_LayaAir
     * @description  UI组件的基类，继承自Laya.View
     *
     */
    class DialogBase extends Laya.Dialog {
        constructor() {
            super();
            this.maskLayer = null;
            this.contentPnl = null;
            this.data = null;
            this.isMask = true;
            this.bundleButtons();
            this.contentPnl = this.getChildAt(0);
        }
        createView(view) {
            super.createView(view);
        }
        /**
         * 添加遮罩层
         */
        crateMaskLayer() {
            this.maskLayer = display_1.UtilDisplay.createMaskLayer();
            this.maskLayer.mouseEnabled = true;
            let t = this.maskLayer;
            t.x = Math.round(((Laya.stage.width - t.width) >> 1) + t.pivotX);
            t.y = Math.round(((Laya.stage.height - t.height) >> 1) + t.pivotY);
            this.addChild(this.maskLayer);
            this.maskLayer.zOrder = -1;
        }
        /**
         * 在场景中居中组件
         */
        center(view) {
            if (view == null)
                view = this;
            view.x = Math.round(((Laya.stage.width - view.width) >> 1) + view.pivotX);
            view.y = Math.round(((Laya.stage.height - view.height) >> 1) + view.pivotY);
        }
        /**
         * 添加默认按钮事件
         */
        bundleButtons() {
            if (this["btnClose"] != null) {
                this["btnClose"].on(Laya.Event.CLICK, this, this.close);
            }
        }
        /**
         * 关闭空白处点击关闭事件
         */
        closeOutsieClick() {
            if (this.maskLayer != null) {
                this.maskLayer.off(Laya.Event.CLICK, this, this.close);
            }
        }
        /**
         * 对话框弹出方法
         * @param time 弹出时间
         * @param data 数据
         * @param isMask 是否生成遮罩
         * @param closeOutside 是否点击空白处关闭
         */
        popupDialog(time = 300, data = null, isMask = true, closeOutside = true, cb) {
            this.popup(false, false);
            this.data = data;
            this.isMask = isMask;
            Laya.stage.addChild(this);
            this.zOrder = 2000;
            this.popupInit();
            if (this.isMask && this.maskLayer == null) {
                this.crateMaskLayer();
                if (closeOutside)
                    this.maskLayer.on(Laya.Event.CLICK, this, this.close);
            }
            this.onShowAnimation(time, () => {
                if (cb)
                    cb.call();
            });
        }
        /** Des:弹出调用 */
        popupInit() {
        }
        onShowAnimation(time = 300, cb) {
            let target = this.contentPnl;
            this.center();
            // @ts-ignore
            target.scale(0, 0);
            Tween.to(target, {
                scaleX: 1,
                scaleY: 1
            }, time, Ease.backOut, Handler.create(this, cb, [this]), 0, false, false);
        }
        close() {
            this.removeSelf();
        }
    }
    CustomDialog.DialogBase = DialogBase;
})(CustomDialog = exports.CustomDialog || (exports.CustomDialog = {}));
},{"../../util/display":27}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const res_group_1 = require("../res/res-group");
const res_manager_1 = require("../res/res-manager");
const log_1 = require("../../core/log");
const timer_manager_1 = require("../timer/timer-manager");
var CustomScene;
(function (CustomScene) {
    /**
     * @author Sun
     * @time 2019-08-09 19:12
     * @project SFramework_LayaAir
     * @description  Scene的基类
     *
     */
    class LyScene extends Laya.Scene {
        constructor() {
            super();
            /**
             * 场景第一个加载的窗口
             */
            this.firstWind = null;
            this.m_loaded = false;
            this.sceneTimers = new Array();
            this.needLoadRes = new res_group_1.ResGroup();
            this.needLoadRes.onCompletion(this.loaded, this);
        }
        createChildren() {
            super.createChildren();
            this.createView(LyScene.uiView);
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
        }
        enter(param) {
            res_manager_1.ResManager.$.push();
            // UIManager.$.hideAllWin();
            this.m_loaded = false;
            this.m_param = param;
            this.onInit(param);
            res_manager_1.ResManager.$.loadGroup(this.needLoadRes);
        }
        leave() {
            this.onLeave();
            this.destroy();
        }
        destroy() {
            this.onClean();
            this.sceneTimers.forEach((timer) => {
                timer_manager_1.TimerManager.$.removeTimer(timer);
            });
            super.destroy();
        }
        /**
         * 加载完成
         * @param error 加载错误
         */
        loaded(error) {
            if (error != null) {
                // console.error(error);
                log_1.Log.error(error);
            }
            else {
                this.onLoaded();
                this.m_loaded = true;
                this.chechEnter();
            }
        }
        chechEnter() {
            if (this.m_loaded) {
                // UIManager.$.hideAllWin(true);
                res_manager_1.ResManager.$.pop();
                if (this.firstWind != null) {
                    // UIManager.$.showWin(this.firstWind);
                    let cls = this.firstWind;
                    let win = new cls();
                    this.addChild(win);
                }
                this.onEnter(this.m_param);
            }
        }
        /**
         * 加载完成
         */
        onLoaded() {
        }
        /**
         * 场景初始化
         * @param param 参数
         */
        onInit(param) {
        }
        /**
         * 进入场景
         */
        onEnter(param) {
        }
        /**
         * 逐帧循环
         */
        update() {
        }
        /**
         * 离开场景
         */
        onLeave() {
        }
        /**
         * 当场景被销毁的时候
         */
        onClean() {
        }
    }
    /**
     * 内嵌模式空的场景资源，必须实现这个createView，否则有问题
     */
    LyScene.uiView = { "type": "Scene", "props": { "width": 1334, "height": 750 }, "loadList": [], "loadList3D": [] };
    CustomScene.LyScene = LyScene;
})(CustomScene = exports.CustomScene || (exports.CustomScene = {}));
},{"../../core/log":3,"../res/res-group":10,"../res/res-manager":13,"../timer/timer-manager":17}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_manager_1 = require("../data/data-manager");
var CustomView;
(function (CustomView) {
    /**
     * @author Sun
     * @time 2019-08-09 15:51
     * @project SFramework_LayaAir
     * @description  UI组件的基类，继承自Laya.View
     *
     */
    class ViewBase extends Laya.View {
        constructor() {
            super(...arguments);
            /*所有数据观察者*/
            this.dataWatchs = [];
            this.data = null;
        }
        //override
        createView(view) {
            super.createView(view);
            this.fullScreen();
            this.parseElement();
        }
        onDisable() {
            this.dataWatchs.forEach((cmd) => {
                data_manager_1.DataManager.$.removeEventListener(cmd, this.onData, this);
            });
        }
        /**
         * 背景图适应
         */
        parseElement() {
            if (this["imgBg"] != null) {
                let imgBg = this["imgBg"];
                this.fullScreen(imgBg);
            }
        }
        /**
         * 在场景中居中组件
         */
        center(view) {
            if (view == null)
                view = this;
            view.x = Math.round(((Laya.stage.width - view.width) >> 1) + view.pivotX);
            view.y = Math.round(((Laya.stage.height - view.height) >> 1) + view.pivotY);
        }
        /**
         * 设置大小为全屏
         * @param view Laya.Sprite
         */
        fullScreen(view) {
            if (view == null)
                view = this;
            view.width = Laya.stage.width;
            view.height = Laya.stage.height;
        }
        /**
         * 绑定数据监听
         * @param cmd 监听类型
         */
        addDataWatch(cmd) {
            this.dataWatchs.push(cmd);
            data_manager_1.DataManager.$.addEventListener(cmd, this.onData, this);
            data_manager_1.DataManager.$.get(cmd).notify();
        }
        /**
         * 当数据刷新是重绘
         */
        onData(data) {
            // if (data.cmd == DataDefine.CoinInfo){
            //
            // }
        }
        /**
         * 添加到画布
         * @param data 数据
         */
        add(data = null) {
            this.data = data;
            Laya.stage.addChild(this);
            this.show();
        }
        /**
         * 显示view
         */
        show() {
            this.visible = true;
        }
        /**
         * 隐藏view
         */
        hide() {
            this.visible = false;
        }
    }
    CustomView.ViewBase = ViewBase;
})(CustomView = exports.CustomView || (exports.CustomView = {}));
},{"../data/data-manager":7}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../setting/config");
const log_1 = require("../core/log");
const time_1 = require("../util/time");
const enum_1 = require("../setting/enum");
var Browser = Laya.Browser;
const scene_manager_1 = require("../manager/scene/scene-manager");
/**
 * @author Sun
 * @time 2019-08-11 18:08
 * @project SFramework_LayaAir
 * @description 框架初始化和游戏入口
 *
 */
class Engine {
    constructor() {
        this.layout = config_1.ConfigLayout.$;
        this.game = config_1.ConfigGame.$;
        this.ui = config_1.ConfigUI.$;
        this.debug = config_1.ConfigDebug.$;
    }
    static get $() {
        if (this.instance == null)
            this.instance = new Engine();
        return this.instance;
    }
    /**
     * 引擎启动入口
     */
    run() {
        log_1.Log.info("::: Game Engine Run :::");
        // if (ConfigUI.$.defaultLoadView != null && ConfigUI.$.defaultLoadRes != null) {
        //     //游戏开始
        //     UtilTime.start();
        //     //初始化游戏管理器
        //     this.managerSetUp();
        //     //初始化游戏主循环
        //     Laya.timer.frameLoop(1, this, this.managerUpdate);
        //     //加载Loading页的默认资源
        //     ResManager.$.loadManualAny(ConfigUI.$.defaultLoadRes,()=>{
        //         let loadView = SceneManager.$.showLoadingView();
        //         loadView.onStart();
        //     });
        // } else {
        //    Log.error("Error:Loading资源为空加载失败！");
        // }
        this.engineSetup(() => {
            //游戏开始
            time_1.UtilTime.start();
            //初始化游戏管理器
            this.managerSetUp();
            //初始化游戏主循环
            Laya.timer.frameLoop(1, this, this.managerUpdate);
            //加载Loading页
            let loadView = scene_manager_1.SceneManager.$.showLoadingView();
            loadView.onStart();
        });
    }
    /**
     * 引擎的初始化设置
     */
    engineSetup(startCallback) {
        /**初始化Laya */
        if (this.game.dimension == enum_1.enumDimension.Dim3) {
            Laya3D.init(config_1.ConfigLayout.$.designWidth, config_1.ConfigLayout.$.designHeight);
        }
        else {
            Laya.init(config_1.ConfigLayout.$.designWidth, config_1.ConfigLayout.$.designHeight, Laya.WebGL);
        }
        /**背景颜色 */
        Laya.stage.bgColor = "none";
        /**缩放模式 */
        Laya.stage.scaleMode = enum_1.enumScaleType.ScaleShowAll.toString();
        /**设置屏幕大小 */
        Laya.stage.setScreenSize(Browser.clientWidth, Browser.clientHeight);
        /**设置横竖屏 */
        Laya.stage.screenMode = enum_1.enumScreenModel.ScreenNone;
        /**水平对齐方式 */
        Laya.stage.alignH = enum_1.enumAlige.AligeCenter;
        /**垂直对齐方式 */
        Laya.stage.alignV = enum_1.enumAlige.AligeMiddle;
        /**开启物理引擎 */
        if (config_1.ConfigGame.$.physics)
            Laya["Physics"] && Laya["Physics"].enable();
        /**打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板） */
        if (config_1.ConfigDebug.$.isEnableDebugPanel || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        /**物理辅助线 */
        if (config_1.ConfigDebug.$.isPhysicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        /**性能同级面板 */
        if (config_1.ConfigDebug.$.isStat)
            Laya.Stat.show(config_1.ConfigDebug.$.panelX, config_1.ConfigDebug.$.panelY);
        /**微信开放域子域设置*/
        if (Browser.onWeiXin || Browser.onMiniGame) {
            Laya.MiniAdpter.init();
            Laya.isWXOpenDataContext = false;
        }
        /**模式窗口点击边缘 */
        UIConfig.closeDialogOnSide = true;
        /**是否显示滚动条按钮 */
        UIConfig.showButtons = true;
        /**按钮的点击效果 */
        UIConfig.singleButtonStyle = "scale"; //"color","scale"
        /**弹出框背景透明度 */
        UIConfig.popupBgAlpha = 0.75;
        /**兼容Scene后缀场景 */
        Laya.URL.exportSceneToJson = true;
        /**是否开启版本管理 */
        if (config_1.ConfigVersion.$.isOpenVersion) {
            Laya.ResourceVersion.enable(config_1.ConfigVersion.$.versionFloder, Laya.Handler.create(this, startCallback), Laya.ResourceVersion.FILENAME_VERSION);
        }
        else {
            startCallback.call();
        }
    }
    /**
     * 管理器的初始化
     */
    managerSetUp() {
        // DataManager.$.setup();
        // EventManager.$.setup();
        // InputManager.$.setup();
        // ResManager.$.setup();
        // JsonManager.$.setup();
        // LocaleManager.$.setup();
        // NetManager.$.setup();
        // ObjectManager.$.setup();
        // SceneManager.$.setup();
        // SoundManager.$.setup();
        // TimerManager.$.setup();
    }
    /**
     * 管理器的Update
     */
    managerUpdate() {
    }
}
Engine.instance = null;
exports.Engine = Engine;
},{"../core/log":3,"../manager/scene/scene-manager":14,"../setting/config":22,"../setting/enum":23,"../util/time":28}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const singleton_1 = require("../core/singleton");
const loading_1 = require("../../test/loading");
const main_scene_1 = require("../../client/scene/main-scene");
/**
* @author Sun
* @time 2019-08-09 14:01
* @project SFramework_LayaAir
* @description 游戏配置信息
*/
/**
 * 界面配置
 */
class ConfigUI extends singleton_1.Singleton {
    constructor() {
        super(...arguments);
        /**默认字体 */
        this.defaultFontName = '黑体';
        /**默认字体大小 */
        this.defaultFontSize = 16;
        /**默认加载场景 */
        this.defaultMainScene = main_scene_1.MainScene;
        /**默认加载的Loading页面 */
        this.defaultLoadView = loading_1.LoadingView;
        /**默认Loading页面的资源信息 */
        this.defaultLoadRes = null;
    }
    static get $() {
        if (!this.instance)
            this.instance = new ConfigUI();
        return this.instance;
    }
}
ConfigUI.instance = null;
exports.ConfigUI = ConfigUI;
/**
 * 声音配置
 */
class ConfigSound extends singleton_1.Singleton {
    constructor() {
        super(...arguments);
        /**背景音开关 */
        this.isCloseBGSound = false;
        /**效果音开关 */
        this.isCloseEffectSound = false;
        /**所有音效开关 */
        this.isCloseVoiceSound = false;
        /**背景音音量 */
        this.volumeBGSound = 1;
        /**效果音音量 */
        this.volumeEffectSound = 1;
        /**总音量 */
        this.volumeVoiceSound = 1;
        /**默认按钮音效 */
        this.defaultButtonSound = null;
    }
    static get $() {
        if (!this.instance)
            this.instance = new ConfigSound();
        return this.instance;
    }
}
/**默认Loading页面的资源信息 */
ConfigSound.instance = null;
exports.ConfigSound = ConfigSound;
/**
 * 游戏配置
 */
class ConfigGame extends singleton_1.Singleton {
    constructor() {
        super(...arguments);
        /**默认模式信息 2D/3D */
        this.dimension = enum_1.enumDimension.Dim2;
        /**物理开关 */
        this.physics = false;
    }
    static get $() {
        if (!this.instance)
            this.instance = new ConfigGame();
        return this.instance;
    }
}
ConfigGame.instance = null;
exports.ConfigGame = ConfigGame;
/**
 * 版本配置
 */
class ConfigVersion extends singleton_1.Singleton {
    constructor() {
        super(...arguments);
        /**版本控制开关 */
        this.isOpenVersion = false;
        /**版本号 */
        this.versionNum = 0;
        /**版本控制文件名 */
        this.versionFloder = "Version" + this.versionNum;
    }
    static get $() {
        if (!this.instance)
            this.instance = new ConfigVersion();
        return this.instance;
    }
}
ConfigVersion.instance = null;
exports.ConfigVersion = ConfigVersion;
/**
 * 布局配置
 */
class ConfigLayout extends singleton_1.Singleton {
    constructor() {
        super(...arguments);
        /**设计分辨率X */
        this.designWidth = 750;
        /**设计分辨率Y */
        this.designHeight = 1334;
        /**缩放模式 */
        this.scaleMode = enum_1.enumScaleType.ScaleFixedAuto;
    }
    static get $() {
        if (!this.instance)
            this.instance = new ConfigLayout();
        return this.instance;
    }
}
ConfigLayout.instance = null;
exports.ConfigLayout = ConfigLayout;
/**
 * Debug配置
 */
class ConfigDebug extends singleton_1.Singleton {
    constructor() {
        super(...arguments);
        /**调试信息开关 */
        this.isDebug = true;
        /**物理辅助线开关 */
        this.isPhysicsDebug = false;
        /**调试面板 */
        this.isEnableDebugPanel = false;
        /**性能面板开关 */
        this.isStat = true;
        /**性能统计面板X */
        this.panelX = 0;
        /**性能统计面板Y */
        this.panelY = 100;
    }
    static get $() {
        if (!this.instance)
            this.instance = new ConfigDebug();
        return this.instance;
    }
}
ConfigDebug.instance = null;
exports.ConfigDebug = ConfigDebug;
/**
 * 3D配置
 */
class Config3D extends singleton_1.Singleton {
    constructor() {
        super(...arguments);
        /**场景资源路径 */
        this.scenePath = "";
    }
    static get $() {
        if (!this.instance)
            this.instance = new Config3D();
        return this.instance;
    }
}
Config3D.instance = null;
exports.Config3D = Config3D;
// /**
//  * Network配置
//  */
// export class ConfigNet extends Singleton {
//     public httpUrl: string = "http://127.0.0.1:34568";
//     public wsUrl: string = "wss://wx.donopo.com/ws/ws";
//     public resUrl: string = "ws://127.0.0.1:16669";
//     public timeOut: number = 10;
//     public heartBeat: number = 10;
//     public serverHeartBeat: number = 3;
//     private static instance: ConfigNet = null;
//     public static get $():ConfigNet {
//         if (!this.instance) this.instance = new ConfigNet();
//         return this.instance;
//     }
// }
// /**
//  * 微信配置
//  */
// export class ConfWechat extends Singleton {
//     public appid: string = "";
//     public secret: string = "";
//     public adUnitId: string = "";
//     public code2sessionUrl = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code";
//     private static instance: ConfWechat = null;
//     public static get $():ConfWechat {
//         if (!this.instance) this.instance = new ConfWechat();
//         return this.instance;
//     }
// }
},{"../../client/scene/main-scene":2,"../../test/loading":29,"../core/singleton":5,"./enum":23}],23:[function(require,module,exports){
"use strict";
/**
 * 重要的枚举定义,框架级别
 *
 * @author Tim Wars
 * @date 2019-01-18 16:20
 * @project firebolt
 * @copyright (C) DONOPO
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Stage = Laya.Stage;
/**
 * 舞台的缩放格式
 */
var enumScaleType;
(function (enumScaleType) {
    // @ts-ignore
    enumScaleType[enumScaleType["ScaleNoScale"] = Stage.SCALE_FULL] = "ScaleNoScale";
    // @ts-ignore
    enumScaleType[enumScaleType["ScaleExactFit"] = Stage.SCALE_EXACTFIT] = "ScaleExactFit";
    // @ts-ignore
    enumScaleType[enumScaleType["ScaleShowAll"] = Stage.SCALE_SHOWALL] = "ScaleShowAll";
    // @ts-ignore
    enumScaleType[enumScaleType["ScaleNoBorder"] = Stage.SCALE_NOBORDER] = "ScaleNoBorder";
    // @ts-ignore
    enumScaleType[enumScaleType["ScaleFull"] = Stage.SCALE_FULL] = "ScaleFull";
    // @ts-ignore
    enumScaleType[enumScaleType["ScaleFixedWidth"] = Stage.SCALE_FIXED_WIDTH] = "ScaleFixedWidth";
    // @ts-ignore
    enumScaleType[enumScaleType["ScaleFixedHeight"] = Stage.SCALE_FIXED_HEIGHT] = "ScaleFixedHeight";
    // @ts-ignore
    enumScaleType[enumScaleType["ScaleFixedAuto"] = Stage.SCALE_FIXED_AUTO] = "ScaleFixedAuto";
    // @ts-ignore
    enumScaleType[enumScaleType["ScaleNoScale"] = Stage.SCALE_NOSCALE] = "ScaleNoScale";
})(enumScaleType = exports.enumScaleType || (exports.enumScaleType = {}));
/**
 * 屏幕的自适应方式
 */
var enumScreenModel;
(function (enumScreenModel) {
    enumScreenModel["ScreenNone"] = "none";
    enumScreenModel["ScreenHorizontal"] = "horizontal";
    enumScreenModel["ScreenVertical"] = "vertical";
})(enumScreenModel = exports.enumScreenModel || (exports.enumScreenModel = {}));
/**
 * 数组排序方式
 * */
var enumArraySortOrder;
(function (enumArraySortOrder) {
    enumArraySortOrder[enumArraySortOrder["Ascending"] = 0] = "Ascending";
    enumArraySortOrder[enumArraySortOrder["Descending"] = 1] = "Descending";
})(enumArraySortOrder = exports.enumArraySortOrder || (exports.enumArraySortOrder = {}));
/**
 * 游戏的运行容器
 */
var enumGamePlatform;
(function (enumGamePlatform) {
    enumGamePlatform[enumGamePlatform["Web"] = 0] = "Web";
    enumGamePlatform[enumGamePlatform["Phone"] = 1] = "Phone";
    enumGamePlatform[enumGamePlatform["Weixin"] = 2] = "Weixin";
})(enumGamePlatform = exports.enumGamePlatform || (exports.enumGamePlatform = {}));
/**
 * 对齐方式
 */
var enumAligeType;
(function (enumAligeType) {
    enumAligeType[enumAligeType["NONE"] = 0] = "NONE";
    enumAligeType[enumAligeType["RIGHT"] = 1] = "RIGHT";
    enumAligeType[enumAligeType["RIGHT_BOTTOM"] = 2] = "RIGHT_BOTTOM";
    enumAligeType[enumAligeType["BOTTOM"] = 3] = "BOTTOM";
    enumAligeType[enumAligeType["LEFT_BOTTOM"] = 4] = "LEFT_BOTTOM";
    enumAligeType[enumAligeType["LEFT"] = 5] = "LEFT";
    enumAligeType[enumAligeType["LEFT_TOP"] = 6] = "LEFT_TOP";
    enumAligeType[enumAligeType["TOP"] = 7] = "TOP";
    enumAligeType[enumAligeType["RIGHT_TOP"] = 8] = "RIGHT_TOP";
    enumAligeType[enumAligeType["MID"] = 9] = "MID";
})(enumAligeType = exports.enumAligeType || (exports.enumAligeType = {}));
/**
 * 对齐标注
 */
var enumAlige;
(function (enumAlige) {
    enumAlige["AligeLeft"] = "left";
    enumAlige["AligeCenter"] = "center";
    enumAlige["AligeRight"] = "right";
    enumAlige["AligeTop"] = "top";
    enumAlige["AligeMiddle"] = "middle";
    enumAlige["AligeBottom"] = "bottom";
})(enumAlige = exports.enumAlige || (exports.enumAlige = {}));
/**
 * 清理资源的次序策略
 */
var enumClearStrategy;
(function (enumClearStrategy) {
    enumClearStrategy[enumClearStrategy["FIFO"] = 0] = "FIFO";
    enumClearStrategy[enumClearStrategy["FILO"] = 1] = "FILO";
    enumClearStrategy[enumClearStrategy["LRU"] = 2] = "LRU";
    enumClearStrategy[enumClearStrategy["UN_USED"] = 3] = "UN_USED";
    enumClearStrategy[enumClearStrategy["ALL"] = 4] = "ALL";
})(enumClearStrategy = exports.enumClearStrategy || (exports.enumClearStrategy = {}));
/**
 * 游戏是否采用的2D或者3D
 */
var enumDimension;
(function (enumDimension) {
    enumDimension["Dim2"] = "2d";
    enumDimension["Dim3"] = "3d";
})(enumDimension = exports.enumDimension || (exports.enumDimension = {}));
/**
 * 游戏的状态
 */
var enumGameStatus;
(function (enumGameStatus) {
    enumGameStatus["Start"] = "GAME-STATUS-START";
    enumGameStatus["Stop"] = "GAME-STATUS-STOP";
    enumGameStatus["Restart"] = "GAME-STATUS-RESTART";
})(enumGameStatus = exports.enumGameStatus || (exports.enumGameStatus = {}));
/**
 lbl  --->Label(文本)
 txt  --->Text(文本)
 rtxt  --->RichText(富文本)
 ipt  --->Input(输入框)
 img  --->Image(图片)
 spt  --->Sprite(精灵)
 grh  --->Graph(图形)
 list --->List(列表)
 load --->Load(装载器)
 gup  --->Group(组)
 com  --->Component(组件)
 btn  --->Button(按钮)
 cob  --->ComboBow(下拉框)
 pbar --->ProgressBar(进度条)
 sld  --->Slider(滑动条)
 win  --->Window（窗口）
 ani  --->Movie(动画)
 eft  --->Transition(动效)
 ctl  --->Controller(控制器)
 */
/**
 * 控件前缀
 */
var enumElementPrefix;
(function (enumElementPrefix) {
    enumElementPrefix["Lable"] = "lbl_";
    enumElementPrefix["Input"] = "ipt_";
    enumElementPrefix["Text"] = "txt_";
    enumElementPrefix["RichText"] = "rtxt_";
    enumElementPrefix["Image"] = "img_";
    enumElementPrefix["Sprite"] = "spt_";
    enumElementPrefix["Graph"] = "grh_";
    enumElementPrefix["List"] = "list_";
    enumElementPrefix["Load"] = "load_";
    enumElementPrefix["Group"] = "gup_";
    enumElementPrefix["Component"] = "com_";
    enumElementPrefix["Button"] = "btn_";
    enumElementPrefix["ComboBow"] = "cob_";
    enumElementPrefix["ProgressBar"] = "pbar_";
    enumElementPrefix["Slider"] = "sld_";
    enumElementPrefix["Window"] = "win_";
    enumElementPrefix["Movie"] = "ani_";
    enumElementPrefix["Transition"] = "eft_";
    enumElementPrefix["Controller"] = "ctl_";
})(enumElementPrefix = exports.enumElementPrefix || (exports.enumElementPrefix = {}));
},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dict_1 = require("../util/dict");
/**
 * @author Sun
 * @time 2019-05-21 19:22
 * @project SFramework_LayaAir
 * @description  字典
 *
 */
class Dictionary {
    constructor() {
        this.m_dict = {};
    }
    add(key, value) {
        if (this.hasKey(key))
            return false;
        this.m_dict[key] = value;
        return true;
    }
    remove(key) {
        delete this.m_dict[key];
    }
    hasKey(key) {
        return (this.m_dict[key] != null);
    }
    value(key) {
        if (!this.hasKey(key))
            return null;
        return this.m_dict[key];
    }
    keys() {
        let list = [];
        for (let key in this.m_dict) {
            list.push(key);
        }
        return list;
    }
    values() {
        let list = [];
        for (let key in this.m_dict) {
            list.push(this.m_dict[key]);
        }
        return list;
    }
    clear() {
        for (let key in this.m_dict) {
            delete this.m_dict[key];
        }
    }
    foreach(compareFn) {
        for (let key in this.m_dict) {
            compareFn.call(null, key, this.m_dict[key]);
        }
    }
    foreachBreak(compareFn) {
        for (let key in this.m_dict) {
            if (!compareFn.call(null, key, this.m_dict[key]))
                break;
        }
    }
    get length() {
        return dict_1.UtilDict.size(this.m_dict);
    }
}
exports.Dictionary = Dictionary;
},{"../util/dict":26}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../setting/enum");
/**
* @author Sun
* @time 2019-08-09 23:15
* @project SFramework_LayaAir
* @description 数组工具类
*/
class UtilArray {
    /** 插入元素
     * @param arr 需要操作的数组
     * @param value 需要插入的元素
     * @param index 插入位置
     */
    static insert(arr, value, index) {
        if (index > arr.length - 1) {
            arr.push(value);
        }
        else {
            arr.splice(index, 0, value);
        }
    }
    /**从数组移除元素*/
    static remove(arr, v) {
        let i = arr.indexOf(v);
        if (i != -1) {
            arr.splice(i, 1);
        }
    }
    /**移除所有值等于v的元素*/
    static removeAll(arr, v) {
        let i = arr.indexOf(v);
        while (i >= 0) {
            arr.splice(i, 1);
            i = arr.indexOf(v);
        }
    }
    /**包含元素*/
    static contain(arr, v) {
        return arr.length > 0 ? arr.indexOf(v) != -1 : false;
    }
    /**复制*/
    static copy(arr) {
        return arr.slice();
    }
    /**
     * 排序
     * @param arr 需要排序的数组
     * @param key 排序字段
     * @param order 排序方式
     */
    static sort(arr, key, order = enum_1.enumArraySortOrder.Descending) {
        if (arr == null)
            return;
        arr.sort(function (info1, info2) {
            switch (order) {
                case enum_1.enumArraySortOrder.Ascending: {
                    if (info1[key] < info2[key])
                        return -1;
                    if (info1[key] > info2[key])
                        return 1;
                    else
                        return 0;
                }
                case enum_1.enumArraySortOrder.Descending: {
                    if (info1[key] > info2[key])
                        return -1;
                    if (info1[key] < info2[key])
                        return 1;
                    else
                        return 0;
                }
            }
        });
    }
    /**清空数组*/
    static clear(arr) {
        let i = 0;
        let len = arr.length;
        for (; i < len; ++i) {
            arr[i] = null;
        }
        arr.splice(0);
    }
    /**数据是否为空*/
    static isEmpty(arr) {
        if (arr == null || arr.length == 0) {
            return true;
        }
        return false;
    }
}
exports.UtilArray = UtilArray;
},{"../setting/enum":23}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @author Sun
* @time 2019-08-10 20:22
* @project SFramework_LayaAir
* @description  字典工具类
*
*/
class UtilDict {
    /**
     * 键列表
     */
    static keys(d) {
        let a = [];
        for (let key in d) {
            a.push(key);
        }
        return a;
    }
    /**
     * 值列表
     */
    static values(d) {
        let a = [];
        for (let key in d) {
            a.push(d[key]);
        }
        return a;
    }
    /**
     * 清空字典
     */
    static clear(dic) {
        let v;
        for (let key in dic) {
            v = dic[key];
            if (v instanceof Object) {
                UtilDict.clear(v);
            }
            delete dic[key];
        }
    }
    /**
     * 全部应用
     */
    static foreach(dic, compareFn) {
        for (let key in dic) {
            if (!compareFn.call(null, key, dic[key]))
                break;
        }
    }
    static isEmpty(dic) {
        if (dic == null)
            return true;
        // @ts-ignore
        for (let key in dic) {
            return false;
        }
        return true;
    }
    static size(dic) {
        if (dic == null)
            return 0;
        let count = 0;
        for (let key in dic) {
            ++count;
        }
        return count;
    }
}
exports.UtilDict = UtilDict;
},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sprite = Laya.Sprite;
class UtilDisplay {
    /**
     * 移除全部子对象
     * @param container
     */
    static removeAllChild(container) {
        if (!container)
            return;
        if (container.numChildren <= 0)
            return;
        while (container.numChildren > 0) {
            container.removeChildAt(0);
        }
    }
    /**
     *
     * @param node 销毁UI节点
     */
    static destroyUINode(node) {
        if (node) {
            node.removeSelf();
            node.destroy();
            node = null;
        }
    }
    /**
     * 通过名字获得子节点
     * @param parent
     * @param name
     */
    static getChildByName(parent, name) {
        if (!parent)
            return null;
        if (parent.name === name)
            return parent;
        let child = null;
        let num = parent.numChildren;
        for (let i = 0; i < num; ++i) {
            child = UtilDisplay.getChildByName(parent.getChildAt(i), name);
            if (child)
                return child;
        }
        return null;
    }
    // /**
    //  * 设置对齐方式
    //  * @param alige 对齐方式
    //  */
    // public static setAlige(node: Sprite, alige: enumAligeType, w: number = 0, h: number = 0) {
    //     if (!node) return;
    //     let rect: Rectangle;
    //     if (w <= 0 || h <= 0) rect = node.getBounds();
    //     let width: number = w > 0 ? w : rect.width;
    //     let heigth: number = h > 0 ? h : rect.height;
    //     switch (alige) {
    //         case enumAligeType.LEFT_TOP:
    //             node.pivot(0, 0);
    //             break;
    //         case enumAligeType.LEFT:
    //             node.pivot(0, heigth * 0.5);
    //             break;
    //         case enumAligeType.LEFT_BOTTOM:
    //             node.pivot(0, heigth);
    //             break;
    //         case enumAligeType.TOP:
    //             node.pivot(width * 0.5, 0);
    //             break;
    //         case enumAligeType.MID:
    //             node.pivot(width * 0.5, heigth * 0.5);
    //             break;
    //         case enumAligeType.BOTTOM:
    //             node.pivot(width * 0.5, heigth);
    //             break;
    //         case enumAligeType.RIGHT_TOP:
    //             node.pivot(width, 0);
    //             break;
    //         case enumAligeType.RIGHT:
    //             node.pivot(width, heigth * 0.5);
    //             break;
    //         case enumAligeType.RIGHT_BOTTOM:
    //             node.pivot(width, heigth);
    //             break;
    //     }
    // }
    /**
     * 创建透明遮罩
     */
    static createMaskLayer() {
        let layer = new Sprite();
        layer.mouseEnabled = true;
        let width = layer.width = Laya.stage.width + 200;
        var height = layer.height = Laya.stage.height + 400;
        layer.graphics.clear(true);
        layer.graphics.drawRect(0, 0, width, height, UIConfig.popupBgColor);
        layer.alpha = UIConfig.popupBgAlpha;
        return layer;
    }
}
exports.UtilDisplay = UtilDisplay;
},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Sun
 * @time 2019-08-09 19:18
 * @project SFramework_LayaAir
 * @description  时间工具
 *
 */
class UtilTime {
    static start() {
        this.m_StartTime = Laya.timer.currTimer;
    }
    /**两帧之间的时间间隔,单位秒*/
    static get deltaTime() {
        return Laya.timer.delta * 0.001;
    }
    /**固定两帧之间的时间间隔*/
    static get fixedDeltaTime() {
        return 0;
    }
    /**当前时间，相对xxxx年开始经过的毫秒数*/
    static get time() {
        return Laya.timer.currTimer;
    }
    /**游戏启动到现在的时间,单位毫秒*/
    static get timeSinceStartup() {
        return (Laya.timer.currTimer - this.m_StartTime);
    }
    /**游戏启动后，经过的帧数*/
    static get frameCount() {
        return Laya.timer.currFrame;
    }
    static get timeScale() {
        return Laya.timer.scale;
    }
    static set timeScale(scale) {
        Laya.timer.scale = scale;
    }
}
UtilTime.m_StartTime = 0;
exports.UtilTime = UtilTime;
},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../ui/layaMaxUI");
var loadingUI = layaMaxUI_1.ui.view.main.loadingUI;
class LoadingView extends loadingUI {
}
exports.LoadingView = LoadingView;
},{"../ui/layaMaxUI":30}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_base_1 = require("../framework/manager/ui/view-base");
const dialog_base_1 = require("../framework/manager/ui/dialog-base");
var DialogBase = dialog_base_1.CustomDialog.DialogBase;
var ViewBase = view_base_1.CustomView.ViewBase;
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var view;
    (function (view) {
        var com;
        (function (com) {
            class day7sUI extends DialogBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(day7sUI.uiView);
                }
            }
            day7sUI.uiView = { "type": "DialogBase", "props": { "width": 750, "height": 1334 }, "compId": 2, "loadList": [], "loadList3D": [] };
            com.day7sUI = day7sUI;
            REG("ui.view.com.day7sUI", day7sUI);
            class inviteUI extends DialogBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(inviteUI.uiView);
                }
            }
            inviteUI.uiView = { "type": "DialogBase", "props": { "width": 750, "height": 1624 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 820, "x": 375, "width": 668, "skin": "res/resource/base/com/dialog/img_outside_box.png", "sizeGrid": "84,88,88,74", "height": 1161, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5, "child": [{ "type": "Image", "props": { "y": 45.5, "x": 117.5, "skin": "res/resource/base/invite/img_title.png" }, "compId": 50 }, { "type": "Image", "props": { "y": 143, "x": 51.5, "width": 565, "skin": "res/resource/base/com/dialog/img_Inside_box.png", "height": 510 }, "compId": 48 }, { "type": "Image", "props": { "y": 676, "x": 51.5, "width": 565, "skin": "res/resource/base/com/dialog/img_Inside_box.png", "height": 334 }, "compId": 49 }, { "type": "List", "props": { "y": 173, "x": 78, "width": 516, "var": "listInviteA", "spaceY": 20, "height": 452, "elasticEnabled": true }, "compId": 14, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 515, "renderType": "render", "height": 70 }, "compId": 10, "child": [{ "type": "Image", "props": { "skin": "res/resource/base/invite/img_invite_reward_list_bg.png" }, "compId": 9 }, { "type": "Label", "props": { "y": 23.5, "x": 88, "text": "10/10人", "strokeColor": "#fbf9f9", "stroke": 2, "name": "lbl_progress", "fontSize": 30, "color": "#414040" }, "compId": 17 }, { "type": "Label", "props": { "y": 13, "x": 16, "text": "1", "strokeColor": "#fdf9f9", "stroke": 2, "name": "lbl_index", "fontSize": 44, "color": "#414040", "bold": true }, "compId": 16 }, { "type": "Button", "props": { "y": 34, "x": 441, "stateNum": 1, "skin": "res/resource/base/invite/btn_r_got_3.png", "name": "btn_get", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 15 }, { "type": "Image", "props": { "y": 20.5, "x": 309.369140625, "skin": "res/resource/base/com/img_diamond_1.png", "scaleY": 0.8, "scaleX": 0.8 }, "compId": 51 }, { "type": "Label", "props": { "y": 21.5, "x": 301, "text": "100", "strokeColor": "#fdfbfb", "stroke": 2, "name": "lbl_diamond", "fontSize": 30, "font": "Arial", "color": "#414040", "anchorX": 1 }, "compId": 18 }] }, { "type": "VScrollBar", "props": { "y": 558, "x": 0, "name": "scrollbar" }, "compId": 42 }] }, { "type": "List", "props": { "y": 732, "x": 77, "width": 516, "var": "listInviteB", "spaceX": 9, "repeatY": 1, "height": 262, "elasticEnabled": true }, "compId": 31, "child": [{ "type": "Box", "props": { "y": 1, "x": 5, "width": 121, "renderType": "render", "height": 260 }, "compId": 39, "child": [{ "type": "Image", "props": { "y": 1, "x": 0, "skin": "res/resource/base/invite/img_invite_now_list_bg.png" }, "compId": 38 }, { "type": "Label", "props": { "y": 24, "x": 60, "var": "lblIndex", "text": "第1位", "strokeColor": "#fffdfd", "stroke": 2, "name": "lbl_index", "fontSize": 24, "color": "#414040", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 45 }, { "type": "Image", "props": { "y": 51, "x": 10, "width": 100, "skin": "res/resource/base/rank/img_avatar_mask.png", "name": "sp_head", "height": 100 }, "compId": 43 }, { "type": "Button", "props": { "y": 228, "x": 60, "stateNum": 1, "skin": "res/resource/base/invite/btn_c_got_3.png", "name": "btn_get", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 40 }, { "type": "Label", "props": { "y": 172, "x": 58, "var": "lblName", "text": "+20钻", "strokeColor": "#fbf8f8", "stroke": 2, "name": "lbl_name", "fontSize": 20, "color": "#414040", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 46 }] }, { "type": "HScrollBar", "props": { "y": -558, "x": 0, "name": "scrollbar" }, "compId": 41 }] }, { "type": "Button", "props": { "y": 76, "x": 596, "var": "btnClose", "stateNum": 1, "skin": "res/resource/base/com/btn_close.png", "scaleY": 1.1, "scaleX": 1.1, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6 }, { "type": "Button", "props": { "y": 1068, "x": 322, "var": "btnInvite", "stateNum": 1, "skin": "res/resource/base/invite/btn_invite.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 7 }, { "type": "ProgressBar", "props": { "y": 689, "x": 75, "var": "pgsInvite", "value": 1, "skin": "res/resource/base/invite/progress_invite.png" }, "compId": 8, "child": [{ "type": "Label", "props": { "y": 2, "x": 229.8056640625, "var": "lblPgs", "text": "0 / 50 ", "strokeColor": "#fffdfd", "stroke": 4, "fontSize": 28, "color": "#724040", "bold": true }, "compId": 44 }] }] }], "loadList": ["res/resource/base/com/dialog/img_outside_box.png", "res/resource/base/invite/img_title.png", "res/resource/base/com/dialog/img_Inside_box.png", "res/resource/base/invite/img_invite_reward_list_bg.png", "res/resource/base/invite/btn_r_got_3.png", "res/resource/base/com/img_diamond_1.png", "res/resource/base/invite/img_invite_now_list_bg.png", "res/resource/base/rank/img_avatar_mask.png", "res/resource/base/invite/btn_c_got_3.png", "res/resource/base/com/btn_close.png", "res/resource/base/invite/btn_invite.png", "res/resource/base/invite/progress_invite.png"], "loadList3D": [] };
            com.inviteUI = inviteUI;
            REG("ui.view.com.inviteUI", inviteUI);
            class lotteryUI extends DialogBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(lotteryUI.uiView);
                }
            }
            lotteryUI.uiView = { "type": "DialogBase", "props": { "width": 750, "height": 1624 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 812, "x": 375 }, "compId": 7, "child": [{ "type": "Image", "props": { "y": -95, "x": 0, "var": "imgContext", "skin": "res/resource/base/lottery/img_lottery_content.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6, "child": [{ "type": "Label", "props": { "y": 400, "x": 452, "var": "lblIndex3", "text": " ×5 ", "stroke": 10, "rotation": 120, "fontSize": 65, "font": "Helvetica", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 23 }, { "type": "Label", "props": { "y": 263, "x": 453, "var": "lblIndex2", "text": "×3 ", "stroke": 10, "rotation": 60, "overflow": "visible", "fontSize": 65, "font": "Helvetica", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 22 }, { "type": "Label", "props": { "y": 191, "x": 327, "var": "lblIndex1", "text": " ×2 ", "stroke": 10, "overflow": "scroll", "fontSize": 65, "font": "Helvetica", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 21 }, { "type": "Label", "props": { "y": 472, "x": 329, "var": "lblIndex4", "text": " ×6 ", "stroke": 10, "rotation": 180, "fontSize": 65, "font": "Helvetica", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 24 }, { "type": "Label", "props": { "y": 398, "x": 212, "var": "lblIndex5", "text": " ×7 ", "stroke": 10, "rotation": 240, "fontSize": 65, "font": "Helvetica", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 26 }, { "type": "Label", "props": { "y": 264, "x": 211, "var": "lblIndex6", "text": " ×10 ", "stroke": 10, "rotation": 300, "fontSize": 65, "font": "Helvetica", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 25 }] }, { "type": "Image", "props": { "y": -462, "x": -369, "skin": "res/resource/base/lottery/img_lottery_border.png" }, "compId": 5, "child": [{ "type": "Image", "props": { "y": 367, "x": 367, "skin": "res/resource/base/lottery/img_lottery_light.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 34 }] }, { "type": "Image", "props": { "y": -544, "x": -50, "skin": "res/resource/base/lottery/img_lottery_arrow.png" }, "compId": 42 }, { "type": "Script", "props": { "styleSkin": "../../../../../../../Widget", "enabled": true, "centerY": 0, "centerX": 0, "runtime": "laya.ui.Widget" }, "compId": 8 }, { "type": "Image", "props": { "zOrder": 0, "y": 272, "x": -106, "var": "imgBtn", "skin": "res/resource/base/lottery/img_lottery_cat.png" }, "compId": 35, "child": [{ "type": "Button", "props": { "y": 206, "x": 106, "var": "btnStart", "stateNum": 1, "skin": "res/resource/base/lottery/btn_lottery_start.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4 }, { "type": "Image", "props": { "y": 158, "x": -2, "width": 216, "var": "imgNext", "stateNum": 1, "skin": "res/resource/base/com/btn_common_4.png", "sizeGrid": "0,39,0,46", "height": 94, "gray": true }, "compId": 43 }, { "type": "Label", "props": { "y": 177, "x": 38, "var": "lblTime", "text": "8:00:00", "strokeColor": "#024958", "stroke": 4, "fontSize": 40, "color": "#ffffff" }, "compId": 31 }, { "type": "Image", "props": { "y": 12, "x": -37.5, "var": "star0", "skin": "res/resource/base/lottery/img_lottery_star.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 36 }, { "type": "Image", "props": { "y": 60, "x": 14, "var": "star1", "skin": "res/resource/base/lottery/img_lottery_star.png", "scaleY": 0.7, "scaleX": 0.7, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 38 }, { "type": "Image", "props": { "y": 97, "x": -37, "var": "star2", "skin": "res/resource/base/lottery/img_lottery_star.png", "scaleY": 0.7, "scaleX": 0.7, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 37 }, { "type": "Image", "props": { "y": 54, "x": 218, "var": "star3", "skin": "res/resource/base/lottery/img_lottery_star.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 39 }, { "type": "Image", "props": { "y": 11, "x": 267, "var": "star4", "skin": "res/resource/base/lottery/img_lottery_star.png", "scaleY": 0.7, "scaleX": 0.7, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 40 }, { "type": "Image", "props": { "y": 108, "x": 271, "var": "star5", "skin": "res/resource/base/lottery/img_lottery_star.png", "scaleY": 0.7, "scaleX": 0.7, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 41 }] }, { "type": "Button", "props": { "y": -545, "x": 293, "var": "btnClose", "stateNum": 1, "skin": "res/resource/base/com/btn_close.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 9 }, { "type": "Label", "props": { "y": -95, "x": 1, "var": "lblBase", "text": "1.0K", "strokeColor": "#fad141", "stroke": 10, "overflow": "scroll", "fontSize": 40, "font": "Helvetica", "color": "#000000", "bold": true, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 44 }] }], "animations": [{ "nodes": [{ "target": 34, "keyframes": { "x": [{ "value": 367, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "x", "index": 0 }, { "value": 367, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "x", "index": 10 }, { "value": 367, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "x", "index": 25 }], "visible": [{ "value": true, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 0 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 10 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 15 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 25 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 30 }], "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 10 }, { "value": 7, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 15 }, { "value": 7, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 25 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 30 }] } }], "name": "idle", "id": 1, "frameRate": 24, "action": 0 }], "loadList": ["res/resource/base/lottery/img_lottery_content.png", "res/resource/base/lottery/img_lottery_border.png", "res/resource/base/lottery/img_lottery_light.png", "res/resource/base/lottery/img_lottery_arrow.png", "res/resource/base/lottery/img_lottery_cat.png", "res/resource/base/lottery/btn_lottery_start.png", "res/resource/base/com/btn_common_4.png", "res/resource/base/lottery/img_lottery_star.png", "res/resource/base/com/btn_close.png"], "loadList3D": [] };
            com.lotteryUI = lotteryUI;
            REG("ui.view.com.lotteryUI", lotteryUI);
            class rankUI extends DialogBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(rankUI.uiView);
                }
            }
            rankUI.uiView = { "type": "DialogBase", "props": { "width": 750, "height": 1624 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 812, "x": 375, "skin": "res/resource/base/rank/img_rank_bg.png", "layoutEnabled": true, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 165, "x": 163, "skin": "res/resource/base/rank/img_title.png" }, "compId": 10 }, { "type": "Button", "props": { "y": 198, "x": 583, "var": "btnClose", "stateNum": 1, "skin": "res/resource/base/com/btn_close.png", "scaleY": 1.1, "scaleX": 1.1, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5 }] }, { "type": "WXOpenDataViewer", "props": { "y": 381, "x": 116, "width": 524, "mouseThrough": true, "iconSign": "wx", "height": 858, "runtime": "laya.ui.WXOpenDataViewer" }, "compId": 3 }], "loadList": ["res/resource/base/rank/img_rank_bg.png", "res/resource/base/rank/img_title.png", "res/resource/base/com/btn_close.png"], "loadList3D": [] };
            com.rankUI = rankUI;
            REG("ui.view.com.rankUI", rankUI);
            class shopUI extends DialogBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(shopUI.uiView);
                }
            }
            shopUI.uiView = { "type": "DialogBase", "props": { "width": 750, "mouseThrough": true, "height": 1624 }, "compId": 2, "child": [{ "type": "Button", "props": { "var": "btnHome", "top": 82, "stateNum": 1, "skin": "res/resource/base/com/btn_home.png", "left": 28, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 44 }, { "type": "Image", "props": { "var": "box_shop", "skin": "res/resource/base/shop/img_box_bg.png", "right": 0, "left": 0, "bottom": 0, "alpha": 0 }, "compId": 4, "child": [{ "type": "Panel", "props": { "y": 768, "x": 0, "width": 147, "var": "p1", "pivotY": 163, "height": 163, "bottom": 0 }, "compId": 14, "child": [{ "type": "Label", "props": { "y": 120, "x": 105, "wordWrap": true, "var": "lp1", "valign": "middle", "text": "0", "leading": 10, "gray": false, "fontSize": 18, "color": "#d73253", "bold": true, "anchorY": 1, "align": "center" }, "compId": 71 }, { "type": "Image", "props": { "y": 163, "x": 0, "width": 147, "var": "high1", "skin": "res/resource/base/shop/menu/img_btn_high_01.png", "pivotY": 163, "height": 163 }, "compId": 124, "child": [{ "type": "Label", "props": { "y": 127, "x": 98, "wordWrap": true, "width": 27, "var": "hp1", "valign": "middle", "text": "0", "strokeColor": "#fad141", "stroke": 2, "pivotY": 30, "overflow": "scroll", "leading": 10, "height": 30, "gray": false, "fontSize": 20, "color": "#2d2a2a", "bold": true, "align": "center" }, "compId": 78 }] }, { "type": "Image", "props": { "y": 29, "var": "icon1", "skin": "res/resource/cat/catNew/image_icon_red_1.png", "scaleY": 0.7, "scaleX": 0.7, "right": 10 }, "compId": 130 }] }, { "type": "Panel", "props": { "y": 770, "x": 147, "width": 130, "var": "p2", "pivotY": 150, "height": 150, "bottom": 0 }, "compId": 15, "child": [{ "type": "Label", "props": { "y": 107, "x": 85, "wordWrap": true, "width": 17, "var": "lp2", "valign": "middle", "text": "0", "overflow": "scroll", "leading": 10, "height": 28, "gray": false, "fontSize": 18, "color": "#d73253", "bold": true, "anchorY": 1, "anchorX": 0, "align": "center" }, "compId": 72 }, { "type": "Image", "props": { "y": 150, "x": 0, "var": "high2", "skin": "res/resource/base/shop/menu/img_btn_high_02.png", "pivotY": 150, "height": 150 }, "compId": 125, "child": [{ "type": "Label", "props": { "y": 115, "x": 88, "wordWrap": true, "width": 26, "var": "hp2", "valign": "middle", "text": "0", "strokeColor": "#fad141", "stroke": 2, "pivotY": 30, "overflow": "scroll", "leading": 10, "height": 30, "gray": false, "fontSize": 20, "color": "#2d2a2a", "bold": true, "align": "center" }, "compId": 77 }] }, { "type": "Image", "props": { "y": 16, "var": "icon2", "skin": "res/resource/cat/catNew/image_icon_red_1.png", "scaleY": 0.7, "scaleX": 0.7, "right": 10 }, "compId": 131 }] }, { "type": "Panel", "props": { "y": 770, "x": 277, "width": 196, "var": "p0", "pivotY": 150, "height": 150, "bottom": 0 }, "compId": 16, "child": [{ "type": "Label", "props": { "y": 103, "x": 134, "wordWrap": true, "width": 21, "var": "lp0", "valign": "middle", "text": "1", "overflow": "scroll", "leading": 10, "height": 28, "gray": false, "fontSize": 18, "color": "#d73253", "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" }, "compId": 73 }, { "type": "Image", "props": { "y": 150, "x": 0, "width": 196, "var": "high0", "skin": "res/resource/base/shop/menu/img_btn_high_03.png", "pivotY": 150, "height": 150 }, "compId": 126, "child": [{ "type": "Label", "props": { "y": 113, "x": 117, "wordWrap": true, "width": 30, "var": "hp0", "valign": "middle", "text": "1", "strokeColor": "#fad141", "stroke": 2, "pivotY": 30, "overflow": "scroll", "leading": 10, "height": 30, "gray": false, "fontSize": 20, "color": "#2d2a2a", "bold": true, "align": "center" }, "compId": 76 }] }, { "type": "Image", "props": { "y": 16, "var": "icon0", "skin": "res/resource/cat/catNew/image_icon_red_1.png", "scaleY": 0.7, "scaleX": 0.7, "right": 16 }, "compId": 132 }] }, { "type": "Panel", "props": { "y": 770, "x": 473, "width": 131, "var": "p3", "pivotY": 150, "height": 150, "bottom": 0 }, "compId": 17, "child": [{ "type": "Label", "props": { "y": 106, "x": 86, "wordWrap": true, "width": 19, "var": "lp3", "valign": "middle", "text": "0", "overflow": "scroll", "leading": 10, "height": 28, "gray": false, "fontSize": 18, "color": "#d73253", "bold": true, "anchorY": 1, "align": "center" }, "compId": 74 }, { "type": "Image", "props": { "y": 150, "x": 0, "width": 131, "var": "high3", "skin": "res/resource/base/shop/menu/img_btn_high_04.png", "pivotY": 150, "height": 150 }, "compId": 127, "child": [{ "type": "Label", "props": { "y": 114, "x": 88, "wordWrap": true, "width": 26, "var": "hp3", "valign": "middle", "text": "0", "strokeColor": "#fad141", "stroke": 2, "pivotY": 30, "overflow": "scroll", "leading": 10, "height": 30, "gray": false, "fontSize": 20, "color": "#2d2a2a", "bold": true, "align": "center" }, "compId": 75 }] }, { "type": "Image", "props": { "y": 16, "var": "icon3", "skin": "res/resource/cat/catNew/image_icon_red_1.png", "scaleY": 0.7, "scaleX": 0.7, "right": 10 }, "compId": 133 }] }, { "type": "Panel", "props": { "y": 770, "x": 604, "width": 146, "var": "p4", "pivotY": 163, "height": 163, "bottom": 0 }, "compId": 18, "child": [{ "type": "Label", "props": { "y": 120, "x": 91, "wordWrap": true, "width": 17, "var": "lp4", "valign": "middle", "text": "0", "pivotY": 28, "overflow": "scroll", "leading": 10, "height": 28, "gray": false, "fontSize": 18, "color": "#d73253", "bold": true, "align": "center" }, "compId": 70 }, { "type": "Image", "props": { "y": 163, "x": 0, "width": 146, "var": "high4", "skin": "res/resource/base/shop/menu/img_btn_high_05.png", "pivotY": 163, "height": 163 }, "compId": 128, "child": [{ "type": "Label", "props": { "y": 126, "x": 101, "wordWrap": true, "width": 20, "var": "hp4", "valign": "middle", "text": "0", "strokeColor": "#fad141", "stroke": 2, "pivotY": 30, "overflow": "scroll", "leading": 10, "height": 30, "gray": false, "fontSize": 20, "color": "#2d2a2a", "bold": true, "align": "center" }, "compId": 69 }] }, { "type": "Image", "props": { "y": 29, "var": "icon4", "skin": "res/resource/cat/catNew/image_icon_red_1.png", "scaleY": 0.7, "scaleX": 0.7, "right": 16 }, "compId": 134 }] }, { "type": "List", "props": { "y": 59, "visible": false, "var": "list1", "right": 0, "repeatX": 1, "left": 0, "height": 558, "elasticEnabled": true }, "compId": 11, "child": [{ "type": "shopitem", "props": { "y": 0, "runtime": "client/base/item/ShopItem.ts", "right": 0, "renderType": "render", "left": 0 }, "compId": 12 }] }, { "type": "List", "props": { "y": 60, "visible": false, "var": "list2", "right": 0, "repeatX": 1, "left": 0, "height": 558, "elasticEnabled": true }, "compId": 22, "child": [{ "type": "shopitem", "props": { "y": 0, "runtime": "client/base/item/ShopItem.ts", "right": 0, "renderType": "render", "left": 0 }, "compId": 24 }] }, { "type": "List", "props": { "y": 60, "var": "list0", "right": 0, "repeatX": 1, "left": 0, "height": 558, "elasticEnabled": true }, "compId": 28, "child": [{ "type": "shopitem", "props": { "y": 0, "runtime": "client/base/item/ShopItem.ts", "right": 0, "renderType": "render", "left": 0 }, "compId": 30 }] }, { "type": "List", "props": { "y": 60, "visible": false, "var": "list3", "right": 0, "repeatX": 1, "left": 0, "height": 558, "elasticEnabled": true }, "compId": 31, "child": [{ "type": "shopitem", "props": { "y": 0, "runtime": "client/base/item/ShopItem.ts", "right": 0, "renderType": "render", "left": 0 }, "compId": 33 }] }, { "type": "List", "props": { "y": 60, "visible": false, "var": "list4", "right": 0, "repeatX": 1, "left": 0, "height": 558, "elasticEnabled": true }, "compId": 34, "child": [{ "type": "shopitem", "props": { "y": 0, "runtime": "client/base/item/ShopItem.ts", "right": 0, "renderType": "render", "left": 0 }, "compId": 36 }] }, { "type": "Image", "props": { "y": 597.5, "skin": "res/resource/base/shop/img_box_btm.png", "right": 0, "left": 0 }, "compId": 112 }, { "type": "Image", "props": { "y": 46.5, "skin": "res/resource/base/shop/img_box_top.png", "right": 0, "left": 0 }, "compId": 113 }, { "type": "Button", "props": { "y": -8, "x": 649, "width": 153, "var": "btnGetOff", "stateNum": 1, "skin": "res/resource/base/shop/btn_getOff.png", "pivotY": 76, "pivotX": 77, "height": 109 }, "compId": 135 }, { "type": "Button", "props": { "y": -20, "var": "btnUnlock", "stateNum": 1, "skin": "res/resource/base/shop/btn_unlock.png", "right": 26, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 63 }, { "type": "Button", "props": { "y": -20, "var": "btnLock", "stateNum": 1, "skin": "res/resource/base/shop/btn_notunlock.png", "right": 26, "mouseEnabled": false, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 64, "child": [{ "type": "Label", "props": { "y": 14, "x": 78.5, "var": "lblNextNeed", "text": "10", "strokeColor": "#fdfbfb", "stroke": 4, "pivotY": 0, "fontSize": 24, "color": "#642726", "bold": true, "anchorX": 1 }, "compId": 65 }] }, { "type": "Button", "props": { "y": -19, "var": "btnChangeSkin", "stateNum": 1, "skin": "res/resource/base/shop/btn_change_cat.png", "right": 26, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 66 }, { "type": "Button", "props": { "y": -19, "var": "btnChangeAcc", "stateNum": 1, "skin": "res/resource/base/shop/btn_change_item.png", "right": 30, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 68 }] }, { "type": "Image", "props": { "visible": false, "var": "imgInfo", "skin": "res/resource/base/com/dialog/img_outside_box.png", "right": 0, "pivotY": 899, "pivotX": 384, "left": 0, "height": 899, "bottom": 48 }, "compId": 80, "child": [{ "type": "Image", "props": { "y": 134, "x": 40, "width": 686, "skin": "res/resource/base/com/dialog/img_Inside_box.png", "height": 690 }, "compId": 81 }, { "type": "Image", "props": { "y": 332, "x": 58, "skin": "res/resource/base/com/dialog/img_inside_box_blue.png" }, "compId": 84 }, { "type": "Image", "props": { "y": 153, "x": 321.5, "skin": "res/resource/base/shop/img_avatar_box.png" }, "compId": 85, "child": [{ "type": "Image", "props": { "y": 25, "x": 2.5, "var": "imgAvatar", "skin": "res/resource/base/shop/avatar/img_avatar_0.png" }, "compId": 86 }] }, { "type": "Label", "props": { "y": 311.5, "x": 384.5, "var": "lblName", "valign": "middle", "text": "柯南领结", "strokeColor": "#fad141", "stroke": 6, "leading": 10, "gray": false, "fontSize": 29, "font": "Arial", "color": "#2d2a2a", "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" }, "compId": 111 }, { "type": "Image", "props": { "y": 429, "x": 232.5, "skin": "res/resource/base/shop/img_run_bg.png" }, "compId": 118, "child": [{ "type": "Label", "props": { "y": 8.5, "x": 134, "var": "lblrun", "text": "50%", "strokeColor": "#fdfbfb", "stroke": 4, "pivotY": 0, "fontSize": 24, "color": "#642726", "bold": true, "anchorX": 0 }, "compId": 119 }] }, { "type": "Image", "props": { "y": 362, "x": 235, "var": "imga0", "skin": "res/resource/base/shop/img_ball_blue.png" }, "compId": 88, "child": [{ "type": "Label", "props": { "y": 24, "x": 51, "var": "lbla0", "text": "1", "stroke": 4, "pivotY": 15, "pivotX": 34, "fontSize": 24, "color": "#fbf8f8", "bold": true }, "compId": 91 }] }, { "type": "Image", "props": { "y": 363, "x": 310, "var": "imga1", "skin": "res/resource/base/shop/img_ball_blue.png" }, "compId": 89, "child": [{ "type": "Label", "props": { "y": 24, "x": 51, "var": "lbla1", "text": "1", "stroke": 4, "pivotY": 15, "pivotX": 34, "fontSize": 24, "color": "#fbf8f8", "bold": true }, "compId": 92 }] }, { "type": "Image", "props": { "y": 363, "x": 381, "var": "imga2", "skin": "res/resource/base/shop/img_ball_red.png" }, "compId": 90, "child": [{ "type": "Label", "props": { "y": 24.5, "x": 51, "var": "lbla2", "text": "1", "stroke": 4, "pivotY": 15, "pivotX": 34, "fontSize": 24, "color": "#fbf8f8", "bold": true }, "compId": 93 }] }, { "type": "Image", "props": { "y": 50, "x": 312, "skin": "res/resource/base/com/text/img_dangan_title.png" }, "compId": 95 }, { "type": "Label", "props": { "y": 510, "x": 235, "wordWrap": true, "var": "lbldsex", "valign": "middle", "text": "11111", "overflow": "scroll", "leading": 10, "gray": false, "fontSize": 22, "color": "#23335c", "bold": true, "anchorY": 0.5, "anchorX": 0, "align": "center" }, "compId": 96 }, { "type": "Label", "props": { "y": 571, "x": 235, "wordWrap": true, "var": "lbldgroup", "valign": "middle", "text": "11111", "overflow": "scroll", "leading": 10, "gray": false, "fontSize": 22, "color": "#23335c", "bold": true, "anchorY": 0.5, "anchorX": 0, "align": "center" }, "compId": 97 }, { "type": "Label", "props": { "y": 692, "x": 232.5, "wordWrap": true, "width": 400, "var": "lbldinfo", "valign": "top", "text": "11111", "overflow": "visible", "leading": 10, "height": 140, "gray": false, "fontSize": 22, "color": "#23335c", "bold": true, "anchorY": 0.5, "anchorX": 0, "align": "left" }, "compId": 98 }, { "type": "Button", "props": { "y": 74, "x": 687, "var": "btnClose1", "stateNum": 1, "skin": "res/resource/base/com/btn_close.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 99 }, { "type": "Image", "props": { "zOrder": 0, "y": 771, "x": 279, "skin": "res/resource/base/lottery/img_lottery_cat.png" }, "compId": 100, "child": [{ "type": "Image", "props": { "y": 12, "x": -37.5, "var": "star0", "skin": "res/resource/base/lottery/img_lottery_star.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 104 }, { "type": "Image", "props": { "y": 60, "x": 14, "var": "star1", "skin": "res/resource/base/lottery/img_lottery_star.png", "scaleY": 0.7, "scaleX": 0.7, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 105 }, { "type": "Image", "props": { "y": 97, "x": -37, "var": "star2", "skin": "res/resource/base/lottery/img_lottery_star.png", "scaleY": 0.7, "scaleX": 0.7, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 106 }, { "type": "Image", "props": { "y": 54, "x": 218, "var": "star3", "skin": "res/resource/base/lottery/img_lottery_star.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 107 }, { "type": "Image", "props": { "y": 11, "x": 267, "var": "star4", "skin": "res/resource/base/lottery/img_lottery_star.png", "scaleY": 0.7, "scaleX": 0.7, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 108 }, { "type": "Image", "props": { "y": 108, "x": 271, "var": "star5", "skin": "res/resource/base/lottery/img_lottery_star.png", "scaleY": 0.7, "scaleX": 0.7, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 109 }] }, { "type": "Image", "props": { "y": 371, "x": 98, "skin": "res/resource/base/shop/menu/img_text_1.png" }, "compId": 114 }, { "type": "Image", "props": { "y": 493, "x": 127, "var": "imgInfoSex", "skin": "res/resource/base/shop/menu/img_text_2.png" }, "compId": 115 }, { "type": "Image", "props": { "y": 558, "x": 127, "skin": "res/resource/base/shop/menu/img_text_3.png" }, "compId": 116 }, { "type": "Image", "props": { "y": 624, "x": 127, "skin": "res/resource/base/shop/menu/img_text_4.png" }, "compId": 117 }, { "type": "Image", "props": { "y": 22, "x": 177, "visible": false, "var": "imgGet", "skin": "res/resource/base/shop/img_get.png" }, "compId": 120 }] }], "loadList": ["res/resource/base/com/btn_home.png", "res/resource/base/shop/img_box_bg.png", "res/resource/base/shop/menu/img_btn_high_01.png", "res/resource/cat/catNew/image_icon_red_1.png", "res/resource/base/shop/menu/img_btn_high_02.png", "res/resource/base/shop/menu/img_btn_high_03.png", "res/resource/base/shop/menu/img_btn_high_04.png", "res/resource/base/shop/menu/img_btn_high_05.png", "res/resource/base/shop/img_box_btm.png", "res/resource/base/shop/img_box_top.png", "res/resource/base/shop/btn_getOff.png", "res/resource/base/shop/btn_unlock.png", "res/resource/base/shop/btn_notunlock.png", "res/resource/base/shop/btn_change_cat.png", "res/resource/base/shop/btn_change_item.png", "res/resource/base/com/dialog/img_outside_box.png", "res/resource/base/com/dialog/img_Inside_box.png", "res/resource/base/com/dialog/img_inside_box_blue.png", "res/resource/base/shop/img_avatar_box.png", "res/resource/base/shop/avatar/img_avatar_0.png", "res/resource/base/shop/img_run_bg.png", "res/resource/base/shop/img_ball_blue.png", "res/resource/base/shop/img_ball_red.png", "res/resource/base/com/text/img_dangan_title.png", "res/resource/base/com/btn_close.png", "res/resource/base/lottery/img_lottery_cat.png", "res/resource/base/lottery/img_lottery_star.png", "res/resource/base/shop/menu/img_text_1.png", "res/resource/base/shop/menu/img_text_2.png", "res/resource/base/shop/menu/img_text_3.png", "res/resource/base/shop/menu/img_text_4.png", "res/resource/base/shop/img_get.png"], "loadList3D": [] };
            com.shopUI = shopUI;
            REG("ui.view.com.shopUI", shopUI);
        })(com = view.com || (view.com = {}));
    })(view = ui.view || (ui.view = {}));
})(ui = exports.ui || (exports.ui = {}));
(function (ui) {
    var view;
    (function (view) {
        var main;
        (function (main) {
            class bgUI extends ViewBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(bgUI.uiView);
                }
            }
            bgUI.uiView = { "type": "ViewBase", "props": { "width": 750, "height": 1334 }, "compId": 2, "loadList": [], "loadList3D": [] };
            main.bgUI = bgUI;
            REG("ui.view.main.bgUI", bgUI);
            class d3UI extends ViewBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(d3UI.uiView);
                }
            }
            d3UI.uiView = { "type": "ViewBase", "props": { "width": 750, "height": 1334 }, "compId": 2, "loadList": [], "loadList3D": [] };
            main.d3UI = d3UI;
            REG("ui.view.main.d3UI", d3UI);
            class effectUI extends ViewBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(effectUI.uiView);
                }
            }
            effectUI.uiView = { "type": "ViewBase", "props": { "width": 750, "height": 1334 }, "compId": 2, "loadList": [], "loadList3D": [] };
            main.effectUI = effectUI;
            REG("ui.view.main.effectUI", effectUI);
            class gameUI extends ViewBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(gameUI.uiView);
                }
            }
            gameUI.uiView = { "type": "ViewBase", "props": { "width": 750, "height": 1334 }, "compId": 2, "animations": [{ "nodes": [{ "target": 413, "keyframes": { "visible": [{ "value": false, "tweenMethod": "linearNone", "tween": false, "target": 413, "key": "visible", "index": 0 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 413, "key": "visible", "index": 2 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 413, "key": "visible", "index": 4 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 413, "key": "visible", "index": 6 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 413, "key": "visible", "index": 8 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 413, "key": "visible", "index": 10 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 413, "key": "visible", "index": 12 }] } }, { "target": 324, "keyframes": { "visible": [{ "value": true, "tweenMethod": "linearNone", "tween": false, "target": 324, "key": "visible", "index": 0 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 324, "key": "visible", "index": 2 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 324, "key": "visible", "index": 4 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 324, "key": "visible", "index": 6 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 324, "key": "visible", "index": 8 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 324, "key": "visible", "index": 10 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 324, "key": "visible", "index": 12 }] } }], "name": "ani_grap", "id": 29, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 468, "keyframes": { "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 468, "key": "rotation", "index": 0 }, { "value": 360, "tweenMethod": "linearNone", "tween": true, "target": 468, "key": "rotation", "index": 200 }], "alpha": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 468, "key": "alpha", "index": 0 }, { "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 468, "key": "alpha", "index": 50 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 468, "key": "alpha", "index": 100 }, { "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 468, "key": "alpha", "index": 150 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 468, "key": "alpha", "index": 200 }] } }, { "target": 469, "keyframes": { "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 469, "key": "rotation", "index": 0 }, { "value": -360, "tweenMethod": "linearNone", "tween": true, "target": 469, "key": "rotation", "index": 200 }], "alpha": [{ "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 469, "key": "alpha", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 469, "key": "alpha", "index": 50 }, { "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 469, "key": "alpha", "index": 100 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 469, "key": "alpha", "index": 150 }] } }], "name": "ani_luckBL", "id": 30, "frameRate": 24, "action": 0 }], "loadList": [], "loadList3D": [] };
            main.gameUI = gameUI;
            REG("ui.view.main.gameUI", gameUI);
            class loadingUI extends ViewBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(loadingUI.uiView);
                }
            }
            loadingUI.uiView = { "type": "ViewBase", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "img_bg", "top": 0, "skin": "res/loading/img_loading_bg.png", "right": 0, "left": 0, "bottom": 0 }, "compId": 3 }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 493, "var": "box_btm", "pivotY": 149, "pivotX": 249, "height": 149, "centerX": 0, "bottom": 0 }, "compId": 5, "child": [{ "type": "ProgressBar", "props": { "y": 20, "x": 247, "var": "pro_Loading", "skin": "res/loading/progress_loading.png", "pivotY": 12, "pivotX": 175 }, "compId": 6 }, { "type": "Label", "props": { "y": 20, "width": 238, "var": "lblLoading", "valign": "middle", "text": "100%", "strokeColor": "#ffffff", "stroke": 4, "pivotY": 16, "pivotX": 119, "height": 32, "fontSize": 26, "font": "Arial", "color": "#592222", "centerX": 0, "bold": true, "align": "center" }, "compId": 7 }, { "type": "Image", "props": { "y": 85, "x": 247, "width": 493, "skin": "res/loading/img_8r.png", "pivotY": 20, "pivotX": 247, "height": 39 }, "compId": 8 }, { "type": "Label", "props": { "y": 128, "x": 247, "width": 283, "var": "lbl_p", "valign": "middle", "text": "Powered by LayaAir Engine", "pivotY": 21, "pivotX": 142, "height": 42, "fontSize": 18, "color": "#ffffff", "bold": true, "align": "center" }, "compId": 9 }] }], "loadList": ["res/loading/img_loading_bg.png", "res/loading/progress_loading.png", "res/loading/img_8r.png"], "loadList3D": [] };
            main.loadingUI = loadingUI;
            REG("ui.view.main.loadingUI", loadingUI);
            class popupUI extends ViewBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(popupUI.uiView);
                }
            }
            popupUI.uiView = { "type": "ViewBase", "props": { "width": 750, "height": 1334 }, "compId": 2, "loadList": [], "loadList3D": [] };
            main.popupUI = popupUI;
            REG("ui.view.main.popupUI", popupUI);
        })(main = view.main || (view.main = {}));
    })(view = ui.view || (ui.view = {}));
})(ui = exports.ui || (exports.ui = {}));
},{"../framework/manager/ui/dialog-base":18,"../framework/manager/ui/view-base":20}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWFBaXJJREUvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL01haW4udHMiLCJzcmMvY2xpZW50L3NjZW5lL21haW4tc2NlbmUudHMiLCJzcmMvZnJhbWV3b3JrL2NvcmUvbG9nLnRzIiwic3JjL2ZyYW1ld29yay9jb3JlL29iamVjdC1wb29sLnRzIiwic3JjL2ZyYW1ld29yay9jb3JlL3NpbmdsZXRvbi50cyIsInNyYy9mcmFtZXdvcmsvY29yZS90aW1lLWRlbGF5LnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL2RhdGEvZGF0YS1tYW5hZ2VyLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL2V2ZW50L2V2ZW50LWRhdGEudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvZXZlbnQvZXZlbnQtbm9kZS50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLWdyb3VwLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL3Jlcy9yZXMtaXRlbS50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLWxvYWRlZC50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLW1hbmFnZXIudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvc2NlbmUvc2NlbmUtbWFuYWdlci50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci90aW1lci90aW1lci1lbnRpdHkudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvdGltZXIvdGltZXItaW50ZXJ2YWwudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvdGltZXIvdGltZXItbWFuYWdlci50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci91aS9kaWFsb2ctYmFzZS50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci91aS9zY2VuZS1iYXNlLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL3VpL3ZpZXctYmFzZS50cyIsInNyYy9mcmFtZXdvcmsvcnVudGltZS9lbmdpbmUudHMiLCJzcmMvZnJhbWV3b3JrL3NldHRpbmcvY29uZmlnLnRzIiwic3JjL2ZyYW1ld29yay9zZXR0aW5nL2VudW0udHMiLCJzcmMvZnJhbWV3b3JrL3N0cnVjdHVyZS9kaWN0aW9uYXJ5LnRzIiwic3JjL2ZyYW1ld29yay91dGlsL2FycmF5LnRzIiwic3JjL2ZyYW1ld29yay91dGlsL2RpY3QudHMiLCJzcmMvZnJhbWV3b3JrL3V0aWwvZGlzcGxheS50cyIsInNyYy9mcmFtZXdvcmsvdXRpbC90aW1lLnRzIiwic3JjL3Rlc3QvbG9hZGluZy50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUkEsdURBQW9EO0FBR3BEOzs7Ozs7R0FNRztBQUNIO0lBRUMsZ0RBQWdEO0lBQ2hELHNEQUFzRDtJQUN0RCx3QkFBd0I7SUFDeEIsOERBQThEO0lBRTlELHdEQUF3RDtJQUN4RCxrR0FBa0c7SUFDbEcsK0ZBQStGO0lBQy9GLDBDQUEwQztJQUMxQyxpQ0FBaUM7SUFFakMsb0RBQW9EO0lBQ3BELDJJQUEySTtJQUMzSSxpQ0FBaUM7SUFDakMsOEJBQThCO0lBQzlCLElBQUk7SUFFSiw0QkFBNEI7SUFDNUIsbURBQW1EO0lBQ25ELG9HQUFvRztJQUNwRyxJQUFJO0lBRUosMkJBQTJCO0lBQzNCLGdCQUFnQjtJQUNoQixvRUFBb0U7SUFDcEUsSUFBSTtJQUVKO1FBRUMsZUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoQixDQUFDO0NBQ0Q7QUFDRCxPQUFPO0FBQ1AsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7OztBQy9DWCxzRUFBa0U7QUFDbEUsSUFBTyxPQUFPLEdBQUcsd0JBQVcsQ0FBQyxPQUFPLENBQUM7QUFFcEM7Ozs7OztFQU1FO0FBQ0gsZUFBdUIsU0FBUSxPQUFPO0lBQ2xDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUiwy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QUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckMsQ0FBQzs7WUFMYyxlQUFNLEdBQU0sRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxrREFBa0QsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyx3Q0FBd0MsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGlEQUFpRCxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxpREFBaUQsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxnQkFBZ0IsRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsd0RBQXdELEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQywwQ0FBMEMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyx5Q0FBeUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsZ0JBQWdCLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxxREFBcUQsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsNENBQTRDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsMENBQTBDLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxxQ0FBcUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyx5Q0FBeUMsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLDhDQUE4QyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLGtEQUFrRCxFQUFDLHdDQUF3QyxFQUFDLGlEQUFpRCxFQUFDLHdEQUF3RCxFQUFDLDBDQUEwQyxFQUFDLHlDQUF5QyxFQUFDLHFEQUFxRCxFQUFDLDRDQUE0QyxFQUFDLDBDQUEwQyxFQUFDLHFDQUFxQyxFQUFDLHlDQUF5QyxFQUFDLDhDQUE4QyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDO1lBVHB1SSxZQUFRLFdBZXBCLENBQUE7WUFDRCxHQUFHLENBQUMsc0JBQXNCLEVBQUMsUUFBUSxDQUFDLENBQUM7WUFDckMsZUFBdUIsU0FBUSxVQUFVO2dCQXNCckMsZ0JBQWUsS0FBSyxFQUFFLENBQUEsQ0FBQSxDQUFDO2dCQUN2QixjQUFjO29CQUNWLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7O1lBTGMsZ0JBQU0sR0FBTSxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsbURBQW1ELEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxHQUFHLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxHQUFHLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsR0FBRyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxDQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsa0RBQWtELEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGlEQUFpRCxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLGlEQUFpRCxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxXQUFXLEVBQUMsNkJBQTZCLEVBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsU0FBUyxFQUFDLGdCQUFnQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLENBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLCtDQUErQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsaURBQWlELEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsd0NBQXdDLEVBQUMsVUFBVSxFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsZ0RBQWdELEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsZ0RBQWdELEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsZ0RBQWdELEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLGdEQUFnRCxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLGdEQUFnRCxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxnREFBZ0QsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxxQ0FBcUMsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsbURBQW1ELEVBQUMsa0RBQWtELEVBQUMsaURBQWlELEVBQUMsaURBQWlELEVBQUMsK0NBQStDLEVB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LEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLG9DQUFvQyxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyx1Q0FBdUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLGlEQUFpRCxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyw4Q0FBOEMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxpREFBaUQsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsOENBQThDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxpREFBaUQsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsOENBQThDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsaURBQWlELEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLDhDQUE4QyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLGlEQUFpRCxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyw4Q0FBOEMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsZ0JBQWdCLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsOEJBQThCLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLGdCQUFnQixFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsU0FBUyxFQUFDLDhCQUE4QixFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsZ0JBQWdCLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsOEJBQThCLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLGdCQUFnQixFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsU0FBUyxFQUFDLDhCQUE4QixFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxnQkFBZ0IsRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyw4QkFBOEIsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLHdDQUF3QyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsd0NBQXdDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsdUNBQXVDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLHVDQUF1QyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQywwQ0FBMEMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxlQUFlLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsMkNBQTJDLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsY0FBYyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLDRDQUE0QyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxrREFBa0QsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxpREFBaUQsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLHNEQUFzRCxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLDJDQUEyQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLGdEQUFnRCxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyx1Q0FBdUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQywwQ0FBMEMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsMENBQTBDLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLHlDQUF5QyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsaURBQWlELEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxxQ0FBcUMsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQywrQ0FBK0MsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLGdEQUFnRCxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLGdEQUFnRCxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLGdEQUFnRCxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxnREFBZ0QsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxnREFBZ0QsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsZ0RBQWdELEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsNENBQTRDLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyw0Q0FBNEMsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyw0Q0FBNEMsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFP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QUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDO1lBSHo2RixXQUFNLFNBU2xCLENBQUE7WUFDRCxHQUFHLENBQUMscUJBQXFCLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsZUFBdUIsU0FBUSxRQUFRO2dCQU9uQyxnQkFBZSxLQUFLLEVBQUUsQ0FBQSxDQUFBLENBQUM7Z0JBQ3ZCLGNBQWM7b0JBQ1YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEMsQ0FBQzs7WUFMYyxnQkFBTSxHQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUMsa0NBQWtDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsd0JBQXdCLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsMkJBQTJCLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxnQ0FBZ0MsRUFBQyxrQ0FBa0MsRUFBQyx3QkFBd0IsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQztZQU52d0MsY0FBUyxZQVlyQixDQUFBO1lBQ0QsR0FBRyxDQUFDLHdCQUF3QixFQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLGFBQXFCLFNBQVEsUUFBUTtnQkFFakMsZ0JBQWUsS0FBSyxFQUFFLENBQUEsQ0FBQSxDQUFDO2dCQUN2QixjQUFjO29CQUNWLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BDLENBQUM7O1lBTGMsY0FBTSxHQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDO1lBRG5ILFlBQU8sVUFPbkIsQ0FBQTtZQUNELEdBQUcsQ0FBQyxzQkFBc0IsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxDQUFDLEVBOURxQixJQUFJLEdBQUosU0FBSSxLQUFKLFNBQUksUUE4RHpCO0lBQUQsQ0FBQyxFQTlEZ0IsSUFBSSxHQUFKLE9BQUksS0FBSixPQUFJLFFBOERwQjtBQUFELENBQUMsRUE5RGEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBOERmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IHsgTG9hZGluZ1ZpZXcgfSBmcm9tICcuL3Rlc3QvbG9hZGluZyc7XHJcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gJy4vZnJhbWV3b3JrL3J1bnRpbWUvZW5naW5lJztcclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxOTowNVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOa4uOaIj+WQr+WKqOWFpeWPo1xyXG4gKlxyXG4gKi9cclxuY2xhc3MgTWFpbiB7XHJcblxyXG5cdC8vIFx0TGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcblx0Ly8gXHRMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHQvLyBcdC8v5YW85a655b6u5L+h5LiN5pSv5oyB5Yqg6L29c2NlbmXlkI7nvIDlnLrmma9cclxuXHQvLyBcdExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbjtcclxuXHJcblx0Ly8gXHQvL+aJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIlcclxuXHQvLyBcdGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcblx0Ly8gXHRpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG5cdC8vIFx0aWYgKEdhbWVDb25maWcuc3RhdCkgTGF5YS5TdGF0LnNob3coKTtcclxuXHQvLyBcdExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7XHJcblxyXG5cdC8vIFx0Ly/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuXHQvLyBcdC8vIExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblx0Ly8gXHRsZXQgdmlldyA9IG5ldyBMb2FkaW5nVmlldygpO1xyXG5cdC8vIFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh2aWV3KTtcclxuXHQvLyB9XHJcblxyXG5cdC8vIG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuXHQvLyBcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0Ly8gXHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdC8vIH1cclxuXHJcblx0Ly8gb25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblx0Ly8gXHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdC8vIFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cdC8vIH1cclxuXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdEVuZ2luZS4kLnJ1bigpO1xyXG5cdH1cclxufVxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJpbXBvcnQge0N1c3RvbVNjZW5lfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL21hbmFnZXIvdWkvc2NlbmUtYmFzZVwiO1xyXG5pbXBvcnQgTHlTY2VuZSA9IEN1c3RvbVNjZW5lLkx5U2NlbmU7XHJcblxyXG4gLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMTEgMTE6MjBcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDkuLvlnLrmma9cclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYWluU2NlbmUgZXh0ZW5kcyBMeVNjZW5lIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy8gdGhpcy5maXJzdFdpbmQgPSBCZ1ZpZXc7XHJcblxyXG4gICAgICAgIHRoaXMubmVlZExvYWRSZXNcclxuICAgICAgICAgICAgLmFkZChcInJlcy9hdGxhcy9yZXMvbWFpbi9nYW1lLmF0bGFzXCIsIExheWEuTG9hZGVyLkFUTEFTLCB0cnVlKVxyXG4gICAgICAgICAgICAuYWRkKFwicmVzL2F0bGFzL3Jlcy9tYWluL2dhbWUvcm9jay5hdGxhc1wiLCBMYXlhLkxvYWRlci5BVExBUywgdHJ1ZSlcclxuICAgICAgICAgICAgLmFkZChcInJlcy9hdGxhcy9yZXMvbWFpbi9lZmZlY3QuYXRsYXNcIiwgTGF5YS5Mb2FkZXIuQVRMQVMsIHRydWUpXHJcbiAgICAgICAgICAgIC5hZGQoXCJyZXMvYXRsYXMvcmVzL2Jhc2UuYXRsYXNcIiwgTGF5YS5Mb2FkZXIuQVRMQVMsIHRydWUpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IENvbmZpZ0RlYnVnIH0gZnJvbSAnLi4vc2V0dGluZy9jb25maWcnO1xuXG4gLyoqXG4gKiBAYXV0aG9yIFN1blxuICogQHRpbWUgMjAxOS0wOC0wOSAxNTo1OVxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gKiBAZGVzY3JpcHRpb24g6L6T5Ye65L+h5oGv566h55CGXG4gKi9cbmV4cG9ydCBjbGFzcyBMb2cge1xuXG4gICAgcHVibGljIHN0YXRpYyBkZWJ1ZyguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc0RlYnVnKSBjb25zb2xlLmRlYnVnKFwiW2RlYnVnXVwiLCBhcmdzLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaW5mbyguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc0RlYnVnKSBjb25zb2xlLmluZm8oXCJbaW5mb11cIiwgYXJncy50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHdhcm4oLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKENvbmZpZ0RlYnVnLiQuaXNEZWJ1ZykgY29uc29sZS53YXJuKFwiW3dhcm5dXCIsIGFyZ3MudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBlcnJvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc0RlYnVnKSBjb25zb2xlLmVycm9yKFwiW2Vycm9yXVwiLCBhcmdzLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZXhjZXB0aW9uKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzRGVidWcpIGNvbnNvbGUuZXhjZXB0aW9uKFwiW2V4Y2VdXCIsIGFyZ3MudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBsb2coLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKENvbmZpZ0RlYnVnLiQuaXNEZWJ1ZykgY29uc29sZS5sb2coXCJbbG9nXVwiLCBhcmdzLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuXG4gICAgLyoq5omT5Y2w6K6+5aSH5L+h5oGvKi9cbiAgICBwdWJsaWMgc3RhdGljIHByaW50RGV2aWNlSW5mbygpIHtcbiAgICAgICAgaWYgKENvbmZpZ0RlYnVnLiQuaXNEZWJ1ZyAmJiBuYXZpZ2F0b3IpIHtcbiAgICAgICAgICAgIGxldCBhZ2VudFN0ciA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbiAgICAgICAgICAgIGxldCBzdGFydCA9IGFnZW50U3RyLmluZGV4T2YoXCIoXCIpO1xuICAgICAgICAgICAgbGV0IGVuZCA9IGFnZW50U3RyLmluZGV4T2YoXCIpXCIpO1xuXG4gICAgICAgICAgICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA8IDAgfHwgZW5kIDwgc3RhcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpbmZvU3RyID0gYWdlbnRTdHIuc3Vic3RyaW5nKHN0YXJ0ICsgMSwgZW5kKTtcblxuICAgICAgICAgICAgbGV0IGRldmljZTogc3RyaW5nLCBzeXN0ZW06IHN0cmluZywgdmVyc2lvbjogc3RyaW5nO1xuICAgICAgICAgICAgbGV0IGluZm9zID0gaW5mb1N0ci5zcGxpdChcIjtcIik7XG4gICAgICAgICAgICBpZiAoaW5mb3MubGVuZ3RoID09IDMpIHtcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+S4ieS4queahOivne+8jCDlj6/og73mmK9hbmRyb2lk55qE77yMIOmCo+S5iOesrOS4ieS4quaYr+iuvuWkh+WPt1xuICAgICAgICAgICAgICAgIGRldmljZSA9IGluZm9zWzJdO1xuICAgICAgICAgICAgICAgIC8v56ys5LqM5Liq5piv57O757uf5Y+35ZKM54mI5pysXG4gICAgICAgICAgICAgICAgbGV0IHN5c3RlbV9pbmZvID0gaW5mb3NbMV0uc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgICAgIGlmIChzeXN0ZW1faW5mby5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgICAgICBzeXN0ZW0gPSBzeXN0ZW1faW5mb1sxXTtcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiA9IHN5c3RlbV9pbmZvWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5mb3MubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICBzeXN0ZW0gPSBpbmZvc1swXTtcbiAgICAgICAgICAgICAgICBkZXZpY2UgPSBpbmZvc1swXTtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uID0gaW5mb3NbMV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN5c3RlbSA9IG5hdmlnYXRvci5wbGF0Zm9ybTtcbiAgICAgICAgICAgICAgICBkZXZpY2UgPSBuYXZpZ2F0b3IucGxhdGZvcm07XG4gICAgICAgICAgICAgICAgdmVyc2lvbiA9IGluZm9TdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBMb2cuaW5mbyhzeXN0ZW0sIGRldmljZSwgdmVyc2lvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuIiwiaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9sb2cnO1xuXG4vKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTA5IDIzOjI1XG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiAg5a+56LGh5rGgXG4gKlxuICovXG5leHBvcnQgY2xhc3MgT2JqZWN0UG9vbCB7XG4gICAgXG4gICAgLyoqXG4gICAgICog6I635Y+W5LiA5Liq5a+56LGh77yM5LiN5a2Y5Zyo5YiZ5Yib5bu6XG4gICAgICogQHBhcmFtIGNsYXNzRGVmICDnsbvlkI1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldChjbGFzc0RlZjogYW55KTogYW55IHtcbiAgICAgICAgbGV0IHNpZ246IHN0cmluZyA9IFwiZGMuXCIgKyBjbGFzc0RlZi5uYW1lO1xuICAgICAgICBsZXQgb2JqOiBhbnkgPSBMYXlhLlBvb2wuZ2V0SXRlbShzaWduKTtcbiAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgIGlmICghTGF5YS5DbGFzc1V0aWxzLmdldFJlZ0NsYXNzKHNpZ24pKSB7XG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiW3Bvb2xzXeazqOWGjOWvueixoeaxoDpcIiArIHNpZ24pO1xuICAgICAgICAgICAgICAgIExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcyhzaWduLCBjbGFzc0RlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYmogPSBMYXlhLkNsYXNzVXRpbHMuZ2V0SW5zdGFuY2Uoc2lnbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iaiAmJiBvYmpbXCJpbml0XCJdKSBvYmouaW5pdCgpO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWbnuaUtuWvueixoVxuICAgICAqIEBwYXJhbSBvYmogIOWvueixoeWunuS+i1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVjb3ZlcihvYmo6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoIW9iaikgcmV0dXJuO1xuXG4gICAgICAgIGxldCBwcm90bzogYW55ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgICAgIGxldCBjbGF6ejogYW55ID0gcHJvdG9bXCJjb25zdHJ1Y3RvclwiXTtcbiAgICAgICAgbGV0IHNpZ246IHN0cmluZyA9IFwiZGMuXCIgKyBjbGF6ei5uYW1lO1xuICAgICAgICBvYmouY2xvc2UoKTtcbiAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoc2lnbiwgb2JqKTtcbiAgICB9XG59XG5cbi8qKuWvueixoeaxoOWfuuexuyovXG5leHBvcnQgaW50ZXJmYWNlIElQb29sT2JqZWN0IHtcbiAgICAvLyDliJ3lp4vljJZcbiAgICBpbml0KCk7XG4gICAgLy8g5YWz6ZetXG4gICAgY2xvc2UoKTtcbn1cbiIsImltcG9ydCB7IExvZyB9IGZyb20gJy4vbG9nJztcblxuIC8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDgtMDkgMTU6NTdcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uIOWNleS+i+W3peWFt+exu1xuICovXG5leHBvcnQgY2xhc3MgU2luZ2xldG9uIHtcblxuICAgIHByaXZhdGUgc3RhdGljIGNsYXNzS2V5czogRnVuY3Rpb25bXSA9IFtdO1xuICAgIHByaXZhdGUgc3RhdGljIGNsYXNzVmFsdWVzOiBhbnlbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGxldCBjbGF6ejogYW55ID0gdGhpc1tcImNvbnN0cnVjdG9yXCJdO1xuICAgICAgICBpZiAoIWNsYXp6KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJOb3Qgc3VwcG9ydCBjb25zdHJ1Y3RvciFcIik7XG4gICAgICAgICAgICBMb2cud2FybihcIk5vdCBzdXBwb3J0IGNvbnN0cnVjdG9yIVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyDpmLLmraLph43lpI3lrp7kvovljJZcbiAgICAgICAgaWYgKFNpbmdsZXRvbi5jbGFzc0tleXMuaW5kZXhPZihjbGF6eikgIT0gLTEpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcyArIFwiT25seSBpbnN0YW5jZSBvbmNlIVwiKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBTaW5nbGV0b24uY2xhc3NLZXlzLnB1c2goY2xhenopO1xuICAgICAgICAgICAgU2luZ2xldG9uLmNsYXNzVmFsdWVzLnB1c2godGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIlxuIFxuLyoqXG4gKiBAYXV0aG9yIFN1blxuICogQHRpbWUgMjAxOS0wOC0wOSAyMzozMVxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gKiBAZGVzY3JpcHRpb24gIOS6i+S7tuS7u+WKoeWxnuaAp1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFRpbWVEZWxheURhdGEge1xuXG4gICAgLyoq6YeN5aSN5qyh5pWwICovXG4gICAgcHVibGljIHJlcGVhdDogbnVtYmVyO1xuICAgIC8qKumXtOmalCAqL1xuICAgIHB1YmxpYyBpbnRlcnZhbDogbnVtYmVyO1xuICAgIC8qKuWPguaVsCAqL1xuICAgIHB1YmxpYyBwYXJhbTogYW55O1xuICAgIC8qKuWbnuiwgyAqL1xuICAgIHB1YmxpYyBjYWxsYmFjazogVGltZXJDYWxsYmFjaztcbiAgICAvKirkvZznlKjln58gKi9cbiAgICBwdWJsaWMgdGhpc09iajogYW55O1xuICAgIC8qKuaYr+WQpuW3suWIoOmZpCAqL1xuICAgIHB1YmxpYyBkZWxldGVkOiBib29sZWFuO1xuICAgIC8qKui/kOihjOS6i+S7tiAqL1xuICAgIHB1YmxpYyBlbGFwc2VkOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgc2V0KGludGVydmFsOiBudW1iZXIsIHJlcGVhdDogbnVtYmVyLCBjYWxsYmFjazogVGltZXJDYWxsYmFjaywgdGhpc09iajogYW55LCBwYXJhbTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBpbnRlcnZhbDtcbiAgICAgICAgdGhpcy5yZXBlYXQgPSByZXBlYXQ7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5wYXJhbSA9IHBhcmFtO1xuICAgICAgICB0aGlzLnRoaXNPYmogPSB0aGlzT2JqO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgVGltZXJDYWxsYmFjayA9IChwYXJhbTogYW55KSA9PiB2b2lkXG5cbiAvKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTA5IDIzOjI1XG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiAg5pe26Ze05o6n5Yi25qC45b+D57G7XG4gKlxuICovXG5pbXBvcnQge1NpbmdsZXRvbn0gZnJvbSBcIi4vc2luZ2xldG9uXCI7XG5cbmV4cG9ydCBjbGFzcyBUaW1lRGVsYXkgZXh0ZW5kcyBTaW5nbGV0b24ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKDAuMDEsIHRoaXMsIHRoaXMudXBkYXRlKTtcbiAgICB9XG5cbiAgICAvKirlvZPliY3kuovku7bmiafooYznmoTmrKHmlbAgKi9cbiAgICBwdWJsaWMgcmVwZWF0OiBudW1iZXIgPSAwXG4gICAgcHJpdmF0ZSBpdGVtczogQXJyYXk8VGltZURlbGF5RGF0YT4gPSBuZXcgQXJyYXk8VGltZURlbGF5RGF0YT4oKTtcbiAgICBwcml2YXRlIHRvQWRkOiBBcnJheTxUaW1lRGVsYXlEYXRhPiA9IG5ldyBBcnJheTxUaW1lRGVsYXlEYXRhPigpO1xuICAgIHByaXZhdGUgdG9SZW1vdmU6IEFycmF5PFRpbWVEZWxheURhdGE+ID0gbmV3IEFycmF5PFRpbWVEZWxheURhdGE+KCk7XG4gICAgcHJpdmF0ZSBwb29sOiBBcnJheTxUaW1lRGVsYXlEYXRhPiA9IG5ldyBBcnJheTxUaW1lRGVsYXlEYXRhPigpO1xuXG4gICAgXG4gICAgcHJpdmF0ZSBzdGF0aWMgbUluc3RhbmNlOiBUaW1lRGVsYXkgPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1JbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm1JbnN0YW5jZSA9IG5ldyBUaW1lRGVsYXkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5tSW5zdGFuY2VcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDku47msaDlrZDkuK3ojrflj5ZkYXRh57G7XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRGcm9tUG9vbCgpOiBUaW1lRGVsYXlEYXRhIHtcbiAgICAgICAgbGV0IHQ6IFRpbWVEZWxheURhdGE7XG4gICAgICAgIGlmICh0aGlzLnBvb2wubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdCA9IHRoaXMucG9vbC5wb3AoKVxuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHQgPSBuZXcgVGltZURlbGF5RGF0YSgpO1xuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkYXRh57G75pS+5Zue5rGg5a2QXG4gICAgICogQHBhcmFtIHQgXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXR1cm5Ub1Bvb2wodDogVGltZURlbGF5RGF0YSkge1xuICAgICAgICB0LnNldCgwLCAwLCBudWxsLCBudWxsLCBudWxsKVxuICAgICAgICB0LmVsYXBzZWQgPSAwXG4gICAgICAgIHQuZGVsZXRlZCA9IGZhbHNlXG4gICAgICAgIHRoaXMucG9vbC5wdXNoKHQpXG4gICAgfVxuXG4gICAgcHVibGljIGV4aXN0cyhjYWxsYmFjazogVGltZXJDYWxsYmFjaywgdGhpc09iajogYW55KSB7XG4gICAgICAgIGxldCB0ID0gdGhpcy50b0FkZC5maW5kKCh2YWx1ZTogVGltZURlbGF5RGF0YSwgaW5kZXg6IG51bWJlciwgb2JqOiBBcnJheTxUaW1lRGVsYXlEYXRhPikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmNhbGxiYWNrID09IGNhbGxiYWNrICYmIHZhbHVlLnRoaXNPYmogPT0gdGhpc09ialxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICh0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgdCA9IHRoaXMuaXRlbXMuZmluZCgodmFsdWU6IFRpbWVEZWxheURhdGEsIGluZGV4OiBudW1iZXIsIG9iajogQXJyYXk8VGltZURlbGF5RGF0YT4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jYWxsYmFjayA9PSBjYWxsYmFjayAmJiB2YWx1ZS50aGlzT2JqID09IHRoaXNPYmpcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHQgIT0gbnVsbCAmJiAhdC5kZWxldGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGQoaW50ZXJ2YWw6IG51bWJlciwgcmVwZWF0OiBudW1iZXIsIGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrLCB0aGlzT2JqOiBhbnksIGNhbGxiYWNrUGFyYW06IGFueSA9IG51bGwpIHtcbiAgICAgICAgbGV0IHQ6IFRpbWVEZWxheURhdGE7XG4gICAgICAgIHQgPSB0aGlzLml0ZW1zLmZpbmQoKHZhbHVlOiBUaW1lRGVsYXlEYXRhLCBpbmRleDogbnVtYmVyLCBvYmo6IEFycmF5PFRpbWVEZWxheURhdGE+KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuY2FsbGJhY2sgPT0gY2FsbGJhY2sgJiYgdmFsdWUudGhpc09iaiA9PSB0aGlzT2JqXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHQgPSB0aGlzLnRvQWRkLmZpbmQoKHZhbHVlOiBUaW1lRGVsYXlEYXRhLCBpbmRleDogbnVtYmVyLCBvYmo6IEFycmF5PFRpbWVEZWxheURhdGE+KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmNhbGxiYWNrID09IGNhbGxiYWNrICYmIHZhbHVlLnRoaXNPYmogPT0gdGhpc09ialxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHQgPSB0aGlzLmdldEZyb21Qb29sKCk7XG4gICAgICAgICAgICB0aGlzLnRvQWRkLnB1c2godCk7XG4gICAgICAgIH1cblxuICAgICAgICB0LnNldChpbnRlcnZhbCwgcmVwZWF0LCBjYWxsYmFjaywgdGhpc09iaiwgY2FsbGJhY2tQYXJhbSk7XG4gICAgICAgIHQuZGVsZXRlZCA9IGZhbHNlO1xuICAgICAgICB0LmVsYXBzZWQgPSAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRVcGRhdGUoY2FsbGJhY2s6IFRpbWVyQ2FsbGJhY2ssIHRoaXNPYmo6IGFueSwgY2FsbGJhY2tQYXJhbTogYW55ID0gbnVsbCkge1xuICAgICAgICB0aGlzLmFkZCgwLjAwMSwgMCwgY2FsbGJhY2ssIHRoaXNPYmosIGNhbGxiYWNrUGFyYW0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUoY2FsbGJhY2s6IFRpbWVyQ2FsbGJhY2ssIHRoaXNPYmo6IGFueSkge1xuICAgICAgICBsZXQgZmluZGluZGV4ID0gLTFcbiAgICAgICAgbGV0IHQgPSB0aGlzLnRvQWRkLmZpbmQoKHZhbHVlOiBUaW1lRGVsYXlEYXRhLCBpbmRleDogbnVtYmVyLCBvYmo6IEFycmF5PFRpbWVEZWxheURhdGE+KSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUuY2FsbGJhY2sgPT0gY2FsbGJhY2sgJiYgdmFsdWUudGhpc09iaiA9PSB0aGlzT2JqKSB7XG4gICAgICAgICAgICAgICAgZmluZGluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudG9BZGQuc3BsaWNlKGZpbmRpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLnJldHVyblRvUG9vbCh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHQgPSB0aGlzLml0ZW1zLmZpbmQoKHZhbHVlOiBUaW1lRGVsYXlEYXRhLCBpbmRleDogbnVtYmVyLCBvYmo6IEFycmF5PFRpbWVEZWxheURhdGE+KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuY2FsbGJhY2sgPT0gY2FsbGJhY2sgJiYgdmFsdWUudGhpc09iaiA9PSB0aGlzT2JqO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHQgIT0gbnVsbClcbiAgICAgICAgICAgIHQuZGVsZXRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsYXN0VGltZTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGRlbHRhVGltZTogbnVtYmVyID0gMDtcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmxhc3RUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXI7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLmRlbHRhVGltZSA9IChMYXlhLnRpbWVyLmN1cnJUaW1lciAtIHRoaXMubGFzdFRpbWUpIC8gMTAwMDtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IExheWEudGltZXIuY3VyclRpbWVyO1xuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLml0ZW1zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IHQgPSB0aGlzLml0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgIGlmICh0LmRlbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvUmVtb3ZlLnB1c2godCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHQuZWxhcHNlZCArPSB0aGlzLmRlbHRhVGltZTtcbiAgICAgICAgICAgIGlmICh0LmVsYXBzZWQgPCB0LmludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHQuZWxhcHNlZCA9IDA7XG5cbiAgICAgICAgICAgIGlmICh0LnJlcGVhdCA+IDApIHtcbiAgICAgICAgICAgICAgICB0LnJlcGVhdC0tO1xuICAgICAgICAgICAgICAgIGlmICh0LnJlcGVhdCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHQuZGVsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9SZW1vdmUucHVzaCh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlcGVhdCA9IHQucmVwZWF0O1xuICAgICAgICAgICAgaWYgKHQuY2FsbGJhY2sgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHQuY2FsbGJhY2suY2FsbCh0LnRoaXNPYmosIHQucGFyYW0pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHQuZGVsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBsZW4gPSB0aGlzLnRvUmVtb3ZlLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGxlbikge1xuICAgICAgICAgICAgbGV0IHQgPSB0aGlzLnRvUmVtb3ZlLnBvcCgpO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5pdGVtcy5pbmRleE9mKHQpO1xuICAgICAgICAgICAgaWYgKHQuZGVsZXRlZCAmJiBpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJldHVyblRvUG9vbCh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxlbi0tO1xuICAgICAgICB9XG4gICAgICAgIGxlbiA9IHRoaXMudG9BZGQubGVuZ3RoO1xuICAgICAgICB3aGlsZSAobGVuKSB7XG4gICAgICAgICAgICBsZXQgdCA9IHRoaXMudG9BZGQucG9wKCk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2godCk7XG4gICAgICAgICAgICBsZW4tLTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbiIsImltcG9ydCB7IEV2ZW50Tm9kZSB9IGZyb20gJy4uL2V2ZW50L2V2ZW50LW5vZGUnO1xuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGF0YSc7XG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gJy4vZGF0YS1iYXNlJztcbmltcG9ydCB7IElNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ktbWFuYWdlcic7XG5cblxuLyoqXG4gKiBAYXV0aG9yIFN1blxuICogQHRpbWUgMjAxOS0wOC0wOSAxNTo1MVxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gKiBAZGVzY3JpcHRpb24g5pWw5o2u566h55CG57G7XG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRhTWFuYWdlciBleHRlbmRzIEV2ZW50Tm9kZSBpbXBsZW1lbnRzIElNYW5hZ2VyIHtcblxuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogRGF0YU1hbmFnZXIgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkRhdGFNYW5hZ2VyIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IERhdGFNYW5hZ2VyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkYXRhczogTWFwPHN0cmluZywgRGF0YUJhc2U+ID0gbmV3IE1hcDxzdHJpbmcsIERhdGFCYXNlPigpO1xuXG4gICAgc2V0dXAoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgdXBkYXRlKCk6IHZvaWQge1xuICAgIH1cblxuICAgIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YXMuY2xlYXIoKTtcbiAgICB9XG4gIFxuXG4gICAgcHVibGljIHJlZ2lzdGVyKGRhdGE6IERhdGFCYXNlKTogRGF0YU1hbmFnZXIge1xuICAgICAgICB0aGlzLmRhdGFzLnNldChkYXRhLmNtZCwgZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQoY21kOiBzdHJpbmcpOiBEYXRhQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFzLmdldChjbWQpO1xuICAgIH1cbn1cblxuXG5cbiIsIi8qKlxuICog5LqL5Lu25pWw5o2u5a6a5LmJ57G7XG4gKlxuICogQGF1dGhvciBUaW0gV2Fyc1xuICogQGRhdGUgMjAxOS0wMS0yMCAwMDoyM1xuICogQHByb2plY3QgZmlyZWJvbHRcbiAqIEBjb3B5cmlnaHQgKEMpIERPTk9QT1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEV2ZW50RGF0YSB7XG5cbiAgICBjb25zdHJ1Y3RvcihjbWQ6IHN0cmluZywgb2JqOiBhbnkgPSBudWxsLCBpc1N0b3A6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNtZCA9IGNtZDtcbiAgICAgICAgdGhpcy5kYXRhID0gb2JqO1xuICAgICAgICB0aGlzLmlzU3RvcCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbWQ6IHN0cmluZztcbiAgICBwdWJsaWMgZGF0YTogYW55O1xuICAgIHB1YmxpYyBpc1N0b3AgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIOW/q+mAn+WIm+W7uuS6i+S7tuaVsOaNrlxuICAgICAqIEBwYXJhbSBjbWRcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwYXJhbSBpc1N0b3BcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShjbWQ6IHN0cmluZywgZGF0YTogYW55ID0gbnVsbCwgaXNTdG9wOiBib29sZWFuID0gZmFsc2UpOiBFdmVudERhdGEge1xuICAgICAgICByZXR1cm4gbmV3IEV2ZW50RGF0YShjbWQsIGRhdGEsIGlzU3RvcCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuaXNTdG9wID0gdHJ1ZVxuICAgIH1cbn1cblxuLyoqXG4gKiDkuovku7blm57osIPlh73mlbDlrprkuYlcbiAqXG4gKiBAYXV0aG9yIFRpbSBXYXJzXG4gKiBAZGF0ZSAyMDE5LTAxLTIwIDAwOjI0XG4gKiBAcHJvamVjdCBmaXJlYm9sdFxuICogQGNvcHlyaWdodCAoQykgRE9OT1BPXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRXZlbnRGdW5jIHtcblxuICAgIHByaXZhdGUgbV90aGlzOiBhbnk7XG4gICAgcHJpdmF0ZSBtX2NiOiBGdW5jdGlvbjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih0aGlzT2JqOiBhbnksIGNhbGxCYWNrOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLm1fdGhpcyA9IHRoaXNPYmo7XG4gICAgICAgIHRoaXMubV9jYiA9IGNhbGxCYWNrO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbnZva2UoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgdGhpcy5tX2NiLmNhbGwodGhpcy5tX3RoaXMsIC4uLmFyZ3MpO1xuICAgIH1cbn1cblxuXG4iLCJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICcuL2V2ZW50LWRhdGEnO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vY29yZS9sb2cnO1xuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi4vLi4vY29yZS9zaW5nbGV0b24nO1xuXG5cbi8qKlxuICog5omA5pyJ6ZyA6KaB55uR5o6n5LqL5Lu26IqC54K555qE5Z+657G7XG4gKlxuICogQGF1dGhvciBUaW0gV2Fyc1xuICogQGRhdGUgMjAxOS0wMS0xOCAxNjoyMFxuICogQHByb2plY3QgZmlyZWJvbHRcbiAqIEBjb3B5cmlnaHQgKEMpIERPTk9QT1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEV2ZW50Tm9kZSBleHRlbmRzIFNpbmdsZXRvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgRXZlbnRDb250ZXh0LmV2ZW50Tm9kZXMuc2V0KHRoaXMsIHRoaXMpO1xuICAgIH1cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gPT09PT09PT09PT09PT0gIExvY2FsIEV2ZW50IFNlY3Rpb24gPT09PT09PT09PT09PT1cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbV9nbG9iYWxFdmVudERhdGE6IEFycmF5PEV2ZW50RGF0YT4gPSBuZXcgQXJyYXk8RXZlbnREYXRhPigpO1xuICAgIHByaXZhdGUgc3RhdGljIG1fZ2xvYmFsRXZlbnREaWN0OiBFdmVudExpc3RlbmVyQ2xhc3NEaWN0ID0ge307XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVHbG9iYWxEYXRhKGNtZCwgZGF0YSk6IEV2ZW50RGF0YSB7XG4gICAgICAgIGxldCBlZDogRXZlbnREYXRhO1xuICAgICAgICBpZiAoRXZlbnROb2RlLm1fZ2xvYmFsRXZlbnREYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGVkID0gRXZlbnROb2RlLm1fZ2xvYmFsRXZlbnREYXRhLnBvcCgpO1xuICAgICAgICAgICAgZWQuY21kID0gY21kO1xuICAgICAgICAgICAgZWQuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICBlZC5pc1N0b3AgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVkID0gbmV3IEV2ZW50RGF0YShjbWQsIGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyByZXR1cm5HbG9iYWxFdmVudERhdGEoZWQ6IEV2ZW50RGF0YSkge1xuICAgICAgICBlZC5kYXRhID0gbnVsbDtcbiAgICAgICAgZWQuY21kID0gbnVsbDtcbiAgICAgICAgZWQuaXNTdG9wID0gZmFsc2U7XG4gICAgICAgIEV2ZW50Tm9kZS5tX2dsb2JhbEV2ZW50RGF0YS5wdXNoKGVkKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa3u+WKoOS4gOS4qua2iOaBr+ebkeWQrOWZqFxuICAgICAqIEBwYXJhbSB0eXBlIOa2iOaBr+exu+Wei1xuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlm57osIPlh73mlbBcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOS9nOeUqOWvueixoVxuICAgICAqIEBwYXJhbSBwcmlvcml0eSDmtojmga/nmoTkvJjlhYjnuqdcbiAgICAgKiBAcGFyYW0gb25jZSDmmK/lkKblj6rnm5HlkKzkuIDmrKFcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZEdsb2JhbExpc3RlbmVyKHR5cGU6IHN0cmluZyB8IG51bWJlciwgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciwgdGFyZ2V0OiBhbnksIHByaW9yaXR5OiBudW1iZXIgPSAwLCBvbmNlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgdHlwZSA9IHR5cGUudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IGluZm86IEV2ZW50TGlzdGVuZXJJbmZvRGF0YSA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBjYWxsQmFjazogY2FsbEJhY2ssXG4gICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcbiAgICAgICAgICAgIG9uY2U6IG9uY2VcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgYXJyYXkgPSBFdmVudE5vZGUubV9nbG9iYWxFdmVudERpY3RbdHlwZV07XG4gICAgICAgIGxldCBoYXMgPSBmYWxzZTtcbiAgICAgICAgbGV0IHBvcyA9IDA7XG4gICAgICAgIGlmIChhcnJheSAhPSBudWxsKSB7XG4gICAgICAgICAgICBhcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnRhcmdldCA9PSB0YXJnZXQgJiYgZWxlbWVudC5jYWxsQmFjayA9PSBjYWxsQmFjaykge1xuICAgICAgICAgICAgICAgICAgICBoYXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5wcmlvcml0eSA+IGluZm8ucHJpb3JpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnJheSA9IG5ldyBBcnJheTxFdmVudExpc3RlbmVySW5mb0RhdGE+KCk7XG4gICAgICAgICAgICBFdmVudE5vZGUubV9nbG9iYWxFdmVudERpY3RbdHlwZV0gPSBhcnJheTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwi6YeN5aSN5rOo5YaM5raI5oGv77yadHlwZT1cIiArIHR5cGUpO1xuICAgICAgICAgICAgTG9nLmVycm9yKFwi6YeN5aSN5rOo5YaM5raI5oGv77yadHlwZT1cIiArIHR5cGUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnJheS5zcGxpY2UocG9zLCAwLCBpbmZvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOenu+mZpOS4gOS4qua2iOaBr+ebkeWQrOWZqFxuICAgICAqIEBwYXJhbSB0eXBlIOa2iOaBr2lkXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIOWbnuiwg+WHveaVsFxuICAgICAqIEBwYXJhbSB0YXJnZXQg5L2c55So55qE5a+56LGhXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVHbG9iYWxMaXN0ZW5lcih0eXBlOiBzdHJpbmcgfCBudW1iZXIsIGNhbGxCYWNrOiBFdmVudENhbGxiYWNrTGlzdGVuZXIsIHRhcmdldDogYW55KSB7XG4gICAgICAgIHR5cGUgPSB0eXBlLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBpbmZvOiBFdmVudExpc3RlbmVySW5mb0RhdGEgPSBudWxsO1xuICAgICAgICBsZXQgYXJyYXkgPSBFdmVudE5vZGUubV9nbG9iYWxFdmVudERpY3RbdHlwZV07XG4gICAgICAgIGlmIChhcnJheSAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgaW5mb0luZGV4ID0gLTE7XG4gICAgICAgICAgICBhcnJheS5ldmVyeSgodmFsdWU6IEV2ZW50TGlzdGVuZXJJbmZvRGF0YSwgaW5kZXg6IG51bWJlciwgYXJyYXk6IEV2ZW50TGlzdGVuZXJJbmZvRGF0YVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnRhcmdldCA9PSB0YXJnZXQgJiYgdmFsdWUuY2FsbEJhY2sgPT0gY2FsbEJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mb0luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGluZm8gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoaW5mb0luZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGluZm9JbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKblrZjlnKjov5nkuKrnm5HlkKzmtojmga9cbiAgICAgKiBAcGFyYW0gdHlwZSDmtojmga/nsbvlnotcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5Zue6LCD57G75Z6LXG4gICAgICogQHBhcmFtIHRhcmdldCDlm57osIPlr7nosaFcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGhhc0dsb2JhbExpc3RlbmVyKHR5cGU6IHN0cmluZyB8IG51bWJlciwgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciwgdGFyZ2V0OiBhbnkpIHtcbiAgICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICAgICAgbGV0IGFycmF5ID0gRXZlbnROb2RlLm1fZ2xvYmFsRXZlbnREaWN0W3R5cGVdO1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGFycmF5LmZpbmRJbmRleCgob2JqLCBpbmRleCwgYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai50YXJnZXQgPT0gdGFyZ2V0ICYmIG9iai5jYWxsQmFjayA9PSBjYWxsQmFjaztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZmxhZyA9IGluZGV4ICE9IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmbGFnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa0vuWPkea2iOaBr1xuICAgICAqIEBwYXJhbSBlZCDmtL7lj5HnmoTmtojmga/lhoXlrrlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGRpc3BhdGNoR2xvYmFsKGVkOiBFdmVudERhdGEpIHtcbiAgICAgICAgRXZlbnROb2RlLl9kaXNwYXRjaEdsb2JhbChlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5rS+5Y+R5raI5oGvXG4gICAgICogQHBhcmFtIGNtZCDmtojmga9pZFxuICAgICAqIEBwYXJhbSBkYXRhIOa2iOaBr+WGheWuuVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGlzcGF0Y2hHbG9iYWxCeUNtZChjbWQ6IHN0cmluZyB8IG51bWJlciwgZGF0YTogYW55ID0gbnVsbCkge1xuICAgICAgICBsZXQgZWQgPSBFdmVudE5vZGUuY3JlYXRlR2xvYmFsRGF0YShjbWQsIGRhdGEpO1xuICAgICAgICBFdmVudE5vZGUuX2Rpc3BhdGNoR2xvYmFsKGVkKTtcbiAgICAgICAgaWYgKGVkICE9IG51bGwpIHtcbiAgICAgICAgICAgIEV2ZW50Tm9kZS5yZXR1cm5HbG9iYWxFdmVudERhdGEoZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2Rpc3BhdGNoR2xvYmFsKGVkOiBFdmVudERhdGEpIHtcbiAgICAgICAgbGV0IGFycmF5ID0gRXZlbnROb2RlLm1fZ2xvYmFsRXZlbnREaWN0W2VkLmNtZF07XG4gICAgICAgIGlmIChhcnJheSAhPSBudWxsKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IGFycmF5W2ldO1xuICAgICAgICAgICAgICAgIGlmIChpbmZvLmNhbGxCYWNrICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mby5jYWxsQmFjay5jYWxsKGluZm8udGFyZ2V0LCBlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbmZvLm9uY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGktLSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlZC5pc1N0b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyA9PT09PT09PT09PT09PSAgTG9jYWwgRXZlbnQgU2VjdGlvbiA9PT09PT09PT09PT09PVxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICBwcml2YXRlIG1fZXZlbnREYXRhOiBBcnJheTxFdmVudERhdGE+ID0gbmV3IEFycmF5PEV2ZW50RGF0YT4oKTtcbiAgICBwcml2YXRlIG1fZXZlbnREaWN0OiBFdmVudExpc3RlbmVyQ2xhc3NEaWN0ID0ge307XG5cbiAgICBwcml2YXRlIGNyZWF0ZUV2ZW50RGF0YShjbWQsIGRhdGEpOiBFdmVudERhdGEge1xuICAgICAgICBsZXQgZWQ6IEV2ZW50RGF0YTtcbiAgICAgICAgaWYgKHRoaXMubV9ldmVudERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZWQgPSB0aGlzLm1fZXZlbnREYXRhLnBvcCgpO1xuICAgICAgICAgICAgZWQuY21kID0gY21kO1xuICAgICAgICAgICAgZWQuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICBlZC5pc1N0b3AgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVkID0gbmV3IEV2ZW50RGF0YShjbWQsIGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJldHVybkV2ZW50RGF0YShlZDogRXZlbnREYXRhKSB7XG4gICAgICAgIGVkLmRhdGEgPSBudWxsO1xuICAgICAgICBlZC5jbWQgPSBudWxsO1xuICAgICAgICBlZC5pc1N0b3AgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX2V2ZW50RGF0YS5wdXNoKGVkKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa3u+WKoOS4gOS4qua2iOaBr+ebkeWQrOWZqFxuICAgICAqIEBwYXJhbSB0eXBlIOa2iOaBr+exu+Wei1xuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlm57osIPlh73mlbBcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOS9nOeUqOWvueixoVxuICAgICAqIEBwYXJhbSBwcmlvcml0eSDmtojmga/nmoTkvJjlhYjnuqdcbiAgICAgKiBAcGFyYW0gb25jZSDmmK/lkKblj6rnm5HlkKzkuIDmrKFcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcgfCBudW1iZXIsIGNhbGxCYWNrOiBFdmVudENhbGxiYWNrTGlzdGVuZXIsIHRhcmdldDogYW55LCBwcmlvcml0eTogbnVtYmVyID0gMCwgb25jZTogYm9vbGVhbiA9IGZhbHNlKTpFdmVudExpc3RlbmVySW5mb0RhdGEgICB7XG4gICAgICAgIHR5cGUgPSB0eXBlLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBpbmZvOiBFdmVudExpc3RlbmVySW5mb0RhdGEgPSB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgY2FsbEJhY2s6IGNhbGxCYWNrLFxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgICAgICAgICBvbmNlOiBvbmNlXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5tX2V2ZW50RGljdFt0eXBlXTtcbiAgICAgICAgbGV0IGhhcyA9IGZhbHNlO1xuICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgaWYgKGFycmF5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudGFyZ2V0ID09IHRhcmdldCAmJiBlbGVtZW50LmNhbGxCYWNrID09IGNhbGxCYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnByaW9yaXR5ID4gaW5mby5wcmlvcml0eSkge1xuICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycmF5ID0gbmV3IEFycmF5PEV2ZW50TGlzdGVuZXJJbmZvRGF0YT4oKTtcbiAgICAgICAgICAgIHRoaXMubV9ldmVudERpY3RbdHlwZV0gPSBhcnJheTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwi6YeN5aSN5rOo5YaM5raI5oGv77yadHlwZT1cIiArIHR5cGUpO1xuICAgICAgICAgICAgTG9nLmVycm9yKFwi6YeN5aSN5rOo5YaM5raI5oGv77yadHlwZT1cIiArIHR5cGUpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShwb3MsIDAsIGluZm8pO1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnp7vpmaTkuIDkuKrmtojmga/nm5HlkKzlmahcbiAgICAgKiBAcGFyYW0gdHlwZSDmtojmga9pZFxuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlm57osIPlh73mlbBcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOS9nOeUqOeahOWvueixoVxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZyB8IG51bWJlciwgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciwgdGFyZ2V0OiBhbnkpIHtcbiAgICAgICAgdHlwZSA9IHR5cGUudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IGluZm86IEV2ZW50TGlzdGVuZXJJbmZvRGF0YSA9IG51bGw7XG4gICAgICAgIGxldCBhcnJheSA9IHRoaXMubV9ldmVudERpY3RbdHlwZV07XG4gICAgICAgIGlmIChhcnJheSAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgaW5mb0luZGV4ID0gLTE7XG4gICAgICAgICAgICBhcnJheS5ldmVyeSgodmFsdWU6IEV2ZW50TGlzdGVuZXJJbmZvRGF0YSwgaW5kZXg6IG51bWJlciwgYXJyYXk6IEV2ZW50TGlzdGVuZXJJbmZvRGF0YVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnRhcmdldCA9PSB0YXJnZXQgJiYgdmFsdWUuY2FsbEJhY2sgPT0gY2FsbEJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mb0luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGluZm8gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoaW5mb0luZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGluZm9JbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lckFsbCgpIHtcbiAgICAgICAgdGhpcy5tX2V2ZW50RGF0YSA9IG5ldyBBcnJheTxFdmVudERhdGE+KCk7XG4gICAgICAgIHRoaXMubV9ldmVudERpY3QgPSB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKblrZjlnKjov5nkuKrnm5HlkKzmtojmga9cbiAgICAgKiBAcGFyYW0gdHlwZSDmtojmga/nsbvlnotcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5Zue6LCD57G75Z6LXG4gICAgICogQHBhcmFtIHRhcmdldCDlm57osIPlr7nosaFcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFzRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcgfCBudW1iZXIsIGNhbGxCYWNrOiBFdmVudENhbGxiYWNrTGlzdGVuZXIsIHRhcmdldDogYW55KSB7XG4gICAgICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgICAgIGxldCBhcnJheSA9IHRoaXMubV9ldmVudERpY3RbdHlwZV07XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgbGV0IGluZGV4ID0gYXJyYXkuZmluZEluZGV4KChvYmosIGluZGV4LCBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnRhcmdldCA9PSB0YXJnZXQgJiYgb2JqLmNhbGxCYWNrID09IGNhbGxCYWNrO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmbGFnID0gaW5kZXggIT0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZsYWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5rS+5Y+R5raI5oGvXG4gICAgICogQHBhcmFtIGVkIOa0vuWPkeeahOa2iOaBr+WGheWuuVxuICAgICAqL1xuICAgIHB1YmxpYyBkaXNwYXRjaEV2ZW50KGVkOiBFdmVudERhdGEpIHtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudChlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5rS+5Y+R5raI5oGvXG4gICAgICogQHBhcmFtIGNtZCDmtojmga9pZFxuICAgICAqIEBwYXJhbSBkYXRhIOa2iOaBr+WGheWuuVxuICAgICAqL1xuICAgIHB1YmxpYyBkaXNwYXRjaEV2ZW50QnlDbWQoY21kOiBzdHJpbmcgfCBudW1iZXIsIGRhdGE6IGFueSA9IG51bGwpIHtcbiAgICAgICAgbGV0IGVkID0gdGhpcy5jcmVhdGVFdmVudERhdGEoY21kLCBkYXRhKTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudChlZCk7XG4gICAgICAgIGlmIChlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJldHVybkV2ZW50RGF0YShlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNwYXRjaEV2ZW50KGVkOiBFdmVudERhdGEpIHtcbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5tX2V2ZW50RGljdFtlZC5jbWRdO1xuICAgICAgICBpZiAoYXJyYXkgIT0gbnVsbCkge1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZm8gPSBhcnJheVtpXTtcbiAgICAgICAgICAgICAgICBpZiAoaW5mby5jYWxsQmFjayAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZm8uY2FsbEJhY2suY2FsbChpbmZvLnRhcmdldCwgZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaW5mby5vbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpLS0sIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZWQuaXNTdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5cbmV4cG9ydCB0eXBlIEV2ZW50TGlzdGVuZXJJbmZvRGF0YSA9XG4gICAge1xuICAgICAgICB0eXBlOiBzdHJpbmcsXG4gICAgICAgIGNhbGxCYWNrOiBFdmVudENhbGxiYWNrTGlzdGVuZXIsXG4gICAgICAgIHRhcmdldDogYW55LFxuICAgICAgICBwcmlvcml0eTogbnVtYmVyLFxuICAgICAgICBvbmNlOiBib29sZWFuXG4gICAgfVxuXG5leHBvcnQgdHlwZSBFdmVudExpc3RlbmVyQ2xhc3NEaWN0ID0ge1xuICAgIFtrZXk6IHN0cmluZ106IEFycmF5PEV2ZW50TGlzdGVuZXJJbmZvRGF0YT5cbn1cblxuXG5leHBvcnQgdHlwZSBFdmVudENhbGxiYWNrTGlzdGVuZXIgPSAoKGVkOiBFdmVudERhdGEpID0+IHZvaWQpO1xuXG5leHBvcnQgY2xhc3MgRXZlbnRDb250ZXh0IHtcblxuICAgIHB1YmxpYyBzdGF0aWMgZXZlbnROb2RlczogTWFwPEV2ZW50Tm9kZSwgRXZlbnROb2RlPiA9IG5ldyBNYXA8RXZlbnROb2RlLCBFdmVudE5vZGU+KCk7XG5cbn1cblxuIiwiaW1wb3J0IHsgRXZlbnRGdW5jIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGF0YSc7XG5pbXBvcnQgeyBSZXNJdGVtIH0gZnJvbSAnLi9yZXMtaXRlbSc7XG5cbiAvKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTA5IDE5OjMxXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiDlnLrmma/nrqHnkIblmajmiYDpnIDnmoTotYTmupDljIXlrprkuYlcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNHcm91cCB7XG5cbiAgICAvKirliqDovb3ov5vluqYgKi9cbiAgICBwdWJsaWMgcHJvZ3Jlc3M6IG51bWJlciA9IDA7XG4gICAgLyoq5Yqg6L296LWE5rqQICovXG4gICAgcHVibGljIG5lZWRMb2FkOiBBcnJheTxSZXNJdGVtPiA9IG5ldyBBcnJheTxSZXNJdGVtPigpO1xuICAgIC8qKuWKoOi9veaXtueahOWbnuiwg+aOpeWPoyzkuIDoiKznlKjkvZznu5nliqDovb3nqpforr7nva7ov5vluqYgKi9cbiAgICBwdWJsaWMgbG9hZEl0ZW06IEV2ZW50RnVuYztcbiAgICAvKirnu5PmnZ/ml7bnmoTlm57osIPmjqXlj6MgKi9cbiAgICBwdWJsaWMgZmluaXNoOiBFdmVudEZ1bmM7XG5cbiAgICAvKipcbiAgICAgKiDlkJHotYTmupDnu4Tmt7vliqDnm67moIdcbiAgICAgKiBAcGFyYW0gdXJsIOebuOWvuei3r+W+hFxuICAgICAqIEBwYXJhbSB0eXBlIOexu+WeiyBcbiAgICAgKiBAcGFyYW0gaXNLZWVwTWVtb3J5IOaYr+WQpuW4uOmpu+WGheWtmCBcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkKHVybDogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGlzS2VlcE1lbW9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5uZWVkTG9hZC5maW5kSW5kZXgoKHZhbHVlOiBSZXNJdGVtLCBpbmRleDogbnVtYmVyLCBvYmo6IEFycmF5PFJlc0l0ZW0+KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUudXJsID09IHVybFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICBsZXQgaW5mbyA9IG5ldyBSZXNJdGVtKCk7XG4gICAgICAgICAgICBpbmZvLmlzS2VlcE1lbW9yeSA9IGlzS2VlcE1lbW9yeTtcbiAgICAgICAgICAgIGluZm8udXJsID0gdXJsO1xuICAgICAgICAgICAgaW5mby50eXBlID0gdHlwZTtcbiAgICAgICAgICAgIHRoaXMubmVlZExvYWQucHVzaChpbmZvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi1hOa6kOWKoOi9veWujOaIkOWbnuiwg1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcbiAgICAgKiBAcGFyYW0gdGhpc09ianMg5L2c55So5Z+fXG4gICAgICovXG4gICAgcHVibGljIG9uQ29tcGxldGlvbihjYWxsYmFjazogRnVuY3Rpb24sIHRoaXNPYmpzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5maW5pc2ggPSBuZXcgRXZlbnRGdW5jKHRoaXNPYmpzLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxufVxuXG4iLCJcbi8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDgtMDkgMTk6MThcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uIOi1hOa6kOWxnuaAp1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc0l0ZW0ge1xuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyBpc0tlZXBNZW1vcnkgPSBmYWxzZTtcblxuICAgIHB1YmxpYyBnZXQgZnVsbFVybCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsXG4gICAgfVxufVxuXG5cbiIsImltcG9ydCB7IFV0aWxUaW1lIH0gZnJvbSAnLi4vLi4vdXRpbC90aW1lJztcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTA5IDE5OjM2XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24gIOWKoOi9vei/h+W+l+i1hOa6kOS/oeaBr1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJlc0xvYWRlZCB7XHJcblxyXG4gICAgLyoq6LWE5rqQ6Lev5b6EICovXHJcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XHJcbiAgICAvKirliJvlu7rml7bpl7QqL1xyXG4gICAgcHVibGljIGN0aW1lOiBudW1iZXI7XHJcbiAgICAvKirmnIDov5Hkvb/nlKjml7bpl7QqL1xyXG4gICAgcHVibGljIHV0aW1lOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoX3VybDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBfdXJsO1xyXG4gICAgICAgIHRoaXMuY3RpbWUgPSBVdGlsVGltZS50aW1lU2luY2VTdGFydHVwO1xyXG4gICAgICAgIHRoaXMudXRpbWUgPSBVdGlsVGltZS50aW1lU2luY2VTdGFydHVwO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgSGFuZGxlciA9IExheWEuSGFuZGxlcjtcbmltcG9ydCB7IEV2ZW50Tm9kZSB9IGZyb20gJy4uL2V2ZW50L2V2ZW50LW5vZGUnO1xuaW1wb3J0IHsgSU1hbmFnZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvaS1tYW5hZ2VyJztcbmltcG9ydCB7IERpY3Rpb25hcnkgfSBmcm9tICcuLi8uLi9zdHJ1Y3R1cmUvZGljdGlvbmFyeSc7XG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuLi8uLi9jb3JlL2xvZyc7XG5pbXBvcnQgeyBSZXNJdGVtIH0gZnJvbSAnLi9yZXMtaXRlbSc7XG5pbXBvcnQgeyBVdGlsVGltZSB9IGZyb20gJy4uLy4uL3V0aWwvdGltZSc7XG5pbXBvcnQgeyBSZXNHcm91cCB9IGZyb20gJy4vcmVzLWdyb3VwJztcbmltcG9ydCB7IFJlc0xvYWRlZCB9IGZyb20gJy4vcmVzLWxvYWRlZCc7XG5pbXBvcnQgeyBTY2VuZU1hbmFnZXIgfSBmcm9tICcuLi9zY2VuZS9zY2VuZS1tYW5hZ2VyJztcbmltcG9ydCB7IGVudW1DbGVhclN0cmF0ZWd5LCBlbnVtQXJyYXlTb3J0T3JkZXIgfSBmcm9tICcuLi8uLi9zZXR0aW5nL2VudW0nO1xuaW1wb3J0IHsgVXRpbEFycmF5IH0gZnJvbSAnLi4vLi4vdXRpbC9hcnJheSc7XG5cblxuLyoqXG4gKiBAYXV0aG9yIFN1blxuICogQHRpbWUgMjAxOS0wOC0wOSAxOToxMlxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gKiBAZGVzY3JpcHRpb24gIOi1hOa6kOeuoeeQhlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc01hbmFnZXIgZXh0ZW5kcyBFdmVudE5vZGUgaW1wbGVtZW50cyBJTWFuYWdlciB7XG5cbiAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAoUmVzTWFuYWdlci5tSW5zdGFuY2UgPT0gbnVsbCkgUmVzTWFuYWdlci5tSW5zdGFuY2UgPSB0aGlzXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtX29sZFJlczogQXJyYXk8c3RyaW5nPiA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG4gICAgLy8g6YCa6L+H5Zy65pmv5Yqg6L295Zmo5Yqg6L2955qE6LWE5rqQXG4gICAgcHJpdmF0ZSBtX2RpY3RSZXNJdGVtOiBNYXA8c3RyaW5nLCBSZXNJdGVtPiA9IG5ldyBNYXA8c3RyaW5nLCBSZXNJdGVtPigpO1xuICAgIC8vIOaJi+W3peWKoOi9veeahOi1hOa6kFxuICAgIHByaXZhdGUgbV9kaWN0UmVzTWFudWFsOiBEaWN0aW9uYXJ5PFJlc0xvYWRlZD4gPSBudWxsO1xuICAgIC8vIOaJi+W3peWKoOi9veeahOi1hOa6kOe7hOWQjVxuICAgIHByaXZhdGUgbV9tYW51YWxHcm91cDogc3RyaW5nID0gJ21hbnVhbCc7XG5cblxuICAgIHByaXZhdGUgc3RhdGljIG1JbnN0YW5jZTogUmVzTWFuYWdlciA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOiBSZXNNYW5hZ2VyIHtcbiAgICAgICAgaWYgKHRoaXMubUluc3RhbmNlID09IG51bGwpIG5ldyBSZXNNYW5hZ2VyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLm1JbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0dXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubV9kaWN0UmVzTWFudWFsID0gbmV3IERpY3Rpb25hcnk8UmVzTG9hZGVkPigpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubV9kaWN0UmVzTWFudWFsKSB7XG4gICAgICAgICAgICB0aGlzLm1fZGljdFJlc01hbnVhbC5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5tX2RpY3RSZXNNYW51YWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw6LWE5rqQ5L2/55So5pe26Ze0XG4gICAgICogQHBhcmFtIHVybCBcbiAgICAgKiBAcGFyYW0gaXNfY3JlYXRlIFxuICAgICAqL1xuICAgIHByaXZhdGUgcmVmcmVzaFRpbWUodXJsOiBzdHJpbmcsIGlzX2NyZWF0ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNfY3JlYXRlKSB7XG4gICAgICAgICAgICBsZXQgbG9hZGVyX2luZm86IFJlc0xvYWRlZCA9IHRoaXMubV9kaWN0UmVzTWFudWFsLnZhbHVlKHVybCk7XG4gICAgICAgICAgICBpZiAoIWxvYWRlcl9pbmZvKSB7XG4gICAgICAgICAgICAgICAgbG9hZGVyX2luZm8gPSBuZXcgUmVzTG9hZGVkKHVybCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tX2RpY3RSZXNNYW51YWwuYWRkKHVybCwgbG9hZGVyX2luZm8pO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgbG9hZGVyX2luZm8uY3RpbWUgPSBVdGlsVGltZS50aW1lU2luY2VTdGFydHVwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGxvYWRlcl9pbmZvOiBSZXNMb2FkZWQgPSB0aGlzLm1fZGljdFJlc01hbnVhbC52YWx1ZSh1cmwpO1xuICAgICAgICAgICAgaWYgKGxvYWRlcl9pbmZvKSB7XG4gICAgICAgICAgICAgICAgbG9hZGVyX2luZm8udXRpbWUgPSBVdGlsVGltZS50aW1lU2luY2VTdGFydHVwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDpgJrov4dVUkzojrflj5botYTmupBcbiAgICAgKiBAcGFyYW0gdXJsXG4gICAgICovXG4gICAgcHVibGljIGdldFJlcyh1cmw6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJlZnJlc2hUaW1lKHVybCwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gTGF5YS5sb2FkZXIuZ2V0UmVzKHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqg6L295Li75Zy65pmv6LWE5rqQ5YyFXG4gICAgICogQHBhcmFtIGxvYWRzIOi1hOa6kOe7hFxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkR3JvdXAobG9hZHM6IFJlc0dyb3VwKSB7XG5cbiAgICAgICAgbGV0IHVybHM6IEFycmF5PGFueT4gPSBuZXcgQXJyYXk8YW55PigpO1xuICAgICAgICBsb2Fkcy5uZWVkTG9hZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgdXJscy5wdXNoKHt1cmw6IGVsZW1lbnQudXJsLCB0eXBlOiBlbGVtZW50LnR5cGV9KVxuICAgICAgICB9KTtcblxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHVybHMsIEhhbmRsZXIuY3JlYXRlKHRoaXMsIChzdWNjZXNzOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgU2NlbmVNYW5hZ2VyLiQubG9hZGluZ1ZpZXcub25Db21wbGV0ZWQoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbG9hZHMubmVlZExvYWQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmZvID0gbG9hZHMubmVlZExvYWRbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubV9kaWN0UmVzSXRlbS5oYXMoaW5mby51cmwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1fZGljdFJlc0l0ZW0uc2V0KGluZm8udXJsLCBpbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobG9hZHMuZmluaXNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZHMuZmluaXNoLmludm9rZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiTG9hZCBSZXNvdXJjZSBFcnJvcu+8mlwiKTtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcodXJscyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCBIYW5kbGVyLmNyZWF0ZSh0aGlzLCAocHJvZ3Jlc3M6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbG9hZHMucHJvZ3Jlc3MgPSBwcm9ncmVzcyAqIDEwMDtcbiAgICAgICAgICAgIFNjZW5lTWFuYWdlci4kLm9uTG9hZGluZyhsb2Fkcy5wcm9ncmVzcyk7XG4gICAgICAgICAgICBpZiAobG9hZHMubG9hZEl0ZW0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxvYWRzLmxvYWRJdGVtLmludm9rZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBudWxsLCBmYWxzZSkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YeK5pS+6LWE5rqQXG4gICAgICogQHBhcmFtIGZvcmNlZCDmmK/lkKblvLrliLbph4rmlL7miYDmnIlcbiAgICAgKi9cbiAgICBwdWJsaWMgcG9wKGZvcmNlZCA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChmb3JjZWQpIHtcbiAgICAgICAgICAgIHRoaXMubV9vbGRSZXMuc3BsaWNlKDAsIHRoaXMubV9vbGRSZXMubGVuZ3RoKVxuXG4gICAgICAgICAgICB0aGlzLm1fZGljdFJlc0l0ZW0uZm9yRWFjaCgodjogUmVzSXRlbSwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fb2xkUmVzLnB1c2goa2V5KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRoaXMubV9vbGRSZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMubV9vbGRSZXMucG9wKClcbiAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5tX2RpY3RSZXNJdGVtLmdldCh1cmwpXG4gICAgICAgICAgICBpZiAoaW5mbyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX2RpY3RSZXNJdGVtLmRlbGV0ZShpbmZvLnVybClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIExheWEubG9hZGVyLmNsZWFyUmVzKHVybClcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvcmNlZCkge1xuICAgICAgICAgICAgdGhpcy5tX2RpY3RSZXNJdGVtLmNsZWFyKClcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y6L5YWl6KaB6YeK5pS+55qE6LWE5rqQXG4gICAgICovXG4gICAgcHVibGljIHB1c2goKSB7XG4gICAgICAgIHRoaXMubV9kaWN0UmVzSXRlbS5mb3JFYWNoKCh2OiBSZXNJdGVtLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKCF2LmlzS2VlcE1lbW9yeSlcbiAgICAgICAgICAgICAgICB0aGlzLm1fb2xkUmVzLnB1c2goa2V5KVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOmHiuaUvui1hOa6kFxuICAgICAqIEBwYXJhbSAgICB0eXBlICAgIOmHiuaUvuetlueVpVxuICAgICAqL1xuICAgIHB1YmxpYyBjbGVhclVudXNlZCh0eXBlOiBlbnVtQ2xlYXJTdHJhdGVneSk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsZWFyKHR5cGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmHiuaUvuaMh+Wumui1hOa6kFxuICAgICAqIEBwYXJhbSAgICB1cmwgICAg6LWE5rqQ6Lev5b6EXG4gICAgICovXG4gICAgcHVibGljIGNsZWFyUmVzKHVybDogc3RyaW5nKTogYW55IHtcbiAgICAgICAgdGhpcy5tX2RpY3RSZXNNYW51YWwucmVtb3ZlKHVybCk7XG4gICAgICAgIExheWEubG9hZGVyLmNsZWFyUmVzKHVybCk7XG4gICAgICAgIExvZy5pbmZvKFwiW3Jlc13ph4rmlL7otYTmupA6XCIgKyB1cmwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXIodHlwZTogZW51bUNsZWFyU3RyYXRlZ3kpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIGVudW1DbGVhclN0cmF0ZWd5LkFMTDoge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLm1fZGljdFJlc01hbnVhbCkge1xuICAgICAgICAgICAgICAgICAgICBMYXlhLmxvYWRlci5jbGVhclJlcyhrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1fZGljdFJlc01hbnVhbC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIExvZy5pbmZvKFwiW3Jlc13ph4rmlL7miYDmnInotYTmupBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGVudW1DbGVhclN0cmF0ZWd5LkZJRk86IHtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdDogQXJyYXk8UmVzTG9hZGVkPiA9IHRoaXMubV9kaWN0UmVzTWFudWFsLnZhbHVlcygpO1xuICAgICAgICAgICAgICAgIFV0aWxBcnJheS5zb3J0KGxpc3QsIFwiY3RpbWVcIiwgZW51bUFycmF5U29ydE9yZGVyLkFzY2VuZGluZyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aCAqIDAuNTsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJSZXMobGlzdFtpXS51cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZW51bUNsZWFyU3RyYXRlZ3kuRklMTzoge1xuICAgICAgICAgICAgICAgIGxldCBsaXN0OiBBcnJheTxSZXNMb2FkZWQ+ID0gdGhpcy5tX2RpY3RSZXNNYW51YWwudmFsdWVzKCk7XG4gICAgICAgICAgICAgICAgVXRpbEFycmF5LnNvcnQobGlzdCwgXCJjdGltZVwiLCBlbnVtQXJyYXlTb3J0T3JkZXIuRGVzY2VuZGluZyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aCAqIDAuNTsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJSZXMobGlzdFtpXS51cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZW51bUNsZWFyU3RyYXRlZ3kuTFJVOiB7XG4gICAgICAgICAgICAgICAgbGV0IGxpc3Q6IEFycmF5PFJlc0xvYWRlZD4gPSB0aGlzLm1fZGljdFJlc01hbnVhbC52YWx1ZXMoKTtcbiAgICAgICAgICAgICAgICBVdGlsQXJyYXkuc29ydChsaXN0LCBcInV0aW1lXCIsIGVudW1BcnJheVNvcnRPcmRlci5Bc2NlbmRpbmcpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGggKiAwLjU7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyUmVzKGxpc3RbaV0udXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGVudW1DbGVhclN0cmF0ZWd5LlVOX1VTRUQ6IHtcbiAgICAgICAgICAgICAgICAvL1RPRE9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5Yqg6L296LWE5rqQXG4gICAgICogQHBhcmFtICAgIHVybCAgICAgICAg5Y2V5Liq6LWE5rqQ5Zyw5Z2AXG4gICAgICogQHBhcmFtICAgIHR5cGUgICAgICAgIOi1hOa6kOexu+Wei1xuICAgICAqIEBwYXJhbSAgICBjb21wbGV0ZSAgICDnu5PmnZ/lm57osIMo5Y+C5pWw77yac3RyaW5nIOWKoOi9veeahOi1hOa6kHVybClcbiAgICAgKiBAcGFyYW0gICAgcHJvZ3Jlc3MgICAg6L+b56iL5Zue6LCDKOWPguaVsO+8mnN0cmluZyDliqDovb3nmoTotYTmupB1cmwpXG4gICAgICogQHBhcmFtICAgIHByaW9yaXR5ICAgIOS8mOWFiOe6p++8jDAtNO+8jDXkuKrkvJjlhYjnuqfvvIww5LyY5YWI57qn5pyA6auY77yM6buY6K6k5Li6MeOAglxuICAgICAqIEBwYXJhbSAgICBjYWNoZSAgICAgICAg5piv5ZCm57yT5a2Y5Yqg6L2957uT5p6c44CCXG4gICAgICogQHBhcmFtICAgIGlnbm9yZUNhY2hlIOaYr+WQpuW/veeVpee8k+WtmO+8jOW8uuWItumHjeaWsOWKoOi9vVxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkTWFudWFsKHVybDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZyA9IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGFueSA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IGFueSA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHk6IG51bWJlciA9IDEsXG4gICAgICAgICAgICAgICAgICAgICAgY2FjaGU6IGJvb2xlYW4gPSB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGlnbm9yZUNhY2hlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnJlZnJlc2hUaW1lKHVybCwgdHJ1ZSk7XG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoXG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBjb21wbGV0ZSxcbiAgICAgICAgICAgIHByb2dyZXNzLFxuICAgICAgICAgICAgLy8gTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBjb21wbGV0ZSwgW3VybF0pLFxuICAgICAgICAgICAgLy8gTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBwcm9ncmVzcywgWzFdLCBmYWxzZSksXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgcHJpb3JpdHksXG4gICAgICAgICAgICBjYWNoZSxcbiAgICAgICAgICAgIHRoaXMubV9tYW51YWxHcm91cCxcbiAgICAgICAgICAgIGlnbm9yZUNhY2hlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb3otYTmupDnu4RcbiAgICAgKiBAcGFyYW0gICAgdXJsICAgICAgICDpnIDopoHliqDovb3nmoTotYTmupDmlbDnu4RcbiAgICAgKiBAcGFyYW0gICAgY29tcGxldGUgICAg57uT5p2f5Zue6LCDKOWPguaVsO+8mnN0cmluZyDliqDovb3nmoTotYTmupB1cmwpXG4gICAgICogQHBhcmFtICAgIHByaW9yaXR5ICAgIOS8mOWFiOe6p++8jDAtNO+8jDXkuKrkvJjlhYjnuqfvvIww5LyY5YWI57qn5pyA6auY77yM6buY6K6k5Li6MeOAglxuICAgICAqIEBwYXJhbSAgICBjYWNoZSAgICAgICAg5piv5ZCm57yT5a2Y5Yqg6L2957uT5p6c44CCXG4gICAgICogQHBhcmFtICAgIGlnbm9yZUNhY2hlIOaYr+WQpuW/veeVpee8k+WtmO+8jOW8uuWItumHjeaWsOWKoOi9vVxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkTWFudWFsQW55KHVybDogQXJyYXk8eyB1cmw6IHN0cmluZywgdHlwZTogc3RyaW5nIH0+LFxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBhbnkgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBhbnkgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHByaW9yaXR5OiBudW1iZXIgPSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlOiBib29sZWFuID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmVDYWNoZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIGxldCBoYXNfdW5sb2FkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGxldCBhc3NldHMgPSBbXTtcbiAgICAgICAgbGV0IHVybHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcmVzIG9mIHVybCkge1xuICAgICAgICAgICAgYXNzZXRzLnB1c2goe3VybDogcmVzLnVybCwgdHlwZTogcmVzLnR5cGV9KTtcbiAgICAgICAgICAgIHVybHMucHVzaChyZXMudXJsKTtcbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5pyJ5pyq5Yqg6L296LWE5rqQXG4gICAgICAgICAgICBpZiAoIWhhc191bmxvYWQgJiYgIUxheWEubG9hZGVyLmdldFJlcyhyZXMudXJsKSkgaGFzX3VubG9hZCA9IHRydWU7XG4gICAgICAgICAgICAvL+a3u+WKoOWIsOWKoOi9veebruW9lVxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVGltZShyZXMudXJsLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoXG4gICAgICAgICAgICBhc3NldHMsXG4gICAgICAgICAgICBjb21wbGV0ZSxcbiAgICAgICAgICAgIHByb2dyZXNzLFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgcHJpb3JpdHksXG4gICAgICAgICAgICBjYWNoZSxcbiAgICAgICAgICAgIHRoaXMubV9tYW51YWxHcm91cCxcbiAgICAgICAgICAgIGlnbm9yZUNhY2hlKTtcbiAgICB9XG5cbn1cblxuIiwiaW1wb3J0IHsgRXZlbnROb2RlIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtbm9kZSc7XG5pbXBvcnQgeyBJTWFuYWdlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9pLW1hbmFnZXInO1xuaW1wb3J0IHsgQ3VzdG9tU2NlbmUgfSBmcm9tICcuLi91aS9zY2VuZS1iYXNlJztcbmltcG9ydCBMeVNjZW5lID0gQ3VzdG9tU2NlbmUuTHlTY2VuZTtcbmltcG9ydCB7IExvZyB9IGZyb20gJy4uLy4uL2NvcmUvbG9nJztcbmltcG9ydCB7IENvbmZpZ1VJIH0gZnJvbSAnLi4vLi4vc2V0dGluZy9jb25maWcnO1xuaW1wb3J0IHsgSUxvYWluZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9pLUxvYWRpbmcnO1xuXG5cbi8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDgtMDkgMjM6MjJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uICDlnLrmma/nrqHnkIblmahcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBFdmVudE5vZGUgaW1wbGVtZW50cyBJTWFuYWdlciB7XG5cbiAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmIChTY2VuZU1hbmFnZXIubUluc3RhbmNlID09IG51bGwpIFNjZW5lTWFuYWdlci5tSW5zdGFuY2UgPSB0aGlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgbVNjZW5lczogTWFwPGFueSwgTHlTY2VuZT4gPSBuZXcgTWFwPGFueSwgTHlTY2VuZT4oKTtcbiAgICBwcml2YXRlIHN0YXRpYyBtSW5zdGFuY2U6IFNjZW5lTWFuYWdlciA9IG51bGw7XG4gICAgcHVibGljIGxvYWRpbmdWaWV3OiBhbnkgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOiBTY2VuZU1hbmFnZXIge1xuICAgICAgICBpZiAodGhpcy5tSW5zdGFuY2UgPT0gbnVsbCkgbmV3IFNjZW5lTWFuYWdlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5tSW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtQ3VyU2NlbmU6IEx5U2NlbmUgPSBudWxsO1xuXG4gICAgcHVibGljIGN1cnJlbnRTY2VuZSgpOiBMeVNjZW5lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubUN1clNjZW5lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaYvuekumxvYWRpbmfpobXpnaJcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvd0xvYWRpbmdWaWV3KCk6YW55IHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ1ZpZXcgPT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IHNjcnB0ID0gQ29uZmlnVUkuJC5kZWZhdWx0TG9hZFZpZXc7XG4gICAgICAgICAgICBpZiAoc2NycHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nVmlldyA9IG5ldyBzY3JwdCgpO1xuICAgICAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5sb2FkaW5nVmlldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGluZ1ZpZXc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6ZqQ6JePbG9hZGluZ+mhtemdolxuICAgICAqL1xuICAgIHB1YmxpYyBoaWRlTG9hZGluZ1ZpZXcoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdWaWV3ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ1ZpZXcucmVtb3ZlU2VsZigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uTG9hZGluZyhwcm9ncmVzczogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdWaWV3ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy5sb2FkaW5nVmlldyBhcyBJTG9haW5nO1xuICAgICAgICAgICAgdmlldy5vblByb2dyZXNzKHByb2dyZXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuICAgIC8qKlxuICAgICAqIOi3s+i9rOWcuuaZr1xuICAgICAqIEBwYXJhbSBzY3JpcHRcbiAgICAgKiBAcGFyYW0gcGFyYW0g5Y+C5pWwXG4gICAgICovXG4gICAgcHVibGljIGdvVG9TY2VuZShzY3JpcHQ6IGFueSwgcGFyYW06IGFueSA9IG51bGwpIHtcblxuICAgICAgICBpZiAoIXRoaXMubVNjZW5lcy5oYXMoc2NyaXB0KSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubUN1clNjZW5lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1DdXJTY2VuZS5sZWF2ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubUN1clNjZW5lLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1TY2VuZXMuZGVsZXRlKHNjcmlwdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgc2NlbmU6IEx5U2NlbmUgPSBuZXcgc2NyaXB0KCk7XG4gICAgICAgICAgICB0aGlzLm1TY2VuZXMuc2V0KHNjcmlwdCwgc2NlbmUpO1xuICAgICAgICAgICAgdGhpcy5tQ3VyU2NlbmUgPSBzY2VuZTtcbiAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQoc2NlbmUpO1xuICAgICAgICAgICAgdGhpcy5tQ3VyU2NlbmUuZW50ZXIocGFyYW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNjZW5lID0gdGhpcy5tU2NlbmVzLmdldChzY3JpcHQpO1xuICAgICAgICAgICAgaWYgKHNjZW5lID09IHRoaXMubUN1clNjZW5lKSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwi5b2T5YmN5Zy65pmv5LiO55uu5qCH5Zy65pmv5LiA5qC35peg5rOV6YeN5paw6L+b5YWl6L+Z5Liq5Zy65pmvXCIpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tQ3VyU2NlbmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1DdXJTY2VuZS5sZWF2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1DdXJTY2VuZSA9IHRoaXMubVNjZW5lcy5nZXQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tQ3VyU2NlbmUuZW50ZXIocGFyYW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBkZXN0cm95KCk6IHZvaWQge1xuICAgIH1cblxuICAgIHNldHVwKCk6IHZvaWQge1xuICAgIH1cbiAgICB1cGRhdGUoKTogdm9pZCB7XG4gICAgfVxuXG59XG5cbiIsImltcG9ydCB7VXRpbFRpbWV9IGZyb20gXCIuLi8uLi91dGlsL3RpbWVcIjtcbmltcG9ydCBIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xuaW1wb3J0IHsgSVBvb2xPYmplY3QgfSBmcm9tICcuLi8uLi9jb3JlL29iamVjdC1wb29sJztcbmltcG9ydCB7IFRpbWVySW50ZXJ2YWwgfSBmcm9tICcuL3RpbWVyLWludGVydmFsJztcblxuLyoqXG4gKiBAYXV0aG9yIFN1blxuICogQHRpbWUgMjAxOS0wOC0xMCAyMDowNlxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gKiBAZGVzY3JpcHRpb24gIOiuoeaXtuWZqOWfuuexu1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFRpbWVyRW50aXR5IGltcGxlbWVudHMgSVBvb2xPYmplY3Qge1xuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xuICAgIHB1YmxpYyBpc0FjdGl2ZTogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBtUmF0ZTogbnVtYmVyO1xuICAgIHB1YmxpYyBtVGlja3M6IG51bWJlcjtcbiAgICBwdWJsaWMgbVRpY2tzRWxhcHNlZDogbnVtYmVyO1xuICAgIHB1YmxpYyBoYW5kbGU6IEhhbmRsZXI7XG5cbiAgICBwdWJsaWMgbVRpbWU6IFRpbWVySW50ZXJ2YWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tVGltZSA9IG5ldyBUaW1lckludGVydmFsKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKCkge1xuICAgIH1cblxuXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5oYW5kbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGUucmVjb3ZlcigpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldChpZDogbnVtYmVyLCByYXRlOiBudW1iZXIsIHRpY2tzOiBudW1iZXIsIGhhbmRsZTogSGFuZGxlcikge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubVJhdGUgPSByYXRlIDwgMCA/IDAgOiByYXRlO1xuICAgICAgICB0aGlzLm1UaWNrcyA9IHRpY2tzIDwgMCA/IDAgOiB0aWNrcztcbiAgICAgICAgdGhpcy5oYW5kbGUgPSBoYW5kbGU7XG4gICAgICAgIHRoaXMubVRpY2tzRWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm1UaW1lLmluaXQodGhpcy5tUmF0ZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUocmVtb3ZlVGltZXI6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSAmJiB0aGlzLm1UaW1lLnVwZGF0ZShVdGlsVGltZS5kZWx0YVRpbWUpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYW5kbGUgIT0gbnVsbCkgdGhpcy5oYW5kbGUucnVuKCk7XG5cbiAgICAgICAgICAgIHRoaXMubVRpY2tzRWxhcHNlZCsrO1xuICAgICAgICAgICAgaWYgKHRoaXMubVRpY2tzID4gMCAmJiB0aGlzLm1UaWNrcyA9PSB0aGlzLm1UaWNrc0VsYXBzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVGltZXIodGhpcy5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTEwIDIwOjAyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiAg5a6a5pe25omn6KGMXG4gKlxuICovXG5leHBvcnQgY2xhc3MgVGltZXJJbnRlcnZhbCB7XG5cbiAgICBwcml2YXRlIG1faW50ZXJ2YWxfdGltZTogbnVtYmVyOy8v5q+r56eSXG4gICAgcHJpdmF0ZSBtX25vd190aW1lOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tX25vd190aW1lID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJblrprml7blmahcbiAgICAgKiBAcGFyYW0gICAgaW50ZXJ2YWwgICAg6Kem5Y+R6Ze06ZqUXG4gICAgICogQHBhcmFtICAgIGZpcnN0X2ZyYW1lICAgIOaYr+WQpuesrOS4gOW4p+W8gOWni+aJp+ihjFxuICAgICAqL1xuICAgIHB1YmxpYyBpbml0KGludGVydmFsOiBudW1iZXIsIGZpcnN0X2ZyYW1lOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMubV9pbnRlcnZhbF90aW1lID0gaW50ZXJ2YWw7XG4gICAgICAgIGlmIChmaXJzdF9mcmFtZSkgdGhpcy5tX25vd190aW1lID0gdGhpcy5tX2ludGVydmFsX3RpbWU7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fbm93X3RpbWUgPSAwO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoZWxhcHNlX3RpbWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLm1fbm93X3RpbWUgKz0gZWxhcHNlX3RpbWU7XG4gICAgICAgIGlmICh0aGlzLm1fbm93X3RpbWUgPj0gdGhpcy5tX2ludGVydmFsX3RpbWUpIHtcbiAgICAgICAgICAgIHRoaXMubV9ub3dfdGltZSAtPSB0aGlzLm1faW50ZXJ2YWxfdGltZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgSGFuZGxlciA9IExheWEuSGFuZGxlcjtcbmltcG9ydCB7VXRpbEFycmF5fSBmcm9tIFwiLi4vLi4vdXRpbC9hcnJheVwiO1xuaW1wb3J0IHtTY2VuZU1hbmFnZXJ9IGZyb20gXCIuLi9zY2VuZS9zY2VuZS1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBFdmVudE5vZGUgfSBmcm9tICcuLi9ldmVudC9ldmVudC1ub2RlJztcbmltcG9ydCB7IElNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ktbWFuYWdlcic7XG5pbXBvcnQgeyBUaW1lRGVsYXkgfSBmcm9tICcuLi8uLi9jb3JlL3RpbWUtZGVsYXknO1xuaW1wb3J0IHsgT2JqZWN0UG9vbCB9IGZyb20gJy4uLy4uL2NvcmUvb2JqZWN0LXBvb2wnO1xuaW1wb3J0IHsgVGltZXJFbnRpdHkgfSBmcm9tICcuL3RpbWVyLWVudGl0eSc7XG5cbi8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDgtMDkgMjM6MjJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uICDlrprml7bnrqHnkIblmahcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBUaW1lck1hbmFnZXIgZXh0ZW5kcyBFdmVudE5vZGUgaW1wbGVtZW50cyBJTWFuYWdlciB7XG4gIFxuICAgIHByaXZhdGUgbV9pZENvdW50ZXI6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBtX1JlbW92YWxQZW5kaW5nOiBBcnJheTxudW1iZXI+ID0gW107XG4gICAgcHJpdmF0ZSBtX1RpbWVyczogQXJyYXk8VGltZXJFbnRpdHk+ID0gW107XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogVGltZXJNYW5hZ2VyID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogVGltZXJNYW5hZ2VyIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IFRpbWVyTWFuYWdlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0dXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubV9pZENvdW50ZXIgPSAwO1xuICAgICAgICBUaW1lRGVsYXkuJC5hZGQoMC4xLCAwLCB0aGlzLnJlbW92ZSwgdGhpcyk7XG4gICAgICAgIFRpbWVEZWxheS4kLmFkZFVwZGF0ZSh0aGlzLnRpY2ssIHRoaXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgVXRpbEFycmF5LmNsZWFyKHRoaXMubV9SZW1vdmFsUGVuZGluZyk7XG4gICAgICAgIFV0aWxBcnJheS5jbGVhcih0aGlzLm1fVGltZXJzKTtcbiAgICAgICAgVGltZURlbGF5LiQucmVtb3ZlKHRoaXMucmVtb3ZlLCB0aGlzKTtcbiAgICAgICAgVGltZURlbGF5LiQucmVtb3ZlKHRoaXMudGljaywgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0aWNrKCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9UaW1lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubV9UaW1lcnNbaV0udXBkYXRlKHRoaXMucmVtb3ZlVGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5a6a5pe26YeN5aSN5omn6KGMXG4gICAgICogQHBhcmFtICAgIHJhdGUgICAg6Ze06ZqU5pe26Ze0KOWNleS9jeavq+enkinjgIJcbiAgICAgKiBAcGFyYW0gICAgdGlja3MgICAg5omn6KGM5qyh5pWwXG4gICAgICogQHBhcmFtICAgIGNhbGxlciAgICDmiafooYzln58odGhpcynjgIJcbiAgICAgKiBAcGFyYW0gICAgbWV0aG9kICAgIOWumuaXtuWZqOWbnuiwg+WHveaVsO+8muazqOaEj++8jOi/lOWbnuWHveaVsOesrOS4gOS4quWPguaVsOS4uuWumuaXtuWZqGlk77yM5ZCO6Z2i5Y+C5pWw5L6d5qyh5pe25Lyg5YWl55qE5Y+C5pWw44CC5L6LT25UaW1lKHRpbWVyX2lkOm51bWJlciwgYXJnczE6YW55LCBhcmdzMjphbnksLi4uKTp2b2lkXG4gICAgICogQHBhcmFtICAgIGFyZ3MgICAg5Zue6LCD5Y+C5pWw44CCXG4gICAgICovXG4gICAgcHVibGljIGFkZExvb3AocmF0ZTogbnVtYmVyLCB0aWNrczogbnVtYmVyLCBjYWxsZXI6IGFueSwgbWV0aG9kOiBGdW5jdGlvbiwgYXJnczogQXJyYXk8YW55PiA9IG51bGwpOiBudW1iZXIge1xuICAgICAgICBpZiAodGlja3MgPD0gMCkgdGlja3MgPSAwO1xuICAgICAgICBsZXQgbmV3VGltZXI6IFRpbWVyRW50aXR5ID0gT2JqZWN0UG9vbC5nZXQoVGltZXJFbnRpdHkpO1xuICAgICAgICArK3RoaXMubV9pZENvdW50ZXI7XG4gICAgICAgIGlmIChhcmdzICE9IG51bGwpIFV0aWxBcnJheS5pbnNlcnQoYXJncywgdGhpcy5tX2lkQ291bnRlciwgMCk7XG4gICAgICAgIG5ld1RpbWVyLnNldCh0aGlzLm1faWRDb3VudGVyLCByYXRlLCB0aWNrcywgSGFuZGxlci5jcmVhdGUoY2FsbGVyLCBtZXRob2QsIGFyZ3MsIGZhbHNlKSk7XG4gICAgICAgIHRoaXMubV9UaW1lcnMucHVzaChuZXdUaW1lcik7XG4gICAgICAgIFNjZW5lTWFuYWdlci4kLmN1cnJlbnRTY2VuZSgpLnNjZW5lVGltZXJzLnB1c2gobmV3VGltZXIuaWQpO1xuICAgICAgICByZXR1cm4gbmV3VGltZXIuaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y2V5qyh5omn6KGMXG4gICAgICovXG4gICAgcHVibGljIGFkZE9uY2UocmF0ZTogbnVtYmVyLCBjYWxsZXI6IGFueSwgbWV0aG9kOiBGdW5jdGlvbiwgYXJnczogQXJyYXk8YW55PiA9IG51bGwpOiBudW1iZXIge1xuICAgICAgICBsZXQgbmV3VGltZXI6IFRpbWVyRW50aXR5ID0gT2JqZWN0UG9vbC5nZXQoVGltZXJFbnRpdHkpO1xuICAgICAgICArK3RoaXMubV9pZENvdW50ZXI7XG4gICAgICAgIGlmIChhcmdzICE9IG51bGwpIFV0aWxBcnJheS5pbnNlcnQoYXJncywgdGhpcy5tX2lkQ291bnRlciwgMCk7XG4gICAgICAgIG5ld1RpbWVyLnNldCh0aGlzLm1faWRDb3VudGVyLCByYXRlLCAxLCBIYW5kbGVyLmNyZWF0ZShjYWxsZXIsIG1ldGhvZCwgYXJncywgZmFsc2UpKTtcbiAgICAgICAgdGhpcy5tX1RpbWVycy5wdXNoKG5ld1RpbWVyKTtcbiAgICAgICAgU2NlbmVNYW5hZ2VyLiQuY3VycmVudFNjZW5lKCkuc2NlbmVUaW1lcnMucHVzaChuZXdUaW1lci5pZCk7XG4gICAgICAgIHJldHVybiBuZXdUaW1lci5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnp7vpmaTlrprml7blmahcbiAgICAgKiBAcGFyYW0gICAgdGltZXJJZCAgICDlrprml7blmahpZFxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVUaW1lcih0aW1lcklkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX1JlbW92YWxQZW5kaW5nLnB1c2godGltZXJJZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog56e76Zmk6L+H5pyf5a6a5pe25ZmoXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmUoKTogdm9pZCB7XG4gICAgICAgIGxldCB0aW1lcjogVGltZXJFbnRpdHk7XG4gICAgICAgIGlmICh0aGlzLm1fUmVtb3ZhbFBlbmRpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2YgdGhpcy5tX1JlbW92YWxQZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1fVGltZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVyID0gdGhpcy5tX1RpbWVyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVyLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lci5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0UG9vbC5yZWNvdmVyKHRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubV9UaW1lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFV0aWxBcnJheS5jbGVhcih0aGlzLm1fUmVtb3ZhbFBlbmRpbmcpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCJcblxuaW1wb3J0IFNwcml0ZSA9IExheWEuU3ByaXRlO1xuaW1wb3J0IFR3ZWVuID0gTGF5YS5Ud2VlbjtcbmltcG9ydCBFYXNlID0gTGF5YS5FYXNlO1xuaW1wb3J0IEhhbmRsZXIgPSBMYXlhLkhhbmRsZXI7XG5pbXBvcnQgeyBVdGlsRGlzcGxheSB9IGZyb20gXCIuLi8uLi91dGlsL2Rpc3BsYXlcIjtcblxuZXhwb3J0IG1vZHVsZSBDdXN0b21EaWFsb2d7XG5cbiAgICAvKipcbiAgICAgKiBAYXV0aG9yIFN1blxuICAgICAqIEB0aW1lIDIwMTktMDgtMDkgMTc6NDFcbiAgICAgKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAgICAgKiBAZGVzY3JpcHRpb24gIFVJ57uE5Lu255qE5Z+657G777yM57un5om/6IeqTGF5YS5WaWV3XG4gICAgICpcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgRGlhbG9nQmFzZSBleHRlbmRzIExheWEuRGlhbG9nIHtcblxuICAgICAgICBwcml2YXRlIG1hc2tMYXllcjogU3ByaXRlID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBjb250ZW50UG5sOiBMYXlhLk5vZGUgPSBudWxsO1xuICAgICAgICBwdWJsaWMgZGF0YTogYW55ID0gbnVsbDtcbiAgICAgICAgcHVibGljIGlzTWFzazogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAgICAgY3JlYXRlVmlldyh2aWV3OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZVZpZXcodmlldyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYnVuZGxlQnV0dG9ucygpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRQbmwgPSB0aGlzLmdldENoaWxkQXQoMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog5re75Yqg6YGu572p5bGCXG4gICAgICAgICAqL1xuICAgICAgICBjcmF0ZU1hc2tMYXllcigpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMubWFza0xheWVyID0gVXRpbERpc3BsYXkuY3JlYXRlTWFza0xheWVyKCk7XG4gICAgICAgICAgICB0aGlzLm1hc2tMYXllci5tb3VzZUVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBsZXQgdCA9IHRoaXMubWFza0xheWVyO1xuICAgICAgICAgICAgdC54ID0gTWF0aC5yb3VuZCgoKExheWEuc3RhZ2Uud2lkdGggLSB0LndpZHRoKSA+PiAxKSArIHQucGl2b3RYKTtcbiAgICAgICAgICAgIHQueSA9IE1hdGgucm91bmQoKChMYXlhLnN0YWdlLmhlaWdodCAtIHQuaGVpZ2h0KSA+PiAxKSArIHQucGl2b3RZKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLm1hc2tMYXllcik7XG4gICAgICAgICAgICB0aGlzLm1hc2tMYXllci56T3JkZXIgPSAtMTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWcqOWcuuaZr+S4reWxheS4ree7hOS7tlxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGNlbnRlcih2aWV3PzogTGF5YS5TcHJpdGUpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh2aWV3ID09IG51bGwpIHZpZXcgPSB0aGlzO1xuICAgICAgICAgICAgdmlldy54ID0gTWF0aC5yb3VuZCgoKExheWEuc3RhZ2Uud2lkdGggLSB2aWV3LndpZHRoKSA+PiAxKSArIHZpZXcucGl2b3RYKTtcbiAgICAgICAgICAgIHZpZXcueSA9IE1hdGgucm91bmQoKChMYXlhLnN0YWdlLmhlaWdodCAtIHZpZXcuaGVpZ2h0KSA+PiAxKSArIHZpZXcucGl2b3RZKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOa3u+WKoOm7mOiupOaMiemSruS6i+S7tlxuICAgICAgICAgKi9cbiAgICAgICAgYnVuZGxlQnV0dG9ucygpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzW1wiYnRuQ2xvc2VcIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXNbXCJidG5DbG9zZVwiXS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLmNsb3NlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlhbPpl63nqbrnmb3lpITngrnlh7vlhbPpl63kuovku7ZcbiAgICAgICAgICovXG4gICAgICAgIGNsb3NlT3V0c2llQ2xpY2soKXtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hc2tMYXllciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXNrTGF5ZXIub2ZmKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuY2xvc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWvueivneahhuW8ueWHuuaWueazlVxuICAgICAgICAgKiBAcGFyYW0gdGltZSDlvLnlh7rml7bpl7RcbiAgICAgICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gICAgICAgICAqIEBwYXJhbSBpc01hc2sg5piv5ZCm55Sf5oiQ6YGu572pXG4gICAgICAgICAqIEBwYXJhbSBjbG9zZU91dHNpZGUg5piv5ZCm54K55Ye756m655m95aSE5YWz6ZetXG4gICAgICAgICAqL1xuICAgICAgICBwb3B1cERpYWxvZyh0aW1lOiBudW1iZXIgPSAzMDAsIGRhdGE6IGFueSA9IG51bGwsIGlzTWFzazogYm9vbGVhbiA9IHRydWUsIGNsb3NlT3V0c2lkZTogYm9vbGVhbiA9IHRydWUsY2I/KTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwKGZhbHNlLGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcbiAgICAgICAgICAgIHRoaXMuaXNNYXNrID0gaXNNYXNrO1xuICAgICAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy56T3JkZXIgPSAyMDAwO1xuICAgICAgICAgICAgdGhpcy5wb3B1cEluaXQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNYXNrICYmIHRoaXMubWFza0xheWVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyYXRlTWFza0xheWVyKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNsb3NlT3V0c2lkZSkgdGhpcy5tYXNrTGF5ZXIub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5jbG9zZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25TaG93QW5pbWF0aW9uKHRpbWUsKCk9PntcbiAgICAgICAgICAgICAgICBpZihjYikgY2IuY2FsbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiogRGVzOuW8ueWHuuiwg+eUqCAqL1xuICAgICAgICBwb3B1cEluaXQoKSB7XG4gICAgICAgIH1cblxuXG4gICAgICAgIG9uU2hvd0FuaW1hdGlvbih0aW1lOiBudW1iZXIgPSAzMDAsY2IpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmNvbnRlbnRQbmw7XG4gICAgICAgICAgICB0aGlzLmNlbnRlcigpO1xuXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0YXJnZXQuc2NhbGUoMCwgMCk7XG4gICAgICAgICAgICBUd2Vlbi50byh0YXJnZXQsIHtcbiAgICAgICAgICAgICAgICBzY2FsZVg6IDEsXG4gICAgICAgICAgICAgICAgc2NhbGVZOiAxXG4gICAgICAgICAgICB9LCB0aW1lLCBFYXNlLmJhY2tPdXQsIEhhbmRsZXIuY3JlYXRlKHRoaXMsIGNiLCBbdGhpc10pLCAwLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xuICAgICAgICB9XG5cblxuICAgIH1cbn0iLCJpbXBvcnQgeyBSZXNHcm91cCB9IGZyb20gJy4uL3Jlcy9yZXMtZ3JvdXAnO1xuaW1wb3J0IHsgUmVzTWFuYWdlciB9IGZyb20gJy4uL3Jlcy9yZXMtbWFuYWdlcic7XG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuLi8uLi9jb3JlL2xvZyc7XG5pbXBvcnQgeyBUaW1lck1hbmFnZXIgfSBmcm9tICcuLi90aW1lci90aW1lci1tYW5hZ2VyJztcblxuZXhwb3J0IG1vZHVsZSBDdXN0b21TY2VuZXtcblxuICAgIC8qKlxuICAgICAqIEBhdXRob3IgU3VuXG4gICAgICogQHRpbWUgMjAxOS0wOC0wOSAxOToxMlxuICAgICAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICAgICAqIEBkZXNjcmlwdGlvbiAgU2NlbmXnmoTln7rnsbtcbiAgICAgKlxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBMeVNjZW5lIGV4dGVuZHMgTGF5YS5TY2VuZSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWGheW1jOaooeW8j+epuueahOWcuuaZr+i1hOa6kO+8jOW/hemhu+WunueOsOi/meS4qmNyZWF0ZVZpZXfvvIzlkKbliJnmnInpl67pophcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlNjZW5lXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6MTMzNCxcImhlaWdodFwiOjc1MH0sXCJsb2FkTGlzdFwiOltdLFwibG9hZExpc3QzRFwiOltdfTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlnLrmma/nrKzkuIDkuKrliqDovb3nmoTnqpflj6NcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBmaXJzdFdpbmQ6IGFueSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlnLrmma/kvp3otZbnmoTotYTmupDnu4RcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBuZWVkTG9hZFJlczogUmVzR3JvdXA7XG5cbiAgICAgICAgcHJpdmF0ZSBtX3BhcmFtOiBhbnk7XG4gICAgICAgIHByaXZhdGUgbV9sb2FkZWQgPSBmYWxzZTtcblxuICAgICAgICBwdWJsaWMgc2NlbmVUaW1lcnM6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLm5lZWRMb2FkUmVzID0gbmV3IFJlc0dyb3VwKCk7XG4gICAgICAgICAgICB0aGlzLm5lZWRMb2FkUmVzLm9uQ29tcGxldGlvbih0aGlzLmxvYWRlZCwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhMeVNjZW5lLnVpVmlldyk7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBlbnRlcihwYXJhbTogYW55KSB7XG5cbiAgICAgICAgICAgIFJlc01hbmFnZXIuJC5wdXNoKCk7XG4gICAgICAgICAgICAvLyBVSU1hbmFnZXIuJC5oaWRlQWxsV2luKCk7XG5cbiAgICAgICAgICAgIHRoaXMubV9sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubV9wYXJhbSA9IHBhcmFtO1xuICAgICAgICAgICAgdGhpcy5vbkluaXQocGFyYW0pO1xuXG4gICAgICAgICAgICBSZXNNYW5hZ2VyLiQubG9hZEdyb3VwKHRoaXMubmVlZExvYWRSZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGxlYXZlKCkge1xuICAgICAgICAgICAgdGhpcy5vbkxlYXZlKCk7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5vbkNsZWFuKCk7XG4gICAgICAgICAgICB0aGlzLnNjZW5lVGltZXJzLmZvckVhY2goKHRpbWVyOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBUaW1lck1hbmFnZXIuJC5yZW1vdmVUaW1lcih0aW1lcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICog5Yqg6L295a6M5oiQXG4gICAgICAgICAqIEBwYXJhbSBlcnJvciDliqDovb3plJnor69cbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBsb2FkZWQoZXJyb3IpIHtcblxuICAgICAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkZWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNoRW50ZXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICBwcml2YXRlIGNoZWNoRW50ZXIoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tX2xvYWRlZCkge1xuICAgICAgICAgICAgICAgIC8vIFVJTWFuYWdlci4kLmhpZGVBbGxXaW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgUmVzTWFuYWdlci4kLnBvcCgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpcnN0V2luZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVJTWFuYWdlci4kLnNob3dXaW4odGhpcy5maXJzdFdpbmQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2xzID0gdGhpcy5maXJzdFdpbmQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3aW4gPSBuZXcgY2xzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQod2luKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudGVyKHRoaXMubV9wYXJhbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDliqDovb3lrozmiJBcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBvbkxvYWRlZCgpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWcuuaZr+WIneWni+WMllxuICAgICAgICAgKiBAcGFyYW0gcGFyYW0g5Y+C5pWwXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgb25Jbml0KHBhcmFtOiBhbnkpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOi/m+WFpeWcuuaZr1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIG9uRW50ZXIocGFyYW06IGFueSk6IHZvaWQge1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDpgJDluKflvqrnjq9cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDnprvlvIDlnLrmma9cbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBvbkxlYXZlKCk6IHZvaWQge1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog5b2T5Zy65pmv6KKr6ZSA5q+B55qE5pe25YCZXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgb25DbGVhbigpOiB2b2lkIHtcblxuICAgICAgICB9XG5cbiAgICB9XG59IiwiaW1wb3J0IHsgRGF0YU1hbmFnZXIgfSBmcm9tICcuLi9kYXRhL2RhdGEtbWFuYWdlcic7XG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gJy4uL2RhdGEvZGF0YS1iYXNlJztcblxuZXhwb3J0IG1vZHVsZSBDdXN0b21WaWV3e1xuXG4gICAgLyoqXG4gICAgICogQGF1dGhvciBTdW5cbiAgICAgKiBAdGltZSAyMDE5LTA4LTA5IDE1OjUxXG4gICAgICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gICAgICogQGRlc2NyaXB0aW9uICBVSee7hOS7tueahOWfuuexu++8jOe7p+aJv+iHqkxheWEuVmlld1xuICAgICAqXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIFZpZXdCYXNlIGV4dGVuZHMgTGF5YS5WaWV3IHtcblxuICAgICAgICAvKuaJgOacieaVsOaNruinguWvn+iAhSovXG4gICAgICAgIHByb3RlY3RlZCBkYXRhV2F0Y2hzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICAgICAgcHVibGljIGRhdGE6IGFueSA9IG51bGw7XG5cbiAgICAgICAgLy9vdmVycmlkZVxuICAgICAgICBjcmVhdGVWaWV3KHZpZXc6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuY3JlYXRlVmlldyh2aWV3KTtcbiAgICAgICAgICAgIHRoaXMuZnVsbFNjcmVlbigpO1xuICAgICAgICAgICAgdGhpcy5wYXJzZUVsZW1lbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcblxuICAgICAgICAgICAgdGhpcy5kYXRhV2F0Y2hzLmZvckVhY2goKGNtZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgRGF0YU1hbmFnZXIuJC5yZW1vdmVFdmVudExpc3RlbmVyKGNtZCwgdGhpcy5vbkRhdGEsIHRoaXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog6IOM5pmv5Zu+6YCC5bqUXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgcGFyc2VFbGVtZW50KCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXNbXCJpbWdCZ1wiXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltZ0JnID0gdGhpc1tcImltZ0JnXCJdIGFzIExheWEuU3ByaXRlXG4gICAgICAgICAgICAgICAgdGhpcy5mdWxsU2NyZWVuKGltZ0JnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlnKjlnLrmma/kuK3lsYXkuK3nu4Tku7ZcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBjZW50ZXIodmlldz86IExheWEuU3ByaXRlKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodmlldyA9PSBudWxsKSB2aWV3ID0gdGhpcztcbiAgICAgICAgICAgIHZpZXcueCA9IE1hdGgucm91bmQoKChMYXlhLnN0YWdlLndpZHRoIC0gdmlldy53aWR0aCkgPj4gMSkgKyB2aWV3LnBpdm90WCk7XG4gICAgICAgICAgICB2aWV3LnkgPSBNYXRoLnJvdW5kKCgoTGF5YS5zdGFnZS5oZWlnaHQgLSB2aWV3LmhlaWdodCkgPj4gMSkgKyB2aWV3LnBpdm90WSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog6K6+572u5aSn5bCP5Li65YWo5bGPXG4gICAgICAgICAqIEBwYXJhbSB2aWV3IExheWEuU3ByaXRlXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgZnVsbFNjcmVlbih2aWV3PzogTGF5YS5TcHJpdGUpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh2aWV3ID09IG51bGwpIHZpZXcgPSB0aGlzO1xuICAgICAgICAgICAgdmlldy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XG4gICAgICAgICAgICB2aWV3LmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOe7keWumuaVsOaNruebkeWQrFxuICAgICAgICAgKiBAcGFyYW0gY21kIOebkeWQrOexu+Wei1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGFkZERhdGFXYXRjaChjbWQ6IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5kYXRhV2F0Y2hzLnB1c2goY21kKTtcbiAgICAgICAgICAgIERhdGFNYW5hZ2VyLiQuYWRkRXZlbnRMaXN0ZW5lcihjbWQsIHRoaXMub25EYXRhLCB0aGlzKTtcbiAgICAgICAgICAgIERhdGFNYW5hZ2VyLiQuZ2V0KGNtZCkubm90aWZ5KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog5b2T5pWw5o2u5Yi35paw5piv6YeN57uYXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgb25EYXRhKGRhdGE6IERhdGFCYXNlKSB7XG4gICAgICAgICAgICAvLyBpZiAoZGF0YS5jbWQgPT0gRGF0YURlZmluZS5Db2luSW5mbyl7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOa3u+WKoOWIsOeUu+W4g1xuICAgICAgICAgKiBAcGFyYW0gZGF0YSDmlbDmja4gXG4gICAgICAgICAqL1xuICAgICAgICBhZGQoZGF0YTogYW55ID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmmL7npLp2aWV3XG4gICAgICAgICAqL1xuICAgICAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDpmpDol492aWV3XG4gICAgICAgICAqL1xuICAgICAgICBoaWRlKCk6dm9pZHtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFdmVudE5vZGUgfSBmcm9tICcuLi9tYW5hZ2VyL2V2ZW50L2V2ZW50LW5vZGUnO1xuaW1wb3J0IHsgQ29uZmlnTGF5b3V0LCBDb25maWdVSSwgQ29uZmlnRGVidWcsIENvbmZpZ0dhbWUsIENvbmZpZ1ZlcnNpb24gfSBmcm9tICcuLi9zZXR0aW5nL2NvbmZpZyc7XG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuLi9jb3JlL2xvZyc7XG5pbXBvcnQgeyBVdGlsVGltZSB9IGZyb20gJy4uL3V0aWwvdGltZSc7XG5pbXBvcnQgeyBlbnVtRGltZW5zaW9uLCBlbnVtQWxpZ2UsIGVudW1TY3JlZW5Nb2RlbCwgZW51bVNjYWxlVHlwZSB9IGZyb20gJy4uL3NldHRpbmcvZW51bSc7XG5pbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlcjtcbmltcG9ydCB7IFNjZW5lTWFuYWdlciB9IGZyb20gJy4uL21hbmFnZXIvc2NlbmUvc2NlbmUtbWFuYWdlcic7XG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSAnLi4vbWFuYWdlci9yZXMvcmVzLW1hbmFnZXInO1xuLyoqXG4gKiBAYXV0aG9yIFN1blxuICogQHRpbWUgMjAxOS0wOC0xMSAxODowOFxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gKiBAZGVzY3JpcHRpb24g5qGG5p625Yid5aeL5YyW5ZKM5ri45oiP5YWl5Y+jXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRW5naW5le1xuXG5cbiAgICBwdWJsaWMgbGF5b3V0OiBDb25maWdMYXlvdXQgPSBDb25maWdMYXlvdXQuJDtcbiAgICBwdWJsaWMgZ2FtZTogQ29uZmlnR2FtZSA9IENvbmZpZ0dhbWUuJDtcbiAgICBwdWJsaWMgdWk6IENvbmZpZ1VJID0gQ29uZmlnVUkuJDtcbiAgICBwdWJsaWMgZGVidWc6IENvbmZpZ0RlYnVnID0gQ29uZmlnRGVidWcuJDtcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEVuZ2luZSA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOiBFbmdpbmUge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZT09bnVsbCkgdGhpcy5pbnN0YW5jZSA9IG5ldyBFbmdpbmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5byV5pOO5ZCv5Yqo5YWl5Y+jXG4gICAgICovXG4gICAgcHVibGljIHJ1bigpOiB2b2lkIHtcbiAgICAgICAgTG9nLmluZm8oXCI6OjogR2FtZSBFbmdpbmUgUnVuIDo6OlwiKTtcblxuICAgICAgICAvLyBpZiAoQ29uZmlnVUkuJC5kZWZhdWx0TG9hZFZpZXcgIT0gbnVsbCAmJiBDb25maWdVSS4kLmRlZmF1bHRMb2FkUmVzICE9IG51bGwpIHtcbiAgICAgICAgLy8gICAgIC8v5ri45oiP5byA5aeLXG4gICAgICAgIC8vICAgICBVdGlsVGltZS5zdGFydCgpO1xuICAgICAgICAvLyAgICAgLy/liJ3lp4vljJbmuLjmiI/nrqHnkIblmahcbiAgICAgICAgLy8gICAgIHRoaXMubWFuYWdlclNldFVwKCk7XG4gICAgICAgIC8vICAgICAvL+WIneWni+WMlua4uOaIj+S4u+W+queOr1xuICAgICAgICAvLyAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5tYW5hZ2VyVXBkYXRlKTtcbiAgICAgICAgLy8gICAgIC8v5Yqg6L29TG9hZGluZ+mhteeahOm7mOiupOi1hOa6kFxuICAgICAgICAvLyAgICAgUmVzTWFuYWdlci4kLmxvYWRNYW51YWxBbnkoQ29uZmlnVUkuJC5kZWZhdWx0TG9hZFJlcywoKT0+e1xuICAgICAgICAvLyAgICAgICAgIGxldCBsb2FkVmlldyA9IFNjZW5lTWFuYWdlci4kLnNob3dMb2FkaW5nVmlldygpO1xuICAgICAgICAvLyAgICAgICAgIGxvYWRWaWV3Lm9uU3RhcnQoKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICBMb2cuZXJyb3IoXCJFcnJvcjpMb2FkaW5n6LWE5rqQ5Li656m65Yqg6L295aSx6LSl77yBXCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgXG4gICAgICAgIHRoaXMuZW5naW5lU2V0dXAoKCk9PntcbiAgICAgICAgICAgIC8v5ri45oiP5byA5aeLXG4gICAgICAgICAgICBVdGlsVGltZS5zdGFydCgpO1xuICAgICAgICAgICAgLy/liJ3lp4vljJbmuLjmiI/nrqHnkIblmahcbiAgICAgICAgICAgIHRoaXMubWFuYWdlclNldFVwKCk7XG4gICAgICAgICAgICAvL+WIneWni+WMlua4uOaIj+S4u+W+queOr1xuICAgICAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5tYW5hZ2VyVXBkYXRlKTtcbiAgICAgICAgICAgIC8v5Yqg6L29TG9hZGluZ+mhtVxuICAgICAgICAgICAgbGV0IGxvYWRWaWV3ID0gU2NlbmVNYW5hZ2VyLiQuc2hvd0xvYWRpbmdWaWV3KCk7XG4gICAgICAgICAgICBsb2FkVmlldy5vblN0YXJ0KCk7XG4gICAgICAgIH0pO1xuICAgICAgIFxuICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW8leaTjueahOWIneWni+WMluiuvue9rlxuICAgICAqL1xuICAgIHByaXZhdGUgZW5naW5lU2V0dXAoc3RhcnRDYWxsYmFjaylcbiAgICB7XG4gICAgICAgIC8qKuWIneWni+WMlkxheWEgKi9cbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kaW1lbnNpb24gPT0gZW51bURpbWVuc2lvbi5EaW0zKSB7XG4gICAgICAgICAgICBMYXlhM0QuaW5pdChDb25maWdMYXlvdXQuJC5kZXNpZ25XaWR0aCwgQ29uZmlnTGF5b3V0LiQuZGVzaWduSGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIExheWEuaW5pdChDb25maWdMYXlvdXQuJC5kZXNpZ25XaWR0aCwgQ29uZmlnTGF5b3V0LiQuZGVzaWduSGVpZ2h0LCBMYXlhLldlYkdMKTtcbiAgICAgICAgfVxuICAgICAgICAvKirog4zmma/popzoibIgKi9cbiAgICAgICAgTGF5YS5zdGFnZS5iZ0NvbG9yID0gXCJub25lXCI7XG4gICAgICAgIC8qKue8qeaUvuaooeW8jyAqL1xuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IGVudW1TY2FsZVR5cGUuU2NhbGVTaG93QWxsLnRvU3RyaW5nKCk7XG4gICAgICAgIC8qKuiuvue9ruWxj+W5leWkp+WwjyAqL1xuICAgICAgICBMYXlhLnN0YWdlLnNldFNjcmVlblNpemUoQnJvd3Nlci5jbGllbnRXaWR0aCwgQnJvd3Nlci5jbGllbnRIZWlnaHQpO1xuICAgICAgICAvKirorr7nva7mqKrnq5blsY8gKi9cbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gZW51bVNjcmVlbk1vZGVsLlNjcmVlbk5vbmU7XG4gICAgICAgIC8qKuawtOW5s+Wvuem9kOaWueW8jyAqL1xuICAgICAgICBMYXlhLnN0YWdlLmFsaWduSCA9IGVudW1BbGlnZS5BbGlnZUNlbnRlcjtcbiAgICAgICAgLyoq5Z6C55u05a+56b2Q5pa55byPICovXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25WID0gZW51bUFsaWdlLkFsaWdlTWlkZGxlO1xuICAgICAgICAvKirlvIDlkK/niannkIblvJXmk44gKi9cbiAgICAgICAgaWYoQ29uZmlnR2FtZS4kLnBoeXNpY3MpIExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xuXHRcdC8qKuaJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIkgKi9cbiAgICAgICAgaWYgKENvbmZpZ0RlYnVnLiQuaXNFbmFibGVEZWJ1Z1BhbmVsIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XG4gICAgICAgIC8qKueJqeeQhui+heWKqee6vyAqL1xuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc1BoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XG4gICAgICAgIC8qKuaAp+iDveWQjOe6p+mdouadvyAqL1xuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc1N0YXQpIExheWEuU3RhdC5zaG93KENvbmZpZ0RlYnVnLiQucGFuZWxYLENvbmZpZ0RlYnVnLiQucGFuZWxZKTtcbiAgICAgICAgLyoq5b6u5L+h5byA5pS+5Z+f5a2Q5Z+f6K6+572uKi9cbiAgICAgICAgaWYgKEJyb3dzZXIub25XZWlYaW4gfHwgQnJvd3Nlci5vbk1pbmlHYW1lKSB7XG4gICAgICAgICAgICBMYXlhLk1pbmlBZHB0ZXIuaW5pdCgpO1xuICAgICAgICAgICAgTGF5YS5pc1dYT3BlbkRhdGFDb250ZXh0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoq5qih5byP56qX5Y+j54K55Ye76L6557yYICovXG4gICAgICAgIFVJQ29uZmlnLmNsb3NlRGlhbG9nT25TaWRlID0gdHJ1ZTtcbiAgICAgICAgLyoq5piv5ZCm5pi+56S65rua5Yqo5p2h5oyJ6ZKuICovXG4gICAgICAgIFVJQ29uZmlnLnNob3dCdXR0b25zID0gdHJ1ZTtcbiAgICAgICAgLyoq5oyJ6ZKu55qE54K55Ye75pWI5p6cICovXG4gICAgICAgIFVJQ29uZmlnLnNpbmdsZUJ1dHRvblN0eWxlID0gXCJzY2FsZVwiOyAvL1wiY29sb3JcIixcInNjYWxlXCJcbiAgICAgICAgLyoq5by55Ye65qGG6IOM5pmv6YCP5piO5bqmICovXG4gICAgICAgIFVJQ29uZmlnLnBvcHVwQmdBbHBoYSA9IDAuNzU7XG4gICAgICAgIC8qKuWFvOWuuVNjZW5l5ZCO57yA5Zy65pmvICovXG4gICAgICAgIExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gdHJ1ZTtcbiAgICAgICAgLyoq5piv5ZCm5byA5ZCv54mI5pys566h55CGICovXG4gICAgICAgIGlmKENvbmZpZ1ZlcnNpb24uJC5pc09wZW5WZXJzaW9uKXtcbiAgICAgICAgICAgIExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShDb25maWdWZXJzaW9uLiQudmVyc2lvbkZsb2RlcixcbiAgICAgICAgICAgIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgc3RhcnRDYWxsYmFjayksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHN0YXJ0Q2FsbGJhY2suY2FsbCgpO1xuICAgICAgICB9XG4gICAgICAgXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnrqHnkIblmajnmoTliJ3lp4vljJZcbiAgICAgKi9cbiAgICBwcml2YXRlICBtYW5hZ2VyU2V0VXAoKTogdm9pZCB7XG4gICAgICAgIC8vIERhdGFNYW5hZ2VyLiQuc2V0dXAoKTtcbiAgICAgICAgLy8gRXZlbnRNYW5hZ2VyLiQuc2V0dXAoKTtcbiAgICAgICAgLy8gSW5wdXRNYW5hZ2VyLiQuc2V0dXAoKTtcbiAgICAgICAgLy8gUmVzTWFuYWdlci4kLnNldHVwKCk7XG4gICAgICAgIC8vIEpzb25NYW5hZ2VyLiQuc2V0dXAoKTtcbiAgICAgICAgLy8gTG9jYWxlTWFuYWdlci4kLnNldHVwKCk7XG4gICAgICAgIC8vIE5ldE1hbmFnZXIuJC5zZXR1cCgpO1xuICAgICAgICAvLyBPYmplY3RNYW5hZ2VyLiQuc2V0dXAoKTtcbiAgICAgICAgLy8gU2NlbmVNYW5hZ2VyLiQuc2V0dXAoKTtcbiAgICAgICAgLy8gU291bmRNYW5hZ2VyLiQuc2V0dXAoKTtcbiAgICAgICAgLy8gVGltZXJNYW5hZ2VyLiQuc2V0dXAoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnrqHnkIblmajnmoRVcGRhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIG1hbmFnZXJVcGRhdGUoKTogdm9pZCB7XG4gICAgICAgXG4gICAgfVxuXG59IiwiaW1wb3J0IEJyb3dzZXIgPSBsYXlhLnV0aWxzLkJyb3dzZXI7XG5pbXBvcnQgeyBlbnVtRGltZW5zaW9uLCBlbnVtU2NhbGVUeXBlIH0gZnJvbSAnLi9lbnVtJztcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gJy4uL2NvcmUvc2luZ2xldG9uJztcbmltcG9ydCB7IExvYWRpbmdWaWV3IH0gZnJvbSAnLi4vLi4vdGVzdC9sb2FkaW5nJztcbmltcG9ydCB7IE1haW5TY2VuZSB9IGZyb20gJy4uLy4uL2NsaWVudC9zY2VuZS9tYWluLXNjZW5lJztcbiAvKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTA5IDE0OjAxXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiDmuLjmiI/phY3nva7kv6Hmga9cbiAqL1xuXG5cbi8qKlxuICog55WM6Z2i6YWN572uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWdVSSBleHRlbmRzIFNpbmdsZXRvbiB7XG5cbiAgICAvKirpu5jorqTlrZfkvZMgKi9cbiAgICBwdWJsaWMgZGVmYXVsdEZvbnROYW1lOiBzdHJpbmcgPSAn6buR5L2TJztcbiAgICAvKirpu5jorqTlrZfkvZPlpKflsI8gKi9cbiAgICBwdWJsaWMgZGVmYXVsdEZvbnRTaXplOiBudW1iZXIgPSAxNjtcbiAgICAvKirpu5jorqTliqDovb3lnLrmma8gKi9cbiAgICBwdWJsaWMgZGVmYXVsdE1haW5TY2VuZTogYW55ID0gTWFpblNjZW5lO1xuICAgIC8qKum7mOiupOWKoOi9veeahExvYWRpbmfpobXpnaIgKi9cbiAgICBwdWJsaWMgZGVmYXVsdExvYWRWaWV3OiBhbnkgPSBMb2FkaW5nVmlldztcbiAgICAvKirpu5jorqRMb2FkaW5n6aG16Z2i55qE6LWE5rqQ5L+h5oGvICovXG4gICAgcHVibGljIGRlZmF1bHRMb2FkUmVzOiBBcnJheTx7IHVybDogc3RyaW5nLCB0eXBlOiBzdHJpbmcgfT4gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZpZ1VJID0gbnVsbDtcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6Q29uZmlnVUkge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ29uZmlnVUkoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG59XG5cbi8qKlxuICog5aOw6Z+z6YWN572uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWdTb3VuZCBleHRlbmRzIFNpbmdsZXRvbiB7XG5cbiAgICAvKirog4zmma/pn7PlvIDlhbMgKi9cbiAgICBwdWJsaWMgaXNDbG9zZUJHU291bmQgPSBmYWxzZTtcbiAgICAvKirmlYjmnpzpn7PlvIDlhbMgKi9cbiAgICBwdWJsaWMgaXNDbG9zZUVmZmVjdFNvdW5kID0gZmFsc2U7XG4gICAgLyoq5omA5pyJ6Z+z5pWI5byA5YWzICovXG4gICAgcHVibGljIGlzQ2xvc2VWb2ljZVNvdW5kID0gZmFsc2U7XG4gICAgLyoq6IOM5pmv6Z+z6Z+z6YePICovXG4gICAgcHVibGljIHZvbHVtZUJHU291bmQgPSAxO1xuICAgIC8qKuaViOaenOmfs+mfs+mHjyAqL1xuICAgIHB1YmxpYyB2b2x1bWVFZmZlY3RTb3VuZCA9IDE7XG4gICAgLyoq5oC76Z+z6YePICovXG4gICAgcHVibGljIHZvbHVtZVZvaWNlU291bmQgPSAxO1xuICAgIC8qKum7mOiupOaMiemSrumfs+aViCAqL1xuICAgIHB1YmxpYyBkZWZhdWx0QnV0dG9uU291bmQgPSBudWxsO1xuICAgIC8qKum7mOiupExvYWRpbmfpobXpnaLnmoTotYTmupDkv6Hmga8gKi9cbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnU291bmQgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ1NvdW5kIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ1NvdW5kKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cbn1cblxuLyoqXG4gKiDmuLjmiI/phY3nva5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZ0dhbWUgZXh0ZW5kcyBTaW5nbGV0b24ge1xuIFxuICAgIC8qKum7mOiupOaooeW8j+S/oeaBryAyRC8zRCAqL1xuICAgIHB1YmxpYyBkaW1lbnNpb246IGVudW1EaW1lbnNpb24gPSBlbnVtRGltZW5zaW9uLkRpbTI7XG4gICAgLyoq54mp55CG5byA5YWzICovXG4gICAgcHVibGljIHBoeXNpY3M6Ym9vbGVhbiA9IGZhbHNlO1xuICBcbiAgICBcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnR2FtZSA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ0dhbWUge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ29uZmlnR2FtZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG59XG5cbi8qKlxuICog54mI5pys6YWN572uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWdWZXJzaW9uIGV4dGVuZHMgU2luZ2xldG9uIHtcbiBcbiAgICAvKirniYjmnKzmjqfliLblvIDlhbMgKi9cbiAgICBwdWJsaWMgaXNPcGVuVmVyc2lvbjpib29sZWFuID0gZmFsc2U7XG4gICAgLyoq54mI5pys5Y+3ICovXG4gICAgcHVibGljIHZlcnNpb25OdW06bnVtYmVyID0gMDtcbiAgICAvKirniYjmnKzmjqfliLbmlofku7blkI0gKi9cbiAgICBwdWJsaWMgdmVyc2lvbkZsb2RlcjpzdHJpbmcgPSBcIlZlcnNpb25cIit0aGlzLnZlcnNpb25OdW07XG4gICAgXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZpZ1ZlcnNpb24gPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpDb25maWdWZXJzaW9uIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ1ZlcnNpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxufVxuXG5cbi8qKlxuICog5biD5bGA6YWN572uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWdMYXlvdXQgZXh0ZW5kcyBTaW5nbGV0b24ge1xuXG4gICAgLyoq6K6+6K6h5YiG6L6o546HWCAqL1xuICAgIHB1YmxpYyBkZXNpZ25XaWR0aDogbnVtYmVyID0gNzUwO1xuICAgIC8qKuiuvuiuoeWIhui+qOeOh1kgKi9cbiAgICBwdWJsaWMgZGVzaWduSGVpZ2h0OiBudW1iZXIgPSAxMzM0O1xuICAgIC8qKue8qeaUvuaooeW8jyAqL1xuICAgIHB1YmxpYyBzY2FsZU1vZGU6IGVudW1TY2FsZVR5cGUgPSBlbnVtU2NhbGVUeXBlLlNjYWxlRml4ZWRBdXRvO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZpZ0xheW91dCA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ0xheW91dCB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdMYXlvdXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBEZWJ1Z+mFjee9rlxuICovXG5leHBvcnQgY2xhc3MgQ29uZmlnRGVidWcgZXh0ZW5kcyBTaW5nbGV0b24ge1xuXG4gICAgLyoq6LCD6K+V5L+h5oGv5byA5YWzICovXG4gICAgcHVibGljIGlzRGVidWc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKueJqeeQhui+heWKqee6v+W8gOWFsyAqL1xuICAgIHB1YmxpYyBpc1BoeXNpY3NEZWJ1ZzogYm9vbGVhbiA9IGZhbHNlOyBcbiAgICAvKirosIPor5XpnaLmnb8gKi9cbiAgICBwdWJsaWMgaXNFbmFibGVEZWJ1Z1BhbmVsOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKirmgKfog73pnaLmnb/lvIDlhbMgKi9cbiAgICBwdWJsaWMgaXNTdGF0OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKirmgKfog73nu5/orqHpnaLmnb9YICovXG4gICAgcHVibGljIHBhbmVsWDpudW1iZXIgPSAwO1xuICAgIC8qKuaAp+iDvee7n+iuoemdouadv1kgKi9cbiAgICBwdWJsaWMgcGFuZWxZOm51bWJlciA9IDEwMDtcblxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWdEZWJ1ZyA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ0RlYnVnIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ0RlYnVnKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cbn1cblxuLyoqXG4gKiAzROmFjee9rlxuICovXG5leHBvcnQgY2xhc3MgQ29uZmlnM0QgZXh0ZW5kcyBTaW5nbGV0b257XG5cbiAgICAvKirlnLrmma/otYTmupDot6/lvoQgKi9cbiAgICBwdWJsaWMgc2NlbmVQYXRoOnN0cmluZyA9IFwiXCI7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnM0QgPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpDb25maWczRCB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWczRCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG59XG5cbi8vIC8qKlxuLy8gICogTmV0d29ya+mFjee9rlxuLy8gICovXG4vLyBleHBvcnQgY2xhc3MgQ29uZmlnTmV0IGV4dGVuZHMgU2luZ2xldG9uIHtcblxuLy8gICAgIHB1YmxpYyBodHRwVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly8xMjcuMC4wLjE6MzQ1NjhcIjtcbi8vICAgICBwdWJsaWMgd3NVcmw6IHN0cmluZyA9IFwid3NzOi8vd3guZG9ub3BvLmNvbS93cy93c1wiO1xuLy8gICAgIHB1YmxpYyByZXNVcmw6IHN0cmluZyA9IFwid3M6Ly8xMjcuMC4wLjE6MTY2NjlcIjtcbi8vICAgICBwdWJsaWMgdGltZU91dDogbnVtYmVyID0gMTA7XG4vLyAgICAgcHVibGljIGhlYXJ0QmVhdDogbnVtYmVyID0gMTA7XG4vLyAgICAgcHVibGljIHNlcnZlckhlYXJ0QmVhdDogbnVtYmVyID0gMztcblxuLy8gICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWdOZXQgPSBudWxsO1xuXG4vLyAgICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ05ldCB7XG4vLyAgICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdOZXQoKTtcbi8vICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4vLyAgICAgfVxuXG4vLyB9XG5cbi8vIC8qKlxuLy8gICog5b6u5L+h6YWN572uXG4vLyAgKi9cbi8vIGV4cG9ydCBjbGFzcyBDb25mV2VjaGF0IGV4dGVuZHMgU2luZ2xldG9uIHtcblxuLy8gICAgIHB1YmxpYyBhcHBpZDogc3RyaW5nID0gXCJcIjtcbi8vICAgICBwdWJsaWMgc2VjcmV0OiBzdHJpbmcgPSBcIlwiO1xuLy8gICAgIHB1YmxpYyBhZFVuaXRJZDogc3RyaW5nID0gXCJcIjtcbi8vICAgICBwdWJsaWMgY29kZTJzZXNzaW9uVXJsID0gXCJodHRwczovL2FwaS53ZWl4aW4ucXEuY29tL3Nucy9qc2NvZGUyc2Vzc2lvbj9hcHBpZD17MH0mc2VjcmV0PXsxfSZqc19jb2RlPXsyfSZncmFudF90eXBlPWF1dGhvcml6YXRpb25fY29kZVwiO1xuXG5cbi8vICAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZldlY2hhdCA9IG51bGw7XG5cbi8vICAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6Q29uZldlY2hhdCB7XG4vLyAgICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25mV2VjaGF0KCk7XG4vLyAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuLy8gICAgIH1cbi8vIH1cbiIsIi8qKlxuICog6YeN6KaB55qE5p6a5Li+5a6a5LmJLOahhuaetue6p+WIq1xuICpcbiAqIEBhdXRob3IgVGltIFdhcnNcbiAqIEBkYXRlIDIwMTktMDEtMTggMTY6MjBcbiAqIEBwcm9qZWN0IGZpcmVib2x0XG4gKiBAY29weXJpZ2h0IChDKSBET05PUE9cbiAqXG4gKi9cblxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZTtcblxuLyoqXG4gKiDoiJ7lj7DnmoTnvKnmlL7moLzlvI9cbiAqL1xuZXhwb3J0IGVudW0gZW51bVNjYWxlVHlwZSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIFNjYWxlTm9TY2FsZSA9IFN0YWdlLlNDQUxFX0ZVTEwsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIFNjYWxlRXhhY3RGaXQgPSBTdGFnZS5TQ0FMRV9FWEFDVEZJVCxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgU2NhbGVTaG93QWxsID0gU3RhZ2UuU0NBTEVfU0hPV0FMTCxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgU2NhbGVOb0JvcmRlciA9IFN0YWdlLlNDQUxFX05PQk9SREVSLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBTY2FsZUZ1bGwgPSBTdGFnZS5TQ0FMRV9GVUxMLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBTY2FsZUZpeGVkV2lkdGggPSBTdGFnZS5TQ0FMRV9GSVhFRF9XSURUSCxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgU2NhbGVGaXhlZEhlaWdodCA9IFN0YWdlLlNDQUxFX0ZJWEVEX0hFSUdIVCxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgU2NhbGVGaXhlZEF1dG8gPSBTdGFnZS5TQ0FMRV9GSVhFRF9BVVRPLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBTY2FsZU5vU2NhbGUgPSBTdGFnZS5TQ0FMRV9OT1NDQUxFXG59XG5cbi8qKlxuICog5bGP5bmV55qE6Ieq6YCC5bqU5pa55byPXG4gKi9cbmV4cG9ydCBlbnVtIGVudW1TY3JlZW5Nb2RlbCB7XG4gICAgU2NyZWVuTm9uZSA9ICdub25lJyxcbiAgICBTY3JlZW5Ib3Jpem9udGFsID0gJ2hvcml6b250YWwnLFxuICAgIFNjcmVlblZlcnRpY2FsID0gJ3ZlcnRpY2FsJ1xufVxuXG4vKipcbiAqIOaVsOe7hOaOkuW6j+aWueW8j1xuICogKi9cbmV4cG9ydCBlbnVtIGVudW1BcnJheVNvcnRPcmRlciB7XG4gICAgQXNjZW5kaW5nLFx0Ly/ljYfluo9cbiAgICBEZXNjZW5kaW5nLFx0Ly/pmY3luo9cbn1cblxuLyoqXG4gKiDmuLjmiI/nmoTov5DooYzlrrnlmahcbiAqL1xuZXhwb3J0IGVudW0gZW51bUdhbWVQbGF0Zm9ybSB7XG4gICAgV2ViLFxuICAgIFBob25lLFxuICAgIFdlaXhpblxufVxuXG4vKipcbiAqIOWvuem9kOaWueW8j1xuICovXG5leHBvcnQgZW51bSBlbnVtQWxpZ2VUeXBlIHtcbiAgICBOT05FID0gMCxcbiAgICBSSUdIVCxcbiAgICBSSUdIVF9CT1RUT00sXG4gICAgQk9UVE9NLFxuICAgIExFRlRfQk9UVE9NLFxuICAgIExFRlQsXG4gICAgTEVGVF9UT1AsXG4gICAgVE9QLFxuICAgIFJJR0hUX1RPUCxcbiAgICBNSUQsXG59XG5cbi8qKlxuICog5a+56b2Q5qCH5rOoXG4gKi9cbmV4cG9ydCBlbnVtIGVudW1BbGlnZSB7XG4gICAgQWxpZ2VMZWZ0ID0gJ2xlZnQnLFxuICAgIEFsaWdlQ2VudGVyID0gJ2NlbnRlcicsXG4gICAgQWxpZ2VSaWdodCA9ICdyaWdodCcsXG4gICAgQWxpZ2VUb3AgPSAndG9wJyxcbiAgICBBbGlnZU1pZGRsZSA9ICdtaWRkbGUnLFxuICAgIEFsaWdlQm90dG9tID0gJ2JvdHRvbSdcbn1cblxuLyoqXG4gKiDmuIXnkIbotYTmupDnmoTmrKHluo/nrZbnlaVcbiAqL1xuZXhwb3J0IGVudW0gZW51bUNsZWFyU3RyYXRlZ3kge1xuICAgIEZJRk8gPSAwLCAgIC8v5YWI6L+b5YWI5Ye6XG4gICAgRklMTywgICAgICAgLy/lhYjov5vlkI7lh7pcbiAgICBMUlUsXHRcdC8v5pyA6L+R5pyA5bCR5L2/55SoXG4gICAgVU5fVVNFRCxcdC8v5pyq5L2/55SoXG4gICAgQUxMLFx0XHQvL+a4heeQhuaJgOaciVxufVxuXG4vKipcbiAqIOa4uOaIj+aYr+WQpumHh+eUqOeahDJE5oiW6ICFM0RcbiAqL1xuZXhwb3J0IGVudW0gZW51bURpbWVuc2lvbiB7XG4gICAgRGltMiA9ICcyZCcsXG4gICAgRGltMyA9ICczZCdcbn1cblxuLyoqXG4gKiDmuLjmiI/nmoTnirbmgIFcbiAqL1xuZXhwb3J0IGVudW0gZW51bUdhbWVTdGF0dXMge1xuICAgIFN0YXJ0ID0gJ0dBTUUtU1RBVFVTLVNUQVJUJyxcbiAgICBTdG9wID0gJ0dBTUUtU1RBVFVTLVNUT1AnLFxuICAgIFJlc3RhcnQgPSAnR0FNRS1TVEFUVVMtUkVTVEFSVCcsXG59XG5cbi8qKlxuIGxibCAgLS0tPkxhYmVsKOaWh+acrClcbiB0eHQgIC0tLT5UZXh0KOaWh+acrClcbiBydHh0ICAtLS0+UmljaFRleHQo5a+M5paH5pysKVxuIGlwdCAgLS0tPklucHV0KOi+k+WFpeahhilcbiBpbWcgIC0tLT5JbWFnZSjlm77niYcpXG4gc3B0ICAtLS0+U3ByaXRlKOeyvueBtSlcbiBncmggIC0tLT5HcmFwaCjlm77lvaIpXG4gbGlzdCAtLS0+TGlzdCjliJfooagpXG4gbG9hZCAtLS0+TG9hZCjoo4Xovb3lmagpXG4gZ3VwICAtLS0+R3JvdXAo57uEKVxuIGNvbSAgLS0tPkNvbXBvbmVudCjnu4Tku7YpXG4gYnRuICAtLS0+QnV0dG9uKOaMiemSrilcbiBjb2IgIC0tLT5Db21ib0JvdyjkuIvmi4nmoYYpXG4gcGJhciAtLS0+UHJvZ3Jlc3NCYXIo6L+b5bqm5p2hKVxuIHNsZCAgLS0tPlNsaWRlcijmu5HliqjmnaEpXG4gd2luICAtLS0+V2luZG9377yI56qX5Y+j77yJXG4gYW5pICAtLS0+TW92aWUo5Yqo55S7KVxuIGVmdCAgLS0tPlRyYW5zaXRpb24o5Yqo5pWIKVxuIGN0bCAgLS0tPkNvbnRyb2xsZXIo5o6n5Yi25ZmoKVxuICovXG5cbi8qKlxuICog5o6n5Lu25YmN57yAXG4gKi9cbmV4cG9ydCBlbnVtIGVudW1FbGVtZW50UHJlZml4IHtcbiAgICBMYWJsZSA9ICdsYmxfJyxcbiAgICBJbnB1dCA9ICdpcHRfJyxcbiAgICBUZXh0ID0gJ3R4dF8nLFxuICAgIFJpY2hUZXh0ID0gJ3J0eHRfJyxcbiAgICBJbWFnZSA9ICdpbWdfJyxcbiAgICBTcHJpdGUgPSAnc3B0XycsXG4gICAgR3JhcGggPSAnZ3JoXycsXG4gICAgTGlzdCA9ICdsaXN0XycsXG4gICAgTG9hZCA9ICdsb2FkXycsXG4gICAgR3JvdXAgPSAnZ3VwXycsXG4gICAgQ29tcG9uZW50ID0gJ2NvbV8nLFxuICAgIEJ1dHRvbiA9ICdidG5fJyxcbiAgICBDb21ib0JvdyA9ICdjb2JfJyxcbiAgICBQcm9ncmVzc0JhciA9ICdwYmFyXycsXG4gICAgU2xpZGVyID0gJ3NsZF8nLFxuICAgIFdpbmRvdyA9ICd3aW5fJyxcbiAgICBNb3ZpZSA9ICdhbmlfJyxcbiAgICBUcmFuc2l0aW9uID0gJ2VmdF8nLFxuICAgIENvbnRyb2xsZXIgPSAnY3RsXydcbn1cblxuIiwiaW1wb3J0IHsgVXRpbERpY3QgfSBmcm9tICcuLi91dGlsL2RpY3QnO1xuXG4vKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA1LTIxIDE5OjIyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiAg5a2X5YW4XG4gKlxuICovXG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeTxUPiB7XG5cbiAgICBwcml2YXRlIG1fZGljdDogT2JqZWN0ID0ge307XG5cbiAgICBwdWJsaWMgYWRkKGtleTogYW55LCB2YWx1ZTogVCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5oYXNLZXkoa2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLm1fZGljdFtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgZGVsZXRlIHRoaXMubV9kaWN0W2tleV07XG4gICAgfVxuXG4gICAgcHVibGljIGhhc0tleShrZXk6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMubV9kaWN0W2tleV0gIT0gbnVsbCk7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbHVlKGtleTogYW55KTogVCB7XG4gICAgICAgIGlmICghdGhpcy5oYXNLZXkoa2V5KSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLm1fZGljdFtrZXldO1xuICAgIH1cblxuICAgIHB1YmxpYyBrZXlzKCk6IEFycmF5PGFueT4ge1xuICAgICAgICBsZXQgbGlzdDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5tX2RpY3QpIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyB2YWx1ZXMoKTogQXJyYXk8VD4ge1xuICAgICAgICBsZXQgbGlzdDogQXJyYXk8VD4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMubV9kaWN0KSB7XG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5tX2RpY3Rba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5tX2RpY3QpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm1fZGljdFtrZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGZvcmVhY2goY29tcGFyZUZuOiAoa2V5OiBhbnksIHZhbHVlOiBUKT0+dm9pZCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5tX2RpY3QpIHtcbiAgICAgICAgICAgIGNvbXBhcmVGbi5jYWxsKG51bGwsIGtleSwgdGhpcy5tX2RpY3Rba2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZm9yZWFjaEJyZWFrKGNvbXBhcmVGbjogKGtleTphbnksIHZhbHVlOiBUKSA9PiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLm1fZGljdCkge1xuICAgICAgICAgICAgaWYgKCFjb21wYXJlRm4uY2FsbChudWxsLCBrZXksIHRoaXMubV9kaWN0W2tleV0pKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIFV0aWxEaWN0LnNpemUodGhpcy5tX2RpY3QpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGVudW1BcnJheVNvcnRPcmRlciB9IGZyb20gJy4uL3NldHRpbmcvZW51bSc7XG5cbiAvKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTA5IDIzOjE1XG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiDmlbDnu4Tlt6XlhbfnsbtcbiAqL1xuZXhwb3J0IGNsYXNzIFV0aWxBcnJheSB7XG5cbiAgICAvKiog5o+S5YWl5YWD57SgXG4gICAgICogQHBhcmFtIGFyciDpnIDopoHmk43kvZznmoTmlbDnu4RcbiAgICAgKiBAcGFyYW0gdmFsdWUg6ZyA6KaB5o+S5YWl55qE5YWD57SgXG4gICAgICogQHBhcmFtIGluZGV4IOaPkuWFpeS9jee9rlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaW5zZXJ0KGFycjogYW55W10sIHZhbHVlOiBhbnksIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKGluZGV4ID4gYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyci5zcGxpY2UoaW5kZXgsIDAsIHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoq5LuO5pWw57uE56e76Zmk5YWD57SgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZShhcnI6IGFueVtdLCB2OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IGFyci5pbmRleE9mKHYpO1xuICAgICAgICBpZiAoaSAhPSAtMSkge1xuICAgICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuenu+mZpOaJgOacieWAvOetieS6jnbnmoTlhYPntKAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlQWxsKGFycjogYW55W10sIHY6IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgaTogbnVtYmVyID0gYXJyLmluZGV4T2Yodik7XG4gICAgICAgIHdoaWxlIChpID49IDApIHtcbiAgICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBpID0gYXJyLmluZGV4T2Yodik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirljIXlkKvlhYPntKAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29udGFpbihhcnI6IGFueVtdLCB2OiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGFyci5sZW5ndGggPiAwID8gYXJyLmluZGV4T2YodikgIT0gLTEgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKirlpI3liLYqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29weShhcnI6IGFueVtdKTogYW55W10ge1xuICAgICAgICByZXR1cm4gYXJyLnNsaWNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o6S5bqPXG4gICAgICogQHBhcmFtIGFyciDpnIDopoHmjpLluo/nmoTmlbDnu4RcbiAgICAgKiBAcGFyYW0ga2V5IOaOkuW6j+Wtl+autVxuICAgICAqIEBwYXJhbSBvcmRlciDmjpLluo/mlrnlvI9cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNvcnQoYXJyOiBhbnlbXSwga2V5OiBzdHJpbmcsIG9yZGVyOiBlbnVtQXJyYXlTb3J0T3JkZXIgPSBlbnVtQXJyYXlTb3J0T3JkZXIuRGVzY2VuZGluZyk6IHZvaWQge1xuICAgICAgICBpZiAoYXJyID09IG51bGwpIHJldHVybjtcbiAgICAgICAgYXJyLnNvcnQoZnVuY3Rpb24gKGluZm8xLCBpbmZvMikge1xuICAgICAgICAgICAgc3dpdGNoIChvcmRlcikge1xuICAgICAgICAgICAgICAgIGNhc2UgZW51bUFycmF5U29ydE9yZGVyLkFzY2VuZGluZzoge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mbzFba2V5XSA8IGluZm8yW2tleV0pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvMVtrZXldID4gaW5mbzJba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBlbnVtQXJyYXlTb3J0T3JkZXIuRGVzY2VuZGluZzoge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mbzFba2V5XSA+IGluZm8yW2tleV0pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvMVtrZXldIDwgaW5mbzJba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKua4heepuuaVsOe7hCovXG4gICAgcHVibGljIHN0YXRpYyBjbGVhcihhcnI6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIGxldCBpOiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBhcnIubGVuZ3RoO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBhcnJbaV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGFyci5zcGxpY2UoMCk7XG4gICAgfVxuXG4gICAgLyoq5pWw5o2u5piv5ZCm5Li656m6Ki9cbiAgICBwdWJsaWMgc3RhdGljIGlzRW1wdHkoYXJyOiBhbnlbXSk6IEJvb2xlYW4ge1xuICAgICAgICBpZiAoYXJyID09IG51bGwgfHwgYXJyLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG59XG4iLCJcbiAvKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTEwIDIwOjIyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiAg5a2X5YW45bel5YW357G7XG4gKlxuICovXG5leHBvcnQgY2xhc3MgVXRpbERpY3Qge1xuICAgIC8qKlxuICAgICAqIOmUruWIl+ihqFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMga2V5cyhkOiBPYmplY3QpOiBhbnlbXSB7XG4gICAgICAgIGxldCBhOiBhbnlbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZCkge1xuICAgICAgICAgICAgYS5wdXNoKGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlgLzliJfooahcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHZhbHVlcyhkOiBPYmplY3QpOiBhbnlbXSB7XG4gICAgICAgIGxldCBhOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBkKSB7XG4gICAgICAgICAgICBhLnB1c2goZFtrZXldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiBcbiAgICAvKipcbiAgICAgKiDmuIXnqbrlrZflhbhcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyKGRpYzogT2JqZWN0KTogdm9pZCB7XG4gICAgICAgIGxldCB2OiBhbnk7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBkaWMpIHtcbiAgICAgICAgICAgIHYgPSBkaWNba2V5XTtcbiAgICAgICAgICAgIGlmICh2IGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgVXRpbERpY3QuY2xlYXIodik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgZGljW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhajpg6jlupTnlKhcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZvcmVhY2goZGljOiBPYmplY3QsIGNvbXBhcmVGbjogKGtleTogYW55LCB2YWx1ZTogYW55KSA9PiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBkaWMpIHtcbiAgICAgICAgICAgIGlmICghY29tcGFyZUZuLmNhbGwobnVsbCwga2V5LCBkaWNba2V5XSkpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzRW1wdHkoZGljOiBPYmplY3QpOiBCb29sZWFuIHtcbiAgICAgICAgaWYgKGRpYyA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGljKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaXplKGRpYzogT2JqZWN0KTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGRpYyA9PSBudWxsKSByZXR1cm4gMDtcblxuICAgICAgICBsZXQgY291bnQ6IG51bWJlciA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGRpYykge1xuICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IE5vZGUgPSBMYXlhLk5vZGU7XG5pbXBvcnQgU3ByaXRlID0gTGF5YS5TcHJpdGU7XG5pbXBvcnQgUmVjdGFuZ2xlID0gTGF5YS5SZWN0YW5nbGU7XG5pbXBvcnQgTGFiZWwgPSBMYXlhLkxhYmVsO1xuXG5leHBvcnQgY2xhc3MgVXRpbERpc3BsYXkge1xuXG4gICAgLyoqXG4gICAgICog56e76Zmk5YWo6YOo5a2Q5a+56LGhXG4gICAgICogQHBhcmFtIGNvbnRhaW5lciBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUFsbENoaWxkKGNvbnRhaW5lcjogTGF5YS5TcHJpdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5udW1DaGlsZHJlbiA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgd2hpbGUgKGNvbnRhaW5lci5udW1DaGlsZHJlbiA+IDApIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZEF0KDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSDplIDmr4FVSeiKgueCuVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGVzdHJveVVJTm9kZShub2RlOiBOb2RlKTogdm9pZCB7XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZVNlbGYoKTtcbiAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgbm9kZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgJrov4flkI3lrZfojrflvpflrZDoioLngrlcbiAgICAgKiBAcGFyYW0gcGFyZW50IFxuICAgICAqIEBwYXJhbSBuYW1lIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hpbGRCeU5hbWUocGFyZW50OiBOb2RlLCBuYW1lOiBzdHJpbmcpOiBOb2RlIHtcbiAgICAgICAgaWYgKCFwYXJlbnQpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAocGFyZW50Lm5hbWUgPT09IG5hbWUpIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIGxldCBjaGlsZDogTm9kZSA9IG51bGw7XG4gICAgICAgIGxldCBudW06IG51bWJlciA9IHBhcmVudC5udW1DaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07ICsraSkge1xuICAgICAgICAgICAgY2hpbGQgPSBVdGlsRGlzcGxheS5nZXRDaGlsZEJ5TmFtZShwYXJlbnQuZ2V0Q2hpbGRBdChpKSwgbmFtZSk7XG4gICAgICAgICAgICBpZiAoY2hpbGQpIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDorr7nva7lr7npvZDmlrnlvI9cbiAgICAvLyAgKiBAcGFyYW0gYWxpZ2Ug5a+56b2Q5pa55byPXG4gICAgLy8gICovXG4gICAgLy8gcHVibGljIHN0YXRpYyBzZXRBbGlnZShub2RlOiBTcHJpdGUsIGFsaWdlOiBlbnVtQWxpZ2VUeXBlLCB3OiBudW1iZXIgPSAwLCBoOiBudW1iZXIgPSAwKSB7XG4gICAgLy8gICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgIC8vICAgICBsZXQgcmVjdDogUmVjdGFuZ2xlO1xuICAgIC8vICAgICBpZiAodyA8PSAwIHx8IGggPD0gMCkgcmVjdCA9IG5vZGUuZ2V0Qm91bmRzKCk7XG4gICAgLy8gICAgIGxldCB3aWR0aDogbnVtYmVyID0gdyA+IDAgPyB3IDogcmVjdC53aWR0aDtcbiAgICAvLyAgICAgbGV0IGhlaWd0aDogbnVtYmVyID0gaCA+IDAgPyBoIDogcmVjdC5oZWlnaHQ7XG4gICAgLy8gICAgIHN3aXRjaCAoYWxpZ2UpIHtcbiAgICAvLyAgICAgICAgIGNhc2UgZW51bUFsaWdlVHlwZS5MRUZUX1RPUDpcbiAgICAvLyAgICAgICAgICAgICBub2RlLnBpdm90KDAsIDApO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBlbnVtQWxpZ2VUeXBlLkxFRlQ6XG4gICAgLy8gICAgICAgICAgICAgbm9kZS5waXZvdCgwLCBoZWlndGggKiAwLjUpO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBlbnVtQWxpZ2VUeXBlLkxFRlRfQk9UVE9NOlxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3QoMCwgaGVpZ3RoKTtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgZW51bUFsaWdlVHlwZS5UT1A6XG4gICAgLy8gICAgICAgICAgICAgbm9kZS5waXZvdCh3aWR0aCAqIDAuNSwgMCk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuTUlEOlxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGggKiAwLjUsIGhlaWd0aCAqIDAuNSk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuQk9UVE9NOlxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGggKiAwLjUsIGhlaWd0aCk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuUklHSFRfVE9QOlxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGgsIDApO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBlbnVtQWxpZ2VUeXBlLlJJR0hUOlxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGgsIGhlaWd0aCAqIDAuNSk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuUklHSFRfQk9UVE9NOlxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGgsIGhlaWd0aCk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiDliJvlu7rpgI/mmI7pga7nvalcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZU1hc2tMYXllcigpOiBTcHJpdGUge1xuICAgICAgICBsZXQgbGF5ZXIgPSBuZXcgU3ByaXRlKCk7XG4gICAgICAgIGxheWVyLm1vdXNlRW5hYmxlZCA9IHRydWU7XG5cbiAgICAgICAgbGV0IHdpZHRoID0gbGF5ZXIud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoICsgMjAwO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQgKyA0MDA7XG4gICAgICAgIGxheWVyLmdyYXBoaWNzLmNsZWFyKHRydWUpO1xuICAgICAgICBsYXllci5ncmFwaGljcy5kcmF3UmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0LCBVSUNvbmZpZy5wb3B1cEJnQ29sb3IpO1xuICAgICAgICBsYXllci5hbHBoYSA9IFVJQ29uZmlnLnBvcHVwQmdBbHBoYTtcblxuICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgfVxufSIsIi8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDgtMDkgMTk6MThcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uICDml7bpl7Tlt6XlhbdcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBVdGlsVGltZSB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBtX1N0YXJ0VGltZTogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyBzdGF0aWMgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubV9TdGFydFRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcbiAgICB9XG5cbiAgICAvKirkuKTluKfkuYvpl7TnmoTml7bpl7Tpl7TpmpQs5Y2V5L2N56eSKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldCBkZWx0YVRpbWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIExheWEudGltZXIuZGVsdGEgKiAwLjAwMTtcbiAgICB9XG5cbiAgICAvKirlm7rlrprkuKTluKfkuYvpl7TnmoTml7bpl7Tpl7TpmpQqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGZpeGVkRGVsdGFUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8qKuW9k+WJjeaXtumXtO+8jOebuOWvuXh4eHjlubTlvIDlp4vnu4/ov4fnmoTmr6vnp5LmlbAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IHRpbWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIExheWEudGltZXIuY3VyclRpbWVyO1xuICAgIH1cblxuICAgIC8qKua4uOaIj+WQr+WKqOWIsOeOsOWcqOeahOaXtumXtCzljZXkvY3mr6vnp5IqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IHRpbWVTaW5jZVN0YXJ0dXAoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIChMYXlhLnRpbWVyLmN1cnJUaW1lciAtIHRoaXMubV9TdGFydFRpbWUpO1xuICAgIH1cblxuICAgIC8qKua4uOaIj+WQr+WKqOWQju+8jOe7j+i/h+eahOW4p+aVsCovXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZnJhbWVDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTGF5YS50aW1lci5jdXJyRnJhbWU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdGltZVNjYWxlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBMYXlhLnRpbWVyLnNjYWxlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2V0IHRpbWVTY2FsZShzY2FsZTogbnVtYmVyKSB7XG4gICAgICAgIExheWEudGltZXIuc2NhbGUgPSBzY2FsZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyB1aSB9IGZyb20gJy4uL3VpL2xheWFNYXhVSSc7XHJcbmltcG9ydCBsb2FkaW5nVUkgPSAgdWkudmlldy5tYWluLmxvYWRpbmdVSTtcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2FkaW5nVmlldyBleHRlbmRzIGxvYWRpbmdVSVxyXG57XHJcbiAgICBcclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xuaW1wb3J0IEJveD1MYXlhLkJveDtcbmltcG9ydCBUYXA9TGF5YS5UYWI7XG5pbXBvcnQgQ2xpcD1MYXlhLkNsaXA7XG5pbXBvcnQgTGlzdD1MYXlhLkxpc3Q7XG5pbXBvcnQgSW1hZ2U9TGF5YS5JbWFnZTtcbmltcG9ydCBMYWJlbD1MYXlhLkxhYmVsO1xuaW1wb3J0IFBhbmVsPUxheWEuUGFuZWw7XG5pbXBvcnQgU3ByaXRlPUxheWEuU3ByaXRlO1xuaW1wb3J0IEJ1dHRvbj1MYXlhLkJ1dHRvbjtcbmltcG9ydCBDaGVja0JveD1MYXlhLkNoZWNrQm94O1xuaW1wb3J0IEhTbGlkZXI9TGF5YS5IU2xpZGVyO1xuaW1wb3J0IFNsaWRlcj1MYXlhLlZTbGlkZXI7XG5pbXBvcnQgVmlld1N0YWNrPUxheWEuVmlld1N0YWNrO1xuaW1wb3J0IEFuaW1hdGlvbj1MYXlhLkFuaW1hdGlvbjtcbmltcG9ydCBQcm9ncmVzc0Jhcj1MYXlhLlByb2dyZXNzQmFyO1xuaW1wb3J0IEZyYW1lQW5pbWF0aW9uPUxheWEuRnJhbWVBbmltYXRpb247XG5pbXBvcnQge0N1c3RvbVZpZXd9IGZyb20gXCIuLi9mcmFtZXdvcmsvbWFuYWdlci91aS92aWV3LWJhc2VcIjtcbmltcG9ydCB7Q3VzdG9tRGlhbG9nfSBmcm9tIFwiLi4vZnJhbWV3b3JrL21hbmFnZXIvdWkvZGlhbG9nLWJhc2VcIjtcbmltcG9ydCBEaWFsb2dCYXNlID0gQ3VzdG9tRGlhbG9nLkRpYWxvZ0Jhc2U7XG5pbXBvcnQgVmlld0Jhc2UgPSBDdXN0b21WaWV3LlZpZXdCYXNlO1xudmFyIFJFRzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XG5leHBvcnQgbW9kdWxlIHVpLnZpZXcuY29tIHtcclxuICAgIGV4cG9ydCBjbGFzcyBkYXk3c1VJIGV4dGVuZHMgRGlhbG9nQmFzZSB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiRGlhbG9nQmFzZVwiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjc1MCxcImhlaWdodFwiOjEzMzR9LFwiY29tcElkXCI6MixcImxvYWRMaXN0XCI6W10sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGRheTdzVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3LmNvbS5kYXk3c1VJXCIsZGF5N3NVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgaW52aXRlVUkgZXh0ZW5kcyBEaWFsb2dCYXNlIHtcclxuXHRcdHB1YmxpYyBsaXN0SW52aXRlQTpMaXN0O1xuXHRcdHB1YmxpYyBsaXN0SW52aXRlQjpMaXN0O1xuXHRcdHB1YmxpYyBsYmxJbmRleDpMYWJlbDtcblx0XHRwdWJsaWMgbGJsTmFtZTpMYWJlbDtcblx0XHRwdWJsaWMgYnRuQ2xvc2U6QnV0dG9uO1xuXHRcdHB1YmxpYyBidG5JbnZpdGU6QnV0dG9uO1xuXHRcdHB1YmxpYyBwZ3NJbnZpdGU6UHJvZ3Jlc3NCYXI7XG5cdFx0cHVibGljIGxibFBnczpMYWJlbDtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiRGlhbG9nQmFzZVwiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjc1MCxcImhlaWdodFwiOjE2MjR9LFwiY29tcElkXCI6MixcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo4MjAsXCJ4XCI6Mzc1LFwid2lkdGhcIjo2NjgsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9jb20vZGlhbG9nL2ltZ19vdXRzaWRlX2JveC5wbmdcIixcInNpemVHcmlkXCI6XCI4NCw4OCw4OCw3NFwiLFwiaGVpZ2h0XCI6MTE2MSxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjUsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NDUuNSxcInhcIjoxMTcuNSxcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL2ludml0ZS9pbWdfdGl0bGUucG5nXCJ9LFwiY29tcElkXCI6NTB9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxNDMsXCJ4XCI6NTEuNSxcIndpZHRoXCI6NTY1LFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvY29tL2RpYWxvZy9pbWdfSW5zaWRlX2JveC5wbmdcIixcImhlaWdodFwiOjUxMH0sXCJjb21wSWRcIjo0OH0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjY3NixcInhcIjo1MS41LFwid2lkdGhcIjo1NjUsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9jb20vZGlhbG9nL2ltZ19JbnNpZGVfYm94LnBuZ1wiLFwiaGVpZ2h0XCI6MzM0fSxcImNvbXBJZFwiOjQ5fSx7XCJ0eXBlXCI6XCJMaXN0XCIsXCJwcm9wc1wiOntcInlcIjoxNzMsXCJ4XCI6NzgsXCJ3aWR0aFwiOjUxNixcInZhclwiOlwibGlzdEludml0ZUFcIixcInNwYWNlWVwiOjIwLFwiaGVpZ2h0XCI6NDUyLFwiZWxhc3RpY0VuYWJsZWRcIjp0cnVlfSxcImNvbXBJZFwiOjE0LFwiY2hpbGRcIjpbe1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjUxNSxcInJlbmRlclR5cGVcIjpcInJlbmRlclwiLFwiaGVpZ2h0XCI6NzB9LFwiY29tcElkXCI6MTAsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9pbnZpdGUvaW1nX2ludml0ZV9yZXdhcmRfbGlzdF9iZy5wbmdcIn0sXCJjb21wSWRcIjo5fSx7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ5XCI6MjMuNSxcInhcIjo4OCxcInRleHRcIjpcIjEwLzEw5Lq6XCIsXCJzdHJva2VDb2xvclwiOlwiI2ZiZjlmOVwiLFwic3Ryb2tlXCI6MixcIm5hbWVcIjpcImxibF9wcm9ncmVzc1wiLFwiZm9udFNpemVcIjozMCxcImNvbG9yXCI6XCIjNDE0MDQwXCJ9LFwiY29tcElkXCI6MTd9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoxMyxcInhcIjoxNixcInRleHRcIjpcIjFcIixcInN0cm9rZUNvbG9yXCI6XCIjZmRmOWY5XCIsXCJzdHJva2VcIjoyLFwibmFtZVwiOlwibGJsX2luZGV4XCIsXCJmb250U2l6ZVwiOjQ0LFwiY29sb3JcIjpcIiM0MTQwNDBcIixcImJvbGRcIjp0cnVlfSxcImNvbXBJZFwiOjE2fSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjM0LFwieFwiOjQ0MSxcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL2ludml0ZS9idG5fcl9nb3RfMy5wbmdcIixcIm5hbWVcIjpcImJ0bl9nZXRcIixcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjE1fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MjAuNSxcInhcIjozMDkuMzY5MTQwNjI1LFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvY29tL2ltZ19kaWFtb25kXzEucG5nXCIsXCJzY2FsZVlcIjowLjgsXCJzY2FsZVhcIjowLjh9LFwiY29tcElkXCI6NTF9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoyMS41LFwieFwiOjMwMSxcInRleHRcIjpcIjEwMFwiLFwic3Ryb2tlQ29sb3JcIjpcIiNmZGZiZmJcIixcInN0cm9rZVwiOjIsXCJuYW1lXCI6XCJsYmxfZGlhbW9uZFwiLFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIkFyaWFsXCIsXCJjb2xvclwiOlwiIzQxNDA0MFwiLFwiYW5jaG9yWFwiOjF9LFwiY29tcElkXCI6MTh9XX0se1widHlwZVwiOlwiVlNjcm9sbEJhclwiLFwicHJvcHNcIjp7XCJ5XCI6NTU4LFwieFwiOjAsXCJuYW1lXCI6XCJzY3JvbGxiYXJcIn0sXCJjb21wSWRcIjo0Mn1dfSx7XCJ0eXBlXCI6XCJMaXN0XCIsXCJwcm9wc1wiOntcInlcIjo3MzIsXCJ4XCI6NzcsXCJ3aWR0aFwiOjUxNixcInZhclwiOlwibGlzdEludml0ZUJcIixcInNwYWNlWFwiOjksXCJyZXBlYXRZXCI6MSxcImhlaWdodFwiOjI2MixcImVsYXN0aWNFbmFibGVkXCI6dHJ1ZX0sXCJjb21wSWRcIjozMSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkJveFwiLFwicHJvcHNcIjp7XCJ5XCI6MSxcInhcIjo1LFwid2lkdGhcIjoxMjEsXCJyZW5kZXJUeXBlXCI6XCJyZW5kZXJcIixcImhlaWdodFwiOjI2MH0sXCJjb21wSWRcIjozOSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxLFwieFwiOjAsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9pbnZpdGUvaW1nX2ludml0ZV9ub3dfbGlzdF9iZy5wbmdcIn0sXCJjb21wSWRcIjozOH0se1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjYwLFwidmFyXCI6XCJsYmxJbmRleFwiLFwidGV4dFwiOlwi56ysMeS9jVwiLFwic3Ryb2tlQ29sb3JcIjpcIiNmZmZkZmRcIixcInN0cm9rZVwiOjIsXCJuYW1lXCI6XCJsYmxfaW5kZXhcIixcImZvbnRTaXplXCI6MjQsXCJjb2xvclwiOlwiIzQxNDA0MFwiLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6NDV9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo1MSxcInhcIjoxMCxcIndpZHRoXCI6MTAwLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvcmFuay9pbWdfYXZhdGFyX21hc2sucG5nXCIsXCJuYW1lXCI6XCJzcF9oZWFkXCIsXCJoZWlnaHRcIjoxMDB9LFwiY29tcElkXCI6NDN9LHtcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6MjI4LFwieFwiOjYwLFwic3RhdGVOdW1cIjoxLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvaW52aXRlL2J0bl9jX2dvdF8zLnBuZ1wiLFwibmFtZVwiOlwiYnRuX2dldFwiLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6NDB9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoxNzIsXCJ4XCI6NTgsXCJ2YXJcIjpcImxibE5hbWVcIixcInRleHRcIjpcIisyMOmSu1wiLFwic3Ryb2tlQ29sb3JcIjpcIiNmYmY4ZjhcIixcInN0cm9rZVwiOjIsXCJuYW1lXCI6XCJsYmxfbmFtZVwiLFwiZm9udFNpemVcIjoyMCxcImNvbG9yXCI6XCIjNDE0MDQwXCIsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo0Nn1dfSx7XCJ0eXBlXCI6XCJIU2Nyb2xsQmFyXCIsXCJwcm9wc1wiOntcInlcIjotNTU4LFwieFwiOjAsXCJuYW1lXCI6XCJzY3JvbGxiYXJcIn0sXCJjb21wSWRcIjo0MX1dfSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjc2LFwieFwiOjU5NixcInZhclwiOlwiYnRuQ2xvc2VcIixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL2NvbS9idG5fY2xvc2UucG5nXCIsXCJzY2FsZVlcIjoxLjEsXCJzY2FsZVhcIjoxLjEsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo2fSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjEwNjgsXCJ4XCI6MzIyLFwidmFyXCI6XCJidG5JbnZpdGVcIixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL2ludml0ZS9idG5faW52aXRlLnBuZ1wiLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6N30se1widHlwZVwiOlwiUHJvZ3Jlc3NCYXJcIixcInByb3BzXCI6e1wieVwiOjY4OSxcInhcIjo3NSxcInZhclwiOlwicGdzSW52aXRlXCIsXCJ2YWx1ZVwiOjEsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9pbnZpdGUvcHJvZ3Jlc3NfaW52aXRlLnBuZ1wifSxcImNvbXBJZFwiOjgsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ5XCI6MixcInhcIjoyMjkuODA1NjY0MDYyNSxcInZhclwiOlwibGJsUGdzXCIsXCJ0ZXh0XCI6XCIwIC8gNTAgXCIsXCJzdHJva2VDb2xvclwiOlwiI2ZmZmRmZFwiLFwic3Ryb2tlXCI6NCxcImZvbnRTaXplXCI6MjgsXCJjb2xvclwiOlwiIzcyNDA0MFwiLFwiYm9sZFwiOnRydWV9LFwiY29tcElkXCI6NDR9XX1dfV0sXCJsb2FkTGlzdFwiOltcInJlcy9yZXNvdXJjZS9iYXNlL2NvbS9kaWFsb2cvaW1nX291dHNpZGVfYm94LnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2UvaW52aXRlL2ltZ190aXRsZS5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL2NvbS9kaWFsb2cvaW1nX0luc2lkZV9ib3gucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9pbnZpdGUvaW1nX2ludml0ZV9yZXdhcmRfbGlzdF9iZy5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL2ludml0ZS9idG5fcl9nb3RfMy5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL2NvbS9pbWdfZGlhbW9uZF8xLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2UvaW52aXRlL2ltZ19pbnZpdGVfbm93X2xpc3RfYmcucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9yYW5rL2ltZ19hdmF0YXJfbWFzay5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL2ludml0ZS9idG5fY19nb3RfMy5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL2NvbS9idG5fY2xvc2UucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9pbnZpdGUvYnRuX2ludml0ZS5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL2ludml0ZS9wcm9ncmVzc19pbnZpdGUucG5nXCJdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhpbnZpdGVVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnZpZXcuY29tLmludml0ZVVJXCIsaW52aXRlVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIGxvdHRlcnlVSSBleHRlbmRzIERpYWxvZ0Jhc2Uge1xyXG5cdFx0cHVibGljIGlkbGU6RnJhbWVBbmltYXRpb247XG5cdFx0cHVibGljIGltZ0NvbnRleHQ6SW1hZ2U7XG5cdFx0cHVibGljIGxibEluZGV4MzpMYWJlbDtcblx0XHRwdWJsaWMgbGJsSW5kZXgyOkxhYmVsO1xuXHRcdHB1YmxpYyBsYmxJbmRleDE6TGFiZWw7XG5cdFx0cHVibGljIGxibEluZGV4NDpMYWJlbDtcblx0XHRwdWJsaWMgbGJsSW5kZXg1OkxhYmVsO1xuXHRcdHB1YmxpYyBsYmxJbmRleDY6TGFiZWw7XG5cdFx0cHVibGljIGltZ0J0bjpJbWFnZTtcblx0XHRwdWJsaWMgYnRuU3RhcnQ6QnV0dG9uO1xuXHRcdHB1YmxpYyBpbWdOZXh0OkltYWdlO1xuXHRcdHB1YmxpYyBsYmxUaW1lOkxhYmVsO1xuXHRcdHB1YmxpYyBzdGFyMDpJbWFnZTtcblx0XHRwdWJsaWMgc3RhcjE6SW1hZ2U7XG5cdFx0cHVibGljIHN0YXIyOkltYWdlO1xuXHRcdHB1YmxpYyBzdGFyMzpJbWFnZTtcblx0XHRwdWJsaWMgc3RhcjQ6SW1hZ2U7XG5cdFx0cHVibGljIHN0YXI1OkltYWdlO1xuXHRcdHB1YmxpYyBidG5DbG9zZTpCdXR0b247XG5cdFx0cHVibGljIGxibEJhc2U6TGFiZWw7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxNjI0fSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJTcHJpdGVcIixcInByb3BzXCI6e1wieVwiOjgxMixcInhcIjozNzV9LFwiY29tcElkXCI6NyxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjotOTUsXCJ4XCI6MCxcInZhclwiOlwiaW1nQ29udGV4dFwiLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvbG90dGVyeS9pbWdfbG90dGVyeV9jb250ZW50LnBuZ1wiLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6NixcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjo0MDAsXCJ4XCI6NDUyLFwidmFyXCI6XCJsYmxJbmRleDNcIixcInRleHRcIjpcIiDDlzUgXCIsXCJzdHJva2VcIjoxMCxcInJvdGF0aW9uXCI6MTIwLFwiZm9udFNpemVcIjo2NSxcImZvbnRcIjpcIkhlbHZldGljYVwiLFwiY29sb3JcIjpcIiNmZmZmZmZcIixcImJvbGRcIjp0cnVlLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6MjN9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoyNjMsXCJ4XCI6NDUzLFwidmFyXCI6XCJsYmxJbmRleDJcIixcInRleHRcIjpcIsOXMyBcIixcInN0cm9rZVwiOjEwLFwicm90YXRpb25cIjo2MCxcIm92ZXJmbG93XCI6XCJ2aXNpYmxlXCIsXCJmb250U2l6ZVwiOjY1LFwiZm9udFwiOlwiSGVsdmV0aWNhXCIsXCJjb2xvclwiOlwiI2ZmZmZmZlwiLFwiYm9sZFwiOnRydWUsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjoyMn0se1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOjE5MSxcInhcIjozMjcsXCJ2YXJcIjpcImxibEluZGV4MVwiLFwidGV4dFwiOlwiIMOXMiBcIixcInN0cm9rZVwiOjEwLFwib3ZlcmZsb3dcIjpcInNjcm9sbFwiLFwiZm9udFNpemVcIjo2NSxcImZvbnRcIjpcIkhlbHZldGljYVwiLFwiY29sb3JcIjpcIiNmZmZmZmZcIixcImJvbGRcIjp0cnVlLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6MjF9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjo0NzIsXCJ4XCI6MzI5LFwidmFyXCI6XCJsYmxJbmRleDRcIixcInRleHRcIjpcIiDDlzYgXCIsXCJzdHJva2VcIjoxMCxcInJvdGF0aW9uXCI6MTgwLFwiZm9udFNpemVcIjo2NSxcImZvbnRcIjpcIkhlbHZldGljYVwiLFwiY29sb3JcIjpcIiNmZmZmZmZcIixcImJvbGRcIjp0cnVlLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6MjR9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjozOTgsXCJ4XCI6MjEyLFwidmFyXCI6XCJsYmxJbmRleDVcIixcInRleHRcIjpcIiDDlzcgXCIsXCJzdHJva2VcIjoxMCxcInJvdGF0aW9uXCI6MjQwLFwiZm9udFNpemVcIjo2NSxcImZvbnRcIjpcIkhlbHZldGljYVwiLFwiY29sb3JcIjpcIiNmZmZmZmZcIixcImJvbGRcIjp0cnVlLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6MjZ9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoyNjQsXCJ4XCI6MjExLFwidmFyXCI6XCJsYmxJbmRleDZcIixcInRleHRcIjpcIiDDlzEwIFwiLFwic3Ryb2tlXCI6MTAsXCJyb3RhdGlvblwiOjMwMCxcImZvbnRTaXplXCI6NjUsXCJmb250XCI6XCJIZWx2ZXRpY2FcIixcImNvbG9yXCI6XCIjZmZmZmZmXCIsXCJib2xkXCI6dHJ1ZSxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjI1fV19LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjotNDYyLFwieFwiOi0zNjksXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9sb3R0ZXJ5L2ltZ19sb3R0ZXJ5X2JvcmRlci5wbmdcIn0sXCJjb21wSWRcIjo1LFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjM2NyxcInhcIjozNjcsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9sb3R0ZXJ5L2ltZ19sb3R0ZXJ5X2xpZ2h0LnBuZ1wiLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6MzR9XX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOi01NDQsXCJ4XCI6LTUwLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvbG90dGVyeS9pbWdfbG90dGVyeV9hcnJvdy5wbmdcIn0sXCJjb21wSWRcIjo0Mn0se1widHlwZVwiOlwiU2NyaXB0XCIsXCJwcm9wc1wiOntcInN0eWxlU2tpblwiOlwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vV2lkZ2V0XCIsXCJlbmFibGVkXCI6dHJ1ZSxcImNlbnRlcllcIjowLFwiY2VudGVyWFwiOjAsXCJydW50aW1lXCI6XCJsYXlhLnVpLldpZGdldFwifSxcImNvbXBJZFwiOjh9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInpPcmRlclwiOjAsXCJ5XCI6MjcyLFwieFwiOi0xMDYsXCJ2YXJcIjpcImltZ0J0blwiLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvbG90dGVyeS9pbWdfbG90dGVyeV9jYXQucG5nXCJ9LFwiY29tcElkXCI6MzUsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjIwNixcInhcIjoxMDYsXCJ2YXJcIjpcImJ0blN0YXJ0XCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9sb3R0ZXJ5L2J0bl9sb3R0ZXJ5X3N0YXJ0LnBuZ1wiLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6NH0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjE1OCxcInhcIjotMixcIndpZHRoXCI6MjE2LFwidmFyXCI6XCJpbWdOZXh0XCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9jb20vYnRuX2NvbW1vbl80LnBuZ1wiLFwic2l6ZUdyaWRcIjpcIjAsMzksMCw0NlwiLFwiaGVpZ2h0XCI6OTQsXCJncmF5XCI6dHJ1ZX0sXCJjb21wSWRcIjo0M30se1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOjE3NyxcInhcIjozOCxcInZhclwiOlwibGJsVGltZVwiLFwidGV4dFwiOlwiODowMDowMFwiLFwic3Ryb2tlQ29sb3JcIjpcIiMwMjQ5NThcIixcInN0cm9rZVwiOjQsXCJmb250U2l6ZVwiOjQwLFwiY29sb3JcIjpcIiNmZmZmZmZcIn0sXCJjb21wSWRcIjozMX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjEyLFwieFwiOi0zNy41LFwidmFyXCI6XCJzdGFyMFwiLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvbG90dGVyeS9pbWdfbG90dGVyeV9zdGFyLnBuZ1wiLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6MzZ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo2MCxcInhcIjoxNCxcInZhclwiOlwic3RhcjFcIixcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL2xvdHRlcnkvaW1nX2xvdHRlcnlfc3Rhci5wbmdcIixcInNjYWxlWVwiOjAuNyxcInNjYWxlWFwiOjAuNyxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjM4fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6OTcsXCJ4XCI6LTM3LFwidmFyXCI6XCJzdGFyMlwiLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvbG90dGVyeS9pbWdfbG90dGVyeV9zdGFyLnBuZ1wiLFwic2NhbGVZXCI6MC43LFwic2NhbGVYXCI6MC43LFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6Mzd9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo1NCxcInhcIjoyMTgsXCJ2YXJcIjpcInN0YXIzXCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9sb3R0ZXJ5L2ltZ19sb3R0ZXJ5X3N0YXIucG5nXCIsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjozOX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjExLFwieFwiOjI2NyxcInZhclwiOlwic3RhcjRcIixcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL2xvdHRlcnkvaW1nX2xvdHRlcnlfc3Rhci5wbmdcIixcInNjYWxlWVwiOjAuNyxcInNjYWxlWFwiOjAuNyxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjQwfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MTA4LFwieFwiOjI3MSxcInZhclwiOlwic3RhcjVcIixcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL2xvdHRlcnkvaW1nX2xvdHRlcnlfc3Rhci5wbmdcIixcInNjYWxlWVwiOjAuNyxcInNjYWxlWFwiOjAuNyxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjQxfV19LHtcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6LTU0NSxcInhcIjoyOTMsXCJ2YXJcIjpcImJ0bkNsb3NlXCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9jb20vYnRuX2Nsb3NlLnBuZ1wiLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6OX0se1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOi05NSxcInhcIjoxLFwidmFyXCI6XCJsYmxCYXNlXCIsXCJ0ZXh0XCI6XCIxLjBLXCIsXCJzdHJva2VDb2xvclwiOlwiI2ZhZDE0MVwiLFwic3Ryb2tlXCI6MTAsXCJvdmVyZmxvd1wiOlwic2Nyb2xsXCIsXCJmb250U2l6ZVwiOjQwLFwiZm9udFwiOlwiSGVsdmV0aWNhXCIsXCJjb2xvclwiOlwiIzAwMDAwMFwiLFwiYm9sZFwiOnRydWUsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo0NH1dfV0sXCJhbmltYXRpb25zXCI6W3tcIm5vZGVzXCI6W3tcInRhcmdldFwiOjM0LFwia2V5ZnJhbWVzXCI6e1wieFwiOlt7XCJ2YWx1ZVwiOjM2NyxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwieFwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjM2NyxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwieFwiLFwiaW5kZXhcIjoxMH0se1widmFsdWVcIjozNjcsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInhcIixcImluZGV4XCI6MjV9XSxcInZpc2libGVcIjpbe1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoxMH0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoxNX0se1widmFsdWVcIjpmYWxzZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MjV9LHtcInZhbHVlXCI6dHJ1ZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MzB9XSxcInJvdGF0aW9uXCI6W3tcInZhbHVlXCI6MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwicm90YXRpb25cIixcImluZGV4XCI6MH0se1widmFsdWVcIjowLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjoxMH0se1widmFsdWVcIjo3LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjoxNX0se1widmFsdWVcIjo3LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjoyNX0se1widmFsdWVcIjowLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjozMH1dfX1dLFwibmFtZVwiOlwiaWRsZVwiLFwiaWRcIjoxLFwiZnJhbWVSYXRlXCI6MjQsXCJhY3Rpb25cIjowfV0sXCJsb2FkTGlzdFwiOltcInJlcy9yZXNvdXJjZS9iYXNlL2xvdHRlcnkvaW1nX2xvdHRlcnlfY29udGVudC5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL2xvdHRlcnkvaW1nX2xvdHRlcnlfYm9yZGVyLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2UvbG90dGVyeS9pbWdfbG90dGVyeV9saWdodC5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL2xvdHRlcnkvaW1nX2xvdHRlcnlfYXJyb3cucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9sb3R0ZXJ5L2ltZ19sb3R0ZXJ5X2NhdC5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL2xvdHRlcnkvYnRuX2xvdHRlcnlfc3RhcnQucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9jb20vYnRuX2NvbW1vbl80LnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2UvbG90dGVyeS9pbWdfbG90dGVyeV9zdGFyLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2UvY29tL2J0bl9jbG9zZS5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGxvdHRlcnlVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnZpZXcuY29tLmxvdHRlcnlVSVwiLGxvdHRlcnlVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgcmFua1VJIGV4dGVuZHMgRGlhbG9nQmFzZSB7XHJcblx0XHRwdWJsaWMgYnRuQ2xvc2U6QnV0dG9uO1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJEaWFsb2dCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwiaGVpZ2h0XCI6MTYyNH0sXCJjb21wSWRcIjoyLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjgxMixcInhcIjozNzUsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9yYW5rL2ltZ19yYW5rX2JnLnBuZ1wiLFwibGF5b3V0RW5hYmxlZFwiOnRydWUsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo0LFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjE2NSxcInhcIjoxNjMsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9yYW5rL2ltZ190aXRsZS5wbmdcIn0sXCJjb21wSWRcIjoxMH0se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjoxOTgsXCJ4XCI6NTgzLFwidmFyXCI6XCJidG5DbG9zZVwiLFwic3RhdGVOdW1cIjoxLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvY29tL2J0bl9jbG9zZS5wbmdcIixcInNjYWxlWVwiOjEuMSxcInNjYWxlWFwiOjEuMSxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjV9XX0se1widHlwZVwiOlwiV1hPcGVuRGF0YVZpZXdlclwiLFwicHJvcHNcIjp7XCJ5XCI6MzgxLFwieFwiOjExNixcIndpZHRoXCI6NTI0LFwibW91c2VUaHJvdWdoXCI6dHJ1ZSxcImljb25TaWduXCI6XCJ3eFwiLFwiaGVpZ2h0XCI6ODU4LFwicnVudGltZVwiOlwibGF5YS51aS5XWE9wZW5EYXRhVmlld2VyXCJ9LFwiY29tcElkXCI6M31dLFwibG9hZExpc3RcIjpbXCJyZXMvcmVzb3VyY2UvYmFzZS9yYW5rL2ltZ19yYW5rX2JnLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2UvcmFuay9pbWdfdGl0bGUucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9jb20vYnRuX2Nsb3NlLnBuZ1wiXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcocmFua1VJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5jb20ucmFua1VJXCIscmFua1VJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBzaG9wVUkgZXh0ZW5kcyBEaWFsb2dCYXNlIHtcclxuXHRcdHB1YmxpYyBidG5Ib21lOkJ1dHRvbjtcblx0XHRwdWJsaWMgYm94X3Nob3A6SW1hZ2U7XG5cdFx0cHVibGljIHAxOlBhbmVsO1xuXHRcdHB1YmxpYyBscDE6TGFiZWw7XG5cdFx0cHVibGljIGhpZ2gxOkltYWdlO1xuXHRcdHB1YmxpYyBocDE6TGFiZWw7XG5cdFx0cHVibGljIGljb24xOkltYWdlO1xuXHRcdHB1YmxpYyBwMjpQYW5lbDtcblx0XHRwdWJsaWMgbHAyOkxhYmVsO1xuXHRcdHB1YmxpYyBoaWdoMjpJbWFnZTtcblx0XHRwdWJsaWMgaHAyOkxhYmVsO1xuXHRcdHB1YmxpYyBpY29uMjpJbWFnZTtcblx0XHRwdWJsaWMgcDA6UGFuZWw7XG5cdFx0cHVibGljIGxwMDpMYWJlbDtcblx0XHRwdWJsaWMgaGlnaDA6SW1hZ2U7XG5cdFx0cHVibGljIGhwMDpMYWJlbDtcblx0XHRwdWJsaWMgaWNvbjA6SW1hZ2U7XG5cdFx0cHVibGljIHAzOlBhbmVsO1xuXHRcdHB1YmxpYyBscDM6TGFiZWw7XG5cdFx0cHVibGljIGhpZ2gzOkltYWdlO1xuXHRcdHB1YmxpYyBocDM6TGFiZWw7XG5cdFx0cHVibGljIGljb24zOkltYWdlO1xuXHRcdHB1YmxpYyBwNDpQYW5lbDtcblx0XHRwdWJsaWMgbHA0OkxhYmVsO1xuXHRcdHB1YmxpYyBoaWdoNDpJbWFnZTtcblx0XHRwdWJsaWMgaHA0OkxhYmVsO1xuXHRcdHB1YmxpYyBpY29uNDpJbWFnZTtcblx0XHRwdWJsaWMgbGlzdDE6TGlzdDtcblx0XHRwdWJsaWMgbGlzdDI6TGlzdDtcblx0XHRwdWJsaWMgbGlzdDA6TGlzdDtcblx0XHRwdWJsaWMgbGlzdDM6TGlzdDtcblx0XHRwdWJsaWMgbGlzdDQ6TGlzdDtcblx0XHRwdWJsaWMgYnRuR2V0T2ZmOkJ1dHRvbjtcblx0XHRwdWJsaWMgYnRuVW5sb2NrOkJ1dHRvbjtcblx0XHRwdWJsaWMgYnRuTG9jazpCdXR0b247XG5cdFx0cHVibGljIGxibE5leHROZWVkOkxhYmVsO1xuXHRcdHB1YmxpYyBidG5DaGFuZ2VTa2luOkJ1dHRvbjtcblx0XHRwdWJsaWMgYnRuQ2hhbmdlQWNjOkJ1dHRvbjtcblx0XHRwdWJsaWMgaW1nSW5mbzpJbWFnZTtcblx0XHRwdWJsaWMgaW1nQXZhdGFyOkltYWdlO1xuXHRcdHB1YmxpYyBsYmxOYW1lOkxhYmVsO1xuXHRcdHB1YmxpYyBsYmxydW46TGFiZWw7XG5cdFx0cHVibGljIGltZ2EwOkltYWdlO1xuXHRcdHB1YmxpYyBsYmxhMDpMYWJlbDtcblx0XHRwdWJsaWMgaW1nYTE6SW1hZ2U7XG5cdFx0cHVibGljIGxibGExOkxhYmVsO1xuXHRcdHB1YmxpYyBpbWdhMjpJbWFnZTtcblx0XHRwdWJsaWMgbGJsYTI6TGFiZWw7XG5cdFx0cHVibGljIGxibGRzZXg6TGFiZWw7XG5cdFx0cHVibGljIGxibGRncm91cDpMYWJlbDtcblx0XHRwdWJsaWMgbGJsZGluZm86TGFiZWw7XG5cdFx0cHVibGljIGJ0bkNsb3NlMTpCdXR0b247XG5cdFx0cHVibGljIHN0YXIwOkltYWdlO1xuXHRcdHB1YmxpYyBzdGFyMTpJbWFnZTtcblx0XHRwdWJsaWMgc3RhcjI6SW1hZ2U7XG5cdFx0cHVibGljIHN0YXIzOkltYWdlO1xuXHRcdHB1YmxpYyBzdGFyNDpJbWFnZTtcblx0XHRwdWJsaWMgc3RhcjU6SW1hZ2U7XG5cdFx0cHVibGljIGltZ0luZm9TZXg6SW1hZ2U7XG5cdFx0cHVibGljIGltZ0dldDpJbWFnZTtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiRGlhbG9nQmFzZVwiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjc1MCxcIm1vdXNlVGhyb3VnaFwiOnRydWUsXCJoZWlnaHRcIjoxNjI0fSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1widmFyXCI6XCJidG5Ib21lXCIsXCJ0b3BcIjo4MixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL2NvbS9idG5faG9tZS5wbmdcIixcImxlZnRcIjoyOCxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjQ0fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ2YXJcIjpcImJveF9zaG9wXCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2ltZ19ib3hfYmcucG5nXCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImJvdHRvbVwiOjAsXCJhbHBoYVwiOjB9LFwiY29tcElkXCI6NCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIlBhbmVsXCIsXCJwcm9wc1wiOntcInlcIjo3NjgsXCJ4XCI6MCxcIndpZHRoXCI6MTQ3LFwidmFyXCI6XCJwMVwiLFwicGl2b3RZXCI6MTYzLFwiaGVpZ2h0XCI6MTYzLFwiYm90dG9tXCI6MH0sXCJjb21wSWRcIjoxNCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoxMjAsXCJ4XCI6MTA1LFwid29yZFdyYXBcIjp0cnVlLFwidmFyXCI6XCJscDFcIixcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0ZXh0XCI6XCIwXCIsXCJsZWFkaW5nXCI6MTAsXCJncmF5XCI6ZmFsc2UsXCJmb250U2l6ZVwiOjE4LFwiY29sb3JcIjpcIiNkNzMyNTNcIixcImJvbGRcIjp0cnVlLFwiYW5jaG9yWVwiOjEsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6NzF9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxNjMsXCJ4XCI6MCxcIndpZHRoXCI6MTQ3LFwidmFyXCI6XCJoaWdoMVwiLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9tZW51L2ltZ19idG5faGlnaF8wMS5wbmdcIixcInBpdm90WVwiOjE2MyxcImhlaWdodFwiOjE2M30sXCJjb21wSWRcIjoxMjQsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ5XCI6MTI3LFwieFwiOjk4LFwid29yZFdyYXBcIjp0cnVlLFwid2lkdGhcIjoyNyxcInZhclwiOlwiaHAxXCIsXCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidGV4dFwiOlwiMFwiLFwic3Ryb2tlQ29sb3JcIjpcIiNmYWQxNDFcIixcInN0cm9rZVwiOjIsXCJwaXZvdFlcIjozMCxcIm92ZXJmbG93XCI6XCJzY3JvbGxcIixcImxlYWRpbmdcIjoxMCxcImhlaWdodFwiOjMwLFwiZ3JheVwiOmZhbHNlLFwiZm9udFNpemVcIjoyMCxcImNvbG9yXCI6XCIjMmQyYTJhXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjo3OH1dfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MjksXCJ2YXJcIjpcImljb24xXCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvY2F0L2NhdE5ldy9pbWFnZV9pY29uX3JlZF8xLnBuZ1wiLFwic2NhbGVZXCI6MC43LFwic2NhbGVYXCI6MC43LFwicmlnaHRcIjoxMH0sXCJjb21wSWRcIjoxMzB9XX0se1widHlwZVwiOlwiUGFuZWxcIixcInByb3BzXCI6e1wieVwiOjc3MCxcInhcIjoxNDcsXCJ3aWR0aFwiOjEzMCxcInZhclwiOlwicDJcIixcInBpdm90WVwiOjE1MCxcImhlaWdodFwiOjE1MCxcImJvdHRvbVwiOjB9LFwiY29tcElkXCI6MTUsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ5XCI6MTA3LFwieFwiOjg1LFwid29yZFdyYXBcIjp0cnVlLFwid2lkdGhcIjoxNyxcInZhclwiOlwibHAyXCIsXCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidGV4dFwiOlwiMFwiLFwib3ZlcmZsb3dcIjpcInNjcm9sbFwiLFwibGVhZGluZ1wiOjEwLFwiaGVpZ2h0XCI6MjgsXCJncmF5XCI6ZmFsc2UsXCJmb250U2l6ZVwiOjE4LFwiY29sb3JcIjpcIiNkNzMyNTNcIixcImJvbGRcIjp0cnVlLFwiYW5jaG9yWVwiOjEsXCJhbmNob3JYXCI6MCxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjo3Mn0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjE1MCxcInhcIjowLFwidmFyXCI6XCJoaWdoMlwiLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9tZW51L2ltZ19idG5faGlnaF8wMi5wbmdcIixcInBpdm90WVwiOjE1MCxcImhlaWdodFwiOjE1MH0sXCJjb21wSWRcIjoxMjUsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ5XCI6MTE1LFwieFwiOjg4LFwid29yZFdyYXBcIjp0cnVlLFwid2lkdGhcIjoyNixcInZhclwiOlwiaHAyXCIsXCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidGV4dFwiOlwiMFwiLFwic3Ryb2tlQ29sb3JcIjpcIiNmYWQxNDFcIixcInN0cm9rZVwiOjIsXCJwaXZvdFlcIjozMCxcIm92ZXJmbG93XCI6XCJzY3JvbGxcIixcImxlYWRpbmdcIjoxMCxcImhlaWdodFwiOjMwLFwiZ3JheVwiOmZhbHNlLFwiZm9udFNpemVcIjoyMCxcImNvbG9yXCI6XCIjMmQyYTJhXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjo3N31dfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MTYsXCJ2YXJcIjpcImljb24yXCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvY2F0L2NhdE5ldy9pbWFnZV9pY29uX3JlZF8xLnBuZ1wiLFwic2NhbGVZXCI6MC43LFwic2NhbGVYXCI6MC43LFwicmlnaHRcIjoxMH0sXCJjb21wSWRcIjoxMzF9XX0se1widHlwZVwiOlwiUGFuZWxcIixcInByb3BzXCI6e1wieVwiOjc3MCxcInhcIjoyNzcsXCJ3aWR0aFwiOjE5NixcInZhclwiOlwicDBcIixcInBpdm90WVwiOjE1MCxcImhlaWdodFwiOjE1MCxcImJvdHRvbVwiOjB9LFwiY29tcElkXCI6MTYsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ5XCI6MTAzLFwieFwiOjEzNCxcIndvcmRXcmFwXCI6dHJ1ZSxcIndpZHRoXCI6MjEsXCJ2YXJcIjpcImxwMFwiLFwidmFsaWduXCI6XCJtaWRkbGVcIixcInRleHRcIjpcIjFcIixcIm92ZXJmbG93XCI6XCJzY3JvbGxcIixcImxlYWRpbmdcIjoxMCxcImhlaWdodFwiOjI4LFwiZ3JheVwiOmZhbHNlLFwiZm9udFNpemVcIjoxOCxcImNvbG9yXCI6XCIjZDczMjUzXCIsXCJib2xkXCI6dHJ1ZSxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41LFwiYWxpZ25cIjpcImNlbnRlclwifSxcImNvbXBJZFwiOjczfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MTUwLFwieFwiOjAsXCJ3aWR0aFwiOjE5NixcInZhclwiOlwiaGlnaDBcIixcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL3Nob3AvbWVudS9pbWdfYnRuX2hpZ2hfMDMucG5nXCIsXCJwaXZvdFlcIjoxNTAsXCJoZWlnaHRcIjoxNTB9LFwiY29tcElkXCI6MTI2LFwiY2hpbGRcIjpbe1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOjExMyxcInhcIjoxMTcsXCJ3b3JkV3JhcFwiOnRydWUsXCJ3aWR0aFwiOjMwLFwidmFyXCI6XCJocDBcIixcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0ZXh0XCI6XCIxXCIsXCJzdHJva2VDb2xvclwiOlwiI2ZhZDE0MVwiLFwic3Ryb2tlXCI6MixcInBpdm90WVwiOjMwLFwib3ZlcmZsb3dcIjpcInNjcm9sbFwiLFwibGVhZGluZ1wiOjEwLFwiaGVpZ2h0XCI6MzAsXCJncmF5XCI6ZmFsc2UsXCJmb250U2l6ZVwiOjIwLFwiY29sb3JcIjpcIiMyZDJhMmFcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwifSxcImNvbXBJZFwiOjc2fV19LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxNixcInZhclwiOlwiaWNvbjBcIixcInNraW5cIjpcInJlcy9yZXNvdXJjZS9jYXQvY2F0TmV3L2ltYWdlX2ljb25fcmVkXzEucG5nXCIsXCJzY2FsZVlcIjowLjcsXCJzY2FsZVhcIjowLjcsXCJyaWdodFwiOjE2fSxcImNvbXBJZFwiOjEzMn1dfSx7XCJ0eXBlXCI6XCJQYW5lbFwiLFwicHJvcHNcIjp7XCJ5XCI6NzcwLFwieFwiOjQ3MyxcIndpZHRoXCI6MTMxLFwidmFyXCI6XCJwM1wiLFwicGl2b3RZXCI6MTUwLFwiaGVpZ2h0XCI6MTUwLFwiYm90dG9tXCI6MH0sXCJjb21wSWRcIjoxNyxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoxMDYsXCJ4XCI6ODYsXCJ3b3JkV3JhcFwiOnRydWUsXCJ3aWR0aFwiOjE5LFwidmFyXCI6XCJscDNcIixcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0ZXh0XCI6XCIwXCIsXCJvdmVyZmxvd1wiOlwic2Nyb2xsXCIsXCJsZWFkaW5nXCI6MTAsXCJoZWlnaHRcIjoyOCxcImdyYXlcIjpmYWxzZSxcImZvbnRTaXplXCI6MTgsXCJjb2xvclwiOlwiI2Q3MzI1M1wiLFwiYm9sZFwiOnRydWUsXCJhbmNob3JZXCI6MSxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjo3NH0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjE1MCxcInhcIjowLFwid2lkdGhcIjoxMzEsXCJ2YXJcIjpcImhpZ2gzXCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL21lbnUvaW1nX2J0bl9oaWdoXzA0LnBuZ1wiLFwicGl2b3RZXCI6MTUwLFwiaGVpZ2h0XCI6MTUwfSxcImNvbXBJZFwiOjEyNyxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoxMTQsXCJ4XCI6ODgsXCJ3b3JkV3JhcFwiOnRydWUsXCJ3aWR0aFwiOjI2LFwidmFyXCI6XCJocDNcIixcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0ZXh0XCI6XCIwXCIsXCJzdHJva2VDb2xvclwiOlwiI2ZhZDE0MVwiLFwic3Ryb2tlXCI6MixcInBpdm90WVwiOjMwLFwib3ZlcmZsb3dcIjpcInNjcm9sbFwiLFwibGVhZGluZ1wiOjEwLFwiaGVpZ2h0XCI6MzAsXCJncmF5XCI6ZmFsc2UsXCJmb250U2l6ZVwiOjIwLFwiY29sb3JcIjpcIiMyZDJhMmFcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwifSxcImNvbXBJZFwiOjc1fV19LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxNixcInZhclwiOlwiaWNvbjNcIixcInNraW5cIjpcInJlcy9yZXNvdXJjZS9jYXQvY2F0TmV3L2ltYWdlX2ljb25fcmVkXzEucG5nXCIsXCJzY2FsZVlcIjowLjcsXCJzY2FsZVhcIjowLjcsXCJyaWdodFwiOjEwfSxcImNvbXBJZFwiOjEzM31dfSx7XCJ0eXBlXCI6XCJQYW5lbFwiLFwicHJvcHNcIjp7XCJ5XCI6NzcwLFwieFwiOjYwNCxcIndpZHRoXCI6MTQ2LFwidmFyXCI6XCJwNFwiLFwicGl2b3RZXCI6MTYzLFwiaGVpZ2h0XCI6MTYzLFwiYm90dG9tXCI6MH0sXCJjb21wSWRcIjoxOCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoxMjAsXCJ4XCI6OTEsXCJ3b3JkV3JhcFwiOnRydWUsXCJ3aWR0aFwiOjE3LFwidmFyXCI6XCJscDRcIixcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0ZXh0XCI6XCIwXCIsXCJwaXZvdFlcIjoyOCxcIm92ZXJmbG93XCI6XCJzY3JvbGxcIixcImxlYWRpbmdcIjoxMCxcImhlaWdodFwiOjI4LFwiZ3JheVwiOmZhbHNlLFwiZm9udFNpemVcIjoxOCxcImNvbG9yXCI6XCIjZDczMjUzXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjo3MH0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjE2MyxcInhcIjowLFwid2lkdGhcIjoxNDYsXCJ2YXJcIjpcImhpZ2g0XCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL21lbnUvaW1nX2J0bl9oaWdoXzA1LnBuZ1wiLFwicGl2b3RZXCI6MTYzLFwiaGVpZ2h0XCI6MTYzfSxcImNvbXBJZFwiOjEyOCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoxMjYsXCJ4XCI6MTAxLFwid29yZFdyYXBcIjp0cnVlLFwid2lkdGhcIjoyMCxcInZhclwiOlwiaHA0XCIsXCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidGV4dFwiOlwiMFwiLFwic3Ryb2tlQ29sb3JcIjpcIiNmYWQxNDFcIixcInN0cm9rZVwiOjIsXCJwaXZvdFlcIjozMCxcIm92ZXJmbG93XCI6XCJzY3JvbGxcIixcImxlYWRpbmdcIjoxMCxcImhlaWdodFwiOjMwLFwiZ3JheVwiOmZhbHNlLFwiZm9udFNpemVcIjoyMCxcImNvbG9yXCI6XCIjMmQyYTJhXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjo2OX1dfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MjksXCJ2YXJcIjpcImljb240XCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvY2F0L2NhdE5ldy9pbWFnZV9pY29uX3JlZF8xLnBuZ1wiLFwic2NhbGVZXCI6MC43LFwic2NhbGVYXCI6MC43LFwicmlnaHRcIjoxNn0sXCJjb21wSWRcIjoxMzR9XX0se1widHlwZVwiOlwiTGlzdFwiLFwicHJvcHNcIjp7XCJ5XCI6NTksXCJ2aXNpYmxlXCI6ZmFsc2UsXCJ2YXJcIjpcImxpc3QxXCIsXCJyaWdodFwiOjAsXCJyZXBlYXRYXCI6MSxcImxlZnRcIjowLFwiaGVpZ2h0XCI6NTU4LFwiZWxhc3RpY0VuYWJsZWRcIjp0cnVlfSxcImNvbXBJZFwiOjExLFwiY2hpbGRcIjpbe1widHlwZVwiOlwic2hvcGl0ZW1cIixcInByb3BzXCI6e1wieVwiOjAsXCJydW50aW1lXCI6XCJjbGllbnQvYmFzZS9pdGVtL1Nob3BJdGVtLnRzXCIsXCJyaWdodFwiOjAsXCJyZW5kZXJUeXBlXCI6XCJyZW5kZXJcIixcImxlZnRcIjowfSxcImNvbXBJZFwiOjEyfV19LHtcInR5cGVcIjpcIkxpc3RcIixcInByb3BzXCI6e1wieVwiOjYwLFwidmlzaWJsZVwiOmZhbHNlLFwidmFyXCI6XCJsaXN0MlwiLFwicmlnaHRcIjowLFwicmVwZWF0WFwiOjEsXCJsZWZ0XCI6MCxcImhlaWdodFwiOjU1OCxcImVsYXN0aWNFbmFibGVkXCI6dHJ1ZX0sXCJjb21wSWRcIjoyMixcImNoaWxkXCI6W3tcInR5cGVcIjpcInNob3BpdGVtXCIsXCJwcm9wc1wiOntcInlcIjowLFwicnVudGltZVwiOlwiY2xpZW50L2Jhc2UvaXRlbS9TaG9wSXRlbS50c1wiLFwicmlnaHRcIjowLFwicmVuZGVyVHlwZVwiOlwicmVuZGVyXCIsXCJsZWZ0XCI6MH0sXCJjb21wSWRcIjoyNH1dfSx7XCJ0eXBlXCI6XCJMaXN0XCIsXCJwcm9wc1wiOntcInlcIjo2MCxcInZhclwiOlwibGlzdDBcIixcInJpZ2h0XCI6MCxcInJlcGVhdFhcIjoxLFwibGVmdFwiOjAsXCJoZWlnaHRcIjo1NTgsXCJlbGFzdGljRW5hYmxlZFwiOnRydWV9LFwiY29tcElkXCI6MjgsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJzaG9waXRlbVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInJ1bnRpbWVcIjpcImNsaWVudC9iYXNlL2l0ZW0vU2hvcEl0ZW0udHNcIixcInJpZ2h0XCI6MCxcInJlbmRlclR5cGVcIjpcInJlbmRlclwiLFwibGVmdFwiOjB9LFwiY29tcElkXCI6MzB9XX0se1widHlwZVwiOlwiTGlzdFwiLFwicHJvcHNcIjp7XCJ5XCI6NjAsXCJ2aXNpYmxlXCI6ZmFsc2UsXCJ2YXJcIjpcImxpc3QzXCIsXCJyaWdodFwiOjAsXCJyZXBlYXRYXCI6MSxcImxlZnRcIjowLFwiaGVpZ2h0XCI6NTU4LFwiZWxhc3RpY0VuYWJsZWRcIjp0cnVlfSxcImNvbXBJZFwiOjMxLFwiY2hpbGRcIjpbe1widHlwZVwiOlwic2hvcGl0ZW1cIixcInByb3BzXCI6e1wieVwiOjAsXCJydW50aW1lXCI6XCJjbGllbnQvYmFzZS9pdGVtL1Nob3BJdGVtLnRzXCIsXCJyaWdodFwiOjAsXCJyZW5kZXJUeXBlXCI6XCJyZW5kZXJcIixcImxlZnRcIjowfSxcImNvbXBJZFwiOjMzfV19LHtcInR5cGVcIjpcIkxpc3RcIixcInByb3BzXCI6e1wieVwiOjYwLFwidmlzaWJsZVwiOmZhbHNlLFwidmFyXCI6XCJsaXN0NFwiLFwicmlnaHRcIjowLFwicmVwZWF0WFwiOjEsXCJsZWZ0XCI6MCxcImhlaWdodFwiOjU1OCxcImVsYXN0aWNFbmFibGVkXCI6dHJ1ZX0sXCJjb21wSWRcIjozNCxcImNoaWxkXCI6W3tcInR5cGVcIjpcInNob3BpdGVtXCIsXCJwcm9wc1wiOntcInlcIjowLFwicnVudGltZVwiOlwiY2xpZW50L2Jhc2UvaXRlbS9TaG9wSXRlbS50c1wiLFwicmlnaHRcIjowLFwicmVuZGVyVHlwZVwiOlwicmVuZGVyXCIsXCJsZWZ0XCI6MH0sXCJjb21wSWRcIjozNn1dfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NTk3LjUsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2ltZ19ib3hfYnRtLnBuZ1wiLFwicmlnaHRcIjowLFwibGVmdFwiOjB9LFwiY29tcElkXCI6MTEyfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NDYuNSxcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL3Nob3AvaW1nX2JveF90b3AucG5nXCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MH0sXCJjb21wSWRcIjoxMTN9LHtcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6LTgsXCJ4XCI6NjQ5LFwid2lkdGhcIjoxNTMsXCJ2YXJcIjpcImJ0bkdldE9mZlwiLFwic3RhdGVOdW1cIjoxLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9idG5fZ2V0T2ZmLnBuZ1wiLFwicGl2b3RZXCI6NzYsXCJwaXZvdFhcIjo3NyxcImhlaWdodFwiOjEwOX0sXCJjb21wSWRcIjoxMzV9LHtcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6LTIwLFwidmFyXCI6XCJidG5VbmxvY2tcIixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL3Nob3AvYnRuX3VubG9jay5wbmdcIixcInJpZ2h0XCI6MjYsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo2M30se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjotMjAsXCJ2YXJcIjpcImJ0bkxvY2tcIixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL3Nob3AvYnRuX25vdHVubG9jay5wbmdcIixcInJpZ2h0XCI6MjYsXCJtb3VzZUVuYWJsZWRcIjpmYWxzZSxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjY0LFwiY2hpbGRcIjpbe1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOjE0LFwieFwiOjc4LjUsXCJ2YXJcIjpcImxibE5leHROZWVkXCIsXCJ0ZXh0XCI6XCIxMFwiLFwic3Ryb2tlQ29sb3JcIjpcIiNmZGZiZmJcIixcInN0cm9rZVwiOjQsXCJwaXZvdFlcIjowLFwiZm9udFNpemVcIjoyNCxcImNvbG9yXCI6XCIjNjQyNzI2XCIsXCJib2xkXCI6dHJ1ZSxcImFuY2hvclhcIjoxfSxcImNvbXBJZFwiOjY1fV19LHtcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6LTE5LFwidmFyXCI6XCJidG5DaGFuZ2VTa2luXCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2J0bl9jaGFuZ2VfY2F0LnBuZ1wiLFwicmlnaHRcIjoyNixcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjY2fSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOi0xOSxcInZhclwiOlwiYnRuQ2hhbmdlQWNjXCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2J0bl9jaGFuZ2VfaXRlbS5wbmdcIixcInJpZ2h0XCI6MzAsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo2OH1dfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ2aXNpYmxlXCI6ZmFsc2UsXCJ2YXJcIjpcImltZ0luZm9cIixcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL2NvbS9kaWFsb2cvaW1nX291dHNpZGVfYm94LnBuZ1wiLFwicmlnaHRcIjowLFwicGl2b3RZXCI6ODk5LFwicGl2b3RYXCI6Mzg0LFwibGVmdFwiOjAsXCJoZWlnaHRcIjo4OTksXCJib3R0b21cIjo0OH0sXCJjb21wSWRcIjo4MCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxMzQsXCJ4XCI6NDAsXCJ3aWR0aFwiOjY4NixcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL2NvbS9kaWFsb2cvaW1nX0luc2lkZV9ib3gucG5nXCIsXCJoZWlnaHRcIjo2OTB9LFwiY29tcElkXCI6ODF9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozMzIsXCJ4XCI6NTgsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9jb20vZGlhbG9nL2ltZ19pbnNpZGVfYm94X2JsdWUucG5nXCJ9LFwiY29tcElkXCI6ODR9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxNTMsXCJ4XCI6MzIxLjUsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2ltZ19hdmF0YXJfYm94LnBuZ1wifSxcImNvbXBJZFwiOjg1LFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjI1LFwieFwiOjIuNSxcInZhclwiOlwiaW1nQXZhdGFyXCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2F2YXRhci9pbWdfYXZhdGFyXzAucG5nXCJ9LFwiY29tcElkXCI6ODZ9XX0se1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOjMxMS41LFwieFwiOjM4NC41LFwidmFyXCI6XCJsYmxOYW1lXCIsXCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidGV4dFwiOlwi5p+v5Y2X6aKG57uTXCIsXCJzdHJva2VDb2xvclwiOlwiI2ZhZDE0MVwiLFwic3Ryb2tlXCI6NixcImxlYWRpbmdcIjoxMCxcImdyYXlcIjpmYWxzZSxcImZvbnRTaXplXCI6MjksXCJmb250XCI6XCJBcmlhbFwiLFwiY29sb3JcIjpcIiMyZDJhMmFcIixcImJvbGRcIjp0cnVlLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjUsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6MTExfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NDI5LFwieFwiOjIzMi41LFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9pbWdfcnVuX2JnLnBuZ1wifSxcImNvbXBJZFwiOjExOCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjo4LjUsXCJ4XCI6MTM0LFwidmFyXCI6XCJsYmxydW5cIixcInRleHRcIjpcIjUwJVwiLFwic3Ryb2tlQ29sb3JcIjpcIiNmZGZiZmJcIixcInN0cm9rZVwiOjQsXCJwaXZvdFlcIjowLFwiZm9udFNpemVcIjoyNCxcImNvbG9yXCI6XCIjNjQyNzI2XCIsXCJib2xkXCI6dHJ1ZSxcImFuY2hvclhcIjowfSxcImNvbXBJZFwiOjExOX1dfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MzYyLFwieFwiOjIzNSxcInZhclwiOlwiaW1nYTBcIixcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL3Nob3AvaW1nX2JhbGxfYmx1ZS5wbmdcIn0sXCJjb21wSWRcIjo4OCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoyNCxcInhcIjo1MSxcInZhclwiOlwibGJsYTBcIixcInRleHRcIjpcIjFcIixcInN0cm9rZVwiOjQsXCJwaXZvdFlcIjoxNSxcInBpdm90WFwiOjM0LFwiZm9udFNpemVcIjoyNCxcImNvbG9yXCI6XCIjZmJmOGY4XCIsXCJib2xkXCI6dHJ1ZX0sXCJjb21wSWRcIjo5MX1dfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MzYzLFwieFwiOjMxMCxcInZhclwiOlwiaW1nYTFcIixcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL3Nob3AvaW1nX2JhbGxfYmx1ZS5wbmdcIn0sXCJjb21wSWRcIjo4OSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoyNCxcInhcIjo1MSxcInZhclwiOlwibGJsYTFcIixcInRleHRcIjpcIjFcIixcInN0cm9rZVwiOjQsXCJwaXZvdFlcIjoxNSxcInBpdm90WFwiOjM0LFwiZm9udFNpemVcIjoyNCxcImNvbG9yXCI6XCIjZmJmOGY4XCIsXCJib2xkXCI6dHJ1ZX0sXCJjb21wSWRcIjo5Mn1dfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MzYzLFwieFwiOjM4MSxcInZhclwiOlwiaW1nYTJcIixcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL3Nob3AvaW1nX2JhbGxfcmVkLnBuZ1wifSxcImNvbXBJZFwiOjkwLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOjI0LjUsXCJ4XCI6NTEsXCJ2YXJcIjpcImxibGEyXCIsXCJ0ZXh0XCI6XCIxXCIsXCJzdHJva2VcIjo0LFwicGl2b3RZXCI6MTUsXCJwaXZvdFhcIjozNCxcImZvbnRTaXplXCI6MjQsXCJjb2xvclwiOlwiI2ZiZjhmOFwiLFwiYm9sZFwiOnRydWV9LFwiY29tcElkXCI6OTN9XX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjUwLFwieFwiOjMxMixcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL2NvbS90ZXh0L2ltZ19kYW5nYW5fdGl0bGUucG5nXCJ9LFwiY29tcElkXCI6OTV9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjo1MTAsXCJ4XCI6MjM1LFwid29yZFdyYXBcIjp0cnVlLFwidmFyXCI6XCJsYmxkc2V4XCIsXCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidGV4dFwiOlwiMTExMTFcIixcIm92ZXJmbG93XCI6XCJzY3JvbGxcIixcImxlYWRpbmdcIjoxMCxcImdyYXlcIjpmYWxzZSxcImZvbnRTaXplXCI6MjIsXCJjb2xvclwiOlwiIzIzMzM1Y1wiLFwiYm9sZFwiOnRydWUsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6OTZ9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjo1NzEsXCJ4XCI6MjM1LFwid29yZFdyYXBcIjp0cnVlLFwidmFyXCI6XCJsYmxkZ3JvdXBcIixcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0ZXh0XCI6XCIxMTExMVwiLFwib3ZlcmZsb3dcIjpcInNjcm9sbFwiLFwibGVhZGluZ1wiOjEwLFwiZ3JheVwiOmZhbHNlLFwiZm9udFNpemVcIjoyMixcImNvbG9yXCI6XCIjMjMzMzVjXCIsXCJib2xkXCI6dHJ1ZSxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MCxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjo5N30se1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOjY5MixcInhcIjoyMzIuNSxcIndvcmRXcmFwXCI6dHJ1ZSxcIndpZHRoXCI6NDAwLFwidmFyXCI6XCJsYmxkaW5mb1wiLFwidmFsaWduXCI6XCJ0b3BcIixcInRleHRcIjpcIjExMTExXCIsXCJvdmVyZmxvd1wiOlwidmlzaWJsZVwiLFwibGVhZGluZ1wiOjEwLFwiaGVpZ2h0XCI6MTQwLFwiZ3JheVwiOmZhbHNlLFwiZm9udFNpemVcIjoyMixcImNvbG9yXCI6XCIjMjMzMzVjXCIsXCJib2xkXCI6dHJ1ZSxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MCxcImFsaWduXCI6XCJsZWZ0XCJ9LFwiY29tcElkXCI6OTh9LHtcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6NzQsXCJ4XCI6Njg3LFwidmFyXCI6XCJidG5DbG9zZTFcIixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL2NvbS9idG5fY2xvc2UucG5nXCIsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo5OX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wiek9yZGVyXCI6MCxcInlcIjo3NzEsXCJ4XCI6Mjc5LFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvbG90dGVyeS9pbWdfbG90dGVyeV9jYXQucG5nXCJ9LFwiY29tcElkXCI6MTAwLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjEyLFwieFwiOi0zNy41LFwidmFyXCI6XCJzdGFyMFwiLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvbG90dGVyeS9pbWdfbG90dGVyeV9zdGFyLnBuZ1wiLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6MTA0fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NjAsXCJ4XCI6MTQsXCJ2YXJcIjpcInN0YXIxXCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9sb3R0ZXJ5L2ltZ19sb3R0ZXJ5X3N0YXIucG5nXCIsXCJzY2FsZVlcIjowLjcsXCJzY2FsZVhcIjowLjcsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjoxMDV9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo5NyxcInhcIjotMzcsXCJ2YXJcIjpcInN0YXIyXCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9sb3R0ZXJ5L2ltZ19sb3R0ZXJ5X3N0YXIucG5nXCIsXCJzY2FsZVlcIjowLjcsXCJzY2FsZVhcIjowLjcsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjoxMDZ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo1NCxcInhcIjoyMTgsXCJ2YXJcIjpcInN0YXIzXCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9sb3R0ZXJ5L2ltZ19sb3R0ZXJ5X3N0YXIucG5nXCIsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjoxMDd9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxMSxcInhcIjoyNjcsXCJ2YXJcIjpcInN0YXI0XCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9sb3R0ZXJ5L2ltZ19sb3R0ZXJ5X3N0YXIucG5nXCIsXCJzY2FsZVlcIjowLjcsXCJzY2FsZVhcIjowLjcsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjoxMDh9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxMDgsXCJ4XCI6MjcxLFwidmFyXCI6XCJzdGFyNVwiLFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2UvbG90dGVyeS9pbWdfbG90dGVyeV9zdGFyLnBuZ1wiLFwic2NhbGVZXCI6MC43LFwic2NhbGVYXCI6MC43LFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6MTA5fV19LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozNzEsXCJ4XCI6OTgsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL21lbnUvaW1nX3RleHRfMS5wbmdcIn0sXCJjb21wSWRcIjoxMTR9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo0OTMsXCJ4XCI6MTI3LFwidmFyXCI6XCJpbWdJbmZvU2V4XCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL21lbnUvaW1nX3RleHRfMi5wbmdcIn0sXCJjb21wSWRcIjoxMTV9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo1NTgsXCJ4XCI6MTI3LFwic2tpblwiOlwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9tZW51L2ltZ190ZXh0XzMucG5nXCJ9LFwiY29tcElkXCI6MTE2fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NjI0LFwieFwiOjEyNyxcInNraW5cIjpcInJlcy9yZXNvdXJjZS9iYXNlL3Nob3AvbWVudS9pbWdfdGV4dF80LnBuZ1wifSxcImNvbXBJZFwiOjExN30se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjIyLFwieFwiOjE3NyxcInZpc2libGVcIjpmYWxzZSxcInZhclwiOlwiaW1nR2V0XCIsXCJza2luXCI6XCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2ltZ19nZXQucG5nXCJ9LFwiY29tcElkXCI6MTIwfV19XSxcImxvYWRMaXN0XCI6W1wicmVzL3Jlc291cmNlL2Jhc2UvY29tL2J0bl9ob21lLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9pbWdfYm94X2JnLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9tZW51L2ltZ19idG5faGlnaF8wMS5wbmdcIixcInJlcy9yZXNvdXJjZS9jYXQvY2F0TmV3L2ltYWdlX2ljb25fcmVkXzEucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL21lbnUvaW1nX2J0bl9oaWdoXzAyLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9tZW51L2ltZ19idG5faGlnaF8wMy5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL3Nob3AvbWVudS9pbWdfYnRuX2hpZ2hfMDQucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL21lbnUvaW1nX2J0bl9oaWdoXzA1LnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9pbWdfYm94X2J0bS5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL3Nob3AvaW1nX2JveF90b3AucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2J0bl9nZXRPZmYucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2J0bl91bmxvY2sucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2J0bl9ub3R1bmxvY2sucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2J0bl9jaGFuZ2VfY2F0LnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9idG5fY2hhbmdlX2l0ZW0ucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9jb20vZGlhbG9nL2ltZ19vdXRzaWRlX2JveC5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL2NvbS9kaWFsb2cvaW1nX0luc2lkZV9ib3gucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9jb20vZGlhbG9nL2ltZ19pbnNpZGVfYm94X2JsdWUucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2ltZ19hdmF0YXJfYm94LnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9hdmF0YXIvaW1nX2F2YXRhcl8wLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9pbWdfcnVuX2JnLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9pbWdfYmFsbF9ibHVlLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9pbWdfYmFsbF9yZWQucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9jb20vdGV4dC9pbWdfZGFuZ2FuX3RpdGxlLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2UvY29tL2J0bl9jbG9zZS5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL2xvdHRlcnkvaW1nX2xvdHRlcnlfY2F0LnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2UvbG90dGVyeS9pbWdfbG90dGVyeV9zdGFyLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9tZW51L2ltZ190ZXh0XzEucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL21lbnUvaW1nX3RleHRfMi5wbmdcIixcInJlcy9yZXNvdXJjZS9iYXNlL3Nob3AvbWVudS9pbWdfdGV4dF8zLnBuZ1wiLFwicmVzL3Jlc291cmNlL2Jhc2Uvc2hvcC9tZW51L2ltZ190ZXh0XzQucG5nXCIsXCJyZXMvcmVzb3VyY2UvYmFzZS9zaG9wL2ltZ19nZXQucG5nXCJdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhzaG9wVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3LmNvbS5zaG9wVUlcIixzaG9wVUkpO1xyXG59XHJcbmV4cG9ydCBtb2R1bGUgdWkudmlldy5tYWluIHtcclxuICAgIGV4cG9ydCBjbGFzcyBiZ1VJIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlZpZXdCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwibG9hZExpc3RcIjpbXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoYmdVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnZpZXcubWFpbi5iZ1VJXCIsYmdVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgZDNVSSBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJWaWV3QmFzZVwiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjc1MCxcImhlaWdodFwiOjEzMzR9LFwiY29tcElkXCI6MixcImxvYWRMaXN0XCI6W10sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGQzVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3Lm1haW4uZDNVSVwiLGQzVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIGVmZmVjdFVJIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlZpZXdCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwibG9hZExpc3RcIjpbXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoZWZmZWN0VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3Lm1haW4uZWZmZWN0VUlcIixlZmZlY3RVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgZ2FtZVVJIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cdFx0cHVibGljIGFuaV9ncmFwOkZyYW1lQW5pbWF0aW9uO1xuXHRcdHB1YmxpYyBhbmlfbHVja0JMOkZyYW1lQW5pbWF0aW9uO1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJWaWV3QmFzZVwiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjc1MCxcImhlaWdodFwiOjEzMzR9LFwiY29tcElkXCI6MixcImFuaW1hdGlvbnNcIjpbe1wibm9kZXNcIjpbe1widGFyZ2V0XCI6NDEzLFwia2V5ZnJhbWVzXCI6e1widmlzaWJsZVwiOlt7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjo0MTMsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MH0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjo0MTMsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6Mn0se1widmFsdWVcIjpmYWxzZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6NDEzLFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjR9LHtcInZhbHVlXCI6dHJ1ZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6NDEzLFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjZ9LHtcInZhbHVlXCI6ZmFsc2UsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjQxMyxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjo4fSx7XCJ2YWx1ZVwiOnRydWUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjQxMyxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoxMH0se1widmFsdWVcIjpmYWxzZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6NDEzLFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjEyfV19fSx7XCJ0YXJnZXRcIjozMjQsXCJrZXlmcmFtZXNcIjp7XCJ2aXNpYmxlXCI6W3tcInZhbHVlXCI6dHJ1ZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzI0LFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjB9LHtcInZhbHVlXCI6ZmFsc2UsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjMyNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoyfSx7XCJ2YWx1ZVwiOnRydWUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjMyNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjo0fSx7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozMjQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6Nn0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozMjQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6OH0se1widmFsdWVcIjpmYWxzZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzI0LFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjEwfSx7XCJ2YWx1ZVwiOnRydWUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjMyNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoxMn1dfX1dLFwibmFtZVwiOlwiYW5pX2dyYXBcIixcImlkXCI6MjksXCJmcmFtZVJhdGVcIjoyNCxcImFjdGlvblwiOjB9LHtcIm5vZGVzXCI6W3tcInRhcmdldFwiOjQ2OCxcImtleWZyYW1lc1wiOntcInJvdGF0aW9uXCI6W3tcInZhbHVlXCI6MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjgsXCJrZXlcIjpcInJvdGF0aW9uXCIsXCJpbmRleFwiOjB9LHtcInZhbHVlXCI6MzYwLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OCxcImtleVwiOlwicm90YXRpb25cIixcImluZGV4XCI6MjAwfV0sXCJhbHBoYVwiOlt7XCJ2YWx1ZVwiOjEsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY4LFwia2V5XCI6XCJhbHBoYVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjAuNSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjgsXCJrZXlcIjpcImFscGhhXCIsXCJpbmRleFwiOjUwfSx7XCJ2YWx1ZVwiOjEsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY4LFwia2V5XCI6XCJhbHBoYVwiLFwiaW5kZXhcIjoxMDB9LHtcInZhbHVlXCI6MC41LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OCxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6MTUwfSx7XCJ2YWx1ZVwiOjEsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY4LFwia2V5XCI6XCJhbHBoYVwiLFwiaW5kZXhcIjoyMDB9XX19LHtcInRhcmdldFwiOjQ2OSxcImtleWZyYW1lc1wiOntcInJvdGF0aW9uXCI6W3tcInZhbHVlXCI6MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjksXCJrZXlcIjpcInJvdGF0aW9uXCIsXCJpbmRleFwiOjB9LHtcInZhbHVlXCI6LTM2MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjksXCJrZXlcIjpcInJvdGF0aW9uXCIsXCJpbmRleFwiOjIwMH1dLFwiYWxwaGFcIjpbe1widmFsdWVcIjowLjUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY5LFwia2V5XCI6XCJhbHBoYVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjEsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY5LFwia2V5XCI6XCJhbHBoYVwiLFwiaW5kZXhcIjo1MH0se1widmFsdWVcIjowLjUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY5LFwia2V5XCI6XCJhbHBoYVwiLFwiaW5kZXhcIjoxMDB9LHtcInZhbHVlXCI6MSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjksXCJrZXlcIjpcImFscGhhXCIsXCJpbmRleFwiOjE1MH1dfX1dLFwibmFtZVwiOlwiYW5pX2x1Y2tCTFwiLFwiaWRcIjozMCxcImZyYW1lUmF0ZVwiOjI0LFwiYWN0aW9uXCI6MH1dLFwibG9hZExpc3RcIjpbXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoZ2FtZVVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5tYWluLmdhbWVVSVwiLGdhbWVVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgbG9hZGluZ1VJIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cdFx0cHVibGljIGltZ19iZzpJbWFnZTtcblx0XHRwdWJsaWMgYm94X2J0bTpCb3g7XG5cdFx0cHVibGljIHByb19Mb2FkaW5nOlByb2dyZXNzQmFyO1xuXHRcdHB1YmxpYyBsYmxMb2FkaW5nOkxhYmVsO1xuXHRcdHB1YmxpYyBsYmxfcDpMYWJlbDtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwidmFyXCI6XCJpbWdfYmdcIixcInRvcFwiOjAsXCJza2luXCI6XCJyZXMvbG9hZGluZy9pbWdfbG9hZGluZ19iZy5wbmdcIixcInJpZ2h0XCI6MCxcImxlZnRcIjowLFwiYm90dG9tXCI6MH0sXCJjb21wSWRcIjozfSx7XCJ0eXBlXCI6XCJCb3hcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcIndpZHRoXCI6NDkzLFwidmFyXCI6XCJib3hfYnRtXCIsXCJwaXZvdFlcIjoxNDksXCJwaXZvdFhcIjoyNDksXCJoZWlnaHRcIjoxNDksXCJjZW50ZXJYXCI6MCxcImJvdHRvbVwiOjB9LFwiY29tcElkXCI6NSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIlByb2dyZXNzQmFyXCIsXCJwcm9wc1wiOntcInlcIjoyMCxcInhcIjoyNDcsXCJ2YXJcIjpcInByb19Mb2FkaW5nXCIsXCJza2luXCI6XCJyZXMvbG9hZGluZy9wcm9ncmVzc19sb2FkaW5nLnBuZ1wiLFwicGl2b3RZXCI6MTIsXCJwaXZvdFhcIjoxNzV9LFwiY29tcElkXCI6Nn0se1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOjIwLFwid2lkdGhcIjoyMzgsXCJ2YXJcIjpcImxibExvYWRpbmdcIixcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0ZXh0XCI6XCIxMDAlXCIsXCJzdHJva2VDb2xvclwiOlwiI2ZmZmZmZlwiLFwic3Ryb2tlXCI6NCxcInBpdm90WVwiOjE2LFwicGl2b3RYXCI6MTE5LFwiaGVpZ2h0XCI6MzIsXCJmb250U2l6ZVwiOjI2LFwiZm9udFwiOlwiQXJpYWxcIixcImNvbG9yXCI6XCIjNTkyMjIyXCIsXCJjZW50ZXJYXCI6MCxcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwifSxcImNvbXBJZFwiOjd9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo4NSxcInhcIjoyNDcsXCJ3aWR0aFwiOjQ5MyxcInNraW5cIjpcInJlcy9sb2FkaW5nL2ltZ184ci5wbmdcIixcInBpdm90WVwiOjIwLFwicGl2b3RYXCI6MjQ3LFwiaGVpZ2h0XCI6Mzl9LFwiY29tcElkXCI6OH0se1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOjEyOCxcInhcIjoyNDcsXCJ3aWR0aFwiOjI4MyxcInZhclwiOlwibGJsX3BcIixcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0ZXh0XCI6XCJQb3dlcmVkIGJ5IExheWFBaXIgRW5naW5lXCIsXCJwaXZvdFlcIjoyMSxcInBpdm90WFwiOjE0MixcImhlaWdodFwiOjQyLFwiZm9udFNpemVcIjoxOCxcImNvbG9yXCI6XCIjZmZmZmZmXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjo5fV19XSxcImxvYWRMaXN0XCI6W1wicmVzL2xvYWRpbmcvaW1nX2xvYWRpbmdfYmcucG5nXCIsXCJyZXMvbG9hZGluZy9wcm9ncmVzc19sb2FkaW5nLnBuZ1wiLFwicmVzL2xvYWRpbmcvaW1nXzhyLnBuZ1wiXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcobG9hZGluZ1VJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5tYWluLmxvYWRpbmdVSVwiLGxvYWRpbmdVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgcG9wdXBVSSBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJWaWV3QmFzZVwiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjc1MCxcImhlaWdodFwiOjEzMzR9LFwiY29tcElkXCI6MixcImxvYWRMaXN0XCI6W10sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KHBvcHVwVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3Lm1haW4ucG9wdXBVSVwiLHBvcHVwVUkpO1xyXG59XHIiXX0=
