const mail = require("./com/mail");

module.exports.parseToJSON = (results) => {
    if (results.length > 0) {
        return JSON.parse(JSON.stringify(results));
    } else {
        return []
    }
}

module.exports.soloFecha = (fecha) => {
    return fecha.substring(0, 10);
}

module.exports.soloFechas = (results, param) => {
    let objects = this.parseToJSON(results);

    for (let i = 0; i < objects.length; i++) {
        objects[i][param] = this.soloFecha(objects[i][param]);
    }
    
    return objects;
}

module.exports.sendEmail = (receiver, subject, content) => {
    mail.mail({
        host: process.env.EMAIL_SERVER,
        port: process.env.EMAIL_SERVER_PORT,
        secure: false,
        //serverService: 'hotmail',
        serverMail: process.env.AUTH_EMAIL_USER,
        serverPassword: process.env.AUTH_EMAIL_PASSWORD,
        sender: '"Surgas de Antioquia" <' + process.env.AUTH_EMAIL_USER + '>',
        receivers: receiver,
        subject: subject,
        text: '',
        html: content
    });
}