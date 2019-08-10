import Browser = laya.utils.Browser;
import { enumDimension, enumScaleType } from './enum';
import { Singleton } from '../core/singleton';

 /**
 * @author Sun
 * @time 2019-08-09 14:01
 * @project SFramework_LayaAir
 * @description 游戏配置信息
 */


/**
 * 界面配置
 */
export class ConfigUI extends Singleton {

    /**默认字体 */
    public defaultFontName: string = '黑体';
    /**默认字体大小 */
    public defaultFontSize: number = 16;
    /**默认加载场景 */
    public defaultMainScene: any = null;
    /**默认加载的Loading页面 */
    public defaultLoadView: any = null;
    /**默认Loading页面的资源信息 */
    public defaultLoadRes: any = null;

    private static instance: ConfigUI = null;
    public static get $():ConfigUI {
        if (!this.instance) this.instance = new ConfigUI();
        return this.instance;
    }

}

/**
 * 声音配置
 */
export class ConfigSound extends Singleton {

    /**背景音开关 */
    public isCloseBGSound = false;
    /**效果音开关 */
    public isCloseEffectSound = false;
    /**所有音效开关 */
    public isCloseVoiceSound = false;
    /**背景音音量 */
    public volumeBGSound = 1;
    /**效果音音量 */
    public volumeEffectSound = 1;
    /**总音量 */
    public volumeVoiceSound = 1;
    /**默认按钮音效 */
    public defaultButtonSound = null;
    /**默认Loading页面的资源信息 */
    private static instance: ConfigSound = null;

    public static get $():ConfigSound {
        if (!this.instance) this.instance = new ConfigSound();
        return this.instance;
    }
}

/**
 * 游戏配置
 */
export class ConfigGame extends Singleton {
 
    /**默认模式信息 2D/3D */
    public dimension: enumDimension = enumDimension.Dim2;
    /**物理开关 */
    public physics:boolean = false;
  
    
    private static instance: ConfigGame = null;
    public static get $():ConfigGame {
        if (!this.instance) this.instance = new ConfigGame();
        return this.instance;
    }
}

/**
 * 版本配置
 */
export class ConfigVersion extends Singleton {
 
    /**版本控制开关 */
    public isOpenVersion:boolean = false;
    /**版本号 */
    public versionNum:number = 0;
    /**版本控制文件名 */
    public versionFloder:string = "Version"+this.versionNum;
    
    private static instance: ConfigVersion = null;
    public static get $():ConfigVersion {
        if (!this.instance) this.instance = new ConfigVersion();
        return this.instance;
    }
}


/**
 * 布局配置
 */
export class ConfigLayout extends Singleton {

    /**设计分辨率X */
    public designWidth: number = 750;
    /**设计分辨率Y */
    public designHeight: number = 1624;
    /**缩放模式 */
    public scaleMode: enumScaleType = enumScaleType.ScaleFixedAuto;

    private static instance: ConfigLayout = null;
    public static get $():ConfigLayout {
        if (!this.instance) this.instance = new ConfigLayout();
        return this.instance;
    }

}


/**
 * Debug配置
 */
export class ConfigDebug extends Singleton {

    /**调试信息开关 */
    public isDebug: boolean = false;
    /**物理辅助线开关 */
    public isPhysicsDebug: boolean = false; 
    /**性能面板开关 */
    public isStat: boolean = false;

    private static instance: ConfigDebug = null;
    public static get $():ConfigDebug {
        if (!this.instance) this.instance = new ConfigDebug();
        return this.instance;
    }

}

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
