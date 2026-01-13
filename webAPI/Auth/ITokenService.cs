using webAPI.Data.Entities;

namespace webAPI.Auth
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}

