import GameConfig from "./GameConfig";
import { Engine } from './framework/runtime/engine';


/**
 * @author Sun
 * @time 2019-08-11 19:05
 * @project SFramework_LayaAir
 * @description 游戏启动入口
 *
 */
class Main {
	constructor()
	{
		Engine.$.run();
	}
}
//激活启动类
new Main();
