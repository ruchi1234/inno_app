app.factory('myPushNotification', ['$http', 'PushNoti', function ($http, PushNoti) {

  return {

		registerPush: function(fn) {

			var myPushNotification = window.plugins.pushNotification,

			successHandler = function(result) {

				// alert('result = ' + result);

			},

			errorHandler = function(error) {

				 //alert('error = ' + error);

			};

			

			if (ionic.Platform.isAndroid()) {

				// myPushNotification.unregister(successHandler, errorHandler);

				myPushNotification.register(successHandler, errorHandler, {

					 'senderID': PushNoti.senderID, // **ENTER YOUR SENDER ID HERE**

					 'ecb': 'onNotificationGCM'

				});

		  }
      else if (ionic.Platform.isIOS()){
                 
                 myPushNotification.register(tokenHandler,errorHandler,{
                     "badge":"true",
                     "sound":"true",
                     "alert":"true",
                     "ecb":"onNotificationAPN"
                     });
                   
             } 

		}

   };

}]);

/******************************ios ********************/
  // iOS
    function onNotificationAPN (event) {
        
        
        //window.localStorage.setItem("latest",event.id);
        
        if ( event.alert )
        {
            navigator.notification.alert(event.alert);
        }
        if ( event.sound )
        {
            var snd = new Media(event.sound);
            snd.play();
        }
        if ( event.badge )
        {
            pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
        }
    }
    function tokenHandler(result)
    {
        
            var elem = angular.element(document.querySelector('[ng-app]'));
            var injector = elem.injector();
            var myService = injector.get('myService');
            myService.registerID(result, 'ios');
            elem.scope().$apply();
 
    }
    function errorHandler(error)
    {

    }

// push notification push to server

app.factory('SendPush',['$http', 'Config', function($http, Config) {

	var SendPush = {};

	SendPush.android = function(token) {

		return  $http({method: "post", url: 'http://www.skyafar.com/tools/push/push.php',

			data: {

				token: token,

			}

		});

	}

  	return SendPush;

}]);

// friends factory

app.factory('Messages',['$http', 'Config', function($http, Config) {

	var data = {};

	data.getMesages = function () {

		return $http(

			{

				method: 'GET', url:Config.MessagesUrl

			}

		);

	}

	data.getMessage = function () {

		return $http(

			{

				method: 'GET', url:Config.MessageUrl

			}

		);

	}

  	return data;

}]);

// push notification push to server

// for registion page...

app.factory('SignUp',['$http', 'Config', function($http, Config) {

	var data = {};

	data.registration= function( combine_data,token,platform,verison,panCard,tin,deviceID)

	{
			return $http ({ method : "post" ,url:Config.Registration,
			data : { 						registrationData :  combine_data,						token            :  token,			            platform         : platform,           				verison          : verison,            			deviceID         : deviceID,						auth_token       : "innorade"					 }			});					}

  	return data;

}]);



// fof Profile page.....



app.factory('profileData',['$http', 'Config', function($http, Config) {

	var data = {};

	data.Profile_data= function(userId,storeID)

	{

        

			return $http ({ method : "post" ,url:Config.Profile,

			data :{ 

					userId : userId,
					storeID : storeID,
					auth_token : localStorage.auth_token

				}

			});				

	}

  	return data;

}]);

// fof login page.....



 app.factory('login',['$http', 'Config', function($http, Config) {

	var data = {};

	data.loginpage= function(combine_data)	{
			return $http ({ method : "post" ,url:Config.Login,			data :{ 					combine_data       : combine_data,					auth_token         : "innorade"				}			});					}
  

  	return data;

}]);



// for forgot page.....

   app.factory('forgot',['$http', 'Config', function($http, Config) {

    var data = {};

    data.forgotpage= function(email)

    {

        

            return $http ({ method : "post" ,url:Config.Forgot,

            data :{ 

                    email : email,
                    auth_token : "innorade"

                   

                }

            });             

    }

    return data;

}]);













