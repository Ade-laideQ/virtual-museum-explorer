// ========================================
// VIRTUAL MUSEUM EXPLORER
// Stack Data Structure Implementation
// ========================================

// The back stack stores previous exhibits.
// The forward stack stores exhibits we move forward to.

let backStack = [];
let forwardStack = [];

// The exhibit currently being viewed.

let currentExhibit = "main";

// Records the sequence of exhibits visited.

let explorationHistory = [];

// Information about each museum exhibit.

const exhibits = {
    main: {
        title: "Main Hall",
        icon: "🏛️",
        description:
            "Welcome to the Virtual Museum! Choose an exhibition " +
            "below to discover history, culture, science and art."
    },

    ancient: {
        title: "Ancient Artifacts",
        icon: "🏺",
        description:
            "Explore pottery, ancient tools, sculptures and objects " +
            "that reveal how people lived in early civilizations."
    },

    african: {
        title: "African Heritage",
        icon: "🌍",
        description:
            "Discover African cultural heritage through traditional " +
            "symbols, textiles, crafts, clothing and historical objects."
    },

    science: {
        title: "Science and Technology",
        icon: "🔬",
        description:
            "Learn how scientific discoveries and technological " +
            "inventions have transformed everyday life."
    },

    modern: {
        title: "Modern Art",
        icon: "🎨",
        description:
            "Explore modern artistic expression through painting, " +
            "creative design, colour and visual storytelling."
    },

    nature: {
        title: "Natural History",
        icon: "🦴",
        description:
            "Discover fossils, animal life, ecosystems and the " +
            "natural processes that have shaped our planet."
    },

    space: {
        title: "Space Exploration",
        icon: "🚀",
        description:
            "Explore the solar system, spacecraft, planets and " +
            "humanity's efforts to understand the universe."
    }
};


// ========================================
// GET HTML ELEMENTS
// ========================================

const backButton = document.getElementById("backButton");
const forwardButton = document.getElementById("forwardButton");
const homeButton = document.getElementById("homeButton");
const resetButton = document.getElementById("resetButton");

const exhibitTitle = document.getElementById("exhibitTitle");
const exhibitIcon = document.getElementById("exhibitIcon");
const exhibitDescription =
    document.getElementById("exhibitDescription");

const exhibitCounter = document.getElementById("exhibitCounter");

const historyList = document.getElementById("historyList");
const historyMessage = document.getElementById("historyMessage");


// ========================================
// VISIT AN EXHIBIT
// ========================================

function visitExhibit(exhibitId) {

    // Check that the requested exhibit exists.

    if (!exhibits[exhibitId]) {
        return;
    }

    // Do nothing if the visitor selects the current exhibit.

    if (exhibitId === currentExhibit) {
        return;
    }

    // PUSH: Store the current exhibit in the back stack.

    backStack.push(currentExhibit);

    // A new navigation choice clears forward history.

    forwardStack = [];

    // Change the current exhibit.

    currentExhibit = exhibitId;

    // Record the visit.

    explorationHistory.push(exhibitId);

    // Update the screen.

    displayExhibit();
}


// ========================================
// GO BACK
// ========================================

function goBack() {

    // Check whether the back stack is empty.

    if (backStack.length === 0) {
        return;
    }

    // PUSH: Save the current exhibit in the forward stack.

    forwardStack.push(currentExhibit);

    // POP: Remove and retrieve the most recent previous exhibit.

    currentExhibit = backStack.pop();

    // Display the previous exhibit.

    displayExhibit();
}


// ========================================
// GO FORWARD
// ========================================

function goForward() {

    // Check whether the forward stack is empty.

    if (forwardStack.length === 0) {
        return;
    }

    // PUSH: Save the current exhibit in the back stack.

    backStack.push(currentExhibit);

    // POP: Retrieve the most recently stored forward exhibit.

    currentExhibit = forwardStack.pop();

    // Display the exhibit.

    displayExhibit();
}


// ========================================
// RETURN TO THE MAIN HALL
// ========================================

function goHome() {

    if (currentExhibit === "main") {
        return;
    }

    // Save the current exhibit before returning to the Main Hall.

    backStack.push(currentExhibit);

    // Clear forward navigation.

    forwardStack = [];

    // Return to the Main Hall.

    currentExhibit = "main";

    // Record the visit.

    explorationHistory.push("main");

    displayExhibit();
}


// ========================================
// DISPLAY THE CURRENT EXHIBIT
// ========================================

function displayExhibit() {

    const exhibit = exhibits[currentExhibit];

    exhibitTitle.textContent = exhibit.title;
    exhibitIcon.textContent = exhibit.icon;
    exhibitDescription.textContent = exhibit.description;

    // Count unique exhibits explored, excluding the Main Hall.

    const uniqueExhibits = new Set(
        explorationHistory.filter(id => id !== "main")
    );

    exhibitCounter.textContent =
        "Unique exhibits explored: " + uniqueExhibits.size +
        " / " + (Object.keys(exhibits).length - 1);

    // Enable or disable navigation buttons.

    backButton.disabled = backStack.length === 0;
    forwardButton.disabled = forwardStack.length === 0;

    // Refresh the exploration history.

    displayHistory();
}


// ========================================
// DISPLAY EXPLORATION HISTORY
// ========================================

function displayHistory() {

    historyList.replaceChildren();

    if (explorationHistory.length === 0) {
        historyMessage.textContent =
            "You have not explored any exhibits yet.";
        return;
    }

    historyMessage.textContent =
        "You have visited " + explorationHistory.length +
        " exhibit(s), including repeated visits.";

    // Display the most recently visited exhibit first.

    for (let i = explorationHistory.length - 1; i >= 0; i--) {

        const exhibitId = explorationHistory[i];
        const listItem = document.createElement("li");

        listItem.textContent = exhibits[exhibitId].title;

        // Highlight the current exhibit if it matches
        // the latest recorded visit.

        if (
            i === explorationHistory.length - 1 &&
            exhibitId === currentExhibit
        ) {
            listItem.classList.add("current");
            listItem.textContent += " — Most Recent Visit";
        }

        historyList.appendChild(listItem);
    }
}


// ========================================
// RESET EXPLORATION
// ========================================

function resetExploration() {

    const confirmed = confirm(
        "Are you sure you want to reset your exploration?"
    );

    if (!confirmed) {
        return;
    }

    // Clear both stacks.

    backStack = [];
    forwardStack = [];

    // Clear the visit record.

    explorationHistory = [];

    // Return to the Main Hall.

    currentExhibit = "main";

    // Refresh the application.

    displayExhibit();
}


// ========================================
// CONNECT BUTTONS TO FUNCTIONS
// ========================================

backButton.addEventListener("click", goBack);

forwardButton.addEventListener("click", goForward);

homeButton.addEventListener("click", goHome);

resetButton.addEventListener("click", resetExploration);


// ========================================
// INITIAL DISPLAY
// ========================================

displayExhibit();
