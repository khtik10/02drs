// Select all images and set a limit of 2 highlights
const images = document.querySelectorAll('.flex-image');
let highlightedCount = 0;

// Select the warning message and error message elements
const warningMsg = document.getElementById('warning-msg');
const errorMsg = document.getElementById('error-msg');
const generateBtn = document.getElementById('generate-btn');
const usernameInput = document.getElementById('username');
const mainContent = document.getElementById('main-content');
const itemWarningMsg = document.getElementById('item-warning-msg');

function scrollToError(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Function to handle image clicks
images.forEach((image) => {
    image.addEventListener('click', () => {
        // If the image is already highlighted, remove the highlight
        if (image.classList.contains('active')) {
            image.classList.remove('active');
            highlightedCount--;
        } else {
            // Only allow highlighting if less than 2 images are already highlighted
            if (highlightedCount < 2) {
                image.classList.add('active');
                highlightedCount++;
            } else {
                // Show warning message if trying to select more than 2 items
                warningMsg.classList.remove('hidden');
                scrollToError(warningMsg);
                setTimeout(() => {
                    warningMsg.classList.add('hidden');
                }, 3000); // Hide the warning message after 2 seconds
            }
        }
    });
});



// BALLOON BACKGROUND ---------------------------------------------------------------------------------------------------------
// Function to create and animate balloons


// Generate multiple balloons at random intervals
function generateBalloons() {
    const colors = ['pink', 'white'];
    
    // Immediately generate the first balloon
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    createBalloon(randomColor);

    // Continue generating balloons every 3 seconds
    setInterval(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        createBalloon(randomColor);
    }, 3000); // Reduced balloon generation rate (one every 3 seconds)
}

// Start generating balloons when the page loads
window.onload = generateBalloons;


// SEQUENCE ANIMATION ---------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const sequenceBox = document.getElementById('sequence-box');
    const searchContent = document.getElementById('search-content');
    const tickContent = document.getElementById('tick-content');
    const platformContent = document.getElementById('platform-content');
    const usernameInput = document.getElementById('username');
    const errorMsg = document.getElementById('error-msg');
    const itemWarningMsg = document.getElementById('item-warning-msg');
    const activeImages = document.querySelectorAll('.flex-image.active');
    const connectingContent = document.getElementById('connecting-content');
    const platformButtons = document.querySelectorAll('.platform-button');
    const connectingText = document.getElementById('connecting-text');
    const transferringText = document.getElementById('transferring-text');
    const transferringContent = document.getElementById('transferring-content');
    const successTransferContent = document.getElementById('success-transfer-content');
    const successTransferText = document.getElementById('success-transfer-text');
    const usernameTransferringContent = document.getElementById('username-transferring-content');
    const transferringUsernameText = document.getElementById('transferring-username');
    const verificationContent = document.getElementById('verification-content');
    const verifyBtn = document.getElementById('verify-btn');
    const verificationCrossImage = document.getElementById('verification-cross-image');
    const loadingDots = document.querySelector('#verification-content .loading-dots');

    generateBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const activeImagesCount = document.querySelectorAll('.flex-image.active').length;

        // Clear any previous error messages
        errorMsg.classList.add('hidden');
        itemWarningMsg.classList.add('hidden');

        // Username validation
        if (username.length <= 2) {
            errorMsg.textContent = 'Username must be more than 2 characters!';
            errorMsg.classList.remove('hidden');  // Show error message
            scrollToError(errorMsg);
            return;  // Stop execution
        } else if (username.length >= 16) {
            errorMsg.textContent = 'Username must be less than 16 characters!';
            errorMsg.classList.remove('hidden');  // Show error message
            scrollToError(errorMsg);
            return;  // Stop execution
        }

        // Item selection validation
        if (activeImagesCount === 0) {
            itemWarningMsg.classList.remove('hidden');  // Show item selection warning
            scrollToError(itemWarningMsg);
            setTimeout(() => {
                itemWarningMsg.classList.add('hidden');  // Hide after 2 seconds
            }, 2000);
            return;  // Stop execution
        }

        const activeImages = document.querySelectorAll('.flex-image.active'); // Get selected items
        let selectedItems = Array.from(activeImages).map(image => image.nextElementSibling.textContent); // Get item names
        let selectedPlatform = '';

        platformButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Determine the platform based on the button pressed
                selectedPlatform = button.querySelector('i').classList.contains('fa-windows') ? 'Windows' :
                    button.querySelector('i').classList.contains('fa-xbox') ? 'Xbox' :
                    button.querySelector('i').classList.contains('fa-android') ? 'Android' : 'Apple';

                // Update the connecting text
                connectingText.textContent = `Connecting to ${selectedPlatform} Servers...`;

                // Hide platform selection and show connecting sequence
                platformContent.classList.add('hidden');
                connectingContent.classList.remove('hidden');
                connectingContent.classList.add('pop-in');

                // After 3 seconds, start the item transfer sequence
                setTimeout(() => {
                    connectingContent.classList.add('hidden');  // Hide connecting content
                    transferItemSequence(0);  // Start transferring the first item
                }, 3000);
            });
        });

        // Function to handle item transfer sequence
        function transferItemSequence(itemIndex) {
            if (itemIndex < selectedItems.length) {
                const currentItem = selectedItems[itemIndex];

                // Update transferring text to show current item and platform
                transferringText.textContent = `Transferring ${currentItem} to ${selectedPlatform} Servers...`;

                // Show transferring content
                transferringContent.classList.remove('hidden');
                transferringContent.classList.add('pop-in');

                // After 3 seconds, show the success transfer message
                setTimeout(() => {
                    transferringContent.classList.add('hidden'); // Hide transferring content
                    successTransferText.textContent = `Successfully Transferred ${currentItem}`;
                    successTransferContent.classList.remove('hidden');
                    successTransferContent.classList.add('pop-in');

                    // After 2 seconds, hide success content and transfer the next item if available
                    setTimeout(() => {
                        successTransferContent.classList.add('hidden'); // Hide success content
                        transferItemSequence(itemIndex + 1);  // Move to the next item
                    }, 2000);

                }, 3000);
            } else {
                // All items have been transferred; start the username transferring sequence
                startUsernameTransferringSequence();
            }
        }
        

        // Function to start the username transferring sequence
        function startUsernameTransferringSequence() {
            const username = usernameInput.value; // Get the username

            // Update the username in the transferring text
            transferringUsernameText.textContent = username;

            // Show the username transferring sequence
            usernameTransferringContent.classList.remove('hidden');
            usernameTransferringContent.classList.add('pop-in');

            // After 4 seconds, move to the verification sequence
            setTimeout(() => {
                usernameTransferringContent.classList.add('hidden'); // Hide the transferring sequence
                startVerificationSequence(); // Start verification sequence
            }, 4000);
        }

        // Function to start the verification sequence
        function startVerificationSequence() {
            verificationContent.classList.remove('hidden');
            verificationContent.classList.add('pop-in');

            // After 2 seconds, hide the cross and dots, and show the Verify button
            setTimeout(() => {
                verifyBtn.classList.remove('hidden'); // Show the Verify button
                verifyBtn.classList.add('pop-in-pulse');
            }, 2000);
        }

        // Hide main content
        mainContent.classList.add('hidden');

        // Show sequence box and trigger pop-in for search content
        sequenceBox.classList.remove('hidden');
        searchContent.classList.remove('hidden');
        searchContent.classList.add('pop-in');

        // After 3 seconds, pop out the search content and pop in the tick content
        setTimeout(() => {
            searchContent.classList.remove('pop-in');
            searchContent.classList.add('pop-out');

            setTimeout(() => {
                searchContent.classList.add('hidden');  // Hide search content after pop-out
                tickContent.classList.remove('hidden');
                tickContent.classList.add('pop-in');
                tickContent.classList.add('pulse-animation');

                // After 2 seconds, pop out the tick content and pop in the platform selection
                setTimeout(() => {
                    tickContent.classList.remove('pop-in');
                    tickContent.classList.add('pop-out');

                    setTimeout(() => {
                        tickContent.classList.add('hidden');
                        platformContent.classList.remove('hidden');
                        platformContent.classList.add('pop-in');
                    }, 500);

                }, 1000);

            }, 500);

        }, 3000);
    });
});


