var fs          = require("fs");
var request     = require("request");
// Get list of domains list from list.txt file for whois
var domainsList = fs.readFileSync("list.txt", {encoding: "utf-8"}).toString().replace(".com","").replace(".ir","").split("\r\n");
// Nic Whois address
var baseUrl     = "http://whois.nic.ir/?name=";

// Foreach on domains list
for(key in domainsList){
	// Get items one by one
	domain = domainsList[key];
	// Anonymouse function for handle the loop iteration
	(function(address){
		request(baseUrl + address + ".ir", function (err, response , body){
			// If request has an error or was not Ok ( != 200)
			if(err || response.statusCode != 200){
				err = err || response.statusCode;
				console.log("There is a problem: " + err);
				return;
			}
			// New empty console line
			console.log("");
			// Check Domain has information or not
			if(body.includes("person:"))
				console.log(address + " is Taken");
			else{
				// If you want save free doamins in green.txt, uncomment following line:
				// fs.appendFileSync("green.txt", address + ".ir\r\n");
				console.log(address + " is Free");
			}
		});
	})(domain);
}
