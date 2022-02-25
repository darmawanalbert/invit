import Two from "../components/twojs/two"
import { createCanvas, Image } from "canvas"


const tiledSquareScene = (scene, tileSize, strokeColor, fillColor) => {
    //TODO
}

// Parameter : Tile Size [1-70] * 4 pixels
//             Stroke Color RGB(0-255,0-255,0-255)
//             Fill Color RGB(0-255,0-255,0-255)
//             bgType (0 for tile, 1 for polka dot)
const generateBackground = (fillColor, strokeColor, tileSize, bgType) => {
    const WIDTH = 1080;
    const HEIGHT = 1560;
    const SCALED_TILESIZE = tileSize * 4;

    const canvas = createCanvas(WIDTH, HEIGHT);
    Two.Utils.shim(canvas, Image);

    const scene = new Two({
        width: WIDTH,
        height: HEIGHT,
        domElement: canvas
    });

    const vTile = Math.ceil(scene.height / SCALED_TILESIZE);
    const hTile = Math.ceil(scene.width / SCALED_TILESIZE);

    // Create tiled rectangle
    for(let i=0;i<=vTile;i++){
        for(let j=0;j<=hTile;j++){
            var rect = scene.makeRectangle(j*SCALED_TILESIZE,i*SCALED_TILESIZE,SCALED_TILESIZE,SCALED_TILESIZE);
            rect.stroke = `rgb(${strokeColor[0]}, ${strokeColor[1]}, ${strokeColor[2]})`;
            rect.fill = `rgb(${fillColor[0]}, ${fillColor[1]}, ${fillColor[2]})`;
            rect.linewidth = 3;
        }
    }
    // Text Area
    const textPart = scene.makeRoundedRectangle(scene.width/2, scene.height/2, 0.7*scene.width, 0.8*scene.height, 180);
    textPart.stroke = "#FFFFFF";

    scene.render();

    const settings = { compressionLevel: 3, filters: canvas.PNG_FILTER_NONE };

    return canvas.toBuffer('image/png', settings).toString("Base64");

}



export default generateBackground