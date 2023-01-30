const client = require("twilio")(
  "AC306910e4d05525b87d15c5d085f93f32",
  "4f88f38fd34d954aa47fc6a2205f9b01"
);
class SMS {
  sendMessage({number,message}, resp) {
    console.log("SMS.JS HIT:: "+number);
    client.messages
      .create({
        body: message,
        to: `+1${number}`, // Text this number
        from: "+18623297327", // From a valid Twilio number
      })
      .then((message) => {
        console.log(message.sid);
        resp.status(200).json("Success");
      }).catch((err)=>{
        resp.status(206).json(err)
      });
  }
}

module.exports = new SMS();
