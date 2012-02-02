using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web.Mvc;
using BackboneTest.Models;

namespace BackboneTest.Controllers
{
	public partial class HomeController : Controller
	{
		//
		// GET: /Home/

		public virtual ActionResult Index()
		{
			var model = new ProductListModel
			{
				Products = new List<ProductModel>
				{
					new ProductModel {ProductId = 1, Cost = 12, Name = "Banana", NeedsUpdatedPrice = true, Updated = DateTime.Now},
					new ProductModel {ProductId = 2, Cost = null, Name = "Apple", NeedsUpdatedPrice = true, Updated = DateTime.Now},
					new ProductModel {ProductId = 3, Cost = 23, Name = "Orange", NeedsUpdatedPrice = false, Updated = DateTime.Now},
				}
			};
			return View(MVC.Home.Views.Index, model);
		}

		public virtual ActionResult Products(int page)
		{
			var model = new ProductListModel
			{
				Products = new List<ProductModel>
				{
					new ProductModel {ProductId = 10 * page + 1, Cost = 1 + 100 * page, Name = "Banana Page" + page.ToString(CultureInfo.CurrentCulture), NeedsUpdatedPrice = true, Updated = DateTime.Now},
					new ProductModel {ProductId = 10 * page + 2, Cost = null, Name = "Apple Page" + page.ToString(CultureInfo.CurrentCulture), NeedsUpdatedPrice = true, Updated = DateTime.Now},
					new ProductModel {ProductId = 10 * page + 3, Cost = 9 + 10 * page, Name = "Orange Page" + page.ToString(CultureInfo.CurrentCulture), NeedsUpdatedPrice = false, Updated = DateTime.Now},
				}
			};
			return Json(model.Products, JsonRequestBehavior.AllowGet);
		}

		public virtual ActionResult Prices(int[] productIds)
		{
			Thread.Sleep(3000);
			return 
				Json(productIds.Select(x => new PriceModel {ProductId = x, Cost = 99000 + x, NeedsUpdatedPrice = false}),
				JsonRequestBehavior.AllowGet);
		}

	}
}
