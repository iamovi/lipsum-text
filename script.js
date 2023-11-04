const loremIpsumHistory = [];

// Function to generate Lorem Ipsum text
function generateLoremIpsum() {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.";

const words = loremIpsum.split(" ");
    const randomText = [];
    for (let i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        randomText.push(words[randomIndex]);
    }
    
    // Add a period at the end of the generated text
    const generatedText = randomText.join(" ");
    return generatedText + ".";
}


// Function to update the history display
function updateHistoryDisplay() {
    const historyOutput = document.getElementById('history-output');
    historyOutput.innerHTML = "";
    if (loremIpsumHistory.length > 0) {
        historyOutput.style.display = 'block'; // Show the history display
        loremIpsumHistory.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `Generated Text ${index + 1}:<br>${item}`; // Add a line break for spacing
            historyOutput.appendChild(historyItem);
        });
    } else {
        historyOutput.style.display = 'none'; // Hide the history display when empty
    }
}

// CSS to add spacing between history items
const historyItemStyle = document.createElement('style');
historyItemStyle.innerHTML = `
    .history-item {
        margin-bottom: 10px; /* Adjust the number of pixels for the desired spacing */
    }
`;
document.head.appendChild(historyItemStyle);



// Function to toggle the history display
function toggleHistoryDisplay() {
    const historyOutput = document.getElementById('history-output');
    const generator = document.getElementById('generator');
    
    if (historyOutput.style.display === 'block') {
        historyOutput.style.display = 'none';
        generator.style.display = 'block'; // Show the generator
    } else {
        historyOutput.style.display = 'block';
        generator.style.display = 'none'; // Hide the generator
        updateHistoryDisplay();
    }
}

document.getElementById('generate').addEventListener('click', function () {
    const output = document.getElementById('output');
    const loremIpsumText = generateLoremIpsum();

    // Clear the output and set it as empty
    output.innerHTML = "";

    // Split the generated text into characters and display them with a typing effect
    let charIndex = 0;
    const textInterval = setInterval(function () {
        if (charIndex < loremIpsumText.length) {
            output.innerHTML += loremIpsumText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(textInterval); // Stop the typing effect
            // Enable the copy button
            const copyButton = document.getElementById('copy');
            copyButton.style.display = 'inline'; // Show the button
            copyButton.textContent = 'Copy'; // Set the button text
            copyButton.addEventListener('click', function () {
                copyToClipboard(loremIpsumText);
                copyButton.textContent = 'Copied';
                setTimeout(function () {
                    copyButton.textContent = 'Copy';
                }, 1000); // Set the duration in milliseconds

            });

            // Add the generated text to the history
            loremIpsumHistory.push(loremIpsumText);

            // Show the "History" button after generating text for the first time
            const historyButton = document.getElementById('history');
            historyButton.style.display = 'inline';
        }
    }, 1); // Faster typing speed (adjust as needed)
});

document.getElementById('history').addEventListener('click', function () {
    toggleHistoryDisplay();
});

// Function to copy text to the clipboard
function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// sticky top history button
const historyButton = document.getElementById('history');
historyButton.style.position = 'sticky';
historyButton.style.top = '0';
