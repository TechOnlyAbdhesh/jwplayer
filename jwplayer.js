
let stretchModes = ['uniform', 'exactfit', 'fill', 'none'];
let currentStretchModeIndex = 0;

const playerInstance = jwplayer("player").setup({
    controls: true,
    displaytitle: true,
    autoplay: true,    
    displaydescription: true,
    abouttext: "streaming by AHDFLIX",
    aboutlink: "https://t.me/ahdflix",

    skin: {
        name: "netflix"
    },

    logo: {
        file: "https://www.solarsystemscope.com/spacepedia/images/handbook/renders/sun.png",
        link: "https://t.me/ahdflix"
    },

    captions: {
        color: "#FFF",
        fontSize: 14,
        backgroundOpacity: 0,
        edgeStyle: "raised"
    },

    playlist: [
        {
            title: "Star Sports 1 Hindi HD",
            description: "You're Watching",
            image: "https://www.solarsystemscope.com/spacepedia/images/handbook/renders/sun.png",
            sources: [
                {
                    file: "h",
                    type: "mp4",
                    label: "1080p",
                    default: true,
                 /*   drm: { 
                        "clearkey": {  
                            "keyId": "75fad10cec4c5610921be6a5d5326f0e",
                            "key": "06c1bbfe152ea7d17ed3f7bf6659ffa2" 
                        } 
                    }  */
                }
            ]
        }
    ],
    
    advertising: {
        client: "vast",
        schedule: [
            {
                offset: "pre",
                tag: ""
            }
        ]
    }
});

playerInstance.on("ready", function () {
    const playerContainer = playerInstance.getContainer();
    const buttonContainer = playerContainer.querySelector(".jw-button-container");
    const spacer = buttonContainer.querySelector(".jw-spacer");
    const timeSlider = playerContainer.querySelector(".jw-slider-time");
    buttonContainer.replaceChild(timeSlider, spacer);

    playerInstance.on("adBlock", () => {
        const modal = document.querySelector("div.modal");
        modal.style.display = "flex";

        document.getElementById("close").addEventListener("click", () => location.reload());
    });

    const rewindContainer = playerContainer.querySelector(".jw-display-icon-rewind");
    const forwardContainer = rewindContainer.cloneNode(true);
    const forwardDisplayButton = forwardContainer.querySelector(".jw-icon-rewind");
    forwardDisplayButton.style.transform = "scaleX(-1)";
    forwardDisplayButton.ariaLabel = "Forward 10 Seconds";
    const nextContainer = playerContainer.querySelector(".jw-display-icon-next");
    nextContainer.parentNode.insertBefore(forwardContainer, nextContainer);

    playerContainer.querySelector(".jw-display-icon-next").style.display = "none";
    const rewindControlBarButton = buttonContainer.querySelector(".jw-icon-rewind");
    const forwardControlBarButton = rewindControlBarButton.cloneNode(true);
    forwardControlBarButton.style.transform = "scaleX(-1)";
    forwardControlBarButton.ariaLabel = "Forward 10 Seconds";
    rewindControlBarButton.parentNode.insertBefore(forwardControlBarButton, rewindControlBarButton.nextElementSibling);

    [forwardDisplayButton, forwardControlBarButton].forEach((button) => {
        button.onclick = () => {
            playerInstance.seek(playerInstance.getPosition() + 10);
        };
    });

// Ensure the player has loaded before adding the button
    // Add custom button to toggle aspect ratio
    playerInstance.addButton(
        "https://raw.githubusercontent.com/TechOnlyAbdhesh/jwplayer/refs/heads/main/8420791.png", // URL to an icon
        "Toggle Aspect Ratio", // Tooltip
        function() {
            currentStretchModeIndex = (currentStretchModeIndex + 1) % stretchModes.length;
            let selectedStretchMode = stretchModes[currentStretchModeIndex];
            
            // Update the player with the new stretching mode
            playerInstance.setConfig({
                stretching: selectedStretchMode
            });
        },
        "aspectRatioButton",  // Unique ID for the button
        "control-bar",        // Where the button will be added
        "left"               // Position of the button within the control bar
    );


})
