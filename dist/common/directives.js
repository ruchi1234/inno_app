app.directive("menuCloseKeepHistory",["$ionicHistory",function(n){return{restrict:"AC",link:function(t,i){i.bind("click",function(){var t=i.inheritedData("$ionSideMenusController");t&&(n.nextViewOptions({historyRoot:!1,disableAnimate:!0,expire:300}),t.close())})}}}]),app.directive("dir",function(n,t){return{restrict:"E",link:function(i,e,o){i.$watch(o.content,function(){e.html(t(o.content)(i)),n(e.contents())(i)},!0)}}});