// pop up ------------------------------------------------------------------------------------------------------------------------------
// pop up ------------------------------------------------------------------------------------------------------------------------------
// pop up ------------------------------------------------------------------------------------------------------------------------------
// pop up ------------------------------------------------------------------------------------------------------------------------------
// pop up ------------------------------------------------------------------------------------------------------------------------------
// pop up ------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Updated avatar paths
    const avatars = ['avatars/avatar1.png', 'avatars/avatar2.png', 'avatars/avatar3.png', 
                     'avatars/avatar4.png', 'avatars/avatar5.png', 'avatars/avatar6.png', 
                     'avatars/avatar7.png', 'avatars/avatar8.png', 'avatars/avatar9.png', 
                     'avatars/avatar10.png'];

    const items = ['VIP Access', 'Custom Makeup', 'Fast Walk', 'Top Model Rank', 'Runway Diva Rank',
                   '35,000 Tokens', 'Luxury Dress', 'Moongazer Girl Set', 'Futuristic Suit', 'Denim Bag'];

    // Predefined usernames (playful, for a young audience)
    const usernames = [
        'StarGirl25', 'QueenBee07', 'PrincessLily22', 'GamerGirl101', 'SweetPea13',
        'LunaLove08', 'DivaStar99', 'GlitterQueen55', 'SunshineGal12', 'BellaDream18',
        'Moonlight21', 'Fashionista99', 'SparkleStar08', 'RosyGamer33', 'StarlightGirl88',
        'CandyQueen47', 'LilMiss24', 'DaisyGirl92', 'PinkPrincess23', 'ChicGirl19',
        'DreamyBella17', 'CutiePie06', 'HappyStar28', 'GlitterGirl77', 'CoolGirl31'
    ];
;
    // Function to randomly select a biased item (VIP claimed most)
    function getRandomItem() {
        const biasedItems = [...Array(8).fill('VIP Access'), ...items]; // Bias towards 'VIP Access'
        return biasedItems[Math.floor(Math.random() * biasedItems.length)];
    }

    let presetIndex = 0; // To track which preset is currently being shown

    // Function to show the claim popup with new data
    function showClaimPopup() {
        // Cycle back to the first preset if the last one is shown
        if (presetIndex >= usernames.length) {
            presetIndex = 0; // Reset to start after all presets have been shown
        }

        // Get the current preset
        const randomUsername = usernames[presetIndex];
        const randomAvatar = avatars[presetIndex % avatars.length]; // Use modulo to cycle through avatars
        const claimedItem = getRandomItem();

        // Update popup content
        document.getElementById('claim-avatar').src = randomAvatar;
        document.getElementById('claim-username').textContent = randomUsername;
        document.getElementById('claim-message').textContent = `Just claimed '${claimedItem}'`;

        // Show the popup with animation
        const popup = document.getElementById('claim-popup');
        popup.classList.remove('hidden');
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';

        // Hide the popup after 4.5 seconds
        setTimeout(() => {
            popup.style.opacity = '0';
            popup.style.transform = 'translateY(100px)';
        }, 3500);

        presetIndex++; // Move to the next preset
    }

    // Show a new claim every 5 seconds
    setInterval(showClaimPopup, 4000);
});
