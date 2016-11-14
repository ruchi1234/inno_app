app.controller('CategoryCtrl', ['$scope', '$state', 'get_cat', '$localStorage', '$sessionStorage', '$rootScope', '$location','$ionicPopup','$ionicPlatform',

function($scope, $state, get_cat, $localStorage, $sessionStorage, $rootScope, $location ,$ionicPopup,$ionicPlatform) {

    // checkConnection();

    $ionicPlatform.offHardwareBackButton(function() {

 

    });

    $scope.remainingData = true;

    $scope.load_data = false;

    $scope.limit = 0;

    $scope.noMoreItemsAvailable = true;

    $rootScope.ordering = $localStorage.ordering;

     if(checkConnection())

        {

          $state.go('app.error_page')

        }

    

   /* if (!$localStorage.profile) {

        $state.go('app.login');

    } */

    $scope.shopName=$localStorage.currentSelectedShopName;

    $localStorage.currentSelectedShop = 2;

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

    $rootScope.location = $location;

    $localStorage.preURL = $rootScope.location.path();

    

    $scope.category = [];

   

    // ajax call for getting categorylist

    var cat_id = 0;

    var shopWiseItem = 'totalItemInCart_' + $localStorage.cart;

    if ($localStorage.shopWiseItem) {



        $rootScope.itemInCart = $localStorage.shopWiseItem;

    } else {



        $localStorage.shopWiseItem = 0;

        $rootScope.itemInCart = $localStorage.shopWiseItem;

    }

    if($localStorage.profile){

    	$rootScope.user_id = $localStorage.profile;

    }else{

    	$rootScope.user_id = '';

    	$localStorage.profile = '';

    }

    $scope.loadingdata = 1;

    $scope.hasData=true;

    get_cat.getcategory(cat_id, $localStorage.currentSelectedShop, 1, $localStorage.profile)

    .success(function(posts) {

        $scope.loadingdata = 0;

        $scope.category = posts.data1;

        $scope.hasData =posts.hasData;

        $localStorage.wishList = posts.wishList;

        $scope.wishList = $localStorage.wishList;

        $localStorage.latestProduct = posts.latestProduct;

        $scope.latestproduct = $localStorage.latestProduct;

        $scope.category_image = $localStorage.category_image;

        $rootScope.ordering = posts.ordering;

        $localStorage.ordering = posts.ordering;

        $scope.$broadcast('scroll.infiniteScrollComplete');

        $scope.postsCompleted = true;

        $localStorage.currencyCode = posts.currencyID;

        if(posts.remainingData > 0)
        {

           

             $scope.noMoreItemsAvailable = false;     

        }

       
        $scope.limit =  $scope.category.length;

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

        

        $scope.category = [];

    });



    $scope.loadMore = function()

    {

         var start = $scope.limit;

         $scope.load_data = true;

         get_cat.loadMore(cat_id, $localStorage.currentSelectedShop, 1, $localStorage.profile,start).success(function(posts) {

           

            $scope.category = $scope.category.concat(posts.data1);

            $scope.$broadcast('scroll.infiniteScrollComplete');

            $scope.postsCompleted = true;

            

            $scope.limit =  $scope.category.length;

            if(posts.remainingData > 0)

            {

                 $scope.noMoreItemsAvailable = false;     

            }

            else

            {

                 $scope.noMoreItemsAvailable = true;     

            }

            $scope.load_data = false;

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

            $scope.load_data = false;

        });

    }

    

    /*

    $scope.getsubcategory = function(cat_id) {

        $localStorage.subcategoryId = cat_id;

       

    };

    */

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

    // Search Page Redirection

    /*

    $scope.searchPage = function(cat_id) {

        $state.go('app.productsearch');



    };*/

}]);



// Category List

