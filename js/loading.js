
var screenLockCounter = 1; // active screen overlay lock counter
var loadingOverlayProgressTotal = 0; // items to proccess on the LO bar
var loadingOverlayProgressDone = 0; // count of items already processed at the LO bar

// show the screen loading overlay block
function showLoading() {
    console.info(`LoadingOverlay: showing loading overlay and updating the hidden count`);

    let overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('loading-fade-out');
        updateBrowserTheme(window.getComputedStyle(document.body).getPropertyValue('--loading-overlay-background'));
        overlay.style.display = 'block';
        screenLockCounter++;
    }

}

// hide the screen loading overlay block
function hideLoading() {
    console.info(`LoadingOverlay: hiding loading overlay and updating the hidden count [lockCounter: ${(screenLockCounter - 1)}]`);

    screenLockCounter--;
    let overlay = document.getElementById('loadingOverlay');
    if (overlay && screenLockCounter <= 0) {
        overlay.classList.add('loading-fade-out');
        setTimeout(function() {
            overlay.style.display = 'none';
            //updateBrowserThemeColorByWidth();
        }, 500);
    } else {
        updateBrowserTheme(window.getComputedStyle(document.body).getPropertyValue('--loading-overlay-background'));
    }

}

// update the loading overlay description and progress bar
function updateLoadingDescription(text, progress, kind) {
    console.info(`LoadingOverlay: updating the description [kind: ${kind}] [progress: ${progress}] [text: ${text}]`);

    let kinds = {
        primary: {c: 'progressbar-primary', color: 'inherit'},
        error: {c: 'progressbar-error', color: 'var(--color-danger)'},
    }

    // remove the other kinds classes
    let loProgressBar = document.getElementById('loadingOverlayProgressBar');

    for (let k in kinds) {
        loProgressBar.classList.remove(kinds[k].c);
    }

    // add the current progress bar kind to the class list
    loProgressBar.classList.add(kinds[kind].c);

    // update the progress width
    updateLoadingProgressWidth(progress);

    // update the description message
    if (text) {
        let loDescription = document.getElementById('loadingOverlayDescription');
        loDescription.innerHTML = text;
        loDescription.style.color = kinds[kind].color;
    }

}

// add a message to the loading overlay updates wrapper
function addLoadingProgressMessage(text, updateCount, cb, cbDelay) {
    console.info(`LoadingOverlay: adding an progress message [text: ${text}]`);

    let loMsgs = document.getElementById('loadingOverlayMessages');
    if (loMsgs.innerHTML.includes(text)) { return; }

    loMsgs.innerHTML = `<span>${text}</span>` + loMsgs.innerHTML;

    // remove the additional child elements
    if (loMsgs.childElementCount > 3) {
        loMsgs.removeChild(loMsgs.lastChild);
    }

    // update the progress bar ellapsed progress
    if (updateCount) {
        loadingOverlayProgressDone = loadingOverlayProgressDone + 1;
        calculateLoadingProgress();
    }

    if (cb) { setTimeout(cb, (cbDelay ? cbDelay : 400)); }

}

// calculate the loading overlay progress from done/total
function calculateLoadingProgress() {
    console.info(`LoadingOverlay: calculating the progressbar progress [progress: ${loadingOverlayProgressDone}/${loadingOverlayProgressTotal}]`);

    updateLoadingProgressWidth((100 / (loadingOverlayProgressTotal / loadingOverlayProgressDone)));

}

// update the loading overlay progress bar "progress" width
function updateLoadingProgressWidth(width) {
    width = `${width}%`;
    console.info(`LoadingOverlay: updating the progress bar width [newWidth: ${width}]`);

    let loProgressBar = document.getElementById('loadingOverlayProgressBar');

    // handle the -1 width (infinite loading)
    if (width == '-1%') {
        console.info(`LoadingOverlay: infinite loading progress bar mode activated`);

        loProgressBar.classList.add('progressbar-infinite');
    } else {
        loProgressBar.classList.remove('progressbar-infinite');
        loProgressBar.style.width = width;
    }

}

// return if the loading overlay is currently visible or not
function isLoadingVisible() {
    return (screenLockCounter > 0 ? true : false);
}
