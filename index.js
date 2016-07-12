var fs          = require("fs");
var request     = require("request");
// Get list of domains from list.txt file for whois
var domainsList = fs.readFileSync("list.txt", {encoding: "utf-8"}).toString().replace(".com","").replace(".ir","").split("\r\n");
// The Nic Whois address
var baseUrl     = "http://whois.nic.ir/?name=";

// Foreach on domains list
for(key in domainsList){
	// Get item one by one
	domain = domainsList[key];
	// Anonymouse function for handle the loop
	(function(address){
		request(baseUrl + address + ".ir", function (err, response , body){
			// If request has an error or response will be not Ok (200)
			if(err || response.statusCode != 200){
				err = err || response.statusCode;
				console.log("There is a problem: " + err);
				return;
			}
			// New empty line
			console.log("");
			// Domain has an information or not
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