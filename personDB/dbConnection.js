const dbName = "PersonsDB";
const dbVersion = "0.1";
const dbDisplayName = "PersonsDB";
const dbMaxSize = 256;

const db = openDatabase(dbName, dbVersion, dbDisplayName, dbMaxSize);

db.transaction(function (tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS persons " +
    "(id INTEGER NOT NULL PRIMARY KEY, " +
    "firstName TEXT NOT NULL, " +
    "lastName TEXT NOT NULL, " +
    "age INTEGER NOT NULL);")
});

const indexDB = new Dexie('PersonsDB');

indexDB.version(1).stores({
    persons: 'id, person'
});