// for category page.....



    app.factory('get_cat',['$http', 'Config', function($http, Config) {

	var data = {};

	data.getcategory= function(cat_id,shop_id,extraKey,userId)

	{

			return $http ({ method : "post" ,url:Config.Category,

			data :{ 

					cat_id   : cat_id,

					shop_id  : shop_id,

					extraKey : extraKey,

					userId   : userId,
					auth_token : localStorage.auth_token

					

				}

			});				

	}

	data.loadMore= function(cat_id,shop_id,extraKey,userId,start)

	{

			return $http ({ method : "post" ,url:Config.LoadCategory,

			data :{ 

					cat_id    	 : cat_id,

					shop_id  	 : shop_id,

					extraKey 	 : extraKey,

					userId   	 : userId,

					start        : start,
					
					
					auth_token 	 : localStorage.auth_token

					

				}

			});				

	}

  	return data;

}]);

// for Product page.....



 app.factory('product_Info',['$http', 'Config', function($http, Config) {

	var data = {};

	data.productInfo= function(product_id,currentselectedShop,userId)

	{

			return $http ({ method : "post" ,url:Config.Product,

			data :{ 

					product_id    : product_id,

					currentselectedShop: currentselectedShop,

					userId   : userId,
					auth_token : localStorage.auth_token

				}

			});				

	}

	data.productImage = function(product_id)

	{

	    //console.log(Config.Product-Image);

	    return $http ({ method : "post" ,url:"http://innorade.in/web/web_services/ws_Product_Image",

            data :{ 

                    product_id    : product_id,
                    auth_token : "innorade"

                 }

            });

	}

  	return data;

}]);

// Reorder product Info

app.factory('redorderProduct_Info',['$http', 'Config', function($http, Config) {

	var data = {};

	

	data.productInfo= function(productid,currentselectedShop,parentID,userId)

	{

		  

			return $http ({ method : "post" ,url:Config.ReProduct,

			data :{ 

					product_id    : productid,

					currentselectedShop: currentselectedShop,

					parentID:parentID,

					userId   : userId,
					auth_token : localStorage.auth_token

				}

			});				

	}

	data.productImage = function(product_id)

	{

	    console.log(Config.Product-Image);

	    return $http ({ method : "post" ,url:"http://innorade.in/web/web_services/ws_Product_Image",

            data :{ 

                    product_id    : productid,
                    auth_token : "innorade"

                 }

            });

	}

  	return data;

}]);

// for Product List page.....

app.factory('productlist',['$http', 'Config', function($http, Config) {

    var data = {};

    

    data.getproductList = function(cat_id,shop_id,userId)

    {

         return $http ({ method : "post" ,url:Config.ProductList,

         data :{ 

              cat_id    : cat_id,

              shop_id   :shop_id,

              userId   : userId,
              auth_token : localStorage.auth_token

             }

          });             

    }

    data.loadMore = function(cat_id,shop_id,userId,start)

    {

         return $http ({ method : "post" ,url:Config.MoreProductList,

         data :{ 

              cat_id    : cat_id,

              shop_id   :shop_id,

              userId   : userId,

              start : start,
              auth_token : localStorage.auth_token

             }

          });             

    }

    data.getProductFeature = function(pro_id)

    {

           return $http ({ method : "post" ,url:Config.ProductFeature,

            data :{ 

                    pro_id    : pro_id,
                    auth_token : "innorade"

                }

            });             

    }

    return data;

}]);
/****************************** Code for Get latest Product*******************************************/
app.factory('newProduct',['$http', 'Config', function($http, Config) {

    var data = {};

    

    data.getnewProduct = function(shop_id,userId)

    {

         return $http ({ method : "post" ,url:Config.LatestProduct,

         data :{ 


              shop_id   :shop_id,

              userId   : userId,
              auth_token : localStorage.auth_token

             }

          });             

    }

    data.loadMore = function(shop_id,userId,start)

    {

         return $http ({ method : "post" ,url:Config.LatestMoreProductList,

         data :{ 


              shop_id   :shop_id,

              userId   : userId,

              start : start,
              auth_token : localStorage.auth_token

             }

          });             

    }

    data.getProductFeature = function(pro_id)

    {

           return $http ({ method : "post" ,url:Config.ProductFeature,

            data :{ 

                    pro_id    : pro_id,
                    auth_token : "innorade"

                }

            });             

    }

    return data;

}]);

