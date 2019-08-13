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
},{"./framework/runtime/engine":26}],2:[function(require,module,exports){
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
        this.needLoadRes
            .add("res/bg/123.png", Laya.Loader.IMAGE);
    }
}
exports.MainScene = MainScene;
},{"../../framework/manager/ui/scene-base":24}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
var bgUI = layaMaxUI_1.ui.view.main.bgUI;
/**
 * @author Sun
 * @time 2019-08-11 11:23
 * @project SFramework_LayaAir
 * @description
 *
 */
class BgView extends bgUI {
    static get $() {
        if (!this.instance)
            this.instance = new BgView();
        return this.instance;
    }
    constructor() {
        super();
    }
    onAwake() {
        super.onAwake();
        this.Init();
        this.suitInit();
    }
    /**
     * 初始化一次
     */
    Init() {
        this.initOnce();
        // //数据监听
        // this.addDataWatch(DataDefine.UserInfo);
        if (Laya.Browser.onWeiXin) {
            this.initLink();
        }
    }
    /**
     * 适配
     */
    suitInit() {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面初始数据*****************************************/
    /** Des:构造是初始化一次 */
    initOnce() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /***************************************外部连接进入判断***************************************/
    /** Des:判断进入连接信息 */
    initLink() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面事件相关*****************************************/
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /****************************************数据改变的监听****************************************/
    /**
     * 刷新数据
     */
    onData(data) {
    }
}
exports.BgView = BgView;
},{"../../../ui/layaMaxUI":35}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
var d3UI = layaMaxUI_1.ui.view.main.d3UI;
const load3d_1 = require("../../../framework/util/load3d");
const config_1 = require("../../../framework/setting/config");
/**
 * @author Sun
 * @time 2019-08-11 12:03
 * @project SFramework_LayaAir
 * @description 3D场景层
 *
 */
class D3View extends d3UI {
    static get $() {
        if (!this.instance)
            this.instance = new D3View();
        return this.instance;
    }
    constructor() {
        super();
    }
    onAwake() {
        super.onAwake();
        this.Init();
        this.suitInit();
    }
    /**
     * 初始化一次
     */
    Init() {
        this.initOnce();
        // //数据监听
        // this.addDataWatch(DataDefine.UserInfo);
    }
    /**
     * 每次弹出初始化一次
     */
    popupInit() {
        this.initAll();
    }
    /**
     * 适配
     */
    suitInit() {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面初始数据*****************************************/
    /** Des:构造是初始化一次 */
    initOnce() {
    }
    /** Des:每次弹出初始化 */
    initAll() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /***************************************外部连接进入判断***************************************/
    /** Des:判断进入连接信息 */
    initLink() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面事件相关*****************************************/
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /****************************************3D场景加载完成回调****************************************/
    /**
     * 加载3D场景
     */
    load3DScene(callBack) {
        load3d_1.UtilLoad3D.loadScene(this, config_1.Config3D.$.scenePath, (scene) => {
            this.scene3D = scene;
            callBack.call();
        });
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /****************************************数据改变的监听****************************************/
    /**
     * 刷新数据
     */
    onData(data) {
    }
}
exports.D3View = D3View;
},{"../../../framework/setting/config":27,"../../../framework/util/load3d":31,"../../../ui/layaMaxUI":35}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
var effectUI = layaMaxUI_1.ui.view.main.effectUI;
var Browser = Laya.Browser;
const log_1 = require("../../../framework/core/log");
class EffectView extends effectUI {
    static get $() {
        if (!this.instance)
            this.instance = new EffectView();
        return this.instance;
    }
    constructor() {
        super();
    }
    onAwake() {
        super.onAwake();
        this.Init();
        this.suitInit();
    }
    /**
     * 初始化一次
     */
    Init() {
        this.initOnce();
        // //数据监听
        // this.addDataWatch(DataDefine.UserInfo);
        if (Browser.onWeiXin) {
            this.initLink();
        }
    }
    /**
     * 每次弹出初始化一次
     */
    popupInit() {
        this.initAll();
    }
    /**
     * 适配
     */
    suitInit() {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面初始数据*****************************************/
    /** Des:构造是初始化一次 */
    initOnce() {
        this.btnLucky.on(Laya.Event.CLICK, this, () => {
            log_1.Log.log("测试");
        });
    }
    /** Des:每次弹出初始化 */
    initAll() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /***************************************外部连接进入判断***************************************/
    /** Des:判断进入连接信息 */
    initLink() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面点击事件*****************************************/
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /****************************************数据改变的监听****************************************/
    /**
     * 刷新数据
     */
    onData(data) {
    }
}
exports.EffectView = EffectView;
},{"../../../framework/core/log":9,"../../../ui/layaMaxUI":35}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
var Browser = Laya.Browser;
var gameUI = layaMaxUI_1.ui.view.main.gameUI;
/**
 * @author Sun
 * @time 2019-08-11 18:08
 * @project SFramework_LayaAir
 * @description 主页
 *
 */
class GameView extends gameUI {
    static get $() {
        if (!this.instance)
            this.instance = new GameView();
        return this.instance;
    }
    constructor() {
        super();
    }
    onAwake() {
        super.onAwake();
        this.Init();
        this.suitInit();
    }
    /**
     * 初始化一次
     */
    Init() {
        this.initOnce();
        // //数据监听
        // this.addDataWatch(DataDefine.UserInfo);
        if (Browser.onWeiXin) {
            this.initLink();
        }
    }
    /**
     * 每次弹出初始化一次
     */
    popupInit() {
        this.initAll();
    }
    /**
     * 适配
     */
    suitInit() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面初始数据*****************************************/
    /** Des:构造是初始化一次 */
    initOnce() {
    }
    /** Des:每次弹出初始化 */
    initAll() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /***************************************外部连接进入判断***************************************/
    /** Des:判断进入连接信息 */
    initLink() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面点击事件*****************************************/
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /****************************************数据改变的监听****************************************/
    /**
     * 刷新数据
     */
    onData(data) {
    }
}
exports.GameView = GameView;
},{"../../../ui/layaMaxUI":35}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
var loadingUI = layaMaxUI_1.ui.view.main.loadingUI;
const bg_view_1 = require("./bg-view");
const d3_view_1 = require("./d3-view");
const config_1 = require("../../../framework/setting/config");
const number_1 = require("../../../framework/util/number");
const enum_1 = require("../../../framework/setting/enum");
const game_view_1 = require("./game-view");
const effect_view_1 = require("./effect-view");
const popup_view_1 = require("./popup-view");
const event_data_1 = require("../../../framework/manager/event/event-data");
const res_manager_1 = require("../../../framework/manager/res/res-manager");
class LoadingView extends loadingUI {
    /*****************************************页面属性管理*****************************************/
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面生命周期*****************************************/
    constructor() {
        super();
    }
    onAwake() {
        super.onAwake();
        this.Init();
        this.suitInit();
    }
    /**
   * 加载页面启动项
   */
    onStart() {
        //加载主场景所需要的资源信息
        res_manager_1.ResManager.$.loadGroup(config_1.ConfigRes.$.defaultMainRes, new event_data_1.EventFunc(this, this.onProgress), new event_data_1.EventFunc(this, this.onCompleted));
        this.lblLoading.text = "游戏登录中...";
    }
    /**
     * 加载完成回调
     * @param success
     */
    onCompleted(success) {
        //Bg页面
        let bgView = bg_view_1.BgView.$;
        Laya.stage.addChild(bgView);
        if (config_1.ConfigGame.$.dimension == enum_1.enumDimension.Dim3) {
            //3D页面
            let d3View = d3_view_1.D3View.$;
            Laya.stage.addChild(d3View);
            d3View.load3DScene(this.showView);
        }
        else {
            this.showView();
        }
    }
    showView() {
        //主页
        let gameView = game_view_1.GameView.$;
        Laya.stage.addChild(gameView);
        //效果页
        let effectView = effect_view_1.EffectView.$;
        Laya.stage.addChild(effectView);
        //弹窗页
        let popupView = popup_view_1.PopupView.$;
        Laya.stage.addChild(popupView);
        //结束销毁加载页
        this.destroy();
    }
    /**
     * 加载进度
     * @param progress
     */
    onProgress(progress) {
        let fixed = number_1.UtilNumber.toFixed(progress * 100, 0);
        this.lblLoading.text = fixed + "%";
        this.pro_Loading.value = fixed / 100;
    }
    /**
     * 初始化一次
     */
    Init() {
        this.initOnce();
    }
    /**
     * 每次弹出初始化一次
     */
    popupInit() {
        this.initAll();
    }
    /**
     * 适配
     */
    suitInit() {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        this.img_bg.width = this.width;
        this.img_bg.height = this.height;
        this.img_bg.x = 0;
        this.img_bg.y = 0;
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面初始数据*****************************************/
    /** Des:构造是初始化一次 */
    initOnce() {
    }
    /** Des:每次弹出初始化 */
    initAll() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /***************************************外部连接进入判断***************************************/
    /** Des:判断进入连接信息 */
    initLink() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面点击事件*****************************************/
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /****************************************数据改变的监听****************************************/
    /**
     * 刷新数据
     */
    onData(data) {
    }
    /********************************************——**********************************************/
    ///////////////////////////////////////////-分界线-///////////////////////////////////////////
    /******************************************销毁自身******************************************/
    destroy() {
        this.removeSelf();
        res_manager_1.ResManager.$.releaseGroup(config_1.ConfigRes.$.defaultLoadRes);
    }
}
exports.LoadingView = LoadingView;
},{"../../../framework/manager/event/event-data":14,"../../../framework/manager/res/res-manager":19,"../../../framework/setting/config":27,"../../../framework/setting/enum":28,"../../../framework/util/number":32,"../../../ui/layaMaxUI":35,"./bg-view":3,"./d3-view":4,"./effect-view":5,"./game-view":6,"./popup-view":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
var popupUI = layaMaxUI_1.ui.view.main.popupUI;
/**
 * @author Sun
 * @time 2019-08-11 19:02
 * @project SFramework_LayaAir
 * @description 弹出层
 *
 */
class PopupView extends popupUI {
    static get $() {
        if (!this.instance)
            this.instance = new PopupView();
        return this.instance;
    }
    constructor() {
        super();
    }
    onAwake() {
        super.onAwake();
        this.Init();
        this.suitInit();
    }
    /**
     * 初始化一次
     */
    Init() {
        this.initOnce();
    }
    /**
     * 每次弹出初始化一次
     */
    popupInit() {
        this.initAll();
    }
    /**
     * 适配
     */
    suitInit() {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面初始数据*****************************************/
    /** Des:构造是初始化一次 */
    initOnce() {
    }
    /** Des:每次弹出初始化 */
    initAll() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面点击事件*****************************************/
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /****************************************数据改变的监听****************************************/
    /**
     * 刷新数据
     */
    onData(data) {
    }
}
exports.PopupView = PopupView;
},{"../../../ui/layaMaxUI":35}],9:[function(require,module,exports){
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
},{"../setting/config":27}],10:[function(require,module,exports){
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
},{"./log":9}],11:[function(require,module,exports){
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
},{"./log":9}],12:[function(require,module,exports){
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
},{"./singleton":11}],13:[function(require,module,exports){
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
},{"../event/event-node":15}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
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
},{"../../core/log":9,"../../core/singleton":11,"./event-data":14}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @author Sun
* @time 2019-08-12 10:59
* @project SFramework_LayaAir
* @description 配置表模板项
*
*/
class JsonTemplate {
    constructor(url, name, key = null) {
        this.url = url;
        this.name = name;
        this.key = key;
    }
}
exports.JsonTemplate = JsonTemplate;
},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.ResGroup = ResGroup;
},{"./res-item":18}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handler = Laya.Handler;
const event_node_1 = require("../event/event-node");
const log_1 = require("../../core/log");
/**
 * @author Sun
 * @time 2019-08-12 13:33
 * @project SFramework_LayaAir
 * @description  资源管理  （所有资源均通过ResGroup的形式来加载）
 *
 */
class ResManager extends event_node_1.EventNode {
    constructor() {
        super();
        //存放所有已加载的资源
        this.m_dictResItem = new Map();
    }
    static get $() {
        if (this.instance == null)
            this.instance = new ResManager();
        return this.instance;
    }
    setup() {
    }
    update() {
    }
    destroy() {
    }
    /**
     * 通过URL获取资源
     * @param url
     */
    getRes(url) {
        return Laya.loader.getRes(url);
    }
    /**
     * 加载资源组
     * @param loads 资源信息
     * @param progressFuc 加载进度回调
     * @param completeFuc 加载完成回调
     */
    loadGroup(loads, progressFuc, completeFuc) {
        let urls = new Array();
        loads.needLoad.forEach(element => {
            urls.push({ url: element.url, type: element.type });
        });
        Laya.loader.load(urls, Handler.create(this, (success) => {
            if (success) {
                //完成回调
                if (completeFuc != null)
                    completeFuc.invoke();
                //标记资源
                for (let index = 0; index < loads.needLoad.length; index++) {
                    let info = loads.needLoad[index];
                    if (!this.m_dictResItem.has(info.url)) {
                        this.m_dictResItem.set(info.url, info);
                    }
                }
            }
            else {
                log_1.Log.error("Load Resource Error：");
                log_1.Log.debug(urls);
            }
        }), Handler.create(this, (progress) => {
            //进度回调
            if (progressFuc != null)
                progressFuc.invoke(progress);
        }, null, false));
    }
    /**
     * 释放资源组
     * @param loads 资源组
     */
    releaseGroup(loads) {
        let urls = new Array();
        loads.needLoad.forEach(element => {
            urls.push(element.url);
        });
        for (let i = 0; i < urls.length; i++) {
            Laya.loader.clearRes(urls[i]);
            this.m_dictResItem.forEach((v, key) => {
                if (key == urls[i]) {
                    this.m_dictResItem.delete(key);
                }
            });
        }
    }
    /**
     * 释放指定资源
     * @param url
     */
    releaseUrl(url) {
        let isActive = false;
        this.m_dictResItem.forEach((v, key) => {
            if (key == url) {
                isActive = true;
            }
        });
        if (isActive) {
            Laya.loader.clearRes(url);
        }
        else {
            log_1.Log.error("加载资源组内不存在该资源");
        }
    }
}
ResManager.instance = null;
exports.ResManager = ResManager;
},{"../../core/log":9,"../event/event-node":15}],20:[function(require,module,exports){
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
},{"../../util/time":34,"./timer-interval":21}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handler = Laya.Handler;
const array_1 = require("../../util/array");
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
},{"../../core/object-pool":10,"../../core/time-delay":12,"../../util/array":29,"../event/event-node":15,"./timer-entity":20}],23:[function(require,module,exports){
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
},{"../../util/display":30}],24:[function(require,module,exports){
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
            this.firstView = null;
            this.m_loaded = false;
            this.sceneTimers = new Array();
            this.needLoadRes = new res_group_1.ResGroup();
        }
        createChildren() {
            super.createChildren();
            this.createView(LyScene.uiView);
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
        }
        /**
         * 进入场景
         * @param param 参数
         * @param progressFuc 进度回调
         * @param completeFuc 完成回调
         */
        enter(param, progressFuc, completeFuc) {
            this.m_loaded = false;
            this.m_param = param;
            this.onInit(param);
            res_manager_1.ResManager.$.loadGroup(this.needLoadRes, progressFuc, completeFuc);
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
                if (this.firstView != null) {
                    let cls = this.firstView;
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
},{"../../core/log":9,"../res/res-group":17,"../res/res-manager":19,"../timer/timer-manager":22}],25:[function(require,module,exports){
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
},{"../data/data-manager":13}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../setting/config");
const log_1 = require("../core/log");
const time_1 = require("../util/time");
const enum_1 = require("../setting/enum");
var Browser = Laya.Browser;
const res_manager_1 = require("../manager/res/res-manager");
const event_data_1 = require("../manager/event/event-data");
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
        if (config_1.ConfigUI.$.defaultLoadView != null && config_1.ConfigRes.$.defaultLoadRes != null) {
            this.engineSetup(() => {
                //游戏开始
                time_1.UtilTime.start();
                //初始化游戏管理器
                this.managerSetUp();
                //初始化游戏主循环
                Laya.timer.frameLoop(1, this, this.managerUpdate);
                //加载Loading页的默认资源并显示Loading页
                res_manager_1.ResManager.$.loadGroup(config_1.ConfigRes.$.defaultLoadRes, null, new event_data_1.EventFunc(this, () => {
                    let scrpt = config_1.ConfigUI.$.defaultLoadView;
                    if (scrpt != undefined) {
                        let loadingView = new scrpt();
                        Laya.stage.addChild(loadingView);
                        loadingView.onStart();
                    }
                }));
            });
        }
        else {
            log_1.Log.error("Error:Loading资源为空加载失败！");
        }
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
},{"../core/log":9,"../manager/event/event-data":14,"../manager/res/res-manager":19,"../setting/config":27,"../setting/enum":28,"../util/time":34}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const singleton_1 = require("../core/singleton");
const main_scene_1 = require("../../client/scene/main-scene");
const res_group_1 = require("../manager/res/res-group");
const loading_view_1 = require("../../client/view/layer-view/loading-view");
const json_template_1 = require("../manager/json/json-template");
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
        this.defaultLoadView = loading_view_1.LoadingView;
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
 * 资源配置
 */
class ConfigRes extends singleton_1.Singleton {
    constructor() {
        super();
        /**默认Loading页面的资源信息 */
        this.defaultLoadRes = null;
        /**默认的基础页面资源信息 */
        this.defaultMainRes = null;
        //手动配置loading资源
        this.defaultLoadRes = new res_group_1.ResGroup();
        this.defaultLoadRes
            .add("res/loading/img_loading_bg.png", Laya.Loader.IMAGE)
            .add("res/loading/progress_loading.png", Laya.Loader.IMAGE)
            .add("res/loading/img_8r.png", Laya.Loader.IMAGE);
        //手动配置主页资源
        this.defaultMainRes = new res_group_1.ResGroup();
        this.defaultMainRes
            .add("res/atlas/res/main/effect.atlas", Laya.Loader.ATLAS);
        //加载Json配置文件
        ConfigData.$.jsonTemplateList.forEach(item => {
            this.defaultMainRes
                .add(item.url, Laya.Loader.JSON);
        });
        //加载音效资源
        ConfigSound.$.soundResList.forEach(item => {
            this.defaultMainRes
                .add(item.url, Laya.Loader.SOUND);
        });
    }
    static get $() {
        if (!this.instance)
            this.instance = new ConfigRes();
        return this.instance;
    }
}
ConfigRes.instance = null;
exports.ConfigRes = ConfigRes;
/**
 * 声音配置
 */
class ConfigSound extends singleton_1.Singleton {
    constructor() {
        super();
        /**背景音乐名字 */
        this.bgSoundName = "";
        /**背景音开关 */
        this.isCloseBGSound = false;
        /**效果音开关 */
        this.isCloseEffectSound = false;
        /**所有音效开关 */
        this.isCloseVoiceSound = false;
        /**总音量 */
        this.volumeVoiceSound = 1;
        /**音效资源 */
        this.soundResList = null;
        this.soundResList = new Array();
        // this.soundResList.push(new SoundTemplate("res/sound/bg.mp3",enumSoundName.bg));
    }
    static get $() {
        if (!this.instance)
            this.instance = new ConfigSound();
        return this.instance;
    }
}
ConfigSound.instance = null;
exports.ConfigSound = ConfigSound;
/**
 * 数据表配置
 */
class ConfigData extends singleton_1.Singleton {
    constructor() {
        super();
        this.jsonTemplateList = new Array();
        this.jsonTemplateList = [
            new json_template_1.JsonTemplate("res/data/BetData.json", "level", "level"),
        ];
    }
    static get $() {
        if (!this.instance)
            this.instance = new ConfigData();
        return this.instance;
    }
}
ConfigData.instance = null;
exports.ConfigData = ConfigData;
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
},{"../../client/scene/main-scene":2,"../../client/view/layer-view/loading-view":7,"../core/singleton":11,"../manager/json/json-template":16,"../manager/res/res-group":17,"./enum":28}],28:[function(require,module,exports){
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
/**
 * 数据表配置
 */
var enumJsonDefine;
(function (enumJsonDefine) {
    enumJsonDefine["lottery"] = "lottery";
    enumJsonDefine["invite"] = "invite";
    enumJsonDefine["level"] = "level";
})(enumJsonDefine = exports.enumJsonDefine || (exports.enumJsonDefine = {}));
/**
 * 音效标记
 */
var enumSoundName;
(function (enumSoundName) {
    enumSoundName["bg"] = "bgSound";
    enumSoundName["botton"] = "btnSound";
})(enumSoundName = exports.enumSoundName || (exports.enumSoundName = {}));
},{}],29:[function(require,module,exports){
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
},{"../setting/enum":28}],30:[function(require,module,exports){
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
},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../core/log");
/**
* @author Sun
* @time 2019-02-25 17:22
* @project SFramework_LayaAir
* @description  3D模型加载工具类
*
*/
class UtilLoad3D {
    /**
     * 加载U3D场景
     * @param area 作用域
     * @param path 场景文件路径
     * @param cb   加载完成回调
     */
    static loadScene(area, path, cb) {
        Laya.loader.create(path, Laya.Handler.create(this, () => {
            let scene3D = Laya.stage.addChild(Laya.loader.getRes(path));
            if (cb) {
                cb.call(area, scene3D);
            }
        }));
    }
    /**
     * 获取场景内物体
     * @param scene3d 场景
     * @param childName 子物体名字
     */
    static getScene3DChild(scene3d, childName) {
        let ms = scene3d.getChildByName(childName);
        if (ms) {
            return ms;
        }
        log_1.Log.error("Error:获取场景物体失败");
        return null;
    }
    /**
     * 获取模型的子物体模型
     * @param fatSP 父方
     * @param childName 子方名字
     */
    static getModelChildByName(fatSP, childName) {
        let child = fatSP.getChildByName(childName);
        if (child) {
            return child;
        }
        log_1.Log.error("Error:获取模型子物体信息错误");
        return null;
    }
    /**
     * 替换模型
     * @param targetSP 被替换模型
     * @param mianSP   替换模型
     */
    static replaceModel(targetSP, mainSP) {
        if (!targetSP || !mainSP) {
            log_1.Log.error("Error:替换或被替换模型信息错误");
            return null;
        }
        if (targetSP.parent) {
            targetSP.parent.addChild(mainSP);
        }
        mainSP.transform.position = new Laya.Vector3(targetSP.transform.position.x, targetSP.transform.position.y, targetSP.transform.position.z);
        mainSP.transform.scale = new Laya.Vector3(targetSP.transform.scale.x, targetSP.transform.scale.y, targetSP.transform.scale.y);
    }
    /**
     * 替换Mesh模型材质
     * @param targetSP 目标模型
     * @param targetMat 目标材质
     */
    static replaceModelMeshMat(targetSP, targetMat) {
        if (!targetSP || !targetMat) {
            log_1.Log.error("Error:模型或材质信息错误");
            return null;
        }
        targetSP;
        targetSP.meshRenderer.material = targetMat;
    }
    /**
     * 替换SkinMesh模型材质
     * @param targetSP 目标模型
     * @param targetMat 目标材质
     */
    static replaceModelSkinMeshMat(targetSP, targetMat) {
        if (!targetSP || !targetMat) {
            log_1.Log.error("Error:模型或材质信息错误");
            return null;
        }
        targetSP;
        targetSP.skinnedMeshRenderer.material = targetMat;
    }
    /**
     * 获取容器上的材质并存入哈希表
     * @param targetObj 承载材质的容器
     */
    static getMaterials(scene3d) {
        /**Unity场景存贮一个空物体，附带MeshRender用来存储材质**/
        var container = UtilLoad3D.getScene3DChild(scene3d, "MatContainer");
        if (!container) {
            log_1.Log.error("Error:材质容器错误或不存在");
            return null;
        }
        var userInfo = {};
        var matArrary = container.meshRenderer.materials;
        for (var i = 0; i < matArrary.length; i++) {
            var name = matArrary[i].name.slice(0, matArrary[i].name.length - 10);
            userInfo[name] = matArrary[i];
        }
        return userInfo;
    }
    /**
     * 返回指定名字的材质
     * @param matArraty 存放材质的哈希表
     * @param matName   材质名字
     */
    static getMaterialByName(matArrary, matName) {
        if (!matArrary) {
            log_1.Log.error("Error:材质哈希表信息错误");
            return null;
        }
        if (!matArrary[matName]) {
            log_1.Log.error("Error:指定哈希表内不存在[" + matName + "]材质");
            return null;
        }
        return matArrary[matName];
    }
    /**
     * 播放模型动画
     * @param targetSp 播放物体
     * @param aniName  动画名字
     * @param isCross  是否过度
     * 通过this.animator.getCurrentAnimatorPlayState(0).normalizedTime>=1去判断当前动画是否播放完成
     */
    static playAnimatorByName(targetSp, aniName, isCross) {
        var animator = targetSp.getComponent(Laya.Animator);
        if (!animator) {
            log_1.Log.error("Error:动画机信息错误");
            return;
        }
        if (isCross != null && isCross == false) {
            animator.play(aniName);
            return;
        }
        animator.crossFade(aniName, 0.2);
        return animator;
    }
    /**
     * 控制动画速度
     * @param targetSp 目标物体
     * @param speed 播放速度
     */
    static controlAnimatorSpeed(targetSp, speed) {
        var animator = targetSp.getComponent(Laya.Animator);
        if (!animator) {
            log_1.Log.error("Error:动画机信息错误");
            return;
        }
        if (speed) {
            animator.speed = speed;
        }
        else {
            animator.speed = 1;
        }
    }
    /**
     * 判断动画是否完成
     * @param animator
     */
    static confirmAniComplete(animator) {
        var bool = false;
        let index = animator.getCurrentAnimatorPlayState(0).normalizedTime;
        if (index >= 1) {
            bool = true;
        }
        return bool;
    }
}
exports.UtilLoad3D = UtilLoad3D;
},{"../core/log":9}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("./string");
/**
 * @author Sun
 * @time 2019-08-11 18:54
 * @project SFramework_LayaAir
 * @description 数值工具类
 *
 */
class UtilNumber {
    /**
     * 保留小数点后几位
     */
    static toFixed(value, p) {
        return string_1.UtilString.toNumber(value.toFixed(p));
    }
    static toInt(value) {
        return Math.floor(value);
    }
    static isInt(value) {
        return Math.ceil(value) == value;
    }
    /**
     * 保留有效数值
     */
    static reserveNumber(num, size) {
        let str = String(num);
        let l = str.length;
        let p_index = str.indexOf(".");
        if (p_index < 0) {
            return num;
        }
        let ret = str.slice(0, p_index + 1);
        let lastNum = l - p_index;
        if (lastNum > size) {
            lastNum = size;
        }
        let lastStr = str.slice(p_index + 1, p_index + 1 + lastNum);
        return string_1.UtilString.toNumber(ret + lastStr);
    }
    /**
     * 保留有效数值，不够补0；注意返回的是字符串
     */
    static reserveNumberWithZero(num, size) {
        let str = String(num);
        let l = str.length;
        let p_index = str.indexOf(".");
        if (p_index < 0) { //是整数
            str += '.';
            for (let i = 0; i < size; ++i)
                str += '0';
            return str;
        }
        let ret = str.slice(0, p_index + 1);
        let lastNum = l - p_index - 1;
        if (lastNum > size) { //超过
            lastNum = size;
            let lastStr = str.slice(p_index + 1, p_index + 1 + lastNum);
            return ret + lastStr;
        }
        else if (lastNum < size) { //不足补0
            let diff = size - lastNum;
            for (let i = 0; i < diff; ++i)
                str += '0';
            return str;
        }
        else
            return str;
    }
    /**
     *
     */
    static formatThousandsNumber(num) {
        if (num < 1000000) {
            return num.toLocaleString();
        }
        else if (num < 1000000000) {
            let t = Math.floor(num / 1000);
            return t.toLocaleString() + "K";
        }
        else {
            let t = Math.floor(num / 1000000);
            return t.toLocaleString() + "M";
        }
    }
    /**
     *
     */
    static formatNumberShort(num, fixed = 0) {
        if (num < 1000) {
            return num;
        }
        else if (num < 1000000) {
            let t = Math.floor(num / 1000).toFixed(fixed);
            return t + "K";
        }
        else if (num < 1000000000) {
            let t = Math.floor(num / 1000000).toFixed(fixed);
            return t + "M";
        }
        else {
            let t = Math.floor(num / 1000000000).toFixed(fixed);
            return t.toLocaleString() + "G";
        }
    }
    /**
     * 科学计数法显示
     * @param num1
     */
    static bigNumberFormat(num, fixed = 2) {
        let exts = [
            '', 'K', "M", "G", "T", "P", "E", "Z", "Y", "AA",
            "BB", "CC", 'DD', 'EE', "FF", "GG", "HH", "II",
            "JJ", "KK", 'LL', 'MM', "NN", "OO", "PP", "QQ",
            "RR", "SS", 'TT', 'UU', "VV", "WW", "XX", "YY",
            "ZZ", "aa", 'bb', 'cc', "dd", "ee", "ff", "gg",
            "hh", "ii", 'gg', 'kk', "ll", "mm", "nn", "oo",
            "pp", "qq", 'rr', 'ss', "tt", "uu", "vv", "ww"
        ];
        let t1, t2;
        let n1 = num.indexOf("e+");
        if (n1 == -1)
            n1 = num.indexOf("E");
        if (n1 && n1 != -1) {
            t1 = parseFloat(num.substr(0, n1));
            t2 = parseInt(num.substr(n1 + 2));
            let ext = Math.floor(t2 / 3);
            let m = t2 % 3;
            return (t1 * Math.pow(10, m)).toFixed(fixed) + exts[ext];
        }
        return num;
    }
    /**
     * 数字相加
     */
    static bigNumberAdd(num1, num2) {
        let b = Number(num1) + Number(num2);
        return b.toExponential(4);
    }
    /**
     * 数字相减
     */
    static bigNumberSub(num1, num2) {
        let n1 = Number(num1);
        let n2 = Number(num2);
        if (n1 < n2) {
            return null;
        }
        return (n1 - n2).toExponential(4);
    }
    /**
     * 数字相乘法
     */
    static bigNumberMul(num1, num2) {
        return (Number(num1) * num2).toExponential(4);
    }
    /**
     * 数字相除
     */
    static bigNumberDiv(num1, num2) {
        return (Number(num1) / num2).toExponential(4);
    }
    /**
     * 两个科学计数相除
     */
    static bigNumberDivDounble(num1, num2) {
        return (Number(num1) / Number(num2));
    }
}
exports.UtilNumber = UtilNumber;
},{"./string":33}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Sun
 * @time 2019-08-11 18:55
 * @project SFramework_LayaAir
 * @description 字符串工具类
 *
 */
