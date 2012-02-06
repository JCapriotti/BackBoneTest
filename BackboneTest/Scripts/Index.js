/// <reference path="~/Scripts/underscore.js" />
/// <reference path="~/Scripts/backbone.js" />
/// <reference path="~/Scripts/knockout-2.0.0.js" />
/// <reference path="~/Scripts/knockout.mapping-latest.js" />


$(function () {


	var product = Backbone.Model.extend({
		idAttribute: 'ProductId'		
	});

	var productPrice = Backbone.Model.extend({
	});

	// Represents a product list
	var productList = Backbone.Collection.extend({
		url: function () {
			return '/Home/Products';
		},

		model: product
	});

	// Represents a list of product-price data
	var productPriceList = Backbone.Collection.extend({
		url: function () {
			return '/Home/Prices';
		}
	});


	// Main model for page
	var appModel = Backbone.Model.extend({
		defaults: {
			page: undefined,
			products: new productList(),
			prices: new productPriceList()
		},
		 
		initialize: function () {
			this.bind('change:page', this.pageChange);
			this.get('products').bind('reset', this.productListChange, this);
			this.get('prices').bind('reset', this.priceChange, this);
		},

		// Handle when the product list changes; need to request updated pricing
		productListChange: function () {
			var products = this.get('products').toJSON();
			var ids = _.chain(products)
				.filter(function (value) {
					return value.NeedsUpdatedPrice;
				})
				.pluck('ProductId')
				.value();
			this.get('prices').fetch({ data: $.param({ productIds: ids }, true) });
		},
		
		pageChange: function () {
			var newPage = this.get('page');
			viewModel.page(newPage);
			this.get('products').fetch({ data: { page: newPage }, processData: true });
		},

		priceChange: function () {
			var model = this;
			model.get('prices').each(function (price) {
				var affectedProduct = model.get('products').get(price.get('ProductId'));
				affectedProduct.set(price);
			});
		}
	});


	var productView = Backbone.View.extend({
		initialize: function () {
			this.model.get('products').bind('reset', this.render, this);
			this.model.get('products').bind('change', this.render, this);
		},

		render: function () {
			var newModel = this.model.get('products').toJSON();
			viewModel.products(ko.mapping.fromJS(newModel));
			return this;
		}
	});


	var theModel;
	theModel = new appModel();

	var viewModel = {
		page: ko.observable(theModel.get('page')),
		products: ko.observableArray()
	};
	ko.applyBindings(viewModel);

	var routes = Backbone.Router.extend({
		routes: {
			"index/:page": "index",
			":page": "index",
			"": "index"
		},

		index: function (page) {
			if (!page) page = 1;
			theModel.set({ page: parseInt(page) });
		}
	});


	var router = new routes();
	Backbone.history.start();


	var view = new productView({ model: theModel });
	view.render();


});