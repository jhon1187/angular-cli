'use strict';

$.i18n.properties({
    name: 'messages',
    path: 'assets/bundles/',
    mode: 'map',
    cache: true,
    language: 'pt_BR'
});

var prop = $.i18n.prop;

$.i18n.prop = function () {
    var value = prop.apply($.i18n, arguments);
    if (/\[.*\]/.test(value)) {
        value = value.substring(1, value.length - 1);
    }
    return value;
};

var i18n = $.i18n.prop;