class UtilString {
    static get empty() {
        return "";
    }
    /**
     * 字符串是否有值
     */
    static isEmpty(s) {
        return (s != null && s.length > 0) ? false : true;
    }
    static toInt(str) {
        if (!str || str.length == 0)
            return 0;
        return parseInt(str);
    }
    static toNumber(str) {
        if (!str || str.length == 0)
            return 0;
        return parseFloat(str);
    }
    /**
     * 获取字符串真实长度,注：
     * 1.普通数组，字符占1字节；汉子占两个字节
     * 2.如果变成编码，可能计算接口不对
     */
    static getNumBytes(str) {
        let realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128)
                realLength += 1;
            else
                realLength += 2;
        }
        return realLength;
    }
    /**
     * 补零
     * @param str
     * @param len
     * @param dir 0-后；1-前
     * @return
     */
    static addZero(str, len, dir = 0) {
        let _str = "";
        let _len = str.length;
        let str_pre_zero = "";
        let str_end_zero = "";
        if (dir == 0)
            str_end_zero = "0";
        else
            str_pre_zero = "0";
        if (_len < len) {
            let i = 0;
            while (i < len - _len) {
                _str = str_pre_zero + _str + str_end_zero;
                ++i;
            }
            return _str + str;
        }
        return str;
    }
    /**
     * 去除左右空格
     * @param input
     * @return
     */
    static trim(input) {
        if (input == null) {
            return "";
        }
        return input.replace(/^\s+|\s+$""^\s+|\s+$/g, "");
    }
    /**
     * 去除左侧空格
     * @param input
     * @return
     */
    static trimLeft(input) {
        if (input == null) {
            return "";
        }
        return input.replace(/^\s+""^\s+/, "");
    }
    /**
     * 去除右侧空格
     * @param input
     * @return
     */
    static trimRight(input) {
        if (input == null) {
            return "";
        }
        return input.replace(/\s+$""\s+$/, "");
    }
    /**
     * 分钟与秒格式(如-> 40:15)
     * @param seconds 秒数
     * @return
     */
    static minuteFormat(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);
        let min_str = min < 10 ? ("0" + min.toString()) : (min.toString());
        let sec_str = sec < 10 ? ("0" + sec.toString()) : (sec.toString());
        return min_str + ":" + sec_str;
    }
    /**
     * 时分秒格式(如-> 05:32:20)
     * @param seconds(秒)
     * @return
     */
    static hourFormat(seconds) {
        let hour = Math.floor(seconds / 3600);
        let hour_str = hour < 10 ? ("0" + hour.toString()) : (hour.toString());
        return hour_str + ":" + UtilString.minuteFormat(seconds % 3600);
    }
    /**
     * 格式化字符串
     * @param str 需要格式化的字符串，【"杰卫，这里有{0}个苹果，和{1}个香蕉！", 5,10】
     * @param args 参数列表
     */
    static format(str, ...args) {
        for (let i = 0; i < args.length; i++) {
            str = str.replace(new RegExp("\\{" + i + "\\}", "gm"), args[i]);
        }
        return str;
    }
    /**
     * 以指定字符开始
     */
    static beginsWith(input, prefix) {
        return prefix == input.substring(0, prefix.length);
    }
    /**
     * 以指定字符结束
     */
    static endsWith(input, suffix) {
        return suffix == input.substring(input.length - suffix.length);
    }
    /**guid*/
    static getGUIDString() {
        let d = Date.now();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    /**
     * 首字母大学
     */
    static firstUpperCase(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    /**
     * 格式化下划线的单词
     */
    static formatDashWord(word, capFirst = false) {
        let first = true;
        let result = "";
        word.split('_').forEach((sec) => {
            if (first) {
                if (capFirst) {
                    result = UtilString.firstUpperCase(sec);
                }
                else {
                    result = sec;
                }
                first = false;
            }
            else {
                result = result + UtilString.firstUpperCase(sec);
            }
        });
        return result;
    }
    /**
     * 截取字符串
     * @param str 字符串
     * @param start 开始位置
     * @param end 结束位置
     */
    static substring(str, start, end) {
        return str.substring(start, end);
    }
    /**
     * 截取字符串
     * @param str 字符串
     * @param start 开始位置
     * @param long 截取长度
     */
    static substr(str, start, long) {
        return str.substr(start, long);
    }
    /**
     * 字符串转对象
     * @param str
     */
    static strToObject(str) {
        const strToObj = JSON.parse(str);
        return strToObj;
    }
    /**
     * 对象转字符串
     * @param str
     */
    static objToStr(obj) {
        const objToStr = JSON.stringify(obj);
        return objToStr;
    }
}
exports.UtilString = UtilString;
},{}],34:[function(require,module,exports){
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
},{}],35:[function(require,module,exports){
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
            inviteUI.uiView = { "type": "DialogBase", "props": { "width": 750, "height": 1334 }, "compId": 2, "loadList": [], "loadList3D": [] };
            com.inviteUI = inviteUI;
            REG("ui.view.com.inviteUI", inviteUI);
            class lotteryUI extends DialogBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(lotteryUI.uiView);
                }
            }
            lotteryUI.uiView = { "type": "DialogBase", "props": { "width": 750, "height": 1334 }, "compId": 2, "animations": [{ "nodes": [{ "target": 34, "keyframes": { "x": [{ "value": 367, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "x", "index": 0 }, { "value": 367, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "x", "index": 10 }, { "value": 367, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "x", "index": 25 }], "visible": [{ "value": true, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 0 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 10 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 15 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 25 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 30 }], "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 10 }, { "value": 7, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 15 }, { "value": 7, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 25 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 30 }] } }], "name": "idle", "id": 1, "frameRate": 24, "action": 0 }], "loadList": [], "loadList3D": [] };
            com.lotteryUI = lotteryUI;
            REG("ui.view.com.lotteryUI", lotteryUI);
            class rankUI extends DialogBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(rankUI.uiView);
                }
            }
            rankUI.uiView = { "type": "DialogBase", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "WXOpenDataViewer", "props": { "y": 381, "x": 116, "width": 524, "mouseThrough": true, "iconSign": "wx", "height": 858, "runtime": "laya.ui.WXOpenDataViewer" }, "compId": 3 }], "loadList": [], "loadList3D": [] };
            com.rankUI = rankUI;
            REG("ui.view.com.rankUI", rankUI);
            class shopUI extends DialogBase {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(shopUI.uiView);
                }
            }
            shopUI.uiView = { "type": "DialogBase", "props": { "width": 750, "mouseThrough": true, "height": 1334 }, "compId": 2, "loadList": [], "loadList3D": [] };
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
            bgUI.uiView = { "type": "ViewBase", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Image", "props": { "var": "imgBg", "top": 0, "skin": "res/main/bg/bg.png", "right": 0, "left": 0, "bottom": 0 }, "compId": 5 }], "loadList": ["res/main/bg/bg.png"], "loadList3D": [] };
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
            effectUI.uiView = { "type": "ViewBase", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 64, "x": 72, "width": 213, "skin": "res/main/effect/image_status.png", "height": 46 }, "compId": 3 }, { "type": "Image", "props": { "y": 64, "x": 459, "width": 213, "skin": "res/main/effect/image_status.png", "height": 46 }, "compId": 4 }, { "type": "Image", "props": { "y": 48, "x": 403, "skin": "res/main/effect/img_diamond.png" }, "compId": 5 }, { "type": "Image", "props": { "y": 44, "x": 30, "skin": "res/main/effect/img_glod.png" }, "compId": 6 }, { "type": "Button", "props": { "y": 282, "x": 375, "width": 207, "var": "btnLucky", "stateNum": 1, "skin": "res/main/effect/btn_common_1.png", "height": 104, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 7, "child": [{ "type": "Label", "props": { "valign": "middle", "top": 0, "text": "转盘", "right": 0, "left": 0, "fontSize": 40, "bottom": 0, "bold": true, "align": "center" }, "compId": 11 }] }, { "type": "Button", "props": { "y": 439, "x": 375, "width": 207, "var": "btnRank", "stateNum": 1, "skin": "res/main/effect/btn_common_2.png", "height": 104, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 8, "child": [{ "type": "Label", "props": { "valign": "middle", "top": 0, "text": "排行", "right": 0, "left": 0, "fontSize": 40, "bottom": 0, "bold": true, "align": "center" }, "compId": 12 }] }, { "type": "Button", "props": { "y": 606, "x": 375, "width": 207, "var": "btnInvite", "stateNum": 1, "skin": "res/main/effect/btn_common_3.png", "height": 104, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 9, "child": [{ "type": "Label", "props": { "valign": "middle", "top": 0, "text": "邀请", "right": 0, "left": 0, "fontSize": 40, "bottom": 0, "bold": true, "align": "center" }, "compId": 13 }] }, { "type": "Button", "props": { "y": 776, "x": 375, "width": 207, "var": "btnSetting", "stateNum": 1, "skin": "res/main/effect/btn_common_4.png", "height": 104, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 10, "child": [{ "type": "Label", "props": { "valign": "middle", "top": 0, "text": "设置", "right": 0, "left": 0, "fontSize": 40, "bottom": 0, "bold": true, "align": "center" }, "compId": 14 }] }], "loadList": ["res/main/effect/image_status.png", "res/main/effect/img_diamond.png", "res/main/effect/img_glod.png", "res/main/effect/btn_common_1.png", "res/main/effect/btn_common_2.png", "res/main/effect/btn_common_3.png", "res/main/effect/btn_common_4.png"], "loadList3D": [] };
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
},{"../framework/manager/ui/dialog-base":23,"../framework/manager/ui/view-base":25}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWFBaXJJREUvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL01haW4udHMiLCJzcmMvY2xpZW50L3NjZW5lL21haW4tc2NlbmUudHMiLCJzcmMvY2xpZW50L3ZpZXcvbGF5ZXItdmlldy9iZy12aWV3LnRzIiwic3JjL2NsaWVudC92aWV3L2xheWVyLXZpZXcvZDMtdmlldy50cyIsInNyYy9jbGllbnQvdmlldy9sYXllci12aWV3L2VmZmVjdC12aWV3LnRzIiwic3JjL2NsaWVudC92aWV3L2xheWVyLXZpZXcvZ2FtZS12aWV3LnRzIiwic3JjL2NsaWVudC92aWV3L2xheWVyLXZpZXcvbG9hZGluZy12aWV3LnRzIiwic3JjL2NsaWVudC92aWV3L2xheWVyLXZpZXcvcG9wdXAtdmlldy50cyIsInNyYy9mcmFtZXdvcmsvY29yZS9sb2cudHMiLCJzcmMvZnJhbWV3b3JrL2NvcmUvb2JqZWN0LXBvb2wudHMiLCJzcmMvZnJhbWV3b3JrL2NvcmUvc2luZ2xldG9uLnRzIiwic3JjL2ZyYW1ld29yay9jb3JlL3RpbWUtZGVsYXkudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvZGF0YS9kYXRhLW1hbmFnZXIudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvZXZlbnQvZXZlbnQtZGF0YS50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci9ldmVudC9ldmVudC1ub2RlLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL2pzb24vanNvbi10ZW1wbGF0ZS50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLWdyb3VwLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL3Jlcy9yZXMtaXRlbS50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLW1hbmFnZXIudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvdGltZXIvdGltZXItZW50aXR5LnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL3RpbWVyL3RpbWVyLWludGVydmFsLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL3RpbWVyL3RpbWVyLW1hbmFnZXIudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvdWkvZGlhbG9nLWJhc2UudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvdWkvc2NlbmUtYmFzZS50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci91aS92aWV3LWJhc2UudHMiLCJzcmMvZnJhbWV3b3JrL3J1bnRpbWUvZW5naW5lLnRzIiwic3JjL2ZyYW1ld29yay9zZXR0aW5nL2NvbmZpZy50cyIsInNyYy9mcmFtZXdvcmsvc2V0dGluZy9lbnVtLnRzIiwic3JjL2ZyYW1ld29yay91dGlsL2FycmF5LnRzIiwic3JjL2ZyYW1ld29yay91dGlsL2Rpc3BsYXkudHMiLCJzcmMvZnJhbWV3b3JrL3V0aWwvbG9hZDNkLnRzIiwic3JjL2ZyYW1ld29yay91dGlsL251bWJlci50cyIsInNyYy9mcmFtZXdvcmsvdXRpbC9zdHJpbmcudHMiLCJzcmMvZnJhbWV3b3JrL3V0aWwvdGltZS50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVEEsdURBQW9EO0FBR3BEOzs7Ozs7R0FNRztBQUNIO0lBRUMsZ0RBQWdEO0lBQ2hELHNEQUFzRDtJQUN0RCx3QkFBd0I7SUFDeEIsOERBQThEO0lBRTlELHdEQUF3RDtJQUN4RCxrR0FBa0c7SUFDbEcsK0ZBQStGO0lBQy9GLDBDQUEwQztJQUMxQyxpQ0FBaUM7SUFFakMsb0RBQW9EO0lBQ3BELDJJQUEySTtJQUMzSSxpQ0FBaUM7SUFDakMsOEJBQThCO0lBQzlCLElBQUk7SUFFSiw0QkFBNEI7SUFDNUIsbURBQW1EO0lBQ25ELG9HQUFvRztJQUNwRyxJQUFJO0lBRUosMkJBQTJCO0lBQzNCLGdCQUFnQjtJQUNoQixvRUFBb0U7SUFDcEUsSUFBSTtJQUVKO1FBRUMs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LEdBQU0sRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsV0FBVyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFD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QyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsa0NBQWtDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsa0NBQWtDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsa0NBQWtDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsa0NBQWtDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxrQ0FBa0MsRUFBQyxpQ0FBaUMsRUFBQyw4QkFBOEIsRUFBQyxrQ0FBa0MsRUFBQyxrQ0FBa0MsRUFBQyxrQ0FBa0MsRUFBQyxrQ0FBa0MsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQztZQUxwbUUsYUFBUSxXQVdwQixDQUFBO1lBQ0QsR0FBRyxDQUFDLHVCQUF1QixFQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLFlBQW9CLFNBQVEsUUFBUTtnQkFJaEMsZ0JBQWUsS0FBSyxFQUFFLENBQUEsQ0FBQSxDQUFDO2dCQUN2QixjQUFjO29CQUNWLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7O1lBTGMsYUFBTSxHQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQztZQUh6NkYsV0FBTSxTQVNsQixDQUFBO1lBQ0QsR0FBRyxDQUFDLHFCQUFxQixFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLGVBQXVCLFNBQVEsUUFBUTtnQkFPbkMsZ0JBQWUsS0FBSyxFQUFFLENBQUEsQ0FBQSxDQUFDO2dCQUN2QixjQUFjO29CQUNWLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7O1lBTGMsZ0JBQU0sR0FBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsZ0NBQWdDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLGtDQUFrQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLHdCQUF3QixFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLDJCQUEyQixFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsZ0NBQWdDLEVBQUMsa0NBQWtDLEVBQUMsd0JBQXdCLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUM7WUFOdndDLGNBQVMsWUFZckIsQ0FBQTtZQUNELEdBQUcsQ0FBQyx3QkFBd0IsRUFBQyxTQUFTLENBQUMsQ0FBQztZQUN4QyxhQUFxQixTQUFRLFFBQVE7Z0JBRWpDLGdCQUFlLEtBQUssRUFBRSxDQUFBLENBQUEsQ0FBQztnQkFDdkIsY0FBYztvQkFDVixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQyxDQUFDOztZQUxjLGNBQU0sR0FBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQztZQURuSCxZQUFPLFVBT25CLENBQUE7WUFDRCxHQUFHLENBQUMsc0JBQXNCLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxFQW5FcUIsSUFBSSxHQUFKLFNBQUksS0FBSixTQUFJLFFBbUV6QjtJQUFELENBQUMsRUFuRWdCLElBQUksR0FBSixPQUFJLEtBQUosT0FBSSxRQW1FcEI7QUFBRCxDQUFDLEVBbkVhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQW1FZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gJy4vZnJhbWV3b3JrL3J1bnRpbWUvZW5naW5lJztcclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxOTowNVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOa4uOaIj+WQr+WKqOWFpeWPo1xyXG4gKlxyXG4gKi9cclxuY2xhc3MgTWFpbiB7XHJcblxyXG5cdC8vIFx0TGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcblx0Ly8gXHRMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHQvLyBcdC8v5YW85a655b6u5L+h5LiN5pSv5oyB5Yqg6L29c2NlbmXlkI7nvIDlnLrmma9cclxuXHQvLyBcdExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbjtcclxuXHJcblx0Ly8gXHQvL+aJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIlcclxuXHQvLyBcdGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcblx0Ly8gXHRpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG5cdC8vIFx0aWYgKEdhbWVDb25maWcuc3RhdCkgTGF5YS5TdGF0LnNob3coKTtcclxuXHQvLyBcdExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7XHJcblxyXG5cdC8vIFx0Ly/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuXHQvLyBcdC8vIExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblx0Ly8gXHRsZXQgdmlldyA9IG5ldyBMb2FkaW5nVmlldygpO1xyXG5cdC8vIFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh2aWV3KTtcclxuXHQvLyB9XHJcblxyXG5cdC8vIG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuXHQvLyBcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0Ly8gXHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdC8vIH1cclxuXHJcblx0Ly8gb25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblx0Ly8gXHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdC8vIFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cdC8vIH1cclxuXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdEVuZ2luZS4kLnJ1bigpO1xyXG5cdH1cclxufVxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJpbXBvcnQge0N1c3RvbVNjZW5lfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL21hbmFnZXIvdWkvc2NlbmUtYmFzZVwiO1xyXG5pbXBvcnQgTHlTY2VuZSA9IEN1c3RvbVNjZW5lLkx5U2NlbmU7XHJcbmltcG9ydCB7IEJnVmlldyB9IGZyb20gJy4uL3ZpZXcvbGF5ZXItdmlldy9iZy12aWV3JztcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcclxuXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxMToyMFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOS4u+WcuuaZr1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1haW5TY2VuZSBleHRlbmRzIEx5U2NlbmUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5uZWVkTG9hZFJlc1xyXG4gICAgICAgICAgICAuYWRkKFwicmVzL2JnLzEyMy5wbmdcIiwgTGF5YS5Mb2FkZXIuSU1BR0UpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdWkgfSBmcm9tICcuLi8uLi8uLi91aS9sYXlhTWF4VUknO1xuaW1wb3J0IGJnVUkgPSAgdWkudmlldy5tYWluLmJnVUk7XG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2RhdGEvZGF0YS1iYXNlJztcblxuXG4vKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTExIDExOjIzXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiBcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBCZ1ZpZXcgZXh0ZW5kcyBiZ1VJe1xuXG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouWxnuaAp+euoeeQhioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLnlJ/lkb3lkajmnJ8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQmdWaWV3XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6IEJnVmlldyB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBCZ1ZpZXcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBvbkF3YWtlKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XG4gICAgICAgIHRoaXMuSW5pdCgpO1xuICAgICAgICB0aGlzLnN1aXRJbml0KCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMluS4gOasoVxuICAgICAqL1xuICAgIHB1YmxpYyBJbml0KCkge1xuXG4gICAgICAgIHRoaXMuaW5pdE9uY2UoKTtcblxuICAgICAgICAvLyAvL+aVsOaNruebkeWQrFxuICAgICAgICAvLyB0aGlzLmFkZERhdGFXYXRjaChEYXRhRGVmaW5lLlVzZXJJbmZvKTtcblxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uV2VpWGluKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRMaW5rKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgILphY1cbiAgICAgKi9cbiAgICBzdWl0SW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcbiAgICB9XG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouWIneWni+aVsOaNrioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyoqIERlczrmnoTpgKDmmK/liJ3lp4vljJbkuIDmrKEgKi9cbiAgICBwcml2YXRlIGluaXRPbmNlKClcbiAgICB7XG5cbiAgICB9XG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlpJbpg6jov57mjqXov5vlhaXliKTmlq0qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKiogRGVzOuWIpOaWrei/m+WFpei/nuaOpeS/oeaBryAqL1xuICAgIHByaXZhdGUgaW5pdExpbmsoKSB7XG5cblxuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouS6i+S7tuebuOWFsyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5pWw5o2u5pS55Y+Y55qE55uR5ZCsKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qKlxuICAgICAqIOWIt+aWsOaVsOaNrlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvbkRhdGEoZGF0YTogRGF0YUJhc2UpIHtcbiAgICAgICBcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8t5YiG55WM57q/LS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn0iLCJpbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlcjtcbmltcG9ydCB7UG9wdXBWaWV3fSBmcm9tIFwiLi9wb3B1cC12aWV3XCI7XG5pbXBvcnQge0dhbWVWaWV3fSBmcm9tIFwiLi9nYW1lLXZpZXdcIjtcbmltcG9ydCB7RWZmZWN0Vmlld30gZnJvbSBcIi4vZWZmZWN0LXZpZXdcIjtcbmltcG9ydCB7IHVpIH0gZnJvbSAnLi4vLi4vLi4vdWkvbGF5YU1heFVJJztcbmltcG9ydCBkM1VJID0gIHVpLnZpZXcubWFpbi5kM1VJO1xuaW1wb3J0IHsgRGF0YUJhc2UgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9kYXRhL2RhdGEtYmFzZSc7XG5pbXBvcnQgeyBVdGlsTG9hZDNEIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL3V0aWwvbG9hZDNkJztcbmltcG9ydCB7IENvbmZpZzNEIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL3NldHRpbmcvY29uZmlnJztcblxuXG4vKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTExIDEyOjAzXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiAzROWcuuaZr+WxglxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEQzVmlldyBleHRlbmRzIGQzVUl7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLlsZ7mgKfnrqHnkIYqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qKiBEZXM6M0TlnLrmma8gKi9cbiAgICBwdWJsaWMgc2NlbmUzRDpMYXlhLlNjZW5lM0Q7XG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueUn+WRveWRqOacnyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBEM1ZpZXdcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogRDNWaWV3IHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IEQzVmlldygpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG5cblxuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBvbkF3YWtlKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XG4gICAgICAgIHRoaXMuSW5pdCgpO1xuICAgICAgICB0aGlzLnN1aXRJbml0KCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMluS4gOasoVxuICAgICAqL1xuICAgIHB1YmxpYyBJbml0KCkge1xuXG4gICAgICAgIHRoaXMuaW5pdE9uY2UoKTtcblxuICAgICAgICAvLyAvL+aVsOaNruebkeWQrFxuICAgICAgICAvLyB0aGlzLmFkZERhdGFXYXRjaChEYXRhRGVmaW5lLlVzZXJJbmZvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmr4/mrKHlvLnlh7rliJ3lp4vljJbkuIDmrKFcbiAgICAgKi9cbiAgICBwb3B1cEluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdEFsbCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6YCC6YWNXG4gICAgICovXG4gICAgc3VpdEluaXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XG4gICAgfVxuXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLliJ3lp4vmlbDmja4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qKiBEZXM65p6E6YCg5piv5Yid5aeL5YyW5LiA5qyhICovXG4gICAgcHJpdmF0ZSBpbml0T25jZSgpXG4gICAge1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvKiogRGVzOuavj+asoeW8ueWHuuWIneWni+WMliAqL1xuICAgIHByaXZhdGUgaW5pdEFsbCgpXG4gICAge1xuXG4gICAgfVxuXG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlpJbpg6jov57mjqXov5vlhaXliKTmlq0qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKiogRGVzOuWIpOaWrei/m+WFpei/nuaOpeS/oeaBryAqL1xuICAgIHByaXZhdGUgaW5pdExpbmsoKSB7XG5cblxuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouS6i+S7tuebuOWFsyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqM0TlnLrmma/liqDovb3lrozmiJDlm57osIMqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyoqXG4gICAgICog5Yqg6L29M0TlnLrmma9cbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZDNEU2NlbmUoY2FsbEJhY2spXG4gICAge1xuICAgICAgICBVdGlsTG9hZDNELmxvYWRTY2VuZSh0aGlzLENvbmZpZzNELiQuc2NlbmVQYXRoLChzY2VuZSk9PntcbiAgICAgICAgICAgIHRoaXMuc2NlbmUzRCA9IHNjZW5lO1xuICAgICAgICAgICAgY2FsbEJhY2suY2FsbCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaVsOaNruaUueWPmOeahOebkeWQrCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKipcbiAgICAgKiDliLfmlrDmlbDmja5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25EYXRhKGRhdGE6IERhdGFCYXNlKSB7XG4gICAgICBcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8t5YiG55WM57q/LS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn0iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi4vLi4vLi4vdWkvbGF5YU1heFVJXCI7XG5pbXBvcnQgZWZmZWN0VUkgPSAgdWkudmlldy5tYWluLmVmZmVjdFVJO1xuXG5pbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlcjtcbmltcG9ydCB7IERhdGFCYXNlIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL21hbmFnZXIvZGF0YS9kYXRhLWJhc2UnO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcblxuZXhwb3J0IGNsYXNzIEVmZmVjdFZpZXcgZXh0ZW5kcyBlZmZlY3RVSXtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouWxnuaAp+euoeeQhioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLnlJ/lkb3lkajmnJ8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogRWZmZWN0Vmlld1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOiBFZmZlY3RWaWV3IHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IEVmZmVjdFZpZXcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG5cblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgb25Bd2FrZSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25Bd2FrZSgpO1xuICAgICAgICB0aGlzLkluaXQoKTtcbiAgICAgICAgdGhpcy5zdWl0SW5pdCgpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbkuIDmrKFcbiAgICAgKi9cbiAgICBwdWJsaWMgSW5pdCgpIHtcblxuICAgICAgICB0aGlzLmluaXRPbmNlKCk7XG5cbiAgICAgICAgLy8gLy/mlbDmja7nm5HlkKxcbiAgICAgICAgLy8gdGhpcy5hZGREYXRhV2F0Y2goRGF0YURlZmluZS5Vc2VySW5mbyk7XG5cbiAgICAgICAgaWYgKEJyb3dzZXIub25XZWlYaW4pIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdExpbmsoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5q+P5qyh5by55Ye65Yid5aeL5YyW5LiA5qyhXG4gICAgICovXG4gICAgcG9wdXBJbml0KCkge1xuICAgICAgICB0aGlzLmluaXRBbGwoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOmAgumFjVxuICAgICAqL1xuICAgIHN1aXRJbml0KClcbiAgICB7XG4gICAgICAgIHRoaXMud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xuICAgIH1cblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5Yid5aeL5pWw5o2uKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKiogRGVzOuaehOmAoOaYr+WIneWni+WMluS4gOasoSAqL1xuICAgIHByaXZhdGUgaW5pdE9uY2UoKVxuICAgIHtcbiAgICAgICAgdGhpcy5idG5MdWNreS5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntcbiAgICAgICAgICAgIExvZy5sb2coXCLmtYvor5VcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBEZXM65q+P5qyh5by55Ye65Yid5aeL5YyWICovXG4gICAgcHJpdmF0ZSBpbml0QWxsKClcbiAgICB7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuWklumDqOi/nuaOpei/m+WFpeWIpOaWrSoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qKiBEZXM65Yik5pat6L+b5YWl6L+e5o6l5L+h5oGvICovXG4gICAgcHJpdmF0ZSBpbml0TGluaygpIHtcblxuXG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i54K55Ye75LqL5Lu2KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaVsOaNruaUueWPmOeahOebkeWQrCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKipcbiAgICAgKiDliLfmlrDmlbDmja5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25EYXRhKGRhdGE6IERhdGFCYXNlKSB7XG4gICAgIFxuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy3liIbnlYznur8tLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufSIsImltcG9ydCB7dWl9IGZyb20gXCIuLi8uLi8uLi91aS9sYXlhTWF4VUlcIjtcbmltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xuaW1wb3J0IGdhbWVVSSA9IHVpLnZpZXcubWFpbi5nYW1lVUk7XG5pbXBvcnQgUHJlZmFiID0gTGF5YS5QcmVmYWI7XG5pbXBvcnQgVHdlZW4gPSBMYXlhLlR3ZWVuO1xuaW1wb3J0IEVhc2UgPSBMYXlhLkVhc2U7XG5pbXBvcnQgSGFuZGxlciA9IExheWEuSGFuZGxlcjtcbmltcG9ydCBQb2ludCA9IExheWEuUG9pbnQ7XG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2RhdGEvZGF0YS1iYXNlJztcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLW1hbmFnZXInO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcblxuXG4vKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTExIDE4OjA4XG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiDkuLvpobVcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBHYW1lVmlldyBleHRlbmRzIGdhbWVVSSB7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLlsZ7mgKfnrqHnkIYqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i55Sf5ZG95ZGo5pyfKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEdhbWVWaWV3XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6IEdhbWVWaWV3IHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IEdhbWVWaWV3KCk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxuXG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG9uQXdha2UoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uQXdha2UoKTtcbiAgICAgICAgdGhpcy5Jbml0KCk7XG4gICAgICAgIHRoaXMuc3VpdEluaXQoKTtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yid5aeL5YyW5LiA5qyhXG4gICAgICovXG4gICAgcHVibGljIEluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5pbml0T25jZSgpO1xuXG4gICAgICAgIC8vIC8v5pWw5o2u55uR5ZCsXG4gICAgICAgIC8vIHRoaXMuYWRkRGF0YVdhdGNoKERhdGFEZWZpbmUuVXNlckluZm8pO1xuXG4gICAgICAgIGlmIChCcm93c2VyLm9uV2VpWGluKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRMaW5rKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOavj+asoeW8ueWHuuWIneWni+WMluS4gOasoVxuICAgICAqL1xuICAgIHBvcHVwSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0QWxsKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDpgILphY1cbiAgICAgKi9cbiAgICBzdWl0SW5pdCgpXG4gICAge1xuICAgIFxuICAgIH1cblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5Yid5aeL5pWw5o2uKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKiogRGVzOuaehOmAoOaYr+WIneWni+WMluS4gOasoSAqL1xuICAgIHByaXZhdGUgaW5pdE9uY2UoKVxuICAgIHtcbiAgICB9XG5cbiAgICAvKiogRGVzOuavj+asoeW8ueWHuuWIneWni+WMliAqL1xuICAgIHByaXZhdGUgaW5pdEFsbCgpXG4gICAge1xuXG4gICAgfVxuXG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlpJbpg6jov57mjqXov5vlhaXliKTmlq0qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKiogRGVzOuWIpOaWrei/m+WFpei/nuaOpeS/oeaBryAqL1xuICAgIHByaXZhdGUgaW5pdExpbmsoKSB7XG5cblxuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueCueWHu+S6i+S7tioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbiBcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaVsOaNruaUueWPmOeahOebkeWQrCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKipcbiAgICAgKiDliLfmlrDmlbDmja5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25EYXRhKGRhdGE6IERhdGFCYXNlKSB7XG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLeWIhueVjOe6vy0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4uLy4uLy4uL3VpL2xheWFNYXhVSVwiO1xuaW1wb3J0IGxvYWRpbmdVSSA9IHVpLnZpZXcubWFpbi5sb2FkaW5nVUk7XG5pbXBvcnQgeyBJTG9haW5nIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL2ludGVyZmFjZS9pLUxvYWRpbmcnO1xuaW1wb3J0IHsgQmdWaWV3IH0gZnJvbSAnLi9iZy12aWV3JztcbmltcG9ydCB7IEQzVmlldyB9IGZyb20gJy4vZDMtdmlldyc7XG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2RhdGEvZGF0YS1iYXNlJztcbmltcG9ydCB7IENvbmZpZ1VJLCBDb25maWdHYW1lLCBDb25maWdSZXMgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvc2V0dGluZy9jb25maWcnO1xuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL21hbmFnZXIvZXZlbnQvZXZlbnQtbWFuYWdlcic7XG5pbXBvcnQgeyBVdGlsTnVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL3V0aWwvbnVtYmVyJztcbmltcG9ydCB7IGVudW1EaW1lbnNpb24gfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvc2V0dGluZy9lbnVtJztcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSAnLi9nYW1lLXZpZXcnO1xuaW1wb3J0IHsgRWZmZWN0VmlldyB9IGZyb20gJy4vZWZmZWN0LXZpZXcnO1xuaW1wb3J0IHsgUG9wdXBWaWV3IH0gZnJvbSAnLi9wb3B1cC12aWV3JztcbmltcG9ydCB7IEV2ZW50RnVuYyB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2V2ZW50L2V2ZW50LWRhdGEnO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLW1hbmFnZXInO1xuaW1wb3J0IHsgUmVzR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLWdyb3VwJztcblxuXG5cbmV4cG9ydCBjbGFzcyBMb2FkaW5nVmlldyBleHRlbmRzIGxvYWRpbmdVSSBpbXBsZW1lbnRzIElMb2Fpbmd7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLlsZ7mgKfnrqHnkIYqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i55Sf5ZG95ZGo5pyfKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBvbkF3YWtlKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XG4gICAgICAgIHRoaXMuSW5pdCgpO1xuICAgICAgICB0aGlzLnN1aXRJbml0KCk7XG4gICAgfVxuXG4gICAgICAvKipcbiAgICAgKiDliqDovb3pobXpnaLlkK/liqjpoblcbiAgICAgKi9cbiAgICBvblN0YXJ0KCk6IHZvaWQge1xuICAgICAgXG4gICAgICAgIC8v5Yqg6L295Li75Zy65pmv5omA6ZyA6KaB55qE6LWE5rqQ5L+h5oGvXG4gICAgICAgIFJlc01hbmFnZXIuJC5sb2FkR3JvdXAoXG4gICAgICAgICAgICBDb25maWdSZXMuJC5kZWZhdWx0TWFpblJlcyxcbiAgICAgICAgICAgIG5ldyBFdmVudEZ1bmModGhpcyx0aGlzLm9uUHJvZ3Jlc3MpLFxuICAgICAgICAgICAgbmV3IEV2ZW50RnVuYyh0aGlzLHRoaXMub25Db21wbGV0ZWQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGJsTG9hZGluZy50ZXh0ID0gXCLmuLjmiI/nmbvlvZXkuK0uLi5cIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb3lrozmiJDlm57osINcbiAgICAgKiBAcGFyYW0gc3VjY2Vzc1xuICAgICAqL1xuICAgIG9uQ29tcGxldGVkKHN1Y2Nlc3M6IGJvb2xlYW4pOiB2b2lkIHtcblxuICAgICAgICAvL0Jn6aG16Z2iXG4gICAgICAgIGxldCBiZ1ZpZXcgPSBCZ1ZpZXcuJDtcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChiZ1ZpZXcpO1xuXG4gICAgICAgIGlmKENvbmZpZ0dhbWUuJC5kaW1lbnNpb249PWVudW1EaW1lbnNpb24uRGltMylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8zROmhtemdolxuICAgICAgICAgICAgbGV0IGQzVmlldyA9IEQzVmlldy4kO1xuICAgICAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChkM1ZpZXcpO1xuICAgICAgICAgICAgZDNWaWV3LmxvYWQzRFNjZW5lKHRoaXMuc2hvd1ZpZXcpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHNob3dWaWV3KClcbiAgICB7XG4gICAgICAgIC8v5Li76aG1XG4gICAgICAgIGxldCBnYW1lVmlldyA9IEdhbWVWaWV3LiQ7XG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQoZ2FtZVZpZXcpO1xuICAgICAgICAvL+aViOaenOmhtVxuICAgICAgICBsZXQgZWZmZWN0VmlldyA9IEVmZmVjdFZpZXcuJDtcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChlZmZlY3RWaWV3KTtcbiAgICAgICAgLy/lvLnnqpfpobVcbiAgICAgICAgbGV0IHBvcHVwVmlldyA9IFBvcHVwVmlldy4kO1xuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHBvcHVwVmlldyk7XG4gICAgICAgIC8v57uT5p2f6ZSA5q+B5Yqg6L296aG1XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWKoOi9vei/m+W6plxuICAgICAqIEBwYXJhbSBwcm9ncmVzc1xuICAgICAqL1xuICAgIG9uUHJvZ3Jlc3MocHJvZ3Jlc3M6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIGxldCBmaXhlZCA9IFV0aWxOdW1iZXIudG9GaXhlZChwcm9ncmVzcyoxMDAsIDApO1xuICAgICAgICB0aGlzLmxibExvYWRpbmcudGV4dCA9IGZpeGVkICsgXCIlXCI7XG4gICAgICAgIHRoaXMucHJvX0xvYWRpbmcudmFsdWUgPSBmaXhlZC8xMDA7XG4gICAgfVxuXG4gIFxuXG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbkuIDmrKFcbiAgICAgKi9cbiAgICBwdWJsaWMgSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0T25jZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOavj+asoeW8ueWHuuWIneWni+WMluS4gOasoVxuICAgICAqL1xuICAgIHBvcHVwSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0QWxsKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDpgILphY1cbiAgICAgKi9cbiAgICBzdWl0SW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcbiAgICAgICAgdGhpcy5pbWdfYmcud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICB0aGlzLmltZ19iZy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5pbWdfYmcueCA9IDA7XG4gICAgICAgIHRoaXMuaW1nX2JnLnkgPSAwO1xuICAgIH1cblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5Yid5aeL5pWw5o2uKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKiogRGVzOuaehOmAoOaYr+WIneWni+WMluS4gOasoSAqL1xuICAgIHByaXZhdGUgaW5pdE9uY2UoKVxuICAgIHtcblxuICAgIH1cblxuICAgIC8qKiBEZXM65q+P5qyh5by55Ye65Yid5aeL5YyWICovXG4gICAgcHJpdmF0ZSBpbml0QWxsKClcbiAgICB7XG5cbiAgICB9XG5cblxuXG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlpJbpg6jov57mjqXov5vlhaXliKTmlq0qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKiogRGVzOuWIpOaWrei/m+WFpei/nuaOpeS/oeaBryAqL1xuICAgIHByaXZhdGUgaW5pdExpbmsoKSB7XG5cblxuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueCueWHu+S6i+S7tioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaVsOaNruaUueWPmOeahOebkeWQrCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvKipcbiAgICAgKiDliLfmlrDmlbDmja5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25EYXRhKGRhdGE6IERhdGFCYXNlKSB7XG4gICAgIFxuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy3liIbnlYznur8tLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirplIDmr4Hoh6rouqsqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICBkZXN0cm95KClcbiAgICB7XG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xuICAgICAgICBSZXNNYW5hZ2VyLiQucmVsZWFzZUdyb3VwKENvbmZpZ1Jlcy4kLmRlZmF1bHRMb2FkUmVzKTtcbiAgICB9XG5cbiAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy3liIbnlYznur8tLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufSIsImltcG9ydCB7dWl9IGZyb20gXCIuLi8uLi8uLi91aS9sYXlhTWF4VUlcIjtcbmltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xuaW1wb3J0IHBvcHVwVUkgPSAgdWkudmlldy5tYWluLnBvcHVwVUk7XG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2RhdGEvZGF0YS1iYXNlJztcblxuXG4vKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTExIDE5OjAyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiDlvLnlh7rlsYJcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBQb3B1cFZpZXcgZXh0ZW5kcyBwb3B1cFVJe1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5bGe5oCn566h55CGKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueUn+WRveWRqOacnyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBQb3B1cFZpZXdcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogUG9wdXBWaWV3IHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IFBvcHVwVmlldygpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG5cblxuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBvbkF3YWtlKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XG4gICAgICAgIHRoaXMuSW5pdCgpO1xuICAgICAgICB0aGlzLnN1aXRJbml0KCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMluS4gOasoVxuICAgICAqL1xuICAgIHB1YmxpYyBJbml0KCkge1xuXG4gICAgICAgIHRoaXMuaW5pdE9uY2UoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOavj+asoeW8ueWHuuWIneWni+WMluS4gOasoVxuICAgICAqL1xuICAgIHBvcHVwSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0QWxsKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDpgILphY1cbiAgICAgKi9cbiAgICBzdWl0SW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcbiAgICB9XG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouWIneWni+aVsOaNrioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyoqIERlczrmnoTpgKDmmK/liJ3lp4vljJbkuIDmrKEgKi9cbiAgICBwcml2YXRlIGluaXRPbmNlKClcbiAgICB7XG5cbiAgICB9XG5cbiAgICAvKiogRGVzOuavj+asoeW8ueWHuuWIneWni+WMliAqL1xuICAgIHByaXZhdGUgaW5pdEFsbCgpXG4gICAge1xuXG4gICAgfVxuXG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueCueWHu+S6i+S7tioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirmlbDmja7mlLnlj5jnmoTnm5HlkKwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLyoqXG4gICAgICog5Yi35paw5pWw5o2uXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG9uRGF0YShkYXRhOiBEYXRhQmFzZSkge1xuICAgICAgXG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLeWIhueVjOe6vy0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59IiwiaW1wb3J0IHsgQ29uZmlnRGVidWcgfSBmcm9tICcuLi9zZXR0aW5nL2NvbmZpZyc7XG5cbiAvKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTA5IDE1OjU5XG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiDovpPlh7rkv6Hmga/nrqHnkIZcbiAqL1xuZXhwb3J0IGNsYXNzIExvZyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlYnVnKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzRGVidWcpIGNvbnNvbGUuZGVidWcoXCJbZGVidWddXCIsIGFyZ3MudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpbmZvKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzRGVidWcpIGNvbnNvbGUuaW5mbyhcIltpbmZvXVwiLCBhcmdzLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgd2FybiguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc0RlYnVnKSBjb25zb2xlLndhcm4oXCJbd2Fybl1cIiwgYXJncy50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGVycm9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzRGVidWcpIGNvbnNvbGUuZXJyb3IoXCJbZXJyb3JdXCIsIGFyZ3MudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBleGNlcHRpb24oLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKENvbmZpZ0RlYnVnLiQuaXNEZWJ1ZykgY29uc29sZS5leGNlcHRpb24oXCJbZXhjZV1cIiwgYXJncy50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc0RlYnVnKSBjb25zb2xlLmxvZyhcIltsb2ddXCIsIGFyZ3MudG9TdHJpbmcoKSk7XG4gICAgfVxuXG5cbiAgICAvKirmiZPljbDorr7lpIfkv6Hmga8qL1xuICAgIHB1YmxpYyBzdGF0aWMgcHJpbnREZXZpY2VJbmZvKCkge1xuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc0RlYnVnICYmIG5hdmlnYXRvcikge1xuICAgICAgICAgICAgbGV0IGFnZW50U3RyID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gYWdlbnRTdHIuaW5kZXhPZihcIihcIik7XG4gICAgICAgICAgICBsZXQgZW5kID0gYWdlbnRTdHIuaW5kZXhPZihcIilcIik7XG5cbiAgICAgICAgICAgIGlmIChzdGFydCA8IDAgfHwgZW5kIDwgMCB8fCBlbmQgPCBzdGFydCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGluZm9TdHIgPSBhZ2VudFN0ci5zdWJzdHJpbmcoc3RhcnQgKyAxLCBlbmQpO1xuXG4gICAgICAgICAgICBsZXQgZGV2aWNlOiBzdHJpbmcsIHN5c3RlbTogc3RyaW5nLCB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgICAgICAgICBsZXQgaW5mb3MgPSBpbmZvU3RyLnNwbGl0KFwiO1wiKTtcbiAgICAgICAgICAgIGlmIChpbmZvcy5sZW5ndGggPT0gMykge1xuICAgICAgICAgICAgICAgIC8v5aaC5p6c5piv5LiJ5Liq55qE6K+d77yMIOWPr+iDveaYr2FuZHJvaWTnmoTvvIwg6YKj5LmI56ys5LiJ5Liq5piv6K6+5aSH5Y+3XG4gICAgICAgICAgICAgICAgZGV2aWNlID0gaW5mb3NbMl07XG4gICAgICAgICAgICAgICAgLy/nrKzkuozkuKrmmK/ns7vnu5/lj7flkozniYjmnKxcbiAgICAgICAgICAgICAgICBsZXQgc3lzdGVtX2luZm8gPSBpbmZvc1sxXS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICAgICAgaWYgKHN5c3RlbV9pbmZvLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN5c3RlbSA9IHN5c3RlbV9pbmZvWzFdO1xuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uID0gc3lzdGVtX2luZm9bMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmZvcy5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgIHN5c3RlbSA9IGluZm9zWzBdO1xuICAgICAgICAgICAgICAgIGRldmljZSA9IGluZm9zWzBdO1xuICAgICAgICAgICAgICAgIHZlcnNpb24gPSBpbmZvc1sxXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3lzdGVtID0gbmF2aWdhdG9yLnBsYXRmb3JtO1xuICAgICAgICAgICAgICAgIGRldmljZSA9IG5hdmlnYXRvci5wbGF0Zm9ybTtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uID0gaW5mb1N0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIExvZy5pbmZvKHN5c3RlbSwgZGV2aWNlLCB2ZXJzaW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG4iLCJpbXBvcnQgeyBMb2cgfSBmcm9tICcuL2xvZyc7XG5cbi8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDgtMDkgMjM6MjVcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uICDlr7nosaHmsaBcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBPYmplY3RQb29sIHtcbiAgICBcbiAgICAvKipcbiAgICAgKiDojrflj5bkuIDkuKrlr7nosaHvvIzkuI3lrZjlnKjliJnliJvlu7pcbiAgICAgKiBAcGFyYW0gY2xhc3NEZWYgIOexu+WQjVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0KGNsYXNzRGVmOiBhbnkpOiBhbnkge1xuICAgICAgICBsZXQgc2lnbjogc3RyaW5nID0gXCJkYy5cIiArIGNsYXNzRGVmLm5hbWU7XG4gICAgICAgIGxldCBvYmo6IGFueSA9IExheWEuUG9vbC5nZXRJdGVtKHNpZ24pO1xuICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgaWYgKCFMYXlhLkNsYXNzVXRpbHMuZ2V0UmVnQ2xhc3Moc2lnbikpIHtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJbcG9vbHNd5rOo5YaM5a+56LGh5rGgOlwiICsgc2lnbik7XG4gICAgICAgICAgICAgICAgTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzKHNpZ24sIGNsYXNzRGVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9iaiA9IExheWEuQ2xhc3NVdGlscy5nZXRJbnN0YW5jZShzaWduKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqICYmIG9ialtcImluaXRcIl0pIG9iai5pbml0KCk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Zue5pS25a+56LGhXG4gICAgICogQHBhcmFtIG9iaiAg5a+56LGh5a6e5L6LXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWNvdmVyKG9iajogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghb2JqKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHByb3RvOiBhbnkgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICAgICAgbGV0IGNsYXp6OiBhbnkgPSBwcm90b1tcImNvbnN0cnVjdG9yXCJdO1xuICAgICAgICBsZXQgc2lnbjogc3RyaW5nID0gXCJkYy5cIiArIGNsYXp6Lm5hbWU7XG4gICAgICAgIG9iai5jbG9zZSgpO1xuICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihzaWduLCBvYmopO1xuICAgIH1cbn1cblxuLyoq5a+56LGh5rGg5Z+657G7Ki9cbmV4cG9ydCBpbnRlcmZhY2UgSVBvb2xPYmplY3Qge1xuICAgIC8vIOWIneWni+WMllxuICAgIGluaXQoKTtcbiAgICAvLyDlhbPpl61cbiAgICBjbG9zZSgpO1xufVxuIiwiaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9sb2cnO1xuXG4gLyoqXG4gKiBAYXV0aG9yIFN1blxuICogQHRpbWUgMjAxOS0wOC0wOSAxNTo1N1xuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gKiBAZGVzY3JpcHRpb24g5Y2V5L6L5bel5YW357G7XG4gKi9cbmV4cG9ydCBjbGFzcyBTaW5nbGV0b24ge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2xhc3NLZXlzOiBGdW5jdGlvbltdID0gW107XG4gICAgcHJpdmF0ZSBzdGF0aWMgY2xhc3NWYWx1ZXM6IGFueVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgbGV0IGNsYXp6OiBhbnkgPSB0aGlzW1wiY29uc3RydWN0b3JcIl07XG4gICAgICAgIGlmICghY2xhenopIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIk5vdCBzdXBwb3J0IGNvbnN0cnVjdG9yIVwiKTtcbiAgICAgICAgICAgIExvZy53YXJuKFwiTm90IHN1cHBvcnQgY29uc3RydWN0b3IhXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIOmYsuatoumHjeWkjeWunuS+i+WMllxuICAgICAgICBpZiAoU2luZ2xldG9uLmNsYXNzS2V5cy5pbmRleE9mKGNsYXp6KSAhPSAtMSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzICsgXCJPbmx5IGluc3RhbmNlIG9uY2UhXCIpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFNpbmdsZXRvbi5jbGFzc0tleXMucHVzaChjbGF6eik7XG4gICAgICAgICAgICBTaW5nbGV0b24uY2xhc3NWYWx1ZXMucHVzaCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiXG4gXG4vKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTA5IDIzOjMxXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiAg5LqL5Lu25Lu75Yqh5bGe5oCnXG4gKlxuICovXG5leHBvcnQgY2xhc3MgVGltZURlbGF5RGF0YSB7XG5cbiAgICAvKirph43lpI3mrKHmlbAgKi9cbiAgICBwdWJsaWMgcmVwZWF0OiBudW1iZXI7XG4gICAgLyoq6Ze06ZqUICovXG4gICAgcHVibGljIGludGVydmFsOiBudW1iZXI7XG4gICAgLyoq5Y+C5pWwICovXG4gICAgcHVibGljIHBhcmFtOiBhbnk7XG4gICAgLyoq5Zue6LCDICovXG4gICAgcHVibGljIGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrO1xuICAgIC8qKuS9nOeUqOWfnyAqL1xuICAgIHB1YmxpYyB0aGlzT2JqOiBhbnk7XG4gICAgLyoq5piv5ZCm5bey5Yig6ZmkICovXG4gICAgcHVibGljIGRlbGV0ZWQ6IGJvb2xlYW47XG4gICAgLyoq6L+Q6KGM5LqL5Lu2ICovXG4gICAgcHVibGljIGVsYXBzZWQ6IG51bWJlcjtcblxuICAgIHB1YmxpYyBzZXQoaW50ZXJ2YWw6IG51bWJlciwgcmVwZWF0OiBudW1iZXIsIGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrLCB0aGlzT2JqOiBhbnksIHBhcmFtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IGludGVydmFsO1xuICAgICAgICB0aGlzLnJlcGVhdCA9IHJlcGVhdDtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnBhcmFtID0gcGFyYW07XG4gICAgICAgIHRoaXMudGhpc09iaiA9IHRoaXNPYmo7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBUaW1lckNhbGxiYWNrID0gKHBhcmFtOiBhbnkpID0+IHZvaWRcblxuIC8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDgtMDkgMjM6MjVcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uICDml7bpl7TmjqfliLbmoLjlv4PnsbtcbiAqXG4gKi9cbmltcG9ydCB7U2luZ2xldG9ufSBmcm9tIFwiLi9zaW5nbGV0b25cIjtcblxuZXhwb3J0IGNsYXNzIFRpbWVEZWxheSBleHRlbmRzIFNpbmdsZXRvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMC4wMSwgdGhpcywgdGhpcy51cGRhdGUpO1xuICAgIH1cblxuICAgIC8qKuW9k+WJjeS6i+S7tuaJp+ihjOeahOasoeaVsCAqL1xuICAgIHB1YmxpYyByZXBlYXQ6IG51bWJlciA9IDBcbiAgICBwcml2YXRlIGl0ZW1zOiBBcnJheTxUaW1lRGVsYXlEYXRhPiA9IG5ldyBBcnJheTxUaW1lRGVsYXlEYXRhPigpO1xuICAgIHByaXZhdGUgdG9BZGQ6IEFycmF5PFRpbWVEZWxheURhdGE+ID0gbmV3IEFycmF5PFRpbWVEZWxheURhdGE+KCk7XG4gICAgcHJpdmF0ZSB0b1JlbW92ZTogQXJyYXk8VGltZURlbGF5RGF0YT4gPSBuZXcgQXJyYXk8VGltZURlbGF5RGF0YT4oKTtcbiAgICBwcml2YXRlIHBvb2w6IEFycmF5PFRpbWVEZWxheURhdGE+ID0gbmV3IEFycmF5PFRpbWVEZWxheURhdGE+KCk7XG5cbiAgICBcbiAgICBwcml2YXRlIHN0YXRpYyBtSW5zdGFuY2U6IFRpbWVEZWxheSA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpIHtcbiAgICAgICAgaWYgKHRoaXMubUluc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubUluc3RhbmNlID0gbmV3IFRpbWVEZWxheSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm1JbnN0YW5jZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS7juaxoOWtkOS4reiOt+WPlmRhdGHnsbtcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEZyb21Qb29sKCk6IFRpbWVEZWxheURhdGEge1xuICAgICAgICBsZXQgdDogVGltZURlbGF5RGF0YTtcbiAgICAgICAgaWYgKHRoaXMucG9vbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0ID0gdGhpcy5wb29sLnBvcCgpXG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgdCA9IG5ldyBUaW1lRGVsYXlEYXRhKCk7XG4gICAgICAgIHJldHVybiB0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGRhdGHnsbvmlL7lm57msaDlrZBcbiAgICAgKiBAcGFyYW0gdCBcbiAgICAgKi9cbiAgICBwcml2YXRlIHJldHVyblRvUG9vbCh0OiBUaW1lRGVsYXlEYXRhKSB7XG4gICAgICAgIHQuc2V0KDAsIDAsIG51bGwsIG51bGwsIG51bGwpXG4gICAgICAgIHQuZWxhcHNlZCA9IDBcbiAgICAgICAgdC5kZWxldGVkID0gZmFsc2VcbiAgICAgICAgdGhpcy5wb29sLnB1c2godClcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhpc3RzKGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrLCB0aGlzT2JqOiBhbnkpIHtcbiAgICAgICAgbGV0IHQgPSB0aGlzLnRvQWRkLmZpbmQoKHZhbHVlOiBUaW1lRGVsYXlEYXRhLCBpbmRleDogbnVtYmVyLCBvYmo6IEFycmF5PFRpbWVEZWxheURhdGE+KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuY2FsbGJhY2sgPT0gY2FsbGJhY2sgJiYgdmFsdWUudGhpc09iaiA9PSB0aGlzT2JqXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICB0ID0gdGhpcy5pdGVtcy5maW5kKCh2YWx1ZTogVGltZURlbGF5RGF0YSwgaW5kZXg6IG51bWJlciwgb2JqOiBBcnJheTxUaW1lRGVsYXlEYXRhPikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmNhbGxiYWNrID09IGNhbGxiYWNrICYmIHZhbHVlLnRoaXNPYmogPT0gdGhpc09ialxuICAgICAgICB9KVxuICAgICAgICBpZiAodCAhPSBudWxsICYmICF0LmRlbGV0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcHVibGljIGFkZChpbnRlcnZhbDogbnVtYmVyLCByZXBlYXQ6IG51bWJlciwgY2FsbGJhY2s6IFRpbWVyQ2FsbGJhY2ssIHRoaXNPYmo6IGFueSwgY2FsbGJhY2tQYXJhbTogYW55ID0gbnVsbCkge1xuICAgICAgICBsZXQgdDogVGltZURlbGF5RGF0YTtcbiAgICAgICAgdCA9IHRoaXMuaXRlbXMuZmluZCgodmFsdWU6IFRpbWVEZWxheURhdGEsIGluZGV4OiBudW1iZXIsIG9iajogQXJyYXk8VGltZURlbGF5RGF0YT4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jYWxsYmFjayA9PSBjYWxsYmFjayAmJiB2YWx1ZS50aGlzT2JqID09IHRoaXNPYmpcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdCA9IHRoaXMudG9BZGQuZmluZCgodmFsdWU6IFRpbWVEZWxheURhdGEsIGluZGV4OiBudW1iZXIsIG9iajogQXJyYXk8VGltZURlbGF5RGF0YT4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUuY2FsbGJhY2sgPT0gY2FsbGJhY2sgJiYgdmFsdWUudGhpc09iaiA9PSB0aGlzT2JqXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdCA9IHRoaXMuZ2V0RnJvbVBvb2woKTtcbiAgICAgICAgICAgIHRoaXMudG9BZGQucHVzaCh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHQuc2V0KGludGVydmFsLCByZXBlYXQsIGNhbGxiYWNrLCB0aGlzT2JqLCBjYWxsYmFja1BhcmFtKTtcbiAgICAgICAgdC5kZWxldGVkID0gZmFsc2U7XG4gICAgICAgIHQuZWxhcHNlZCA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFVwZGF0ZShjYWxsYmFjazogVGltZXJDYWxsYmFjaywgdGhpc09iajogYW55LCBjYWxsYmFja1BhcmFtOiBhbnkgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuYWRkKDAuMDAxLCAwLCBjYWxsYmFjaywgdGhpc09iaiwgY2FsbGJhY2tQYXJhbSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZShjYWxsYmFjazogVGltZXJDYWxsYmFjaywgdGhpc09iajogYW55KSB7XG4gICAgICAgIGxldCBmaW5kaW5kZXggPSAtMVxuICAgICAgICBsZXQgdCA9IHRoaXMudG9BZGQuZmluZCgodmFsdWU6IFRpbWVEZWxheURhdGEsIGluZGV4OiBudW1iZXIsIG9iajogQXJyYXk8VGltZURlbGF5RGF0YT4pID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5jYWxsYmFjayA9PSBjYWxsYmFjayAmJiB2YWx1ZS50aGlzT2JqID09IHRoaXNPYmopIHtcbiAgICAgICAgICAgICAgICBmaW5kaW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50b0FkZC5zcGxpY2UoZmluZGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMucmV0dXJuVG9Qb29sKHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdCA9IHRoaXMuaXRlbXMuZmluZCgodmFsdWU6IFRpbWVEZWxheURhdGEsIGluZGV4OiBudW1iZXIsIG9iajogQXJyYXk8VGltZURlbGF5RGF0YT4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jYWxsYmFjayA9PSBjYWxsYmFjayAmJiB2YWx1ZS50aGlzT2JqID09IHRoaXNPYmo7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodCAhPSBudWxsKVxuICAgICAgICAgICAgdC5kZWxldGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxhc3RUaW1lOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgZGVsdGFUaW1lOiBudW1iZXIgPSAwO1xuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuZGVsdGFUaW1lID0gKExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5sYXN0VGltZSkgLyAxMDAwO1xuICAgICAgICB0aGlzLmxhc3RUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXI7XG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgdCA9IHRoaXMuaXRlbXNbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKHQuZGVsZXRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9SZW1vdmUucHVzaCh0KTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdC5lbGFwc2VkICs9IHRoaXMuZGVsdGFUaW1lO1xuICAgICAgICAgICAgaWYgKHQuZWxhcHNlZCA8IHQuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdC5lbGFwc2VkID0gMDtcblxuICAgICAgICAgICAgaWYgKHQucmVwZWF0ID4gMCkge1xuICAgICAgICAgICAgICAgIHQucmVwZWF0LS07XG4gICAgICAgICAgICAgICAgaWYgKHQucmVwZWF0ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdC5kZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b1JlbW92ZS5wdXNoKHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVwZWF0ID0gdC5yZXBlYXQ7XG4gICAgICAgICAgICBpZiAodC5jYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdC5jYWxsYmFjay5jYWxsKHQudGhpc09iaiwgdC5wYXJhbSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5kZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxlbiA9IHRoaXMudG9SZW1vdmUubGVuZ3RoO1xuICAgICAgICB3aGlsZSAobGVuKSB7XG4gICAgICAgICAgICBsZXQgdCA9IHRoaXMudG9SZW1vdmUucG9wKCk7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YodCk7XG4gICAgICAgICAgICBpZiAodC5kZWxldGVkICYmIGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuVG9Qb29sKHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGVuLS07XG4gICAgICAgIH1cbiAgICAgICAgbGVuID0gdGhpcy50b0FkZC5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChsZW4pIHtcbiAgICAgICAgICAgIGxldCB0ID0gdGhpcy50b0FkZC5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh0KTtcbiAgICAgICAgICAgIGxlbi0tO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuIiwiaW1wb3J0IHsgRXZlbnROb2RlIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtbm9kZSc7XG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICcuLi9ldmVudC9ldmVudC1kYXRhJztcbmltcG9ydCB7IERhdGFCYXNlIH0gZnJvbSAnLi9kYXRhLWJhc2UnO1xuaW1wb3J0IHsgSU1hbmFnZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvaS1tYW5hZ2VyJztcblxuXG4vKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTA5IDE1OjUxXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiDmlbDmja7nrqHnkIbnsbtcbiAqL1xuZXhwb3J0IGNsYXNzIERhdGFNYW5hZ2VyIGV4dGVuZHMgRXZlbnROb2RlIGltcGxlbWVudHMgSU1hbmFnZXIge1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBEYXRhTWFuYWdlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6RGF0YU1hbmFnZXIge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgRGF0YU1hbmFnZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGRhdGFzOiBNYXA8c3RyaW5nLCBEYXRhQmFzZT4gPSBuZXcgTWFwPHN0cmluZywgRGF0YUJhc2U+KCk7XG5cbiAgICBzZXR1cCgpOiB2b2lkIHtcbiAgICB9XG5cbiAgICB1cGRhdGUoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhcy5jbGVhcigpO1xuICAgIH1cbiAgXG5cbiAgICBwdWJsaWMgcmVnaXN0ZXIoZGF0YTogRGF0YUJhc2UpOiBEYXRhTWFuYWdlciB7XG4gICAgICAgIHRoaXMuZGF0YXMuc2V0KGRhdGEuY21kLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldChjbWQ6IHN0cmluZyk6IERhdGFCYXNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YXMuZ2V0KGNtZCk7XG4gICAgfVxufVxuXG5cblxuIiwiLyoqXG4gKiDkuovku7bmlbDmja7lrprkuYnnsbtcbiAqXG4gKiBAYXV0aG9yIFRpbSBXYXJzXG4gKiBAZGF0ZSAyMDE5LTAxLTIwIDAwOjIzXG4gKiBAcHJvamVjdCBmaXJlYm9sdFxuICogQGNvcHlyaWdodCAoQykgRE9OT1BPXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRXZlbnREYXRhIHtcblxuICAgIGNvbnN0cnVjdG9yKGNtZDogc3RyaW5nLCBvYmo6IGFueSA9IG51bGwsIGlzU3RvcDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY21kID0gY21kO1xuICAgICAgICB0aGlzLmRhdGEgPSBvYmo7XG4gICAgICAgIHRoaXMuaXNTdG9wID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGNtZDogc3RyaW5nO1xuICAgIHB1YmxpYyBkYXRhOiBhbnk7XG4gICAgcHVibGljIGlzU3RvcCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICog5b+r6YCf5Yib5bu65LqL5Lu25pWw5o2uXG4gICAgICogQHBhcmFtIGNtZFxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHBhcmFtIGlzU3RvcFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGNtZDogc3RyaW5nLCBkYXRhOiBhbnkgPSBudWxsLCBpc1N0b3A6IGJvb2xlYW4gPSBmYWxzZSk6IEV2ZW50RGF0YSB7XG4gICAgICAgIHJldHVybiBuZXcgRXZlbnREYXRhKGNtZCwgZGF0YSwgaXNTdG9wKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5pc1N0b3AgPSB0cnVlXG4gICAgfVxufVxuXG4vKipcbiAqIOS6i+S7tuWbnuiwg+WHveaVsOWumuS5iVxuICpcbiAqIEBhdXRob3IgVGltIFdhcnNcbiAqIEBkYXRlIDIwMTktMDEtMjAgMDA6MjRcbiAqIEBwcm9qZWN0IGZpcmVib2x0XG4gKiBAY29weXJpZ2h0IChDKSBET05PUE9cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBFdmVudEZ1bmMge1xuXG4gICAgcHJpdmF0ZSBtX3RoaXM6IGFueTtcbiAgICBwcml2YXRlIG1fY2I6IEZ1bmN0aW9uO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHRoaXNPYmo6IGFueSwgY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMubV90aGlzID0gdGhpc09iajtcbiAgICAgICAgdGhpcy5tX2NiID0gY2FsbEJhY2s7XG4gICAgfVxuXG4gICAgcHVibGljIGludm9rZSguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICB0aGlzLm1fY2IuY2FsbCh0aGlzLm1fdGhpcywgLi4uYXJncyk7XG4gICAgfVxufVxuXG5cbiIsImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJy4vZXZlbnQtZGF0YSc7XG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuLi8uLi9jb3JlL2xvZyc7XG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tICcuLi8uLi9jb3JlL3NpbmdsZXRvbic7XG5cblxuLyoqXG4gKiDmiYDmnInpnIDopoHnm5Hmjqfkuovku7boioLngrnnmoTln7rnsbtcbiAqXG4gKiBAYXV0aG9yIFRpbSBXYXJzXG4gKiBAZGF0ZSAyMDE5LTAxLTE4IDE2OjIwXG4gKiBAcHJvamVjdCBmaXJlYm9sdFxuICogQGNvcHlyaWdodCAoQykgRE9OT1BPXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRXZlbnROb2RlIGV4dGVuZHMgU2luZ2xldG9uIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBFdmVudENvbnRleHQuZXZlbnROb2Rlcy5zZXQodGhpcywgdGhpcyk7XG4gICAgfVxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyA9PT09PT09PT09PT09PSAgTG9jYWwgRXZlbnQgU2VjdGlvbiA9PT09PT09PT09PT09PVxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICBwcml2YXRlIHN0YXRpYyBtX2dsb2JhbEV2ZW50RGF0YTogQXJyYXk8RXZlbnREYXRhPiA9IG5ldyBBcnJheTxFdmVudERhdGE+KCk7XG4gICAgcHJpdmF0ZSBzdGF0aWMgbV9nbG9iYWxFdmVudERpY3Q6IEV2ZW50TGlzdGVuZXJDbGFzc0RpY3QgPSB7fTtcblxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUdsb2JhbERhdGEoY21kLCBkYXRhKTogRXZlbnREYXRhIHtcbiAgICAgICAgbGV0IGVkOiBFdmVudERhdGE7XG4gICAgICAgIGlmIChFdmVudE5vZGUubV9nbG9iYWxFdmVudERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZWQgPSBFdmVudE5vZGUubV9nbG9iYWxFdmVudERhdGEucG9wKCk7XG4gICAgICAgICAgICBlZC5jbWQgPSBjbWQ7XG4gICAgICAgICAgICBlZC5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIGVkLmlzU3RvcCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWQgPSBuZXcgRXZlbnREYXRhKGNtZCwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHJldHVybkdsb2JhbEV2ZW50RGF0YShlZDogRXZlbnREYXRhKSB7XG4gICAgICAgIGVkLmRhdGEgPSBudWxsO1xuICAgICAgICBlZC5jbWQgPSBudWxsO1xuICAgICAgICBlZC5pc1N0b3AgPSBmYWxzZTtcbiAgICAgICAgRXZlbnROb2RlLm1fZ2xvYmFsRXZlbnREYXRhLnB1c2goZWQpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5re75Yqg5LiA5Liq5raI5oGv55uR5ZCs5ZmoXG4gICAgICogQHBhcmFtIHR5cGUg5raI5oGv57G75Z6LXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIOWbnuiwg+WHveaVsFxuICAgICAqIEBwYXJhbSB0YXJnZXQg5L2c55So5a+56LGhXG4gICAgICogQHBhcmFtIHByaW9yaXR5IOa2iOaBr+eahOS8mOWFiOe6p1xuICAgICAqIEBwYXJhbSBvbmNlIOaYr+WQpuWPquebkeWQrOS4gOasoVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkR2xvYmFsTGlzdGVuZXIodHlwZTogc3RyaW5nIHwgbnVtYmVyLCBjYWxsQmFjazogRXZlbnRDYWxsYmFja0xpc3RlbmVyLCB0YXJnZXQ6IGFueSwgcHJpb3JpdHk6IG51bWJlciA9IDAsIG9uY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICB0eXBlID0gdHlwZS50b1N0cmluZygpO1xuICAgICAgICBsZXQgaW5mbzogRXZlbnRMaXN0ZW5lckluZm9EYXRhID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGNhbGxCYWNrOiBjYWxsQmFjayxcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxuICAgICAgICAgICAgb25jZTogb25jZVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBhcnJheSA9IEV2ZW50Tm9kZS5tX2dsb2JhbEV2ZW50RGljdFt0eXBlXTtcbiAgICAgICAgbGV0IGhhcyA9IGZhbHNlO1xuICAgICAgICBsZXQgcG9zID0gMDtcbiAgICAgICAgaWYgKGFycmF5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudGFyZ2V0ID09IHRhcmdldCAmJiBlbGVtZW50LmNhbGxCYWNrID09IGNhbGxCYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnByaW9yaXR5ID4gaW5mby5wcmlvcml0eSkge1xuICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycmF5ID0gbmV3IEFycmF5PEV2ZW50TGlzdGVuZXJJbmZvRGF0YT4oKTtcbiAgICAgICAgICAgIEV2ZW50Tm9kZS5tX2dsb2JhbEV2ZW50RGljdFt0eXBlXSA9IGFycmF5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCLph43lpI3ms6jlhozmtojmga/vvJp0eXBlPVwiICsgdHlwZSk7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCLph43lpI3ms6jlhozmtojmga/vvJp0eXBlPVwiICsgdHlwZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShwb3MsIDAsIGluZm8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog56e76Zmk5LiA5Liq5raI5oGv55uR5ZCs5ZmoXG4gICAgICogQHBhcmFtIHR5cGUg5raI5oGvaWRcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5Zue6LCD5Ye95pWwXG4gICAgICogQHBhcmFtIHRhcmdldCDkvZznlKjnmoTlr7nosaFcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUdsb2JhbExpc3RlbmVyKHR5cGU6IHN0cmluZyB8IG51bWJlciwgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciwgdGFyZ2V0OiBhbnkpIHtcbiAgICAgICAgdHlwZSA9IHR5cGUudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IGluZm86IEV2ZW50TGlzdGVuZXJJbmZvRGF0YSA9IG51bGw7XG4gICAgICAgIGxldCBhcnJheSA9IEV2ZW50Tm9kZS5tX2dsb2JhbEV2ZW50RGljdFt0eXBlXTtcbiAgICAgICAgaWYgKGFycmF5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBpbmZvSW5kZXggPSAtMTtcbiAgICAgICAgICAgIGFycmF5LmV2ZXJ5KCh2YWx1ZTogRXZlbnRMaXN0ZW5lckluZm9EYXRhLCBpbmRleDogbnVtYmVyLCBhcnJheTogRXZlbnRMaXN0ZW5lckluZm9EYXRhW10pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUudGFyZ2V0ID09IHRhcmdldCAmJiB2YWx1ZS5jYWxsQmFjayA9PSBjYWxsQmFjaykge1xuICAgICAgICAgICAgICAgICAgICBpbmZvSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChpbmZvSW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaW5mb0luZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaYr+WQpuWtmOWcqOi/meS4quebkeWQrOa2iOaBr1xuICAgICAqIEBwYXJhbSB0eXBlIOa2iOaBr+exu+Wei1xuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlm57osIPnsbvlnotcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOWbnuiwg+WvueixoVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaGFzR2xvYmFsTGlzdGVuZXIodHlwZTogc3RyaW5nIHwgbnVtYmVyLCBjYWxsQmFjazogRXZlbnRDYWxsYmFja0xpc3RlbmVyLCB0YXJnZXQ6IGFueSkge1xuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgICAgICBsZXQgYXJyYXkgPSBFdmVudE5vZGUubV9nbG9iYWxFdmVudERpY3RbdHlwZV07XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgbGV0IGluZGV4ID0gYXJyYXkuZmluZEluZGV4KChvYmosIGluZGV4LCBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnRhcmdldCA9PSB0YXJnZXQgJiYgb2JqLmNhbGxCYWNrID09IGNhbGxCYWNrO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmbGFnID0gaW5kZXggIT0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZsYWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5rS+5Y+R5raI5oGvXG4gICAgICogQHBhcmFtIGVkIOa0vuWPkeeahOa2iOaBr+WGheWuuVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGlzcGF0Y2hHbG9iYWwoZWQ6IEV2ZW50RGF0YSkge1xuICAgICAgICBFdmVudE5vZGUuX2Rpc3BhdGNoR2xvYmFsKGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmtL7lj5Hmtojmga9cbiAgICAgKiBAcGFyYW0gY21kIOa2iOaBr2lkXG4gICAgICogQHBhcmFtIGRhdGEg5raI5oGv5YaF5a65XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBkaXNwYXRjaEdsb2JhbEJ5Q21kKGNtZDogc3RyaW5nIHwgbnVtYmVyLCBkYXRhOiBhbnkgPSBudWxsKSB7XG4gICAgICAgIGxldCBlZCA9IEV2ZW50Tm9kZS5jcmVhdGVHbG9iYWxEYXRhKGNtZCwgZGF0YSk7XG4gICAgICAgIEV2ZW50Tm9kZS5fZGlzcGF0Y2hHbG9iYWwoZWQpO1xuICAgICAgICBpZiAoZWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgRXZlbnROb2RlLnJldHVybkdsb2JhbEV2ZW50RGF0YShlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfZGlzcGF0Y2hHbG9iYWwoZWQ6IEV2ZW50RGF0YSkge1xuICAgICAgICBsZXQgYXJyYXkgPSBFdmVudE5vZGUubV9nbG9iYWxFdmVudERpY3RbZWQuY21kXTtcbiAgICAgICAgaWYgKGFycmF5ICE9IG51bGwpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBpbmZvID0gYXJyYXlbaV07XG4gICAgICAgICAgICAgICAgaWYgKGluZm8uY2FsbEJhY2sgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpbmZvLmNhbGxCYWNrLmNhbGwoaW5mby50YXJnZXQsIGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGluZm8ub25jZSkge1xuICAgICAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaS0tLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVkLmlzU3RvcCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vID09PT09PT09PT09PT09ICBMb2NhbCBFdmVudCBTZWN0aW9uID09PT09PT09PT09PT09XG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIHByaXZhdGUgbV9ldmVudERhdGE6IEFycmF5PEV2ZW50RGF0YT4gPSBuZXcgQXJyYXk8RXZlbnREYXRhPigpO1xuICAgIHByaXZhdGUgbV9ldmVudERpY3Q6IEV2ZW50TGlzdGVuZXJDbGFzc0RpY3QgPSB7fTtcblxuICAgIHByaXZhdGUgY3JlYXRlRXZlbnREYXRhKGNtZCwgZGF0YSk6IEV2ZW50RGF0YSB7XG4gICAgICAgIGxldCBlZDogRXZlbnREYXRhO1xuICAgICAgICBpZiAodGhpcy5tX2V2ZW50RGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBlZCA9IHRoaXMubV9ldmVudERhdGEucG9wKCk7XG4gICAgICAgICAgICBlZC5jbWQgPSBjbWQ7XG4gICAgICAgICAgICBlZC5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIGVkLmlzU3RvcCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWQgPSBuZXcgRXZlbnREYXRhKGNtZCwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmV0dXJuRXZlbnREYXRhKGVkOiBFdmVudERhdGEpIHtcbiAgICAgICAgZWQuZGF0YSA9IG51bGw7XG4gICAgICAgIGVkLmNtZCA9IG51bGw7XG4gICAgICAgIGVkLmlzU3RvcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1fZXZlbnREYXRhLnB1c2goZWQpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5re75Yqg5LiA5Liq5raI5oGv55uR5ZCs5ZmoXG4gICAgICogQHBhcmFtIHR5cGUg5raI5oGv57G75Z6LXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIOWbnuiwg+WHveaVsFxuICAgICAqIEBwYXJhbSB0YXJnZXQg5L2c55So5a+56LGhXG4gICAgICogQHBhcmFtIHByaW9yaXR5IOa2iOaBr+eahOS8mOWFiOe6p1xuICAgICAqIEBwYXJhbSBvbmNlIOaYr+WQpuWPquebkeWQrOS4gOasoVxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZyB8IG51bWJlciwgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciwgdGFyZ2V0OiBhbnksIHByaW9yaXR5OiBudW1iZXIgPSAwLCBvbmNlOiBib29sZWFuID0gZmFsc2UpOkV2ZW50TGlzdGVuZXJJbmZvRGF0YSAgIHtcbiAgICAgICAgdHlwZSA9IHR5cGUudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IGluZm86IEV2ZW50TGlzdGVuZXJJbmZvRGF0YSA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBjYWxsQmFjazogY2FsbEJhY2ssXG4gICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcbiAgICAgICAgICAgIG9uY2U6IG9uY2VcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLm1fZXZlbnREaWN0W3R5cGVdO1xuICAgICAgICBsZXQgaGFzID0gZmFsc2U7XG4gICAgICAgIGxldCBwb3MgPSAwO1xuICAgICAgICBpZiAoYXJyYXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC50YXJnZXQgPT0gdGFyZ2V0ICYmIGVsZW1lbnQuY2FsbEJhY2sgPT0gY2FsbEJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQucHJpb3JpdHkgPiBpbmZvLnByaW9yaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJyYXkgPSBuZXcgQXJyYXk8RXZlbnRMaXN0ZW5lckluZm9EYXRhPigpO1xuICAgICAgICAgICAgdGhpcy5tX2V2ZW50RGljdFt0eXBlXSA9IGFycmF5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCLph43lpI3ms6jlhozmtojmga/vvJp0eXBlPVwiICsgdHlwZSk7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCLph43lpI3ms6jlhozmtojmga/vvJp0eXBlPVwiICsgdHlwZSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKHBvcywgMCwgaW5mbyk7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOenu+mZpOS4gOS4qua2iOaBr+ebkeWQrOWZqFxuICAgICAqIEBwYXJhbSB0eXBlIOa2iOaBr2lkXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIOWbnuiwg+WHveaVsFxuICAgICAqIEBwYXJhbSB0YXJnZXQg5L2c55So55qE5a+56LGhXG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nIHwgbnVtYmVyLCBjYWxsQmFjazogRXZlbnRDYWxsYmFja0xpc3RlbmVyLCB0YXJnZXQ6IGFueSkge1xuICAgICAgICB0eXBlID0gdHlwZS50b1N0cmluZygpO1xuICAgICAgICBsZXQgaW5mbzogRXZlbnRMaXN0ZW5lckluZm9EYXRhID0gbnVsbDtcbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5tX2V2ZW50RGljdFt0eXBlXTtcbiAgICAgICAgaWYgKGFycmF5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBpbmZvSW5kZXggPSAtMTtcbiAgICAgICAgICAgIGFycmF5LmV2ZXJ5KCh2YWx1ZTogRXZlbnRMaXN0ZW5lckluZm9EYXRhLCBpbmRleDogbnVtYmVyLCBhcnJheTogRXZlbnRMaXN0ZW5lckluZm9EYXRhW10pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUudGFyZ2V0ID09IHRhcmdldCAmJiB2YWx1ZS5jYWxsQmFjayA9PSBjYWxsQmFjaykge1xuICAgICAgICAgICAgICAgICAgICBpbmZvSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChpbmZvSW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaW5mb0luZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyQWxsKCkge1xuICAgICAgICB0aGlzLm1fZXZlbnREYXRhID0gbmV3IEFycmF5PEV2ZW50RGF0YT4oKTtcbiAgICAgICAgdGhpcy5tX2V2ZW50RGljdCA9IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaYr+WQpuWtmOWcqOi/meS4quebkeWQrOa2iOaBr1xuICAgICAqIEBwYXJhbSB0eXBlIOa2iOaBr+exu+Wei1xuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlm57osIPnsbvlnotcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOWbnuiwg+WvueixoVxuICAgICAqL1xuICAgIHB1YmxpYyBoYXNFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZyB8IG51bWJlciwgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciwgdGFyZ2V0OiBhbnkpIHtcbiAgICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5tX2V2ZW50RGljdFt0eXBlXTtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBhcnJheS5maW5kSW5kZXgoKG9iaiwgaW5kZXgsIGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoudGFyZ2V0ID09IHRhcmdldCAmJiBvYmouY2FsbEJhY2sgPT0gY2FsbEJhY2s7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZsYWcgPSBpbmRleCAhPSAtMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmxhZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmtL7lj5Hmtojmga9cbiAgICAgKiBAcGFyYW0gZWQg5rS+5Y+R55qE5raI5oGv5YaF5a65XG4gICAgICovXG4gICAgcHVibGljIGRpc3BhdGNoRXZlbnQoZWQ6IEV2ZW50RGF0YSkge1xuICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmtL7lj5Hmtojmga9cbiAgICAgKiBAcGFyYW0gY21kIOa2iOaBr2lkXG4gICAgICogQHBhcmFtIGRhdGEg5raI5oGv5YaF5a65XG4gICAgICovXG4gICAgcHVibGljIGRpc3BhdGNoRXZlbnRCeUNtZChjbWQ6IHN0cmluZyB8IG51bWJlciwgZGF0YTogYW55ID0gbnVsbCkge1xuICAgICAgICBsZXQgZWQgPSB0aGlzLmNyZWF0ZUV2ZW50RGF0YShjbWQsIGRhdGEpO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KGVkKTtcbiAgICAgICAgaWYgKGVkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmV0dXJuRXZlbnREYXRhKGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc3BhdGNoRXZlbnQoZWQ6IEV2ZW50RGF0YSkge1xuICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLm1fZXZlbnREaWN0W2VkLmNtZF07XG4gICAgICAgIGlmIChhcnJheSAhPSBudWxsKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IGFycmF5W2ldO1xuICAgICAgICAgICAgICAgIGlmIChpbmZvLmNhbGxCYWNrICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mby5jYWxsQmFjay5jYWxsKGluZm8udGFyZ2V0LCBlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbmZvLm9uY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGktLSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlZC5pc1N0b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IHR5cGUgRXZlbnRMaXN0ZW5lckluZm9EYXRhID1cbiAgICB7XG4gICAgICAgIHR5cGU6IHN0cmluZyxcbiAgICAgICAgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lcixcbiAgICAgICAgdGFyZ2V0OiBhbnksXG4gICAgICAgIHByaW9yaXR5OiBudW1iZXIsXG4gICAgICAgIG9uY2U6IGJvb2xlYW5cbiAgICB9XG5cbmV4cG9ydCB0eXBlIEV2ZW50TGlzdGVuZXJDbGFzc0RpY3QgPSB7XG4gICAgW2tleTogc3RyaW5nXTogQXJyYXk8RXZlbnRMaXN0ZW5lckluZm9EYXRhPlxufVxuXG5cbmV4cG9ydCB0eXBlIEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciA9ICgoZWQ6IEV2ZW50RGF0YSkgPT4gdm9pZCk7XG5cbmV4cG9ydCBjbGFzcyBFdmVudENvbnRleHQge1xuXG4gICAgcHVibGljIHN0YXRpYyBldmVudE5vZGVzOiBNYXA8RXZlbnROb2RlLCBFdmVudE5vZGU+ID0gbmV3IE1hcDxFdmVudE5vZGUsIEV2ZW50Tm9kZT4oKTtcblxufVxuXG4iLCJcblxuIC8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDgtMTIgMTA6NTlcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uIOmFjee9ruihqOaooeadv+mhuVxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEpzb25UZW1wbGF0ZSB7XG5cbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XHQvL+i1hOa6kHVybFxuICAgIHB1YmxpYyBrZXk6IHN0cmluZztcdC8vIOihqOeahOS4u+mUrizlpoLmnpzmsqHmnIlrZXnlsLHor4HmmI7mmK/ljZXooajnu5PmnoRcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nOyAvL+WQjeensO+8mueUqOS6juafpeaJvuivpeaVsOaNrue7k+aehFxuXG4gICAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcsIG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcgPSBudWxsKSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFdmVudEZ1bmMgfSBmcm9tICcuLi9ldmVudC9ldmVudC1kYXRhJztcbmltcG9ydCB7IFJlc0l0ZW0gfSBmcm9tICcuL3Jlcy1pdGVtJztcblxuIC8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDgtMDkgMTk6MzFcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uIOWcuuaZr+euoeeQhuWZqOaJgOmcgOeahOi1hOa6kOWMheWumuS5iVxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc0dyb3VwIHtcblxuICAgIC8qKuWKoOi9vei/m+W6piAqL1xuICAgIHB1YmxpYyBwcm9ncmVzczogbnVtYmVyID0gMDtcbiAgICAvKirliqDovb3otYTmupAgKi9cbiAgICBwdWJsaWMgbmVlZExvYWQ6IEFycmF5PFJlc0l0ZW0+ID0gbmV3IEFycmF5PFJlc0l0ZW0+KCk7XG4gICAgLyoq5Yqg6L295pe255qE5Zue6LCD5o6l5Y+jLOS4gOiIrOeUqOS9nOe7meWKoOi9veeql+iuvue9rui/m+W6piAqL1xuICAgIHB1YmxpYyBsb2FkSXRlbTogRXZlbnRGdW5jO1xuICAgIC8qKue7k+adn+aXtueahOWbnuiwg+aOpeWPoyAqL1xuICAgIHB1YmxpYyBmaW5pc2g6IEV2ZW50RnVuYztcblxuICAgIC8qKlxuICAgICAqIOWQkei1hOa6kOe7hOa3u+WKoOebruagh1xuICAgICAqIEBwYXJhbSB1cmwg55u45a+56Lev5b6EXG4gICAgICogQHBhcmFtIHR5cGUg57G75Z6LIFxuICAgICAqIEBwYXJhbSBpc0tlZXBNZW1vcnkg5piv5ZCm5bi46am75YaF5a2YIFxuICAgICAqL1xuICAgIHB1YmxpYyBhZGQodXJsOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgaXNLZWVwTWVtb3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm5lZWRMb2FkLmZpbmRJbmRleCgodmFsdWU6IFJlc0l0ZW0sIGluZGV4OiBudW1iZXIsIG9iajogQXJyYXk8UmVzSXRlbT4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS51cmwgPT0gdXJsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBpbmZvID0gbmV3IFJlc0l0ZW0oKTtcbiAgICAgICAgICAgIGluZm8uaXNLZWVwTWVtb3J5ID0gaXNLZWVwTWVtb3J5O1xuICAgICAgICAgICAgaW5mby51cmwgPSB1cmw7XG4gICAgICAgICAgICBpbmZvLnR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgdGhpcy5uZWVkTG9hZC5wdXNoKGluZm8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxufVxuXG4iLCJcbi8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDgtMDkgMTk6MThcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uIOi1hOa6kOWxnuaAp1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc0l0ZW0ge1xuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyBpc0tlZXBNZW1vcnkgPSBmYWxzZTtcblxuICAgIHB1YmxpYyBnZXQgZnVsbFVybCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsXG4gICAgfVxufVxuXG5cbiIsImltcG9ydCBIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xuaW1wb3J0IHsgRXZlbnROb2RlIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtbm9kZSc7XG5pbXBvcnQgeyBJTWFuYWdlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9pLW1hbmFnZXInO1xuaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gJy4uLy4uL3N0cnVjdHVyZS9kaWN0aW9uYXJ5JztcbmltcG9ydCB7IExvZyB9IGZyb20gJy4uLy4uL2NvcmUvbG9nJztcbmltcG9ydCB7IFJlc0l0ZW0gfSBmcm9tICcuL3Jlcy1pdGVtJztcbmltcG9ydCB7IFV0aWxUaW1lIH0gZnJvbSAnLi4vLi4vdXRpbC90aW1lJztcbmltcG9ydCB7IFJlc0dyb3VwIH0gZnJvbSAnLi9yZXMtZ3JvdXAnO1xuaW1wb3J0IHsgUmVzTG9hZGVkIH0gZnJvbSAnLi9yZXMtbG9hZGVkJztcbmltcG9ydCB7IGVudW1DbGVhclN0cmF0ZWd5LCBlbnVtQXJyYXlTb3J0T3JkZXIgfSBmcm9tICcuLi8uLi9zZXR0aW5nL2VudW0nO1xuaW1wb3J0IHsgVXRpbEFycmF5IH0gZnJvbSAnLi4vLi4vdXRpbC9hcnJheSc7XG5pbXBvcnQgeyBFdmVudEZ1bmMgfSBmcm9tICcuLi9ldmVudC9ldmVudC1kYXRhJztcblxuXG4vKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTEyIDEzOjMzXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiAg6LWE5rqQ566h55CGICDvvIjmiYDmnInotYTmupDlnYfpgJrov4dSZXNHcm91cOeahOW9ouW8j+adpeWKoOi9ve+8iVxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc01hbmFnZXIgZXh0ZW5kcyBFdmVudE5vZGUgaW1wbGVtZW50cyBJTWFuYWdlciB7XG5cblxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBSZXNNYW5hZ2VyID0gbnVsbDtcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6IFJlc01hbmFnZXIge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsKSB0aGlzLmluc3RhbmNlID0gbmV3IFJlc01hbmFnZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLy/lrZjmlL7miYDmnInlt7LliqDovb3nmoTotYTmupBcbiAgICBwcml2YXRlIG1fZGljdFJlc0l0ZW06IE1hcDxzdHJpbmcsIFJlc0l0ZW0+ID0gbmV3IE1hcDxzdHJpbmcsIFJlc0l0ZW0+KCk7XG5cbiBcblxuICAgIHB1YmxpYyBzZXR1cCgpOiB2b2lkIHtcbiAgICB9XG5cbiAgICB1cGRhdGUoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDpgJrov4dVUkzojrflj5botYTmupBcbiAgICAgKiBAcGFyYW0gdXJsXG4gICAgICovXG4gICAgcHVibGljIGdldFJlcyh1cmw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gTGF5YS5sb2FkZXIuZ2V0UmVzKHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqg6L296LWE5rqQ57uEXG4gICAgICogQHBhcmFtIGxvYWRzIOi1hOa6kOS/oeaBryBcbiAgICAgKiBAcGFyYW0gcHJvZ3Jlc3NGdWMg5Yqg6L296L+b5bqm5Zue6LCDXG4gICAgICogQHBhcmFtIGNvbXBsZXRlRnVjIOWKoOi9veWujOaIkOWbnuiwg1xuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkR3JvdXAobG9hZHM6IFJlc0dyb3VwLHByb2dyZXNzRnVjOkV2ZW50RnVuYyxjb21wbGV0ZUZ1YzpFdmVudEZ1bmMpIHtcbiAgICAgICAgbGV0IHVybHM6IEFycmF5PGFueT4gPSBuZXcgQXJyYXk8YW55PigpO1xuICAgICAgICBsb2Fkcy5uZWVkTG9hZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgdXJscy5wdXNoKHt1cmw6IGVsZW1lbnQudXJsLCB0eXBlOiBlbGVtZW50LnR5cGV9KVxuICAgICAgICB9KTtcblxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHVybHMsIEhhbmRsZXIuY3JlYXRlKHRoaXMsIChzdWNjZXNzOiBib29sZWFuKSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgLy/lrozmiJDlm57osINcbiAgICAgICAgICAgICAgICBpZihjb21wbGV0ZUZ1YyE9bnVsbCkgY29tcGxldGVGdWMuaW52b2tlKCk7XG4gICAgICAgICAgICAgICAgLy/moIforrDotYTmupBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbG9hZHMubmVlZExvYWQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmZvID0gbG9hZHMubmVlZExvYWRbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubV9kaWN0UmVzSXRlbS5oYXMoaW5mby51cmwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1fZGljdFJlc0l0ZW0uc2V0KGluZm8udXJsLCBpbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiTG9hZCBSZXNvdXJjZSBFcnJvcu+8mlwiKTtcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcodXJscyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSksIEhhbmRsZXIuY3JlYXRlKHRoaXMsIChwcm9ncmVzczogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAvL+i/m+W6puWbnuiwg1xuICAgICAgICAgICAgaWYocHJvZ3Jlc3NGdWMhPW51bGwpIHByb2dyZXNzRnVjLmludm9rZShwcm9ncmVzcyk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSwgbnVsbCwgZmFsc2UpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmHiuaUvui1hOa6kOe7hFxuICAgICAqIEBwYXJhbSBsb2FkcyDotYTmupDnu4QgXG4gICAgICovXG4gICAgcHVibGljIHJlbGVhc2VHcm91cChsb2FkczpSZXNHcm91cClcbiAgICB7XG4gICAgICAgIGxldCB1cmxzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICAgICAgbG9hZHMubmVlZExvYWQuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIHVybHMucHVzaChlbGVtZW50LnVybClcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IGk9MDtpPHVybHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jbGVhclJlcyh1cmxzW2ldKTtcbiAgICAgICAgICAgIHRoaXMubV9kaWN0UmVzSXRlbS5mb3JFYWNoKCh2OiBSZXNJdGVtLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgaWYoa2V5PT11cmxzW2ldKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tX2RpY3RSZXNJdGVtLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph4rmlL7mjIflrprotYTmupBcbiAgICAgKiBAcGFyYW0gdXJsIFxuICAgICAqL1xuICAgIHB1YmxpYyByZWxlYXNlVXJsKHVybDpzdHJpbmcpXG4gICAge1xuICAgICAgICAgbGV0IGlzQWN0aXZlOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgIHRoaXMubV9kaWN0UmVzSXRlbS5mb3JFYWNoKCh2OiBSZXNJdGVtLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYoa2V5PT11cmwpe1xuICAgICAgICAgICAgICAgIGlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuXG4gICAgICAgICBpZihpc0FjdGl2ZSl7XG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jbGVhclJlcyh1cmwpO1xuICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCLliqDovb3otYTmupDnu4TlhoXkuI3lrZjlnKjor6XotYTmupBcIik7XG4gICAgICAgICB9XG4gICAgfVxufVxuXG4iLCJpbXBvcnQge1V0aWxUaW1lfSBmcm9tIFwiLi4vLi4vdXRpbC90aW1lXCI7XG5pbXBvcnQgSGFuZGxlciA9IExheWEuSGFuZGxlcjtcbmltcG9ydCB7IElQb29sT2JqZWN0IH0gZnJvbSAnLi4vLi4vY29yZS9vYmplY3QtcG9vbCc7XG5pbXBvcnQgeyBUaW1lckludGVydmFsIH0gZnJvbSAnLi90aW1lci1pbnRlcnZhbCc7XG5cbi8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDgtMTAgMjA6MDZcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uICDorqHml7blmajln7rnsbtcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBUaW1lckVudGl0eSBpbXBsZW1lbnRzIElQb29sT2JqZWN0IHtcbiAgICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgaXNBY3RpdmU6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgbVJhdGU6IG51bWJlcjtcbiAgICBwdWJsaWMgbVRpY2tzOiBudW1iZXI7XG4gICAgcHVibGljIG1UaWNrc0VsYXBzZWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgaGFuZGxlOiBIYW5kbGVyO1xuXG4gICAgcHVibGljIG1UaW1lOiBUaW1lckludGVydmFsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubVRpbWUgPSBuZXcgVGltZXJJbnRlcnZhbCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZSgpIHtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlLnJlY292ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXQoaWQ6IG51bWJlciwgcmF0ZTogbnVtYmVyLCB0aWNrczogbnVtYmVyLCBoYW5kbGU6IEhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm1SYXRlID0gcmF0ZSA8IDAgPyAwIDogcmF0ZTtcbiAgICAgICAgdGhpcy5tVGlja3MgPSB0aWNrcyA8IDAgPyAwIDogdGlja3M7XG4gICAgICAgIHRoaXMuaGFuZGxlID0gaGFuZGxlO1xuICAgICAgICB0aGlzLm1UaWNrc0VsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tVGltZS5pbml0KHRoaXMubVJhdGUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKHJlbW92ZVRpbWVyOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUgJiYgdGhpcy5tVGltZS51cGRhdGUoVXRpbFRpbWUuZGVsdGFUaW1lKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFuZGxlICE9IG51bGwpIHRoaXMuaGFuZGxlLnJ1bigpO1xuXG4gICAgICAgICAgICB0aGlzLm1UaWNrc0VsYXBzZWQrKztcbiAgICAgICAgICAgIGlmICh0aGlzLm1UaWNrcyA+IDAgJiYgdGhpcy5tVGlja3MgPT0gdGhpcy5tVGlja3NFbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJlbW92ZVRpbWVyKHRoaXMuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAYXV0aG9yIFN1blxuICogQHRpbWUgMjAxOS0wOC0xMCAyMDowMlxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gKiBAZGVzY3JpcHRpb24gIOWumuaXtuaJp+ihjFxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFRpbWVySW50ZXJ2YWwge1xuXG4gICAgcHJpdmF0ZSBtX2ludGVydmFsX3RpbWU6IG51bWJlcjsvL+avq+enklxuICAgIHByaXZhdGUgbV9ub3dfdGltZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubV9ub3dfdGltZSA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yid5aeL5YyW5a6a5pe25ZmoXG4gICAgICogQHBhcmFtICAgIGludGVydmFsICAgIOinpuWPkemXtOmalFxuICAgICAqIEBwYXJhbSAgICBmaXJzdF9mcmFtZSAgICDmmK/lkKbnrKzkuIDluKflvIDlp4vmiafooYxcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5pdChpbnRlcnZhbDogbnVtYmVyLCBmaXJzdF9mcmFtZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLm1faW50ZXJ2YWxfdGltZSA9IGludGVydmFsO1xuICAgICAgICBpZiAoZmlyc3RfZnJhbWUpIHRoaXMubV9ub3dfdGltZSA9IHRoaXMubV9pbnRlcnZhbF90aW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX25vd190aW1lID0gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKGVsYXBzZV90aW1lOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgdGhpcy5tX25vd190aW1lICs9IGVsYXBzZV90aW1lO1xuICAgICAgICBpZiAodGhpcy5tX25vd190aW1lID49IHRoaXMubV9pbnRlcnZhbF90aW1lKSB7XG4gICAgICAgICAgICB0aGlzLm1fbm93X3RpbWUgLT0gdGhpcy5tX2ludGVydmFsX3RpbWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IEhhbmRsZXIgPSBMYXlhLkhhbmRsZXI7XG5pbXBvcnQge1V0aWxBcnJheX0gZnJvbSBcIi4uLy4uL3V0aWwvYXJyYXlcIjtcbmltcG9ydCB7IEV2ZW50Tm9kZSB9IGZyb20gJy4uL2V2ZW50L2V2ZW50LW5vZGUnO1xuaW1wb3J0IHsgSU1hbmFnZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvaS1tYW5hZ2VyJztcbmltcG9ydCB7IFRpbWVEZWxheSB9IGZyb20gJy4uLy4uL2NvcmUvdGltZS1kZWxheSc7XG5pbXBvcnQgeyBPYmplY3RQb29sIH0gZnJvbSAnLi4vLi4vY29yZS9vYmplY3QtcG9vbCc7XG5pbXBvcnQgeyBUaW1lckVudGl0eSB9IGZyb20gJy4vdGltZXItZW50aXR5JztcblxuLyoqXG4gKiBAYXV0aG9yIFN1blxuICogQHRpbWUgMjAxOS0wOC0wOSAyMzoyMlxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gKiBAZGVzY3JpcHRpb24gIOWumuaXtueuoeeQhuWZqFxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFRpbWVyTWFuYWdlciBleHRlbmRzIEV2ZW50Tm9kZSBpbXBsZW1lbnRzIElNYW5hZ2VyIHtcbiAgXG4gICAgcHJpdmF0ZSBtX2lkQ291bnRlcjogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIG1fUmVtb3ZhbFBlbmRpbmc6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgICBwcml2YXRlIG1fVGltZXJzOiBBcnJheTxUaW1lckVudGl0eT4gPSBbXTtcblxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBUaW1lck1hbmFnZXIgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOiBUaW1lck1hbmFnZXIge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgVGltZXJNYW5hZ2VyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXR1cCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX2lkQ291bnRlciA9IDA7XG4gICAgICAgIFRpbWVEZWxheS4kLmFkZCgwLjEsIDAsIHRoaXMucmVtb3ZlLCB0aGlzKTtcbiAgICAgICAgVGltZURlbGF5LiQuYWRkVXBkYXRlKHRoaXMudGljaywgdGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBVdGlsQXJyYXkuY2xlYXIodGhpcy5tX1JlbW92YWxQZW5kaW5nKTtcbiAgICAgICAgVXRpbEFycmF5LmNsZWFyKHRoaXMubV9UaW1lcnMpO1xuICAgICAgICBUaW1lRGVsYXkuJC5yZW1vdmUodGhpcy5yZW1vdmUsIHRoaXMpO1xuICAgICAgICBUaW1lRGVsYXkuJC5yZW1vdmUodGhpcy50aWNrLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRpY2soKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX1RpbWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5tX1RpbWVyc1tpXS51cGRhdGUodGhpcy5yZW1vdmVUaW1lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlrprml7bph43lpI3miafooYxcbiAgICAgKiBAcGFyYW0gICAgcmF0ZSAgICDpl7TpmpTml7bpl7Qo5Y2V5L2N5q+r56eSKeOAglxuICAgICAqIEBwYXJhbSAgICB0aWNrcyAgICDmiafooYzmrKHmlbBcbiAgICAgKiBAcGFyYW0gICAgY2FsbGVyICAgIOaJp+ihjOWfnyh0aGlzKeOAglxuICAgICAqIEBwYXJhbSAgICBtZXRob2QgICAg5a6a5pe25Zmo5Zue6LCD5Ye95pWw77ya5rOo5oSP77yM6L+U5Zue5Ye95pWw56ys5LiA5Liq5Y+C5pWw5Li65a6a5pe25ZmoaWTvvIzlkI7pnaLlj4LmlbDkvp3mrKHml7bkvKDlhaXnmoTlj4LmlbDjgILkvotPblRpbWUodGltZXJfaWQ6bnVtYmVyLCBhcmdzMTphbnksIGFyZ3MyOmFueSwuLi4pOnZvaWRcbiAgICAgKiBAcGFyYW0gICAgYXJncyAgICDlm57osIPlj4LmlbDjgIJcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkTG9vcChyYXRlOiBudW1iZXIsIHRpY2tzOiBudW1iZXIsIGNhbGxlcjogYW55LCBtZXRob2Q6IEZ1bmN0aW9uLCBhcmdzOiBBcnJheTxhbnk+ID0gbnVsbCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aWNrcyA8PSAwKSB0aWNrcyA9IDA7XG4gICAgICAgIGxldCBuZXdUaW1lcjogVGltZXJFbnRpdHkgPSBPYmplY3RQb29sLmdldChUaW1lckVudGl0eSk7XG4gICAgICAgICsrdGhpcy5tX2lkQ291bnRlcjtcbiAgICAgICAgaWYgKGFyZ3MgIT0gbnVsbCkgVXRpbEFycmF5Lmluc2VydChhcmdzLCB0aGlzLm1faWRDb3VudGVyLCAwKTtcbiAgICAgICAgbmV3VGltZXIuc2V0KHRoaXMubV9pZENvdW50ZXIsIHJhdGUsIHRpY2tzLCBIYW5kbGVyLmNyZWF0ZShjYWxsZXIsIG1ldGhvZCwgYXJncywgZmFsc2UpKTtcbiAgICAgICAgdGhpcy5tX1RpbWVycy5wdXNoKG5ld1RpbWVyKTtcbiAgICAgICAgcmV0dXJuIG5ld1RpbWVyLmlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWNleasoeaJp+ihjFxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRPbmNlKHJhdGU6IG51bWJlciwgY2FsbGVyOiBhbnksIG1ldGhvZDogRnVuY3Rpb24sIGFyZ3M6IEFycmF5PGFueT4gPSBudWxsKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IG5ld1RpbWVyOiBUaW1lckVudGl0eSA9IE9iamVjdFBvb2wuZ2V0KFRpbWVyRW50aXR5KTtcbiAgICAgICAgKyt0aGlzLm1faWRDb3VudGVyO1xuICAgICAgICBpZiAoYXJncyAhPSBudWxsKSBVdGlsQXJyYXkuaW5zZXJ0KGFyZ3MsIHRoaXMubV9pZENvdW50ZXIsIDApO1xuICAgICAgICBuZXdUaW1lci5zZXQodGhpcy5tX2lkQ291bnRlciwgcmF0ZSwgMSwgSGFuZGxlci5jcmVhdGUoY2FsbGVyLCBtZXRob2QsIGFyZ3MsIGZhbHNlKSk7XG4gICAgICAgIHRoaXMubV9UaW1lcnMucHVzaChuZXdUaW1lcik7XG4gICAgICAgIHJldHVybiBuZXdUaW1lci5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnp7vpmaTlrprml7blmahcbiAgICAgKiBAcGFyYW0gICAgdGltZXJJZCAgICDlrprml7blmahpZFxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVUaW1lcih0aW1lcklkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX1JlbW92YWxQZW5kaW5nLnB1c2godGltZXJJZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog56e76Zmk6L+H5pyf5a6a5pe25ZmoXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmUoKTogdm9pZCB7XG4gICAgICAgIGxldCB0aW1lcjogVGltZXJFbnRpdHk7XG4gICAgICAgIGlmICh0aGlzLm1fUmVtb3ZhbFBlbmRpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2YgdGhpcy5tX1JlbW92YWxQZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1fVGltZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVyID0gdGhpcy5tX1RpbWVyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVyLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lci5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0UG9vbC5yZWNvdmVyKHRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubV9UaW1lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFV0aWxBcnJheS5jbGVhcih0aGlzLm1fUmVtb3ZhbFBlbmRpbmcpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCJcblxuaW1wb3J0IFNwcml0ZSA9IExheWEuU3ByaXRlO1xuaW1wb3J0IFR3ZWVuID0gTGF5YS5Ud2VlbjtcbmltcG9ydCBFYXNlID0gTGF5YS5FYXNlO1xuaW1wb3J0IEhhbmRsZXIgPSBMYXlhLkhhbmRsZXI7XG5pbXBvcnQgeyBVdGlsRGlzcGxheSB9IGZyb20gXCIuLi8uLi91dGlsL2Rpc3BsYXlcIjtcblxuZXhwb3J0IG1vZHVsZSBDdXN0b21EaWFsb2d7XG5cbiAgICAvKipcbiAgICAgKiBAYXV0aG9yIFN1blxuICAgICAqIEB0aW1lIDIwMTktMDgtMDkgMTc6NDFcbiAgICAgKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAgICAgKiBAZGVzY3JpcHRpb24gIFVJ57uE5Lu255qE5Z+657G777yM57un5om/6IeqTGF5YS5WaWV3XG4gICAgICpcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgRGlhbG9nQmFzZSBleHRlbmRzIExheWEuRGlhbG9nIHtcblxuICAgICAgICBwcml2YXRlIG1hc2tMYXllcjogU3ByaXRlID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBjb250ZW50UG5sOiBMYXlhLk5vZGUgPSBudWxsO1xuICAgICAgICBwdWJsaWMgZGF0YTogYW55ID0gbnVsbDtcbiAgICAgICAgcHVibGljIGlzTWFzazogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAgICAgY3JlYXRlVmlldyh2aWV3OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZVZpZXcodmlldyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYnVuZGxlQnV0dG9ucygpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRQbmwgPSB0aGlzLmdldENoaWxkQXQoMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog5re75Yqg6YGu572p5bGCXG4gICAgICAgICAqL1xuICAgICAgICBjcmF0ZU1hc2tMYXllcigpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMubWFza0xheWVyID0gVXRpbERpc3BsYXkuY3JlYXRlTWFza0xheWVyKCk7XG4gICAgICAgICAgICB0aGlzLm1hc2tMYXllci5tb3VzZUVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBsZXQgdCA9IHRoaXMubWFza0xheWVyO1xuICAgICAgICAgICAgdC54ID0gTWF0aC5yb3VuZCgoKExheWEuc3RhZ2Uud2lkdGggLSB0LndpZHRoKSA+PiAxKSArIHQucGl2b3RYKTtcbiAgICAgICAgICAgIHQueSA9IE1hdGgucm91bmQoKChMYXlhLnN0YWdlLmhlaWdodCAtIHQuaGVpZ2h0KSA+PiAxKSArIHQucGl2b3RZKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLm1hc2tMYXllcik7XG4gICAgICAgICAgICB0aGlzLm1hc2tMYXllci56T3JkZXIgPSAtMTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWcqOWcuuaZr+S4reWxheS4ree7hOS7tlxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGNlbnRlcih2aWV3PzogTGF5YS5TcHJpdGUpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh2aWV3ID09IG51bGwpIHZpZXcgPSB0aGlzO1xuICAgICAgICAgICAgdmlldy54ID0gTWF0aC5yb3VuZCgoKExheWEuc3RhZ2Uud2lkdGggLSB2aWV3LndpZHRoKSA+PiAxKSArIHZpZXcucGl2b3RYKTtcbiAgICAgICAgICAgIHZpZXcueSA9IE1hdGgucm91bmQoKChMYXlhLnN0YWdlLmhlaWdodCAtIHZpZXcuaGVpZ2h0KSA+PiAxKSArIHZpZXcucGl2b3RZKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOa3u+WKoOm7mOiupOaMiemSruS6i+S7tlxuICAgICAgICAgKi9cbiAgICAgICAgYnVuZGxlQnV0dG9ucygpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzW1wiYnRuQ2xvc2VcIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXNbXCJidG5DbG9zZVwiXS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLmNsb3NlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlhbPpl63nqbrnmb3lpITngrnlh7vlhbPpl63kuovku7ZcbiAgICAgICAgICovXG4gICAgICAgIGNsb3NlT3V0c2llQ2xpY2soKXtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hc2tMYXllciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXNrTGF5ZXIub2ZmKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuY2xvc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWvueivneahhuW8ueWHuuaWueazlVxuICAgICAgICAgKiBAcGFyYW0gdGltZSDlvLnlh7rml7bpl7RcbiAgICAgICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gICAgICAgICAqIEBwYXJhbSBpc01hc2sg5piv5ZCm55Sf5oiQ6YGu572pXG4gICAgICAgICAqIEBwYXJhbSBjbG9zZU91dHNpZGUg5piv5ZCm54K55Ye756m655m95aSE5YWz6ZetXG4gICAgICAgICAqL1xuICAgICAgICBwb3B1cERpYWxvZyh0aW1lOiBudW1iZXIgPSAzMDAsIGRhdGE6IGFueSA9IG51bGwsIGlzTWFzazogYm9vbGVhbiA9IHRydWUsIGNsb3NlT3V0c2lkZTogYm9vbGVhbiA9IHRydWUsY2I/KTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwKGZhbHNlLGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcbiAgICAgICAgICAgIHRoaXMuaXNNYXNrID0gaXNNYXNrO1xuICAgICAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy56T3JkZXIgPSAyMDAwO1xuICAgICAgICAgICAgdGhpcy5wb3B1cEluaXQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNYXNrICYmIHRoaXMubWFza0xheWVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyYXRlTWFza0xheWVyKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNsb3NlT3V0c2lkZSkgdGhpcy5tYXNrTGF5ZXIub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5jbG9zZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25TaG93QW5pbWF0aW9uKHRpbWUsKCk9PntcbiAgICAgICAgICAgICAgICBpZihjYikgY2IuY2FsbCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiogRGVzOuW8ueWHuuiwg+eUqCAqL1xuICAgICAgICBwb3B1cEluaXQoKSB7XG4gICAgICAgIH1cblxuXG4gICAgICAgIG9uU2hvd0FuaW1hdGlvbih0aW1lOiBudW1iZXIgPSAzMDAsY2IpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmNvbnRlbnRQbmw7XG4gICAgICAgICAgICB0aGlzLmNlbnRlcigpO1xuXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0YXJnZXQuc2NhbGUoMCwgMCk7XG4gICAgICAgICAgICBUd2Vlbi50byh0YXJnZXQsIHtcbiAgICAgICAgICAgICAgICBzY2FsZVg6IDEsXG4gICAgICAgICAgICAgICAgc2NhbGVZOiAxXG4gICAgICAgICAgICB9LCB0aW1lLCBFYXNlLmJhY2tPdXQsIEhhbmRsZXIuY3JlYXRlKHRoaXMsIGNiLCBbdGhpc10pLCAwLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xuICAgICAgICB9XG5cblxuICAgIH1cbn0iLCJpbXBvcnQgeyBSZXNHcm91cCB9IGZyb20gJy4uL3Jlcy9yZXMtZ3JvdXAnO1xuaW1wb3J0IHsgUmVzTWFuYWdlciB9IGZyb20gJy4uL3Jlcy9yZXMtbWFuYWdlcic7XG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuLi8uLi9jb3JlL2xvZyc7XG5pbXBvcnQgeyBUaW1lck1hbmFnZXIgfSBmcm9tICcuLi90aW1lci90aW1lci1tYW5hZ2VyJztcbmltcG9ydCB7IEV2ZW50RnVuYyB9IGZyb20gJy4uL2V2ZW50L2V2ZW50LWRhdGEnO1xuXG5leHBvcnQgbW9kdWxlIEN1c3RvbVNjZW5le1xuXG4gICAgLyoqXG4gICAgICogQGF1dGhvciBTdW5cbiAgICAgKiBAdGltZSAyMDE5LTA4LTA5IDE5OjEyXG4gICAgICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gICAgICogQGRlc2NyaXB0aW9uICBTY2VuZeeahOWfuuexu1xuICAgICAqXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIEx5U2NlbmUgZXh0ZW5kcyBMYXlhLlNjZW5lIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICog5YaF5bWM5qih5byP56m655qE5Zy65pmv6LWE5rqQ77yM5b+F6aG75a6e546w6L+Z5LiqY3JlYXRlVmlld++8jOWQpuWImeaciemXrumimFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiU2NlbmVcIixcInByb3BzXCI6e1wid2lkdGhcIjoxMzM0LFwiaGVpZ2h0XCI6NzUwfSxcImxvYWRMaXN0XCI6W10sXCJsb2FkTGlzdDNEXCI6W119O1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWcuuaZr+esrOS4gOS4quWKoOi9veeahOeql+WPo1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGZpcnN0VmlldzogYW55ID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWcuuaZr+S+nei1lueahOi1hOa6kOe7hFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIG5lZWRMb2FkUmVzOiBSZXNHcm91cDtcblxuICAgICAgICBwcml2YXRlIG1fcGFyYW06IGFueTtcbiAgICAgICAgcHJpdmF0ZSBtX2xvYWRlZCA9IGZhbHNlO1xuXG4gICAgICAgIHB1YmxpYyBzY2VuZVRpbWVyczogQXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG5cbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMubmVlZExvYWRSZXMgPSBuZXcgUmVzR3JvdXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEx5U2NlbmUudWlWaWV3KTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDov5vlhaXlnLrmma9cbiAgICAgICAgICogQHBhcmFtIHBhcmFtIOWPguaVsCBcbiAgICAgICAgICogQHBhcmFtIHByb2dyZXNzRnVjIOi/m+W6puWbnuiwgyBcbiAgICAgICAgICogQHBhcmFtIGNvbXBsZXRlRnVjIOWujOaIkOWbnuiwg1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGVudGVyKHBhcmFtOiBhbnkscHJvZ3Jlc3NGdWM6RXZlbnRGdW5jLGNvbXBsZXRlRnVjOkV2ZW50RnVuYykge1xuXG4gICAgICAgICAgICB0aGlzLm1fbG9hZGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm1fcGFyYW0gPSBwYXJhbTtcbiAgICAgICAgICAgIHRoaXMub25Jbml0KHBhcmFtKTtcblxuICAgICAgICAgICAgUmVzTWFuYWdlci4kLmxvYWRHcm91cCh0aGlzLm5lZWRMb2FkUmVzLHByb2dyZXNzRnVjLGNvbXBsZXRlRnVjKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIGxlYXZlKCkge1xuICAgICAgICAgICAgdGhpcy5vbkxlYXZlKCk7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5vbkNsZWFuKCk7XG4gICAgICAgICAgICB0aGlzLnNjZW5lVGltZXJzLmZvckVhY2goKHRpbWVyOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBUaW1lck1hbmFnZXIuJC5yZW1vdmVUaW1lcih0aW1lcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICog5Yqg6L295a6M5oiQXG4gICAgICAgICAqIEBwYXJhbSBlcnJvciDliqDovb3plJnor69cbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBsb2FkZWQoZXJyb3IpIHtcblxuICAgICAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkZWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNoRW50ZXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICBwcml2YXRlIGNoZWNoRW50ZXIoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tX2xvYWRlZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpcnN0VmlldyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjbHMgPSB0aGlzLmZpcnN0VmlldztcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpbiA9IG5ldyBjbHMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh3aW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9uRW50ZXIodGhpcy5tX3BhcmFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWKoOi9veWujOaIkFxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIG9uTG9hZGVkKCkge1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog5Zy65pmv5Yid5aeL5YyWXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbSDlj4LmlbBcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBvbkluaXQocGFyYW06IGFueSkge1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog6L+b5YWl5Zy65pmvXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgb25FbnRlcihwYXJhbTogYW55KTogdm9pZCB7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOmAkOW4p+W+queOr1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOemu+W8gOWcuuaZr1xuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIG9uTGVhdmUoKTogdm9pZCB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlvZPlnLrmma/ooqvplIDmr4HnmoTml7blgJlcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBvbkNsZWFuKCk6IHZvaWQge1xuXG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJpbXBvcnQgeyBEYXRhTWFuYWdlciB9IGZyb20gJy4uL2RhdGEvZGF0YS1tYW5hZ2VyJztcbmltcG9ydCB7IERhdGFCYXNlIH0gZnJvbSAnLi4vZGF0YS9kYXRhLWJhc2UnO1xuXG5leHBvcnQgbW9kdWxlIEN1c3RvbVZpZXd7XG5cbiAgICAvKipcbiAgICAgKiBAYXV0aG9yIFN1blxuICAgICAqIEB0aW1lIDIwMTktMDgtMDkgMTU6NTFcbiAgICAgKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAgICAgKiBAZGVzY3JpcHRpb24gIFVJ57uE5Lu255qE5Z+657G777yM57un5om/6IeqTGF5YS5WaWV3XG4gICAgICpcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgVmlld0Jhc2UgZXh0ZW5kcyBMYXlhLlZpZXcge1xuXG4gICAgICAgIC8q5omA5pyJ5pWw5o2u6KeC5a+f6ICFKi9cbiAgICAgICAgcHJvdGVjdGVkIGRhdGFXYXRjaHM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgICAgICBwdWJsaWMgZGF0YTogYW55ID0gbnVsbDtcblxuICAgICAgICAvL292ZXJyaWRlXG4gICAgICAgIGNyZWF0ZVZpZXcodmlldzogYW55KTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5jcmVhdGVWaWV3KHZpZXcpO1xuICAgICAgICAgICAgdGhpcy5mdWxsU2NyZWVuKCk7XG4gICAgICAgICAgICB0aGlzLnBhcnNlRWxlbWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgb25EaXNhYmxlKCk6IHZvaWQge1xuXG4gICAgICAgICAgICB0aGlzLmRhdGFXYXRjaHMuZm9yRWFjaCgoY21kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBEYXRhTWFuYWdlci4kLnJlbW92ZUV2ZW50TGlzdGVuZXIoY21kLCB0aGlzLm9uRGF0YSwgdGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDog4zmma/lm77pgILlupRcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBwYXJzZUVsZW1lbnQoKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpc1tcImltZ0JnXCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW1nQmcgPSB0aGlzW1wiaW1nQmdcIl0gYXMgTGF5YS5TcHJpdGVcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxTY3JlZW4oaW1nQmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWcqOWcuuaZr+S4reWxheS4ree7hOS7tlxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIGNlbnRlcih2aWV3PzogTGF5YS5TcHJpdGUpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh2aWV3ID09IG51bGwpIHZpZXcgPSB0aGlzO1xuICAgICAgICAgICAgdmlldy54ID0gTWF0aC5yb3VuZCgoKExheWEuc3RhZ2Uud2lkdGggLSB2aWV3LndpZHRoKSA+PiAxKSArIHZpZXcucGl2b3RYKTtcbiAgICAgICAgICAgIHZpZXcueSA9IE1hdGgucm91bmQoKChMYXlhLnN0YWdlLmhlaWdodCAtIHZpZXcuaGVpZ2h0KSA+PiAxKSArIHZpZXcucGl2b3RZKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDorr7nva7lpKflsI/kuLrlhajlsY9cbiAgICAgICAgICogQHBhcmFtIHZpZXcgTGF5YS5TcHJpdGVcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBmdWxsU2NyZWVuKHZpZXc/OiBMYXlhLlNwcml0ZSk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHZpZXcgPT0gbnVsbCkgdmlldyA9IHRoaXM7XG4gICAgICAgICAgICB2aWV3LndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcbiAgICAgICAgICAgIHZpZXcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog57uR5a6a5pWw5o2u55uR5ZCsXG4gICAgICAgICAqIEBwYXJhbSBjbWQg55uR5ZCs57G75Z6LXG4gICAgICAgICAqL1xuICAgICAgICBwcm90ZWN0ZWQgYWRkRGF0YVdhdGNoKGNtZDogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFXYXRjaHMucHVzaChjbWQpO1xuICAgICAgICAgICAgRGF0YU1hbmFnZXIuJC5hZGRFdmVudExpc3RlbmVyKGNtZCwgdGhpcy5vbkRhdGEsIHRoaXMpO1xuICAgICAgICAgICAgRGF0YU1hbmFnZXIuJC5nZXQoY21kKS5ub3RpZnkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlvZPmlbDmja7liLfmlrDmmK/ph43nu5hcbiAgICAgICAgICovXG4gICAgICAgIHByb3RlY3RlZCBvbkRhdGEoZGF0YTogRGF0YUJhc2UpIHtcbiAgICAgICAgICAgIC8vIGlmIChkYXRhLmNtZCA9PSBEYXRhRGVmaW5lLkNvaW5JbmZvKXtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog5re75Yqg5Yiw55S75biDXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNriBcbiAgICAgICAgICovXG4gICAgICAgIGFkZChkYXRhOiBhbnkgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaYvuekunZpZXdcbiAgICAgICAgICovXG4gICAgICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOmakOiXj3ZpZXdcbiAgICAgICAgICovXG4gICAgICAgIGhpZGUoKTp2b2lke1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiIsImltcG9ydCB7IEV2ZW50Tm9kZSB9IGZyb20gJy4uL21hbmFnZXIvZXZlbnQvZXZlbnQtbm9kZSc7XG5pbXBvcnQgeyBDb25maWdMYXlvdXQsIENvbmZpZ1VJLCBDb25maWdEZWJ1ZywgQ29uZmlnR2FtZSwgQ29uZmlnVmVyc2lvbiwgQ29uZmlnUmVzIH0gZnJvbSAnLi4vc2V0dGluZy9jb25maWcnO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vY29yZS9sb2cnO1xuaW1wb3J0IHsgVXRpbFRpbWUgfSBmcm9tICcuLi91dGlsL3RpbWUnO1xuaW1wb3J0IHsgZW51bURpbWVuc2lvbiwgZW51bUFsaWdlLCBlbnVtU2NyZWVuTW9kZWwsIGVudW1TY2FsZVR5cGUgfSBmcm9tICcuLi9zZXR0aW5nL2VudW0nO1xuaW1wb3J0IEJyb3dzZXIgPSBMYXlhLkJyb3dzZXI7XG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSAnLi4vbWFuYWdlci9yZXMvcmVzLW1hbmFnZXInO1xuaW1wb3J0IHsgRXZlbnRGdW5jIH0gZnJvbSAnLi4vbWFuYWdlci9ldmVudC9ldmVudC1kYXRhJztcbmltcG9ydCB7IExvYWRpbmdWaWV3IH0gZnJvbSAnLi4vLi4vY2xpZW50L3ZpZXcvbGF5ZXItdmlldy9sb2FkaW5nLXZpZXcnO1xuLyoqXG4gKiBAYXV0aG9yIFN1blxuICogQHRpbWUgMjAxOS0wOC0xMSAxODowOFxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gKiBAZGVzY3JpcHRpb24g5qGG5p625Yid5aeL5YyW5ZKM5ri45oiP5YWl5Y+jXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRW5naW5le1xuXG5cbiAgICBwdWJsaWMgbGF5b3V0OiBDb25maWdMYXlvdXQgPSBDb25maWdMYXlvdXQuJDtcbiAgICBwdWJsaWMgZ2FtZTogQ29uZmlnR2FtZSA9IENvbmZpZ0dhbWUuJDtcbiAgICBwdWJsaWMgdWk6IENvbmZpZ1VJID0gQ29uZmlnVUkuJDtcbiAgICBwdWJsaWMgZGVidWc6IENvbmZpZ0RlYnVnID0gQ29uZmlnRGVidWcuJDtcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEVuZ2luZSA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOiBFbmdpbmUge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZT09bnVsbCkgdGhpcy5pbnN0YW5jZSA9IG5ldyBFbmdpbmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5byV5pOO5ZCv5Yqo5YWl5Y+jXG4gICAgICovXG4gICAgcHVibGljIHJ1bigpOiB2b2lkIHtcbiAgICAgICAgTG9nLmluZm8oXCI6OjogR2FtZSBFbmdpbmUgUnVuIDo6OlwiKTtcblxuICAgICAgICBpZiAoQ29uZmlnVUkuJC5kZWZhdWx0TG9hZFZpZXcgIT0gbnVsbCAmJiBDb25maWdSZXMuJC5kZWZhdWx0TG9hZFJlcyAhPSBudWxsKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZW5naW5lU2V0dXAoKCk9PntcbiAgICAgICAgICAgICAgICAvL+a4uOaIj+W8gOWni1xuICAgICAgICAgICAgICAgIFV0aWxUaW1lLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgLy/liJ3lp4vljJbmuLjmiI/nrqHnkIblmahcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXJTZXRVcCgpO1xuICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyW5ri45oiP5Li75b6q546vXG4gICAgICAgICAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5tYW5hZ2VyVXBkYXRlKTtcbiAgICAgICAgICAgICAgICAvL+WKoOi9vUxvYWRpbmfpobXnmoTpu5jorqTotYTmupDlubbmmL7npLpMb2FkaW5n6aG1XG4gICAgICAgICAgICAgICAgUmVzTWFuYWdlci4kLmxvYWRHcm91cChDb25maWdSZXMuJC5kZWZhdWx0TG9hZFJlcyxudWxsLG5ldyBFdmVudEZ1bmModGhpcywoKT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NycHQgPSBDb25maWdVSS4kLmRlZmF1bHRMb2FkVmlldztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcnB0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvYWRpbmdWaWV3ID0gbmV3IHNjcnB0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKGxvYWRpbmdWaWV3KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdWaWV3Lm9uU3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjpMb2FkaW5n6LWE5rqQ5Li656m65Yqg6L295aSx6LSl77yBXCIpO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5byV5pOO55qE5Yid5aeL5YyW6K6+572uXG4gICAgICovXG4gICAgcHJpdmF0ZSBlbmdpbmVTZXR1cChzdGFydENhbGxiYWNrKVxuICAgIHtcbiAgICAgICAgLyoq5Yid5aeL5YyWTGF5YSAqL1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRpbWVuc2lvbiA9PSBlbnVtRGltZW5zaW9uLkRpbTMpIHtcbiAgICAgICAgICAgIExheWEzRC5pbml0KENvbmZpZ0xheW91dC4kLmRlc2lnbldpZHRoLCBDb25maWdMYXlvdXQuJC5kZXNpZ25IZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTGF5YS5pbml0KENvbmZpZ0xheW91dC4kLmRlc2lnbldpZHRoLCBDb25maWdMYXlvdXQuJC5kZXNpZ25IZWlnaHQsIExheWEuV2ViR0wpO1xuICAgICAgICB9XG4gICAgICAgIC8qKuiDjOaZr+minOiJsiAqL1xuICAgICAgICBMYXlhLnN0YWdlLmJnQ29sb3IgPSBcIm5vbmVcIjtcbiAgICAgICAgLyoq57yp5pS+5qih5byPICovXG4gICAgICAgIExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gZW51bVNjYWxlVHlwZS5TY2FsZVNob3dBbGwudG9TdHJpbmcoKTtcbiAgICAgICAgLyoq6K6+572u5bGP5bmV5aSn5bCPICovXG4gICAgICAgIExheWEuc3RhZ2Uuc2V0U2NyZWVuU2l6ZShCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCk7XG4gICAgICAgIC8qKuiuvue9ruaoquerluWxjyAqL1xuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBlbnVtU2NyZWVuTW9kZWwuU2NyZWVuTm9uZTtcbiAgICAgICAgLyoq5rC05bmz5a+56b2Q5pa55byPICovXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25IID0gZW51bUFsaWdlLkFsaWdlQ2VudGVyO1xuICAgICAgICAvKirlnoLnm7Tlr7npvZDmlrnlvI8gKi9cbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBlbnVtQWxpZ2UuQWxpZ2VNaWRkbGU7XG4gICAgICAgIC8qKuW8gOWQr+eJqeeQhuW8leaTjiAqL1xuICAgICAgICBpZihDb25maWdHYW1lLiQucGh5c2ljcykgTGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XG5cdFx0Lyoq5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iSAqL1xuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc0VuYWJsZURlYnVnUGFuZWwgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcbiAgICAgICAgLyoq54mp55CG6L6F5Yqp57q/ICovXG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzUGh5c2ljc0RlYnVnICYmIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdKSBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXS5lbmFibGUoKTtcbiAgICAgICAgLyoq5oCn6IO95ZCM57qn6Z2i5p2/ICovXG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzU3RhdCkgTGF5YS5TdGF0LnNob3coQ29uZmlnRGVidWcuJC5wYW5lbFgsQ29uZmlnRGVidWcuJC5wYW5lbFkpO1xuICAgICAgICAvKirlvq7kv6HlvIDmlL7ln5/lrZDln5/orr7nva4qL1xuICAgICAgICBpZiAoQnJvd3Nlci5vbldlaVhpbiB8fCBCcm93c2VyLm9uTWluaUdhbWUpIHtcbiAgICAgICAgICAgIExheWEuTWluaUFkcHRlci5pbml0KCk7XG4gICAgICAgICAgICBMYXlhLmlzV1hPcGVuRGF0YUNvbnRleHQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKirmqKHlvI/nqpflj6Pngrnlh7vovrnnvJggKi9cbiAgICAgICAgVUlDb25maWcuY2xvc2VEaWFsb2dPblNpZGUgPSB0cnVlO1xuICAgICAgICAvKirmmK/lkKbmmL7npLrmu5rliqjmnaHmjInpkq4gKi9cbiAgICAgICAgVUlDb25maWcuc2hvd0J1dHRvbnMgPSB0cnVlO1xuICAgICAgICAvKirmjInpkq7nmoTngrnlh7vmlYjmnpwgKi9cbiAgICAgICAgVUlDb25maWcuc2luZ2xlQnV0dG9uU3R5bGUgPSBcInNjYWxlXCI7IC8vXCJjb2xvclwiLFwic2NhbGVcIlxuICAgICAgICAvKirlvLnlh7rmoYbog4zmma/pgI/mmI7luqYgKi9cbiAgICAgICAgVUlDb25maWcucG9wdXBCZ0FscGhhID0gMC43NTtcbiAgICAgICAgLyoq5YW85a65U2NlbmXlkI7nvIDlnLrmma8gKi9cbiAgICAgICAgTGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSB0cnVlO1xuICAgICAgICAvKirmmK/lkKblvIDlkK/niYjmnKznrqHnkIYgKi9cbiAgICAgICAgaWYoQ29uZmlnVmVyc2lvbi4kLmlzT3BlblZlcnNpb24pe1xuICAgICAgICAgICAgTGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKENvbmZpZ1ZlcnNpb24uJC52ZXJzaW9uRmxvZGVyLFxuICAgICAgICAgICAgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBzdGFydENhbGxiYWNrKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc3RhcnRDYWxsYmFjay5jYWxsKCk7XG4gICAgICAgIH1cbiAgICAgICBcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeuoeeQhuWZqOeahOWIneWni+WMllxuICAgICAqL1xuICAgIHByaXZhdGUgIG1hbmFnZXJTZXRVcCgpOiB2b2lkIHtcbiAgICAgICAgLy8gRGF0YU1hbmFnZXIuJC5zZXR1cCgpO1xuICAgICAgICAvLyBFdmVudE1hbmFnZXIuJC5zZXR1cCgpO1xuICAgICAgICAvLyBJbnB1dE1hbmFnZXIuJC5zZXR1cCgpO1xuICAgICAgICAvLyBSZXNNYW5hZ2VyLiQuc2V0dXAoKTtcbiAgICAgICAgLy8gSnNvbk1hbmFnZXIuJC5zZXR1cCgpO1xuICAgICAgICAvLyBMb2NhbGVNYW5hZ2VyLiQuc2V0dXAoKTtcbiAgICAgICAgLy8gTmV0TWFuYWdlci4kLnNldHVwKCk7XG4gICAgICAgIC8vIE9iamVjdE1hbmFnZXIuJC5zZXR1cCgpO1xuICAgICAgICAvLyBTY2VuZU1hbmFnZXIuJC5zZXR1cCgpO1xuICAgICAgICAvLyBTb3VuZE1hbmFnZXIuJC5zZXR1cCgpO1xuICAgICAgICAvLyBUaW1lck1hbmFnZXIuJC5zZXR1cCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeuoeeQhuWZqOeahFVwZGF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgbWFuYWdlclVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICBcbiAgICB9XG5cbn0iLCJpbXBvcnQgQnJvd3NlciA9IGxheWEudXRpbHMuQnJvd3NlcjtcbmltcG9ydCB7IGVudW1EaW1lbnNpb24sIGVudW1TY2FsZVR5cGUsIGVudW1Kc29uRGVmaW5lLCBlbnVtU291bmROYW1lIH0gZnJvbSAnLi9lbnVtJztcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gJy4uL2NvcmUvc2luZ2xldG9uJztcbmltcG9ydCB7IE1haW5TY2VuZSB9IGZyb20gJy4uLy4uL2NsaWVudC9zY2VuZS9tYWluLXNjZW5lJztcbmltcG9ydCB7IFJlc0dyb3VwIH0gZnJvbSAnLi4vbWFuYWdlci9yZXMvcmVzLWdyb3VwJztcbmltcG9ydCB7IExvYWRpbmdWaWV3IH0gZnJvbSAnLi4vLi4vY2xpZW50L3ZpZXcvbGF5ZXItdmlldy9sb2FkaW5nLXZpZXcnO1xuaW1wb3J0IHsgSnNvblRlbXBsYXRlIH0gZnJvbSAnLi4vbWFuYWdlci9qc29uL2pzb24tdGVtcGxhdGUnO1xuaW1wb3J0IHsgU291bmRUZW1wbGF0ZSB9IGZyb20gJy4uL21hbmFnZXIvc291bmQvc291bmQtdGVtcGxhdGUnO1xuIC8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDgtMDkgMTQ6MDFcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uIOa4uOaIj+mFjee9ruS/oeaBr1xuICovXG5cblxuLyoqXG4gKiDnlYzpnaLphY3nva5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZ1VJIGV4dGVuZHMgU2luZ2xldG9uIHtcblxuICAgIC8qKum7mOiupOWtl+S9kyAqL1xuICAgIHB1YmxpYyBkZWZhdWx0Rm9udE5hbWU6IHN0cmluZyA9ICfpu5HkvZMnO1xuICAgIC8qKum7mOiupOWtl+S9k+Wkp+WwjyAqL1xuICAgIHB1YmxpYyBkZWZhdWx0Rm9udFNpemU6IG51bWJlciA9IDE2O1xuICAgIC8qKum7mOiupOWKoOi9veWcuuaZryAqL1xuICAgIHB1YmxpYyBkZWZhdWx0TWFpblNjZW5lOiBhbnkgPSBNYWluU2NlbmU7XG4gICAgLyoq6buY6K6k5Yqg6L2955qETG9hZGluZ+mhtemdoiAqL1xuICAgIHB1YmxpYyBkZWZhdWx0TG9hZFZpZXc6IGFueSA9IExvYWRpbmdWaWV3O1xuICAgXG5cbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnVUkgPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpDb25maWdVSSB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdVSSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG4gICBcbn1cblxuLyoqXG4gKiDotYTmupDphY3nva5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZ1JlcyBleHRlbmRzIFNpbmdsZXRvbntcblxuICAgIC8qKum7mOiupExvYWRpbmfpobXpnaLnmoTotYTmupDkv6Hmga8gKi9cbiAgICBwdWJsaWMgZGVmYXVsdExvYWRSZXM6IFJlc0dyb3VwID0gbnVsbDtcbiAgICAvKirpu5jorqTnmoTln7rnoYDpobXpnaLotYTmupDkv6Hmga8gKi9cbiAgICBwdWJsaWMgZGVmYXVsdE1haW5SZXM6UmVzR3JvdXAgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZpZ1JlcyA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ1JlcyB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdSZXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvL+aJi+WKqOmFjee9rmxvYWRpbmfotYTmupBcbiAgICAgICAgdGhpcy5kZWZhdWx0TG9hZFJlcyA9IG5ldyBSZXNHcm91cCgpO1xuICAgICAgICB0aGlzLmRlZmF1bHRMb2FkUmVzXG4gICAgICAgIC5hZGQoXCJyZXMvbG9hZGluZy9pbWdfbG9hZGluZ19iZy5wbmdcIixMYXlhLkxvYWRlci5JTUFHRSlcbiAgICAgICAgLmFkZChcInJlcy9sb2FkaW5nL3Byb2dyZXNzX2xvYWRpbmcucG5nXCIsTGF5YS5Mb2FkZXIuSU1BR0UpXG4gICAgICAgIC5hZGQoXCJyZXMvbG9hZGluZy9pbWdfOHIucG5nXCIsTGF5YS5Mb2FkZXIuSU1BR0UpO1xuICAgICAgICAvL+aJi+WKqOmFjee9ruS4u+mhtei1hOa6kFxuICAgICAgICB0aGlzLmRlZmF1bHRNYWluUmVzID0gbmV3IFJlc0dyb3VwKCk7XG4gICAgICAgIHRoaXMuZGVmYXVsdE1haW5SZXNcbiAgICAgICAgLmFkZChcInJlcy9hdGxhcy9yZXMvbWFpbi9lZmZlY3QuYXRsYXNcIiwgTGF5YS5Mb2FkZXIuQVRMQVMpO1xuICAgICAgICAvL+WKoOi9vUpzb27phY3nva7mlofku7ZcbiAgICAgICAgQ29uZmlnRGF0YS4kLmpzb25UZW1wbGF0ZUxpc3QuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRNYWluUmVzXG4gICAgICAgICAgICAuYWRkKGl0ZW0udXJsLCBMYXlhLkxvYWRlci5KU09OKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8v5Yqg6L296Z+z5pWI6LWE5rqQXG4gICAgICAgIENvbmZpZ1NvdW5kLiQuc291bmRSZXNMaXN0LmZvckVhY2goaXRlbT0+e1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0TWFpblJlc1xuICAgICAgICAgICAgLmFkZChpdGVtLnVybCwgTGF5YS5Mb2FkZXIuU09VTkQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICog5aOw6Z+z6YWN572uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWdTb3VuZCBleHRlbmRzIFNpbmdsZXRvbiB7XG5cbiAgICAvKirog4zmma/pn7PkuZDlkI3lrZcgKi9cbiAgICBwdWJsaWMgYmdTb3VuZE5hbWUgPSBcIlwiO1xuICAgIC8qKuiDjOaZr+mfs+W8gOWFsyAqL1xuICAgIHB1YmxpYyBpc0Nsb3NlQkdTb3VuZCA9IGZhbHNlO1xuICAgIC8qKuaViOaenOmfs+W8gOWFsyAqL1xuICAgIHB1YmxpYyBpc0Nsb3NlRWZmZWN0U291bmQgPSBmYWxzZTtcbiAgICAvKirmiYDmnInpn7PmlYjlvIDlhbMgKi9cbiAgICBwdWJsaWMgaXNDbG9zZVZvaWNlU291bmQgPSBmYWxzZTtcbiAgICAvKirmgLvpn7Pph48gKi9cbiAgICBwdWJsaWMgdm9sdW1lVm9pY2VTb3VuZCA9IDE7XG4gICAgLyoq6Z+z5pWI6LWE5rqQICovXG4gICAgcHVibGljIHNvdW5kUmVzTGlzdDpBcnJheTxTb3VuZFRlbXBsYXRlPiA9IG51bGw7XG4gIFxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWdTb3VuZCA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ1NvdW5kIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ1NvdW5kKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc291bmRSZXNMaXN0ID0gbmV3IEFycmF5PFNvdW5kVGVtcGxhdGU+KCk7XG4gICAgICAgIC8vIHRoaXMuc291bmRSZXNMaXN0LnB1c2gobmV3IFNvdW5kVGVtcGxhdGUoXCJyZXMvc291bmQvYmcubXAzXCIsZW51bVNvdW5kTmFtZS5iZykpO1xuICAgIH1cbn1cblxuLyoqXG4gKiDmlbDmja7ooajphY3nva5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZ0RhdGEgZXh0ZW5kcyBTaW5nbGV0b257XG5cbiAgICAvKipqc29u6YWN572u6KGo5L+h5oGvICovXG4gICAgcHVibGljIGpzb25UZW1wbGF0ZUxpc3Q6QXJyYXk8SnNvblRlbXBsYXRlPjtcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuanNvblRlbXBsYXRlTGlzdCA9IG5ldyBBcnJheTxKc29uVGVtcGxhdGU+KCk7XG4gICAgICAgIHRoaXMuanNvblRlbXBsYXRlTGlzdCA9IFtcbiAgICAgICAgICAgIG5ldyBKc29uVGVtcGxhdGUoXCJyZXMvZGF0YS9CZXREYXRhLmpzb25cIiwgXCJsZXZlbFwiLCBcImxldmVsXCIpLFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWdEYXRhID0gbnVsbDtcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6Q29uZmlnRGF0YSB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdEYXRhKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cbn1cblxuLyoqXG4gKiDmuLjmiI/phY3nva5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZ0dhbWUgZXh0ZW5kcyBTaW5nbGV0b24ge1xuIFxuICAgIC8qKum7mOiupOaooeW8j+S/oeaBryAyRC8zRCAqL1xuICAgIHB1YmxpYyBkaW1lbnNpb246IGVudW1EaW1lbnNpb24gPSBlbnVtRGltZW5zaW9uLkRpbTI7XG4gICAgLyoq54mp55CG5byA5YWzICovXG4gICAgcHVibGljIHBoeXNpY3M6Ym9vbGVhbiA9IGZhbHNlO1xuICBcbiAgICBcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnR2FtZSA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ0dhbWUge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ29uZmlnR2FtZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG59XG5cbi8qKlxuICog54mI5pys6YWN572uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWdWZXJzaW9uIGV4dGVuZHMgU2luZ2xldG9uIHtcbiBcbiAgICAvKirniYjmnKzmjqfliLblvIDlhbMgKi9cbiAgICBwdWJsaWMgaXNPcGVuVmVyc2lvbjpib29sZWFuID0gZmFsc2U7XG4gICAgLyoq54mI5pys5Y+3ICovXG4gICAgcHVibGljIHZlcnNpb25OdW06bnVtYmVyID0gMDtcbiAgICAvKirniYjmnKzmjqfliLbmlofku7blkI0gKi9cbiAgICBwdWJsaWMgdmVyc2lvbkZsb2RlcjpzdHJpbmcgPSBcIlZlcnNpb25cIit0aGlzLnZlcnNpb25OdW07XG4gICAgXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZpZ1ZlcnNpb24gPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpDb25maWdWZXJzaW9uIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ1ZlcnNpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxufVxuXG5cbi8qKlxuICog5biD5bGA6YWN572uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWdMYXlvdXQgZXh0ZW5kcyBTaW5nbGV0b24ge1xuXG4gICAgLyoq6K6+6K6h5YiG6L6o546HWCAqL1xuICAgIHB1YmxpYyBkZXNpZ25XaWR0aDogbnVtYmVyID0gNzUwO1xuICAgIC8qKuiuvuiuoeWIhui+qOeOh1kgKi9cbiAgICBwdWJsaWMgZGVzaWduSGVpZ2h0OiBudW1iZXIgPSAxMzM0O1xuICAgIC8qKue8qeaUvuaooeW8jyAqL1xuICAgIHB1YmxpYyBzY2FsZU1vZGU6IGVudW1TY2FsZVR5cGUgPSBlbnVtU2NhbGVUeXBlLlNjYWxlRml4ZWRBdXRvO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZpZ0xheW91dCA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ0xheW91dCB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdMYXlvdXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBEZWJ1Z+mFjee9rlxuICovXG5leHBvcnQgY2xhc3MgQ29uZmlnRGVidWcgZXh0ZW5kcyBTaW5nbGV0b24ge1xuXG4gICAgLyoq6LCD6K+V5L+h5oGv5byA5YWzICovXG4gICAgcHVibGljIGlzRGVidWc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKueJqeeQhui+heWKqee6v+W8gOWFsyAqL1xuICAgIHB1YmxpYyBpc1BoeXNpY3NEZWJ1ZzogYm9vbGVhbiA9IGZhbHNlOyBcbiAgICAvKirosIPor5XpnaLmnb8gKi9cbiAgICBwdWJsaWMgaXNFbmFibGVEZWJ1Z1BhbmVsOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKirmgKfog73pnaLmnb/lvIDlhbMgKi9cbiAgICBwdWJsaWMgaXNTdGF0OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKirmgKfog73nu5/orqHpnaLmnb9YICovXG4gICAgcHVibGljIHBhbmVsWDpudW1iZXIgPSAwO1xuICAgIC8qKuaAp+iDvee7n+iuoemdouadv1kgKi9cbiAgICBwdWJsaWMgcGFuZWxZOm51bWJlciA9IDEwMDtcblxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWdEZWJ1ZyA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ0RlYnVnIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ0RlYnVnKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cbn1cblxuLyoqXG4gKiAzROmFjee9rlxuICovXG5leHBvcnQgY2xhc3MgQ29uZmlnM0QgZXh0ZW5kcyBTaW5nbGV0b257XG5cbiAgICAvKirlnLrmma/otYTmupDot6/lvoQgKi9cbiAgICBwdWJsaWMgc2NlbmVQYXRoOnN0cmluZyA9IFwiXCI7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnM0QgPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpDb25maWczRCB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWczRCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG59XG5cblxuXG4vLyAvKipcbi8vICAqIE5ldHdvcmvphY3nva5cbi8vICAqL1xuLy8gZXhwb3J0IGNsYXNzIENvbmZpZ05ldCBleHRlbmRzIFNpbmdsZXRvbiB7XG5cbi8vICAgICBwdWJsaWMgaHR0cFVybDogc3RyaW5nID0gXCJodHRwOi8vMTI3LjAuMC4xOjM0NTY4XCI7XG4vLyAgICAgcHVibGljIHdzVXJsOiBzdHJpbmcgPSBcIndzczovL3d4LmRvbm9wby5jb20vd3Mvd3NcIjtcbi8vICAgICBwdWJsaWMgcmVzVXJsOiBzdHJpbmcgPSBcIndzOi8vMTI3LjAuMC4xOjE2NjY5XCI7XG4vLyAgICAgcHVibGljIHRpbWVPdXQ6IG51bWJlciA9IDEwO1xuLy8gICAgIHB1YmxpYyBoZWFydEJlYXQ6IG51bWJlciA9IDEwO1xuLy8gICAgIHB1YmxpYyBzZXJ2ZXJIZWFydEJlYXQ6IG51bWJlciA9IDM7XG5cbi8vICAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnTmV0ID0gbnVsbDtcblxuLy8gICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpDb25maWdOZXQge1xuLy8gICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ29uZmlnTmV0KCk7XG4vLyAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuLy8gICAgIH1cblxuLy8gfVxuXG4vLyAvKipcbi8vICAqIOW+ruS/oemFjee9rlxuLy8gICovXG4vLyBleHBvcnQgY2xhc3MgQ29uZldlY2hhdCBleHRlbmRzIFNpbmdsZXRvbiB7XG5cbi8vICAgICBwdWJsaWMgYXBwaWQ6IHN0cmluZyA9IFwiXCI7XG4vLyAgICAgcHVibGljIHNlY3JldDogc3RyaW5nID0gXCJcIjtcbi8vICAgICBwdWJsaWMgYWRVbml0SWQ6IHN0cmluZyA9IFwiXCI7XG4vLyAgICAgcHVibGljIGNvZGUyc2Vzc2lvblVybCA9IFwiaHR0cHM6Ly9hcGkud2VpeGluLnFxLmNvbS9zbnMvanNjb2RlMnNlc3Npb24/YXBwaWQ9ezB9JnNlY3JldD17MX0manNfY29kZT17Mn0mZ3JhbnRfdHlwZT1hdXRob3JpemF0aW9uX2NvZGVcIjtcblxuXG4vLyAgICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZXZWNoYXQgPSBudWxsO1xuXG4vLyAgICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZXZWNoYXQge1xuLy8gICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ29uZldlY2hhdCgpO1xuLy8gICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbi8vICAgICB9XG4vLyB9XG4iLCIvKipcbiAqIOmHjeimgeeahOaemuS4vuWumuS5iSzmoYbmnrbnuqfliKtcbiAqXG4gKiBAYXV0aG9yIFRpbSBXYXJzXG4gKiBAZGF0ZSAyMDE5LTAxLTE4IDE2OjIwXG4gKiBAcHJvamVjdCBmaXJlYm9sdFxuICogQGNvcHlyaWdodCAoQykgRE9OT1BPXG4gKlxuICovXG5cbmltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2U7XG5cbi8qKlxuICog6Iie5Y+w55qE57yp5pS+5qC85byPXG4gKi9cbmV4cG9ydCBlbnVtIGVudW1TY2FsZVR5cGUge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBTY2FsZU5vU2NhbGUgPSBTdGFnZS5TQ0FMRV9GVUxMLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBTY2FsZUV4YWN0Rml0ID0gU3RhZ2UuU0NBTEVfRVhBQ1RGSVQsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIFNjYWxlU2hvd0FsbCA9IFN0YWdlLlNDQUxFX1NIT1dBTEwsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIFNjYWxlTm9Cb3JkZXIgPSBTdGFnZS5TQ0FMRV9OT0JPUkRFUixcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgU2NhbGVGdWxsID0gU3RhZ2UuU0NBTEVfRlVMTCxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgU2NhbGVGaXhlZFdpZHRoID0gU3RhZ2UuU0NBTEVfRklYRURfV0lEVEgsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIFNjYWxlRml4ZWRIZWlnaHQgPSBTdGFnZS5TQ0FMRV9GSVhFRF9IRUlHSFQsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIFNjYWxlRml4ZWRBdXRvID0gU3RhZ2UuU0NBTEVfRklYRURfQVVUTyxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgU2NhbGVOb1NjYWxlID0gU3RhZ2UuU0NBTEVfTk9TQ0FMRVxufVxuXG4vKipcbiAqIOWxj+W5leeahOiHqumAguW6lOaWueW8j1xuICovXG5leHBvcnQgZW51bSBlbnVtU2NyZWVuTW9kZWwge1xuICAgIFNjcmVlbk5vbmUgPSAnbm9uZScsXG4gICAgU2NyZWVuSG9yaXpvbnRhbCA9ICdob3Jpem9udGFsJyxcbiAgICBTY3JlZW5WZXJ0aWNhbCA9ICd2ZXJ0aWNhbCdcbn1cblxuLyoqXG4gKiDmlbDnu4TmjpLluo/mlrnlvI9cbiAqICovXG5leHBvcnQgZW51bSBlbnVtQXJyYXlTb3J0T3JkZXIge1xuICAgIEFzY2VuZGluZyxcdC8v5Y2H5bqPXG4gICAgRGVzY2VuZGluZyxcdC8v6ZmN5bqPXG59XG5cbi8qKlxuICog5ri45oiP55qE6L+Q6KGM5a655ZmoXG4gKi9cbmV4cG9ydCBlbnVtIGVudW1HYW1lUGxhdGZvcm0ge1xuICAgIFdlYixcbiAgICBQaG9uZSxcbiAgICBXZWl4aW5cbn1cblxuLyoqXG4gKiDlr7npvZDmlrnlvI9cbiAqL1xuZXhwb3J0IGVudW0gZW51bUFsaWdlVHlwZSB7XG4gICAgTk9ORSA9IDAsXG4gICAgUklHSFQsXG4gICAgUklHSFRfQk9UVE9NLFxuICAgIEJPVFRPTSxcbiAgICBMRUZUX0JPVFRPTSxcbiAgICBMRUZULFxuICAgIExFRlRfVE9QLFxuICAgIFRPUCxcbiAgICBSSUdIVF9UT1AsXG4gICAgTUlELFxufVxuXG4vKipcbiAqIOWvuem9kOagh+azqFxuICovXG5leHBvcnQgZW51bSBlbnVtQWxpZ2Uge1xuICAgIEFsaWdlTGVmdCA9ICdsZWZ0JyxcbiAgICBBbGlnZUNlbnRlciA9ICdjZW50ZXInLFxuICAgIEFsaWdlUmlnaHQgPSAncmlnaHQnLFxuICAgIEFsaWdlVG9wID0gJ3RvcCcsXG4gICAgQWxpZ2VNaWRkbGUgPSAnbWlkZGxlJyxcbiAgICBBbGlnZUJvdHRvbSA9ICdib3R0b20nXG59XG5cbi8qKlxuICog5riF55CG6LWE5rqQ55qE5qyh5bqP562W55WlXG4gKi9cbmV4cG9ydCBlbnVtIGVudW1DbGVhclN0cmF0ZWd5IHtcbiAgICBGSUZPID0gMCwgICAvL+WFiOi/m+WFiOWHulxuICAgIEZJTE8sICAgICAgIC8v5YWI6L+b5ZCO5Ye6XG4gICAgTFJVLFx0XHQvL+acgOi/keacgOWwkeS9v+eUqFxuICAgIFVOX1VTRUQsXHQvL+acquS9v+eUqFxuICAgIEFMTCxcdFx0Ly/muIXnkIbmiYDmnIlcbn1cblxuLyoqXG4gKiDmuLjmiI/mmK/lkKbph4fnlKjnmoQyROaIluiAhTNEXG4gKi9cbmV4cG9ydCBlbnVtIGVudW1EaW1lbnNpb24ge1xuICAgIERpbTIgPSAnMmQnLFxuICAgIERpbTMgPSAnM2QnXG59XG5cbi8qKlxuICog5ri45oiP55qE54q25oCBXG4gKi9cbmV4cG9ydCBlbnVtIGVudW1HYW1lU3RhdHVzIHtcbiAgICBTdGFydCA9ICdHQU1FLVNUQVRVUy1TVEFSVCcsXG4gICAgU3RvcCA9ICdHQU1FLVNUQVRVUy1TVE9QJyxcbiAgICBSZXN0YXJ0ID0gJ0dBTUUtU1RBVFVTLVJFU1RBUlQnLFxufVxuXG4vKipcbiBsYmwgIC0tLT5MYWJlbCjmlofmnKwpXG4gdHh0ICAtLS0+VGV4dCjmlofmnKwpXG4gcnR4dCAgLS0tPlJpY2hUZXh0KOWvjOaWh+acrClcbiBpcHQgIC0tLT5JbnB1dCjovpPlhaXmoYYpXG4gaW1nICAtLS0+SW1hZ2Uo5Zu+54mHKVxuIHNwdCAgLS0tPlNwcml0ZSjnsr7ngbUpXG4gZ3JoICAtLS0+R3JhcGgo5Zu+5b2iKVxuIGxpc3QgLS0tPkxpc3Qo5YiX6KGoKVxuIGxvYWQgLS0tPkxvYWQo6KOF6L295ZmoKVxuIGd1cCAgLS0tPkdyb3VwKOe7hClcbiBjb20gIC0tLT5Db21wb25lbnQo57uE5Lu2KVxuIGJ0biAgLS0tPkJ1dHRvbijmjInpkq4pXG4gY29iICAtLS0+Q29tYm9Cb3co5LiL5ouJ5qGGKVxuIHBiYXIgLS0tPlByb2dyZXNzQmFyKOi/m+W6puadoSlcbiBzbGQgIC0tLT5TbGlkZXIo5ruR5Yqo5p2hKVxuIHdpbiAgLS0tPldpbmRvd++8iOeql+WPo++8iVxuIGFuaSAgLS0tPk1vdmllKOWKqOeUuylcbiBlZnQgIC0tLT5UcmFuc2l0aW9uKOWKqOaViClcbiBjdGwgIC0tLT5Db250cm9sbGVyKOaOp+WItuWZqClcbiAqL1xuXG4vKipcbiAqIOaOp+S7tuWJjee8gFxuICovXG5leHBvcnQgZW51bSBlbnVtRWxlbWVudFByZWZpeCB7XG4gICAgTGFibGUgPSAnbGJsXycsXG4gICAgSW5wdXQgPSAnaXB0XycsXG4gICAgVGV4dCA9ICd0eHRfJyxcbiAgICBSaWNoVGV4dCA9ICdydHh0XycsXG4gICAgSW1hZ2UgPSAnaW1nXycsXG4gICAgU3ByaXRlID0gJ3NwdF8nLFxuICAgIEdyYXBoID0gJ2dyaF8nLFxuICAgIExpc3QgPSAnbGlzdF8nLFxuICAgIExvYWQgPSAnbG9hZF8nLFxuICAgIEdyb3VwID0gJ2d1cF8nLFxuICAgIENvbXBvbmVudCA9ICdjb21fJyxcbiAgICBCdXR0b24gPSAnYnRuXycsXG4gICAgQ29tYm9Cb3cgPSAnY29iXycsXG4gICAgUHJvZ3Jlc3NCYXIgPSAncGJhcl8nLFxuICAgIFNsaWRlciA9ICdzbGRfJyxcbiAgICBXaW5kb3cgPSAnd2luXycsXG4gICAgTW92aWUgPSAnYW5pXycsXG4gICAgVHJhbnNpdGlvbiA9ICdlZnRfJyxcbiAgICBDb250cm9sbGVyID0gJ2N0bF8nXG59XG5cbi8qKlxuICog5pWw5o2u6KGo6YWN572uXG4gKi9cbmV4cG9ydCBlbnVtIGVudW1Kc29uRGVmaW5lIHtcbiAgICBsb3R0ZXJ5ID0gXCJsb3R0ZXJ5XCIsXG4gICAgaW52aXRlID0gXCJpbnZpdGVcIixcbiAgICBsZXZlbCA9IFwibGV2ZWxcIixcbn1cblxuLyoqXG4gKiDpn7PmlYjmoIforrBcbiAqL1xuZXhwb3J0IGVudW0gZW51bVNvdW5kTmFtZXtcbiAgICBiZyA9IFwiYmdTb3VuZFwiLFxuICAgIGJvdHRvbiA9IFwiYnRuU291bmRcIixcbn1cblxuXG4iLCJpbXBvcnQgeyBlbnVtQXJyYXlTb3J0T3JkZXIgfSBmcm9tICcuLi9zZXR0aW5nL2VudW0nO1xuXG4gLyoqXG4gKiBAYXV0aG9yIFN1blxuICogQHRpbWUgMjAxOS0wOC0wOSAyMzoxNVxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gKiBAZGVzY3JpcHRpb24g5pWw57uE5bel5YW357G7XG4gKi9cbmV4cG9ydCBjbGFzcyBVdGlsQXJyYXkge1xuXG4gICAgLyoqIOaPkuWFpeWFg+e0oFxuICAgICAqIEBwYXJhbSBhcnIg6ZyA6KaB5pON5L2c55qE5pWw57uEXG4gICAgICogQHBhcmFtIHZhbHVlIOmcgOimgeaPkuWFpeeahOWFg+e0oFxuICAgICAqIEBwYXJhbSBpbmRleCDmj5LlhaXkvY3nva5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGluc2VydChhcnI6IGFueVtdLCB2YWx1ZTogYW55LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChpbmRleCA+IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBhcnIucHVzaCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnIuc3BsaWNlKGluZGV4LCAwLCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKuS7juaVsOe7hOenu+mZpOWFg+e0oCovXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmUoYXJyOiBhbnlbXSwgdjogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBpOiBudW1iZXIgPSBhcnIuaW5kZXhPZih2KTtcbiAgICAgICAgaWYgKGkgIT0gLTEpIHtcbiAgICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirnp7vpmaTmiYDmnInlgLznrYnkuo5255qE5YWD57SgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUFsbChhcnI6IGFueVtdLCB2OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IGFyci5pbmRleE9mKHYpO1xuICAgICAgICB3aGlsZSAoaSA+PSAwKSB7XG4gICAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgaSA9IGFyci5pbmRleE9mKHYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5YyF5ZCr5YWD57SgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvbnRhaW4oYXJyOiBhbnlbXSwgdjogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBhcnIubGVuZ3RoID4gMCA/IGFyci5pbmRleE9mKHYpICE9IC0xIDogZmFsc2U7XG4gICAgfVxuXG4gICAgLyoq5aSN5Yi2Ki9cbiAgICBwdWJsaWMgc3RhdGljIGNvcHkoYXJyOiBhbnlbXSk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIGFyci5zbGljZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaOkuW6j1xuICAgICAqIEBwYXJhbSBhcnIg6ZyA6KaB5o6S5bqP55qE5pWw57uEXG4gICAgICogQHBhcmFtIGtleSDmjpLluo/lrZfmrrVcbiAgICAgKiBAcGFyYW0gb3JkZXIg5o6S5bqP5pa55byPXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzb3J0KGFycjogYW55W10sIGtleTogc3RyaW5nLCBvcmRlcjogZW51bUFycmF5U29ydE9yZGVyID0gZW51bUFycmF5U29ydE9yZGVyLkRlc2NlbmRpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKGFyciA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIGFyci5zb3J0KGZ1bmN0aW9uIChpbmZvMSwgaW5mbzIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAob3JkZXIpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGVudW1BcnJheVNvcnRPcmRlci5Bc2NlbmRpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8xW2tleV0gPCBpbmZvMltrZXldKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mbzFba2V5XSA+IGluZm8yW2tleV0pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgZW51bUFycmF5U29ydE9yZGVyLkRlc2NlbmRpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8xW2tleV0gPiBpbmZvMltrZXldKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mbzFba2V5XSA8IGluZm8yW2tleV0pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKirmuIXnqbrmlbDnu4QqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXIoYXJyOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICBsZXQgaTogbnVtYmVyID0gMDtcbiAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gYXJyLmxlbmd0aDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgYXJyW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBhcnIuc3BsaWNlKDApO1xuICAgIH1cblxuICAgIC8qKuaVsOaNruaYr+WQpuS4uuepuiovXG4gICAgcHVibGljIHN0YXRpYyBpc0VtcHR5KGFycjogYW55W10pOiBCb29sZWFuIHtcbiAgICAgICAgaWYgKGFyciA9PSBudWxsIHx8IGFyci5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxufVxuIiwiaW1wb3J0IE5vZGUgPSBMYXlhLk5vZGU7XG5pbXBvcnQgU3ByaXRlID0gTGF5YS5TcHJpdGU7XG5pbXBvcnQgUmVjdGFuZ2xlID0gTGF5YS5SZWN0YW5nbGU7XG5pbXBvcnQgTGFiZWwgPSBMYXlhLkxhYmVsO1xuXG5leHBvcnQgY2xhc3MgVXRpbERpc3BsYXkge1xuXG4gICAgLyoqXG4gICAgICog56e76Zmk5YWo6YOo5a2Q5a+56LGhXG4gICAgICogQHBhcmFtIGNvbnRhaW5lciBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUFsbENoaWxkKGNvbnRhaW5lcjogTGF5YS5TcHJpdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5udW1DaGlsZHJlbiA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgd2hpbGUgKGNvbnRhaW5lci5udW1DaGlsZHJlbiA+IDApIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZEF0KDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9kZSDplIDmr4FVSeiKgueCuVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGVzdHJveVVJTm9kZShub2RlOiBOb2RlKTogdm9pZCB7XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZVNlbGYoKTtcbiAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgbm9kZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgJrov4flkI3lrZfojrflvpflrZDoioLngrlcbiAgICAgKiBAcGFyYW0gcGFyZW50IFxuICAgICAqIEBwYXJhbSBuYW1lIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hpbGRCeU5hbWUocGFyZW50OiBOb2RlLCBuYW1lOiBzdHJpbmcpOiBOb2RlIHtcbiAgICAgICAgaWYgKCFwYXJlbnQpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAocGFyZW50Lm5hbWUgPT09IG5hbWUpIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIGxldCBjaGlsZDogTm9kZSA9IG51bGw7XG4gICAgICAgIGxldCBudW06IG51bWJlciA9IHBhcmVudC5udW1DaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07ICsraSkge1xuICAgICAgICAgICAgY2hpbGQgPSBVdGlsRGlzcGxheS5nZXRDaGlsZEJ5TmFtZShwYXJlbnQuZ2V0Q2hpbGRBdChpKSwgbmFtZSk7XG4gICAgICAgICAgICBpZiAoY2hpbGQpIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiDorr7nva7lr7npvZDmlrnlvI9cbiAgICAvLyAgKiBAcGFyYW0gYWxpZ2Ug5a+56b2Q5pa55byPXG4gICAgLy8gICovXG4gICAgLy8gcHVibGljIHN0YXRpYyBzZXRBbGlnZShub2RlOiBTcHJpdGUsIGFsaWdlOiBlbnVtQWxpZ2VUeXBlLCB3OiBudW1iZXIgPSAwLCBoOiBudW1iZXIgPSAwKSB7XG4gICAgLy8gICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgIC8vICAgICBsZXQgcmVjdDogUmVjdGFuZ2xlO1xuICAgIC8vICAgICBpZiAodyA8PSAwIHx8IGggPD0gMCkgcmVjdCA9IG5vZGUuZ2V0Qm91bmRzKCk7XG4gICAgLy8gICAgIGxldCB3aWR0aDogbnVtYmVyID0gdyA+IDAgPyB3IDogcmVjdC53aWR0aDtcbiAgICAvLyAgICAgbGV0IGhlaWd0aDogbnVtYmVyID0gaCA+IDAgPyBoIDogcmVjdC5oZWlnaHQ7XG4gICAgLy8gICAgIHN3aXRjaCAoYWxpZ2UpIHtcbiAgICAvLyAgICAgICAgIGNhc2UgZW51bUFsaWdlVHlwZS5MRUZUX1RPUDpcbiAgICAvLyAgICAgICAgICAgICBub2RlLnBpdm90KDAsIDApO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBlbnVtQWxpZ2VUeXBlLkxFRlQ6XG4gICAgLy8gICAgICAgICAgICAgbm9kZS5waXZvdCgwLCBoZWlndGggKiAwLjUpO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBlbnVtQWxpZ2VUeXBlLkxFRlRfQk9UVE9NOlxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3QoMCwgaGVpZ3RoKTtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgZW51bUFsaWdlVHlwZS5UT1A6XG4gICAgLy8gICAgICAgICAgICAgbm9kZS5waXZvdCh3aWR0aCAqIDAuNSwgMCk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuTUlEOlxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGggKiAwLjUsIGhlaWd0aCAqIDAuNSk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuQk9UVE9NOlxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGggKiAwLjUsIGhlaWd0aCk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuUklHSFRfVE9QOlxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGgsIDApO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBlbnVtQWxpZ2VUeXBlLlJJR0hUOlxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGgsIGhlaWd0aCAqIDAuNSk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuUklHSFRfQk9UVE9NOlxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGgsIGhlaWd0aCk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiDliJvlu7rpgI/mmI7pga7nvalcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZU1hc2tMYXllcigpOiBTcHJpdGUge1xuICAgICAgICBsZXQgbGF5ZXIgPSBuZXcgU3ByaXRlKCk7XG4gICAgICAgIGxheWVyLm1vdXNlRW5hYmxlZCA9IHRydWU7XG5cbiAgICAgICAgbGV0IHdpZHRoID0gbGF5ZXIud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoICsgMjAwO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQgKyA0MDA7XG4gICAgICAgIGxheWVyLmdyYXBoaWNzLmNsZWFyKHRydWUpO1xuICAgICAgICBsYXllci5ncmFwaGljcy5kcmF3UmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0LCBVSUNvbmZpZy5wb3B1cEJnQ29sb3IpO1xuICAgICAgICBsYXllci5hbHBoYSA9IFVJQ29uZmlnLnBvcHVwQmdBbHBoYTtcblxuICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgfVxufSIsImltcG9ydCB7IExvZyB9IGZyb20gJy4uL2NvcmUvbG9nJztcblxuIC8qKlxuICogQGF1dGhvciBTdW5cbiAqIEB0aW1lIDIwMTktMDItMjUgMTc6MjJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxuICogQGRlc2NyaXB0aW9uICAzROaooeWei+WKoOi9veW3peWFt+exu1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFV0aWxMb2FkM0Qge1xuXG4gICAgLyoqXG4gICAgICog5Yqg6L29VTNE5Zy65pmvXG4gICAgICogQHBhcmFtIGFyZWEg5L2c55So5Z+fXG4gICAgICogQHBhcmFtIHBhdGgg5Zy65pmv5paH5Lu26Lev5b6EXG4gICAgICogQHBhcmFtIGNiICAg5Yqg6L295a6M5oiQ5Zue6LCDXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBsb2FkU2NlbmUoYXJlYSxwYXRoLGNiKTphbnlcbiAgICB7XG4gICAgICAgIExheWEubG9hZGVyLmNyZWF0ZShwYXRoLExheWEuSGFuZGxlci5jcmVhdGUodGhpcywoKT0+e1xuICAgICAgICAgICAgbGV0IHNjZW5lM0QgPSBMYXlhLnN0YWdlLmFkZENoaWxkKExheWEubG9hZGVyLmdldFJlcyhwYXRoKSkgYXMgTGF5YS5TY2VuZTNEO1xuICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgY2IuY2FsbChhcmVhLHNjZW5lM0QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5Zy65pmv5YaF54mp5L2TXG4gICAgICogQHBhcmFtIHNjZW5lM2Qg5Zy65pmvXG4gICAgICogQHBhcmFtIGNoaWxkTmFtZSDlrZDniankvZPlkI3lrZdcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFNjZW5lM0RDaGlsZDxUPihzY2VuZTNkLGNoaWxkTmFtZSk6VFxuICAgIHtcbiAgICAgICAgbGV0IG1zID0gc2NlbmUzZC5nZXRDaGlsZEJ5TmFtZShjaGlsZE5hbWUpIGFzIFQ7XG4gICAgICAgIGlmIChtcykge1xuICAgICAgICAgICAgcmV0dXJuIG1zO1xuICAgICAgICB9XG4gICAgICAgIExvZy5lcnJvcihcIkVycm9yOuiOt+WPluWcuuaZr+eJqeS9k+Wksei0pVwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5qih5Z6L55qE5a2Q54mp5L2T5qih5Z6LXG4gICAgICogQHBhcmFtIGZhdFNQIOeItuaWuVxuICAgICAqIEBwYXJhbSBjaGlsZE5hbWUg5a2Q5pa55ZCN5a2XXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRNb2RlbENoaWxkQnlOYW1lPFQ+KGZhdFNQLGNoaWxkTmFtZSk6VFxuICAgIHtcbiAgICAgICAgbGV0IGNoaWxkID0gZmF0U1AuZ2V0Q2hpbGRCeU5hbWUoY2hpbGROYW1lKSBhcyBUO1xuICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrojrflj5bmqKHlnovlrZDniankvZPkv6Hmga/plJnor69cIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabv+aNouaooeWei1xuICAgICAqIEBwYXJhbSB0YXJnZXRTUCDooqvmm7/mjaLmqKHlnotcbiAgICAgKiBAcGFyYW0gbWlhblNQICAg5pu/5o2i5qih5Z6LXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZXBsYWNlTW9kZWwodGFyZ2V0U1AsbWFpblNQKVxuICAgIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTUCB8fCAhbWFpblNQKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrmm7/mjaLmiJbooqvmm7/mjaLmqKHlnovkv6Hmga/plJnor69cIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0U1AucGFyZW50KSB7XG4gICAgICAgICAgICB0YXJnZXRTUC5wYXJlbnQuYWRkQ2hpbGQobWFpblNQKTtcbiAgICAgICAgfVxuICAgICAgICBtYWluU1AudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMyh0YXJnZXRTUC50cmFuc2Zvcm0ucG9zaXRpb24ueCx0YXJnZXRTUC50cmFuc2Zvcm0ucG9zaXRpb24ueSx0YXJnZXRTUC50cmFuc2Zvcm0ucG9zaXRpb24ueik7XG4gICAgICAgIG1haW5TUC50cmFuc2Zvcm0uc2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKHRhcmdldFNQLnRyYW5zZm9ybS5zY2FsZS54LHRhcmdldFNQLnRyYW5zZm9ybS5zY2FsZS55LHRhcmdldFNQLnRyYW5zZm9ybS5zY2FsZS55KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7/mjaJNZXNo5qih5Z6L5p2Q6LSoXG4gICAgICogQHBhcmFtIHRhcmdldFNQIOebruagh+aooeWei1xuICAgICAqIEBwYXJhbSB0YXJnZXRNYXQg55uu5qCH5p2Q6LSoXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZXBsYWNlTW9kZWxNZXNoTWF0KHRhcmdldFNQLHRhcmdldE1hdClcbiAgICB7XG4gICAgICAgIGlmICghdGFyZ2V0U1AgfHwgIXRhcmdldE1hdCkge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiRXJyb3I65qih5Z6L5oiW5p2Q6LSo5L+h5oGv6ZSZ6K+vXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0U1AgYXMgTGF5YS5NZXNoU3ByaXRlM0Q7XG4gICAgICAgIHRhcmdldFNQLm1lc2hSZW5kZXJlci5tYXRlcmlhbCA9IHRhcmdldE1hdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7/mjaJTa2luTWVzaOaooeWei+adkOi0qFxuICAgICAqIEBwYXJhbSB0YXJnZXRTUCDnm67moIfmqKHlnotcbiAgICAgKiBAcGFyYW0gdGFyZ2V0TWF0IOebruagh+adkOi0qFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVwbGFjZU1vZGVsU2tpbk1lc2hNYXQodGFyZ2V0U1AsdGFyZ2V0TWF0KVxuICAgIHtcbiAgICAgICAgaWYgKCF0YXJnZXRTUCB8fCAhdGFyZ2V0TWF0KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrmqKHlnovmiJbmnZDotKjkv6Hmga/plJnor69cIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXRTUCBhcyBMYXlhLlNraW5uZWRNZXNoU3ByaXRlM0Q7XG4gICAgICAgIHRhcmdldFNQLnNraW5uZWRNZXNoUmVuZGVyZXIubWF0ZXJpYWwgPSB0YXJnZXRNYXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5a655Zmo5LiK55qE5p2Q6LSo5bm25a2Y5YWl5ZOI5biM6KGoXG4gICAgICogQHBhcmFtIHRhcmdldE9iaiDmib/ovb3mnZDotKjnmoTlrrnlmahcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldE1hdGVyaWFscyhzY2VuZTNkKTphbnlcbiAgICB7XG4gICAgICAgIC8qKlVuaXR55Zy65pmv5a2Y6LSu5LiA5Liq56m654mp5L2T77yM6ZmE5bimTWVzaFJlbmRlcueUqOadpeWtmOWCqOadkOi0qCoqL1xuICAgICAgICB2YXIgY29udGFpbmVyID0gVXRpbExvYWQzRC5nZXRTY2VuZTNEQ2hpbGQ8TGF5YS5NZXNoU3ByaXRlM0Q+KHNjZW5lM2QsXCJNYXRDb250YWluZXJcIik7XG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrmnZDotKjlrrnlmajplJnor6/miJbkuI3lrZjlnKhcIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXNlckluZm86IHtbaW5kZXg6c3RyaW5nXTogTGF5YS5CbGlublBob25nTWF0ZXJpYWx9ID0ge31cbiAgICAgICAgdmFyIG1hdEFycmFyeSA9IGNvbnRhaW5lci5tZXNoUmVuZGVyZXIubWF0ZXJpYWxzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDtpPG1hdEFycmFyeS5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IG1hdEFycmFyeVtpXS5uYW1lLnNsaWNlKDAsbWF0QXJyYXJ5W2ldLm5hbWUubGVuZ3RoLTEwKTtcbiAgICAgICAgICAgIHVzZXJJbmZvW25hbWVdID0gbWF0QXJyYXJ5W2ldIGFzIExheWEuQmxpbm5QaG9uZ01hdGVyaWFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2VySW5mbztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDov5Tlm57mjIflrprlkI3lrZfnmoTmnZDotKhcbiAgICAgKiBAcGFyYW0gbWF0QXJyYXR5IOWtmOaUvuadkOi0qOeahOWTiOW4jOihqFxuICAgICAqIEBwYXJhbSBtYXROYW1lICAg5p2Q6LSo5ZCN5a2XXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXRlcmlhbEJ5TmFtZShtYXRBcnJhcnksbWF0TmFtZSk6TGF5YS5CbGlublBob25nTWF0ZXJpYWxcbiAgICB7XG4gICAgICAgIGlmICghbWF0QXJyYXJ5KSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrmnZDotKjlk4jluIzooajkv6Hmga/plJnor69cIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1hdEFycmFyeVttYXROYW1lXSlcbiAgICAgICAge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiRXJyb3I65oyH5a6a5ZOI5biM6KGo5YaF5LiN5a2Y5ZyoW1wiK21hdE5hbWUrXCJd5p2Q6LSoXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdEFycmFyeVttYXROYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmkq3mlL7mqKHlnovliqjnlLtcbiAgICAgKiBAcGFyYW0gdGFyZ2V0U3Ag5pKt5pS+54mp5L2TXG4gICAgICogQHBhcmFtIGFuaU5hbWUgIOWKqOeUu+WQjeWtl1xuICAgICAqIEBwYXJhbSBpc0Nyb3NzICDmmK/lkKbov4fluqZcbiAgICAgKiDpgJrov4d0aGlzLmFuaW1hdG9yLmdldEN1cnJlbnRBbmltYXRvclBsYXlTdGF0ZSgwKS5ub3JtYWxpemVkVGltZT49MeWOu+WIpOaWreW9k+WJjeWKqOeUu+aYr+WQpuaSreaUvuWujOaIkFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcGxheUFuaW1hdG9yQnlOYW1lKHRhcmdldFNwLGFuaU5hbWUsaXNDcm9zcz8pOkxheWEuQW5pbWF0b3JcbiAgICB7XG4gICAgICAgIHZhciBhbmltYXRvcjpMYXlhLkFuaW1hdG9yID0gdGFyZ2V0U3AuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xuICAgICAgICBpZiAoIWFuaW1hdG9yKVxuICAgICAgICB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrliqjnlLvmnLrkv6Hmga/plJnor69cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQ3Jvc3MgIT0gbnVsbCAmJiBpc0Nyb3NzID09IGZhbHNlKSB7XG4gICAgICAgICAgICBhbmltYXRvci5wbGF5KGFuaU5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFuaW1hdG9yLmNyb3NzRmFkZShhbmlOYW1lLDAuMik7XG4gICAgICAgIHJldHVybiBhbmltYXRvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmjqfliLbliqjnlLvpgJ/luqZcbiAgICAgKiBAcGFyYW0gdGFyZ2V0U3Ag55uu5qCH54mp5L2TXG4gICAgICogQHBhcmFtIHNwZWVkIOaSreaUvumAn+W6plxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29udHJvbEFuaW1hdG9yU3BlZWQodGFyZ2V0U3Asc3BlZWQpXG4gICAge1xuICAgICAgICB2YXIgYW5pbWF0b3I6TGF5YS5BbmltYXRvciA9IHRhcmdldFNwLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcbiAgICAgICAgaWYgKCFhbmltYXRvcilcbiAgICAgICAge1xuICAgICAgICAgICAgTG9nLmVycm9yKFwiRXJyb3I65Yqo55S75py65L+h5oGv6ZSZ6K+vXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGVlZCkge1xuICAgICAgICAgICAgYW5pbWF0b3Iuc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgYW5pbWF0b3Iuc3BlZWQgPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yik5pat5Yqo55S75piv5ZCm5a6M5oiQXG4gICAgICogQHBhcmFtIGFuaW1hdG9yXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb25maXJtQW5pQ29tcGxldGUoYW5pbWF0b3I6TGF5YS5BbmltYXRvcik6Ym9vbGVhblxuICAgIHtcbiAgICAgICAgdmFyIGJvb2wgPSBmYWxzZTtcbiAgICAgICAgbGV0IGluZGV4ID0gYW5pbWF0b3IuZ2V0Q3VycmVudEFuaW1hdG9yUGxheVN0YXRlKDApLm5vcm1hbGl6ZWRUaW1lO1xuICAgICAgICBpZiAoaW5kZXggPj0gMSkge1xuICAgICAgICAgICAgYm9vbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJvb2w7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgVXRpbFN0cmluZyB9IGZyb20gJy4vc3RyaW5nJztcblxuLyoqXG4gKiBAYXV0aG9yIFN1blxuICogQHRpbWUgMjAxOS0wOC0xMSAxODo1NFxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXG4gKiBAZGVzY3JpcHRpb24g5pWw5YC85bel5YW357G7XG4gKlxuICovXG5leHBvcnQgY2xhc3MgVXRpbE51bWJlciB7XG4gICAgLyoqXG4gICAgICog5L+d55WZ5bCP5pWw54K55ZCO5Yeg5L2NXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0b0ZpeGVkKHZhbHVlOiBudW1iZXIsIHA6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBVdGlsU3RyaW5nLnRvTnVtYmVyKHZhbHVlLnRvRml4ZWQocCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdG9JbnQodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzSW50KHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh2YWx1ZSkgPT0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L+d55WZ5pyJ5pWI5pWw5YC8XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZXNlcnZlTnVtYmVyKG51bTogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBsZXQgc3RyID0gU3RyaW5nKG51bSk7XG4gICAgICAgIGxldCBsID0gc3RyLmxlbmd0aDtcbiAgICAgICAgbGV0IHBfaW5kZXg6IG51bWJlciA9IHN0ci5pbmRleE9mKFwiLlwiKTtcbiAgICAgICAgaWYgKHBfaW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXQ6IHN0cmluZyA9IHN0ci5zbGljZSgwLCBwX2luZGV4ICsgMSk7XG5cbiAgICAgICAgbGV0IGxhc3ROdW0gPSBsIC0gcF9pbmRleDtcbiAgICAgICAgaWYgKGxhc3ROdW0gPiBzaXplKSB7XG4gICAgICAgICAgICBsYXN0TnVtID0gc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGFzdFN0cjogc3RyaW5nID0gc3RyLnNsaWNlKHBfaW5kZXggKyAxLCBwX2luZGV4ICsgMSArIGxhc3ROdW0pO1xuICAgICAgICByZXR1cm4gVXRpbFN0cmluZy50b051bWJlcihyZXQgKyBsYXN0U3RyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkv53nlZnmnInmlYjmlbDlgLzvvIzkuI3lpJ/ooaUw77yb5rOo5oSP6L+U5Zue55qE5piv5a2X56ym5LiyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZXNlcnZlTnVtYmVyV2l0aFplcm8obnVtOiBudW1iZXIsIHNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGxldCBzdHIgPSBTdHJpbmcobnVtKTtcbiAgICAgICAgbGV0IGwgPSBzdHIubGVuZ3RoO1xuICAgICAgICBsZXQgcF9pbmRleDogbnVtYmVyID0gc3RyLmluZGV4T2YoXCIuXCIpO1xuICAgICAgICBpZiAocF9pbmRleCA8IDApIHsvL+aYr+aVtOaVsFxuICAgICAgICAgICAgc3RyICs9ICcuJztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgKytpKSBzdHIgKz0gJzAnO1xuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmV0OiBzdHJpbmcgPSBzdHIuc2xpY2UoMCwgcF9pbmRleCArIDEpO1xuXG4gICAgICAgIGxldCBsYXN0TnVtID0gbCAtIHBfaW5kZXggLSAxO1xuICAgICAgICBpZiAobGFzdE51bSA+IHNpemUpIHsvL+i2hei/h1xuICAgICAgICAgICAgbGFzdE51bSA9IHNpemU7XG4gICAgICAgICAgICBsZXQgbGFzdFN0cjogc3RyaW5nID0gc3RyLnNsaWNlKHBfaW5kZXggKyAxLCBwX2luZGV4ICsgMSArIGxhc3ROdW0pO1xuICAgICAgICAgICAgcmV0dXJuIHJldCArIGxhc3RTdHI7XG4gICAgICAgIH0gZWxzZSBpZiAobGFzdE51bSA8IHNpemUpIHsvL+S4jei2s+ihpTBcbiAgICAgICAgICAgIGxldCBkaWZmOiBudW1iZXIgPSBzaXplIC0gbGFzdE51bTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlmZjsgKytpKSBzdHIgKz0gJzAnO1xuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZvcm1hdFRob3VzYW5kc051bWJlcihudW06IG51bWJlcikge1xuICAgICAgICBpZiAobnVtIDwgMTAwMDAwMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bS50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKG51bSA8IDEwMDAwMDAwMDApIHtcbiAgICAgICAgICAgIGxldCB0ID0gTWF0aC5mbG9vcihudW0gLyAxMDAwKVxuICAgICAgICAgICAgcmV0dXJuIHQudG9Mb2NhbGVTdHJpbmcoKSArIFwiS1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHQgPSBNYXRoLmZsb29yKG51bSAvIDEwMDAwMDApXG4gICAgICAgICAgICByZXR1cm4gdC50b0xvY2FsZVN0cmluZygpICsgXCJNXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZm9ybWF0TnVtYmVyU2hvcnQobnVtLCBmaXhlZDogbnVtYmVyID0gMCkge1xuXG4gICAgICAgIGlmIChudW0gPCAxMDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgICB9IGVsc2UgaWYgKG51bSA8IDEwMDAwMDApIHtcbiAgICAgICAgICAgIGxldCB0ID0gTWF0aC5mbG9vcihudW0gLyAxMDAwKS50b0ZpeGVkKGZpeGVkKTtcbiAgICAgICAgICAgIHJldHVybiB0ICsgXCJLXCI7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtIDwgMTAwMDAwMDAwMCkge1xuICAgICAgICAgICAgbGV0IHQgPSBNYXRoLmZsb29yKG51bSAvIDEwMDAwMDApLnRvRml4ZWQoZml4ZWQpO1xuICAgICAgICAgICAgcmV0dXJuIHQgKyBcIk1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0ID0gTWF0aC5mbG9vcihudW0gLyAxMDAwMDAwMDAwKS50b0ZpeGVkKGZpeGVkKTtcbiAgICAgICAgICAgIHJldHVybiB0LnRvTG9jYWxlU3RyaW5nKCkgKyBcIkdcIjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDnp5HlraborqHmlbDms5XmmL7npLpcbiAgICAgKiBAcGFyYW0gbnVtMVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYmlnTnVtYmVyRm9ybWF0KG51bTogc3RyaW5nLGZpeGVkOm51bWJlciA9IDIpIHtcbiAgICAgICAgbGV0IGV4dHMgPSBbXG4gICAgICAgICAgICAnJywgJ0snLCBcIk1cIiwgXCJHXCIsIFwiVFwiLCBcIlBcIiwgXCJFXCIsIFwiWlwiLCBcIllcIiwgXCJBQVwiLFxuICAgICAgICAgICAgXCJCQlwiLCBcIkNDXCIsICdERCcsICdFRScsIFwiRkZcIiwgXCJHR1wiLCBcIkhIXCIsIFwiSUlcIixcbiAgICAgICAgICAgIFwiSkpcIiwgXCJLS1wiLCAnTEwnLCAnTU0nLCBcIk5OXCIsIFwiT09cIiwgXCJQUFwiLCBcIlFRXCIsXG4gICAgICAgICAgICBcIlJSXCIsIFwiU1NcIiwgJ1RUJywgJ1VVJywgXCJWVlwiLCBcIldXXCIsIFwiWFhcIiwgXCJZWVwiLFxuICAgICAgICAgICAgXCJaWlwiLCBcImFhXCIsICdiYicsICdjYycsIFwiZGRcIiwgXCJlZVwiLCBcImZmXCIsIFwiZ2dcIixcbiAgICAgICAgICAgIFwiaGhcIiwgXCJpaVwiLCAnZ2cnLCAna2snLCBcImxsXCIsIFwibW1cIiwgXCJublwiLCBcIm9vXCIsXG4gICAgICAgICAgICBcInBwXCIsIFwicXFcIiwgJ3JyJywgJ3NzJywgXCJ0dFwiLCBcInV1XCIsIFwidnZcIiwgXCJ3d1wiXG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IHQxLCB0MjtcbiAgICAgICAgbGV0IG4xID0gbnVtLmluZGV4T2YoXCJlK1wiKTtcbiAgICAgICAgaWYgKG4xID09IC0xKSBuMSA9IG51bS5pbmRleE9mKFwiRVwiKTtcbiAgICAgICAgaWYgKG4xICYmIG4xICE9IC0xKSB7XG4gICAgICAgICAgICB0MSA9IHBhcnNlRmxvYXQobnVtLnN1YnN0cigwLCBuMSkpO1xuICAgICAgICAgICAgdDIgPSBwYXJzZUludChudW0uc3Vic3RyKG4xICsgMikpO1xuXG4gICAgICAgICAgICBsZXQgZXh0ID0gTWF0aC5mbG9vcih0MiAvIDMpO1xuICAgICAgICAgICAgbGV0IG0gPSB0MiAlIDM7XG5cbiAgICAgICAgICAgIHJldHVybiAodDEgKiBNYXRoLnBvdygxMCxtKSkudG9GaXhlZChmaXhlZCkgKyBleHRzW2V4dF07XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBudW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pWw5a2X55u45YqgXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBiaWdOdW1iZXJBZGQobnVtMTogc3RyaW5nLCBudW0yOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGIgPSBOdW1iZXIobnVtMSkgKyBOdW1iZXIobnVtMik7XG4gICAgICAgIHJldHVybiBiLnRvRXhwb25lbnRpYWwoNCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pWw5a2X55u45YePXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBiaWdOdW1iZXJTdWIobnVtMTogc3RyaW5nLCBudW0yOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IG4xID0gTnVtYmVyKG51bTEpO1xuICAgICAgICBsZXQgbjIgPSBOdW1iZXIobnVtMik7XG4gICAgICAgIGlmIChuMSA8IG4yKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAobjEgLSBuMikudG9FeHBvbmVudGlhbCg0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmlbDlrZfnm7jkuZjms5VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGJpZ051bWJlck11bChudW0xOiBzdHJpbmcsIG51bTI6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gKE51bWJlcihudW0xKSAqIG51bTIpLnRvRXhwb25lbnRpYWwoNCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pWw5a2X55u46ZmkXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBiaWdOdW1iZXJEaXYobnVtMTogc3RyaW5nLCBudW0yOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIChOdW1iZXIobnVtMSkgLyBudW0yKS50b0V4cG9uZW50aWFsKDQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4pOS4quenkeWtpuiuoeaVsOebuOmZpFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYmlnTnVtYmVyRGl2RG91bmJsZShudW0xOiBzdHJpbmcsIG51bTI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gKE51bWJlcihudW0xKSAvIE51bWJlcihudW0yKSk7XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTExIDE4OjU1XG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiDlrZfnrKbkuLLlt6XlhbfnsbtcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBVdGlsU3RyaW5nIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVtcHR5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWtl+espuS4suaYr+WQpuacieWAvFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaXNFbXB0eShzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChzICE9IG51bGwgJiYgcy5sZW5ndGggPiAwKSA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRvSW50KHN0cjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKCFzdHIgfHwgc3RyLmxlbmd0aCA9PSAwKSByZXR1cm4gMDtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHN0cik7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB0b051bWJlcihzdHI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGlmICghc3RyIHx8IHN0ci5sZW5ndGggPT0gMCkgcmV0dXJuIDA7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0cik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5a2X56ym5Liy55yf5a6e6ZW/5bqmLOazqO+8mlxuICAgICAqIDEu5pmu6YCa5pWw57uE77yM5a2X56ym5Y2gMeWtl+iKgu+8m+axieWtkOWNoOS4pOS4quWtl+iKglxuICAgICAqIDIu5aaC5p6c5Y+Y5oiQ57yW56CB77yM5Y+v6IO96K6h566X5o6l5Y+j5LiN5a+5XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXROdW1CeXRlcyhzdHI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCByZWFsTGVuZ3RoID0gMCwgbGVuID0gc3RyLmxlbmd0aCwgY2hhckNvZGUgPSAtMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIGlmIChjaGFyQ29kZSA+PSAwICYmIGNoYXJDb2RlIDw9IDEyOCkgcmVhbExlbmd0aCArPSAxO1xuICAgICAgICAgICAgZWxzZSByZWFsTGVuZ3RoICs9IDI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlYWxMZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6KGl6Zu2XG4gICAgICogQHBhcmFtIHN0clxuICAgICAqIEBwYXJhbSBsZW5cbiAgICAgKiBAcGFyYW0gZGlyIDAt5ZCO77ybMS3liY1cbiAgICAgKiBAcmV0dXJuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRaZXJvKHN0cjogc3RyaW5nLCBsZW46IG51bWJlciwgZGlyOiBudW1iZXIgPSAwKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IF9zdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgICAgIGxldCBfbGVuOiBudW1iZXIgPSBzdHIubGVuZ3RoO1xuICAgICAgICBsZXQgc3RyX3ByZV96ZXJvOiBzdHJpbmcgPSBcIlwiO1xuICAgICAgICBsZXQgc3RyX2VuZF96ZXJvOiBzdHJpbmcgPSBcIlwiO1xuICAgICAgICBpZiAoZGlyID09IDApXG4gICAgICAgICAgICBzdHJfZW5kX3plcm8gPSBcIjBcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3RyX3ByZV96ZXJvID0gXCIwXCI7XG5cbiAgICAgICAgaWYgKF9sZW4gPCBsZW4pIHtcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCBsZW4gLSBfbGVuKSB7XG4gICAgICAgICAgICAgICAgX3N0ciA9IHN0cl9wcmVfemVybyArIF9zdHIgKyBzdHJfZW5kX3plcm87XG4gICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX3N0ciArIHN0cjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y676Zmk5bem5Y+z56m65qC8XG4gICAgICogQHBhcmFtIGlucHV0XG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHJpbShpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9eXFxzK3xcXHMrJFwiXCJeXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDljrvpmaTlt6bkvqfnqbrmoLxcbiAgICAgKiBAcGFyYW0gaW5wdXRcbiAgICAgKiBAcmV0dXJuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0cmltTGVmdChpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9eXFxzK1wiXCJeXFxzKy8sIFwiXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWOu+mZpOWPs+S+p+epuuagvFxuICAgICAqIEBwYXJhbSBpbnB1dFxuICAgICAqIEByZXR1cm5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRyaW1SaWdodChpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9cXHMrJFwiXCJcXHMrJC8sIFwiXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIhumSn+S4juenkuagvOW8jyjlpoItPiA0MDoxNSlcbiAgICAgKiBAcGFyYW0gc2Vjb25kcyDnp5LmlbBcbiAgICAgKiBAcmV0dXJuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBtaW51dGVGb3JtYXQoc2Vjb25kczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IG1pbjogbnVtYmVyID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgICBsZXQgc2VjOiBudW1iZXIgPSBNYXRoLmZsb29yKHNlY29uZHMgJSA2MCk7XG5cbiAgICAgICAgbGV0IG1pbl9zdHI6IHN0cmluZyA9IG1pbiA8IDEwID8gKFwiMFwiICsgbWluLnRvU3RyaW5nKCkpIDogKG1pbi50b1N0cmluZygpKTtcbiAgICAgICAgbGV0IHNlY19zdHI6IHN0cmluZyA9IHNlYyA8IDEwID8gKFwiMFwiICsgc2VjLnRvU3RyaW5nKCkpIDogKHNlYy50b1N0cmluZygpKTtcblxuICAgICAgICByZXR1cm4gbWluX3N0ciArIFwiOlwiICsgc2VjX3N0cjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDml7bliIbnp5LmoLzlvI8o5aaCLT4gMDU6MzI6MjApXG4gICAgICogQHBhcmFtIHNlY29uZHMo56eSKVxuICAgICAqIEByZXR1cm5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGhvdXJGb3JtYXQoc2Vjb25kczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGhvdXI6IG51bWJlciA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgICAgICBsZXQgaG91cl9zdHI6IFN0cmluZyA9IGhvdXIgPCAxMCA/IChcIjBcIiArIGhvdXIudG9TdHJpbmcoKSkgOiAoaG91ci50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIGhvdXJfc3RyICsgXCI6XCIgKyBVdGlsU3RyaW5nLm1pbnV0ZUZvcm1hdChzZWNvbmRzICUgMzYwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5qC85byP5YyW5a2X56ym5LiyXG4gICAgICogQHBhcmFtIHN0ciDpnIDopoHmoLzlvI/ljJbnmoTlrZfnrKbkuLLvvIzjgJBcIuadsOWNq++8jOi/memHjOaciXswfeS4quiLueaenO+8jOWSjHsxfeS4qummmeiVie+8gVwiLCA1LDEw44CRXG4gICAgICogQHBhcmFtIGFyZ3Mg5Y+C5pWw5YiX6KGoXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmb3JtYXQoc3RyOiBzdHJpbmcsIC4uLmFyZ3MpOiBzdHJpbmcge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxce1wiICsgaSArIFwiXFxcXH1cIiwgXCJnbVwiKSwgYXJnc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDku6XmjIflrprlrZfnrKblvIDlp4tcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGJlZ2luc1dpdGgoaW5wdXQ6IHN0cmluZywgcHJlZml4OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeCA9PSBpbnB1dC5zdWJzdHJpbmcoMCwgcHJlZml4Lmxlbmd0aCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Lul5oyH5a6a5a2X56ym57uT5p2fXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBlbmRzV2l0aChpbnB1dDogc3RyaW5nLCBzdWZmaXg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gc3VmZml4ID09IGlucHV0LnN1YnN0cmluZyhpbnB1dC5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKTtcbiAgICB9XG5cbiAgICAvKipndWlkKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEdVSURTdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGQgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAod2luZG93LnBlcmZvcm1hbmNlICYmIHR5cGVvZiB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGQgKz0gcGVyZm9ybWFuY2Uubm93KCk7IC8vdXNlIGhpZ2gtcHJlY2lzaW9uIHRpbWVyIGlmIGF2YWlsYWJsZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIChjKSA9PiB7XG4gICAgICAgICAgICBsZXQgciA9IChkICsgTWF0aC5yYW5kb20oKSAqIDE2KSAlIDE2IHwgMDtcbiAgICAgICAgICAgIGQgPSBNYXRoLmZsb29yKGQgLyAxNik7XG4gICAgICAgICAgICByZXR1cm4gKGMgPT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KSkudG9TdHJpbmcoMTYpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpppblrZfmr43lpKflraZcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZpcnN0VXBwZXJDYXNlKHdvcmQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmoLzlvI/ljJbkuIvliJLnur/nmoTljZXor41cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZvcm1hdERhc2hXb3JkKHdvcmQ6IHN0cmluZywgY2FwRmlyc3Q6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBsZXQgZmlyc3QgPSB0cnVlO1xuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgd29yZC5zcGxpdCgnXycpLmZvckVhY2goKHNlYzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FwRmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gVXRpbFN0cmluZy5maXJzdFVwcGVyQ2FzZShzZWMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHNlYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgVXRpbFN0cmluZy5maXJzdFVwcGVyQ2FzZShzZWMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiKrlj5blrZfnrKbkuLJcbiAgICAgKiBAcGFyYW0gc3RyIOWtl+espuS4slxuICAgICAqIEBwYXJhbSBzdGFydCDlvIDlp4vkvY3nva5cbiAgICAgKiBAcGFyYW0gZW5kIOe7k+adn+S9jee9rlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc3Vic3RyaW5nKHN0cjpzdHJpbmcsc3RhcnQ6bnVtYmVyLGVuZDpudW1iZXIpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHJpbmcoc3RhcnQsZW5kKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiKrlj5blrZfnrKbkuLJcbiAgICAgKiBAcGFyYW0gc3RyIOWtl+espuS4slxuICAgICAqIEBwYXJhbSBzdGFydCDlvIDlp4vkvY3nva5cbiAgICAgKiBAcGFyYW0gbG9uZyDmiKrlj5bplb/luqZcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHN1YnN0cihzdHI6c3RyaW5nLHN0YXJ0Om51bWJlcixsb25nOm51bWJlcik6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCxsb25nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlrZfnrKbkuLLovazlr7nosaFcbiAgICAgKiBAcGFyYW0gc3RyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzdHJUb09iamVjdChzdHI6c3RyaW5nKVxuICAgIHtcbiAgICAgICAgY29uc3Qgc3RyVG9PYmogPSBKU09OLnBhcnNlKHN0cik7XG4gICAgICAgIHJldHVybiBzdHJUb09iajtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOWvueixoei9rOWtl+espuS4slxuICAgICAqIEBwYXJhbSBzdHJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG9ialRvU3RyKG9iajpPYmplY3QpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgY29uc3Qgb2JqVG9TdHIgPSBKU09OLnN0cmluZ2lmeShvYmopXG4gICAgICAgIHJldHVybiBvYmpUb1N0cjtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBhdXRob3IgU3VuXG4gKiBAdGltZSAyMDE5LTA4LTA5IDE5OjE4XG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcbiAqIEBkZXNjcmlwdGlvbiAg5pe26Ze05bel5YW3XG4gKlxuICovXG5leHBvcnQgY2xhc3MgVXRpbFRpbWUge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbV9TdGFydFRpbWU6IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgc3RhdGljIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLm1fU3RhcnRUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXI7XG4gICAgfVxuXG4gICAgLyoq5Lik5bin5LmL6Ze055qE5pe26Ze06Ze06ZqULOWNleS9jeenkiovXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZGVsdGFUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBMYXlhLnRpbWVyLmRlbHRhICogMC4wMDE7XG4gICAgfVxuXG4gICAgLyoq5Zu65a6a5Lik5bin5LmL6Ze055qE5pe26Ze06Ze06ZqUKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldCBmaXhlZERlbHRhVGltZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvKirlvZPliY3ml7bpl7TvvIznm7jlr7l4eHh45bm05byA5aeL57uP6L+H55qE5q+r56eS5pWwKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldCB0aW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcbiAgICB9XG5cbiAgICAvKirmuLjmiI/lkK/liqjliLDnjrDlnKjnmoTml7bpl7Qs5Y2V5L2N5q+r56eSKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldCB0aW1lU2luY2VTdGFydHVwKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAoTGF5YS50aW1lci5jdXJyVGltZXIgLSB0aGlzLm1fU3RhcnRUaW1lKTtcbiAgICB9XG5cbiAgICAvKirmuLjmiI/lkK/liqjlkI7vvIznu4/ov4fnmoTluKfmlbAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGZyYW1lQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIExheWEudGltZXIuY3VyckZyYW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IHRpbWVTY2FsZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTGF5YS50aW1lci5zY2FsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNldCB0aW1lU2NhbGUoc2NhbGU6IG51bWJlcikge1xuICAgICAgICBMYXlhLnRpbWVyLnNjYWxlID0gc2NhbGU7XG4gICAgfVxufVxuIiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbmltcG9ydCBWaWV3PUxheWEuVmlldztcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XG5pbXBvcnQgQm94PUxheWEuQm94O1xuaW1wb3J0IFRhcD1MYXlhLlRhYjtcbmltcG9ydCBDbGlwPUxheWEuQ2xpcDtcbmltcG9ydCBMaXN0PUxheWEuTGlzdDtcbmltcG9ydCBJbWFnZT1MYXlhLkltYWdlO1xuaW1wb3J0IExhYmVsPUxheWEuTGFiZWw7XG5pbXBvcnQgUGFuZWw9TGF5YS5QYW5lbDtcbmltcG9ydCBTcHJpdGU9TGF5YS5TcHJpdGU7XG5pbXBvcnQgQnV0dG9uPUxheWEuQnV0dG9uO1xuaW1wb3J0IENoZWNrQm94PUxheWEuQ2hlY2tCb3g7XG5pbXBvcnQgSFNsaWRlcj1MYXlhLkhTbGlkZXI7XG5pbXBvcnQgU2xpZGVyPUxheWEuVlNsaWRlcjtcbmltcG9ydCBWaWV3U3RhY2s9TGF5YS5WaWV3U3RhY2s7XG5pbXBvcnQgQW5pbWF0aW9uPUxheWEuQW5pbWF0aW9uO1xuaW1wb3J0IFByb2dyZXNzQmFyPUxheWEuUHJvZ3Jlc3NCYXI7XG5pbXBvcnQgRnJhbWVBbmltYXRpb249TGF5YS5GcmFtZUFuaW1hdGlvbjtcbmltcG9ydCB7Q3VzdG9tVmlld30gZnJvbSBcIi4uL2ZyYW1ld29yay9tYW5hZ2VyL3VpL3ZpZXctYmFzZVwiO1xuaW1wb3J0IHtDdXN0b21EaWFsb2d9IGZyb20gXCIuLi9mcmFtZXdvcmsvbWFuYWdlci91aS9kaWFsb2ctYmFzZVwiO1xuaW1wb3J0IERpYWxvZ0Jhc2UgPSBDdXN0b21EaWFsb2cuRGlhbG9nQmFzZTtcbmltcG9ydCBWaWV3QmFzZSA9IEN1c3RvbVZpZXcuVmlld0Jhc2U7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkudmlldy5jb20ge1xyXG4gICAgZXhwb3J0IGNsYXNzIGRheTdzVUkgZXh0ZW5kcyBEaWFsb2dCYXNlIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJEaWFsb2dCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwibG9hZExpc3RcIjpbXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoZGF5N3NVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnZpZXcuY29tLmRheTdzVUlcIixkYXk3c1VJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBpbnZpdGVVSSBleHRlbmRzIERpYWxvZ0Jhc2Uge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJsb2FkTGlzdFwiOltdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhpbnZpdGVVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnZpZXcuY29tLmludml0ZVVJXCIsaW52aXRlVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIGxvdHRlcnlVSSBleHRlbmRzIERpYWxvZ0Jhc2Uge1xyXG5cdFx0cHVibGljIGlkbGU6RnJhbWVBbmltYXRpb247XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJhbmltYXRpb25zXCI6W3tcIm5vZGVzXCI6W3tcInRhcmdldFwiOjM0LFwia2V5ZnJhbWVzXCI6e1wieFwiOlt7XCJ2YWx1ZVwiOjM2NyxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwieFwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjM2NyxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwieFwiLFwiaW5kZXhcIjoxMH0se1widmFsdWVcIjozNjcsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInhcIixcImluZGV4XCI6MjV9XSxcInZpc2libGVcIjpbe1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoxMH0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoxNX0se1widmFsdWVcIjpmYWxzZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MjV9LHtcInZhbHVlXCI6dHJ1ZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MzB9XSxcInJvdGF0aW9uXCI6W3tcInZhbHVlXCI6MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwicm90YXRpb25cIixcImluZGV4XCI6MH0se1widmFsdWVcIjowLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjoxMH0se1widmFsdWVcIjo3LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjoxNX0se1widmFsdWVcIjo3LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjoyNX0se1widmFsdWVcIjowLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjozMH1dfX1dLFwibmFtZVwiOlwiaWRsZVwiLFwiaWRcIjoxLFwiZnJhbWVSYXRlXCI6MjQsXCJhY3Rpb25cIjowfV0sXCJsb2FkTGlzdFwiOltdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhsb3R0ZXJ5VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3LmNvbS5sb3R0ZXJ5VUlcIixsb3R0ZXJ5VUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIHJhbmtVSSBleHRlbmRzIERpYWxvZ0Jhc2Uge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJXWE9wZW5EYXRhVmlld2VyXCIsXCJwcm9wc1wiOntcInlcIjozODEsXCJ4XCI6MTE2LFwid2lkdGhcIjo1MjQsXCJtb3VzZVRocm91Z2hcIjp0cnVlLFwiaWNvblNpZ25cIjpcInd4XCIsXCJoZWlnaHRcIjo4NTgsXCJydW50aW1lXCI6XCJsYXlhLnVpLldYT3BlbkRhdGFWaWV3ZXJcIn0sXCJjb21wSWRcIjozfV0sXCJsb2FkTGlzdFwiOltdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhyYW5rVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3LmNvbS5yYW5rVUlcIixyYW5rVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIHNob3BVSSBleHRlbmRzIERpYWxvZ0Jhc2Uge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJtb3VzZVRocm91Z2hcIjp0cnVlLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwibG9hZExpc3RcIjpbXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoc2hvcFVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5jb20uc2hvcFVJXCIsc2hvcFVJKTtcclxufVxyXG5leHBvcnQgbW9kdWxlIHVpLnZpZXcubWFpbiB7XHJcbiAgICBleHBvcnQgY2xhc3MgYmdVSSBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHRcdHB1YmxpYyBpbWdCZzpJbWFnZTtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ2YXJcIjpcImltZ0JnXCIsXCJ0b3BcIjowLFwic2tpblwiOlwicmVzL21haW4vYmcvYmcucG5nXCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImJvdHRvbVwiOjB9LFwiY29tcElkXCI6NX1dLFwibG9hZExpc3RcIjpbXCJyZXMvbWFpbi9iZy9iZy5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGJnVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3Lm1haW4uYmdVSVwiLGJnVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIGQzVUkgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJsb2FkTGlzdFwiOltdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhkM1VJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5tYWluLmQzVUlcIixkM1VJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBlZmZlY3RVSSBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHRcdHB1YmxpYyBidG5MdWNreTpCdXR0b247XG5cdFx0cHVibGljIGJ0blJhbms6QnV0dG9uO1xuXHRcdHB1YmxpYyBidG5JbnZpdGU6QnV0dG9uO1xuXHRcdHB1YmxpYyBidG5TZXR0aW5nOkJ1dHRvbjtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NjQsXCJ4XCI6NzIsXCJ3aWR0aFwiOjIxMyxcInNraW5cIjpcInJlcy9tYWluL2VmZmVjdC9pbWFnZV9zdGF0dXMucG5nXCIsXCJoZWlnaHRcIjo0Nn0sXCJjb21wSWRcIjozfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NjQsXCJ4XCI6NDU5LFwid2lkdGhcIjoyMTMsXCJza2luXCI6XCJyZXMvbWFpbi9lZmZlY3QvaW1hZ2Vfc3RhdHVzLnBuZ1wiLFwiaGVpZ2h0XCI6NDZ9LFwiY29tcElkXCI6NH0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjQ4LFwieFwiOjQwMyxcInNraW5cIjpcInJlcy9tYWluL2VmZmVjdC9pbWdfZGlhbW9uZC5wbmdcIn0sXCJjb21wSWRcIjo1fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NDQsXCJ4XCI6MzAsXCJza2luXCI6XCJyZXMvbWFpbi9lZmZlY3QvaW1nX2dsb2QucG5nXCJ9LFwiY29tcElkXCI6Nn0se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjoyODIsXCJ4XCI6Mzc1LFwid2lkdGhcIjoyMDcsXCJ2YXJcIjpcImJ0bkx1Y2t5XCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJyZXMvbWFpbi9lZmZlY3QvYnRuX2NvbW1vbl8xLnBuZ1wiLFwiaGVpZ2h0XCI6MTA0LFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6NyxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0b3BcIjowLFwidGV4dFwiOlwi6L2s55uYXCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImZvbnRTaXplXCI6NDAsXCJib3R0b21cIjowLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6MTF9XX0se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjo0MzksXCJ4XCI6Mzc1LFwid2lkdGhcIjoyMDcsXCJ2YXJcIjpcImJ0blJhbmtcIixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9tYWluL2VmZmVjdC9idG5fY29tbW9uXzIucG5nXCIsXCJoZWlnaHRcIjoxMDQsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo4LFwiY2hpbGRcIjpbe1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1widmFsaWduXCI6XCJtaWRkbGVcIixcInRvcFwiOjAsXCJ0ZXh0XCI6XCLmjpLooYxcIixcInJpZ2h0XCI6MCxcImxlZnRcIjowLFwiZm9udFNpemVcIjo0MCxcImJvdHRvbVwiOjAsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjoxMn1dfSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjYwNixcInhcIjozNzUsXCJ3aWR0aFwiOjIwNyxcInZhclwiOlwiYnRuSW52aXRlXCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJyZXMvbWFpbi9lZmZlY3QvYnRuX2NvbW1vbl8zLnBuZ1wiLFwiaGVpZ2h0XCI6MTA0LFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6OSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0b3BcIjowLFwidGV4dFwiOlwi6YKA6K+3XCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImZvbnRTaXplXCI6NDAsXCJib3R0b21cIjowLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6MTN9XX0se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjo3NzYsXCJ4XCI6Mzc1LFwid2lkdGhcIjoyMDcsXCJ2YXJcIjpcImJ0blNldHRpbmdcIixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9tYWluL2VmZmVjdC9idG5fY29tbW9uXzQucG5nXCIsXCJoZWlnaHRcIjoxMDQsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjoxMCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0b3BcIjowLFwidGV4dFwiOlwi6K6+572uXCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImZvbnRTaXplXCI6NDAsXCJib3R0b21cIjowLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6MTR9XX1dLFwibG9hZExpc3RcIjpbXCJyZXMvbWFpbi9lZmZlY3QvaW1hZ2Vfc3RhdHVzLnBuZ1wiLFwicmVzL21haW4vZWZmZWN0L2ltZ19kaWFtb25kLnBuZ1wiLFwicmVzL21haW4vZWZmZWN0L2ltZ19nbG9kLnBuZ1wiLFwicmVzL21haW4vZWZmZWN0L2J0bl9jb21tb25fMS5wbmdcIixcInJlcy9tYWluL2VmZmVjdC9idG5fY29tbW9uXzIucG5nXCIsXCJyZXMvbWFpbi9lZmZlY3QvYnRuX2NvbW1vbl8zLnBuZ1wiLFwicmVzL21haW4vZWZmZWN0L2J0bl9jb21tb25fNC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGVmZmVjdFVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5tYWluLmVmZmVjdFVJXCIsZWZmZWN0VUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIGdhbWVVSSBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHRcdHB1YmxpYyBhbmlfZ3JhcDpGcmFtZUFuaW1hdGlvbjtcblx0XHRwdWJsaWMgYW5pX2x1Y2tCTDpGcmFtZUFuaW1hdGlvbjtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJhbmltYXRpb25zXCI6W3tcIm5vZGVzXCI6W3tcInRhcmdldFwiOjQxMyxcImtleWZyYW1lc1wiOntcInZpc2libGVcIjpbe1widmFsdWVcIjpmYWxzZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6NDEzLFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjB9LHtcInZhbHVlXCI6dHJ1ZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6NDEzLFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjJ9LHtcInZhbHVlXCI6ZmFsc2UsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjQxMyxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjo0fSx7XCJ2YWx1ZVwiOnRydWUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjQxMyxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjo2fSx7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjo0MTMsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6OH0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjo0MTMsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MTB9LHtcInZhbHVlXCI6ZmFsc2UsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjQxMyxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoxMn1dfX0se1widGFyZ2V0XCI6MzI0LFwia2V5ZnJhbWVzXCI6e1widmlzaWJsZVwiOlt7XCJ2YWx1ZVwiOnRydWUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjMyNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozMjQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6Mn0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozMjQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6NH0se1widmFsdWVcIjpmYWxzZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzI0LFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjZ9LHtcInZhbHVlXCI6dHJ1ZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzI0LFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjh9LHtcInZhbHVlXCI6ZmFsc2UsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjMyNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoxMH0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozMjQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MTJ9XX19XSxcIm5hbWVcIjpcImFuaV9ncmFwXCIsXCJpZFwiOjI5LFwiZnJhbWVSYXRlXCI6MjQsXCJhY3Rpb25cIjowfSx7XCJub2Rlc1wiOlt7XCJ0YXJnZXRcIjo0NjgsXCJrZXlmcmFtZXNcIjp7XCJyb3RhdGlvblwiOlt7XCJ2YWx1ZVwiOjAsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY4LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjM2MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjgsXCJrZXlcIjpcInJvdGF0aW9uXCIsXCJpbmRleFwiOjIwMH1dLFwiYWxwaGFcIjpbe1widmFsdWVcIjoxLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OCxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6MH0se1widmFsdWVcIjowLjUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY4LFwia2V5XCI6XCJhbHBoYVwiLFwiaW5kZXhcIjo1MH0se1widmFsdWVcIjoxLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OCxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6MTAwfSx7XCJ2YWx1ZVwiOjAuNSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjgsXCJrZXlcIjpcImFscGhhXCIsXCJpbmRleFwiOjE1MH0se1widmFsdWVcIjoxLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OCxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6MjAwfV19fSx7XCJ0YXJnZXRcIjo0NjksXCJrZXlmcmFtZXNcIjp7XCJyb3RhdGlvblwiOlt7XCJ2YWx1ZVwiOjAsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY5LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOi0zNjAsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY5LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjoyMDB9XSxcImFscGhhXCI6W3tcInZhbHVlXCI6MC41LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OSxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6MH0se1widmFsdWVcIjoxLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OSxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6NTB9LHtcInZhbHVlXCI6MC41LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OSxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6MTAwfSx7XCJ2YWx1ZVwiOjEsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY5LFwia2V5XCI6XCJhbHBoYVwiLFwiaW5kZXhcIjoxNTB9XX19XSxcIm5hbWVcIjpcImFuaV9sdWNrQkxcIixcImlkXCI6MzAsXCJmcmFtZVJhdGVcIjoyNCxcImFjdGlvblwiOjB9XSxcImxvYWRMaXN0XCI6W10sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGdhbWVVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnZpZXcubWFpbi5nYW1lVUlcIixnYW1lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIGxvYWRpbmdVSSBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHRcdHB1YmxpYyBpbWdfYmc6SW1hZ2U7XG5cdFx0cHVibGljIGJveF9idG06Qm94O1xuXHRcdHB1YmxpYyBwcm9fTG9hZGluZzpQcm9ncmVzc0Jhcjtcblx0XHRwdWJsaWMgbGJsTG9hZGluZzpMYWJlbDtcblx0XHRwdWJsaWMgbGJsX3A6TGFiZWw7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlZpZXdCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcInZhclwiOlwiaW1nX2JnXCIsXCJ0b3BcIjowLFwic2tpblwiOlwicmVzL2xvYWRpbmcvaW1nX2xvYWRpbmdfYmcucG5nXCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImJvdHRvbVwiOjB9LFwiY29tcElkXCI6M30se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjQ5MyxcInZhclwiOlwiYm94X2J0bVwiLFwicGl2b3RZXCI6MTQ5LFwicGl2b3RYXCI6MjQ5LFwiaGVpZ2h0XCI6MTQ5LFwiY2VudGVyWFwiOjAsXCJib3R0b21cIjowfSxcImNvbXBJZFwiOjUsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJQcm9ncmVzc0JhclwiLFwicHJvcHNcIjp7XCJ5XCI6MjAsXCJ4XCI6MjQ3LFwidmFyXCI6XCJwcm9fTG9hZGluZ1wiLFwic2tpblwiOlwicmVzL2xvYWRpbmcvcHJvZ3Jlc3NfbG9hZGluZy5wbmdcIixcInBpdm90WVwiOjEyLFwicGl2b3RYXCI6MTc1fSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoyMCxcIndpZHRoXCI6MjM4LFwidmFyXCI6XCJsYmxMb2FkaW5nXCIsXCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidGV4dFwiOlwiMTAwJVwiLFwic3Ryb2tlQ29sb3JcIjpcIiNmZmZmZmZcIixcInN0cm9rZVwiOjQsXCJwaXZvdFlcIjoxNixcInBpdm90WFwiOjExOSxcImhlaWdodFwiOjMyLFwiZm9udFNpemVcIjoyNixcImZvbnRcIjpcIkFyaWFsXCIsXCJjb2xvclwiOlwiIzU5MjIyMlwiLFwiY2VudGVyWFwiOjAsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjo3fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6ODUsXCJ4XCI6MjQ3LFwid2lkdGhcIjo0OTMsXCJza2luXCI6XCJyZXMvbG9hZGluZy9pbWdfOHIucG5nXCIsXCJwaXZvdFlcIjoyMCxcInBpdm90WFwiOjI0NyxcImhlaWdodFwiOjM5fSxcImNvbXBJZFwiOjh9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoxMjgsXCJ4XCI6MjQ3LFwid2lkdGhcIjoyODMsXCJ2YXJcIjpcImxibF9wXCIsXCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidGV4dFwiOlwiUG93ZXJlZCBieSBMYXlhQWlyIEVuZ2luZVwiLFwicGl2b3RZXCI6MjEsXCJwaXZvdFhcIjoxNDIsXCJoZWlnaHRcIjo0MixcImZvbnRTaXplXCI6MTgsXCJjb2xvclwiOlwiI2ZmZmZmZlwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6OX1dfV0sXCJsb2FkTGlzdFwiOltcInJlcy9sb2FkaW5nL2ltZ19sb2FkaW5nX2JnLnBuZ1wiLFwicmVzL2xvYWRpbmcvcHJvZ3Jlc3NfbG9hZGluZy5wbmdcIixcInJlcy9sb2FkaW5nL2ltZ184ci5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGxvYWRpbmdVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnZpZXcubWFpbi5sb2FkaW5nVUlcIixsb2FkaW5nVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIHBvcHVwVUkgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJsb2FkTGlzdFwiOltdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhwb3B1cFVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5tYWluLnBvcHVwVUlcIixwb3B1cFVJKTtcclxufVxyIl19
