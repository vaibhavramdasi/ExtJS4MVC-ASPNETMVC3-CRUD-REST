/**
* @class Albums.js
* @description Traxplorer Albums Store
* @namespace Traxplorer.store.Albums
* @author Vaibhav Ramdasi
*/


Ext.define('Traxplorer.store.Albums', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoSync: true,
    model: 'Traxplorer.model.Album'
});