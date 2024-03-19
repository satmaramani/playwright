document.addEventListener("DOMContentLoaded", function () {
  // Create a new paragraph element with the message
  var footer = document.createElement("p");
  footer.innerHTML =
    'Created by <i><b><h3>Sampurna Atmaramani</h3></b></i>. <a href="/">Go to Home Page</a>';

  // Append the paragraph to the body
  document.body.appendChild(footer);
});
