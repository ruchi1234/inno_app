/**
 * [app description : ]
 * @type {[type]}
 */
var app = angular.module('YourApp', ['ionic','ngSanitize','ngCordova','ngIOS9UIWebViewPatch','ngStorage','ngAnimate','ionic-native-transitions']);

// not necessary for a web based app // needed for cordova/ phonegap application

app.run(['$ionicPlatform',function($ionicPlatform) {
    $ionicPlatform.ready(function() {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        //if (window.cordova && window.cordova.plugins.Keyboard) {
        //  window.cordova.plugins.Keyboard.disableScroll(true);
        // }

        if (window.StatusBar) {
            // Set the statusbar to use the default style, tweak this to
            // remove the status bar on iOS or change it to use white instead of dark colors.
             //StatusBar.hide();
                StatusBar.styleDefault();
            // console.log("hide statusbar");
             //ionic.Platform.fullScreen(true,true);
        }

    });

}]);

//app run getting device id
app.run(['$rootScope', '$localStorage','myPushNotification','$state',function($rootScope, $localStorage,myPushNotification,$state) {
    $rootScope.zerocounters = [];
    $rootScope.counters = [];
    var i = 0;
    while(i < 1000) {
       if(i < 20)
       {
        $rootScope.counters.push(i+1);
        i=i+1;     
       }
       if (i >= 20 && i < 100){
         $rootScope.counters.push(i+10);
         i=i+10;
       }
       if (i >= 100 && i < 1000){
         $rootScope.counters.push(i+50);
         i= i+50;
       }
    };
    $rootScope.ispublic_profile =0;
    i = -1;
    while(i < 1000) {
       if(i < 20)
       {
        $rootScope.zerocounters.push(i+1);
        i=i+1;
       }
       if (i >= 20 && i < 100){
         $rootScope.zerocounters.push(i+10);
         i=i+10;
       }
       if (i >= 100 && i < 1000){
         $rootScope.zerocounters.push(i+50);
          i= i+50;
       }
    };
     $rootScope.go_category= function()
     {
       $state.go('app.category');
     }
     $rootScope.go_order= function()
     {
       $state.go('app.order');
     }
    $rootScope.go_wish_list= function()
     {
       $state.go('app.wish_list');
     }
     $rootScope.go_orderWise= function()
     {
       $state.go('app.orderWise');
     }
     $rootScope.go_store_list= function()
     {
       $state.go('app.store_list');
     }
     $rootScope.go_latestproduct= function()
     {
       $state.go('app.latestproduct');
     }
     $rootScope.go_search= function()
     {
       $state.go('app.productsearch');
     }
     $localStorage.version =  "1.0.8";
     $localStorage.update_time = 0;
              
    document.addEventListener("deviceready", function() {
       if (!localStorage.device_token_syt || localStorage.device_token_syt == '-1') {
            myPushNotification.registerPush();
            $localStorage.version =  "1.0.6";
            $localStorage.update_time = 0;
            
        }
        getAppVersion(function(version) {
          $localStorage.version = version;
        });
    });
    $rootScope.get_device_token = function() {
      if (localStorage.device_token_syt) {
        return localStorage.device_token_syt;
      } else {
        return '-1';
      }
  };

  $rootScope.set_device_token = function(token) {
    localStorage.device_token_syt = token;
    return localStorage.device_token_syt;
  };
  // $rootScope.itemInCart=0;
  $rootScope.myCart = {};
  //$localStorage.cart = '';
  //$localStorage.totalItemInCart =0;

}]);

//myservice device registration id to localstorage
app.service('myService', ['$http',function($http) {
    this.registerID = function(regID, platform) {
      localStorage.device_token_syt = regID;
    };

}]);
//myservice1 notification page  to localstorage
app.service('notificationPage', ['$http', function($http) {
   this.notificationPage = function(page) {
    localStorage.page = page;
  }

}]);



// config to disable default ionic navbar back button text and setting a new icon

// logo in back button can be replaced from /templates/sidebar-menu.html file

 app.config(['$ionicConfigProvider',function($ionicConfigProvider) {

    $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back').previousTitleText(false);

    // Set your appId through the setAppId method or

    // use the shortcut in the initialize method directly.

    //  FacebookProvider.init('');

}]);

/****************************************** slider ********************************/

/*********************************** check network connection *******************/

function checkConnection() {
   try{
       var networkState = navigator.connection && navigator.connection.type;
       if(!networkState || networkState=='none')
       {
          return false;
       }
       else{
             return false;
        }
      }catch(e){
        console.log(e);
      } 
}