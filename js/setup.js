
function initSetup() {

    console.info('========================= ++ =========================');
    console.info(developmentMsg);
    console.info('========================= ++ =========================');

    console.info('GlobalSetup: running the global page setup');

    loadingOverlayProgressTotal = (loadingOverlayProgressTotal + 1);

    function step1() { updateColorPreferences(step2); }
    function step2() { loadTranslation(pageLang, step3); }
    function step3() { addLoadingProgressMessage(lang.t['loading.messages.searchingUpdates'], false, function() { checkPendingServiceWorkerUpdates(step4); }, 0); }
    function step4() { addLoadingProgressMessage(lang.t['loading.messages.loadingSiteSettings'], false, function() { loadSitePreferences(finishInit); }, 1000); }

    function finishInit() {
        console.info('GlobalSetup: finished the global setup');
        initLayout();
    }

    step1();

}

// !!
function updateColorPreferences(cb) {

    let desiredMode = 'light-theme';

    // get the browser preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        desiredMode = 'light-theme';
    } else {
        desiredMode = 'light-theme';
    }

    // !! get the user defined preference

    // update the body element with the colors class
    console.info(`GlobalSetup: setting a new application color [desiredMode: ${desiredMode}]`);
    document.getElementById('body').classList.add(desiredMode);

    cb();

}

// load the desired translation from the lang JSON
function loadTranslation(language, cb) {
    console.info(`GlobalSetup: loading the translation file [language: ${language}]`);

    loadJSONFile('/assets/lang/' + language + '.json', function(data) {
        console.info(`GlobalSetup: translation file sucessfully loaded`);

        // update the language on page
        data.t = data.translations;
        delete(data.translations);
        lang = data;

        // determine the page path
        lang.URLPath = (lang.default ? '/' : `/${lang.path}/`);

        console.info(`GlobalSetup: the language URL path is "${lang.URLPath}"`);

        // set the moment.js language
        moment.locale(lang['moment.js']);

        console.info(`GlobalSetup: moment.js library preferences updated to match the selected language`);

        cb();
    });

}

// check if there is an serviceWorker update before calling the callback
function checkPendingServiceWorkerUpdates(cb) {
    console.info(`GlobalSetup: checking for pending updates on ServiceWorker`);

    if ('serviceWorker' in navigator) {
        setTimeout(function() {
            if (!ongoingServiceWorkerUpdate) {
                console.info(`GlobalSetup: no ServiceWorker updates found`);
                cb();
            }
            else {
                console.info(`GlobalSetup: ServiceWorker update found. not calling the callback function`);
            }
        }, 1000);
    } else {
        console.info(`GlobalSetup: ServiceWorker is unavailable on this browser (navigator variable)`);
        cb();
    }

}

// load the JSON file with the side preferences
function loadSitePreferences(cb) {
    console.info(`GlobalSetup: loading the site preferences JSON file...`);

    loadJSONFile('/site.json', function(data) {
        console.info(`GlobalSetup: customization found. updating the global preferences variable`);
        site = data;

        applySitePreferences(cb);
    });

}
