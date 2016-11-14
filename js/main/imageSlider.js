app.controller('SliderController', function($scope) {
  $scope.images = [{
    src: 'http://dezireit.com/ecommerceapp/hmvc/admin/assets/categorywiseImages/Ruchi23/14616662873023_.jpeg',
    title: 'Pic 1'
  }, {
    src: 'http://dezireit.com/ecommerceapp/hmvc/admin/assets/categorywiseImages/Ruchi23/proImage239/146173839710product_img.jpeg',
    title: 'Pic 2'
  }, {
    src: 'http://dezireit.com/ecommerceapp/hmvc/admin/assets/categorywiseImages/Ruchi23/14616662873023_.jpeg',
    title: 'Pic 3'
  }];
  
});
/*
app.directive('slider', function($timeout) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      images: '='
    },
    link: function(scope, elem, attrs) {
        
        scope.currentIndex = 0; // Initially the index is at the first image
        
        scope.next = function() {
            console.log('next click');
          scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
            console.log(scope.currentIndex);
        };
        
        scope.prev = function() {
             console.log('prev click');
          scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
            console.log(scope.currentIndex);
        };
        
        scope.$watch('currentIndex', function() {
             scope.images.forEach(function(image) {
             image.visible = false; // make every image invisible
        });

        scope.images[scope.currentIndex].visible = true; // make the current image visible
        
        var timer;
        var sliderFunc = function() {
          timer = $timeout(function() {
            scope.next();
            timer = $timeout(sliderFunc, 10000);
          }, 10000);
        };
        
        sliderFunc();
        
        scope.$on('$destroy', function() {
          $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
        });
});
        
    },
    templateUrl: 'templates/templateurl.html'
  };
});
*/