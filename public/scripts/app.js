function copyButton() {
  /* Get the text field */
  let copyText = document.getElementById("username-pswd-info-password");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
  }

  function showPassword() {
  let x = document.getElementById("username-pswd-info-password");
  if (x.type === "password") {
  x.type = "text";
  } else {
  x.type = "password";
  }
}
