const grid = {
    cols : 25,
    rows : 25
}
const node = {
    width  : 15,
    height : 15
}

const CANVAS_WIDTH  = canvas.width  = grid.cols * node.width
const CANVAS_HEIGHT = canvas.height = grid.rows * node.height

export {grid, node, CANVAS_WIDTH, CANVAS_HEIGHT}