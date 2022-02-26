import Two from "../components/twojs/two"
import { createCanvas, Image } from "canvas"

const mapOverRange = (val, in_min, in_max, out_min, out_max) => {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var triangleTesselationScene = (scene, fillColor, strokeColor, tileSize) => {

    const SCALED_TILESIZE = (tileSize * 4) >= 54 ? tileSize * 4 : 54 ;

    var hTile = Math.ceil(scene.width / SCALED_TILESIZE);
    var triangleHeight = SCALED_TILESIZE * Math.sin(Math.PI / 3);
    var vTile = Math.ceil(scene.height / triangleHeight);
    for(let i=0;i<=vTile;i++){
        for(let j=0;j<=hTile;j++){
            
            // Down Facing
            var offset = i % 2 == 1 ? 0 : 0.5 * SCALED_TILESIZE 
            var x1 = j * SCALED_TILESIZE - offset
            var x2 = x1 + 0.5 * SCALED_TILESIZE
            var x3 = x1 + SCALED_TILESIZE
            var y1 = i * triangleHeight
            var y2 = y1 + triangleHeight
            var y3 = y1
            var tri = scene.makePath(x1,y1, x2,y2, x3, y3);
            tri.stroke = "#FFFFFF"
            tri.linewidth = 10
            tri.fill = `rgb(${fillColor[0]}, ${fillColor[1]}, ${fillColor[2]})`;

            // Top Facing
            var tri = scene.makePath(x1 - 0.5 * SCALED_TILESIZE,y2, x1, y1, x2, y2);
            
            tri.stroke = "#FFFFFF"
            tri.linewidth = 10
            tri.fill = strokeColor[0] % 2 == 0 ? "#FFFFFF" : `rgb(${fillColor[0]}, ${fillColor[1]}, ${fillColor[2]})`;


        }

    }

    const textPart = scene.makeRoundedRectangle(scene.width/2, scene.height/2, 0.8*scene.width, 0.7*scene.height, 180);
    textPart.stroke = "#FFFFFF";
}

const tiledSquareScene = (scene, fillColor, strokeColor, tileSize ) => {

    const SCALED_TILESIZE = (tileSize * 4) >= 54 ? tileSize * 4 : 54 ;
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

const lineScene = (scene, fillColor, strokeColor, tileSize ) => {

    // :(
    tileSize -= 35

    const SCALED_TILESIZE = tileSize * 5
    const cx = scene.width * 0.5;
    const cy = scene.height * 0.5;
    const background = scene.makeRectangle(cx, cy, scene.width, scene.height);
    background.noStroke();
    background.fill = `rgb(${fillColor[0]}, ${fillColor[1]}, ${fillColor[2]})`;
    background.name = 'background';

    

    // tilesize ^ , denser  <-> tilesize v, sparse
    const t1 = scene.makeLine(0, 500 - SCALED_TILESIZE, 250, 0);
    t1.linewidth = 10;
    t1.stroke = `rgb(${strokeColor[0]}, ${strokeColor[1]}, ${strokeColor[2]})`;
    const t2 = scene.makeLine(0, 250, 500 - SCALED_TILESIZE, 0);
    t2.linewidth = 10;
    t2.stroke = `rgb(${strokeColor[0]}, ${strokeColor[1]}, ${strokeColor[2]})`;
    
    const t3 = scene.makeLine(1080, 280, 750, 0);
    t3.linewidth = 10;
    t3.stroke = `rgb(${strokeColor[0]}, ${strokeColor[1]}, ${strokeColor[2]})`;
    const t4 = scene.makeLine(1080, 280, 900, 0);
    t4.linewidth = 10;
    t4.stroke = `rgb(${strokeColor[0]}, ${strokeColor[1]}, ${strokeColor[2]})`;


    const t5 = scene.makeLine(0, 1280, 120, 1560);
    t5.linewidth = 10;
    t5.stroke = `rgb(${strokeColor[0]}, ${strokeColor[1]}, ${strokeColor[2]})`;
    const t6 = scene.makeLine(0, 1200, 450 - SCALED_TILESIZE, 1560);
    t6.linewidth = 10;
    t6.stroke = `rgb(${strokeColor[0]}, ${strokeColor[1]}, ${strokeColor[2]})`;
    
    const t7 = scene.makeLine(750 + SCALED_TILESIZE, 1560, 1080, 1340);
    t7.linewidth = 10;
    t7.stroke = `rgb(${strokeColor[0]}, ${strokeColor[1]}, ${strokeColor[2]})`;
    const t8 = scene.makeLine(900, 1560, 1080, 1180 + SCALED_TILESIZE);
    t8.linewidth = 10;
    t8.stroke = `rgb(${strokeColor[0]}, ${strokeColor[1]}, ${strokeColor[2]})`;

}

const particlesScene = (scene, fillColor, strokeColor, tileSize ) => {

    const SCALED_TILESIZE = (tileSize * 4) >= 54 ? tileSize * 4 : 54 ;
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
        0:lineScene,
        1:particlesScene,
        2:triangleTesselationScene,
        3:tiledSquareScene
    }

    scenePopulator[bgType](scene, fillColor,strokeColor, tileSize, bgType);

    scene.render();

    const settings = { compressionLevel: 3, filters: canvas.PNG_FILTER_NONE };

    return canvas.toBuffer('image/png', settings).toString("Base64");

}

export {initializeCanvas, generateBackground}