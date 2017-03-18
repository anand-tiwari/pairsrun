const express = require('express');
const app = express();
const bodyParser= require('body-parser');
var port = process.argv[2] || 8888;

app.listen(port, function() {
	console.log(`app listening on http://localhost:${port}`);
});


app.use('/app', express.static(__dirname + '/app'));

app.get('/*', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});
