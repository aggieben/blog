﻿using System.Linq;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using BlogOne.Shortner.App_Start;
using StackExchange.Profiling;
using StackExchange.Profiling.Mvc;

namespace BlogOne.Shortner
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            ContainerConfig.RegisterContainer();

            var engines = ViewEngines.Engines.ToList();
            ViewEngines.Engines.Clear();
            foreach (var ve in engines)
            {
                ViewEngines.Engines.Add(new ProfilingViewEngine(ve));
            }
        }

        protected void Application_BeginRequest()
        {
            MiniProfiler.Start();
        }

        protected void Application_EndRequest()
        {
            MiniProfiler.Stop();
        }
    }
}
