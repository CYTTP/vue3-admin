<template>
    <el-card>
        <div class="box">
            <img :src="userStore.avatar" alt="" class="avatar">
            <div class="bottom">
                <h3 class="title">{{ getTime() }}好呀！{{ userStore.username }}</h3>
                <p class="subtitle">今天准备做什么呢？</p>
            </div>
        </div>
    </el-card>
    <div class="bottoms">
        <!-- <svg-icon name="welcome" width="600px" height="300px"></svg-icon> -->
        <div class="bt-box">
            <div class="bubbles">
                <div class="bubble"></div>
            </div>
        </div>
        <svg style="display: none;">
            <defs>
                <filter id="blob">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                    <feColorMatrix in="blur" mode="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 20 -10">
                    </feColorMatrix>
                </filter>
            </defs>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { getTime } from '@/utils/time';
//引入用户相关的仓库,获取当前用户的头像、昵称
import useUserStore from '@/store/modules/user';
//获取存储用户信息的仓库对象
let userStore = useUserStore();

const n = ref(10); //一次生产多少泡泡


onMounted(() => {
    userStore.userInfo();

    const bubbles = document.querySelector('.bubbles') as Element;
    bubbles.addEventListener('animationend', e => {
        e.target?.remove()
    })
    const createBubbles = () => {
        const vw = document.querySelector('.bottoms')?.clientWidth as number;
        for (let index = 0; index < n.value; index++) {
            const bubbleElement: HTMLDivElement = document.createElement('div');
            bubbleElement.className = 'bubble';
            const s: number = Math.random() * 100 + 50;
            const x: number = Math.random() * (vw - s);
            const d: number = Math.random() * 2 + 1;
            bubbleElement.style.setProperty('--x', `${x}px`)
            bubbleElement.style.setProperty('--s', `${s}px`)
            bubbleElement.style.setProperty('--d', `${d}s`)
            nextTick(() => {
                bubbles.appendChild(bubbleElement)
            })
        }
    }
    setInterval(createBubbles, 500);
})

</script>
<style>
.box {
    display: flex;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.bottom {
    margin-left: 20px;
}

.title {
    font-size: 30px;
    font-weight: 900;
    margin-bottom: 30px;
}

.subtitle {
    font-style: italic;
    color: skyblue;
}

/* 动画部分 */
.bottoms {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    /* border: 1px solid black; */
    height: 625px;
    position: relative;
}

.bt-box {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 200px;
    width: 100%;
    background: #fff;
}

.bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1em;
    filter: url(#blob);
    background: inherit;
}

.bubble {
    position: absolute;
    --x: 100px;
    --s: 50px;
    --d: 2s;
    border-radius: 50%;
    background: #f1f0f0;
    width: var(--s);
    height: var(--s);
    left: var(--x);
    top: 30px;
    animation: bubbling var(--d) ease-in forwards;
}

@keyframes bubbling {
    75% {
        transform: scale(1);
    }

    to {
        transform: scale(0);
        top: -200px;
    }
}
</style>
<!-- <style scoped lang="scss">
.box {
    display: flex;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .bottom {
        margin-left: 20px;

        .title {
            font-size: 30px;
            font-weight: 900;
            margin-bottom: 30px;
        }

        .subtitle {
            font-style: italic;
            color: skyblue;
        }
    }
}
</style> -->