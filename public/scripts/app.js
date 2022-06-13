$(document).ready(function () {
  $(".copybutton").mousedown(function () {
    let copyText = $(this).val();
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText);
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

  $(".list_webURL_password").mouseover(function () {
    $(this)
      .attr("type", "text");
  });

  $(".list_webURL_password").mouseout(function () {
    $(this)
      .attr("type", "password");
  });

  const checkUserPasswordChoice = function () {
    if ($("#create-password").prop("checked") === true) {
      $("#disabledsubmit").prop("disabled", true);
      $("#disabledsubmit").css("z-index", "-10");
      $("#password-requirements").slideDown();
      $("#requirements").slideDown();
      $("#input-sec-user-password").slideUp();
    }

    if ($("#create-password").prop("checked") === false) {
      $("#disabledsubmit").prop("disabled", false);
      $("#disabledsubmit").css("z-index", "10");
      $("#password-requirements").slideUp();
      $("#requirements").slideUp();
      $("#input-sec-user-password").slideDown();
    }
  }

  const checkForm = function () {
    if ($("#create-password").prop("checked") === false) {
      if ($("#user_email").val().includes('@')) {
        $("#disabledsubmit").prop("disabled", false);
        $("#disabledsubmit").css("z-index", "10");
        return;
      }
    }
    $("#lowercase").val($("#lowercase").is(":checked") ? 1 : 0);
    $("#uppercase").val($("#uppercase").is(":checked") ? 1 : 0);
    $("#number").val($("#number").is(":checked") ? 1 : 0);
    $("#specialchar").val($("#specialchar").is(":checked") ? 1 : 0);
    const $lowercase = Number($("#lowercase").val());
    const $uppercase = Number($("#uppercase").val());
    const $numbers = Number($("#number").val());
    const $special = Number($("#specialchar").val());

    if ($("#passwordlength").val() <= 6 || $("#passwordlength").val() >= 48 || $("#passwordlength").val().length === 0) {
      $("#disabledsubmit").prop("disabled", true);
      $("#disabledsubmit").css("z-index", "-10");
    }
    if ($("#website_url").val().length === 0) {
      $("#disabledsubmit").prop("disabled", true);
      $("#disabledsubmit").css("z-index", "-10");
    }
    if (!$("#user_email").val().includes('@')) {
      $("#disabledsubmit").prop("disabled", true);
      $("#disabledsubmit").css("z-index", "-10");
    }
    if ($lowercase === 0 && $uppercase === 0 && $numbers === 0 && $special === 0) {
      $("#disabledsubmit").prop("disabled", true);
      $("#disabledsubmit").css("z-index", "-10");
    }
    if (
      (
        $("#passwordlength").val() >= 6 &&
        $("#passwordlength").val() <= 48 &&
        $("#website_url").val().length > 0 &&
        $("#user_email").val().includes('@')
      ) &&
      ($lowercase > 0 || $uppercase > 0 || $numbers > 0 || $special > 0)
    ) {
      $("#disabledsubmit").prop("disabled", false);
      $("#disabledsubmit").css("z-index", "10");
    }

  };

  $("#create-password").change(checkUserPasswordChoice);
  $(".form-check-input").click(checkForm);
  $(".responsive-input").keyup(checkForm);

});