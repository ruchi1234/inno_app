/* main controller function */
/**
 * [description : main controller is use for side menu ]
 * @param  {[type]} $scope                 [description : Bind model with views]
 * @param  {[type]} $ionicSideMenuDelegate [description : ]
 * @param  {[type]} $ionicHistory)         {		$scope.toggleLeft [description : ]
 * @return {[type]}                        [description]
 */
app.controller('MainCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicHistory',
function($scope, $ionicSideMenuDelegate, $ionicHistory) {
	// Toggle left function for app sidebar
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
	// go back to previous page
	$scope.goBackOne = function() {
		$ionicHistory.goBack();
	};
	// sharing plugin
	$scope.shareMain = function() {
		var title = "Download Innorade For Android";
		var url = "https://play.google.com/store/apps/details?id=com.weblogtemplates.innorade&referrer=deepak";
		window.plugins.socialsharing.share(title, null, null, url);
	};
	$scope.shareArticle = function(title, url) {
		window.plugins.socialsharing.share(title, null, null, url);
	};
	$scope.openLinkArticle = function(url) {
		window.open(url, '_system');
	};
}]);
/*error controller function*/
app.controller('ErrorPageCtrl', ['$scope','$ionicHistory',
function($scope,$ionicHistory) {
	//checkConnection();
	$scope.setpreURL = function() {
         $ionicHistory.goBack();
    };

}]);
//login page of app
app.controller('LoginCtrl', ['$state', '$scope','$rootScope','login', '$log', '$localStorage', '$sessionStorage', '$ionicPlatform','$ionicPopup',
function($state, $scope,$rootScope, login, $log, $localStorage, $sessionStorage, $ionicPlatform, $ionicPopup) {
	//add your login logic here
	$ionicPlatform.offHardwareBackButton(function() {

	});
	if ($localStorage.profile) {
		//$state.go('app.category');
	}
	$scope.formData = {};
	$scope.doLogin = function() {
		var flag = 1;
		if (checkConnection()) {
			var alertPopup = $ionicPopup.alert({
				title : 'Network issue',
				template : 'Oops something wrong!',
				okText : 'Refresh'
			});
		} else {
			if ($scope.formData.phone) {
				//var test = $scope.formData.phone.charAt(0);
				var phone_number = $scope.formData.phone.slice(-10);
				
				var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;
				
				/*
				if (test != 0 || test != '+') {
					var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;
				}
				else {
					var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{5}$/;
				}
				*/
				var phon = PHONE_REGEXP.test(phone_number)

				if (phon == false) {
					flag = 0;
					$scope.myObj = {
						"border-bottom" : "red 1px solid"
					}

				} else {
					$scope.myObj = {
						"border-bottom" : "#ddd 1px solid"

					}
				}
			} else {
				flag = 0;
				$scope.myObj = {
					"border-bottom" : "red 1px solid"
				}
			}
			if (!$scope.formData.password) {
				flag = 0;
				$scope.passStyle = {
					"border-bottom" : "red 1px solid"
				}
			} else {
				$scope.passStyle = {
					"border-bottom" : "#ddd 1px solid"
				}
			}
			if (flag == 1) {
				$rootScope.covers = 1;
				var deviceToken = "1";
				var platform = "";
				if (!localStorage.device_token_syt || localStorage.device_token_syt == '-1') {
					$rootScope.deviceID ='';
				} else {
					deviceToken = localStorage.device_token_syt;
					if (ionic.Platform.isAndroid()) {
						platform = "android";

					} else {
						platform = "ios";
					}
				}				
				$scope.formData.deviceToken  = deviceToken;				
				$scope.formData.platform     = platform;				
				
				login.loginpage($scope.formData).success(function(posts) {
					$scope.errormsg = '';
					$scope.errorpass = '';
					if (posts.Str == 1 && posts.token) {
						$rootscope.user_id = $localStorage.profile = posts.token;
						localStorage.auth_token = posts.auth_token;

						/***********************************************/	
						/*
						if($localStorage.preURL){
							 var link =$localStorage.preURL;
							 var values = link.split("product/");
							 var getvalues = values[1];
							 $localStorage.preURL='';
							$state.go('app.product',{productID:getvalues });
					        
					    }
					    */					
						var shopWiseItem = 'totalItemInCart_' + $localStorage.cart;			
						if ($localStorage.shopWiseItem) {												
							$rootScope.itemInCart = $localStorage.shopWiseItem;							
							$state.go('app.order');											
							} else {												
								$rootScope.itemInCart = $localStorage.shopWiseItem = 0;												
								$state.go('app.category');											
							}						
					    /**********************************************/
						
					} else {
						$rootScope.covers = 0;
						$scope.errorpass = 'Invalid Login Details';
					}

				}).error(function(error, status) {
					if (!error && status == 0) {
						$state.go($state.current, {}, {
							reload : true
						});
					} else if (status === 408) {
						var alertPopup = $ionicPopup.alert({
							title : 'Timeout issue',
							template : 'Oops something wrong!',
							okText : 'Refresh'
						});
						$state.go($state.current, {}, {
							reload : true
						});
					}
				});
			}
		}
	};
}]);

