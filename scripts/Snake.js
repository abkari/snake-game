import {grid, node} from "./Settings.js"

export default class Snake
{
    // Private Vars
    #body_positions
    #size
    #color
    #direction
    
    constructor()
    {
        this.#color = "#e5d283"
        this.#size = {
            width  : node.width,
            height : node.height
        }
       this.init()
    }
    init()
    {
        this.setRandDirection()
        this.#body_positions = [
            {
                x : Math.floor(Math.random() * grid.cols),
                y : Math.floor(Math.random() * grid.rows)
            },
            {
                x : 0,
                y : 0
            }
        ]
    }
    stepUpdate()
    {
        for (let i = this.#body_positions.length - 1; i > 0; i--)
        {
            this.#body_positions[i].x = this.#body_positions[i - 1].x
            this.#body_positions[i].y = this.#body_positions[i - 1].y
        }

        this.#body_positions[0].x += this.#direction.x
        this.#body_positions[0].y += this.#direction.y
        
        this.#setOnFrameBounds()  
    }
    draw(ctx)
    {
        ctx.save()
        ctx.fillStyle = this.#color
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.#color;
        this.#body_positions.forEach(body_positions => {
            ctx.fillRect(
                body_positions.x * this.#size.width,
                body_positions.y * this.#size.height,
                this.#size.width,
                this.#size.height
            )   
        })
        ctx.restore()
    }
    setDirection(drx, dry)
    {
        if (this.#body_positions[0].x - this.#body_positions[1].x === drx)
            return

        if (this.#body_positions[0].y - this.#body_positions[1].y === dry)
            return

        this.#direction = {
            x : drx,
            y : dry
        }
    }
    eat(food_position)
    {
        return (this.#body_positions[0].x + this.#direction.x === food_position.x && 
                this.#body_positions[0].y + this.#direction.y === food_position.y)
    }
    increaseBody()
    {
        this.#body_positions.push(
            {
                x : 0,
                y : 0
            }
        )
    }
    setRandDirection()
    {
        const rand = Math.floor(Math.random() * 4)
        switch(rand)
        {
            case 0: 
                this.#direction = {
                    x : 0,
                    y : -1
                }
                break

            case 1: 
                this.#direction = {
                    x : 0,
                    y : 1
                }
                break

            case 2: 
                this.#direction = {
                    x : -1,
                    y : 0
                }
                break

            case 3: 
                this.#direction = {
                    x : 1,
                    y : 0
                }
                break
        }
        
    }
    isDie()
    {
        for (let i = 1; i < this.#body_positions.length; i++)
            if (this.#body_positions[0].x === this.#body_positions[i].x &&
                this.#body_positions[0].y === this.#body_positions[i].y)
                    return true

        return false
    }
    #setOnFrameBounds()
    {
        // Check For X Axis
        if (this.#body_positions[0].x >= grid.cols)
            this.#body_positions[0].x = 0
        if (this.#body_positions[0].x < 0)
            this.#body_positions[0].x = grid.cols - 1

        // Check For Y Axis
        if (this.#body_positions[0].y >= grid.rows)
            this.#body_positions[0].y = 0
        if (this.#body_positions[0].y < 0)
            this.#body_positions[0].y = grid.rows - 1
    }

}