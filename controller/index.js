const app = require("express")();
const appid = process.env.APPID;


/* 
A LOAD BALANCED EXECUTION CONTROLLER 
- CHECK APP VERSION, NAME, REDIRECT TO MICROSERVICE, RETURN RESULT.
*/

app.get("/", (req,res) => 
res.send(`Execution Controller : ${appid}`))

app.get("/exec-controller", (req,res) => 
res.send(`Execution Controller : ${appid}`))
 
 
app.listen(appid, ()=>console.log(`${appid} is listening on ${appid}`))
