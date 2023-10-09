import { Graphics } from 'pixi.js';

type TileType = 'void' | 'dirt'

export class Tile {

    type: TileType;
    x: number;
    y: number;

    constructor(type: TileType, x: number, y: number) {
        this.type = type;
        this.x = x;
        this.y = y;
    }


    draw(graphic: Graphics) {
        if (this.type === 'void') return;

        const baseX = (this.x * 32) - (this.y * 32);
        const baseY = (this.x * 16) + (this.y * 16);

        graphic.moveTo(baseX, baseY)
            .lineTo(baseX + 32, baseY + 16)
            .lineTo(baseX + 64, baseY)
            .moveTo(baseX + 64, baseY)
            .lineTo(baseX + 32, baseY - 16)
            .lineTo(baseX, baseY);
    }

}   