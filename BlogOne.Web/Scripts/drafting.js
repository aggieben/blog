// Generated by CoffeeScript 1.6.3
(function($) {
  var draftOnEvent, last, save;
  save = function() {
    var content, pid;
    content = {
      __RequestVerificationToken: $('article.content input[name="__RequestVerificationToken"]').val(),
      title: $('article.content .title :not(.Medium-placeholder)').html(),
      subtitle: $('article.content .subtitle :not(.Medium-placeholder)').html(),
      body: $('article.content section.editable:not(.Medium-placeholder)').html()
    };
    pid = parseInt($('article.content').data('post-id'), 10);
    if (!isNaN(pid)) {
      content.postId = pid;
    }
    return $.ajax('/post/draft', {
      type: 'POST',
      data: content,
      error: function(jqxhr, status, error) {
        console.log(error);
        console.log(status);
        return console.log(jqxhr);
      },
      success: function(data, status, jqxhr) {
        if (isNaN(pid)) {
          return window.location.pathname = "/post/" + data + "/edit";
        }
      }
    });
  };
  last = -1;
  draftOnEvent = function(selector, event, options) {
    var condition, delay, _ref;
    delay = (_ref = options != null ? options.delay : void 0) != null ? _ref : 750;
    condition = options != null ? options.condition : void 0;
    return $(selector).on(event, function(e) {
      if ((condition == null) || condition() === true) {
        clearTimeout(last);
        return last = setTimeout((function() {
          return save();
        }), delay);
      }
    });
  };
  draftOnEvent('article.content section.editable', 'input');
  draftOnEvent('article.content .title.editable', 'blur', {
    condition: function() {
      return $('article.content .title .Medium-placeholder').length === 0;
    }
  });
  draftOnEvent('article.content .subtitle.editable', 'blur', {
    condition: function() {
      return $('article.content .subtitle .Medium-placeholder').length === 0;
    }
  });
  return $('article.content .title').on('blur', function(e) {
    console.log("title blur: " + this);
    if ($('article.content .title :not(.Medium-placeholder)').length === 0) {
      clearTimeout(last);
      return last = setTimeout((function() {
        return save();
      }), 750);
    }
  });
})(jQuery);
