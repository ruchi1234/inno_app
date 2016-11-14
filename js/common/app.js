var webServicesurl = "http://innorade.in/web/";
app.constant("Config", {
	"Registration"    		: webServicesurl + "web_services_upgrade/ws_registration",
	"Login"            		: webServicesurl + "web_services_upgrade/ws_login",
	"Category"         		: webServicesurl + "web_services_upgrade/ws_category",
	"LoadCategory"     		: webServicesurl + "web_services_upgrade/load_more_categoty",
	"ChangeStatus"     		: webServicesurl + "web_services_upgrade/ws_changeStatus",
	"ProductList"      		: webServicesurl + "web_services_upgrade/ws_procuctList",
	"LatestProduct"         : webServicesurl + "web_services_upgrade/ws_latestProduct",
	"MoreProductList"       : webServicesurl + "web_services_upgrade/ws_loadMoreProduct",
	"LatestMoreProductList" : webServicesurl + "web_services_upgrade/ws_latestloadMoreProduct",
	"Selectstore" 			: webServicesurl + "web_services_upgrade/ws_selectStore",
	"Selectcode" 			: webServicesurl + "web_services_upgrade/ws_selectcode",
	"StoreChange"			: webServicesurl + "web_services_upgrade/ws_storeChange",
	"ProductFeature" 		: webServicesurl + "web_services_upgrade/ws_productFeature",
	"ReProduct" 			: webServicesurl + "web_services_upgrade/ws_reproduct",
	"Product" 				: webServicesurl + "web_services_upgrade/ws_product",
	"Profile" 				: webServicesurl + "web_services_upgrade/ws_profile",
	"placeOrder" 			: webServicesurl + "web_services_upgrade/ws_placeOrder",
	"Search" 				: webServicesurl + "webservices_new_upgrade/ws_search",
	"LoadSearch" 			: webServicesurl + "webservices_new_upgrade/ws_loadSearch",
	"MyOrder" 				: webServicesurl + "web_services_upgrade/ws_myOrder",
	"LoadMyOrder" 			: webServicesurl + "web_services_upgrade/ws_loadMyOrder",
	"OrderWise" 			: webServicesurl + "web_services_upgrade/ws_orderWise",
	"LoadOrderWise" 		: webServicesurl + "web_services_upgrade/ws_loadOrderWise",
	"ProductPrice" 			: webServicesurl + "web_services_upgrade/ws_productPrice",
	"OrderWiseProduct" 		: webServicesurl + "web_services_upgrade/ws_orderWiseProduct",
	"MyFavourite" 			: webServicesurl + "webservices_new_upgrade/ws_myFavourite",
	"MyDyFavourite" 		: webServicesurl + "webservices_new_upgrade/ws_myDyFavourite",
	"MywishList" 			: webServicesurl + "webservices_new_upgrade/ws_mywishList",
	"LoadMywishList" 		: webServicesurl + "webservices_new_upgrade/ws_loadMywishList",
	"UpdateProfile" 		: webServicesurl + "web_services_upgrade/ws_updateProfile",
	"Complain" 				: webServicesurl + "web_services_upgrade/ws_complain",
	"ComplainStatusDetail"  : webServicesurl + "web_services_upgrade/ws_complain_status_detail",
	"ComplainStatus" 		: webServicesurl + "web_services_upgrade/ws_complain_status",
	"ComplainStatusReply"	: webServicesurl + "web_services_upgrade/ws_complain_status_reply",
	"Product-Image" 		: webServicesurl + "web_services_upgrade/ws_Product_Image",
	"Forgot" 				: webServicesurl + "web_services_upgrade/ws_Forgot",
	"cPassword" 			: webServicesurl + "web_services_upgrade/ws_changePassword",
	"TotalItme" 			: webServicesurl + "webservices_new_upgrade/ws_totalItme",
	"Notify" 				: webServicesurl + "webservices_new_upgrade/ws_notify",
	
});
// config contact
app.constant("ConfigContact", {
	"EmailId" : "weblogtemplatesnet@gmail.com",
	"ContactSubject" : "Contact"
});
// config admon
app.constant("ConfigAdmob", {
	"interstitial" : "ca-app-pub-3940256099942544/1033173712",
	"banner" : "ca-app-pub-3940256099942544/6300978111"
});
// push notification
app.constant("PushNoti", {
	"senderID" : "375657893164",
});
