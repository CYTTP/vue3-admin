import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore 忽略当前文件ts类型的检测  （不然打包失败）
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
//svg插件需要配置代码
import "virtual:svg-icons-register";
//引入自定义插件对象:注册整个项目全局组件
import gloalComponent from "@/components";
//引入路由
import router from "./router/index";
import pinia from "./store";
//暗黑模式需要的样式
import "element-plus/theme-chalk/dark/css-vars.css";
//路由鉴权
import "@/permisstion";
import {isHasButton} from "./directive/has";
//引入全局样式
import "@/styles/index.scss";
const app = createApp(App);

//安装自定义插件
app.use(gloalComponent);
app.use(router);
app.use(pinia);
app.use(ElementPlus, {
  locale: zhCn, //国际化配置
});

isHasButton(app)
app.mount("#app");