// Change pasword Controllers
app.controller('ChangepassCtrl', ['$state', '$scope', 'forgot', 'changePassword', '$localStorage',
function($state, $scope, forgot, changePassword, $localStorage) {

	if (checkConnection()) {
		//$urlRouterProvider.otherwise("/app/store_list");
		$state.go('app.error_page');

	}
	$scope.formData = {};

	$scope.errorpass = '';

	$scope.changePaasword = function() {
		var flag = 1;
		var msg = 0;
		$scope.cover = 0;
		if (!$scope.formData.cupass) {

			flag = 0;
			$scope.currentStyle = {
				"border-bottom" : "red 1px solid"
			}
		} else {
			var str = $scope.formData.cupass;
			str = str.length;
			if (str < 6) {
				flag = 0;
				msg = 1;
				$scope.currentStyle = {
					"border-bottom" : "red 1px solid"
				}
			} else {
				$scope.currentStyle = {
					"border-bottom" : "#ddd 1px solid"
				}
			}
		}

		if (!$scope.formData.newpassword) {

			flag = 0;
			$scope.passStyle = {
				"border-bottom" : "red 1px solid"
			}
		} else {
			var str = $scope.formData.newpassword;
			str = str.length;
			if (str < 6) {
				flag = 0;
				msg = 1;
				$scope.passStyle = {
					"border-bottom" : "red 1px solid"
				}
			} else {
				$scope.passStyle = {
					"border-bottom" : "#ddd 1px solid"
				}
			}
		}
		if (!$scope.formData.cnfpassword) {
			flag = 0;
			$scope.cnfpassStyle = {
				"border-bottom" : "red 1px solid"
			}
		} else {
			var str = $scope.formData.cnfpassword;
			str = str.length;
			if (str < 6) {
				flag = 0;
				msg = 1;
				$scope.cnfpassStyle = {
					"border-bottom" : "red 1px solid"
				}
			} else {
				$scope.cnfpassStyle = {
					"border-bottom" : "#ddd 1px solid"
				}
			}
		}
		if (msg == 1) {
			$scope.errorpass = 'Your password must be at least 6 characters long. ';
		} else {
			if ($scope.formData.cnfpassword != $scope.formData.newpassword) {
				$scope.errorpass = 'The password entered does not match.';
				$scope.cnfpassStyle = {
					"border-bottom" : "red 1px solid"
				};
				$scope.passStyle = {
					"border-bottom" : "red 1px solid"
				};
				msg = 1;
			} else {
				$scope.errorpass = '';
			}

		}
		if (flag == 1 && msg == 0) {
			$scope.cover = 1;
			changePassword.change_Password($localStorage.profile, $scope.formData.cupass, $scope.formData.newpassword).success(function(posts) {
				$scope.cover = 0;
				if (posts.Str == 1) {
					$scope.formData.cupass = '';
					$scope.formData.newpassword = '';
					$scope.formData.cnfpassword = '';
					$scope.errorpass = "Your password has been change";
					localStorage.auth_token = posts.auth_token;
				} else {
					$scope.errorpass = "Incorrect current password";
				}
			}).error(function(error) {
				//$state.go('error_page');
			});
		}
	};

}]);
// select_store page of app //
app.controller('ForgotCtrl', ['$state', '$scope', 'forgot',
function($state, $scope, forgot) {
	if (checkConnection()) {
		//$urlRouterProvider.otherwise("/app/store_list");
		$state.go('app.error_page');

	}
	$scope.formdata = {};
	$scope.cover = 0;
	var email_id = $scope.formdata.email_id;
	var checkCondition = 0;
	$scope.doForgetPass = function() {
		var flag = 1;
		var numbers = /^[0-9]+$/;

		if (!$scope.formdata.email_id) {
			$scope.myObj = {
				"border-bottom" : "red 1px solid"
			}
			 
			flag = 0;

		} else {
			if (numbers.test($scope.formdata.email_id))// If entered value is Number
			{
				checkCondition = 1;
				
			}  
		}

		if (checkCondition)// If entered value is Number then Phone Validation will check
		{
 				var test = $scope.formdata.email_id.charAt(0);
				if (test != 0) {
					var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;
				} else {
					var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{5}$/;
				}
				var phon = PHONE_REGEXP.test($scope.formdata.email_id)

				if (phon == false) {
					flag = 0;
					$scope.errormsg="Enter Valid Phone Number."
					$scope.myObj = {
					"border-bottom" : "red 1px solid"}
					

				} else {
					$scope.errormsg="";
					$scope.myObj = {
						
						"border-bottom" : "#ddd 1px solid"
					}
				}
		} else { 
			if (!$scope.formdata.email_id) {
             $scope.myObj={"border-bottom" : "red 1px solid" }
            flag = 0;
             
        }else{
        	var EMAILREGEXP = new RegExp('/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/');
        	if(EMAILREGEXP.test($scope.formdata.email_id)){
        		  flag = 0;
        		  $scope.errormsg="Enter Valid Email Format.";
        		  console.log(email_id);
        	$scope.myObj={"border-bottom" : "red 1px solid" }
        }else{
        	$scope.errormsg=""
        	$scope.myObj={"border-bottom" : "#ddd 1px solid" }
        }
        	 }

		}

		if (flag) {
			$scope.cover =1;
			forgot.forgotpage($scope.formdata.email_id).success(function(posts) {
				$scope.formdata.email_id = '';
				$scope.cover =0;
				if (posts.Str == 1) {
					$scope.msg = "Password reset link has been sent on your registered email id. Please follow instruction of email to reset your password.";
					setTimeout(function() {
						$state.go('app.login');
					}, 150000);

				} else {
					if(checkCondition){
						$scope.msg = "Please check your phone no. This phone no. is not registered with innorade.";
					}else{
						$scope.msg = "Please check your email id. This email id is not registered with innorade.";
					}
					
				}
			}).error(function(error) {
				//$state.go('error_page');
			});
		}
	};
}]);

