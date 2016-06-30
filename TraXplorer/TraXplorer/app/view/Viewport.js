/**
* @class Viewport.js
* @description Traxplorer Viewport
* @namespace Traxplorer.view.Viewport
* @author Vaibhav Ramdasi
*/

Ext.define('Traxplorer.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    items:
        [
            {
                region: 'center',
                flex: 1,
                title: 'My Music Hub -TraXPLORER',
                xtype: 'albumlist',
                flex: 1,
                minHeight: 100
            }
        ]
});