
// - cookies

// create a new wildcard cookie
function createCookie(key, value, days) {
    console.debug(`Utils: creating a new cookie [key: ${key}] [value: ${value}]`);

    // handle the cookie expiration date
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    date = date.toGMTString();

    // insert the cookie
    if (document.cookie = key + '=' + value + ';path=/;expires=' + date + ';domain=' + window.location.hostname + ';SameSite=Strict;') { return true; }
    else { return false; }
}

// remove a cookie by key
function removeCookie(key) {
    console.debug(`Utils: removing cookie from domain [key: ${key}]`);
    return createCookie(key, '', -1);
}

// read a cookie contents
function readCookie(key) {
    let nameEQ = key + '=';
    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) { return c.substring(nameEQ.length, c.length); }
    }

    return null;
}