var EMAIL_REGEXP = new RegExp('/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/');
var PAN_REGEXP = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
// Sign up page of app //
app.controller('SignUpCtrl', ['$scope', '$state', '$filter', 'SignUp', '$localStorage', '$ionicPopup', '$ionicPlatform', 'HardwareBackButtonManager','$rootScope',
function($scope, $state, $filter, SignUp, $localStorage, $ionicPopup, $ionicPlatform, HardwareBackButtonManager,$rootScope) {
	// sign up logic here
	$scope.$on('$ionicView.enter', function(event, viewData) {
		/* $ionicPlatform.offHardwareBackButton(function() {
		 });
		 */
	});
	if ($localStorage.profile) {
		$state.go('app.store_list');
	}
	$scope.cover = 0;
	$scope.myData = {};
	$scope.errorvalidation = '';

	$scope.referrer =0;
	$scope.signup = function() {
		$scope.errorvalidation = '';
		if (!$scope.myData.phone) {
			var phon = false;
			 
		} else {
			var phone_number = $scope.myData.phone.slice(-10);
			
			var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;
			var phon = PHONE_REGEXP.test(phone_number)
		}
		var input = $scope.myData.phone;
		var flag = 1;
		if (!$scope.myData.businessName) {
			$scope.banmeerr = {
				"border-bottom" : "red 1px solid"
			}
			flag = 0;
			if ($scope.errorvalidation == '') {
				$scope.errorvalidation = 'Business name is required';
			}
		} else {
			$scope.banmeerr = {
				"border-bottom" : "#ddd 1px solid"
			}
			$scope.errorvalidation = "";

		}
		if (!$scope.myData.name) {
			if ($scope.errorvalidation == '') {
				$scope.errorvalidation = 'Contact person name is required';
			}
			$scope.personerr = {
				"border-bottom" : "red 1px solid"
			}
			flag = 0;
		} else {
			$scope.personerr = {
				"border-bottom" : "#ddd 1px solid"
			}
			$scope.errorvalidation = "";
		}
		if (!$scope.myData.address) {
			if ($scope.errorvalidation == '') {
				$scope.errorvalidation = 'Address is required';
			}
			$scope.texterr = {
				"border-bottom" : "red 1px solid"
			}
			flag = 0;
		} else {
			$scope.texterr = {
				"border-bottom" : "#ddd 1px solid"
			}
			$scope.errorvalidation = "";
		}

		if (!$scope.myData.email) {
			
		} else {
			if (EMAIL_REGEXP.test($scope.myData.email)) {
				flag = 0;
				$scope.emailerr = {
					"border-bottom" : "red 1px solid"
				}
				if ($scope.errorvalidation == '') {
					$scope.errorvalidation = 'Email id is not valid';
				}
			} else {
				$scope.emailerr = {
					"border-bottom" : "#ddd 1px solid"
				}
				$scope.errorvalidation = "";
			}
		}
		if (phon == false) {
			$scope.pnumbererr = {
				"border-bottom" : "red 1px solid"
			}
			// $scope.errorphone = 'Please enter number only';
			if ($scope.errorvalidation == '') {
				$scope.errorvalidation = 'Phone number is not valid';
			}
			flag = 0;
		} else {
			$scope.pnumbererr = {
				"border-bottom" : "#ddd 1px solid"
			}
			$scope.errorvalidation = "";
		}
		if (!$scope.myData.password) {
			var str = "";
			str = str.length;

		} else {
			var str = $scope.myData.password;
			str = str.length;
		}
		if (!$scope.myData.password) {
			flag = 0;
			if ($scope.errorvalidation == '') {
				$scope.errorvalidation = 'Password is required';
			}
			$scope.passerr = {
				"border-bottom" : "red 1px solid"
			}
		} else if (str < 6) {
			flag = 0;
			if ($scope.errorvalidation == '') {
				$scope.errorvalidation = 'Password should not be less than 6 character';
			}
			$scope.passerr = {
				"border-bottom" : "red 1px solid"
			}
			// $scope.nameRequired = 'Password should be minimum 6';
		} else {
			$scope.passerr = {
				"border-bottom" : "#ddd 1px solid"
			}
			$scope.errorvalidation = "";
		}
		if ($scope.myData.tin != '') {

		}
		if (flag == 1) {
			$scope.errorvalidation = '';
			if (checkConnection()) {
				var alertPopup = $ionicPopup.alert({
					title : 'Network issue',
					template : 'Oops something wrong!'
				});
			} else {
				HardwareBackButtonManager.disable();				 $scope.cover = 1;
				$scope.errormail = '';
				var platform = ""
				if (!localStorage.device_token_syt || localStorage.device_token_syt == '-1') {
					localStorage.device_token_syt = -1;
					$rootScope.deviceID = '';
				} else {
					if (ionic.Platform.isAndroid()) {
						platform = "android";

					} else {
						platform = "ios";
					}
				}	
			    if(!$scope.myData.pancode){
			    	$scope.myData.pancode='';
			    }
			    if(!$scope.myData.tin){
			    	$scope.myData.tin='';
			    }
    			$scope.myData.device_token_syt = localStorage.device_token_syt;
				$scope.myData.platform         = platform ;				
				$scope.myData.version          = $localStorage.version;				
				
				$scope.myData.store_list       = $localStorage.currentSelectedShop;
				SignUp.registration($scope.myData).success(function(posts) {					
					if (posts.Str == 1) {						
						$localStorage.profile = posts.token;						
						localStorage.auth_token = posts.auth_token;						
						HardwareBackButtonManager.enable();						
						$scope.myData.store_list ='';						
						/***********************************************/
						if($localStorage.preURL){
							var link =$localStorage.preURL;
							var values = link.split("product/");
							var getvalues = values[1];
							$localStorage.preURL='';
							$state.go('app.product',{productID:getvalues });
					    }						
						var shopWiseItem = 'totalItemInCart_' + $localStorage.cart;						
						if ($localStorage.shopWiseItem) {												
							$rootScope.itemInCart = $localStorage.shopWiseItem;							
							$state.go('app.order');											
						} else {												
							$localStorage.shopWiseItem = 0;												
							$rootScope.itemInCart = $localStorage.shopWiseItem;							
							$state.go('app.category');											
						}						
					    /**********************************************/					
						} else {						
							$scope.cover = 0;						
							$scope.errormail = posts.Str;						
							$scope.errorstore = posts.Str2;					
							}				
						}).error(function(error, status) {					
							if (!error && status == 0) {						
								$state.go($state.current, {}, {							
									reload : true						
									});	} else if (status === 408) {						
											var alertPopup = $ionicPopup.alert({							
											title : 'Timeout issue',							
											template : 'Oops something wrong!',							
											okText : 'Refresh'						
										});
										$state.go($state.current, {}, {
											reload : true
										});					
									}					
								   $scope.errormail = "Some thing going wrong";
				        });
			}
			} else {

				$scope.nameRequired = 'Fields cant not be blank';
			}
	};
}]);

