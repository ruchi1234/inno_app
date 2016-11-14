app.config(['$stateProvider', '$urlRouterProvider','$ionicConfigProvider','$ionicNativeTransitionsProvider','$httpProvider',function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$ionicNativeTransitionsProvider,$httpProvider) {
   // $ionicConfigProvider.views.forwardCache(true);
    $httpProvider.interceptors.push('timeoutHttpIntercept');
    $ionicConfigProvider.views.maxCache(1);
    $ionicConfigProvider.views.swipeBackEnabled(false);

    $ionicNativeTransitionsProvider.setDefaultTransition({
        type: 'slide',
        direction: 'left'
    });
    $stateProvider
    //sidebar
    .state('app', {
        url : "/app",
        abstract : true,
        templateUrl : "templates/sidebar-menu.html"
    })
    //  login page
    .state('app.login', {
        url : "/login",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/login.html",
                controller : "LoginCtrl"
            }
        }
    })
    //  login page
    .state('app.logout', {
        url : "/logout",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/logout.html",
                controller : "LogoutCtrl"
            }
        }
    })
   
    // Sign up page
    .state('app.signup', {
        url : "/signup",
        views : {
            'menuContent' : {
                templateUrl : "templates/sign-up.html",
                controller : "SignUpCtrl"
            }
        }
    })

    //  category page
    .state('app.category', {
        url : "/category",
          cache : false,
        
        views : {
            'menuContent' : {
                templateUrl : "templates/category.html",
                controller : "CategoryCtrl"
            }
        }
    })
    

    //sub  category page
    .state('app.subcategory', {
        url : "/subcategory/:subcategoryId",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/subcategory.html",
                controller : "SubategoryCtrl"
            }
        }
    })

    //order page
    .state('app.order', {
        url : "/order",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/order.html",
                controller : "BasketCtrl"
            }
        }
    })
     //Thank you page
    .state('app.thankyou', {
        url : "/thankyou",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/thankyou.html",
                controller : "thankyouCtrl"
            }
        }
    })
    //order page
    .state('app.reorder', {
        url : "/reorder",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/myOrder.html",
                controller : "myOrderCtrl"
            }
        }
    })
    // Order between page
    //order page
    .state('app.reorderbtween', {
        url : "/reorderbtween",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/reorderbtween.html",
                controller : "myOrderCtrl"
            }
        }
    })
    
    .state('app.orderWise', {
        url : "/orderWise",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/orderWise.html",
                controller : "myOrderCtrl"
            }
        }
    })
// Change password
    //  error_page page
    .state('app.changepass', {
        url : "/changepass",
        views : {
            'menuContent' : {
                templateUrl : "templates/changepass.html",
                controller : "ChangepassCtrl"
            }
        }
    })

 

    //  Product detail page
    .state('app.product', {
        url : "/product/:productID",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/product.html",
                controller : "shopingCart"
            }
        }
    })

 // Latest Product List
    .state('app.latestproduct', {
        url : "/latestproduct",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/latestproduct.html",
                controller : "shopingCart"
            }
        }
    })
    
    //  product_list page
    .state('app.product_list', {
        url : "/product_list/:subcategoryId",
         cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/product_list.html",
                controller : "shopingCart"
            }
        }
    })
//Reorder Between page
    .state('app.reorderPage', {
        url : "/reorderPage",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/reorderPage.html",
                controller : "reorderCtrl"
            }
        }
    })
    //  product_search page
    .state('app.productsearch', {
        url : "/productsearch",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/productsearch.html",
                controller : "product_serach"
            }
        }
    })

    //select_store page
    .state('app.select_store', {
        url : "/select_store",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/select_store.html",
                controller : "SelectStoreCtrl"
            }
        }
    })

    //  my_order page
    .state('app.my_order', {
        url : "/my_order",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/my_order.html",
                controller : "MyOrderCtrl"
            }
        }
    })

    //  my_address page
    .state('app.my_address', {
        url : "/my_address",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/my_address.html",
                controller : "MyAddressCtrl"
            }
        }
    })

    //  new_address page
    .state('app.new_address', {
        url : "/new_address",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/new_address.html",
                controller : "NewAdderessCtrl"
            }
        }
    })

    //  edit_address page
    .state('app.edit_profile', {
        url : "/edit_profile",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/edit_profile.html",
                controller : "EditAddressCtrl"
            }
        }
    })

    //  error_page page
    .state('app.error_page', {
        url : "/error_page",
        views : {
            'menuContent' : {
                templateUrl : "templates/error_page.html",
                controller : "ErrorPageCtrl"
            }
        }
    })

   

    // Sign up page
    .state('app.forgot', {
        url : "/forgot",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/forgot.html",
                controller : "ForgotCtrl"
            }
        }
    })
  
    // Store list page
    .state('app.store_list', {
        url : "/store_list",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/store_list.html",
                controller : "StoreListCtrl"
            }
        }
    })
    // Wish list page
    .state('app.wish_list', {
        url : "/wish_list",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/wish_list.html",
                controller : "wishCtrl"
            }
        }
    })
    
    // Contact us page
    .state('app.contact_us', {
        url : "/contact_us",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/contact.html",
                controller : "ContactUsCtrl"
            }
        }
    })
    
   
    //Issue Status Page
    .state('app.issue_status', {
        url : "/issue_status",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/issue_status.html",
                controller : "IssueStatusCtrl"
            }
        }
    })
    //Issue Status detail Page
    .state('app.issue_status_detail', {
        url : "/issue_status_detail",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/issue_status_detail.html",
                controller : "IssueStatusDetailCtrl"
            }
        }
    })
     //Issue Status Page
    .state('app.customize', {
        url : "/customize/:productID",
        cache : false,
        views : {
            'menuContent' : {
                templateUrl : "templates/customize.html",
                controller : "shopingCart"
            }
        }
    })
    
     .state('app.slider', {
        url : "/slider",
        cache : true,
        views : {
            'menuContent' : {
                templateUrl : "templates/sliderTemplate.html",
                controller : "SliderController"
            }
        }
    });

    if (!localStorage.page || localStorage.page!='') {
        
        if(!localStorage['ngStorage-profile'] || localStorage['ngStorage-profile'] == '-1'){ 
            $urlRouterProvider.otherwise("/app/category");
             
           
        }
        else
        {
           
                $urlRouterProvider.otherwise("/app/category");
           
        }
       
       
    } else {
          
             var page = localStorage.page;
             localStorage.page = '';
             //window.localStorage.removeItem("page");

        $urlRouterProvider.otherwise(page);
    }
}]); 