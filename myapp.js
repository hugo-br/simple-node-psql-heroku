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
    pass: 'summ3rr4in'
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