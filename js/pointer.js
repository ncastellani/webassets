
// add the .pointer-disabled class to the passed element ID
function disableBodyPointer(el) {
    console.info(`DisabledPointer: reducing opacity and disabling pointer [element: ${(el ? el : 'body')}]`);

    document.getElementById((el ? el : 'body')).classList.add('pointer-disabled');

}

// remove the .pointer-disabled from the passed element ID
function enableBodyPointer(el) {
    console.info(`DisabledPointer: returning opacity to normal and re-enabling pointer [element: ${(el ? el : 'body')}]`);

    document.getElementById((el ? el : 'body')).classList.remove('pointer-disabled');

}