//  Profile
app.controller('MyAddressCtrl', ['$scope', '$state', '$filter', 'profileData', '$localStorage',
function($scope, $state, $filter, profileData, $localStorage) {
	// alert($localStorage.profile);
	$scope.loadingdata = 1;
	if (checkConnection()) {
		$state.go('app.error_page');
	}
	$scope.userProfile = [];
	profileData.Profile_data($localStorage.profile,$localStorage.currentSelectedShop).success(function(posts) {
		$scope.userProfile = $scope.userProfile.concat(posts.data1.records1);
		$scope.moreFiels = posts.more_fields;
		$scope.show_identity_name  =    $scope.moreFiels.show_identity_name;
		$scope.show_identity_name2 =    $scope.moreFiels.show_identity_name2;
		$scope.loadingdata = 0;

	}).error(function(error) {
		// alert(error);
	});
}]);
// Edit Profile
app.controller('EditAddressCtrl', ['$scope', '$state', '$filter', 'profileData', '$localStorage', 'Updateprofile','$rootScope',
function($scope, $state, $filter, profileData, $localStorage, Updateprofile,$rootScope) {
	// alert($localStorage.profile);
	$scope.loadingdata = 1;
	if (checkConnection()) {
		$state.go('app.error_page');
	}
	$scope.userProfile = [];
	$scope.myData = {};
	profileData.Profile_data($localStorage.profile,$localStorage.currentSelectedShop).success(function(posts) {
		$scope.userProfile = $scope.userProfile.concat(posts.data1.records1);
		$scope.moreFiels = posts.more_fields;
		
		$scope.identity_name       =    $scope.moreFiels.identity_name;
		$scope.identity_name2      =    $scope.moreFiels.identity_name2;
		$scope.show_identity_name  =    $scope.moreFiels.show_identity_name;
		$scope.show_identity_name2 =    $scope.moreFiels.show_identity_name2;
		//  console.log(  $scope.identity_name  );
		$scope.loadingdata = 0;
		$scope.myData.businessName = $scope.userProfile[0].businessName;
		$scope.myData.name = $scope.userProfile[0].name;
		$scope.myData.address = $scope.userProfile[0].address;
		$scope.myData.email = $scope.userProfile[0].email;
		$scope.myData.hdnemail = $scope.userProfile[0].email;
		$scope.myData.phone = $scope.userProfile[0].phone;
		$scope.hdnPhone = $scope.userProfile[0].phone;
		$scope.myData.pincode = $scope.userProfile[0].pincode;
		$scope.myData.panard = $scope.userProfile[0].pancard;
		$scope.myData.tin = $scope.userProfile[0].tin;
		 

	}).error(function(error) {
		//alert(error);
	});

	$scope.editProfile = function() {
		var flag = 1;
		$scope.errormail = '';
		var phone = stringIsNumber($scope.myData.phone);

		var pincode = stringIsNumber($scope.myData.pincode);
		/*** Validation For BUsiness Name    **/
		if (!$scope.myData.businessName) {
			flag = 0;
			$scope.banmeerr = {
				"border-bottom" : "red 1px solid"
			}
		} else {
			$scope.banmeerr = {
				"border-bottom" : "#ddd 1px solid"
			}
		}
		/*** Validation For Name    **/
		if (!$scope.myData.name) {
			flag = 0;
			$scope.personerr = {
				"border-bottom" : "red 1px solid"
			}
		} else {
			$scope.personerr = {
				"border-bottom" : "#ddd 1px solid"
			}
		}

		/*** Validation For address    **/
		if (!$scope.myData.address) {
			flag = 0;
			$scope.texterr = {
				"border-bottom" : "red 1px solid"
			}
		} else {
			$scope.texterr = {
				"border-bottom" : "#ddd 1px solid"
			}
		}

		/*** Validation For email    **/
		if (!$scope.myData.email) {
			/*
			flag = 0;
			$scope.emailerr = {
				"border-bottom" : "red 1px solid"
			}
			*/
		} else {
			if (EMAIL_REGEXP.test($scope.myData.email)) {
				flag = 0;
				$scope.emailerr = {
					"border-bottom" : "red 1px solid"
				}
			} else {
				$scope.emailerr = {
					"border-bottom" : "#ddd 1px solid"
				}
			}

		}

		/*** Validation For phone    **/

		if (!$scope.myData.phone) {
			flag = 0;
			$scope.pnumbererr = {
				"border-bottom" : "red 1px solid"
			}
		} else {

			var phone_number = $scope.myData.phone.slice(-10);
			var PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;
			var phon = PHONE_REGEXP.test(phone_number)
		    if (phon == false) {
				flag = 0;
				$scope.pnumbererr = {
					"border-bottom" : "red 1px solid"
				}
			} else {
				$scope.pnumbererr = {
					"border-bottom" : "#ddd 1px solid"
				}
			}
			
		}

		/*** Validation For pincode    **/
		if (!$scope.myData.pincode) {
			flag = 0;
			$scope.storeerr = {
				"border-bottom" : "red 1px solid"
			}
			$scope.pincodeRequired = 'Pincode is required';
		} else {
			var pincodeLength = $scope.myData.pincode.length;
			if (pincode == false) {
				flag = 0;
				$scope.storeerr = {
					"border-bottom" : "red 1px solid"
				}
				$scope.pincodeRequired = 'Enter Integer Only';
			} else if (pincodeLength != 6) {
				flag = 0;
				$scope.storeerr = {
					"border-bottom" : "red 1px solid"
				}
				$scope.pincodeRequired = 'Enter 6 digit';
			} else {
				$scope.storeerr = {
					"border-bottom" : "#ddd 1px solid"
				}
			}

		}
		if (flag == 1) {
			Updateprofile.updateRecord($localStorage.profile,$scope.myData,$scope.hdnPhone).success(function(response) {
				
				if (response.msg) {
					$scope.errormail = response.msg;
				}
				else if(response.Str == 1) {
						$state.go('app.my_address');
				}

			}).error(function(error) {
			});
		}

	}
}]);

