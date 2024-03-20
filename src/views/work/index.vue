<template>
    <div class="work-page">
        <div class="left">
            <ImageList />
        </div>
        <div class="middle">
            <div class="picture">
                <CanvasBox />
            </div>
            <div class="tool">工具栏</div>
        </div>
        <div class="right">工具信息栏</div>
    </div>
</template>

<script setup lang="ts">
import { ImageList, CanvasBox } from "./components";
</script>

<style scoped>
.work-page {
    height: 100vh;
    display: flex;
    border-top: 1px solid #202121;
    box-sizing: border-box;
    overflow: scroll;
}
.work-page::-webkit-scrollbar {
    display: none;
}
.left {
    width: 166px;
    border-right: 1px solid #202121;
}

.middle {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.picture {
    flex: 1;
    min-height: 0;
    padding: 8px;
    background: #525457;
}

.tool {
    height: 200px;
    background: #a6a9ad;
    border-top: 1px solid #202121;
    flex-shrink: 0;
}

.right {
    width: 200px;
    border-left: 1px solid #202121;
    padding: 8px;
}
</style>
