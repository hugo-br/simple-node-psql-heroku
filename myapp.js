var http = require('http');
var url = require('url');
var fs = require('fs');
const PORT = process.env.PORT || 5000

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  
  
if (req.url == '/mail') {
	  
// sending email
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hbromanowski@gmail.com',
    pass: ''
   }
});

 var mailOptions = {
  from: 'hbromanowski@gmail.com',
  to: 'hugo.br53@gmail.com',
  subject: 'Sending Email using Node.js',
  html: '<h1>Welcome</h1><p>That was easy!</p>'
}; 

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
  res.write("sending email...")
});

 
  } else if (req.url == '/data') {

  
const pg = require('pg');

const client = new pg.Client({	
connectionString: process.env.DATABASE_URL || 'postgres://twzbcmdsopeunm:ef9229125cc13cef2aac5dc1a9bb041a9a2cf9bbca1b58887541a0738c5049c8@ec2-54-225-200-15.compute-1.amazonaws.com:5432/ddk275bpq3q8rh',
ssl: true,
});

var z ='';
client.connect(function(err) {
  if (err) throw err;
  
  // connected
  console.log("Connected!");
  client.query("SELECT * FROM Persons", function (err, result) {
    if (err) throw err;
	 for (let rows of result.rows) {
		z += "City : " + rows.city + "<br>";
	}
     console.log(z);
	 res.writeHead(200, {'Content-Type': 'text/html'});
	 res.write(z);
	 return res.end();
	 
  });
  
  
	
});



	
  } else {
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}

}).listen(PORT, () => console.log(`Listening on ${ PORT }`));