// select_store page of app //
app.controller('SelectStoreCtrl', ['$scope', 'SelectStore',
function($scope, SelectStore) {
	if (checkConnection()) {
		$state.go('app.error_page');
	}
	if (!$localStorage.profile) {
		$state.go('app.login');
	}
	$scope.formData = {};
	$scope.selectStore = [];
	//ajax call for Select Store
	SelectStore.Select_Store().success(function(posts) {
		$scope.selectStore = $scope.selectStore.concat(posts.data1.records1);
		// $scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.postsCompleted = true;
	}).error(function(error) {
		$scope.category = [];
	});
	// COde for getting radio button value
	$scope.data = {
		clientSide : 'ng'
	};

}]);

//Store List
// my_address page of app //
app.controller('StoreListCtrl', ['$scope', '$state', 'SelectCode', 'SelectStore', '$localStorage', '$sessionStorage', '$ionicPopup', '$timeout', '$rootScope', '$stateParams',
function($scope, $state, SelectCode, SelectStore, $localStorage, $sessionStorage, $ionicPopup, $timeout, $rootScope, $stateParams) {
	$scope.formData = {};
	$scope.cover = 0;
	//This will hide the DIV by default.

	//console.log("i am in ");
	if (checkConnection()) {
		//     console.log("i am in ");
		var alertPopup = $ionicPopup.alert({
			title : 'Network issue',
			template : 'Oops something wrong!',
			okText : 'Refresh'
		});
		alertPopup.then(function(res) {
			$state.go($state.current, {}, {
				reload : true
			});
		});
	}
	if (!$localStorage.profile) {
		$state.go('app.login');
	}

	$scope.cover = 0;
	$scope.IsVisible = false;
	$scope.ShowHide = function() {
		//If DIV is visible it will be hidden and vice versa.
		$scope.IsVisible = $scope.IsVisible ? false : true;
		$scope.errormail = $scope.errormail ? false : true;

	};
	// Code for listing store name

	$scope.selectStore = [];
	// ajax call for select Store
	$scope.loadingdata = 1;
	SelectStore.Select_Store($localStorage.profile,$localStorage.version, $localStorage.update_time,$rootScope.deviceID).success(function(posts) {
		$scope.loadingdata = 0;
		$scope.selectStore = $scope.selectStore.concat(posts.data1.records1);
		$scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.postsCompleted = true;
		$localStorage.update_time = posts.update_time;
		if (posts.update_url != '') {
			var confirmPopup = $ionicPopup.confirm({
				title : 'App update',
				template : 'New update is available. Do you want to update it ?'
			});

			confirmPopup.then(function(res) {
				if (res) {
					window.open(posts.update_url, '_system');
				} else {

				}
			});
		}

	}).error(function(error) {
		$scope.selectStore = [];
	});
	// Code for redirect Page
	$scope.data = {
		clientSide : 'ng'
	};

	$scope.serverSideChange = function(item) {
		/********************* store change **********************/
		$rootScope.itemInCart = 0;
		$scope.cover = 1;
		SelectCode.StoreChange($localStorage.profile, item).success(function(posts) {
			if (posts.data1) {
				$localStorage.currentSelectedShop = posts.data1;
				$localStorage.currentSelectedShopName = posts.store_name;
				$localStorage.cart = 'current_' + posts.data1;
				$localStorage.currencyCode = posts.currencyID;
				$localStorage.ordering = posts.ordering;
				$localStorage.ispublic_profile = posts.ispublic_profile;
				$rootScope.ispublic_profile = $localStorage.ispublic_profile;
				$scope.mrp = $localStorage.mrp = posts.mrp;
				$scope.category_image = $localStorage.category_image = posts.category_image;
				$scope.cover = 0;
				$rootScope.itemInCart = 0;
				$state.go('app.category');
			} else {
				$scope.cover = 0;
				var alertPopup = $ionicPopup.alert({
					title : 'Inactive Shop Code!',
					template : 'Kindly wait for Store owner approval'
				});
				$state.go($state.current, {}, {
					reload : true
				});
			}
		}).error(function(error, status) {
			// $state.go('error_page');
			if (!error && status == 0) {
				$state.go($state.current, {}, {
					reload : true
				});
			} else if (status === 408) {
				var alertPopup = $ionicPopup.alert({
					title : 'Timeout issue',
					template : 'Oops something wrong!',
					okText : 'Refresh'
				});
				$state.go($state.current, {}, {
					reload : true
				});
			}
		});
		/********************* store change **********************/

	};
	// Code for check wherether shoplist Code is valid or not
	$scope.getAuthenticate = function() {
		$scope.errormsg = '';

		// ajax call for getting Store Code
		if (!$scope.formData.store_list) {
			$scope.errormsg = 'Field can not be blank.';
		} else {
			$scope.cover = 1;
			SelectCode.Select_Code($scope.formData.store_list, $localStorage.profile).success(function(posts) {
				$scope.errormsg = '';
				//  $state.reload();

				if (posts.data1 == 0) {
					$scope.cover = 0;
					$scope.errormsg = 'Invalid Store Code';
				} else {
					$scope.cover = 0;
					if (posts.msg == 2) {
						//$route.reload();
						$scope.formData.store_list = "";
						var alertPopup = $ionicPopup.alert({
							title : 'New store!',
							template : 'New store has been successfully added.'
						});
						$scope.IsVisible = false;
						$state.transitionTo($state.current, $stateParams, {
							reload : true,
							inherit : false,
							notify : true
						});
					} else {
						$scope.errormsg = posts.msg;
					}

				}

				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.postsCompleted = true;
			}).error(function(error) {
				//$state.go('error_page');
			});
		}
	};
}]);

