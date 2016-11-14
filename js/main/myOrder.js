// Category List

app.controller("myOrderCtrl", ['$scope', '$state', '$localStorage', '$sessionStorage', '$rootScope', '$location', 'myOrder', '$ionicPopup', '$timeout','$ionicHistory',

function($scope, $state, $localStorage, $sessionStorage, $rootScope, $location, myOrder, $ionicPopup, $timeout,$ionicHistory) {

    // checkConnection();

     if(checkConnection())

        { $state.go('app.error_page');}

    if (!$localStorage.profile) {

        $state.go('app.login');

    }

    $scope.noMoreOrdersAvailable = true;

   

    var myId = $localStorage.profile;

    var currentShop = $localStorage.currentSelectedShop;

    var shopWise = 'cart_' + $localStorage.cart;

    var shopWiseItem = 'totalItemInCart_' + $localStorage.cart;



    $scope.items = [];

    $scope.orderWise_items = [];

    $scope.latestproduct = $localStorage.latestProduct;

    $scope.wishList = $localStorage.wishList;

    if ($localStorage.shopWiseItem) {



        $rootScope.itemInCart = $localStorage.shopWiseItem;

    } else {



        $localStorage.shopWiseItem = 0;

        $rootScope.itemInCart = $localStorage.shopWiseItem;

    }





    



	

	$rootScope.ordering = $localStorage.ordering;

	$scope.orderProLimit=0;

	$scope.items=[];

	

    $scope.getmyOrder = function() {

         $scope.noMoreproOrdersAvailable = true;

    	$scope.loadingdata = 1;

        myOrder.myOrderData(myId, currentShop).success(function(posts) {

        	$scope.loadingdata = 2;

            $scope.items = posts.data1.records;

            $scope.orderProLimit = $scope.items.length;

            if(posts.remainingData > 0)

            {

                 $scope.noMoreproOrdersAvailable = false;     

            }

            else

            {

                 $scope.noMoreproOrdersAvailable = true;     

            }



        }).error(function() {



        });

    };

    

    $scope.loadMoreProOrder = function() {

    	

    	$scope.loadingdata = 1;

    	var orderProLimit =$scope.orderProLimit;

        myOrder.myProOrderData(myId, currentShop,orderProLimit).success(function(posts) {

        	$scope.loadingdata = 2;

            $scope.items = $scope.items.concat(posts.data1.records);

            $scope.orderProLimit = $scope.items.length;

             $scope.$broadcast('scroll.infiniteScrollComplete');

            if(posts.remainingData > 0)

            {

                 $scope.noMoreproOrdersAvailable = false;     

            }

            else

            {

                 $scope.noMoreproOrdersAvailable = true;     

            }



        }).error(function() {



        });

    };

    

  $scope.reload = function(){window.location.reload();}

  $scope.noMoreOrdersAvailable = true;

  $scope.orderLimit=0;

  $scope.orderWise_items=[];

    $scope.getOrderWiseLst = function() {

    	$scope.loadingdata = 1;

        myOrder.myOrderWiseLst(myId, currentShop).success(function(posts) {

        	$scope.loadingdata = 2;

            $scope.orderWise_items = posts.data1.records;

            $scope.orderLimit=$scope.orderWise_items.length;

             $scope.currency  = $localStorage.currencyCode;

             $scope.mrp= $localStorage.mrp;

            if(posts.remainingData > 0)

            {

                 $scope.noMoreOrdersAvailable = false;     

            }

            else

            {

                 $scope.noMoreOrdersAvailable = true;     

            }



        }).error(function() {

            $scope.orderWise_items = [];

        });



    };

    

    // Load More order

    $scope.loadMoreOrder = function(){

    	var orderLimit =$scope.orderLimit;

    	myOrder.loadMyOrderWiseLst(myId, currentShop,orderLimit).success(function(posts) {

        	$scope.loadingdata = 2;

            $scope.orderWise_items =  $scope.orderWise_items.concat(posts.data1.records);

            $scope.orderLimit=$scope.orderWise_items.length;

             $scope.currency  = $localStorage.currencyCode;

             $scope.mrp= $localStorage.mrp;

            if(posts.remainingData > 0)

            {

                 $scope.noMoreOrdersAvailable = false;     

            }

            else

            {

                 $scope.noMoreOrdersAvailable = true;     

            }



        }).error(function() {

            $scope.orderWise_items = [];

        });

    }

    

     $scope.getProductId = function(productID,parentId) {

        $localStorage.productID = productID;

        if(parentId){

        	 $localStorage.productParentID = parentId;

        }else{

        	 $localStorage.productParentID = productID;

        }

       

       

    };

    

	$scope.cover=0;

    $scope.reorder = function(index) {

    	

        $scope.latestPrice = 0;

        myOrder.productPrice(myId, currentShop, $scope.items[index].id).success(function(posts) {

            $scope.latestPrice = parseInt(posts.data);



            $rootScope.myCart = {

                prduct_id : $scope.items[index].id,

                product_name : $scope.items[index].name.replace(', ', " "),

                quantity : $scope.items[index].quantity,

                pkgquantity : $scope.items[index].pkgquantity,

                price : $scope.latestPrice,

                image : $scope.items[index].image,

                color : $scope.items[index].child,

                productParent_id : $scope.items[index].parrentId,

                total : 0

            };



                

						$scope.cover=1;

                    // console.log('add item in old cart');

                    if ($localStorage.shopWise) {

                        

                        //var totalCartItem = $localStorage.shopWise + ', ' + JSON.stringify($rootScope.myCart);

                        //$localStorage.shopWise = totalCartItem;

                        //$rootScope.itemInCart = parseInt($rootScope.itemInCart) + parseInt($scope.items[index].quantity);

                        //$localStorage.shopWiseItem = $rootScope.itemInCart;

                        

                        // console.log($localStorage.shopWise);

                        var flag=0;

                        var tempcart ="";

                        var addQuantity = 0;

                        var myCartItem = $localStorage.shopWise.split(', ');



                        var lenght = myCartItem.length;

                        angular.forEach(myCartItem, function(value, key) {



                            var productWise = eval('(' + value + ')');

                            for (i in productWise) {

                                //console.log(productWise['prduct_id'] +" : "+$scope.items[index].id) ;

                                if (productWise['prduct_id'] == $scope.items[index].id && flag == 0) {

                                  // console.log("i am in match");

                                    productWise['quantity'] = parseInt(productWise['quantity']) + parseInt($scope.items[index].quantity);

                                    flag = 1;

                                    addQuantity = parseInt($scope.items[index].quantity);

                                     //console.log(addQuantity);



                                }

                            }

                            if (key < lenght - 1) {

                                tempcart += JSON.stringify(productWise) + ', ';

                            } else {

                                tempcart += JSON.stringify(productWise);

                            }



                        });

                        if (flag == 1) {

                            // console.log(tempcart);

                            $localStorage.shopWise = tempcart;

                            flag = 0;

                            tempcart = "";

                            //console.log("after Adding new element in cart " + jsonObj);

                        } else {

                            var totalCartItem = $localStorage.shopWise + ', ' + JSON.stringify($rootScope.myCart);

                            $localStorage.shopWise = totalCartItem;

                            // console.log("new product Append :" + JSON.stringify($localStorage.shopWise));



                        }



                    $rootScope.itemInCart = parseInt($rootScope.itemInCart) + addQuantity;

                    $localStorage.shopWiseItem = $rootScope.itemInCart;





                    } else {

                        var totalCartItem = JSON.stringify($rootScope.myCart);

                        $localStorage.shopWise = totalCartItem;

                        $rootScope.itemInCart = parseInt($scope.items[index].quantity);

                        $localStorage.shopWiseItem = $rootScope.itemInCart;



                    }

                     $state.go('app.order');

                     //console.log($rootScope.myCart);



               

          



            //console.log('selected index' + JSON.stringify($rootScope.myCart));



        }).error(function() {

            $scope.orderWise_items = [];

        });



    };

    $scope.cover=0;

    $scope.orderReorder= function(orderId,getVal){

    	$localStorage.orderId=orderId;

    	$localStorage.getVal=getVal;

    	// console.log($localStorage.getVal+'    '+$localStorage.orderId);

    	 $state.go('app.reorderPage');

    }

    $scope.orderWiseReorder = function(orderId) {

    	

       

        var flag = 0;

         $scope.cover=1;

        var tempcart = "";

        myOrder.orderWiseProduct(myId, currentShop, orderId).success(function(posts) {

            $scope.orderWiseItem = posts.data1.records;

           

            $scope.cover=0;

            angular.forEach($scope.orderWiseItem, function(values, key) {

                $rootScope.myCart = {

                    prduct_id : values.id,

                    product_name : values.name.replace(', ', " "),

                    quantity : values.quantity,

                    pkgquantity : values.pkgquantity,

                    price : values.price,

                    image : values.image,

                    color : 7,

                    total : 0

                };



                if ($localStorage.shopWise) {

                    // console.log($localStorage.shopWise);

                    var myCartItem = $localStorage.shopWise.split(', ');



                    var lenght = myCartItem.length;

                    angular.forEach(myCartItem, function(value, key) {



                        var productWise = eval('(' + value + ')');

                        for (i in productWise) {

                            //console.log(productWise['prduct_id']+' : '+ values.id);

                            if (productWise['prduct_id'] == values.id && flag == 0) {

                                productWise['quantity'] = parseInt(productWise['quantity']) + parseInt(values.quantity);

                                flag = 1;

                                //console.log(parseInt(productWise['quantity']));

                                //console.log(parseInt(values.quantity));



                            }

                        }

                        if (key < lenght - 1) {

                            tempcart += JSON.stringify(productWise) + ', ';

                        } else {

                            tempcart += JSON.stringify(productWise);

                        }



                    });

                    if (flag == 1) {

                        // console.log(tempcart);

                        $localStorage.shopWise = tempcart;

                        flag = 0;

                        tempcart = "";

                        //console.log("after Adding new element in cart " + jsonObj);

                    } else {



                        var totalCartItem = $localStorage.shopWise + ', ' + JSON.stringify($rootScope.myCart);

                        $localStorage.shopWise = totalCartItem;



                        // console.log("new product Append :" + JSON.stringify($localStorage.shopWise));



                    }



                    $rootScope.itemInCart = parseInt($rootScope.itemInCart) + parseInt(values.quantity);

                    $localStorage.shopWiseItem = $rootScope.itemInCart;



                } else {

                    var totalCartItem = JSON.stringify($rootScope.myCart);

                    $localStorage.shopWise = totalCartItem;

                    $rootScope.itemInCart = parseInt(values.quantity);

                    $localStorage.shopWiseItem = $rootScope.itemInCart;



                }



                // console.log("my cart item " + $localStorage.shopWise);

                $state.go('app.order');

                  

            });



        }).error(function() {

            $scope.orderWise_items = [];

        });

        

       

    };



}]);

