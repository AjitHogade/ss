angular.module('dataProviders.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Orders', function($http, $q,$ionicLoading) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
   /*
   var orders = function () {
        var deffered = $q.defer();
        $http({
          method: 'GET',
          url: 'http://192.168.1.102/all_orders_json'
        }).success(function (data, status, headers, config) {
          deffered.resolve(data);
        }).error(function (data, status, headers, config) {
          deffered.reject(status);
        });

        return deffered.promise;
      };
 */
  var orders = [];

  return {
    all: function() {
                    var deferred = $q.defer();
                    $http({
              method  : 'GET',
              url     : 'http://192.168.1.102/all_orders_json',
                              //  params :{id:1}
               
          }).success(function (response){
                                   // This is the data from your request
                                   deferred.resolve(response)
                              
                                //   alert(response)
                            }).error(function () {
                                  // If something was wrong
                                  deferred.reject();
                                   $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
                            }).then(function() {
                     $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
            });
                       return deferred.promise;
                },

    
    accept: function(order) {
      chats.splice(chats.indexOf(orders), 1);
    },
    reject: function(order) {
      chats.splice(chats.indexOf(orders), 1);
    },
    cancel: function(order) {
      chats.splice(chats.indexOf(orders), 1);
    },
    get: function(orderID) {
      for (var i = 0; i < orders.length; i++) {
        if (orders[i].id === parseInt(orderID)) {
          return orders[i];
        }
      }
      return null;
    }
  };
})

.factory('Clients', function($http, $q,$ionicLoading,$ionicModal,$ionicPopup ) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
 var clients = [];

  return {
    all: function() {
                    var deferred = $q.defer();
                    $http({
              method  : 'GET',
              url     : 'http://192.168.1.102/all_clients_json',
                              //  params :{id:1}
               
          }).success(function (response){
                                   // This is the data from your request
                                   deferred.resolve(response)
                              
                                //   alert(response)
                            }).error(function () {
                                  // If something was wrong
                                  deferred.reject();
                                   $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
                            }).then(function() {
                     $ionicLoading.hide().then(function(){

    });
            });
                       return deferred.promise;
                },

  
   addClient:function(client){
console.log('Clients ', client);
    $ionicLoading.show({
    content: '<ion-spinner icon="ios" ></ion-spinner>',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0
  }).then(function(){
       console.log("The loading indicator is now displayed");
    });
          var deferred = $q.defer();
                    $http({
              method  : 'POST',
              data    : client,
              url     : 'http://192.168.1.102/add_client',
                              //  params :{id:1}
               
          }).success(function (response){
                                   // This is the data from your request
                                   deferred.resolve(response);
                                //   var a = JSON.parse(response);
                                  // alert("In Success  "+a);
                              console.log(response);
        


                            }).error(function (error) {
                                  // If something was wrong
                                  alert("In error"+error)
                                  deferred.reject();
                            }).then(function() {
                     $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
       closeModal()
       
     
   
    });
            });
                       return deferred.promise;
                




   },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
  
});

