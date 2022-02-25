import Two from "../components/twojs/two"
import { createCanvas, Image } from "canvas"


const tiledSquareScene = (scene, tileSize, strokeColor, fillColor) => {
    //TODO
}

// Parameter : Tile Size [1-70] * 4 pixels
//             Stroke Color RGB(0-255,0-255,0-255)
//             Fill Color RGB(0-255,0-255,0-255) 
const generateBackground = (tileSize, strokeColor, fillColor) => {
    const WIDTH = 1080;
    const HEIGHT = 1560;
    const SCALED_TILESIZE = tileSize * 4;

    var canvas = createCanvas(WIDTH, HEIGHT);
    Two.Utils.shim(canvas, Image);

    var scene = new Two({
        width: WIDTH,
        height: HEIGHT,
        domElement: canvas
    });

    var vTile = Math.ceil(scene.height / SCALED_TILESIZE);
    var hTile = Math.ceil(scene.width / SCALED_TILESIZE);


    // Create tiled rectangle

    for(let i=0;i<=vTile;i++){
        for(let j=0;j<=hTile;j++){
            var rect = scene.makeRectangle(j*SCALED_TILESIZE,i*SCALED_TILESIZE,SCALED_TILESIZE,SCALED_TILESIZE);
            rect.stroke = strokeColor();
            rect.fill = fillColor();
            rect.linewidth = 3;
        }

    }

    // Text Area

    var textPart = scene.makeRoundedRectangle(scene.width/2, scene.height/2, 0.7*scene.width, 0.8*scene.height, 180);
    textPart.stroke = "#FFFFFF";

    
    scene.render();

    var settings = { compressionLevel: 3, filters: canvas.PNG_FILTER_NONE };
    
    return canvas.toBuffer('image/png', settings).toString("Base64");

}



export default generateBackground