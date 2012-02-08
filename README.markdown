## Overview
Simple Backbone proof-of-concept...


### Functionality

* Displays a list of catalog products
* Loads pricing after the products are initialized
* Supports catalog page navigation without full page refreshes


### Technology

* Backbone is used to provide structure to the JavaScript client code, handle hash fragment routing, 
and provide model-loading automation.
* Knockout is used to bind view-model objects to the UI and for template-like rendering

### Meat & Potatoes
**[Index.js](BackBoneTest/blob/master/BackBoneTest/Scripts/Index.js)**
<br />Core file containing 100% of the client-side demo code.

* Location: */BackBoneTest/Scripts/Index.js*
* Defines models...
	* Product information (product, productList)
	* Price updates for a product (productPrice, productPriceList). 
	* Application model / page viewmodel - Manages the page's data and their events
* Manages the view...
	* Sets up view-related events (binds them to the models)
	* Calls Knockout which handles binding the model to the view


**[Index.cshtml](BackBoneTest/blob/master/BackBoneTest/Views/Home/Index.cshtml)**

* Location: */BackBoneTest/Views/Home/Index.cshtml*
* View... uses Knockout for applying the data in the model


**[HomeController.cs](BackBoneTest/blob/master/BackBoneTest/Controllers/HomeController.cs)**

* Location: */BackBoneTest/Controllers/HomeController.cs*
* Controller; pretty boring but shows the data that is produced


