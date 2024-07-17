using apiGestores.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiGestores.Context
{
    public class AppDbContext : DbContext
    {
        //representacion de la tabla
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Gestores_Bd> gestores_Bd { get; set; }
    }
}