app.controller('SubategoryCtrl', ['$scope', 'get_cat', '$sessionStorage', '$localStorage', '$rootScope', '$state', '$location', 'myFavourite','$ionicPopup','searchItem','totalItme','notifyMe','$stateParams','$ionicHistory',

function($scope,get_cat, $sessionStorage, $localStorage, $rootScope, $state, $location, myFavourite,$ionicPopup,searchItem,totalItme,notifyMe,$stateParams,$ionicHistory) {



    $scope.noMoreItemsAvailable = true;

    $rootScope.ordering = $localStorage.ordering;

    $scope.load_data = false;

    $scope.limit = 0;

    $scope.wishLimit =0;

    $scope.searchproduct=[];



    if(checkConnection())

        { $state.go('app.error_page');}

    /*if (!$localStorage.profile) {

        $state.go('app.login');

    }*/

    $scope.latestproduct = $localStorage.latestProduct;

    $scope.shopName=$localStorage.currentSelectedShopName;

    $scope.category_image = $localStorage.category_image ;

     $scope.mrp= $localStorage.mrp;

    /*************code for set previous URl************/

    $rootScope.location = $location;

    $localStorage.preURL = $rootScope.location.path();

    $scope.loadingdata = 1;

    /*************code for set previous URl************/

    

     /*************code for Order page redirection************/

     $scope.orderRedirection=function(){

    	var shopWise = 'cart_' + $localStorage.cart;

        $localStorage.shopWise

        if($localStorage.shopWise){

        	$state.go('app.order');

        }else{

        	 var alertPopup = $ionicPopup.alert({

                title : 'Your Cart',

                template : 'Your cart is empty!'

            });

        }

    }

    /**********End code for Order page redirection **********/

    var cat_id = $stateParams.subcategoryId;

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

        if($localStorage.profile){

        	if (productId) {

            myFavourite.myFavouriteData(productId, $localStorage.profile, status).success(function(posts) {

                $scope.category = $scope.category.concat(posts.data1.records1);



            }).error(function(error) {

                $scope.category = [];

            });

        }

        }else{

        	var confirmPopup = $ionicPopup.confirm({

		     title: 'Consume Ice Cream',

		     template: 'Are you sure you want to eat this ice cream?'

		   });

		

		   confirmPopup.then(function(res) {

		     if(res) {

		       console.log('You are sure');

		     } else {

		       console.log('You are not sure');

		     }

		   });

        }

        

    };

    

     

    

    $scope.addTocart = function(productId, price, image,product_name,pkgquantity,variation,custom_option,productParent_id) {

       

        animateImage(productId);

        // IF custom_option is 0 then variation would be blank

        if(custom_option==0 && pkgquantity == 1){

            variation ='';

        }

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

                    color: variation,

                    productParent_id :productParent_id

                    

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

                color: variation,

                productParent_id :productParent_id

            };

            $localStorage.shopWise = JSON.stringify($rootScope.myCart);

           

        }

        /************************************** add to cart item close *****************************/



    };

    $scope.hasData=true;

    $scope.getsubcategory = function(){

    	 

    	 get_cat.getcategory(cat_id, $localStorage.currentSelectedShop, 2, $localStorage.profile).success(function(posts) {

    	

        $scope.loadingdata = 0;

        $scope.product='';

        //$localStorage.preSubcategoryId=$stateParams.subcategoryId;

        $scope.subcategorydata = posts.data1;

        $scope.subproductdata = posts.data3;

        $scope.hasData=posts.hasData;

        

        //$scope.mycounter = $scope.counter[0];

        $scope.currencyCode = $localStorage.currencyCode;

        $scope.mrp= $localStorage.mrp;

        

        $scope.subcategory = posts.data2;

        $scope.$broadcast('scroll.infiniteScrollComplete');

        $scope.postsCompleted = true;

        if(posts.remainingData > 0 || posts.moreItem > 0)

        {

             $scope.noMoreItemsAvailable = false;     

        }

        else

        {

             $scope.noMoreItemsAvailable = true;     

        }

        if($scope.subcategorydata.length  > $scope.subproductdata.length)

        {

              $scope.limit =  $scope.subcategorydata.length ;

        }

        else

        {

              $scope.limit =   $scope.subproductdata.length;

        }

        $scope.limit =  $scope.subcategorydata.length ;

        if($scope.subproductdata.length){

        	$scope.ProductLimit =   $scope.subproductdata.length;

        }else{

        	$scope.ProductLimit =   0;

        }

        

        

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

                 $scope.category = [];

        });

    }

   

   $scope.loadMore = function()

    {

         var start = $scope.limit;

         var productStart =$scope.ProductLimit;

          $scope.load_data = true;

          var datarray=start+'_/'+productStart;

          var remainingData =0;

         get_cat.loadMore(cat_id, $localStorage.currentSelectedShop, 2, $localStorage.profile,datarray).success(function(posts) {

           

            $scope.subcategorydata = $scope.subcategorydata.concat(posts.data1);

            $scope.subproductdata = $scope.subproductdata.concat(posts.data3);

             $scope.$broadcast('scroll.infiniteScrollComplete');

           // $scope.mycounter = $scope.counter[0];

            $scope.postsCompleted = true;

            $scope.loadTime ++;

            if(remainingData == 0 && posts.moreItem!=0){

            	remainingData = posts.moreItem;

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

            if($scope.subcategorydata.length  > $scope.subproductdata.length)

            {

                  $scope.limit =  $scope.subcategorydata.length ;

            }

            else

            {

                  $scope.limit =   $scope.subproductdata.length;

            }

            $scope.limit =  $scope.subcategorydata.length ;

            $scope.ProductLimit =   $scope.subproductdata.length;

            $scope.load_data = false;

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

            $scope.load_data = false;

        });

    }

   

  /*************************End code for Search Data***************************/

 /*******************************COde for WishList*************************/

		

   

	$scope.addToDyfavourite = function(productid, shop_id) {

		myFavourite.myDyfavourite(productid, $localStorage.profile,shop_id).success(function(posts) {

			

			if(posts){

				if (document.getElementById(productid).className == 'ion-heart') {

				document.getElementById(productid).className = "";

				document.getElementById(productid).className = "ion-android-favorite-outline";

			  } else {

				document.getElementById(productid).className = "";

				document.getElementById(productid).className = "ion-heart";

			}

				$scope.wishList = posts.wishList;

				$localStorage.wishList =$scope.wishList;

			 

		}

			

		}).error(function(error) {



		});

	}

	 



    

  

     /***************** Code for customize Page*********************/

       

       

       

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

       

       /***************** End Code for customize Page*********************/ 

}]);



