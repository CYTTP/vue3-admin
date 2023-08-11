//用户相关的小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type {
  loginForm,
  loginResponseData,
  userInfoReponseData,
} from "@/api/user/type";
import type { UserState } from "./stateType/type";
import "@/utils/token";
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
//引入常量路由
import { constantRoute, asnycRoute, anyRoute } from "@/router/router";
//@ts-ignore
import cloneDeep from "lodash-es/cloneDeep";

import router from "@/router";

//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //硅谷333账号:product\trademark\attr\sku
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}

let useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组
      username: "",
      avatar: "",
      //存储当前用户是否包含某一个按钮
      buttons: [],
    };
  },
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      let res: loginResponseData = await reqLogin(data);
      if (res.code === 200) {
        // console.log(res);
        this.token = res.data as string;
        SET_TOKEN(res.data as string);
        //能保证当前async函数返回一个成功的promise
        return "ok";
      } else {
        return Promise.reject(new Error(res.data));
      }
    },
    //用户信息
    async userInfo() {
      let res: userInfoReponseData = await reqUserInfo();
      if (res.code === 200) {
        this.username = res.data.username;
        this.avatar = res.data.avatar;
        this.buttons = res.data.buttons;
        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asnycRoute),
          res.data.routes
        );
        //菜单需要的数据整理完毕
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        [...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route);
        });
        //判断用户身份
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    //退出登录
    async userLogout() {
      //退出登录请求
      const result: any = await reqLogout();
      // console.log(result);
      if (result.code === 201) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;
