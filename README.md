#Some RestAPI

### To run

1 Install dependencies
* node/npm

2 Intall node dependencies  run   
 ```bash
    $ npm install
  ```
  
3 Generate SSL certificates
  
4 Edit ./config/config.json
  ```json
{
  "express": {
    "port": 443
  },
  "certs": {
    "key": "./put/cert/key/path/here",
    "cert": "./put/cert/path/here"
  }
}
```

5 Run
 ```bash
   $ node main.js
  ```