//Thank You list page of app

app.controller('thankyouCtrl', ['$state', '$scope','$rootScope','$localStorage','$ionicPopup',function($state, $scope,$rootScope,$localStorage,$ionicPopup) {

     

    if(checkConnection())

    { $state.go('app.error_page');}

    var shopWise = 'cart_' + $localStorage.cart;

    var shopWiseItem = 'totalItemInCart_' + $localStorage.cart;

        

        if ($localStorage.shopWiseItem) {



        $rootScope.itemInCart = $localStorage.shopWiseItem;

    } else {



        $localStorage.shopWiseItem = 0;

        $rootScope.itemInCart = $localStorage.shopWiseItem;

    }

    $scope.latestproduct = $localStorage.latestProduct;

    $scope.wishList = $localStorage.wishList;

    $rootScope.ordering = $localStorage.ordering;

    // console.log($scope.wishList + '   hhhhhhh    '+$rootScope.itemInCart);

     /***********************Wish List Redirection ***************/

          $scope.wishDirection=function (){

       	if($localStorage.wishList){

       		$state.go('app.wish_list');

       	}else{

       		var alertPopup = $ionicPopup.alert({

                title : 'Your Wish List',

                template : 'Your WishList is empty!'

            });

       	}

    	

    }

    /******************** End Wish List Redirection **************/

    /*************code for Order page redirection************/

    $scope.orderRedirection=function(){

    	var shopWise = 'cart_' + $localStorage.cart;

        $localStorage.shopWise

        if($localStorage.shopWise){

        	$state.go('app.order');

        }else{

        	 var alertPopup = $ionicPopup.alert({

                title : 'Your cart',

                template : 'Your cart is empty!'

            });

        }

    }

    

    

     /*************End code for Order page redirection************/

    

}]); 

