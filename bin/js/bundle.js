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
    constructor() {
        engine_1.Engine.$.run();
    }
}
//激活启动类
new Main();
},{"./framework/runtime/engine":30}],2:[function(require,module,exports){
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
},{"../../framework/manager/ui/scene-base":28}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const singleton_1 = require("../../framework/core/singleton");
const config_1 = require("../../framework/setting/config");
const json_template_1 = require("../../framework/manager/json/json-template");
const enum_1 = require("../../framework/setting/enum");
/**
 * @author Sun
 * @time 2019-10-16 21:28
 * @project SFramework_LayaAir
 * @description 手动修改的游戏配置 （不直接修改framework 保持框架的整洁）
 */
class GameSetting extends singleton_1.Singleton {
    constructor() {
        super();
    }
    static get $() {
        if (!this.instance)
            this.instance = new GameSetting();
        return this.instance;
    }
    init() {
        //手动配置Json文件 json 必须执行在ConfigRes之前
        config_1.ConfigData.$.jsonTemplateList = [
            new json_template_1.JsonTemplate("res/data/InviteData.json", enum_1.enumJsonDefine.invite),
            new json_template_1.JsonTemplate("res/data/LevelData.json", enum_1.enumJsonDefine.level),
            new json_template_1.JsonTemplate("res/data/OfflineData.json", enum_1.enumJsonDefine.offline),
            new json_template_1.JsonTemplate("res/data/TurntableData.json", enum_1.enumJsonDefine.lottery),
        ];
        //手动配置loading资源
        config_1.ConfigRes.$.defaultLoadRes
            .add("res/loading/img_loading_bg.png", Laya.Loader.IMAGE)
            .add("res/loading/progress_loading.png", Laya.Loader.IMAGE)
            .add("res/loading/img_8r.png", Laya.Loader.IMAGE);
        //手动配置主页资源
        config_1.ConfigRes.$.defaultMainRes
            .add("res/atlas/res/main/effect.atlas", Laya.Loader.ATLAS)
            .add("res/atlas/res/com.atlas", Laya.Loader.ATLAS)
            .add("res/com/img_lottery_border.png", Laya.Loader.IMAGE)
            .add("res/com/img_lottery_content.png", Laya.Loader.IMAGE)
            .add("res/main/bg/bg.png", Laya.Loader.IMAGE);
    }
}
GameSetting.instance = null;
exports.GameSetting = GameSetting;
},{"../../framework/core/singleton":12,"../../framework/manager/json/json-template":19,"../../framework/setting/config":31,"../../framework/setting/enum":32}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
var lotteryUI = layaMaxUI_1.ui.view.com.lotteryUI;
const json_manager_1 = require("../../../framework/manager/json/json-manager");
const enum_1 = require("../../../framework/setting/enum");
const math_1 = require("../../../framework/util/math");
const log_1 = require("../../../framework/core/log");
/**
 * @author Sun
 * @time 2019-08-12 17:31
 * @project SFramework_LayaAir
 * @description 转盘模板
 *
 */
