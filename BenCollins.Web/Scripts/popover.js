﻿// Generated by CoffeeScript 1.6.3
var Popover;

Popover = (function() {
  Popover._current = null;

  function Popover(opts) {
    var coords, div, _ref;
    div = document.createElement('div');
    div.setAttribute('class', 'bo-popover');
    div.innerHTML = (_ref = opts.content) != null ? _ref : '';
    document.body.appendChild(div);
    switch (opts.position) {
      case 'selection':
        coords = this._getSelectionCoords();
        div.style.left = "" + coords.x + "px";
        div.style.top = "" + coords.y + "px";
        div.style.marginTop = "-" + (Math.floor(10 + div.clientHeight)) + "px";
        div.style.marginLeft = "-" + (Math.floor(div.clientWidth / 2)) + "px";
    }
    $(div).on('click keyup', function(e) {
      if (e.keyCode !== 27) {
        return false;
      }
    });
    this.div = div;
    if (Popover._current == null) {
      Popover._current = this;
      $(document).on('click keyup', function(e) {
        var _ref1;
        console.log(e);
        if ((_ref1 = Popover._current) != null) {
          _ref1.remove();
        }
        return Popover._current = null;
      });
    }
  }

  Popover.prototype.remove = function() {
    return this.div.parentNode.removeChild(this.div);
  };

  Popover.prototype.contains = function(node) {
    return this.div.contains(node);
  };

  Popover.prototype._getSelectionElement = function() {
    var sel;
    sel = document.selection;
    if (!sel) {
      sel = window.getSelection();
    }
    return sel.anchorNode.parentElement;
  };

  Popover.prototype._getCoordsRelativeToElement = function(element, coords) {};

  Popover.prototype._getSelectionCoords = function () {
        var sel = document.selection, range;
        var x = 0, y = 0;
        if (sel) {
            if (sel.type != "Control") {
                range = sel.createRange();
                var rect = range.getClientRects()[0];
                console.log("rect: ")
                console.log(rect)
                /*range.collapse(true);*/

                x = range.boundingLeft + (rect.width / 2);
                y = range.boundingTop;
            }
        } else if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0).cloneRange();
                if (range.getClientRects) {
                    var rect = range.getClientRects()[0];
                    console.log("rect: ")
                    console.log(rect)
                    /*range.collapse(true);*/

                    x = rect.left + (rect.width / 2);
                    y = rect.top;
                }
            }
        }
        return { x: x, y: y };
    };

  return Popover;

})();
