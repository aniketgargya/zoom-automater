if (window.location.href.includes("zoom.us")) {
    let settings = {};

    const port = chrome.runtime.connect({ name: "SETTINGS_PORT" });
    port.postMessage({ action: "GET_SETTINGS" });

    port.onMessage.addListener(request => {
        switch (request.action) {
            case "RECEIVE_SETTINGS":
                settings = {
                    ...request.payload
                };
                console.log(settings);
                break;
        }
    });
   
    setTimeout(() => {
        const [leaveButton] = document.getElementsByClassName("footer__leave-btn");

        if (leaveButton) {
            const participantsCountDisplay = document.querySelector(".footer-button__participants-icon .footer-button__number-counter span");
            leaveButton.style.backgroundColor = "rgb(29, 110, 251)";
            participantsCountDisplay.style.color = "rgb(29, 110, 251)";

            const leaveMeeting = () => {
                leaveButton.click();
                setTimeout(() => {
                    document.getElementsByClassName("leave-meeting-options__btn")[0].click();
                }, 500);
            };

            const leaveIfReady = (currentParticipantCount, goalParticipationCount) => {
                if (settings.on && 1 + currentParticipantCount - goalParticipationCount >= parseInt(participantsCountDisplay.innerHTML)) {
                    leaveMeeting();
                }
            };

            const setIntervalX = (callback, delay, repetitions) => {
                let x = 0;
                const intervalID = window.setInterval(() => {
                    callback();
                    console.log(intervalID + " " + x);

                    if (++x >= repetitions) {
                        window.clearInterval(intervalID);
                    }
                }, delay);
            };

            participantsCountDisplay.addEventListener("DOMSubtreeModified", () => {
                const currentParticipantCount = parseInt(participantsCountDisplay.innerHTML);
                setIntervalX(() => {
                    leaveIfReady(currentParticipantCount, settings.count);
                }, 1000, settings.duration);
            });
        }
    }, 5000);
}