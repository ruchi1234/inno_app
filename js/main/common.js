app.controller('product_serach', ['$scope', '$sessionStorage', '$localStorage', '$rootScope', '$state', '$location', 'myFavourite','$ionicPopup','searchItem','totalItme','myWishList','notifyMe','$ionicHistory',

function($scope,$sessionStorage, $localStorage, $rootScope, $state, $location,myFavourite,$ionicPopup,searchItem,totalItme,myWishList,notifyMe,$ionicHistory) {

     

    //$scope.load_data = false;

    $scope.limit = 0;

    $scope.noMoreItemsAvailable = true;

    if(checkConnection())

        { $state.go('app.error_page');}

    



    $scope.latestproduct = $localStorage.latestProduct;

    $scope.shopName=$localStorage.currentSelectedShopName;

    $rootScope.ordering = $localStorage.ordering;

    /*************code for set previous URl************/

    $rootScope.location = $location;

    $localStorage.preURL = $rootScope.location.path();

    $scope.loadingdata = 1;

    /*************code for set previous URl************/

    

    

    /**********End code for Order page redirection **********/

    var cat_id = $localStorage.subcategoryId;

    var shopWise = 'cart_' + $localStorage.cart;

    var shopWiseItem = 'totalItemInCart_' + $localStorage.cart;

    $scope.wishList = $localStorage.wishList;

    

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

    if ($localStorage.shopWiseItem) {



        $rootScope.itemInCart = $localStorage.shopWiseItem;

    } else {



        $localStorage.shopWiseItem = 0;

        $rootScope.itemInCart = $localStorage.shopWiseItem;

    }



    

    var totalitem = 1;

    $scope.formData = {};

    $scope.category = [];

    $scope.product - [];



    $scope.addTofavourite = function(productId, status) {

        // alert(productId+'     ' + $localStorage.profile);

        if (productId) {

            myFavourite.myFavouriteData(productId, $localStorage.profile, status).success(function(posts) {

                $scope.category = $scope.category.concat(posts.data1.records1);



            }).error(function(error) {

                $scope.category = [];

            });

        }

    };

    

     

    

    $scope.addTocart = function(productId, price, image,product_name,pkgquantity,variation) {

       

        animateImage(productId);

        if (!$scope.formData.mycounter) {

            totalitem = 1;

        } else {

             if(!$scope.formData.mycounter[productId])

                {

                     totalitem = 1;

                }

                else

                {

                      totalitem = parseInt($scope.formData.mycounter[productId]);

                }

        }



        $localStorage.shopWiseItem = parseInt($localStorage.shopWiseItem) + parseInt(totalitem);



        $rootScope.itemInCart = parseInt($localStorage.shopWiseItem);

        



        /*************************************88 add to cart Items ********************************/

        var flag = 0;

        var tempcart = "";

        if ($localStorage.shopWise) {

            var myCartItem = $localStorage.shopWise.split(', ');

            var lenght = myCartItem.length;

           

            angular.forEach(myCartItem, function(value, key) {



                var productWise = eval('(' + value + ')');

                for (i in productWise) {

                    if (productWise['prduct_id'] == productId && flag == 0) {

                        productWise['quantity'] = productWise['quantity'] + totalitem;

                        flag = 1;

                       



                    }

                }

                if (key < lenght - 1) {

                    tempcart += JSON.stringify(productWise) + ', ';

                } else {

                    tempcart += JSON.stringify(productWise);

                }



            });

            if (flag == 1) {

                

                $localStorage.shopWise = tempcart;

                tempcart = "";

                flag = 0;

            } else {

                $rootScope.myCart = {

                    prduct_id : productId,

                    product_name : product_name.replace(', ', " "),

                    quantity : totalitem,

                    price : price,

                    pkgquantity: pkgquantity,

                    image : image,

                    color : variation,

                    

                };

                $localStorage.shopWise = $localStorage.shopWise + ', ' + JSON.stringify($rootScope.myCart);

               

            }

        } else {

            $rootScope.myCart = {

                prduct_id : productId,

                product_name : product_name.replace(', ', " "),

                quantity : totalitem,

                price : price,

                pkgquantity: pkgquantity,

                image : image,

                color : variation,

                

            };

            $localStorage.shopWise = JSON.stringify($rootScope.myCart);

           

        }

        /************************************** add to cart item close *****************************/



    };

    

   

   

   /*************************Code for Search Data ************/

     $scope.loadingImage =1;

     $scope.limit=0;

     $scope.combineLimit = 0;

     

      $scope.fetch_data = function(){

      totalItme.gettotalItme($localStorage.currentSelectedShop,$localStorage.profile).success(function(posts){

                    $scope.formData.searchData='';

                    $scope.loadingImage =0;

                    $scope.category     = posts.data1.records1;

                    $scope.product      = posts.data3.records1;

                    $scope.limit        =  $scope.category.length;

                    $scope.ProductLimit =   $scope.product.length;

                    $scope.combineLimit = $scope.limit+'_/'+$scope.ProductLimit;

                    /*************************************************/

                    if(posts.remainingData == 0 && posts.moreremainingData!=0){

            	          remainingData = posts.moreremainingData;

                    }else{

            	          remainingData =posts.remainingData;

                    }

                    // console.log("remaining data"+ posts.remainingData);

                    if(remainingData > 0)

                     {

                         $scope.noMoreItemsAvailable = false;     

                           }

                    else

		            {

		                 $scope.noMoreItemsAvailable = true;     

		            }

                   /*************************************************/

                    $scope.currencyCode = $localStorage.currencyCode;

                    $scope.mrp= $localStorage.mrp;

        })

        .error(function(error,status) {

            if(!error && status ==0)

            {

                $state.go('app.error_page')

            }

            else if(status === 408)

            {

                 var alertPopup = $ionicPopup.alert({

                    title : 'Timeout issue',

                    template : 'Oops something wrong!',

                    okText: 'Refresh'

                });

                 $state.go($state.current, {}, {

                        reload : true

                 });

            }

         

         });

    };

        

    $scope.item_not_found = false;

      $scope.search_product=function(){

           

           var searchData =$scope.formData.searchData;

           var length =searchData.length;

            if(length){

              // delay(function(){

                $scope.item_not_found =0;

               // $scope.loadingImage=1;

                $scope.category = [];

                $scope.product =[];

                searchItem.search_item($scope.formData.searchData,$localStorage.currentSelectedShop,$localStorage.profile).success(function(posts) {

                    $scope.loadingImage=0;

                        $scope.category = (posts.data1.records1);

                        $scope.product = (posts.data3.records1);

                        $scope.mrp= $localStorage.mrp;

                        $scope.currencyCode = $localStorage.currencyCode;

                        if($scope.category.length==0 && $scope.product.length==0)

                        {

                                $scope.item_not_found = true;

                        }

                        /*************************************************/

                        $scope.limit        =  $scope.category.length;

	                    $scope.ProductLimit =   $scope.product.length;

	                    $scope.combineLimit = $scope.limit+'_/'+$scope.ProductLimit;

	                    

	                    if(posts.remainingData == 0 && posts.moreremainingData!=0){

	            	          remainingData = posts.moreremainingData;

	                    }else{

	            	          remainingData =posts.remainingData;

	                    }

	                    // console.log("remaining data"+ posts.remainingData);

	                    if(remainingData > 0)

	                     {

	                         $scope.noMoreItemsAvailable = false;     

	                           }

	                    else

			            {

			                 $scope.noMoreItemsAvailable = true;     

			            }

	                   /*************************************************/

                   

        

                  $scope.$broadcast('scroll.infiniteScrollComplete');

                $scope.postsCompleted = true;

               }).error(function(error,status) {

                    if(!error && status ==0)

                    {

                        $state.go('app.error_page')

                    }

                    else if(status === 408)

                    {

                         var alertPopup = $ionicPopup.alert({

                            title : 'Timeout issue',

                            template : 'Oops something wrong!',

                            okText: 'Refresh'

                        });

                         $state.go($state.current, {}, {

                                reload : true

                         });

                    }

         

               });

             

        }

            

        }

        

        $scope.loadMore=function(){

        	   



             searchItem.loadSearch_item($scope.formData.searchData,$localStorage.currentSelectedShop,$localStorage.profile,$scope.combineLimit).success(function(posts){

                    //$scope.formData.searchData='';

                    $scope.loadingImage =0;

                    $scope.category = $scope.category.concat(posts.data1.records1);

                    $scope.product  = $scope.product.concat(posts.data3.records1);

                    /*************************************************/

                        $scope.limit        =  $scope.category.length;

	                    $scope.ProductLimit =   $scope.product.length;

	                    $scope.combineLimit = $scope.limit+'_/'+$scope.ProductLimit;

	                    

	                    if(posts.remainingData == 0 && posts.moreremainingData!=0){

	            	          remainingData = posts.moreremainingData;

	                    }else{

	            	          remainingData =posts.remainingData;

	                    }

	                    // console.log("remaining data"+ posts.remainingData);

	                    if(remainingData > 0)

	                     {

	                         $scope.noMoreItemsAvailable = false;     

	                           }

	                    else

			            {

			                 $scope.noMoreItemsAvailable = true;     

			            }

	                /*************************************************/

		            $scope.$broadcast('scroll.infiniteScrollComplete');           

                    //$scope.load_data = false;

                    $scope.currencyCode = $localStorage.currencyCode;

                    $scope.mrp= $localStorage.mrp;

                   

            })

            .error(function(error,status) {

                if(!error && status ==0)

                {

                    $state.go('app.error_page')

                }

                else if(status === 408)

                {

                     var alertPopup = $ionicPopup.alert({

                        title : 'Timeout issue',

                        template : 'Oops something wrong!',

                        okText: 'Refresh'

                    });

                     $state.go($state.current, {}, {

                            reload : true

                     });

                }

             });

        

        }

        

  /*************************End code for Search Data***************************/

 /*******************************COde for WishList*************************/

   $scope.getsearchProduct=function(){

   

            $scope.hasItem=false;

            $scope.searchproduct=[];

            myWishList.myWishListData($localStorage.profile,$localStorage.currentSelectedShop).success(function(posts) {

             //$scope.wishListItem=(posts.Str.records1);

            $scope.hasItem = posts.hasItem;

            if(!$scope.hasItem){

                $scope.hasMsg='Add products to your wish list while you shop and add them to your cart later.';

            }

            $scope.product = posts.data2;

            $scope.counter = (posts.data4.records1);

            $scope.searchproduct = (posts.data1.records1);

            $scope.loadingdata=0;

            $scope.mycounter = $scope.counter[0];

            $scope.currencyCode = $localStorage.currencyCode;

            $scope.mrp= $localStorage.mrp;

            $scope.$broadcast('scroll.infiniteScrollComplete');

            $scope.postsCompleted = true;

                 

                 

               }).error(function(error,status) {

                    if(!error && status ==0)

                    {

                        $state.go('app.error_page')

                    }

                    else if(status === 408)

                    {

                         var alertPopup = $ionicPopup.alert({

                            title : 'Timeout issue',

                            template : 'Oops something wrong!',

                            okText: 'Refresh'

                        });

                         $state.go($state.current, {}, {

                                reload : true

                         });

                    }

         

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

    

     /***************** Code for customize Page*********************/

       $scope.customizeproduct=function(productID){

         

        $localStorage.productID = productID;

        $localStorage.productParentID = productID;

         $state.go('app.customize');

       }

       

       

       $scope.notify=function(productID){

         

        var alertPopup = $ionicPopup.alert({

                title : 'Notify Me',

                template : 'We will inform you, Once Product is Available.'

            });

            $localStorage.productID = productID;

            notifyMe.notifyMe( $localStorage.productID,$localStorage.profile,$localStorage.currentSelectedShop)

            .success(function(posts) {



        

        

                }).error(function(error) {

             

            });

            

            

       }

         $scope.setpreURL = function() {

       

              $ionicHistory.goBack();

       

        };

       

       

}]);