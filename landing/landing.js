// Custom dropdown functionality
const customSelect = document.querySelector('.custom-select');
const selected = customSelect.querySelector('.select-selected');
const itemsContainer = customSelect.querySelector('.select-items');
const items = itemsContainer.querySelectorAll('div');

let currentValue = '10'; // Default value

// Toggle dropdown on click
selected.addEventListener('click', (e) => {
    e.stopPropagation();
    itemsContainer.classList.toggle('select-hide');
});

// Handle option selection
items.forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Update selected text
        selected.textContent = item.textContent;
        
        // Update current value
        currentValue = item.getAttribute('data-value');
        
        // Store in sessionStorage
        sessionStorage.setItem("roundCount", currentValue);
        console.log('Round count set to:', currentValue);
        
        // Update visual state
        items.forEach(i => i.classList.remove('same-as-selected'));
        item.classList.add('same-as-selected');
        
        // Close dropdown
        itemsContainer.classList.add('select-hide');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    itemsContainer.classList.add('select-hide');
});

// Initialize with default value
sessionStorage.setItem("roundCount", currentValue);

let startGameButton = document.querySelector("#startGame");
let howToPlayButton = document.querySelector("#howToPlay");

startGameButton.addEventListener("click", function () {
    // Any additional logic before navigating
});
