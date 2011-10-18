/**
* @class AlbumsController.js
* @description Traxplorer AlbumsController
* @namespace Traxplorer.controller.AlbumsController
* @author Vaibhav Ramdasi
*/

Ext.define('Traxplorer.controller.AlbumsController', {

    extend: 'Ext.app.Controller',
    stores: ['Albums'],
    models: ['Album'],
    views: ['album.List'],

    init: function () {
        this.control(
                {

                    'button[text=Add]':
                    {

                        //could have handled in # handler # of toolbar button
                        // but to keep view isolated from thick event handlers moved here

                        click: this.addRow
                    }

                });

    },

    addRow: function (e) {
        var store = this.getAlbumsStore();
        var isBlank = false;

        //Restrict empty album count to one. Should this validation be moved to Model.?

        store.each(function (record) {
            if (null == record.data['name'] && null == record.data['artist']) {

                Ext.Msg.show(
                                {
                                    title: 'Warning',
                                    msg: 'Please update the blank album first.',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
                 if (null == record.index)
                 record.index = 0;
                isBlank = true
                //there could be a clean approach to achieve this..?
                var grid = Ext.ComponentQuery.query('albumlist')[0];
                grid.plugins[0].startEdit(record.index, 1);
                return false; //break the loop
            }

        });
        if (!isBlank) {

            //[....could have restricted to create empty record in database with this.getAlbumsStore().autoSync=false]
            //Create empty album in database. Populate it's id when created.
            this.getAlbumsStore().insert(0, this.getAlbumModel().create());

        }
    }
});