
var site = {}; // customer custom preferences
var lang = {}; // language translations and preferences
var pageLang = document.querySelector('meta[name="language"]').content.toLowerCase(); // HTML file language

// !! fetch files from the requested path
function loadFile(path, cb) {
    console.debug(`Utils: trying to load file [path: ${path}]`);

    let req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                cb(this.responseText);
            } else {
                //addLoadingOverlayProgressMessage(`${lang.t.tryingToLoadFile} (${path})`, false, null, null);
                //updateLoadingOverlayDescription(lang.t.errorHandlingData, 100, 'error');
                //showLoadingOverlay();
                return;
            }
        }
    };

    req.open('GET', path, true);
    req.send();

}

// fetch JSON files from the requested path
function loadJSONFile(path, cb) {
    loadFile(path, function(data) {
        cb(JSON.parse(data));
    });

}

// update the browser theme-color meta tag with the passed color
function updateBrowserTheme(color) {
    let metaThemeColor = document.querySelector('meta[name=theme-color]');
    metaThemeColor.setAttribute('content', color);

    return true;
}
