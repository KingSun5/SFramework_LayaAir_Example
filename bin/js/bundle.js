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
},{"./framework/runtime/engine":34}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const singleton_1 = require("../../framework/core/singleton");
const mgrCenter_1 = require("./mgrCenter");
/**
 * @author Sun
 * @time 2019-10-16  15:13
 * @project SFramework_LayaAir
 * @description 游戏管理者基类
 *
 */
class BaseMgr extends singleton_1.Singleton {
    constructor() {
        super();
        this.init();
    }
    init() {
        mgrCenter_1.MgrCenter.$.setMgr(this.mgrSign, this);
    }
    setMgrCenter() {
    }
    update() {
    }
    dispose() {
    }
}
exports.BaseMgr = BaseMgr;
},{"../../framework/core/singleton":16,"./mgrCenter":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const singleton_1 = require("../../framework/core/singleton");
const dictionary_1 = require("../../framework/structure/dictionary");
const log_1 = require("../../framework/core/log");
/**
* @author Sun
* @time 2019-10-16 15:07
* @project SFramework_LayaAir
* @description 管理者依赖中心
*/
class MgrCenter extends singleton_1.Singleton {
    constructor() {
        /*****************************************页面属性管理*****************************************/
        super(...arguments);
        /**
         * 管理者容器
         */
        this._mgrDict = new dictionary_1.Dictionary();
    }
    static get $() {
        if (!this.instance)
            this.instance = new MgrCenter();
        return this.instance;
    }
    /**
     * 循环
     */
    update() {
        this._mgrDict.foreach((key, value) => { value.update(); });
    }
    /**
     * 销毁
     */
    dispose() {
        this._mgrDict.foreach((key, value) => { value.dispose(); });
    }
    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /********************************************——**********************************************/
    /**
     * 添加管理者
     * @param key
     * @param mgr
     */
    setMgr(key, mgr) {
        console.log("------------------");
        if (!this._mgrDict.hasKey(key)) {
            this._mgrDict.add(key, mgr);
        }
        else {
            log_1.Log.warn("Key:" + key + " already exists！");
        }
    }
    /**
     * 获取管理者
     * @param key
     * @param type
     */
    getMgr(key, type) {
        if (this._mgrDict.hasKey(key)) {
            return this._mgrDict.value(key);
        }
        else {
            let newClass = new type();
            if (newClass) {
                return newClass;
            }
            else {
                log_1.Log.error("key:" + key + " is not found!");
                return null;
            }
        }
    }
    /**
     * 释放管理者
     * @param key
     */
    disposeMgr(key) {
        if (this._mgrDict.hasKey(key)) {
            let mgr = this._mgrDict.value(key);
            this._mgrDict.remove(key);
            mgr.dispose();
        }
        else {
            log_1.Log.error("key:" + key + " is not found!");
        }
    }
}
exports.MgrCenter = MgrCenter;
},{"../../framework/core/log":14,"../../framework/core/singleton":16,"../../framework/structure/dictionary":37}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseMgr_1 = require("../baseMgr");
const sign_1 = require("../../sign/sign");
const math_1 = require("../../../framework/util/math");
/**
 * @author Sun
 * @time 2019-10-26  18:08
 * @project SFramework_LayaAir
 * @description 人物管理
 *
 */
class PlayerMgr extends baseMgr_1.BaseMgr {
    constructor() {
        super(...arguments);
        /**
         * 猪脚
         */
        this._player = null;
        /**
         * 旋转的度数
         */
        this._rotAngle = 0;
        /**
         * 触摸起点坐标
         */
        this._originPoint = null;
        /**
         * 方向向量
         */
        this._forwardVect = null;
    }
    init() {
        this.mgrSign = sign_1.MgrKey.PLAYER_MGR_KEY;
        super.init();
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onClickDownStage);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onClickUpStage);
    }
    /**
     * 猪脚的生成
     */
    bornPlayer() {
        console.log("生成猪脚！！！！");
    }
    /**
     * 按下事件
     */
    onClickDownStage(event) {
        if (sign_1.GameState.$.GAME_STATE != sign_1.EnumGameState.game)
            return;
        this._originPoint = new Laya.Vector2(event.stageX, event.stageY);
        Laya.timer.frameLoop(1, this, this.onMouseDrag);
    }
    /**
     * 拖动事件
     *
     * 这里注意坐标原点是左上角
     */
    onMouseDrag() {
        if (sign_1.GameState.$.GAME_STATE != sign_1.EnumGameState.game)
            return;
        this._forwardVect = new Laya.Vector2(Laya.stage.mouseX - this._originPoint.x, this._originPoint.y - Laya.stage.mouseY);
        this._rotAngle = this.calRotAngle();
        console.log("方向：" + this._forwardVect.x + "    " + this._forwardVect.y);
        console.log("角度：" + this._rotAngle);
    }
    /**
     * 抬起事件
     */
    onClickUpStage() {
        if (sign_1.GameState.$.GAME_STATE != sign_1.EnumGameState.game)
            return;
        Laya.timer.clearAll(this);
    }
    /**
     * 计算角度
     */
    calRotAngle() {
        let angle = math_1.UtilMath.vectorAngle(0, 1, this._forwardVect.x, this._forwardVect.y);
        return 0;
    }
}
exports.PlayerMgr = PlayerMgr;
},{"../../../framework/util/math":42,"../../sign/sign":7,"../baseMgr":2}],5:[function(require,module,exports){
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
},{"../../framework/manager/ui/scene-base":32}],6:[function(require,module,exports){
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
            .add("res/atlas/res/main/map.atlas", Laya.Loader.ATLAS)
            .add("res/atlas/res/com.atlas", Laya.Loader.ATLAS)
            .add("res/com/img_lottery_border.png", Laya.Loader.IMAGE)
            .add("res/com/img_lottery_content.png", Laya.Loader.IMAGE)
            .add("res/main/bg/bg.png", Laya.Loader.IMAGE);
    }
}
GameSetting.instance = null;
exports.GameSetting = GameSetting;
},{"../../framework/core/singleton":16,"../../framework/manager/json/json-template":23,"../../framework/setting/config":35,"../../framework/setting/enum":36}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const singleton_1 = require("../../framework/core/singleton");
/**
 * 管理者的Key
 */
class MgrKey {
}
MgrKey.MAP_MGR_KEY = "MapMgr";
MgrKey.PLAYER_MGR_KEY = "PlayerMgr";
exports.MgrKey = MgrKey;
/**
 * 游戏状态
 */
class GameState extends singleton_1.Singleton {
    constructor() {
        super(...arguments);
        this.GAME_STATE = EnumGameState.game;
    }
    static get $() {
        if (!this.instance)
            this.instance = new GameState();
        return this.instance;
    }
}
exports.GameState = GameState;
/**
 * 游戏当前状态
 */
