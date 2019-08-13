import { ui } from '../../../ui/layaMaxUI';
import lotteryUI =  ui.view.com.lotteryUI;
import { ResManager } from '../../../framework/manager/res/res-manager';
import { JsonManager } from '../../../framework/manager/json/json-manager';
import {enumJsonDefine } from  '../../../framework/setting/enum';
import { UtilMath } from '../../../framework/util/math';
import { Log } from '../../../framework/core/log';
import { UtilString } from '../../../framework/util/string';

/**
 * @author Sun
 * @time 2019-08-12 17:31
 * @project SFramework_LayaAir
 * @description 转盘模板
 *
 */
export class LotteryView extends lotteryUI {

  /****************************************主页面属性设置****************************************/

  /** Des:倍率 */
  private rewardMul:number = 2;
  /** Des:转盘数据 */
  private lotteryData:any = null;


  /********************************************——**********************************************/
  ////////////////////////////////////////////分界线////////////////////////////////////////////
  /****************************************主页面生命周期****************************************/


  private static instance: LotteryView

  public static get $(): LotteryView {
      if (this.instance==null) this.instance = new LotteryView();
      return this.instance;
  }

  constructor() {
      super();
  }



  onAwake(): void {
      super.onAwake();
      this.init();
  }

  close(): void {
      super.close();
  }

  /********************************************——**********************************************/
  ////////////////////////////////////////////分界线////////////////////////////////////////////
  /****************************************主页面初始数据****************************************/


  private init()
  {
      this.lotteryData = JsonManager.$.getTable(enumJsonDefine.lottery)
      this.btnConfirm.on(Laya.Event.CLICK,this,this.onBtnStart);
  }


  /********************************************——**********************************************/
  ////////////////////////////////////////////分界线////////////////////////////////////////////
  /****************************************主页面点击事件****************************************/

  onBtnStart() {

      let random = UtilMath.random(1,100);

      for (let i = 0; i < 6; i++) {
         if (this.lotteryData[i].rangeMin<=random&&random<=this.lotteryData[i].rangeMax){
             this.rewardMul = this.lotteryData[i].reward;
             this.onTurning(i);
             break;
         }
      }
  }


  /********************************************——**********************************************/
  ////////////////////////////////////////////分界线////////////////////////////////////////////
  /*****************************************转盘动画显示*****************************************/

  private onTurning(reward: number = 0) {

      //关闭关闭按钮显示
      this.btnClose.visible = false;
      //禁用转盘按钮
      this.btnConfirm.mouseEnabled = false;
      //转盘动画
      let aCount = Object.keys(this.lotteryData).length;

      let cIndex = reward;
      let perDeg = 360 / aCount;
      let curDeg = (360 - perDeg * (cIndex - 1)) + UtilMath.randRangeInt(-perDeg / 2, perDeg / 2);

      this.imgContext.rotation = 0;
      let dstRotation = 3600 + curDeg;
      Laya.Tween.to(this.imgContext, {
          rotation: dstRotation,
      }, 6000, Laya.Ease.strongOut, Laya.Handler.create(this, ()=>{

      this.btnConfirm.mouseEnabled = true;
      this.btnClose.visible = true;
      Log.log("倍率："+this.rewardMul);

      }), 0, false, false);
  }





}