//shoping controler

//var imgindex =0 ;

app.controller('shopingCart', ['$scope','productService', 'getproduct', '$rootScope', '$ionicPopup', '$timeout', '$state', 'productlist', '$localStorage', '$sessionStorage', 'product_Info',  '$location', 'myFavourite','$ionicPopup','notifyMe','changeorderStatus','newProduct','$stateParams','$ionicModal','$stateParams','$ionicHistory',

function($scope, productService, getproduct, $rootScope, $ionicPopup, $timeout, $state, productlist, $localStorage, $sessionStorage, product_Info,  $location, myFavourite,$ionicPopup,notifyMe,changeorderStatus,newProduct,$stateParams,$ionicModal,$stateParams,$ionicHistory) {

    /********************************************** Manage store wise cart *********************************/

    $scope.load_data = false;

    $scope.imgindex = 0;

    $scope.hasData=true;

    $scope.noMoreItemsAvailable = true;

   // $filter('nl2br');

    if(checkConnection())

    { $state.go('app.error_page');}

    

    /*if (!$localStorage.profile) {

        $state.go('app.login');

    }*/

    $scope.shopName=$localStorage.currentSelectedShopName;

    $rootScope.ordering = $localStorage.ordering;

    $scope.latestproduct = $localStorage.latestProduct;

    var shopWise = 'cart_' + $localStorage.cart;

    var shopWiseItem = 'totalItemInCart_' + $localStorage.cart;

    $scope.wishList = $localStorage.wishList;

    $scope.formData = {};

    

    /*********************** Code for Notify me****************************/

    $scope.notify2=function(productID){

       	 

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

       

       

       /***************** End Code for customize Page*********************/ 

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

   

    /***************************************** product list page *********************************/

    $scope.product = [];

    if ($localStorage.shopWiseItem) {

        $rootScope.itemInCart = $localStorage.shopWiseItem;

    } else {

        $localStorage.shopWiseItem = 0;

        $rootScope.itemInCart = $localStorage.shopWiseItem;

    }

	

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

      $scope.limit = 0;

    var category_id =$stateParams.subcategoryId;

    $scope.getProduct = function() {

        $scope.counter = '';

        //var category_id = $localStorage.selectedsubCategory;

        

        $scope.loadingdata = 1;

        $scope.hasData=false;

        productlist.getproductList(category_id, $localStorage.currentSelectedShop, $localStorage.profile).success(function(posts) {

            $scope.loadingdata = 0;

            $scope.product = posts.data1;
            $scope.subcategory = posts.data2;
            $scope.hasData=posts.hasData;
            $scope.currencyCode = $localStorage.currencyCode;
            $scope.mrp= $localStorage.mrp;
            $scope.notify=(posts.notify);//change        
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.postsCompleted = true;
            $scope.limit = $scope.product.length;
            if(posts.remainingData > 0)
            {
                 $scope.noMoreItemsAvailable = false;     
            }
            else
            {
                 $scope.noMoreItemsAvailable = true;     
            }

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

            $scope.category = [];

        });

    };

    /**************************** Code for Latest Product ***********************************/

   $scope.getLatestProduct =function(){

       	$scope.hasData=true;

       	$scope.loadingdata=1;

       	newProduct.getnewProduct($localStorage.currentSelectedShop, $localStorage.profile).success(function(posts) {
            $scope.loadingdata = 0;
            $scope.product = posts.data1;
            $scope.hasData =posts.hasData
            $scope.subcategory = posts.data2;
            $scope.currencyCode = $localStorage.currencyCode;
            $scope.mrp= $localStorage.mrp;
            $scope.notify=(posts.notify);//change
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.postsCompleted = true;
            $scope.limit = $scope.product.length;
            if(posts.remainingData > 0)
            {
                $scope.noMoreItemsAvailable = false;     
            }
            else
            {
                $scope.noMoreItemsAvailable = true;     
            }
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
                $scope.category = [];
            });
    }

   	

   /************** Load More Feature for Latest Product*************/

  $scope.latestloadMore = function()

    {

        

         $scope.load_data = true;

         var start = $scope.limit;

         newProduct.loadMore( $localStorage.currentSelectedShop, $localStorage.profile,start).success(function(posts) {

            

            $scope.product = $scope.product.concat(posts.data1.records1);

            

           // $scope.mycounter = $scope.counter[0];

            $scope.$broadcast('scroll.infiniteScrollComplete');

            $scope.postsCompleted = true;

            $scope.limit = $scope.product.length;

             //$scope.mycounter = $scope.counter[0];

            if(posts.remainingData > 0)

            {

                 $scope.noMoreItemsAvailable = false;     

            }

            else

            {

                 $scope.noMoreItemsAvailable = true;     

            }

             $scope.load_data = false;

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

            //$scope.category = [];

             $scope.load_data = false;

        });

    }

    /********************** Load more feature ****************/

     $scope.loadMore = function()

    {

        

         $scope.load_data = true;

         var start = $scope.limit;

         productlist.loadMore(category_id, $localStorage.currentSelectedShop, $localStorage.profile,start).success(function(posts) {

            

            $scope.product = $scope.product.concat(posts.data1);

            

           // $scope.mycounter = $scope.counter[0];

            $scope.$broadcast('scroll.infiniteScrollComplete');

            $scope.postsCompleted = true;

            $scope.limit = $scope.product.length;

           //  $scope.mycounter = $scope.counter[0];

            if(posts.remainingData > 0)

            {

                 $scope.noMoreItemsAvailable = false;     

            }

            else

            {

                 $scope.noMoreItemsAvailable = true;     

            }

             $scope.load_data = false;

        }).error(function(error,status) {

            //$scope.category = [];

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

             $scope.load_data = false;

        });

    }

    /********************** Load more feature close **********/

    

    $scope.colordata=[];

     /****************************************** Add to cart from custom page ****************************/

		

        $scope.addcustomcart=function(itemImage,color){

            

           

            //console($scope.colordata);

			angular.forEach($scope.colordata, function(value, key) {

			  

			  var price = value['discount_price'];

			  var productId =value['id'];

			  var color=  [{"color": value['color'],"size":value['size']}] ;

			  var size= value['size'];

			  var productParent_id = value['productParent_id'];

			  var product_name = $scope.name;

              var pkgquantity = 1;

			  if (!$scope.formData.myProductCounter) {

            quantity = 0;

	        } else {

	            quantity = parseInt($scope.formData.myProductCounter[productId]);

	        }

	       

	        

	        if(quantity){

	        	 

	         animateslider($rootScope.imgindex);

            // code for adding product in order list

	        var flag = 0;

            var image= itemImage[key]['image'];

            var tempcart = "";



        $rootScope.itemInCart = parseInt($rootScope.itemInCart) + parseInt(quantity);



        $localStorage.shopWiseItem = $rootScope.itemInCart;

       



        if ($localStorage.shopWise) {



            var myCartItem = $localStorage.shopWise.split(', ');



            var lenght = myCartItem.length;

            angular.forEach(myCartItem, function(value, key) {



                var productWise = eval('(' + value + ')');

                for (i in productWise) {

                    if (productWise['prduct_id'] == productId && flag == 0) {

                        productWise['quantity'] = productWise['quantity'] + quantity;

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

                flag = 0;

                tempcart = "";



            } else {

                $rootScope.myCart = {

                    prduct_id : productId,

                    product_name : product_name.replace(', ', " "),

                    quantity : quantity,

                    price : price,

                    pkgquantity: pkgquantity,

                    image : image,

                    color : color,

                    total : 0,

                    productParent_id: productParent_id

                };

                $localStorage.shopWise = $localStorage.shopWise + ', ' + JSON.stringify($rootScope.myCart);

                

            }

        } else {

            $rootScope.myCart = {

                prduct_id : productId,

                product_name : product_name.replace(', ', " "),

                quantity : quantity,

                price : price,

                pkgquantity: pkgquantity,

                image : image,

                color : color,

                productParent_id :productParent_id,

                total : 0

            };

            $localStorage.shopWise = JSON.stringify($rootScope.myCart);

           

        }

	        

	        // end code for adding product in order list

	        }

			});

		}

	/****************************************** End of Add to cart from custom page ****************************/

	

    /*********************************************** product list add to cart ****************/

    

   

    $scope.addTocart = function(productId, price, image,product_name,pkgquantity,variation,custom_option,productParent_id) {

        animateImage(productId);

        var flag = 0;

        var quantity = 1;

        var tempcart = "";

         //

         if(custom_option== 0 && pkgquantity == 1){

            variation = '';

         }

        // code for getting product Quantity

        if (!$scope.formData.mycounter) {

            quantity = 1;

        } else {

            if(!$scope.formData.mycounter[productId])

                {

                     quantity = 1;

                }

                else

                {

                      quantity = parseInt($scope.formData.mycounter[productId]);

                }

        }



        $rootScope.itemInCart = parseInt($rootScope.itemInCart) + parseInt(quantity);



        $localStorage.shopWiseItem = $rootScope.itemInCart;

       

        if ($localStorage.shopWise) {



            var myCartItem = $localStorage.shopWise.split(', ');



            var lenght = myCartItem.length;

            angular.forEach(myCartItem, function(value, key) {



                var productWise = eval('(' + value + ')');

                for (i in productWise) {

                    if (productWise['prduct_id'] == productId && flag == 0) {

                        productWise['quantity'] = productWise['quantity'] + quantity;

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

                flag = 0;

                tempcart = "";



            } else {

                $rootScope.myCart = {

                    prduct_id : productId,

                    product_name : product_name.replace(', ', " "),

                    quantity : quantity,

                    price : price,

                    pkgquantity: pkgquantity,

                    image : image,

                    color : variation,

                    productParent_id :productParent_id

                    

                };

                $localStorage.shopWise = $localStorage.shopWise + ', ' + JSON.stringify($rootScope.myCart);

               

            }

        } else {

            $rootScope.myCart = {

                prduct_id : productId,

                product_name : product_name.replace(', ', " "),

                quantity : quantity,

                price : price,

                pkgquantity: pkgquantity,

                image : image,

                color : variation,

                productParent_id :productParent_id

                

            };

            $localStorage.shopWise = JSON.stringify($rootScope.myCart);

           

        }



    };

    /************************************************ product list add to cart ****************/

    $scope.setpreURL = function() {

       // $rootScope.location = $location;

        //$localStorage.preURL = $rootScope.location.path();

        //$scope.backurl = $localStorage.preURL;

         $ionicHistory.goBack();

       

    };

    $scope.setPreCatId=function(){

    	 

    	$localStorage.subcategoryId =$localStorage.preSubcategoryId;

    }

    

    

    $scope.notify1=function(productID){

       	 

       	var alertPopup = $ionicPopup.alert({

                title : 'Notify Me',

                template : 'Once Product Available we notify you by Email'

            });

            $localStorage.productID = productID;

            notifyMe.notifyMe( $localStorage.productID,$localStorage.profile,$localStorage.currentSelectedShop)

            .success(function(posts) {



        

        

        		}).error(function(error) {

             

        	});

            

            

       }

    

     

    $scope.getProductDetail = function() {

        $scope.loadingdata2 = 1;

        $scope.productdetail = [];

        $scope.images = [];

        $scope.zero='a';

        $scope.pck_quantity= 0;

        $scope.backurl = $localStorage.preURL;

        // alert($localStorage.productID);

            product_Info.productInfo($stateParams.productID, $localStorage.currentSelectedShop,$localStorage.profile).success(function(posts) {

            $scope.loadingdata2 = 0;

            $scope.counter = '';

            //$scope.productdetail = $scope.product.concat(posts.data1.records1);

            $scope.images = posts.data2.records2;

            $scope.box_size = posts.box_size;

            $scope.currencyCode = $localStorage.currencyCode;

            $scope.mrp= $localStorage.mrp;

            $scope.colordata = (posts.data5.records1);

            var colordata_length = $scope.colordata.length;

            for (var i = 0; i < colordata_length;i++) {

                if($scope.colordata[i].normal && $scope.colordata[i].normal !='')

                {

                    var obj = {

                        'normal' : $scope.colordata[i].normal

                    };

                    $scope.images.push(obj);

                }

            }

           

            $scope.formData.colordata = $scope.colordata[0];

            $scope.showcolor = posts.showcolor;

            $scope.showsize = posts.showsize;

            $scope.divSize =  posts.divSize;

            $scope.sku =  posts.sku;

            $scope.brand =  posts.brand;

            $scope.notify= posts.notify;//change

            $scope.custom_option =  posts.custom_option;

            

            

            $scope.currentProductId = parseInt(posts.id);

            $scope.status = posts.status;

            $scope.notify = posts.notify; //change made by aditya 

            $scope.classname = posts.classname;

           

            $scope.pck_quantity = posts.quantity;

            $scope.color_variation = posts.quantity;

            /*

            if(($scope.colordata.length > 1 && $scope.pck_quantity > 1) || ($scope.pck_quantity == 1 && $scope.colordata.length ==1))

            {

                $scope.color_variation = 2;

            }

            else

            {

                 $scope.color_variation = 1;

            }*/

            $scope.name = (posts.name);

            $scope.percentage_discount = posts.percentage_discount;

            $scope.discounted_value = posts.discounted_value;

            $scope.price = parseInt(posts.price);

            $scope.description = (posts.description);

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

            $scope.category = [];

        });

    };

    $scope.zoomImages = function(index)

    {

        $scope.activeSlide = index;

        $scope.showModal('templates/image-popover.html');

    }

    $scope.showModal = function(templateUrl) {

        $ionicModal.fromTemplateUrl(templateUrl, {

            scope : $scope,

            animation: 'slide-in-up'

        }).then(function(modal) {

            $scope.modal = modal;

            $scope.images = $scope.images;

            $scope.modal.show();

        });

    }

 

    // Close the modal

    $scope.closeModal = function() {

        $scope.modal.hide();

        $scope.modal.remove()

    };

    

   

    /****************************************** product list page end ****************************/

    /****************************************** product favourites ****************************/

    $scope.addTofavourite = function(status, productId) {

        

        var wishlist = 0;

        if($localStorage.profile){

        if (productId) {

            myFavourite.myFavouriteData(productId, $localStorage.profile, status, $localStorage.currentSelectedShop).success(function(posts) {

                $scope.status = posts.status;

                if ($scope.status == 1) {

                }

                if ($scope.status == 2) {

                }

                $localStorage.wishList = posts.wishList;

                 $scope.wishList = $localStorage.wishList;

                $scope.classname = posts.classname;



            }).error(function(error) {

                $scope.category = [];

            });

        }

        }else{

        	var confirmPopup = $ionicPopup.confirm({

		     title: 'Mark as favourite',

		     template: 'You have to login to add this product to your favorite list.'

		   });

		

		   confirmPopup.then(function(res) {

		     if(res) {

		      $state.go('app.login');

		     }  

		   });

        }

    };

    /******************************************end of product favourites ****************************/

    //var pro_id = myService1.get();

    $scope.product = [];

   // pro_id = 157;

    $scope.totalItem = 1;



    $scope.addcart = function(id,getPrice,image,product_name,pck_quantity,color,custom_option) {



        //console.log($scope.imgindex);

            

        animateslider($scope.imgindex);

        var price = getPrice;

		$scope.currentProductId  = id;

        

        var flag = 0;

        var quantity = 1;

        var tempcart = "";

        var pkgquantity=pck_quantity;



        //

        if(custom_option == 0){

            color = '';

        }

        // code for getting product Quantity

        if (!$scope.formData.myProductCounter) {

            quantity = 1;

        } else {



            quantity = parseInt($scope.formData.myProductCounter);

        }



        $rootScope.itemInCart = parseInt($rootScope.itemInCart) + parseInt(quantity);

        $localStorage.shopWiseItem = $rootScope.itemInCart;



        if ($localStorage.shopWise) {

            var myCartItem = $localStorage.shopWise.split(', ');



            var lenght = myCartItem.length;

            angular.forEach(myCartItem, function(value, key) {



                var productWise = eval('(' + value + ')');

                for (i in productWise) {

                    if (productWise['prduct_id'] == $scope.currentProductId && flag == 0) {

                        productWise['quantity'] = productWise['quantity'] + quantity;

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

                flag = 0;

                tempcart = "";

              

            } else {

                $rootScope.myCart = {

                    prduct_id : $scope.currentProductId,

                    product_name : product_name.replace(', ', " "),

                    quantity : quantity,

                    price : price,

                    pkgquantity: pkgquantity,

                    image : image,

                    color : color,

                    productParent_id :productParent_id

                   

                };

                var totalCartItem = $localStorage.shopWise + ', ' + JSON.stringify($rootScope.myCart);

                $localStorage.shopWise = totalCartItem;



               



            }



        } else {



            $rootScope.myCart = {

                prduct_id : $scope.currentProductId,

                product_name : product_name.replace(', ', " "),

                quantity : quantity,

                price : price,

                pkgquantity: pkgquantity,

                image : image,

                color : color,

                productParent_id :productParent_id

               

            };

            $localStorage.shopWise = JSON.stringify($rootScope.myCart);

           



        }



    };

    // A confirm dialog

    $scope.showConfirm = function() {

         

                $state.go('app.order');

     

    };

   

}]);



app.directive('addToProductCartButton', function() {



    function link(scope, element, attributes) {

        element.on('click', function(event) {

            var cartElem = angular.element(document.getElementsByClassName("my-icon my-icon ion-ios-cart"));



            var offsetTopCart = cartElem.prop('offsetTop');

            var offsetLeftCart = cartElem.prop('offsetLeft');

            var widthCart = cartElem.prop('offsetWidth');

            var heightCart = cartElem.prop('offsetHeight');



            // code for watcher

            

            scope.$watch('currentIndex', function() {

                imgIndex = scope.currentIndex;

                });

            if(event.target.innerHTML=="Add to cart")

            {    

                var imgElem = angular.element(event.target.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].children[imgIndex].childNodes[1]);

            }

            else

            {

                var imgElem = angular.element(event.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].children[imgIndex].childNodes[1]);

                

            }

            //console.log(imgElem);



           

            var parentElem = angular.element(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.offsetParent);

            

            var offsetLeft = imgElem.prop("offsetLeft");

            var offsetTop = imgElem.prop("offsetTop");

           

            var imgSrc = imgElem.prop("currentSrc");

            //console.log(window.innerHeight);



            //console.log(offsetTopCart + heightCart / 2 + ' ' + offsetLeftCart + widthCart / 2);

            var imgClone = angular.element('<img src="' + imgSrc + '"/>');

            ////console.log(imgClone);

            

            

             //console.log(offsetTopCart);

            imgClone.css({

                'height' : '150px',

                'position' : 'absolute',

                'top' : offsetTop + 'px',

                'left' : offsetLeft + 'px',

                'opacity' : 0.5

            });

            imgClone.addClass('itemaddedanimate');

            parentElem.append(imgClone);

            /*

            setTimeout(function() {

                imgClone.css({

                    'height' : '75px',

                    'top' :window.innerHeight+"px",

                    'bottom':0,

                    'left' : (offsetLeftCart + widthCart / 2) + 'px',

                    'opacity' : 0.5

                });

            }, 500);

    */

            setTimeout(function() {

                imgClone.css({

                    'height' : '0px',

                    'opacity' : 0.5,

                    'top':'auto',

                    'bottom':0



                });

               // cartElem.addClass('shakeit');

            }, 1000);

            setTimeout(function() {

                //cartElem.removeClass('shakeit');

                imgClone.remove();

            }, 1500);

        });

    };



    return {

        restrict : 'E',

        link : link,

        transclude : true,

        replace : true,

       /* scope : {},*/

        template : '<button class="add-to-cart" ng-transclude></button>'

    };

});

/**************** Reload***********/

app.directive('xRef',function($route, $location){

  return {

    link: function(scope, elm,attr){

      elm.on('click',function(){

        if ( $location.path() === attr.xref ) {

          $route.reload();

        } else {

          scope.$apply(function(){

            $location.path(attr.xref);

          });

        }      

      });

    }

  };

});

app.directive('slider',['$timeout','$stateParams',function($timeout,$stateParams) {

  return {

    restrict: 'AE',

    replace: true,

   link: function(scope, elem, attrs,rootScope) {

        

       

    },

    templateUrl: 'templates/templateurl.html',

    controller:['$scope','$sessionStorage','$localStorage','product_Info','$timeout', function($scope,$sessionStorage,$localStorage,product_Info,$timeout) {

        $scope.currentIndex = 0; // Initially the index is at the first image

        $scope.loadingdata = 1;

        product_Info.productImage($stateParams.productID)

        .success(function(posts){

            ////console.log("sucess");

            $scope.loadingdata = 0;

            $scope.images = posts.data1.records;

            $scope.images.forEach(function(image) {

             image.visible = false; // make every image invisible

             //console.log("i am in watcher");

              $scope.images[0].visible = true;

            }); 

             // make the current image visible

            

        })

        .error(function(error){

            

        });

        $scope.next = function() {

            ////console.log('next click');

            $scope.currentIndex < $scope.images.length - 1 ? $scope.currentIndex++ : $scope.currentIndex = 0;

            ////console.log($scope.currentIndex);

        };

    

        $scope.prev = function() {

             ////console.log('prev click');

             $scope.currentIndex > 0 ? $scope.currentIndex-- : $scope.currentIndex = $scope.images.length - 1;

             ////console.log($scope.currentIndex);

        };

        $scope.$watch('currentIndex', function() {

             $scope.images.forEach(function(image) {

             image.visible = false; // make every image invisible

             $scope.images[$scope.currentIndex].visible = true;

             $scope.imgindex = $scope.currentIndex;

            

             });

        });

        var timer;

        var sliderFunc = function() {

          timer = $timeout(function() {

            $scope.next();

            timer = $timeout(sliderFunc, 2000);

          }, 2000);

        };

        

        sliderFunc();

        

        $scope.$on('$destroy', function() {

          $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer

        });

       

     }]

  };

}]);







function animateImage(image_id)

{

    var cartElem = angular.element(document.getElementsByClassName("my-icon my-icon ion-ios-cart"));



    var offsetTopCart = cartElem.prop('offsetTop');

    var p = cartElem.prop('offsetParent');

    var offsetLeftCart = cartElem.prop('offsetLeft');

    var widthCart = cartElem.prop('offsetWidth');

    var heightCart = cartElem.prop('offsetHeight');

    var imgElem = angular.element(document.getElementById("my_cart_"+image_id));



   // console.log(imgElem);

    var parentElem = angular.element(event.target.parentNode.parentNode.parentNode.parentNode.parentNode);

    var offsetLeft = imgElem.prop("offsetLeft");

    var offsetTop = imgElem.prop("offsetTop");

    var imgSrc = document.getElementById("my_cart_"+image_id).src;

    var imgClone = angular.element('<img src="' + imgSrc + '"/>');

     

    if(0)

    {

        p_top = (offsetTop-p.offsetTop) + offsetTop;

    }

    else

    {

         p_top = p.offsetTop+offsetTop;

    }





        imgClone.css({

            'height' : '150px',

            'position' : 'absolute',

            'top' : offsetTop + 'px',

            'left' : offsetLeft + 'px',

            'opacity' : 0.5

        });

        imgClone.addClass('itemaddedanimate');

        parentElem.append(imgClone);

        setTimeout(function() {

            imgClone.css({

                'height' : '75px',

                'top' :  p_top+"px",

                'bottom':0,

                'left' : (offsetLeftCart + widthCart / 2) + 'px',

                'opacity' : 0.5

            });

        }, 500);

       

        setTimeout(function() {

            //cartElem.removeClass('shakeit');

            imgClone.remove();

        }, 1500);

   

   

}

function animateslider(imgIndex)

{

    var cartElem = angular.element(document.getElementsByClassName("my-icon my-icon ion-ios-cart"));



    var offsetTopCart = cartElem.prop('offsetTop');

    var p = cartElem.prop('offsetParent');

    var offsetLeftCart = cartElem.prop('offsetLeft');

    var widthCart = cartElem.prop('offsetWidth');

    var heightCart = cartElem.prop('offsetHeight');

    var imgElem = angular.element(document.getElementsByClassName("slider_img"));

    



    //imgElem = imgElem[imgIndex];

    //console.log(imgElem);

    var parentElem = angular.element(event.target.parentNode.parentNode.parentNode.parentNode.parentNode);

    var offsetLeft = imgElem.prop("offsetLeft");

    var offsetTop = imgElem.prop("offsetTop");

    var imgSrc = document.getElementsByClassName("slider_img")[0].src;

    

    var imgClone = angular.element('<img src="' + imgSrc + '"/>');

    if(0)

    {

        p_top = (offsetTop-p.offsetTop) + offsetTop;

    }

    else

    {

         p_top = p.offsetTop+offsetTop;

    }





        imgClone.css({

            'height' : '150px',

            'position' : 'absolute',

            'top' : offsetTop + 'px',

            'left' : offsetLeft + 'px',

            'opacity' : 0.5

        });

        imgClone.addClass('itemaddedanimate');

        parentElem.append(imgClone);

        setTimeout(function() {

            imgClone.css({

                'height' : '75px',

                'top' :  p_top+"px",

                'bottom':0,

                'left' : (offsetLeftCart + widthCart / 2) + 'px',

                'opacity' : 0.5

            });

        }, 500);

       

        setTimeout(function() {

            //cartElem.removeClass('shakeit');

            imgClone.remove();

        }, 1500);

   

   

}

