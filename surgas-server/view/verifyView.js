var fs = require("fs");

function verifyView (user) {
    var html = fs.readFileSync('view/verifyView.html', 'utf8');
    html=html.replace("userName",user.username);
    html=html.replace("verifyToken",user.verify_token);
    
    return(html);
}

exports.verifyView = verifyView