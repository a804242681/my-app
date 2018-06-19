const commands = require('probot-commands')

module.exports = robot => {
    var save =null

    var i=1;
    
    robot.on(`*`, async context => {
          
    context.log({event: context.event, action: context.payload.action})
      robot.log(i)
      i++
            const { issue, comment, repository } = context.payload
            const issueCopy = {
      'owner': repository.owner.login,
      'repo': repository.name,
      'title': issue.title,
      'body': `${issue.body}\n\nCopy of [#${issue.number}](${issue.html_url})`,
      'milestone': issue.milestone ? issue.milestone.number : null,
      'labels': issue.labels
    }
            
    var dt = new Date();
    save=repository.owner.login+" "+repository.name+" "+issue.title+" "+issue.labels+" " + (dt.getMonth() + 1) + "/" + dt.getDate()+"/"+dt.getFullYear()+" "+dt.getHours()+" hour "+dt.getMinutes()+"min "+ 
       dt.getSeconds()+" second "
          robot.log(save)
  })
 
}