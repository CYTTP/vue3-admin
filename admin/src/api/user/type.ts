//登录接口参数ts类型
export interface loginForm {
  username: string;
  password: string;
}
// interface dataType {
//   token: string;
// }

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
// //登录接口返回数据类型
// export interface loginResponseData {
//   code: number;
//   data: dataType;
// }
//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string;
}

//定义获取用户信息返回数据类型
export interface userInfoReponseData extends ResponseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    username: string;
    avatar: string;
  };
}
