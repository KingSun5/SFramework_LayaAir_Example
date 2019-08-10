import { ResGroup } from '../res/res-group';
import { ResManager } from '../res/res-manager';
import { Log } from '../../core/log';
import { TimerManager } from '../timer/timer-manager';

export module CustomScene{

    /**
     * @author Sun
     * @time 2019-08-09 19:12
     * @project SFramework_LayaAir
     * @description  Scene的基类
     *
     */
    export class LyScene extends Laya.Scene {

        /**
         * 内嵌模式空的场景资源，必须实现这个createView，否则有问题
         */
        public static  uiView:any ={"type":"Scene","props":{"width":1334,"height":750},"loadList":[],"loadList3D":[]};


        /**
         * 场景第一个加载的窗口
         */
        protected firstWind: any = null;
        /**
         * 场景依赖的资源组
         */
        public needLoadRes: ResGroup;

        private m_param: any;
        private m_loaded = false;

        public sceneTimers: Array<number> = new Array<number>();

        public constructor() {
            super();
            this.needLoadRes = new ResGroup();
            this.needLoadRes.onCompletion(this.loaded, this);
        }

        createChildren():void {
            super.createChildren();
            this.createView(LyScene.uiView);
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
        }


        public enter(param: any) {

            ResManager.$.push();
            // UIManager.$.hideAllWin();

            this.m_loaded = false;
            this.m_param = param;
            this.onInit(param);

            ResManager.$.loadGroup(this.needLoadRes);
        }

        public leave() {
            this.onLeave();
            this.destroy();
        }

        public destroy(): void {
            this.onClean();
            this.sceneTimers.forEach((timer: number) => {
                TimerManager.$.removeTimer(timer);
            })
            super.destroy();
        }


        /**
         * 加载完成
         * @param error 加载错误
         */
        protected loaded(error) {

            if (error != null) {
                // console.error(error);
                Log.error(error)
            } else {
                this.onLoaded();
                this.m_loaded = true;
                this.chechEnter();
            }

        }


        private chechEnter() {
            if (this.m_loaded) {
                // UIManager.$.hideAllWin(true);
                ResManager.$.pop();
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
        protected onLoaded() {

        }

        /**
         * 场景初始化
         * @param param 参数
         */
        protected onInit(param: any) {

        }

        /**
         * 进入场景
         */
        protected onEnter(param: any): void {

        }


        /**
         * 逐帧循环
         */
        public update(): void {

        }

        /**
         * 离开场景
         */
        protected onLeave(): void {

        }

        /**
         * 当场景被销毁的时候
         */
        protected onClean(): void {

        }

    }
}