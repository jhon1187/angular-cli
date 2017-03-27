import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare var $: any;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

$.i18n.properties({
  name: 'messages',
  path: 'assets/bundles/',
  mode: 'both',
  language: 'pt_BR'
});

var prop = $.i18n.prop;

$.i18n.prop = function () {
  var value;
  
  try {
    value = prop.apply($.i18n, arguments);
  } catch (ex) {
    return arguments[0];
  }

  if (/\[.*\]/.test(value)) {
    value = value.substring(1, value.length - 1);
  }

  return value;
};
