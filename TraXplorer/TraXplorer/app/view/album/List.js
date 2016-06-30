/**
* @class List.js
* @description Traxplorer Grid Panel
* @namespace Traxplorer.view.album.List
* @author Vaibhav Ramdasi
*/
Ext.define('Traxplorer.view.album.List', {
    
    extend: 'Ext.grid.Panel',
    alias: 'widget.albumlist',
    store: 'Albums',
    
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    text: 'Add',
                    iconCls: 'icon-add'

                }]
        }],
    
    forceFit: true,
    columnLines: true,
    autoResizeColumns: true,
    selType: 'rowmodel',
    
    plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    errorSummary: false

                })],
    
    initComponent: function () {
    
        this.id = "list";
    
        this.columns = [
                {
                    header: 'Album ID',
                    dataIndex: 'id',
                    sortable: false,
                    menuDisabled: true

                }, {
                    header: 'Title',
                    dataIndex: 'name',
                    editable: true,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: true
                    },

                    sortable: false,
                    menuDisabled: true

                }, {
                    header: 'Artist',
                    dataIndex: 'artist',
                    editable: true,
                    sortable: false,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: true
                    },

                    menuDisabled: true

                }, {
                    xtype: 'actioncolumn',
                    width: 16,
                    align: 'center',
                    items: [
                        {
                            icon: 'http://cdn.sencha.io/ext-4.0.2a/examples/restful/images/delete.png',
                            tooltip: 'Delete',
                            handler: function (grid, rowIndex, colIndex) {
                                grid.getStore().removeAt(rowIndex);

                            } 
                        }]
                }

                ];

        this.callParent(arguments);
    }


});