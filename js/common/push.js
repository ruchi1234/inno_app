window.onNotificationGCM = function(e) {
    switch (e.event) {
      case 'registered':
        if (e.regid.length > 0) {
            //alert("regID = " + e.regid);
            var elem = angular.element(document.querySelector('[ng-app]'));
            var injector = elem.injector();
            var myService = injector.get('myService');
            myService.registerID(e.regid, 'android');
            elem.scope().$apply();
        }
        break;
      case 'message':
		    if(navigator.notification)
        {
          navigator.notification.alert(e.payload.title);
        }
        else
        {
          alert(e.message);
        }
        break;

      case 'error':
          
        break;

      default:
          console.log('UNKNOWN EVENT');
        break;
    }
}