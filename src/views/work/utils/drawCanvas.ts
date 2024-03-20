export class editImag {
    imgUrlarr:Array<string>
    constructor(imglist:Array<string>) { 
        this.imgUrlarr=imglist
    }

    drawImg(imgUrl: string) { 
        const img = new Image()
        img.src=imgUrl
    }
}