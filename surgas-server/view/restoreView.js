var fs = require("fs");

function restoreView (user) {
    var html = fs.readFileSync('view/restoreView.html', 'utf8');
    html=html.replace("userName",user.username);
    //html=html.replace("userId",user._id);
    html=html.replace("restoreToken",user.restorePasswordToken);
    
    return(html);
}

exports.restoreView = restoreView