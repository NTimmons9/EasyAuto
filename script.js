document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".input-label");
    const dimensionsContainer = document.querySelector(".dimensions-container");
    const dimensionsLabel = document.querySelector(".input-label");

    let isClicked = false; // Initialize a variable to track the click state

    toggleButton.addEventListener("click", function () {
        // Toggle the background color and dimensions container visibility
        if (isClicked) {
            dimensionsLabel.style.background = '';
            dimensionsContainer.style.display = 'none';
        } else {
            dimensionsLabel.style.background = 'rgba(6, 64, 90, 0.562)';
            dimensionsContainer.style.display = 'block';
        }
        
        // Toggle the click state
        isClicked = !isClicked;
    });

    toggleButton.addEventListener("mouseover", function () {
        dimensionsLabel.style.background = 'rgba(6, 64, 90, 0.562)';
    });

    toggleButton.addEventListener("mouseout", function () {
        // Only reset the background color if it's not in the clicked state
        if (!isClicked) {
            dimensionsLabel.style.background = '';
        }
    });
});
