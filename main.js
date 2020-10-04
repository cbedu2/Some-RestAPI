// For use with Node.js
const fs = require('fs');
const bodyParser = require("body-parser");
const app = require('express')();
const morgan = require('morgan');
const http = require("http");
const https = require("https");
const {express, certs} = JSON.parse(fs.readFileSync('config/config.json', 'utf-8'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('trust proxy', true);

const accessLogStream = fs.createWriteStream('./logs/access.log', {flags: 'a'});
app.use(morgan('combined',  {"stream": accessLogStream}));

//create http server
http.createServer(app).listen(express.port.http, function () {
    console.log("Express server listening on port " + express.port.http);
});

const options = {
    key: fs.readFileSync(certs.key),
    cert: fs.readFileSync(certs.cert),
};

//create https server with ssl
https.createServer(options, app).listen(express.port.https, function(){
    console.log("Express server listening on port " + express.port.https);
});

//redirects http requests to https
function ensureSecure(req, res, next){
    if(req.secure){
        return next();
    };
    res.redirect('https://' + req.hostname + req.url);
}

//captures all requests and enforce redirects from http to https
app.all('*', ensureSecure); // at top of routing calls

app.get('/',(req, res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end("<h1>Hello World!</h1>");
});


