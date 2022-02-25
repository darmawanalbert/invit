import Two from "../components/twojs/two"
import { createCanvas, Image } from "canvas"


const tiledSquareScene = (scene, fillColor, strokeColor, tileSize ) => {

    const SCALED_TILESIZE = tileSize * 4;
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

}


const particlesScene = (scene, fillColor, strokeColor, tileSize ) => {

    const SCALED_TILESIZE = tileSize * 4;
    const cx = scene.width * 0.5;
    const cy = scene.height * 0.5;
    const background = scene.makeRectangle(cx, cy, scene.width, scene.height);
    background.noStroke();
    background.fill = 'rgb(255, 255, 255)';
    background.name = 'background';

    const vTile = Math.ceil(scene.height / SCALED_TILESIZE);
    const hTile = Math.ceil(scene.width / SCALED_TILESIZE);
    const particleSize = 0.2 * SCALED_TILESIZE;

    for(let i=0;i<=vTile;i++){
        for(let j=0;j<=hTile;j++){

            const offset = i % 2 == 1 ? 0 : 0.5 * SCALED_TILESIZE
            const particle = scene.makeCircle(j*SCALED_TILESIZE + offset,i*SCALED_TILESIZE, particleSize)
            const choice = [`rgb(${strokeColor[0]}, ${strokeColor[1]}, ${strokeColor[2]})`,`rgb(${fillColor[0]}, ${fillColor[1]}, ${fillColor[2]})`];
            particle.fill = choice[Math.floor(Math.random()*choice.length)];
            particle.noStroke()
        
        }

    }

    const textPart = scene.makeRoundedRectangle(scene.width/2, scene.height/2, 0.7*scene.width, 0.8*scene.height, 180)
    textPart.stroke = "#FFFFFF"

}

const initializeCanvas = () => {
    const WIDTH = 1080;
    const HEIGHT = 1560;

    const canvas = createCanvas(WIDTH, HEIGHT);
    Two.Utils.shim(canvas, Image);

    const two = new Two({
        width: WIDTH,
        height: HEIGHT,
        domElement: canvas
    });

    return {
        scene: two,
        canvas: canvas,
    };

}
// Parameter : Tile Size [1-70] * 4 pixels
//             Stroke Color RGB(0-255,0-255,0-255)
//             Fill Color RGB(0-255,0-255,0-255)
//             bgType (0 for tile, 1 for polka dot)
const generateBackground = (canvasObject, fillColor, strokeColor, tileSize, bgType) => {

    bgType = bgType || 0

    const {scene, canvas} = canvasObject
    scene.clear();
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    const scenePopulator = {
        0:tiledSquareScene,
        1:particlesScene
    }

    scenePopulator[bgType](scene, fillColor,strokeColor, tileSize, bgType);

    scene.render();

    const settings = { compressionLevel: 3, filters: canvas.PNG_FILTER_NONE };

    return canvas.toBuffer('image/png', settings).toString("Base64");

}

export {initializeCanvas, generateBackground}