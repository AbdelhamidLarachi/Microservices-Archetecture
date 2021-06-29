
## SETUP

Install sql server with docker using cli (MAC).

```sh
docker run -d --name sqlserver -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=root' -e 'MSSQL_PID=Developer' -p 1433:1433 microsoft/mssql-server-linux:2017-latest
```

```sh
docker run -d --name sql_server_demo -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=root' -p 1433:1433 mcr.microsoft.com/mssql/server:2019-latest
```

```sh
CREATE TABLE usr (
    id int NOT NULL IDENTITY PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    role int
    );
```
**Run Middleware:** 
```sh
cd middleware && npm install && nodemon index.ts
```

**Build Docker Dontainers:** 

```sh
docker build -t nodecontroller .
docker-compose up
```

**Stop Docker Containers:** 
```sh
docker-compose down
```


## Workflow

* Client request to a signle endpoint (middleware) using a JWT TOKEN : http://localhost:9000/url
* Client can check server status / info using : http://localhost:9000/status
* Client login/signup is handled differently using : http://localhost:9000/login | http://localhost:9000/signup
* Middleware expects routes starting with their appname ex: /client/*  /commercial/*

* Middleware contains a **RESOLUTION CONTROLLER**, **JWT AUTH** and a **FORWARD PROXY**.
* Request will be translated via proxy to a **LOAD BALENCER** on **PORT 8080**.
* Load Balencer will distribute equally to one of the **TWO SERVERS running on ports 1111 & 2222**
* Both servers will handle requests with same manner, they contain an **EXECUTION CONTROLLER** (check appname & version) and a **PROXY**.
* that proxy will translate the request to the **REVERSE PROXY (nginx) on PORT 5000** 
* nginx reverse proxy using the **default.conf** file can redirect the request to the correct microservice due to his route **SCHEME**.
* **MICROSERVICE** using its own database, will handle the request safely and return the result to the client

## CLIENT-SIDE PORTS
* Client --serve 9001
* Livreur --serve 9002
* Commercial --serve 9003
* Technique --serve 9004
* Restaurateur --serve 9005
