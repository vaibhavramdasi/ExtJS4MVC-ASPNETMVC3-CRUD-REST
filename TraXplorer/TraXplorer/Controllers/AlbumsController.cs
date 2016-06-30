using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TraXplorer.Models;
namespace TraXplorer.Controllers
{

    //Provides REST API implementaion for Traxplorer ExtJS client.

    public class AlbumsController : Controller
    {
        AlbumRepository repoAlbum = new AlbumRepository();
        //
        // GET: /Albums/
        [HttpGet]
        [ActionName("Index")]
        public JsonResult Index(int? id)
        {

            try
            {
                if (null != id)
                {
                    Album album = repoAlbum.GetAlbum((int)id);
                    return this.Json(new { success = true, data = album }, JsonRequestBehavior.AllowGet);
                }
                var list = repoAlbum.FindAllAlbums().ToList();
                return this.Json(new { data = list }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return this.Json(new { success = false, data = "" }, JsonRequestBehavior.AllowGet);
            }


        }

        //PUT /Albums/Index/id
        [HttpPut]
        [ActionName("Index")]
        public JsonResult Update(int id, Album album)
        {

            try
            {
                Album dbAlbum = repoAlbum.GetAlbum(id);
                dbAlbum.name = album.name;
                dbAlbum.artist = album.artist;
                repoAlbum.Save();
                return this.Json(new { success = true, data = album }, JsonRequestBehavior.DenyGet);
            }
            catch
            {
                return this.Json(new { success = false, data = "" }, JsonRequestBehavior.DenyGet);
            }

        }


        //POST /Albums/Index/album
        [HttpPost]
        [ActionName("Index")]
        public JsonResult Create(Album album)
        {
            Response.BufferOutput = true;
            try
            {
                repoAlbum.Create(album);
                repoAlbum.Save();
                //Created
                Response.StatusCode = 201;
                //Set Location header to absolute path of entity.
                Response.AddHeader("LOCATION", Request.Url.AbsoluteUri + "/" + album.id);
                return this.Json(new { success = true, data = album }, JsonRequestBehavior.DenyGet);

            }
            catch
            {
                return this.Json(new { success = false }, JsonRequestBehavior.DenyGet);

            }

        }


        //DELETE /Albums/Index/id
        [HttpDelete]
        [ActionName("Index")]
        public JsonResult Delete(int id)
        {

            try
            {

                Album album = repoAlbum.GetAlbum(id);
                repoAlbum.Delete(album);
                repoAlbum.Save();
                //200 OK...could be 204 No Content if no status describing entity in response.
                //Response.StatusCode = 204;
                return this.Json(new { success = true });
            }
            catch
            {
                return this.Json(new { success = false });
            }

        }
    }
}
