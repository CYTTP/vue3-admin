<template>
    <div class="container" @dragstart="onDragStart" @dragover="onDragOver" @dragenter="onDragEnter" @drop="ondrop">

        <div class="classBox" data-drop="move">
            <div class="item" v-for="(item, index) in classArr" :key="index" draggable="true" data-effect="copy">{{ item }}
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>时间</th>
                    <th v-for="day in days" :key="day">{{ day }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(timeSlot, timeIndex) in timeSlots" :key="timeIndex">
                    <td class="items">{{ timeSlot }}</td>
                    <td data-drop="copy" class="items"></td>
                    <td data-drop="copy" class="items"></td>
                    <td data-drop="copy" class="items"></td>
                    <td data-drop="copy" class="items"></td>
                    <td data-drop="copy" class="items"></td>
                </tr>
            </tbody>
        </table>


    </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue';

const days = ref(["星期一", "星期二", "星期三", "星期四", "星期五"]);
const timeSlots = ref(["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"])
const classArr = ref(['数学', '语文', '英语', '物理', '生物', '化学', '历史', '政治', '地理'])

let source = ref();
// const container = document.querySelector('.container') as Element;

const onDragStart = (e: any) => {
    e.dataTransfer.effectAllowed = e.target.dataset.effect;
    source.value = e.target;
}

const onDragOver = (e: any) => {
    e.preventDefault();
}

const onDragEnter = (e: any) => {
    clearDropStyle();
    const dropNode = getDropNode(e.target);
    if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
        //使该节点能够接受目的拖拽的节点
        e.target.classList.add('drag-over')
    }

}

const ondrop = (e: any) => {
    clearDropStyle();
    const dropNode = getDropNode(e.target);
    console.log(typeof dropNode);
    if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
        if (dropNode.dataset.drop === 'copy') {
            dropNode.innerHTML = '';
            const cloned = source.value.cloneNode(true);
            cloned.dataset.effect = 'move';
            dropNode.appendChild(cloned)
        } else {
            source.value.remove()
        }
    }
}

//清除之前的样式
const clearDropStyle = () => {
    document.querySelectorAll('.drag-over ').forEach(node => {
        node.classList.remove('drag-over');
    })
}

const getDropNode = (node: any) => {
    while (node) {
        if (node.dataset.drop) {
            return node;
        }
        node = node.parentNode;
    }

}

</script>

<style>
.text {
    color: black;
    font-size: 30px;
    text-align: center;
    margin: 10px 10px;
}

.container {
    display: flex;
    justify-content: space-around;
}

table {
    /* width: 100%; */
    margin: 0 auto;
}

th,
td {
    padding: 8px;
    text-align: center;
    border: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}


.items {
    width: 100px;
}

.classBox {
    /* width: 100px; */
    height: 40px;
    /* border: #ddd 1px solid; */
    margin: 30px 30px;
    background: #ddd;

}

.item {
    width: 90px;
    height: 40px;
    background: skyblue;
    color: black;
    list-style: none;
    /* margin-top: 5px; */
    text-align: center;
    border: #f2f2f2 1px solid;
    line-height: 40px;
    cursor: pointer;
}

.item:hover {
    background: blue;
}

.drag-over {
    background: gray;
}
</style>