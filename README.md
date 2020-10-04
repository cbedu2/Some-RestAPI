#Some RestAPI


## Easy run and test
run `./dev_init`

### Steps to run
1 Install dependencies
* node/npm

2 Install node dependencies  run   
 ```bash
    $ npm install
  ```
  
3 Generate SSL certificates

   references
  
    https://www.sslforfree.com/
  
    https://www.howtogeek.com/107415/it-how-to-create-a-self-signed-security-ssl-certificate-and-deploy-it-to-client-machines/
  
  
4 Edit ./config/config.json
  ```json
{
  "express": {
    "port": {
      "http": 80,
      "https": 443
    }
  },
  "certs": {
    "key": "./certs/key.pem",
    "cert": "./certs/cert.pem"
  }
}
```

5 Run
 ```bash
   $ node main.js
  ```
