import { EventNode } from '../event/event-node';
import { IManager } from '../../interface/i-manager';
import { CustomScene } from '../ui/scene-base';
import LyScene = CustomScene.LyScene;
import { Log } from '../../core/log';
import { ConfigUI } from '../../setting/config';
import { ILoaing } from '../../interface/i-Loading';


/**
 * @author Sun
 * @time 2019-08-09 23:22
 * @project SFramework_LayaAir
 * @description  场景管理器
 *
 */
export class SceneManager extends EventNode implements IManager {

  
    constructor() {
        super();
        if (SceneManager.mInstance == null) SceneManager.mInstance = this;
    }

    private mScenes: Map<any, LyScene> = new Map<any, LyScene>();
    private static mInstance: SceneManager = null;
    public loadingView: any = null;

    public static get $(): SceneManager {
        if (this.mInstance == null) new SceneManager();
        return this.mInstance;
    }

    private mCurScene: LyScene = null;

    public currentScene(): LyScene {
        return this.mCurScene;
    }

    /**
     * 显示loading页面
     */
    public showLoadingView():any {
        if (this.loadingView == null) {
            let scrpt = ConfigUI.$.defaultLoadView;
            if (scrpt != undefined) {
                this.loadingView = new scrpt();
                this.loadingView.zOrder = 2100;
                Laya.stage.addChild(this.loadingView);
            }
        }
        return this.loadingView;
    }

    /**
     * 隐藏loading页面
     */
    public hideLoadingView() {
        if (this.loadingView != null) {
            this.loadingView.removeSelf();
        }
    }

    public onLoading(progress: number) {
        if (this.loadingView != null) {
            let view = this.loadingView as ILoaing;
            view.onProgress(progress);
        }
    }

    
    /**
     * 跳转场景
     * @param script
     * @param param 参数
     */
    public goToScene(script: any, param: any = null) {

        if (!this.mScenes.has(script)) {
            if (this.mCurScene != null) {
                this.mCurScene.leave();
                this.mCurScene.destroy();
                this.mScenes.delete(script);
            }
            let scene: LyScene = new script();
            this.mScenes.set(script, scene);
            this.mCurScene = scene;
            Laya.stage.addChild(scene);
            this.mCurScene.enter(param);
        } else {
            let scene = this.mScenes.get(script);
            if (scene == this.mCurScene) {
                Log.error("当前场景与目标场景一样无法重新进入这个场景");
                return
            } else {
                if (this.mCurScene != null) {
                    this.mCurScene.leave();
                    this.mCurScene = this.mScenes.get(script);
                    this.mCurScene.enter(param);
                }
            }
        }

    }


    destroy(): void {
    }

    setup(): void {
    }
    update(): void {
    }

}

