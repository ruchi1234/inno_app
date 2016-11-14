//product_search controler
app.controller("ContactUsCtrl", ['$state', '$scope', '$localStorage', 'searchItem', '$sessionStorage', '$ionicPopup', 'saveContactDetail',function($state, $scope, $localStorage, searchItem, $sessionStorage, $ionicPopup, saveContactDetail) {
	if (!$localStorage.profile) {
		$state.go('app.login');
	}
	$scope.formData = {};
	$scope.disable_button = '';
	$scope.contact = function() {
		var flag = 1;
		if (!$scope.formData.issue) {
			flag = 0;
			$scope.errissue = "Fields are required";
		} else {
			$scope.errissue = "";
		}
		if (!$scope.formData.subject) {
			flag = 0;
			$scope.errsubject = "Fields are required";
		} else {
			$scope.errsubject = "";
		}		if (!$scope.formData.message) {			flag = 0;
			$scope.errmessage = "Fields are required";		} else {			$scope.errmessage = "";
		}
		if (flag == 1) {
			$scope.disable_button = 2;
			console.log($localStorage);
			saveContactDetail.sendIssue($scope.formData.issue, $scope.formData.subject, $scope.formData.message, $localStorage.currentSelectedShop, $localStorage.profile).success(function(posts) {
				$scope.disable_button = '';
				var alertPopup = $ionicPopup.alert({
					title : 'Status',
					template : 'Your Complain hass been submited successfully'
				});
				$scope.formData.issue = "";
				$scope.formData.subject = "";
				$scope.formData.message = "";
			}).error(function(error) {
				alert("error detail" + error);
			});
		}
	}
}]);
//contact us and Issu status controller
app.controller("IssueStatusCtrl", ['$state', '$scope', '$localStorage', 'searchItem', '$sessionStorage', 'getMessageReply',function($state, $scope, $localStorage, searchItem, $sessionStorage, getMessageReply) {
	if (!$localStorage.profile) {
		$state.go('app.login');
	}
	$scope.formData = {};
	$scope.msgDetail = [];
	$localStorage.currentSelectedShop, $localStorage.profile
	$scope.loadingdata = 1;
	$scope.getComplainDetail = function(subject) {
		$sessionStorage.subject_id = subject;
		$state.go('app.issue_status_detail');
	}
	getMessageReply.getMessage($localStorage.currentSelectedShop, $localStorage.profile).success(function(posts) {		$scope.loadingdata = 2;
		$scope.msgDetail = $scope.msgDetail.concat(posts.data1);
		//console.log($scope.msgDetail);
	}).error(function(error) {
		alert("error detail" + error);
	});
}]);
// Issue status detail controller
app.controller("IssueStatusDetailCtrl", ['$state', '$scope', '$localStorage', 'searchItem', '$sessionStorage', 'getMessageDetail',function($state, $scope, $localStorage, searchItem, $sessionStorage, getMessageDetail) {
	if (!$localStorage.profile) {
		$state.go('app.login');
	}
	$scope.formData = {};
	$scope.msgDetail = [];
	$scope.post = function() {
		if ($scope.formData.message) {
			getMessageDetail.reply($scope.formData.message, $sessionStorage.subject_id, $localStorage.currentSelectedShop, $localStorage.profile).success(function(posts) {
				$scope.msgDetail = $scope.msgDetail.concat(posts.data1);
				$scope.formData.message = '';
			}).error(function(error) {
				alert("error detail" + error);
			});
		}
	}
	console.log($sessionStorage.subject_id);
	$localStorage.currentSelectedShop, $localStorage.profile
	$scope.loadingdata = 1;
	getMessageDetail.getMessage($sessionStorage.subject_id).success(function(posts) {		
		$scope.loadingdata = 2;
		$scope.msgDetail = posts.data1;
		$scope.subjects = posts.subject;
		$scope.admin_name=posts.admin_name;
		$scope.user_name=posts.user_name;
		console.log($scope.msgDetail);
	}).error(function(error) {
		alert("error detail" + error);
	});
}]);
