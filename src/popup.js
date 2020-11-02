$(() => {
    chrome.runtime.sendMessage({
        action: "GET_SETTINGS"
    }, response => {
        document.forms["settings-form"]["on"].checked = response.on;
        document.forms["settings-form"]["count"].value = response.count;
        document.forms["settings-form"]["duration"].value = response.duration;
    });

    $("#settings-form :input").on("change keypress keyup", () => {
        $("#settings-form input:submit").prop("disabled", false);
    });

    $("#settings-form").on("submit", evt => {
        evt.preventDefault();
        $("#settings-form input:submit").prop("disabled", true);

        chrome.runtime.sendMessage({
            action: "SET_SETTINGS",
            payload: {
                on: document.forms["settings-form"]["on"].checked,
                count: document.forms["settings-form"]["count"].value,
                duration: document.forms["settings-form"]["duration"].value
            }
        });
    });
});