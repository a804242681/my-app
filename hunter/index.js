const commands = require('probot-commands')

module.exports = robot => {
  
    
    robot.on('push', async context => {
    // Code was pushed to the repo, what should we do with it?
           const { issue, comment, repository } = context.payload
    robot.log("Owner: "+repository.owner.login+"repository name: "+repository.name+' ')
        
  })
    
    robot.on(['issues.opened', 'issues.edited'], async context => {
    var save =""

    var i=1;        
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
        if(repository.owner.login!='undefined'&&repository.owner.login!=null)
        save+=repository.owner.login+" "
        if(repository.name!='undefined'&&repository.name!=null)
            save+=repository.name+" "
            if(issue.title!='undefined'&&issue.title!=null)
                save+=issue.title+" "
                if(issue.labels!='undefined'&&issue.labels!=null)
                    save+=issue.labels+" "
                        save+= (dt.getMonth() + 1) + "/" + dt.getDate()+"/"+dt.getFullYear()+" "+dt.getHours()+" hour "+dt.getMinutes()+"min "+ 
       dt.getSeconds()+" second "
          robot.log(save)
  })
 
}