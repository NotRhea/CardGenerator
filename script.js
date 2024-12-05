window.addEventListener('load', () => {
    const transitionFrame = document.getElementById('transition-frame');
    setTimeout(() => {
        transitionFrame.classList.add('hidden'); // Add the class to fade it out
    }, 2000); // Wait for 2 seconds before fading out
});

// Select elements
const poster = document.getElementById('poster');
const posterText = document.getElementById('poster-text');
const posterTextDisplay = document.getElementById('poster-text-display');
const colorBoxes = document.querySelectorAll('.color-box');
const sweetSalty = document.getElementById('sweet-salty');
const spicyBland = document.getElementById('spicy-bland');
const bitterSourInput = document.getElementById("bitter-sour");
const borderColorBoxes = document.querySelectorAll('.border-color');
const posterInnerBorder = document.getElementById("poster-inner-border");
const sunMoonInput = document.getElementById("sun-moon");
const sunMoonDisplay = document.getElementById("sun-moon-display");
const saveCardBtn = document.getElementById('save-card');
const cardGallery = document.querySelector('.card-gallery');

// Typeface options for Sweet ↔ Salty
const typefaces = [
    'PPRightSerifMono', 
    'PPEditorialOld', 
    'PPRader', 
    'PPTalisman', 
    'Verdana, sans-serif'
];

// Update Background Color
colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const color = box.dataset.color;
        poster.style.backgroundColor = color;
    });
});

// Update Poster Text
posterText.addEventListener('input', () => {
    posterTextDisplay.textContent = posterText.value;
});

// Update Typeface
sweetSalty.addEventListener('input', (e) => {
    const index = parseInt(e.target.value, 10);
    posterTextDisplay.style.fontFamily = typefaces[index];
});

// Update Corner Shapes
spicyBland.addEventListener('input', (e) => {
    const level = parseInt(e.target.value, 10);
    const corners = document.querySelectorAll('.corner');

    corners.forEach(corner => {
        if (level === 0) {
            corner.style.borderRadius = '0';
        } else if (level === 1) {
            corner.style.borderRadius = '10px';
        } else if (level === 2){
            corner.style.borderRadius = '30px';
        } else if (level === 3){
            corner.style.borderRadius= '50px';
        } else if (level === 4){
            corner.style.borderRadius= '60px';
        } else {
            corner.style.borderRadius = '50%';
        }
    });
});

// Adjust border thickness based on range value
bitterSourInput.addEventListener("input", () => {
    const thickness = bitterSourInput.value; // Get value from range input
    posterInnerBorder.style.borderWidth = `${thickness}px`;
     // Update border width
});

// Add event listeners to change the border color
borderColorBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const color = box.dataset.color;
        posterInnerBorder.style.borderColor = color; // Update the border color
    });
});

// Update the shapes based on Sun ↔ Moon range value
sunMoonInput.addEventListener("input", () => {
    const value = parseInt(sunMoonInput.value, 10);
    sunMoonDisplay.innerHTML = ""; // Clear the current display

    if (value === 1) {
        // Level 1: One circle
        sunMoonDisplay.innerHTML = "●"; // Unicode for a filled circle
    } else if (value === 2) {
        // Level 2: Two triangles
        sunMoonDisplay.innerHTML = "▲ ▲"; // Unicode for filled triangles
    } else if (value === 3) {
        // Level 3: Three squares
        sunMoonDisplay.innerHTML = "■ ■ ■"; // Unicode for filled squares
    } else if (value === 4) {
        // Level 4: One hexagon
        sunMoonDisplay.innerHTML = "⬢"; // Unicode for a filled hexagon
    }
});

// Array to hold saved cards
let savedCards = [];

// Function to save a card
function saveCard() {
    if (savedCards.length >= 52) {
        alert("You can only save up to 52 cards.");
        return;
    }

    // Get current poster details
    const cardData = {
        text: posterTextDisplay.textContent,
        textStyle: posterTextDisplay.style.fontFamily,
        textSize: posterTextDisplay.style.fontSize,
        backgroundColor: poster.style.backgroundColor || "white",
        borderColor: getComputedStyle(posterInnerBorder).borderColor || "black",
        borderWidth: posterInnerBorder.style.borderWidth || "1px",
        cornerShape: document.querySelector('.corner')?.style.borderRadius || "0",
        shape: sunMoonDisplay.innerHTML || "",
    };
    
    // Save the card data to the array
    savedCards.push(cardData);
    
    // Update the gallery with the saved card
    const cardSlot = document.getElementById(`slot-${savedCards.length}`);
    if (cardSlot) {
        // Apply saved card properties to the slot
        cardSlot.style.fontFamily = cardData.textStyle;
        cardSlot.style.backgroundColor = cardData.backgroundColor;
        cardSlot.style.border = `${cardData.borderWidth} solid ${cardData.borderColor}`;
        cardSlot.style.borderRadius = cardData.cornerShape;
        cardSlot.style.display = "flex"; // Use Flexbox for layout
        cardSlot.style.flexDirection = "column"; // Stack items vertically
        cardSlot.style.justifyContent = "center"; // Center the shape
        cardSlot.style.alignItems = "center"; // Center align items horizontally
        cardSlot.style.position = "relative"; // Enable absolute positioning
    
        // Clear any existing content to avoid duplication
        cardSlot.innerHTML = "";
    
        // Add the shape in the middle
        const shapeElement = document.createElement("div");
        shapeElement.style.fontSize = "0.5rem"; // Adjust size for the shape
        shapeElement.style.flex = "1"; // Allow the shape to take up available space
        shapeElement.style.display = "flex"; // Center the shape vertically and horizontally
        shapeElement.style.justifyContent = "center";
        shapeElement.style.alignItems = "center";
        shapeElement.innerHTML = cardData.shape; // Add the saved shape
        cardSlot.appendChild(shapeElement);
    
        // Add the text at the bottom
        const textElement = document.createElement("div");
        textElement.textContent = cardData.text || "Card";
        textElement.style.fontSize = "0.8rem"; // Adjust font size for the text
        textElement.style.position = "absolute";
        textElement.style.bottom = "10px"; // Add spacing at the bottom
        textElement.style.width = "100%";
        textElement.style.textAlign = "center"; // Center the text horizontally
        cardSlot.appendChild(textElement);
    }
    
    
}

// Event listener for the save card button
saveCardBtn.removeEventListener("click", saveCard); // Avoid duplicate listeners
saveCardBtn.addEventListener("click", saveCard);
