import { Singleton } from '../../framework/core/singleton';
import {ConfigData, ConfigRes} from "../../framework/setting/config";
import {JsonTemplate} from "../../framework/manager/json/json-template";
import {enumJsonDefine} from "../../framework/setting/enum";
import { Log } from '../../framework/core/log';

/**
 * @author Sun
 * @time 2019-10-16 21:28
 * @project SFramework_LayaAir
 * @description 手动修改的游戏配置 （不直接修改framework 保持框架的整洁）
 */
export class GameSetting extends Singleton{

    private static instance: GameSetting = null;
    public static get $(): GameSetting {
        if (!this.instance) this.instance = new GameSetting();
        return this.instance;
    }

    constructor()
    {
        super();
    }
    
    init(){
         //手动配置Json文件 json 必须执行在ConfigRes之前
        ConfigData.$.jsonTemplateList = [
            new JsonTemplate("res/data/InviteData.json", enumJsonDefine.invite),
            new JsonTemplate("res/data/LevelData.json", enumJsonDefine.level),
            new JsonTemplate("res/data/OfflineData.json", enumJsonDefine.offline),
            new JsonTemplate("res/data/TurntableData.json", enumJsonDefine.lottery),
        ];
        //手动配置loading资源
        ConfigRes.$.defaultLoadRes
            .add("res/loading/img_loading_bg.png",Laya.Loader.IMAGE)
            .add("res/loading/progress_loading.png",Laya.Loader.IMAGE)
            .add("res/loading/img_8r.png",Laya.Loader.IMAGE);
        //手动配置主页资源
        ConfigRes.$.defaultMainRes
            .add("res/atlas/res/main/effect.atlas", Laya.Loader.ATLAS)
            .add("res/atlas/res/com.atlas", Laya.Loader.ATLAS)
            .add("res/com/img_lottery_border.png", Laya.Loader.IMAGE)
            .add("res/com/img_lottery_content.png", Laya.Loader.IMAGE)
            .add("res/main/bg/bg.png", Laya.Loader.IMAGE)
    }

}