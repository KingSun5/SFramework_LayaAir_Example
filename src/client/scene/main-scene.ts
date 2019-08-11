import {CustomScene} from "../../framework/manager/ui/scene-base";
import LyScene = CustomScene.LyScene;

 /**
 * @author Sun
 * @time 2019-08-11 11:20
 * @project SFramework_LayaAir
 * @description 主场景
 *
 */
export class MainScene extends LyScene {
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