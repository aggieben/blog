// Generated by CoffeeScript 1.7.1
var XMedium;

XMedium = (function() {
  function XMedium() {}

  XMedium.modifiers = {
    linkify: function(e) {
      var eventFilter, eventHandler, pop;
      eventFilter = function(e) {
        return ((e.key != null) && e.key === 'enter') || ((e.which != null) && e.which === 13);
      };
      eventHandler = function(e) {
        return document.execCommand('createLink', false, e.target.value);
      };
      return pop = new Popover({
        position: 'selection',
        content: "<input type=\"url\" size=\"35\" autofocus=\"true\" placeholder=\"paste or type a url\"/>",
        eventing: [
          {
            selector: 'input',
            event: 'keyup',
            filter: eventFilter,
            handler: eventHandler
          }
        ]
      });
    },
    codefmt: function(e) {
      var code, pre, range;
      range = window.getSelection().getRangeAt(0);
      pre = document.createElement('pre');
      code = document.createElement('code');
      range.surroundContents(code);
      return pre.appendChild(code.parentNode.replaceChild(pre, code));
    },
    gistins: function(e) {
      var eventFilter, eventHandler, pop;
      eventFilter = function(e) {
        return ((e.key != null) && e.key === 'enter') || ((e.which != null) && e.which === 13);
      };
      eventHandler = function(e) {
        return console.log('submit gist');
      };
      return pop = new Popover({
        postion: 'selection',
        content: "<input size=\"35\" autofocus=\"true\" placeholder=\"paste or type a gist id or url\"/>",
        eventing: [
          {
            selector: 'input',
            event: 'keyup',
            filter: eventFilter,
            handler: eventHandler
          }
        ]
      });
    }
  };

  return XMedium;

})();