var EnumGameState;
(function (EnumGameState) {
    EnumGameState[EnumGameState["normal"] = 0] = "normal";
    EnumGameState[EnumGameState["game"] = 1] = "game";
    EnumGameState[EnumGameState["death"] = 2] = "death";
})(EnumGameState = exports.EnumGameState || (exports.EnumGameState = {}));
},{"../../framework/core/singleton":16}],8:[function(require,module,exports){
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
},{"../../../framework/core/log":14,"../../../framework/manager/json/json-manager":22,"../../../framework/setting/enum":36,"../../../framework/util/math":42,"../../../ui/layaMaxUI":47}],9:[function(require,module,exports){
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
},{"../../../ui/layaMaxUI":47}],10:[function(require,module,exports){
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
},{"../../../framework/setting/config":35,"../../../framework/util/load3d":41,"../../../ui/layaMaxUI":47}],11:[function(require,module,exports){
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
},{"../../../ui/layaMaxUI":47,"../component-view/lottery-view":8}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
var Browser = Laya.Browser;
var gameUI = layaMaxUI_1.ui.view.main.gameUI;
const mgrCenter_1 = require("../../mgr/mgrCenter");
const playerMgr_1 = require("../../mgr/playerMgr/playerMgr");
const sign_1 = require("../../sign/sign");
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
        mgrCenter_1.MgrCenter.$.getMgr(sign_1.MgrKey.PLAYER_MGR_KEY, playerMgr_1.PlayerMgr).bornPlayer();
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
},{"../../../ui/layaMaxUI":47,"../../mgr/mgrCenter":3,"../../mgr/playerMgr/playerMgr":4,"../../sign/sign":7}],13:[function(require,module,exports){
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
},{"../../../framework/manager/event/event-data":19,"../../../framework/manager/res/res-manager":26,"../../../framework/setting/config":35,"../../../framework/setting/enum":36,"../../../framework/util/number":44,"../../../ui/layaMaxUI":47,"./bg-view":9,"./d3-view":10,"./effect-view":11,"./game-view":12}],14:[function(require,module,exports){
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
},{"../setting/config":35}],15:[function(require,module,exports){
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
},{"./log":14}],16:[function(require,module,exports){
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
},{"./log":14}],17:[function(require,module,exports){
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
},{"./singleton":16}],18:[function(require,module,exports){
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
},{"../event/event-node":21}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
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
},{"./event-node":21}],21:[function(require,module,exports){
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
},{"../../core/log":14,"../../core/singleton":16,"./event-data":19}],22:[function(require,module,exports){
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
},{"../../core/log":14,"../../core/singleton":16,"../../setting/config":35,"../../structure/dictionary":37,"../res/res-manager":26}],23:[function(require,module,exports){
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
},{}],24:[function(require,module,exports){
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
},{"./res-item":25}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
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
},{"../../core/log":14,"../event/event-node":21}],27:[function(require,module,exports){
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
},{"../../core/log":14,"../../setting/config":35,"../../structure/dictionary":37,"../../util/string":45,"../event/event-node":21}],28:[function(require,module,exports){
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
},{"../../util/time":46,"./timer-interval":29}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
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
},{"../../core/object-pool":15,"../../core/time-delay":17,"../../util/array":38,"../event/event-node":21,"./timer-entity":28}],31:[function(require,module,exports){
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
},{"../../util/display":40}],32:[function(require,module,exports){
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
},{"../../core/log":14,"../res/res-group":24,"../res/res-manager":26,"../timer/timer-manager":30}],33:[function(require,module,exports){
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
},{"../data/data-manager":18}],34:[function(require,module,exports){
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
},{"../../client/setting/gameSetting":6,"../core/log":14,"../manager/data/data-manager":18,"../manager/event/event-data":19,"../manager/event/event-manager":20,"../manager/json/json-manager":22,"../manager/res/res-manager":26,"../manager/sound/sound-manager":27,"../manager/timer/timer-manager":30,"../setting/config":35,"../setting/enum":36,"../util/time":46}],35:[function(require,module,exports){
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
},{"../../client/scene/main-scene":5,"../../client/view/layer-view/loading-view":13,"../core/singleton":16,"../manager/res/res-group":24,"./enum":36}],36:[function(require,module,exports){
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
},{}],37:[function(require,module,exports){
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
},{"../util/dict":39}],38:[function(require,module,exports){
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
},{"../setting/enum":36}],39:[function(require,module,exports){
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
},{}],40:[function(require,module,exports){
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
},{}],41:[function(require,module,exports){
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
},{"../core/log":14}],42:[function(require,module,exports){
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
},{"./math3d":43}],43:[function(require,module,exports){
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
},{"./string":45}],44:[function(require,module,exports){
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
},{"./string":45}],45:[function(require,module,exports){
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
},{}],46:[function(require,module,exports){
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
},{}],47:[function(require,module,exports){
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
},{"../framework/manager/ui/dialog-base":31,"../framework/manager/ui/view-base":33}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkY6L0xheWFJREUvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL01haW4udHMiLCJzcmMvY2xpZW50L21nci9iYXNlTWdyLnRzIiwic3JjL2NsaWVudC9tZ3IvbWdyQ2VudGVyLnRzIiwic3JjL2NsaWVudC9tZ3IvcGxheWVyTWdyL3BsYXllck1nci50cyIsInNyYy9jbGllbnQvc2NlbmUvbWFpbi1zY2VuZS50cyIsInNyYy9jbGllbnQvc2V0dGluZy9nYW1lU2V0dGluZy50cyIsInNyYy9jbGllbnQvc2lnbi9zaWduLnRzIiwic3JjL2NsaWVudC92aWV3L2NvbXBvbmVudC12aWV3L2xvdHRlcnktdmlldy50cyIsInNyYy9jbGllbnQvdmlldy9sYXllci12aWV3L2JnLXZpZXcudHMiLCJzcmMvY2xpZW50L3ZpZXcvbGF5ZXItdmlldy9kMy12aWV3LnRzIiwic3JjL2NsaWVudC92aWV3L2xheWVyLXZpZXcvZWZmZWN0LXZpZXcudHMiLCJzcmMvY2xpZW50L3ZpZXcvbGF5ZXItdmlldy9nYW1lLXZpZXcudHMiLCJzcmMvY2xpZW50L3ZpZXcvbGF5ZXItdmlldy9sb2FkaW5nLXZpZXcudHMiLCJzcmMvZnJhbWV3b3JrL2NvcmUvbG9nLnRzIiwic3JjL2ZyYW1ld29yay9jb3JlL29iamVjdC1wb29sLnRzIiwic3JjL2ZyYW1ld29yay9jb3JlL3NpbmdsZXRvbi50cyIsInNyYy9mcmFtZXdvcmsvY29yZS90aW1lLWRlbGF5LnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL2RhdGEvZGF0YS1tYW5hZ2VyLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL2V2ZW50L2V2ZW50LWRhdGEudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvZXZlbnQvZXZlbnQtbWFuYWdlci50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci9ldmVudC9ldmVudC1ub2RlLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL2pzb24vanNvbi1tYW5hZ2VyLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL2pzb24vanNvbi10ZW1wbGF0ZS50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLWdyb3VwLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL3Jlcy9yZXMtaXRlbS50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLW1hbmFnZXIudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvc291bmQvc291bmQtbWFuYWdlci50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci90aW1lci90aW1lci1lbnRpdHkudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvdGltZXIvdGltZXItaW50ZXJ2YWwudHMiLCJzcmMvZnJhbWV3b3JrL21hbmFnZXIvdGltZXIvdGltZXItbWFuYWdlci50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci91aS9kaWFsb2ctYmFzZS50cyIsInNyYy9mcmFtZXdvcmsvbWFuYWdlci91aS9zY2VuZS1iYXNlLnRzIiwic3JjL2ZyYW1ld29yay9tYW5hZ2VyL3VpL3ZpZXctYmFzZS50cyIsInNyYy9mcmFtZXdvcmsvcnVudGltZS9lbmdpbmUudHMiLCJzcmMvZnJhbWV3b3JrL3NldHRpbmcvY29uZmlnLnRzIiwic3JjL2ZyYW1ld29yay9zZXR0aW5nL2VudW0udHMiLCJzcmMvZnJhbWV3b3JrL3N0cnVjdHVyZS9kaWN0aW9uYXJ5LnRzIiwic3JjL2ZyYW1ld29yay91dGlsL2FycmF5LnRzIiwic3JjL2ZyYW1ld29yay91dGlsL2RpY3QudHMiLCJzcmMvZnJhbWV3b3JrL3V0aWwvZGlzcGxheS50cyIsInNyYy9mcmFtZXdvcmsvdXRpbC9sb2FkM2QudHMiLCJzcmMvZnJhbWV3b3JrL3V0aWwvbWF0aC50cyIsInNyYy9mcmFtZXdvcmsvdXRpbC9tYXRoM2QudHMiLCJzcmMvZnJhbWV3b3JrL3V0aWwvbnVtYmVyLnRzIiwic3JjL2ZyYW1ld29yay91dGlsL3N0cmluZy50cyIsInNyYy9mcmFtZXdvcmsvdXRpbC90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UCxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1lBQ2hELElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1lBQzlDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1lBQzlDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1lBQzlDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1lBQzlDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1lBQzlDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1NBQ2pELENBQUM7UUFFRixJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDWCxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNoQixFQUFFLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkMsRUFBRSxHQUFHLFFB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QUFDLHNCQUFzQixFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGtDQUFrQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLCtCQUErQixFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMs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QUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxrQ0FBa0MsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsa0NBQWtDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxpQ0FBaUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyw4QkFBOEIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxrQ0FBa0MsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxrQ0FBa0MsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxrQ0FBa0MsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxrQ0FBa0MsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLGtDQUFrQyxFQUFDLGlDQUFpQyxFQUFDLDhCQUE4QixFQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxFQUFDLGtDQUFrQyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDO1lBTHBtRSxhQUFRLFdBV3BCLENBQUE7WUFDRCxHQUFHLENBQUMsdUJBQXVCLEVBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsWUFBb0IsU0FBUSxRQUFRO2dCQUloQyxnQkFBZSxLQUFLLEVBQUUsQ0FBQSxDQUFBLENBQUM7Z0JBQ3ZCLGNBQWM7b0JBQ1YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsQ0FBQzs7WUFMYyxhQUFNLEdBQU0sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDO1lBSHo2RixXQUFNLFNBU2xCLENBQUE7WUFDRCxHQUFHLENBQUMscUJBQXFCLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsZUFBdUIsU0FBUSxRQUFRO2dCQU9uQyxnQkFBZSxLQUFLLEVBQUUsQ0FBQSxDQUFBLENBQUM7Z0JBQ3ZCLGNBQWM7b0JBQ1YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEMsQ0FBQzs7WUFMYyxnQkFBTSxHQUFNLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxnQ0FBZ0MsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUMsa0NBQWtDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsd0JBQXdCLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsMkJBQTJCLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxnQ0FBZ0MsRUFBQyxrQ0FBa0MsRUFBQyx3QkFBd0IsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQztZQU52d0MsY0FBUyxZQVlyQixDQUFBO1lBQ0QsR0FBRyxDQUFDLHdCQUF3QixFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLENBQUMsRUExRHFCLElBQUksR0FBSixTQUFJLEtBQUosU0FBSSxRQTBEekI7SUFBRCxDQUFDLEVBMURnQixJQUFJLEdBQUosT0FBSSxLQUFKLE9BQUksUUEwRHBCO0FBQUQsQ0FBQyxFQTFEYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUEwRGYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tICcuL2ZyYW1ld29yay9ydW50aW1lL2VuZ2luZSc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMTEgMTk6MDVcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDmuLjmiI/lkK/liqjlhaXlj6NcclxuICpcclxuICovXHJcbmNsYXNzIE1haW4ge1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRFbmdpbmUuJC5ydW4oKTtcclxuXHR9XHJcbn1cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuIiwiaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2NvcmUvc2luZ2xldG9uJztcclxuaW1wb3J0IHtNZ3JDZW50ZXJ9IGZyb20gXCIuL21nckNlbnRlclwiO1xyXG5cclxuXHJcbmludGVyZmFjZSBJTWdyXHJcbntcclxuICAgIG1nclNpZ246IHN0cmluZztcclxuICAgIGluaXQoKTsgICAgICAgICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyWXHJcbiAgICBzZXRNZ3JDZW50ZXIoKTsgICAgICAgICAgICAgICAvL+WKoOWFpeWIsOeuoeeQhuS4reW/g1xyXG4gICAgdXBkYXRlKCk7ICAgICAgICAgICAgICAgICAgICAgLy/kuIDnm7TliLfmlrBcclxuICAgIGRpc3Bvc2UoKTsgICAgICAgICAgICAgICAgICAgIC8v6YeK5pS+XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTEwLTE2ICAxNToxMyBcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDmuLjmiI/nrqHnkIbogIXln7rnsbtcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYXNlTWdyIGV4dGVuZHMgU2luZ2xldG9uIGltcGxlbWVudHMgSU1nciAge1xyXG5cclxuICAgIHB1YmxpYyBtZ3JTaWduOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgTWdyQ2VudGVyLiQuc2V0TWdyKHRoaXMubWdyU2lnbix0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNZ3JDZW50ZXIoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2NvcmUvc2luZ2xldG9uJztcclxuaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay9zdHJ1Y3R1cmUvZGljdGlvbmFyeSc7XHJcbmltcG9ydCB7TG9nfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nXCI7XHJcblxyXG5cclxuIC8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTEwLTE2IDE1OjA3XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g566h55CG6ICF5L6d6LWW5Lit5b+DXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWdyQ2VudGVyIGV4dGVuZHMgU2luZ2xldG9uXHJcbntcclxuXHJcbiAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5bGe5oCn566h55CGKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBcclxuICAgICAvKipcclxuICAgICAgKiDnrqHnkIbogIXlrrnlmahcclxuICAgICAgKi9cclxuICAgICBwcml2YXRlIF9tZ3JEaWN0OkRpY3Rpb25hcnk8YW55PiA9IG5ldyBEaWN0aW9uYXJ5KCk7XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq55Sf5ZG95ZGo5pyfKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBNZ3JDZW50ZXJcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6IE1nckNlbnRlciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IE1nckNlbnRlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlvqrnjq9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX21nckRpY3QuZm9yZWFjaCgoa2V5LHZhbHVlKT0+e3ZhbHVlLnVwZGF0ZSgpO30pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4FcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkaXNwb3NlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9tZ3JEaWN0LmZvcmVhY2goKGtleSx2YWx1ZSk9Pnt2YWx1ZS5kaXNwb3NlKCk7fSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDnrqHnkIbogIVcclxuICAgICAqIEBwYXJhbSBrZXlcclxuICAgICAqIEBwYXJhbSBtZ3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldE1ncihrZXk6c3RyaW5nLG1ncjphbnkpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tZ3JEaWN0Lmhhc0tleShrZXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21nckRpY3QuYWRkKGtleSxtZ3IpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgTG9nLndhcm4oXCJLZXk6XCIra2V5K1wiIGFscmVhZHkgZXhpc3Rz77yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlueuoeeQhuiAhVxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICogQHBhcmFtIHR5cGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldE1ncjxUPihrZXksdHlwZTogKG5ldyAoKSA9PiBUKSk6VFxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLl9tZ3JEaWN0Lmhhc0tleShrZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tZ3JEaWN0LnZhbHVlKGtleSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBuZXdDbGFzczogYW55ID0gbmV3IHR5cGUoKTtcclxuICAgICAgICAgICAgaWYgKG5ld0NsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3Q2xhc3MgYXMgVDtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwia2V5OlwiK2tleStcIiBpcyBub3QgZm91bmQhXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmHiuaUvueuoeeQhuiAhVxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZU1ncihrZXk6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLl9tZ3JEaWN0Lmhhc0tleShrZXkpKSB7XHJcbiAgICAgICAgICAgIGxldCBtZ3IgPSB0aGlzLl9tZ3JEaWN0LnZhbHVlKGtleSk7XHJcbiAgICAgICAgICAgIHRoaXMuX21nckRpY3QucmVtb3ZlKGtleSk7XHJcbiAgICAgICAgICAgIG1nci5kaXNwb3NlKCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJrZXk6XCIra2V5K1wiIGlzIG5vdCBmb3VuZCFcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCB7QmFzZU1ncn0gZnJvbSBcIi4uL2Jhc2VNZ3JcIjtcclxuaW1wb3J0IHtJUGxheWVyfSBmcm9tIFwiLi9pUGxheWVyXCI7XHJcbmltcG9ydCB7RW51bUdhbWVTdGF0ZSwgR2FtZVN0YXRlLCBNZ3JLZXl9IGZyb20gXCIuLi8uLi9zaWduL3NpZ25cIjtcclxuaW1wb3J0IHtVdGlsTWF0aH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay91dGlsL21hdGhcIjtcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMTAtMjYgIDE4OjA4XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g5Lq654mp566h55CGXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUGxheWVyTWdyIGV4dGVuZHMgQmFzZU1nciBpbXBsZW1lbnRzIElQbGF5ZXJ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnjKrohJpcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcGxheWVyOkxheWEuUHJlZmFiID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5peL6L2s55qE5bqm5pWwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3JvdEFuZ2xlOm51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOinpuaRuOi1t+eCueWdkOagh1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9vcmlnaW5Qb2ludDpMYXlhLlZlY3RvcjIgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmlrnlkJHlkJHph49cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZm9yd2FyZFZlY3Q6TGF5YS5WZWN0b3IyID0gbnVsbDtcclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMubWdyU2lnbiA9IE1ncktleS5QTEFZRVJfTUdSX0tFWTtcclxuICAgICAgICBzdXBlci5pbml0KCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uQ2xpY2tEb3duU3RhZ2UpO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMub25DbGlja1VwU3RhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54yq6ISa55qE55Sf5oiQXHJcbiAgICAgKi9cclxuICAgIGJvcm5QbGF5ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLnlJ/miJDnjKrohJrvvIHvvIHvvIHvvIFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmjInkuIvkuovku7ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNsaWNrRG93blN0YWdlKGV2ZW50OkxheWEuRXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKEdhbWVTdGF0ZS4kLkdBTUVfU1RBVEUgIT0gRW51bUdhbWVTdGF0ZS5nYW1lKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fb3JpZ2luUG9pbnQgPSBuZXcgTGF5YS5WZWN0b3IyKGV2ZW50LnN0YWdlWCxldmVudC5zdGFnZVkpO1xyXG4gICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKDEsdGhpcyx0aGlzLm9uTW91c2VEcmFnKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ouW5Yqo5LqL5Lu2XHJcbiAgICAgKlxyXG4gICAgICog6L+Z6YeM5rOo5oSP5Z2Q5qCH5Y6f54K55piv5bem5LiK6KeSXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Nb3VzZURyYWcoIClcclxuICAgIHtcclxuICAgICAgICBpZiAoR2FtZVN0YXRlLiQuR0FNRV9TVEFURSAhPSBFbnVtR2FtZVN0YXRlLmdhbWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9mb3J3YXJkVmVjdCA9IG5ldyBMYXlhLlZlY3RvcjIoTGF5YS5zdGFnZS5tb3VzZVggLSB0aGlzLl9vcmlnaW5Qb2ludC54LHRoaXMuX29yaWdpblBvaW50LnkgLSBMYXlhLnN0YWdlLm1vdXNlWSk7XHJcbiAgICAgICAgdGhpcy5fcm90QW5nbGUgPSB0aGlzLmNhbFJvdEFuZ2xlKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmlrnlkJHvvJpcIit0aGlzLl9mb3J3YXJkVmVjdC54K1wiICAgIFwiK3RoaXMuX2ZvcndhcmRWZWN0LnkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6KeS5bqm77yaXCIrdGhpcy5fcm90QW5nbGUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmiqzotbfkuovku7ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNsaWNrVXBTdGFnZSggKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChHYW1lU3RhdGUuJC5HQU1FX1NUQVRFICE9IEVudW1HYW1lU3RhdGUuZ2FtZSkgcmV0dXJuO1xyXG4gICAgICAgIExheWEudGltZXIuY2xlYXJBbGwodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorqHnrpfop5LluqZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxSb3RBbmdsZSgpOm51bWJlcntcclxuXHJcbiAgICAgICAgbGV0IGFuZ2xlID0gVXRpbE1hdGgudmVjdG9yQW5nbGUoMCwxLHRoaXMuX2ZvcndhcmRWZWN0LngsdGhpcy5fZm9yd2FyZFZlY3QueSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQge0N1c3RvbVNjZW5lfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL21hbmFnZXIvdWkvc2NlbmUtYmFzZVwiO1xyXG5pbXBvcnQgTHlTY2VuZSA9IEN1c3RvbVNjZW5lLkx5U2NlbmU7XHJcbmltcG9ydCB7IEJnVmlldyB9IGZyb20gJy4uL3ZpZXcvbGF5ZXItdmlldy9iZy12aWV3JztcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcclxuXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxMToyMFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOS4u+WcuuaZr1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1haW5TY2VuZSBleHRlbmRzIEx5U2NlbmUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5uZWVkTG9hZFJlc1xyXG4gICAgICAgICAgICAuYWRkKFwicmVzL2JnLzEyMy5wbmdcIiwgTGF5YS5Mb2FkZXIuSU1BR0UpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2NvcmUvc2luZ2xldG9uJztcclxuaW1wb3J0IHtDb25maWdEYXRhLCBDb25maWdSZXN9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvc2V0dGluZy9jb25maWdcIjtcclxuaW1wb3J0IHtKc29uVGVtcGxhdGV9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9qc29uL2pzb24tdGVtcGxhdGVcIjtcclxuaW1wb3J0IHtlbnVtSnNvbkRlZmluZX0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9zZXR0aW5nL2VudW1cIjtcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTEwLTE2IDIxOjI4XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g5omL5Yqo5L+u5pS555qE5ri45oiP6YWN572uIO+8iOS4jeebtOaOpeS/ruaUuWZyYW1ld29yayDkv53mjIHmoYbmnrbnmoTmlbTmtIHvvIlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHYW1lU2V0dGluZyBleHRlbmRzIFNpbmdsZXRvbntcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogR2FtZVNldHRpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOiBHYW1lU2V0dGluZyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IEdhbWVTZXR0aW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXQoKXtcclxuICAgICAgICAgLy/miYvliqjphY3nva5Kc29u5paH5Lu2IGpzb24g5b+F6aG75omn6KGM5ZyoQ29uZmlnUmVz5LmL5YmNXHJcbiAgICAgICAgQ29uZmlnRGF0YS4kLmpzb25UZW1wbGF0ZUxpc3QgPSBbXHJcbiAgICAgICAgICAgIG5ldyBKc29uVGVtcGxhdGUoXCJyZXMvZGF0YS9JbnZpdGVEYXRhLmpzb25cIiwgZW51bUpzb25EZWZpbmUuaW52aXRlKSxcclxuICAgICAgICAgICAgbmV3IEpzb25UZW1wbGF0ZShcInJlcy9kYXRhL0xldmVsRGF0YS5qc29uXCIsIGVudW1Kc29uRGVmaW5lLmxldmVsKSxcclxuICAgICAgICAgICAgbmV3IEpzb25UZW1wbGF0ZShcInJlcy9kYXRhL09mZmxpbmVEYXRhLmpzb25cIiwgZW51bUpzb25EZWZpbmUub2ZmbGluZSksXHJcbiAgICAgICAgICAgIG5ldyBKc29uVGVtcGxhdGUoXCJyZXMvZGF0YS9UdXJudGFibGVEYXRhLmpzb25cIiwgZW51bUpzb25EZWZpbmUubG90dGVyeSksXHJcbiAgICAgICAgXTtcclxuICAgICAgICAvL+aJi+WKqOmFjee9rmxvYWRpbmfotYTmupBcclxuICAgICAgICBDb25maWdSZXMuJC5kZWZhdWx0TG9hZFJlc1xyXG4gICAgICAgICAgICAuYWRkKFwicmVzL2xvYWRpbmcvaW1nX2xvYWRpbmdfYmcucG5nXCIsTGF5YS5Mb2FkZXIuSU1BR0UpXHJcbiAgICAgICAgICAgIC5hZGQoXCJyZXMvbG9hZGluZy9wcm9ncmVzc19sb2FkaW5nLnBuZ1wiLExheWEuTG9hZGVyLklNQUdFKVxyXG4gICAgICAgICAgICAuYWRkKFwicmVzL2xvYWRpbmcvaW1nXzhyLnBuZ1wiLExheWEuTG9hZGVyLklNQUdFKTtcclxuICAgICAgICAvL+aJi+WKqOmFjee9ruS4u+mhtei1hOa6kFxyXG4gICAgICAgIENvbmZpZ1Jlcy4kLmRlZmF1bHRNYWluUmVzXHJcbiAgICAgICAgICAgIC5hZGQoXCJyZXMvYXRsYXMvcmVzL21haW4vZWZmZWN0LmF0bGFzXCIsIExheWEuTG9hZGVyLkFUTEFTKVxyXG4gICAgICAgICAgICAuYWRkKFwicmVzL2F0bGFzL3Jlcy9tYWluL21hcC5hdGxhc1wiLCBMYXlhLkxvYWRlci5BVExBUylcclxuICAgICAgICAgICAgLmFkZChcInJlcy9hdGxhcy9yZXMvY29tLmF0bGFzXCIsIExheWEuTG9hZGVyLkFUTEFTKVxyXG4gICAgICAgICAgICAuYWRkKFwicmVzL2NvbS9pbWdfbG90dGVyeV9ib3JkZXIucG5nXCIsIExheWEuTG9hZGVyLklNQUdFKVxyXG4gICAgICAgICAgICAuYWRkKFwicmVzL2NvbS9pbWdfbG90dGVyeV9jb250ZW50LnBuZ1wiLCBMYXlhLkxvYWRlci5JTUFHRSlcclxuICAgICAgICAgICAgLmFkZChcInJlcy9tYWluL2JnL2JnLnBuZ1wiLCBMYXlhLkxvYWRlci5JTUFHRSlcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQge1NpbmdsZXRvbn0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb3JlL3NpbmdsZXRvblwiO1xyXG5cclxuLyoqXHJcbiAqIOeuoeeQhuiAheeahEtleVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1ncktleSB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBNQVBfTUdSX0tFWSA9IFwiTWFwTWdyXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBMQVlFUl9NR1JfS0VZID0gXCJQbGF5ZXJNZ3JcIjtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmuLjmiI/nirbmgIFcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHYW1lU3RhdGUgZXh0ZW5kcyBTaW5nbGV0b257XHJcblxyXG4gICAgcHVibGljIEdBTUVfU1RBVEU6RW51bUdhbWVTdGF0ZSA9IEVudW1HYW1lU3RhdGUuZ2FtZTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogR2FtZVN0YXRlXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6IEdhbWVTdGF0ZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IEdhbWVTdGF0ZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDmuLjmiI/lvZPliY3nirbmgIFcclxuICovXHJcbmV4cG9ydCBlbnVtIEVudW1HYW1lU3RhdGUge1xyXG5cclxuICAgIG5vcm1hbCwgLy/luLjmgIFcclxuICAgIGdhbWUsICAgLy/muLjmiI/kuK1cclxuICAgIGRlYXRoLCAgLy/mrbvkuqFcclxufSIsImltcG9ydCB7IHVpIH0gZnJvbSAnLi4vLi4vLi4vdWkvbGF5YU1heFVJJztcclxuaW1wb3J0IGxvdHRlcnlVSSA9ICB1aS52aWV3LmNvbS5sb3R0ZXJ5VUk7XHJcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBKc29uTWFuYWdlciB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2pzb24vanNvbi1tYW5hZ2VyJztcclxuaW1wb3J0IHtlbnVtSnNvbkRlZmluZSB9IGZyb20gICcuLi8uLi8uLi9mcmFtZXdvcmsvc2V0dGluZy9lbnVtJztcclxuaW1wb3J0IHsgVXRpbE1hdGggfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvdXRpbC9tYXRoJztcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcclxuaW1wb3J0IHsgVXRpbFN0cmluZyB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay91dGlsL3N0cmluZyc7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMiAxNzozMVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOi9rOebmOaooeadv1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvdHRlcnlWaWV3IGV4dGVuZHMgbG90dGVyeVVJIHtcclxuXHJcbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirkuLvpobXpnaLlsZ7mgKforr7nva4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAvKiogRGVzOuWAjeeOhyAqL1xyXG4gIHByaXZhdGUgcmV3YXJkTXVsOm51bWJlciA9IDI7XHJcbiAgLyoqIERlczrovaznm5jmlbDmja4gKi9cclxuICBwcml2YXRlIGxvdHRlcnlEYXRhOmFueSA9IG51bGw7XHJcblxyXG5cclxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuS4u+mhtemdoueUn+WRveWRqOacnyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTG90dGVyeVZpZXdcclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgJCgpOiBMb3R0ZXJ5VmlldyB7XHJcbiAgICAgIGlmICh0aGlzLmluc3RhbmNlPT1udWxsKSB0aGlzLmluc3RhbmNlID0gbmV3IExvdHRlcnlWaWV3KCk7XHJcbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgIHN1cGVyLm9uQXdha2UoKTtcclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgICAgc3VwZXIuY2xvc2UoKTtcclxuICB9XHJcblxyXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5Li76aG16Z2i5Yid5aeL5pWw5o2uKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG4gIHByaXZhdGUgaW5pdCgpXHJcbiAge1xyXG4gICAgICB0aGlzLmxvdHRlcnlEYXRhID0gSnNvbk1hbmFnZXIuJC5nZXRUYWJsZShlbnVtSnNvbkRlZmluZS5sb3R0ZXJ5KVxyXG4gICAgICB0aGlzLmJ0bkNvbmZpcm0ub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLHRoaXMub25CdG5TdGFydCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirkuLvpobXpnaLngrnlh7vkuovku7YqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICBvbkJ0blN0YXJ0KCkge1xyXG5cclxuICAgICAgbGV0IHJhbmRvbSA9IFV0aWxNYXRoLnJhbmRvbSgxLDEwMCk7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICBpZiAodGhpcy5sb3R0ZXJ5RGF0YVtpXS5yYW5nZU1pbjw9cmFuZG9tJiZyYW5kb208PXRoaXMubG90dGVyeURhdGFbaV0ucmFuZ2VNYXgpe1xyXG4gICAgICAgICAgICAgdGhpcy5yZXdhcmRNdWwgPSB0aGlzLmxvdHRlcnlEYXRhW2ldLnJld2FyZDtcclxuICAgICAgICAgICAgIHRoaXMub25UdXJuaW5nKGkpO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKui9rOebmOWKqOeUu+aYvuekuioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICBwcml2YXRlIG9uVHVybmluZyhyZXdhcmQ6IG51bWJlciA9IDApIHtcclxuXHJcbiAgICAgIC8v5YWz6Zet5YWz6Zet5oyJ6ZKu5pi+56S6XHJcbiAgICAgIHRoaXMuYnRuQ2xvc2UudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAvL+emgeeUqOi9rOebmOaMiemSrlxyXG4gICAgICB0aGlzLmJ0bkNvbmZpcm0ubW91c2VFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgIC8v6L2s55uY5Yqo55S7XHJcbiAgICAgIGxldCBhQ291bnQgPSBPYmplY3Qua2V5cyh0aGlzLmxvdHRlcnlEYXRhKS5sZW5ndGg7XHJcblxyXG4gICAgICBsZXQgY0luZGV4ID0gcmV3YXJkO1xyXG4gICAgICBsZXQgcGVyRGVnID0gMzYwIC8gYUNvdW50O1xyXG4gICAgICBsZXQgY3VyRGVnID0gKDM2MCAtIHBlckRlZyAqIChjSW5kZXggLSAxKSkgKyBVdGlsTWF0aC5yYW5kUmFuZ2VJbnQoLXBlckRlZyAvIDIsIHBlckRlZyAvIDIpO1xyXG5cclxuICAgICAgdGhpcy5pbWdDb250ZXh0LnJvdGF0aW9uID0gMDtcclxuICAgICAgbGV0IGRzdFJvdGF0aW9uID0gMzYwMCArIGN1ckRlZztcclxuICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLmltZ0NvbnRleHQsIHtcclxuICAgICAgICAgIHJvdGF0aW9uOiBkc3RSb3RhdGlvbixcclxuICAgICAgfSwgNjAwMCwgTGF5YS5FYXNlLnN0cm9uZ091dCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoKT0+e1xyXG5cclxuICAgICAgdGhpcy5idG5Db25maXJtLm1vdXNlRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuYnRuQ2xvc2UudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIExvZy5sb2coXCLlgI3njofvvJpcIit0aGlzLnJld2FyZE11bCk7XHJcblxyXG4gICAgICB9KSwgMCwgZmFsc2UsIGZhbHNlKTtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyB1aSB9IGZyb20gJy4uLy4uLy4uL3VpL2xheWFNYXhVSSc7XHJcbmltcG9ydCBiZ1VJID0gIHVpLnZpZXcubWFpbi5iZ1VJO1xyXG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2RhdGEvZGF0YS1iYXNlJztcclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxMToyM1xyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIFxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJnVmlldyBleHRlbmRzIGJnVUl7XHJcblxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLlsZ7mgKfnrqHnkIYqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueUn+WRveWRqOacnyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEJnVmlld1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogQmdWaWV3IHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgQmdWaWV3KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Bd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XHJcbiAgICAgICAgdGhpcy5Jbml0KCk7XHJcbiAgICAgICAgdGhpcy5zdWl0SW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbkuIDmrKFcclxuICAgICAqL1xyXG4gICAgcHVibGljIEluaXQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdE9uY2UoKTtcclxuXHJcbiAgICAgICAgLy8gLy/mlbDmja7nm5HlkKxcclxuICAgICAgICAvLyB0aGlzLmFkZERhdGFXYXRjaChEYXRhRGVmaW5lLlVzZXJJbmZvKTtcclxuXHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbldlaVhpbikge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRMaW5rKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCC6YWNXHJcbiAgICAgKi9cclxuICAgIHN1aXRJbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5Yid5aeL5pWw5o2uKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqIERlczrmnoTpgKDmmK/liJ3lp4vljJbkuIDmrKEgKi9cclxuICAgIHByaXZhdGUgaW5pdE9uY2UoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlpJbpg6jov57mjqXov5vlhaXliKTmlq0qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqIERlczrliKTmlq3ov5vlhaXov57mjqXkv6Hmga8gKi9cclxuICAgIHByaXZhdGUgaW5pdExpbmsoKSB7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5LqL5Lu255u45YWzKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirmlbDmja7mlLnlj5jnmoTnm5HlkKwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkRhdGEoZGF0YTogRGF0YUJhc2UpIHtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLeWIhueVjOe6vy0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbn0iLCJpbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlcjtcclxuaW1wb3J0IHtHYW1lVmlld30gZnJvbSBcIi4vZ2FtZS12aWV3XCI7XHJcbmltcG9ydCB7RWZmZWN0Vmlld30gZnJvbSBcIi4vZWZmZWN0LXZpZXdcIjtcclxuaW1wb3J0IHsgdWkgfSBmcm9tICcuLi8uLi8uLi91aS9sYXlhTWF4VUknO1xyXG5pbXBvcnQgZDNVSSA9ICB1aS52aWV3Lm1haW4uZDNVSTtcclxuaW1wb3J0IHsgRGF0YUJhc2UgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9kYXRhL2RhdGEtYmFzZSc7XHJcbmltcG9ydCB7IFV0aWxMb2FkM0QgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvdXRpbC9sb2FkM2QnO1xyXG5pbXBvcnQgeyBDb25maWczRCB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9zZXR0aW5nL2NvbmZpZyc7XHJcbmltcG9ydCB7IEV2ZW50RnVuYyB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2V2ZW50L2V2ZW50LWRhdGEnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTExIDEyOjAzXHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24gM0TlnLrmma/lsYJcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEM1ZpZXcgZXh0ZW5kcyBkM1VJe1xyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouWxnuaAp+euoeeQhioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKiBEZXM6M0TlnLrmma8gKi9cclxuICAgIHB1YmxpYyBzY2VuZTNEOkxheWEuU2NlbmUzRDtcclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueUn+WRveWRqOacnyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEQzVmlld1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogRDNWaWV3IHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgRDNWaWV3KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uQXdha2UoKTtcclxuICAgICAgICB0aGlzLkluaXQoKTtcclxuICAgICAgICB0aGlzLnN1aXRJbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluS4gOasoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgSW5pdCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0T25jZSgpO1xyXG5cclxuICAgICAgICAvLyAvL+aVsOaNruebkeWQrFxyXG4gICAgICAgIC8vIHRoaXMuYWRkRGF0YVdhdGNoKERhdGFEZWZpbmUuVXNlckluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q+P5qyh5by55Ye65Yid5aeL5YyW5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHBvcHVwSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmluaXRBbGwoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgILphY1cclxuICAgICAqL1xyXG4gICAgc3VpdEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLliJ3lp4vmlbDmja4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvKiogRGVzOuaehOmAoOaYr+WIneWni+WMluS4gOasoSAqL1xyXG4gICAgcHJpdmF0ZSBpbml0T25jZSgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERlczrmr4/mrKHlvLnlh7rliJ3lp4vljJYgKi9cclxuICAgIHByaXZhdGUgaW5pdEFsbCgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlpJbpg6jov57mjqXov5vlhaXliKTmlq0qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqIERlczrliKTmlq3ov5vlhaXov57mjqXkv6Hmga8gKi9cclxuICAgIHByaXZhdGUgaW5pdExpbmsoKSB7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5LqL5Lu255u45YWzKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiozROWcuuaZr+WKoOi9veWujOaIkOWbnuiwgyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb0zROWcuuaZr1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZDNEU2NlbmUoYXJlYSxjYWxsQmFjaylcclxuICAgIHtcclxuICAgICAgICBVdGlsTG9hZDNELmxvYWRTY2VuZShDb25maWczRC4kLnNjZW5lUGF0aCxhcmVhLGNhbGxCYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirmlbDmja7mlLnlj5jnmoTnm5HlkKwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkRhdGEoZGF0YTogRGF0YUJhc2UpIHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8t5YiG55WM57q/LS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxufSIsImltcG9ydCB7dWl9IGZyb20gXCIuLi8uLi8uLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IGVmZmVjdFVJID0gIHVpLnZpZXcubWFpbi5lZmZlY3RVSTtcclxuXHJcbmltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xyXG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL2RhdGEvZGF0YS1iYXNlJztcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL2NvcmUvbG9nJztcclxuaW1wb3J0IHsgTG90dGVyeVZpZXcgfSBmcm9tICcuLi9jb21wb25lbnQtdmlldy9sb3R0ZXJ5LXZpZXcnO1xyXG5pbXBvcnQgeyBQb3B1cERhdGEgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci91aS9kaWFsb2ctYmFzZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRWZmZWN0VmlldyBleHRlbmRzIGVmZmVjdFVJe1xyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouWxnuaAp+euoeeQhioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i55Sf5ZG95ZGo5pyfKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogRWZmZWN0Vmlld1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogRWZmZWN0VmlldyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IEVmZmVjdFZpZXcoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Bd2FrZSgpO1xyXG4gICAgICAgIHRoaXMuSW5pdCgpO1xyXG4gICAgICAgIHRoaXMuc3VpdEluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG5cclxuICAgICAgICB0aGlzLmluaXRPbmNlKCk7XHJcblxyXG4gICAgICAgIC8vIC8v5pWw5o2u55uR5ZCsXHJcbiAgICAgICAgLy8gdGhpcy5hZGREYXRhV2F0Y2goRGF0YURlZmluZS5Vc2VySW5mbyk7XHJcblxyXG4gICAgICAgIGlmIChCcm93c2VyLm9uV2VpWGluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdExpbmsoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q+P5qyh5by55Ye65Yid5aeL5YyW5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHBvcHVwSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmluaXRBbGwoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgILphY1cclxuICAgICAqL1xyXG4gICAgc3VpdEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLliJ3lp4vmlbDmja4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvKiogRGVzOuaehOmAoOaYr+WIneWni+WMluS4gOasoSAqL1xyXG4gICAgcHJpdmF0ZSBpbml0T25jZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5idG5MdWNreS5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntcclxuICAgICAgICAgICBsZXQgdmlldyA9IExvdHRlcnlWaWV3LiQ7XHJcbiAgICAgICAgICAgdmlldy5wb3B1cERpYWxvZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXM65q+P5qyh5by55Ye65Yid5aeL5YyWICovXHJcbiAgICBwcml2YXRlIGluaXRBbGwoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5aSW6YOo6L+e5o6l6L+b5YWl5Yik5patKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKiBEZXM65Yik5pat6L+b5YWl6L+e5o6l5L+h5oGvICovXHJcbiAgICBwcml2YXRlIGluaXRMaW5rKCkge1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueCueWHu+S6i+S7tioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaVsOaNruaUueWPmOeahOebkeWQrCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uRGF0YShkYXRhOiBEYXRhQmFzZSkge1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLeWIhueVjOe6vy0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbn0iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi4vLi4vLi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyO1xyXG5pbXBvcnQgZ2FtZVVJID0gdWkudmlldy5tYWluLmdhbWVVSTtcclxuaW1wb3J0IHsgRGF0YUJhc2UgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9kYXRhL2RhdGEtYmFzZSc7XHJcbmltcG9ydCB7TWdyQ2VudGVyfSBmcm9tIFwiLi4vLi4vbWdyL21nckNlbnRlclwiO1xyXG5pbXBvcnQge1BsYXllck1ncn0gZnJvbSBcIi4uLy4uL21nci9wbGF5ZXJNZ3IvcGxheWVyTWdyXCI7XHJcbmltcG9ydCB7TWdyS2V5fSBmcm9tIFwiLi4vLi4vc2lnbi9zaWduXCI7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxODowOFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOS4u+mhtVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdhbWVWaWV3IGV4dGVuZHMgZ2FtZVVJIHtcclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirpobXpnaLlsZ7mgKfnrqHnkIYqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueUn+WRveWRqOacnyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEdhbWVWaWV3O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogR2FtZVZpZXcge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBHYW1lVmlldygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Bd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkF3YWtlKCk7XHJcbiAgICAgICAgdGhpcy5Jbml0KCk7XHJcbiAgICAgICAgdGhpcy5zdWl0SW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG5cclxuICAgICAgICB0aGlzLmluaXRPbmNlKCk7XHJcblxyXG4gICAgICAgIC8vIC8v5pWw5o2u55uR5ZCsXHJcbiAgICAgICAgLy8gdGhpcy5hZGREYXRhV2F0Y2goRGF0YURlZmluZS5Vc2VySW5mbyk7XHJcblxyXG4gICAgICAgIGlmIChCcm93c2VyLm9uV2VpWGluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdExpbmsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTWdyQ2VudGVyLiQuZ2V0TWdyKE1ncktleS5QTEFZRVJfTUdSX0tFWSxQbGF5ZXJNZ3IpLmJvcm5QbGF5ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOavj+asoeW8ueWHuuWIneWni+WMluS4gOasoVxyXG4gICAgICovXHJcbiAgICBwb3B1cEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0QWxsKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCC6YWNXHJcbiAgICAgKi9cclxuICAgIHN1aXRJbml0KClcclxuICAgIHtcclxuICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5Yid5aeL5pWw5o2uKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqIERlczrmnoTpgKDmmK/liJ3lp4vljJbkuIDmrKEgKi9cclxuICAgIHByaXZhdGUgaW5pdE9uY2UoKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXM65q+P5qyh5by55Ye65Yid5aeL5YyWICovXHJcbiAgICBwcml2YXRlIGluaXRBbGwoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5aSW6YOo6L+e5o6l6L+b5YWl5Yik5patKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKiBEZXM65Yik5pat6L+b5YWl6L+e5o6l5L+h5oGvICovXHJcbiAgICBwcml2YXRlIGluaXRMaW5rKCkge1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueCueWHu+S6i+S7tioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbiBcclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaVsOaNruaUueWPmOeahOebkeWQrCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uRGF0YShkYXRhOiBEYXRhQmFzZSkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy3liIbnlYznur8tLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxufVxyXG5cclxuY2xhc3MgR3JlZXRlciB7XHJcbiAgICBncmVldGluZzogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5ncmVldGluZyA9IG1lc3NhZ2U7XHJcbiAgICB9XHJcbiAgICBncmVldCgpIHtcclxuICAgICAgICByZXR1cm4gXCJIZWxsbywgXCIgKyB0aGlzLmdyZWV0aW5nO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4uLy4uLy4uL3VpL2xheWFNYXhVSVwiO1xyXG5pbXBvcnQgbG9hZGluZ1VJID0gdWkudmlldy5tYWluLmxvYWRpbmdVSTtcclxuaW1wb3J0IHsgSUxvYWluZyB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2UvaS1Mb2FkaW5nJztcclxuaW1wb3J0IHsgQmdWaWV3IH0gZnJvbSAnLi9iZy12aWV3JztcclxuaW1wb3J0IHsgRDNWaWV3IH0gZnJvbSAnLi9kMy12aWV3JztcclxuaW1wb3J0IHsgRGF0YUJhc2UgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9kYXRhL2RhdGEtYmFzZSc7XHJcbmltcG9ydCB7IENvbmZpZ1VJLCBDb25maWdHYW1lLCBDb25maWdSZXMgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvc2V0dGluZy9jb25maWcnO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9ldmVudC9ldmVudC1tYW5hZ2VyJztcclxuaW1wb3J0IHsgVXRpbE51bWJlciB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay91dGlsL251bWJlcic7XHJcbmltcG9ydCB7IGVudW1EaW1lbnNpb24gfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvc2V0dGluZy9lbnVtJztcclxuaW1wb3J0IHsgR2FtZVZpZXcgfSBmcm9tICcuL2dhbWUtdmlldyc7XHJcbmltcG9ydCB7IEVmZmVjdFZpZXcgfSBmcm9tICcuL2VmZmVjdC12aWV3JztcclxuaW1wb3J0IHsgRXZlbnRGdW5jIH0gZnJvbSAnLi4vLi4vLi4vZnJhbWV3b3JrL21hbmFnZXIvZXZlbnQvZXZlbnQtZGF0YSc7XHJcbmltcG9ydCB7IExvZyB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9jb3JlL2xvZyc7XHJcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9mcmFtZXdvcmsvbWFuYWdlci9yZXMvcmVzLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBSZXNHcm91cCB9IGZyb20gJy4uLy4uLy4uL2ZyYW1ld29yay9tYW5hZ2VyL3Jlcy9yZXMtZ3JvdXAnO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTG9hZGluZ1ZpZXcgZXh0ZW5kcyBsb2FkaW5nVUkgaW1wbGVtZW50cyBJTG9haW5ne1xyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdouWxnuaAp+euoeeQhioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i55Sf5ZG95ZGo5pyfKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uQXdha2UoKTtcclxuICAgICAgICB0aGlzLkluaXQoKTtcclxuICAgICAgICB0aGlzLnN1aXRJbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIOWKoOi9vemhtemdouWQr+WKqOmhuVxyXG4gICAgICovXHJcbiAgICBvblN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICBcclxuICAgICAgICAvL+WKoOi9veS4u+WcuuaZr+aJgOmcgOimgeeahOi1hOa6kOS/oeaBr1xyXG4gICAgICAgIFJlc01hbmFnZXIuJC5sb2FkR3JvdXAoXHJcbiAgICAgICAgICAgIENvbmZpZ1Jlcy4kLmRlZmF1bHRNYWluUmVzLFxyXG4gICAgICAgICAgICBuZXcgRXZlbnRGdW5jKHRoaXMsdGhpcy5vblByb2dyZXNzKSxcclxuICAgICAgICAgICAgbmV3IEV2ZW50RnVuYyh0aGlzLHRoaXMub25Db21wbGV0ZWQpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxibExvYWRpbmcudGV4dCA9IFwi5ri45oiP55m75b2V5LitLi4uXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3lrozmiJDlm57osINcclxuICAgICAqIEBwYXJhbSBzdWNjZXNzXHJcbiAgICAgKi9cclxuICAgIG9uQ29tcGxldGVkKHN1Y2Nlc3M6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy9CZ+mhtemdolxyXG4gICAgICAgIGxldCBiZ1ZpZXcgPSBCZ1ZpZXcuJDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKGJnVmlldyk7XHJcblxyXG4gICAgICAgIGlmKENvbmZpZ0dhbWUuJC5kaW1lbnNpb249PWVudW1EaW1lbnNpb24uRGltMylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vM0TpobXpnaJcclxuICAgICAgICAgICAgbGV0IGQzVmlldyA9IEQzVmlldy4kO1xyXG4gICAgICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKGQzVmlldyk7XHJcbiAgICAgICAgICAgIGQzVmlldy5sb2FkM0RTY2VuZSh0aGlzLHRoaXMuc2hvd1ZpZXcpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWaWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzaG93VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgLy/kuLvpobVcclxuICAgICAgICBsZXQgZ2FtZVZpZXcgPSBHYW1lVmlldy4kO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQoZ2FtZVZpZXcpO1xyXG4gICAgICAgIC8v5pWI5p6c6aG1XHJcbiAgICAgICAgbGV0IGVmZmVjdFZpZXcgPSBFZmZlY3RWaWV3LiQ7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChlZmZlY3RWaWV3KTtcclxuICAgICAgICAvL+e7k+adn+mUgOavgeWKoOi9vemhtVxyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L296L+b5bqmXHJcbiAgICAgKiBAcGFyYW0gcHJvZ3Jlc3NcclxuICAgICAqL1xyXG4gICAgb25Qcm9ncmVzcyhwcm9ncmVzczogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBmaXhlZCA9IFV0aWxOdW1iZXIudG9GaXhlZChwcm9ncmVzcyoxMDAsIDApO1xyXG4gICAgICAgIHRoaXMubGJsTG9hZGluZy50ZXh0ID0gZml4ZWQgKyBcIiVcIjtcclxuICAgICAgICB0aGlzLnByb19Mb2FkaW5nLnZhbHVlID0gZml4ZWQvMTAwO1xyXG4gICAgfVxyXG5cclxuICBcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbkuIDmrKFcclxuICAgICAqL1xyXG4gICAgcHVibGljIEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0T25jZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q+P5qyh5by55Ye65Yid5aeL5YyW5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHBvcHVwSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmluaXRBbGwoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgILphY1cclxuICAgICAqL1xyXG4gICAgc3VpdEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5pbWdfYmcud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaW1nX2JnLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuaW1nX2JnLnggPSAwO1xyXG4gICAgICAgIHRoaXMuaW1nX2JnLnkgPSAwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6aG16Z2i5Yid5aeL5pWw5o2uKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqIERlczrmnoTpgKDmmK/liJ3lp4vljJbkuIDmrKEgKi9cclxuICAgIHByaXZhdGUgaW5pdE9uY2UoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiogRGVzOuavj+asoeW8ueWHuuWIneWni+WMliAqL1xyXG4gICAgcHJpdmF0ZSBpbml0QWxsKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5aSW6YOo6L+e5o6l6L+b5YWl5Yik5patKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKiBEZXM65Yik5pat6L+b5YWl6L+e5o6l5L+h5oGvICovXHJcbiAgICBwcml2YXRlIGluaXRMaW5rKCkge1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumhtemdoueCueWHu+S6i+S7tioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirmlbDmja7mlLnlj5jnmoTnm5HlkKwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkRhdGEoZGF0YTogRGF0YUJhc2UpIHtcclxuICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy3liIbnlYznur8tLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKumUgOavgeiHqui6qyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICBkZXN0cm95KClcclxuICAgIHtcclxuICAgICAgICAvLyB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAvLyBSZXNNYW5hZ2VyLiQucmVsZWFzZUdyb3VwKENvbmZpZ1Jlcy4kLmRlZmF1bHRMb2FkUmVzKTtcclxuICAgIH1cclxuXHJcbiAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLeWIhueVjOe6vy0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbn0iLCJpbXBvcnQgeyBDb25maWdEZWJ1ZyB9IGZyb20gJy4uL3NldHRpbmcvY29uZmlnJztcclxuXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0wOSAxNTo1OVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOi+k+WHuuS/oeaBr+euoeeQhlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvZyB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWJ1ZyguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzRGVidWcpIGNvbnNvbGUuZGVidWcoXCJbZGVidWddXCIsIGFyZ3MudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpbmZvKC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICAgICAgaWYgKENvbmZpZ0RlYnVnLiQuaXNEZWJ1ZykgY29uc29sZS5pbmZvKFwiW2luZm9dXCIsIGFyZ3MudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB3YXJuKC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICAgICAgaWYgKENvbmZpZ0RlYnVnLiQuaXNEZWJ1ZykgY29uc29sZS53YXJuKFwiW3dhcm5dXCIsIGFyZ3MudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlcnJvciguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzRGVidWcpIGNvbnNvbGUuZXJyb3IoXCJbZXJyb3JdXCIsIGFyZ3MudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBleGNlcHRpb24oLi4uYXJnczogYW55W10pIHtcclxuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc0RlYnVnKSBjb25zb2xlLmV4Y2VwdGlvbihcIltleGNlXVwiLCBhcmdzLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9nKC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICAgICAgaWYgKENvbmZpZ0RlYnVnLiQuaXNEZWJ1ZykgY29uc29sZS5sb2coXCJbbG9nXVwiLCBhcmdzLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKirmiZPljbDorr7lpIfkv6Hmga8qL1xyXG4gICAgcHVibGljIHN0YXRpYyBwcmludERldmljZUluZm8oKSB7XHJcbiAgICAgICAgaWYgKENvbmZpZ0RlYnVnLiQuaXNEZWJ1ZyAmJiBuYXZpZ2F0b3IpIHtcclxuICAgICAgICAgICAgbGV0IGFnZW50U3RyID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdGFydCA9IGFnZW50U3RyLmluZGV4T2YoXCIoXCIpO1xyXG4gICAgICAgICAgICBsZXQgZW5kID0gYWdlbnRTdHIuaW5kZXhPZihcIilcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA8IDAgfHwgZW5kIDwgc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGluZm9TdHIgPSBhZ2VudFN0ci5zdWJzdHJpbmcoc3RhcnQgKyAxLCBlbmQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRldmljZTogc3RyaW5nLCBzeXN0ZW06IHN0cmluZywgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgICAgICAgICBsZXQgaW5mb3MgPSBpbmZvU3RyLnNwbGl0KFwiO1wiKTtcclxuICAgICAgICAgICAgaWYgKGluZm9zLmxlbmd0aCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+S4ieS4queahOivne+8jCDlj6/og73mmK9hbmRyb2lk55qE77yMIOmCo+S5iOesrOS4ieS4quaYr+iuvuWkh+WPt1xyXG4gICAgICAgICAgICAgICAgZGV2aWNlID0gaW5mb3NbMl07XHJcbiAgICAgICAgICAgICAgICAvL+esrOS6jOS4quaYr+ezu+e7n+WPt+WSjOeJiOacrFxyXG4gICAgICAgICAgICAgICAgbGV0IHN5c3RlbV9pbmZvID0gaW5mb3NbMV0uc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN5c3RlbV9pbmZvLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3lzdGVtID0gc3lzdGVtX2luZm9bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiA9IHN5c3RlbV9pbmZvWzJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZm9zLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBzeXN0ZW0gPSBpbmZvc1swXTtcclxuICAgICAgICAgICAgICAgIGRldmljZSA9IGluZm9zWzBdO1xyXG4gICAgICAgICAgICAgICAgdmVyc2lvbiA9IGluZm9zWzFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3lzdGVtID0gbmF2aWdhdG9yLnBsYXRmb3JtO1xyXG4gICAgICAgICAgICAgICAgZGV2aWNlID0gbmF2aWdhdG9yLnBsYXRmb3JtO1xyXG4gICAgICAgICAgICAgICAgdmVyc2lvbiA9IGluZm9TdHI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTG9nLmluZm8oc3lzdGVtLCBkZXZpY2UsIHZlcnNpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IExvZyB9IGZyb20gJy4vbG9nJztcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTA5IDIzOjI1XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24gIOWvueixoeaxoFxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9iamVjdFBvb2wge1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS4gOS4quWvueixoe+8jOS4jeWtmOWcqOWImeWIm+W7ulxyXG4gICAgICogQHBhcmFtIGNsYXNzRGVmICDnsbvlkI1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQoY2xhc3NEZWY6IGFueSk6IGFueSB7XHJcbiAgICAgICAgbGV0IHNpZ246IHN0cmluZyA9IFwiZGMuXCIgKyBjbGFzc0RlZi5uYW1lO1xyXG4gICAgICAgIGxldCBvYmo6IGFueSA9IExheWEuUG9vbC5nZXRJdGVtKHNpZ24pO1xyXG4gICAgICAgIGlmICghb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICghTGF5YS5DbGFzc1V0aWxzLmdldFJlZ0NsYXNzKHNpZ24pKSB7XHJcbiAgICAgICAgICAgICAgICBMb2cuZGVidWcoXCJbcG9vbHNd5rOo5YaM5a+56LGh5rGgOlwiICsgc2lnbik7XHJcbiAgICAgICAgICAgICAgICBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3Moc2lnbiwgY2xhc3NEZWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iaiA9IExheWEuQ2xhc3NVdGlscy5nZXRJbnN0YW5jZShzaWduKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9iaiAmJiBvYmpbXCJpbml0XCJdKSBvYmouaW5pdCgpO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlm57mlLblr7nosaFcclxuICAgICAqIEBwYXJhbSBvYmogIOWvueixoeWunuS+i1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlY292ZXIob2JqOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIW9iaikgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgcHJvdG86IGFueSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xyXG4gICAgICAgIGxldCBjbGF6ejogYW55ID0gcHJvdG9bXCJjb25zdHJ1Y3RvclwiXTtcclxuICAgICAgICBsZXQgc2lnbjogc3RyaW5nID0gXCJkYy5cIiArIGNsYXp6Lm5hbWU7XHJcbiAgICAgICAgb2JqLmNsb3NlKCk7XHJcbiAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoc2lnbiwgb2JqKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoq5a+56LGh5rGg5Z+657G7Ki9cclxuZXhwb3J0IGludGVyZmFjZSBJUG9vbE9iamVjdCB7XHJcbiAgICAvLyDliJ3lp4vljJZcclxuICAgIGluaXQoKTtcclxuICAgIC8vIOWFs+mXrVxyXG4gICAgY2xvc2UoKTtcclxufVxyXG4iLCJpbXBvcnQgeyBMb2cgfSBmcm9tICcuL2xvZyc7XHJcblxyXG4gLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMDkgMTU6NTdcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDljZXkvovlt6XlhbfnsbtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGV0b24ge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNsYXNzS2V5czogRnVuY3Rpb25bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2xhc3NWYWx1ZXM6IGFueVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgbGV0IGNsYXp6OiBhbnkgPSB0aGlzW1wiY29uc3RydWN0b3JcIl07XHJcbiAgICAgICAgaWYgKCFjbGF6eikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJOb3Qgc3VwcG9ydCBjb25zdHJ1Y3RvciFcIik7XHJcbiAgICAgICAgICAgIExvZy53YXJuKFwiTm90IHN1cHBvcnQgY29uc3RydWN0b3IhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOmYsuatoumHjeWkjeWunuS+i+WMllxyXG4gICAgICAgIGlmIChTaW5nbGV0b24uY2xhc3NLZXlzLmluZGV4T2YoY2xhenopICE9IC0xKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcyArIFwiT25seSBpbnN0YW5jZSBvbmNlIVwiKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgU2luZ2xldG9uLmNsYXNzS2V5cy5wdXNoKGNsYXp6KTtcclxuICAgICAgICAgICAgU2luZ2xldG9uLmNsYXNzVmFsdWVzLnB1c2godGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJcclxuIFxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0wOSAyMzozMVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uICDkuovku7bku7vliqHlsZ7mgKdcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUaW1lRGVsYXlEYXRhIHtcclxuXHJcbiAgICAvKirph43lpI3mrKHmlbAgKi9cclxuICAgIHB1YmxpYyByZXBlYXQ6IG51bWJlcjtcclxuICAgIC8qKumXtOmalCAqL1xyXG4gICAgcHVibGljIGludGVydmFsOiBudW1iZXI7XHJcbiAgICAvKirlj4LmlbAgKi9cclxuICAgIHB1YmxpYyBwYXJhbTogYW55O1xyXG4gICAgLyoq5Zue6LCDICovXHJcbiAgICBwdWJsaWMgY2FsbGJhY2s6IFRpbWVyQ2FsbGJhY2s7XHJcbiAgICAvKirkvZznlKjln58gKi9cclxuICAgIHB1YmxpYyB0aGlzT2JqOiBhbnk7XHJcbiAgICAvKirmmK/lkKblt7LliKDpmaQgKi9cclxuICAgIHB1YmxpYyBkZWxldGVkOiBib29sZWFuO1xyXG4gICAgLyoq6L+Q6KGM5LqL5Lu2ICovXHJcbiAgICBwdWJsaWMgZWxhcHNlZDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBzZXQoaW50ZXJ2YWw6IG51bWJlciwgcmVwZWF0OiBudW1iZXIsIGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrLCB0aGlzT2JqOiBhbnksIHBhcmFtOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmludGVydmFsID0gaW50ZXJ2YWw7XHJcbiAgICAgICAgdGhpcy5yZXBlYXQgPSByZXBlYXQ7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMucGFyYW0gPSBwYXJhbTtcclxuICAgICAgICB0aGlzLnRoaXNPYmogPSB0aGlzT2JqO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBUaW1lckNhbGxiYWNrID0gKHBhcmFtOiBhbnkpID0+IHZvaWRcclxuXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0wOSAyMzoyNVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uICDml7bpl7TmjqfliLbmoLjlv4PnsbtcclxuICpcclxuICovXHJcbmltcG9ydCB7U2luZ2xldG9ufSBmcm9tIFwiLi9zaW5nbGV0b25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lRGVsYXkgZXh0ZW5kcyBTaW5nbGV0b24ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMC4wMSwgdGhpcywgdGhpcy51cGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuW9k+WJjeS6i+S7tuaJp+ihjOeahOasoeaVsCAqL1xyXG4gICAgcHVibGljIHJlcGVhdDogbnVtYmVyID0gMFxyXG4gICAgcHJpdmF0ZSBpdGVtczogQXJyYXk8VGltZURlbGF5RGF0YT4gPSBuZXcgQXJyYXk8VGltZURlbGF5RGF0YT4oKTtcclxuICAgIHByaXZhdGUgdG9BZGQ6IEFycmF5PFRpbWVEZWxheURhdGE+ID0gbmV3IEFycmF5PFRpbWVEZWxheURhdGE+KCk7XHJcbiAgICBwcml2YXRlIHRvUmVtb3ZlOiBBcnJheTxUaW1lRGVsYXlEYXRhPiA9IG5ldyBBcnJheTxUaW1lRGVsYXlEYXRhPigpO1xyXG4gICAgcHJpdmF0ZSBwb29sOiBBcnJheTxUaW1lRGVsYXlEYXRhPiA9IG5ldyBBcnJheTxUaW1lRGVsYXlEYXRhPigpO1xyXG5cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbUluc3RhbmNlOiBUaW1lRGVsYXkgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tSW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLm1JbnN0YW5jZSA9IG5ldyBUaW1lRGVsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubUluc3RhbmNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku47msaDlrZDkuK3ojrflj5ZkYXRh57G7XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0RnJvbVBvb2woKTogVGltZURlbGF5RGF0YSB7XHJcbiAgICAgICAgbGV0IHQ6IFRpbWVEZWxheURhdGE7XHJcbiAgICAgICAgaWYgKHRoaXMucG9vbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHQgPSB0aGlzLnBvb2wucG9wKClcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgdCA9IG5ldyBUaW1lRGVsYXlEYXRhKCk7XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkYXRh57G75pS+5Zue5rGg5a2QXHJcbiAgICAgKiBAcGFyYW0gdCBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXR1cm5Ub1Bvb2wodDogVGltZURlbGF5RGF0YSkge1xyXG4gICAgICAgIHQuc2V0KDAsIDAsIG51bGwsIG51bGwsIG51bGwpXHJcbiAgICAgICAgdC5lbGFwc2VkID0gMFxyXG4gICAgICAgIHQuZGVsZXRlZCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5wb29sLnB1c2godClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhpc3RzKGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrLCB0aGlzT2JqOiBhbnkpIHtcclxuICAgICAgICBsZXQgdCA9IHRoaXMudG9BZGQuZmluZCgodmFsdWU6IFRpbWVEZWxheURhdGEsIGluZGV4OiBudW1iZXIsIG9iajogQXJyYXk8VGltZURlbGF5RGF0YT4pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmNhbGxiYWNrID09IGNhbGxiYWNrICYmIHZhbHVlLnRoaXNPYmogPT0gdGhpc09ialxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGlmICh0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgdCA9IHRoaXMuaXRlbXMuZmluZCgodmFsdWU6IFRpbWVEZWxheURhdGEsIGluZGV4OiBudW1iZXIsIG9iajogQXJyYXk8VGltZURlbGF5RGF0YT4pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmNhbGxiYWNrID09IGNhbGxiYWNrICYmIHZhbHVlLnRoaXNPYmogPT0gdGhpc09ialxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHQgIT0gbnVsbCAmJiAhdC5kZWxldGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGQoaW50ZXJ2YWw6IG51bWJlciwgcmVwZWF0OiBudW1iZXIsIGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrLCB0aGlzT2JqOiBhbnksIGNhbGxiYWNrUGFyYW06IGFueSA9IG51bGwpIHtcclxuICAgICAgICBsZXQgdDogVGltZURlbGF5RGF0YTtcclxuICAgICAgICB0ID0gdGhpcy5pdGVtcy5maW5kKCh2YWx1ZTogVGltZURlbGF5RGF0YSwgaW5kZXg6IG51bWJlciwgb2JqOiBBcnJheTxUaW1lRGVsYXlEYXRhPikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuY2FsbGJhY2sgPT0gY2FsbGJhY2sgJiYgdmFsdWUudGhpc09iaiA9PSB0aGlzT2JqXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdCA9IHRoaXMudG9BZGQuZmluZCgodmFsdWU6IFRpbWVEZWxheURhdGEsIGluZGV4OiBudW1iZXIsIG9iajogQXJyYXk8VGltZURlbGF5RGF0YT4pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jYWxsYmFjayA9PSBjYWxsYmFjayAmJiB2YWx1ZS50aGlzT2JqID09IHRoaXNPYmpcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdCA9IHRoaXMuZ2V0RnJvbVBvb2woKTtcclxuICAgICAgICAgICAgdGhpcy50b0FkZC5wdXNoKHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdC5zZXQoaW50ZXJ2YWwsIHJlcGVhdCwgY2FsbGJhY2ssIHRoaXNPYmosIGNhbGxiYWNrUGFyYW0pO1xyXG4gICAgICAgIHQuZGVsZXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHQuZWxhcHNlZCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFVwZGF0ZShjYWxsYmFjazogVGltZXJDYWxsYmFjaywgdGhpc09iajogYW55LCBjYWxsYmFja1BhcmFtOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5hZGQoMC4wMDEsIDAsIGNhbGxiYWNrLCB0aGlzT2JqLCBjYWxsYmFja1BhcmFtKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrLCB0aGlzT2JqOiBhbnkpIHtcclxuICAgICAgICBsZXQgZmluZGluZGV4ID0gLTFcclxuICAgICAgICBsZXQgdCA9IHRoaXMudG9BZGQuZmluZCgodmFsdWU6IFRpbWVEZWxheURhdGEsIGluZGV4OiBudW1iZXIsIG9iajogQXJyYXk8VGltZURlbGF5RGF0YT4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLmNhbGxiYWNrID09IGNhbGxiYWNrICYmIHZhbHVlLnRoaXNPYmogPT0gdGhpc09iaikge1xyXG4gICAgICAgICAgICAgICAgZmluZGluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50b0FkZC5zcGxpY2UoZmluZGluZGV4LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5yZXR1cm5Ub1Bvb2wodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ID0gdGhpcy5pdGVtcy5maW5kKCh2YWx1ZTogVGltZURlbGF5RGF0YSwgaW5kZXg6IG51bWJlciwgb2JqOiBBcnJheTxUaW1lRGVsYXlEYXRhPikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuY2FsbGJhY2sgPT0gY2FsbGJhY2sgJiYgdmFsdWUudGhpc09iaiA9PSB0aGlzT2JqO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0ICE9IG51bGwpXHJcbiAgICAgICAgICAgIHQuZGVsZXRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsYXN0VGltZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgZGVsdGFUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSAoTGF5YS50aW1lci5jdXJyVGltZXIgLSB0aGlzLmxhc3RUaW1lKSAvIDEwMDA7XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IHQgPSB0aGlzLml0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKHQuZGVsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b1JlbW92ZS5wdXNoKHQpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHQuZWxhcHNlZCArPSB0aGlzLmRlbHRhVGltZTtcclxuICAgICAgICAgICAgaWYgKHQuZWxhcHNlZCA8IHQuaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0LmVsYXBzZWQgPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHQucmVwZWF0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdC5yZXBlYXQtLTtcclxuICAgICAgICAgICAgICAgIGlmICh0LnJlcGVhdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5kZWxldGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvUmVtb3ZlLnB1c2godCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZXBlYXQgPSB0LnJlcGVhdDtcclxuICAgICAgICAgICAgaWYgKHQuY2FsbGJhY2sgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB0LmNhbGxiYWNrLmNhbGwodC50aGlzT2JqLCB0LnBhcmFtKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5kZWxldGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuID0gdGhpcy50b1JlbW92ZS5sZW5ndGg7XHJcbiAgICAgICAgd2hpbGUgKGxlbikge1xyXG4gICAgICAgICAgICBsZXQgdCA9IHRoaXMudG9SZW1vdmUucG9wKCk7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuaXRlbXMuaW5kZXhPZih0KTtcclxuICAgICAgICAgICAgaWYgKHQuZGVsZXRlZCAmJiBpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXR1cm5Ub1Bvb2wodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVuLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxlbiA9IHRoaXMudG9BZGQubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChsZW4pIHtcclxuICAgICAgICAgICAgbGV0IHQgPSB0aGlzLnRvQWRkLnBvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2godCk7XHJcbiAgICAgICAgICAgIGxlbi0tO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBFdmVudE5vZGUgfSBmcm9tICcuLi9ldmVudC9ldmVudC1ub2RlJztcclxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGF0YSc7XHJcbmltcG9ydCB7IERhdGFCYXNlIH0gZnJvbSAnLi9kYXRhLWJhc2UnO1xyXG5pbXBvcnQgeyBJTWFuYWdlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9pLW1hbmFnZXInO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTA5IDE1OjUxXHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g5pWw5o2u566h55CG57G7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGF0YU1hbmFnZXIgZXh0ZW5kcyBFdmVudE5vZGUgaW1wbGVtZW50cyBJTWFuYWdlciB7XHJcblxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBEYXRhTWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkRhdGFNYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgRGF0YU1hbmFnZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGF0YXM6IE1hcDxzdHJpbmcsIERhdGFCYXNlPiA9IG5ldyBNYXA8c3RyaW5nLCBEYXRhQmFzZT4oKTtcclxuXHJcbiAgICBzZXR1cCgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRhdGFzLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgXHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyKGRhdGE6IERhdGFCYXNlKTogRGF0YU1hbmFnZXIge1xyXG4gICAgICAgIHRoaXMuZGF0YXMuc2V0KGRhdGEuY21kLCBkYXRhKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0KGNtZDogc3RyaW5nKTogRGF0YUJhc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFzLmdldChjbWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiIsIlxyXG5cclxuIC8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTEyIDE3OjEzXHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g5LqL5Lu25pWw5o2u5a6a5LmJ57G7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnREYXRhIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjbWQ6IHN0cmluZywgb2JqOiBhbnkgPSBudWxsLCBpc1N0b3A6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuY21kID0gY21kO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IG9iajtcclxuICAgICAgICB0aGlzLmlzU3RvcCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBkYXRhOiBhbnk7XHJcbiAgICBwdWJsaWMgaXNTdG9wID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv6vpgJ/liJvlu7rkuovku7bmlbDmja5cclxuICAgICAqIEBwYXJhbSBjbWRcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gaXNTdG9wXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGNtZDogc3RyaW5nLCBkYXRhOiBhbnkgPSBudWxsLCBpc1N0b3A6IGJvb2xlYW4gPSBmYWxzZSk6IEV2ZW50RGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudERhdGEoY21kLCBkYXRhLCBpc1N0b3ApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuaXNTdG9wID0gdHJ1ZVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIC8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTAxLTIwIDAwOjI0XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g5LqL5Lu25Zue6LCD5Ye95pWw5a6a5LmJXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRGdW5jIHtcclxuXHJcbiAgICBwcml2YXRlIG1fdGhpczogYW55O1xyXG4gICAgcHJpdmF0ZSBtX2NiOiBGdW5jdGlvbjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IodGhpc09iajogYW55LCBjYWxsQmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLm1fdGhpcyA9IHRoaXNPYmo7XHJcbiAgICAgICAgdGhpcy5tX2NiID0gY2FsbEJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGludm9rZSguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMubV9jYi5jYWxsKHRoaXMubV90aGlzLCAuLi5hcmdzKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7IEV2ZW50Tm9kZSwgRXZlbnRDb250ZXh0LCBFdmVudENhbGxiYWNrTGlzdGVuZXIgfSBmcm9tICcuL2V2ZW50LW5vZGUnO1xyXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICcuL2V2ZW50LWRhdGEnO1xyXG5pbXBvcnQgeyBJTWFuYWdlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9pLW1hbmFnZXInO1xyXG5cclxuXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wMS0xOCAxNjoyMFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOS6i+S7tueuoeeQhuWZqFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEV2ZW50TWFuYWdlciBleHRlbmRzIEV2ZW50Tm9kZSBpbXBsZW1lbnRzIElNYW5hZ2VyIHtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEV2ZW50TWFuYWdlciA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6RXZlbnRNYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICBcclxuXHJcbiAgICBzZXR1cCgpOiB2b2lkIHtcclxuICAgICAgICBFdmVudENvbnRleHQuZXZlbnROb2Rlcy5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIEV2ZW50Q29udGV4dC5ldmVudE5vZGVzLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog56e76Zmk5LiA5Liq5raI5oGv55uR5ZCs6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gbm9kZVxyXG4gICAgICovXHJcbiAgICByZW1vdmUobm9kZTogRXZlbnROb2RlKTogdm9pZCB7XHJcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyQWxsKCk7XHJcbiAgICAgICAgRXZlbnRDb250ZXh0LmV2ZW50Tm9kZXMuZGVsZXRlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uZ5omA5pyJ5pys5Zyw5raI5oGv6IqC54K56YCa55+l5raI5oGvXHJcbiAgICAgKiBAcGFyYW0gZWRcclxuICAgICAqL1xyXG4gICAgZGlzcGF0Y2hFdmVudExvY2FsQWxsKGVkOiBFdmVudERhdGEpIHtcclxuICAgICAgICBFdmVudENvbnRleHQuZXZlbnROb2Rlcy5mb3JFYWNoKChlbjogRXZlbnROb2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGVuLmRpc3BhdGNoRXZlbnQoZWQpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5nmiYDmnInmnKzlnLDmtojmga/oioLngrnpgJrnn6Xmtojmga9cclxuICAgICAqIEBwYXJhbSBjbWRcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKi9cclxuICAgIGRpc3BhdGNoRXZlbnRMb2NhbEFsbEJ5Q21kKGNtZDogc3RyaW5nIHwgbnVtYmVyLCBkYXRhOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgRXZlbnRDb250ZXh0LmV2ZW50Tm9kZXMuZm9yRWFjaCgoZW46IEV2ZW50Tm9kZSkgPT4ge1xyXG4gICAgICAgICAgICBlbi5kaXNwYXRjaEV2ZW50QnlDbWQoY21kLCBkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOS4gOS4qua2iOaBr+ebkeWQrOWZqFxyXG4gICAgICogQHBhcmFtIHR5cGUg5raI5oGv57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOS9nOeUqOWvueixoVxyXG4gICAgICogQHBhcmFtIHByaW9yaXR5IOa2iOaBr+eahOS8mOWFiOe6p1xyXG4gICAgICogQHBhcmFtIG9uY2Ug5piv5ZCm5Y+q55uR5ZCs5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRMaXN0ZW5lcih0eXBlOiBzdHJpbmcgfCBudW1iZXIsIGNhbGxCYWNrOiBFdmVudENhbGxiYWNrTGlzdGVuZXIsIHRhcmdldDogYW55LCBwcmlvcml0eTogbnVtYmVyID0gMCwgb25jZTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgRXZlbnROb2RlLmFkZEdsb2JhbExpc3RlbmVyKHR5cGUsY2FsbEJhY2ssdGFyZ2V0LHByaW9yaXR5LG9uY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e76Zmk5LiA5Liq5raI5oGv55uR5ZCs5ZmoXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDmtojmga9pZFxyXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIOWbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIHRhcmdldCDkvZznlKjnmoTlr7nosaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZUxpc3RlbmVyKHR5cGU6IHN0cmluZyB8IG51bWJlciwgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciwgdGFyZ2V0OiBhbnkpIHtcclxuICAgICAgICBFdmVudE5vZGUucmVtb3ZlR2xvYmFsTGlzdGVuZXIodHlwZSxjYWxsQmFjayx0YXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5a2Y5Zyo6L+Z5Liq55uR5ZCs5raI5oGvXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDmtojmga/nsbvlnotcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlm57osIPnsbvlnotcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5Zue6LCD5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNMaXN0ZW5lcih0eXBlOiBzdHJpbmcgfCBudW1iZXIsIGNhbGxCYWNrOiBFdmVudENhbGxiYWNrTGlzdGVuZXIsIHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgRXZlbnROb2RlLmhhc0dsb2JhbExpc3RlbmVyKHR5cGUsY2FsbEJhY2ssdGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa0vuWPkea2iOaBr1xyXG4gICAgICogQHBhcmFtIGNtZCDmtojmga9pZFxyXG4gICAgICogQHBhcmFtIGRhdGEg5raI5oGv5YaF5a65XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwYXRjaEV2ZW50QnlDbWQoY21kOiBzdHJpbmcgfCBudW1iZXIsIGRhdGE6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBFdmVudE5vZGUuZGlzcGF0Y2hHbG9iYWxCeUNtZChjbWQsZGF0YSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJy4vZXZlbnQtZGF0YSc7XHJcbmltcG9ydCB7IExvZyB9IGZyb20gJy4uLy4uL2NvcmUvbG9nJztcclxuaW1wb3J0IHsgU2luZ2xldG9uIH0gZnJvbSAnLi4vLi4vY29yZS9zaW5nbGV0b24nO1xyXG5cclxuXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wMS0xOCAxNjoyMFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOaJgOaciemcgOimgeebkeaOp+S6i+S7tuiKgueCueeahOWfuuexu1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEV2ZW50Tm9kZSBleHRlbmRzIFNpbmdsZXRvbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBFdmVudENvbnRleHQuZXZlbnROb2Rlcy5zZXQodGhpcywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vID09PT09PT09PT09PT09ICBMb2NhbCBFdmVudCBTZWN0aW9uID09PT09PT09PT09PT09XHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIG1fZ2xvYmFsRXZlbnREYXRhOiBBcnJheTxFdmVudERhdGE+ID0gbmV3IEFycmF5PEV2ZW50RGF0YT4oKTtcclxuICAgIHByaXZhdGUgc3RhdGljIG1fZ2xvYmFsRXZlbnREaWN0OiBFdmVudExpc3RlbmVyQ2xhc3NEaWN0ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlR2xvYmFsRGF0YShjbWQsIGRhdGEpOiBFdmVudERhdGEge1xyXG4gICAgICAgIGxldCBlZDogRXZlbnREYXRhO1xyXG4gICAgICAgIGlmIChFdmVudE5vZGUubV9nbG9iYWxFdmVudERhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBlZCA9IEV2ZW50Tm9kZS5tX2dsb2JhbEV2ZW50RGF0YS5wb3AoKTtcclxuICAgICAgICAgICAgZWQuY21kID0gY21kO1xyXG4gICAgICAgICAgICBlZC5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgZWQuaXNTdG9wID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWQgPSBuZXcgRXZlbnREYXRhKGNtZCwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZXR1cm5HbG9iYWxFdmVudERhdGEoZWQ6IEV2ZW50RGF0YSkge1xyXG4gICAgICAgIGVkLmRhdGEgPSBudWxsO1xyXG4gICAgICAgIGVkLmNtZCA9IG51bGw7XHJcbiAgICAgICAgZWQuaXNTdG9wID0gZmFsc2U7XHJcbiAgICAgICAgRXZlbnROb2RlLm1fZ2xvYmFsRXZlbnREYXRhLnB1c2goZWQpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDkuIDkuKrmtojmga/nm5HlkKzlmahcclxuICAgICAqIEBwYXJhbSB0eXBlIOa2iOaBr+exu+Wei1xyXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIOWbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIHRhcmdldCDkvZznlKjlr7nosaFcclxuICAgICAqIEBwYXJhbSBwcmlvcml0eSDmtojmga/nmoTkvJjlhYjnuqdcclxuICAgICAqIEBwYXJhbSBvbmNlIOaYr+WQpuWPquebkeWQrOS4gOasoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZEdsb2JhbExpc3RlbmVyKHR5cGU6IHN0cmluZyB8IG51bWJlciwgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciwgdGFyZ2V0OiBhbnksIHByaW9yaXR5OiBudW1iZXIgPSAwLCBvbmNlOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICB0eXBlID0gdHlwZS50b1N0cmluZygpO1xyXG4gICAgICAgIGxldCBpbmZvOiBFdmVudExpc3RlbmVySW5mb0RhdGEgPSB7XHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgIGNhbGxCYWNrOiBjYWxsQmFjayxcclxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXHJcbiAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcclxuICAgICAgICAgICAgb25jZTogb25jZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBhcnJheSA9IEV2ZW50Tm9kZS5tX2dsb2JhbEV2ZW50RGljdFt0eXBlXTtcclxuICAgICAgICBsZXQgaGFzID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHBvcyA9IDA7XHJcbiAgICAgICAgaWYgKGFycmF5ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnRhcmdldCA9PSB0YXJnZXQgJiYgZWxlbWVudC5jYWxsQmFjayA9PSBjYWxsQmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5wcmlvcml0eSA+IGluZm8ucHJpb3JpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3MrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXJyYXkgPSBuZXcgQXJyYXk8RXZlbnRMaXN0ZW5lckluZm9EYXRhPigpO1xyXG4gICAgICAgICAgICBFdmVudE5vZGUubV9nbG9iYWxFdmVudERpY3RbdHlwZV0gPSBhcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhhcykge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwi6YeN5aSN5rOo5YaM5raI5oGv77yadHlwZT1cIiArIHR5cGUpO1xyXG4gICAgICAgICAgICBMb2cuZXJyb3IoXCLph43lpI3ms6jlhozmtojmga/vvJp0eXBlPVwiICsgdHlwZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhcnJheS5zcGxpY2UocG9zLCAwLCBpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTkuIDkuKrmtojmga/nm5HlkKzlmahcclxuICAgICAqIEBwYXJhbSB0eXBlIOa2iOaBr2lkXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOS9nOeUqOeahOWvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUdsb2JhbExpc3RlbmVyKHR5cGU6IHN0cmluZyB8IG51bWJlciwgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciwgdGFyZ2V0OiBhbnkpIHtcclxuICAgICAgICB0eXBlID0gdHlwZS50b1N0cmluZygpO1xyXG4gICAgICAgIGxldCBpbmZvOiBFdmVudExpc3RlbmVySW5mb0RhdGEgPSBudWxsO1xyXG4gICAgICAgIGxldCBhcnJheSA9IEV2ZW50Tm9kZS5tX2dsb2JhbEV2ZW50RGljdFt0eXBlXTtcclxuICAgICAgICBpZiAoYXJyYXkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgaW5mb0luZGV4ID0gLTE7XHJcbiAgICAgICAgICAgIGFycmF5LmV2ZXJ5KCh2YWx1ZTogRXZlbnRMaXN0ZW5lckluZm9EYXRhLCBpbmRleDogbnVtYmVyLCBhcnJheTogRXZlbnRMaXN0ZW5lckluZm9EYXRhW10pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50YXJnZXQgPT0gdGFyZ2V0ICYmIHZhbHVlLmNhbGxCYWNrID09IGNhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmZvSW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpbmZvSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5a2Y5Zyo6L+Z5Liq55uR5ZCs5raI5oGvXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDmtojmga/nsbvlnotcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlm57osIPnsbvlnotcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5Zue6LCD5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaGFzR2xvYmFsTGlzdGVuZXIodHlwZTogc3RyaW5nIHwgbnVtYmVyLCBjYWxsQmFjazogRXZlbnRDYWxsYmFja0xpc3RlbmVyLCB0YXJnZXQ6IGFueSkge1xyXG4gICAgICAgIGxldCBmbGFnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gRXZlbnROb2RlLm1fZ2xvYmFsRXZlbnREaWN0W3R5cGVdO1xyXG4gICAgICAgIGlmIChhcnJheSkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGFycmF5LmZpbmRJbmRleCgob2JqLCBpbmRleCwgYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnRhcmdldCA9PSB0YXJnZXQgJiYgb2JqLmNhbGxCYWNrID09IGNhbGxCYWNrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZmxhZyA9IGluZGV4ICE9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa0vuWPkea2iOaBr1xyXG4gICAgICogQHBhcmFtIGVkIOa0vuWPkeeahOa2iOaBr+WGheWuuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRpc3BhdGNoR2xvYmFsKGVkOiBFdmVudERhdGEpIHtcclxuICAgICAgICBFdmVudE5vZGUuX2Rpc3BhdGNoR2xvYmFsKGVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa0vuWPkea2iOaBr1xyXG4gICAgICogQHBhcmFtIGNtZCDmtojmga9pZFxyXG4gICAgICogQHBhcmFtIGRhdGEg5raI5oGv5YaF5a65XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZGlzcGF0Y2hHbG9iYWxCeUNtZChjbWQ6IHN0cmluZyB8IG51bWJlciwgZGF0YTogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIGxldCBlZCA9IEV2ZW50Tm9kZS5jcmVhdGVHbG9iYWxEYXRhKGNtZCwgZGF0YSk7XHJcbiAgICAgICAgRXZlbnROb2RlLl9kaXNwYXRjaEdsb2JhbChlZCk7XHJcbiAgICAgICAgaWYgKGVkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgRXZlbnROb2RlLnJldHVybkdsb2JhbEV2ZW50RGF0YShlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9kaXNwYXRjaEdsb2JhbChlZDogRXZlbnREYXRhKSB7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gRXZlbnROb2RlLm1fZ2xvYmFsRXZlbnREaWN0W2VkLmNtZF07XHJcbiAgICAgICAgaWYgKGFycmF5ICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbmZvID0gYXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mby5jYWxsQmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mby5jYWxsQmFjay5jYWxsKGluZm8udGFyZ2V0LCBlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mby5vbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGktLSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZWQuaXNTdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vID09PT09PT09PT09PT09ICBMb2NhbCBFdmVudCBTZWN0aW9uID09PT09PT09PT09PT09XHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHByaXZhdGUgbV9ldmVudERhdGE6IEFycmF5PEV2ZW50RGF0YT4gPSBuZXcgQXJyYXk8RXZlbnREYXRhPigpO1xyXG4gICAgcHJpdmF0ZSBtX2V2ZW50RGljdDogRXZlbnRMaXN0ZW5lckNsYXNzRGljdCA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlRXZlbnREYXRhKGNtZCwgZGF0YSk6IEV2ZW50RGF0YSB7XHJcbiAgICAgICAgbGV0IGVkOiBFdmVudERhdGE7XHJcbiAgICAgICAgaWYgKHRoaXMubV9ldmVudERhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBlZCA9IHRoaXMubV9ldmVudERhdGEucG9wKCk7XHJcbiAgICAgICAgICAgIGVkLmNtZCA9IGNtZDtcclxuICAgICAgICAgICAgZWQuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGVkLmlzU3RvcCA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVkID0gbmV3IEV2ZW50RGF0YShjbWQsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXR1cm5FdmVudERhdGEoZWQ6IEV2ZW50RGF0YSkge1xyXG4gICAgICAgIGVkLmRhdGEgPSBudWxsO1xyXG4gICAgICAgIGVkLmNtZCA9IG51bGw7XHJcbiAgICAgICAgZWQuaXNTdG9wID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX2V2ZW50RGF0YS5wdXNoKGVkKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5LiA5Liq5raI5oGv55uR5ZCs5ZmoXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDmtojmga/nsbvlnotcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlm57osIPlh73mlbBcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5L2c55So5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gcHJpb3JpdHkg5raI5oGv55qE5LyY5YWI57qnXHJcbiAgICAgKiBAcGFyYW0gb25jZSDmmK/lkKblj6rnm5HlkKzkuIDmrKFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nIHwgbnVtYmVyLCBjYWxsQmFjazogRXZlbnRDYWxsYmFja0xpc3RlbmVyLCB0YXJnZXQ6IGFueSwgcHJpb3JpdHk6IG51bWJlciA9IDAsIG9uY2U6IGJvb2xlYW4gPSBmYWxzZSk6RXZlbnRMaXN0ZW5lckluZm9EYXRhICAge1xyXG4gICAgICAgIHR5cGUgPSB0eXBlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IGluZm86IEV2ZW50TGlzdGVuZXJJbmZvRGF0YSA9IHtcclxuICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgY2FsbEJhY2s6IGNhbGxCYWNrLFxyXG4gICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcclxuICAgICAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxyXG4gICAgICAgICAgICBvbmNlOiBvbmNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5tX2V2ZW50RGljdFt0eXBlXTtcclxuICAgICAgICBsZXQgaGFzID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHBvcyA9IDA7XHJcbiAgICAgICAgaWYgKGFycmF5ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnRhcmdldCA9PSB0YXJnZXQgJiYgZWxlbWVudC5jYWxsQmFjayA9PSBjYWxsQmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5wcmlvcml0eSA+IGluZm8ucHJpb3JpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3MrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXJyYXkgPSBuZXcgQXJyYXk8RXZlbnRMaXN0ZW5lckluZm9EYXRhPigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fZXZlbnREaWN0W3R5cGVdID0gYXJyYXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoYXMpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIumHjeWkjeazqOWGjOa2iOaBr++8mnR5cGU9XCIgKyB0eXBlKTtcclxuICAgICAgICAgICAgTG9nLmVycm9yKFwi6YeN5aSN5rOo5YaM5raI5oGv77yadHlwZT1cIiArIHR5cGUpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShwb3MsIDAsIGluZm8pO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5mbztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTkuIDkuKrmtojmga/nm5HlkKzlmahcclxuICAgICAqIEBwYXJhbSB0eXBlIOa2iOaBr2lkXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOS9nOeUqOeahOWvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcgfCBudW1iZXIsIGNhbGxCYWNrOiBFdmVudENhbGxiYWNrTGlzdGVuZXIsIHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgdHlwZSA9IHR5cGUudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgaW5mbzogRXZlbnRMaXN0ZW5lckluZm9EYXRhID0gbnVsbDtcclxuICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLm1fZXZlbnREaWN0W3R5cGVdO1xyXG4gICAgICAgIGlmIChhcnJheSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgYXJyYXkuZXZlcnkoKHZhbHVlOiBFdmVudExpc3RlbmVySW5mb0RhdGEsIGluZGV4OiBudW1iZXIsIGFycmF5OiBFdmVudExpc3RlbmVySW5mb0RhdGFbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnRhcmdldCA9PSB0YXJnZXQgJiYgdmFsdWUuY2FsbEJhY2sgPT0gY2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZvSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBpbmZvID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZm9JbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGluZm9JbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXJBbGwoKSB7XHJcbiAgICAgICAgdGhpcy5tX2V2ZW50RGF0YSA9IG5ldyBBcnJheTxFdmVudERhdGE+KCk7XHJcbiAgICAgICAgdGhpcy5tX2V2ZW50RGljdCA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5a2Y5Zyo6L+Z5Liq55uR5ZCs5raI5oGvXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDmtojmga/nsbvlnotcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlm57osIPnsbvlnotcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5Zue6LCD5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZyB8IG51bWJlciwgY2FsbEJhY2s6IEV2ZW50Q2FsbGJhY2tMaXN0ZW5lciwgdGFyZ2V0OiBhbnkpIHtcclxuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBhcnJheSA9IHRoaXMubV9ldmVudERpY3RbdHlwZV07XHJcbiAgICAgICAgaWYgKGFycmF5KSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gYXJyYXkuZmluZEluZGV4KChvYmosIGluZGV4LCBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmoudGFyZ2V0ID09IHRhcmdldCAmJiBvYmouY2FsbEJhY2sgPT0gY2FsbEJhY2s7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmbGFnID0gaW5kZXggIT0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rS+5Y+R5raI5oGvXHJcbiAgICAgKiBAcGFyYW0gZWQg5rS+5Y+R55qE5raI5oGv5YaF5a65XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwYXRjaEV2ZW50KGVkOiBFdmVudERhdGEpIHtcclxuICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KGVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa0vuWPkea2iOaBr1xyXG4gICAgICogQHBhcmFtIGNtZCDmtojmga9pZFxyXG4gICAgICogQHBhcmFtIGRhdGEg5raI5oGv5YaF5a65XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwYXRjaEV2ZW50QnlDbWQoY21kOiBzdHJpbmcgfCBudW1iZXIsIGRhdGE6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBsZXQgZWQgPSB0aGlzLmNyZWF0ZUV2ZW50RGF0YShjbWQsIGRhdGEpO1xyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoZWQpO1xyXG4gICAgICAgIGlmIChlZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0dXJuRXZlbnREYXRhKGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGlzcGF0Y2hFdmVudChlZDogRXZlbnREYXRhKSB7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5tX2V2ZW50RGljdFtlZC5jbWRdO1xyXG4gICAgICAgIGlmIChhcnJheSAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IGFycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uY2FsbEJhY2sgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZm8uY2FsbEJhY2suY2FsbChpbmZvLnRhcmdldCwgZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8ub25jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpLS0sIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVkLmlzU3RvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEV2ZW50TGlzdGVuZXJJbmZvRGF0YSA9XHJcbiAgICB7XHJcbiAgICAgICAgdHlwZTogc3RyaW5nLFxyXG4gICAgICAgIGNhbGxCYWNrOiBFdmVudENhbGxiYWNrTGlzdGVuZXIsXHJcbiAgICAgICAgdGFyZ2V0OiBhbnksXHJcbiAgICAgICAgcHJpb3JpdHk6IG51bWJlcixcclxuICAgICAgICBvbmNlOiBib29sZWFuXHJcbiAgICB9XHJcblxyXG5leHBvcnQgdHlwZSBFdmVudExpc3RlbmVyQ2xhc3NEaWN0ID0ge1xyXG4gICAgW2tleTogc3RyaW5nXTogQXJyYXk8RXZlbnRMaXN0ZW5lckluZm9EYXRhPlxyXG59XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgRXZlbnRDYWxsYmFja0xpc3RlbmVyID0gKChlZDogRXZlbnREYXRhKSA9PiB2b2lkKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudENvbnRleHQge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZXZlbnROb2RlczogTWFwPEV2ZW50Tm9kZSwgRXZlbnROb2RlPiA9IG5ldyBNYXA8RXZlbnROb2RlLCBFdmVudE5vZGU+KCk7XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgSGFuZGxlciA9IExheWEuSGFuZGxlcjtcclxuaW1wb3J0IHtVdGlsU3RyaW5nfSBmcm9tIFwiLi4vLi4vdXRpbC9zdHJpbmdcIjtcclxuaW1wb3J0IHtSZXNNYW5hZ2VyfSBmcm9tIFwiLi4vcmVzL3Jlcy1tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNpbmdsZXRvbiB9IGZyb20gJy4uLy4uL2NvcmUvc2luZ2xldG9uJztcclxuaW1wb3J0IHsgSU1hbmFnZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvaS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgRGljdGlvbmFyeSB9IGZyb20gJy4uLy4uL3N0cnVjdHVyZS9kaWN0aW9uYXJ5JztcclxuaW1wb3J0IHsgSnNvblRlbXBsYXRlIH0gZnJvbSAnLi9qc29uLXRlbXBsYXRlJztcclxuaW1wb3J0IHsgQ29uZmlnRGF0YSB9IGZyb20gJy4uLy4uL3NldHRpbmcvY29uZmlnJztcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vY29yZS9sb2cnO1xyXG5cclxuICAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMiAxNDo0MFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOmFjee9ruihqOeuoeeQhlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEpzb25NYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uIGltcGxlbWVudHMgSU1hbmFnZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a2Y5pS+5omA5pyJ6YWN572u6KGo5qih5p2/XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbV9EaWNUZW1wbGF0ZTogRGljdGlvbmFyeTxKc29uVGVtcGxhdGU+ID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5a2Y5pS+5omA5pyJ6Kej5p6Q6L+H55qE6YWN572u6KGoXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbV9EaWNEYXRhOiBEaWN0aW9uYXJ5PGFueT4gPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEpzb25NYW5hZ2VyID0gbnVsbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogSnNvbk1hbmFnZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBKc29uTWFuYWdlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog566h55CG5Zmo57uf5LiA6K6+572u5pa55rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXR1cCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fRGljVGVtcGxhdGUgPSBuZXcgRGljdGlvbmFyeTxKc29uVGVtcGxhdGU+KCk7XHJcbiAgICAgICAgdGhpcy5tX0RpY0RhdGEgPSBuZXcgRGljdGlvbmFyeTxhbnk+KCk7XHJcbiAgICAgICAgdGhpcy5sb2FkKENvbmZpZ0RhdGEuJC5qc29uVGVtcGxhdGVMaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnrqHnkIblmajnu5/kuIDplIDmr4Hmlrnms5VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51bmxvYWRBbGwoKTtcclxuICAgICAgICBpZiAodGhpcy5tX0RpY1RlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaWNUZW1wbGF0ZS5jbGVhcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fRGljVGVtcGxhdGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tX0RpY0RhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0RpY0RhdGEuY2xlYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0RpY0RhdGEgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiDliqDovb3miYDmnInnmoTmlbDmja7mqKHmnb9cclxuICAgICAqIEBwYXJhbSBsaXN0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9hZChsaXN0OiBKc29uVGVtcGxhdGVbXSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBMb2cubG9nKFwiW2xvYWRd5Yqg6L296YWN572u6KGoOlwiICsgbGlzdFtpXS51cmwpO1xyXG4gICAgICAgICAgICB0aGlzLm1fRGljVGVtcGxhdGUuYWRkKGxpc3RbaV0ubmFtZSwgbGlzdFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS4gOS4quWNleS4gOe7k+aehOeahOaVsOaNrlxyXG4gICAgICogQHBhcmFtIG5hbWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRhYmxlKG5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLm1fRGljRGF0YS52YWx1ZShuYW1lKTtcclxuICAgICAgICBpZihkYXRhPT1udWxsKXtcclxuICAgICAgICAgICAgZGF0YSA9IFJlc01hbmFnZXIuJC5nZXRSZXModGhpcy5tX0RpY1RlbXBsYXRlLnZhbHVlKG5hbWUpLnVybCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaWNEYXRhLmFkZChuYW1lLGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS4gOihjOWkjeWQiOihqOeahOaVsOaNrlxyXG4gICAgICogQHBhcmFtIG5hbWVcclxuICAgICAqIEBwYXJhbSBrZXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRhYmxlUm93KG5hbWU6IHN0cmluZywga2V5OiBzdHJpbmd8bnVtYmVyKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUYWJsZShuYW1lKVtrZXldO1xyXG4gICAgfVxyXG5cclxuICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljbjovb3mjIflrprnmoTmqKHmnb9cclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVubG9hZChuYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdGVtcGxhdGUgPSB0aGlzLm1fRGljVGVtcGxhdGUudmFsdWUobmFtZSk7XHJcbiAgICAgICAgaWYgKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaWNEYXRhLnJlbW92ZShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmVzTWFuYWdlci4kLnJlbGVhc2VVcmwodGVtcGxhdGUudXJsKTtcclxuICAgICAgICB0aGlzLm1fRGljVGVtcGxhdGUucmVtb3ZlKG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y246L295omA5pyJ55qE5qih5p2/XHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVubG9hZEFsbCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMubV9EaWNUZW1wbGF0ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLm1fRGljVGVtcGxhdGUuZm9yZWFjaChmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVubG9hZChrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm1fRGljRGF0YS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMubV9EaWNUZW1wbGF0ZS5jbGVhcigpO1xyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5cclxuIC8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTEyIDEwOjU5XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g6YWN572u6KGo5qih5p2/6aG5XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSnNvblRlbXBsYXRlIHtcclxuXHJcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XHQvL+i1hOa6kHVybFxyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZzsgLy/lkI3np7DvvJrnlKjkuo7mn6Xmib7or6XmlbDmja7nu5PmnoRcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFdmVudEZ1bmMgfSBmcm9tICcuLi9ldmVudC9ldmVudC1kYXRhJztcclxuaW1wb3J0IHsgUmVzSXRlbSB9IGZyb20gJy4vcmVzLWl0ZW0nO1xyXG5cclxuIC8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTA5IDE5OjMxXHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g5Zy65pmv566h55CG5Zmo5omA6ZyA55qE6LWE5rqQ5YyF5a6a5LmJXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVzR3JvdXAge1xyXG5cclxuICAgIC8qKuWKoOi9vei/m+W6piAqL1xyXG4gICAgcHVibGljIHByb2dyZXNzOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5Yqg6L296LWE5rqQICovXHJcbiAgICBwdWJsaWMgbmVlZExvYWQ6IEFycmF5PFJlc0l0ZW0+ID0gbmV3IEFycmF5PFJlc0l0ZW0+KCk7XHJcbiAgICAvKirliqDovb3ml7bnmoTlm57osIPmjqXlj6Ms5LiA6Iis55So5L2c57uZ5Yqg6L2956qX6K6+572u6L+b5bqmICovXHJcbiAgICBwdWJsaWMgbG9hZEl0ZW06IEV2ZW50RnVuYztcclxuICAgIC8qKue7k+adn+aXtueahOWbnuiwg+aOpeWPoyAqL1xyXG4gICAgcHVibGljIGZpbmlzaDogRXZlbnRGdW5jO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR6LWE5rqQ57uE5re75Yqg55uu5qCHXHJcbiAgICAgKiBAcGFyYW0gdXJsIOebuOWvuei3r+W+hFxyXG4gICAgICogQHBhcmFtIHR5cGUg57G75Z6LIFxyXG4gICAgICogQHBhcmFtIGlzS2VlcE1lbW9yeSDmmK/lkKbluLjpqbvlhoXlrZggXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGQodXJsOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgaXNLZWVwTWVtb3J5ID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5uZWVkTG9hZC5maW5kSW5kZXgoKHZhbHVlOiBSZXNJdGVtLCBpbmRleDogbnVtYmVyLCBvYmo6IEFycmF5PFJlc0l0ZW0+KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5VcmwgPT0gdXJsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gbmV3IFJlc0l0ZW0odXJsLHR5cGUsaXNLZWVwTWVtb3J5KTtcclxuICAgICAgICAgICAgdGhpcy5uZWVkTG9hZC5wdXNoKGluZm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJcclxuLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMDkgMTk6MThcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDotYTmupDlsZ7mgKdcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBSZXNJdGVtIHtcclxuICAgIHByaXZhdGUgdXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHR5cGU6IHN0cmluZztcclxuICAgIHByaXZhdGUgaXNLZWVwTWVtb3J5ID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IodXJsLHR5cGUsaXNrZWVwTWVtb3J5KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5pc0tlZXBNZW1vcnkgPSBpc2tlZXBNZW1vcnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBUeXBlKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50eXBlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBJc0tlZXBNZW1vcnkoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzS2VlcE1lbW9yeVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEhhbmRsZXIgPSBMYXlhLkhhbmRsZXI7XHJcbmltcG9ydCB7IEV2ZW50Tm9kZSB9IGZyb20gJy4uL2V2ZW50L2V2ZW50LW5vZGUnO1xyXG5pbXBvcnQgeyBJTWFuYWdlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9pLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBEaWN0aW9uYXJ5IH0gZnJvbSAnLi4vLi4vc3RydWN0dXJlL2RpY3Rpb25hcnknO1xyXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuLi8uLi9jb3JlL2xvZyc7XHJcbmltcG9ydCB7IFJlc0l0ZW0gfSBmcm9tICcuL3Jlcy1pdGVtJztcclxuaW1wb3J0IHsgVXRpbFRpbWUgfSBmcm9tICcuLi8uLi91dGlsL3RpbWUnO1xyXG5pbXBvcnQgeyBSZXNHcm91cCB9IGZyb20gJy4vcmVzLWdyb3VwJztcclxuaW1wb3J0IHsgUmVzTG9hZGVkIH0gZnJvbSAnLi9yZXMtbG9hZGVkJztcclxuaW1wb3J0IHsgZW51bUNsZWFyU3RyYXRlZ3ksIGVudW1BcnJheVNvcnRPcmRlciB9IGZyb20gJy4uLy4uL3NldHRpbmcvZW51bSc7XHJcbmltcG9ydCB7IFV0aWxBcnJheSB9IGZyb20gJy4uLy4uL3V0aWwvYXJyYXknO1xyXG5pbXBvcnQgeyBFdmVudEZ1bmMgfSBmcm9tICcuLi9ldmVudC9ldmVudC1kYXRhJztcclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMiAxMzozM1xyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uICDotYTmupDnrqHnkIYgIO+8iOaJgOaciei1hOa6kOWdh+mAmui/h1Jlc0dyb3Vw55qE5b2i5byP5p2l5Yqg6L2977yJXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVzTWFuYWdlciBleHRlbmRzIEV2ZW50Tm9kZSBpbXBsZW1lbnRzIElNYW5hZ2VyIHtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFJlc01hbmFnZXIgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOiBSZXNNYW5hZ2VyIHtcclxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsKSB0aGlzLmluc3RhbmNlID0gbmV3IFJlc01hbmFnZXIoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5a2Y5pS+5omA5pyJ5bey5Yqg6L2955qE6LWE5rqQXHJcbiAgICBwcml2YXRlIG1fZGljdFJlc0l0ZW06IE1hcDxzdHJpbmcsIFJlc0l0ZW0+ID0gbmV3IE1hcDxzdHJpbmcsIFJlc0l0ZW0+KCk7XHJcblxyXG4gXHJcblxyXG4gICAgcHVibGljIHNldHVwKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4dVUkzojrflj5botYTmupBcclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJlcyh1cmw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBMYXlhLmxvYWRlci5nZXRSZXModXJsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veWNleS4qui1hOa6kFxyXG4gICAgICogQHBhcmFtIHJlc0l0ZW0g6LWE5rqQ5L+h5oGvXHJcbiAgICAgKiBAcGFyYW0gcHJvZ3Jlc3NGdWMg5Yqg6L296L+b5bqm5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gY29tcGxldGVGdWMg5Yqg6L295a6M5oiQ5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkUmVzKHJlc0l0ZW06UmVzSXRlbSxwcm9ncmVzc0Z1YzpFdmVudEZ1bmMsY29tcGxldGVGdWM6RXZlbnRGdW5jKSB7XHJcblxyXG5cclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHJlc0l0ZW0uVXJsLCBIYW5kbGVyLmNyZWF0ZSh0aGlzLCAoc3VjY2VzczogYm9vbGVhbikgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIC8v5a6M5oiQ5Zue6LCDXHJcbiAgICAgICAgICAgICAgICBpZihjb21wbGV0ZUZ1YyE9bnVsbCkgY29tcGxldGVGdWMuaW52b2tlKCk7XHJcbiAgICAgICAgICAgICAgICAvL+agh+iusOi1hOa6kFxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1fZGljdFJlc0l0ZW0uaGFzKHJlc0l0ZW0uVXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9kaWN0UmVzSXRlbS5zZXQocmVzSXRlbS5VcmwsIHJlc0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiTG9hZCBSZXNvdXJjZSBFcnJvcu+8mlwiKTtcclxuICAgICAgICAgICAgICAgIExvZy5kZWJ1ZyhyZXNJdGVtLlVybCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSksIEhhbmRsZXIuY3JlYXRlKHRoaXMsIChwcm9ncmVzczogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8v6L+b5bqm5Zue6LCDXHJcbiAgICAgICAgICAgIGlmKHByb2dyZXNzRnVjIT1udWxsKSBwcm9ncmVzc0Z1Yy5pbnZva2UocHJvZ3Jlc3MpO1xyXG5cclxuICAgICAgICB9LCBudWxsLCBmYWxzZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L296LWE5rqQ57uEXHJcbiAgICAgKiBAcGFyYW0gbG9hZHMg6LWE5rqQ5L+h5oGvIFxyXG4gICAgICogQHBhcmFtIHByb2dyZXNzRnVjIOWKoOi9vei/m+W6puWbnuiwg1xyXG4gICAgICogQHBhcmFtIGNvbXBsZXRlRnVjIOWKoOi9veWujOaIkOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEdyb3VwKGxvYWRzOiBSZXNHcm91cCxwcm9ncmVzc0Z1YzpFdmVudEZ1bmMsY29tcGxldGVGdWM6RXZlbnRGdW5jKSB7XHJcbiAgICAgICAgbGV0IHVybHM6IEFycmF5PGFueT4gPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgIGxvYWRzLm5lZWRMb2FkLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIHVybHMucHVzaCh7dXJsOiBlbGVtZW50LlVybCwgdHlwZTogZWxlbWVudC5UeXBlfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZCh1cmxzLCBIYW5kbGVyLmNyZWF0ZSh0aGlzLCAoc3VjY2VzczogYm9vbGVhbikgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIC8v5a6M5oiQ5Zue6LCDXHJcbiAgICAgICAgICAgICAgICBpZihjb21wbGV0ZUZ1YyE9bnVsbCkgY29tcGxldGVGdWMuaW52b2tlKCk7XHJcbiAgICAgICAgICAgICAgICAvL+agh+iusOi1hOa6kFxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxvYWRzLm5lZWRMb2FkLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmZvID0gbG9hZHMubmVlZExvYWRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5tX2RpY3RSZXNJdGVtLmhhcyhpbmZvLlVybCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tX2RpY3RSZXNJdGVtLnNldChpbmZvLlVybCwgaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nLmVycm9yKFwiTG9hZCBSZXNvdXJjZSBFcnJvcu+8mlwiKTtcclxuICAgICAgICAgICAgICAgIExvZy5kZWJ1Zyh1cmxzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KSwgSGFuZGxlci5jcmVhdGUodGhpcywgKHByb2dyZXNzOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgLy/ov5vluqblm57osINcclxuICAgICAgICAgICAgaWYocHJvZ3Jlc3NGdWMhPW51bGwpIHByb2dyZXNzRnVjLmludm9rZShwcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sIG51bGwsIGZhbHNlKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L296aKE6K6+54mpXHJcbiAgICAgKiBAcGFyYW0gZmlsZVBhdGhcclxuICAgICAqIEBwYXJhbSBjb21wbGV0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZFByZWZhYihmaWxlUGF0aDpTdHJpbmcsY29tcGxldGU6RXZlbnRGdW5jKVxyXG4gICAge1xyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoZmlsZVBhdGgsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLGZ1bmN0aW9uIChwcmU6IExheWEuUHJlZmFiKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5UHJlOkxheWEuUHJlZmFiID0gbmV3IExheWEuUHJlZmFiKCk7XHJcbiAgICAgICAgICAgIHBsYXlQcmUuanNvbiA9IHByZTtcclxuICAgICAgICAgICAgbGV0IGNlbGwgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q3JlYXRlRnVuKFwiQ2VsbFwiLCBwbGF5UHJlLmNyZWF0ZSwgcGxheVByZSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZSkgY29tcGxldGUuaW52b2tlKGNlbGwpO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph4rmlL7otYTmupDnu4RcclxuICAgICAqIEBwYXJhbSBsb2FkcyDotYTmupDnu4QgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWxlYXNlR3JvdXAobG9hZHM6UmVzR3JvdXApXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHVybHMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIGxvYWRzLm5lZWRMb2FkLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIHVybHMucHVzaChlbGVtZW50LlVybClcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGk9MDtpPHVybHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmNsZWFyUmVzKHVybHNbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLm1fZGljdFJlc0l0ZW0uZm9yRWFjaCgodjogUmVzSXRlbSwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgaWYoa2V5PT11cmxzW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fZGljdFJlc0l0ZW0uZGVsZXRlKGtleSk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeK5pS+5oyH5a6a6LWE5rqQXHJcbiAgICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVsZWFzZVVybCh1cmw6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgICBsZXQgaXNBY3RpdmU6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICB0aGlzLm1fZGljdFJlc0l0ZW0uZm9yRWFjaCgodjogUmVzSXRlbSwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaWYoa2V5PT11cmwpe1xyXG4gICAgICAgICAgICAgICAgaXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgaWYoaXNBY3RpdmUpe1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jbGVhclJlcyh1cmwpO1xyXG4gICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgTG9nLmVycm9yKFwi5Yqg6L296LWE5rqQ57uE5YaF5LiN5a2Y5Zyo6K+l6LWE5rqQXCIpO1xyXG4gICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7VXRpbFN0cmluZ30gZnJvbSBcIi4uLy4uL3V0aWwvc3RyaW5nXCI7XHJcbmltcG9ydCBTb3VuZENoYW5uZWwgPSBMYXlhLlNvdW5kQ2hhbm5lbDtcclxuaW1wb3J0IEhhbmRsZXIgPSBMYXlhLkhhbmRsZXI7XHJcbmltcG9ydCB7UmVzTWFuYWdlcn0gZnJvbSBcIi4uL3Jlcy9yZXMtbWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFdmVudE5vZGUgfSBmcm9tICcuLi9ldmVudC9ldmVudC1ub2RlJztcclxuaW1wb3J0IHsgSU1hbmFnZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvaS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vY29yZS9sb2cnO1xyXG5pbXBvcnQgeyBEaWN0aW9uYXJ5IH0gZnJvbSAnLi4vLi4vc3RydWN0dXJlL2RpY3Rpb25hcnknO1xyXG5pbXBvcnQgeyBDb25maWdTb3VuZCB9IGZyb20gJy4uLy4uL3NldHRpbmcvY29uZmlnJztcclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMiAxNTowOFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOmfs+aViOeuoeeQhlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNvdW5kTWFuYWdlciBleHRlbmRzIEV2ZW50Tm9kZSBpbXBsZW1lbnRzIElNYW5hZ2VyIHtcclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlsZ7mgKfkv6Hmga8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKiBEZXM66IOM5pmv6Z+z5LmQICovXHJcbiAgICBwcml2YXRlIG1fQ3VyQkdTb3VuZDogU291bmRDaGFubmVsID0gbnVsbDtcclxuICAgIC8qKumfs+aViOWQjeWtl+WvueW6lFVybCAqL1xyXG4gICAgcHJpdmF0ZSBkaWN0U291bmRVcmw6RGljdGlvbmFyeTxzdHJpbmc+ID0gbnVsbDtcclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirnlJ/lkb3lkajmnJ8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBTb3VuZE1hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogU291bmRNYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgU291bmRNYW5hZ2VyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcbiBcclxuICAgIHNldHVwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9DdXJCR1NvdW5kID0gbmV3IFNvdW5kQ2hhbm5lbCgpO1xyXG4gICAgICAgIHRoaXMuZGljdFNvdW5kVXJsID0gbmV3IERpY3Rpb25hcnk8c3RyaW5nPigpO1xyXG4gICAgICAgIENvbmZpZ1NvdW5kLiQuc291bmRSZXNMaXN0LmZvckVhY2goaXRlbT0+e1xyXG4gICAgICAgICAgICB0aGlzLmRpY3RTb3VuZFVybC5hZGQoaXRlbS5uYW1lLGl0ZW0udXJsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZighVXRpbFN0cmluZy5pc0VtcHR5KENvbmZpZ1NvdW5kLiQuYmdTb3VuZE5hbWUpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QkdTb3VuZChDb25maWdTb3VuZC4kLmJnU291bmROYW1lLDApO1xyXG4gICAgICAgICAgICB0aGlzLnNldEFsbFZvbHVtZShDb25maWdTb3VuZC4kLnZvbHVtZVZvaWNlU291bmQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIH1cclxuICAgIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuKAlOKAlCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL+WIhueVjOe6vy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuiuvue9ruaVtOS9k+mfs+mHjyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5pW05L2T6Z+z6YePXHJcbiAgICAgKiBAcGFyYW0gbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRBbGxWb2x1bWUobnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIENvbmZpZ1NvdW5kLiQudm9sdW1lVm9pY2VTb3VuZCA9IG51bWJlcjtcclxuICAgICAgICB0aGlzLm1fQ3VyQkdTb3VuZC52b2x1bWUgPSBudW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaOp+WItuiDjOaZr+mfs+S5kCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+6IOM5pmv5aOw6Z+zXHJcbiAgICAgKiBAcGFyYW0gICAgZmlsZV9uYW1lICAgIOi1hOa6kOWQjeWtl1xyXG4gICAgICogQHBhcmFtICAgIGNvdW50ICAgICAgICDmkq3mlL7mrKHmlbAoMOS4uuW+queOrylcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlCR1NvdW5kKGZpbGVfbmFtZTogc3RyaW5nLCBjb3VudDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFV0aWxTdHJpbmcuaXNFbXB0eShmaWxlX25hbWUpKSB7XHJcbiAgICAgICAgICAgIExvZy5lcnJvcihcIlNvdW5kIGZpbGUgZXJyb3IhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9DdXJCR1NvdW5kID0gTGF5YS5Tb3VuZE1hbmFnZXIucGxheU11c2ljKHRoaXMuZGljdFNvdW5kVXJsLnZhbHVlKGZpbGVfbmFtZSksY291bnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YGc5q2i6IOM5pmv6Z+z5pKt5pS+XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdG9wQkdTb3VuZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tX0N1ckJHU291bmQpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckJHU291bmQuc3RvcCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pqC5YGc6IOM5pmv6Z+z5LmQXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwYXVzZUJHU291bmQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubV9DdXJCR1NvdW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJCR1NvdW5kLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5oGi5aSN6IOM5pmv6Z+z5LmQ5pKt5pS+XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXN1bWVCR1NvdW5kKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQ3VyQkdTb3VuZCkge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyQkdTb3VuZC5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7og4zmma/pn7Pph49cclxuICAgICAqIEBwYXJhbSB2b2x1bWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEJHU291bmRWb2x1bWUodm9sdW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tX0N1ckJHU291bmQpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckJHU291bmQudm9sdW1lID0gdm9sdW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirigJTigJQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/liIbnlYznur8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5o6n5Yi26Z+z5pWI5pKt5pS+KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7mlYjmnpzlo7Dpn7NcclxuICAgICAqIEBwYXJhbSAgICBmaWxlX25hbWUgICAg6LWE5rqQXHJcbiAgICAgKiBAcGFyYW0gICAgY291bnQgICAgICAgIOaSreaUvuasoeaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGxheVNvdW5kRWZmZWN0KGZpbGVfbmFtZTogc3RyaW5nLCBjb3VudDogbnVtYmVyKXtcclxuICAgICAgICBpZiAoVXRpbFN0cmluZy5pc0VtcHR5KGZpbGVfbmFtZSkpIHtcclxuICAgICAgICAgICAgTG9nLmVycm9yKFwi5aOw6Z+z5paH5Lu26ZSZ6K+vXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNvdW5kOiBTb3VuZENoYW5uZWwgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJTb3VuZFwiLFNvdW5kQ2hhbm5lbCk7XHJcblxyXG4gICAgICAgIHNvdW5kID0gTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKHRoaXMuZGljdFNvdW5kVXJsLnZhbHVlKGZpbGVfbmFtZSksY291bnQsSGFuZGxlci5jcmVhdGUodGhpcywoKT0+e1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihcIlNvdW5kXCIsc291bmQpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBzb3VuZC52b2x1bWUgPSBDb25maWdTb3VuZC4kLnZvbHVtZVZvaWNlU291bmQ7XHJcbiAgICAgICAgcmV0dXJuIHNvdW5kO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YGc5q2i5pKt5pS+XHJcbiAgICAgKiBAcGFyYW0gc291bmRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0b3BTb3VuZEVmZmVjdChzb3VuZDogU291bmRDaGFubmVsKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHNvdW5kKSB7XHJcbiAgICAgICAgICAgIHNvdW5kLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq4oCU4oCUKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8v5YiG55WM57q/Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbn0iLCJpbXBvcnQge1V0aWxUaW1lfSBmcm9tIFwiLi4vLi4vdXRpbC90aW1lXCI7XHJcbmltcG9ydCBIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xyXG5pbXBvcnQgeyBJUG9vbE9iamVjdCB9IGZyb20gJy4uLy4uL2NvcmUvb2JqZWN0LXBvb2wnO1xyXG5pbXBvcnQgeyBUaW1lckludGVydmFsIH0gZnJvbSAnLi90aW1lci1pbnRlcnZhbCc7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMCAyMDowNlxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uICDorqHml7blmajln7rnsbtcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUaW1lckVudGl0eSBpbXBsZW1lbnRzIElQb29sT2JqZWN0IHtcclxuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xyXG4gICAgcHVibGljIGlzQWN0aXZlOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBtUmF0ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIG1UaWNrczogbnVtYmVyO1xyXG4gICAgcHVibGljIG1UaWNrc0VsYXBzZWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoYW5kbGU6IEhhbmRsZXI7XHJcblxyXG4gICAgcHVibGljIG1UaW1lOiBUaW1lckludGVydmFsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubVRpbWUgPSBuZXcgVGltZXJJbnRlcnZhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlLnJlY292ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0KGlkOiBudW1iZXIsIHJhdGU6IG51bWJlciwgdGlja3M6IG51bWJlciwgaGFuZGxlOiBIYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMubVJhdGUgPSByYXRlIDwgMCA/IDAgOiByYXRlO1xyXG4gICAgICAgIHRoaXMubVRpY2tzID0gdGlja3MgPCAwID8gMCA6IHRpY2tzO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlID0gaGFuZGxlO1xyXG4gICAgICAgIHRoaXMubVRpY2tzRWxhcHNlZCA9IDA7XHJcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tVGltZS5pbml0KHRoaXMubVJhdGUsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKHJlbW92ZVRpbWVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSAmJiB0aGlzLm1UaW1lLnVwZGF0ZShVdGlsVGltZS5kZWx0YVRpbWUpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZSAhPSBudWxsKSB0aGlzLmhhbmRsZS5ydW4oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubVRpY2tzRWxhcHNlZCsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tVGlja3MgPiAwICYmIHRoaXMubVRpY2tzID09IHRoaXMubVRpY2tzRWxhcHNlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlVGltZXIodGhpcy5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMTAgMjA6MDJcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiAg5a6a5pe25omn6KGMXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGltZXJJbnRlcnZhbCB7XHJcblxyXG4gICAgcHJpdmF0ZSBtX2ludGVydmFsX3RpbWU6IG51bWJlcjsvL+avq+enklxyXG4gICAgcHJpdmF0ZSBtX25vd190aW1lOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tX25vd190aW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluWumuaXtuWZqFxyXG4gICAgICogQHBhcmFtICAgIGludGVydmFsICAgIOinpuWPkemXtOmalFxyXG4gICAgICogQHBhcmFtICAgIGZpcnN0X2ZyYW1lICAgIOaYr+WQpuesrOS4gOW4p+W8gOWni+aJp+ihjFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdChpbnRlcnZhbDogbnVtYmVyLCBmaXJzdF9mcmFtZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9pbnRlcnZhbF90aW1lID0gaW50ZXJ2YWw7XHJcbiAgICAgICAgaWYgKGZpcnN0X2ZyYW1lKSB0aGlzLm1fbm93X3RpbWUgPSB0aGlzLm1faW50ZXJ2YWxfdGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX25vd190aW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGVsYXBzZV90aW1lOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLm1fbm93X3RpbWUgKz0gZWxhcHNlX3RpbWU7XHJcbiAgICAgICAgaWYgKHRoaXMubV9ub3dfdGltZSA+PSB0aGlzLm1faW50ZXJ2YWxfdGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1fbm93X3RpbWUgLT0gdGhpcy5tX2ludGVydmFsX3RpbWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEhhbmRsZXIgPSBMYXlhLkhhbmRsZXI7XHJcbmltcG9ydCB7VXRpbEFycmF5fSBmcm9tIFwiLi4vLi4vdXRpbC9hcnJheVwiO1xyXG5pbXBvcnQgeyBFdmVudE5vZGUgfSBmcm9tICcuLi9ldmVudC9ldmVudC1ub2RlJztcclxuaW1wb3J0IHsgSU1hbmFnZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvaS1tYW5hZ2VyJztcclxuaW1wb3J0IHsgVGltZURlbGF5IH0gZnJvbSAnLi4vLi4vY29yZS90aW1lLWRlbGF5JztcclxuaW1wb3J0IHsgT2JqZWN0UG9vbCB9IGZyb20gJy4uLy4uL2NvcmUvb2JqZWN0LXBvb2wnO1xyXG5pbXBvcnQgeyBUaW1lckVudGl0eSB9IGZyb20gJy4vdGltZXItZW50aXR5JztcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTA5IDIzOjIyXHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24gIOWumuaXtueuoeeQhuWZqFxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRpbWVyTWFuYWdlciBleHRlbmRzIEV2ZW50Tm9kZSBpbXBsZW1lbnRzIElNYW5hZ2VyIHtcclxuICBcclxuICAgIHByaXZhdGUgbV9pZENvdW50ZXI6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIG1fUmVtb3ZhbFBlbmRpbmc6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIHByaXZhdGUgbV9UaW1lcnM6IEFycmF5PFRpbWVyRW50aXR5PiA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBUaW1lck1hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogVGltZXJNYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgVGltZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldHVwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9pZENvdW50ZXIgPSAwO1xyXG4gICAgICAgIFRpbWVEZWxheS4kLmFkZCgwLjEsIDAsIHRoaXMucmVtb3ZlLCB0aGlzKTtcclxuICAgICAgICBUaW1lRGVsYXkuJC5hZGRVcGRhdGUodGhpcy50aWNrLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgVXRpbEFycmF5LmNsZWFyKHRoaXMubV9SZW1vdmFsUGVuZGluZyk7XHJcbiAgICAgICAgVXRpbEFycmF5LmNsZWFyKHRoaXMubV9UaW1lcnMpO1xyXG4gICAgICAgIFRpbWVEZWxheS4kLnJlbW92ZSh0aGlzLnJlbW92ZSwgdGhpcyk7XHJcbiAgICAgICAgVGltZURlbGF5LiQucmVtb3ZlKHRoaXMudGljaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX1RpbWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm1fVGltZXJzW2ldLnVwZGF0ZSh0aGlzLnJlbW92ZVRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrprml7bph43lpI3miafooYxcclxuICAgICAqIEBwYXJhbSAgICByYXRlICAgIOmXtOmalOaXtumXtCjljZXkvY3mr6vnp5Ip44CCXHJcbiAgICAgKiBAcGFyYW0gICAgdGlja3MgICAg5omn6KGM5qyh5pWwXHJcbiAgICAgKiBAcGFyYW0gICAgY2FsbGVyICAgIOaJp+ihjOWfnyh0aGlzKeOAglxyXG4gICAgICogQHBhcmFtICAgIG1ldGhvZCAgICDlrprml7blmajlm57osIPlh73mlbDvvJrms6jmhI/vvIzov5Tlm57lh73mlbDnrKzkuIDkuKrlj4LmlbDkuLrlrprml7blmahpZO+8jOWQjumdouWPguaVsOS+neasoeaXtuS8oOWFpeeahOWPguaVsOOAguS+i09uVGltZSh0aW1lcl9pZDpudW1iZXIsIGFyZ3MxOmFueSwgYXJnczI6YW55LC4uLik6dm9pZFxyXG4gICAgICogQHBhcmFtICAgIGFyZ3MgICAg5Zue6LCD5Y+C5pWw44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRMb29wKHJhdGU6IG51bWJlciwgdGlja3M6IG51bWJlciwgY2FsbGVyOiBhbnksIG1ldGhvZDogRnVuY3Rpb24sIGFyZ3M6IEFycmF5PGFueT4gPSBudWxsKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGlja3MgPD0gMCkgdGlja3MgPSAwO1xyXG4gICAgICAgIGxldCBuZXdUaW1lcjogVGltZXJFbnRpdHkgPSBPYmplY3RQb29sLmdldChUaW1lckVudGl0eSk7XHJcbiAgICAgICAgKyt0aGlzLm1faWRDb3VudGVyO1xyXG4gICAgICAgIGlmIChhcmdzICE9IG51bGwpIFV0aWxBcnJheS5pbnNlcnQoYXJncywgdGhpcy5tX2lkQ291bnRlciwgMCk7XHJcbiAgICAgICAgbmV3VGltZXIuc2V0KHRoaXMubV9pZENvdW50ZXIsIHJhdGUsIHRpY2tzLCBIYW5kbGVyLmNyZWF0ZShjYWxsZXIsIG1ldGhvZCwgYXJncywgZmFsc2UpKTtcclxuICAgICAgICB0aGlzLm1fVGltZXJzLnB1c2gobmV3VGltZXIpO1xyXG4gICAgICAgIHJldHVybiBuZXdUaW1lci5pZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWNleasoeaJp+ihjFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkT25jZShyYXRlOiBudW1iZXIsIGNhbGxlcjogYW55LCBtZXRob2Q6IEZ1bmN0aW9uLCBhcmdzOiBBcnJheTxhbnk+ID0gbnVsbCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG5ld1RpbWVyOiBUaW1lckVudGl0eSA9IE9iamVjdFBvb2wuZ2V0KFRpbWVyRW50aXR5KTtcclxuICAgICAgICArK3RoaXMubV9pZENvdW50ZXI7XHJcbiAgICAgICAgaWYgKGFyZ3MgIT0gbnVsbCkgVXRpbEFycmF5Lmluc2VydChhcmdzLCB0aGlzLm1faWRDb3VudGVyLCAwKTtcclxuICAgICAgICBuZXdUaW1lci5zZXQodGhpcy5tX2lkQ291bnRlciwgcmF0ZSwgMSwgSGFuZGxlci5jcmVhdGUoY2FsbGVyLCBtZXRob2QsIGFyZ3MsIGZhbHNlKSk7XHJcbiAgICAgICAgdGhpcy5tX1RpbWVycy5wdXNoKG5ld1RpbWVyKTtcclxuICAgICAgICByZXR1cm4gbmV3VGltZXIuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTlrprml7blmahcclxuICAgICAqIEBwYXJhbSAgICB0aW1lcklkICAgIOWumuaXtuWZqGlkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVUaW1lcih0aW1lcklkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fUmVtb3ZhbFBlbmRpbmcucHVzaCh0aW1lcklkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOi/h+acn+WumuaXtuWZqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdGltZXI6IFRpbWVyRW50aXR5O1xyXG4gICAgICAgIGlmICh0aGlzLm1fUmVtb3ZhbFBlbmRpbmcubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpZCBvZiB0aGlzLm1fUmVtb3ZhbFBlbmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX1RpbWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVyID0gdGhpcy5tX1RpbWVyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGltZXIuaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXIuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0UG9vbC5yZWNvdmVyKHRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tX1RpbWVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgVXRpbEFycmF5LmNsZWFyKHRoaXMubV9SZW1vdmFsUGVuZGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJcclxuXHJcbmltcG9ydCBTcHJpdGUgPSBMYXlhLlNwcml0ZTtcclxuaW1wb3J0IFR3ZWVuID0gTGF5YS5Ud2VlbjtcclxuaW1wb3J0IEVhc2UgPSBMYXlhLkVhc2U7XHJcbmltcG9ydCBIYW5kbGVyID0gTGF5YS5IYW5kbGVyO1xyXG5pbXBvcnQgeyBVdGlsRGlzcGxheSB9IGZyb20gXCIuLi8uLi91dGlsL2Rpc3BsYXlcIjtcclxuaW1wb3J0IHsgRXZlbnRGdW5jIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGF0YSc7XHJcblxyXG5leHBvcnQgbW9kdWxlIEN1c3RvbURpYWxvZ3tcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBhdXRob3IgU3VuXHJcbiAgICAgKiBAdGltZSAyMDE5LTA4LTA5IDE3OjQxXHJcbiAgICAgKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICAgICAqIEBkZXNjcmlwdGlvbiAgVUnnu4Tku7bnmoTln7rnsbvvvIznu6fmib/oh6pMYXlhLlZpZXdcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBEaWFsb2dCYXNlIGV4dGVuZHMgTGF5YS5EaWFsb2cge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKumBrue9qeWxgiAqL1xyXG4gICAgICAgIHByaXZhdGUgbWFza0xheWVyOiBTcHJpdGUgPSBudWxsO1xyXG4gICAgICAgIC8qKuW8ueeql+WGheeJqeS9kyAqL1xyXG4gICAgICAgIHByaXZhdGUgY29udGVudFBubDogTGF5YS5Ob2RlID0gbnVsbDtcclxuICAgICAgICAvKirlvLnnqpfmlbDmja4gKi9cclxuICAgICAgICBwdWJsaWMgcG9wdXBEYXRhID0gbmV3IFBvcHVwRGF0YSgpO1xyXG5cclxuICAgICAgICBjcmVhdGVWaWV3KHZpZXc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVWaWV3KHZpZXcpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1bmRsZUJ1dHRvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFBubCA9IHRoaXMuZ2V0Q2hpbGRBdCgwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOa3u+WKoOmBrue9qeWxglxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNyYXRlTWFza0xheWVyKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tMYXllciA9IFV0aWxEaXNwbGF5LmNyZWF0ZU1hc2tMYXllcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tMYXllci5tb3VzZUVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHQgPSB0aGlzLm1hc2tMYXllcjtcclxuICAgICAgICAgICAgdC54ID0gTWF0aC5yb3VuZCgoKExheWEuc3RhZ2Uud2lkdGggLSB0LndpZHRoKSA+PiAxKSArIHQucGl2b3RYKTtcclxuICAgICAgICAgICAgdC55ID0gTWF0aC5yb3VuZCgoKExheWEuc3RhZ2UuaGVpZ2h0IC0gdC5oZWlnaHQpID4+IDEpICsgdC5waXZvdFkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLm1hc2tMYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMubWFza0xheWVyLnpPcmRlciA9IC0xO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWcqOWcuuaZr+S4reWxheS4ree7hOS7tlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjZW50ZXIodmlldz86IExheWEuU3ByaXRlKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3ID09IG51bGwpIHZpZXcgPSB0aGlzO1xyXG4gICAgICAgICAgICB2aWV3LnggPSBNYXRoLnJvdW5kKCgoTGF5YS5zdGFnZS53aWR0aCAtIHZpZXcud2lkdGgpID4+IDEpICsgdmlldy5waXZvdFgpO1xyXG4gICAgICAgICAgICB2aWV3LnkgPSBNYXRoLnJvdW5kKCgoTGF5YS5zdGFnZS5oZWlnaHQgLSB2aWV3LmhlaWdodCkgPj4gMSkgKyB2aWV3LnBpdm90WSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5re75Yqg6buY6K6k5oyJ6ZKu5LqL5Lu2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYnVuZGxlQnV0dG9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXNbXCJidG5DbG9zZVwiXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW1wiYnRuQ2xvc2VcIl0ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5jbG9zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWFs+mXreepuueZveWkhOeCueWHu+WFs+mXreS6i+S7tlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsb3NlT3V0c2llQ2xpY2soKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWFza0xheWVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFza0xheWVyLm9mZihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLmNsb3NlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5a+56K+d5qGG5by55Ye65pa55rOVXHJcbiAgICAgICAgICogQHBhcmFtIHRpbWUg5by55Ye65pe26Ze0XHJcbiAgICAgICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXHJcbiAgICAgICAgICogQHBhcmFtIGlzTWFzayDmmK/lkKbnlJ/miJDpga7nvalcclxuICAgICAgICAgKiBAcGFyYW0gY2xvc2VPdXRzaWRlIOaYr+WQpueCueWHu+epuueZveWkhOWFs+mXrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBvcHVwRGlhbG9nKHBvcHVwRGF0YTpQb3B1cERhdGEgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucG9wdXAoZmFsc2UsZmFsc2UpO1xyXG4gICAgICAgICAgICBpZihwb3B1cERhdGE9PW51bGwpIHtcclxuICAgICAgICAgICAgICAgIHBvcHVwRGF0YSA9IHRoaXMucG9wdXBEYXRhO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9wdXBEYXRhID0gcG9wdXBEYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMucG9wdXBJbml0KCk7XHJcbiAgICAgICAgICAgIGlmIChwb3B1cERhdGEuaXNNYXNrICYmIHRoaXMubWFza0xheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JhdGVNYXNrTGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmICghcG9wdXBEYXRhLmNsb3NlT3V0c2lkZSkgdGhpcy5tYXNrTGF5ZXIub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5jbG9zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vblNob3dBbmltYXRpb24ocG9wdXBEYXRhLnRpbWUsKCk9PntcclxuICAgICAgICAgICAgICAgIGlmKHBvcHVwRGF0YS5jYWxsQmFjaykgcG9wdXBEYXRhLmNhbGxCYWNrLmludm9rZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBEZXM65by55Ye66LCD55SoICovXHJcbiAgICAgICAgcG9wdXBJbml0KCkge1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIG9uU2hvd0FuaW1hdGlvbih0aW1lOiBudW1iZXIgPSAzMDAsY2IpIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuY29udGVudFBubDtcclxuICAgICAgICAgICAgdGhpcy5jZW50ZXIoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgdGFyZ2V0LnNjYWxlKDAsIDApO1xyXG4gICAgICAgICAgICBUd2Vlbi50byh0YXJnZXQsIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlWDogMSxcclxuICAgICAgICAgICAgICAgIHNjYWxlWTogMVxyXG4gICAgICAgICAgICB9LCB0aW1lLCBFYXNlLmJhY2tPdXQsIEhhbmRsZXIuY3JlYXRlKHRoaXMsIGNiLCBbdGhpc10pLCAwLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGF1dGhvciBTdW5cclxuICAgICAqIEB0aW1lIDIwMTktMDgtMTIgMTc6NDNcclxuICAgICAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gICAgICogQGRlc2NyaXB0aW9uICDnqpfkvZPlvLnlh7rmlbDmja5cclxuICAgICAqdGltZTogbnVtYmVyID0gMzAwLCBkYXRhOiBhbnkgPSBudWxsLCBpc01hc2s6IGJvb2xlYW4gPSB0cnVlLCBjbG9zZU91dHNpZGU6IGJvb2xlYW4gPSB0cnVlLGNiP1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgUG9wdXBEYXRhe1xyXG4gICAgICAgIHB1YmxpYyB0aW1lOm51bWJlciA9IDMwMDtcclxuICAgICAgICBwdWJsaWMgZGF0YTphbnkgPSBudWxsO1xyXG4gICAgICAgIHB1YmxpYyBpc01hc2s6Ym9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgcHVibGljIGNsb3NlT3V0c2lkZTpib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBwdWJsaWMgY2FsbEJhY2s6RXZlbnRGdW5jID0gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTogbnVtYmVyID0gMzAwLCBkYXRhOiBhbnkgPSBudWxsLCBpc01hc2s6IGJvb2xlYW4gPSB0cnVlLCBjbG9zZU91dHNpZGU6IGJvb2xlYW4gPSB0cnVlLGNiOkV2ZW50RnVuYyA9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRpbWUhPW51bGwpIHRoaXMudGltZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIGlmKGRhdGEhPW51bGwpIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGlmKGlzTWFzayE9bnVsbCkgdGhpcy5pc01hc2sgPSBpc01hc2s7XHJcbiAgICAgICAgICAgIGlmKGNsb3NlT3V0c2lkZSE9bnVsbCkgdGhpcy5jbG9zZU91dHNpZGUgPSBjbG9zZU91dHNpZGU7XHJcbiAgICAgICAgICAgIGlmKGNiIT1udWxsKSB0aGlzLmNhbGxCYWNrID0gY2I7XHJcbiAgICAgICAgfVxyXG4gICAgfSIsImltcG9ydCB7IFJlc0dyb3VwIH0gZnJvbSAnLi4vcmVzL3Jlcy1ncm91cCc7XHJcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tICcuLi9yZXMvcmVzLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuLi8uLi9jb3JlL2xvZyc7XHJcbmltcG9ydCB7IFRpbWVyTWFuYWdlciB9IGZyb20gJy4uL3RpbWVyL3RpbWVyLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBFdmVudEZ1bmMgfSBmcm9tICcuLi9ldmVudC9ldmVudC1kYXRhJztcclxuXHJcbmV4cG9ydCBtb2R1bGUgQ3VzdG9tU2NlbmV7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAYXV0aG9yIFN1blxyXG4gICAgICogQHRpbWUgMjAxOS0wOC0wOSAxOToxMlxyXG4gICAgICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gIFNjZW5l55qE5Z+657G7XHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgTHlTY2VuZSBleHRlbmRzIExheWEuU2NlbmUge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlhoXltYzmqKHlvI/nqbrnmoTlnLrmma/otYTmupDvvIzlv4Xpobvlrp7njrDov5nkuKpjcmVhdGVWaWV377yM5ZCm5YiZ5pyJ6Zeu6aKYXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiU2NlbmVcIixcInByb3BzXCI6e1wid2lkdGhcIjoxMzM0LFwiaGVpZ2h0XCI6NzUwfSxcImxvYWRMaXN0XCI6W10sXCJsb2FkTGlzdDNEXCI6W119O1xyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Zy65pmv56ys5LiA5Liq5Yqg6L2955qE56qX5Y+jXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGZpcnN0VmlldzogYW55ID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlnLrmma/kvp3otZbnmoTotYTmupDnu4RcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgbmVlZExvYWRSZXM6IFJlc0dyb3VwO1xyXG5cclxuICAgICAgICBwcml2YXRlIG1fcGFyYW06IGFueTtcclxuICAgICAgICBwcml2YXRlIG1fbG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzY2VuZVRpbWVyczogQXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5uZWVkTG9hZFJlcyA9IG5ldyBSZXNHcm91cCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEx5U2NlbmUudWlWaWV3KTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDov5vlhaXlnLrmma9cclxuICAgICAgICAgKiBAcGFyYW0gcGFyYW0g5Y+C5pWwIFxyXG4gICAgICAgICAqIEBwYXJhbSBwcm9ncmVzc0Z1YyDov5vluqblm57osIMgXHJcbiAgICAgICAgICogQHBhcmFtIGNvbXBsZXRlRnVjIOWujOaIkOWbnuiwg1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBlbnRlcihwYXJhbTogYW55LHByb2dyZXNzRnVjOkV2ZW50RnVuYyxjb21wbGV0ZUZ1YzpFdmVudEZ1bmMpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubV9sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tX3BhcmFtID0gcGFyYW07XHJcbiAgICAgICAgICAgIHRoaXMub25Jbml0KHBhcmFtKTtcclxuXHJcbiAgICAgICAgICAgIFJlc01hbmFnZXIuJC5sb2FkR3JvdXAodGhpcy5uZWVkTG9hZFJlcyxwcm9ncmVzc0Z1Yyxjb21wbGV0ZUZ1Yyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGxlYXZlKCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTGVhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNsZWFuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVUaW1lcnMuZm9yRWFjaCgodGltZXI6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgVGltZXJNYW5hZ2VyLiQucmVtb3ZlVGltZXIodGltZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBzdXBlci5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yqg6L295a6M5oiQXHJcbiAgICAgICAgICogQHBhcmFtIGVycm9yIOWKoOi9vemUmeivr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBsb2FkZWQoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBMb2cuZXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZGVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2hFbnRlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgY2hlY2hFbnRlcigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9sb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpcnN0VmlldyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNscyA9IHRoaXMuZmlyc3RWaWV3O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3aW4gPSBuZXcgY2xzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh3aW4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudGVyKHRoaXMubV9wYXJhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDliqDovb3lrozmiJBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgb25Mb2FkZWQoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Zy65pmv5Yid5aeL5YyWXHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtIOWPguaVsFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBvbkluaXQocGFyYW06IGFueSkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOi/m+WFpeWcuuaZr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBvbkVudGVyKHBhcmFtOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6YCQ5bin5b6q546vXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnprvlvIDlnLrmma9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgb25MZWF2ZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlvZPlnLrmma/ooqvplIDmr4HnmoTml7blgJlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgb25DbGVhbigpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IERhdGFNYW5hZ2VyIH0gZnJvbSAnLi4vZGF0YS9kYXRhLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gJy4uL2RhdGEvZGF0YS1iYXNlJztcclxuXHJcbmV4cG9ydCBtb2R1bGUgQ3VzdG9tVmlld3tcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBhdXRob3IgU3VuXHJcbiAgICAgKiBAdGltZSAyMDE5LTA4LTA5IDE1OjUxXHJcbiAgICAgKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICAgICAqIEBkZXNjcmlwdGlvbiAgVUnnu4Tku7bnmoTln7rnsbvvvIznu6fmib/oh6pMYXlhLlZpZXdcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBWaWV3QmFzZSBleHRlbmRzIExheWEuVmlldyB7XHJcblxyXG4gICAgICAgIC8q5omA5pyJ5pWw5o2u6KeC5a+f6ICFKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZGF0YVdhdGNoczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgICAgICBwdWJsaWMgZGF0YTogYW55ID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy9vdmVycmlkZVxyXG4gICAgICAgIGNyZWF0ZVZpZXcodmlldzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZVZpZXcodmlldyk7XHJcbiAgICAgICAgICAgIHRoaXMuZnVsbFNjcmVlbigpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnNlRWxlbWVudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kYXRhV2F0Y2hzLmZvckVhY2goKGNtZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBEYXRhTWFuYWdlci4kLnJlbW92ZUV2ZW50TGlzdGVuZXIoY21kLCB0aGlzLm9uRGF0YSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6IOM5pmv5Zu+6YCC5bqUXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHBhcnNlRWxlbWVudCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXNbXCJpbWdCZ1wiXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1nQmcgPSB0aGlzW1wiaW1nQmdcIl0gYXMgTGF5YS5TcHJpdGVcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbFNjcmVlbihpbWdCZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWcqOWcuuaZr+S4reWxheS4ree7hOS7tlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjZW50ZXIodmlldz86IExheWEuU3ByaXRlKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3ID09IG51bGwpIHZpZXcgPSB0aGlzO1xyXG4gICAgICAgICAgICB2aWV3LnggPSBNYXRoLnJvdW5kKCgoTGF5YS5zdGFnZS53aWR0aCAtIHZpZXcud2lkdGgpID4+IDEpICsgdmlldy5waXZvdFgpO1xyXG4gICAgICAgICAgICB2aWV3LnkgPSBNYXRoLnJvdW5kKCgoTGF5YS5zdGFnZS5oZWlnaHQgLSB2aWV3LmhlaWdodCkgPj4gMSkgKyB2aWV3LnBpdm90WSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7lpKflsI/kuLrlhajlsY9cclxuICAgICAgICAgKiBAcGFyYW0gdmlldyBMYXlhLlNwcml0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBmdWxsU2NyZWVuKHZpZXc/OiBMYXlhLlNwcml0ZSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodmlldyA9PSBudWxsKSB2aWV3ID0gdGhpcztcclxuICAgICAgICAgICAgdmlldy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHZpZXcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnu5HlrprmlbDmja7nm5HlkKxcclxuICAgICAgICAgKiBAcGFyYW0gY21kIOebkeWQrOexu+Wei1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBhZGREYXRhV2F0Y2goY21kOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhV2F0Y2hzLnB1c2goY21kKTtcclxuICAgICAgICAgICAgRGF0YU1hbmFnZXIuJC5hZGRFdmVudExpc3RlbmVyKGNtZCwgdGhpcy5vbkRhdGEsIHRoaXMpO1xyXG4gICAgICAgICAgICBEYXRhTWFuYWdlci4kLmdldChjbWQpLm5vdGlmeSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5b2T5pWw5o2u5Yi35paw5piv6YeN57uYXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG9uRGF0YShkYXRhOiBEYXRhQmFzZSkge1xyXG4gICAgICAgICAgICAvLyBpZiAoZGF0YS5jbWQgPT0gRGF0YURlZmluZS5Db2luSW5mbyl7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOa3u+WKoOWIsOeUu+W4g1xyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNriBcclxuICAgICAgICAgKi9cclxuICAgICAgICBhZGQoZGF0YTogYW55ID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pi+56S6dmlld1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNob3coKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDpmpDol492aWV3XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaGlkZSgpOnZvaWR7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnROb2RlIH0gZnJvbSAnLi4vbWFuYWdlci9ldmVudC9ldmVudC1ub2RlJztcclxuaW1wb3J0IHsgQ29uZmlnTGF5b3V0LCBDb25maWdVSSwgQ29uZmlnRGVidWcsIENvbmZpZ0dhbWUsIENvbmZpZ1ZlcnNpb24sIENvbmZpZ1JlcyB9IGZyb20gJy4uL3NldHRpbmcvY29uZmlnJztcclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vY29yZS9sb2cnO1xyXG5pbXBvcnQgeyBVdGlsVGltZSB9IGZyb20gJy4uL3V0aWwvdGltZSc7XHJcbmltcG9ydCB7IGVudW1EaW1lbnNpb24sIGVudW1BbGlnZSwgZW51bVNjcmVlbk1vZGVsLCBlbnVtU2NhbGVUeXBlIH0gZnJvbSAnLi4vc2V0dGluZy9lbnVtJztcclxuaW1wb3J0IEJyb3dzZXIgPSBMYXlhLkJyb3dzZXI7XHJcbmltcG9ydCB7IFJlc01hbmFnZXIgfSBmcm9tICcuLi9tYW5hZ2VyL3Jlcy9yZXMtbWFuYWdlcic7XHJcbmltcG9ydCB7IEV2ZW50RnVuYyB9IGZyb20gJy4uL21hbmFnZXIvZXZlbnQvZXZlbnQtZGF0YSc7XHJcbmltcG9ydCB7IExvYWRpbmdWaWV3IH0gZnJvbSAnLi4vLi4vY2xpZW50L3ZpZXcvbGF5ZXItdmlldy9sb2FkaW5nLXZpZXcnO1xyXG5pbXBvcnQgeyBEYXRhTWFuYWdlciB9IGZyb20gJy4uL21hbmFnZXIvZGF0YS9kYXRhLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIgfSBmcm9tICcuLi9tYW5hZ2VyL2V2ZW50L2V2ZW50LW1hbmFnZXInO1xyXG5pbXBvcnQgeyBKc29uTWFuYWdlciB9IGZyb20gJy4uL21hbmFnZXIvanNvbi9qc29uLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tICcuLi9tYW5hZ2VyL3NvdW5kL3NvdW5kLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBUaW1lck1hbmFnZXIgfSBmcm9tICcuLi9tYW5hZ2VyL3RpbWVyL3RpbWVyLW1hbmFnZXInO1xyXG5pbXBvcnQge0dhbWVTZXR0aW5nfSBmcm9tIFwiLi4vLi4vY2xpZW50L3NldHRpbmcvZ2FtZVNldHRpbmdcIjtcclxuLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDgtMTEgMTg6MDhcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiDmoYbmnrbliJ3lp4vljJblkozmuLjmiI/lhaXlj6NcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFbmdpbmV7XHJcblxyXG5cclxuICAgIHB1YmxpYyBsYXlvdXQ6IENvbmZpZ0xheW91dCA9IENvbmZpZ0xheW91dC4kO1xyXG4gICAgcHVibGljIGdhbWU6IENvbmZpZ0dhbWUgPSBDb25maWdHYW1lLiQ7XHJcbiAgICBwdWJsaWMgdWk6IENvbmZpZ1VJID0gQ29uZmlnVUkuJDtcclxuICAgIHB1YmxpYyBkZWJ1ZzogQ29uZmlnRGVidWcgPSBDb25maWdEZWJ1Zy4kO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogRW5naW5lID0gbnVsbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTogRW5naW5lIHtcclxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZT09bnVsbCkgdGhpcy5pbnN0YW5jZSA9IG5ldyBFbmdpbmUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8leaTjuWQr+WKqOWFpeWPo1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcnVuKCk6IHZvaWQge1xyXG4gICAgICAgIExvZy5pbmZvKFwiOjo6IEdhbWUgRW5naW5lIFJ1biA6OjpcIik7XHJcbiAgICAgICAgR2FtZVNldHRpbmcuJC5pbml0KCk7XHJcbiAgICAgICAgaWYgKENvbmZpZ1VJLiQuZGVmYXVsdExvYWRWaWV3ICE9IG51bGwgJiYgQ29uZmlnUmVzLiQuZGVmYXVsdExvYWRSZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZ2luZVNldHVwKCgpPT57XHJcbiAgICAgICAgICAgICAgICAvL+a4uOaIj+W8gOWni1xyXG4gICAgICAgICAgICAgICAgVXRpbFRpbWUuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyW5ri45oiP566h55CG5ZmoXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXJTZXRVcCgpO1xyXG4gICAgICAgICAgICAgICAgLy/liJ3lp4vljJbmuLjmiI/kuLvlvqrnjq9cclxuICAgICAgICAgICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMubWFuYWdlclVwZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAvL+WKoOi9vUxvYWRpbmfpobXnmoTpu5jorqTotYTmupDlubbmmL7npLpMb2FkaW5n6aG1XHJcbiAgICAgICAgICAgICAgICBSZXNNYW5hZ2VyLiQubG9hZEdyb3VwKENvbmZpZ1Jlcy4kLmRlZmF1bHRMb2FkUmVzLG51bGwsbmV3IEV2ZW50RnVuYyh0aGlzLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcnB0ID0gQ29uZmlnVUkuJC5kZWZhdWx0TG9hZFZpZXc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcnB0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbG9hZGluZ1ZpZXcgPSBuZXcgc2NycHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChsb2FkaW5nVmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdWaWV3Lm9uU3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjpMb2FkaW5n6LWE5rqQ5Li656m65Yqg6L295aSx6LSl77yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byV5pOO55qE5Yid5aeL5YyW6K6+572uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZW5naW5lU2V0dXAoc3RhcnRDYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICAvKirliJ3lp4vljJZMYXlhICovXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kaW1lbnNpb24gPT0gZW51bURpbWVuc2lvbi5EaW0zKSB7XHJcbiAgICAgICAgICAgIExheWEzRC5pbml0KENvbmZpZ0xheW91dC4kLmRlc2lnbldpZHRoLCBDb25maWdMYXlvdXQuJC5kZXNpZ25IZWlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIExheWEuaW5pdChDb25maWdMYXlvdXQuJC5kZXNpZ25XaWR0aCwgQ29uZmlnTGF5b3V0LiQuZGVzaWduSGVpZ2h0LCBMYXlhLldlYkdMKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoq6IOM5pmv6aKc6ImyICovXHJcbiAgICAgICAgTGF5YS5zdGFnZS5iZ0NvbG9yID0gXCJub25lXCI7XHJcbiAgICAgICAgLyoq57yp5pS+5qih5byPICovXHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBlbnVtU2NhbGVUeXBlLlNjYWxlU2hvd0FsbC50b1N0cmluZygpO1xyXG4gICAgICAgIC8qKuiuvue9ruWxj+W5leWkp+WwjyAqL1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2V0U2NyZWVuU2l6ZShCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCk7XHJcbiAgICAgICAgLyoq6K6+572u5qiq56uW5bGPICovXHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gZW51bVNjcmVlbk1vZGVsLlNjcmVlbk5vbmU7XHJcbiAgICAgICAgLyoq5rC05bmz5a+56b2Q5pa55byPICovXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnbkggPSBlbnVtQWxpZ2UuQWxpZ2VDZW50ZXI7XHJcbiAgICAgICAgLyoq5Z6C55u05a+56b2Q5pa55byPICovXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBlbnVtQWxpZ2UuQWxpZ2VNaWRkbGU7XHJcbiAgICAgICAgLyoq5byA5ZCv54mp55CG5byV5pOOICovXHJcbiAgICAgICAgaWYoQ29uZmlnR2FtZS4kLnBoeXNpY3MpIExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG5cdFx0Lyoq5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iSAqL1xyXG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzRW5hYmxlRGVidWdQYW5lbCB8fCBMYXlhLlV0aWxzLmdldFF1ZXJ5U3RyaW5nKFwiZGVidWdcIikgPT0gXCJ0cnVlXCIpIExheWEuZW5hYmxlRGVidWdQYW5lbCgpO1xyXG4gICAgICAgIC8qKueJqeeQhui+heWKqee6vyAqL1xyXG4gICAgICAgIGlmIChDb25maWdEZWJ1Zy4kLmlzUGh5c2ljc0RlYnVnICYmIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdKSBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXS5lbmFibGUoKTtcclxuICAgICAgICAvKirmgKfog73lkIznuqfpnaLmnb8gKi9cclxuICAgICAgICBpZiAoQ29uZmlnRGVidWcuJC5pc1N0YXQpIExheWEuU3RhdC5zaG93KENvbmZpZ0RlYnVnLiQucGFuZWxYLENvbmZpZ0RlYnVnLiQucGFuZWxZKTtcclxuICAgICAgICAvKirlvq7kv6HlvIDmlL7ln5/lrZDln5/orr7nva4qL1xyXG4gICAgICAgIGlmIChCcm93c2VyLm9uV2VpWGluIHx8IEJyb3dzZXIub25NaW5pR2FtZSkge1xyXG4gICAgICAgICAgICBMYXlhLk1pbmlBZHB0ZXIuaW5pdCgpO1xyXG4gICAgICAgICAgICBMYXlhLmlzV1hPcGVuRGF0YUNvbnRleHQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoq5qih5byP56qX5Y+j54K55Ye76L6557yYICovXHJcbiAgICAgICAgVUlDb25maWcuY2xvc2VEaWFsb2dPblNpZGUgPSB0cnVlO1xyXG4gICAgICAgIC8qKuaYr+WQpuaYvuekuua7muWKqOadoeaMiemSriAqL1xyXG4gICAgICAgIFVJQ29uZmlnLnNob3dCdXR0b25zID0gdHJ1ZTtcclxuICAgICAgICAvKirmjInpkq7nmoTngrnlh7vmlYjmnpwgKi9cclxuICAgICAgICBVSUNvbmZpZy5zaW5nbGVCdXR0b25TdHlsZSA9IFwic2NhbGVcIjsgLy9cImNvbG9yXCIsXCJzY2FsZVwiXHJcbiAgICAgICAgLyoq5by55Ye65qGG6IOM5pmv6YCP5piO5bqmICovXHJcbiAgICAgICAgVUlDb25maWcucG9wdXBCZ0FscGhhID0gMC43NTtcclxuICAgICAgICAvKirlhbzlrrlTY2VuZeWQjue8gOWcuuaZryAqL1xyXG4gICAgICAgIExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gdHJ1ZTtcclxuICAgICAgICAvKirmmK/lkKblvIDlkK/niYjmnKznrqHnkIYgKi9cclxuICAgICAgICBpZihDb25maWdWZXJzaW9uLiQuaXNPcGVuVmVyc2lvbil7XHJcbiAgICAgICAgICAgIExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShDb25maWdWZXJzaW9uLiQudmVyc2lvbkZsb2RlcixcclxuICAgICAgICAgICAgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBzdGFydENhbGxiYWNrKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHN0YXJ0Q2FsbGJhY2suY2FsbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeuoeeQhuWZqOeahOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBwcml2YXRlICBtYW5hZ2VyU2V0VXAoKTogdm9pZCB7XHJcbiAgICAgICAgRGF0YU1hbmFnZXIuJC5zZXR1cCgpO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci4kLnNldHVwKCk7XHJcbiAgICAgICAgUmVzTWFuYWdlci4kLnNldHVwKCk7XHJcbiAgICAgICAgSnNvbk1hbmFnZXIuJC5zZXR1cCgpO1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci4kLnNldHVwKCk7XHJcbiAgICAgICAgVGltZXJNYW5hZ2VyLiQuc2V0dXAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeuoeeQhuWZqOeahFVwZGF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1hbmFnZXJVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgQnJvd3NlciA9IGxheWEudXRpbHMuQnJvd3NlcjtcclxuaW1wb3J0IHsgZW51bURpbWVuc2lvbiwgZW51bVNjYWxlVHlwZSwgZW51bUpzb25EZWZpbmUsIGVudW1Tb3VuZE5hbWUgfSBmcm9tICcuL2VudW0nO1xyXG5pbXBvcnQgeyBTaW5nbGV0b24gfSBmcm9tICcuLi9jb3JlL3NpbmdsZXRvbic7XHJcbmltcG9ydCB7IE1haW5TY2VuZSB9IGZyb20gJy4uLy4uL2NsaWVudC9zY2VuZS9tYWluLXNjZW5lJztcclxuaW1wb3J0IHsgUmVzR3JvdXAgfSBmcm9tICcuLi9tYW5hZ2VyL3Jlcy9yZXMtZ3JvdXAnO1xyXG5pbXBvcnQgeyBMb2FkaW5nVmlldyB9IGZyb20gJy4uLy4uL2NsaWVudC92aWV3L2xheWVyLXZpZXcvbG9hZGluZy12aWV3JztcclxuaW1wb3J0IHsgSnNvblRlbXBsYXRlIH0gZnJvbSAnLi4vbWFuYWdlci9qc29uL2pzb24tdGVtcGxhdGUnO1xyXG5pbXBvcnQgeyBTb3VuZFRlbXBsYXRlIH0gZnJvbSAnLi4vbWFuYWdlci9zb3VuZC9zb3VuZC10ZW1wbGF0ZSc7XHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0wOSAxNDowMVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOa4uOaIj+mFjee9ruS/oeaBr1xyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICog55WM6Z2i6YWN572uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlnVUkgZXh0ZW5kcyBTaW5nbGV0b24ge1xyXG5cclxuICAgIC8qKum7mOiupOWtl+S9kyAqL1xyXG4gICAgcHVibGljIGRlZmF1bHRGb250TmFtZTogc3RyaW5nID0gJ+m7keS9kyc7XHJcbiAgICAvKirpu5jorqTlrZfkvZPlpKflsI8gKi9cclxuICAgIHB1YmxpYyBkZWZhdWx0Rm9udFNpemU6IG51bWJlciA9IDE2O1xyXG4gICAgLyoq6buY6K6k5Yqg6L295Zy65pmvICovXHJcbiAgICBwdWJsaWMgZGVmYXVsdE1haW5TY2VuZTogYW55ID0gTWFpblNjZW5lO1xyXG4gICAgLyoq6buY6K6k5Yqg6L2955qETG9hZGluZ+mhtemdoiAqL1xyXG4gICAgcHVibGljIGRlZmF1bHRMb2FkVmlldzogYW55ID0gTG9hZGluZ1ZpZXc7XHJcbiAgIFxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWdVSSA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6Q29uZmlnVUkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdVSSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICBcclxufVxyXG5cclxuLyoqXHJcbiAqIOi1hOa6kOmFjee9rlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpZ1JlcyBleHRlbmRzIFNpbmdsZXRvbntcclxuXHJcbiAgICAvKirpu5jorqRMb2FkaW5n6aG16Z2i55qE6LWE5rqQ5L+h5oGvICovXHJcbiAgICBwdWJsaWMgZGVmYXVsdExvYWRSZXM6IFJlc0dyb3VwID0gbmV3IFJlc0dyb3VwKCk7XHJcbiAgICAvKirpu5jorqTnmoTln7rnoYDpobXpnaLotYTmupDkv6Hmga8gKi9cclxuICAgIHB1YmxpYyBkZWZhdWx0TWFpblJlczpSZXNHcm91cCA9IG5ldyBSZXNHcm91cCgpO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWdSZXMgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ1JlcyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ1JlcygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL+WKoOi9vUpzb27phY3nva7mlofku7ZcclxuICAgICAgICBDb25maWdEYXRhLiQuanNvblRlbXBsYXRlTGlzdC5mb3JFYWNoKGl0ZW09PntcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0TWFpblJlc1xyXG4gICAgICAgICAgICAuYWRkKGl0ZW0udXJsLCBMYXlhLkxvYWRlci5KU09OKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+WKoOi9vemfs+aViOi1hOa6kFxyXG4gICAgICAgIENvbmZpZ1NvdW5kLiQuc291bmRSZXNMaXN0LmZvckVhY2goaXRlbT0+e1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRNYWluUmVzXHJcbiAgICAgICAgICAgIC5hZGQoaXRlbS51cmwsIExheWEuTG9hZGVyLlNPVU5EKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOWjsOmfs+mFjee9rlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpZ1NvdW5kIGV4dGVuZHMgU2luZ2xldG9uIHtcclxuXHJcbiAgICAvKirog4zmma/pn7PkuZDlkI3lrZcgKi9cclxuICAgIHB1YmxpYyBiZ1NvdW5kTmFtZSA9IFwiXCI7XHJcbiAgICAvKirog4zmma/pn7PlvIDlhbMgKi9cclxuICAgIHB1YmxpYyBpc0Nsb3NlQkdTb3VuZCA9IGZhbHNlO1xyXG4gICAgLyoq5pWI5p6c6Z+z5byA5YWzICovXHJcbiAgICBwdWJsaWMgaXNDbG9zZUVmZmVjdFNvdW5kID0gZmFsc2U7XHJcbiAgICAvKirmiYDmnInpn7PmlYjlvIDlhbMgKi9cclxuICAgIHB1YmxpYyBpc0Nsb3NlVm9pY2VTb3VuZCA9IGZhbHNlO1xyXG4gICAgLyoq5oC76Z+z6YePICovXHJcbiAgICBwdWJsaWMgdm9sdW1lVm9pY2VTb3VuZCA9IDE7XHJcbiAgICAvKirpn7PmlYjotYTmupAgKi9cclxuICAgIHB1YmxpYyBzb3VuZFJlc0xpc3Q6QXJyYXk8U291bmRUZW1wbGF0ZT4gPSBudWxsO1xyXG4gIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZpZ1NvdW5kID0gbnVsbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpDb25maWdTb3VuZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ1NvdW5kKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zb3VuZFJlc0xpc3QgPSBuZXcgQXJyYXk8U291bmRUZW1wbGF0ZT4oKTtcclxuICAgICAgICAvLyB0aGlzLnNvdW5kUmVzTGlzdC5wdXNoKG5ldyBTb3VuZFRlbXBsYXRlKFwicmVzL3NvdW5kL2JnLm1wM1wiLGVudW1Tb3VuZE5hbWUuYmcpKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOaVsOaNruihqOmFjee9rlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpZ0RhdGEgZXh0ZW5kcyBTaW5nbGV0b257XHJcblxyXG4gICAgLyoqanNvbumFjee9ruihqOS/oeaBryAqL1xyXG4gICAgcHVibGljIGpzb25UZW1wbGF0ZUxpc3Q6QXJyYXk8SnNvblRlbXBsYXRlPiA9IG5ldyBBcnJheTxKc29uVGVtcGxhdGU+KCk7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWdEYXRhID0gbnVsbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpDb25maWdEYXRhIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ29uZmlnRGF0YSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5ri45oiP6YWN572uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlnR2FtZSBleHRlbmRzIFNpbmdsZXRvbiB7XHJcbiBcclxuICAgIC8qKum7mOiupOaooeW8j+S/oeaBryAyRC8zRCAqL1xyXG4gICAgcHVibGljIGRpbWVuc2lvbjogZW51bURpbWVuc2lvbiA9IGVudW1EaW1lbnNpb24uRGltMjtcclxuICAgIC8qKueJqeeQhuW8gOWFsyAqL1xyXG4gICAgcHVibGljIHBoeXNpY3M6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gIFxyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnR2FtZSA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6Q29uZmlnR2FtZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ0dhbWUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOeJiOacrOmFjee9rlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpZ1ZlcnNpb24gZXh0ZW5kcyBTaW5nbGV0b24ge1xyXG4gXHJcbiAgICAvKirniYjmnKzmjqfliLblvIDlhbMgKi9cclxuICAgIHB1YmxpYyBpc09wZW5WZXJzaW9uOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKueJiOacrOWPtyAqL1xyXG4gICAgcHVibGljIHZlcnNpb25OdW06bnVtYmVyID0gMDtcclxuICAgIC8qKueJiOacrOaOp+WItuaWh+S7tuWQjSAqL1xyXG4gICAgcHVibGljIHZlcnNpb25GbG9kZXI6c3RyaW5nID0gXCJWZXJzaW9uXCIrdGhpcy52ZXJzaW9uTnVtO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZmlnVmVyc2lvbiA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6Q29uZmlnVmVyc2lvbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ1ZlcnNpb24oKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDluIPlsYDphY3nva5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maWdMYXlvdXQgZXh0ZW5kcyBTaW5nbGV0b24ge1xyXG5cclxuICAgIC8qKuiuvuiuoeWIhui+qOeOh1ggKi9cclxuICAgIHB1YmxpYyBkZXNpZ25XaWR0aDogbnVtYmVyID0gNzUwO1xyXG4gICAgLyoq6K6+6K6h5YiG6L6o546HWSAqL1xyXG4gICAgcHVibGljIGRlc2lnbkhlaWdodDogbnVtYmVyID0gMTMzNDtcclxuICAgIC8qKue8qeaUvuaooeW8jyAqL1xyXG4gICAgcHVibGljIHNjYWxlTW9kZTogZW51bVNjYWxlVHlwZSA9IGVudW1TY2FsZVR5cGUuU2NhbGVGaXhlZEF1dG87XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZpZ0xheW91dCA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6Q29uZmlnTGF5b3V0IHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ29uZmlnTGF5b3V0KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIERlYnVn6YWN572uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlnRGVidWcgZXh0ZW5kcyBTaW5nbGV0b24ge1xyXG5cclxuICAgIC8qKuiwg+ivleS/oeaBr+W8gOWFsyAqL1xyXG4gICAgcHVibGljIGlzRGVidWc6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLyoq54mp55CG6L6F5Yqp57q/5byA5YWzICovXHJcbiAgICBwdWJsaWMgaXNQaHlzaWNzRGVidWc6IGJvb2xlYW4gPSBmYWxzZTsgXHJcbiAgICAvKirosIPor5XpnaLmnb8gKi9cclxuICAgIHB1YmxpYyBpc0VuYWJsZURlYnVnUGFuZWw6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq5oCn6IO96Z2i5p2/5byA5YWzICovXHJcbiAgICBwdWJsaWMgaXNTdGF0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8qKuaAp+iDvee7n+iuoemdouadv1ggKi9cclxuICAgIHB1YmxpYyBwYW5lbFg6bnVtYmVyID0gMDtcclxuICAgIC8qKuaAp+iDvee7n+iuoemdouadv1kgKi9cclxuICAgIHB1YmxpYyBwYW5lbFk6bnVtYmVyID0gMTAwO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb25maWdEZWJ1ZyA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCAkKCk6Q29uZmlnRGVidWcge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25maWdEZWJ1ZygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogM0TphY3nva5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maWczRCBleHRlbmRzIFNpbmdsZXRvbntcclxuXHJcbiAgICAvKirlnLrmma/otYTmupDot6/lvoQgKi9cclxuICAgIHB1YmxpYyBzY2VuZVBhdGg6c3RyaW5nID0gXCJyZXMvdTNkL0xheWFTY2VuZV9NYWluL0NvbnZlbnRpb25hbC9NYWluLmxzXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZpZzNEID0gbnVsbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0ICQoKTpDb25maWczRCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZzNEKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuLy8gLyoqXHJcbi8vICAqIE5ldHdvcmvphY3nva5cclxuLy8gICovXHJcbi8vIGV4cG9ydCBjbGFzcyBDb25maWdOZXQgZXh0ZW5kcyBTaW5nbGV0b24ge1xyXG5cclxuLy8gICAgIHB1YmxpYyBodHRwVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly8xMjcuMC4wLjE6MzQ1NjhcIjtcclxuLy8gICAgIHB1YmxpYyB3c1VybDogc3RyaW5nID0gXCJ3c3M6Ly93eC5kb25vcG8uY29tL3dzL3dzXCI7XHJcbi8vICAgICBwdWJsaWMgcmVzVXJsOiBzdHJpbmcgPSBcIndzOi8vMTI3LjAuMC4xOjE2NjY5XCI7XHJcbi8vICAgICBwdWJsaWMgdGltZU91dDogbnVtYmVyID0gMTA7XHJcbi8vICAgICBwdWJsaWMgaGVhcnRCZWF0OiBudW1iZXIgPSAxMDtcclxuLy8gICAgIHB1YmxpYyBzZXJ2ZXJIZWFydEJlYXQ6IG51bWJlciA9IDM7XHJcblxyXG4vLyAgICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbmZpZ05ldCA9IG51bGw7XHJcblxyXG4vLyAgICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZpZ05ldCB7XHJcbi8vICAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZ05ldCgpO1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gfVxyXG5cclxuLy8gLyoqXHJcbi8vICAqIOW+ruS/oemFjee9rlxyXG4vLyAgKi9cclxuLy8gZXhwb3J0IGNsYXNzIENvbmZXZWNoYXQgZXh0ZW5kcyBTaW5nbGV0b24ge1xyXG5cclxuLy8gICAgIHB1YmxpYyBhcHBpZDogc3RyaW5nID0gXCJcIjtcclxuLy8gICAgIHB1YmxpYyBzZWNyZXQ6IHN0cmluZyA9IFwiXCI7XHJcbi8vICAgICBwdWJsaWMgYWRVbml0SWQ6IHN0cmluZyA9IFwiXCI7XHJcbi8vICAgICBwdWJsaWMgY29kZTJzZXNzaW9uVXJsID0gXCJodHRwczovL2FwaS53ZWl4aW4ucXEuY29tL3Nucy9qc2NvZGUyc2Vzc2lvbj9hcHBpZD17MH0mc2VjcmV0PXsxfSZqc19jb2RlPXsyfSZncmFudF90eXBlPWF1dGhvcml6YXRpb25fY29kZVwiO1xyXG5cclxuXHJcbi8vICAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29uZldlY2hhdCA9IG51bGw7XHJcblxyXG4vLyAgICAgcHVibGljIHN0YXRpYyBnZXQgJCgpOkNvbmZXZWNoYXQge1xyXG4vLyAgICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBDb25mV2VjaGF0KCk7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbi8vICAgICB9XHJcbi8vIH1cclxuIiwiLyoqXHJcbiAqIOmHjeimgeeahOaemuS4vuWumuS5iSzmoYbmnrbnuqfliKtcclxuICpcclxuICogQGF1dGhvciBUaW0gV2Fyc1xyXG4gKiBAZGF0ZSAyMDE5LTAxLTE4IDE2OjIwXHJcbiAqIEBwcm9qZWN0IGZpcmVib2x0XHJcbiAqIEBjb3B5cmlnaHQgKEMpIERPTk9QT1xyXG4gKlxyXG4gKi9cclxuXHJcbmltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2U7XHJcblxyXG4vKipcclxuICog6Iie5Y+w55qE57yp5pS+5qC85byPXHJcbiAqL1xyXG5leHBvcnQgZW51bSBlbnVtU2NhbGVUeXBlIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIFNjYWxlTm9TY2FsZSA9IFN0YWdlLlNDQUxFX0ZVTEwsXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBTY2FsZUV4YWN0Rml0ID0gU3RhZ2UuU0NBTEVfRVhBQ1RGSVQsXHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBTY2FsZVNob3dBbGwgPSBTdGFnZS5TQ0FMRV9TSE9XQUxMLFxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgU2NhbGVOb0JvcmRlciA9IFN0YWdlLlNDQUxFX05PQk9SREVSLFxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgU2NhbGVGdWxsID0gU3RhZ2UuU0NBTEVfRlVMTCxcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIFNjYWxlRml4ZWRXaWR0aCA9IFN0YWdlLlNDQUxFX0ZJWEVEX1dJRFRILFxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgU2NhbGVGaXhlZEhlaWdodCA9IFN0YWdlLlNDQUxFX0ZJWEVEX0hFSUdIVCxcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIFNjYWxlRml4ZWRBdXRvID0gU3RhZ2UuU0NBTEVfRklYRURfQVVUTyxcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIFNjYWxlTm9TY2FsZSA9IFN0YWdlLlNDQUxFX05PU0NBTEVcclxufVxyXG5cclxuLyoqXHJcbiAqIOWxj+W5leeahOiHqumAguW6lOaWueW8j1xyXG4gKi9cclxuZXhwb3J0IGVudW0gZW51bVNjcmVlbk1vZGVsIHtcclxuICAgIFNjcmVlbk5vbmUgPSAnbm9uZScsXHJcbiAgICBTY3JlZW5Ib3Jpem9udGFsID0gJ2hvcml6b250YWwnLFxyXG4gICAgU2NyZWVuVmVydGljYWwgPSAndmVydGljYWwnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmlbDnu4TmjpLluo/mlrnlvI9cclxuICogKi9cclxuZXhwb3J0IGVudW0gZW51bUFycmF5U29ydE9yZGVyIHtcclxuICAgIEFzY2VuZGluZyxcdC8v5Y2H5bqPXHJcbiAgICBEZXNjZW5kaW5nLFx0Ly/pmY3luo9cclxufVxyXG5cclxuLyoqXHJcbiAqIOa4uOaIj+eahOi/kOihjOWuueWZqFxyXG4gKi9cclxuZXhwb3J0IGVudW0gZW51bUdhbWVQbGF0Zm9ybSB7XHJcbiAgICBXZWIsXHJcbiAgICBQaG9uZSxcclxuICAgIFdlaXhpblxyXG59XHJcblxyXG4vKipcclxuICog5a+56b2Q5pa55byPXHJcbiAqL1xyXG5leHBvcnQgZW51bSBlbnVtQWxpZ2VUeXBlIHtcclxuICAgIE5PTkUgPSAwLFxyXG4gICAgUklHSFQsXHJcbiAgICBSSUdIVF9CT1RUT00sXHJcbiAgICBCT1RUT00sXHJcbiAgICBMRUZUX0JPVFRPTSxcclxuICAgIExFRlQsXHJcbiAgICBMRUZUX1RPUCxcclxuICAgIFRPUCxcclxuICAgIFJJR0hUX1RPUCxcclxuICAgIE1JRCxcclxufVxyXG5cclxuLyoqXHJcbiAqIOWvuem9kOagh+azqFxyXG4gKi9cclxuZXhwb3J0IGVudW0gZW51bUFsaWdlIHtcclxuICAgIEFsaWdlTGVmdCA9ICdsZWZ0JyxcclxuICAgIEFsaWdlQ2VudGVyID0gJ2NlbnRlcicsXHJcbiAgICBBbGlnZVJpZ2h0ID0gJ3JpZ2h0JyxcclxuICAgIEFsaWdlVG9wID0gJ3RvcCcsXHJcbiAgICBBbGlnZU1pZGRsZSA9ICdtaWRkbGUnLFxyXG4gICAgQWxpZ2VCb3R0b20gPSAnYm90dG9tJ1xyXG59XHJcblxyXG4vKipcclxuICog5riF55CG6LWE5rqQ55qE5qyh5bqP562W55WlXHJcbiAqL1xyXG5leHBvcnQgZW51bSBlbnVtQ2xlYXJTdHJhdGVneSB7XHJcbiAgICBGSUZPID0gMCwgICAvL+WFiOi/m+WFiOWHulxyXG4gICAgRklMTywgICAgICAgLy/lhYjov5vlkI7lh7pcclxuICAgIExSVSxcdFx0Ly/mnIDov5HmnIDlsJHkvb/nlKhcclxuICAgIFVOX1VTRUQsXHQvL+acquS9v+eUqFxyXG4gICAgQUxMLFx0XHQvL+a4heeQhuaJgOaciVxyXG59XHJcblxyXG4vKipcclxuICog5ri45oiP5piv5ZCm6YeH55So55qEMkTmiJbogIUzRFxyXG4gKi9cclxuZXhwb3J0IGVudW0gZW51bURpbWVuc2lvbiB7XHJcbiAgICBEaW0yID0gJzJkJyxcclxuICAgIERpbTMgPSAnM2QnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmuLjmiI/nmoTnirbmgIFcclxuICovXHJcbmV4cG9ydCBlbnVtIGVudW1HYW1lU3RhdHVzIHtcclxuICAgIFN0YXJ0ID0gJ0dBTUUtU1RBVFVTLVNUQVJUJyxcclxuICAgIFN0b3AgPSAnR0FNRS1TVEFUVVMtU1RPUCcsXHJcbiAgICBSZXN0YXJ0ID0gJ0dBTUUtU1RBVFVTLVJFU1RBUlQnLFxyXG59XHJcblxyXG4vKipcclxuIGxibCAgLS0tPkxhYmVsKOaWh+acrClcclxuIHR4dCAgLS0tPlRleHQo5paH5pysKVxyXG4gcnR4dCAgLS0tPlJpY2hUZXh0KOWvjOaWh+acrClcclxuIGlwdCAgLS0tPklucHV0KOi+k+WFpeahhilcclxuIGltZyAgLS0tPkltYWdlKOWbvueJhylcclxuIHNwdCAgLS0tPlNwcml0ZSjnsr7ngbUpXHJcbiBncmggIC0tLT5HcmFwaCjlm77lvaIpXHJcbiBsaXN0IC0tLT5MaXN0KOWIl+ihqClcclxuIGxvYWQgLS0tPkxvYWQo6KOF6L295ZmoKVxyXG4gZ3VwICAtLS0+R3JvdXAo57uEKVxyXG4gY29tICAtLS0+Q29tcG9uZW50KOe7hOS7tilcclxuIGJ0biAgLS0tPkJ1dHRvbijmjInpkq4pXHJcbiBjb2IgIC0tLT5Db21ib0JvdyjkuIvmi4nmoYYpXHJcbiBwYmFyIC0tLT5Qcm9ncmVzc0Jhcijov5vluqbmnaEpXHJcbiBzbGQgIC0tLT5TbGlkZXIo5ruR5Yqo5p2hKVxyXG4gd2luICAtLS0+V2luZG9377yI56qX5Y+j77yJXHJcbiBhbmkgIC0tLT5Nb3ZpZSjliqjnlLspXHJcbiBlZnQgIC0tLT5UcmFuc2l0aW9uKOWKqOaViClcclxuIGN0bCAgLS0tPkNvbnRyb2xsZXIo5o6n5Yi25ZmoKVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiDmjqfku7bliY3nvIBcclxuICovXHJcbmV4cG9ydCBlbnVtIGVudW1FbGVtZW50UHJlZml4IHtcclxuICAgIExhYmxlID0gJ2xibF8nLFxyXG4gICAgSW5wdXQgPSAnaXB0XycsXHJcbiAgICBUZXh0ID0gJ3R4dF8nLFxyXG4gICAgUmljaFRleHQgPSAncnR4dF8nLFxyXG4gICAgSW1hZ2UgPSAnaW1nXycsXHJcbiAgICBTcHJpdGUgPSAnc3B0XycsXHJcbiAgICBHcmFwaCA9ICdncmhfJyxcclxuICAgIExpc3QgPSAnbGlzdF8nLFxyXG4gICAgTG9hZCA9ICdsb2FkXycsXHJcbiAgICBHcm91cCA9ICdndXBfJyxcclxuICAgIENvbXBvbmVudCA9ICdjb21fJyxcclxuICAgIEJ1dHRvbiA9ICdidG5fJyxcclxuICAgIENvbWJvQm93ID0gJ2NvYl8nLFxyXG4gICAgUHJvZ3Jlc3NCYXIgPSAncGJhcl8nLFxyXG4gICAgU2xpZGVyID0gJ3NsZF8nLFxyXG4gICAgV2luZG93ID0gJ3dpbl8nLFxyXG4gICAgTW92aWUgPSAnYW5pXycsXHJcbiAgICBUcmFuc2l0aW9uID0gJ2VmdF8nLFxyXG4gICAgQ29udHJvbGxlciA9ICdjdGxfJ1xyXG59XHJcblxyXG4vKipcclxuICog5pWw5o2u6KGo6YWN572uXHJcbiAqL1xyXG5leHBvcnQgZW51bSBlbnVtSnNvbkRlZmluZSB7XHJcbiAgICBpbnZpdGUgPSBcImludml0ZVwiLFxyXG4gICAgbGV2ZWwgPSBcImxldmVsXCIsXHJcbiAgICBsb3R0ZXJ5ID0gXCJsb3R0ZXJ5XCIsXHJcbiAgICBvZmZsaW5lID0gXCJvZmZsaW5lXCIsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDpn7PmlYjmoIforrBcclxuICovXHJcbmV4cG9ydCBlbnVtIGVudW1Tb3VuZE5hbWV7XHJcbiAgICBiZyA9IFwiYmdTb3VuZFwiLFxyXG4gICAgYm90dG9uID0gXCJidG5Tb3VuZFwiLFxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgVXRpbERpY3QgfSBmcm9tICcuLi91dGlsL2RpY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDUtMjEgMTk6MjJcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiAg5a2X5YW4XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeTxUPiB7XHJcblxyXG4gICAgcHJpdmF0ZSBtX2RpY3Q6IE9iamVjdCA9IHt9O1xyXG5cclxuICAgIHB1YmxpYyBhZGQoa2V5OiBhbnksIHZhbHVlOiBUKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzS2V5KGtleSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB0aGlzLm1fZGljdFtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1fZGljdFtrZXldO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXNLZXkoa2V5OiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMubV9kaWN0W2tleV0gIT0gbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbHVlKGtleTogYW55KTogVCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc0tleShrZXkpKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX2RpY3Rba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMga2V5cygpOiBBcnJheTxhbnk+IHtcclxuICAgICAgICBsZXQgbGlzdDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLm1fZGljdCkge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbHVlcygpOiBBcnJheTxUPiB7XHJcbiAgICAgICAgbGV0IGxpc3Q6IEFycmF5PFQ+ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMubV9kaWN0KSB7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLm1fZGljdFtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLm1fZGljdCkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5tX2RpY3Rba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZvcmVhY2goY29tcGFyZUZuOiAoa2V5OiBhbnksIHZhbHVlOiBUKT0+dm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLm1fZGljdCkge1xyXG4gICAgICAgICAgICBjb21wYXJlRm4uY2FsbChudWxsLCBrZXksIHRoaXMubV9kaWN0W2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZm9yZWFjaEJyZWFrKGNvbXBhcmVGbjogKGtleTphbnksIHZhbHVlOiBUKSA9PiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMubV9kaWN0KSB7XHJcbiAgICAgICAgICAgIGlmICghY29tcGFyZUZuLmNhbGwobnVsbCwga2V5LCB0aGlzLm1fZGljdFtrZXldKSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBVdGlsRGljdC5zaXplKHRoaXMubV9kaWN0KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBlbnVtQXJyYXlTb3J0T3JkZXIgfSBmcm9tICcuLi9zZXR0aW5nL2VudW0nO1xyXG5cclxuIC8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTA5IDIzOjE1XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g5pWw57uE5bel5YW357G7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXRpbEFycmF5IHtcclxuXHJcbiAgICAvKiog5o+S5YWl5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gYXJyIOmcgOimgeaTjeS9nOeahOaVsOe7hFxyXG4gICAgICogQHBhcmFtIHZhbHVlIOmcgOimgeaPkuWFpeeahOWFg+e0oFxyXG4gICAgICogQHBhcmFtIGluZGV4IOaPkuWFpeS9jee9rlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc2VydChhcnI6IGFueVtdLCB2YWx1ZTogYW55LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gYXJyLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgYXJyLnB1c2godmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFyci5zcGxpY2UoaW5kZXgsIDAsIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKuS7juaVsOe7hOenu+mZpOWFg+e0oCovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZShhcnI6IGFueVtdLCB2OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaTogbnVtYmVyID0gYXJyLmluZGV4T2Yodik7XHJcbiAgICAgICAgaWYgKGkgIT0gLTEpIHtcclxuICAgICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq56e76Zmk5omA5pyJ5YC8562J5LqOdueahOWFg+e0oCovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUFsbChhcnI6IGFueVtdLCB2OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaTogbnVtYmVyID0gYXJyLmluZGV4T2Yodik7XHJcbiAgICAgICAgd2hpbGUgKGkgPj0gMCkge1xyXG4gICAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICBpID0gYXJyLmluZGV4T2Yodik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuWMheWQq+WFg+e0oCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvbnRhaW4oYXJyOiBhbnlbXSwgdjogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGFyci5sZW5ndGggPiAwID8gYXJyLmluZGV4T2YodikgIT0gLTEgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlpI3liLYqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjb3B5KGFycjogYW55W10pOiBhbnlbXSB7XHJcbiAgICAgICAgcmV0dXJuIGFyci5zbGljZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o6S5bqPXHJcbiAgICAgKiBAcGFyYW0gYXJyIOmcgOimgeaOkuW6j+eahOaVsOe7hFxyXG4gICAgICogQHBhcmFtIGtleSDmjpLluo/lrZfmrrVcclxuICAgICAqIEBwYXJhbSBvcmRlciDmjpLluo/mlrnlvI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzb3J0KGFycjogYW55W10sIGtleTogc3RyaW5nLCBvcmRlcjogZW51bUFycmF5U29ydE9yZGVyID0gZW51bUFycmF5U29ydE9yZGVyLkRlc2NlbmRpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYXJyID09IG51bGwpIHJldHVybjtcclxuICAgICAgICBhcnIuc29ydChmdW5jdGlvbiAoaW5mbzEsIGluZm8yKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3JkZXIpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgZW51bUFycmF5U29ydE9yZGVyLkFzY2VuZGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvMVtrZXldIDwgaW5mbzJba2V5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvMVtrZXldID4gaW5mbzJba2V5XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgZW51bUFycmF5U29ydE9yZGVyLkRlc2NlbmRpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mbzFba2V5XSA+IGluZm8yW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mbzFba2V5XSA8IGluZm8yW2tleV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmuIXnqbrmlbDnu4QqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGVhcihhcnI6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gYXJyLmxlbmd0aDtcclxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgIGFycltpXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyci5zcGxpY2UoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pWw5o2u5piv5ZCm5Li656m6Ki9cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNFbXB0eShhcnI6IGFueVtdKTogQm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGFyciA9PSBudWxsIHx8IGFyci5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn1cclxuIiwiXHJcbiAvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMCAyMDoyMlxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uICDlrZflhbjlt6XlhbfnsbtcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBVdGlsRGljdCB7XHJcbiAgICAvKipcclxuICAgICAqIOmUruWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGtleXMoZDogT2JqZWN0KTogYW55W10ge1xyXG4gICAgICAgIGxldCBhOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBkKSB7XHJcbiAgICAgICAgICAgIGEucHVzaChrZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgLzliJfooahcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB2YWx1ZXMoZDogT2JqZWN0KTogYW55W10ge1xyXG4gICAgICAgIGxldCBhOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZCkge1xyXG4gICAgICAgICAgICBhLnB1c2goZFtrZXldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIOa4heepuuWtl+WFuFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyKGRpYzogT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHY6IGFueTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGljKSB7XHJcbiAgICAgICAgICAgIHYgPSBkaWNba2V5XTtcclxuICAgICAgICAgICAgaWYgKHYgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIFV0aWxEaWN0LmNsZWFyKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlbGV0ZSBkaWNba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhajpg6jlupTnlKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmb3JlYWNoKGRpYzogT2JqZWN0LCBjb21wYXJlRm46IChrZXk6IGFueSwgdmFsdWU6IGFueSkgPT4gYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBkaWMpIHtcclxuICAgICAgICAgICAgaWYgKCFjb21wYXJlRm4uY2FsbChudWxsLCBrZXksIGRpY1trZXldKSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzRW1wdHkoZGljOiBPYmplY3QpOiBCb29sZWFuIHtcclxuICAgICAgICBpZiAoZGljID09IG51bGwpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGljKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzaXplKGRpYzogT2JqZWN0KTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoZGljID09IG51bGwpIHJldHVybiAwO1xyXG5cclxuICAgICAgICBsZXQgY291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBkaWMpIHtcclxuICAgICAgICAgICAgKytjb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBOb2RlID0gTGF5YS5Ob2RlO1xyXG5pbXBvcnQgU3ByaXRlID0gTGF5YS5TcHJpdGU7XHJcbmltcG9ydCBSZWN0YW5nbGUgPSBMYXlhLlJlY3RhbmdsZTtcclxuaW1wb3J0IExhYmVsID0gTGF5YS5MYWJlbDtcclxuXHJcbmV4cG9ydCBjbGFzcyBVdGlsRGlzcGxheSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTlhajpg6jlrZDlr7nosaFcclxuICAgICAqIEBwYXJhbSBjb250YWluZXIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlQWxsQ2hpbGQoY29udGFpbmVyOiBMYXlhLlNwcml0ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGNvbnRhaW5lci5udW1DaGlsZHJlbiA8PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIHdoaWxlIChjb250YWluZXIubnVtQ2hpbGRyZW4gPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZEF0KDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gbm9kZSDplIDmr4FVSeiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlc3Ryb3lVSU5vZGUobm9kZTogTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgbm9kZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H5ZCN5a2X6I635b6X5a2Q6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gcGFyZW50IFxyXG4gICAgICogQHBhcmFtIG5hbWUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hpbGRCeU5hbWUocGFyZW50OiBOb2RlLCBuYW1lOiBzdHJpbmcpOiBOb2RlIHtcclxuICAgICAgICBpZiAoIXBhcmVudCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lID09PSBuYW1lKSByZXR1cm4gcGFyZW50O1xyXG4gICAgICAgIGxldCBjaGlsZDogTm9kZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gcGFyZW50Lm51bUNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyArK2kpIHtcclxuICAgICAgICAgICAgY2hpbGQgPSBVdGlsRGlzcGxheS5nZXRDaGlsZEJ5TmFtZShwYXJlbnQuZ2V0Q2hpbGRBdChpKSwgbmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCkgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvKipcclxuICAgIC8vICAqIOiuvue9ruWvuem9kOaWueW8j1xyXG4gICAgLy8gICogQHBhcmFtIGFsaWdlIOWvuem9kOaWueW8j1xyXG4gICAgLy8gICovXHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIHNldEFsaWdlKG5vZGU6IFNwcml0ZSwgYWxpZ2U6IGVudW1BbGlnZVR5cGUsIHc6IG51bWJlciA9IDAsIGg6IG51bWJlciA9IDApIHtcclxuICAgIC8vICAgICBpZiAoIW5vZGUpIHJldHVybjtcclxuICAgIC8vICAgICBsZXQgcmVjdDogUmVjdGFuZ2xlO1xyXG4gICAgLy8gICAgIGlmICh3IDw9IDAgfHwgaCA8PSAwKSByZWN0ID0gbm9kZS5nZXRCb3VuZHMoKTtcclxuICAgIC8vICAgICBsZXQgd2lkdGg6IG51bWJlciA9IHcgPiAwID8gdyA6IHJlY3Qud2lkdGg7XHJcbiAgICAvLyAgICAgbGV0IGhlaWd0aDogbnVtYmVyID0gaCA+IDAgPyBoIDogcmVjdC5oZWlnaHQ7XHJcbiAgICAvLyAgICAgc3dpdGNoIChhbGlnZSkge1xyXG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuTEVGVF9UT1A6XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnBpdm90KDAsIDApO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgZW51bUFsaWdlVHlwZS5MRUZUOlxyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5waXZvdCgwLCBoZWlndGggKiAwLjUpO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgZW51bUFsaWdlVHlwZS5MRUZUX0JPVFRPTTpcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3QoMCwgaGVpZ3RoKTtcclxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIGVudW1BbGlnZVR5cGUuVE9QOlxyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5waXZvdCh3aWR0aCAqIDAuNSwgMCk7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSBlbnVtQWxpZ2VUeXBlLk1JRDpcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGggKiAwLjUsIGhlaWd0aCAqIDAuNSk7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSBlbnVtQWxpZ2VUeXBlLkJPVFRPTTpcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGggKiAwLjUsIGhlaWd0aCk7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSBlbnVtQWxpZ2VUeXBlLlJJR0hUX1RPUDpcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGgsIDApO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgZW51bUFsaWdlVHlwZS5SSUdIVDpcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGgsIGhlaWd0aCAqIDAuNSk7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSBlbnVtQWxpZ2VUeXBlLlJJR0hUX0JPVFRPTTpcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGl2b3Qod2lkdGgsIGhlaWd0aCk7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rpgI/mmI7pga7nvalcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVNYXNrTGF5ZXIoKTogU3ByaXRlIHtcclxuICAgICAgICBsZXQgbGF5ZXIgPSBuZXcgU3ByaXRlKCk7XHJcbiAgICAgICAgbGF5ZXIubW91c2VFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgbGV0IHdpZHRoID0gbGF5ZXIud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoICsgMjAwO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBsYXllci5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodCArIDQwMDtcclxuICAgICAgICBsYXllci5ncmFwaGljcy5jbGVhcih0cnVlKTtcclxuICAgICAgICBsYXllci5ncmFwaGljcy5kcmF3UmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0LCBVSUNvbmZpZy5wb3B1cEJnQ29sb3IpO1xyXG4gICAgICAgIGxheWVyLmFscGhhID0gVUlDb25maWcucG9wdXBCZ0FscGhhO1xyXG5cclxuICAgICAgICByZXR1cm4gbGF5ZXI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBMb2cgfSBmcm9tICcuLi9jb3JlL2xvZyc7XHJcbmltcG9ydCB7IEV2ZW50RnVuYyB9IGZyb20gJy4uL21hbmFnZXIvZXZlbnQvZXZlbnQtZGF0YSc7XHJcblxyXG4gLyoqXHJcbiAqIEBhdXRob3IgU3VuXHJcbiAqIEB0aW1lIDIwMTktMDItMjUgMTc6MjJcclxuICogQHByb2plY3QgU0ZyYW1ld29ya19MYXlhQWlyXHJcbiAqIEBkZXNjcmlwdGlvbiAgM0TmqKHlnovliqDovb3lt6XlhbfnsbtcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBVdGlsTG9hZDNEIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vVUzROWcuuaZr1xyXG4gICAgICogQHBhcmFtIGFyZWEg5L2c55So5Z+fXHJcbiAgICAgKiBAcGFyYW0gcGF0aCDlnLrmma/mlofku7bot6/lvoRcclxuICAgICAqIEBwYXJhbSBjYiAgIOWKoOi9veWujOaIkOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRTY2VuZShwYXRoLGFyZWEsY2IpOmFueVxyXG4gICAge1xyXG4gICAgICAgIExheWEubG9hZGVyLmNyZWF0ZShwYXRoLExheWEuSGFuZGxlci5jcmVhdGUodGhpcywoKT0+e1xyXG4gICAgICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKExheWEubG9hZGVyLmdldFJlcyhwYXRoKSk7XHJcbiAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgY2IuY2FsbChhcmVhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWcuuaZr+WGheeJqeS9k1xyXG4gICAgICogQHBhcmFtIHNjZW5lM2Qg5Zy65pmvXHJcbiAgICAgKiBAcGFyYW0gY2hpbGROYW1lIOWtkOeJqeS9k+WQjeWtl1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFNjZW5lM0RDaGlsZDxUPihzY2VuZTNkLGNoaWxkTmFtZSk6VFxyXG4gICAge1xyXG4gICAgICAgIGxldCBtcyA9IHNjZW5lM2QuZ2V0Q2hpbGRCeU5hbWUoY2hpbGROYW1lKSBhcyBUO1xyXG4gICAgICAgIGlmIChtcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExvZy5lcnJvcihcIkVycm9yOuiOt+WPluWcuuaZr+eJqeS9k+Wksei0pVwiKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaooeWei+eahOWtkOeJqeS9k+aooeWei1xyXG4gICAgICogQHBhcmFtIGZhdFNQIOeItuaWuVxyXG4gICAgICogQHBhcmFtIGNoaWxkTmFtZSDlrZDmlrnlkI3lrZdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNb2RlbENoaWxkQnlOYW1lPFQ+KGZhdFNQLGNoaWxkTmFtZSk6VFxyXG4gICAge1xyXG4gICAgICAgIGxldCBjaGlsZCA9IGZhdFNQLmdldENoaWxkQnlOYW1lKGNoaWxkTmFtZSkgYXMgVDtcclxuICAgICAgICBpZiAoY2hpbGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrojrflj5bmqKHlnovlrZDniankvZPkv6Hmga/plJnor69cIik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7/mjaLmqKHlnotcclxuICAgICAqIEBwYXJhbSB0YXJnZXRTUCDooqvmm7/mjaLmqKHlnotcclxuICAgICAqIEBwYXJhbSBtaWFuU1AgICDmm7/mjaLmqKHlnotcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZXBsYWNlTW9kZWwodGFyZ2V0U1AsbWFpblNQKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGFyZ2V0U1AgfHwgIW1haW5TUCkge1xyXG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrmm7/mjaLmiJbooqvmm7/mjaLmqKHlnovkv6Hmga/plJnor69cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGFyZ2V0U1AucGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRhcmdldFNQLnBhcmVudC5hZGRDaGlsZChtYWluU1ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtYWluU1AudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMyh0YXJnZXRTUC50cmFuc2Zvcm0ucG9zaXRpb24ueCx0YXJnZXRTUC50cmFuc2Zvcm0ucG9zaXRpb24ueSx0YXJnZXRTUC50cmFuc2Zvcm0ucG9zaXRpb24ueik7XHJcbiAgICAgICAgbWFpblNQLnRyYW5zZm9ybS5zY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjModGFyZ2V0U1AudHJhbnNmb3JtLnNjYWxlLngsdGFyZ2V0U1AudHJhbnNmb3JtLnNjYWxlLnksdGFyZ2V0U1AudHJhbnNmb3JtLnNjYWxlLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu/5o2iTWVzaOaooeWei+adkOi0qFxyXG4gICAgICogQHBhcmFtIHRhcmdldFNQIOebruagh+aooeWei1xyXG4gICAgICogQHBhcmFtIHRhcmdldE1hdCDnm67moIfmnZDotKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZXBsYWNlTW9kZWxNZXNoTWF0KHRhcmdldFNQLHRhcmdldE1hdClcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRhcmdldFNQIHx8ICF0YXJnZXRNYXQpIHtcclxuICAgICAgICAgICAgTG9nLmVycm9yKFwiRXJyb3I65qih5Z6L5oiW5p2Q6LSo5L+h5oGv6ZSZ6K+vXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFyZ2V0U1AgYXMgTGF5YS5NZXNoU3ByaXRlM0Q7XHJcbiAgICAgICAgdGFyZ2V0U1AubWVzaFJlbmRlcmVyLm1hdGVyaWFsID0gdGFyZ2V0TWF0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu/5o2iU2tpbk1lc2jmqKHlnovmnZDotKhcclxuICAgICAqIEBwYXJhbSB0YXJnZXRTUCDnm67moIfmqKHlnotcclxuICAgICAqIEBwYXJhbSB0YXJnZXRNYXQg55uu5qCH5p2Q6LSoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVwbGFjZU1vZGVsU2tpbk1lc2hNYXQodGFyZ2V0U1AsdGFyZ2V0TWF0KVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGFyZ2V0U1AgfHwgIXRhcmdldE1hdCkge1xyXG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrmqKHlnovmiJbmnZDotKjkv6Hmga/plJnor69cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnZXRTUCBhcyBMYXlhLlNraW5uZWRNZXNoU3ByaXRlM0Q7XHJcbiAgICAgICAgdGFyZ2V0U1Auc2tpbm5lZE1lc2hSZW5kZXJlci5tYXRlcmlhbCA9IHRhcmdldE1hdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWuueWZqOS4iueahOadkOi0qOW5tuWtmOWFpeWTiOW4jOihqFxyXG4gICAgICogQHBhcmFtIHRhcmdldE9iaiDmib/ovb3mnZDotKjnmoTlrrnlmahcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXRlcmlhbHMoc2NlbmUzZCk6YW55XHJcbiAgICB7XHJcbiAgICAgICAgLyoqVW5pdHnlnLrmma/lrZjotK7kuIDkuKrnqbrniankvZPvvIzpmYTluKZNZXNoUmVuZGVy55So5p2l5a2Y5YKo5p2Q6LSoKiovXHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IFV0aWxMb2FkM0QuZ2V0U2NlbmUzRENoaWxkPExheWEuTWVzaFNwcml0ZTNEPihzY2VuZTNkLFwiTWF0Q29udGFpbmVyXCIpO1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkVycm9yOuadkOi0qOWuueWZqOmUmeivr+aIluS4jeWtmOWcqFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB1c2VySW5mbzoge1tpbmRleDpzdHJpbmddOiBMYXlhLkJsaW5uUGhvbmdNYXRlcmlhbH0gPSB7fVxyXG4gICAgICAgIHZhciBtYXRBcnJhcnkgPSBjb250YWluZXIubWVzaFJlbmRlcmVyLm1hdGVyaWFscztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDtpPG1hdEFycmFyeS5sZW5ndGg7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSBtYXRBcnJhcnlbaV0ubmFtZS5zbGljZSgwLG1hdEFycmFyeVtpXS5uYW1lLmxlbmd0aC0xMCk7XHJcbiAgICAgICAgICAgIHVzZXJJbmZvW25hbWVdID0gbWF0QXJyYXJ5W2ldIGFzIExheWEuQmxpbm5QaG9uZ01hdGVyaWFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXNlckluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mjIflrprlkI3lrZfnmoTmnZDotKhcclxuICAgICAqIEBwYXJhbSBtYXRBcnJhdHkg5a2Y5pS+5p2Q6LSo55qE5ZOI5biM6KGoXHJcbiAgICAgKiBAcGFyYW0gbWF0TmFtZSAgIOadkOi0qOWQjeWtl1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1hdGVyaWFsQnlOYW1lKG1hdEFycmFyeSxtYXROYW1lKTpMYXlhLkJsaW5uUGhvbmdNYXRlcmlhbFxyXG4gICAge1xyXG4gICAgICAgIGlmICghbWF0QXJyYXJ5KSB7XHJcbiAgICAgICAgICAgIExvZy5lcnJvcihcIkVycm9yOuadkOi0qOWTiOW4jOihqOS/oeaBr+mUmeivr1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbWF0QXJyYXJ5W21hdE5hbWVdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nLmVycm9yKFwiRXJyb3I65oyH5a6a5ZOI5biM6KGo5YaF5LiN5a2Y5ZyoW1wiK21hdE5hbWUrXCJd5p2Q6LSoXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hdEFycmFyeVttYXROYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuaooeWei+WKqOeUu1xyXG4gICAgICogQHBhcmFtIHRhcmdldFNwIOaSreaUvueJqeS9k1xyXG4gICAgICogQHBhcmFtIGFuaU5hbWUgIOWKqOeUu+WQjeWtl1xyXG4gICAgICogQHBhcmFtIGlzQ3Jvc3MgIOaYr+WQpui/h+W6plxyXG4gICAgICog6YCa6L+HdGhpcy5hbmltYXRvci5nZXRDdXJyZW50QW5pbWF0b3JQbGF5U3RhdGUoMCkubm9ybWFsaXplZFRpbWU+PTHljrvliKTmlq3lvZPliY3liqjnlLvmmK/lkKbmkq3mlL7lrozmiJBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBwbGF5QW5pbWF0b3JCeU5hbWUodGFyZ2V0U3AsYW5pTmFtZSxpc0Nyb3NzPyk6TGF5YS5BbmltYXRvclxyXG4gICAge1xyXG4gICAgICAgIHZhciBhbmltYXRvcjpMYXlhLkFuaW1hdG9yID0gdGFyZ2V0U3AuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIGlmICghYW5pbWF0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2cuZXJyb3IoXCJFcnJvcjrliqjnlLvmnLrkv6Hmga/plJnor69cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzQ3Jvc3MgIT0gbnVsbCAmJiBpc0Nyb3NzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGFuaW1hdG9yLnBsYXkoYW5pTmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYW5pbWF0b3IuY3Jvc3NGYWRlKGFuaU5hbWUsMC4yKTtcclxuICAgICAgICByZXR1cm4gYW5pbWF0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmjqfliLbliqjnlLvpgJ/luqZcclxuICAgICAqIEBwYXJhbSB0YXJnZXRTcCDnm67moIfniankvZNcclxuICAgICAqIEBwYXJhbSBzcGVlZCDmkq3mlL7pgJ/luqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjb250cm9sQW5pbWF0b3JTcGVlZCh0YXJnZXRTcCxzcGVlZClcclxuICAgIHtcclxuICAgICAgICB2YXIgYW5pbWF0b3I6TGF5YS5BbmltYXRvciA9IHRhcmdldFNwLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICBpZiAoIWFuaW1hdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nLmVycm9yKFwiRXJyb3I65Yqo55S75py65L+h5oGv6ZSZ6K+vXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzcGVlZCkge1xyXG4gICAgICAgICAgICBhbmltYXRvci5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgYW5pbWF0b3Iuc3BlZWQgPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreWKqOeUu+aYr+WQpuWujOaIkFxyXG4gICAgICogQHBhcmFtIGFuaW1hdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29uZmlybUFuaUNvbXBsZXRlKGFuaW1hdG9yOkxheWEuQW5pbWF0b3IpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICB2YXIgYm9vbCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpbmRleCA9IGFuaW1hdG9yLmdldEN1cnJlbnRBbmltYXRvclBsYXlTdGF0ZSgwKS5ub3JtYWxpemVkVGltZTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMSkge1xyXG4gICAgICAgICAgICBib29sID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJvb2w7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtVdGlsTWF0aDNEfSBmcm9tIFwiLi9tYXRoM2RcIjtcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTAxLTE4IDE2OjIwXHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24g566X5rOV5bel5YW357G7XHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXRpbE1hdGgge1xyXG5cclxuICAgIC8qKuWtl+iKgui9rOaNok0qL1xyXG4gICAgcHVibGljIHN0YXRpYyBCWVRFX1RPX006IG51bWJlciA9IDEgLyAoMTAyNCAqIDEwMjQpO1xyXG4gICAgLyoq5a2X6IqC6L2s5o2iSyovXHJcbiAgICBwdWJsaWMgc3RhdGljIEJZVEVfVE9fSzogbnVtYmVyID0gMSAvICgxMDI0KTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIERlZzJSYWQ6IG51bWJlciA9IDAuMDE3NDUzMjk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBSYWQyRGVnOiBudW1iZXIgPSA1Ny4yOTU3ODtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNpZ24oZjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKChmIDwgMCkgPyAtMSA6IDEpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmZkOWumuaVsOWtl+WcqOiMg+WbtOWMuumXtOW5tui/lOWbnlxyXG4gICAgICogQHBhcmFtIG51bVxyXG4gICAgICogQHBhcmFtIG1pblxyXG4gICAgICogQHBhcmFtIG1heFxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhbXAobnVtOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKG51bSA8IG1pbikge1xyXG4gICAgICAgICAgICBudW0gPSBtaW47XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPiBtYXgpIHtcclxuICAgICAgICAgICAgbnVtID0gbWF4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhbXAwMSh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodmFsdWUgPCAwKSByZXR1cm4gMDtcclxuICAgICAgICBpZiAodmFsdWUgPiAxKSByZXR1cm4gMTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsZXJwKGZyb206IG51bWJlciwgdG86IG51bWJlciwgdDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKGZyb20gKyAoKHRvIC0gZnJvbSkgKiBVdGlsTWF0aC5jbGFtcDAxKHQpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsZXJwQW5nbGUoYTogbnVtYmVyLCBiOiBudW1iZXIsIHQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gVXRpbE1hdGgucmVwZWF0KGIgLSBhLCAzNjApO1xyXG4gICAgICAgIGlmIChudW0gPiAxODApIG51bSAtPSAzNjA7XHJcbiAgICAgICAgcmV0dXJuIChhICsgKG51bSAqIFV0aWxNYXRoLmNsYW1wMDEodCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcGVhdCh0OiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKHQgLSAoTWF0aC5mbG9vcih0IC8gbGVuZ3RoKSAqIGxlbmd0aCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lqn55Sf6ZqP5py65pWwXHJcbiAgICAgKiDnu5PmnpzvvJp4Pj1wYXJhbTEgJiYgeDxwYXJhbTJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByYW5kUmFuZ2UocGFyYW0xOiBudW1iZXIsIHBhcmFtMjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbG9jOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogKHBhcmFtMiAtIHBhcmFtMSkgKyBwYXJhbTE7XHJcbiAgICAgICAgcmV0dXJuIGxvYztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS6p+eUn+maj+acuuaVsFxyXG4gICAgICog57uT5p6c77yaeD49cGFyYW0xICYmIHg8PXBhcmFtMlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJhbmRSYW5nZUludChwYXJhbTE6IG51bWJlciwgcGFyYW0yOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBsb2M6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAocGFyYW0yIC0gcGFyYW0xICsgMSkgKyBwYXJhbTE7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobG9jKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7juaVsOe7hOS4reS6p+eUn+maj+acuuaVsFstMSwxLDJdXHJcbiAgICAgKiDnu5PmnpzvvJotMS8xLzLkuK3nmoTkuIDkuKpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByYW5kUmFuZ2VBcnJheTxUPihhcnI6IEFycmF5PFQ+KTogVCB7XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgbGV0IGxvYzogVCA9IGFycltVdGlsTWF0aC5yYW5kUmFuZ2VJbnQoMCwgYXJyLmxlbmd0aCAtIDEpXTtcclxuICAgICAgICByZXR1cm4gbG9jO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s5o2i5Li6MzYw5bqm6KeS5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhbXBEZWdyZWVzKGRlZ3JlZXM6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgd2hpbGUgKGRlZ3JlZXMgPCAwKSBkZWdyZWVzID0gZGVncmVlcyArIDM2MDtcclxuICAgICAgICB3aGlsZSAoZGVncmVlcyA+PSAzNjApIGRlZ3JlZXMgPSBkZWdyZWVzIC0gMzYwO1xyXG4gICAgICAgIHJldHVybiBkZWdyZWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s5o2i5Li6MzYw5bqm5byn5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhbXBSYWRpYW5zKHJhZGlhbnM6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgd2hpbGUgKHJhZGlhbnMgPCAwKSByYWRpYW5zID0gcmFkaWFucyArIDIgKiBNYXRoLlBJO1xyXG4gICAgICAgIHdoaWxlIChyYWRpYW5zID49IDIgKiBNYXRoLlBJKSByYWRpYW5zID0gcmFkaWFucyAtIDIgKiBNYXRoLlBJO1xyXG4gICAgICAgIHJldHVybiByYWRpYW5zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lik54K56Ze055qE6Led56a7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RGlzdGFuY2UoeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh5MiAtIHkxLCAyKSArIE1hdGgucG93KHgyIC0geDEsIDIpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFNxdWFyZURpc3RhbmNlKHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnBvdyh5MiAtIHkxLCAyKSArIE1hdGgucG93KHgyIC0geDEsIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lik54K56Ze055qE5byn5bqm77yaeOato+aWueW9ouS4ujDvvIxZ6L205ZCR5LiLLOmhuuaXtumSiOS4uuato1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldExpbmVSYWRpYW5zKHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKHkyIC0geTEsIHgyIC0geDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TGluZURlZ3JlZSh4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB4MjogbnVtYmVyLCB5MjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgZGVncmVlOiBudW1iZXIgPSBVdGlsTWF0aC50b0RlZ3JlZShVdGlsTWF0aC5nZXRMaW5lUmFkaWFucyh4MSwgeTEsIHgyLCB5MikpO1xyXG4gICAgICAgIHJldHVybiBVdGlsTWF0aC5jbGFtcERlZ3JlZXMoZGVncmVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFBvaW50UmFkaWFucyh4OiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIoeSwgeCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRQb2ludERlZ3JlZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGRlZ3JlZTogbnVtYmVyID0gVXRpbE1hdGgudG9EZWdyZWUoVXRpbE1hdGguZ2V0UG9pbnRSYWRpYW5zKHgsIHkpKTtcclxuICAgICAgICByZXR1cm4gVXRpbE1hdGguY2xhbXBEZWdyZWVzKGRlZ3JlZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvKfluqbovazljJbkuLrluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0b0RlZ3JlZShyYWRpYW46IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHJhZGlhbiAqICgxODAuMCAvIE1hdGguUEkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bqm6L2s5YyW5Li65byn5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdG9SYWRpYW4oZGVncmVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBkZWdyZWUgKiAoTWF0aC5QSSAvIDE4MC4wKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVUb3dhcmRzKGN1cnJlbnQ6IG51bWJlciwgdGFyZ2V0OiBudW1iZXIsIG1heERlbHRhOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChNYXRoLmFicyh0YXJnZXQgLSBjdXJyZW50KSA8PSBtYXhEZWx0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKGN1cnJlbnQgKyAoVXRpbE1hdGguU2lnbih0YXJnZXQgLSBjdXJyZW50KSAqIG1heERlbHRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bkuIDlrprojIPlm7TlhoXnmoTpmo/mnLrmlbTmlbBcclxuICAgICAqIEBwYXJhbSBtaW4g5pyA5bCP5YC8XHJcbiAgICAgKiBAcGFyYW0gbWF4IOacgOWkp+WAvFxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS6jOe7tOWQkemHj+W9kuS4gOWMllxyXG4gICAgICogQHBhcmFtIHhcclxuICAgICAqIEBwYXJhbSB5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbm9ybWFsaXplKHg6bnVtYmVyLHk6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4KngreSp5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuS4pOWQkemHj+WkueinklxyXG4gICAgICogQHBhcmFtIHgxXHJcbiAgICAgKiBAcGFyYW0geTFcclxuICAgICAqIEBwYXJhbSB4MlxyXG4gICAgICogQHBhcmFtIHkyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdmVjdG9yQW5nbGUoeDE6bnVtYmVyLHkxOm51bWJlcix4MjpudW1iZXIseTI6bnVtYmVyKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBpZiAoeDEgPT0geDIgJiYgeTEgPT0geTIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29zQW5nbGUgPSAoeDEqeDIreTEqeTIpLyhVdGlsTWF0aC5ub3JtYWxpemUoeDEseTEpKlV0aWxNYXRoLm5vcm1hbGl6ZSh4Mix5MikpO1xyXG4gICAgICAgIHZhciBhQ29zQW5nbGUgPSBNYXRoLmFjb3MoY29zQW5nbGUpO1xyXG4gICAgICAgIHZhciBhbmdsZSA9IFV0aWxNYXRoM0QuUmFkMkRlZyhhQ29zQW5nbGUpO1xyXG4gICAgICAgIGlmICh4MSAvIHkxIDwgeDIgLyB5MikgYW5nbGUgPSAtIGFuZ2xlO1xyXG4gICAgICAgIHJldHVybiBhbmdsZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCBSYXkgPSBMYXlhLlJheTtcclxuaW1wb3J0IFZlY3RvcjIgPSBMYXlhLlZlY3RvcjI7XHJcbmltcG9ydCBWZWN0b3IzID0gTGF5YS5WZWN0b3IzO1xyXG5pbXBvcnQgVmVjdG9yNCA9IExheWEuVmVjdG9yNDtcclxuaW1wb3J0IHtVdGlsU3RyaW5nfSBmcm9tIFwiLi9zdHJpbmdcIjtcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTExIDE4OjA4XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24gM2Tnrpfms5Xlt6XlhbfnsbtcclxuICpcclxuICovXHJcbmV4cG9ydCBjbGFzcyBVdGlsTWF0aDNEIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfVmVjMlRlbXA6IFZlY3RvcjIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX1ZlYzNUZW1wOiBWZWN0b3IzID0gbnVsbDtcclxuICAgIHByaXZhdGUgc3RhdGljIF9WZWM0VGVtcDogVmVjdG9yNCA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgVGVtcFZlYzIoKTogVmVjdG9yMiB7XHJcbiAgICAgICAgaWYgKCFVdGlsTWF0aDNELl9WZWMyVGVtcCkgVXRpbE1hdGgzRC5fVmVjMlRlbXAgPSBuZXcgVmVjdG9yMigwLCAwKTtcclxuICAgICAgICByZXR1cm4gVXRpbE1hdGgzRC5fVmVjMlRlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgVGVtcFZlYzMoKTogVmVjdG9yMyB7XHJcbiAgICAgICAgaWYgKCFVdGlsTWF0aDNELl9WZWMzVGVtcCkgVXRpbE1hdGgzRC5fVmVjM1RlbXAgPSBuZXcgVmVjdG9yMygwLCAwLCAwKTtcclxuICAgICAgICByZXR1cm4gVXRpbE1hdGgzRC5fVmVjM1RlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgVGVtcFZlYzQoKTogVmVjdG9yNCB7XHJcbiAgICAgICAgaWYgKCFVdGlsTWF0aDNELl9WZWM0VGVtcCkgVXRpbE1hdGgzRC5fVmVjNFRlbXAgPSBuZXcgVmVjdG9yNCgwLCAwLCAwLCAwKTtcclxuICAgICAgICByZXR1cm4gVXRpbE1hdGgzRC5fVmVjNFRlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6L2s5o2i5Li65rC05bmz5pa55ZCRKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVG9Ib3Jpem9udGFsKHZlYzogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgICAgIHZlYy55ID0gMDtcclxuICAgICAgICByZXR1cm4gdmVjO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuawtOW5s+i3neemuyovXHJcbiAgICBwdWJsaWMgc3RhdGljIEhvcml6b250YWxEaXN0YW5jZSh2ZWMxOiBWZWN0b3IzLCB2ZWMyOiBWZWN0b3IzKTogbnVtYmVyIHtcclxuICAgICAgICB2ZWMxLnkgPSAwO1xyXG4gICAgICAgIHZlYzIueSA9IDA7XHJcbiAgICAgICAgcmV0dXJuIFZlY3RvcjMuc2NhbGFyTGVuZ3RoKFZlYzNTdWIodmVjMSwgdmVjMikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWwhOe6v+S4iueahOS4gOeCuSovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFJheVBvaW50KHJheTogUmF5LCBkaXN0YW5jZTogbnVtYmVyKTogVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIFZlYzNBZGQocmF5Lm9yaWdpbiwgVmVjM011bChyYXkuZGlyZWN0aW9uLCBkaXN0YW5jZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXM65LiJ57u05rGC5Lik54K56Led56a7ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFZlYzNNYWduaXR1ZGUodmVjMTogVmVjdG9yMyx2ZWMyOlZlY3RvcjMpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoKHZlYzEueC12ZWMyLngpICogKHZlYzEueC12ZWMyLngpICsgKCh2ZWMxLnktdmVjMi55KSAqICh2ZWMxLnktdmVjMi55KSkgKyAoKHZlYzEuei12ZWMyLnopICogKHZlYzEuei12ZWMyLnopKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERlczrkuoznu7TmsYLkuKTngrnot53nprsgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVmVjMk1hZ25pdHVkZSh2ZWMxOiBWZWN0b3IyLHZlYzI6VmVjdG9yMik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCgodmVjMS54LXZlYzIueCkgKiAodmVjMS54LXZlYzIueCkgKyAoKHZlYzEueS12ZWMyLnkpICogKHZlYzEueS12ZWMyLnkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERlczrop5LluqbovazlvKfluqYgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRGVnMlJhZChhbmdsZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gTGF5YS5VdGlscy50b1JhZGlhbihhbmdsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIERlczrlvKfluqbovazop5LluqYgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgUmFkMkRlZyhyYWRpYW46bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIExheWEuVXRpbHMudG9BbmdsZShyYWRpYW4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZXM65q2j5bymICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNpbihhbmdsZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICB2YXIgcmFkaWFuID0gVXRpbE1hdGgzRC5EZWcyUmFkKGFuZ2xlKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5zaW4ocmFkaWFuKTtcclxuICAgIH1cclxuICAgIC8qKiBEZXM65L2Z5bymICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvcyhhbmdsZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICB2YXIgcmFkaWFuID0gVXRpbE1hdGgzRC5EZWcyUmFkKGFuZ2xlKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5jb3MocmFkaWFuKTtcclxuICAgIH1cclxuICAgIC8qKiBEZXM65q2j5YiHICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRhbihhbmdsZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICB2YXIgcmFkaWFuID0gVXRpbE1hdGgzRC5EZWcyUmFkKGFuZ2xlKTtcclxuICAgICAgICByZXR1cm4gTWF0aC50YW4ocmFkaWFuKTtcclxuICAgIH1cclxuICAgIC8qKiBEZXM65Y+N5q2j5bymICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzaW4oYW5nbGU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgdmFyIHJhZGlhbiA9IFV0aWxNYXRoM0QuRGVnMlJhZChhbmdsZSk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYXNpbihyYWRpYW4pO1xyXG4gICAgfVxyXG4gICAgLyoqIERlczrlj43kvZnlvKYgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWNvcyhhbmdsZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICB2YXIgcmFkaWFuID0gVXRpbE1hdGgzRC5EZWcyUmFkKGFuZ2xlKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5hY29zKHJhZGlhbik7XHJcbiAgICB9XHJcbiAgICAvKiogRGVzOuWPjeato+WIhyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhdGFuKGFuZ2xlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHZhciByYWRpYW4gPSBVdGlsTWF0aDNELkRlZzJSYWQoYW5nbGUpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4ocmFkaWFuKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuXHJcbi8v772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772edmVjMu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9ni8vXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyQWRkKGE6IFZlY3RvcjIsIGI6IFZlY3RvcjIpOiBWZWN0b3IyIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMihhLnggKyBiLngsIGEueSArIGIueSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyU3ViKGE6IFZlY3RvcjIsIGI6IFZlY3RvcjIpOiBWZWN0b3IyIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMihhLnggLSBiLngsIGEueSAtIGIueSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyTXVsdGlwbHkoYTogVmVjdG9yMiwgYjogVmVjdG9yMik6IFZlY3RvcjIge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyKGEueCAqIGIueCwgYS55ICogYi55KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzJNdWwoYTogVmVjdG9yMiwgZDogbnVtYmVyKTogVmVjdG9yMiB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIoYS54ICogZCwgYS55ICogZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyRGl2KGE6IFZlY3RvcjIsIGQ6IG51bWJlcik6IFZlY3RvcjIge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyKGEueCAvIGQsIGEueSAvIGQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjMkRvdChsaHM6IFZlY3RvcjIsIHJoczogVmVjdG9yMik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gKChsaHMueCAqIHJocy54KSArIChsaHMueSAqIHJocy55KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyUHJvamVjdCh2ZWN0b3I6IFZlY3RvcjIsIG9uTm9ybWFsOiBWZWN0b3IyKTogVmVjdG9yMiB7XHJcbiAgICBsZXQgbnVtOiBudW1iZXIgPSBWZWMyRG90KG9uTm9ybWFsLCBvbk5vcm1hbCk7XHJcbiAgICBpZiAobnVtIDwgMUUtMDUpIHtcclxuICAgICAgICByZXR1cm4gVmVjdG9yMi5aRVJPO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChWZWMyRGl2KFZlYzJNdWwob25Ob3JtYWwsIFZlYzJEb3QodmVjdG9yLCBvbk5vcm1hbCkpLCBudW0pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzJNaW4obGhzOiBWZWN0b3IyLCByaHM6IFZlY3RvcjIpOiBWZWN0b3IyIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMihNYXRoLm1pbihsaHMueCwgcmhzLngpLCBNYXRoLm1pbihsaHMueSwgcmhzLnkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzJNYXgobGhzOiBWZWN0b3IyLCByaHM6IFZlY3RvcjIpOiBWZWN0b3IyIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMihNYXRoLm1heChsaHMueCwgcmhzLngpLCBNYXRoLm1heChsaHMueSwgcmhzLnkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzJNYWduaXR1ZGUodmVjOiBWZWN0b3IyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoKHZlYy54ICogdmVjLngpICsgKHZlYy55ICogdmVjLnkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzJTcXJNYWduaXR1ZGUodmVjOiBWZWN0b3IyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiAodmVjLnggKiB2ZWMueCkgKyAodmVjLnkgKiB2ZWMueSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyTm9ybWFsaXplZCh2ZWM6IFZlY3RvcjIpOiBWZWN0b3IyIHtcclxuICAgIGxldCBtYWduaXR1ZGU6IG51bWJlciA9IFZlYzJNYWduaXR1ZGUodmVjKTtcclxuICAgIGxldCB2OiBWZWN0b3IyO1xyXG4gICAgaWYgKG1hZ25pdHVkZSA+IDFFLTA1KVxyXG4gICAgICAgIHYgPSBWZWMyRGl2KHZlYywgbWFnbml0dWRlKTtcclxuICAgIGVsc2VcclxuICAgICAgICB2ID0gbmV3IFZlY3RvcjIoMCwgMCk7XHJcbiAgICByZXR1cm4gdjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzJOb3JtYWwodmVjOiBWZWN0b3IyKTogdm9pZCB7XHJcbiAgICBsZXQgbWFnbml0dWRlOiBudW1iZXIgPSBWZWMyTWFnbml0dWRlKHZlYyk7XHJcbiAgICBpZiAobWFnbml0dWRlID4gMUUtMDUpIHtcclxuICAgICAgICBsZXQgdjogVmVjdG9yMiA9IFZlYzJEaXYodmVjLCBtYWduaXR1ZGUpO1xyXG4gICAgICAgIFZlYzJTZXQodmVjLCB2LngsIHYueSk7XHJcbiAgICB9IGVsc2VcclxuICAgICAgICBWZWMyU2V0KHZlYywgMCwgMCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyU2V0KHY6IFZlY3RvcjIsIHg6IG51bWJlciwgeTogbnVtYmVyKTogVmVjdG9yMiB7XHJcbiAgICB2LnggPSB4O1xyXG4gICAgdi55ID0geTtcclxuICAgIDtcclxuICAgIHJldHVybiB2O1xyXG59XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gVmVjMkFuZ2xlKGZyb206IFZlY3RvcjIsIHRvOiBWZWN0b3IyKTogbnVtYmVyIHtcclxuLy8gICAgIHJldHVybiAoTWF0aC5hY29zKFV0aWxNYXRoLmNsYW1wKFZlYzJEb3QoVmVjMk5vcm1hbGl6ZWQoZnJvbSksIFZlYzJOb3JtYWxpemVkKHRvKSksIC0xLCAxKSkgKiA1Ny4yOTU3OCk7XHJcbi8vIH1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMyQ2xhbXBNYWduaXR1ZGUodmVjdG9yOiBWZWN0b3IyLCBtYXhMZW5ndGgpOiBWZWN0b3IyIHtcclxuICAgIGlmIChWZWMyU3FyTWFnbml0dWRlKHZlY3RvcikgPiAobWF4TGVuZ3RoICogbWF4TGVuZ3RoKSkge1xyXG4gICAgICAgIHJldHVybiAoVmVjMk11bChWZWMyTm9ybWFsaXplZCh2ZWN0b3IpLCBtYXhMZW5ndGgpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2ZWN0b3I7XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBWZWMyTGVycChmcm9tOiBWZWN0b3IyLCB0bzogVmVjdG9yMiwgdDogbnVtYmVyKTogVmVjdG9yMiB7XHJcbi8vICAgICB0ID0gVXRpbE1hdGguY2xhbXAodCwgMCwgMSk7XHJcbi8vICAgICByZXR1cm4gbmV3IFZlY3RvcjIoZnJvbS54ICsgKCh0by54IC0gZnJvbS54KSAqIHQpLCBmcm9tLnkgKyAoKHRvLnkgLSBmcm9tLnkpICogdCkpO1xyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjMk1vdmVUb3dhcmRzKGN1cnJlbnQ6IFZlY3RvcjIsIHRhcmdldDogVmVjdG9yMiwgbWF4RGlzdGFuY2VEZWx0YTogbnVtYmVyKTogVmVjdG9yMiB7XHJcbiAgICBsZXQgdmVjdG9yOiBWZWN0b3IyID0gVmVjMlN1Yih0YXJnZXQsIGN1cnJlbnQpO1xyXG4gICAgbGV0IG1hZ25pdHVkZTogbnVtYmVyID0gVmVjMk1hZ25pdHVkZSh2ZWN0b3IpO1xyXG4gICAgaWYgKChtYWduaXR1ZGUgPiBtYXhEaXN0YW5jZURlbHRhKSAmJiAobWFnbml0dWRlICE9IDApKSB7XHJcbiAgICAgICAgcmV0dXJuIFZlYzJBZGQoY3VycmVudCwgKFZlYzJNdWwoVmVjMkRpdih2ZWN0b3IsIG1hZ25pdHVkZSksIG1heERpc3RhbmNlRGVsdGEpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjMlRvU3RyaW5nKHZlYzogVmVjdG9yMik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gVXRpbFN0cmluZy5mb3JtYXQoXCIoezB9LCB7MX0pXCIsIHZlYy54LCB2ZWMueSk7XHJcbn1cclxuXHJcbi8v772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772e772edmVjM++9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9nu+9ni8vXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzQWRkKGE6IFZlY3RvcjMsIGI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhhLnggKyBiLngsIGEueSArIGIueSwgYS56ICsgYi56KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNTdWIoYTogVmVjdG9yMywgYjogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGEueCAtIGIueCwgYS55IC0gYi55LCBhLnogLSBiLnopO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjM011bHRpcGx5KGE6IFZlY3RvcjMsIGI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhhLnggKiBiLngsIGEueSAqIGIueSwgYS56ICogYi56KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNNdWwoYTogVmVjdG9yMywgZDogbnVtYmVyKTogVmVjdG9yMyB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoYS54ICogZCwgYS55ICogZCwgYS56ICogZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzRGl2KGE6IFZlY3RvcjMsIGQ6IG51bWJlcik6IFZlY3RvcjMge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKGEueCAvIGQsIGEueSAvIGQsIGEueiAvIGQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjM0Nyb3NzKGxoczogVmVjdG9yMywgcmhzOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoKGxocy55ICogcmhzLnopIC0gKGxocy56ICogcmhzLnkpLCAobGhzLnogKiByaHMueCkgLSAobGhzLnggKiByaHMueiksIChsaHMueCAqIHJocy55KSAtIChsaHMueSAqIHJocy54KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzUHJvamVjdCh2ZWN0b3I6IFZlY3RvcjMsIG9uTm9ybWFsOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcbiAgICBsZXQgbnVtOiBudW1iZXIgPSBWZWN0b3IzLmRvdChvbk5vcm1hbCwgb25Ob3JtYWwpO1xyXG4gICAgaWYgKG51bSA8IDFFLTA1KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFZlYzNEaXYoVmVjM011bChvbk5vcm1hbCwgVmVjdG9yMy5kb3QodmVjdG9yLCBvbk5vcm1hbCkpLCBudW0pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNNaW4obGhzOiBWZWN0b3IzLCByaHM6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhNYXRoLm1pbihsaHMueCwgcmhzLngpLCBNYXRoLm1pbihsaHMueSwgcmhzLnkpLCBNYXRoLm1pbihsaHMueiwgcmhzLnopKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNNYXgobGhzOiBWZWN0b3IzLCByaHM6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMyhNYXRoLm1heChsaHMueCwgcmhzLngpLCBNYXRoLm1heChsaHMueSwgcmhzLnkpLCBNYXRoLm1heChsaHMueiwgcmhzLnopKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNNYWduaXR1ZGUodmVjOiBWZWN0b3IzKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoKHZlYy54ICogdmVjLngpICsgKHZlYy55ICogdmVjLnkpICsgKHZlYy56ICogdmVjLnopKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNTcXJNYWduaXR1ZGUodmVjOiBWZWN0b3IzKTogbnVtYmVyIHtcclxuICAgIHJldHVybiAodmVjLnggKiB2ZWMueCkgKyAodmVjLnkgKiB2ZWMueSkgKyAodmVjLnogKiB2ZWMueik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzTm9ybWFsaXplZCh2ZWM6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuICAgIGxldCBtYWduaXR1ZGU6IG51bWJlciA9IFZlY3RvcjMuc2NhbGFyTGVuZ3RoKHZlYyk7XHJcbiAgICBsZXQgdjogVmVjdG9yMztcclxuICAgIGlmIChtYWduaXR1ZGUgPiAxRS0wNSlcclxuICAgICAgICB2ID0gVmVjM0Rpdih2ZWMsIG1hZ25pdHVkZSk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgdiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgcmV0dXJuIHY7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzTm9ybWFsKHZlYzogVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgbGV0IG1hZ25pdHVkZTogbnVtYmVyID0gVmVjdG9yMy5zY2FsYXJMZW5ndGgodmVjKTtcclxuICAgIGlmIChtYWduaXR1ZGUgPiAxRS0wNSkge1xyXG4gICAgICAgIGxldCB2OiBWZWN0b3IzID0gVmVjM0Rpdih2ZWMsIG1hZ25pdHVkZSk7XHJcbiAgICAgICAgVmVjM1NldCh2ZWMsIHYueCwgdi55LCB2LnopO1xyXG4gICAgfSBlbHNlXHJcbiAgICAgICAgVmVjM1NldCh2ZWMsIDAsIDAsIDApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjM1NldCh2OiBWZWN0b3IzLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogVmVjdG9yMyB7XHJcbiAgICB2LnggPSB4O1xyXG4gICAgdi55ID0geTtcclxuICAgIHYueiA9IHo7XHJcbiAgICByZXR1cm4gdjtcclxufVxyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIFZlYzNBbmdsZShmcm9tOiBWZWN0b3IzLCB0bzogVmVjdG9yMyk6IG51bWJlciB7XHJcbi8vICAgICByZXR1cm4gKE1hdGguYWNvcyhVdGlsTWF0aC5jbGFtcChWZWN0b3IzLmRvdChWZWMzTm9ybWFsaXplZChmcm9tKSwgVmVjM05vcm1hbGl6ZWQodG8pKSwgLTEsIDEpKSAqIDU3LjI5NTc4KTtcclxuLy8gfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNDbGFtcE1hZ25pdHVkZSh2ZWN0b3I6IFZlY3RvcjMsIG1heExlbmd0aCk6IFZlY3RvcjMge1xyXG4gICAgaWYgKFZlY3RvcjMuc2NhbGFyTGVuZ3RoU3F1YXJlZCh2ZWN0b3IpID4gKG1heExlbmd0aCAqIG1heExlbmd0aCkpIHtcclxuICAgICAgICByZXR1cm4gKFZlYzNNdWwoVmVjM05vcm1hbGl6ZWQodmVjdG9yKSwgbWF4TGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmVjdG9yO1xyXG59XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gVmVjM0xlcnAoZnJvbTogVmVjdG9yMywgdG86IFZlY3RvcjMsIHQ6IG51bWJlcik6IFZlY3RvcjMge1xyXG4vLyAgICAgdCA9IFV0aWxNYXRoLmNsYW1wKHQsIDAsIDEpO1xyXG4vLyAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKGZyb20ueCArICgodG8ueCAtIGZyb20ueCkgKiB0KSwgZnJvbS55ICsgKCh0by55IC0gZnJvbS55KSAqIHQpLCBmcm9tLnogKyAoKHRvLnogLSBmcm9tLnopICogdCkpO1xyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVmVjM01vdmVUb3dhcmRzKGN1cnJlbnQ6IFZlY3RvcjMsIHRhcmdldDogVmVjdG9yMywgbWF4RGlzdGFuY2VEZWx0YTogbnVtYmVyKTogVmVjdG9yMyB7XHJcbiAgICBsZXQgdmVjdG9yOiBWZWN0b3IzID0gVmVjM1N1Yih0YXJnZXQsIGN1cnJlbnQpO1xyXG4gICAgbGV0IG1hZ25pdHVkZTogbnVtYmVyID0gVmVjdG9yMy5zY2FsYXJMZW5ndGgodmVjdG9yKTtcclxuICAgIGlmICgobWFnbml0dWRlID4gbWF4RGlzdGFuY2VEZWx0YSkgJiYgKG1hZ25pdHVkZSAhPSAwKSkge1xyXG4gICAgICAgIHJldHVybiBWZWMzQWRkKGN1cnJlbnQsIChWZWMzTXVsKFZlYzNEaXYodmVjdG9yLCBtYWduaXR1ZGUpLCBtYXhEaXN0YW5jZURlbHRhKSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNUb1N0cmluZyh2ZWM6IFZlY3RvcjMpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFV0aWxTdHJpbmcuZm9ybWF0KFwiKHswfSwgezF9LCB7Mn0pXCIsIHZlYy54LCB2ZWMueSwgdmVjLnopO1xyXG59XHJcblxyXG4vKipcclxuICog5byn5bqm6L2s5ZCR6YePXHJcbiAqIEBwYXJhbSAgICByYWRpYW5zICAgIOW8p+W6plxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmVGcm9tUmFkaWFucyhyYWRpYW5zOiBudW1iZXIpOiBWZWN0b3IyIHtcclxuICAgIGxldCB4OiBudW1iZXIgPSBNYXRoLmNvcyhyYWRpYW5zKTtcclxuICAgIGxldCB5OiBudW1iZXIgPSBNYXRoLnNpbihyYWRpYW5zKTtcclxuICAgIGxldCBkaXI6IFZlY3RvcjIgPSBuZXcgVmVjdG9yMih4LCB5KTtcclxuICAgIFZlYzJOb3JtYWwoZGlyKTtcclxuICAgIHJldHVybiBkaXI7XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFV0aWxTdHJpbmcgfSBmcm9tICcuL3N0cmluZyc7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxODo1NFxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOaVsOWAvOW3peWFt+exu1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFV0aWxOdW1iZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiDkv53nlZnlsI/mlbDngrnlkI7lh6DkvY1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0b0ZpeGVkKHZhbHVlOiBudW1iZXIsIHA6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxTdHJpbmcudG9OdW1iZXIodmFsdWUudG9GaXhlZChwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB0b0ludCh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc0ludCh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh2YWx1ZSkgPT0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv53nlZnmnInmlYjmlbDlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZXNlcnZlTnVtYmVyKG51bTogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBzdHIgPSBTdHJpbmcobnVtKTtcclxuICAgICAgICBsZXQgbCA9IHN0ci5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHBfaW5kZXg6IG51bWJlciA9IHN0ci5pbmRleE9mKFwiLlwiKTtcclxuICAgICAgICBpZiAocF9pbmRleCA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJldDogc3RyaW5nID0gc3RyLnNsaWNlKDAsIHBfaW5kZXggKyAxKTtcclxuXHJcbiAgICAgICAgbGV0IGxhc3ROdW0gPSBsIC0gcF9pbmRleDtcclxuICAgICAgICBpZiAobGFzdE51bSA+IHNpemUpIHtcclxuICAgICAgICAgICAgbGFzdE51bSA9IHNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsYXN0U3RyOiBzdHJpbmcgPSBzdHIuc2xpY2UocF9pbmRleCArIDEsIHBfaW5kZXggKyAxICsgbGFzdE51bSk7XHJcbiAgICAgICAgcmV0dXJuIFV0aWxTdHJpbmcudG9OdW1iZXIocmV0ICsgbGFzdFN0cik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv53nlZnmnInmlYjmlbDlgLzvvIzkuI3lpJ/ooaUw77yb5rOo5oSP6L+U5Zue55qE5piv5a2X56ym5LiyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVzZXJ2ZU51bWJlcldpdGhaZXJvKG51bTogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzdHIgPSBTdHJpbmcobnVtKTtcclxuICAgICAgICBsZXQgbCA9IHN0ci5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHBfaW5kZXg6IG51bWJlciA9IHN0ci5pbmRleE9mKFwiLlwiKTtcclxuICAgICAgICBpZiAocF9pbmRleCA8IDApIHsvL+aYr+aVtOaVsFxyXG4gICAgICAgICAgICBzdHIgKz0gJy4nO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7ICsraSkgc3RyICs9ICcwJztcclxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJldDogc3RyaW5nID0gc3RyLnNsaWNlKDAsIHBfaW5kZXggKyAxKTtcclxuXHJcbiAgICAgICAgbGV0IGxhc3ROdW0gPSBsIC0gcF9pbmRleCAtIDE7XHJcbiAgICAgICAgaWYgKGxhc3ROdW0gPiBzaXplKSB7Ly/otoXov4dcclxuICAgICAgICAgICAgbGFzdE51bSA9IHNpemU7XHJcbiAgICAgICAgICAgIGxldCBsYXN0U3RyOiBzdHJpbmcgPSBzdHIuc2xpY2UocF9pbmRleCArIDEsIHBfaW5kZXggKyAxICsgbGFzdE51bSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQgKyBsYXN0U3RyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGFzdE51bSA8IHNpemUpIHsvL+S4jei2s+ihpTBcclxuICAgICAgICAgICAgbGV0IGRpZmY6IG51bWJlciA9IHNpemUgLSBsYXN0TnVtO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZmY7ICsraSkgc3RyICs9ICcwJztcclxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZvcm1hdFRob3VzYW5kc051bWJlcihudW06IG51bWJlcikge1xyXG4gICAgICAgIGlmIChudW0gPCAxMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudW0udG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG51bSA8IDEwMDAwMDAwMDApIHtcclxuICAgICAgICAgICAgbGV0IHQgPSBNYXRoLmZsb29yKG51bSAvIDEwMDApXHJcbiAgICAgICAgICAgIHJldHVybiB0LnRvTG9jYWxlU3RyaW5nKCkgKyBcIktcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdCA9IE1hdGguZmxvb3IobnVtIC8gMTAwMDAwMClcclxuICAgICAgICAgICAgcmV0dXJuIHQudG9Mb2NhbGVTdHJpbmcoKSArIFwiTVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZm9ybWF0TnVtYmVyU2hvcnQobnVtLCBmaXhlZDogbnVtYmVyID0gMCkge1xyXG5cclxuICAgICAgICBpZiAobnVtIDwgMTAwMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtIDwgMTAwMDAwMCkge1xyXG4gICAgICAgICAgICBsZXQgdCA9IE1hdGguZmxvb3IobnVtIC8gMTAwMCkudG9GaXhlZChmaXhlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ICsgXCJLXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPCAxMDAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIGxldCB0ID0gTWF0aC5mbG9vcihudW0gLyAxMDAwMDAwKS50b0ZpeGVkKGZpeGVkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHQgKyBcIk1cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdCA9IE1hdGguZmxvb3IobnVtIC8gMTAwMDAwMDAwMCkudG9GaXhlZChmaXhlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0LnRvTG9jYWxlU3RyaW5nKCkgKyBcIkdcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenkeWtpuiuoeaVsOazleaYvuekulxyXG4gICAgICogQHBhcmFtIG51bTFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBiaWdOdW1iZXJGb3JtYXQobnVtOiBzdHJpbmcsZml4ZWQ6bnVtYmVyID0gMikge1xyXG4gICAgICAgIGxldCBleHRzID0gW1xyXG4gICAgICAgICAgICAnJywgJ0snLCBcIk1cIiwgXCJHXCIsIFwiVFwiLCBcIlBcIiwgXCJFXCIsIFwiWlwiLCBcIllcIiwgXCJBQVwiLFxyXG4gICAgICAgICAgICBcIkJCXCIsIFwiQ0NcIiwgJ0REJywgJ0VFJywgXCJGRlwiLCBcIkdHXCIsIFwiSEhcIiwgXCJJSVwiLFxyXG4gICAgICAgICAgICBcIkpKXCIsIFwiS0tcIiwgJ0xMJywgJ01NJywgXCJOTlwiLCBcIk9PXCIsIFwiUFBcIiwgXCJRUVwiLFxyXG4gICAgICAgICAgICBcIlJSXCIsIFwiU1NcIiwgJ1RUJywgJ1VVJywgXCJWVlwiLCBcIldXXCIsIFwiWFhcIiwgXCJZWVwiLFxyXG4gICAgICAgICAgICBcIlpaXCIsIFwiYWFcIiwgJ2JiJywgJ2NjJywgXCJkZFwiLCBcImVlXCIsIFwiZmZcIiwgXCJnZ1wiLFxyXG4gICAgICAgICAgICBcImhoXCIsIFwiaWlcIiwgJ2dnJywgJ2trJywgXCJsbFwiLCBcIm1tXCIsIFwibm5cIiwgXCJvb1wiLFxyXG4gICAgICAgICAgICBcInBwXCIsIFwicXFcIiwgJ3JyJywgJ3NzJywgXCJ0dFwiLCBcInV1XCIsIFwidnZcIiwgXCJ3d1wiXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgbGV0IHQxLCB0MjtcclxuICAgICAgICBsZXQgbjEgPSBudW0uaW5kZXhPZihcImUrXCIpO1xyXG4gICAgICAgIGlmIChuMSA9PSAtMSkgbjEgPSBudW0uaW5kZXhPZihcIkVcIik7XHJcbiAgICAgICAgaWYgKG4xICYmIG4xICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHQxID0gcGFyc2VGbG9hdChudW0uc3Vic3RyKDAsIG4xKSk7XHJcbiAgICAgICAgICAgIHQyID0gcGFyc2VJbnQobnVtLnN1YnN0cihuMSArIDIpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBleHQgPSBNYXRoLmZsb29yKHQyIC8gMyk7XHJcbiAgICAgICAgICAgIGxldCBtID0gdDIgJSAzO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICh0MSAqIE1hdGgucG93KDEwLG0pKS50b0ZpeGVkKGZpeGVkKSArIGV4dHNbZXh0XTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pWw5a2X55u45YqgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYmlnTnVtYmVyQWRkKG51bTE6IHN0cmluZywgbnVtMjogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGIgPSBOdW1iZXIobnVtMSkgKyBOdW1iZXIobnVtMik7XHJcbiAgICAgICAgcmV0dXJuIGIudG9FeHBvbmVudGlhbCg0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaVsOWtl+ebuOWHj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGJpZ051bWJlclN1YihudW0xOiBzdHJpbmcsIG51bTI6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBuMSA9IE51bWJlcihudW0xKTtcclxuICAgICAgICBsZXQgbjIgPSBOdW1iZXIobnVtMik7XHJcbiAgICAgICAgaWYgKG4xIDwgbjIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKG4xIC0gbjIpLnRvRXhwb25lbnRpYWwoNCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDlrZfnm7jkuZjms5VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBiaWdOdW1iZXJNdWwobnVtMTogc3RyaW5nLCBudW0yOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gKE51bWJlcihudW0xKSAqIG51bTIpLnRvRXhwb25lbnRpYWwoNCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDlrZfnm7jpmaRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBiaWdOdW1iZXJEaXYobnVtMTogc3RyaW5nLCBudW0yOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gKE51bWJlcihudW0xKSAvIG51bTIpLnRvRXhwb25lbnRpYWwoNCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuKTkuKrnp5HlraborqHmlbDnm7jpmaRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBiaWdOdW1iZXJEaXZEb3VuYmxlKG51bTE6IHN0cmluZywgbnVtMjogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIobnVtMSkgLyBOdW1iZXIobnVtMikpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCIvKipcclxuICogQGF1dGhvciBTdW5cclxuICogQHRpbWUgMjAxOS0wOC0xMSAxODo1NVxyXG4gKiBAcHJvamVjdCBTRnJhbWV3b3JrX0xheWFBaXJcclxuICogQGRlc2NyaXB0aW9uIOWtl+espuS4suW3peWFt+exu1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFV0aWxTdHJpbmcge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVtcHR5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrZfnrKbkuLLmmK/lkKbmnInlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpc0VtcHR5KHM6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAocyAhPSBudWxsICYmIHMubGVuZ3RoID4gMCkgPyBmYWxzZSA6IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB0b0ludChzdHI6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCFzdHIgfHwgc3RyLmxlbmd0aCA9PSAwKSByZXR1cm4gMDtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHRvTnVtYmVyKHN0cjogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXN0ciB8fCBzdHIubGVuZ3RoID09IDApIHJldHVybiAwO1xyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0cik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blrZfnrKbkuLLnnJ/lrp7plb/luqYs5rOo77yaXHJcbiAgICAgKiAxLuaZrumAmuaVsOe7hO+8jOWtl+espuWNoDHlrZfoioLvvJvmsYnlrZDljaDkuKTkuKrlrZfoioJcclxuICAgICAqIDIu5aaC5p6c5Y+Y5oiQ57yW56CB77yM5Y+v6IO96K6h566X5o6l5Y+j5LiN5a+5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TnVtQnl0ZXMoc3RyOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCByZWFsTGVuZ3RoID0gMCwgbGVuID0gc3RyLmxlbmd0aCwgY2hhckNvZGUgPSAtMTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgIGlmIChjaGFyQ29kZSA+PSAwICYmIGNoYXJDb2RlIDw9IDEyOCkgcmVhbExlbmd0aCArPSAxO1xyXG4gICAgICAgICAgICBlbHNlIHJlYWxMZW5ndGggKz0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlYWxMZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDooaXpm7ZcclxuICAgICAqIEBwYXJhbSBzdHJcclxuICAgICAqIEBwYXJhbSBsZW5cclxuICAgICAqIEBwYXJhbSBkaXIgMC3lkI7vvJsxLeWJjVxyXG4gICAgICogQHJldHVyblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZFplcm8oc3RyOiBzdHJpbmcsIGxlbjogbnVtYmVyLCBkaXI6IG51bWJlciA9IDApOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBfc3RyOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGxldCBfbGVuOiBudW1iZXIgPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgIGxldCBzdHJfcHJlX3plcm86IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHN0cl9lbmRfemVybzogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBpZiAoZGlyID09IDApXHJcbiAgICAgICAgICAgIHN0cl9lbmRfemVybyA9IFwiMFwiO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc3RyX3ByZV96ZXJvID0gXCIwXCI7XHJcblxyXG4gICAgICAgIGlmIChfbGVuIDwgbGVuKSB7XHJcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAoaSA8IGxlbiAtIF9sZW4pIHtcclxuICAgICAgICAgICAgICAgIF9zdHIgPSBzdHJfcHJlX3plcm8gKyBfc3RyICsgc3RyX2VuZF96ZXJvO1xyXG4gICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gX3N0ciArIHN0cjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljrvpmaTlt6blj7PnqbrmoLxcclxuICAgICAqIEBwYXJhbSBpbnB1dFxyXG4gICAgICogQHJldHVyblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRyaW0oaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9eXFxzK3xcXHMrJFwiXCJeXFxzK3xcXHMrJC9nLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOu+mZpOW3puS+p+epuuagvFxyXG4gICAgICogQHBhcmFtIGlucHV0XHJcbiAgICAgKiBAcmV0dXJuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdHJpbUxlZnQoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9eXFxzK1wiXCJeXFxzKy8sIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y676Zmk5Y+z5L6n56m65qC8XHJcbiAgICAgKiBAcGFyYW0gaW5wdXRcclxuICAgICAqIEByZXR1cm5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmltUmlnaHQoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9cXHMrJFwiXCJcXHMrJC8sIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG6ZKf5LiO56eS5qC85byPKOWmgi0+IDQwOjE1KVxyXG4gICAgICogQHBhcmFtIHNlY29uZHMg56eS5pWwXHJcbiAgICAgKiBAcmV0dXJuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbWludXRlRm9ybWF0KHNlY29uZHM6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IG1pbjogbnVtYmVyID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gICAgICAgIGxldCBzZWM6IG51bWJlciA9IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKTtcclxuXHJcbiAgICAgICAgbGV0IG1pbl9zdHI6IHN0cmluZyA9IG1pbiA8IDEwID8gKFwiMFwiICsgbWluLnRvU3RyaW5nKCkpIDogKG1pbi50b1N0cmluZygpKTtcclxuICAgICAgICBsZXQgc2VjX3N0cjogc3RyaW5nID0gc2VjIDwgMTAgPyAoXCIwXCIgKyBzZWMudG9TdHJpbmcoKSkgOiAoc2VjLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICByZXR1cm4gbWluX3N0ciArIFwiOlwiICsgc2VjX3N0cjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXtuWIhuenkuagvOW8jyjlpoItPiAwNTozMjoyMClcclxuICAgICAqIEBwYXJhbSBzZWNvbmRzKOenkilcclxuICAgICAqIEByZXR1cm5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBob3VyRm9ybWF0KHNlY29uZHM6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGhvdXI6IG51bWJlciA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xyXG4gICAgICAgIGxldCBob3VyX3N0cjogU3RyaW5nID0gaG91ciA8IDEwID8gKFwiMFwiICsgaG91ci50b1N0cmluZygpKSA6IChob3VyLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHJldHVybiBob3VyX3N0ciArIFwiOlwiICsgVXRpbFN0cmluZy5taW51dGVGb3JtYXQoc2Vjb25kcyAlIDM2MDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC85byP5YyW5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gc3RyIOmcgOimgeagvOW8j+WMlueahOWtl+espuS4su+8jOOAkFwi5p2w5Y2r77yM6L+Z6YeM5pyJezB95Liq6Iu55p6c77yM5ZKMezF95Liq6aaZ6JWJ77yBXCIsIDUsMTDjgJFcclxuICAgICAqIEBwYXJhbSBhcmdzIOWPguaVsOWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZvcm1hdChzdHI6IHN0cmluZywgLi4uYXJncyk6IHN0cmluZyB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxce1wiICsgaSArIFwiXFxcXH1cIiwgXCJnbVwiKSwgYXJnc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku6XmjIflrprlrZfnrKblvIDlp4tcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBiZWdpbnNXaXRoKGlucHV0OiBzdHJpbmcsIHByZWZpeDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHByZWZpeCA9PSBpbnB1dC5zdWJzdHJpbmcoMCwgcHJlZml4Lmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku6XmjIflrprlrZfnrKbnu5PmnZ9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBlbmRzV2l0aChpbnB1dDogc3RyaW5nLCBzdWZmaXg6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBzdWZmaXggPT0gaW5wdXQuc3Vic3RyaW5nKGlucHV0Lmxlbmd0aCAtIHN1ZmZpeC5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKmd1aWQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRHVUlEU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGQgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmICh3aW5kb3cucGVyZm9ybWFuY2UgJiYgdHlwZW9mIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBkICs9IHBlcmZvcm1hbmNlLm5vdygpOyAvL3VzZSBoaWdoLXByZWNpc2lvbiB0aW1lciBpZiBhdmFpbGFibGVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcclxuICAgICAgICAgICAgbGV0IHIgPSAoZCArIE1hdGgucmFuZG9tKCkgKiAxNikgJSAxNiB8IDA7XHJcbiAgICAgICAgICAgIGQgPSBNYXRoLmZsb29yKGQgLyAxNik7XHJcbiAgICAgICAgICAgIHJldHVybiAoYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpppblrZfmr43lpKflraZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmaXJzdFVwcGVyQ2FzZSh3b3JkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagvOW8j+WMluS4i+WIkue6v+eahOWNleivjVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZvcm1hdERhc2hXb3JkKHdvcmQ6IHN0cmluZywgY2FwRmlyc3Q6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGxldCBmaXJzdCA9IHRydWU7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgd29yZC5zcGxpdCgnXycpLmZvckVhY2goKHNlYzogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhcEZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gVXRpbFN0cmluZy5maXJzdFVwcGVyQ2FzZShzZWMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBzZWM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgVXRpbFN0cmluZy5maXJzdFVwcGVyQ2FzZShzZWMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaIquWPluWtl+espuS4slxyXG4gICAgICogQHBhcmFtIHN0ciDlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBzdGFydCDlvIDlp4vkvY3nva5cclxuICAgICAqIEBwYXJhbSBlbmQg57uT5p2f5L2N572uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3Vic3RyaW5nKHN0cjpzdHJpbmcsc3RhcnQ6bnVtYmVyLGVuZDpudW1iZXIpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyaW5nKHN0YXJ0LGVuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiKrlj5blrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBzdHIg5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gc3RhcnQg5byA5aeL5L2N572uXHJcbiAgICAgKiBAcGFyYW0gbG9uZyDmiKrlj5bplb/luqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzdWJzdHIoc3RyOnN0cmluZyxzdGFydDpudW1iZXIsbG9uZzpudW1iZXIpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LGxvbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a2X56ym5Liy6L2s5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gc3RyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RyVG9PYmplY3Qoc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzdHJUb09iaiA9IEpTT04ucGFyc2Uoc3RyKTtcclxuICAgICAgICByZXR1cm4gc3RyVG9PYmo7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+56LGh6L2s5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gc3RyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgb2JqVG9TdHIob2JqOk9iamVjdCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgb2JqVG9TdHIgPSBKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICAgICAgcmV0dXJuIG9ialRvU3RyO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBAYXV0aG9yIFN1blxyXG4gKiBAdGltZSAyMDE5LTA4LTA5IDE5OjE4XHJcbiAqIEBwcm9qZWN0IFNGcmFtZXdvcmtfTGF5YUFpclxyXG4gKiBAZGVzY3JpcHRpb24gIOaXtumXtOW3peWFt1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFV0aWxUaW1lIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBtX1N0YXJ0VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMubV9TdGFydFRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgIH1cclxuXHJcbiAgICAvKirkuKTluKfkuYvpl7TnmoTml7bpl7Tpl7TpmpQs5Y2V5L2N56eSKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGRlbHRhVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBMYXlhLnRpbWVyLmRlbHRhICogMC4wMDE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Zu65a6a5Lik5bin5LmL6Ze055qE5pe26Ze06Ze06ZqUKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGZpeGVkRGVsdGFUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5b2T5YmN5pe26Ze077yM55u45a+5eHh4eOW5tOW8gOWni+e7j+i/h+eahOavq+enkuaVsCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCB0aW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKua4uOaIj+WQr+WKqOWIsOeOsOWcqOeahOaXtumXtCzljZXkvY3mr6vnp5IqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdGltZVNpbmNlU3RhcnR1cCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAoTGF5YS50aW1lci5jdXJyVGltZXIgLSB0aGlzLm1fU3RhcnRUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmuLjmiI/lkK/liqjlkI7vvIznu4/ov4fnmoTluKfmlbAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZnJhbWVDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBMYXlhLnRpbWVyLmN1cnJGcmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCB0aW1lU2NhbGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTGF5YS50aW1lci5zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldCB0aW1lU2NhbGUoc2NhbGU6IG51bWJlcikge1xyXG4gICAgICAgIExheWEudGltZXIuc2NhbGUgPSBzY2FsZTtcclxuICAgIH1cclxufVxyXG4iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xyXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBCb3g9TGF5YS5Cb3g7XHJcbmltcG9ydCBUYXA9TGF5YS5UYWI7XHJcbmltcG9ydCBDbGlwPUxheWEuQ2xpcDtcclxuaW1wb3J0IExpc3Q9TGF5YS5MaXN0O1xyXG5pbXBvcnQgSW1hZ2U9TGF5YS5JbWFnZTtcclxuaW1wb3J0IExhYmVsPUxheWEuTGFiZWw7XHJcbmltcG9ydCBQYW5lbD1MYXlhLlBhbmVsO1xyXG5pbXBvcnQgU3ByaXRlPUxheWEuU3ByaXRlO1xyXG5pbXBvcnQgQnV0dG9uPUxheWEuQnV0dG9uO1xyXG5pbXBvcnQgQ2hlY2tCb3g9TGF5YS5DaGVja0JveDtcclxuaW1wb3J0IEhTbGlkZXI9TGF5YS5IU2xpZGVyO1xyXG5pbXBvcnQgU2xpZGVyPUxheWEuVlNsaWRlcjtcclxuaW1wb3J0IFZpZXdTdGFjaz1MYXlhLlZpZXdTdGFjaztcclxuaW1wb3J0IEFuaW1hdGlvbj1MYXlhLkFuaW1hdGlvbjtcclxuaW1wb3J0IFByb2dyZXNzQmFyPUxheWEuUHJvZ3Jlc3NCYXI7XHJcbmltcG9ydCBGcmFtZUFuaW1hdGlvbj1MYXlhLkZyYW1lQW5pbWF0aW9uO1xyXG5pbXBvcnQge0N1c3RvbVZpZXd9IGZyb20gXCIuLi9mcmFtZXdvcmsvbWFuYWdlci91aS92aWV3LWJhc2VcIjtcclxuaW1wb3J0IHtDdXN0b21EaWFsb2d9IGZyb20gXCIuLi9mcmFtZXdvcmsvbWFuYWdlci91aS9kaWFsb2ctYmFzZVwiO1xyXG5pbXBvcnQgRGlhbG9nQmFzZSA9IEN1c3RvbURpYWxvZy5EaWFsb2dCYXNlO1xyXG5pbXBvcnQgVmlld0Jhc2UgPSBDdXN0b21WaWV3LlZpZXdCYXNlO1xudmFyIFJFRzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XG5leHBvcnQgbW9kdWxlIHVpLnZpZXcuY29tIHtcclxuICAgIGV4cG9ydCBjbGFzcyBkYXk3c1VJIGV4dGVuZHMgRGlhbG9nQmFzZSB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiRGlhbG9nQmFzZVwiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjc1MCxcImhlaWdodFwiOjEzMzR9LFwiY29tcElkXCI6MixcImxvYWRMaXN0XCI6W10sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGRheTdzVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3LmNvbS5kYXk3c1VJXCIsZGF5N3NVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgaW52aXRlVUkgZXh0ZW5kcyBEaWFsb2dCYXNlIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJEaWFsb2dCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwibG9hZExpc3RcIjpbXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoaW52aXRlVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3LmNvbS5pbnZpdGVVSVwiLGludml0ZVVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBsb3R0ZXJ5VUkgZXh0ZW5kcyBEaWFsb2dCYXNlIHtcclxuXHRcdHB1YmxpYyBpZGxlOkZyYW1lQW5pbWF0aW9uO1xuXHRcdHB1YmxpYyBpbWdDb250ZXh0OkltYWdlO1xuXHRcdHB1YmxpYyBidG5Db25maXJtOkJ1dHRvbjtcblx0XHRwdWJsaWMgYnRuQ2xvc2U6QnV0dG9uO1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJEaWFsb2dCYXNlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjc1MCxcImhlaWdodFwiOjEzMzR9LFwiY29tcElkXCI6MixcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo2MTUsXCJ4XCI6Mzc1LFwic2tpblwiOlwicmVzL2NvbS9pbWdfbG90dGVyeV9ib3JkZXIucG5nXCIsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo0NSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozMTQsXCJ4XCI6MzE0LFwidmFyXCI6XCJpbWdDb250ZXh0XCIsXCJza2luXCI6XCJyZXMvY29tL2ltZ19sb3R0ZXJ5X2NvbnRlbnQucG5nXCIsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo0Nn0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOi02NixcInhcIjoyNTMsXCJza2luXCI6XCJyZXMvY29tL2ltZ196aGVuLnBuZ1wifSxcImNvbXBJZFwiOjQ3fSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjc4MCxcInhcIjozMTQsXCJ3aWR0aFwiOjI1OCxcInZhclwiOlwiYnRuQ29uZmlybVwiLFwic3RhdGVOdW1cIjoxLFwic2tpblwiOlwicmVzL21haW4vZWZmZWN0L2J0bl9jb21tb25fMi5wbmdcIixcImhlaWdodFwiOjEzMCxcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjQ4LFwiY2hpbGRcIjpbe1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1widmFsaWduXCI6XCJtaWRkbGVcIixcInRvcFwiOjAsXCJ0ZXh0XCI6XCLmir3lpZZcIixcInJpZ2h0XCI6MCxcImxlZnRcIjowLFwiZm9udFNpemVcIjo2MCxcImJvdHRvbVwiOjAsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjo0OX1dfSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOi0xOTQsXCJ4XCI6NTg3LFwidmFyXCI6XCJidG5DbG9zZVwiLFwic3RhdGVOdW1cIjoxLFwic2tpblwiOlwicmVzL21haW4vZWZmZWN0L2J0bl9jbG9zZS5wbmdcIixcImFuY2hvcllcIjowLjUsXCJhbmNob3JYXCI6MC41fSxcImNvbXBJZFwiOjUwfV19XSxcImFuaW1hdGlvbnNcIjpbe1wibm9kZXNcIjpbe1widGFyZ2V0XCI6MzQsXCJrZXlmcmFtZXNcIjp7XCJ4XCI6W3tcInZhbHVlXCI6MzY3LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJ4XCIsXCJpbmRleFwiOjB9LHtcInZhbHVlXCI6MzY3LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJ4XCIsXCJpbmRleFwiOjEwfSx7XCJ2YWx1ZVwiOjM2NyxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwieFwiLFwiaW5kZXhcIjoyNX1dLFwidmlzaWJsZVwiOlt7XCJ2YWx1ZVwiOnRydWUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjB9LHtcInZhbHVlXCI6ZmFsc2UsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjEwfSx7XCJ2YWx1ZVwiOnRydWUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjE1fSx7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoyNX0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjozMH1dLFwicm90YXRpb25cIjpbe1widmFsdWVcIjowLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjM0LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjAsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInJvdGF0aW9uXCIsXCJpbmRleFwiOjEwfSx7XCJ2YWx1ZVwiOjcsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInJvdGF0aW9uXCIsXCJpbmRleFwiOjE1fSx7XCJ2YWx1ZVwiOjcsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInJvdGF0aW9uXCIsXCJpbmRleFwiOjI1fSx7XCJ2YWx1ZVwiOjAsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6MzQsXCJrZXlcIjpcInJvdGF0aW9uXCIsXCJpbmRleFwiOjMwfV19fV0sXCJuYW1lXCI6XCJpZGxlXCIsXCJpZFwiOjEsXCJmcmFtZVJhdGVcIjoyNCxcImFjdGlvblwiOjB9XSxcImxvYWRMaXN0XCI6W1wicmVzL2NvbS9pbWdfbG90dGVyeV9ib3JkZXIucG5nXCIsXCJyZXMvY29tL2ltZ19sb3R0ZXJ5X2NvbnRlbnQucG5nXCIsXCJyZXMvY29tL2ltZ196aGVuLnBuZ1wiLFwicmVzL21haW4vZWZmZWN0L2J0bl9jb21tb25fMi5wbmdcIixcInJlcy9tYWluL2VmZmVjdC9idG5fY2xvc2UucG5nXCJdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhsb3R0ZXJ5VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3LmNvbS5sb3R0ZXJ5VUlcIixsb3R0ZXJ5VUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIHJhbmtVSSBleHRlbmRzIERpYWxvZ0Jhc2Uge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJXWE9wZW5EYXRhVmlld2VyXCIsXCJwcm9wc1wiOntcInlcIjozODEsXCJ4XCI6MTE2LFwid2lkdGhcIjo1MjQsXCJtb3VzZVRocm91Z2hcIjp0cnVlLFwiaWNvblNpZ25cIjpcInd4XCIsXCJoZWlnaHRcIjo4NTgsXCJydW50aW1lXCI6XCJsYXlhLnVpLldYT3BlbkRhdGFWaWV3ZXJcIn0sXCJjb21wSWRcIjozfV0sXCJsb2FkTGlzdFwiOltdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhyYW5rVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3LmNvbS5yYW5rVUlcIixyYW5rVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIHNob3BVSSBleHRlbmRzIERpYWxvZ0Jhc2Uge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJtb3VzZVRocm91Z2hcIjp0cnVlLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwibG9hZExpc3RcIjpbXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoc2hvcFVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5jb20uc2hvcFVJXCIsc2hvcFVJKTtcclxufVxyXG5leHBvcnQgbW9kdWxlIHVpLnZpZXcubWFpbiB7XHJcbiAgICBleHBvcnQgY2xhc3MgYmdVSSBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHRcdHB1YmxpYyBpbWdCZzpJbWFnZTtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ2YXJcIjpcImltZ0JnXCIsXCJ0b3BcIjowLFwic2tpblwiOlwicmVzL21haW4vYmcvYmcucG5nXCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImJvdHRvbVwiOjB9LFwiY29tcElkXCI6NX1dLFwibG9hZExpc3RcIjpbXCJyZXMvbWFpbi9iZy9iZy5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGJnVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS52aWV3Lm1haW4uYmdVSVwiLGJnVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIGQzVUkgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJsb2FkTGlzdFwiOltdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhkM1VJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5tYWluLmQzVUlcIixkM1VJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBlZmZlY3RVSSBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHRcdHB1YmxpYyBidG5MdWNreTpCdXR0b247XG5cdFx0cHVibGljIGJ0blJhbms6QnV0dG9uO1xuXHRcdHB1YmxpYyBidG5JbnZpdGU6QnV0dG9uO1xuXHRcdHB1YmxpYyBidG5TZXR0aW5nOkJ1dHRvbjtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NjQsXCJ4XCI6NzIsXCJ3aWR0aFwiOjIxMyxcInNraW5cIjpcInJlcy9tYWluL2VmZmVjdC9pbWFnZV9zdGF0dXMucG5nXCIsXCJoZWlnaHRcIjo0Nn0sXCJjb21wSWRcIjozfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NjQsXCJ4XCI6NDU5LFwid2lkdGhcIjoyMTMsXCJza2luXCI6XCJyZXMvbWFpbi9lZmZlY3QvaW1hZ2Vfc3RhdHVzLnBuZ1wiLFwiaGVpZ2h0XCI6NDZ9LFwiY29tcElkXCI6NH0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjQ4LFwieFwiOjQwMyxcInNraW5cIjpcInJlcy9tYWluL2VmZmVjdC9pbWdfZGlhbW9uZC5wbmdcIn0sXCJjb21wSWRcIjo1fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NDQsXCJ4XCI6MzAsXCJza2luXCI6XCJyZXMvbWFpbi9lZmZlY3QvaW1nX2dsb2QucG5nXCJ9LFwiY29tcElkXCI6Nn0se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjoyODIsXCJ4XCI6Mzc1LFwid2lkdGhcIjoyMDcsXCJ2YXJcIjpcImJ0bkx1Y2t5XCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJyZXMvbWFpbi9lZmZlY3QvYnRuX2NvbW1vbl8xLnBuZ1wiLFwiaGVpZ2h0XCI6MTA0LFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6NyxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0b3BcIjowLFwidGV4dFwiOlwi6L2s55uYXCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImZvbnRTaXplXCI6NDAsXCJib3R0b21cIjowLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6MTF9XX0se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjo0MzksXCJ4XCI6Mzc1LFwid2lkdGhcIjoyMDcsXCJ2YXJcIjpcImJ0blJhbmtcIixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9tYWluL2VmZmVjdC9idG5fY29tbW9uXzIucG5nXCIsXCJoZWlnaHRcIjoxMDQsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjo4LFwiY2hpbGRcIjpbe1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1widmFsaWduXCI6XCJtaWRkbGVcIixcInRvcFwiOjAsXCJ0ZXh0XCI6XCLmjpLooYxcIixcInJpZ2h0XCI6MCxcImxlZnRcIjowLFwiZm9udFNpemVcIjo0MCxcImJvdHRvbVwiOjAsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjoxMn1dfSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjYwNixcInhcIjozNzUsXCJ3aWR0aFwiOjIwNyxcInZhclwiOlwiYnRuSW52aXRlXCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJyZXMvbWFpbi9lZmZlY3QvYnRuX2NvbW1vbl8zLnBuZ1wiLFwiaGVpZ2h0XCI6MTA0LFwiYW5jaG9yWVwiOjAuNSxcImFuY2hvclhcIjowLjV9LFwiY29tcElkXCI6OSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0b3BcIjowLFwidGV4dFwiOlwi6YKA6K+3XCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImZvbnRTaXplXCI6NDAsXCJib3R0b21cIjowLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6MTN9XX0se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjo3NzYsXCJ4XCI6Mzc1LFwid2lkdGhcIjoyMDcsXCJ2YXJcIjpcImJ0blNldHRpbmdcIixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcInJlcy9tYWluL2VmZmVjdC9idG5fY29tbW9uXzQucG5nXCIsXCJoZWlnaHRcIjoxMDQsXCJhbmNob3JZXCI6MC41LFwiYW5jaG9yWFwiOjAuNX0sXCJjb21wSWRcIjoxMCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0b3BcIjowLFwidGV4dFwiOlwi6K6+572uXCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImZvbnRTaXplXCI6NDAsXCJib3R0b21cIjowLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6MTR9XX1dLFwibG9hZExpc3RcIjpbXCJyZXMvbWFpbi9lZmZlY3QvaW1hZ2Vfc3RhdHVzLnBuZ1wiLFwicmVzL21haW4vZWZmZWN0L2ltZ19kaWFtb25kLnBuZ1wiLFwicmVzL21haW4vZWZmZWN0L2ltZ19nbG9kLnBuZ1wiLFwicmVzL21haW4vZWZmZWN0L2J0bl9jb21tb25fMS5wbmdcIixcInJlcy9tYWluL2VmZmVjdC9idG5fY29tbW9uXzIucG5nXCIsXCJyZXMvbWFpbi9lZmZlY3QvYnRuX2NvbW1vbl8zLnBuZ1wiLFwicmVzL21haW4vZWZmZWN0L2J0bl9jb21tb25fNC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGVmZmVjdFVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudmlldy5tYWluLmVmZmVjdFVJXCIsZWZmZWN0VUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIGdhbWVVSSBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHRcdHB1YmxpYyBhbmlfZ3JhcDpGcmFtZUFuaW1hdGlvbjtcblx0XHRwdWJsaWMgYW5pX2x1Y2tCTDpGcmFtZUFuaW1hdGlvbjtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld0Jhc2VcIixcInByb3BzXCI6e1wid2lkdGhcIjo3NTAsXCJoZWlnaHRcIjoxMzM0fSxcImNvbXBJZFwiOjIsXCJhbmltYXRpb25zXCI6W3tcIm5vZGVzXCI6W3tcInRhcmdldFwiOjQxMyxcImtleWZyYW1lc1wiOntcInZpc2libGVcIjpbe1widmFsdWVcIjpmYWxzZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6NDEzLFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjB9LHtcInZhbHVlXCI6dHJ1ZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6NDEzLFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjJ9LHtcInZhbHVlXCI6ZmFsc2UsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjQxMyxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjo0fSx7XCJ2YWx1ZVwiOnRydWUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjQxMyxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjo2fSx7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjo0MTMsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6OH0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjo0MTMsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MTB9LHtcInZhbHVlXCI6ZmFsc2UsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjQxMyxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoxMn1dfX0se1widGFyZ2V0XCI6MzI0LFwia2V5ZnJhbWVzXCI6e1widmlzaWJsZVwiOlt7XCJ2YWx1ZVwiOnRydWUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjMyNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOmZhbHNlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozMjQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6Mn0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozMjQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6NH0se1widmFsdWVcIjpmYWxzZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzI0LFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjZ9LHtcInZhbHVlXCI6dHJ1ZSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOmZhbHNlLFwidGFyZ2V0XCI6MzI0LFwia2V5XCI6XCJ2aXNpYmxlXCIsXCJpbmRleFwiOjh9LHtcInZhbHVlXCI6ZmFsc2UsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjpmYWxzZSxcInRhcmdldFwiOjMyNCxcImtleVwiOlwidmlzaWJsZVwiLFwiaW5kZXhcIjoxMH0se1widmFsdWVcIjp0cnVlLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6ZmFsc2UsXCJ0YXJnZXRcIjozMjQsXCJrZXlcIjpcInZpc2libGVcIixcImluZGV4XCI6MTJ9XX19XSxcIm5hbWVcIjpcImFuaV9ncmFwXCIsXCJpZFwiOjI5LFwiZnJhbWVSYXRlXCI6MjQsXCJhY3Rpb25cIjowfSx7XCJub2Rlc1wiOlt7XCJ0YXJnZXRcIjo0NjgsXCJrZXlmcmFtZXNcIjp7XCJyb3RhdGlvblwiOlt7XCJ2YWx1ZVwiOjAsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY4LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjM2MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjgsXCJrZXlcIjpcInJvdGF0aW9uXCIsXCJpbmRleFwiOjIwMH1dLFwiYWxwaGFcIjpbe1widmFsdWVcIjoxLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OCxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6MH0se1widmFsdWVcIjowLjUsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY4LFwia2V5XCI6XCJhbHBoYVwiLFwiaW5kZXhcIjo1MH0se1widmFsdWVcIjoxLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OCxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6MTAwfSx7XCJ2YWx1ZVwiOjAuNSxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjo0NjgsXCJrZXlcIjpcImFscGhhXCIsXCJpbmRleFwiOjE1MH0se1widmFsdWVcIjoxLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OCxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6MjAwfV19fSx7XCJ0YXJnZXRcIjo0NjksXCJrZXlmcmFtZXNcIjp7XCJyb3RhdGlvblwiOlt7XCJ2YWx1ZVwiOjAsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY5LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOi0zNjAsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY5LFwia2V5XCI6XCJyb3RhdGlvblwiLFwiaW5kZXhcIjoyMDB9XSxcImFscGhhXCI6W3tcInZhbHVlXCI6MC41LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OSxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6MH0se1widmFsdWVcIjoxLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OSxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6NTB9LHtcInZhbHVlXCI6MC41LFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjQ2OSxcImtleVwiOlwiYWxwaGFcIixcImluZGV4XCI6MTAwfSx7XCJ2YWx1ZVwiOjEsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6NDY5LFwia2V5XCI6XCJhbHBoYVwiLFwiaW5kZXhcIjoxNTB9XX19XSxcIm5hbWVcIjpcImFuaV9sdWNrQkxcIixcImlkXCI6MzAsXCJmcmFtZVJhdGVcIjoyNCxcImFjdGlvblwiOjB9XSxcImxvYWRMaXN0XCI6W10sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGdhbWVVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnZpZXcubWFpbi5nYW1lVUlcIixnYW1lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIGxvYWRpbmdVSSBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHRcdHB1YmxpYyBpbWdfYmc6SW1hZ2U7XG5cdFx0cHVibGljIGJveF9idG06Qm94O1xuXHRcdHB1YmxpYyBwcm9fTG9hZGluZzpQcm9ncmVzc0Jhcjtcblx0XHRwdWJsaWMgbGJsTG9hZGluZzpMYWJlbDtcblx0XHRwdWJsaWMgbGJsX3A6TGFiZWw7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlZpZXdCYXNlXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzUwLFwiaGVpZ2h0XCI6MTMzNH0sXCJjb21wSWRcIjoyLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcInZhclwiOlwiaW1nX2JnXCIsXCJ0b3BcIjowLFwic2tpblwiOlwicmVzL2xvYWRpbmcvaW1nX2xvYWRpbmdfYmcucG5nXCIsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImJvdHRvbVwiOjB9LFwiY29tcElkXCI6M30se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjQ5MyxcInZhclwiOlwiYm94X2J0bVwiLFwicGl2b3RZXCI6MTQ5LFwicGl2b3RYXCI6MjQ5LFwiaGVpZ2h0XCI6MTQ5LFwiY2VudGVyWFwiOjAsXCJib3R0b21cIjowfSxcImNvbXBJZFwiOjUsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJQcm9ncmVzc0JhclwiLFwicHJvcHNcIjp7XCJ5XCI6MjAsXCJ4XCI6MjQ3LFwidmFyXCI6XCJwcm9fTG9hZGluZ1wiLFwic2tpblwiOlwicmVzL2xvYWRpbmcvcHJvZ3Jlc3NfbG9hZGluZy5wbmdcIixcInBpdm90WVwiOjEyLFwicGl2b3RYXCI6MTc1fSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoyMCxcIndpZHRoXCI6MjM4LFwidmFyXCI6XCJsYmxMb2FkaW5nXCIsXCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidGV4dFwiOlwiMTAwJVwiLFwic3Ryb2tlQ29sb3JcIjpcIiNmZmZmZmZcIixcInN0cm9rZVwiOjQsXCJwaXZvdFlcIjoxNixcInBpdm90WFwiOjExOSxcImhlaWdodFwiOjMyLFwiZm9udFNpemVcIjoyNixcImZvbnRcIjpcIkFyaWFsXCIsXCJjb2xvclwiOlwiIzU5MjIyMlwiLFwiY2VudGVyWFwiOjAsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjo3fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6ODUsXCJ4XCI6MjQ3LFwid2lkdGhcIjo0OTMsXCJza2luXCI6XCJyZXMvbG9hZGluZy9pbWdfOHIucG5nXCIsXCJwaXZvdFlcIjoyMCxcInBpdm90WFwiOjI0NyxcImhlaWdodFwiOjM5fSxcImNvbXBJZFwiOjh9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoxMjgsXCJ4XCI6MjQ3LFwid2lkdGhcIjoyODMsXCJ2YXJcIjpcImxibF9wXCIsXCJ2YWxpZ25cIjpcIm1pZGRsZVwiLFwidGV4dFwiOlwiUG93ZXJlZCBieSBMYXlhQWlyIEVuZ2luZVwiLFwicGl2b3RZXCI6MjEsXCJwaXZvdFhcIjoxNDIsXCJoZWlnaHRcIjo0MixcImZvbnRTaXplXCI6MTgsXCJjb2xvclwiOlwiI2ZmZmZmZlwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6OX1dfV0sXCJsb2FkTGlzdFwiOltcInJlcy9sb2FkaW5nL2ltZ19sb2FkaW5nX2JnLnBuZ1wiLFwicmVzL2xvYWRpbmcvcHJvZ3Jlc3NfbG9hZGluZy5wbmdcIixcInJlcy9sb2FkaW5nL2ltZ184ci5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGxvYWRpbmdVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnZpZXcubWFpbi5sb2FkaW5nVUlcIixsb2FkaW5nVUkpO1xyXG59XHIiXX0=
