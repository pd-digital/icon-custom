$(document).ready(function() {
  var $elem,
      $elemParent,
      $header,
      elemHeight,
      elemOffsetTop,
      offsetTop,
      elemWidth,
      parentHeight,
      parentOffset;

  function init(options) {
    if (!validate()) return false;

    $elem = $(options.elemSelector);
    $elemParent = $(options.elemParentSelector);
    offsetTop = options.offsetTop;
    elemOffsetTop = $elem.offset().top;

    calculations();
    addResizeHandler();
    addScrollHandler();
  }

  function validate() {
    return ( $(window).width() > 768 );
  }

  function calculations() {
    elemHeight = $elem.height();
    elemWidth = $elem.width();
    parentHeight = $elemParent.height();
    parentOffset = $elemParent.offset().top;
  }

  function addResizeHandler() {
    // https://github.com/shichuan/javascript-patterns/blob/master/jquery-patterns/window-scroll-event.html
    // Pretty flakey, seems to need a super low threshold to work
    var resizeTimeout;
    $(window).resize(function () {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
        resizeTimeout = null;
      }
      resizeTimeout = setTimeout(onResize, 250);
    });
  }

  function addScrollHandler() {
    // https://github.com/shichuan/javascript-patterns/blob/master/jquery-patterns/window-scroll-event.html
    // Pretty flakey, seems to need a super low threshold to work
    var scrollTimeout;
    $(window).scroll(function () {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
        scrollTimeout = null;
      }
      scrollTimeout = setTimeout(onScroll, 15);
    });
  }

  function onResize() {
    calculations();
    elemWidth = $elem.parent().width();
    onScroll();
  }

  function onScroll() {
    if ( inStickZone() ) { onStick(); }
    else if ( afterStickZone() ) { afterStick(); }
    else { offStick(); }
  }

  function onStick() {
    $elem.addClass('fixed-top');
    $elem.removeClass('fixed-bottom');
    $elem.css({
      width: elemWidth,
      top: offsetTop
    });
  }

  function afterStick() {
    var absOffsetTop = parentHeight - $elem.height()
    $elem.removeClass('fixed-top');
    $elem.addClass('fixed-bottom');
    $elem.css({
      top: absOffsetTop
    });
  }

  function offStick() {
    $elem.removeClass('fixed-top');
    $elem.removeClass('fixed-bottom');
    $elem.removeAttr('style');
  }

  function inStickZone() {
    return (startStickTrigger() && !stopStickTrigger())
  }

  function afterStickZone() {
    return (startStickTrigger() && stopStickTrigger())
  }

  function startStickTrigger() {
    var scrollPlusOffset = $(window).scrollTop() + offsetTop;
    return ( scrollPlusOffset >= elemOffsetTop );
  }

  function stopStickTrigger() {
    var scrollBottomElemOffset= $(window).scrollTop() + elemHeight + offsetTop;
    var bottomParentOffset = parentHeight + parentOffset;
    return ( scrollBottomElemOffset >= bottomParentOffset );
  }

  if ($('#product-description').length) {
    init({
      elemSelector: '#product-description',
      elemParentSelector: '.product-section',
      offsetTop: $('header').height() + 20
    });
  }
});
