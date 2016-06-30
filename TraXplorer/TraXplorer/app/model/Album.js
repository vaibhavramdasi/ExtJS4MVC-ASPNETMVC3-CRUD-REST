/**
* @class Albums.js
* @description Traxplorer Album Model
* @namespace Traxplorer.model.Album
* @author Vaibhav Ramdasi
*/


Ext.define('Traxplorer.model.Album', {

    extend: 'Ext.data.Model',

    fields: [

                {
                    name: 'id',
                    dataType: 'int',
                    optional: true
                },
                {
                    name: 'name',
                    dataType: 'string',
                    optional: true
                },
                {
                    name: 'artist',
                    dataType: 'string'
                }
            ],
    
    idProperty: 'id',
    
    proxy: {
    
        type: 'rest',
        url: '/Albums',
        timeout: 120000,
        noCache: false,
        
        reader:
        {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        
        writer:
        {
            type: 'json',
            writeAllFields: true
        },

        afterRequest: function (request, success) 
        {
            
            if (request.action == 'read') {
                this.readCallback(request);
            }
            
            else if (request.action == 'create') {
                this.createCallback(request);
            }
            
            else if (request.action == 'update') {
                this.updateCallback(request);
            }
            
            else if (request.action == 'destroy') {
                this.deleteCallback(request);
            }
        },

        //After Albums fetched

        readCallback: function (request) 
        {
            if (!request.operation.success) 
            {
                Ext.Msg.show(
                                {
                                    title: 'Warning',
                                    msg: 'Could not load Albums. Please try again.',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
            }
        },
        
        
        //After A record/Album created
        
        createCallback: function (request) 
        {

            if (!request.operation.success) 
            {
                Ext.Msg.show(
                                {
                                    title: 'Warning',
                                    msg: 'Could not add Album. Please try again.',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
                Ext.data.StoreManager.lookup('Albums').removeAt(0);
            }
            var grid = Ext.ComponentQuery.query('albumlist')[0];
            grid.plugins[0].startEdit(0, 1);
        },

        //After Album updated

        updateCallback: function (request) 
        {
            if (!request.operation.success) 
            {
                Ext.Msg.show(
                                {
                                    title: 'Warning',
                                    msg: 'Could not update Album. Please try again.',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
            }
        },

        //After a record deleted

        deleteCallback: function (request) 
        {
            if (!request.operation.success) 
            {
                Ext.Msg.show(
                                {
                                    title: 'Warning',
                                    msg: 'Could not delete Album. Please try again.',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
                                //If request fails re-insert record.
                Ext.data.StoreManager.lookup('Albums').insert(0, request.operation.records[0]);
            }
        }
    }
});