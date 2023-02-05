const nodemailer = require("nodemailer");
const client = require("twilio")(
  "AC306910e4d05525b87d15c5d085f93f32",
  "4f88f38fd34d954aa47fc6a2205f9b01"
);
class SMS {
  sendMessageAPI(number, msg, resp) {
    client.messages
      .create({
        body: msg,
        to: `+1${number[0]}`, // Text this number
        from: "+18623297327", // From a valid Twilio number
      })
      .then((message) => {
        client.messages
          .create({
            body: msg,
            to: `+1${number[1]}`, // Text this number
            from: "+18623297327", // From a valid Twilio number
          })
          .then((message) => {
            resp.status(200).json("Success");
          })
          .catch((err) => {
            resp.status(500).json(err);
          });
      })
      .catch((err) => {
        resp.status(500).json(err);
      });
  }

  sendMessage(number, message) {
    client.messages
      .create({
        body: message,
        to: `+1${number}`, // Text this number
        from: "+18623297327", // From a valid Twilio number
      })
      .then((message) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  }

  async emailPassword(email, password, resp) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "support@mirchimeals.com", // generated ethereal user
        pass: "Vasantpillai01!", // generated ethereal password
      },
    });

    // send mail with defined transport object
    try {
      let info = await transporter.sendMail({
        from: "support@mirchimeals.com", // sender address
        to: email, // list of receivers
        subject: "Mirchi Meals Log In Credentials", // Subject line
        html: `<h1>Log in using following credentials: </h1><p>Email: ${email}</p><p>Password: ${password}</p>`, // html body
      });
      resp.status(200).json("sent");
    } catch (err) {
      resp.status(200).json("notSent:: "+err);
    }
  }
}

module.exports = new SMS();
