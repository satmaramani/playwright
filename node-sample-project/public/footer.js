document.addEventListener("DOMContentLoaded", function () {
  // Create a new header element
  var header = document.createElement("header");

  // Add styles to the header element
  header.style.backgroundColor = "#f0f0f0"; // Background color of the header
  header.style.padding = "20px"; // Padding around the header content

  // Create a div to contain the header content
  var headerContent = document.createElement("div");
  headerContent.classList.add("header-content");
  header.appendChild(headerContent);

  // Create an image element for your photo
  var img = document.createElement("img");
  img.src = "/images/sam-professional.jpeg"; // Set the source of your photo
  img.alt = "Sampurna Atmaramani"; // Set the alt attribute for accessibility
  img.style.width = "150px"; // Set the width of the photo
  img.style.height = "150px"; // Set the height of the photo
  img.style.borderRadius = "50%"; // Make the photo round
  img.style.marginRight = "10px"; // Add some margin to the right of the photo
  headerContent.appendChild(img);

  // Create a div to contain the message
  var messageDiv = document.createElement("div");
  headerContent.appendChild(messageDiv);

  // Create a paragraph element with the message
  var message = document.createElement("p");
  message.innerHTML =
    'Created by <strong>Sampurna Atmaramani</strong>. <a href="/">Go to Home Page</a>';
  messageDiv.appendChild(message);

  // Append the header to the body
  document.body.insertBefore(header, document.body.firstChild);
});
