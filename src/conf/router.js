import React,{Fragment} from "react";
import history from './history';
import store_basic from '../data/store-basic';
import {Provider} from 'react-redux';
import {Switch, Router, Route} from 'react-router-dom';
import route_conf from './route-conf';
import GlobalStyle from './reset-style';


/**
 * 渲染路由
 * @param routeContainer
 * @param routeItem
 * @param routeContextPath
 */
function renderRoute(routeContainer,routeItem,routeContextPath){
    const routeChildren = [];
    let routePath;
    if (!routeItem.path) {
        console.error('route must has `path`');
    } else if (routeItem.path === '/' || routeItem.path === '*') {
        routePath = routeItem.path;
    } else {
        routePath = `/${routeContextPath}/${routeItem.path}`.replace(/\/+/g, '/');
    }

    // 优先使用当前定义的 layout
    if(routeItem.layout && routeItem.component){
        routeChildren.push(
            <Route
                key={routePath}
                exact
                path={routePath}
                render={(props) => {
                    return React.createElement(routeItem.layout,props,React.createElement(routeItem.component, props));
                }}
            />
        );
    }else if(routeContainer && routeItem.component){
        // 使用上层节点作为 container
        routeChildren.push(
            <Route
                key={routePath}
                exact
                path={routePath}
                render={(props) => {
                    return React.createElement(routeContainer,props,React.createElement(routeItem.component, props));
                }}
            />
        );
    }else{
        routeChildren.push(
            <Route
                key={routePath}
                exact
                path={routePath}
                component={routeItem.component}
            />
        );
    }
    return routeChildren;
};

/**
 * 递归将路由信息扁平化，继承上一级路由的 path
 * @param {Array} config 路由配置
 */
function recursiveRouteConfig(config = []){
    const routeArray = [];
    config.forEach((item)=>{
        const route = {
            path:item.path,
            layout:item.layout,
            component:item.component
        };
        if(Array.isArray(item.children)){
            route.childRoutes = recursiveRouteConfig(item.children);
        }
        routeArray.push(route);
    });
    return routeArray;
};


/**
 * 将扁平化后的路由信息生成 Route 节点
 * @param {Element} container 路由容器
 * @param {object} router 路由对象
 * @param {string} contextPath 上层路由地址
 * @return {Route}
 * @example
 * <Switch>
 *   <Route exact path="/" component={Home} />
 *   <Route exact path="/page3" component={Page3} />
 *   <Route exact path="/page4" component={Page4} />
 *   <Route exact path="/page3/:id" component={Page3} />
 *   <Route exact component={NotFound} />
 * </Switch>
 */
function renderRouterConfig(container,routeArray,contextPath){
    const routeChildren = [];
    routeArray.forEach((r)=>{
        let routes = renderRoute(container,r,contextPath);
        routeChildren.push(...routes);
    });
    return <Switch>{routeChildren}</Switch>;
};

export default <Provider store={store_basic}><Fragment><GlobalStyle/><Router history={history}>{renderRouterConfig(null,recursiveRouteConfig(route_conf),'/')}</Router></Fragment></Provider>;
