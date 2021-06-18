**Setup lunch:** 

docker build -t nodecontroller .

docker-compose up

**Stop containers:** 

docker-compose down


** Workflow ** 

* Client request to a signle endpoint (middleware) using a JWT TOKEN : http://localhost:6000/url
* Client can check server status / info using : http://localhost:6000/status
* Client login/signup is handled differently using : http://localhost:6000/login | http://localhost:6000/signup
* Middleware expects routes starting with their appname ex: /client/*  /commercial/*

* Middleware contains a **RESOLUTION CONTROLLER**, **JWT AUTH** and a **FORWARD PROXY**.
* Request will be translated via proxy to a **LOAD BALENCER** on **PORT 8080**.
* Load Balencer will distribute equally to one of the **TWO SERVERS running on ports 1111 & 2222**
* Both servers will handle requests with same manner, they contain an **EXECUTION CONTROLLER** (check appname & version) and a **PROXY**.
* that proxy will translate the request to the **REVERSE PROXY (nginx) on PORT 5000** 
* nginx reverse proxy using the **default.conf** file can redirect the request to the correct microservice due to his route **SCHEME**.
* **MICROSERVICE** using its own database, will handle the request safely and return the result to the client



ALL THAT, HAPPENS IN 0.00012s 😎


