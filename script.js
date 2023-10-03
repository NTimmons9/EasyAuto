document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".input-label");
    const dimensionsContainer = document.querySelector(".dimensions-container");
    const dimensionsLabel = document.querySelector(".input-label");

    // Additions for the button and menu
    const menuButton = document.getElementById("menu-button");
    const menuContainer = document.getElementById("menu-container");
    const editModeItem = document.getElementById("edit-mode");
    const exitEditModeItem = document.getElementById("exit-edit-mode");
    const field = document.querySelector(".field");

    //for save button
    const saveButton = document.querySelector(".save");
    const robot = document.querySelector(".robot");

    let isClicked = false; // Initialize a variable to track the click state
    let isEditMode = false;
    let circleCounter = 1;

    // Add event listener for the toggleButton click event
    toggleButton.addEventListener("click", function () {
        // Toggle the background color and dimensions container visibility
        if (isClicked) {
            dimensionsLabel.style.background = "";
            dimensionsContainer.style.display = "none";
        } else {
            dimensionsLabel.style.background = "rgb(6, 64, 90)";
            dimensionsContainer.style.display = "block";
        }

        // Toggle the click state
        isClicked = !isClicked;
    });

    // Additions for the button and menu
    menuButton.addEventListener("click", function () {
        // Toggle menu visibility
        menuContainer.style.display = menuContainer.style.display === "block" ? "none" : "block";
    });

    editModeItem.addEventListener("click", function () {
        // Enter edit mode
        isEditMode = true;
        field.style.cursor = "crosshair";
    });

    exitEditModeItem.addEventListener("click", function () {
        // Exit edit mode
        isEditMode = false;
        field.style.cursor = "auto";
    });

    field.addEventListener("mousedown", function (e) {
        if (isEditMode && e.button === 0) {
            // Left click in edit mode - Add a numbered circle
            const circle = document.createElement("div");
            circle.className = "numbered-circle";
            circle.textContent = circleCounter;
            circle.style.left = e.clientX - field.getBoundingClientRect().left + "px";
            circle.style.top = e.clientY - field.getBoundingClientRect().top + "px";
            field.appendChild(circle);
            circleCounter++;
        } else if (isEditMode && e.button === 2) {
            // Right click in edit mode - Remove circles
            const circles = field.querySelectorAll(".numbered-circle");
            circles.forEach((circle) => {
                if (isInsideCircle(circle, e.clientX, e.clientY)) {
                    circle.remove();
                }
            });
        }
    });

    // Function to check if a point (x, y) is inside a circle
    function isInsideCircle(circle, x, y) {
        const circleX = circle.offsetLeft + circle.offsetWidth / 2;
        const circleY = circle.offsetTop + circle.offsetHeight / 2;
        const distance = Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2));
        return distance <= circle.offsetWidth / 2;
    };

    // Mouseover and mouseout events for the toggleButton
    toggleButton.addEventListener("mouseover", function () {
        if(!isClicked){
            dimensionsLabel.style.background = 'rgb(20, 94, 120)';
        }
    });

    toggleButton.addEventListener("mouseout", function () {
        // Only reset the background color if it's not in the clicked state
        if (!isClicked) {
            dimensionsLabel.style.background = '';
        } else {
            dimensionsLabel.style.background = "rgb(6, 64, 90)";
        }
    });

    saveButton.addEventListener("mouseover", function() {
        field.style.cursor = "pointer";
    });

    saveButton.addEventListener("mousedown", function() {
        saveButton.style.background = "radial-gradient(rgb(175,175,175),rgb(200,200,200))"
        document.getElementById("outputText").innerHTML = 
        "Robot Width: " + document.getElementById("robotWidth").value + "in" + "<br />" 
        + "Robot Length: " + document.getElementById("robotLength").value + "in";
        robot.style.width = ((document.getElementById("robotWidth").value)/144) * 100 + "%";
        robot.style.height = ((document.getElementById("robotLength").value)/144) * 100 + "%";
        robot.style.marginLeft = (50 - (((document.getElementById("robotWidth").value/144)*100)/2)) + "%";
        robot.style.marginTop = (50 - (((document.getElementById("robotLength").value/144)*100)/2)) + "%";
    });
    
    saveButton.addEventListener("mouseup", function(){
        saveButton.style.background = ''
    });

});
