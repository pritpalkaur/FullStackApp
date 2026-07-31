using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webAPI.Business.Interfaces;
using webAPI.DTOs;
using static System.Net.Mime.MediaTypeNames;

namespace webAPI.Controllers
{
   // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;
        private readonly IWebHostEnvironment _env; 
        public ProductController(IWebHostEnvironment env, IProductService service)
        {
            _env = env;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {

            var product = await _service.GetByIdAsync(id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] ProductCreateDto dto, IFormFile image)
        {
            string imagePath = null;

            if (image != null && image.Length > 0)
            {
                var uploadPath = Path.Combine(_env.WebRootPath, "uploads");
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }
                // ✅ Construct full URL for frontend
                var fileName = Path.GetFileName(image.FileName);  
                var baseUrl = $"{Request.Scheme}://{Request.Host}";
                imagePath = $"{baseUrl}/uploads/{fileName}";

                dto.ImageUrl = imagePath;
            }
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] ProductUpdateDto dto, IFormFile? image)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = await _service.GetByIdAsync(id);
            if (product == null)
                return NotFound();

            string imagePath = null;
            if (image != null && image.Length > 0)
            {
                var uploadPath = Path.Combine(_env.WebRootPath, "uploads");
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }
                // ✅ Construct full URL for frontend
                var fileName = Path.GetFileName(image.FileName);
                var baseUrl = $"{Request.Scheme}://{Request.Host}";
                imagePath = $"{baseUrl}/uploads/{fileName}";

                dto.ImageUrl = imagePath;
            }
            dto.ImageUrl = imagePath;

            await _service.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}