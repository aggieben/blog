﻿// Generated by CoffeeScript 1.6.3
var XMedium;

XMedium = (function() {
  function XMedium() {}

  XMedium.modifiers = {
    linkify: function(e) {
      var pop;
      return pop = new Popover({
        position: 'selection',
        content: '<input type="url" size="35" autofocus="true"/>'
      });
    }
  };

  return XMedium;

})();