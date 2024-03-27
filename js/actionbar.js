
// assemble the action bar with new data
function updateActionBar(kind, btnType, title, desc, body, fields, cb) {
    console.debug(`ActionBar: assembling a new action bar [title: ${title}]`);

    // place the informed kind data
    let kinds = {
        info: { tag: 'tag tag-primary', text: lang.t['actionbar.information'], icon: 'mdi mdi-information-outline' },
        danger: { tag: 'tag tag-danger', text: lang.t['actionbar.error'], icon: 'mdi mdi-alert-outline' },
        warning: { tag: 'tag tag-warning', text: lang.t['actionbar.error'], icon: 'mdi mdi-car-brake-alert' },
        dangerConfirmation: { tag: 'tag tag-danger', text: lang.t['actionbar.danger'], icon: 'mdi mdi-alert-outline' },
        operation: { tag: 'tag tag-primary', text: lang.t['actionbar.operation'], icon: 'mdi mdi-cog-outline' },
    };

    document.getElementById('actionBarKind').className = kinds[kind].tag;
    document.getElementById('actionBarKindText').innerHTML = kinds[kind].text;
    document.getElementById('actionBarKindIcon').className = kinds[kind].icon;

    // update the title, description and body
    document.getElementById('actionBarTitle').innerHTML = title;
    document.getElementById('actionBarDescription').innerHTML = desc;

    let bodyWrapper = document.getElementById('actionBarBody');

    if (body) {
        bodyWrapper.innerHTML = body;
        bodyWrapper.style.display = 'block';
    } else {
        bodyWrapper.style.display = 'none';
    }

    // assemble the fields
    let fieldsWrapper = document.getElementById('actionBarFields');
    let formFields = [];

    if (fields.length > 0) {

        fieldsWrapper.style.display = 'block';
        fieldsWrapper.innerHTML = '<div class="actionbar-field-bar"></div>';

        // iteration to place the content
        for (let k in fields) {
            let v = fields[k];

            let fieldID = `actionBarField${v.fieldName}`;
            formFields.push({ id: fieldID, displayType: v.displayType, required: v.required, name: v.fieldName });

            if (v.displayType == 'select') {

                // determine the selector options and add field to selectors to init
                let selectOptions = '';

                for (let key in v.options) {
                    let entry = v.options[key];
                    selectOptions += `<option value="${entry.key}" ${(entry.disabled ? 'disabled' : '')}>${entry.text}</option>`;
                }

                fieldsWrapper.innerHTML += `
                    <div class="actionbar-field" style="${(!v.visible ? 'display: none !important;' : '')}">
                        <div class="form-field">
                            <b>${v.displayName} ${(v.required ? '<span style="color: red;">*</span>' : '')}</b>
                            <select id="${fieldID}" ${(v.disabled ? 'disabled' : '')}>${selectOptions}</select>
                            <span id="${fieldID}Helper" class="helper">&nbsp;</span>
                        </div>
                    </div>
                `;

                // select the current value
                if (v.data) {
                    document.getElementById(fieldID).value = v.data;
                }

                //
            } else if (v.displayType == 'field') {
                // the common field

                fieldsWrapper.innerHTML += `
                    <div class="actionbar-field" style="${(!v.visible ? 'display: none !important;' : '')}">
                        <div class="form-field">
                            <b>${v.displayName} ${(v.required ? '<span style="color: red;">*</span>' : '')}</b>
                            <input
                                id="${fieldID}"
                                type="${v.fieldType}"
                                placeholder="${(v.desc ? v.desc : '--')}"
                                ${(v.disabled ? 'disabled' : '')}
                                value="${(v.data ? v.data : '')}"
                                ${(v.fieldOnInput ? 'oninput="'+ v.fieldOnInput +'(\'' + fieldID + '\');"' : '')}
                            >
                            <span id="${fieldID}Helper" class="helper">&nbsp;</span>
                        </div>
                    </div>
                `;

                //
            } else {
                fieldsWrapper.innerHTML += `
                    <div
                        class="actionbar-field actionbar-field-border"
                        style="word-wrap: break-word; ${(!v.visible ? 'display: none !important;' : '')}"
                    >
                        <b style="float: initial;">${v.name}</b>
                        <span style="float: initial; display: block;">${(v.data ? v.data : '--')}</span>
                    </div>
                `;
            }

        }

    } else {
        fieldsWrapper.style.display = 'none';
    }

    // update the button to the selected button type and callback
    let confirmBtn = document.getElementById('actionBarConfirmButton');

    confirmBtn.classList.remove('btn-primary');
    confirmBtn.classList.remove('btn-danger');

    if (btnType == 'danger') {
        confirmBtn.classList.add('btn-danger');
    } else {
        confirmBtn.classList.add('btn-primary');
    }

    if (cb) {
        confirmBtn.style.display = 'block';
        confirmBtn.onclick = function() {

            // check the form fields if required
            let data = {};
            if (formFields.length > 0) {
                data = getFieldsValues(formFields, true);
                if (!data) { return; }
            }

            cb(data);
        };
    } else {
        confirmBtn.style.display = 'none';
    }

    // show the action bar
    showActionBar();

}

// show the action bar
function showActionBar() {
    console.debug(`ActionBar: showing the action bar`);

    document.getElementById('actionBarWrapper').classList.add('actionbar-open');
    document.getElementById('layout').style.opacity = 0.2;

}

// hide the action bar
function closeActionBar() {
    console.debug(`ActionBar: closing the action bar`);

    document.getElementById('actionBarWrapper').classList.remove('actionbar-open');
    document.getElementById('layout').style.opacity = 1;

}