/******************************End Code for Get Latest Product *************************************************************/
// fof Product  page.....



    app.factory('getproduct',['$http', 'Config', function($http, Config) {

	var data = {};

	data.getProduct= function(pro_id)

	{

			return $http ({ method : "post" ,url:Config.Product,

			data :{ 

					pro_id    : pro_id,
					auth_token : "innorade"

				}

			});				

	}

  	return data;

}]);



//for search products....

  

  app.factory('search',['$http', 'Config', function($http, Config) {

	var data = {};

	data.mysearch= function(product1, product2, product3, product4)

	{

			var combine_data= product1+'_/'

							    + product2+'_/'

							        +product3+'_/'

							           +product4+'_/';

                                      

                                      

                 		console.log(combine_data);

             					

			return $http ({ method : "post" ,url:Config.Registration,

			data : { 

						registrationData :  combine_data

					 }

			});				

	}

  	return data;

}]);



// For Select Store

 app.factory('SelectStore',['$http', 'Config', function($http, Config) {

	var data = {};

	data.Select_Store= function(user_id,version,update_time,deviceID)

	{

			return $http ({ method : "post" ,url:Config.Selectstore,

			data : { 

						user_id    :  user_id,
						version    : version,
						update_time : update_time,
            deviceID    : deviceID,
						auth_token : localStorage.auth_token
					 }

			});				

	}

  	return data;

}]);





// For  Store code Authenticate

 app.factory('SelectCode',['$http', 'Config', function($http, Config) {

	var data = {};

	data.Select_Code= function(store_code,user_id)

	{

			return $http ({ method : "post" ,url:Config.Selectcode,

			data : { 

						store_code :  store_code,

						user_id    :  user_id,
						auth_token : localStorage.auth_token

					 }

			});				

	}

    data.StoreChange= function(user_id,shop_id)

	{

			return $http ({ method : "post" ,url:Config.StoreChange,

			data : { 

						store_id :  shop_id,

						user_id    :  user_id,
						auth_token : localStorage.auth_token

					 }

			});				

	}

  	return data;

}]);



app.factory('placeOrder',['$http','Config',function($http,Config){

    var data= {};

    data.placeOrder = function(tempCartItem,user_id,currentSelectedShop)

    {

        return $http({

            method : "post",

            url:Config.placeOrder,

            data : { 

                        tempCartItem :  tempCartItem,

                        user_id    :  user_id,

                        currentSelectedShop : currentSelectedShop,
                        auth_token : "innorade"

                     }

        });

    }

    return data;

}]);



// Factory for SearchITems

app.factory('searchItem',['$http','Config',function($http,Config){

    var data= {};

    data.search_item = function(searchData,storeId,userID)

    {

        return $http({

            method : "post",

            url:Config.Search,

            data : { 

                        searchData :  searchData,

                        storeId    :  storeId,

                        userID     :  userID,
                        auth_token : localStorage.auth_token

                    },

                   beforeSend : function()    {           

                    if(currentRequest != null) {

                      currentRequest.abort();

                        }

                    }

			    	

        });

    }
    
    data.loadSearch_item = function(searchData,storeId,userID,start)

    {

        return $http({

            method : "post",

            url:Config.LoadSearch,

            data : { 

                        searchData :  searchData,

                        storeId    :  storeId,

                        userID     :  userID,
                        
                        start	   :  start,
                        
                        auth_token :  localStorage.auth_token

                    },

                   beforeSend : function()    {           

                    if(currentRequest != null) {

                      currentRequest.abort();

                        }

                    }

			    	

        });

    }

    return data;

}]);