app.controller('AppController', function($scope, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
});

app.controller("CartController", function($scope) {

	$scope.data = {
		items : []
	};

	for (var i = 0; i < 25; i++) {
		$scope.data.items.push({
			id : i,
			label : "Item " + i
		});
	}

});

app.directive("ionCart", function() {
	return {
		restrict : "E",
		templateUrl : "ionCart.html"
	};
});

app.directive("ionPurchase", function() {
	return {
		restrict : "E",
		template : "<h2>This is Ion Purchase</h2>"
	};
});

/************************side menu category end****************************/

//product_search controler

/************************ my_check start ***************************/

//my_check controler

app.controller('MyCheckCtrl', ['$scope',
function($scope) {
	$scope.postsCompleted = true;
}]);

/************************ my_check  end ***************************/

function stringIsNumber(s) {
	var x = +s;
	// made cast obvious for demonstration
	return x.toString() === s;
}

app.controller('MyCtl', function($scope) {
	//This will hide the DIV by default.
	$scope.IsVisible = false;
	$scope.isDisabled = false;
	$scope.ShowHide = function() {
		//If DIV is visible it will be hidden and vice versa.
		$scope.IsVisible = $scope.IsVisible ? false : true;
		//  $scope.isDisabled = true;
		$scope.hide();
	};
});

