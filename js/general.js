
var site = {}; // customer custom preferences
var lang = {}; // language translations and preferences
var pageLang = document.querySelector('meta[name="language"]').content.toLowerCase(); // HTML file language

// !! fetch JSON files from the requested path
function loadJSONFile(path, cb) {
    loadFile(path, function(data) {
        cb(JSON.parse(data));
    });

}

// !! show a notification for the user
function throwMessage(type, title, msg) {
    console.debug(`Utils: creating a user notification [type: ${type}] [title: ${title}] [msg: ${msg}]`);

    console.debug(`Utils: this browser does not support promises. the user notification will be sent as an browser alert`);
    alert(msg);

}
