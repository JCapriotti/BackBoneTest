
namespace BackboneTest.Models
{
	public class PriceModel
	{
		public int ProductId { get; set; }
		public decimal? Cost { get; set; }
		public bool NeedsUpdatedPrice { get; set; }
	}
}