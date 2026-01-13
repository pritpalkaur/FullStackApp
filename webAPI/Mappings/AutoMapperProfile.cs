using AutoMapper;
using webAPI.Data.Entities;
using webAPI.DTOs;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace webAPI.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<ProductCreateDto, Product>();
            CreateMap<ProductUpdateDto, Product>();
        }
    }
}