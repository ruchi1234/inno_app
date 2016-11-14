//  Service for Set Global Value
app.factory('myService1', function() {
    var savedData = {}
    function set(data) {
        savedData = data;
    }

    function get() {
        return savedData;
    }

    return {
        set : set,
        get : get
    }

});

//  Service for Set Global Value
app.service('productService', function() {
    var productId = {}
    this.setProductId = function(data) {
        productId = data;
    }
    this.getProductId = function() {
        return productId;
    }
});
app.service( 'HardwareBackButtonManager',['$ionicPlatform',function($ionicPlatform){
  this.deregister = undefined;

  this.disable = function(){
    this.deregister = $ionicPlatform.registerBackButtonAction(function(e){
    e.preventDefault();
    return false;
    }, 101);
  }

  this.enable = function(){
    if( this.deregister !== undefined ){
      this.deregister();
      this.deregister = undefined;
    }
  }
  return this;
}])