app.factory('myOrder',['$http','Config',function($http,Config){

   var data = {};

   data.myOrderData = function(userId,storeId){

       return $http({

          method : "post",

          url  : Config.MyOrder,

          data : {

              userId : userId,

              storeId : storeId,
              auth_token : localStorage.auth_token

          } 

       });

   } 
   
   data.myProOrderData = function(userId,storeId,start){

       return $http({

          method : "post",

          url  : Config.LoadMyOrder,

          data : {

              userId     : userId,
			  start      : start,
              storeId    : storeId,
              auth_token : localStorage.auth_token

          } 

       });

   }

   data.myOrderWiseLst = function(userId,storeId){

       return $http({

          method : "post",

          url  : Config.OrderWise,

          data : {

              userId : userId,

              storeId : storeId,
              auth_token : localStorage.auth_token

          } 

       });

   }
    data.loadMyOrderWiseLst = function(userId,storeId,start){

       return $http({

          method : "post",

          url  : Config.LoadOrderWise,

          data : {

              userId     : userId,
			  start      : start,
              storeId    : storeId,
              auth_token : localStorage.auth_token

          } 

       });

   }

   data.productPrice = function(myId,currentShop,productId){

       return $http({

          method : "post",

          url  : Config.ProductPrice,

          data : {

              productId : productId,

              storeId : currentShop,

              userId : myId,
              auth_token : localStorage.auth_token

          } 

       });

   }

   data.orderWiseProduct = function(myId,currentShop,orderId){

       return $http({

          method : "post",

          url  : Config.OrderWiseProduct,

          data : {

              orderId : orderId,

              storeId : currentShop,

              userId : myId,
              auth_token : localStorage.auth_token

          } 

       });

   }

    

   return data;

}])



app.factory('myFavourite',['$http','Config',function($http,Config){

   var data = {};

   data.myFavouriteData = function(productID,userID,status,store_id){

       return $http({

          method : "post",

          url  : Config.MyFavourite,

          data : {

              productID : productID,

              userID    : userID,

              status    : status,

              store_id  : store_id,
              auth_token : localStorage.auth_token

          } 

       });

   } 
   
   data.myDyfavourite = function(productID,userID,store_id){

       return $http({

          method : "post",

          url  : Config.MyDyFavourite,

          data : {

              productID  : productID,
              userID     :  userID,
              store_id   : store_id,
              auth_token : localStorage.auth_token

          } 

       });

   }

   return data;

}])



// Code foe Wish List or favourite List

app.factory('myWishList',['$http','Config',function($http,Config){

   var data = {};

   data.myWishListData = function(userID,store_id){

       return $http({

          method : "post",

          url  : Config.MywishList,

          data : {

              userID    : userID,

              store_id  : store_id,
              auth_token : localStorage.auth_token

          } 

       });

   } 
   data.loadWishListData = function(userID,store_id,start){

       return $http({

          method : "post",

          url  : Config.LoadMywishList,

          data : {

              userID    : userID,
			  start     : start,
              store_id  : store_id,
              auth_token : localStorage.auth_token

          } 

       });

   } 

   return data;

}])



// Code for Update Profile

app.factory('Updateprofile',['$http', 'Config', function($http, Config) {

	var data = {};

	data.updateRecord= function(profileID,user_data,hdnPhone)
  {
      return $http ({ method : "post" ,url:Config.UpdateProfile,
      data : { 
      			profileID :  profileID,
            user_data : user_data,
            hdnPhone    : hdnPhone,
						auth_token : "innorade"
          }
      });				

	}

  	return data;

}]);



app.factory('Photos',['$http', 'Config', function($http, Config) {

	var data = {};

	data.getPosts = function () {

		return $http(

			{

				method: 'GET', url:Config.PhotoUrl

			}

		);

	}

  	return data;

}]);



app.factory('saveContactDetail',['$http', 'Config', function($http, Config) {

	var data = {};

	data.sendIssue = function (issue,subject,msg,store_id,user_id) {

		var combine_data= issue+'_/'

							  +subject+'_/'

							  	 +msg+'_/'

							    	+store_id+'_/'

							     		+user_id;

		return $http(

			{

				method: 'POST', 

				url:Config.Complain,

				data:

				{

					complainData:combine_data

					

				}

			}

		);

	}

  	return data;

}]);



