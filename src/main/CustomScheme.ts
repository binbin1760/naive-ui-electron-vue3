import { protocol } from "electron";
import fs from "fs"
import path from "path"

let schemeConfig = {
    standard: true,
    supportFetchAPI: true,
    bypassCSP: true,
    corsEnabled: true,
    stream: true,
}
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: schemeConfig }]);

export class CustomScheme {
    private static getMimeType(extension: string) {
        let mimeType = "";
        if (extension === ".js") {
            mimeType = "text/javascript";
        } else if (extension === ".html") {
            mimeType = "text/html";
        } else if (extension === ".css") {
            mimeType = "text/css";
        } else if (extension === ".svg") {
            mimeType = "image/svg+xml";
        } else if (extension === ".json") {
            mimeType = "application/json";
        }
        return mimeType;
    }

    static registerScheme() {
        protocol.handle('app', (request) => {
            let { pathname: pathName } = new URL(request.url)
            let extension = path.extname(pathName).toLowerCase()

            if (extension === "") {
                pathName = "index.html"
                extension = ".html"
            }
            const tarFile = path.join(__dirname, pathName)

            return new Response(fs.readFileSync(tarFile), {
                headers: { 'content-type': this.getMimeType(extension) },
                status: 200,
            })
        })
    }
}