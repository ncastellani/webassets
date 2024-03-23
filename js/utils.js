
// truncate an string on the informed size length
function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + '...' : source;
}

// generate an random 12-digits code
function uuid() {
    return 'axxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// get an parameter from the URL path
function getURLParam(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let url = window.location.href;
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// remove a param from the query string returing URL
function removeURLParam(name) {
    console.debug(`Utils: assembling an URL without a query string param [key: ${name}]`);

    let url = window.location.href;
    let urlparts = url.split('?');

    if (urlparts.length >= 2) {

        let prefix = encodeURIComponent(name) + '=';
        let pars = urlparts[1].split(/[&;]/g);

        for (let i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }

    return url;
}

// check if the user has access to internet
function userOnline() {
    return ('onLine' in navigator ? navigator.onLine : true);
}

// get the current timestamp in milliseconds
function getTime() {
    return Date.now();
}

// receive a number of bytes and sorts it into an readable unit
function bytesToReadable(total, unit) {
    if (0 == total) return '0 Bytes';
    let c = 1024,
        d = unit || 2,
        e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        f = Math.floor(Math.log(total) / Math.log(c));
    return parseFloat((total / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
}

// copy an string to the clipboard
function toClipboard(data) {
    console.debug(`Utils: copying data to the clipboard [data: ${data}]`);

    let el = document.createElement('textarea');
    el.value = data;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

}

// check if the array contains a value
function contains(a, obj) {
    let i = a.length;
    while (i--) { if (a[i] === obj) { return true; } }
    return false;
}

// convert a object to an HTML-placable JSON string
function objectToJSONString(data) {
    data = JSON.stringify(data);
    return data.replace(/"/g, '&quot;');
}

// fetch the file from the requested path
function loadFile(path, cb) {
    console.debug(`Utils: trying to load file [path: ${path}]`);

    let req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                cb(this.responseText);
            } else {
                cb(false);
                return;
            }
        }
    };

    req.open('GET', path, true);
    req.send();

}

// update the browser theme-color meta tag with the passed color
function updateBrowserTheme(color) {
    let metaThemeColor = document.querySelector('meta[name=theme-color]');
    metaThemeColor.setAttribute('content', color);

    return true;
}

// get an value in an object tree by dotted notation
function objectByDottedNotation(obj, is, value) {
    if (typeof is == 'string') {
        return objectByDottedNotation(obj, is.split('.'), value);
    } else if (is.length == 1 && value !== undefined) {
        return obj[is[0]] = value;
    } else if (is.length == 0) {
        return obj;
    }

    return objectByDottedNotation(obj[is[0]], is.slice(1), value);
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
