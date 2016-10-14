var http = require("http");
var fs = require("fs");


var classes = {
	1:"algebra",
	2:"p.e.",
	3:"english",
};

var grades = {
	algebra: "A",
	"p.e.":"C",
	english:"B"
};

var homework = {
	algebra: false,
	"p.e.": true,
	english: true
};

console.log(grades["p.e."]);

var server = http.createServer((req, res) =>{
	var classURLS = {};

	for(var className in grades){
		classURLS[className] = "/"+className+"/";
	}

	if(req.method === "GET"){
		switch(req.url){
			case "/":
				fs.readFile("index.html", (err, data) => {
					res.write(data);
					res.end();
				});
				break;

			case "/grades":
				res.write(JSON.stringify(grades));
				res.end();
				break;

			case "/schedule":
				res.write(JSON.stringify(Object.keys(grades)));
				res.end();
				break;

			case "/homework/":
				res.write(JSON.stringify(homework));
				res.end();
				break;

			default:
				for(var className in classURLS){
					var URL = "/homework" + classURLS[className];
					if(req.url === URL){
						res.write(JSON.stringify(homework[className]));
						res.end();
					}
				}
		}
	} else if(req.method === "POST"){
		var dataString = "";
		switch(req.url){
			case "/schedule":
				req.on('data', function(data) {
					dataString += data;
					if (dataString.length > 1e6){
						dataString = "";
                   		res.writeHead(413, {'Content-Type': 'text/plain'}).end();
						req.connection.destroy();
					}
				});

				req.on('end', function(){
					grades[dataString] = "A";
					res.write(JSON.stringify(Object.keys(grades)));
					res.end();
				});
				break;

			default:
				for(var className in classURLS){
					var URL = "/homework" + classURLS[className];
					if(req.url === URL){
						homework[className] = true; 
						res.write(JSON.stringify(homework[className]));
						res.end();
					}
				}	
		}
	}
});

server.listen(8000, () => {
	console.log("Server started listining on port 8000");
});