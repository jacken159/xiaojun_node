
function input_func() {
  $('body').on('change', 'input', function () {
    $(this).addClass('input_edited');
  });
}
