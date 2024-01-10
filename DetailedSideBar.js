// Define the sidebar extension object
const sidebarExtension = {
    // Initialize the extension
    init: function() {
        // Add event listeners
        this.addEventListeners();
        // Check if the current tab is a YouTube video
        this.checkYouTubeVideo();
    },

    // Add event listeners
    addEventListeners: function() {
        // Add event listener for sidebar toggle button
        const toggleButton = document.getElementById('sidebar-toggle-button');
        toggleButton.addEventListener('click', this.toggleSidebar.bind(this));
    },

    // Check if the current tab is a YouTube video
    checkYouTubeVideo: function() {
        // Get the current tab URL
        browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentUrl = tabs[0].url;
            // Check if the URL is a YouTube video
            if (currentUrl.includes('youtube.com/watch')) {
                // Create the "Summarize" button
                this.createSummarizeButton();
            } else {
                // Display "Ready For Your Next Video"
                this.displayReadyMessage();
            }
        });
    },

    // Create the "Summarize" button
    createSummarizeButton: function() {
        const buttonContainer = document.getElementById('button-container');
        const summarizeButton = document.createElement('button');
        summarizeButton.innerText = 'Summarize';
        summarizeButton.addEventListener('click', this.callVideoInsights.bind(this));
        buttonContainer.appendChild(summarizeButton);
    },

    // Call VideoInsights.io and present the results
    callVideoInsights: function() {
        // Make a request to VideoInsights.io API
        fetch('https://api.videoinsights.io/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ videoUrl: browser.tabs[0].url }),
        })
            .then(response => response.json())
            .then(data => {
                // Display the results in the sidebar
                const sidebarContent = document.getElementById('sidebar-content');
                sidebarContent.innerHTML = data;
            })
            .catch(error => {
                console.error('Error calling VideoInsights.io:', error);
            });
    },

    // Display "Ready For Your Next Video"
    displayReadyMessage: function() {
        const sidebarContent = document.getElementById('sidebar-content');
        sidebarContent.innerText = 'Ready For Your Next Video';
    },

    // Toggle the sidebar visibility
    toggleSidebar: function() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('sidebar-visible');
    },
};

// Initialize the sidebar extension
sidebarExtension.init();
