// $Id$

/**
 * @author Henri MEDOT <henri.medot[AT]absyx[DOT]fr>
 * http://www.absyx.fr
 *
 * Released under the GNU GENERAL PUBLIC LICENSE Version 2
 */

(function($){

  var barWidth, getBarWidth = function() {
    var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"></div>').appendTo('body');
    var innerDiv = $('<div style="height:100px;"></div>').appendTo(div);
    var w1 = innerDiv.innerWidth();
    div.css('overflow-y', 'scroll');
    var w2 = innerDiv.innerWidth();
    div.remove();
    return Math.max(w1 - w2, 17);
  };

  var getState = function(obj) {
    var data = obj.data('scrollbarPaper');
    var height = obj.height();
    return {
      height: height,
      ratio: height / (data.clearer.position().top - data.content.position().top),
      offset: obj.offset()
    };
  };



  var methods = {

    _init: function() {
      barWidth = barWidth || getBarWidth();

      return this.each(function() {
        var $this = $(this);
        var data = $this.data('scrollbarPaper');

        if (!data) {

          // Initialize the scrollbarPaper.
          $this.css({'overflow-x': 'hidden', 'overflow-y': 'auto'});
          var paper = $('<div class="scrollbarpaper-container"></div>').css('width', barWidth).insertBefore($this).hide();
          var track = $('<div class="scrollbarpaper-track"></div>').appendTo(paper);
          var drag  = $('<div class="scrollbarpaper-drag"></div>').appendTo(track);
          $this.data('scrollbarPaper', {
            paper: paper,
            track: track,
            drag: drag,
            dragTop: $('<div class="scrollbarpaper-drag-top"></div>').appendTo(drag),
            dragBottom: $('<div class="scrollbarpaper-drag-bottom"></div>').appendTo(drag),
            content: $this.children().eq(0).css('overflow', 'hidden'),
            clearer: $('<div style="clear:both;"></div>').appendTo($this),
            offsetHeight: track.outerHeight() - track.height()
          });

          var state = getState($this);
          var setTimeout = function() {
            window.setTimeout(function() {
              var newState = getState($this);
              if ((newState.height != state.height)
               || (newState.ratio  != state.ratio)
               || (newState.offset.left != state.offset.left)
               || (newState.offset.top  != state.offset.top)) {
                $this.scrollbarPaper('update');
                state = newState;
              }
              setTimeout();
            }, 200);
          };
          setTimeout();

        }
        $this.scrollbarPaper('update');
      });
    },

    update: function() {
      return this.each(function() {
        var $this = $(this);
        var data = $this.data('scrollbarPaper');

        // Update the scrollbarPaper.
        $this.unbind('.scrollbarPaper');
        if (getState($this).ratio < 1) {

          data.paper.show();
          data.content.addClass('scrollbarpaper-visible').width($this.width() - data.content.innerWidth() + data.content.width() - barWidth);
          var trackHeight = $this.height() - data.offsetHeight;
          data.track.height(trackHeight);

          var offsetParent = data.paper.offsetParent();
          var parentOffset = (offsetParent.not('html, body').length > 0) ? offsetParent.offset() : {left: 0, top: 0};
          var state = getState($this);
          data.paper.css({
            'left': -parentOffset.left + state.offset.left + $this.innerWidth() - data.paper.width(),
            'top':  -parentOffset.top + state.offset.top
          });

          var dragHeight = Math.max(Math.round(trackHeight * state.ratio), data.dragTop.height() + data.dragBottom.height());
          data.drag.height(dragHeight);

          var updateDragTop = function() {
            data.drag.css('top', Math.min(Math.round($this.scrollTop() * state.ratio), trackHeight - dragHeight));
          };
          updateDragTop();
          $this.bind('scroll.scrollbarPaper', updateDragTop);

          var unbindMousemove = function() {
            $('html').unbind('mousemove.scrollbarPaper');
          };
          data.drag.bind('mousedown.scrollbarPaper', function(e) {
            unbindMousemove();
            var offsetTop = e.pageY - data.drag.offset().top;
            $('html').bind('mousemove.scrollbarPaper', function(e) {
              $this.scrollTop((e.pageY - $this.offset().top - offsetTop) / state.ratio);
              return false;
            }).bind('mouseup.scrollbarPaper', unbindMousemove);
            return false;
          });
        }
        else {
          data.paper.hide();
          data.content.removeClass('scrollbarpaper-visible').width($this.width() - data.content.innerWidth() + data.content.width());
        }

      });
    }
  };



  $.fn.scrollbarPaper = function(method) {

    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else if (typeof method === 'object' || !method) {
      return methods._init.apply(this, arguments);
    }
    else {
      throw 'Method ' +  method + ' does not exist on jQuery.scrollbarPaper.';
    }

  };
})(jQuery);
