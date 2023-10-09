import './style.css'

import * as PIXI from 'pixi.js';
import { Tile } from './tile';

const app = new PIXI.Application({
    background: '#000000',
    resizeTo: window,
    backgroundAlpha: 0,
});

const world: Map<string, Tile> = new Map();

const graphic = new PIXI.Graphics();

app.stage.position.set(app.screen.width / 2, app.screen.height / 2);

app.stage.addChild(graphic);

document.body.appendChild(app.view as HTMLCanvasElement);

const renderWorld = () => {

    graphic.clear();
    graphic.lineStyle(1, 0x000000);

    world.forEach((tile, coords) => {
        tile.draw(graphic);
    });
};

renderWorld();

const screenToWorld = (x: number, y: number) => {
    const baseX = (x - app.screen.width / 2) / 64;
    const baseY = (y - app.screen.height / 2) / 32;

    const isoX = Math.floor(baseX + baseY);
    const isoY = -Math.floor(baseX - baseY);


    return { x: isoX, y: isoY }
}

window.addEventListener('click', (e) => {
    const worldPos = screenToWorld(e.x, e.y);

    const coordString = `${worldPos.x}|${worldPos.y}`;

    const tile = world.get(coordString);

    if (tile) {
        tile.type = tile.type === 'void' ? 'dirt' : 'void';
    } else {
        world.set(coordString, new Tile('dirt', worldPos.x, worldPos.y));
    }

    renderWorld();
});