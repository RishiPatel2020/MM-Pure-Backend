const cron = require("cron");

function sendReminder() {
//   if(saturday()){  

//   }else{
//     // today we'll delivery product in 30 mins 
//   }
    console.log("REMINDER at 11:00 PM EST!!");
}
// function startTask(){
//     const job = new cron.CronJob(
//         "0 0 9 * * 6,7",
//         sendReminder,
//         null,
//         true,
//         "America/New_York"
//       );
// }



module.exports={
    sendReminder
}