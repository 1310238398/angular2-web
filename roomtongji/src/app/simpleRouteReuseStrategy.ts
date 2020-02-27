import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { Injectable } from '@angular/core';

interface ICachedRoute {
    handle: DetachedRouteHandle;
    data: IRouteConfigData;
}
interface IRouteConfigData {
    reuse: boolean;
}
@Injectable()
export class SimpleRouteReuseStrategy implements RouteReuseStrategy {
    private static currentDelete: string;
    private static willDelete: string;
    private static cacheRouters = new Map<string, ICachedRoute>();
    /** 用于删除路由快照*/
    public static deleteRouteSnapshot(url: string): void {
        if (url[0] === '/') {
            url = url.substring(1);
        }
        url = url.replace('/', '_');
        if (SimpleRouteReuseStrategy.cacheRouters.has(url)) {
            SimpleRouteReuseStrategy.cacheRouters.delete(url);
            SimpleRouteReuseStrategy.currentDelete = url;
        } else {
            SimpleRouteReuseStrategy.willDelete = url;
        }
    }

    deleteCacheRouters(): void {
        SimpleRouteReuseStrategy.cacheRouters.clear();
        console.log('cache' + SimpleRouteReuseStrategy.cacheRouters.values());
    }

    // 是否允许复用路由
    // 可以增加过滤逻辑，或在增加自定义路由配置字段
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // debugger;
        if (route.data && route.data.reuse) {
            return route.data.reuse;
        }
        return false;
    }

    // 路由离开时触发
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        SimpleRouteReuseStrategy.cacheRouters[route.routeConfig.path] = handle;
    }

    // 是否允许还原路由
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!SimpleRouteReuseStrategy.cacheRouters[route.routeConfig.path];
    }

    // 获取存储路由
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) {
            return null;
        }
        if (route.routeConfig.loadChildren) return null;
        return SimpleRouteReuseStrategy.cacheRouters[route.routeConfig.path];
    }
    // 进入路由触发，是否同一路由时复用路由
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

    private getRouteData(route: ActivatedRouteSnapshot): IRouteConfigData {
        return route.routeConfig && route.routeConfig.data as IRouteConfigData;
    }

    private addRedirectsRecursively(route: ActivatedRouteSnapshot): void {
        const config = route.routeConfig;
        if (config) {
            if (!config.loadChildren) {
                const routeFirstChild = route.firstChild;
                const routeFirstChildUrl = routeFirstChild ? this.getRouteUrlPaths(routeFirstChild).join('/') : '';
                const childConfigs = config.children;
                if (childConfigs) {
                    const childConfigWithRedirect = childConfigs.find(c => c.path === '' && !!c.redirectTo);
                    if (childConfigWithRedirect) {
                        childConfigWithRedirect.redirectTo = routeFirstChildUrl;
                    }
                }
            }
            route.children.forEach(childRoute => this.addRedirectsRecursively(childRoute));
        }
    }
    private getFullRouteUrl(route: ActivatedRouteSnapshot): string {
        return this.getFullRouteUrlPaths(route).filter(Boolean).join('/').replace('/', '_');
    }

    private getFullRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
        const paths = this.getRouteUrlPaths(route);
        return route.parent ? [...this.getFullRouteUrlPaths(route.parent), ...paths] : paths;
    }

    private getRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
        return route.url.map(urlSegment => urlSegment.path);
    }


}
