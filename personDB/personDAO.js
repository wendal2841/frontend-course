let personDAO = null;
let personList = {};
let personListWebSQL = {};

function setWindowStorage() {
    personDAO = new PersonDAOWindow;
    renderPersonList(personDAO.getPersonList());
}

function setLocalStorage() {
    personDAO = new PersonDAOLocal;
    renderPersonList(personDAO.getPersonList());
}

function setServerStorage() {
    personDAO = new PersonDAOServer;
    renderPersonList(personDAO.getPersonList());
}

function setIndexStorage() {
    personDAO = new PersonDAOIndex;
    renderPersonList(personDAO.getPersonList());
}


class PersonDAOWindow{
    constructor(){
        if (PersonDAOWindow.instance){
            return PersonDAOWindow.instance
        } else {
            PersonDAOWindow.instance = this;
            personList = {};
        }
    }

    getPersonList() {
        return personList;
    }

    createPerson(person){
        if(!personList[person.id]) personList[person.id] = person;
    }

    getPerson(id){
        return personList[id];
    }

    updatePerson(person){
        personList[person.id] = person;
    }

    deletePerson(id){
        delete personList[id];
    }
}


class PersonDAOLocal{
    constructor(){
        if (PersonDAOLocal.instance){
            return PersonDAOLocal.instance
        } else {
            PersonDAOLocal.instance = this;
        }
    }

    getPersonList() {
        let personList = JSON.parse(localStorage.getItem("persons"));
        return (personList)? personList: {}
    }

    createPerson(person){
        let personList = this.getPersonList();
        personList[person.id] = person;
        localStorage.setItem("persons", JSON.stringify(personList))
    }

    getPerson(id){
        let personList = this.getPersonList();
        return personList[id];
    }

    updatePerson(person){
        let personList = this.getPersonList();
        personList[person.id] = person;
        localStorage.setItem("persons", JSON.stringify(personList));
    }

    deletePerson(id){
        let personList = this.getPersonList();
        delete personList[id];
        localStorage.setItem("persons", JSON.stringify(personList));
    }
}


class PersonDAOServer{
    constructor(){
        if (PersonDAOServer.instance){
            return PersonDAOServer.instance
        } else {
            PersonDAOServer.instance = this;
        }
    }

    static errorHandler(transaction, error){
        console.log("Error: " + error.message + " (Code: " + error.code + ")");
        return true;
    }

    static getAllRows(callback){
        const persons = {};

        db.transaction(function (tx) {
            tx.executeSql(
                "SELECT * FROM persons",
                [],
                function (tx, result) {
                    callback(result);
                },
                PersonDAOServer.errorHandler
            )
        });
    }

    getPersonList() {
        let persons = {};
        PersonDAOServer.getAllRows(function (result=null) {
            for (let i = 0; i < result.rows.length; i++){
                persons[result.rows.item(i)['id']] = {
                    "id": result.rows.item(i)['id'],
                    "firstName": result.rows.item(i)["firstName"],
                    "lastName": result.rows.item(i)["lastName"],
                    "age": result.rows.item(i)["age"]
                }
            }

            console.log(persons);
            personListWebSQL = persons;
        });
        return personListWebSQL;
    }

    createPerson(person){
        db.transaction( function (tx) {
            tx.executeSql(
                "INSERT INTO persons (id, firstName, lastName, age) VALUES (?, ?, ?, ?);",
                [person.id, person.firstName, person.lastName, person.age],
                null,
                PersonDAOServer.errorHandler)
        })
    }

    getPerson(id){

    }

    updatePerson(person){

    }

    deletePerson(id){

    }
}


class PersonDAOIndex{
    constructor(){
        if (PersonDAOIndex.instance){
            return PersonDAOIndex.instance
        } else {
            PersonDAOIndex.instance = this;
        }
    }

    getPersonList() {

    }

    createPerson(person){

    }

    getPerson(id){

    }

    updatePerson(person){

    }

    deletePerson(id){

    }
}