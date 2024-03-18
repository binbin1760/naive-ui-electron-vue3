import path from 'path'
import fs from "fs"

class BuildObj {
    buildMain() {
        require("esbuild").buildSync({
            entryPoints: ["./src/main/mainEntry.ts"],
            bundle: true,
            platform: "node",
            minify: true,
            outfile: './dist/mainEntry.js',
            external: ['electron']
        })
    }

    preparePackageJson() {
        let pagJsonPath = path.join(process.cwd(), "package.json");
        let loaclPkgJson = JSON.parse(fs.readFileSync(pagJsonPath, "utf-8"));
        let elelctronConfig = loaclPkgJson.devDependencies.electron.replace("^", "");
        loaclPkgJson.main = "mainEntry.js";
        delete loaclPkgJson.scripts
        delete loaclPkgJson.devDependencies
        loaclPkgJson.devDependencies = { electron: elelctronConfig }
        let tarJsonPath = path.join(process.cwd(), "dist", "package.json")
        fs.writeFileSync(tarJsonPath, JSON.stringify(loaclPkgJson))
        fs.mkdirSync(path.join(process.cwd(), "dist/node_modules"))
    }

    buildInstaller() {
        let options = {
            config: {
                directories: {
                    output: path.join(process.cwd(), "release"),
                    app: path.join(process.cwd(), "dist")
                },
                files: ["**"],
                extends: null,
                productName: "MK1",
                appId: 'com.MK1.desktop',
                asar: true,
                nsis: {
                    oneClick: true,
                    perMachine: true,
                    allowToChangeInstallationDirectory: false,
                    createDesktopShortcut: true,
                    createStartMenuShortcut: true,
                    shortcutName: 'MK1'
                },
                //服务提供商  以及服务器地址
                // publish: [{ provider: "generic", url: "http://localhost:5500/" }] 
            },
            project: process.cwd()
        }
        return require("electron-builder").build(options)
    }
}

export let buildPlugin = () => {
    return {
        name: 'build-plugin',
        closeBundle: () => {
            let buildObj = new BuildObj()
            buildObj.buildMain()
            buildObj.preparePackageJson()
            buildObj.buildInstaller()
        }
    }
}