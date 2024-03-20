<template>
    <canvas id="canvas" @drop="dropImage" @dragover="imgOver" />
</template>

<script setup lang="ts">
interface ImgInfo {
    url: string;
    offsetX: number;
    offsetY: number;
}
const imgList = ref<Array<ImgInfo>>([]);
// 拖入图片
function addImage(target: ImgInfo) {
    const canvasDom = document.getElementById("canvas") as any;
    const ctx = canvasDom.getContext("2d");
    const img = new Image();
    img.onload = function () {
        ctx.drawImage(
            img,
            target.offsetX - 100,
            target.offsetY - 100,
            200,
            200
        );
    };
    img.src = target.url;
}
function dropImage(event: any) {
    const url = event.dataTransfer.getData("imgUrl");
    imgList.value.push({
        url,
        offsetX: event.offsetX,
        offsetY: event.offsetY,
    });
}
function imgOver(e: any) {
    e.preventDefault();
}
// 画布尺寸自适应
function getCanvasWH() {
    nextTick(() => {
        const canvasDom = document.getElementById("canvas") as any;
        canvasDom.width = canvasDom?.clientWidth;
        canvasDom.height = canvasDom?.clientHeight;
        if (imgList.value.length !== 0) {
            for (let i = 0; i < imgList.value.length; i++) {
                addImage(imgList.value[i]);
            }
        }
    });
}
getCanvasWH();
window.addEventListener("resize", () => {
    getCanvasWH();
});
watch(imgList.value, () => {
    getCanvasWH();
});
</script>

<style scoped>
#canvas {
    width: 100%;
    height: 100%;
    background: white;
}
</style>
