import './style.css'

import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    background: '#000000',
    resizeTo: window,
    backgroundAlpha: 0,
});


const world = [
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false],
    [false, false, false, false, false, false]
]

const graphic = new PIXI.Graphics();

app.stage.position.set(app.screen.width / 2, app.screen.height / 2);

app.stage.addChild(graphic);

document.body.appendChild(app.view as HTMLCanvasElement);

const renderWorld = () => {

    graphic.clear();
    graphic.lineStyle(1, 0x000000);

    for (let i = 0; i < world[0].length; i++) {
        for (let j = 0; j < world[0].length; j++) {
            const baseX = (i * 32) - (j * 32);
            const baseY = (i * 16) + (j * 16);

            const tile = world[i][j];

            if (tile) {
                graphic.beginFill(0xff0000);
            }

            graphic.moveTo(baseX, baseY)
                .lineTo(baseX + 32, baseY + 16)
                .lineTo(baseX + 64, baseY)
                .moveTo(baseX + 64, baseY)
                .lineTo(baseX + 32, baseY - 16)
                .lineTo(baseX, baseY);

            if (tile) {
                graphic.endFill();
            }
        }
    }
};

renderWorld();

const screenToWorld = (x: number, y: number) => {
    const baseX = (x - app.screen.width / 2) / 64;
    const baseY = (y - app.screen.height / 2) / 32;

    const isoX = Math.floor(baseX - baseY);
    const isoY = Math.floor(baseX + baseY);

    return { x: isoX, y: isoY }
}

window.addEventListener('click', (e) => {
    const worldPos = screenToWorld(e.x, e.y);

    world[worldPos.y][-worldPos.x] = !world[worldPos.y][-worldPos.x];

    console.log(worldPos.x)

    renderWorld();
});