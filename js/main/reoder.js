app.controller('reorderCtrl', ['$scope', '$rootScope', '$ionicPopup', '$state', '$localStorage', '$ionicPopup','myOrder','changeorderStatus','$stateParams','$ionicHistory',

function($scope, $rootScope, $ionicPopup, $state,  $localStorage, $ionicPopup,myOrder,changeorderStatus,$stateParams,$ionicHistory) {

 

    var shopWise = 'cart_' + $localStorage.cart;

   

    var shopWiseItem = 'totalItemInCart_' + $localStorage.cart;

     $scope.counters = []; 

      $rootScope.ordering = $localStorage.ordering;

     $scope.counters = $rootScope.counters;

    /*************************** Rerder Page *********************************/

      $scope.getReorder = function() {

        $scope.loadingdata=1;

        $scope.items = [];

        $scope.totalqauntity = 0;

        $scope.itemQuantity1 = [];

        $scope.itemQuantity = [];

        $scope.formData={};

      

        $scope.orderId = $localStorage.orderId;

        $scope.getVal=$localStorage.getVal;

       

        

       

        myOrder.orderWiseProduct($localStorage.profile,$localStorage.currentSelectedShop, $localStorage.orderId).success(function(posts) {

            $scope.loadingdata=2;

            $scope.re_items      =    posts.data1.records;

            $scope.total         =    posts.total;

            $scope.totalquantity =    posts.totalQuantity;

            $scope.deliveryStatus=    posts.deliveryStatus;

            $scope.currencyCode  =    $localStorage.currencyCode;

            $scope.mrp           =    $localStorage.mrp;

            $scope.orderStatusName=    posts.orderStatusName;

            var cart_length = $scope.re_items.length; 

            for (var i=0; i <  cart_length; i++) {

                if($scope.counters.indexOf($scope.re_items[i].quantity) == -1)

                {

                    $scope.counters.splice(0, 0, $scope.re_items[i].quantity);

                }

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

            $scope.re_items = [];

        });

     

       

    

    };

   /**************************************** Code for Confir, or cancel Product*************************************************************/

   $scope.changestatus = function(orderId,key){

    changeorderStatus.changeOrderStatus(orderId,key)

        .success(function(posts) {

            $state.transitionTo($state.current, $stateParams, {

                        reload: true,

                        inherit: false,

                        notify: true

                    });

           /* $state.go($state.current, {}, {

                    reload : true

                });

            */

            //$state.go('app.thankyou');  

        }).error(function(error) {



        });

    

    }

    /****************************************** Add to cart from Reorder page ****************************/

    $scope.deleterecord = function(productId){

         $scope.total =  $scope.total - $scope.re_items[productId].pro_cost * $scope.re_items[productId].pkgquantity * $scope.re_items[productId].quantity;

          $scope.totalquantity = $scope.totalquantity - $scope.re_items[productId].quantity;

         $scope.re_items.splice(productId,1);

         

    }

        $scope.addreordercart=function(){

            

            var showNotify = 0;       

            

            angular.forEach($scope.re_items, function(value, key) {

                var notify_product_name = value['name'];

                

            if(value['notify']!=2)

            {

              

              var price = value['selling_price'];

              var productId =value['id'];

              var image= value['image'];

              var pkgquantity = value['pkgquantity'];

              var product_name = value['name'];

              var variation = value['child'];

              var productParent_id = value['productParent_id'];

              if (!$scope.formData.itemQuantity[productId]) {

                    quantity = parseInt(value['quantity']);

               } else {

                quantity = parseInt($scope.formData.itemQuantity[productId]);

            }

           

            

            if(quantity){

                // code for adding product in order list

               var flag = 0;

         

               var tempcart = "";



                $rootScope.itemInCart = parseInt($rootScope.itemInCart) + parseInt(quantity);



                $localStorage.shopWiseItem = $rootScope.itemInCart;

                //console.log("total item in catr" + $rootScope.itemInCart);



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

                //console.log(tempcart);

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

                    productParent_id : productParent_id

                   

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

                productParent_id: productParent_id

            };

            

            $localStorage.shopWise = JSON.stringify($rootScope.myCart);

            

        }

            

            // end code for adding product in order list

            }

        }

            else

                {

                    showNotify = 1;     

                }

            });

   

            if(showNotify==1)

            {

                var alertPopup = $ionicPopup.alert({

                title : 'Product quantity ',

                template : 'Oops some product is  not available in our stock',

                okText: 'Go'

             });

                alertPopup.then(function(res) {

                    $state.go('app.order');

                });

            }

            else

            {

                $state.go('app.order');

            }

            

            /*}

             }); */

            

        }

     /****************************************** End of Add to cart from Reorder page ****************************/

       $scope.setpreURL = function() {

       

         $ionicHistory.goBack();

       

        };



         $scope.updateQuantity = function(index,productId) {

            console.log($scope.totalquantity);

            $scope.totalquantity = $scope.totalquantity - parseInt($scope.re_items[index].quantity);

            $scope.total = $scope.total - ($scope.re_items[index].pro_cost * $scope.re_items[index].pkgquantity * $scope.re_items[index].quantity);

            $scope.totalquantity = $scope.totalquantity + parseInt($scope.formData.itemQuantity[productId]);

            $scope.total += $scope.re_items[index].pro_cost * $scope.re_items[index].pkgquantity * $scope.formData.itemQuantity[productId];

            $scope.re_items[index].quantity = $scope.formData.itemQuantity[productId];

         }

}]);