import React from "react";

function esewaCall(formData) {
  console.log(formData);
  const esewaUrl = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
  const form = document.createElement("form");
  form.setAttribute("action", esewaUrl);
  form.setAttribute("method", "POST");

  for (let key in formData) {
    const hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", key);
    hiddenInput.setAttribute("value", formData[key]);
    form.appendChild(hiddenInput);
  }
  document.body.appendChild(form);
  form.submit();
}

export default esewaCall;
