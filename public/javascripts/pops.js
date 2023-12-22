function showConfirm(message) {
    return new Promise((resolve) => {
        // Create the overlay element
        var overlay = document.createElement("div");
        overlay.className = "confirmOverlay animate__animated animate__bounce";

        // Create the message element
        var messageElement = document.createElement("p");
        messageElement.className = "confirmMessage";
        var messageContent = document.createTextNode(message);
        messageElement.appendChild(messageContent);

        // Create the options element
        var optionsElement = document.createElement("div");
        optionsElement.className = "options mt-1";

        // Create the cancel button
        var cancelButton = document.createElement("a");
        cancelButton.onclick = function () {
            // Handle cancel action here
            document.body.removeChild(overlay);
            resolve(false);
        };
        cancelButton.className = "confirmBtn";
        cancelButton.textContent = "cancel";

        // Create the OK button
        var okButton = document.createElement("a");
        okButton.onclick = function () {
            // Handle OK action here
            document.body.removeChild(overlay);
            resolve(true);
        };
        okButton.className = "confirmBtn";
        okButton.textContent = "ok";

        // Append elements to the overlay
        overlay.appendChild(messageElement);
        optionsElement.appendChild(cancelButton);
        optionsElement.appendChild(okButton);
        overlay.appendChild(optionsElement);

        // Append the overlay to the body
        document.body.appendChild(overlay);
    });
}

function showPopup(message) {
    // Create the popup element
    var popup = document.createElement("div");
    popup.className = "popup-message animate__animated animate__tada";
    var popupContent = document.createTextNode(message);
    popup.appendChild(popupContent);

    // Append the popup to the body
    document.body.appendChild(popup);

    // Display the popup
    popup.style.display = "block";

    // Add a click event listener to the document
    document.addEventListener("click", function (event) {
        // Check if the clicked element is not inside the popup
        if (!popup.contains(event.target)) {
            // Close the popup
            closePopup();
        }
    });

    // Function to close the popup
    function closePopup() {
        popup.style.display = "none";
        // Remove the popup from the DOM after hiding
        document.body.removeChild(popup);

        // Remove the click event listener after closing the popup
        document.removeEventListener("click", clickOutsideHandler);
    }
}

function showMessage(message) {
    // Create the popup element
    var popup = document.createElement("div");
    popup.className = "popup-message-true animate__animated animate__tada";
    var popupContent = document.createTextNode(message);
    popup.appendChild(popupContent);

    // Append the popup to the body
    document.body.appendChild(popup);

    // Display the popup
    popup.style.display = "block";

    // Add a click event listener to the document
    document.addEventListener("click", function (event) {
        // Check if the clicked element is not inside the popup
        if (!popup.contains(event.target)) {
            // Close the popup
            closePopup();
        }
    });

    // Function to close the popup
    function closePopup() {
        popup.style.display = "none";
        // Remove the popup from the DOM after hiding
        document.body.removeChild(popup);
        location.reload()
        // Remove the click event listener after closing the popup
        document.removeEventListener("click", clickOutsideHandler);
    }
}

