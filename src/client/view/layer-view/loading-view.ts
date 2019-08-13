import {ui} from "../../../ui/layaMaxUI";
import loadingUI = ui.view.main.loadingUI;
import { ILoaing } from '../../../framework/interface/i-Loading';
import { BgView } from './bg-view';
import { D3View } from './d3-view';
import { DataBase } from '../../../framework/manager/data/data-base';
import { ConfigUI, ConfigGame, ConfigRes } from '../../../framework/setting/config';
import { EventManager } from '../../../framework/manager/event/event-manager';
import { UtilNumber } from '../../../framework/util/number';
import { enumDimension } from '../../../framework/setting/enum';
import { GameView } from './game-view';
import { EffectView } from './effect-view';
import { PopupView } from './popup-view';
import { EventFunc } from '../../../framework/manager/event/event-data';
import { Log } from '../../../framework/core/log';
import { ResManager } from '../../../framework/manager/res/res-manager';
import { ResGroup } from '../../../framework/manager/res/res-group';



export class LoadingView extends loadingUI implements ILoaing{

    /*****************************************页面属性管理*****************************************/


    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /*****************************************页面生命周期*****************************************/

    constructor() {
        super();
    }

    onAwake(): void {
        super.onAwake();
        this.Init();
        this.suitInit();
    }

      /**
     * 加载页面启动项
     */
    onStart(): void {
      
        //加载主场景所需要的资源信息
        ResManager.$.loadGroup(
            ConfigRes.$.defaultMainRes,
            new EventFunc(this,this.onProgress),
            new EventFunc(this,this.onCompleted)
        );
        this.lblLoading.text = "游戏登录中...";
    }

    /**
     * 加载完成回调
     * @param success
     */
    onCompleted(success: boolean): void {

        //Bg页面
        let bgView = BgView.$;
        Laya.stage.addChild(bgView);

        if(ConfigGame.$.dimension==enumDimension.Dim3)
        {
            //3D页面
            let d3View = D3View.$;
            Laya.stage.addChild(d3View);
            d3View.load3DScene(this.showView);
        }else{
            this.showView();
        }
    }
    private showView()
    {
        //主页
        let gameView = GameView.$;
        Laya.stage.addChild(gameView);
        //效果页
        let effectView = EffectView.$;
        Laya.stage.addChild(effectView);
        //弹窗页
        let popupView = PopupView.$;
        Laya.stage.addChild(popupView);
        //结束销毁加载页
        this.destroy();
    }

    /**
     * 加载进度
     * @param progress
     */
    onProgress(progress: number): void {

        let fixed = UtilNumber.toFixed(progress*100, 0);
        this.lblLoading.text = fixed + "%";
        this.pro_Loading.value = fixed/100;
    }

  


    /**
     * 初始化一次
     */
    public Init() {
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
    suitInit()
    {
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
    private initOnce()
    {

    }

    /** Des:每次弹出初始化 */
    private initAll()
    {

    }





    /********************************************——**********************************************/
    ////////////////////////////////////////////分界线////////////////////////////////////////////
    /***************************************外部连接进入判断***************************************/

    /** Des:判断进入连接信息 */
    private initLink() {


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
    protected onData(data: DataBase) {
     
    }

    /********************************************——**********************************************/
    ///////////////////////////////////////////-分界线-///////////////////////////////////////////
    /******************************************销毁自身******************************************/

    destroy()
    {
        this.removeSelf();
        ResManager.$.releaseGroup(ConfigRes.$.defaultLoadRes);
    }

      /********************************************——**********************************************/
    ///////////////////////////////////////////-分界线-///////////////////////////////////////////
}