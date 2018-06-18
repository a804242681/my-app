var i=1;
module.exports = robot => {
  robot.on(`*`, async context => {
    context.log({event: context.event, action: context.payload.action})
      robot.log(i)
      i++
  })
}