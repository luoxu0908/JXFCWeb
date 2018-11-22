import $ from 'jquery';
 import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';
import 'tablesaw/dist/tablesaw.jquery';
import libs from './lib/dependancies';
 window.libs = libs;

$(document).foundation();

libs.AOS.init();

$(function() {
   $(document).foundation().trigger('enhance.tablesaw');
 
});


