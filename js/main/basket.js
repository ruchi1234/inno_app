//shoping controler
//var imgindex =0 ;
app.controller('BasketCtrl', ['$scope', '$rootScope', '$state', '$localStorage', 'placeOrder','$stateParams',
function($scope, $rootScope,  $state, $localStorage,  placeOrder,$stateParams) {
   
	var shopWise = 'cart_' + $localStorage.cart;
    $localStorage.shopWise;
    var shopWiseItem = 'totalItemInCart_' + $localStorage.cart;
    $rootScope.ordering = $localStorage.ordering;
    $scope.$on('$ionicView.enter', function(event, viewData) {
        getCart();
    });
   function getCart() {
    
        $scope.items = [];
        $scope.totalqauntity = 0;
        $scope.itemQuantity = [];
        $scope.counters = []; 
        $scope.counters = $rootScope.counters;
        var quantity = 0;
       
        if ($localStorage.shopWise) {
            
            $localStorage.shopWise = $localStorage.shopWise.replace(/,\s*$/, "");
               $scope.items = JSON.parse('[' + $localStorage.shopWise + ']');
         
           var cart_length = $scope.items.length;
            
            for (var i=0; i <  cart_length; i++) {

               if($scope.counters.indexOf($scope.items[i].quantity) == -1)
               {
                 
               
                        $scope.counters.splice(0, 0, $scope.items[i].quantity);
               }
               $scope.itemQuantity[$scope.items[i].prduct_id] = $scope.items[i].quantity;
                quantity += parseInt($scope.items[i].quantity);
                $scope.totalqauntity += parseFloat($scope.items[i].price) * parseFloat($scope.items[i].quantity) * parseFloat($scope.items[i].pkgquantity);
               
              
            };
            
           
            $scope.totalqauntity = parseFloat($scope.totalqauntity);

            $scope.quantity = quantity;
           
             $scope.IsClickEnable = true;
             $scope.currencyCode  = $localStorage.currencyCode;
                $scope.mrp           = $localStorage.mrp;
        
        } else {

            quantity = 0;
            $scope.quantity = quantity;
            $scope.noData = 'No Item Selected';
         
            
           
        }
      
    };
    /**************************** Order Page end ****************************/
    
    /****************************** Remove item from cart *********************/
 
    $scope.removeItem = function(index) {
        var quantitys = 0;
        
        
        $scope.quantity = $scope.quantity - parseInt($scope.items[index].quantity);
        $scope.totalqauntity = $scope.totalqauntity - (parseFloat($scope.items[index].quantity) * parseFloat($scope.items[index].quantity));
        $scope.totalqauntity = parseFloat($scope.totalqauntity);
        $scope.items.splice(index, 1);
        
      
        var array = $localStorage.shopWise.split(', ');

        var lenght = array.length;
        var myString = "";

        angular.forEach(array, function(value, key) {
           
            if (key != index && key < lenght - 1) {
                myString += value + ', ';
                //console.log('first call' + key);
            } else if (key != index) {
                myString += value;
                //console.log('second call' + key);
            }

        });

        myString = myString.replace(/,\s*$/, "");

        if (myString) {
           
            $scope.totalqauntity = 0 ;
            $localStorage.shopWise = myString;
            for (var i = 0; i < $scope.items.length; i++) {
                quantitys += parseInt($scope.items[i].quantity);
                $scope.totalqauntity += parseFloat($scope.items[i].price) * parseFloat($scope.items[i].quantity)* parseFloat($scope.items[i].pkgquantity);
                $scope.totalqauntity = parseFloat($scope.totalqauntity);
                //console.log($scope.totalqauntity);
            };
            //$scope.totalqauntity = $scope.totalqauntity * quantitys;
            $rootScope.itemInCart = quantitys;
            $localStorage.shopWiseItem = $rootScope.itemInCart;
           
            quantitys = 0;
            
           
        } else {
            delete $localStorage.shopWise;
            delete $localStorage.shopWiseItem;
            $scope.totalqauntity = 0 ;
            $scope.IsClickEnable = false;
           
        }

    };
   
    /*******************************Remove Item from cart end *****************/

    /********************************Place order start******************************/
   $scope.cover=0;
    $scope.placeOrder = function() {
        if($localStorage.ispublic_profile)
        {
            $state.go('app.edit_profile');
        }
        else
        {
    	$scope.cover=1;
        var tempCartItem = $scope.items;
        var user_id = $localStorage.profile;
        placeOrder.placeOrder(tempCartItem, user_id, $localStorage.currentSelectedShop)
        .success(function(posts) {
            $scope.items = [];
            $scope.totalqauntity = 0;
            delete $localStorage.shopWise;
            delete $localStorage.shopWiseItem;
            
            $scope.cover=0;
            $state.go('app.thankyou');
        }).error(function(error) {

        });
      }
    };
    $scope.updateQuantity = function(index,productId) {

        $scope.quantity = $scope.quantity - $scope.items[index].quantity;
       
        
        $scope.totalqauntity = $scope.totalqauntity - (parseInt($scope.items[index].quantity) * parseFloat($scope.items[index].price) * parseInt($scope.items[index].pkgquantity));
      
         $scope.items[index].quantity = parseInt($scope.itemQuantity[productId]);
        $scope.quantity = $scope.quantity + parseInt($scope.items[index].quantity);
        
        $rootScope.itemInCart =  $scope.quantity;
        $localStorage.shopWiseItem = $rootScope.itemInCart;
        
         $scope.totalqauntity += parseFloat($scope.items[index].price) * parseInt($scope.items[index].quantity)* parseInt($scope.items[index].pkgquantity);
         $scope.totalqauntity = parseFloat($scope.totalqauntity);
      
        /************************** update local storage data *******************************/
        var myCartItem = $localStorage.shopWise.split(', ');
        
        var lenght = myCartItem.length;
        var flag = 0;
        var tempcart= "";
        angular.forEach(myCartItem, function(value, key) {

            var productWise = eval('(' + value + ')');
            for (i in productWise) {
                if (productWise['prduct_id'] == $scope.items[index].prduct_id && flag == 0) {
                    productWise['quantity'] = $scope.items[index].quantity;
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

        }
        /*************************** update local storage data close*******************************/
      /*
        $scope.itemQuantity = [];
        for (var i = 1; i <= 1000; i++) {
            $scope.itemQuantity.push(i);
        };
       */
        var quantity = 0;
        if ($localStorage.shopWise) {
            $localStorage.shopWise = $localStorage.shopWise.replace(/,\s*$/, "");
          
            //$scope.items = JSON.parse('[' + $localStorage.shopWise + ']');
        }
        //console.log($scope.totalqauntity);
    };
    /*********************************place order close******************************/
}]);