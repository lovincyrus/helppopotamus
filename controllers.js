var helppopotamus = angular.module('helppopotamus', []);

helppopotamus.controller('helppopotamusCtrl', function helppopotamusCtrl($scope, $http) {
  if (message.userMessage) {
    message.userMessage.getCurrentPosition(function(position) {
      $scope.$apply(function(){
        $scope.position = position;
        console.log(position.coords.latitude)
        
        var _url = '/conversation/api/v1/workspaces/e14c46ac-234c-464b-8e1f-550124fe1f67/message?version=2016-07-11'

        $http({
          method: 'GET',
          url: _url
        }).then(function successCallback(response) {
          $scope.helppopotamus = response.data;
          console.log($scope.helppopotamus);
        }, function errorCallback(response) {
          console.log(response);
        });

      });
    });
  }

});



// var app = angular.module("sampleApp", ["firebase"]);

// app.factory("chatMessages", ["$firebaseArray",
//   function($firebaseArray) {
//     // create a reference to the database where we will store our data
//     var randomRoomId = Math.round(Math.random() * 100000000);
//     var ref = new Firebase("https://docs-sandbox.firebaseio.com/af/array/full/" + randomRoomId);

//     return $firebaseArray(ref);
//   }
// ]);

// app.controller("ChatCtrl", ["$scope", "chatMessages",
//   function($scope, chatMessages) {
//     $scope.user = "Guest " + Math.round(Math.random() * 100);

//     $scope.messages = chatMessages;

//     $scope.addMessage = function() {
//       // $add on a synchronized array is like Array.push() except it saves to the database!
//       $scope.messages.$add({
//         from: $scope.user,
//         content: $scope.message,
//         timestamp: Firebase.ServerValue.TIMESTAMP
//       });

//       $scope.message = "";
//     };

//     // if the messages are empty, add something for fun!
//     $scope.messages.$loaded(function() {
//       if ($scope.messages.length === 0) {
//         $scope.messages.$add({
//           from: "Uri",
//           content: "Hello!",
//           timestamp: Firebase.ServerValue.TIMESTAMP
//         });
//       }
//     });
//   }
// ]);
