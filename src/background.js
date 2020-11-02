let settings = {};
let settingsPorts = [];

const setSettings = newSettings => {
    settings = {
        ...newSettings
    };
    
    chrome.storage.local.set(newSettings);

    settingsPorts.forEach(settingsPort => {
        settingsPort.postMessage({
            action: "RECEIVE_SETTINGS",
            payload: {
                ...settings
            }
        });
    });
};

chrome.storage.local.get(["on", "count", "duration"], response => {
    setSettings({
        on: response.on || false,
        count: response.count || 5,
        duration: response.duration || 3
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case "SET_SETTINGS":
            setSettings(request.payload);
            break;
        case "GET_SETTINGS":
            sendResponse({
                ...settings
            });
            break;
    }
});

chrome.runtime.onConnect.addListener(port => {
    switch (port.name) {
        case "SETTINGS_PORT":
            port.onDisconnect.addListener(() => {
                settingsPorts = settingsPorts.filter(settingsPort => settingsPort != port);
            });

            port.onMessage.addListener(request => {
                switch (request.action) {
                    case "GET_SETTINGS":
                        port.postMessage({
                            action: "RECEIVE_SETTINGS",
                            payload: {
                                ...settings
                            }
                        });
                        break;
                }
            });

            settingsPorts.push(port);
            break;
    }
});
