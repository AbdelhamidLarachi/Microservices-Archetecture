const express = require('express');
const app = express();
const ip = require("ip");
const fetch = require('node-fetch');
const local_ip = ip.address();


/* A LOAD BALANCED EXECUTION CONTROLLER 
- CHECK APP VERSION, NAME
- REDIRECT TO REVERSE PROXY IN ORDER TO FIND THE CORRECT MICROSERVICE
- RETURN RESULT */


app.use(express.json()); // for 
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



/* 
ACT AS a Middleware 
ACCEPT * method types and routes
REDIRECT request to reverse proxy 
*/


app.all('*', async function (req, res, next) {

	try 
	{
		// No Version
		if(req.body.version == undefined) 
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


		// Unsupported AppName
		const appName = req.url.split("/")[1];

		if(!['client', 'restaurateur', 'livreur', 'commercial', 'technique'].includes(appName))
		{
			res.status(505).json({ error: "Unsupported app-name." });
			return;
		}


		// Handle request to reverse proxy..

        const options = {
            method: req.method,
            headers: req.headers,
            body: req.body
        }

		let response = await fetch(`http://${process.env.LOCAL_IP}:${process.env.REVERSE_PROXY_PORT}${req.url}`, options);
        let result = await response.json();
        res.json(result);
    }

    catch(error) 
    {
        res.status(500).json(error);
    }

    //next();
})


/* 
- CHECK Server STATUS
- HANDLE Environement VARIABLES
*/

app.get("/status", async (req, res) => {
    res.json({BUILD_V : process.env.BUILD_V, REVERSE_PROXY_PORT : process.env.REVERSE_PROXY_PORT, APPID: process.env.APPID});
});


app.listen(process.env.APPID, () => console.log(`server is listening on ${process.env.APPID}`))
