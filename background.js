chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('popup.html', {
        'state':'maximized',
        'bounds': {
            'width': 400,
            'height': 500
        }
    });
});
