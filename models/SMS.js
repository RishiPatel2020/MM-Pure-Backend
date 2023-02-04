const nodemailer = require("nodemailer");
const client = require("twilio")(
  "AC306910e4d05525b87d15c5d085f93f32",
  "4f88f38fd34d954aa47fc6a2205f9b01"
);
class SMS {
  sendMessageAPI(number,msg, resp) {
    client.messages
      .create({
        body: msg,
        to: `+1${number}`, // Text this number
        from: "+18623297327", // From a valid Twilio number
      })
      .then((message) => {
        resp.status(200).json("Success");
      })
      .catch((err) => {
        resp.status(500).json(err);
      });
  }

  sendMessage(number, message) {
    console.log("SMS.JS HIT:: " + number);
    client.messages
      .create({
        body: message,
        to: `+1${number}`, // Text this number
        from: "+18623297327", // From a valid Twilio number
      })
      .then((message) => {
        console.log("SUCCESSFUL....");
        return true;
      })
      .catch((err) => {
        console.log("FAILED...." + err);
        return false;
      });
  }

  async emailPassword(email, password, resp) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "r53582477@gmail.com", // generated ethereal user
        pass: "hcdtmzrcaskbmpmb", // generated ethereal password
      },
    });

    // send mail with defined transport object
    try {
      let info = await transporter.sendMail({
        from: "r53582477@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Mirchi Meals Log In Credentials", // Subject line
        html: `<h1>Log in using following credentials: </h1><p>Email: ${email}</p><p>Password: ${password}</p>`, // html body
      });
      resp.status(200).json("sent");
    } catch (err) {
      resp.status(200).json("notSent");
    }
  }
}

module.exports = new SMS();
