<template>
    <div class="work-page">
        <div class="left">
            <ImageList />
        </div>
        <div class="middle">
            <div
                class="picture"
                @drop="dropImage"
                @dragover="imgOver"
            ></div>
            <div class="tool">工具栏</div>
        </div>
        <div class="right">工程信息预览</div>
    </div>
</template>

<script setup lang="ts">
import { ImageList } from "./components";

function dropImage(event: any) {
    const url = event.dataTransfer.getData("imgUrl");
}

function imgOver(e: any) {
    e.preventDefault();
}
</script>

<style scoped>
.work-page {
    height: 100vh;
    display: flex;
}

.left {
    width: 166px;
}

.middle {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.picture {
    flex: 1;
    background: red;
}

.tool {
    height: 200px;
    background: #cccccc;
}

.right {
    width: 200px;
    background: aqua;
}
</style>
