cd certs
ip_addrs=$(hostname -I)
ip_addrs=($ip_addrs)
default_addr=${ip_addrs[0]}
sed "s/127.0.0.1/${default_addr}/" template_san.cnf | tee  san.cnf
openssl req -x509 -nodes -days 730 -newkey rsa:2048 -keyout key.pem -out cert.pem -config san.cnf
openssl x509 -in cert.pem -text -noout
cd ..
npm install
node main.js
