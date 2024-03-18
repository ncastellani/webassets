
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

// remove the .active class from all IDs that has the passed prefix
function removeActiveFromPrefix(prefix, exceptIDs) {
    console.debug(`Utils: removing .active from set of elements [prefix: ${prefix}] [except: ${exceptIDs}]`);

    let allItems = document.querySelectorAll('*[id^="' + prefix + '"]');
    for (i = 0; i < allItems.length; ++i) {
        if (!contains(exceptIDs, allItems[i].id)) {
            document.getElementById(allItems[i].id).classList.remove('active');
        }
    }

}

// set an interval to add the .active on a element if exists
function tryToAddActiveToItem(id) {
    console.debug(`Utils: registed a intent to add .active [id: ${id}]`);

    let tryCount = 0;
    let setItemActiveInterval = setInterval(function() {
        if (tryCount == 10) {
            clearInterval(setItemActiveInterval);
            console.debug(`Utils: giving up on adding the .active to element [id: ${id}]`);
        } else {
            if (document.getElementById(id)) {
                document.getElementById(id).classList.add('active');
                clearInterval(setItemActiveInterval);
                console.debug(`Utils: sucessfully added the .active to element [id: ${id}]`);
            } else {
                tryCount++;
            }
        }
    }, 100);

}
