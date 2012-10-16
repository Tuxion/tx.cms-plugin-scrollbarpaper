tx.cms-plugin-scrollbarpaper
============================

Plugin for creating custom scrollbars. Exact copy of [scrollbarpaper on Google Code](http://code.google.com/p/scrollbarpaper/). The original project description is below.


Overview
--------
Scrollbar Paper does not replace browser's default scrollbar. Instead, it covers it with a custom scrollbar, like paper on a wall: that is why it is called Scrollbar Paper :-) The benefit of this approach is that the way browser's default scrollbar behaves is not modified: mouse wheel support, text selection and scrolling performance are the same as usual.

Besides, Scrollbar Paper's HTML does not wrap itself around its content, and thus, does not eventually break it: for instance, when jScrollPane might reset/break Flash/SWF movies, Scrollbar Paper will not.

Finally, Scrollbar Paper is refreshed regularly, thus keeping adapted to its content.

Showcase
--------
See Scrollbar Paper in action [here](http://www.lelieududesign.com/en/why-le-lieu-du-design)

Limitations
-----------
Scrollbar Paper has been tested successfully on IE7/8, Firefox 3.5 and Safari 3/4. Due to a current bug of Safari 4 reporting wrong outerWidth, margin CSS property should not be set on scrolled content.

Todo
----
Scrollbar Paper will stay beta until these things are done: - there are still trivial cases where scrollbar's position is not correct: fix them! - handle mouse wheel events on scrollbar itself - handle clicks on scrollbar's track - add arrows on scrollbar

Contact
-------
This module is sponsored by [Absyx](http://www.absyx.fr/)