using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace apiGestores.Models
{
    public class Gestores_Bd
    {
        [Key]
        public int id { get; set; }
        public string nombre { get; set; }
        public int lanzamiento { get; set; }
        public string desarrollador { get; set; }


    }
}
