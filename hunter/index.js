const commands = require('probot-commands')

module.exports = robot => {
      var save =""
      var dt = new Date();
      var i=1;   
     robot.log(i)
      save+= (dt.getMonth() + 1) + "/" + dt.getDate()+"/"+dt.getFullYear()+" "+dt.getHours()+" hour "+dt.getMinutes()+"min "+ 
       dt.getSeconds()+" second "
    robot.on('push', async context => {
    // Code was pushed to the repo, what should we do with it?
           const { issue, comment, repository } = context.payload
    robot.log("Owner: "+repository.owner.login+"repository name: "+repository.name+" "+save)
        
  })
    
    
    robot.on(['issues.opened', 'issues.edited'], async context => {


     
    context.log({event: context.event, action: context.payload.action})
   
       var infor=""
     const { issue, comment, repository } = context.payload
            
            const issueCopy = {
      'owner': repository.owner.login,
      'repo': repository.name,
      'title': issue.title,
      'body': `${issue.body}\n\nCopy of [#${issue.number}](${issue.html_url})`,
      'milestone': issue.milestone ? issue.milestone.number : null,
      'labels': issue.labels
    }
            

        if(repository.owner.login!='undefined'&&repository.owner.login!=null)
        infor+=repository.owner.login+" "
        if(repository.name!='undefined'&&repository.name!=null)
            infor+=repository.name+" "
            if(issue.title!='undefined'&&issue.title!=null)
                infor+=issue.title+" "
                if(issue.labels!='undefined'&&issue.labels!=null)
                    infor+=issue.labels+" "
          robot.log(infor +" "+save)
          i++
  })
    
      
 
}