// For Support  Get All messaeg tpoicwise

app.factory('getMessageDetail',['$http', 'Config', function($http, Config) {

	var data = {};

	data.sendIssue = function (issue,subject,msg,store_id,user_id) {

		var combine_data= issue+'_/'

							  +subject+'_/'

							  	 +msg+'_/'

							    	+store_id+'_/'

							     		+user_id;

		return $http(

			{

				method: 'POST', 

				url:Config.Complain,

				data:

				{

					complainData:combine_data,
					auth_token : "innorade"

					

				}

			}

		);

	}

  	return data;

}]);



app.factory('getMessageDetail',['$http', 'Config', function($http, Config) {

	var data = {};

	data.getMessage = function (subject_id) {

		var subject_id= subject_id;

		return $http(

			{

				method: 'POST', 

				url:Config.ComplainStatusDetail,

				data:

				{

					subject_id:subject_id,
					auth_token : "innorade"

					

				}

			}

		);

	}

	

	data.reply= function(msg,subject_id,store_id,user_id)

	{

		var msg=msg;

		var subject_id=subject_id;

		var store_id=store_id;

		var user_id=user_id;

		

		return $http({

			

			    method: 'POST', 

				url:Config.ComplainStatusReply,

				data:

				{

					msg:msg,

					subject_id:subject_id,

					store_id:store_id,

					user_id:user_id,
					auth_token : ""

					

				}

			

		});

		

	}

	

	

	

	

  	return data;

}]);



// for Total Item page.....



    app.factory('totalItme',['$http', 'Config', function($http, Config) {

	var data = {};

	data.gettotalItme   = function(shopId,user_ID)

	{

          var searchData='';

			return $http ({ method : "post" ,url:Config.Search,

			data :{ 

				    searchData  :   searchData,

					storeId     :   shopId,

					userID      :   user_ID,
					auth_token : localStorage.auth_token

				}

			});				

	}

  	return data;

}]);



app.factory('getMessageReply',['$http', 'Config', function($http, Config) {

	var data = {};

	data.getMessage = function (store_id,user_id) {

		var combine_data= store_id+'_/'+user_id;

		return $http(

			{

				method: 'POST', 

				url:Config.ComplainStatus,

				data:

				{

					complainData:combine_data,
					auth_token : "innorade"

					

				}

			}

		);

	}

  	return data;

}]);





app.factory('notifyMe',['$http', 'Config', function($http, Config) {

	var data = {};

	data.notifyMe= function(productId,userId,storeId)

	{

		

			return $http ({ 

			method : "post" ,

			url:Config.Notify,

			data :{ 

					productId   : productId,

					userId      : userId,

					storeId     : storeId ,
					auth_token : localStorage.auth_token

				}

			});				

	}

  	return data;

}]);



// Code for ChangePassword



app.factory('changePassword',['$http', 'Config', function($http, Config) {

	var data = {};

	data.change_Password= function(userId,password,new_pass)

	{

		

			return $http ({ 

			method : "post" ,

			url:Config.cPassword,

			data :{ 

					userId       : userId,

					password     : password,

					new_pass     : new_pass,
					auth_token : localStorage.auth_token

				}

			});				

	}

  	return data;

}]);



app.factory('changeorderStatus',['$http', 'Config', function($http, Config) {

	var data = {};

	data.changeOrderStatus= function(orderId,key)

	{

		

			return $http ({ 

			method : "post" ,

			url:Config.ChangeStatus,

			data :{ 

					 

					orderId         : orderId,

					keydata         : key,
					auth_token : "innorade"

				}

			});				

	}

  	return data;

}]);
app.factory('timeoutHttpIntercept',['$rootScope', '$q', function ($rootScope, $q) {
    return {
      'request': function(config) {
        config.timeout = 20000;
        return config;
      }
    };
 }]);