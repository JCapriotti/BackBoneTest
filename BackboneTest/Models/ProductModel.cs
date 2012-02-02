
using System;

namespace BackboneTest.Models
{
	public class ProductModel
	{
		public int ProductId { get; set; }
		public string Name { get; set; }
		public decimal? Cost { get; set; }
		public bool NeedsUpdatedPrice { get; set; }
		public DateTime Updated { get; set; }
	}
}