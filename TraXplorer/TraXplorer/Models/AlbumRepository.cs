using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TraXplorer.Models
{
    public class AlbumRepository
    {
        private AlbumDataContext db = new AlbumDataContext();
        //
        // Select All
        public IQueryable<Album> FindAllAlbums()
        {
            return db.Albums;
        }

        //Select Single
        public Album GetAlbum(int id)
        {
            return db.Albums.SingleOrDefault(d => d.id == id);
        }
        //
        // Create
        public void Create(Album album)
        {
            db.Albums.InsertOnSubmit(album);
        }

        //Delete
        public void Delete(Album album)
        {
            db.Albums.DeleteOnSubmit(album);
        }
        //
        // Persistence
        public void Save()
        {
            db.SubmitChanges();
        }
    }
}