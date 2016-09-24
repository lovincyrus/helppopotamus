// vars from makanmana
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// seperate var
//var app = angular.module('csa', []);

// set up port
app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html')
})

// spin up server
app.listen(app.get('port'), function(){
    console.log('running on port', app.get('port'))
})

// get API from ken hua and take Postman's 
app.get('/api/getmakan', function (req, res) {
	var lat = req.param('lat');

	var lng = req.param('lng');
	
	var http = require("https");
	
	var options = {
		"method": "GET",
		"hostname": "maps.googleapis.com",
		"port": null,
		"path": "/maps/api/place/nearbysearch/json?location=" + lat + "%2C" + lng + "&radius=10000&keyword=malaysian%2Crestaurants&key=AIzaSyDvsvD6kNd2VrPRUR-hsDYp-VIYRDw1yo8",
		"headers": {
			"content-type": "multipart/form-data; boundary=---011000010111000001101001",
			"cache-control": "no-cache",
			"postman-token": "43371ba6-9e3d-1740-1233-5f5fb03e7b60"
		}
	};

	var request = http.request(options, function (response) {
		var chunks = [];

		response.on("data", function (chunk) {
			chunks.push(chunk);
		});

		response.on("end", function () {
			var body = Buffer.concat(chunks);
			var list = JSON.parse(body);
			var locations = [list.results.length];
			
			for (var i = 0; i < list.results.length; i++) {
				if (list.results[i].permanently_closed !== true) {
					locations[i] = { name: list.results[i].name, latitude: list.results[i].geometry.location.lat, longitude: list.results[i].geometry.location.lng, address: list.results[i].vicinity,  }
					console.log(locations[i]);
				}
			}

			res.send(locations);
		});
	});

	request.end();
})


// app.controller('MessageController', ['$scope','$http', function($scope, $http) {

//     $scope.countryList = [
//         { name: 'Nigeria (+234)', value: '234' },
//         { name: 'United Kingdom (+44)', value: '44' },
//         { name: 'United States (+1)', value: '1' }
//     ];

//     $scope.sendMessage = function() {

//         $scope.successMessage = false;
//         $scope.errorMessage = false;

//         var phoneNo = $scope.countryCode + $scope.mobile;
//         var message = $scope.message;

//         if ( $scope.mobile.charAt(0) === '0') {
//             var phoneNo = $scope.countryCode + $scope.mobile.slice(1);
//         }

//         $http({
//             method: 'GET',
//             url: 'https://webtask.it.auth0.com/api/run/wt-prosperotemuyiwa-gmail_com-0/sms?phoneno=' + phoneNo + '&message=' + message
//         }).then( function(response) {
//             $scope.successMessage = true;
//         }, function(err) {
//             $scope.errorMessage = true; 
//         });
//     };

// }]);







// app.get('/api/getmakan', function (req, res) {
//     var lat = req.param('lat');

//     var lng = req.param('lng');
    
//     var http = require("https");
    
//     var options = {
//         "method": "GET",
//         "hostname": "maps.googleapis.com",
//         "port": null,
//         "path": "/maps/api/place/nearbysearch/json?location=" + lat + "%2C" + lng + "&radius=10000&keyword=malaysian%2Crestaurants&key=AIzaSyDvsvD6kNd2VrPRUR-hsDYp-VIYRDw1yo8",
//         "headers": {
//             "content-type": "multipart/form-data; boundary=---011000010111000001101001",
//             "cache-control": "no-cache",
//             "postman-token": "43371ba6-9e3d-1740-1233-5f5fb03e7b60"
//         }
//     };

//     var request = http.request(options, function (response) {
//         var chunks = [];

//         response.on("data", function (chunk) {
//             chunks.push(chunk);
//         });

//         response.on("end", function () {
//             var body = Buffer.concat(chunks);
//             var list = JSON.parse(body);
//             var locations = [list.results.length];
            
//             for (var i = 0; i < list.results.length; i++) {
//                 if (list.results[i].permanently_closed !== true) {
//                     locations[i] = { name: list.results[i].name, latitude: list.results[i].geometry.location.lat, longitude: list.results[i].geometry.location.lng, address: list.results[i].vicinity,  }
//                     console.log(locations[i]);
//                 }
//             }

//             res.send(locations);
//         });
//     });

//     request.end();
// })