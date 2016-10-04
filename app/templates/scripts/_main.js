<% if (includejQuery1 || includejQuery2) { %>import {} from './external/jquery';<% } -%>
<% if (includeBootstrap) { %>
// Import only bootstrap packages you need
// import {} from 'bootstrap-sass/assets/javascripts/bootstrap/affix';
// import {} from 'bootstrap-sass/assets/javascripts/bootstrap/alert';
// import {} from 'bootstrap-sass/assets/javascripts/bootstrap/button';
// import {} from 'bootstrap-sass/assets/javascripts/bootstrap/carousel';
// import {} from 'bootstrap-sass/assets/javascripts/bootstrap/collapse';
// import {} from 'bootstrap-sass/assets/javascripts/bootstrap/dropdown';
// import {} from 'bootstrap-sass/assets/javascripts/bootstrap/modal';
// import {} from 'bootstrap-sass/assets/javascripts/bootstrap/scrollspy';
// import {} from 'bootstrap-sass/assets/javascripts/bootstrap/tooltip';
// import {} from 'bootstrap-sass/assets/javascripts/bootstrap/tab';
// import {} from 'bootstrap-sass/assets/javascripts/bootstrap/transition';
// import {} from 'bootstrap-sass/assets/javascripts/bootstrap/popover';
// Or import everything
import {} from 'bootstrap-sass'; // eslint-disable-line import/imports-first
<% } -%>
<% if (includeFoundation) { %>
import {} from 'foundation-sites'; // eslint-disable-line import/imports-first
<% } -%>
import { sayHello } from './modules/utils';

<% if (includeFoundation) { -%>
$(document).foundation();
<% } -%>

sayHello();
