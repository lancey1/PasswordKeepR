$(document).ready(function () {
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
      .closest("form")
      .find(".username-pswd-info-password")
      .attr("type", "text");
  });

  $(".username-pswd-info-password").mouseout(function () {
    $(this)
      .closest("form")
      .find(".username-pswd-info-password")
      .attr("type", "password");
  });
});

$(document).ready(function () {
  $("#disabledsubmit").prop("disabled", true);

  $("#urlsubmissionform").change(function () {
    const $email = ($("#user_email").val());
    const $url = ($("#website_url").val());
    const $password = ($("#passwordlength").val());
    $("#lowercase").val($("#lowercase").is(":checked") ? 1 : 0);
    $("#uppercase").val($("#uppercase").is(":checked") ? 1 : 0);
    $("#number").val($("#number").is(":checked") ? 1 : 0);
    $("#specialchar").val($("#specialchar").is(":checked") ? 1 : 0);
    const $lowercase = Number($("#lowercase").val());
    const $uppercase = Number($("#uppercase").val());
    const $numbers = Number($("#number").val());
    const $special = Number($("#specialchar").val());

    if ($("#passwordlength").val() <= 6 && $("#passwordlength").val() >= 48 && $("#passwordlength").length === 0) {
      $("#disabledsubmit").prop("disabled", true);
    }
    if ($("#website_url").val().length === 0) {
      $("#disabledsubmit").prop("disabled", true);
    }
    if ($("#user_email").val().length === 0) {
      $("#disabledsubmit").prop("disabled", true);
    }
    if ($lowercase === 0 && $uppercase === 0 && $numbers === 0 && $special === 0) {
      $("#disabledsubmit").prop("disabled", true);
      }
    if (
    (
    $("#passwordlength").val() >= 6 &&
    $("#passwordlength").val() <= 48 &&
    $("#website_url").val().length > 0 &&
    $("#user_email").val().length > 0
    ) &&
    ($lowercase > 0 || $uppercase > 0 || $numbers > 0 || $special > 0)
    )
    {
      $("#disabledsubmit").prop("disabled", false);
    }
  });
});
