﻿using System.Web.Mvc;
using BlogOne.Common.Data;
using BlogOne.Shortner.Model;
using Dapper;
using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace BlogOne.Shortner.Data
{
    public class ShortUrlRepository : Repository<ShortUrl>, IShortUrlRepository
    {
        public ShortUrlRepository(IDbConnectionFactory factory) : base(factory) { }

        protected override void AddImpl(ShortUrl item)
        {
            using (var db = Connection)
            {
                db.Insert(item);
            }
        }

        protected override void RemoveImpl(ShortUrl item)
        {
            const string sql = @"
delete 
  from ShortUrls
 where item.Id = {=Id}
";

            using (var db = Connection)
            {
                if (item.Id.HasValue)
                {
                    db.Delete(item);
                }
                else
                {
                    if (0 <= db.Execute(sql, new {item.Id}))
                    {
                        throw new DataException("Failed to remove entity");
                    }
                }
            }
        }

        protected override void UpdateImpl(ShortUrl item)
        {
            const string sql = @"
  select *
    from ShortUrls
   where Id = {=Id}
";

            using (var db = Connection)
            {
                if (item.Id.HasValue)
                {
                    if (!db.Update(item))
                    {
                        throw new DataException("Failed to update entity");
                    }
                }
                else
                {
                    var entity = db.Query<ShortUrl>(sql, new {item.Id }).FirstOrDefault();
                    if (entity != null)
                    {
                        entity.Enabled = item.Enabled;
                        entity.ShortCode = item.ShortCode;
                        entity.Url = item.Url;
                        this.Update(entity);
                    }
                }
            }
        }

        protected override ShortUrl FindBySidImpl(Guid id)
        {
            const string sql = @"
  select *
    from ShortUrls
   where Sid = {=Sid}
";
            using (var db = Connection)
            {
                return db.Query<ShortUrl>(sql, new {Sid = id}).FirstOrDefault();
            }
        }

        protected override ShortUrl FindByIdImpl(int id)
        {
            using (var db = Connection)
            {
                return db.Get<ShortUrl>(id);
            }
        }

        protected override IEnumerable<ShortUrl> FindAllImpl(int page, int pageSize)
        {
            const string sql = @"
  select *
    from ShortUrls
order by CreationDate desc
offset {=skip} rows fetch next {=size} rows only
";
            using (var db = Connection)
            {
                return db.Query<ShortUrl>(sql, new {skip = page*pageSize, size = pageSize});
            }
        }

        public ShortUrl FindByShortCode(string shortCode)
        {
            const string sql = @"
  select * 
    from ShortUrls
   where ShortCode = {=shortCode}
";

            using (var db = Connection)
            {
                return db.Query<ShortUrl>(sql, new {shortCode}).FirstOrDefault();
            }
        }
    }
}