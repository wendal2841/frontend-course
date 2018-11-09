let personDAO = null;

function setWindowStorage() {
    personDAO = new PersonDAOWindow;
}
function setLocalStorage() {
    personDAO = new PersonDAOLocal;
}
function setWServerStorage() {
    personDAO = new PersonDAOServer;
}
function setIndexStorage() {
    personDAO = new PersonDAOIndex;
}