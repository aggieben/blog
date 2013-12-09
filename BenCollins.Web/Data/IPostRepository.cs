﻿using BenCollins.Web.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenCollins.Web.Data
{
    public interface IPostRepository : IRepository<Post>
    {
        Post FindBySlug(string slug);
    }
}