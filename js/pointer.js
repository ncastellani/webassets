
// add the .pointer-disabled class to the passed element ID
function disableBodyPointer(el) {
    console.info(`DisabledPointer: reducing opacity and disabling the pointer on element "${(el ? el : 'body')}"`);

    document.getElementById((el ? el : 'body')).classList.add('pointer-disabled');

}

// remove the .pointer-disabled from the passed element ID
function enableBodyPointer(el) {
    console.info(`DisabledPointer: returning opacity to normal and re-enabling the pointer on element "${(el ? el : 'body')}"`);

    document.getElementById(el).classList.remove('pointer-disabled');

}