//wish list page of app
app.controller('WishListCtrl', ['$state', '$scope', '$localStorage', '$sessionStorage', 'myWishList', '$rootScope',
function($state, $scope, $localStorage, $sessionStorage, myWishList, $rootScope) {
	//add your wish list logic here
	if (checkConnection()) {
		$state.go('app.error_page');
	}
	$scope.wishList = $localStorage.wishList;
	var shopWiseItem = 'totalItemInCart_' + $localStorage.cart;
	if ($localStorage.shopWiseItem) {

		$rootScope.itemInCart = $localStorage.shopWiseItem;
	} else {

		$localStorage.shopWiseItem = 0;
		$rootScope.itemInCart = $localStorage.shopWiseItem;
	}
	$scope.product = [];
	$scope.backurl = $localStorage.preURL;
	$scope.latestproduct = $localStorage.latestProduct;
	myWishList.myWishListData($localStorage.profile, $localStorage.currentSelectedShop).success(function(posts) {
		//$scope.wishListItem=(posts.Str.records1);
		$scope.hasItem = posts.hasItem;
		$scope.product = $scope.product.concat(posts.data1.records1);
		$scope.subcategory = posts.data2;
		$scope.counter = (posts.data4.records1);
		//  $scope.colordata = (posts.data5.records1);

		$scope.mycounter = $scope.counter[0];
		$scope.currencyCode = (posts.currencyCode);
		$scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.postsCompleted = true;

	}).error(function(error) {
		// $state.go('error_page');
	});

	$scope.getProductId = function(productID) {
		$localStorage.productID = productID;
		$localStorage.productParentID = productID;
		// $localStorage.preURL=$rootScope.location .path();
		//$scope.backurl=$localStorage.preURL;

	};

}]);

