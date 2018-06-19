const commands = require('probot-commands')

module.exports = robot => {
      var save =""
      
      var i=1;   
      var fs = require('fs')
      var readMe = fs.readFileSync('readMe.txt', 'utf8')
      console.log(readMe)
       
    
    //when push
    robot.on('push', async context => {
    // Code was pushed to the repo, what should we do with it?
           var dt = new Date();
        
      save+= (dt.getMonth() + 1) + "/" + dt.getDate()+"/"+dt.getFullYear()+" "+dt.getHours()+" hour "+dt.getMinutes()+"min "+ 
       dt.getSeconds()+" second "
        
          var infor="push, "
           const { issue, comment, repository } = context.payload
           infor+="Owner: "+repository.owner.login+" repository name: "+repository.name+", "+save;
             robot.log(i)
        robot.log(infor)
        i++
  
           readMe+=infor+'\n'
                fs.writeFileSync('readMe.txt', readMe)

        
  })
    
    //when issues
    robot.on(['issues.opened', 'issues.edited'], async context => {


     
    context.log({event: context.event, action: context.payload.action})
           var dt = new Date();
      save+= (dt.getMonth() + 1) + "/" + dt.getDate()+"/"+dt.getFullYear()+" "+dt.getHours()+" hour "+dt.getMinutes()+"min "+ 
       dt.getSeconds()+" second "
   
       var infor="issues, "
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
        infor+="Owner: "+repository.owner.login+" "
        if(repository.name!='undefined'&&repository.name!=null)
            infor+=" repository name: "+repository.name+" "
            if(issue.title!='undefined'&&issue.title!=null)
                infor+=" issue title: "+issue.title+" "
                if(issue.labels!='undefined'&&issue.labels!=null)
                    infor+="issue labels: "+issue.labels+" "
            infor +=" "+save
        robot.log(i)
          robot.log(infor)
        readMe+=infor+'\n'
                fs.writeFileSync('readMe.txt', readMe)
          i++
  })
      
    //when pull
    robot.on(['pull_request.opened', 'pull_request.edited'], async context => {
            var infor="pull, "
        robot.log('xxx')
        
    // An issue was just opened.
  })
          
 
}