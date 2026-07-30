namespace webAPI.DTOs
{
    public class ProductCreateDto
    {
        public int Id { get; set; }
        public string Name { get; set; } 
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string? ImageUrl { get; set; }

    }
}