using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TraXplorer.Controllers
{
    public class HomeController : Controller
    {
        //Returns default view that sets up ExtJS 4 MVC app
        public ActionResult Index()
        {
            return View();
        }

        
    }
}
