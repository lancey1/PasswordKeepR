$(document).ready(function () {
  /* Get the text field */
  $(".copybutton").mousedown(function () {
    let copyText = $(this).val();
    console.log(copyText);
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText);
    // /* Alert the copied text */
    console.log("Copied the text: " + copyText);
    alert("Copied the text: " + copyText);
  });

  $(".username-pswd-info-password").mouseover(function () {
    $(this)
      .closest('form')
      .find('.username-pswd-info-password')
      .attr('type', 'text');
  });

  $(".username-pswd-info-password").mouseout(function () {
    $(this)
      .closest('form')
      .find('.username-pswd-info-password')
      .attr('type', 'password');
  });
});
