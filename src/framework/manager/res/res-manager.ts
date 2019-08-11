import Handler = Laya.Handler;
import { EventNode } from '../event/event-node';
import { IManager } from '../../interface/i-manager';
import { Dictionary } from '../../structure/dictionary';
import { Log } from '../../core/log';
import { ResItem } from './res-item';
import { UtilTime } from '../../util/time';
import { ResGroup } from './res-group';
import { ResLoaded } from './res-loaded';
import { SceneManager } from '../scene/scene-manager';
import { enumClearStrategy, enumArraySortOrder } from '../../setting/enum';
import { UtilArray } from '../../util/array';


/**
 * @author Sun
 * @time 2019-08-09 19:12
 * @project SFramework_LayaAir
 * @description  资源管理
 *
 */
export class ResManager extends EventNode implements IManager {

   
    constructor() {
        super();
        if (ResManager.mInstance == null) ResManager.mInstance = this
    }

    private m_oldRes: Array<string> = new Array<string>();
    // 通过场景加载器加载的资源
    private m_dictResItem: Map<string, ResItem> = new Map<string, ResItem>();
    // 手工加载的资源
    private m_dictResManual: Dictionary<ResLoaded> = null;
    // 手工加载的资源组名
    private m_manualGroup: string = 'manual';


    private static mInstance: ResManager = null;
    public static get $(): ResManager {
        if (this.mInstance == null) new ResManager();
        return this.mInstance;
    }

    public setup(): void {
        this.m_dictResManual = new Dictionary<ResLoaded>();
    }

    update(): void {
       
    }

    public destroy(): void {
        if (this.m_dictResManual) {
            this.m_dictResManual.clear();
            this.m_dictResManual = null;
        }
    }

    /**
     * 更新资源使用时间
     * @param url 
     * @param is_create 
     */
    private refreshTime(url: string, is_create: boolean) {
        if (is_create) {
            let loader_info: ResLoaded = this.m_dictResManual.value(url);
            if (!loader_info) {
                loader_info = new ResLoaded(url);
                this.m_dictResManual.add(url, loader_info);
            } else
                loader_info.ctime = UtilTime.timeSinceStartup;
        } else {
            let loader_info: ResLoaded = this.m_dictResManual.value(url);
            if (loader_info) {
                loader_info.utime = UtilTime.timeSinceStartup;
            }
        }
    }


    /**
     * 通过URL获取资源
     * @param url
     */
    public getRes(url: string) {
        this.refreshTime(url, false);
        return Laya.loader.getRes(url);
    }

    /**
     * 加载主场景资源包
     * @param loads 资源组
     */
    public loadGroup(loads: ResGroup) {

        let urls: Array<any> = new Array<any>();
        loads.needLoad.forEach(element => {
            urls.push({url: element.url, type: element.type})
        });

        Laya.loader.load(urls, Handler.create(this, (success: boolean) => {
          
            if (success) {

                SceneManager.$.loadingView.onCompleted();
                
                for (let index = 0; index < loads.needLoad.length; index++) {
                    let info = loads.needLoad[index];
                    if (!this.m_dictResItem.has(info.url)) {
                        this.m_dictResItem.set(info.url, info);
                    }
                }
                if (loads.finish != null) {
                    loads.finish.invoke();
                }
            } else {
                Log.error("Load Resource Error：");
                Log.debug(urls);
            }
        }), Handler.create(this, (progress: number) => {
            loads.progress = progress * 100;
            SceneManager.$.onLoading(loads.progress);
            if (loads.loadItem != null) {
                loads.loadItem.invoke();
            }
        }, null, false));

    }

    /**
     * 释放资源
     * @param forced 是否强制释放所有
     */
    public pop(forced = false) {
        if (forced) {
            this.m_oldRes.splice(0, this.m_oldRes.length)

            this.m_dictResItem.forEach((v: ResItem, key: string) => {
                this.m_oldRes.push(key)
            });
        }
        while (this.m_oldRes.length > 0) {
            let url = this.m_oldRes.pop()
            let info = this.m_dictResItem.get(url)
            if (info != null) {
                this.m_dictResItem.delete(info.url)
            }
            Laya.loader.clearRes(url)

        }

        if (forced) {
            this.m_dictResItem.clear()
        } else {

        }
    }