class LotteryView extends lotteryUI {
    constructor() {
        super();
        /****************************************主页面属性设置****************************************/
        /** Des:倍率 */
        this.rewardMul = 2;
        /** Des:转盘数据 */
        this.lotteryData = null;
    }
    static get $() {
        if (this.instance == null)
            this.instance = new LotteryView();
        return this.instance;
    }
    onAwake() {
        super.onAwake();
        this.init();
    }
    close() {
        super.close();
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /****************************************主页面初始数据****************************************/
    init() {
        this.lotteryData = json_manager_1.JsonManager.$.getTable(enum_1.enumJsonDefine.lottery);
        this.btnConfirm.on(Laya.Event.CLICK, this, this.onBtnStart);
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /****************************************主页面点击事件****************************************/
    onBtnStart() {
        let random = math_1.UtilMath.random(1, 100);
        for (let i = 0; i < 6; i++) {
            if (this.lotteryData[i].rangeMin <= random && random <= this.lotteryData[i].rangeMax) {
                this.rewardMul = this.lotteryData[i].reward;
                this.onTurning(i);
                break;
            }
        }
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************转盘动画显示*****************************************/
    onTurning(reward = 0) {
        //关闭关闭按钮显示
        this.btnClose.visible = false;
        //禁用转盘按钮
        this.btnConfirm.mouseEnabled = false;
        //转盘动画
        let aCount = Object.keys(this.lotteryData).length;
        let cIndex = reward;
        let perDeg = 360 / aCount;
        let curDeg = (360 - perDeg * (cIndex - 1)) + math_1.UtilMath.randRangeInt(-perDeg / 2, perDeg / 2);
        this.imgContext.rotation = 0;
        let dstRotation = 3600 + curDeg;
        Laya.Tween.to(this.imgContext, {
            rotation: dstRotation,
        }, 6000, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
            this.btnConfirm.mouseEnabled = true;
            this.btnClose.visible = true;
            log_1.Log.log("倍率：" + this.rewardMul);
        }), 0, false, false);
    }
}
exports.LotteryView = LotteryView;
},{"../../../framework/core/log":10,"../../../framework/manager/json/json-manager":18,"../../../framework/setting/enum":32,"../../../framework/util/math":38,"../../../ui/layaMaxUI":43}],5:[function(require,module,exports){
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
},{"../../../ui/layaMaxUI":43}],6:[function(require,module,exports){
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
    load3DScene(area, callBack) {
        load3d_1.UtilLoad3D.loadScene(config_1.Config3D.$.scenePath, area, callBack);
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
},{"../../../framework/setting/config":31,"../../../framework/util/load3d":37,"../../../ui/layaMaxUI":43}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
var effectUI = layaMaxUI_1.ui.view.main.effectUI;
var Browser = Laya.Browser;
const lottery_view_1 = require("../component-view/lottery-view");
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
            let view = lottery_view_1.LotteryView.$;
            view.popupDialog();
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
},{"../../../ui/layaMaxUI":43,"../component-view/lottery-view":4}],8:[function(require,module,exports){
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
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
},{"../../../ui/layaMaxUI":43}],9:[function(require,module,exports){
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
            d3View.load3DScene(this, this.showView);
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
        // this.removeSelf();
        // ResManager.$.releaseGroup(ConfigRes.$.defaultLoadRes);
    }
}
exports.LoadingView = LoadingView;
},{"../../../framework/manager/event/event-data":15,"../../../framework/manager/res/res-manager":22,"../../../framework/setting/config":31,"../../../framework/setting/enum":32,"../../../framework/util/number":40,"../../../ui/layaMaxUI":43,"./bg-view":5,"./d3-view":6,"./effect-view":7,"./game-view":8}],10:[function(require,module,exports){
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
},{"../setting/config":31}],11:[function(require,module,exports){
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
},{"./log":10}],12:[function(require,module,exports){
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
},{"./log":10}],13:[function(require,module,exports){
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
},{"./singleton":12}],14:[function(require,module,exports){
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
},{"../event/event-node":17}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @author Sun
* @time 2019-08-12 17:13
* @project SFramework_LayaAir
* @description 事件数据定义类
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
* @author Sun
* @time 2019-01-20 00:24
* @project SFramework_LayaAir
* @description 事件回调函数定义
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
},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_node_1 = require("./event-node");
/**
* @author Sun
* @time 2019-01-18 16:20
* @project SFramework_LayaAir
* @description 事件管理器
*/
class EventManager extends event_node_1.EventNode {
    constructor() {
        super();
    }
    static get $() {
        if (!this.instance)
            this.instance = new EventManager();
        return this.instance;
    }
    setup() {
        event_node_1.EventContext.eventNodes.clear();
    }
    update() {
    }
    destroy() {
        event_node_1.EventContext.eventNodes.clear();
    }
    /**
     * 移除一个消息监听节点
     * @param node
     */
    remove(node) {
        node.removeEventListenerAll();
        event_node_1.EventContext.eventNodes.delete(node);
    }
    /**
     * 给所有本地消息节点通知消息
     * @param ed
     */
    dispatchEventLocalAll(ed) {
        event_node_1.EventContext.eventNodes.forEach((en) => {
            en.dispatchEvent(ed);
        });
    }
    /**
     * 给所有本地消息节点通知消息
     * @param cmd
     * @param data
     */
    dispatchEventLocalAllByCmd(cmd, data = null) {
        event_node_1.EventContext.eventNodes.forEach((en) => {
            en.dispatchEventByCmd(cmd, data);
        });
    }
    /**
     * 添加一个消息监听器
     * @param type 消息类型
     * @param callBack 回调函数
     * @param target 作用对象
     * @param priority 消息的优先级
     * @param once 是否只监听一次
     */
    addListener(type, callBack, target, priority = 0, once = false) {
        event_node_1.EventNode.addGlobalListener(type, callBack, target, priority, once);
    }
    /**
     * 移除一个消息监听器
     * @param type 消息id
     * @param callBack 回调函数
     * @param target 作用的对象
     */
    removeListener(type, callBack, target) {
        event_node_1.EventNode.removeGlobalListener(type, callBack, target);
    }
    /**
     * 是否存在这个监听消息
     * @param type 消息类型
     * @param callBack 回调类型
     * @param target 回调对象
     */
    hasListener(type, callBack, target) {
        event_node_1.EventNode.hasGlobalListener(type, callBack, target);
    }
    /**
     * 派发消息
     * @param cmd 消息id
     * @param data 消息内容
     */
    dispatchEventByCmd(cmd, data = null) {
        event_node_1.EventNode.dispatchGlobalByCmd(cmd, data);
    }
}
EventManager.instance = null;
exports.EventManager = EventManager;
},{"./event-node":17}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_data_1 = require("./event-data");
const log_1 = require("../../core/log");
const singleton_1 = require("../../core/singleton");
/**
* @author Sun
* @time 2019-01-18 16:20
* @project SFramework_LayaAir
* @description 所有需要监控事件节点的基类
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
},{"../../core/log":10,"../../core/singleton":12,"./event-data":15}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const res_manager_1 = require("../res/res-manager");
const singleton_1 = require("../../core/singleton");
const dictionary_1 = require("../../structure/dictionary");
const config_1 = require("../../setting/config");
const log_1 = require("../../core/log");
/**
* @author Sun
* @time 2019-08-12 14:40
* @project SFramework_LayaAir
* @description 配置表管理
*
*/
class JsonManager extends singleton_1.Singleton {
    constructor() {
        super();
        /**
         * 存放所有配置表模板
         */
        this.m_DicTemplate = null;
        /**
         * 存放所有解析过的配置表
         */
        this.m_DicData = null;
    }
    static get $() {
        if (!this.instance)
            this.instance = new JsonManager();
        return this.instance;
    }
    /**
     * 管理器统一设置方法
     */
    setup() {
        this.m_DicTemplate = new dictionary_1.Dictionary();
        this.m_DicData = new dictionary_1.Dictionary();
        this.load(config_1.ConfigData.$.jsonTemplateList);
    }
    update() {
    }
    /**
     * 管理器统一销毁方法
     */
    destroy() {
        this.unloadAll();
        if (this.m_DicTemplate) {
            this.m_DicTemplate.clear();
            this.m_DicTemplate = null;
        }
        if (this.m_DicData) {
            this.m_DicData.clear();
            this.m_DicData = null;
        }
    }
    /**
    * 加载所有的数据模板
    * @param list
    */
    load(list) {
        for (let i = 0; i < list.length; ++i) {
            log_1.Log.log("[load]加载配置表:" + list[i].url);
            this.m_DicTemplate.add(list[i].name, list[i]);
        }
    }
    /**
     * 获取一个单一结构的数据
     * @param name
     */
    getTable(name) {
        let data = this.m_DicData.value(name);
        if (data == null) {
            data = res_manager_1.ResManager.$.getRes(this.m_DicTemplate.value(name).url);
            this.m_DicData.add(name, data);
        }
        return data;
    }
    /**
     * 获取一行复合表的数据
     * @param name
     * @param key
     */
    getTableRow(name, key) {
        return this.getTable(name)[key];
    }
    /**
     * 卸载指定的模板
     * @param url
     */
    unload(name) {
        let template = this.m_DicTemplate.value(name);
        if (template) {
            this.m_DicData.remove(name);
        }
        res_manager_1.ResManager.$.releaseUrl(template.url);
        this.m_DicTemplate.remove(name);
    }
    /**
     * 卸载所有的模板
     * @constructor
     */
    unloadAll() {
        if (!this.m_DicTemplate)
            return;
        this.m_DicTemplate.foreach(function (key, value) {
            this.unload(key);
            return true;
        });
        this.m_DicData.clear();
        this.m_DicTemplate.clear();
    }
}
JsonManager.instance = null;
exports.JsonManager = JsonManager;
},{"../../core/log":10,"../../core/singleton":12,"../../setting/config":31,"../../structure/dictionary":33,"../res/res-manager":22}],19:[function(require,module,exports){
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
    constructor(url, name) {
        this.url = url;
        this.name = name;
    }
}
exports.JsonTemplate = JsonTemplate;
},{}],20:[function(require,module,exports){
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
            return value.Url == url;
        });
        if (index == -1) {
            let info = new res_item_1.ResItem(url, type, isKeepMemory);
            this.needLoad.push(info);
        }
        return this;
    }
}
exports.ResGroup = ResGroup;
},{"./res-item":21}],21:[function(require,module,exports){
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
    constructor(url, type, iskeepMemory) {
        this.isKeepMemory = false;
        this.url = url;
        this.type = type;
        this.isKeepMemory = iskeepMemory;
    }
    get Url() {
        return this.url;
    }
    get Type() {
        return this.type;
    }
    get IsKeepMemory() {
        return this.isKeepMemory;
    }
}
exports.ResItem = ResItem;
},{}],22:[function(require,module,exports){
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
     * 加载单个资源
     * @param resItem 资源信息
     * @param progressFuc 加载进度回调
     * @param completeFuc 加载完成回调
     */
    loadRes(resItem, progressFuc, completeFuc) {
        Laya.loader.load(resItem.Url, Handler.create(this, (success) => {
            if (success) {
                //完成回调
                if (completeFuc != null)
                    completeFuc.invoke();
                //标记资源
                if (!this.m_dictResItem.has(resItem.Url)) {
                    this.m_dictResItem.set(resItem.Url, resItem);
                }
            }
            else {
                log_1.Log.error("Load Resource Error：");
                log_1.Log.debug(resItem.Url);
            }
        }), Handler.create(this, (progress) => {
            //进度回调
            if (progressFuc != null)
                progressFuc.invoke(progress);
        }, null, false));
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
            urls.push({ url: element.Url, type: element.Type });
        });
        Laya.loader.load(urls, Handler.create(this, (success) => {
            if (success) {
                //完成回调
                if (completeFuc != null)
                    completeFuc.invoke();
                //标记资源
                for (let index = 0; index < loads.needLoad.length; index++) {
                    let info = loads.needLoad[index];
                    if (!this.m_dictResItem.has(info.Url)) {
                        this.m_dictResItem.set(info.Url, info);
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
     * 加载预设物
     * @param filePath
     * @param complete
     */
    loadPrefab(filePath, complete) {
        Laya.loader.load(filePath, Laya.Handler.create(this, function (pre) {
            var playPre = new Laya.Prefab();
            playPre.json = pre;
            let cell = Laya.Pool.getItemByCreateFun("Cell", playPre.create, playPre);
            if (complete)
                complete.invoke(cell);
        }));
    }
    /**
     * 释放资源组
     * @param loads 资源组
     */
    releaseGroup(loads) {
        let urls = new Array();
        loads.needLoad.forEach(element => {
            urls.push(element.Url);
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
},{"../../core/log":10,"../event/event-node":17}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("../../util/string");
var SoundChannel = Laya.SoundChannel;
var Handler = Laya.Handler;
const event_node_1 = require("../event/event-node");
const log_1 = require("../../core/log");
const dictionary_1 = require("../../structure/dictionary");
const config_1 = require("../../setting/config");
/**
 * @author Sun
 * @time 2019-08-12 15:08
 * @project SFramework_LayaAir
 * @description 音效管理
 *
 */
class SoundManager extends event_node_1.EventNode {
    constructor() {
        /********************************************——**********************************************/
        ////////////////////////////////////////////分界线////////////////////////////////////////////
        /******************************************属性信息*******************************************/
        super(...arguments);
        /** Des:背景音乐 */
        this.m_CurBGSound = null;
        /**音效名字对应Url */
        this.dictSoundUrl = null;
        /********************************************——**********************************************/
        ////////////////////////////////////////////分界线////////////////////////////////////////////
    }
    static get $() {
        if (!this.instance)
            this.instance = new SoundManager();
        return this.instance;
    }
    setup() {
        this.m_CurBGSound = new SoundChannel();
        this.dictSoundUrl = new dictionary_1.Dictionary();
        config_1.ConfigSound.$.soundResList.forEach(item => {
            this.dictSoundUrl.add(item.name, item.url);
        });
        if (!string_1.UtilString.isEmpty(config_1.ConfigSound.$.bgSoundName)) {
            this.playBGSound(config_1.ConfigSound.$.bgSoundName, 0);
            this.setAllVolume(config_1.ConfigSound.$.volumeVoiceSound);
        }
    }
    update() {
    }
    destroy() {
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /****************************************设置整体音量*****************************************/
    /**
     * 设置整体音量
     * @param number
     */
    setAllVolume(number) {
        config_1.ConfigSound.$.volumeVoiceSound = number;
        this.m_CurBGSound.volume = number;
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************控制背景音乐*****************************************/
    /**
     * 播放背景声音
     * @param    file_name    资源名字
     * @param    count        播放次数(0为循环)
     */
    playBGSound(file_name, count) {
        if (string_1.UtilString.isEmpty(file_name)) {
            log_1.Log.error("Sound file error!");
            return;
        }
        this.m_CurBGSound = Laya.SoundManager.playMusic(this.dictSoundUrl.value(file_name), count);
    }
    /**
     * 停止背景音播放
     */
    stopBGSound() {
        if (this.m_CurBGSound) {
            this.m_CurBGSound.stop();
        }
    }
    /**
     * 暂停背景音乐
     */
    pauseBGSound() {
        if (this.m_CurBGSound) {
            this.m_CurBGSound.pause();
        }
    }
    /**
     * 恢复背景音乐播放
     */
    resumeBGSound() {
        if (this.m_CurBGSound) {
            this.m_CurBGSound.resume();
        }
    }
    /**
     * 设置背景音量
     * @param volume
     */
    setBGSoundVolume(volume) {
        if (this.m_CurBGSound) {
            this.m_CurBGSound.volume = volume;
        }
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************控制音效播放*****************************************/
    /**
     * 播放效果声音
     * @param    file_name    资源
     * @param    count        播放次数
     */
    playSoundEffect(file_name, count) {
        if (string_1.UtilString.isEmpty(file_name)) {
            log_1.Log.error("声音文件错误");
            return null;
        }
        let sound = Laya.Pool.getItemByClass("Sound", SoundChannel);
        sound = Laya.SoundManager.playSound(this.dictSoundUrl.value(file_name), count, Handler.create(this, () => {
            Laya.Pool.recover("Sound", sound);
        }));
        sound.volume = config_1.ConfigSound.$.volumeVoiceSound;
        return sound;
    }
    /**
     * 停止播放
     * @param sound
     */
    stopSoundEffect(sound) {
        if (sound) {
            sound.stop();
        }
    }
}
/********************************************——**********************************************/
////////////////////////////////////////////分界线////////////////////////////////////////////
/******************************************生命周期*******************************************/
SoundManager.instance = null;
exports.SoundManager = SoundManager;
},{"../../core/log":10,"../../setting/config":31,"../../structure/dictionary":33,"../../util/string":41,"../event/event-node":17}],24:[function(require,module,exports){
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
},{"../../util/time":42,"./timer-interval":25}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
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
},{"../../core/object-pool":11,"../../core/time-delay":13,"../../util/array":34,"../event/event-node":17,"./timer-entity":24}],27:[function(require,module,exports){
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
            /**遮罩层 */
            this.maskLayer = null;
            /**弹窗内物体 */
            this.contentPnl = null;
            /**弹窗数据 */
            this.popupData = new PopupData();
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
        popupDialog(popupData = null) {
            // this.popup(false,false);
            if (popupData == null) {
                popupData = this.popupData;
            }
            else {
                this.popupData = popupData;
            }
            Laya.stage.addChild(this);
            this.popupInit();
            if (popupData.isMask && this.maskLayer == null) {
                this.crateMaskLayer();
                if (!popupData.closeOutside)
                    this.maskLayer.on(Laya.Event.CLICK, this, this.close);
            }
            this.onShowAnimation(popupData.time, () => {
                if (popupData.callBack)
                    popupData.callBack.invoke();
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
/**
 * @author Sun
 * @time 2019-08-12 17:43
 * @project SFramework_LayaAir
 * @description  窗体弹出数据
 *time: number = 300, data: any = null, isMask: boolean = true, closeOutside: boolean = true,cb?
 */
class PopupData {
    constructor(time = 300, data = null, isMask = true, closeOutside = true, cb = null) {
        this.time = 300;
        this.data = null;
        this.isMask = true;
        this.closeOutside = true;
        this.callBack = null;
        if (time != null)
            this.time = time;
        if (data != null)
            this.data = data;
        if (isMask != null)
            this.isMask = isMask;
        if (closeOutside != null)
            this.closeOutside = closeOutside;
        if (cb != null)
            this.callBack = cb;
    }
}
exports.PopupData = PopupData;
},{"../../util/display":36}],28:[function(require,module,exports){
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
},{"../../core/log":10,"../res/res-group":20,"../res/res-manager":22,"../timer/timer-manager":26}],29:[function(require,module,exports){
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
},{"../data/data-manager":14}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../setting/config");
const log_1 = require("../core/log");
const time_1 = require("../util/time");
const enum_1 = require("../setting/enum");
var Browser = Laya.Browser;
const res_manager_1 = require("../manager/res/res-manager");
const event_data_1 = require("../manager/event/event-data");
const data_manager_1 = require("../manager/data/data-manager");
const event_manager_1 = require("../manager/event/event-manager");
const json_manager_1 = require("../manager/json/json-manager");
const sound_manager_1 = require("../manager/sound/sound-manager");
const timer_manager_1 = require("../manager/timer/timer-manager");
const gameSetting_1 = require("../../client/setting/gameSetting");
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
        gameSetting_1.GameSetting.$.init();
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
        data_manager_1.DataManager.$.setup();
        event_manager_1.EventManager.$.setup();
        res_manager_1.ResManager.$.setup();
        json_manager_1.JsonManager.$.setup();
        sound_manager_1.SoundManager.$.setup();
        timer_manager_1.TimerManager.$.setup();
    }
    /**
     * 管理器的Update
     */
    managerUpdate() {
    }
}
Engine.instance = null;
exports.Engine = Engine;
},{"../../client/setting/gameSetting":3,"../core/log":10,"../manager/data/data-manager":14,"../manager/event/event-data":15,"../manager/event/event-manager":16,"../manager/json/json-manager":18,"../manager/res/res-manager":22,"../manager/sound/sound-manager":23,"../manager/timer/timer-manager":26,"../setting/config":31,"../setting/enum":32,"../util/time":42}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const singleton_1 = require("../core/singleton");
const main_scene_1 = require("../../client/scene/main-scene");
const res_group_1 = require("../manager/res/res-group");
const loading_view_1 = require("../../client/view/layer-view/loading-view");
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
        this.defaultLoadRes = new res_group_1.ResGroup();
        /**默认的基础页面资源信息 */
        this.defaultMainRes = new res_group_1.ResGroup();
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
        /**json配置表信息 */
        this.jsonTemplateList = new Array();
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
        this.scenePath = "res/u3d/LayaScene_Main/Conventional/Main.ls";
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
},{"../../client/scene/main-scene":2,"../../client/view/layer-view/loading-view":9,"../core/singleton":12,"../manager/res/res-group":20,"./enum":32}],32:[function(require,module,exports){
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
    enumJsonDefine["invite"] = "invite";
    enumJsonDefine["level"] = "level";
    enumJsonDefine["lottery"] = "lottery";
    enumJsonDefine["offline"] = "offline";
})(enumJsonDefine = exports.enumJsonDefine || (exports.enumJsonDefine = {}));
/**
 * 音效标记
 */
var enumSoundName;
(function (enumSoundName) {
    enumSoundName["bg"] = "bgSound";
    enumSoundName["botton"] = "btnSound";
})(enumSoundName = exports.enumSoundName || (exports.enumSoundName = {}));
},{}],33:[function(require,module,exports){
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
},{"../util/dict":35}],34:[function(require,module,exports){
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
},{"../setting/enum":32}],35:[function(require,module,exports){
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
},{}],36:[function(require,module,exports){
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
},{}],37:[function(require,module,exports){
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
    static loadScene(path, area, cb) {
        Laya.loader.create(path, Laya.Handler.create(this, () => {
            Laya.stage.addChild(Laya.loader.getRes(path));
            if (cb) {
                cb.call(area);
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
},{"../core/log":10}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math3d_1 = require("./math3d");
/**
 * @author Sun
 * @time 2019-01-18 16:20
 * @project SFramework_LayaAir
 * @description 算法工具类
 *
 */
class UtilMath {
    static Sign(f) {
        return ((f < 0) ? -1 : 1);
    }
    /**
     * 限定数字在范围区间并返回
     * @param num
     * @param min
     * @param max
     * @constructor
     */
    static clamp(num, min, max) {
        if (num < min) {
            num = min;
        }
        else if (num > max) {
            num = max;
        }
        return num;
    }
    static clamp01(value) {
        if (value < 0)
            return 0;
        if (value > 1)
            return 1;
        return value;
    }
    static lerp(from, to, t) {
        return (from + ((to - from) * UtilMath.clamp01(t)));
    }
    static lerpAngle(a, b, t) {
        let num = UtilMath.repeat(b - a, 360);
        if (num > 180)
            num -= 360;
        return (a + (num * UtilMath.clamp01(t)));
    }
    static repeat(t, length) {
        return (t - (Math.floor(t / length) * length));
    }
    /**
     * 产生随机数
     * 结果：x>=param1 && x<param2
     */
    static randRange(param1, param2) {
        let loc = Math.random() * (param2 - param1) + param1;
        return loc;
    }
    /**
     * 产生随机数
     * 结果：x>=param1 && x<=param2
     */
    static randRangeInt(param1, param2) {
        let loc = Math.random() * (param2 - param1 + 1) + param1;
        return Math.floor(loc);
    }
    /**
     * 从数组中产生随机数[-1,1,2]
     * 结果：-1/1/2中的一个
     */
    static randRangeArray(arr) {
        if (arr.length == 0)
            return null;
        let loc = arr[UtilMath.randRangeInt(0, arr.length - 1)];
        return loc;
    }
    /**
     * 转换为360度角度
     */
    static clampDegrees(degrees) {
        while (degrees < 0)
            degrees = degrees + 360;
        while (degrees >= 360)
            degrees = degrees - 360;
        return degrees;
    }
    /**
     * 转换为360度弧度
     */
    static clampRadians(radians) {
        while (radians < 0)
            radians = radians + 2 * Math.PI;
        while (radians >= 2 * Math.PI)
            radians = radians - 2 * Math.PI;
        return radians;
    }
    /**
     * 两点间的距离
     */
    static getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
    }
    static getSquareDistance(x1, y1, x2, y2) {
        return Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2);
    }
    /**
     * 两点间的弧度：x正方形为0，Y轴向下,顺时针为正
     */
    static getLineRadians(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    }
    static getLineDegree(x1, y1, x2, y2) {
        let degree = UtilMath.toDegree(UtilMath.getLineRadians(x1, y1, x2, y2));
        return UtilMath.clampDegrees(degree);
    }
    static getPointRadians(x, y) {
        return Math.atan2(y, x);
    }
    static getPointDegree(x, y) {
        let degree = UtilMath.toDegree(UtilMath.getPointRadians(x, y));
        return UtilMath.clampDegrees(degree);
    }
    /**
     * 弧度转化为度
     */
    static toDegree(radian) {
        return radian * (180.0 / Math.PI);
    }
    /**
     * 度转化为弧度
     */
    static toRadian(degree) {
        return degree * (Math.PI / 180.0);
    }
    static moveTowards(current, target, maxDelta) {
        if (Math.abs(target - current) <= maxDelta) {
            return target;
        }
        return (current + (UtilMath.Sign(target - current) * maxDelta));
    }
    /**
     * 获取一定范围内的随机整数
     * @param min 最小值
     * @param max 最大值
     * @constructor
     */
    static random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /**
     * 二维向量归一化
     * @param x
     * @param y
     */
    static normalize(x, y) {
        return Math.sqrt(x * x + y * y);
    }
    /**
     * 返回两向量夹角
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    static vectorAngle(x1, y1, x2, y2) {
        if (x1 == x2 && y1 == y2) {
            return;
        }
        var cosAngle = (x1 * x2 + y1 * y2) / (UtilMath.normalize(x1, y1) * UtilMath.normalize(x2, y2));
        var aCosAngle = Math.acos(cosAngle);
        var angle = math3d_1.UtilMath3D.Rad2Deg(aCosAngle);
        if (x1 / y1 < x2 / y2)
            angle = -angle;
        return angle;
    }
}
/**字节转换M*/
UtilMath.BYTE_TO_M = 1 / (1024 * 1024);
/**字节转换K*/
UtilMath.BYTE_TO_K = 1 / (1024);
UtilMath.Deg2Rad = 0.01745329;
UtilMath.Rad2Deg = 57.29578;
exports.UtilMath = UtilMath;
},{"./math3d":39}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector2 = Laya.Vector2;
var Vector3 = Laya.Vector3;
var Vector4 = Laya.Vector4;
const string_1 = require("./string");
/**
 * @author Sun
 * @time 2019-08-11 18:08
 * @project SFramework_LayaAir
 * @description 3d算法工具类
 *
 */
class UtilMath3D {
    static get TempVec2() {
        if (!UtilMath3D._Vec2Temp)
            UtilMath3D._Vec2Temp = new Vector2(0, 0);
        return UtilMath3D._Vec2Temp;
    }
    static get TempVec3() {
        if (!UtilMath3D._Vec3Temp)
            UtilMath3D._Vec3Temp = new Vector3(0, 0, 0);
        return UtilMath3D._Vec3Temp;
    }
    static get TempVec4() {
        if (!UtilMath3D._Vec4Temp)
            UtilMath3D._Vec4Temp = new Vector4(0, 0, 0, 0);
        return UtilMath3D._Vec4Temp;
    }
    /**转换为水平方向*/
    static ToHorizontal(vec) {
        vec.y = 0;
        return vec;
    }
    /**水平距离*/
    static HorizontalDistance(vec1, vec2) {
        vec1.y = 0;
        vec2.y = 0;
        return Vector3.scalarLength(Vec3Sub(vec1, vec2));
    }
    /**射线上的一点*/
    static GetRayPoint(ray, distance) {
        return Vec3Add(ray.origin, Vec3Mul(ray.direction, distance));
    }
    /** Des:三维求两点距离 */
    static Vec3Magnitude(vec1, vec2) {
        return Math.sqrt((vec1.x - vec2.x) * (vec1.x - vec2.x) + ((vec1.y - vec2.y) * (vec1.y - vec2.y)) + ((vec1.z - vec2.z) * (vec1.z - vec2.z)));
    }
    /** Des:二维求两点距离 */
    static Vec2Magnitude(vec1, vec2) {
        return Math.sqrt((vec1.x - vec2.x) * (vec1.x - vec2.x) + ((vec1.y - vec2.y) * (vec1.y - vec2.y)));
    }
    /** Des:角度转弧度 */
    static Deg2Rad(angle) {
        return Laya.Utils.toRadian(angle);
    }
    /** Des:弧度转角度 */
    static Rad2Deg(radian) {
        return Laya.Utils.toAngle(radian);
    }
    /** Des:正弦 */
    static sin(angle) {
        var radian = UtilMath3D.Deg2Rad(angle);
        return Math.sin(radian);
    }
    /** Des:余弦 */
    static cos(angle) {
        var radian = UtilMath3D.Deg2Rad(angle);
        return Math.cos(radian);
    }
    /** Des:正切 */
    static tan(angle) {
        var radian = UtilMath3D.Deg2Rad(angle);
        return Math.tan(radian);
    }
    /** Des:反正弦 */
    static asin(angle) {
        var radian = UtilMath3D.Deg2Rad(angle);
        return Math.asin(radian);
    }
    /** Des:反余弦 */
    static acos(angle) {
        var radian = UtilMath3D.Deg2Rad(angle);
        return Math.acos(radian);
    }
    /** Des:反正切 */
    static atan(angle) {
        var radian = UtilMath3D.Deg2Rad(angle);
        return Math.atan(radian);
    }
}
UtilMath3D._Vec2Temp = null;
UtilMath3D._Vec3Temp = null;
UtilMath3D._Vec4Temp = null;
exports.UtilMath3D = UtilMath3D;
//～～～～～～～～～～～～～～～～～～～～～～～vec2～～～～～～～～～～～～～～～～～～～～～～～//
function Vec2Add(a, b) {
    return new Vector2(a.x + b.x, a.y + b.y);
}
exports.Vec2Add = Vec2Add;
function Vec2Sub(a, b) {
    return new Vector2(a.x - b.x, a.y - b.y);
}
exports.Vec2Sub = Vec2Sub;
function Vec2Multiply(a, b) {
    return new Vector2(a.x * b.x, a.y * b.y);
}
exports.Vec2Multiply = Vec2Multiply;
function Vec2Mul(a, d) {
    return new Vector2(a.x * d, a.y * d);
}
exports.Vec2Mul = Vec2Mul;
function Vec2Div(a, d) {
    return new Vector2(a.x / d, a.y / d);
}
exports.Vec2Div = Vec2Div;
function Vec2Dot(lhs, rhs) {
    return ((lhs.x * rhs.x) + (lhs.y * rhs.y));
}
exports.Vec2Dot = Vec2Dot;
function Vec2Project(vector, onNormal) {
    let num = Vec2Dot(onNormal, onNormal);
    if (num < 1E-05) {
        return Vector2.ZERO;
    }
    return (Vec2Div(Vec2Mul(onNormal, Vec2Dot(vector, onNormal)), num));
}
exports.Vec2Project = Vec2Project;
function Vec2Min(lhs, rhs) {
    return new Vector2(Math.min(lhs.x, rhs.x), Math.min(lhs.y, rhs.y));
}
exports.Vec2Min = Vec2Min;
function Vec2Max(lhs, rhs) {
    return new Vector2(Math.max(lhs.x, rhs.x), Math.max(lhs.y, rhs.y));
}
exports.Vec2Max = Vec2Max;
function Vec2Magnitude(vec) {
    return Math.sqrt((vec.x * vec.x) + (vec.y * vec.y));
}
exports.Vec2Magnitude = Vec2Magnitude;
function Vec2SqrMagnitude(vec) {
    return (vec.x * vec.x) + (vec.y * vec.y);
}
exports.Vec2SqrMagnitude = Vec2SqrMagnitude;
function Vec2Normalized(vec) {
    let magnitude = Vec2Magnitude(vec);
    let v;
    if (magnitude > 1E-05)
        v = Vec2Div(vec, magnitude);
    else
        v = new Vector2(0, 0);
    return v;
}
exports.Vec2Normalized = Vec2Normalized;
function Vec2Normal(vec) {
    let magnitude = Vec2Magnitude(vec);
    if (magnitude > 1E-05) {
        let v = Vec2Div(vec, magnitude);
        Vec2Set(vec, v.x, v.y);
    }
    else
        Vec2Set(vec, 0, 0);
}
exports.Vec2Normal = Vec2Normal;
function Vec2Set(v, x, y) {
    v.x = x;
    v.y = y;
    ;
    return v;
}
exports.Vec2Set = Vec2Set;
// export function Vec2Angle(from: Vector2, to: Vector2): number {
//     return (Math.acos(UtilMath.clamp(Vec2Dot(Vec2Normalized(from), Vec2Normalized(to)), -1, 1)) * 57.29578);
// }
function Vec2ClampMagnitude(vector, maxLength) {
    if (Vec2SqrMagnitude(vector) > (maxLength * maxLength)) {
        return (Vec2Mul(Vec2Normalized(vector), maxLength));
    }
    return vector;
}
exports.Vec2ClampMagnitude = Vec2ClampMagnitude;
// export function Vec2Lerp(from: Vector2, to: Vector2, t: number): Vector2 {
//     t = UtilMath.clamp(t, 0, 1);
//     return new Vector2(from.x + ((to.x - from.x) * t), from.y + ((to.y - from.y) * t));
// }
function Vec2MoveTowards(current, target, maxDistanceDelta) {
    let vector = Vec2Sub(target, current);
    let magnitude = Vec2Magnitude(vector);
    if ((magnitude > maxDistanceDelta) && (magnitude != 0)) {
        return Vec2Add(current, (Vec2Mul(Vec2Div(vector, magnitude), maxDistanceDelta)));
    }
    return target;
}
exports.Vec2MoveTowards = Vec2MoveTowards;
function Vec2ToString(vec) {
    return string_1.UtilString.format("({0}, {1})", vec.x, vec.y);
}
exports.Vec2ToString = Vec2ToString;
//～～～～～～～～～～～～～～～～～～～～～～～vec3～～～～～～～～～～～～～～～～～～～～～～～//
function Vec3Add(a, b) {
    return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
}
exports.Vec3Add = Vec3Add;
function Vec3Sub(a, b) {
    return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
}
exports.Vec3Sub = Vec3Sub;
function Vec3Multiply(a, b) {
    return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
}
exports.Vec3Multiply = Vec3Multiply;
function Vec3Mul(a, d) {
    return new Vector3(a.x * d, a.y * d, a.z * d);
}
exports.Vec3Mul = Vec3Mul;
function Vec3Div(a, d) {
    return new Vector3(a.x / d, a.y / d, a.z / d);
}
exports.Vec3Div = Vec3Div;
function Vec3Cross(lhs, rhs) {
    return new Vector3((lhs.y * rhs.z) - (lhs.z * rhs.y), (lhs.z * rhs.x) - (lhs.x * rhs.z), (lhs.x * rhs.y) - (lhs.y * rhs.x));
}
exports.Vec3Cross = Vec3Cross;
function Vec3Project(vector, onNormal) {
    let num = Vector3.dot(onNormal, onNormal);
    if (num < 1E-05) {
        return new Vector3();
    }
    return (Vec3Div(Vec3Mul(onNormal, Vector3.dot(vector, onNormal)), num));
}
exports.Vec3Project = Vec3Project;
function Vec3Min(lhs, rhs) {
    return new Vector3(Math.min(lhs.x, rhs.x), Math.min(lhs.y, rhs.y), Math.min(lhs.z, rhs.z));
}
exports.Vec3Min = Vec3Min;
function Vec3Max(lhs, rhs) {
    return new Vector3(Math.max(lhs.x, rhs.x), Math.max(lhs.y, rhs.y), Math.max(lhs.z, rhs.z));
}
exports.Vec3Max = Vec3Max;
function Vec3Magnitude(vec) {
    return Math.sqrt((vec.x * vec.x) + (vec.y * vec.y) + (vec.z * vec.z));
}
exports.Vec3Magnitude = Vec3Magnitude;
function Vec3SqrMagnitude(vec) {
    return (vec.x * vec.x) + (vec.y * vec.y) + (vec.z * vec.z);
}
exports.Vec3SqrMagnitude = Vec3SqrMagnitude;
function Vec3Normalized(vec) {
    let magnitude = Vector3.scalarLength(vec);
    let v;
    if (magnitude > 1E-05)
        v = Vec3Div(vec, magnitude);
    else
        v = new Vector3(0, 0, 0);
    return v;
}
exports.Vec3Normalized = Vec3Normalized;
function Vec3Normal(vec) {
    let magnitude = Vector3.scalarLength(vec);
    if (magnitude > 1E-05) {
        let v = Vec3Div(vec, magnitude);
        Vec3Set(vec, v.x, v.y, v.z);
    }
    else
        Vec3Set(vec, 0, 0, 0);
}
exports.Vec3Normal = Vec3Normal;
function Vec3Set(v, x, y, z) {
    v.x = x;
    v.y = y;
    v.z = z;
    return v;
}
exports.Vec3Set = Vec3Set;
// export function Vec3Angle(from: Vector3, to: Vector3): number {
//     return (Math.acos(UtilMath.clamp(Vector3.dot(Vec3Normalized(from), Vec3Normalized(to)), -1, 1)) * 57.29578);
// }
function Vec3ClampMagnitude(vector, maxLength) {
    if (Vector3.scalarLengthSquared(vector) > (maxLength * maxLength)) {
        return (Vec3Mul(Vec3Normalized(vector), maxLength));
    }
    return vector;
}
exports.Vec3ClampMagnitude = Vec3ClampMagnitude;
// export function Vec3Lerp(from: Vector3, to: Vector3, t: number): Vector3 {
//     t = UtilMath.clamp(t, 0, 1);
//     return new Vector3(from.x + ((to.x - from.x) * t), from.y + ((to.y - from.y) * t), from.z + ((to.z - from.z) * t));
// }
function Vec3MoveTowards(current, target, maxDistanceDelta) {
    let vector = Vec3Sub(target, current);
    let magnitude = Vector3.scalarLength(vector);
    if ((magnitude > maxDistanceDelta) && (magnitude != 0)) {
        return Vec3Add(current, (Vec3Mul(Vec3Div(vector, magnitude), maxDistanceDelta)));
    }
    return target;
}
exports.Vec3MoveTowards = Vec3MoveTowards;
function Vec3ToString(vec) {
    return string_1.UtilString.format("({0}, {1}, {2})", vec.x, vec.y, vec.z);
}
exports.Vec3ToString = Vec3ToString;
/**
 * 弧度转向量
 * @param    radians    弧度
 */
function getLineFromRadians(radians) {
    let x = Math.cos(radians);
    let y = Math.sin(radians);
    let dir = new Vector2(x, y);
    Vec2Normal(dir);
    return dir;
}
exports.getLineFromRadians = getLineFromRadians;
},{"./string":41}],40:[function(require,module,exports){
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
},{"./string":41}],41:[function(require,module,exports){
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
},{}],42:[function(require,module,exports){
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
},{}],43:[function(require,module,exports){
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
            lotteryUI.uiView = { "type": "DialogBase", "props": { "y": 0, "x": 0, "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 615, "x": 375, "skin": "res/com/img_lottery_border.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 45, "child": [{ "type": "Image", "props": { "y": 314, "x": 314, "var": "imgContext", "skin": "res/com/img_lottery_content.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 46 }, { "type": "Image", "props": { "y": -66, "x": 253, "skin": "res/com/img_zhen.png" }, "compId": 47 }, { "type": "Button", "props": { "y": 780, "x": 314, "width": 258, "var": "btnConfirm", "stateNum": 1, "skin": "res/main/effect/btn_common_2.png", "height": 130, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 48, "child": [{ "type": "Label", "props": { "valign": "middle", "top": 0, "text": "抽奖", "right": 0, "left": 0, "fontSize": 60, "bottom": 0, "bold": true, "align": "center" }, "compId": 49 }] }, { "type": "Button", "props": { "y": -194, "x": 587, "var": "btnClose", "stateNum": 1, "skin": "res/main/effect/btn_close.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 50 }] }], "animations": [{ "nodes": [{ "target": 34, "keyframes": { "x": [{ "value": 367, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "x", "index": 0 }, { "value": 367, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "x", "index": 10 }, { "value": 367, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "x", "index": 25 }], "visible": [{ "value": true, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 0 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 10 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 15 }, { "value": false, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 25 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 34, "key": "visible", "index": 30 }], "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 10 }, { "value": 7, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 15 }, { "value": 7, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 25 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 34, "key": "rotation", "index": 30 }] } }], "name": "idle", "id": 1, "frameRate": 24, "action": 0 }], "loadList": ["res/com/img_lottery_border.png", "res/com/img_lottery_content.png", "res/com/img_zhen.png", "res/main/effect/btn_common_2.png", "res/main/effect/btn_close.png"], "loadList3D": [] };
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
        })(main = view.main || (view.main = {}));
    })(view = ui.view || (ui.view = {}));
})(ui = exports.ui || (exports.ui = {}));
},{"../framework/manager/ui/dialog-base":27,"../framework/manager/ui/view-base":29}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkY6L0xheWFJREUvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL01haW4udHMiLCJzcmMvY2xpZW50L3NjZW5lL21haW4tc2NlbmUudHMiLCJzcmMvY2xpZW50L3NldHRpbmcvZ2FtZVNldHRpbmcudHMiLCJzcmMvY2xpZW50L3ZpZXcvY29tcG9uZW50LXZpZXcvbG90dGVyeS12aWV3LnRzIiwic3JjL2NsaWVudC92aWV3L2xheWVyLXZpZXcvYmctdmlldy50cyIsInNyYy9jbGllbnQvdmlldy9sYXllci12aWV3L2QzLXZpZXcudHMiLCJzcmMvY2xpZW50L3ZpZXcvbGF5ZXItdmlldy9lZmZlY3Qtdmlldy50cyIsInNyYy9jbGllbnQvdmlldy9sYXllci12aWV3L2dhbWUtdmlldy50cyIsInNyYy9jbGllbnQvdmlldy9sYXllci12aWV3L2xvYWRpbmctdmlldy50cyIsInNyYy9mcmFtZXdvcmsvY29yZS9sb2cudHMiLCJzcmMvZnJhbWV3b3JrL2NvcmUvb2JqZWN0LXBvb2wudHMiLCJzcmMvZnJhbWV3b3JrL2NvcmUvc2luZ2xldG9uLnRzIiwic3JjL2ZyYW1ld29yay9jb3JlL3RpbWUtZGVsYXkudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvZGF0YS9kYXRhLW1hbmFnZXIudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvZXZlbnQvZXZlbnQtZGF0YS50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci9ldmVudC9ldmVudC1tYW5hZ2VyLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL2V2ZW50L2V2ZW50LW5vZGUudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvanNvbi9qc29uLW1hbmFnZXIudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvanNvbi9qc29uLXRlbXBsYXRlLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL3Jlcy9yZXMtZ3JvdXAudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvcmVzL3Jlcy1pdGVtLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL3Jlcy9yZXMtbWFuYWdlci50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci9zb3VuZC9zb3VuZC1tYW5hZ2VyLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL3RpbWVyL3RpbWVyLWVudGl0eS50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci90aW1lci90aW1lci1pbnRlcnZhbC50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci90aW1lci90aW1lci1tYW5hZ2VyLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL3VpL2RpYWxvZy1iYXNlLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL3VpL3NjZW5lLWJhc2UudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvdWkvdmlldy1iYXNlLnRzIiwic3JjL2ZyYW1ld29yay9ydW50aW1lL2VuZ2luZS50cyIsInNyYy9mcmFtZXdvcmsvc2V0dGluZy9jb25maWcudHMiLCJzcmMvZnJhbWV3b3JrL3NldHRpbmcvZW51bS50cyIsInNyYy9mcmFtZXdvcmsvc3RydWN0dXJlL2RpY3Rpb25hcnkudHMiLCJzcmMvZnJhbWV3b3JrL3V0aWwvYXJyYXkudHMiLCJzcmMvZnJhbWV3b3JrL3V0aWwvZGljdC50cyIsInNyYy9mcmFtZXdvcmsvdXRpbC9kaXNwbGF5LnRzIiwic3JjL2ZyYW1ld29yay91dGlsL2xvYWQzZC50cyIsInNyYy9mcmFtZXdvcmsvdXRpbC9tYXRoLnRzIiwic3JjL2ZyYW1ld29yay91dGlsL21hdGgzZC50cyIsInNyYy9mcmFtZXdvcmsvdXRpbC9udW1iZXIudHMiLCJzcmMvZnJhbWV3b3JrL3V0aWwvc3RyaW5nLnRzIiwic3JjL2ZyYW1ld29yay91dGlsL3RpbWUudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1RBLHVEQUFvRDtB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LElBQUksR0FBRztZQUNQLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7WUFDaEQsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7WUFDOUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7WUFDOUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7WUFDOUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7WUFDOUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7WUFDOUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7U0FDakQsQ0FBQztRQUVGLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNYLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLEVBQUUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNu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QUcsRUFBQyxNQUFNLEVBQUMsc0JBQXNCLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsa0NBQWtDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsK0JBQStCLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFdBQVcsRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsV0FBVyxF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TSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGtDQUFrQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxrQ0FBa0MsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGlDQUFpQyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLDhCQUE4QixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGtDQUFrQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGtDQUFrQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGtDQUFrQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGtDQUFrQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsa0NBQWtDLEVBQUMsaUNBQWlDLEVBQUMsOEJBQThCLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLEVBQUMsa0NBQWtDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUM7WUFMcG1FLGFBQVEsV0FXcEIsQ0FBQTtZQUNELEdBQUcsQ0FBQyx1QkFBdUIsRUFBQyxRQUFRLENBQUMsQ0FBQztZQUN0QyxZQUFvQixTQUFRLFFBQVE7Z0JBSWhDLGdCQUFlLEtBQUssRUFBRSxDQUFBLENBQUEsQ0FBQztnQkFDdkIsY0FBYztvQkFDVixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDOztZQUxjLGFBQU0sR0FBTSxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUM7WUFIejZGLFdBQU0sU0FTbEIsQ0FBQTtZQUNELEdBQUcsQ0FBQyxxQkFBcUIsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxlQUF1QixTQUFRLFFBQVE7Z0JBT25DLGdCQUFlLEtBQUssRUFBRSxDQUFBLENBQUEsQ0FBQztnQkFDdkIsY0FBYztvQkFDVixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QyxDQUFDOztZQUxjLGdCQUFNLEdBQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGdDQUFnQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxrQ0FBa0MsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyx3QkFBd0IsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQywyQkFBMkIsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLGdDQUFnQyxFQUFDLGtDQUFrQyxFQUFDLHdCQUF3QixDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDO1lBTnZ3QyxjQUFTLFlBWXJCLENBQUE7WUFDRCxHQUFHLENBQUMsd0JBQXdCLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxFQTFEcUIsSUFBSSxHQUFKLFNBQUksS0FBSixTQUFJLFFBMER6QjtJQUFELENBQUMsRUExRGdCLElBQUksR0FBSixPQUFJLEtBQUosT0FBSSxRQTBEcEI7QUFBRCxDQUFDLEVBMURhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQTBEZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gJy4vZnJhbWV3b3JrL3J1bnRpbWUvZW5naW5lJztcclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxOTowNVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOa4uOaIj+WQr+WKqOWFpeWPo1xyXG4gKlxyXG4gKi9cclxuY2xhc3MgTWFpbiB7XHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdEVuZ2luZS4kLnJ1bigpO1xyXG5cdH1cclxufVxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJpbXBvcnQge0N1c3RvbVNjZW5lfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL21hbmFnZXIvdWkvc2NlbmUtYmFzZVwiO1xyXG5pbXBvcnQgTHlTY2VuZSA9IEN1c3RvbVNjZW5lLkx5U2NlbmU7XHJcbmltcG9ydCB7IEJnVmlldyB9IGZyb20gJy4uL3ZpZXcvbGF5ZXItdmlldy9iZy12aWV3JztcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcclxuXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxMToyMFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOS4u+WcuuaZr1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1haW5TY2VuZSBleHRlbmRzIEx5U2NlbmUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5uZWVkTG9hZFJlc1xyXG4gICAgICAgICAgICAuYWRkKFwicmVzL2JnLzEyMy5wbmdcIiwgTGF5YS5Mb2FkZXIuSU1BR0UpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2NvcmUvc2luZ2xldG9uJztcclxuaW1wb3J0IHtDb25maWdEYXRhLCBDb25maWdSZXN9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvc2V0dGluZy9jb25maWdcIjtcclxuaW1wb3J0IHtKc29uVGVtcGxhdGV9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9qc29uL2pzb24tdGVtcGxhdGVcIjtcclxuaW1wb3J0IHtlbnVtSnNvbkRlZmluZX0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9zZXR0aW5nL2VudW1cIjtcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTEwLTE2IDIxOjI4XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g5omL5Yqo5L+u5pS555qE5ri45oiP6YWN572uIO+8iOS4jeebtOaOpeS/ruaUuWZyYW1ld29yayDkv53mjIHmoYbmnrbnmoTmlbTmtIHvvIlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHYW1lU2V0dGluZyBleHRlbmRzIFNpbmdsZXRvbntcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogR2FtZVNldHRpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOiBHYW1lU2V0dGluZyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IEdhbWVTZXR0aW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXQoKXtcclxuICAgICAgICAgLy/miYvliqjphY3nva5Kc29u5paH5Lu2IGpzb24g5b+F6aG75omn6KGM5ZyoQ29uZmlnUmVz5LmL5YmNXHJcbiAgICAgICAgQ29uZmlnRGF0YS4kLmpzb25UZW1wbGF0ZUxpc3QgPSBbXHJcbiAgICAgICAgICAgIG5ldyBKc29uVGVtcGxhdGUoXCJyZXMvZGF0YS9JbnZpdGVEYXRhLmpzb25cIiwgZW51bUpzb25EZWZpbmUuaW52aXRlKSxcclxuICAgICAgICAgICAgbmV3IEpzb25UZW1wbGF0ZShcInJlcy9kYXRhL0xldmVsRGF0YS5qc29uXCIsIGVudW1Kc29uRGVmaW5lLmxldmVsKSxcclxuICAgICAgICAgICAgbmV3IEpzb25UZW1wbGF0ZShcInJlcy9kYXRhL09mZmxpbmVEYXRhLmpzb25cIiwgZW51bUpzb25EZWZpbmUub2ZmbGluZSksXHJcbiAgICAgICAgICAgIG5ldyBKc29uVGVtcGxhdGUoXCJyZXMvZGF0YS9UdXJudGFibGVEYXRhLmpzb25cIiwgZW51bUpzb25EZWZpbmUubG90dGVyeSksXHJcbiAgICAgICAgXTtcclxuICAgICAgICAvL+aJi+WKqOmFjee9rmxvYWRpbmfotYTmupBcclxuICAgICAgICBDb25maWdSZXMuJC5kZWZhdWx0TG9hZFJlc1xyXG4gICAgICAgICAgICAuYWRkKFwicmVzL2xvYWRpbmcvaW1nX2xvYWRpbmdfYmcucG5nXCIsTGF5YS5Mb2FkZXIuSU1BR0UpXHJcbiAgICAgICAgICAgIC5hZGQoXCJyZXMvbG9hZGluZy9wcm9ncmVzc19sb2FkaW5nLnBuZ1wiLExheWEuTG9hZGVyLklNQUdFKVxyXG4gICAgICAgICAgICAuYWRkKFwicmVzL2xvYWRpbmcvaW1nXzhyLnBuZ1wiLExheWEuTG9hZGVyLklNQUdFKTtcclxuICAgICAgICAvL+aJi+WKqOmFjee9ruS4u+mhtei1hOa6kFxyXG4gICAgICAgIENvbmZpZ1Jlcy4kLmRlZmF1bHRNYWluUmVzXHJcbiAgICAgICAgICAgIC5hZGQoXCJyZXMvYXRsYXMvcmVzL21haW4vZWZmZWN0LmF0bGFzXCIsIExheWEuTG9hZGVyLkFUTEFTKVxyXG4gICAgICAgICAgICAuYWRkKFwicmVzL2F0bGFzL3Jlcy9jb20uYXRsYXNcIiwgTGF5YS5Mb2FkZXIuQVRMQVMpXHJcbiAgICAgICAgICAgIC5hZGQoXCJyZXMvY29tL2ltZ19sb3R0ZXJ5X2JvcmRlci5wbmdcIiwgTGF5YS5Mb2FkZXIuSU1BR0UpXHJcbiAgICAgICAgICAgIC5hZGQoXCJyZXMvY29tL2ltZ19sb3R0ZXJ5X2NvbnRlbnQucG5nXCIsIExheWEuTG9hZGVyLklNQUdFKVxyXG4gICAgICAgICAgICAuYWRkKFwicmVzL21haW4vYmcvYmcucG5nXCIsIExheWEuTG9hZGVyLklNQUdFKVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IHVpIH0gZnJvbSAnLi4vLi4vLi4vdWkvbGF5YU1heFVJJztcclxuaW1wb3J0IGxvdHRlcnlVSSA9ICB1aS52aWV3LmNvbS5sb3R0ZXJ5VUk7XHJcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBKc29uTWFuYWdlciB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2pzb24vanNvbi1tYW5hZ2VyJztcclxuaW1wb3J0IHtlbnVtSnNvbkRlZmluZSB9IGZyb20gICcuLi8uLi8uLi9mcmFtZXdvcmsvc2V0dGluZy9lbnVtJztcclxuaW1wb3J0IHsgVXRpbE1hdGggfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvdXRpbC9tYXRoJztcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcclxuaW1wb3J0IHsgVXRpbFN0cmluZyB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay91dGlsL3N0cmluZyc7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMiAxNzozMVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOi9rOebmOaooeadv1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvdHRlcnlWaWV3IGV4dGVuZHMgbG90dGVyeVVJIHtcclxuXHJcbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirkuLvpobXpnaLlsZ7mgKforr7nva4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAvKiogRGVzOuWAjeeOhyAqL1xyXG4gIHByaXZhdGUgcmV3YXJkTXVsOm51bWJlciA9IDI7XHJcbiAgLyoqIERlczrovaznm5jmlbDmja4gKi9cclxuICBwcml2YXRlIGxvdHRlcnlEYXRhOmFueSA9IG51bGw7XHJcblxyXG5cclxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuS4u+mhtemdoueUn+WRveWRqOacnyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTG90dGVyeVZpZXdcclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgJCgpOiBMb3R0ZXJ5VmlldyB7XHJcbiAgICAgIGlmICh0aGlzLmluc3RhbmNlPT1udWxsKSB0aGlzLmluc3RhbmNlID0gbmV3IExvdHRlcnlWaWV3KCk7XHJcbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgIHN1cGVyLm9uQXdha2UoKTtcclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgICAgc3VwZXIuY2xvc2UoKTtcclxuICB9XHJcblxyXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5Li76aG16Z2i5Yid5aeL5pWw5o2uKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG4gIHByaXZhdGUgaW5pdCgpXHJcbiAge1xyXG4gICAgICB0aGlzLmxvdHRlcnlEYXRhID0gSnNvbk1hbmFnZXIuJC5nZXRUYWJsZShlbnVtSnNvbkRlZmluZS5sb3R0ZXJ5KVxyXG4gICAgICB0aGlzLmJ0bkNvbmZpcm0ub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLHRoaXMub25CdG5TdGFydCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirkuLvpobXpnaLngrnlh7vkuovku7YqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICBvbkJ0blN0YXJ0KCkge1xyXG5cclxuICAgICAgbGV0IHJhbmRvbSA9IFV0aWxNYXRoLnJhbmRvbSgxLDEwMCk7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5RGF0YVtpXS5yYW5nZU1pbjw9cmFuZG9tJiZyYW5kb208PXRoaXMubG90dGVyeURhdGFbaV0ucmFuZ2VNYXgpe1xyXG4gICAgICAgICAgICAgdGhpcy5yZXdhcmRNdWwgPSB0aGlzLmxvdHRlcnlEYXRhW2ldLnJld2FyZDtcclxuICAgICAgICAgICAgIHRoaXMub25UdXJuaW5nKGkpO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKui9rOebmOWKqOeUu+aYvuekuioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICBwcml2YXRlIG9uVHVybmluZyhyZXdhcmQ6IG51bWJlciA9IDApIHtcclxuXHJcbiAgICAgIC8v5YWz6Zet5YWz6Zet5oyJ6ZKu5pi+56S6XHJcbiAgICAgIHRoaXMuYnRuQ2xvc2UudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAvL+emgeeUqOi9rOebmOaMiemSrlxyXG4gICAgICB0aGlzLmJ0bkNvbmZpcm0ubW91c2VFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgIC8v6L2s55uY5Yqo55S7XHJcbiAgICAgIGxldCBhQ291bnQgPSBPYmplY3Qua2V5cyh0aGlzLmxvdHRlcnlEYXRhKS5sZW5ndGg7XHJcblxyXG4gICAgICBsZXQgY0luZGV4ID0gcmV3YXJkO1xyXG4gICAgICBsZXQgcGVyRGVnID0gMzYwIC8gYUNvdW50O1xyXG4gICAgICBsZXQgY3VyRGVnID0gKDM2MCAtIHBlckRlZyAqIChjSW5kZXggLSAxKSkgKyBVdGlsTWF0aC5yYW5kUmFuZ2VJbnQoLXBlckRlZyAvIDIsIHBlckRlZyAvIDIpO1xyXG5cclxuICAgICAgdGhpcy5pbWdDb250ZXh0LnJvdGF0aW9uID0gMDtcclxuICAgICAgbGV0IGRzdFJvdGF0aW9uID0gMzYwMCArIGN1ckRlZztcclxuICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLmltZ0NvbnRleHQsIHtcclxuICAgICAgICAgIHJvdGF0aW9uOiBkc3RSb3RhdGlvbixcclxuICAgICAgfSwgNjAwMCwgTGF5YS5FYXNlLnN0cm9uZ091dCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoKT0+e1xyXG5cclxuICAgICAgdGhpcy5idG5Db25maXJtLm1vdXNlRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuYnRuQ2xvc2UudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIExvZy5sb2coXCLlgI3njofvvJpcIit0aGlzLnJld2FyZE11bCk7XHJcblxyXG4gICAgICB9KSwgMCwgZmFsc2UsIGZhbHNlKTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyB1aSB9IGZyb20gJy4uLy4uLy4uL3VpL2xheWFNYXhVSSc7XHJcbmltcG9ydCBiZ1VJID0gIHVpLnZpZXcubWFpbi5iZ1VJO1xyXG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2RhdGEvZGF0YS1iYXNlJztcclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxMToyM1xyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIFxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJnVmlldyBleHRlbmRzIGJnVUl7XHJcblxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLlsZ7mgKfnrqHnkIYqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueUn+WRveWRqOacnyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEJnVmlld1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogQmdWaWV3IHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgQmdWaWV3KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Bd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XHJcbiAgICAgICAgdGhpcy5Jbml0KCk7XHJcbiAgICAgICAgdGhpcy5zdWl0SW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbkuIDmrKFcclxuICAgICAqL1xyXG4gICAgcHVibGljIEluaXQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdE9uY2UoKTtcclxuXHJcbiAgICAgICAgLy8gLy/mlbDmja7nm5HlkKxcclxuICAgICAgICAvLyB0aGlzLmFkZERhdGFXYXRjaChEYXRhRGVmaW5lLlVzZXJJbmZvKTtcclxuXHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbldlaVhpbikge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRMaW5rKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCC6YWNXHJcbiAgICAgKi9cclxuICAgIHN1aXRJbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5Yid5aeL5pWw5o2uKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqIERlczrmnoTpgKDmmK/liJ3lp4vljJbkuIDmrKEgKi9cclxuICAgIHByaXZhdGUgaW5pdE9uY2UoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlpJbpg6jov57mjqXov5vlhaXliKTmlq0qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqIERlczrliKTmlq3ov5vlhaXov57mjqXkv6Hmga8gKi9cclxuICAgIHByaXZhdGUgaW5pdExpbmsoKSB7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5LqL5Lu255u45YWzKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirmlbDmja7mlLnlj5jnmoTnm5HlkKwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkRhdGEoZGF0YTogRGF0YUJhc2UpIHtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLeWIhueVjOe6vy0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbn0iLCJpbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlcjtcclxuaW1wb3J0IHtHYW1lVmlld30gZnJvbSBcIi4vZ2FtZS12aWV3XCI7XHJcbmltcG9ydCB7RWZmZWN0Vmlld30gZnJvbSBcIi4vZWZmZWN0LXZpZXdcIjtcclxuaW1wb3J0IHsgdWkgfSBmcm9tICcuLi8uLi8uLi91aS9sYXlhTWF4VUknO1xyXG5pbXBvcnQgZDNVSSA9ICB1aS52aWV3Lm1haW4uZDNVSTtcclxuaW1wb3J0IHsgRGF0YUJhc2UgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9kYXRhL2RhdGEtYmFzZSc7XHJcbmltcG9ydCB7IFV0aWxMb2FkM0QgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvdXRpbC9sb2FkM2QnO1xyXG5pbXBvcnQgeyBDb25maWczRCB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9zZXR0aW5nL2NvbmZpZyc7XHJcbmltcG9ydCB7IEV2ZW50RnVuYyB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2V2ZW50L2V2ZW50LWRhdGEnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTExIDEyOjAzXHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24gM0TlnLrmma/lsYJcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEM1ZpZXcgZXh0ZW5kcyBkM1VJe1xyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouWxnuaAp+euoeeQhioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKiBEZXM6M0TlnLrmma8gKi9cclxuICAgIHB1YmxpYyBzY2VuZTNEOkxheWEuU2NlbmUzRDtcclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueUn+WRveWRqOacnyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEQzVmlld1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogRDNWaWV3IHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgRDNWaWV3KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uQXdha2UoKTtcclxuICAgICAgICB0aGlzLkluaXQoKTtcclxuICAgICAgICB0aGlzLnN1aXRJbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluS4gOasoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgSW5pdCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0T25jZSgpO1xyXG5cclxuICAgICAgICAvLyAvL+aVsOaNruebkeWQrFxyXG4gICAgICAgIC8vIHRoaXMuYWRkRGF0YVdhdGNoKERhdGFEZWZpbmUuVXNlckluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q+P5qyh5by55Ye65Yid5aeL5YyW5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHBvcHVwSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmluaXRBbGwoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgILphY1cclxuICAgICAqL1xyXG4gICAgc3VpdEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLliJ3lp4vmlbDmja4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvKiogRGVzOuaehOmAoOaYr+WIneWni+WMluS4gOasoSAqL1xyXG4gICAgcHJpdmF0ZSBpbml0T25jZSgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERlczrmr4/mrKHlvLnlh7rliJ3lp4vljJYgKi9cclxuICAgIHByaXZhdGUgaW5pdEFsbCgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlpJbpg6jov57mjqXov5vlhaXliKTmlq0qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqIERlczrliKTmlq3ov5vlhaXov57mjqXkv6Hmga8gKi9cclxuICAgIHByaXZhdGUgaW5pdExpbmsoKSB7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5LqL5Lu255u45YWzKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiozROWcuuaZr+WKoOi9veWujOaIkOWbnuiwgyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb0zROWcuuaZr1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZDNEU2NlbmUoYXJlYSxjYWxsQmFjaylcclxuICAgIHtcclxuICAgICAgICBVdGlsTG9hZDNELmxvYWRTY2VuZShDb25maWczRC4kLnNjZW5lUGF0aCxhcmVhLGNhbGxCYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirmlbDmja7mlLnlj5jnmoTnm5HlkKwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkRhdGEoZGF0YTogRGF0YUJhc2UpIHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8t5YiG55WM57q/LS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxufSIsImltcG9ydCB7dWl9IGZyb20gXCIuLi8uLi8uLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IGVmZmVjdFVJID0gIHVpLnZpZXcubWFpbi5lZmZlY3RVSTtcclxuXHJcbmltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xyXG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2RhdGEvZGF0YS1iYXNlJztcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcclxuaW1wb3J0IHsgTG90dGVyeVZpZXcgfSBmcm9tICcuLi9jb21wb25lbnQtdmlldy9sb3R0ZXJ5LXZpZXcnO1xyXG5pbXBvcnQgeyBQb3B1cERhdGEgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci91aS9kaWFsb2ctYmFzZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRWZmZWN0VmlldyBleHRlbmRzIGVmZmVjdFVJe1xyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouWxnuaAp+euoeeQhioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i55Sf5ZG95ZGo5pyfKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogRWZmZWN0Vmlld1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogRWZmZWN0VmlldyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IEVmZmVjdFZpZXcoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Bd2FrZSgpO1xyXG4gICAgICAgIHRoaXMuSW5pdCgpO1xyXG4gICAgICAgIHRoaXMuc3VpdEluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG5cclxuICAgICAgICB0aGlzLmluaXRPbmNlKCk7XHJcblxyXG4gICAgICAgIC8vIC8v5pWw5o2u55uR5ZCsXHJcbiAgICAgICAgLy8gdGhpcy5hZGREYXRhV2F0Y2goRGF0YURlZmluZS5Vc2VySW5mbyk7XHJcblxyXG4gICAgICAgIGlmIChCcm93c2VyLm9uV2VpWGluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdExpbmsoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q+P5qyh5by55Ye65Yid5aeL5YyW5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHBvcHVwSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmluaXRBbGwoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgILphY1cclxuICAgICAqL1xyXG4gICAgc3VpdEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLliJ3lp4vmlbDmja4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvKiogRGVzOuaehOmAoOaYr+WIneWni+WMluS4gOasoSAqL1xyXG4gICAgcHJpdmF0ZSBpbml0T25jZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5idG5MdWNreS5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntcclxuICAgICAgICAgICBsZXQgdmlldyA9IExvdHRlcnlWaWV3LiQ7XHJcbiAgICAgICAgICAgdmlldy5wb3B1cERpYWxvZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXM65q+P5qyh5by55Ye65Yid5aeL5YyWICovXHJcbiAgICBwcml2YXRlIGluaXRBbGwoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5aSW6YOo6L+e5o6l6L+b5YWl5Yik5patKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKiBEZXM65Yik5pat6L+b5YWl6L+e5o6l5L+h5oGvICovXHJcbiAgICBwcml2YXRlIGluaXRMaW5rKCkge1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueCueWHu+S6i+S7tioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaVsOaNruaUueWPmOeahOebkeWQrCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uRGF0YShkYXRhOiBEYXRhQmFzZSkge1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLeWIhueVjOe6vy0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbn0iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi4vLi4vLi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xyXG5pbXBvcnQgZ2FtZVVJID0gdWkudmlldy5tYWluLmdhbWVVSTtcclxuaW1wb3J0IHsgRGF0YUJhc2UgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9kYXRhL2RhdGEtYmFzZSc7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxODowOFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOS4u+mhtVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdhbWVWaWV3IGV4dGVuZHMgZ2FtZVVJIHtcclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLlsZ7mgKfnrqHnkIYqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueUn+WRveWRqOacnyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEdhbWVWaWV3O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogR2FtZVZpZXcge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBHYW1lVmlldygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Bd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XHJcbiAgICAgICAgdGhpcy5Jbml0KCk7XHJcbiAgICAgICAgdGhpcy5zdWl0SW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG5cclxuICAgICAgICB0aGlzLmluaXRPbmNlKCk7XHJcblxyXG4gICAgICAgIC8vIC8v5pWw5o2u55uR5ZCsXHJcbiAgICAgICAgLy8gdGhpcy5hZGREYXRhV2F0Y2goRGF0YURlZmluZS5Vc2VySW5mbyk7XHJcblxyXG4gICAgICAgIGlmIChCcm93c2VyLm9uV2VpWGluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdExpbmsoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr4/mrKHlvLnlh7rliJ3lp4vljJbkuIDmrKFcclxuICAgICAqL1xyXG4gICAgcG9wdXBJbml0KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdEFsbCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAgumFjVxyXG4gICAgICovXHJcbiAgICBzdWl0SW5pdCgpXHJcbiAgICB7XHJcbiAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouWIneWni+aVsOaNrioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKiBEZXM65p6E6YCg5piv5Yid5aeL5YyW5LiA5qyhICovXHJcbiAgICBwcml2YXRlIGluaXRPbmNlKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRGVzOuavj+asoeW8ueWHuuWIneWni+WMliAqL1xyXG4gICAgcHJpdmF0ZSBpbml0QWxsKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuWklumDqOi/nuaOpei/m+WFpeWIpOaWrSoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvKiogRGVzOuWIpOaWrei/m+WFpei/nuaOpeS/oeaBryAqL1xyXG4gICAgcHJpdmF0ZSBpbml0TGluaygpIHtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLngrnlh7vkuovku7YqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG4gXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirmlbDmja7mlLnlj5jnmoTnm5HlkKwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkRhdGEoZGF0YTogRGF0YUJhc2UpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8t5YiG55WM57q/LS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbn1cclxuXHJcbmNsYXNzIEdyZWV0ZXIge1xyXG4gICAgZ3JlZXRpbmc6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZ3JlZXRpbmcgPSBtZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgZ3JlZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiSGVsbG8sIFwiICsgdGhpcy5ncmVldGluZztcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuLi8uLi8uLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IGxvYWRpbmdVSSA9IHVpLnZpZXcubWFpbi5sb2FkaW5nVUk7XHJcbmltcG9ydCB7IElMb2FpbmcgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlL2ktTG9hZGluZyc7XHJcbmltcG9ydCB7IEJnVmlldyB9IGZyb20gJy4vYmctdmlldyc7XHJcbmltcG9ydCB7IEQzVmlldyB9IGZyb20gJy4vZDMtdmlldyc7XHJcbmltcG9ydCB7IERhdGFCYXNlIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL21hbmFnZXIvZGF0YS9kYXRhLWJhc2UnO1xyXG5pbXBvcnQgeyBDb25maWdVSSwgQ29uZmlnR2FtZSwgQ29uZmlnUmVzIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL3NldHRpbmcvY29uZmlnJztcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL21hbmFnZXIvZXZlbnQvZXZlbnQtbWFuYWdlcic7XHJcbmltcG9ydCB7IFV0aWxOdW1iZXIgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvdXRpbC9udW1iZXInO1xyXG5pbXBvcnQgeyBlbnVtRGltZW5zaW9uIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL3NldHRpbmcvZW51bSc7XHJcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSAnLi9nYW1lLXZpZXcnO1xyXG5pbXBvcnQgeyBFZmZlY3RWaWV3IH0gZnJvbSAnLi9lZmZlY3Qtdmlldyc7XHJcbmltcG9ydCB7IEV2ZW50RnVuYyB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2V2ZW50L2V2ZW50LWRhdGEnO1xyXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvY29yZS9sb2cnO1xyXG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL21hbmFnZXIvcmVzL3Jlcy1tYW5hZ2VyJztcclxuaW1wb3J0IHsgUmVzR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLWdyb3VwJztcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIExvYWRpbmdWaWV3IGV4dGVuZHMgbG9hZGluZ1VJIGltcGxlbWVudHMgSUxvYWluZ3tcclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLlsZ7mgKfnrqHnkIYqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueUn+WRveWRqOacnyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Bd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XHJcbiAgICAgICAgdGhpcy5Jbml0KCk7XHJcbiAgICAgICAgdGhpcy5zdWl0SW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKiDliqDovb3pobXpnaLlkK/liqjpoblcclxuICAgICAqL1xyXG4gICAgb25TdGFydCgpOiB2b2lkIHtcclxuICAgICAgXHJcbiAgICAgICAgLy/liqDovb3kuLvlnLrmma/miYDpnIDopoHnmoTotYTmupDkv6Hmga9cclxuICAgICAgICBSZXNNYW5hZ2VyLiQubG9hZEdyb3VwKFxyXG4gICAgICAgICAgICBDb25maWdSZXMuJC5kZWZhdWx0TWFpblJlcyxcclxuICAgICAgICAgICAgbmV3IEV2ZW50RnVuYyh0aGlzLHRoaXMub25Qcm9ncmVzcyksXHJcbiAgICAgICAgICAgIG5ldyBFdmVudEZ1bmModGhpcyx0aGlzLm9uQ29tcGxldGVkKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5sYmxMb2FkaW5nLnRleHQgPSBcIua4uOaIj+eZu+W9leS4rS4uLlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295a6M5oiQ5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gc3VjY2Vzc1xyXG4gICAgICovXHJcbiAgICBvbkNvbXBsZXRlZChzdWNjZXNzOiBib29sZWFuKTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vQmfpobXpnaJcclxuICAgICAgICBsZXQgYmdWaWV3ID0gQmdWaWV3LiQ7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChiZ1ZpZXcpO1xyXG5cclxuICAgICAgICBpZihDb25maWdHYW1lLiQuZGltZW5zaW9uPT1lbnVtRGltZW5zaW9uLkRpbTMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLzNE6aG16Z2iXHJcbiAgICAgICAgICAgIGxldCBkM1ZpZXcgPSBEM1ZpZXcuJDtcclxuICAgICAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChkM1ZpZXcpO1xyXG4gICAgICAgICAgICBkM1ZpZXcubG9hZDNEU2NlbmUodGhpcyx0aGlzLnNob3dWaWV3KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmlldygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgc2hvd1ZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIC8v5Li76aG1XHJcbiAgICAgICAgbGV0IGdhbWVWaWV3ID0gR2FtZVZpZXcuJDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKGdhbWVWaWV3KTtcclxuICAgICAgICAvL+aViOaenOmhtVxyXG4gICAgICAgIGxldCBlZmZlY3RWaWV3ID0gRWZmZWN0Vmlldy4kO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQoZWZmZWN0Vmlldyk7XHJcbiAgICAgICAgLy/nu5PmnZ/plIDmr4HliqDovb3pobVcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vei/m+W6plxyXG4gICAgICogQHBhcmFtIHByb2dyZXNzXHJcbiAgICAgKi9cclxuICAgIG9uUHJvZ3Jlc3MocHJvZ3Jlc3M6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgZml4ZWQgPSBVdGlsTnVtYmVyLnRvRml4ZWQocHJvZ3Jlc3MqMTAwLCAwKTtcclxuICAgICAgICB0aGlzLmxibExvYWRpbmcudGV4dCA9IGZpeGVkICsgXCIlXCI7XHJcbiAgICAgICAgdGhpcy5wcm9fTG9hZGluZy52YWx1ZSA9IGZpeGVkLzEwMDtcclxuICAgIH1cclxuXHJcbiAgXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdE9uY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOavj+asoeW8ueWHuuWIneWni+WMluS4gOasoVxyXG4gICAgICovXHJcbiAgICBwb3B1cEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0QWxsKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCC6YWNXHJcbiAgICAgKi9cclxuICAgIHN1aXRJbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuaW1nX2JnLndpZHRoID0gdGhpcy53aWR0aDtcclxuICAgICAgICB0aGlzLmltZ19iZy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgICB0aGlzLmltZ19iZy54ID0gMDtcclxuICAgICAgICB0aGlzLmltZ19iZy55ID0gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouWIneWni+aVsOaNrioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKiBEZXM65p6E6YCg5piv5Yid5aeL5YyW5LiA5qyhICovXHJcbiAgICBwcml2YXRlIGluaXRPbmNlKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERlczrmr4/mrKHlvLnlh7rliJ3lp4vljJYgKi9cclxuICAgIHByaXZhdGUgaW5pdEFsbCgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuWklumDqOi/nuaOpei/m+WFpeWIpOaWrSoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvKiogRGVzOuWIpOaWrei/m+WFpei/nuaOpeS/oeaBryAqL1xyXG4gICAgcHJpdmF0ZSBpbml0TGluaygpIHtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLngrnlh7vkuovku7YqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5pWw5o2u5pS55Y+Y55qE55uR5ZCsKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIt+aWsOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25EYXRhKGRhdGE6IERhdGFCYXNlKSB7XHJcbiAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8t5YiG55WM57q/LS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirplIDmr4Hoh6rouqsqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgZGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgLy8gUmVzTWFuYWdlci4kLnJlbGVhc2VHcm91cChDb25maWdSZXMuJC5kZWZhdWx0TG9hZFJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy3liIbnlYznur8tLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG59IiwiaW1wb3J0IHsgQ29uZmlnRGVidWcgfSBmcm9tICcuLi9zZXR0aW5nL2NvbmZpZyc7XHJcblxyXG4gLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMDkgMTU6NTlcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDovpPlh7rkv6Hmga/nrqHnkIZcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMb2cge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVidWcoLi4uYXJnczogYW55W10pIHtcclxuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc0RlYnVnKSBjb25zb2xlLmRlYnVnKFwiW2RlYnVnXVwiLCBhcmdzLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5mbyguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzRGVidWcpIGNvbnNvbGUuaW5mbyhcIltpbmZvXVwiLCBhcmdzLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgd2FybiguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzRGVidWcpIGNvbnNvbGUud2FybihcIlt3YXJuXVwiLCBhcmdzLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZXJyb3IoLi4uYXJnczogYW55W10pIHtcclxuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc0RlYnVnKSBjb25zb2xlLmVycm9yKFwiW2Vycm9yXVwiLCBhcmdzLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZXhjZXB0aW9uKC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICAgICAgaWYgKENvbmZpZ0RlYnVnLiQuaXNEZWJ1ZykgY29uc29sZS5leGNlcHRpb24oXCJbZXhjZV1cIiwgYXJncy50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvZyguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzRGVidWcpIGNvbnNvbGUubG9nKFwiW2xvZ11cIiwgYXJncy50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoq5omT5Y2w6K6+5aSH5L+h5oGvKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcHJpbnREZXZpY2VJbmZvKCkge1xyXG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzRGVidWcgJiYgbmF2aWdhdG9yKSB7XHJcbiAgICAgICAgICAgIGxldCBhZ2VudFN0ciA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3RhcnQgPSBhZ2VudFN0ci5pbmRleE9mKFwiKFwiKTtcclxuICAgICAgICAgICAgbGV0IGVuZCA9IGFnZW50U3RyLmluZGV4T2YoXCIpXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPCAwIHx8IGVuZCA8IHN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBpbmZvU3RyID0gYWdlbnRTdHIuc3Vic3RyaW5nKHN0YXJ0ICsgMSwgZW5kKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkZXZpY2U6IHN0cmluZywgc3lzdGVtOiBzdHJpbmcsIHZlcnNpb246IHN0cmluZztcclxuICAgICAgICAgICAgbGV0IGluZm9zID0gaW5mb1N0ci5zcGxpdChcIjtcIik7XHJcbiAgICAgICAgICAgIGlmIChpbmZvcy5sZW5ndGggPT0gMykge1xyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/kuInkuKrnmoTor53vvIwg5Y+v6IO95pivYW5kcm9pZOeahO+8jCDpgqPkuYjnrKzkuInkuKrmmK/orr7lpIflj7dcclxuICAgICAgICAgICAgICAgIGRldmljZSA9IGluZm9zWzJdO1xyXG4gICAgICAgICAgICAgICAgLy/nrKzkuozkuKrmmK/ns7vnu5/lj7flkozniYjmnKxcclxuICAgICAgICAgICAgICAgIGxldCBzeXN0ZW1faW5mbyA9IGluZm9zWzFdLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzeXN0ZW1faW5mby5sZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN5c3RlbSA9IHN5c3RlbV9pbmZvWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24gPSBzeXN0ZW1faW5mb1syXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmZvcy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICAgICAgc3lzdGVtID0gaW5mb3NbMF07XHJcbiAgICAgICAgICAgICAgICBkZXZpY2UgPSBpbmZvc1swXTtcclxuICAgICAgICAgICAgICAgIHZlcnNpb24gPSBpbmZvc1sxXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN5c3RlbSA9IG5hdmlnYXRvci5wbGF0Zm9ybTtcclxuICAgICAgICAgICAgICAgIGRldmljZSA9IG5hdmlnYXRvci5wbGF0Zm9ybTtcclxuICAgICAgICAgICAgICAgIHZlcnNpb24gPSBpbmZvU3RyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExvZy5pbmZvKHN5c3RlbSwgZGV2aWNlLCB2ZXJzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBMb2cgfSBmcm9tICcuL2xvZyc7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0wOSAyMzoyNVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uICDlr7nosaHmsaBcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBPYmplY3RQb29sIHtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bkuIDkuKrlr7nosaHvvIzkuI3lrZjlnKjliJnliJvlu7pcclxuICAgICAqIEBwYXJhbSBjbGFzc0RlZiAg57G75ZCNXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0KGNsYXNzRGVmOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGxldCBzaWduOiBzdHJpbmcgPSBcImRjLlwiICsgY2xhc3NEZWYubmFtZTtcclxuICAgICAgICBsZXQgb2JqOiBhbnkgPSBMYXlhLlBvb2wuZ2V0SXRlbShzaWduKTtcclxuICAgICAgICBpZiAoIW9iaikge1xyXG4gICAgICAgICAgICBpZiAoIUxheWEuQ2xhc3NVdGlscy5nZXRSZWdDbGFzcyhzaWduKSkge1xyXG4gICAgICAgICAgICAgICAgTG9nLmRlYnVnKFwiW3Bvb2xzXeazqOWGjOWvueixoeaxoDpcIiArIHNpZ24pO1xyXG4gICAgICAgICAgICAgICAgTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzKHNpZ24sIGNsYXNzRGVmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYmogPSBMYXlhLkNsYXNzVXRpbHMuZ2V0SW5zdGFuY2Uoc2lnbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmogJiYgb2JqW1wiaW5pdFwiXSkgb2JqLmluaXQoKTtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zue5pS25a+56LGhXHJcbiAgICAgKiBAcGFyYW0gb2JqICDlr7nosaHlrp7kvotcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZWNvdmVyKG9iajogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFvYmopIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHByb3RvOiBhbnkgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcclxuICAgICAgICBsZXQgY2xheno6IGFueSA9IHByb3RvW1wiY29uc3RydWN0b3JcIl07XHJcbiAgICAgICAgbGV0IHNpZ246IHN0cmluZyA9IFwiZGMuXCIgKyBjbGF6ei5uYW1lO1xyXG4gICAgICAgIG9iai5jbG9zZSgpO1xyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHNpZ24sIG9iaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKuWvueixoeaxoOWfuuexuyovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBvb2xPYmplY3Qge1xyXG4gICAgLy8g5Yid5aeL5YyWXHJcbiAgICBpbml0KCk7XHJcbiAgICAvLyDlhbPpl61cclxuICAgIGNsb3NlKCk7XHJcbn1cclxuIiwiaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9sb2cnO1xyXG5cclxuIC8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTA5IDE1OjU3XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g5Y2V5L6L5bel5YW357G7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2luZ2xldG9uIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjbGFzc0tleXM6IEZ1bmN0aW9uW10gPSBbXTtcclxuICAgIHByaXZhdGUgc3RhdGljIGNsYXNzVmFsdWVzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGxldCBjbGF6ejogYW55ID0gdGhpc1tcImNvbnN0cnVjdG9yXCJdO1xyXG4gICAgICAgIGlmICghY2xhenopIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiTm90IHN1cHBvcnQgY29uc3RydWN0b3IhXCIpO1xyXG4gICAgICAgICAgICBMb2cud2FybihcIk5vdCBzdXBwb3J0IGNvbnN0cnVjdG9yIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDpmLLmraLph43lpI3lrp7kvovljJZcclxuICAgICAgICBpZiAoU2luZ2xldG9uLmNsYXNzS2V5cy5pbmRleE9mKGNsYXp6KSAhPSAtMSlcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMgKyBcIk9ubHkgaW5zdGFuY2Ugb25jZSFcIik7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIFNpbmdsZXRvbi5jbGFzc0tleXMucHVzaChjbGF6eik7XHJcbiAgICAgICAgICAgIFNpbmdsZXRvbi5jbGFzc1ZhbHVlcy5wdXNoKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiXHJcbiBcclxuLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMDkgMjM6MzFcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiAg5LqL5Lu25Lu75Yqh5bGe5oCnXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGltZURlbGF5RGF0YSB7XHJcblxyXG4gICAgLyoq6YeN5aSN5qyh5pWwICovXHJcbiAgICBwdWJsaWMgcmVwZWF0OiBudW1iZXI7XHJcbiAgICAvKirpl7TpmpQgKi9cclxuICAgIHB1YmxpYyBpbnRlcnZhbDogbnVtYmVyO1xyXG4gICAgLyoq5Y+C5pWwICovXHJcbiAgICBwdWJsaWMgcGFyYW06IGFueTtcclxuICAgIC8qKuWbnuiwgyAqL1xyXG4gICAgcHVibGljIGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrO1xyXG4gICAgLyoq5L2c55So5Z+fICovXHJcbiAgICBwdWJsaWMgdGhpc09iajogYW55O1xyXG4gICAgLyoq5piv5ZCm5bey5Yig6ZmkICovXHJcbiAgICBwdWJsaWMgZGVsZXRlZDogYm9vbGVhbjtcclxuICAgIC8qKui/kOihjOS6i+S7tiAqL1xyXG4gICAgcHVibGljIGVsYXBzZWQ6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgc2V0KGludGVydmFsOiBudW1iZXIsIHJlcGVhdDogbnVtYmVyLCBjYWxsYmFjazogVGltZXJDYWxsYmFjaywgdGhpc09iajogYW55LCBwYXJhbTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IGludGVydmFsO1xyXG4gICAgICAgIHRoaXMucmVwZWF0ID0gcmVwZWF0O1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLnBhcmFtID0gcGFyYW07XHJcbiAgICAgICAgdGhpcy50aGlzT2JqID0gdGhpc09iajtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgVGltZXJDYWxsYmFjayA9IChwYXJhbTogYW55KSA9PiB2b2lkXHJcblxyXG4gLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMDkgMjM6MjVcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiAg5pe26Ze05o6n5Yi25qC45b+D57G7XHJcbiAqXHJcbiAqL1xyXG5pbXBvcnQge1NpbmdsZXRvbn0gZnJvbSBcIi4vc2luZ2xldG9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZURlbGF5IGV4dGVuZHMgU2luZ2xldG9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKDAuMDEsIHRoaXMsIHRoaXMudXBkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlvZPliY3kuovku7bmiafooYznmoTmrKHmlbAgKi9cclxuICAgIHB1YmxpYyByZXBlYXQ6IG51bWJlciA9IDBcclxuICAgIHByaXZhdGUgaXRlbXM6IEFycmF5PFRpbWVEZWxheURhdGE+ID0gbmV3IEFycmF5PFRpbWVEZWxheURhdGE+KCk7XHJcbiAgICBwcml2YXRlIHRvQWRkOiBBcnJheTxUaW1lRGVsYXlEYXRhPiA9IG5ldyBBcnJheTxUaW1lRGVsYXlEYXRhPigpO1xyXG4gICAgcHJpdmF0ZSB0b1JlbW92ZTogQXJyYXk8VGltZURlbGF5RGF0YT4gPSBuZXcgQXJyYXk8VGltZURlbGF5RGF0YT4oKTtcclxuICAgIHByaXZhdGUgcG9vbDogQXJyYXk8VGltZURlbGF5RGF0YT4gPSBuZXcgQXJyYXk8VGltZURlbGF5RGF0YT4oKTtcclxuXHJcbiAgICBcclxuICAgIHByaXZhdGUgc3RhdGljIG1JbnN0YW5jZTogVGltZURlbGF5ID0gbnVsbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubUluc3RhbmNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5tSW5zdGFuY2UgPSBuZXcgVGltZURlbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLm1JbnN0YW5jZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO5rGg5a2Q5Lit6I635Y+WZGF0Yeexu1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEZyb21Qb29sKCk6IFRpbWVEZWxheURhdGEge1xyXG4gICAgICAgIGxldCB0OiBUaW1lRGVsYXlEYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLnBvb2wubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0ID0gdGhpcy5wb29sLnBvcCgpXHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHQgPSBuZXcgVGltZURlbGF5RGF0YSgpO1xyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGF0Yeexu+aUvuWbnuaxoOWtkFxyXG4gICAgICogQHBhcmFtIHQgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmV0dXJuVG9Qb29sKHQ6IFRpbWVEZWxheURhdGEpIHtcclxuICAgICAgICB0LnNldCgwLCAwLCBudWxsLCBudWxsLCBudWxsKVxyXG4gICAgICAgIHQuZWxhcHNlZCA9IDBcclxuICAgICAgICB0LmRlbGV0ZWQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMucG9vbC5wdXNoKHQpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4aXN0cyhjYWxsYmFjazogVGltZXJDYWxsYmFjaywgdGhpc09iajogYW55KSB7XHJcbiAgICAgICAgbGV0IHQgPSB0aGlzLnRvQWRkLmZpbmQoKHZhbHVlOiBUaW1lRGVsYXlEYXRhLCBpbmRleDogbnVtYmVyLCBvYmo6IEFycmF5PFRpbWVEZWxheURhdGE+KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jYWxsYmFjayA9PSBjYWxsYmFjayAmJiB2YWx1ZS50aGlzT2JqID09IHRoaXNPYmpcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBpZiAodCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHQgPSB0aGlzLml0ZW1zLmZpbmQoKHZhbHVlOiBUaW1lRGVsYXlEYXRhLCBpbmRleDogbnVtYmVyLCBvYmo6IEFycmF5PFRpbWVEZWxheURhdGE+KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jYWxsYmFjayA9PSBjYWxsYmFjayAmJiB2YWx1ZS50aGlzT2JqID09IHRoaXNPYmpcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmICh0ICE9IG51bGwgJiYgIXQuZGVsZXRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkKGludGVydmFsOiBudW1iZXIsIHJlcGVhdDogbnVtYmVyLCBjYWxsYmFjazogVGltZXJDYWxsYmFjaywgdGhpc09iajogYW55LCBjYWxsYmFja1BhcmFtOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHQ6IFRpbWVEZWxheURhdGE7XHJcbiAgICAgICAgdCA9IHRoaXMuaXRlbXMuZmluZCgodmFsdWU6IFRpbWVEZWxheURhdGEsIGluZGV4OiBudW1iZXIsIG9iajogQXJyYXk8VGltZURlbGF5RGF0YT4pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmNhbGxiYWNrID09IGNhbGxiYWNrICYmIHZhbHVlLnRoaXNPYmogPT0gdGhpc09ialxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHQgPSB0aGlzLnRvQWRkLmZpbmQoKHZhbHVlOiBUaW1lRGVsYXlEYXRhLCBpbmRleDogbnVtYmVyLCBvYmo6IEFycmF5PFRpbWVEZWxheURhdGE+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUuY2FsbGJhY2sgPT0gY2FsbGJhY2sgJiYgdmFsdWUudGhpc09iaiA9PSB0aGlzT2JqXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHQgPSB0aGlzLmdldEZyb21Qb29sKCk7XHJcbiAgICAgICAgICAgIHRoaXMudG9BZGQucHVzaCh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHQuc2V0KGludGVydmFsLCByZXBlYXQsIGNhbGxiYWNrLCB0aGlzT2JqLCBjYWxsYmFja1BhcmFtKTtcclxuICAgICAgICB0LmRlbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0LmVsYXBzZWQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRVcGRhdGUoY2FsbGJhY2s6IFRpbWVyQ2FsbGJhY2ssIHRoaXNPYmo6IGFueSwgY2FsbGJhY2tQYXJhbTogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuYWRkKDAuMDAxLCAwLCBjYWxsYmFjaywgdGhpc09iaiwgY2FsbGJhY2tQYXJhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZShjYWxsYmFjazogVGltZXJDYWxsYmFjaywgdGhpc09iajogYW55KSB7XHJcbiAgICAgICAgbGV0IGZpbmRpbmRleCA9IC0xXHJcbiAgICAgICAgbGV0IHQgPSB0aGlzLnRvQWRkLmZpbmQoKHZhbHVlOiBUaW1lRGVsYXlEYXRhLCBpbmRleDogbnVtYmVyLCBvYmo6IEFycmF5PFRpbWVEZWxheURhdGE+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5jYWxsYmFjayA9PSBjYWxsYmFjayAmJiB2YWx1ZS50aGlzT2JqID09IHRoaXNPYmopIHtcclxuICAgICAgICAgICAgICAgIGZpbmRpbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9BZGQuc3BsaWNlKGZpbmRpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMucmV0dXJuVG9Qb29sKHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdCA9IHRoaXMuaXRlbXMuZmluZCgodmFsdWU6IFRpbWVEZWxheURhdGEsIGluZGV4OiBudW1iZXIsIG9iajogQXJyYXk8VGltZURlbGF5RGF0YT4pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmNhbGxiYWNrID09IGNhbGxiYWNrICYmIHZhbHVlLnRoaXNPYmogPT0gdGhpc09iajtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodCAhPSBudWxsKVxyXG4gICAgICAgICAgICB0LmRlbGV0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGFzdFRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGRlbHRhVGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuZGVsdGFUaW1lID0gKExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5sYXN0VGltZSkgLyAxMDAwO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0ID0gdGhpcy5pdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgIGlmICh0LmRlbGV0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9SZW1vdmUucHVzaCh0KTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0LmVsYXBzZWQgKz0gdGhpcy5kZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIGlmICh0LmVsYXBzZWQgPCB0LmludGVydmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdC5lbGFwc2VkID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0LnJlcGVhdCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHQucmVwZWF0LS07XHJcbiAgICAgICAgICAgICAgICBpZiAodC5yZXBlYXQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHQuZGVsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b1JlbW92ZS5wdXNoKHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVwZWF0ID0gdC5yZXBlYXQ7XHJcbiAgICAgICAgICAgIGlmICh0LmNhbGxiYWNrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5jYWxsYmFjay5jYWxsKHQudGhpc09iaiwgdC5wYXJhbSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHQuZGVsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMudG9SZW1vdmUubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChsZW4pIHtcclxuICAgICAgICAgICAgbGV0IHQgPSB0aGlzLnRvUmVtb3ZlLnBvcCgpO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YodCk7XHJcbiAgICAgICAgICAgIGlmICh0LmRlbGV0ZWQgJiYgaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV0dXJuVG9Qb29sKHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxlbi0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZW4gPSB0aGlzLnRvQWRkLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAobGVuKSB7XHJcbiAgICAgICAgICAgIGxldCB0ID0gdGhpcy50b0FkZC5wb3AoKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHQpO1xyXG4gICAgICAgICAgICBsZW4tLTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgRXZlbnROb2RlIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtbm9kZSc7XHJcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJy4uL2V2ZW50L2V2ZW50LWRhdGEnO1xyXG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gJy4vZGF0YS1iYXNlJztcclxuaW1wb3J0IHsgSU1hbmFnZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvaS1tYW5hZ2VyJztcclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0wOSAxNTo1MVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOaVsOaNrueuoeeQhuexu1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGFNYW5hZ2VyIGV4dGVuZHMgRXZlbnROb2RlIGltcGxlbWVudHMgSU1hbmFnZXIge1xyXG5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogRGF0YU1hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpEYXRhTWFuYWdlciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IERhdGFNYW5hZ2VyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRhdGFzOiBNYXA8c3RyaW5nLCBEYXRhQmFzZT4gPSBuZXcgTWFwPHN0cmluZywgRGF0YUJhc2U+KCk7XHJcblxyXG4gICAgc2V0dXAoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kYXRhcy5jbGVhcigpO1xyXG4gICAgfVxyXG4gIFxyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlcihkYXRhOiBEYXRhQmFzZSk6IERhdGFNYW5hZ2VyIHtcclxuICAgICAgICB0aGlzLmRhdGFzLnNldChkYXRhLmNtZCwgZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldChjbWQ6IHN0cmluZyk6IERhdGFCYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhcy5nZXQoY21kKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4iLCJcclxuXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMiAxNzoxM1xyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOS6i+S7tuaVsOaNruWumuS5ieexu1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEV2ZW50RGF0YSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY21kOiBzdHJpbmcsIG9iajogYW55ID0gbnVsbCwgaXNTdG9wOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmNtZCA9IGNtZDtcclxuICAgICAgICB0aGlzLmRhdGEgPSBvYmo7XHJcbiAgICAgICAgdGhpcy5pc1N0b3AgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY21kOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZGF0YTogYW55O1xyXG4gICAgcHVibGljIGlzU3RvcCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+r6YCf5Yib5bu65LqL5Lu25pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gY21kXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICogQHBhcmFtIGlzU3RvcFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShjbWQ6IHN0cmluZywgZGF0YTogYW55ID0gbnVsbCwgaXNTdG9wOiBib29sZWFuID0gZmFsc2UpOiBFdmVudERhdGEge1xyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnREYXRhKGNtZCwgZGF0YSwgaXNTdG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcCgpIHtcclxuICAgICAgICB0aGlzLmlzU3RvcCA9IHRydWVcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wMS0yMCAwMDoyNFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOS6i+S7tuWbnuiwg+WHveaVsOWumuS5iVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEV2ZW50RnVuYyB7XHJcblxyXG4gICAgcHJpdmF0ZSBtX3RoaXM6IGFueTtcclxuICAgIHByaXZhdGUgbV9jYjogRnVuY3Rpb247XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHRoaXNPYmo6IGFueSwgY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5tX3RoaXMgPSB0aGlzT2JqO1xyXG4gICAgICAgIHRoaXMubV9jYiA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnZva2UoLi4uYXJnczogYW55W10pIHtcclxuICAgICAgICB0aGlzLm1fY2IuY2FsbCh0aGlzLm1fdGhpcywgLi4uYXJncyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBFdmVudE5vZGUsIEV2ZW50Q29udGV4dCwgRXZlbnRDYWxsYmFja0xpc3RlbmVyIH0gZnJvbSAnLi9ldmVudC1ub2RlJztcclxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnLi9ldmVudC1kYXRhJztcclxuaW1wb3J0IHsgSU1hbmFnZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvaS1tYW5hZ2VyJztcclxuXHJcblxyXG4gLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDEtMTggMTY6MjBcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDkuovku7bnrqHnkIblmahcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFdmVudE1hbmFnZXIgZXh0ZW5kcyBFdmVudE5vZGUgaW1wbGVtZW50cyBJTWFuYWdlciB7XHJcblxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBFdmVudE1hbmFnZXIgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkV2ZW50TWFuYWdlciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IEV2ZW50TWFuYWdlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgXHJcblxyXG4gICAgc2V0dXAoKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRDb250ZXh0LmV2ZW50Tm9kZXMuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBFdmVudENvbnRleHQuZXZlbnROb2Rlcy5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOS4gOS4qua2iOaBr+ebkeWQrOiKgueCuVxyXG4gICAgICogQHBhcmFtIG5vZGVcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlKG5vZGU6IEV2ZW50Tm9kZSk6IHZvaWQge1xyXG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lckFsbCgpO1xyXG4gICAgICAgIEV2ZW50Q29udGV4dC5ldmVudE5vZGVzLmRlbGV0ZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7meaJgOacieacrOWcsOa2iOaBr+iKgueCuemAmuefpea2iOaBr1xyXG4gICAgICogQHBhcmFtIGVkXHJcbiAgICAgKi9cclxuICAgIGRpc3BhdGNoRXZlbnRMb2NhbEFsbChlZDogRXZlbnREYXRhKSB7XHJcbiAgICAgICAgRXZlbnRDb250ZXh0LmV2ZW50Tm9kZXMuZm9yRWFjaCgoZW46IEV2ZW50Tm9kZSkgPT4ge1xyXG4gICAgICAgICAgICBlbi5kaXNwYXRjaEV2ZW50KGVkKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uZ5omA5pyJ5pys5Zyw5raI5oGv6IqC54K56YCa55+l5raI5oGvXHJcbiAgICAgKiBAcGFyYW0gY21kXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICovXHJcbiAgICBkaXNwYXRjaEV2ZW50TG9jYWxBbGxCeUNtZChjbWQ6IHN0cmluZyB8IG51bWJlciwgZGF0YTogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIEV2ZW50Q29udGV4dC5ldmVudE5vZGVzLmZvckVhY2goKGVuOiBFdmVudE5vZGUpID0+IHtcclxuICAgICAgICAgICAgZW4uZGlzcGF0Y2hFdmVudEJ5Q21kKGNtZCwgZGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDkuIDkuKrmtojmga/nm5HlkKzlmahcclxuICAgICAqIEBwYXJhbSB0eXBlIOa2iOaBr+exu+Wei1xyXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIOWbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIHRhcmdldCDkvZznlKjlr7nosaFcclxuICAgICAqIEBwYXJhbSBwcmlvcml0eSDmtojmga/nmoTkvJjlhYjnuqdcclxuICAgICAqIEBwYXJhbSBvbmNlIOaYr+WQpuWPquebkeWQrOS4gOasoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkTGlzdGVuZXIodHlwZTogc3RyaW5nIHwgbnVtYmVyLCBjYWxsQmFjazogRXZlbnRDYWxsYmFja0xpc3RlbmVyLCB0YXJnZXQ6IGFueSwgcHJpb3JpdHk6IG51bWJlciA9IDAsIG9uY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIEV2ZW50Tm9kZS5hZGRHbG9iYWxMaXN0ZW5lcih0eXBlLGNhbGxCYWNrLHRhcmdldCxwcmlvcml0eSxvbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOS4gOS4qua2iOaBr+ebkeWQrOWZqFxyXG4gICAgICogQHBhcmFtIHR5cGUg5raI5oGvaWRcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlm57osIPlh73mlbBcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5L2c55So55qE5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0ZW5lcih0eXBlOiBzdHJpbmcgfCBudW1iZXIsIGNhbGxCYWNrOiBFdmVudENhbGxiYWNrTGlzdGVuZXIsIHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgRXZlbnROb2RlLnJlbW92ZUdsb2JhbExpc3RlbmVyKHR5cGUsY2FsbEJhY2ssdGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuWtmOWcqOi/meS4quebkeWQrOa2iOaBr1xyXG4gICAgICogQHBhcmFtIHR5cGUg5raI5oGv57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5Zue6LCD57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOWbnuiwg+WvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFzTGlzdGVuZXIodHlwZTogc3RyaW5nIHwgbnVtYmVyLCBjYWxsQmFjazogRXZlbnRDYWxsYmFja0xpc3RlbmVyLCB0YXJnZXQ6IGFueSkge1xyXG4gICAgICAgIEV2ZW50Tm9kZS5oYXNHbG9iYWxMaXN0ZW5lcih0eXBlLGNhbGxCYWNrLHRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmtL7lj5Hmtojmga9cclxuICAgICAqIEBwYXJhbSBjbWQg5raI5oGvaWRcclxuICAgICAqIEBwYXJhbSBkYXRhIOa2iOaBr+WGheWuuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcGF0Y2hFdmVudEJ5Q21kKGNtZDogc3RyaW5nIHwgbnVtYmVyLCBkYXRhOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgRXZlbnROb2RlLmRpc3BhdGNoR2xvYmFsQnlDbWQoY21kLGRhdGEpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICcuL2V2ZW50LWRhdGEnO1xyXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuLi8uLi9jb3JlL2xvZyc7XHJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gJy4uLy4uL2NvcmUvc2luZ2xldG9uJztcclxuXHJcblxyXG4gLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDEtMTggMTY6MjBcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDmiYDmnInpnIDopoHnm5Hmjqfkuovku7boioLngrnnmoTln7rnsbtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFdmVudE5vZGUgZXh0ZW5kcyBTaW5nbGV0b24ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgRXZlbnRDb250ZXh0LmV2ZW50Tm9kZXMuc2V0KHRoaXMsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyA9PT09PT09PT09PT09PSAgTG9jYWwgRXZlbnQgU2VjdGlvbiA9PT09PT09PT09PT09PVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBtX2dsb2JhbEV2ZW50RGF0YTogQXJyYXk8RXZlbnREYXRhPiA9IG5ldyBBcnJheTxFdmVudERhdGE+KCk7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBtX2dsb2JhbEV2ZW50RGljdDogRXZlbnRMaXN0ZW5lckNsYXNzRGljdCA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUdsb2JhbERhdGEoY21kLCBkYXRhKTogRXZlbnREYXRhIHtcclxuICAgICAgICBsZXQgZWQ6IEV2ZW50RGF0YTtcclxuICAgICAgICBpZiAoRXZlbnROb2RlLm1fZ2xvYmFsRXZlbnREYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZWQgPSBFdmVudE5vZGUubV9nbG9iYWxFdmVudERhdGEucG9wKCk7XHJcbiAgICAgICAgICAgIGVkLmNtZCA9IGNtZDtcclxuICAgICAgICAgICAgZWQuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGVkLmlzU3RvcCA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVkID0gbmV3IEV2ZW50RGF0YShjbWQsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmV0dXJuR2xvYmFsRXZlbnREYXRhKGVkOiBFdmVudERhdGEpIHtcclxuICAgICAgICBlZC5kYXRhID0gbnVsbDtcclxuICAgICAgICBlZC5jbWQgPSBudWxsO1xyXG4gICAgICAgIGVkLmlzU3RvcCA9IGZhbHNlO1xyXG4gICAgICAgIEV2ZW50Tm9kZS5tX2dsb2JhbEV2ZW50RGF0YS5wdXNoKGVkKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5LiA5Liq5raI5oGv55uR5ZCs5ZmoXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDmtojmga/nsbvlnotcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlm57osIPlh73mlbBcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5L2c55So5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gcHJpb3JpdHkg5raI5oGv55qE5LyY5YWI57qnXHJcbiAgICAgKiBAcGFyYW0gb25jZSDmmK/lkKblj6rnm5HlkKzkuIDmrKFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhZGRHbG9iYWxMaXN0ZW5lcih0eXBlOiBzdHJpbmcgfCBudW1iZXIsIGNhbGxCYWNrOiBFdmVudENhbGxiYWNrTGlzdGVuZXIsIHRhcmdldDogYW55LCBwcmlvcml0eTogbnVtYmVyID0gMCwgb25jZTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgdHlwZSA9IHR5cGUudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgaW5mbzogRXZlbnRMaXN0ZW5lckluZm9EYXRhID0ge1xyXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICBjYWxsQmFjazogY2FsbEJhY2ssXHJcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxyXG4gICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHksXHJcbiAgICAgICAgICAgIG9uY2U6IG9uY2VcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgYXJyYXkgPSBFdmVudE5vZGUubV9nbG9iYWxFdmVudERpY3RbdHlwZV07XHJcbiAgICAgICAgbGV0IGhhcyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBwb3MgPSAwO1xyXG4gICAgICAgIGlmIChhcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC50YXJnZXQgPT0gdGFyZ2V0ICYmIGVsZW1lbnQuY2FsbEJhY2sgPT0gY2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQucHJpb3JpdHkgPiBpbmZvLnByaW9yaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFycmF5ID0gbmV3IEFycmF5PEV2ZW50TGlzdGVuZXJJbmZvRGF0YT4oKTtcclxuICAgICAgICAgICAgRXZlbnROb2RlLm1fZ2xvYmFsRXZlbnREaWN0W3R5cGVdID0gYXJyYXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoYXMpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIumHjeWkjeazqOWGjOa2iOaBr++8mnR5cGU9XCIgKyB0eXBlKTtcclxuICAgICAgICAgICAgTG9nLmVycm9yKFwi6YeN5aSN5rOo5YaM5raI5oGv77yadHlwZT1cIiArIHR5cGUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKHBvcywgMCwgaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e76Zmk5LiA5Liq5raI5oGv55uR5ZCs5ZmoXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDmtojmga9pZFxyXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIOWbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIHRhcmdldCDkvZznlKjnmoTlr7nosaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVHbG9iYWxMaXN0ZW5lcih0eXBlOiBzdHJpbmcgfCBudW1iZXIsIGNhbGxCYWNrOiBFdmVudENhbGxiYWNrTGlzdGVuZXIsIHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgdHlwZSA9IHR5cGUudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgaW5mbzogRXZlbnRMaXN0ZW5lckluZm9EYXRhID0gbnVsbDtcclxuICAgICAgICBsZXQgYXJyYXkgPSBFdmVudE5vZGUubV9nbG9iYWxFdmVudERpY3RbdHlwZV07XHJcbiAgICAgICAgaWYgKGFycmF5ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IGluZm9JbmRleCA9IC0xO1xyXG4gICAgICAgICAgICBhcnJheS5ldmVyeSgodmFsdWU6IEV2ZW50TGlzdGVuZXJJbmZvRGF0YSwgaW5kZXg6IG51bWJlciwgYXJyYXk6IEV2ZW50TGlzdGVuZXJJbmZvRGF0YVtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUudGFyZ2V0ID09IHRhcmdldCAmJiB2YWx1ZS5jYWxsQmFjayA9PSBjYWxsQmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZm9JbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGluZm8gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5mb0luZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaW5mb0luZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuWtmOWcqOi/meS4quebkeWQrOa2iOaBr1xyXG4gICAgICogQHBhcmFtIHR5cGUg5raI5oGv57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5Zue6LCD57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOWbnuiwg+WvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGhhc0dsb2JhbExpc3RlbmVyKHR5cGU6IHN0cmluZyB8IG51bWJlciwgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciwgdGFyZ2V0OiBhbnkpIHtcclxuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBhcnJheSA9IEV2ZW50Tm9kZS5tX2dsb2JhbEV2ZW50RGljdFt0eXBlXTtcclxuICAgICAgICBpZiAoYXJyYXkpIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBhcnJheS5maW5kSW5kZXgoKG9iaiwgaW5kZXgsIGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai50YXJnZXQgPT0gdGFyZ2V0ICYmIG9iai5jYWxsQmFjayA9PSBjYWxsQmFjaztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGZsYWcgPSBpbmRleCAhPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmtL7lj5Hmtojmga9cclxuICAgICAqIEBwYXJhbSBlZCDmtL7lj5HnmoTmtojmga/lhoXlrrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkaXNwYXRjaEdsb2JhbChlZDogRXZlbnREYXRhKSB7XHJcbiAgICAgICAgRXZlbnROb2RlLl9kaXNwYXRjaEdsb2JhbChlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmtL7lj5Hmtojmga9cclxuICAgICAqIEBwYXJhbSBjbWQg5raI5oGvaWRcclxuICAgICAqIEBwYXJhbSBkYXRhIOa2iOaBr+WGheWuuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRpc3BhdGNoR2xvYmFsQnlDbWQoY21kOiBzdHJpbmcgfCBudW1iZXIsIGRhdGE6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBsZXQgZWQgPSBFdmVudE5vZGUuY3JlYXRlR2xvYmFsRGF0YShjbWQsIGRhdGEpO1xyXG4gICAgICAgIEV2ZW50Tm9kZS5fZGlzcGF0Y2hHbG9iYWwoZWQpO1xyXG4gICAgICAgIGlmIChlZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIEV2ZW50Tm9kZS5yZXR1cm5HbG9iYWxFdmVudERhdGEoZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfZGlzcGF0Y2hHbG9iYWwoZWQ6IEV2ZW50RGF0YSkge1xyXG4gICAgICAgIGxldCBhcnJheSA9IEV2ZW50Tm9kZS5tX2dsb2JhbEV2ZW50RGljdFtlZC5jbWRdO1xyXG4gICAgICAgIGlmIChhcnJheSAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IGFycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uY2FsbEJhY2sgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZm8uY2FsbEJhY2suY2FsbChpbmZvLnRhcmdldCwgZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8ub25jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpLS0sIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVkLmlzU3RvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyA9PT09PT09PT09PT09PSAgTG9jYWwgRXZlbnQgU2VjdGlvbiA9PT09PT09PT09PT09PVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBwcml2YXRlIG1fZXZlbnREYXRhOiBBcnJheTxFdmVudERhdGE+ID0gbmV3IEFycmF5PEV2ZW50RGF0YT4oKTtcclxuICAgIHByaXZhdGUgbV9ldmVudERpY3Q6IEV2ZW50TGlzdGVuZXJDbGFzc0RpY3QgPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUV2ZW50RGF0YShjbWQsIGRhdGEpOiBFdmVudERhdGEge1xyXG4gICAgICAgIGxldCBlZDogRXZlbnREYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLm1fZXZlbnREYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZWQgPSB0aGlzLm1fZXZlbnREYXRhLnBvcCgpO1xyXG4gICAgICAgICAgICBlZC5jbWQgPSBjbWQ7XHJcbiAgICAgICAgICAgIGVkLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICBlZC5pc1N0b3AgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlZCA9IG5ldyBFdmVudERhdGEoY21kLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmV0dXJuRXZlbnREYXRhKGVkOiBFdmVudERhdGEpIHtcclxuICAgICAgICBlZC5kYXRhID0gbnVsbDtcclxuICAgICAgICBlZC5jbWQgPSBudWxsO1xyXG4gICAgICAgIGVkLmlzU3RvcCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV9ldmVudERhdGEucHVzaChlZClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOS4gOS4qua2iOaBr+ebkeWQrOWZqFxyXG4gICAgICogQHBhcmFtIHR5cGUg5raI5oGv57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOS9nOeUqOWvueixoVxyXG4gICAgICogQHBhcmFtIHByaW9yaXR5IOa2iOaBr+eahOS8mOWFiOe6p1xyXG4gICAgICogQHBhcmFtIG9uY2Ug5piv5ZCm5Y+q55uR5ZCs5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZyB8IG51bWJlciwgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciwgdGFyZ2V0OiBhbnksIHByaW9yaXR5OiBudW1iZXIgPSAwLCBvbmNlOiBib29sZWFuID0gZmFsc2UpOkV2ZW50TGlzdGVuZXJJbmZvRGF0YSAgIHtcclxuICAgICAgICB0eXBlID0gdHlwZS50b1N0cmluZygpO1xyXG4gICAgICAgIGxldCBpbmZvOiBFdmVudExpc3RlbmVySW5mb0RhdGEgPSB7XHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgIGNhbGxCYWNrOiBjYWxsQmFjayxcclxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXHJcbiAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcclxuICAgICAgICAgICAgb25jZTogb25jZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBhcnJheSA9IHRoaXMubV9ldmVudERpY3RbdHlwZV07XHJcbiAgICAgICAgbGV0IGhhcyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBwb3MgPSAwO1xyXG4gICAgICAgIGlmIChhcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC50YXJnZXQgPT0gdGFyZ2V0ICYmIGVsZW1lbnQuY2FsbEJhY2sgPT0gY2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQucHJpb3JpdHkgPiBpbmZvLnByaW9yaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFycmF5ID0gbmV3IEFycmF5PEV2ZW50TGlzdGVuZXJJbmZvRGF0YT4oKTtcclxuICAgICAgICAgICAgdGhpcy5tX2V2ZW50RGljdFt0eXBlXSA9IGFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaGFzKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCLph43lpI3ms6jlhozmtojmga/vvJp0eXBlPVwiICsgdHlwZSk7XHJcbiAgICAgICAgICAgIExvZy5lcnJvcihcIumHjeWkjeazqOWGjOa2iOaBr++8mnR5cGU9XCIgKyB0eXBlKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhcnJheS5zcGxpY2UocG9zLCAwLCBpbmZvKTtcclxuICAgICAgICAgICAgcmV0dXJuIGluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e76Zmk5LiA5Liq5raI5oGv55uR5ZCs5ZmoXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDmtojmga9pZFxyXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIOWbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIHRhcmdldCDkvZznlKjnmoTlr7nosaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nIHwgbnVtYmVyLCBjYWxsQmFjazogRXZlbnRDYWxsYmFja0xpc3RlbmVyLCB0YXJnZXQ6IGFueSkge1xyXG4gICAgICAgIHR5cGUgPSB0eXBlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IGluZm86IEV2ZW50TGlzdGVuZXJJbmZvRGF0YSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5tX2V2ZW50RGljdFt0eXBlXTtcclxuICAgICAgICBpZiAoYXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgaW5mb0luZGV4ID0gLTE7XHJcbiAgICAgICAgICAgIGFycmF5LmV2ZXJ5KCh2YWx1ZTogRXZlbnRMaXN0ZW5lckluZm9EYXRhLCBpbmRleDogbnVtYmVyLCBhcnJheTogRXZlbnRMaXN0ZW5lckluZm9EYXRhW10pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50YXJnZXQgPT0gdGFyZ2V0ICYmIHZhbHVlLmNhbGxCYWNrID09IGNhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmZvSW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpbmZvSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyQWxsKCkge1xyXG4gICAgICAgIHRoaXMubV9ldmVudERhdGEgPSBuZXcgQXJyYXk8RXZlbnREYXRhPigpO1xyXG4gICAgICAgIHRoaXMubV9ldmVudERpY3QgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuWtmOWcqOi/meS4quebkeWQrOa2iOaBr1xyXG4gICAgICogQHBhcmFtIHR5cGUg5raI5oGv57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5Zue6LCD57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOWbnuiwg+WvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFzRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcgfCBudW1iZXIsIGNhbGxCYWNrOiBFdmVudENhbGxiYWNrTGlzdGVuZXIsIHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLm1fZXZlbnREaWN0W3R5cGVdO1xyXG4gICAgICAgIGlmIChhcnJheSkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGFycmF5LmZpbmRJbmRleCgob2JqLCBpbmRleCwgYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnRhcmdldCA9PSB0YXJnZXQgJiYgb2JqLmNhbGxCYWNrID09IGNhbGxCYWNrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZmxhZyA9IGluZGV4ICE9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa0vuWPkea2iOaBr1xyXG4gICAgICogQHBhcmFtIGVkIOa0vuWPkeeahOa2iOaBr+WGheWuuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcGF0Y2hFdmVudChlZDogRXZlbnREYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudChlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmtL7lj5Hmtojmga9cclxuICAgICAqIEBwYXJhbSBjbWQg5raI5oGvaWRcclxuICAgICAqIEBwYXJhbSBkYXRhIOa2iOaBr+WGheWuuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcGF0Y2hFdmVudEJ5Q21kKGNtZDogc3RyaW5nIHwgbnVtYmVyLCBkYXRhOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IGVkID0gdGhpcy5jcmVhdGVFdmVudERhdGEoY21kLCBkYXRhKTtcclxuICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KGVkKTtcclxuICAgICAgICBpZiAoZWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVybkV2ZW50RGF0YShlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Rpc3BhdGNoRXZlbnQoZWQ6IEV2ZW50RGF0YSkge1xyXG4gICAgICAgIGxldCBhcnJheSA9IHRoaXMubV9ldmVudERpY3RbZWQuY21kXTtcclxuICAgICAgICBpZiAoYXJyYXkgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZm8gPSBhcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLmNhbGxCYWNrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZvLmNhbGxCYWNrLmNhbGwoaW5mby50YXJnZXQsIGVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLm9uY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaS0tLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlZC5pc1N0b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBFdmVudExpc3RlbmVySW5mb0RhdGEgPVxyXG4gICAge1xyXG4gICAgICAgIHR5cGU6IHN0cmluZyxcclxuICAgICAgICBjYWxsQmFjazogRXZlbnRDYWxsYmFja0xpc3RlbmVyLFxyXG4gICAgICAgIHRhcmdldDogYW55LFxyXG4gICAgICAgIHByaW9yaXR5OiBudW1iZXIsXHJcbiAgICAgICAgb25jZTogYm9vbGVhblxyXG4gICAgfVxyXG5cclxuZXhwb3J0IHR5cGUgRXZlbnRMaXN0ZW5lckNsYXNzRGljdCA9IHtcclxuICAgIFtrZXk6IHN0cmluZ106IEFycmF5PEV2ZW50TGlzdGVuZXJJbmZvRGF0YT5cclxufVxyXG5cclxuXHJcbmV4cG9ydCB0eXBlIEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciA9ICgoZWQ6IEV2ZW50RGF0YSkgPT4gdm9pZCk7XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRDb250ZXh0IHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGV2ZW50Tm9kZXM6IE1hcDxFdmVudE5vZGUsIEV2ZW50Tm9kZT4gPSBuZXcgTWFwPEV2ZW50Tm9kZSwgRXZlbnROb2RlPigpO1xyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IEhhbmRsZXIgPSBMYXlhLkhhbmRsZXI7XHJcbmltcG9ydCB7VXRpbFN0cmluZ30gZnJvbSBcIi4uLy4uL3V0aWwvc3RyaW5nXCI7XHJcbmltcG9ydCB7UmVzTWFuYWdlcn0gZnJvbSBcIi4uL3Jlcy9yZXMtbWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tICcuLi8uLi9jb3JlL3NpbmdsZXRvbic7XHJcbmltcG9ydCB7IElNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ktbWFuYWdlcic7XHJcbmltcG9ydCB7IERpY3Rpb25hcnkgfSBmcm9tICcuLi8uLi9zdHJ1Y3R1cmUvZGljdGlvbmFyeSc7XHJcbmltcG9ydCB7IEpzb25UZW1wbGF0ZSB9IGZyb20gJy4vanNvbi10ZW1wbGF0ZSc7XHJcbmltcG9ydCB7IENvbmZpZ0RhdGEgfSBmcm9tICcuLi8uLi9zZXR0aW5nL2NvbmZpZyc7XHJcbmltcG9ydCB7IExvZyB9IGZyb20gJy4uLy4uL2NvcmUvbG9nJztcclxuXHJcbiAgLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMTIgMTQ6NDBcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDphY3nva7ooajnrqHnkIZcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBKc29uTWFuYWdlciBleHRlbmRzIFNpbmdsZXRvbiBpbXBsZW1lbnRzIElNYW5hZ2VyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWtmOaUvuaJgOaciemFjee9ruihqOaooeadv1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1fRGljVGVtcGxhdGU6IERpY3Rpb25hcnk8SnNvblRlbXBsYXRlPiA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOWtmOaUvuaJgOacieino+aekOi/h+eahOmFjee9ruihqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1fRGljRGF0YTogRGljdGlvbmFyeTxhbnk+ID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBKc29uTWFuYWdlciA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6IEpzb25NYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgSnNvbk1hbmFnZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeuoeeQhuWZqOe7n+S4gOiuvue9ruaWueazlVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0dXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX0RpY1RlbXBsYXRlID0gbmV3IERpY3Rpb25hcnk8SnNvblRlbXBsYXRlPigpO1xyXG4gICAgICAgIHRoaXMubV9EaWNEYXRhID0gbmV3IERpY3Rpb25hcnk8YW55PigpO1xyXG4gICAgICAgIHRoaXMubG9hZChDb25maWdEYXRhLiQuanNvblRlbXBsYXRlTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog566h55CG5Zmo57uf5LiA6ZSA5q+B5pa55rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudW5sb2FkQWxsKCk7XHJcbiAgICAgICAgaWYgKHRoaXMubV9EaWNUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1fRGljVGVtcGxhdGUuY2xlYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0RpY1RlbXBsYXRlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubV9EaWNEYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaWNEYXRhLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaWNEYXRhID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICog5Yqg6L295omA5pyJ55qE5pWw5o2u5qih5p2/XHJcbiAgICAgKiBAcGFyYW0gbGlzdFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxvYWQobGlzdDogSnNvblRlbXBsYXRlW10pOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgTG9nLmxvZyhcIltsb2FkXeWKoOi9vemFjee9ruihqDpcIiArIGxpc3RbaV0udXJsKTtcclxuICAgICAgICAgICAgdGhpcy5tX0RpY1RlbXBsYXRlLmFkZChsaXN0W2ldLm5hbWUsIGxpc3RbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bkuIDkuKrljZXkuIDnu5PmnoTnmoTmlbDmja5cclxuICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUYWJsZShuYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5tX0RpY0RhdGEudmFsdWUobmFtZSk7XHJcbiAgICAgICAgaWYoZGF0YT09bnVsbCl7XHJcbiAgICAgICAgICAgIGRhdGEgPSBSZXNNYW5hZ2VyLiQuZ2V0UmVzKHRoaXMubV9EaWNUZW1wbGF0ZS52YWx1ZShuYW1lKS51cmwpO1xyXG4gICAgICAgICAgICB0aGlzLm1fRGljRGF0YS5hZGQobmFtZSxkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bkuIDooYzlpI3lkIjooajnmoTmlbDmja5cclxuICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUYWJsZVJvdyhuYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nfG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGFibGUobmFtZSlba2V5XTtcclxuICAgIH1cclxuXHJcbiAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y246L295oyH5a6a55qE5qih5p2/XHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1bmxvYWQobmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRlbXBsYXRlID0gdGhpcy5tX0RpY1RlbXBsYXRlLnZhbHVlKG5hbWUpO1xyXG4gICAgICAgIGlmICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1fRGljRGF0YS5yZW1vdmUobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJlc01hbmFnZXIuJC5yZWxlYXNlVXJsKHRlbXBsYXRlLnVybCk7XHJcbiAgICAgICAgdGhpcy5tX0RpY1RlbXBsYXRlLnJlbW92ZShuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWNuOi9veaJgOacieeahOaooeadv1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1bmxvYWRBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1fRGljVGVtcGxhdGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5tX0RpY1RlbXBsYXRlLmZvcmVhY2goZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy51bmxvYWQoa2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tX0RpY0RhdGEuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLm1fRGljVGVtcGxhdGUuY2xlYXIoKTtcclxuICAgIH1cclxufVxyXG4iLCJcclxuXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMiAxMDo1OVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOmFjee9ruihqOaooeadv+mhuVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEpzb25UZW1wbGF0ZSB7XHJcblxyXG4gICAgcHVibGljIHVybDogc3RyaW5nO1x0Ly/otYTmupB1cmxcclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7IC8v5ZCN56ew77ya55So5LqO5p+l5om+6K+l5pWw5o2u57uT5p6EXHJcblxyXG4gICAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnRGdW5jIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGF0YSc7XHJcbmltcG9ydCB7IFJlc0l0ZW0gfSBmcm9tICcuL3Jlcy1pdGVtJztcclxuXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0wOSAxOTozMVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOWcuuaZr+euoeeQhuWZqOaJgOmcgOeahOi1hOa6kOWMheWumuS5iVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJlc0dyb3VwIHtcclxuXHJcbiAgICAvKirliqDovb3ov5vluqYgKi9cclxuICAgIHB1YmxpYyBwcm9ncmVzczogbnVtYmVyID0gMDtcclxuICAgIC8qKuWKoOi9vei1hOa6kCAqL1xyXG4gICAgcHVibGljIG5lZWRMb2FkOiBBcnJheTxSZXNJdGVtPiA9IG5ldyBBcnJheTxSZXNJdGVtPigpO1xyXG4gICAgLyoq5Yqg6L295pe255qE5Zue6LCD5o6l5Y+jLOS4gOiIrOeUqOS9nOe7meWKoOi9veeql+iuvue9rui/m+W6piAqL1xyXG4gICAgcHVibGljIGxvYWRJdGVtOiBFdmVudEZ1bmM7XHJcbiAgICAvKirnu5PmnZ/ml7bnmoTlm57osIPmjqXlj6MgKi9cclxuICAgIHB1YmxpYyBmaW5pc2g6IEV2ZW50RnVuYztcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWQkei1hOa6kOe7hOa3u+WKoOebruagh1xyXG4gICAgICogQHBhcmFtIHVybCDnm7jlr7not6/lvoRcclxuICAgICAqIEBwYXJhbSB0eXBlIOexu+WeiyBcclxuICAgICAqIEBwYXJhbSBpc0tlZXBNZW1vcnkg5piv5ZCm5bi46am75YaF5a2YIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkKHVybDogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGlzS2VlcE1lbW9yeSA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMubmVlZExvYWQuZmluZEluZGV4KCh2YWx1ZTogUmVzSXRlbSwgaW5kZXg6IG51bWJlciwgb2JqOiBBcnJheTxSZXNJdGVtPikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuVXJsID09IHVybFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IG5ldyBSZXNJdGVtKHVybCx0eXBlLGlzS2VlcE1lbW9yeSk7XHJcbiAgICAgICAgICAgIHRoaXMubmVlZExvYWQucHVzaChpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxufVxyXG5cclxuIiwiXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTA5IDE5OjE4XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g6LWE5rqQ5bGe5oCnXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVzSXRlbSB7XHJcbiAgICBwcml2YXRlIHVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB0eXBlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGlzS2VlcE1lbW9yeSA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHVybCx0eXBlLGlza2VlcE1lbW9yeSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVybCA9IHVybDtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuaXNLZWVwTWVtb3J5ID0gaXNrZWVwTWVtb3J5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgVXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVybFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgVHlwZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgSXNLZWVwTWVtb3J5KClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0tlZXBNZW1vcnlcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCBIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xyXG5pbXBvcnQgeyBFdmVudE5vZGUgfSBmcm9tICcuLi9ldmVudC9ldmVudC1ub2RlJztcclxuaW1wb3J0IHsgSU1hbmFnZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvaS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gJy4uLy4uL3N0cnVjdHVyZS9kaWN0aW9uYXJ5JztcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vY29yZS9sb2cnO1xyXG5pbXBvcnQgeyBSZXNJdGVtIH0gZnJvbSAnLi9yZXMtaXRlbSc7XHJcbmltcG9ydCB7IFV0aWxUaW1lIH0gZnJvbSAnLi4vLi4vdXRpbC90aW1lJztcclxuaW1wb3J0IHsgUmVzR3JvdXAgfSBmcm9tICcuL3Jlcy1ncm91cCc7XHJcbmltcG9ydCB7IFJlc0xvYWRlZCB9IGZyb20gJy4vcmVzLWxvYWRlZCc7XHJcbmltcG9ydCB7IGVudW1DbGVhclN0cmF0ZWd5LCBlbnVtQXJyYXlTb3J0T3JkZXIgfSBmcm9tICcuLi8uLi9zZXR0aW5nL2VudW0nO1xyXG5pbXBvcnQgeyBVdGlsQXJyYXkgfSBmcm9tICcuLi8uLi91dGlsL2FycmF5JztcclxuaW1wb3J0IHsgRXZlbnRGdW5jIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGF0YSc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMTIgMTM6MzNcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiAg6LWE5rqQ566h55CGICDvvIjmiYDmnInotYTmupDlnYfpgJrov4dSZXNHcm91cOeahOW9ouW8j+adpeWKoOi9ve+8iVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJlc01hbmFnZXIgZXh0ZW5kcyBFdmVudE5vZGUgaW1wbGVtZW50cyBJTWFuYWdlciB7XHJcblxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBSZXNNYW5hZ2VyID0gbnVsbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogUmVzTWFuYWdlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCkgdGhpcy5pbnN0YW5jZSA9IG5ldyBSZXNNYW5hZ2VyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WtmOaUvuaJgOacieW3suWKoOi9veeahOi1hOa6kFxyXG4gICAgcHJpdmF0ZSBtX2RpY3RSZXNJdGVtOiBNYXA8c3RyaW5nLCBSZXNJdGVtPiA9IG5ldyBNYXA8c3RyaW5nLCBSZXNJdGVtPigpO1xyXG5cclxuIFxyXG5cclxuICAgIHB1YmxpYyBzZXR1cCgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+HVVJM6I635Y+W6LWE5rqQXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSZXModXJsOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gTGF5YS5sb2FkZXIuZ2V0UmVzKHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3ljZXkuKrotYTmupBcclxuICAgICAqIEBwYXJhbSByZXNJdGVtIOi1hOa6kOS/oeaBr1xyXG4gICAgICogQHBhcmFtIHByb2dyZXNzRnVjIOWKoOi9vei/m+W6puWbnuiwg1xyXG4gICAgICogQHBhcmFtIGNvbXBsZXRlRnVjIOWKoOi9veWujOaIkOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZFJlcyhyZXNJdGVtOlJlc0l0ZW0scHJvZ3Jlc3NGdWM6RXZlbnRGdW5jLGNvbXBsZXRlRnVjOkV2ZW50RnVuYykge1xyXG5cclxuXHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChyZXNJdGVtLlVybCwgSGFuZGxlci5jcmVhdGUodGhpcywgKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WujOaIkOWbnuiwg1xyXG4gICAgICAgICAgICAgICAgaWYoY29tcGxldGVGdWMhPW51bGwpIGNvbXBsZXRlRnVjLmludm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgLy/moIforrDotYTmupBcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tX2RpY3RSZXNJdGVtLmhhcyhyZXNJdGVtLlVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fZGljdFJlc0l0ZW0uc2V0KHJlc0l0ZW0uVXJsLCByZXNJdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkxvYWQgUmVzb3VyY2UgRXJyb3LvvJpcIik7XHJcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcocmVzSXRlbS5VcmwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pLCBIYW5kbGVyLmNyZWF0ZSh0aGlzLCAocHJvZ3Jlc3M6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAvL+i/m+W6puWbnuiwg1xyXG4gICAgICAgICAgICBpZihwcm9ncmVzc0Z1YyE9bnVsbCkgcHJvZ3Jlc3NGdWMuaW52b2tlKHByb2dyZXNzKTtcclxuXHJcbiAgICAgICAgfSwgbnVsbCwgZmFsc2UpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vei1hOa6kOe7hFxyXG4gICAgICogQHBhcmFtIGxvYWRzIOi1hOa6kOS/oeaBryBcclxuICAgICAqIEBwYXJhbSBwcm9ncmVzc0Z1YyDliqDovb3ov5vluqblm57osINcclxuICAgICAqIEBwYXJhbSBjb21wbGV0ZUZ1YyDliqDovb3lrozmiJDlm57osINcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRHcm91cChsb2FkczogUmVzR3JvdXAscHJvZ3Jlc3NGdWM6RXZlbnRGdW5jLGNvbXBsZXRlRnVjOkV2ZW50RnVuYykge1xyXG4gICAgICAgIGxldCB1cmxzOiBBcnJheTxhbnk+ID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICBsb2Fkcy5uZWVkTG9hZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICB1cmxzLnB1c2goe3VybDogZWxlbWVudC5VcmwsIHR5cGU6IGVsZW1lbnQuVHlwZX0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQodXJscywgSGFuZGxlci5jcmVhdGUodGhpcywgKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WujOaIkOWbnuiwg1xyXG4gICAgICAgICAgICAgICAgaWYoY29tcGxldGVGdWMhPW51bGwpIGNvbXBsZXRlRnVjLmludm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgLy/moIforrDotYTmupBcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsb2Fkcy5uZWVkTG9hZC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IGxvYWRzLm5lZWRMb2FkW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubV9kaWN0UmVzSXRlbS5oYXMoaW5mby5VcmwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubV9kaWN0UmVzSXRlbS5zZXQoaW5mby5VcmwsIGluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZy5lcnJvcihcIkxvYWQgUmVzb3VyY2UgRXJyb3LvvJpcIik7XHJcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcodXJscyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSksIEhhbmRsZXIuY3JlYXRlKHRoaXMsIChwcm9ncmVzczogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8v6L+b5bqm5Zue6LCDXHJcbiAgICAgICAgICAgIGlmKHByb2dyZXNzRnVjIT1udWxsKSBwcm9ncmVzc0Z1Yy5pbnZva2UocHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LCBudWxsLCBmYWxzZSkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vemihOiuvueJqVxyXG4gICAgICogQHBhcmFtIGZpbGVQYXRoXHJcbiAgICAgKiBAcGFyYW0gY29tcGxldGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRQcmVmYWIoZmlsZVBhdGg6U3RyaW5nLGNvbXBsZXRlOkV2ZW50RnVuYylcclxuICAgIHtcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKGZpbGVQYXRoLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyxmdW5jdGlvbiAocHJlOiBMYXlhLlByZWZhYikge1xyXG4gICAgICAgICAgICB2YXIgcGxheVByZTpMYXlhLlByZWZhYiA9IG5ldyBMYXlhLlByZWZhYigpO1xyXG4gICAgICAgICAgICBwbGF5UHJlLmpzb24gPSBwcmU7XHJcbiAgICAgICAgICAgIGxldCBjZWxsID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNyZWF0ZUZ1bihcIkNlbGxcIiwgcGxheVByZS5jcmVhdGUsIHBsYXlQcmUpO1xyXG4gICAgICAgICAgICBpZiAoY29tcGxldGUpIGNvbXBsZXRlLmludm9rZShjZWxsKTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeK5pS+6LWE5rqQ57uEXHJcbiAgICAgKiBAcGFyYW0gbG9hZHMg6LWE5rqQ57uEIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVsZWFzZUdyb3VwKGxvYWRzOlJlc0dyb3VwKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmxzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICBsb2Fkcy5uZWVkTG9hZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICB1cmxzLnB1c2goZWxlbWVudC5VcmwpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTx1cmxzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jbGVhclJlcyh1cmxzW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5tX2RpY3RSZXNJdGVtLmZvckVhY2goKHY6IFJlc0l0ZW0sIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgIGlmKGtleT09dXJsc1tpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tX2RpY3RSZXNJdGVtLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHiuaUvuaMh+Wumui1hOa6kFxyXG4gICAgICogQHBhcmFtIHVybCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbGVhc2VVcmwodXJsOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICAgbGV0IGlzQWN0aXZlOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgdGhpcy5tX2RpY3RSZXNJdGVtLmZvckVhY2goKHY6IFJlc0l0ZW0sIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGtleT09dXJsKXtcclxuICAgICAgICAgICAgICAgIGlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIGlmKGlzQWN0aXZlKXtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIuY2xlYXJSZXModXJsKTtcclxuICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIExvZy5lcnJvcihcIuWKoOi9vei1hOa6kOe7hOWGheS4jeWtmOWcqOivpei1hOa6kFwiKTtcclxuICAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge1V0aWxTdHJpbmd9IGZyb20gXCIuLi8uLi91dGlsL3N0cmluZ1wiO1xyXG5pbXBvcnQgU291bmRDaGFubmVsID0gTGF5YS5Tb3VuZENoYW5uZWw7XHJcbmltcG9ydCBIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xyXG5pbXBvcnQge1Jlc01hbmFnZXJ9IGZyb20gXCIuLi9yZXMvcmVzLW1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRXZlbnROb2RlIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtbm9kZSc7XHJcbmltcG9ydCB7IElNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ktbWFuYWdlcic7XHJcbmltcG9ydCB7IExvZyB9IGZyb20gJy4uLy4uL2NvcmUvbG9nJztcclxuaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gJy4uLy4uL3N0cnVjdHVyZS9kaWN0aW9uYXJ5JztcclxuaW1wb3J0IHsgQ29uZmlnU291bmQgfSBmcm9tICcuLi8uLi9zZXR0aW5nL2NvbmZpZyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMTIgMTU6MDhcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDpn7PmlYjnrqHnkIZcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTb3VuZE1hbmFnZXIgZXh0ZW5kcyBFdmVudE5vZGUgaW1wbGVtZW50cyBJTWFuYWdlciB7XHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5bGe5oCn5L+h5oGvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvKiogRGVzOuiDjOaZr+mfs+S5kCAqL1xyXG4gICAgcHJpdmF0ZSBtX0N1ckJHU291bmQ6IFNvdW5kQ2hhbm5lbCA9IG51bGw7XHJcbiAgICAvKirpn7PmlYjlkI3lrZflr7nlupRVcmwgKi9cclxuICAgIHByaXZhdGUgZGljdFNvdW5kVXJsOkRpY3Rpb25hcnk8c3RyaW5nPiA9IG51bGw7XHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq55Sf5ZG95ZGo5pyfKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogU291bmRNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6IFNvdW5kTWFuYWdlciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IFNvdW5kTWFuYWdlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gXHJcbiAgICBzZXR1cCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fQ3VyQkdTb3VuZCA9IG5ldyBTb3VuZENoYW5uZWwoKTtcclxuICAgICAgICB0aGlzLmRpY3RTb3VuZFVybCA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZz4oKTtcclxuICAgICAgICBDb25maWdTb3VuZC4kLnNvdW5kUmVzTGlzdC5mb3JFYWNoKGl0ZW09PntcclxuICAgICAgICAgICAgdGhpcy5kaWN0U291bmRVcmwuYWRkKGl0ZW0ubmFtZSxpdGVtLnVybCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoIVV0aWxTdHJpbmcuaXNFbXB0eShDb25maWdTb3VuZC4kLmJnU291bmROYW1lKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJHU291bmQoQ29uZmlnU291bmQuJC5iZ1NvdW5kTmFtZSwwKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRBbGxWb2x1bWUoQ29uZmlnU291bmQuJC52b2x1bWVWb2ljZVNvdW5kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB9XHJcbiAgICBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirorr7nva7mlbTkvZPpn7Pph48qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaVtOS9k+mfs+mHj1xyXG4gICAgICogQHBhcmFtIG51bWJlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0QWxsVm9sdW1lKG51bWJlcilcclxuICAgIHtcclxuICAgICAgICBDb25maWdTb3VuZC4kLnZvbHVtZVZvaWNlU291bmQgPSBudW1iZXI7XHJcbiAgICAgICAgdGhpcy5tX0N1ckJHU291bmQudm9sdW1lID0gbnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirmjqfliLbog4zmma/pn7PkuZAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuiDjOaZr+WjsOmfs1xyXG4gICAgICogQHBhcmFtICAgIGZpbGVfbmFtZSAgICDotYTmupDlkI3lrZdcclxuICAgICAqIEBwYXJhbSAgICBjb3VudCAgICAgICAg5pKt5pS+5qyh5pWwKDDkuLrlvqrnjq8pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwbGF5QkdTb3VuZChmaWxlX25hbWU6IHN0cmluZywgY291bnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChVdGlsU3RyaW5nLmlzRW1wdHkoZmlsZV9uYW1lKSkge1xyXG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJTb3VuZCBmaWxlIGVycm9yIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fQ3VyQkdTb3VuZCA9IExheWEuU291bmRNYW5hZ2VyLnBsYXlNdXNpYyh0aGlzLmRpY3RTb3VuZFVybC52YWx1ZShmaWxlX25hbWUpLGNvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWBnOatouiDjOaZr+mfs+aSreaUvlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RvcEJHU291bmQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubV9DdXJCR1NvdW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJCR1NvdW5kLnN0b3AoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaaguWBnOiDjOaZr+mfs+S5kFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGF1c2VCR1NvdW5kKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQ3VyQkdTb3VuZCkge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyQkdTb3VuZC5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaBouWkjeiDjOaZr+mfs+S5kOaSreaUvlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzdW1lQkdTb3VuZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tX0N1ckJHU291bmQpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckJHU291bmQucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6IOM5pmv6Z+z6YePXHJcbiAgICAgKiBAcGFyYW0gdm9sdW1lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRCR1NvdW5kVm9sdW1lKHZvbHVtZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubV9DdXJCR1NvdW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJCR1NvdW5kLnZvbHVtZSA9IHZvbHVtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaOp+WItumfs+aViOaSreaUvioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5pWI5p6c5aOw6Z+zXHJcbiAgICAgKiBAcGFyYW0gICAgZmlsZV9uYW1lICAgIOi1hOa6kFxyXG4gICAgICogQHBhcmFtICAgIGNvdW50ICAgICAgICDmkq3mlL7mrKHmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlTb3VuZEVmZmVjdChmaWxlX25hbWU6IHN0cmluZywgY291bnQ6IG51bWJlcil7XHJcbiAgICAgICAgaWYgKFV0aWxTdHJpbmcuaXNFbXB0eShmaWxlX25hbWUpKSB7XHJcbiAgICAgICAgICAgIExvZy5lcnJvcihcIuWjsOmfs+aWh+S7tumUmeivr1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzb3VuZDogU291bmRDaGFubmVsID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiU291bmRcIixTb3VuZENoYW5uZWwpO1xyXG5cclxuICAgICAgICBzb3VuZCA9IExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZCh0aGlzLmRpY3RTb3VuZFVybC52YWx1ZShmaWxlX25hbWUpLGNvdW50LEhhbmRsZXIuY3JlYXRlKHRoaXMsKCk9PntcclxuICAgICAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoXCJTb3VuZFwiLHNvdW5kKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgc291bmQudm9sdW1lID0gQ29uZmlnU291bmQuJC52b2x1bWVWb2ljZVNvdW5kO1xyXG4gICAgICAgIHJldHVybiBzb3VuZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWBnOatouaSreaUvlxyXG4gICAgICogQHBhcmFtIHNvdW5kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdG9wU291bmRFZmZlY3Qoc291bmQ6IFNvdW5kQ2hhbm5lbCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzb3VuZCkge1xyXG4gICAgICAgICAgICBzb3VuZC5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG59IiwiaW1wb3J0IHtVdGlsVGltZX0gZnJvbSBcIi4uLy4uL3V0aWwvdGltZVwiO1xyXG5pbXBvcnQgSGFuZGxlciA9IExheWEuSGFuZGxlcjtcclxuaW1wb3J0IHsgSVBvb2xPYmplY3QgfSBmcm9tICcuLi8uLi9jb3JlL29iamVjdC1wb29sJztcclxuaW1wb3J0IHsgVGltZXJJbnRlcnZhbCB9IGZyb20gJy4vdGltZXItaW50ZXJ2YWwnO1xyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMTAgMjA6MDZcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiAg6K6h5pe25Zmo5Z+657G7XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGltZXJFbnRpdHkgaW1wbGVtZW50cyBJUG9vbE9iamVjdCB7XHJcbiAgICBwdWJsaWMgaWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBpc0FjdGl2ZTogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgbVJhdGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBtVGlja3M6IG51bWJlcjtcclxuICAgIHB1YmxpYyBtVGlja3NFbGFwc2VkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaGFuZGxlOiBIYW5kbGVyO1xyXG5cclxuICAgIHB1YmxpYyBtVGltZTogVGltZXJJbnRlcnZhbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1UaW1lID0gbmV3IFRpbWVySW50ZXJ2YWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZS5yZWNvdmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldChpZDogbnVtYmVyLCByYXRlOiBudW1iZXIsIHRpY2tzOiBudW1iZXIsIGhhbmRsZTogSGFuZGxlcikge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLm1SYXRlID0gcmF0ZSA8IDAgPyAwIDogcmF0ZTtcclxuICAgICAgICB0aGlzLm1UaWNrcyA9IHRpY2tzIDwgMCA/IDAgOiB0aWNrcztcclxuICAgICAgICB0aGlzLmhhbmRsZSA9IGhhbmRsZTtcclxuICAgICAgICB0aGlzLm1UaWNrc0VsYXBzZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubVRpbWUuaW5pdCh0aGlzLm1SYXRlLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShyZW1vdmVUaW1lcjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUgJiYgdGhpcy5tVGltZS51cGRhdGUoVXRpbFRpbWUuZGVsdGFUaW1lKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYW5kbGUgIT0gbnVsbCkgdGhpcy5oYW5kbGUucnVuKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1UaWNrc0VsYXBzZWQrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMubVRpY2tzID4gMCAmJiB0aGlzLm1UaWNrcyA9PSB0aGlzLm1UaWNrc0VsYXBzZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZVRpbWVyKHRoaXMuaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTEwIDIwOjAyXHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24gIOWumuaXtuaJp+ihjFxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRpbWVySW50ZXJ2YWwge1xyXG5cclxuICAgIHByaXZhdGUgbV9pbnRlcnZhbF90aW1lOiBudW1iZXI7Ly/mr6vnp5JcclxuICAgIHByaXZhdGUgbV9ub3dfdGltZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubV9ub3dfdGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJblrprml7blmahcclxuICAgICAqIEBwYXJhbSAgICBpbnRlcnZhbCAgICDop6blj5Hpl7TpmpRcclxuICAgICAqIEBwYXJhbSAgICBmaXJzdF9mcmFtZSAgICDmmK/lkKbnrKzkuIDluKflvIDlp4vmiafooYxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXQoaW50ZXJ2YWw6IG51bWJlciwgZmlyc3RfZnJhbWU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1faW50ZXJ2YWxfdGltZSA9IGludGVydmFsO1xyXG4gICAgICAgIGlmIChmaXJzdF9mcmFtZSkgdGhpcy5tX25vd190aW1lID0gdGhpcy5tX2ludGVydmFsX3RpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9ub3dfdGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShlbGFwc2VfdGltZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5tX25vd190aW1lICs9IGVsYXBzZV90aW1lO1xyXG4gICAgICAgIGlmICh0aGlzLm1fbm93X3RpbWUgPj0gdGhpcy5tX2ludGVydmFsX3RpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5tX25vd190aW1lIC09IHRoaXMubV9pbnRlcnZhbF90aW1lO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xyXG5pbXBvcnQge1V0aWxBcnJheX0gZnJvbSBcIi4uLy4uL3V0aWwvYXJyYXlcIjtcclxuaW1wb3J0IHsgRXZlbnROb2RlIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtbm9kZSc7XHJcbmltcG9ydCB7IElNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ktbWFuYWdlcic7XHJcbmltcG9ydCB7IFRpbWVEZWxheSB9IGZyb20gJy4uLy4uL2NvcmUvdGltZS1kZWxheSc7XHJcbmltcG9ydCB7IE9iamVjdFBvb2wgfSBmcm9tICcuLi8uLi9jb3JlL29iamVjdC1wb29sJztcclxuaW1wb3J0IHsgVGltZXJFbnRpdHkgfSBmcm9tICcuL3RpbWVyLWVudGl0eSc7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0wOSAyMzoyMlxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uICDlrprml7bnrqHnkIblmahcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUaW1lck1hbmFnZXIgZXh0ZW5kcyBFdmVudE5vZGUgaW1wbGVtZW50cyBJTWFuYWdlciB7XHJcbiAgXHJcbiAgICBwcml2YXRlIG1faWRDb3VudGVyOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBtX1JlbW92YWxQZW5kaW5nOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBwcml2YXRlIG1fVGltZXJzOiBBcnJheTxUaW1lckVudGl0eT4gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogVGltZXJNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6IFRpbWVyTWFuYWdlciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IFRpbWVyTWFuYWdlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXR1cCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1faWRDb3VudGVyID0gMDtcclxuICAgICAgICBUaW1lRGVsYXkuJC5hZGQoMC4xLCAwLCB0aGlzLnJlbW92ZSwgdGhpcyk7XHJcbiAgICAgICAgVGltZURlbGF5LiQuYWRkVXBkYXRlKHRoaXMudGljaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIFV0aWxBcnJheS5jbGVhcih0aGlzLm1fUmVtb3ZhbFBlbmRpbmcpO1xyXG4gICAgICAgIFV0aWxBcnJheS5jbGVhcih0aGlzLm1fVGltZXJzKTtcclxuICAgICAgICBUaW1lRGVsYXkuJC5yZW1vdmUodGhpcy5yZW1vdmUsIHRoaXMpO1xyXG4gICAgICAgIFRpbWVEZWxheS4kLnJlbW92ZSh0aGlzLnRpY2ssIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGljaygpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9UaW1lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5tX1RpbWVyc1tpXS51cGRhdGUodGhpcy5yZW1vdmVUaW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a6a5pe26YeN5aSN5omn6KGMXHJcbiAgICAgKiBAcGFyYW0gICAgcmF0ZSAgICDpl7TpmpTml7bpl7Qo5Y2V5L2N5q+r56eSKeOAglxyXG4gICAgICogQHBhcmFtICAgIHRpY2tzICAgIOaJp+ihjOasoeaVsFxyXG4gICAgICogQHBhcmFtICAgIGNhbGxlciAgICDmiafooYzln58odGhpcynjgIJcclxuICAgICAqIEBwYXJhbSAgICBtZXRob2QgICAg5a6a5pe25Zmo5Zue6LCD5Ye95pWw77ya5rOo5oSP77yM6L+U5Zue5Ye95pWw56ys5LiA5Liq5Y+C5pWw5Li65a6a5pe25ZmoaWTvvIzlkI7pnaLlj4LmlbDkvp3mrKHml7bkvKDlhaXnmoTlj4LmlbDjgILkvotPblRpbWUodGltZXJfaWQ6bnVtYmVyLCBhcmdzMTphbnksIGFyZ3MyOmFueSwuLi4pOnZvaWRcclxuICAgICAqIEBwYXJhbSAgICBhcmdzICAgIOWbnuiwg+WPguaVsOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkTG9vcChyYXRlOiBudW1iZXIsIHRpY2tzOiBudW1iZXIsIGNhbGxlcjogYW55LCBtZXRob2Q6IEZ1bmN0aW9uLCBhcmdzOiBBcnJheTxhbnk+ID0gbnVsbCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRpY2tzIDw9IDApIHRpY2tzID0gMDtcclxuICAgICAgICBsZXQgbmV3VGltZXI6IFRpbWVyRW50aXR5ID0gT2JqZWN0UG9vbC5nZXQoVGltZXJFbnRpdHkpO1xyXG4gICAgICAgICsrdGhpcy5tX2lkQ291bnRlcjtcclxuICAgICAgICBpZiAoYXJncyAhPSBudWxsKSBVdGlsQXJyYXkuaW5zZXJ0KGFyZ3MsIHRoaXMubV9pZENvdW50ZXIsIDApO1xyXG4gICAgICAgIG5ld1RpbWVyLnNldCh0aGlzLm1faWRDb3VudGVyLCByYXRlLCB0aWNrcywgSGFuZGxlci5jcmVhdGUoY2FsbGVyLCBtZXRob2QsIGFyZ3MsIGZhbHNlKSk7XHJcbiAgICAgICAgdGhpcy5tX1RpbWVycy5wdXNoKG5ld1RpbWVyKTtcclxuICAgICAgICByZXR1cm4gbmV3VGltZXIuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljZXmrKHmiafooYxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZE9uY2UocmF0ZTogbnVtYmVyLCBjYWxsZXI6IGFueSwgbWV0aG9kOiBGdW5jdGlvbiwgYXJnczogQXJyYXk8YW55PiA9IG51bGwpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuZXdUaW1lcjogVGltZXJFbnRpdHkgPSBPYmplY3RQb29sLmdldChUaW1lckVudGl0eSk7XHJcbiAgICAgICAgKyt0aGlzLm1faWRDb3VudGVyO1xyXG4gICAgICAgIGlmIChhcmdzICE9IG51bGwpIFV0aWxBcnJheS5pbnNlcnQoYXJncywgdGhpcy5tX2lkQ291bnRlciwgMCk7XHJcbiAgICAgICAgbmV3VGltZXIuc2V0KHRoaXMubV9pZENvdW50ZXIsIHJhdGUsIDEsIEhhbmRsZXIuY3JlYXRlKGNhbGxlciwgbWV0aG9kLCBhcmdzLCBmYWxzZSkpO1xyXG4gICAgICAgIHRoaXMubV9UaW1lcnMucHVzaChuZXdUaW1lcik7XHJcbiAgICAgICAgcmV0dXJuIG5ld1RpbWVyLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e76Zmk5a6a5pe25ZmoXHJcbiAgICAgKiBAcGFyYW0gICAgdGltZXJJZCAgICDlrprml7blmahpZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlVGltZXIodGltZXJJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX1JlbW92YWxQZW5kaW5nLnB1c2godGltZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTov4fmnJ/lrprml7blmahcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmUoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRpbWVyOiBUaW1lckVudGl0eTtcclxuICAgICAgICBpZiAodGhpcy5tX1JlbW92YWxQZW5kaW5nLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2YgdGhpcy5tX1JlbW92YWxQZW5kaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9UaW1lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lciA9IHRoaXMubV9UaW1lcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVyLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdFBvb2wucmVjb3Zlcih0aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubV9UaW1lcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFV0aWxBcnJheS5jbGVhcih0aGlzLm1fUmVtb3ZhbFBlbmRpbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIiwiXHJcblxyXG5pbXBvcnQgU3ByaXRlID0gTGF5YS5TcHJpdGU7XHJcbmltcG9ydCBUd2VlbiA9IExheWEuVHdlZW47XHJcbmltcG9ydCBFYXNlID0gTGF5YS5FYXNlO1xyXG5pbXBvcnQgSGFuZGxlciA9IExheWEuSGFuZGxlcjtcclxuaW1wb3J0IHsgVXRpbERpc3BsYXkgfSBmcm9tIFwiLi4vLi4vdXRpbC9kaXNwbGF5XCI7XHJcbmltcG9ydCB7IEV2ZW50RnVuYyB9IGZyb20gJy4uL2V2ZW50L2V2ZW50LWRhdGEnO1xyXG5cclxuZXhwb3J0IG1vZHVsZSBDdXN0b21EaWFsb2d7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAYXV0aG9yIFN1blxyXG4gICAgICogQHRpbWUgMjAxOS0wOC0wOSAxNzo0MVxyXG4gICAgICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gIFVJ57uE5Lu255qE5Z+657G777yM57un5om/6IeqTGF5YS5WaWV3XHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgRGlhbG9nQmFzZSBleHRlbmRzIExheWEuRGlhbG9nIHtcclxuICAgICAgICBcclxuICAgICAgICAvKirpga7nvanlsYIgKi9cclxuICAgICAgICBwcml2YXRlIG1hc2tMYXllcjogU3ByaXRlID0gbnVsbDtcclxuICAgICAgICAvKirlvLnnqpflhoXniankvZMgKi9cclxuICAgICAgICBwcml2YXRlIGNvbnRlbnRQbmw6IExheWEuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgLyoq5by556qX5pWw5o2uICovXHJcbiAgICAgICAgcHVibGljIHBvcHVwRGF0YSA9IG5ldyBQb3B1cERhdGEoKTtcclxuXHJcbiAgICAgICAgY3JlYXRlVmlldyh2aWV3OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlVmlldyh2aWV3KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5idW5kbGVCdXR0b25zKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRQbmwgPSB0aGlzLmdldENoaWxkQXQoMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmt7vliqDpga7nvanlsYJcclxuICAgICAgICAgKi9cclxuICAgICAgICBjcmF0ZU1hc2tMYXllcigpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tYXNrTGF5ZXIgPSBVdGlsRGlzcGxheS5jcmVhdGVNYXNrTGF5ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tYXNrTGF5ZXIubW91c2VFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ID0gdGhpcy5tYXNrTGF5ZXI7XHJcbiAgICAgICAgICAgIHQueCA9IE1hdGgucm91bmQoKChMYXlhLnN0YWdlLndpZHRoIC0gdC53aWR0aCkgPj4gMSkgKyB0LnBpdm90WCk7XHJcbiAgICAgICAgICAgIHQueSA9IE1hdGgucm91bmQoKChMYXlhLnN0YWdlLmhlaWdodCAtIHQuaGVpZ2h0KSA+PiAxKSArIHQucGl2b3RZKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5tYXNrTGF5ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tMYXllci56T3JkZXIgPSAtMTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlnKjlnLrmma/kuK3lsYXkuK3nu4Tku7ZcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY2VudGVyKHZpZXc/OiBMYXlhLlNwcml0ZSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodmlldyA9PSBudWxsKSB2aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgdmlldy54ID0gTWF0aC5yb3VuZCgoKExheWEuc3RhZ2Uud2lkdGggLSB2aWV3LndpZHRoKSA+PiAxKSArIHZpZXcucGl2b3RYKTtcclxuICAgICAgICAgICAgdmlldy55ID0gTWF0aC5yb3VuZCgoKExheWEuc3RhZ2UuaGVpZ2h0IC0gdmlldy5oZWlnaHQpID4+IDEpICsgdmlldy5waXZvdFkpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOa3u+WKoOm7mOiupOaMiemSruS6i+S7tlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJ1bmRsZUJ1dHRvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzW1wiYnRuQ2xvc2VcIl0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tcImJ0bkNsb3NlXCJdLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuY2xvc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlhbPpl63nqbrnmb3lpITngrnlh7vlhbPpl63kuovku7ZcclxuICAgICAgICAgKi9cclxuICAgICAgICBjbG9zZU91dHNpZUNsaWNrKCl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hc2tMYXllciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hc2tMYXllci5vZmYoTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5jbG9zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWvueivneahhuW8ueWHuuaWueazlVxyXG4gICAgICAgICAqIEBwYXJhbSB0aW1lIOW8ueWHuuaXtumXtFxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNrlxyXG4gICAgICAgICAqIEBwYXJhbSBpc01hc2sg5piv5ZCm55Sf5oiQ6YGu572pXHJcbiAgICAgICAgICogQHBhcmFtIGNsb3NlT3V0c2lkZSDmmK/lkKbngrnlh7vnqbrnmb3lpITlhbPpl61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwb3B1cERpYWxvZyhwb3B1cERhdGE6UG9wdXBEYXRhID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnBvcHVwKGZhbHNlLGZhbHNlKTtcclxuICAgICAgICAgICAgaWYocG9wdXBEYXRhPT1udWxsKSB7XHJcbiAgICAgICAgICAgICAgICBwb3B1cERhdGEgPSB0aGlzLnBvcHVwRGF0YTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVwRGF0YSA9IHBvcHVwRGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnBvcHVwSW5pdCgpO1xyXG4gICAgICAgICAgICBpZiAocG9wdXBEYXRhLmlzTWFzayAmJiB0aGlzLm1hc2tMYXllciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyYXRlTWFza0xheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBvcHVwRGF0YS5jbG9zZU91dHNpZGUpIHRoaXMubWFza0xheWVyLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuY2xvc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub25TaG93QW5pbWF0aW9uKHBvcHVwRGF0YS50aW1lLCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZihwb3B1cERhdGEuY2FsbEJhY2spIHBvcHVwRGF0YS5jYWxsQmFjay5pbnZva2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRGVzOuW8ueWHuuiwg+eUqCAqL1xyXG4gICAgICAgIHBvcHVwSW5pdCgpIHtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBvblNob3dBbmltYXRpb24odGltZTogbnVtYmVyID0gMzAwLGNiKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmNvbnRlbnRQbmw7XHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRhcmdldC5zY2FsZSgwLCAwKTtcclxuICAgICAgICAgICAgVHdlZW4udG8odGFyZ2V0LCB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZVg6IDEsXHJcbiAgICAgICAgICAgICAgICBzY2FsZVk6IDFcclxuICAgICAgICAgICAgfSwgdGltZSwgRWFzZS5iYWNrT3V0LCBIYW5kbGVyLmNyZWF0ZSh0aGlzLCBjYiwgW3RoaXNdKSwgMCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBhdXRob3IgU3VuXHJcbiAgICAgKiBAdGltZSAyMDE5LTA4LTEyIDE3OjQzXHJcbiAgICAgKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICAgICAqIEBkZXNjcmlwdGlvbiAg56qX5L2T5by55Ye65pWw5o2uXHJcbiAgICAgKnRpbWU6IG51bWJlciA9IDMwMCwgZGF0YTogYW55ID0gbnVsbCwgaXNNYXNrOiBib29sZWFuID0gdHJ1ZSwgY2xvc2VPdXRzaWRlOiBib29sZWFuID0gdHJ1ZSxjYj9cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFBvcHVwRGF0YXtcclxuICAgICAgICBwdWJsaWMgdGltZTpudW1iZXIgPSAzMDA7XHJcbiAgICAgICAgcHVibGljIGRhdGE6YW55ID0gbnVsbDtcclxuICAgICAgICBwdWJsaWMgaXNNYXNrOmJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIHB1YmxpYyBjbG9zZU91dHNpZGU6Ym9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgcHVibGljIGNhbGxCYWNrOkV2ZW50RnVuYyA9IG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6IG51bWJlciA9IDMwMCwgZGF0YTogYW55ID0gbnVsbCwgaXNNYXNrOiBib29sZWFuID0gdHJ1ZSwgY2xvc2VPdXRzaWRlOiBib29sZWFuID0gdHJ1ZSxjYjpFdmVudEZ1bmMgPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aW1lIT1udWxsKSB0aGlzLnRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICBpZihkYXRhIT1udWxsKSB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICBpZihpc01hc2shPW51bGwpIHRoaXMuaXNNYXNrID0gaXNNYXNrO1xyXG4gICAgICAgICAgICBpZihjbG9zZU91dHNpZGUhPW51bGwpIHRoaXMuY2xvc2VPdXRzaWRlID0gY2xvc2VPdXRzaWRlO1xyXG4gICAgICAgICAgICBpZihjYiE9bnVsbCkgdGhpcy5jYWxsQmFjayA9IGNiO1xyXG4gICAgICAgIH1cclxuICAgIH0iLCJpbXBvcnQgeyBSZXNHcm91cCB9IGZyb20gJy4uL3Jlcy9yZXMtZ3JvdXAnO1xyXG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSAnLi4vcmVzL3Jlcy1tYW5hZ2VyJztcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vY29yZS9sb2cnO1xyXG5pbXBvcnQgeyBUaW1lck1hbmFnZXIgfSBmcm9tICcuLi90aW1lci90aW1lci1tYW5hZ2VyJztcclxuaW1wb3J0IHsgRXZlbnRGdW5jIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGF0YSc7XHJcblxyXG5leHBvcnQgbW9kdWxlIEN1c3RvbVNjZW5le1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGF1dGhvciBTdW5cclxuICAgICAqIEB0aW1lIDIwMTktMDgtMDkgMTk6MTJcclxuICAgICAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gICAgICogQGRlc2NyaXB0aW9uICBTY2VuZeeahOWfuuexu1xyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEx5U2NlbmUgZXh0ZW5kcyBMYXlhLlNjZW5lIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5YaF5bWM5qih5byP56m655qE5Zy65pmv6LWE5rqQ77yM5b+F6aG75a6e546w6L+Z5LiqY3JlYXRlVmlld++8jOWQpuWImeaciemXrumimFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlNjZW5lXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6MTMzNCxcImhlaWdodFwiOjc1MH0sXCJsb2FkTGlzdFwiOltdLFwibG9hZExpc3QzRFwiOltdfTtcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWcuuaZr+esrOS4gOS4quWKoOi9veeahOeql+WPo1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBmaXJzdFZpZXc6IGFueSA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Zy65pmv5L6d6LWW55qE6LWE5rqQ57uEXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG5lZWRMb2FkUmVzOiBSZXNHcm91cDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtX3BhcmFtOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBtX2xvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBwdWJsaWMgc2NlbmVUaW1lcnM6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmVlZExvYWRSZXMgPSBuZXcgUmVzR3JvdXAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhMeVNjZW5lLnVpVmlldyk7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6L+b5YWl5Zy65pmvXHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtIOWPguaVsCBcclxuICAgICAgICAgKiBAcGFyYW0gcHJvZ3Jlc3NGdWMg6L+b5bqm5Zue6LCDIFxyXG4gICAgICAgICAqIEBwYXJhbSBjb21wbGV0ZUZ1YyDlrozmiJDlm57osINcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZW50ZXIocGFyYW06IGFueSxwcm9ncmVzc0Z1YzpFdmVudEZ1bmMsY29tcGxldGVGdWM6RXZlbnRGdW5jKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1fbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubV9wYXJhbSA9IHBhcmFtO1xyXG4gICAgICAgICAgICB0aGlzLm9uSW5pdChwYXJhbSk7XHJcblxyXG4gICAgICAgICAgICBSZXNNYW5hZ2VyLiQubG9hZEdyb3VwKHRoaXMubmVlZExvYWRSZXMscHJvZ3Jlc3NGdWMsY29tcGxldGVGdWMpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBsZWF2ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkxlYXZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMub25DbGVhbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lVGltZXJzLmZvckVhY2goKHRpbWVyOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIFRpbWVyTWFuYWdlci4kLnJlbW92ZVRpbWVyKHRpbWVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWKoOi9veWujOaIkFxyXG4gICAgICAgICAqIEBwYXJhbSBlcnJvciDliqDovb3plJnor69cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgbG9hZGVkKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKGVycm9yKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRlZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX2xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNoRW50ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGNoZWNoRW50ZXIoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fbG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maXJzdFZpZXcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbHMgPSB0aGlzLmZpcnN0VmlldztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2luID0gbmV3IGNscygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQod2luKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRlcih0aGlzLm1fcGFyYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yqg6L295a6M5oiQXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG9uTG9hZGVkKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWcuuaZr+WIneWni+WMllxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbSDlj4LmlbBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgb25Jbml0KHBhcmFtOiBhbnkpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDov5vlhaXlnLrmma9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgb25FbnRlcihwYXJhbTogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOmAkOW4p+W+queOr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog56a75byA5Zy65pmvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG9uTGVhdmUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5b2T5Zy65pmv6KKr6ZSA5q+B55qE5pe25YCZXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG9uQ2xlYW4oKTogdm9pZCB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYXRhTWFuYWdlciB9IGZyb20gJy4uL2RhdGEvZGF0YS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgRGF0YUJhc2UgfSBmcm9tICcuLi9kYXRhL2RhdGEtYmFzZSc7XHJcblxyXG5leHBvcnQgbW9kdWxlIEN1c3RvbVZpZXd7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAYXV0aG9yIFN1blxyXG4gICAgICogQHRpbWUgMjAxOS0wOC0wOSAxNTo1MVxyXG4gICAgICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gIFVJ57uE5Lu255qE5Z+657G777yM57un5om/6IeqTGF5YS5WaWV3XHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgVmlld0Jhc2UgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cclxuICAgICAgICAvKuaJgOacieaVsOaNruinguWvn+iAhSovXHJcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFXYXRjaHM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICAgICAgcHVibGljIGRhdGE6IGFueSA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vb3ZlcnJpZGVcclxuICAgICAgICBjcmVhdGVWaWV3KHZpZXc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVWaWV3KHZpZXcpO1xyXG4gICAgICAgICAgICB0aGlzLmZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJzZUVsZW1lbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVdhdGNocy5mb3JFYWNoKChjbWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgRGF0YU1hbmFnZXIuJC5yZW1vdmVFdmVudExpc3RlbmVyKGNtZCwgdGhpcy5vbkRhdGEsIHRoaXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiDjOaZr+WbvumAguW6lFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBwYXJzZUVsZW1lbnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzW1wiaW1nQmdcIl0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGltZ0JnID0gdGhpc1tcImltZ0JnXCJdIGFzIExheWEuU3ByaXRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxTY3JlZW4oaW1nQmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlnKjlnLrmma/kuK3lsYXkuK3nu4Tku7ZcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY2VudGVyKHZpZXc/OiBMYXlhLlNwcml0ZSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodmlldyA9PSBudWxsKSB2aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgdmlldy54ID0gTWF0aC5yb3VuZCgoKExheWEuc3RhZ2Uud2lkdGggLSB2aWV3LndpZHRoKSA+PiAxKSArIHZpZXcucGl2b3RYKTtcclxuICAgICAgICAgICAgdmlldy55ID0gTWF0aC5yb3VuZCgoKExheWEuc3RhZ2UuaGVpZ2h0IC0gdmlldy5oZWlnaHQpID4+IDEpICsgdmlldy5waXZvdFkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u5aSn5bCP5Li65YWo5bGPXHJcbiAgICAgICAgICogQHBhcmFtIHZpZXcgTGF5YS5TcHJpdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZnVsbFNjcmVlbih2aWV3PzogTGF5YS5TcHJpdGUpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHZpZXcgPT0gbnVsbCkgdmlldyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZpZXcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgICAgICB2aWV3LmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog57uR5a6a5pWw5o2u55uR5ZCsXHJcbiAgICAgICAgICogQHBhcmFtIGNtZCDnm5HlkKznsbvlnotcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgYWRkRGF0YVdhdGNoKGNtZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVdhdGNocy5wdXNoKGNtZCk7XHJcbiAgICAgICAgICAgIERhdGFNYW5hZ2VyLiQuYWRkRXZlbnRMaXN0ZW5lcihjbWQsIHRoaXMub25EYXRhLCB0aGlzKTtcclxuICAgICAgICAgICAgRGF0YU1hbmFnZXIuJC5nZXQoY21kKS5ub3RpZnkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOW9k+aVsOaNruWIt+aWsOaYr+mHjee7mFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBvbkRhdGEoZGF0YTogRGF0YUJhc2UpIHtcclxuICAgICAgICAgICAgLy8gaWYgKGRhdGEuY21kID09IERhdGFEZWZpbmUuQ29pbkluZm8pe1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmt7vliqDliLDnlLvluINcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YSDmlbDmja4gXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYWRkKGRhdGE6IGFueSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaYvuekunZpZXdcclxuICAgICAgICAgKi9cclxuICAgICAgICBzaG93KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6ZqQ6JePdmlld1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGhpZGUoKTp2b2lke1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEV2ZW50Tm9kZSB9IGZyb20gJy4uL21hbmFnZXIvZXZlbnQvZXZlbnQtbm9kZSc7XHJcbmltcG9ydCB7IENvbmZpZ0xheW91dCwgQ29uZmlnVUksIENvbmZpZ0RlYnVnLCBDb25maWdHYW1lLCBDb25maWdWZXJzaW9uLCBDb25maWdSZXMgfSBmcm9tICcuLi9zZXR0aW5nL2NvbmZpZyc7XHJcbmltcG9ydCB7IExvZyB9IGZyb20gJy4uL2NvcmUvbG9nJztcclxuaW1wb3J0IHsgVXRpbFRpbWUgfSBmcm9tICcuLi91dGlsL3RpbWUnO1xyXG5pbXBvcnQgeyBlbnVtRGltZW5zaW9uLCBlbnVtQWxpZ2UsIGVudW1TY3JlZW5Nb2RlbCwgZW51bVNjYWxlVHlwZSB9IGZyb20gJy4uL3NldHRpbmcvZW51bSc7XHJcbmltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xyXG5pbXBvcnQgeyBSZXNNYW5hZ2VyIH0gZnJvbSAnLi4vbWFuYWdlci9yZXMvcmVzLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBFdmVudEZ1bmMgfSBmcm9tICcuLi9tYW5hZ2VyL2V2ZW50L2V2ZW50LWRhdGEnO1xyXG5pbXBvcnQgeyBMb2FkaW5nVmlldyB9IGZyb20gJy4uLy4uL2NsaWVudC92aWV3L2xheWVyLXZpZXcvbG9hZGluZy12aWV3JztcclxuaW1wb3J0IHsgRGF0YU1hbmFnZXIgfSBmcm9tICcuLi9tYW5hZ2VyL2RhdGEvZGF0YS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi4vbWFuYWdlci9ldmVudC9ldmVudC1tYW5hZ2VyJztcclxuaW1wb3J0IHsgSnNvbk1hbmFnZXIgfSBmcm9tICcuLi9tYW5hZ2VyL2pzb24vanNvbi1tYW5hZ2VyJztcclxuaW1wb3J0IHsgU291bmRNYW5hZ2VyIH0gZnJvbSAnLi4vbWFuYWdlci9zb3VuZC9zb3VuZC1tYW5hZ2VyJztcclxuaW1wb3J0IHsgVGltZXJNYW5hZ2VyIH0gZnJvbSAnLi4vbWFuYWdlci90aW1lci90aW1lci1tYW5hZ2VyJztcclxuaW1wb3J0IHtHYW1lU2V0dGluZ30gZnJvbSBcIi4uLy4uL2NsaWVudC9zZXR0aW5nL2dhbWVTZXR0aW5nXCI7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTExIDE4OjA4XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g5qGG5p625Yid5aeL5YyW5ZKM5ri45oiP5YWl5Y+jXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW5naW5le1xyXG5cclxuXHJcbiAgICBwdWJsaWMgbGF5b3V0OiBDb25maWdMYXlvdXQgPSBDb25maWdMYXlvdXQuJDtcclxuICAgIHB1YmxpYyBnYW1lOiBDb25maWdHYW1lID0gQ29uZmlnR2FtZS4kO1xyXG4gICAgcHVibGljIHVpOiBDb25maWdVSSA9IENvbmZpZ1VJLiQ7XHJcbiAgICBwdWJsaWMgZGVidWc6IENvbmZpZ0RlYnVnID0gQ29uZmlnRGVidWcuJDtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEVuZ2luZSA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6IEVuZ2luZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2U9PW51bGwpIHRoaXMuaW5zdGFuY2UgPSBuZXcgRW5naW5lKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvJXmk47lkK/liqjlhaXlj6NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJ1bigpOiB2b2lkIHtcclxuICAgICAgICBMb2cuaW5mbyhcIjo6OiBHYW1lIEVuZ2luZSBSdW4gOjo6XCIpO1xyXG4gICAgICAgIEdhbWVTZXR0aW5nLiQuaW5pdCgpO1xyXG4gICAgICAgIGlmIChDb25maWdVSS4kLmRlZmF1bHRMb2FkVmlldyAhPSBudWxsICYmIENvbmZpZ1Jlcy4kLmRlZmF1bHRMb2FkUmVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmdpbmVTZXR1cCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy/muLjmiI/lvIDlp4tcclxuICAgICAgICAgICAgICAgIFV0aWxUaW1lLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAvL+WIneWni+WMlua4uOaIj+euoeeQhuWZqFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyU2V0VXAoKTtcclxuICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyW5ri45oiP5Li75b6q546vXHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLCB0aGlzLCB0aGlzLm1hbmFnZXJVcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgLy/liqDovb1Mb2FkaW5n6aG155qE6buY6K6k6LWE5rqQ5bm25pi+56S6TG9hZGluZ+mhtVxyXG4gICAgICAgICAgICAgICAgUmVzTWFuYWdlci4kLmxvYWRHcm91cChDb25maWdSZXMuJC5kZWZhdWx0TG9hZFJlcyxudWxsLG5ldyBFdmVudEZ1bmModGhpcywoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JwdCA9IENvbmZpZ1VJLiQuZGVmYXVsdExvYWRWaWV3O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JwdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvYWRpbmdWaWV3ID0gbmV3IHNjcnB0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQobG9hZGluZ1ZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nVmlldy5vblN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgTG9nLmVycm9yKFwiRXJyb3I6TG9hZGluZ+i1hOa6kOS4uuepuuWKoOi9veWksei0pe+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8leaTjueahOWIneWni+WMluiuvue9rlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGVuZ2luZVNldHVwKHN0YXJ0Q2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgLyoq5Yid5aeL5YyWTGF5YSAqL1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWUuZGltZW5zaW9uID09IGVudW1EaW1lbnNpb24uRGltMykge1xyXG4gICAgICAgICAgICBMYXlhM0QuaW5pdChDb25maWdMYXlvdXQuJC5kZXNpZ25XaWR0aCwgQ29uZmlnTGF5b3V0LiQuZGVzaWduSGVpZ2h0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMYXlhLmluaXQoQ29uZmlnTGF5b3V0LiQuZGVzaWduV2lkdGgsIENvbmZpZ0xheW91dC4kLmRlc2lnbkhlaWdodCwgTGF5YS5XZWJHTCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKuiDjOaZr+minOiJsiAqL1xyXG4gICAgICAgIExheWEuc3RhZ2UuYmdDb2xvciA9IFwibm9uZVwiO1xyXG4gICAgICAgIC8qKue8qeaUvuaooeW8jyAqL1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gZW51bVNjYWxlVHlwZS5TY2FsZVNob3dBbGwudG9TdHJpbmcoKTtcclxuICAgICAgICAvKirorr7nva7lsY/luZXlpKflsI8gKi9cclxuICAgICAgICBMYXlhLnN0YWdlLnNldFNjcmVlblNpemUoQnJvd3Nlci5jbGllbnRXaWR0aCwgQnJvd3Nlci5jbGllbnRIZWlnaHQpO1xyXG4gICAgICAgIC8qKuiuvue9ruaoquerluWxjyAqL1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IGVudW1TY3JlZW5Nb2RlbC5TY3JlZW5Ob25lO1xyXG4gICAgICAgIC8qKuawtOW5s+Wvuem9kOaWueW8jyAqL1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25IID0gZW51bUFsaWdlLkFsaWdlQ2VudGVyO1xyXG4gICAgICAgIC8qKuWeguebtOWvuem9kOaWueW8jyAqL1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25WID0gZW51bUFsaWdlLkFsaWdlTWlkZGxlO1xyXG4gICAgICAgIC8qKuW8gOWQr+eJqeeQhuW8leaTjiAqL1xyXG4gICAgICAgIGlmKENvbmZpZ0dhbWUuJC5waHlzaWNzKSBMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuXHRcdC8qKuaJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIkgKi9cclxuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc0VuYWJsZURlYnVnUGFuZWwgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuICAgICAgICAvKirniannkIbovoXliqnnur8gKi9cclxuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc1BoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcbiAgICAgICAgLyoq5oCn6IO95ZCM57qn6Z2i5p2/ICovXHJcbiAgICAgICAgaWYgKENvbmZpZ0RlYnVnLiQuaXNTdGF0KSBMYXlhLlN0YXQuc2hvdyhDb25maWdEZWJ1Zy4kLnBhbmVsWCxDb25maWdEZWJ1Zy4kLnBhbmVsWSk7XHJcbiAgICAgICAgLyoq5b6u5L+h5byA5pS+5Z+f5a2Q5Z+f6K6+572uKi9cclxuICAgICAgICBpZiAoQnJvd3Nlci5vbldlaVhpbiB8fCBCcm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgTGF5YS5NaW5pQWRwdGVyLmluaXQoKTtcclxuICAgICAgICAgICAgTGF5YS5pc1dYT3BlbkRhdGFDb250ZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKuaooeW8j+eql+WPo+eCueWHu+i+uee8mCAqL1xyXG4gICAgICAgIFVJQ29uZmlnLmNsb3NlRGlhbG9nT25TaWRlID0gdHJ1ZTtcclxuICAgICAgICAvKirmmK/lkKbmmL7npLrmu5rliqjmnaHmjInpkq4gKi9cclxuICAgICAgICBVSUNvbmZpZy5zaG93QnV0dG9ucyA9IHRydWU7XHJcbiAgICAgICAgLyoq5oyJ6ZKu55qE54K55Ye75pWI5p6cICovXHJcbiAgICAgICAgVUlDb25maWcuc2luZ2xlQnV0dG9uU3R5bGUgPSBcInNjYWxlXCI7IC8vXCJjb2xvclwiLFwic2NhbGVcIlxyXG4gICAgICAgIC8qKuW8ueWHuuahhuiDjOaZr+mAj+aYjuW6piAqL1xyXG4gICAgICAgIFVJQ29uZmlnLnBvcHVwQmdBbHBoYSA9IDAuNzU7XHJcbiAgICAgICAgLyoq5YW85a65U2NlbmXlkI7nvIDlnLrmma8gKi9cclxuICAgICAgICBMYXlhLlVSTC5leHBvcnRTY2VuZVRvSnNvbiA9IHRydWU7XHJcbiAgICAgICAgLyoq5piv5ZCm5byA5ZCv54mI5pys566h55CGICovXHJcbiAgICAgICAgaWYoQ29uZmlnVmVyc2lvbi4kLmlzT3BlblZlcnNpb24pe1xyXG4gICAgICAgICAgICBMYXlhLlJlc291cmNlVmVyc2lvbi5lbmFibGUoQ29uZmlnVmVyc2lvbi4kLnZlcnNpb25GbG9kZXIsXHJcbiAgICAgICAgICAgIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgc3RhcnRDYWxsYmFjayksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdGFydENhbGxiYWNrLmNhbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnrqHnkIblmajnmoTliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSAgbWFuYWdlclNldFVwKCk6IHZvaWQge1xyXG4gICAgICAgIERhdGFNYW5hZ2VyLiQuc2V0dXAoKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIuJC5zZXR1cCgpO1xyXG4gICAgICAgIFJlc01hbmFnZXIuJC5zZXR1cCgpO1xyXG4gICAgICAgIEpzb25NYW5hZ2VyLiQuc2V0dXAoKTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuJC5zZXR1cCgpO1xyXG4gICAgICAgIFRpbWVyTWFuYWdlci4kLnNldHVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnrqHnkIblmajnmoRVcGRhdGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtYW5hZ2VyVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEJyb3dzZXIgPSBsYXlhLnV0aWxzLkJyb3dzZXI7XHJcbmltcG9ydCB7IGVudW1EaW1lbnNpb24sIGVudW1TY2FsZVR5cGUsIGVudW1Kc29uRGVmaW5lLCBlbnVtU291bmROYW1lIH0gZnJvbSAnLi9lbnVtJztcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi4vY29yZS9zaW5nbGV0b24nO1xyXG5pbXBvcnQgeyBNYWluU2NlbmUgfSBmcm9tICcuLi8uLi9jbGllbnQvc2NlbmUvbWFpbi1zY2VuZSc7XHJcbmltcG9ydCB7IFJlc0dyb3VwIH0gZnJvbSAnLi4vbWFuYWdlci9yZXMvcmVzLWdyb3VwJztcclxuaW1wb3J0IHsgTG9hZGluZ1ZpZXcgfSBmcm9tICcuLi8uLi9jbGllbnQvdmlldy9sYXllci12aWV3L2xvYWRpbmctdmlldyc7XHJcbmltcG9ydCB7IEpzb25UZW1wbGF0ZSB9IGZyb20gJy4uL21hbmFnZXIvanNvbi9qc29uLXRlbXBsYXRlJztcclxuaW1wb3J0IHsgU291bmRUZW1wbGF0ZSB9IGZyb20gJy4uL21hbmFnZXIvc291bmQvc291bmQtdGVtcGxhdGUnO1xyXG4gLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMDkgMTQ6MDFcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDmuLjmiI/phY3nva7kv6Hmga9cclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqIOeVjOmdoumFjee9rlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpZ1VJIGV4dGVuZHMgU2luZ2xldG9uIHtcclxuXHJcbiAgICAvKirpu5jorqTlrZfkvZMgKi9cclxuICAgIHB1YmxpYyBkZWZhdWx0Rm9udE5hbWU6IHN0cmluZyA9ICfpu5HkvZMnO1xyXG4gICAgLyoq6buY6K6k5a2X5L2T5aSn5bCPICovXHJcbiAgICBwdWJsaWMgZGVmYXVsdEZvbnRTaXplOiBudW1iZXIgPSAxNjtcclxuICAgIC8qKum7mOiupOWKoOi9veWcuuaZryAqL1xyXG4gICAgcHVibGljIGRlZmF1bHRNYWluU2NlbmU6IGFueSA9IE1haW5TY2VuZTtcclxuICAgIC8qKum7mOiupOWKoOi9veeahExvYWRpbmfpobXpnaIgKi9cclxuICAgIHB1YmxpYyBkZWZhdWx0TG9hZFZpZXc6IGFueSA9IExvYWRpbmdWaWV3O1xyXG4gICBcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnVUkgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ1VJIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ29uZmlnVUkoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDotYTmupDphY3nva5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maWdSZXMgZXh0ZW5kcyBTaW5nbGV0b257XHJcblxyXG4gICAgLyoq6buY6K6kTG9hZGluZ+mhtemdoueahOi1hOa6kOS/oeaBryAqL1xyXG4gICAgcHVibGljIGRlZmF1bHRMb2FkUmVzOiBSZXNHcm91cCA9IG5ldyBSZXNHcm91cCgpO1xyXG4gICAgLyoq6buY6K6k55qE5Z+656GA6aG16Z2i6LWE5rqQ5L+h5oGvICovXHJcbiAgICBwdWJsaWMgZGVmYXVsdE1haW5SZXM6UmVzR3JvdXAgPSBuZXcgUmVzR3JvdXAoKTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnUmVzID0gbnVsbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpDb25maWdSZXMge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdSZXMoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy/liqDovb1Kc29u6YWN572u5paH5Lu2XHJcbiAgICAgICAgQ29uZmlnRGF0YS4kLmpzb25UZW1wbGF0ZUxpc3QuZm9yRWFjaChpdGVtPT57XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdE1haW5SZXNcclxuICAgICAgICAgICAgLmFkZChpdGVtLnVybCwgTGF5YS5Mb2FkZXIuSlNPTik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/liqDovb3pn7PmlYjotYTmupBcclxuICAgICAgICBDb25maWdTb3VuZC4kLnNvdW5kUmVzTGlzdC5mb3JFYWNoKGl0ZW09PntcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0TWFpblJlc1xyXG4gICAgICAgICAgICAuYWRkKGl0ZW0udXJsLCBMYXlhLkxvYWRlci5TT1VORCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlo7Dpn7PphY3nva5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maWdTb3VuZCBleHRlbmRzIFNpbmdsZXRvbiB7XHJcblxyXG4gICAgLyoq6IOM5pmv6Z+z5LmQ5ZCN5a2XICovXHJcbiAgICBwdWJsaWMgYmdTb3VuZE5hbWUgPSBcIlwiO1xyXG4gICAgLyoq6IOM5pmv6Z+z5byA5YWzICovXHJcbiAgICBwdWJsaWMgaXNDbG9zZUJHU291bmQgPSBmYWxzZTtcclxuICAgIC8qKuaViOaenOmfs+W8gOWFsyAqL1xyXG4gICAgcHVibGljIGlzQ2xvc2VFZmZlY3RTb3VuZCA9IGZhbHNlO1xyXG4gICAgLyoq5omA5pyJ6Z+z5pWI5byA5YWzICovXHJcbiAgICBwdWJsaWMgaXNDbG9zZVZvaWNlU291bmQgPSBmYWxzZTtcclxuICAgIC8qKuaAu+mfs+mHjyAqL1xyXG4gICAgcHVibGljIHZvbHVtZVZvaWNlU291bmQgPSAxO1xyXG4gICAgLyoq6Z+z5pWI6LWE5rqQICovXHJcbiAgICBwdWJsaWMgc291bmRSZXNMaXN0OkFycmF5PFNvdW5kVGVtcGxhdGU+ID0gbnVsbDtcclxuICBcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWdTb3VuZCA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6Q29uZmlnU291bmQge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdTb3VuZCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc291bmRSZXNMaXN0ID0gbmV3IEFycmF5PFNvdW5kVGVtcGxhdGU+KCk7XHJcbiAgICAgICAgLy8gdGhpcy5zb3VuZFJlc0xpc3QucHVzaChuZXcgU291bmRUZW1wbGF0ZShcInJlcy9zb3VuZC9iZy5tcDNcIixlbnVtU291bmROYW1lLmJnKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmlbDmja7ooajphY3nva5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maWdEYXRhIGV4dGVuZHMgU2luZ2xldG9ue1xyXG5cclxuICAgIC8qKmpzb27phY3nva7ooajkv6Hmga8gKi9cclxuICAgIHB1YmxpYyBqc29uVGVtcGxhdGVMaXN0OkFycmF5PEpzb25UZW1wbGF0ZT4gPSBuZXcgQXJyYXk8SnNvblRlbXBsYXRlPigpO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnRGF0YSA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6Q29uZmlnRGF0YSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ0RhdGEoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOa4uOaIj+mFjee9rlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpZ0dhbWUgZXh0ZW5kcyBTaW5nbGV0b24ge1xyXG4gXHJcbiAgICAvKirpu5jorqTmqKHlvI/kv6Hmga8gMkQvM0QgKi9cclxuICAgIHB1YmxpYyBkaW1lbnNpb246IGVudW1EaW1lbnNpb24gPSBlbnVtRGltZW5zaW9uLkRpbTI7XHJcbiAgICAvKirniannkIblvIDlhbMgKi9cclxuICAgIHB1YmxpYyBwaHlzaWNzOmJvb2xlYW4gPSBmYWxzZTtcclxuICBcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZpZ0dhbWUgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ0dhbWUge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdHYW1lKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDniYjmnKzphY3nva5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maWdWZXJzaW9uIGV4dGVuZHMgU2luZ2xldG9uIHtcclxuIFxyXG4gICAgLyoq54mI5pys5o6n5Yi25byA5YWzICovXHJcbiAgICBwdWJsaWMgaXNPcGVuVmVyc2lvbjpib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirniYjmnKzlj7cgKi9cclxuICAgIHB1YmxpYyB2ZXJzaW9uTnVtOm51bWJlciA9IDA7XHJcbiAgICAvKirniYjmnKzmjqfliLbmlofku7blkI0gKi9cclxuICAgIHB1YmxpYyB2ZXJzaW9uRmxvZGVyOnN0cmluZyA9IFwiVmVyc2lvblwiK3RoaXMudmVyc2lvbk51bTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZpZ1ZlcnNpb24gPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ1ZlcnNpb24ge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdWZXJzaW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICog5biD5bGA6YWN572uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlnTGF5b3V0IGV4dGVuZHMgU2luZ2xldG9uIHtcclxuXHJcbiAgICAvKirorr7orqHliIbovqjnjodYICovXHJcbiAgICBwdWJsaWMgZGVzaWduV2lkdGg6IG51bWJlciA9IDc1MDtcclxuICAgIC8qKuiuvuiuoeWIhui+qOeOh1kgKi9cclxuICAgIHB1YmxpYyBkZXNpZ25IZWlnaHQ6IG51bWJlciA9IDEzMzQ7XHJcbiAgICAvKirnvKnmlL7mqKHlvI8gKi9cclxuICAgIHB1YmxpYyBzY2FsZU1vZGU6IGVudW1TY2FsZVR5cGUgPSBlbnVtU2NhbGVUeXBlLlNjYWxlRml4ZWRBdXRvO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWdMYXlvdXQgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ0xheW91dCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ0xheW91dCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBEZWJ1Z+mFjee9rlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpZ0RlYnVnIGV4dGVuZHMgU2luZ2xldG9uIHtcclxuXHJcbiAgICAvKirosIPor5Xkv6Hmga/lvIDlhbMgKi9cclxuICAgIHB1YmxpYyBpc0RlYnVnOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8qKueJqeeQhui+heWKqee6v+W8gOWFsyAqL1xyXG4gICAgcHVibGljIGlzUGh5c2ljc0RlYnVnOiBib29sZWFuID0gZmFsc2U7IFxyXG4gICAgLyoq6LCD6K+V6Z2i5p2/ICovXHJcbiAgICBwdWJsaWMgaXNFbmFibGVEZWJ1Z1BhbmVsOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKuaAp+iDvemdouadv+W8gOWFsyAqL1xyXG4gICAgcHVibGljIGlzU3RhdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvKirmgKfog73nu5/orqHpnaLmnb9YICovXHJcbiAgICBwdWJsaWMgcGFuZWxYOm51bWJlciA9IDA7XHJcbiAgICAvKirmgKfog73nu5/orqHpnaLmnb9ZICovXHJcbiAgICBwdWJsaWMgcGFuZWxZOm51bWJlciA9IDEwMDtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnRGVidWcgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ0RlYnVnIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ29uZmlnRGVidWcoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIDNE6YWN572uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlnM0QgZXh0ZW5kcyBTaW5nbGV0b257XHJcblxyXG4gICAgLyoq5Zy65pmv6LWE5rqQ6Lev5b6EICovXHJcbiAgICBwdWJsaWMgc2NlbmVQYXRoOnN0cmluZyA9IFwicmVzL3UzZC9MYXlhU2NlbmVfTWFpbi9Db252ZW50aW9uYWwvTWFpbi5sc1wiO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWczRCA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6Q29uZmlnM0Qge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWczRCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbi8vIC8qKlxyXG4vLyAgKiBOZXR3b3Jr6YWN572uXHJcbi8vICAqL1xyXG4vLyBleHBvcnQgY2xhc3MgQ29uZmlnTmV0IGV4dGVuZHMgU2luZ2xldG9uIHtcclxuXHJcbi8vICAgICBwdWJsaWMgaHR0cFVybDogc3RyaW5nID0gXCJodHRwOi8vMTI3LjAuMC4xOjM0NTY4XCI7XHJcbi8vICAgICBwdWJsaWMgd3NVcmw6IHN0cmluZyA9IFwid3NzOi8vd3guZG9ub3BvLmNvbS93cy93c1wiO1xyXG4vLyAgICAgcHVibGljIHJlc1VybDogc3RyaW5nID0gXCJ3czovLzEyNy4wLjAuMToxNjY2OVwiO1xyXG4vLyAgICAgcHVibGljIHRpbWVPdXQ6IG51bWJlciA9IDEwO1xyXG4vLyAgICAgcHVibGljIGhlYXJ0QmVhdDogbnVtYmVyID0gMTA7XHJcbi8vICAgICBwdWJsaWMgc2VydmVySGVhcnRCZWF0OiBudW1iZXIgPSAzO1xyXG5cclxuLy8gICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWdOZXQgPSBudWxsO1xyXG5cclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpDb25maWdOZXQge1xyXG4vLyAgICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdOZXQoKTtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuLy8gICAgIH1cclxuXHJcbi8vIH1cclxuXHJcbi8vIC8qKlxyXG4vLyAgKiDlvq7kv6HphY3nva5cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjbGFzcyBDb25mV2VjaGF0IGV4dGVuZHMgU2luZ2xldG9uIHtcclxuXHJcbi8vICAgICBwdWJsaWMgYXBwaWQ6IHN0cmluZyA9IFwiXCI7XHJcbi8vICAgICBwdWJsaWMgc2VjcmV0OiBzdHJpbmcgPSBcIlwiO1xyXG4vLyAgICAgcHVibGljIGFkVW5pdElkOiBzdHJpbmcgPSBcIlwiO1xyXG4vLyAgICAgcHVibGljIGNvZGUyc2Vzc2lvblVybCA9IFwiaHR0cHM6Ly9hcGkud2VpeGluLnFxLmNvbS9zbnMvanNjb2RlMnNlc3Npb24/YXBwaWQ9ezB9JnNlY3JldD17MX0manNfY29kZT17Mn0mZ3JhbnRfdHlwZT1hdXRob3JpemF0aW9uX2NvZGVcIjtcclxuXHJcblxyXG4vLyAgICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZXZWNoYXQgPSBudWxsO1xyXG5cclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpDb25mV2VjaGF0IHtcclxuLy8gICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ29uZldlY2hhdCgpO1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcbiIsIi8qKlxyXG4gKiDph43opoHnmoTmnprkuL7lrprkuYks5qGG5p6257qn5YirXHJcbiAqXHJcbiAqIEBhdXRob3IgVGltIFdhcnNcclxuICogQGRhdGUgMjAxOS0wMS0xOCAxNjoyMFxyXG4gKiBAcHJvamVjdCBmaXJlYm9sdFxyXG4gKiBAY29weXJpZ2h0IChDKSBET05PUE9cclxuICpcclxuICovXHJcblxyXG5pbXBvcnQgU3RhZ2UgPSBMYXlhLlN0YWdlO1xyXG5cclxuLyoqXHJcbiAqIOiInuWPsOeahOe8qeaUvuagvOW8j1xyXG4gKi9cclxuZXhwb3J0IGVudW0gZW51bVNjYWxlVHlwZSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBTY2FsZU5vU2NhbGUgPSBTdGFnZS5TQ0FMRV9GVUxMLFxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgU2NhbGVFeGFjdEZpdCA9IFN0YWdlLlNDQUxFX0VYQUNURklULFxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgU2NhbGVTaG93QWxsID0gU3RhZ2UuU0NBTEVfU0hPV0FMTCxcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIFNjYWxlTm9Cb3JkZXIgPSBTdGFnZS5TQ0FMRV9OT0JPUkRFUixcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIFNjYWxlRnVsbCA9IFN0YWdlLlNDQUxFX0ZVTEwsXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBTY2FsZUZpeGVkV2lkdGggPSBTdGFnZS5TQ0FMRV9GSVhFRF9XSURUSCxcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIFNjYWxlRml4ZWRIZWlnaHQgPSBTdGFnZS5TQ0FMRV9GSVhFRF9IRUlHSFQsXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBTY2FsZUZpeGVkQXV0byA9IFN0YWdlLlNDQUxFX0ZJWEVEX0FVVE8sXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBTY2FsZU5vU2NhbGUgPSBTdGFnZS5TQ0FMRV9OT1NDQUxFXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlsY/luZXnmoToh6rpgILlupTmlrnlvI9cclxuICovXHJcbmV4cG9ydCBlbnVtIGVudW1TY3JlZW5Nb2RlbCB7XHJcbiAgICBTY3JlZW5Ob25lID0gJ25vbmUnLFxyXG4gICAgU2NyZWVuSG9yaXpvbnRhbCA9ICdob3Jpem9udGFsJyxcclxuICAgIFNjcmVlblZlcnRpY2FsID0gJ3ZlcnRpY2FsJ1xyXG59XHJcblxyXG4vKipcclxuICog5pWw57uE5o6S5bqP5pa55byPXHJcbiAqICovXHJcbmV4cG9ydCBlbnVtIGVudW1BcnJheVNvcnRPcmRlciB7XHJcbiAgICBBc2NlbmRpbmcsXHQvL+WNh+W6j1xyXG4gICAgRGVzY2VuZGluZyxcdC8v6ZmN5bqPXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmuLjmiI/nmoTov5DooYzlrrnlmahcclxuICovXHJcbmV4cG9ydCBlbnVtIGVudW1HYW1lUGxhdGZvcm0ge1xyXG4gICAgV2ViLFxyXG4gICAgUGhvbmUsXHJcbiAgICBXZWl4aW5cclxufVxyXG5cclxuLyoqXHJcbiAqIOWvuem9kOaWueW8j1xyXG4gKi9cclxuZXhwb3J0IGVudW0gZW51bUFsaWdlVHlwZSB7XHJcbiAgICBOT05FID0gMCxcclxuICAgIFJJR0hULFxyXG4gICAgUklHSFRfQk9UVE9NLFxyXG4gICAgQk9UVE9NLFxyXG4gICAgTEVGVF9CT1RUT00sXHJcbiAgICBMRUZULFxyXG4gICAgTEVGVF9UT1AsXHJcbiAgICBUT1AsXHJcbiAgICBSSUdIVF9UT1AsXHJcbiAgICBNSUQsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlr7npvZDmoIfms6hcclxuICovXHJcbmV4cG9ydCBlbnVtIGVudW1BbGlnZSB7XHJcbiAgICBBbGlnZUxlZnQgPSAnbGVmdCcsXHJcbiAgICBBbGlnZUNlbnRlciA9ICdjZW50ZXInLFxyXG4gICAgQWxpZ2VSaWdodCA9ICdyaWdodCcsXHJcbiAgICBBbGlnZVRvcCA9ICd0b3AnLFxyXG4gICAgQWxpZ2VNaWRkbGUgPSAnbWlkZGxlJyxcclxuICAgIEFsaWdlQm90dG9tID0gJ2JvdHRvbSdcclxufVxyXG5cclxuLyoqXHJcbiAqIOa4heeQhui1hOa6kOeahOasoeW6j+etlueVpVxyXG4gKi9cclxuZXhwb3J0IGVudW0gZW51bUNsZWFyU3RyYXRlZ3kge1xyXG4gICAgRklGTyA9IDAsICAgLy/lhYjov5vlhYjlh7pcclxuICAgIEZJTE8sICAgICAgIC8v5YWI6L+b5ZCO5Ye6XHJcbiAgICBMUlUsXHRcdC8v5pyA6L+R5pyA5bCR5L2/55SoXHJcbiAgICBVTl9VU0VELFx0Ly/mnKrkvb/nlKhcclxuICAgIEFMTCxcdFx0Ly/muIXnkIbmiYDmnIlcclxufVxyXG5cclxuLyoqXHJcbiAqIOa4uOaIj+aYr+WQpumHh+eUqOeahDJE5oiW6ICFM0RcclxuICovXHJcbmV4cG9ydCBlbnVtIGVudW1EaW1lbnNpb24ge1xyXG4gICAgRGltMiA9ICcyZCcsXHJcbiAgICBEaW0zID0gJzNkJ1xyXG59XHJcblxyXG4vKipcclxuICog5ri45oiP55qE54q25oCBXHJcbiAqL1xyXG5leHBvcnQgZW51bSBlbnVtR2FtZVN0YXR1cyB7XHJcbiAgICBTdGFydCA9ICdHQU1FLVNUQVRVUy1TVEFSVCcsXHJcbiAgICBTdG9wID0gJ0dBTUUtU1RBVFVTLVNUT1AnLFxyXG4gICAgUmVzdGFydCA9ICdHQU1FLVNUQVRVUy1SRVNUQVJUJyxcclxufVxyXG5cclxuLyoqXHJcbiBsYmwgIC0tLT5MYWJlbCjmlofmnKwpXHJcbiB0eHQgIC0tLT5UZXh0KOaWh+acrClcclxuIHJ0eHQgIC0tLT5SaWNoVGV4dCjlr4zmlofmnKwpXHJcbiBpcHQgIC0tLT5JbnB1dCjovpPlhaXmoYYpXHJcbiBpbWcgIC0tLT5JbWFnZSjlm77niYcpXHJcbiBzcHQgIC0tLT5TcHJpdGUo57K+54G1KVxyXG4gZ3JoICAtLS0+R3JhcGgo5Zu+5b2iKVxyXG4gbGlzdCAtLS0+TGlzdCjliJfooagpXHJcbiBsb2FkIC0tLT5Mb2FkKOijhei9veWZqClcclxuIGd1cCAgLS0tPkdyb3VwKOe7hClcclxuIGNvbSAgLS0tPkNvbXBvbmVudCjnu4Tku7YpXHJcbiBidG4gIC0tLT5CdXR0b24o5oyJ6ZKuKVxyXG4gY29iICAtLS0+Q29tYm9Cb3co5LiL5ouJ5qGGKVxyXG4gcGJhciAtLS0+UHJvZ3Jlc3NCYXIo6L+b5bqm5p2hKVxyXG4gc2xkICAtLS0+U2xpZGVyKOa7keWKqOadoSlcclxuIHdpbiAgLS0tPldpbmRvd++8iOeql+WPo++8iVxyXG4gYW5pICAtLS0+TW92aWUo5Yqo55S7KVxyXG4gZWZ0ICAtLS0+VHJhbnNpdGlvbijliqjmlYgpXHJcbiBjdGwgIC0tLT5Db250cm9sbGVyKOaOp+WItuWZqClcclxuICovXHJcblxyXG4vKipcclxuICog5o6n5Lu25YmN57yAXHJcbiAqL1xyXG5leHBvcnQgZW51bSBlbnVtRWxlbWVudFByZWZpeCB7XHJcbiAgICBMYWJsZSA9ICdsYmxfJyxcclxuICAgIElucHV0ID0gJ2lwdF8nLFxyXG4gICAgVGV4dCA9ICd0eHRfJyxcclxuICAgIFJpY2hUZXh0ID0gJ3J0eHRfJyxcclxuICAgIEltYWdlID0gJ2ltZ18nLFxyXG4gICAgU3ByaXRlID0gJ3NwdF8nLFxyXG4gICAgR3JhcGggPSAnZ3JoXycsXHJcbiAgICBMaXN0ID0gJ2xpc3RfJyxcclxuICAgIExvYWQgPSAnbG9hZF8nLFxyXG4gICAgR3JvdXAgPSAnZ3VwXycsXHJcbiAgICBDb21wb25lbnQgPSAnY29tXycsXHJcbiAgICBCdXR0b24gPSAnYnRuXycsXHJcbiAgICBDb21ib0JvdyA9ICdjb2JfJyxcclxuICAgIFByb2dyZXNzQmFyID0gJ3BiYXJfJyxcclxuICAgIFNsaWRlciA9ICdzbGRfJyxcclxuICAgIFdpbmRvdyA9ICd3aW5fJyxcclxuICAgIE1vdmllID0gJ2FuaV8nLFxyXG4gICAgVHJhbnNpdGlvbiA9ICdlZnRfJyxcclxuICAgIENvbnRyb2xsZXIgPSAnY3RsXydcclxufVxyXG5cclxuLyoqXHJcbiAqIOaVsOaNruihqOmFjee9rlxyXG4gKi9cclxuZXhwb3J0IGVudW0gZW51bUpzb25EZWZpbmUge1xyXG4gICAgaW52aXRlID0gXCJpbnZpdGVcIixcclxuICAgIGxldmVsID0gXCJsZXZlbFwiLFxyXG4gICAgbG90dGVyeSA9IFwibG90dGVyeVwiLFxyXG4gICAgb2ZmbGluZSA9IFwib2ZmbGluZVwiLFxyXG59XHJcblxyXG4vKipcclxuICog6Z+z5pWI5qCH6K6wXHJcbiAqL1xyXG5leHBvcnQgZW51bSBlbnVtU291bmROYW1le1xyXG4gICAgYmcgPSBcImJnU291bmRcIixcclxuICAgIGJvdHRvbiA9IFwiYnRuU291bmRcIixcclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IFV0aWxEaWN0IH0gZnJvbSAnLi4vdXRpbC9kaWN0JztcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA1LTIxIDE5OjIyXHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24gIOWtl+WFuFxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnk8VD4ge1xyXG5cclxuICAgIHByaXZhdGUgbV9kaWN0OiBPYmplY3QgPSB7fTtcclxuXHJcbiAgICBwdWJsaWMgYWRkKGtleTogYW55LCB2YWx1ZTogVCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0tleShrZXkpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX2RpY3Rba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5tX2RpY3Rba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzS2V5KGtleTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm1fZGljdFtrZXldICE9IG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWx1ZShrZXk6IGFueSk6IFQge1xyXG4gICAgICAgIGlmICghdGhpcy5oYXNLZXkoa2V5KSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9kaWN0W2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGtleXMoKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgbGV0IGxpc3Q6IEFycmF5PHN0cmluZyB8IG51bWJlcj4gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5tX2RpY3QpIHtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWx1ZXMoKTogQXJyYXk8VD4ge1xyXG4gICAgICAgIGxldCBsaXN0OiBBcnJheTxUPiA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLm1fZGljdCkge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5tX2RpY3Rba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5tX2RpY3QpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubV9kaWN0W2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmb3JlYWNoKGNvbXBhcmVGbjogKGtleTogYW55LCB2YWx1ZTogVCk9PnZvaWQpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5tX2RpY3QpIHtcclxuICAgICAgICAgICAgY29tcGFyZUZuLmNhbGwobnVsbCwga2V5LCB0aGlzLm1fZGljdFtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZvcmVhY2hCcmVhayhjb21wYXJlRm46IChrZXk6YW55LCB2YWx1ZTogVCkgPT4gYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLm1fZGljdCkge1xyXG4gICAgICAgICAgICBpZiAoIWNvbXBhcmVGbi5jYWxsKG51bGwsIGtleSwgdGhpcy5tX2RpY3Rba2V5XSkpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gVXRpbERpY3Quc2l6ZSh0aGlzLm1fZGljdCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZW51bUFycmF5U29ydE9yZGVyIH0gZnJvbSAnLi4vc2V0dGluZy9lbnVtJztcclxuXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0wOSAyMzoxNVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOaVsOe7hOW3peWFt+exu1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFV0aWxBcnJheSB7XHJcblxyXG4gICAgLyoqIOaPkuWFpeWFg+e0oFxyXG4gICAgICogQHBhcmFtIGFyciDpnIDopoHmk43kvZznmoTmlbDnu4RcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDpnIDopoHmj5LlhaXnmoTlhYPntKBcclxuICAgICAqIEBwYXJhbSBpbmRleCDmj5LlhaXkvY3nva5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnNlcnQoYXJyOiBhbnlbXSwgdmFsdWU6IGFueSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChpbmRleCA+IGFyci5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhcnIuc3BsaWNlKGluZGV4LCAwLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirku47mlbDnu4Tnp7vpmaTlhYPntKAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmUoYXJyOiBhbnlbXSwgdjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IGFyci5pbmRleE9mKHYpO1xyXG4gICAgICAgIGlmIChpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuenu+mZpOaJgOacieWAvOetieS6jnbnmoTlhYPntKAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVBbGwoYXJyOiBhbnlbXSwgdjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IGFyci5pbmRleE9mKHYpO1xyXG4gICAgICAgIHdoaWxlIChpID49IDApIHtcclxuICAgICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgaSA9IGFyci5pbmRleE9mKHYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirljIXlkKvlhYPntKAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjb250YWluKGFycjogYW55W10sIHY6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBhcnIubGVuZ3RoID4gMCA/IGFyci5pbmRleE9mKHYpICE9IC0xIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5aSN5Yi2Ki9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29weShhcnI6IGFueVtdKTogYW55W10ge1xyXG4gICAgICAgIHJldHVybiBhcnIuc2xpY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaOkuW6j1xyXG4gICAgICogQHBhcmFtIGFyciDpnIDopoHmjpLluo/nmoTmlbDnu4RcclxuICAgICAqIEBwYXJhbSBrZXkg5o6S5bqP5a2X5q61XHJcbiAgICAgKiBAcGFyYW0gb3JkZXIg5o6S5bqP5pa55byPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc29ydChhcnI6IGFueVtdLCBrZXk6IHN0cmluZywgb3JkZXI6IGVudW1BcnJheVNvcnRPcmRlciA9IGVudW1BcnJheVNvcnRPcmRlci5EZXNjZW5kaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGFyciA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgYXJyLnNvcnQoZnVuY3Rpb24gKGluZm8xLCBpbmZvMikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGVudW1BcnJheVNvcnRPcmRlci5Bc2NlbmRpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mbzFba2V5XSA8IGluZm8yW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mbzFba2V5XSA+IGluZm8yW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIGVudW1BcnJheVNvcnRPcmRlci5EZXNjZW5kaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8xW2tleV0gPiBpbmZvMltrZXldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8xW2tleV0gPCBpbmZvMltrZXldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5riF56m65pWw57uEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXIoYXJyOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBpOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBsZW46IG51bWJlciA9IGFyci5sZW5ndGg7XHJcbiAgICAgICAgZm9yICg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICBhcnJbaV0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnIuc3BsaWNlKDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuaVsOaNruaYr+WQpuS4uuepuiovXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzRW1wdHkoYXJyOiBhbnlbXSk6IEJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChhcnIgPT0gbnVsbCB8fCBhcnIubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59XHJcbiIsIlxyXG4gLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMTAgMjA6MjJcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiAg5a2X5YW45bel5YW357G7XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXRpbERpY3Qge1xyXG4gICAgLyoqXHJcbiAgICAgKiDplK7liJfooahcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBrZXlzKGQ6IE9iamVjdCk6IGFueVtdIHtcclxuICAgICAgICBsZXQgYTogYW55W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZCkge1xyXG4gICAgICAgICAgICBhLnB1c2goa2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YC85YiX6KGoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdmFsdWVzKGQ6IE9iamVjdCk6IGFueVtdIHtcclxuICAgICAgICBsZXQgYTogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGQpIHtcclxuICAgICAgICAgICAgYS5wdXNoKGRba2V5XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH1cclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXnqbrlrZflhbhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGVhcihkaWM6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB2OiBhbnk7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGRpYykge1xyXG4gICAgICAgICAgICB2ID0gZGljW2tleV07XHJcbiAgICAgICAgICAgIGlmICh2IGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBVdGlsRGljdC5jbGVhcih2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWxldGUgZGljW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWo6YOo5bqU55SoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZm9yZWFjaChkaWM6IE9iamVjdCwgY29tcGFyZUZuOiAoa2V5OiBhbnksIHZhbHVlOiBhbnkpID0+IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGljKSB7XHJcbiAgICAgICAgICAgIGlmICghY29tcGFyZUZuLmNhbGwobnVsbCwga2V5LCBkaWNba2V5XSkpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc0VtcHR5KGRpYzogT2JqZWN0KTogQm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGRpYyA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGRpYykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2l6ZShkaWM6IE9iamVjdCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKGRpYyA9PSBudWxsKSByZXR1cm4gMDtcclxuXHJcbiAgICAgICAgbGV0IGNvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGljKSB7XHJcbiAgICAgICAgICAgICsrY291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgTm9kZSA9IExheWEuTm9kZTtcclxuaW1wb3J0IFNwcml0ZSA9IExheWEuU3ByaXRlO1xyXG5pbXBvcnQgUmVjdGFuZ2xlID0gTGF5YS5SZWN0YW5nbGU7XHJcbmltcG9ydCBMYWJlbCA9IExheWEuTGFiZWw7XHJcblxyXG5leHBvcnQgY2xhc3MgVXRpbERpc3BsYXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e76Zmk5YWo6YOo5a2Q5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gY29udGFpbmVyIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUFsbENoaWxkKGNvbnRhaW5lcjogTGF5YS5TcHJpdGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG4gICAgICAgIGlmIChjb250YWluZXIubnVtQ2hpbGRyZW4gPD0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB3aGlsZSAoY29udGFpbmVyLm51bUNoaWxkcmVuID4gMCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGRBdCgwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG5vZGUg6ZSA5q+BVUnoioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkZXN0cm95VUlOb2RlKG5vZGU6IE5vZGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICBub2RlLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgbm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIG5vZGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmui/h+WQjeWtl+iOt+W+l+WtkOiKgueCuVxyXG4gICAgICogQHBhcmFtIHBhcmVudCBcclxuICAgICAqIEBwYXJhbSBuYW1lIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldENoaWxkQnlOYW1lKHBhcmVudDogTm9kZSwgbmFtZTogc3RyaW5nKTogTm9kZSB7XHJcbiAgICAgICAgaWYgKCFwYXJlbnQpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmIChwYXJlbnQubmFtZSA9PT0gbmFtZSkgcmV0dXJuIHBhcmVudDtcclxuICAgICAgICBsZXQgY2hpbGQ6IE5vZGUgPSBudWxsO1xyXG4gICAgICAgIGxldCBudW06IG51bWJlciA9IHBhcmVudC5udW1DaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgKytpKSB7XHJcbiAgICAgICAgICAgIGNoaWxkID0gVXRpbERpc3BsYXkuZ2V0Q2hpbGRCeU5hbWUocGFyZW50LmdldENoaWxkQXQoaSksIG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQpIHJldHVybiBjaGlsZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiDorr7nva7lr7npvZDmlrnlvI9cclxuICAgIC8vICAqIEBwYXJhbSBhbGlnZSDlr7npvZDmlrnlvI9cclxuICAgIC8vICAqL1xyXG4gICAgLy8gcHVibGljIHN0YXRpYyBzZXRBbGlnZShub2RlOiBTcHJpdGUsIGFsaWdlOiBlbnVtQWxpZ2VUeXBlLCB3OiBudW1iZXIgPSAwLCBoOiBudW1iZXIgPSAwKSB7XHJcbiAgICAvLyAgICAgaWYgKCFub2RlKSByZXR1cm47XHJcbiAgICAvLyAgICAgbGV0IHJlY3Q6IFJlY3RhbmdsZTtcclxuICAgIC8vICAgICBpZiAodyA8PSAwIHx8IGggPD0gMCkgcmVjdCA9IG5vZGUuZ2V0Qm91bmRzKCk7XHJcbiAgICAvLyAgICAgbGV0IHdpZHRoOiBudW1iZXIgPSB3ID4gMCA/IHcgOiByZWN0LndpZHRoO1xyXG4gICAgLy8gICAgIGxldCBoZWlndGg6IG51bWJlciA9IGggPiAwID8gaCA6IHJlY3QuaGVpZ2h0O1xyXG4gICAgLy8gICAgIHN3aXRjaCAoYWxpZ2UpIHtcclxuICAgIC8vICAgICAgICAgY2FzZSBlbnVtQWxpZ2VUeXBlLkxFRlRfVE9QOlxyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5waXZvdCgwLCAwKTtcclxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuTEVGVDpcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3QoMCwgaGVpZ3RoICogMC41KTtcclxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuTEVGVF9CT1RUT006XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnBpdm90KDAsIGhlaWd0aCk7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSBlbnVtQWxpZ2VUeXBlLlRPUDpcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGggKiAwLjUsIDApO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgZW51bUFsaWdlVHlwZS5NSUQ6XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnBpdm90KHdpZHRoICogMC41LCBoZWlndGggKiAwLjUpO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgZW51bUFsaWdlVHlwZS5CT1RUT006XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnBpdm90KHdpZHRoICogMC41LCBoZWlndGgpO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgZW51bUFsaWdlVHlwZS5SSUdIVF9UT1A6XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnBpdm90KHdpZHRoLCAwKTtcclxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuUklHSFQ6XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnBpdm90KHdpZHRoLCBoZWlndGggKiAwLjUpO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgZW51bUFsaWdlVHlwZS5SSUdIVF9CT1RUT006XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnBpdm90KHdpZHRoLCBoZWlndGgpO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu66YCP5piO6YGu572pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlTWFza0xheWVyKCk6IFNwcml0ZSB7XHJcbiAgICAgICAgbGV0IGxheWVyID0gbmV3IFNwcml0ZSgpO1xyXG4gICAgICAgIGxheWVyLm1vdXNlRW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGxldCB3aWR0aCA9IGxheWVyLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aCArIDIwMDtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQgKyA0MDA7XHJcbiAgICAgICAgbGF5ZXIuZ3JhcGhpY3MuY2xlYXIodHJ1ZSk7XHJcbiAgICAgICAgbGF5ZXIuZ3JhcGhpY3MuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCwgVUlDb25maWcucG9wdXBCZ0NvbG9yKTtcclxuICAgICAgICBsYXllci5hbHBoYSA9IFVJQ29uZmlnLnBvcHVwQmdBbHBoYTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxheWVyO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vY29yZS9sb2cnO1xyXG5pbXBvcnQgeyBFdmVudEZ1bmMgfSBmcm9tICcuLi9tYW5hZ2VyL2V2ZW50L2V2ZW50LWRhdGEnO1xyXG5cclxuIC8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTAyLTI1IDE3OjIyXHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24gIDNE5qih5Z6L5Yqg6L295bel5YW357G7XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXRpbExvYWQzRCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb1VM0TlnLrmma9cclxuICAgICAqIEBwYXJhbSBhcmVhIOS9nOeUqOWfn1xyXG4gICAgICogQHBhcmFtIHBhdGgg5Zy65pmv5paH5Lu26Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gY2IgICDliqDovb3lrozmiJDlm57osINcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkU2NlbmUocGF0aCxhcmVhLGNiKTphbnlcclxuICAgIHtcclxuICAgICAgICBMYXlhLmxvYWRlci5jcmVhdGUocGF0aCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsKCk9PntcclxuICAgICAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChMYXlhLmxvYWRlci5nZXRSZXMocGF0aCkpO1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIGNiLmNhbGwoYXJlYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blnLrmma/lhoXniankvZNcclxuICAgICAqIEBwYXJhbSBzY2VuZTNkIOWcuuaZr1xyXG4gICAgICogQHBhcmFtIGNoaWxkTmFtZSDlrZDniankvZPlkI3lrZdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRTY2VuZTNEQ2hpbGQ8VD4oc2NlbmUzZCxjaGlsZE5hbWUpOlRcclxuICAgIHtcclxuICAgICAgICBsZXQgbXMgPSBzY2VuZTNkLmdldENoaWxkQnlOYW1lKGNoaWxkTmFtZSkgYXMgVDtcclxuICAgICAgICBpZiAobXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrojrflj5blnLrmma/niankvZPlpLHotKVcIik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmqKHlnovnmoTlrZDniankvZPmqKHlnotcclxuICAgICAqIEBwYXJhbSBmYXRTUCDniLbmlrlcclxuICAgICAqIEBwYXJhbSBjaGlsZE5hbWUg5a2Q5pa55ZCN5a2XXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxDaGlsZEJ5TmFtZTxUPihmYXRTUCxjaGlsZE5hbWUpOlRcclxuICAgIHtcclxuICAgICAgICBsZXQgY2hpbGQgPSBmYXRTUC5nZXRDaGlsZEJ5TmFtZShjaGlsZE5hbWUpIGFzIFQ7XHJcbiAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9nLmVycm9yKFwiRXJyb3I66I635Y+W5qih5Z6L5a2Q54mp5L2T5L+h5oGv6ZSZ6K+vXCIpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu/5o2i5qih5Z6LXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0U1Ag6KKr5pu/5o2i5qih5Z6LXHJcbiAgICAgKiBAcGFyYW0gbWlhblNQICAg5pu/5o2i5qih5Z6LXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVwbGFjZU1vZGVsKHRhcmdldFNQLG1haW5TUClcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRhcmdldFNQIHx8ICFtYWluU1ApIHtcclxuICAgICAgICAgICAgTG9nLmVycm9yKFwiRXJyb3I65pu/5o2i5oiW6KKr5pu/5o2i5qih5Z6L5L+h5oGv6ZSZ6K+vXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRhcmdldFNQLnBhcmVudCkge1xyXG4gICAgICAgICAgICB0YXJnZXRTUC5wYXJlbnQuYWRkQ2hpbGQobWFpblNQKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWFpblNQLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjModGFyZ2V0U1AudHJhbnNmb3JtLnBvc2l0aW9uLngsdGFyZ2V0U1AudHJhbnNmb3JtLnBvc2l0aW9uLnksdGFyZ2V0U1AudHJhbnNmb3JtLnBvc2l0aW9uLnopO1xyXG4gICAgICAgIG1haW5TUC50cmFuc2Zvcm0uc2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKHRhcmdldFNQLnRyYW5zZm9ybS5zY2FsZS54LHRhcmdldFNQLnRyYW5zZm9ybS5zY2FsZS55LHRhcmdldFNQLnRyYW5zZm9ybS5zY2FsZS55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabv+aNok1lc2jmqKHlnovmnZDotKhcclxuICAgICAqIEBwYXJhbSB0YXJnZXRTUCDnm67moIfmqKHlnotcclxuICAgICAqIEBwYXJhbSB0YXJnZXRNYXQg55uu5qCH5p2Q6LSoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVwbGFjZU1vZGVsTWVzaE1hdCh0YXJnZXRTUCx0YXJnZXRNYXQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0YXJnZXRTUCB8fCAhdGFyZ2V0TWF0KSB7XHJcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkVycm9yOuaooeWei+aIluadkOi0qOS/oeaBr+mUmeivr1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldFNQIGFzIExheWEuTWVzaFNwcml0ZTNEO1xyXG4gICAgICAgIHRhcmdldFNQLm1lc2hSZW5kZXJlci5tYXRlcmlhbCA9IHRhcmdldE1hdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabv+aNolNraW5NZXNo5qih5Z6L5p2Q6LSoXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0U1Ag55uu5qCH5qih5Z6LXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0TWF0IOebruagh+adkOi0qFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcGxhY2VNb2RlbFNraW5NZXNoTWF0KHRhcmdldFNQLHRhcmdldE1hdClcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRhcmdldFNQIHx8ICF0YXJnZXRNYXQpIHtcclxuICAgICAgICAgICAgTG9nLmVycm9yKFwiRXJyb3I65qih5Z6L5oiW5p2Q6LSo5L+h5oGv6ZSZ6K+vXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFyZ2V0U1AgYXMgTGF5YS5Ta2lubmVkTWVzaFNwcml0ZTNEO1xyXG4gICAgICAgIHRhcmdldFNQLnNraW5uZWRNZXNoUmVuZGVyZXIubWF0ZXJpYWwgPSB0YXJnZXRNYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blrrnlmajkuIrnmoTmnZDotKjlubblrZjlhaXlk4jluIzooahcclxuICAgICAqIEBwYXJhbSB0YXJnZXRPYmog5om/6L295p2Q6LSo55qE5a655ZmoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF0ZXJpYWxzKHNjZW5lM2QpOmFueVxyXG4gICAge1xyXG4gICAgICAgIC8qKlVuaXR55Zy65pmv5a2Y6LSu5LiA5Liq56m654mp5L2T77yM6ZmE5bimTWVzaFJlbmRlcueUqOadpeWtmOWCqOadkOi0qCoqL1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSBVdGlsTG9hZDNELmdldFNjZW5lM0RDaGlsZDxMYXlhLk1lc2hTcHJpdGUzRD4oc2NlbmUzZCxcIk1hdENvbnRhaW5lclwiKTtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrmnZDotKjlrrnlmajplJnor6/miJbkuI3lrZjlnKhcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdXNlckluZm86IHtbaW5kZXg6c3RyaW5nXTogTGF5YS5CbGlublBob25nTWF0ZXJpYWx9ID0ge31cclxuICAgICAgICB2YXIgbWF0QXJyYXJ5ID0gY29udGFpbmVyLm1lc2hSZW5kZXJlci5tYXRlcmlhbHM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aTxtYXRBcnJhcnkubGVuZ3RoO2krKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gbWF0QXJyYXJ5W2ldLm5hbWUuc2xpY2UoMCxtYXRBcnJhcnlbaV0ubmFtZS5sZW5ndGgtMTApO1xyXG4gICAgICAgICAgICB1c2VySW5mb1tuYW1lXSA9IG1hdEFycmFyeVtpXSBhcyBMYXlhLkJsaW5uUGhvbmdNYXRlcmlhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVzZXJJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5oyH5a6a5ZCN5a2X55qE5p2Q6LSoXHJcbiAgICAgKiBAcGFyYW0gbWF0QXJyYXR5IOWtmOaUvuadkOi0qOeahOWTiOW4jOihqFxyXG4gICAgICogQHBhcmFtIG1hdE5hbWUgICDmnZDotKjlkI3lrZdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXRlcmlhbEJ5TmFtZShtYXRBcnJhcnksbWF0TmFtZSk6TGF5YS5CbGlublBob25nTWF0ZXJpYWxcclxuICAgIHtcclxuICAgICAgICBpZiAoIW1hdEFycmFyeSkge1xyXG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrmnZDotKjlk4jluIzooajkv6Hmga/plJnor69cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW1hdEFycmFyeVttYXROYW1lXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkVycm9yOuaMh+WumuWTiOW4jOihqOWGheS4jeWtmOWcqFtcIittYXROYW1lK1wiXeadkOi0qFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXRBcnJhcnlbbWF0TmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7mqKHlnovliqjnlLtcclxuICAgICAqIEBwYXJhbSB0YXJnZXRTcCDmkq3mlL7niankvZNcclxuICAgICAqIEBwYXJhbSBhbmlOYW1lICDliqjnlLvlkI3lrZdcclxuICAgICAqIEBwYXJhbSBpc0Nyb3NzICDmmK/lkKbov4fluqZcclxuICAgICAqIOmAmui/h3RoaXMuYW5pbWF0b3IuZ2V0Q3VycmVudEFuaW1hdG9yUGxheVN0YXRlKDApLm5vcm1hbGl6ZWRUaW1lPj0x5Y675Yik5pat5b2T5YmN5Yqo55S75piv5ZCm5pKt5pS+5a6M5oiQXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcGxheUFuaW1hdG9yQnlOYW1lKHRhcmdldFNwLGFuaU5hbWUsaXNDcm9zcz8pOkxheWEuQW5pbWF0b3JcclxuICAgIHtcclxuICAgICAgICB2YXIgYW5pbWF0b3I6TGF5YS5BbmltYXRvciA9IHRhcmdldFNwLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICBpZiAoIWFuaW1hdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nLmVycm9yKFwiRXJyb3I65Yqo55S75py65L+h5oGv6ZSZ6K+vXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0Nyb3NzICE9IG51bGwgJiYgaXNDcm9zcyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBhbmltYXRvci5wbGF5KGFuaU5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFuaW1hdG9yLmNyb3NzRmFkZShhbmlOYW1lLDAuMik7XHJcbiAgICAgICAgcmV0dXJuIGFuaW1hdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o6n5Yi25Yqo55S76YCf5bqmXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0U3Ag55uu5qCH54mp5L2TXHJcbiAgICAgKiBAcGFyYW0gc3BlZWQg5pKt5pS+6YCf5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29udHJvbEFuaW1hdG9yU3BlZWQodGFyZ2V0U3Asc3BlZWQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFuaW1hdG9yOkxheWEuQW5pbWF0b3IgPSB0YXJnZXRTcC5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcik7XHJcbiAgICAgICAgaWYgKCFhbmltYXRvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkVycm9yOuWKqOeUu+acuuS/oeaBr+mUmeivr1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3BlZWQpIHtcclxuICAgICAgICAgICAgYW5pbWF0b3Iuc3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGFuaW1hdG9yLnNwZWVkID0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3liqjnlLvmmK/lkKblrozmiJBcclxuICAgICAqIEBwYXJhbSBhbmltYXRvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbmZpcm1BbmlDb21wbGV0ZShhbmltYXRvcjpMYXlhLkFuaW1hdG9yKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGJvb2wgPSBmYWxzZTtcclxuICAgICAgICBsZXQgaW5kZXggPSBhbmltYXRvci5nZXRDdXJyZW50QW5pbWF0b3JQbGF5U3RhdGUoMCkubm9ybWFsaXplZFRpbWU7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IDEpIHtcclxuICAgICAgICAgICAgYm9vbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBib29sO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7VXRpbE1hdGgzRH0gZnJvbSBcIi4vbWF0aDNkXCI7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wMS0xOCAxNjoyMFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOeul+azleW3peWFt+exu1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFV0aWxNYXRoIHtcclxuXHJcbiAgICAvKirlrZfoioLovazmjaJNKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQllURV9UT19NOiBudW1iZXIgPSAxIC8gKDEwMjQgKiAxMDI0KTtcclxuICAgIC8qKuWtl+iKgui9rOaNoksqL1xyXG4gICAgcHVibGljIHN0YXRpYyBCWVRFX1RPX0s6IG51bWJlciA9IDEgLyAoMTAyNCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBEZWcyUmFkOiBudW1iZXIgPSAwLjAxNzQ1MzI5O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgUmFkMkRlZzogbnVtYmVyID0gNTcuMjk1Nzg7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTaWduKGY6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICgoZiA8IDApID8gLTEgOiAxKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmZDlrprmlbDlrZflnKjojIPlm7TljLrpl7Tlubbov5Tlm55cclxuICAgICAqIEBwYXJhbSBudW1cclxuICAgICAqIEBwYXJhbSBtaW5cclxuICAgICAqIEBwYXJhbSBtYXhcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYW1wKG51bTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChudW0gPCBtaW4pIHtcclxuICAgICAgICAgICAgbnVtID0gbWluO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtID4gbWF4KSB7XHJcbiAgICAgICAgICAgIG51bSA9IG1heDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYW1wMDEodmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgMCkgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYgKHZhbHVlID4gMSkgcmV0dXJuIDE7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbGVycChmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIHQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIChmcm9tICsgKCh0byAtIGZyb20pICogVXRpbE1hdGguY2xhbXAwMSh0KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbGVycEFuZ2xlKGE6IG51bWJlciwgYjogbnVtYmVyLCB0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBudW06IG51bWJlciA9IFV0aWxNYXRoLnJlcGVhdChiIC0gYSwgMzYwKTtcclxuICAgICAgICBpZiAobnVtID4gMTgwKSBudW0gLT0gMzYwO1xyXG4gICAgICAgIHJldHVybiAoYSArIChudW0gKiBVdGlsTWF0aC5jbGFtcDAxKHQpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZXBlYXQodDogbnVtYmVyLCBsZW5ndGg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0IC0gKE1hdGguZmxvb3IodCAvIGxlbmd0aCkgKiBsZW5ndGgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS6p+eUn+maj+acuuaVsFxyXG4gICAgICog57uT5p6c77yaeD49cGFyYW0xICYmIHg8cGFyYW0yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZFJhbmdlKHBhcmFtMTogbnVtYmVyLCBwYXJhbTI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGxvYzogbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIChwYXJhbTIgLSBwYXJhbTEpICsgcGFyYW0xO1xyXG4gICAgICAgIHJldHVybiBsb2M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuqfnlJ/pmo/mnLrmlbBcclxuICAgICAqIOe7k+aenO+8mng+PXBhcmFtMSAmJiB4PD1wYXJhbTJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByYW5kUmFuZ2VJbnQocGFyYW0xOiBudW1iZXIsIHBhcmFtMjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbG9jOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogKHBhcmFtMiAtIHBhcmFtMSArIDEpICsgcGFyYW0xO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGxvYyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku47mlbDnu4TkuK3kuqfnlJ/pmo/mnLrmlbBbLTEsMSwyXVxyXG4gICAgICog57uT5p6c77yaLTEvMS8y5Lit55qE5LiA5LiqXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZFJhbmdlQXJyYXk8VD4oYXJyOiBBcnJheTxUPik6IFQge1xyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGxldCBsb2M6IFQgPSBhcnJbVXRpbE1hdGgucmFuZFJhbmdlSW50KDAsIGFyci5sZW5ndGggLSAxKV07XHJcbiAgICAgICAgcmV0dXJuIGxvYztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9rOaNouS4ujM2MOW6puinkuW6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYW1wRGVncmVlcyhkZWdyZWVzOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHdoaWxlIChkZWdyZWVzIDwgMCkgZGVncmVlcyA9IGRlZ3JlZXMgKyAzNjA7XHJcbiAgICAgICAgd2hpbGUgKGRlZ3JlZXMgPj0gMzYwKSBkZWdyZWVzID0gZGVncmVlcyAtIDM2MDtcclxuICAgICAgICByZXR1cm4gZGVncmVlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9rOaNouS4ujM2MOW6puW8p+W6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYW1wUmFkaWFucyhyYWRpYW5zOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHdoaWxlIChyYWRpYW5zIDwgMCkgcmFkaWFucyA9IHJhZGlhbnMgKyAyICogTWF0aC5QSTtcclxuICAgICAgICB3aGlsZSAocmFkaWFucyA+PSAyICogTWF0aC5QSSkgcmFkaWFucyA9IHJhZGlhbnMgLSAyICogTWF0aC5QSTtcclxuICAgICAgICByZXR1cm4gcmFkaWFucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4pOeCuemXtOeahOi3neemu1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldERpc3RhbmNlKHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeTIgLSB5MSwgMikgKyBNYXRoLnBvdyh4MiAtIHgxLCAyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRTcXVhcmVEaXN0YW5jZSh4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB4MjogbnVtYmVyLCB5MjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5wb3coeTIgLSB5MSwgMikgKyBNYXRoLnBvdyh4MiAtIHgxLCAyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4pOeCuemXtOeahOW8p+W6pu+8mnjmraPmlrnlvaLkuLow77yMWei9tOWQkeS4iyzpobrml7bpkojkuLrmraNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRMaW5lUmFkaWFucyh4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB4MjogbnVtYmVyLCB5MjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5hdGFuMih5MiAtIHkxLCB4MiAtIHgxKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldExpbmVEZWdyZWUoeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGRlZ3JlZTogbnVtYmVyID0gVXRpbE1hdGgudG9EZWdyZWUoVXRpbE1hdGguZ2V0TGluZVJhZGlhbnMoeDEsIHkxLCB4MiwgeTIpKTtcclxuICAgICAgICByZXR1cm4gVXRpbE1hdGguY2xhbXBEZWdyZWVzKGRlZ3JlZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRQb2ludFJhZGlhbnMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKHksIHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UG9pbnREZWdyZWUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBkZWdyZWU6IG51bWJlciA9IFV0aWxNYXRoLnRvRGVncmVlKFV0aWxNYXRoLmdldFBvaW50UmFkaWFucyh4LCB5KSk7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxNYXRoLmNsYW1wRGVncmVlcyhkZWdyZWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byn5bqm6L2s5YyW5Li65bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdG9EZWdyZWUocmFkaWFuOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiByYWRpYW4gKiAoMTgwLjAgLyBNYXRoLlBJKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW6pui9rOWMluS4uuW8p+W6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRvUmFkaWFuKGRlZ3JlZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gZGVncmVlICogKE1hdGguUEkgLyAxODAuMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG93YXJkcyhjdXJyZW50OiBudW1iZXIsIHRhcmdldDogbnVtYmVyLCBtYXhEZWx0YTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoTWF0aC5hYnModGFyZ2V0IC0gY3VycmVudCkgPD0gbWF4RGVsdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChjdXJyZW50ICsgKFV0aWxNYXRoLlNpZ24odGFyZ2V0IC0gY3VycmVudCkgKiBtYXhEZWx0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5LiA5a6a6IyD5Zu05YaF55qE6ZqP5py65pW05pWwXHJcbiAgICAgKiBAcGFyYW0gbWluIOacgOWwj+WAvFxyXG4gICAgICogQHBhcmFtIG1heCDmnIDlpKflgLxcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuoznu7TlkJHph4/lvZLkuIDljJZcclxuICAgICAqIEBwYXJhbSB4XHJcbiAgICAgKiBAcGFyYW0geVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG5vcm1hbGl6ZSh4Om51bWJlcix5Om51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoeCp4K3kqeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57kuKTlkJHph4/lpLnop5JcclxuICAgICAqIEBwYXJhbSB4MVxyXG4gICAgICogQHBhcmFtIHkxXHJcbiAgICAgKiBAcGFyYW0geDJcclxuICAgICAqIEBwYXJhbSB5MlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHZlY3RvckFuZ2xlKHgxOm51bWJlcix5MTpudW1iZXIseDI6bnVtYmVyLHkyOm51bWJlcik6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHgxID09IHgyICYmIHkxID09IHkyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvc0FuZ2xlID0gKHgxKngyK3kxKnkyKS8oVXRpbE1hdGgubm9ybWFsaXplKHgxLHkxKSpVdGlsTWF0aC5ub3JtYWxpemUoeDIseTIpKTtcclxuICAgICAgICB2YXIgYUNvc0FuZ2xlID0gTWF0aC5hY29zKGNvc0FuZ2xlKTtcclxuICAgICAgICB2YXIgYW5nbGUgPSBVdGlsTWF0aDNELlJhZDJEZWcoYUNvc0FuZ2xlKTtcclxuICAgICAgICBpZiAoeDEgLyB5MSA8IHgyIC8geTIpIGFuZ2xlID0gLSBhbmdsZTtcclxuICAgICAgICByZXR1cm4gYW5nbGU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgUmF5ID0gTGF5YS5SYXk7XHJcbmltcG9ydCBWZWN0b3IyID0gTGF5YS5WZWN0b3IyO1xyXG5pbXBvcnQgVmVjdG9yMyA9IExheWEuVmVjdG9yMztcclxuaW1wb3J0IFZlY3RvcjQgPSBMYXlhLlZlY3RvcjQ7XHJcbmltcG9ydCB7VXRpbFN0cmluZ30gZnJvbSBcIi4vc3RyaW5nXCI7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxODowOFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIDNk566X5rOV5bel5YW357G7XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXRpbE1hdGgzRCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX1ZlYzJUZW1wOiBWZWN0b3IyID0gbnVsbDtcclxuICAgIHByaXZhdGUgc3RhdGljIF9WZWMzVGVtcDogVmVjdG9yMyA9IG51bGw7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfVmVjNFRlbXA6IFZlY3RvcjQgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IFRlbXBWZWMyKCk6IFZlY3RvcjIge1xyXG4gICAgICAgIGlmICghVXRpbE1hdGgzRC5fVmVjMlRlbXApIFV0aWxNYXRoM0QuX1ZlYzJUZW1wID0gbmV3IFZlY3RvcjIoMCwgMCk7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxNYXRoM0QuX1ZlYzJUZW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IFRlbXBWZWMzKCk6IFZlY3RvcjMge1xyXG4gICAgICAgIGlmICghVXRpbE1hdGgzRC5fVmVjM1RlbXApIFV0aWxNYXRoM0QuX1ZlYzNUZW1wID0gbmV3IFZlY3RvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxNYXRoM0QuX1ZlYzNUZW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IFRlbXBWZWM0KCk6IFZlY3RvcjQge1xyXG4gICAgICAgIGlmICghVXRpbE1hdGgzRC5fVmVjNFRlbXApIFV0aWxNYXRoM0QuX1ZlYzRUZW1wID0gbmV3IFZlY3RvcjQoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxNYXRoM0QuX1ZlYzRUZW1wO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKui9rOaNouS4uuawtOW5s+aWueWQkSovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRvSG9yaXpvbnRhbCh2ZWM6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgICAgICB2ZWMueSA9IDA7XHJcbiAgICAgICAgcmV0dXJuIHZlYztcclxuICAgIH1cclxuXHJcbiAgICAvKirmsLTlubPot53nprsqL1xyXG4gICAgcHVibGljIHN0YXRpYyBIb3Jpem9udGFsRGlzdGFuY2UodmVjMTogVmVjdG9yMywgdmVjMjogVmVjdG9yMyk6IG51bWJlciB7XHJcbiAgICAgICAgdmVjMS55ID0gMDtcclxuICAgICAgICB2ZWMyLnkgPSAwO1xyXG4gICAgICAgIHJldHVybiBWZWN0b3IzLnNjYWxhckxlbmd0aChWZWMzU3ViKHZlYzEsIHZlYzIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlsITnur/kuIrnmoTkuIDngrkqL1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXRSYXlQb2ludChyYXk6IFJheSwgZGlzdGFuY2U6IG51bWJlcik6IFZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiBWZWMzQWRkKHJheS5vcmlnaW4sIFZlYzNNdWwocmF5LmRpcmVjdGlvbiwgZGlzdGFuY2UpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRGVzOuS4iee7tOaxguS4pOeCuei3neemuyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBWZWMzTWFnbml0dWRlKHZlYzE6IFZlY3RvcjMsdmVjMjpWZWN0b3IzKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KCh2ZWMxLngtdmVjMi54KSAqICh2ZWMxLngtdmVjMi54KSArICgodmVjMS55LXZlYzIueSkgKiAodmVjMS55LXZlYzIueSkpICsgKCh2ZWMxLnotdmVjMi56KSAqICh2ZWMxLnotdmVjMi56KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXM65LqM57u05rGC5Lik54K56Led56a7ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFZlYzJNYWduaXR1ZGUodmVjMTogVmVjdG9yMix2ZWMyOlZlY3RvcjIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoKHZlYzEueC12ZWMyLngpICogKHZlYzEueC12ZWMyLngpICsgKCh2ZWMxLnktdmVjMi55KSAqICh2ZWMxLnktdmVjMi55KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXM66KeS5bqm6L2s5byn5bqmICovXHJcbiAgICBwdWJsaWMgc3RhdGljIERlZzJSYWQoYW5nbGU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIExheWEuVXRpbHMudG9SYWRpYW4oYW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXM65byn5bqm6L2s6KeS5bqmICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFJhZDJEZWcocmFkaWFuOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiBMYXlhLlV0aWxzLnRvQW5nbGUocmFkaWFuKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRGVzOuato+W8piAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzaW4oYW5nbGU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgdmFyIHJhZGlhbiA9IFV0aWxNYXRoM0QuRGVnMlJhZChhbmdsZSk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc2luKHJhZGlhbik7XHJcbiAgICB9XHJcbiAgICAvKiogRGVzOuS9meW8piAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjb3MoYW5nbGU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgdmFyIHJhZGlhbiA9IFV0aWxNYXRoM0QuRGVnMlJhZChhbmdsZSk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguY29zKHJhZGlhbik7XHJcbiAgICB9XHJcbiAgICAvKiogRGVzOuato+WIhyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0YW4oYW5nbGU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgdmFyIHJhZGlhbiA9IFV0aWxNYXRoM0QuRGVnMlJhZChhbmdsZSk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgudGFuKHJhZGlhbik7XHJcbiAgICB9XHJcbiAgICAvKiogRGVzOuWPjeato+W8piAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhc2luKGFuZ2xlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHZhciByYWRpYW4gPSBVdGlsTWF0aDNELkRlZzJSYWQoYW5nbGUpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFzaW4ocmFkaWFuKTtcclxuICAgIH1cclxuICAgIC8qKiBEZXM65Y+N5L2Z5bymICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFjb3MoYW5nbGU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgdmFyIHJhZGlhbiA9IFV0aWxNYXRoM0QuRGVnMlJhZChhbmdsZSk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWNvcyhyYWRpYW4pO1xyXG4gICAgfVxyXG4gICAgLyoqIERlczrlj43mraPliIcgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYXRhbihhbmdsZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICB2YXIgcmFkaWFuID0gVXRpbE1hdGgzRC5EZWcyUmFkKGFuZ2xlKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5hdGFuKHJhZGlhbik7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59XHJcblxyXG4vL++9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nnZlYzLvvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ4vL1xyXG5leHBvcnQgZnVuY3Rpb24gVmVjMkFkZChhOiBWZWN0b3IyLCBiOiBWZWN0b3IyKTogVmVjdG9yMiB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIoYS54ICsgYi54LCBhLnkgKyBiLnkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjMlN1YihhOiBWZWN0b3IyLCBiOiBWZWN0b3IyKTogVmVjdG9yMiB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIoYS54IC0gYi54LCBhLnkgLSBiLnkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjMk11bHRpcGx5KGE6IFZlY3RvcjIsIGI6IFZlY3RvcjIpOiBWZWN0b3IyIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMihhLnggKiBiLngsIGEueSAqIGIueSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyTXVsKGE6IFZlY3RvcjIsIGQ6IG51bWJlcik6IFZlY3RvcjIge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyKGEueCAqIGQsIGEueSAqIGQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjMkRpdihhOiBWZWN0b3IyLCBkOiBudW1iZXIpOiBWZWN0b3IyIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMihhLnggLyBkLCBhLnkgLyBkKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzJEb3QobGhzOiBWZWN0b3IyLCByaHM6IFZlY3RvcjIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuICgobGhzLnggKiByaHMueCkgKyAobGhzLnkgKiByaHMueSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjMlByb2plY3QodmVjdG9yOiBWZWN0b3IyLCBvbk5vcm1hbDogVmVjdG9yMik6IFZlY3RvcjIge1xyXG4gICAgbGV0IG51bTogbnVtYmVyID0gVmVjMkRvdChvbk5vcm1hbCwgb25Ob3JtYWwpO1xyXG4gICAgaWYgKG51bSA8IDFFLTA1KSB7XHJcbiAgICAgICAgcmV0dXJuIFZlY3RvcjIuWkVSTztcclxuICAgIH1cclxuICAgIHJldHVybiAoVmVjMkRpdihWZWMyTXVsKG9uTm9ybWFsLCBWZWMyRG90KHZlY3Rvciwgb25Ob3JtYWwpKSwgbnVtKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyTWluKGxoczogVmVjdG9yMiwgcmhzOiBWZWN0b3IyKTogVmVjdG9yMiB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIoTWF0aC5taW4obGhzLngsIHJocy54KSwgTWF0aC5taW4obGhzLnksIHJocy55KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyTWF4KGxoczogVmVjdG9yMiwgcmhzOiBWZWN0b3IyKTogVmVjdG9yMiB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIoTWF0aC5tYXgobGhzLngsIHJocy54KSwgTWF0aC5tYXgobGhzLnksIHJocy55KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyTWFnbml0dWRlKHZlYzogVmVjdG9yMik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh2ZWMueCAqIHZlYy54KSArICh2ZWMueSAqIHZlYy55KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyU3FyTWFnbml0dWRlKHZlYzogVmVjdG9yMik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gKHZlYy54ICogdmVjLngpICsgKHZlYy55ICogdmVjLnkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjMk5vcm1hbGl6ZWQodmVjOiBWZWN0b3IyKTogVmVjdG9yMiB7XHJcbiAgICBsZXQgbWFnbml0dWRlOiBudW1iZXIgPSBWZWMyTWFnbml0dWRlKHZlYyk7XHJcbiAgICBsZXQgdjogVmVjdG9yMjtcclxuICAgIGlmIChtYWduaXR1ZGUgPiAxRS0wNSlcclxuICAgICAgICB2ID0gVmVjMkRpdih2ZWMsIG1hZ25pdHVkZSk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgdiA9IG5ldyBWZWN0b3IyKDAsIDApO1xyXG4gICAgcmV0dXJuIHY7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyTm9ybWFsKHZlYzogVmVjdG9yMik6IHZvaWQge1xyXG4gICAgbGV0IG1hZ25pdHVkZTogbnVtYmVyID0gVmVjMk1hZ25pdHVkZSh2ZWMpO1xyXG4gICAgaWYgKG1hZ25pdHVkZSA+IDFFLTA1KSB7XHJcbiAgICAgICAgbGV0IHY6IFZlY3RvcjIgPSBWZWMyRGl2KHZlYywgbWFnbml0dWRlKTtcclxuICAgICAgICBWZWMyU2V0KHZlYywgdi54LCB2LnkpO1xyXG4gICAgfSBlbHNlXHJcbiAgICAgICAgVmVjMlNldCh2ZWMsIDAsIDApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjMlNldCh2OiBWZWN0b3IyLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IFZlY3RvcjIge1xyXG4gICAgdi54ID0geDtcclxuICAgIHYueSA9IHk7XHJcbiAgICA7XHJcbiAgICByZXR1cm4gdjtcclxufVxyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIFZlYzJBbmdsZShmcm9tOiBWZWN0b3IyLCB0bzogVmVjdG9yMik6IG51bWJlciB7XHJcbi8vICAgICByZXR1cm4gKE1hdGguYWNvcyhVdGlsTWF0aC5jbGFtcChWZWMyRG90KFZlYzJOb3JtYWxpemVkKGZyb20pLCBWZWMyTm9ybWFsaXplZCh0bykpLCAtMSwgMSkpICogNTcuMjk1NzgpO1xyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjMkNsYW1wTWFnbml0dWRlKHZlY3RvcjogVmVjdG9yMiwgbWF4TGVuZ3RoKTogVmVjdG9yMiB7XHJcbiAgICBpZiAoVmVjMlNxck1hZ25pdHVkZSh2ZWN0b3IpID4gKG1heExlbmd0aCAqIG1heExlbmd0aCkpIHtcclxuICAgICAgICByZXR1cm4gKFZlYzJNdWwoVmVjMk5vcm1hbGl6ZWQodmVjdG9yKSwgbWF4TGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmVjdG9yO1xyXG59XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gVmVjMkxlcnAoZnJvbTogVmVjdG9yMiwgdG86IFZlY3RvcjIsIHQ6IG51bWJlcik6IFZlY3RvcjIge1xyXG4vLyAgICAgdCA9IFV0aWxNYXRoLmNsYW1wKHQsIDAsIDEpO1xyXG4vLyAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKGZyb20ueCArICgodG8ueCAtIGZyb20ueCkgKiB0KSwgZnJvbS55ICsgKCh0by55IC0gZnJvbS55KSAqIHQpKTtcclxuLy8gfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzJNb3ZlVG93YXJkcyhjdXJyZW50OiBWZWN0b3IyLCB0YXJnZXQ6IFZlY3RvcjIsIG1heERpc3RhbmNlRGVsdGE6IG51bWJlcik6IFZlY3RvcjIge1xyXG4gICAgbGV0IHZlY3RvcjogVmVjdG9yMiA9IFZlYzJTdWIodGFyZ2V0LCBjdXJyZW50KTtcclxuICAgIGxldCBtYWduaXR1ZGU6IG51bWJlciA9IFZlYzJNYWduaXR1ZGUodmVjdG9yKTtcclxuICAgIGlmICgobWFnbml0dWRlID4gbWF4RGlzdGFuY2VEZWx0YSkgJiYgKG1hZ25pdHVkZSAhPSAwKSkge1xyXG4gICAgICAgIHJldHVybiBWZWMyQWRkKGN1cnJlbnQsIChWZWMyTXVsKFZlYzJEaXYodmVjdG9yLCBtYWduaXR1ZGUpLCBtYXhEaXN0YW5jZURlbHRhKSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzJUb1N0cmluZyh2ZWM6IFZlY3RvcjIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFV0aWxTdHJpbmcuZm9ybWF0KFwiKHswfSwgezF9KVwiLCB2ZWMueCwgdmVjLnkpO1xyXG59XHJcblxyXG4vL++9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nnZlYzPvvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ7vvZ4vL1xyXG5leHBvcnQgZnVuY3Rpb24gVmVjM0FkZChhOiBWZWN0b3IzLCBiOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoYS54ICsgYi54LCBhLnkgKyBiLnksIGEueiArIGIueik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzU3ViKGE6IFZlY3RvcjMsIGI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhhLnggLSBiLngsIGEueSAtIGIueSwgYS56IC0gYi56KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNNdWx0aXBseShhOiBWZWN0b3IzLCBiOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoYS54ICogYi54LCBhLnkgKiBiLnksIGEueiAqIGIueik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzTXVsKGE6IFZlY3RvcjMsIGQ6IG51bWJlcik6IFZlY3RvcjMge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGEueCAqIGQsIGEueSAqIGQsIGEueiAqIGQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjM0RpdihhOiBWZWN0b3IzLCBkOiBudW1iZXIpOiBWZWN0b3IzIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhhLnggLyBkLCBhLnkgLyBkLCBhLnogLyBkKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNDcm9zcyhsaHM6IFZlY3RvcjMsIHJoczogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKChsaHMueSAqIHJocy56KSAtIChsaHMueiAqIHJocy55KSwgKGxocy56ICogcmhzLngpIC0gKGxocy54ICogcmhzLnopLCAobGhzLnggKiByaHMueSkgLSAobGhzLnkgKiByaHMueCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjM1Byb2plY3QodmVjdG9yOiBWZWN0b3IzLCBvbk5vcm1hbDogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgbGV0IG51bTogbnVtYmVyID0gVmVjdG9yMy5kb3Qob25Ob3JtYWwsIG9uTm9ybWFsKTtcclxuICAgIGlmIChudW0gPCAxRS0wNSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChWZWMzRGl2KFZlYzNNdWwob25Ob3JtYWwsIFZlY3RvcjMuZG90KHZlY3Rvciwgb25Ob3JtYWwpKSwgbnVtKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzTWluKGxoczogVmVjdG9yMywgcmhzOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoTWF0aC5taW4obGhzLngsIHJocy54KSwgTWF0aC5taW4obGhzLnksIHJocy55KSwgTWF0aC5taW4obGhzLnosIHJocy56KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzTWF4KGxoczogVmVjdG9yMywgcmhzOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoTWF0aC5tYXgobGhzLngsIHJocy54KSwgTWF0aC5tYXgobGhzLnksIHJocy55KSwgTWF0aC5tYXgobGhzLnosIHJocy56KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzTWFnbml0dWRlKHZlYzogVmVjdG9yMyk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh2ZWMueCAqIHZlYy54KSArICh2ZWMueSAqIHZlYy55KSArICh2ZWMueiAqIHZlYy56KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzU3FyTWFnbml0dWRlKHZlYzogVmVjdG9yMyk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gKHZlYy54ICogdmVjLngpICsgKHZlYy55ICogdmVjLnkpICsgKHZlYy56ICogdmVjLnopO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjM05vcm1hbGl6ZWQodmVjOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICBsZXQgbWFnbml0dWRlOiBudW1iZXIgPSBWZWN0b3IzLnNjYWxhckxlbmd0aCh2ZWMpO1xyXG4gICAgbGV0IHY6IFZlY3RvcjM7XHJcbiAgICBpZiAobWFnbml0dWRlID4gMUUtMDUpXHJcbiAgICAgICAgdiA9IFZlYzNEaXYodmVjLCBtYWduaXR1ZGUpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHYgPSBuZXcgVmVjdG9yMygwLCAwLCAwKTtcclxuICAgIHJldHVybiB2O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjM05vcm1hbCh2ZWM6IFZlY3RvcjMpOiB2b2lkIHtcclxuICAgIGxldCBtYWduaXR1ZGU6IG51bWJlciA9IFZlY3RvcjMuc2NhbGFyTGVuZ3RoKHZlYyk7XHJcbiAgICBpZiAobWFnbml0dWRlID4gMUUtMDUpIHtcclxuICAgICAgICBsZXQgdjogVmVjdG9yMyA9IFZlYzNEaXYodmVjLCBtYWduaXR1ZGUpO1xyXG4gICAgICAgIFZlYzNTZXQodmVjLCB2LngsIHYueSwgdi56KTtcclxuICAgIH0gZWxzZVxyXG4gICAgICAgIFZlYzNTZXQodmVjLCAwLCAwLCAwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNTZXQodjogVmVjdG9yMywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IFZlY3RvcjMge1xyXG4gICAgdi54ID0geDtcclxuICAgIHYueSA9IHk7XHJcbiAgICB2LnogPSB6O1xyXG4gICAgcmV0dXJuIHY7XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBWZWMzQW5nbGUoZnJvbTogVmVjdG9yMywgdG86IFZlY3RvcjMpOiBudW1iZXIge1xyXG4vLyAgICAgcmV0dXJuIChNYXRoLmFjb3MoVXRpbE1hdGguY2xhbXAoVmVjdG9yMy5kb3QoVmVjM05vcm1hbGl6ZWQoZnJvbSksIFZlYzNOb3JtYWxpemVkKHRvKSksIC0xLCAxKSkgKiA1Ny4yOTU3OCk7XHJcbi8vIH1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzQ2xhbXBNYWduaXR1ZGUodmVjdG9yOiBWZWN0b3IzLCBtYXhMZW5ndGgpOiBWZWN0b3IzIHtcclxuICAgIGlmIChWZWN0b3IzLnNjYWxhckxlbmd0aFNxdWFyZWQodmVjdG9yKSA+IChtYXhMZW5ndGggKiBtYXhMZW5ndGgpKSB7XHJcbiAgICAgICAgcmV0dXJuIChWZWMzTXVsKFZlYzNOb3JtYWxpemVkKHZlY3RvciksIG1heExlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZlY3RvcjtcclxufVxyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIFZlYzNMZXJwKGZyb206IFZlY3RvcjMsIHRvOiBWZWN0b3IzLCB0OiBudW1iZXIpOiBWZWN0b3IzIHtcclxuLy8gICAgIHQgPSBVdGlsTWF0aC5jbGFtcCh0LCAwLCAxKTtcclxuLy8gICAgIHJldHVybiBuZXcgVmVjdG9yMyhmcm9tLnggKyAoKHRvLnggLSBmcm9tLngpICogdCksIGZyb20ueSArICgodG8ueSAtIGZyb20ueSkgKiB0KSwgZnJvbS56ICsgKCh0by56IC0gZnJvbS56KSAqIHQpKTtcclxuLy8gfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNNb3ZlVG93YXJkcyhjdXJyZW50OiBWZWN0b3IzLCB0YXJnZXQ6IFZlY3RvcjMsIG1heERpc3RhbmNlRGVsdGE6IG51bWJlcik6IFZlY3RvcjMge1xyXG4gICAgbGV0IHZlY3RvcjogVmVjdG9yMyA9IFZlYzNTdWIodGFyZ2V0LCBjdXJyZW50KTtcclxuICAgIGxldCBtYWduaXR1ZGU6IG51bWJlciA9IFZlY3RvcjMuc2NhbGFyTGVuZ3RoKHZlY3Rvcik7XHJcbiAgICBpZiAoKG1hZ25pdHVkZSA+IG1heERpc3RhbmNlRGVsdGEpICYmIChtYWduaXR1ZGUgIT0gMCkpIHtcclxuICAgICAgICByZXR1cm4gVmVjM0FkZChjdXJyZW50LCAoVmVjM011bChWZWMzRGl2KHZlY3RvciwgbWFnbml0dWRlKSwgbWF4RGlzdGFuY2VEZWx0YSkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzVG9TdHJpbmcodmVjOiBWZWN0b3IzKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBVdGlsU3RyaW5nLmZvcm1hdChcIih7MH0sIHsxfSwgezJ9KVwiLCB2ZWMueCwgdmVjLnksIHZlYy56KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOW8p+W6pui9rOWQkemHj1xyXG4gKiBAcGFyYW0gICAgcmFkaWFucyAgICDlvKfluqZcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW5lRnJvbVJhZGlhbnMocmFkaWFuczogbnVtYmVyKTogVmVjdG9yMiB7XHJcbiAgICBsZXQgeDogbnVtYmVyID0gTWF0aC5jb3MocmFkaWFucyk7XHJcbiAgICBsZXQgeTogbnVtYmVyID0gTWF0aC5zaW4ocmFkaWFucyk7XHJcbiAgICBsZXQgZGlyOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoeCwgeSk7XHJcbiAgICBWZWMyTm9ybWFsKGRpcik7XHJcbiAgICByZXR1cm4gZGlyO1xyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBVdGlsU3RyaW5nIH0gZnJvbSAnLi9zdHJpbmcnO1xyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMTEgMTg6NTRcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDmlbDlgLzlt6XlhbfnsbtcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBVdGlsTnVtYmVyIHtcclxuICAgIC8qKlxyXG4gICAgICog5L+d55WZ5bCP5pWw54K55ZCO5Yeg5L2NXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdG9GaXhlZCh2YWx1ZTogbnVtYmVyLCBwOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBVdGlsU3RyaW5nLnRvTnVtYmVyKHZhbHVlLnRvRml4ZWQocCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdG9JbnQodmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNJbnQodmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwodmFsdWUpID09IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+d55WZ5pyJ5pWI5pWw5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVzZXJ2ZU51bWJlcihudW06IG51bWJlciwgc2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgc3RyID0gU3RyaW5nKG51bSk7XHJcbiAgICAgICAgbGV0IGwgPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgIGxldCBwX2luZGV4OiBudW1iZXIgPSBzdHIuaW5kZXhPZihcIi5cIik7XHJcbiAgICAgICAgaWYgKHBfaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXQ6IHN0cmluZyA9IHN0ci5zbGljZSgwLCBwX2luZGV4ICsgMSk7XHJcblxyXG4gICAgICAgIGxldCBsYXN0TnVtID0gbCAtIHBfaW5kZXg7XHJcbiAgICAgICAgaWYgKGxhc3ROdW0gPiBzaXplKSB7XHJcbiAgICAgICAgICAgIGxhc3ROdW0gPSBzaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGFzdFN0cjogc3RyaW5nID0gc3RyLnNsaWNlKHBfaW5kZXggKyAxLCBwX2luZGV4ICsgMSArIGxhc3ROdW0pO1xyXG4gICAgICAgIHJldHVybiBVdGlsU3RyaW5nLnRvTnVtYmVyKHJldCArIGxhc3RTdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+d55WZ5pyJ5pWI5pWw5YC877yM5LiN5aSf6KGlMO+8m+azqOaEj+i/lOWbnueahOaYr+Wtl+espuS4slxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlc2VydmVOdW1iZXJXaXRoWmVybyhudW06IG51bWJlciwgc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgc3RyID0gU3RyaW5nKG51bSk7XHJcbiAgICAgICAgbGV0IGwgPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgIGxldCBwX2luZGV4OiBudW1iZXIgPSBzdHIuaW5kZXhPZihcIi5cIik7XHJcbiAgICAgICAgaWYgKHBfaW5kZXggPCAwKSB7Ly/mmK/mlbTmlbBcclxuICAgICAgICAgICAgc3RyICs9ICcuJztcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyArK2kpIHN0ciArPSAnMCc7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXQ6IHN0cmluZyA9IHN0ci5zbGljZSgwLCBwX2luZGV4ICsgMSk7XHJcblxyXG4gICAgICAgIGxldCBsYXN0TnVtID0gbCAtIHBfaW5kZXggLSAxO1xyXG4gICAgICAgIGlmIChsYXN0TnVtID4gc2l6ZSkgey8v6LaF6L+HXHJcbiAgICAgICAgICAgIGxhc3ROdW0gPSBzaXplO1xyXG4gICAgICAgICAgICBsZXQgbGFzdFN0cjogc3RyaW5nID0gc3RyLnNsaWNlKHBfaW5kZXggKyAxLCBwX2luZGV4ICsgMSArIGxhc3ROdW0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0ICsgbGFzdFN0cjtcclxuICAgICAgICB9IGVsc2UgaWYgKGxhc3ROdW0gPCBzaXplKSB7Ly/kuI3otrPooaUwXHJcbiAgICAgICAgICAgIGxldCBkaWZmOiBudW1iZXIgPSBzaXplIC0gbGFzdE51bTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWZmOyArK2kpIHN0ciArPSAnMCc7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHI7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmb3JtYXRUaG91c2FuZHNOdW1iZXIobnVtOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAobnVtIDwgMTAwMDAwMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPCAxMDAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIGxldCB0ID0gTWF0aC5mbG9vcihudW0gLyAxMDAwKVxyXG4gICAgICAgICAgICByZXR1cm4gdC50b0xvY2FsZVN0cmluZygpICsgXCJLXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHQgPSBNYXRoLmZsb29yKG51bSAvIDEwMDAwMDApXHJcbiAgICAgICAgICAgIHJldHVybiB0LnRvTG9jYWxlU3RyaW5nKCkgKyBcIk1cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZvcm1hdE51bWJlclNob3J0KG51bSwgZml4ZWQ6IG51bWJlciA9IDApIHtcclxuXHJcbiAgICAgICAgaWYgKG51bSA8IDEwMDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICB9IGVsc2UgaWYgKG51bSA8IDEwMDAwMDApIHtcclxuICAgICAgICAgICAgbGV0IHQgPSBNYXRoLmZsb29yKG51bSAvIDEwMDApLnRvRml4ZWQoZml4ZWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdCArIFwiS1wiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtIDwgMTAwMDAwMDAwMCkge1xyXG4gICAgICAgICAgICBsZXQgdCA9IE1hdGguZmxvb3IobnVtIC8gMTAwMDAwMCkudG9GaXhlZChmaXhlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ICsgXCJNXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHQgPSBNYXRoLmZsb29yKG51bSAvIDEwMDAwMDAwMDApLnRvRml4ZWQoZml4ZWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdC50b0xvY2FsZVN0cmluZygpICsgXCJHXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp5HlraborqHmlbDms5XmmL7npLpcclxuICAgICAqIEBwYXJhbSBudW0xXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYmlnTnVtYmVyRm9ybWF0KG51bTogc3RyaW5nLGZpeGVkOm51bWJlciA9IDIpIHtcclxuICAgICAgICBsZXQgZXh0cyA9IFtcclxuICAgICAgICAgICAgJycsICdLJywgXCJNXCIsIFwiR1wiLCBcIlRcIiwgXCJQXCIsIFwiRVwiLCBcIlpcIiwgXCJZXCIsIFwiQUFcIixcclxuICAgICAgICAgICAgXCJCQlwiLCBcIkNDXCIsICdERCcsICdFRScsIFwiRkZcIiwgXCJHR1wiLCBcIkhIXCIsIFwiSUlcIixcclxuICAgICAgICAgICAgXCJKSlwiLCBcIktLXCIsICdMTCcsICdNTScsIFwiTk5cIiwgXCJPT1wiLCBcIlBQXCIsIFwiUVFcIixcclxuICAgICAgICAgICAgXCJSUlwiLCBcIlNTXCIsICdUVCcsICdVVScsIFwiVlZcIiwgXCJXV1wiLCBcIlhYXCIsIFwiWVlcIixcclxuICAgICAgICAgICAgXCJaWlwiLCBcImFhXCIsICdiYicsICdjYycsIFwiZGRcIiwgXCJlZVwiLCBcImZmXCIsIFwiZ2dcIixcclxuICAgICAgICAgICAgXCJoaFwiLCBcImlpXCIsICdnZycsICdraycsIFwibGxcIiwgXCJtbVwiLCBcIm5uXCIsIFwib29cIixcclxuICAgICAgICAgICAgXCJwcFwiLCBcInFxXCIsICdycicsICdzcycsIFwidHRcIiwgXCJ1dVwiLCBcInZ2XCIsIFwid3dcIlxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGxldCB0MSwgdDI7XHJcbiAgICAgICAgbGV0IG4xID0gbnVtLmluZGV4T2YoXCJlK1wiKTtcclxuICAgICAgICBpZiAobjEgPT0gLTEpIG4xID0gbnVtLmluZGV4T2YoXCJFXCIpO1xyXG4gICAgICAgIGlmIChuMSAmJiBuMSAhPSAtMSkge1xyXG4gICAgICAgICAgICB0MSA9IHBhcnNlRmxvYXQobnVtLnN1YnN0cigwLCBuMSkpO1xyXG4gICAgICAgICAgICB0MiA9IHBhcnNlSW50KG51bS5zdWJzdHIobjEgKyAyKSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZXh0ID0gTWF0aC5mbG9vcih0MiAvIDMpO1xyXG4gICAgICAgICAgICBsZXQgbSA9IHQyICUgMztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAodDEgKiBNYXRoLnBvdygxMCxtKSkudG9GaXhlZChmaXhlZCkgKyBleHRzW2V4dF07XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaVsOWtl+ebuOWKoFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGJpZ051bWJlckFkZChudW0xOiBzdHJpbmcsIG51bTI6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBiID0gTnVtYmVyKG51bTEpICsgTnVtYmVyKG51bTIpO1xyXG4gICAgICAgIHJldHVybiBiLnRvRXhwb25lbnRpYWwoNCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDlrZfnm7jlh49cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBiaWdOdW1iZXJTdWIobnVtMTogc3RyaW5nLCBudW0yOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbjEgPSBOdW1iZXIobnVtMSk7XHJcbiAgICAgICAgbGV0IG4yID0gTnVtYmVyKG51bTIpO1xyXG4gICAgICAgIGlmIChuMSA8IG4yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChuMSAtIG4yKS50b0V4cG9uZW50aWFsKDQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pWw5a2X55u45LmY5rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYmlnTnVtYmVyTXVsKG51bTE6IHN0cmluZywgbnVtMjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIobnVtMSkgKiBudW0yKS50b0V4cG9uZW50aWFsKDQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pWw5a2X55u46ZmkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYmlnTnVtYmVyRGl2KG51bTE6IHN0cmluZywgbnVtMjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIobnVtMSkgLyBudW0yKS50b0V4cG9uZW50aWFsKDQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lik5Liq56eR5a2m6K6h5pWw55u46ZmkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYmlnTnVtYmVyRGl2RG91bmJsZShudW0xOiBzdHJpbmcsIG51bTI6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiAoTnVtYmVyKG51bTEpIC8gTnVtYmVyKG51bTIpKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMTEgMTg6NTVcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDlrZfnrKbkuLLlt6XlhbfnsbtcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBVdGlsU3RyaW5nIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBlbXB0eSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a2X56ym5Liy5piv5ZCm5pyJ5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNFbXB0eShzOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHMgIT0gbnVsbCAmJiBzLmxlbmd0aCA+IDApID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdG9JbnQoc3RyOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghc3RyIHx8IHN0ci5sZW5ndGggPT0gMCkgcmV0dXJuIDA7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHN0cik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB0b051bWJlcihzdHI6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCFzdHIgfHwgc3RyLmxlbmd0aCA9PSAwKSByZXR1cm4gMDtcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5a2X56ym5Liy55yf5a6e6ZW/5bqmLOazqO+8mlxyXG4gICAgICogMS7mma7pgJrmlbDnu4TvvIzlrZfnrKbljaAx5a2X6IqC77yb5rGJ5a2Q5Y2g5Lik5Liq5a2X6IqCXHJcbiAgICAgKiAyLuWmguaenOWPmOaIkOe8luegge+8jOWPr+iDveiuoeeul+aOpeWPo+S4jeWvuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE51bUJ5dGVzKHN0cjogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgcmVhbExlbmd0aCA9IDAsIGxlbiA9IHN0ci5sZW5ndGgsIGNoYXJDb2RlID0gLTE7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgICAgICBpZiAoY2hhckNvZGUgPj0gMCAmJiBjaGFyQ29kZSA8PSAxMjgpIHJlYWxMZW5ndGggKz0gMTtcclxuICAgICAgICAgICAgZWxzZSByZWFsTGVuZ3RoICs9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZWFsTGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6KGl6Zu2XHJcbiAgICAgKiBAcGFyYW0gc3RyXHJcbiAgICAgKiBAcGFyYW0gbGVuXHJcbiAgICAgKiBAcGFyYW0gZGlyIDAt5ZCO77ybMS3liY1cclxuICAgICAqIEByZXR1cm5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhZGRaZXJvKHN0cjogc3RyaW5nLCBsZW46IG51bWJlciwgZGlyOiBudW1iZXIgPSAwKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgX3N0cjogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBsZXQgX2xlbjogbnVtYmVyID0gc3RyLmxlbmd0aDtcclxuICAgICAgICBsZXQgc3RyX3ByZV96ZXJvOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGxldCBzdHJfZW5kX3plcm86IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGRpciA9PSAwKVxyXG4gICAgICAgICAgICBzdHJfZW5kX3plcm8gPSBcIjBcIjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHN0cl9wcmVfemVybyA9IFwiMFwiO1xyXG5cclxuICAgICAgICBpZiAoX2xlbiA8IGxlbikge1xyXG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKGkgPCBsZW4gLSBfbGVuKSB7XHJcbiAgICAgICAgICAgICAgICBfc3RyID0gc3RyX3ByZV96ZXJvICsgX3N0ciArIHN0cl9lbmRfemVybztcclxuICAgICAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIF9zdHIgKyBzdHI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y676Zmk5bem5Y+z56m65qC8XHJcbiAgICAgKiBAcGFyYW0gaW5wdXRcclxuICAgICAqIEByZXR1cm5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmltKGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXlxccyt8XFxzKyRcIlwiXlxccyt8XFxzKyQvZywgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljrvpmaTlt6bkvqfnqbrmoLxcclxuICAgICAqIEBwYXJhbSBpbnB1dFxyXG4gICAgICogQHJldHVyblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRyaW1MZWZ0KGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXlxccytcIlwiXlxccysvLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOu+mZpOWPs+S+p+epuuagvFxyXG4gICAgICogQHBhcmFtIGlucHV0XHJcbiAgICAgKiBAcmV0dXJuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdHJpbVJpZ2h0KGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxzKyRcIlwiXFxzKyQvLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIhumSn+S4juenkuagvOW8jyjlpoItPiA0MDoxNSlcclxuICAgICAqIEBwYXJhbSBzZWNvbmRzIOenkuaVsFxyXG4gICAgICogQHJldHVyblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1pbnV0ZUZvcm1hdChzZWNvbmRzOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBtaW46IG51bWJlciA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICAgICAgICBsZXQgc2VjOiBudW1iZXIgPSBNYXRoLmZsb29yKHNlY29uZHMgJSA2MCk7XHJcblxyXG4gICAgICAgIGxldCBtaW5fc3RyOiBzdHJpbmcgPSBtaW4gPCAxMCA/IChcIjBcIiArIG1pbi50b1N0cmluZygpKSA6IChtaW4udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgbGV0IHNlY19zdHI6IHN0cmluZyA9IHNlYyA8IDEwID8gKFwiMFwiICsgc2VjLnRvU3RyaW5nKCkpIDogKHNlYy50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1pbl9zdHIgKyBcIjpcIiArIHNlY19zdHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml7bliIbnp5LmoLzlvI8o5aaCLT4gMDU6MzI6MjApXHJcbiAgICAgKiBAcGFyYW0gc2Vjb25kcyjnp5IpXHJcbiAgICAgKiBAcmV0dXJuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaG91ckZvcm1hdChzZWNvbmRzOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBob3VyOiBudW1iZXIgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcclxuICAgICAgICBsZXQgaG91cl9zdHI6IFN0cmluZyA9IGhvdXIgPCAxMCA/IChcIjBcIiArIGhvdXIudG9TdHJpbmcoKSkgOiAoaG91ci50b1N0cmluZygpKTtcclxuICAgICAgICByZXR1cm4gaG91cl9zdHIgKyBcIjpcIiArIFV0aWxTdHJpbmcubWludXRlRm9ybWF0KHNlY29uZHMgJSAzNjAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagvOW8j+WMluWtl+espuS4slxyXG4gICAgICogQHBhcmFtIHN0ciDpnIDopoHmoLzlvI/ljJbnmoTlrZfnrKbkuLLvvIzjgJBcIuadsOWNq++8jOi/memHjOaciXswfeS4quiLueaenO+8jOWSjHsxfeS4qummmeiVie+8gVwiLCA1LDEw44CRXHJcbiAgICAgKiBAcGFyYW0gYXJncyDlj4LmlbDliJfooahcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmb3JtYXQoc3RyOiBzdHJpbmcsIC4uLmFyZ3MpOiBzdHJpbmcge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShuZXcgUmVnRXhwKFwiXFxcXHtcIiArIGkgKyBcIlxcXFx9XCIsIFwiZ21cIiksIGFyZ3NbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lul5oyH5a6a5a2X56ym5byA5aeLXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYmVnaW5zV2l0aChpbnB1dDogc3RyaW5nLCBwcmVmaXg6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBwcmVmaXggPT0gaW5wdXQuc3Vic3RyaW5nKDAsIHByZWZpeC5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lul5oyH5a6a5a2X56ym57uT5p2fXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZW5kc1dpdGgoaW5wdXQ6IHN0cmluZywgc3VmZml4OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gc3VmZml4ID09IGlucHV0LnN1YnN0cmluZyhpbnB1dC5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipndWlkKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0R1VJRFN0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBkID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBpZiAod2luZG93LnBlcmZvcm1hbmNlICYmIHR5cGVvZiB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgZCArPSBwZXJmb3JtYW5jZS5ub3coKTsgLy91c2UgaGlnaC1wcmVjaXNpb24gdGltZXIgaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIChjKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByID0gKGQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xyXG4gICAgICAgICAgICBkID0gTWF0aC5mbG9vcihkIC8gMTYpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGMgPT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KSkudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aaW5a2X5q+N5aSn5a2mXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmlyc3RVcHBlckNhc2Uod29yZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLzlvI/ljJbkuIvliJLnur/nmoTljZXor41cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmb3JtYXREYXNoV29yZCh3b3JkOiBzdHJpbmcsIGNhcEZpcnN0OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgZmlyc3QgPSB0cnVlO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgIHdvcmQuc3BsaXQoJ18nKS5mb3JFYWNoKChzZWM6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmlyc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYXBGaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFV0aWxTdHJpbmcuZmlyc3RVcHBlckNhc2Uoc2VjKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gc2VjO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIFV0aWxTdHJpbmcuZmlyc3RVcHBlckNhc2Uoc2VjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiKrlj5blrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBzdHIg5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gc3RhcnQg5byA5aeL5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZW5kIOe7k+adn+S9jee9rlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN1YnN0cmluZyhzdHI6c3RyaW5nLHN0YXJ0Om51bWJlcixlbmQ6bnVtYmVyKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cmluZyhzdGFydCxlbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5oiq5Y+W5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gc3RyIOWtl+espuS4slxyXG4gICAgICogQHBhcmFtIHN0YXJ0IOW8gOWni+S9jee9rlxyXG4gICAgICogQHBhcmFtIGxvbmcg5oiq5Y+W6ZW/5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3Vic3RyKHN0cjpzdHJpbmcsc3RhcnQ6bnVtYmVyLGxvbmc6bnVtYmVyKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCxsb25nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWtl+espuS4sui9rOWvueixoVxyXG4gICAgICogQHBhcmFtIHN0clxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0clRvT2JqZWN0KHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc3RyVG9PYmogPSBKU09OLnBhcnNlKHN0cik7XHJcbiAgICAgICAgcmV0dXJuIHN0clRvT2JqO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWvueixoei9rOWtl+espuS4slxyXG4gICAgICogQHBhcmFtIHN0clxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG9ialRvU3RyKG9iajpPYmplY3QpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG9ialRvU3RyID0gSlNPTi5zdHJpbmdpZnkob2JqKVxyXG4gICAgICAgIHJldHVybiBvYmpUb1N0cjtcclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0wOSAxOToxOFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uICDml7bpl7Tlt6XlhbdcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBVdGlsVGltZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbV9TdGFydFRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLm1fU3RhcnRUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Lik5bin5LmL6Ze055qE5pe26Ze06Ze06ZqULOWNleS9jeenkiovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBkZWx0YVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTGF5YS50aW1lci5kZWx0YSAqIDAuMDAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWbuuWumuS4pOW4p+S5i+mXtOeahOaXtumXtOmXtOmalCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBmaXhlZERlbHRhVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuW9k+WJjeaXtumXtO+8jOebuOWvuXh4eHjlubTlvIDlp4vnu4/ov4fnmoTmr6vnp5LmlbAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgIH1cclxuXHJcbiAgICAvKirmuLjmiI/lkK/liqjliLDnjrDlnKjnmoTml7bpl7Qs5Y2V5L2N5q+r56eSKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IHRpbWVTaW5jZVN0YXJ0dXAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5tX1N0YXJ0VGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5ri45oiP5ZCv5Yqo5ZCO77yM57uP6L+H55qE5bin5pWwKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGZyYW1lQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTGF5YS50aW1lci5jdXJyRnJhbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdGltZVNjYWxlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIExheWEudGltZXIuc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXQgdGltZVNjYWxlKHNjYWxlOiBudW1iZXIpIHtcclxuICAgICAgICBMYXlhLnRpbWVyLnNjYWxlID0gc2NhbGU7XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcclxuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgQm94PUxheWEuQm94O1xyXG5pbXBvcnQgVGFwPUxheWEuVGFiO1xyXG5pbXBvcnQgQ2xpcD1MYXlhLkNsaXA7XHJcbmltcG9ydCBMaXN0PUxheWEuTGlzdDtcclxuaW1wb3J0IEltYWdlPUxheWEuSW1hZ2U7XHJcbmltcG9ydCBMYWJlbD1MYXlhLkxhYmVsO1xyXG5pbXBvcnQgUGFuZWw9TGF5YS5QYW5lbDtcclxuaW1wb3J0IFNwcml0ZT1MYXlhLlNwcml0ZTtcclxuaW1wb3J0IEJ1dHRvbj1MYXlhLkJ1dHRvbjtcclxuaW1wb3J0IENoZWNrQm94PUxheWEuQ2hlY2tCb3g7XHJcbmltcG9ydCBIU2xpZGVyPUxheWEuSFNsaWRlcjtcclxuaW1wb3J0IFNsaWRlcj1MYXlhLlZTbGlkZXI7XHJcbmltcG9ydCBWaWV3U3RhY2s9TGF5YS5WaWV3U3RhY2s7XHJcbmltcG9ydCBBbmltYXRpb249TGF5YS5BbmltYXRpb247XHJcbmltcG9ydCBQcm9ncmVzc0Jhcj1MYXlhLlByb2dyZXNzQmFyO1xyXG5pbXBvcnQgRnJhbWVBbmltYXRpb249TGF5YS5GcmFtZUFuaW1hdGlvbjtcclxuaW1wb3J0IHtDdXN0b21WaWV3fSBmcm9tIFwiLi4vZnJhbWV3b3JrL21hbmFnZXIvdWkvdmlldy1iYXNlXCI7XHJcbmltcG9ydCB7Q3VzdG9tRGlhbG9nfSBmcm9tIFwiLi4vZnJhbWV3b3JrL21hbmFnZXIvdWkvZGlhbG9nLWJhc2VcIjtcclxuaW1wb3J0IERpYWxvZ0Jhc2UgPSBDdXN0b21EaWFsb2cuRGlhbG9nQmFzZTtcclxuaW1wb3J0IFZpZXdCYXNlID0gQ3VzdG9tVmlldy5WaWV3QmFzZTtcbnZhciBSRUc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xuZXhwb3J0IG1vZHVsZSB1aS52aWV3LmNvbSB7XHJcbiAgICBleHBvcnQgY2xhc3MgZGF5N3NVSSBleHRlbmRzIERpYWxvZ0Jhc2Uge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJsb2FkTGlzdFwiOltdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhkYXk3c1VJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5jb20uZGF5N3NVSVwiLGRheTdzVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIGludml0ZVVJIGV4dGVuZHMgRGlhbG9nQmFzZSB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiRGlhbG9nQmFzZVwiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjc1MCxcImhlaWdodFwiOjEzMzR9LFwiY29tcElkXCI6MixcImxvYWRMaXN0XCI6W10sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGludml0ZVVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5jb20uaW52aXRlVUlcIixpbnZpdGVVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgbG90dGVyeVVJIGV4dGVuZHMgRGlhbG9nQmFzZSB7XHJcblx0XHRwdWJsaWMgaWRsZTpGcmFtZUFuaW1hdGlvbjtcblx0XHRwdWJsaWMgaW1nQ29udGV4dDpJbWFnZTtcblx0XHRwdWJsaWMgYnRuQ29uZmlybTpCdXR0b247XG5cdFx0cHVibGljIGJ0bkNsb3NlOkJ1dHRvbjtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiRGlhbG9nQmFzZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NjE1LFwieFwiOjM3NSxcInNraW5cIjpcInJlcy9jb20vaW1nX2xvdHRlcnlfYm9yZGVyLnBuZ1wiLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6NDUsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MzE0LFwieFwiOjMxNCxcInZhclwiOlwiaW1nQ29udGV4dFwiLFwic2tpblwiOlwicmVzL2NvbS9pbWdfbG90dGVyeV9jb250ZW50LnBuZ1wiLFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6NDZ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjotNjYsXCJ4XCI6MjUzLFwic2tpblwiOlwicmVzL2NvbS9pbWdfemhlbi5wbmdcIn0sXCJjb21wSWRcIjo0N30se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjo3ODAsXCJ4XCI6MzE0LFwid2lkdGhcIjoyNTgsXCJ2YXJcIjpcImJ0bkNvbmZpcm1cIixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9tYWluL2VmZmVjdC9idG5fY29tbW9uXzIucG5nXCIsXCJoZWlnaHRcIjoxMzAsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo0OCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0b3BcIjowLFwidGV4dFwiOlwi5oq95aWWXCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImZvbnRTaXplXCI6NjAsXCJib3R0b21cIjowLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6NDl9XX0se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjotMTk0LFwieFwiOjU4NyxcInZhclwiOlwiYnRuQ2xvc2VcIixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9tYWluL2VmZmVjdC9idG5fY2xvc2UucG5nXCIsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo1MH1dfV0sXCJhbmltYXRpb25zXCI6W3tcIm5vZGVzXCI6W3tcInRhcmdldFwiOjM0LFwia2V5ZnJhbWVzXCI6e1wieFwiOlt7XCJ2YWx1ZVwiOjM2NyxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwieFwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjM2NyxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwieFwiLFwiaW5kZXhcIjoxMH0se1widmFsdWVcIjozNjcsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInhcIixcImluZGV4XCI6MjV9XSxcInZpc2libGVcIjpbe1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoxMH0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoxNX0se1widmFsdWVcIjpmYWxzZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MjV9LHtcInZhbHVlXCI6dHJ1ZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MzB9XSxcInJvdGF0aW9uXCI6W3tcInZhbHVlXCI6MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwicm90YXRpb25cIixcImluZGV4XCI6MH0se1widmFsdWVcIjowLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjoxMH0se1widmFsdWVcIjo3LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjoxNX0se1widmFsdWVcIjo3LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjoyNX0se1widmFsdWVcIjowLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjozMH1dfX1dLFwibmFtZVwiOlwiaWRsZVwiLFwiaWRcIjoxLFwiZnJhbWVSYXRlXCI6MjQsXCJhY3Rpb25cIjowfV0sXCJsb2FkTGlzdFwiOltcInJlcy9jb20vaW1nX2xvdHRlcnlfYm9yZGVyLnBuZ1wiLFwicmVzL2NvbS9pbWdfbG90dGVyeV9jb250ZW50LnBuZ1wiLFwicmVzL2NvbS9pbWdfemhlbi5wbmdcIixcInJlcy9tYWluL2VmZmVjdC9idG5fY29tbW9uXzIucG5nXCIsXCJyZXMvbWFpbi9lZmZlY3QvYnRuX2Nsb3NlLnBuZ1wiXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcobG90dGVyeVVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5jb20ubG90dGVyeVVJXCIsbG90dGVyeVVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyByYW5rVUkgZXh0ZW5kcyBEaWFsb2dCYXNlIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJEaWFsb2dCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiV1hPcGVuRGF0YVZpZXdlclwiLFwicHJvcHNcIjp7XCJ5XCI6MzgxLFwieFwiOjExNixcIndpZHRoXCI6NTI0LFwibW91c2VUaHJvdWdoXCI6dHJ1ZSxcImljb25TaWduXCI6XCJ3eFwiLFwiaGVpZ2h0XCI6ODU4LFwicnVudGltZVwiOlwibGF5YS51aS5XWE9wZW5EYXRhVmlld2VyXCJ9LFwiY29tcElkXCI6M31dLFwibG9hZExpc3RcIjpbXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcocmFua1VJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5jb20ucmFua1VJXCIscmFua1VJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBzaG9wVUkgZXh0ZW5kcyBEaWFsb2dCYXNlIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJEaWFsb2dCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwibW91c2VUaHJvdWdoXCI6dHJ1ZSxcImhlaWdodFwiOjEzMzR9LFwiY29tcElkXCI6MixcImxvYWRMaXN0XCI6W10sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KHNob3BVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnZpZXcuY29tLnNob3BVSVwiLHNob3BVSSk7XHJcbn1cclxuZXhwb3J0IG1vZHVsZSB1aS52aWV3Lm1haW4ge1xyXG4gICAgZXhwb3J0IGNsYXNzIGJnVUkgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblx0XHRwdWJsaWMgaW1nQmc6SW1hZ2U7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlZpZXdCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1widmFyXCI6XCJpbWdCZ1wiLFwidG9wXCI6MCxcInNraW5cIjpcInJlcy9tYWluL2JnL2JnLnBuZ1wiLFwicmlnaHRcIjowLFwibGVmdFwiOjAsXCJib3R0b21cIjowfSxcImNvbXBJZFwiOjV9XSxcImxvYWRMaXN0XCI6W1wicmVzL21haW4vYmcvYmcucG5nXCJdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhiZ1VJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5tYWluLmJnVUlcIixiZ1VJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBkM1VJIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlZpZXdCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwibG9hZExpc3RcIjpbXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoZDNVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnZpZXcubWFpbi5kM1VJXCIsZDNVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgZWZmZWN0VUkgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblx0XHRwdWJsaWMgYnRuTHVja3k6QnV0dG9uO1xuXHRcdHB1YmxpYyBidG5SYW5rOkJ1dHRvbjtcblx0XHRwdWJsaWMgYnRuSW52aXRlOkJ1dHRvbjtcblx0XHRwdWJsaWMgYnRuU2V0dGluZzpCdXR0b247XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlZpZXdCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjY0LFwieFwiOjcyLFwid2lkdGhcIjoyMTMsXCJza2luXCI6XCJyZXMvbWFpbi9lZmZlY3QvaW1hZ2Vfc3RhdHVzLnBuZ1wiLFwiaGVpZ2h0XCI6NDZ9LFwiY29tcElkXCI6M30se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjY0LFwieFwiOjQ1OSxcIndpZHRoXCI6MjEzLFwic2tpblwiOlwicmVzL21haW4vZWZmZWN0L2ltYWdlX3N0YXR1cy5wbmdcIixcImhlaWdodFwiOjQ2fSxcImNvbXBJZFwiOjR9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo0OCxcInhcIjo0MDMsXCJza2luXCI6XCJyZXMvbWFpbi9lZmZlY3QvaW1nX2RpYW1vbmQucG5nXCJ9LFwiY29tcElkXCI6NX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjQ0LFwieFwiOjMwLFwic2tpblwiOlwicmVzL21haW4vZWZmZWN0L2ltZ19nbG9kLnBuZ1wifSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6MjgyLFwieFwiOjM3NSxcIndpZHRoXCI6MjA3LFwidmFyXCI6XCJidG5MdWNreVwiLFwic3RhdGVOdW1cIjoxLFwic2tpblwiOlwicmVzL21haW4vZWZmZWN0L2J0bl9jb21tb25fMS5wbmdcIixcImhlaWdodFwiOjEwNCxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjcsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidG9wXCI6MCxcInRleHRcIjpcIui9rOebmFwiLFwicmlnaHRcIjowLFwibGVmdFwiOjAsXCJmb250U2l6ZVwiOjQwLFwiYm90dG9tXCI6MCxcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwifSxcImNvbXBJZFwiOjExfV19LHtcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6NDM5LFwieFwiOjM3NSxcIndpZHRoXCI6MjA3LFwidmFyXCI6XCJidG5SYW5rXCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJyZXMvbWFpbi9lZmZlY3QvYnRuX2NvbW1vbl8yLnBuZ1wiLFwiaGVpZ2h0XCI6MTA0LFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6OCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0b3BcIjowLFwidGV4dFwiOlwi5o6S6KGMXCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImZvbnRTaXplXCI6NDAsXCJib3R0b21cIjowLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6MTJ9XX0se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjo2MDYsXCJ4XCI6Mzc1LFwid2lkdGhcIjoyMDcsXCJ2YXJcIjpcImJ0bkludml0ZVwiLFwic3RhdGVOdW1cIjoxLFwic2tpblwiOlwicmVzL21haW4vZWZmZWN0L2J0bl9jb21tb25fMy5wbmdcIixcImhlaWdodFwiOjEwNCxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjksXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidG9wXCI6MCxcInRleHRcIjpcIumCgOivt1wiLFwicmlnaHRcIjowLFwibGVmdFwiOjAsXCJmb250U2l6ZVwiOjQwLFwiYm90dG9tXCI6MCxcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwifSxcImNvbXBJZFwiOjEzfV19LHtcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6Nzc2LFwieFwiOjM3NSxcIndpZHRoXCI6MjA3LFwidmFyXCI6XCJidG5TZXR0aW5nXCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJyZXMvbWFpbi9lZmZlY3QvYnRuX2NvbW1vbl80LnBuZ1wiLFwiaGVpZ2h0XCI6MTA0LFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6MTAsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidG9wXCI6MCxcInRleHRcIjpcIuiuvue9rlwiLFwicmlnaHRcIjowLFwibGVmdFwiOjAsXCJmb250U2l6ZVwiOjQwLFwiYm90dG9tXCI6MCxcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwifSxcImNvbXBJZFwiOjE0fV19XSxcImxvYWRMaXN0XCI6W1wicmVzL21haW4vZWZmZWN0L2ltYWdlX3N0YXR1cy5wbmdcIixcInJlcy9tYWluL2VmZmVjdC9pbWdfZGlhbW9uZC5wbmdcIixcInJlcy9tYWluL2VmZmVjdC9pbWdfZ2xvZC5wbmdcIixcInJlcy9tYWluL2VmZmVjdC9idG5fY29tbW9uXzEucG5nXCIsXCJyZXMvbWFpbi9lZmZlY3QvYnRuX2NvbW1vbl8yLnBuZ1wiLFwicmVzL21haW4vZWZmZWN0L2J0bl9jb21tb25fMy5wbmdcIixcInJlcy9tYWluL2VmZmVjdC9idG5fY29tbW9uXzQucG5nXCJdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhlZmZlY3RVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnZpZXcubWFpbi5lZmZlY3RVSVwiLGVmZmVjdFVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBnYW1lVUkgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblx0XHRwdWJsaWMgYW5pX2dyYXA6RnJhbWVBbmltYXRpb247XG5cdFx0cHVibGljIGFuaV9sdWNrQkw6RnJhbWVBbmltYXRpb247XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlZpZXdCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwiYW5pbWF0aW9uc1wiOlt7XCJub2Rlc1wiOlt7XCJ0YXJnZXRcIjo0MTMsXCJrZXlmcmFtZXNcIjp7XCJ2aXNpYmxlXCI6W3tcInZhbHVlXCI6ZmFsc2UsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjQxMyxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOnRydWUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjQxMyxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoyfSx7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjo0MTMsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6NH0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjo0MTMsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6Nn0se1widmFsdWVcIjpmYWxzZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6NDEzLFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjh9LHtcInZhbHVlXCI6dHJ1ZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6NDEzLFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjEwfSx7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjo0MTMsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MTJ9XX19LHtcInRhcmdldFwiOjMyNCxcImtleWZyYW1lc1wiOntcInZpc2libGVcIjpbe1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozMjQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MH0se1widmFsdWVcIjpmYWxzZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzI0LFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjJ9LHtcInZhbHVlXCI6dHJ1ZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzI0LFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjR9LHtcInZhbHVlXCI6ZmFsc2UsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjMyNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjo2fSx7XCJ2YWx1ZVwiOnRydWUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjMyNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjo4fSx7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozMjQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MTB9LHtcInZhbHVlXCI6dHJ1ZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzI0LFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjEyfV19fV0sXCJuYW1lXCI6XCJhbmlfZ3JhcFwiLFwiaWRcIjoyOSxcImZyYW1lUmF0ZVwiOjI0LFwiYWN0aW9uXCI6MH0se1wibm9kZXNcIjpbe1widGFyZ2V0XCI6NDY4LFwia2V5ZnJhbWVzXCI6e1wicm90YXRpb25cIjpbe1widmFsdWVcIjowLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OCxcImtleVwiOlwicm90YXRpb25cIixcImluZGV4XCI6MH0se1widmFsdWVcIjozNjAsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY4LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjoyMDB9XSxcImFscGhhXCI6W3tcInZhbHVlXCI6MSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjgsXCJrZXlcIjpcImFscGhhXCIsXCJpbmRleFwiOjB9LHtcInZhbHVlXCI6MC41LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OCxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6NTB9LHtcInZhbHVlXCI6MSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjgsXCJrZXlcIjpcImFscGhhXCIsXCJpbmRleFwiOjEwMH0se1widmFsdWVcIjowLjUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY4LFwia2V5XCI6XCJhbHBoYVwiLFwiaW5kZXhcIjoxNTB9LHtcInZhbHVlXCI6MSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjgsXCJrZXlcIjpcImFscGhhXCIsXCJpbmRleFwiOjIwMH1dfX0se1widGFyZ2V0XCI6NDY5LFwia2V5ZnJhbWVzXCI6e1wicm90YXRpb25cIjpbe1widmFsdWVcIjowLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OSxcImtleVwiOlwicm90YXRpb25cIixcImluZGV4XCI6MH0se1widmFsdWVcIjotMzYwLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OSxcImtleVwiOlwicm90YXRpb25cIixcImluZGV4XCI6MjAwfV0sXCJhbHBoYVwiOlt7XCJ2YWx1ZVwiOjAuNSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjksXCJrZXlcIjpcImFscGhhXCIsXCJpbmRleFwiOjB9LHtcInZhbHVlXCI6MSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjksXCJrZXlcIjpcImFscGhhXCIsXCJpbmRleFwiOjUwfSx7XCJ2YWx1ZVwiOjAuNSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjksXCJrZXlcIjpcImFscGhhXCIsXCJpbmRleFwiOjEwMH0se1widmFsdWVcIjoxLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OSxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6MTUwfV19fV0sXCJuYW1lXCI6XCJhbmlfbHVja0JMXCIsXCJpZFwiOjMwLFwiZnJhbWVSYXRlXCI6MjQsXCJhY3Rpb25cIjowfV0sXCJsb2FkTGlzdFwiOltdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhnYW1lVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3Lm1haW4uZ2FtZVVJXCIsZ2FtZVVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBsb2FkaW5nVUkgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblx0XHRwdWJsaWMgaW1nX2JnOkltYWdlO1xuXHRcdHB1YmxpYyBib3hfYnRtOkJveDtcblx0XHRwdWJsaWMgcHJvX0xvYWRpbmc6UHJvZ3Jlc3NCYXI7XG5cdFx0cHVibGljIGxibExvYWRpbmc6TGFiZWw7XG5cdFx0cHVibGljIGxibF9wOkxhYmVsO1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJWaWV3QmFzZVwiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjc1MCxcImhlaWdodFwiOjEzMzR9LFwiY29tcElkXCI6MixcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ2YXJcIjpcImltZ19iZ1wiLFwidG9wXCI6MCxcInNraW5cIjpcInJlcy9sb2FkaW5nL2ltZ19sb2FkaW5nX2JnLnBuZ1wiLFwicmlnaHRcIjowLFwibGVmdFwiOjAsXCJib3R0b21cIjowfSxcImNvbXBJZFwiOjN9LHtcInR5cGVcIjpcIkJveFwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjo0OTMsXCJ2YXJcIjpcImJveF9idG1cIixcInBpdm90WVwiOjE0OSxcInBpdm90WFwiOjI0OSxcImhlaWdodFwiOjE0OSxcImNlbnRlclhcIjowLFwiYm90dG9tXCI6MH0sXCJjb21wSWRcIjo1LFwiY2hpbGRcIjpbe1widHlwZVwiOlwiUHJvZ3Jlc3NCYXJcIixcInByb3BzXCI6e1wieVwiOjIwLFwieFwiOjI0NyxcInZhclwiOlwicHJvX0xvYWRpbmdcIixcInNraW5cIjpcInJlcy9sb2FkaW5nL3Byb2dyZXNzX2xvYWRpbmcucG5nXCIsXCJwaXZvdFlcIjoxMixcInBpdm90WFwiOjE3NX0sXCJjb21wSWRcIjo2fSx7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ5XCI6MjAsXCJ3aWR0aFwiOjIzOCxcInZhclwiOlwibGJsTG9hZGluZ1wiLFwidmFsaWduXCI6XCJtaWRkbGVcIixcInRleHRcIjpcIjEwMCVcIixcInN0cm9rZUNvbG9yXCI6XCIjZmZmZmZmXCIsXCJzdHJva2VcIjo0LFwicGl2b3RZXCI6MTYsXCJwaXZvdFhcIjoxMTksXCJoZWlnaHRcIjozMixcImZvbnRTaXplXCI6MjYsXCJmb250XCI6XCJBcmlhbFwiLFwiY29sb3JcIjpcIiM1OTIyMjJcIixcImNlbnRlclhcIjowLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6N30se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjg1LFwieFwiOjI0NyxcIndpZHRoXCI6NDkzLFwic2tpblwiOlwicmVzL2xvYWRpbmcvaW1nXzhyLnBuZ1wiLFwicGl2b3RZXCI6MjAsXCJwaXZvdFhcIjoyNDcsXCJoZWlnaHRcIjozOX0sXCJjb21wSWRcIjo4fSx7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ5XCI6MTI4LFwieFwiOjI0NyxcIndpZHRoXCI6MjgzLFwidmFyXCI6XCJsYmxfcFwiLFwidmFsaWduXCI6XCJtaWRkbGVcIixcInRleHRcIjpcIlBvd2VyZWQgYnkgTGF5YUFpciBFbmdpbmVcIixcInBpdm90WVwiOjIxLFwicGl2b3RYXCI6MTQyLFwiaGVpZ2h0XCI6NDIsXCJmb250U2l6ZVwiOjE4LFwiY29sb3JcIjpcIiNmZmZmZmZcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwifSxcImNvbXBJZFwiOjl9XX1dLFwibG9hZExpc3RcIjpbXCJyZXMvbG9hZGluZy9pbWdfbG9hZGluZ19iZy5wbmdcIixcInJlcy9sb2FkaW5nL3Byb2dyZXNzX2xvYWRpbmcucG5nXCIsXCJyZXMvbG9hZGluZy9pbWdfOHIucG5nXCJdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhsb2FkaW5nVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3Lm1haW4ubG9hZGluZ1VJXCIsbG9hZGluZ1VJKTtcclxufVxyIl19
