// Category List
/**
 * [description]
 * @param  {[type]} $scope         [description : Bind Model with views]
 * @param  {[type]} $localStorage  [description : manage user data in persistant store]
 * @param  {[type]} $rootScope     [description : rootscope value will be persist through out the application]
 * @param  {[type]} $state         [description : maintain state]
 * @param  {[type]} $location      [description : use for redirection]
 * @param  {[type]} myFavourite    [description : myFavourite factory method]
 * @param  {[type]} $ionicPopup    [description : ionicpopup service is use for customize popup]
 * @param  {[type]} myWishList     [description : mywishlist factory method]
 * @param  {[type]} notifyMe       [description]
 * @param  {[type]} $stateParams   [description]
 * @param  {[type]} $ionicHistory) {               $scope.noMoreItemsAvailable [description]
 * @return {[type]}                [description]
 */
app.controller('wishCtrl', ['$scope',  '$localStorage', '$rootScope', '$state', '$location', 'myFavourite','$ionicPopup','myWishList','notifyMe','$stateParams','$ionicHistory',
function($scope,  $localStorage, $rootScope, $state, $location, myFavourite,$ionicPopup,myWishList,notifyMe,$stateParams,$ionicHistory) {
    /**
     * [noMoreItemsAvailable description : use for manage loadmore spiner icon]
     * @type {Boolean}
     */
    $scope.noMoreItemsAvailable = true;
    /**
     * [ordering description : is user has permiussion for add product in his cart]
     * @type {[type : int ]}
     */
    $rootScope.ordering = $localStorage.ordering;
    $scope.load_data = false;
    $scope.limit = 0;
    /**
     * [wishLimit description : number of product in favourite oriduct list]
     * @type {Number}
     */
    $scope.wishLimit =0;
    $scope.searchproduct=[];
    /**
     * check network connection if there is no network connection than redirect to error page 
     */
    if(checkConnection())
    { $state.go('app.error_page');}
    if (!$localStorage.profile) {
        $state.go('app.login');
    }

    $scope.latestproduct = $localStorage.latestProduct;
    /**
     * [mrp description : is shop want to show mrp before price]
     * @type {[type]}
     */
    $scope.mrp= $localStorage.mrp;
    /**
     * [location description : use for maintain url if user mark product as favourite product without login]
     * @type {[type]}
     */
    $rootScope.location = $location;
    $localStorage.preURL = $rootScope.location.path();
    $scope.loadingdata = 1;
   
    var shopWise = 'cart_' + $localStorage.cart;
    var shopWiseItem = 'totalItemInCart_' + $localStorage.cart;
    $scope.wishList = $localStorage.wishList;
    /**
     * [if description : if there are items in cart than set $rootScope.itemInCart otherwise set it with 0]
     * @param  {[type]} $localStorage.shopWiseItem [description : number of items in cart ]
     * @return {[type]}                            [description]
     */
    if ($localStorage.shopWiseItem) {
        $rootScope.itemInCart = $localStorage.shopWiseItem;
    } else {
        $localStorage.shopWiseItem = 0;
        $rootScope.itemInCart = $localStorage.shopWiseItem;
    }
    var totalitem = 1;
    /**
     * [formData description : ]
     * @type {Object}
     */
    $scope.formData = {};
    /**
     * declare product array
     */
    $scope.product - [];
    /**
     * [addTocart description : addToCart function is use for adding product in cart]
     * @param {[type]} productId        [description : product id of product to which user want to add in cart]
     * @param {[type]} price            [description : price of the product]
     * @param {[type]} image            [description : image of product]
     * @param {[type]} product_name     [description : name of product]
     * @param {[type]} pkgquantity      [description : number of quantity in packet]
     * @param {[type]} variation        [description : is there any product variation available in product box]
     * @param {[type]} custom_option    [description : is user can customize product from box according to choice]
     * @param {[type]} productParent_id [description]
     */
    $scope.addTocart = function(productId, price, image,product_name,pkgquantity,variation,custom_option,productParent_id) {
        /**
         * use for flying effect of product into cart while user add product in his cart
         */
        animateImage(productId);

        if(custom_option == 0 && pkgquantity == 1){
          variation = '';
        }
       /**
        * [totalitem description : number of items selected in cart]
        * @type {[type]}
        */
       totalitem = parseInt($scope.formData.mycounter[productId]);
       /**
        * [shopWiseItem description : add totalitem in $localStorage.shopWiseItem]
        * @type {[type]}
        */
       $localStorage.shopWiseItem = parseInt($localStorage.shopWiseItem) + parseInt(totalitem);
       $rootScope.itemInCart = parseInt($localStorage.shopWiseItem);
       /*************************************88 add to cart Items ********************************/
       var flag = 0;
       var tempcart = "";
       /**
        * [if description : if there are any items available in cart than do this otherwise insert new product in cart ]
        * @param  {[type]} $localStorage.shopWise [description : cart details]
        * @return {[type]}                        [description]
        */
       if ($localStorage.shopWise) {
          /**
           * [myCartItem description : split $localStorage.shopWise from comma]
           * @type {[type]}
           */
          var myCartItem = $localStorage.shopWise.split(', ');
          var lenght = myCartItem.length;
          angular.forEach(myCartItem, function(value, key) {
            /**
             * [productWise description : convert each value in object format]
             * @type {[type]}
             */
            var productWise = eval('(' + value + ')');
            for (i in productWise) {
              /**
               * [if description : if product is already available in cart than update product quantity]
               * @param  {[type]} productWise['prduct_id'] [description : product id available in cart]
               * @return {[type]}                          [description]
               */
              if (productWise['prduct_id'] == productId && flag == 0) {
                  productWise['quantity'] = productWise['quantity'] + totalitem;
                  flag = 1;
              }
            }
            /**
             * [if description : if key is less than length-1 than conacat comma at end]
             * @param  {[type]} key <             lenght - 1 [description : untill key is less than length -1]
             * @return {[type]}     [description]
             */
            if(key < lenght - 1) {
              tempcart += JSON.stringify(productWise) + ', ';
            } else {
              tempcart += JSON.stringify(productWise);
            }
        });
        /**
         * [if description : if added product is already 
         * available in cart than update incremented product quantity in  localstorage cart
         *  otherwise insert new product detail in cart]
         * @param  {[type]} flag [description : set flag with 0]
         * @return {[type]}      [description]
         */
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
  /**
   * [addToDyfavourite description : mark or unmark product as favourite]
   * @param {[type]} productid [description : product id to which mark or unmark as favourite]
   * @param {[type]} shop_id   [description : store id of product]
   */
   $scope.addToDyfavourite = function(productid, shop_id) {
    /**
     * [description : myFavourite is factory method use for ajax call for marking product as favourite]
     * @param  {[type]} posts) {                   if(posts){          if (document.getElementById(productid).className [description]
     * @return {[type]}        [description]
     */
  		myFavourite.myDyfavourite(productid, $localStorage.profile,shop_id).success(function(posts) {
    		if(posts){

    			if (document.getElementById(productid).className == 'ion-heart') {
    				document.getElementById(productid).className = "";
    				document.getElementById(productid).className = "ion-android-favorite-outline";
    			} else {
    				document.getElementById(productid).className = "";
    				document.getElementById(productid).className = "ion-heart";
    			}
          /**
           * [wishList description : number of product in wishlist]
           * @type {[type]}
           */
    			$scope.wishList = posts.wishList;
    			$localStorage.wishList =$scope.wishList;
    	  }
      }).error(function(error) {

      });

	  }
    $scope.noMoreWishAvailable=true;
    /**
     * [getsearchProduct description : getsearchProduct is called when page is load first time for fetching favourite product]
     * @return {[type]} [description]
     */
    $scope.getsearchProduct=function(){
   			/**
         * [hasItem description : set hasItem by default with false]
         * @type {Boolean}
         */
        $scope.hasItem=false;
        /**
         * [description : myWishList factory method is use for fetching favourite product list]
         * @param  {[type]} posts) {                       $scope.hasItem [description : if there is no any items in favourite list than show message]
         * @return {[type]}        [description]
         */
   			myWishList.myWishListData($localStorage.profile,$localStorage.currentSelectedShop).success(function(posts) {
            $scope.hasItem = posts.hasItem;
            if(!$scope.hasItem){
             	$scope.hasMsg='Add products to your wish list while you shop and add them to your cart later.';
            }
            /**
             * [product description : assign returned favourite list in product array]
             * @type {[type]}
             */
            $scope.product = posts.data2;
            /** @type {[type]} [description : number of product in favourite list ] */
            $scope.wishLimit=$scope.product.length;
       			$scope.loadingdata=0;
            //$scope.mycounter = $scope.counter[0];
            $scope.currencyCode = $localStorage.currencyCode;
            $scope.mrp= $localStorage.mrp;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.postsCompleted = true;
           	if(posts.remainingData > 0)
            {
              $scope.noMoreWishAvailable = false;     
            }
            else
            {
              $scope.noMoreWishAvailable = true;     
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
       			$scope.noMoreWishAvailable = false;   
            });
   }
   $scope.loadMoreWish= function(){
      var start =$scope.wishLimit;
 			myWishList.loadWishListData($localStorage.profile,$localStorage.currentSelectedShop,start).success(function(posts) {
        $scope.hasItem = posts.hasItem;
        $scope.product = posts.data2;
        // $scope.counter = (posts.data4.records1);
        $scope.searchproduct = $scope.searchproduct.concat(posts.data1.records1);
        $scope.wishLimit=$scope.searchproduct.length;
  			$scope.loadingdata=0;
         //$scope.mycounter = $scope.counter[0];
        $scope.currencyCode = $localStorage.currencyCode;
        $scope.mrp= $localStorage.mrp;
        $scope.postsCompleted = true;
       	if(posts.remainingData > 0)
        {
             $scope.noMoreWishAvailable = false;     
        }
        else
        {
             $scope.noMoreWishAvailable = true;     
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
         	$scope.noMoreWishAvailable = false;   

        });
    }
/********************** End Code for wishlist**********************************/
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