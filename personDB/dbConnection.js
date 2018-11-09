//...IndexedDB code
//содание БД
var dbPromise = idb.open('test-db6', 1, function(upgradeDb) {
    //создание таблицы
    if (!upgradeDb.objectStoreNames.contains('store')) {
        var usersOS = upgradeDb.createObjectStore('store', {keyPath: 'id', autoIncrement: true});

        usersOS.createIndex('id', 'id', {unique: true});
        usersOS.createIndex('fname', 'fname', {unique: false});
        usersOS.createIndex('lname', 'lname', {unique: false});
        usersOS.createIndex('age', 'age', {unique: false});
    }
});