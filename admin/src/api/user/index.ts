import request from "@/utils/request";
import { loginForm, loginResponseData, userInfoReponseData } from "./type";
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}
 
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
//获取用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL);
//退出登录
export const reqLogout = () => request.get<any, any>(API.LOGOUT_URL);
