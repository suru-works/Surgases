const nodemailer = require("nodemailer");
const verifyView = require('../view/verifyView');
const pool = require('../db').pool;

const crypto = require("crypto");

// async..await is not allowed in global scope, must use a wrapper
async function mail(options) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: options.host,
    port: options.port,
    //secure: true,
    //service: options.serverService,
    auth: {
      user: options.serverMail, // generated ethereal user
      pass: options.serverPassword, // generated ethereal password
    },
    tls: {rejectUnauthorized: false},
  });
  

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: options.sender, // sender address
    to: options.receivers, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
    html: options.html, // html body
  },
  function (err, info) {
    if(err)
      console.log(err);
    else
      console.log(info);
      
 });

  //console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

exports.mail = mail;

const sendVerifyMail = (username) => {
  let data ={
    username: username
  };
  pool.getConnection(async (err, conn) => {
    if (err) {
      console.log(err);
      return;
    }

    try {
      let resUser = await conn.promise().execute('SELECT * FROM usuario WHERE username = ?', [data.username]);
      let user = JSON.parse(JSON.stringify(resUser[0]))[0];
      if (user) {
        isTokenNotUnique = true;
        let now = new Date();
        now.setMinutes(now.getMinutes() + 80);
        var key = crypto.randomBytes(20).toString('hex');

        while (isTokenNotUnique) {
          var verificationToken = now + ',' + key;
          var resUserByToken = await conn.promise().execute('SELECT * FROM usuario WHERE verificationToken = ?', [verificationToken]);
          let userByToken = JSON.parse(JSON.stringify(resUserByToken[0]))[0];
          if (userByToken) {
            //the token allready exist
            key = crypto.randomBytes(20).toString('hex');
          }
          else {
            isTokenNotUnique = false;
            data.verifyToken = verificationToken;
            let result = await conn.promise().execute('UPDATE usuario SET verificationToken = ? WHERE username = ?', [verificationToken, data.username]);
            if (result[0].affectedRows == 1) {
              conn.commit();
            } else {
              conn.rollback();
              var err = new Error("user update failed successfully");
              err.statusCode = 500;
              throw err;
            }
          }

        }
        const verifyHTML = verifyView.verifyView(data);
        //sending email for user verification
        mailData = {
          host: process.env.EMAIL_SERVER,
          port: process.env.EMAIL_SERVER_PORT,
          secure: false,
          //serverService: 'hotmail',
          serverMail: process.env.AUTH_EMAIL_USER,
          serverPassword: process.env.AUTH_EMAIL_PASSWORD,
          sender: '"Surgas de antioquia" <' + process.env.AUTH_EMAIL_USER + '>',
          receivers: user.email,
          subject: 'Verificacion de correo electronico',
          text: '',
          html: verifyHTML
        };
        await mail(mailData);
      }
      else {
        var err = new Error("User does not exist");
        err.statusCode = 404;
        throw err;
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  );
}

exports.sendVerifyMail = sendVerifyMail;