<template>
    <div class="list">
        <div
            class="imgs-btn"
            v-if="images.length === 0"
            @click="getImageList"
        >
            导入图片资源
        </div>
        <div class="imgs-list" v-else>
            <img
                draggable="true"
                @dragstart="dragImages($event, image)"
                class="img"
                v-for="image in images"
                :key="image"
                :src="image"
            />
            <div class="imgs-btn" @click="getImageList">继续导入</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from "electron";
const images = ref<Array<string>>([]);
function getImageList() {
    ipcRenderer.send("open-images");
}
function dragImages(e: any, url: string) {
    e.dataTransfer.setData("imgUrl", url);
}
// 资源导入
ipcRenderer.on("send-imgurl", (event, msg) => {
    if (images.value.length === 0) {
        images.value = msg;
    } else {
        console.log(msg);
        for (let i = 0; i < msg.length; i++) {
            if (!images.value.includes(msg[i])) {
                images.value.push(msg[i]);
            }
            console.log(i);
        }
    }
});
</script>

<style scoped>
.test {
    background: aqua;
    width: 160px;
    height: 200px;
}

.list {
    padding: 8px;
}

.imgs-btn {
    text-align: center;
    font-size: 14px;
    color: #409eff;
    cursor: pointer;
    text-decoration: underline;
}

.imgs-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.img {
    width: 160px;
    height: 80px;
}
</style>
