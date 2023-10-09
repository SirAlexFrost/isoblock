import './style.css'

import * as PIXI from 'pixi.js';
import { Tile, TileType } from './tile';

const app = new PIXI.Application({
    background: '#000000',
    resizeTo: window,
    backgroundAlpha: 0,
});

const world: Tile[] = [];

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

const getWorldTile = (x: number, y: number) => {
    return world.filter(tile => tile.x === x && tile.y === y)[0] ?? null;
}

const createWorldTile = (x: number, y: number, type: TileType) => {
    const tile = getWorldTile(x, y);

    // Allow new type, but prevent entry duplication
    if (tile) {
        tile.type = type
        return;
    };

    world.push(new Tile(type, x, y));
}

window.addEventListener('click', (e) => {
    const worldPos = screenToWorld(e.x, e.y);

    const tile = getWorldTile(worldPos.x, worldPos.y);

    if (tile) {
        tile.type = tile.type === 'void' ? 'dirt' : 'void';
    } else {
        createWorldTile(worldPos.x, worldPos.y, 'dirt');
    }

    renderWorld();
});