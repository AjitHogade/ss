angular.module('data.controllers', [])

.controller('LogInCtrl', function($scope, $state,$http, $q,$ionicLoading,$location,$rootScope) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);

          var deferred = $q.defer();
                    $http({
              method  : 'POST',
              data    : user,
              url     : 'http://192.168.1.102/login',
                              //  params :{id:1}
               
          }).success(function (response){
                                   // This is the data from your request
                                   deferred.resolve(response);
                                //   var a = JSON.parse(response);
                                  // alert("In Success  "+a);
                              console.log(response);
                                if(response.role != null && response.role == "admin"){
                                       $rootScope.hideIfAdmin = true;

                        $location.path("tab/dash");
                                }else if(response.role != null && response.role == "client"){
                        $location.path("tab/dash");
                                    $rootScope.hideIfClient = true;

                                }else{


                                }
                            }).error(function (error) {
                                  // If something was wrong
                                  alert("In error"+error)
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
                }

   // $state.go('tab.dash');
  
})

.controller('DashCtrl', function($scope) {

})



.controller('OrderCtrl', function($scope, Orders,   $ionicLoading) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
   $scope.$on('$ionicView.enter', function() {

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0
  });
     // Code you want executed every time view is opened
       
        Orders.all().then(function (response) {

 $scope.orders = response;
       

   }, function (err) {
          // Here will be if there was an error
   }).then(function(){
  //   $scope.registered = true;
   })
         $scope.accept = function(orders) { 
         Orders.remove(order);
  };

  })
 
   
 
  })

 


.controller('OrderDetailCtrl', function($scope, $stateParams, Orders) {

  $scope.orders = Orders.get($stateParams.orderId);
}) 

.controller('ProductsCtrl', function($scope,Chats,$ionicModal) {
$ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
    $scope.chats =  Chats.all();
//alert(allChats)

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ClientsCtrl', function($scope, Clients,$ionicModal,$http,$q,$ionicLoading,$ionicPopup) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //$scope.chats = Chats.all();
   $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
 $scope.abc = function(){
Clients.all().then(function (response) {

 $scope.clients = response;
   }, function (err) {
          // Here will be if there was an error
   })

 }
   $scope.$on('$ionicView.enter', function() {
$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0
  });
 Clients.all().then(function (response) {

 $scope.clients = response;
   }, function (err) {
          // Here will be if there was an error
   })
})



$scope.add = function(client){
////Clients.addClient(client);
Clients.addClient(client).then(function (response) {
$scope.closeModal();
                        var alertPopup = $ionicPopup.alert({
       title: client.name,
       template: response,
       buttons: [
     { text: '<i class="ion-android-add" style="font-size:32px"></i><b> Done</b>',
                type: 'button-balanced',
       onTap:function(e){
       // alert(); return CommonUtilityService.
$scope.abc();     
 }
     },]
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
        }, function (err) {
          // Here will be if there was an error
   })
}

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})  

.controller('ClientDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MoreCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
