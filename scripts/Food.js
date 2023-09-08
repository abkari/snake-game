import {grid, node} from "./Settings.js"

export default class Food
{
    #position
    #size
    #color

    constructor()
    {
        this.updatePosition()
        this.#size = {
            width : node.width,
            height : node.height
        }
        this.#color = "#fc2947"
    }
    updatePosition()
    {
        this.#position = {
            x : Math.floor(Math.random() * grid.cols),
            y : Math.floor(Math.random() * grid.rows)
        }
    }
    draw(ctx)
    {
        ctx.save()
        ctx.fillStyle = this.#color
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.#color;
        ctx.fillRect(
            this.#position.x * this.#size.width,
            this.#position.y * this.#size.height,
            this.#size.width,
            this.#size.height
        )
        ctx.restore()
    }
    getPosition()
    {
        return this.#position
    }
}