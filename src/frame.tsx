const frame = (dts: any, ctx: any) => {
    dts.forEach((pred: any) => {
        console.log(pred)
        const [x, y, width, height] = pred['bbox']
        const text = pred['class']
        const score = pred['score'].toPrecision(2)*100

        ctx.strokeStyle = 'green'
        ctx.font = '2rem Arial'

        ctx.beginPath()
        ctx.fillStyle = 'red'
        ctx.lineWidth = 2
        ctx.fillText(text + ' ' + score + '%', x+width/2, y)
        ctx.rect(x, y, width, height)
        ctx.stroke()
    })
}

export default frame