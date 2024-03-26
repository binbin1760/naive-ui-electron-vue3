<template>
    <canvas
        id="canvas"
        @drop="dropImage"
        @dragover="imgOver"
        @click="canvasPointerLaction"
    />
</template>

<script setup lang="ts">
interface ImgInfo {
    url: string;
    offsetX: number;
    offsetY: number;
    zIndex: number;
    width: number;
    height: number;
    isSelect: boolean;
}
const imgList = ref<Array<ImgInfo>>([]);
// 拖入图片
function selectStyle() {}
function addImage(target: ImgInfo) {
    const canvasDom = document.getElementById("canvas") as any;
    const ctx = canvasDom.getContext("2d");
    const img = new Image();
    img.onload = function () {
        ctx.drawImage(
            img,
            target.offsetX - 100,
            target.offsetY - 100,
            target.width,
            target.height
        );
    };
    img.src = target.url;
    // 选中绘制
}
function dropImage(event: any) {
    const url = event.dataTransfer.getData("imgUrl");
    imgList.value.push({
        url,
        offsetX: event.offsetX,
        offsetY: event.offsetY,
        zIndex: imgList.value.length,
        width: 200,
        height: 200,
        isSelect: false,
    });
}
function imgOver(e: any) {
    e.preventDefault();
}
// 图片定位
function canvasPointerLaction(e) {
    if (imgList.value.length > 0) {
        const targetArry = imgList.value.filter((item: ImgInfo) => {
            return (
                item.offsetX - 100 < e.offsetX &&
                item.offsetX + 100 > e.offsetX &&
                e.offsetY > item.offsetY - 100 &&
                e.offsetY < item.offsetY + 100
            );
        });
        const target = targetArry?.reduce((pre, current) => {
            return pre.zIndex > current.zIndex ? pre : current;
        });
        const index = imgList.value.findIndex(
            (item) => item.zIndex === target.zIndex
        );
        imgList.value[index].isSelect = true;
    }
}
// 画布尺寸自适应
function getCanvasWH() {
    nextTick(() => {
        const canvasDom = document.getElementById("canvas") as any;
        canvasDom.width = canvasDom?.clientWidth;
        canvasDom.height = canvasDom?.clientHeight;
        // 图片绘制-->根据zindex来进行绘制
        if (imgList.value.length !== 0) {
            for (let i = 0; i < imgList.value.length; i++) {
                addImage(imgList.value[i]);
            }
        }
    });
}
window.addEventListener("resize", () => {
    getCanvasWH();
});
watch(
    imgList.value,
    () => {
        getCanvasWH();
    },
    { immediate: true }
);
</script>

<style scoped>
#canvas {
    width: 100%;
    height: 100%;
    background: white;
}
</style>
