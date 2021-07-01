const express = require('express');
const app = express();
const ip = require("ip");
const local_ip = ip.address();
const cors = require('cors')
const proxy = require('express-http-proxy');


/* A LOAD BALANCED EXECUTION CONTROLLER 
- CHECK APP VERSION, NAME
- REDIRECT TO REVERSE PROXY IN ORDER TO FIND THE CORRECT MICROSERVICE
- RETURN RESULT */



app.use(express.json());
app.use(express.urlencoded());
app.use(cors());




/* 
ACT AS a Middleware 
ACCEPT * method types and routes
REDIRECT request to reverse proxy 
*/



app.all('*', async function (req, res, next) {

	try 
	{
		// Unsupported AppName
		const appName = req.url.split("/")[1];

		/* 
		- CHECK Server STATUS
		- HANDLE Environement VARIABLES
		*/

		if(appName == 'status') {
			res.json({BUILD_V : process.env.BUILD_V, REVERSE_PROXY_URL : process.env.REVERSE_PROXY_URL, APPID: process.env.APPID});
		}


		/* No Version
		if(req.method == "POST" && req.body.version == undefined) 
		{
			res.status(400).json({ error: "Bad request" });
			return;
		}
		

		// Unsupported Version
		if(req.body.version < process.env.BUILD_V)
		{
			res.status(505).json({ error: "Unsupported version." });
			return;
		}
		*/

		if(!['client', 'restaurateur', 'livreur', 'commercial', 'technique', 'devtiers'].includes(appName))
		{
			res.status(505).json({ error: "Unsupported app-name." });
			return;
		}

		next();
    }

    catch(error) 
    {
        res.status(500).send(error);
    }

}, proxy(process.env.REVERSE_PROXY_URL))





app.listen(process.env.APPID, () => console.log(`server is listening on ${process.env.APPID}`))
