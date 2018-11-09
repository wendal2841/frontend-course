onload = function () {
    init();
};

function init() {
    window.idFld = document.getElementById('inputId');
    window.firstNameFld = document.getElementById('inputFirstName');
    window.lastNameFld = document.getElementById('inputLastName');
    window.ageFld = document.getElementById('inputAge');

    window.errorField = document.getElementById("error");

    renderPersonList(getPersonList());
}

function getPersonList() {
    return personDAO.getPersonList();
}

function renderPersonList(personListObj) {
    const tableBody = document.getElementById('tableBody');

    for(let keyId in personListObj) {
        let raw = document.createElement("DIV");
        let id = document.createElement("DIV");
        let firstName = document.createElement("DIV");
        let lastName = document.createElement("DIV");
        let age = document.createElement("DIV");

        id.innerText = personListObj[keyId][id];
        firstName.innerText = personListObj[keyId][firstName];
        lastName.innerText = personListObj[keyId][lastName];
        age.innerText = personListObj[keyId][age];

        raw.className = "table-block__raw";
        id.className = "table-block__raw-id";
        firstName.className = "table-block__raw-first-name";
        lastName.className = "table-block__raw-last-name";
        age.className ="table-block__raw-age";

        raw.appendChild(id);
        raw.appendChild(firstName);
        raw.appendChild(lastName);
        raw.appendChild(age);

        tableBody.appendChild(raw);
    }
}

function isContainesUndf(obj) {
    for(let key in obj) {
        if (!obj[key]) return true;
    }
    return false
}

function raiseError(text) {
    errorField.innerText = text;
}

function addPerson() {
    const id = idFld.value;
    const firstName = firstNameFld.value;
    const lastName = lastNameFld.value;
    const age = ageFld.value;

    const person = {
        id,
        firstName,
        lastName,
        age
    };
    if(!isContainesUndf(person)) {
        personDAO.addPerson(person);
    } else {
        raiseError("Include empty field!");
    }

    personDAO.getPersonList();
}