app.controller('GalleryCtrl', ['$scope', 'Photos', '$ionicModal',
function($scope, Photos, $ionicModal) {

	$scope.items = [];
	$scope.times = 0;
	$scope.postsCompleted = false;
	// load more content function
	$scope.getPosts = function() {
		Photos.getPosts().success(function(posts) {
			$scope.items = $scope.items.concat(posts);
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.times = $scope.times + 1;
			if ($scope.times >= 4) {
				$scope.postsCompleted = true;
			}
		}).error(function(error) {
			$scope.items = [];
		});
	}
	// pull to refresh buttons
	$scope.doRefresh = function() {
		$scope.times = 0;
		$scope.items = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
	// modal to show image full screen
	$ionicModal.fromTemplateUrl('templates/image-modal.html', {
		scope : $scope,
		animation : 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function() {
		$scope.showNav = true;
		$scope.modal.show();
	};

	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	// show image in popup
	$scope.showImage = function(index) {
		$scope.imageIndex = index;
		$scope.imageSrc = $scope.items[index].image_full;
		$scope.openModal();
	}
	// image navigation // swiping and buttons will also work here
	$scope.imageNavigate = function(dir) {
		if (dir == 'right') {
			$scope.imageIndex = $scope.imageIndex + 1;
		} else {
			$scope.imageIndex = $scope.imageIndex - 1;
		}
		//alert(dir);
		if ($scope.items[$scope.imageIndex] === undefined) {
			$scope.closeModal();
		} else {
			$scope.imageSrc = $scope.items[$scope.imageIndex].image_full;
		}
	}
	// cleaning modal
	$scope.$on('$stateChangeStart', function() {
		$scope.modal.remove();
	});
}]);
app.controller('LogoutCtrl', ['$state', '$scope', '$localStorage', '$sessionStorage',
function($state, $scope, $localStorage, $sessionStorage) {
	//add your wish list logic here

	var version = $localStorage.version;
	var update_time = $localStorage.update_time;
	$rootscope.user_id = 0;
	$localStorage.$reset();
	$sessionStorage.$reset();
	$localStorage.version = version;
	$localStorage.update_time = update_time;
	localStorage.auth_token = "";

	$state.go('app.category');
}]);
