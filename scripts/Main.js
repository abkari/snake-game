import {grid, node, CANVAS_WIDTH, CANVAS_HEIGHT} from "./Settings.js"
import {Keys} from "./Keys.js"
import Snake from "./Snake.js"
import Food from "./Food.js"

const score = document.getElementById("score")
const best_score = document.getElementById("best-score")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


canvas.width  = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT


let score_value = 0
let best_score_value = 0




const s = new Snake()
const f = new Food()
const step = 5
let step_frame = 0

function mainloop()
{
    // Update Here
    if (!step_frame)
    {
        if (s.eat(f.getPosition()))
        {
            f.updatePosition()
            s.increaseBody()
            score_value++
        }

        s.stepUpdate()

        if (s.isDie())
        {
            f.updatePosition()
            s.init()
            if (score_value > best_score_value)
                best_score_value = score_value
            score_value = 0
        }

        score.textContent = `Score : ${score_value}`
        best_score.textContent = `Best Score : ${best_score_value}`
        
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        //Draw Here
        s.draw(ctx)
        f.draw(ctx)
    }
        
    step_frame = (++step_frame) % step

    requestAnimationFrame(mainloop)
}

mainloop()


window.addEventListener("keydown", e => {

    if (Keys.Up.indexOf(e.code) != -1)
        s.setDirection(0, -1)
    else if (Keys.Down.indexOf(e.code) != -1)
        s.setDirection(0, 1)

    if (Keys.Left.indexOf(e.code) != -1)
        s.setDirection(-1, 0)
    else if (Keys.Right.indexOf(e.code) != -1)
        s.setDirection(1, 0)

})