    /**
     * 压入要释放的资源
     */
    public push() {
        this.m_dictResItem.forEach((v: ResItem, key: string) => {
            if (!v.isKeepMemory)
                this.m_oldRes.push(key)
        });
    }


    /**
     * 释放资源
     * @param    type    释放策略
     */
    public clearUnused(type: enumClearStrategy): void {
        this.clear(type);
    }

    /**
     * 释放指定资源
     * @param    url    资源路径
     */
    public clearRes(url: string): any {
        this.m_dictResManual.remove(url);
        Laya.loader.clearRes(url);
        Log.info("[res]释放资源:" + url);
    }

    private clear(type: enumClearStrategy): void {
        switch (type) {
            case enumClearStrategy.ALL: {
                for (let key in this.m_dictResManual) {
                    Laya.loader.clearRes(key);
                }
                this.m_dictResManual.clear();
                Log.info("[res]释放所有资源");
            }
                break;
            case enumClearStrategy.FIFO: {
                let list: Array<ResLoaded> = this.m_dictResManual.values();
                UtilArray.sort(list, "ctime", enumArraySortOrder.Ascending);
                for (let i = 0; i < list.length * 0.5; ++i) {
                    this.clearRes(list[i].url);
                }
            }
                break;
            case enumClearStrategy.FILO: {
                let list: Array<ResLoaded> = this.m_dictResManual.values();
                UtilArray.sort(list, "ctime", enumArraySortOrder.Descending);
                for (let i = 0; i < list.length * 0.5; ++i) {
                    this.clearRes(list[i].url);
                }
            }
                break;
            case enumClearStrategy.LRU: {
                let list: Array<ResLoaded> = this.m_dictResManual.values();
                UtilArray.sort(list, "utime", enumArraySortOrder.Ascending);
                for (let i = 0; i < list.length * 0.5; ++i) {
                    this.clearRes(list[i].url);
                }
            }
                break;
            case enumClearStrategy.UN_USED: {
                //TODO
            }
                break;
        }
    }


    /**
     * 加载资源
     * @param    url        单个资源地址
     * @param    type        资源类型
     * @param    complete    结束回调(参数：string 加载的资源url)
     * @param    progress    进程回调(参数：string 加载的资源url)
     * @param    priority    优先级，0-4，5个优先级，0优先级最高，默认为1。
     * @param    cache        是否缓存加载结果。
     * @param    ignoreCache 是否忽略缓存，强制重新加载
     */
    public loadManual(url: string,
                      type: string = "",
                      complete: any = null,
                      progress: any = null,
                      priority: number = 1,
                      cache: boolean = true,
                      ignoreCache: boolean = false): void {

        this.refreshTime(url, true);
        Laya.loader.load(
            url,
            complete,
            progress,
            // Laya.Handler.create(this, complete, [url]),
            // Laya.Handler.create(this, progress, [1], false),
            type,
            priority,
            cache,
            this.m_manualGroup,
            ignoreCache);
    }

    /**
     * 加载资源组
     * @param    url        需要加载的资源数组
     * @param    complete    结束回调(参数：string 加载的资源url)
     * @param    priority    优先级，0-4，5个优先级，0优先级最高，默认为1。
     * @param    cache        是否缓存加载结果。
     * @param    ignoreCache 是否忽略缓存，强制重新加载
     */
    public loadManualAny(url: Array<{ url: string, type: string }>,
                         complete: any = null,
                         progress: any = null,
                         priority: number = 1,
                         cache: boolean = true,
                         ignoreCache: boolean = false): void {
        let has_unload: boolean = false;
        let assets = [];
        let urls = [];
        for (let res of url) {
            assets.push({url: res.url, type: res.type});
            urls.push(res.url);
            //判断是否有未加载资源
            if (!has_unload && !Laya.loader.getRes(res.url)) has_unload = true;
            //添加到加载目录
            this.refreshTime(res.url, true);
        }

        Laya.loader.load(
            assets,
            complete,
            progress,
            undefined,
            priority,
            cache,
            this.m_manualGroup,
            ignoreCache);
    }

}

