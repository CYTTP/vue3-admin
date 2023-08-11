<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <!-- 登录的表单 -->
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>佬芋头管理平台</h1>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username" name="username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" name="password" :prefix-icon="Lock" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
//引入获取当前时间的函数
import { getTime } from '@/utils/time';
//引入用户相关的小仓库
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
//获取路由器
let $router = useRouter();
//路由对象
let $route = useRoute();
//获取el-form组件
let loginForms = ref();
//定义变量控制按钮加载效果
let loading = ref(false);
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: 'atguigu123' });
// onMounted(() => {
//     const button = document.querySelector('button') as HTMLButtonElement;
//     console.log(button);


//     document.addEventListener('mousemove', evevt => {
//         if (loginForm.username && loginForm.password) {
//             return;
//         }

//         const radius = Math.max(button.offsetWidth * 0.75, button.offsetHeight * 0.75, 100)

//         button.style.transition = `all 0.1s ease`;
//         button.style.transform = `translate(5px,10px) rotateX(60deg) rotateY(60deg)`
//     })
// })
//距离
// const distanceBetween = (p1x: number, p1y: number, p2x: number, p2y: number) => {
//     const dx = p1x - p2x;
//     const dy = p1y - p2y;
//     return Math.sqrt(dx * dx + dy * dy)
// }

const login = async () => {
    //保证全部表单相校验通过再发请求
    await loginForms.value.validate();
    //加载效果:开始加载
    loading.value = true;
    try {
        await userStore.userLogin(loginForm);
        //编程式导航跳转到展示数据首页
        //判断登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页
        let redirect: any = $route.query.redirect;
        $router.push({ path: redirect || '/' });
        // $router.push('/');
        ElNotification({
            type: 'success',
            message: '登录成功',
            title: `Hi,${getTime()}好!`
        })
        //登录成功加载效果也消失
        loading.value = false;
    } catch (error) {
        //登录失败加载效果消息
        loading.value = false;
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
}

//自定义校验规则函数
const validatorUserName = (_rule: any, value: any, callback: any) => {
    //rule:即为校验规则对象
    //value:即为表单元素文本内容
    //函数:如果符合条件callBack放行通过即为
    //如果不符合条件callBack方法,注入错误提示信息
    if (value.length >= 5) {
        callback();
    } else {
        callback(new Error('账号长度至少五位'));
    }
}
const validatorPassword = (_rule: any, value: any, callback: any) => {
    if (value.length >= 6) {
        callback();
    } else {
        callback(new Error('密码长度至少六位'));
    }
}
//定义表单校验需要配置对象
const rules = {
    //规则对象属性:
    //required,代表这个字段务必要校验的
    //min:文本长度至少多少位
    //max:文本长度最多多少位
    //message:错误的提示信息
    //trigger:触发校验表单的时机 change->文本发生变化触发校验,blur:失去焦点的时候触发校验规则
    username: [
        // { required: true, min: 6, max: 10, message: '账号长度至少六位', trigger: 'change' }
        { trigger: 'change', validator: validatorUserName }
    ],
    password: [
        // { required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'change' }
        { trigger: 'change', validator: validatorPassword }
    ]
}


</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url("@/assets/images/login_form.png") no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
            margin: 20px 20px;
            text-align: center;
        }


        .login_btn {
            width: 100%;
        }
    }
}
</style>