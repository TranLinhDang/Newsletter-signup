const express = require("express");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
// const bodyParser = require("body-parser");



const app = express();

app.use(express.static("public"));
// app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

client.setConfig({
  apiKey: "8c1230a4f78fc3220d33ac1644e59a03-us21",
  server: "us21"
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const run = async () => {
      const response = await client.lists.addListMember("bf91407ad8", {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
      });
      res.sendFile(__dirname + "/success.html");
      // console.log(res); // (optional)
    };
    run().catch(e => res.sendFile(__dirname + "/failure.html"));

});

// app.post("/", function(req, res){
//   const firstName = req.body.fName;
//   const lastName = req.body.lName;
//   const email = req.body.email;
//
//   // console.log(firstName + lastName + email);
//   const data = {
//     members: [
//       {
//         email_address: email,
//         status: "subscribed",
//         merge_fields:{
//           FNAME: firstName,
//           LNAME: lastName
//         }
//       }
//     ]
//   };
//   const jsonData = JSON.stringify(data);
//
//   const url = "https://us21.api.mailchimp.com/3.0/lists/bf91407ad8";
//
//   const options = {
//     method: "POST",
//     auth: "danglt:8c1230a4f78fc3220d33ac1644e59a03-us21"
//   }
//
//   const request = https.request(url, options, function(response){
//     response.on("data", function(data){
//       console.log(JSON.parse(data));
//     });
//   });
//
//   request.write(jsonData);
//   request.end();
//
// });

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server running");
});

//8c1230a4f78fc3220d33ac1644e59a03-us21

// bf91407ad8
