function Company(name) {
    this.name = name;
    this.employees = {};
    this.addPerson = (person) => {
        this.employees[person.personName] = person;
        person.company = this;
    };
    this.addCopy = (person, copyPerson) => {
        this.employees[person.personName] = copyPerson;
    }
};

function Person(name, age) {

    let nameValidator = (name) => {
        if(name){
            for(let i=0; i<name.length; i++){
                if(!('A'<=name[i] && name[i]<='z')) return null
            }
            return name;
        }
        return null
    };

    let ageValidator = (age) => {
        if(age) {
            return (0 <= +age <= 200) ? +age : null;
        }
        return null
    };



    this.personName = nameValidator(name);
    this.personAge = ageValidator(age);
    this.personData = {
        name: this.personName,
        age: this.personAge
    };

    this.setPersonName = (value) => {
        this.name = nameValidator(value);
        if(!this.name) return 'error'
    };
    this.setPersonAge = (age) => {
        this.age = ageValidator(age);
        if(!this.age) return 'error'
    };

    this.setJob = (company) => {
        company.addPerson(this);
    };

    this.isValid = () => {
        return Boolean(ageValidator(this.personAge) && nameValidator(this.personName))
    }
};

let getPersonCopy = (obj) => {
    copy = {};
    for(var key in obj){
        copy[key] = obj[key]
    }
    copy.company.addPerson(copy);
    return copy;
};

let getPersonDeepCopy = (obj, generalField) => {
    let getObjCopy = (obj) =>{
        let copy = {};
        for(let key in obj){
            if(key === generalField)  copy[key] = obj[key]
            else if(key !== generalField && typeof key === 'object') {
                copy[key] = getObjCopy(obj[key]);
            } else copy[key] = obj[key]
        }
        return copy;
    };
    let copy = getObjCopy(obj);
    copy.company.addPerson(copy);
    return copy;
};

let getPersonCopyJSON = (obj, generalField) => {
    let copy = {};
    let reference = obj[generalField];
    obj[generalField] = null;
    let strObj = JSON.stringify(obj);
    copy = JSON.parse(strObj);
    copy[generalField] = reference;
    copy.company.addPerson(copy);
    return copy;
};

var taxPayer1 = new Person('Vanya', 54);

var dtek = new Company('DTEK');
dtek.addPerson(taxPayer1);

var copy = getPersonCopy(taxPayer1);

// var deepCopy = getPersonDeepCopy(taxPayer1, 'company')

var jsoncopy = getPersonCopyJSON(taxPayer1, 'company');

console.log(taxPayer1);