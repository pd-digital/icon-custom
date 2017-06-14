$(document).ready(function() {
  function init(options) {
    if (!validate()) return false;

    $(document).on('click', '[data-accordian-toggle]', function(e) {
      run($(this), $(this).next('[data-accordian-content]'));
    })
  }

  function validate() {
    return $('[data-accordian-toggle]').length;
  }

  function run($question, $answer) {
    flipTheChevron($question);
    showTheContent($answer)
  }

  function flipTheChevron($question) {
    $question.find('.chevron').toggleClass('active');
  }

  function showTheContent($answer) {
    $answer.slideToggle(200);
  }

  init();
});
