import {CustomScene} from "../../framework/manager/ui/scene-base";
import LyScene = CustomScene.LyScene;
import { BgView } from '../view/layer-view/bg-view';
import { Log } from '../../framework/core/log';

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

        this.needLoadRes
            .add("res/bg/123.png", Laya.Loader.IMAGE);
    }
}