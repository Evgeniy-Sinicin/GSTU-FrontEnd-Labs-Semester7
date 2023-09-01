class Fio {
    /**
     * @param {string} surname 
     * @param {string} name 
     * @param {string} middlename 
     */
    constructor(surname = '', name = '', middlename = '') {
        this.surname = surname;
        this.name = name;
        this.middlename = middlename;
    }

    toString() {
        return JSON.stringify(this);
    }
}

class Lab {
    /**
     * @param {string} name 
     * @param {Date} deliveryDate 
     * @param {number} rating 
     */
    constructor(name = '', deliveryDate = new Date(), rating = 0) {
        this.name = name;
        this.deliveryDate = deliveryDate;
        this.rating = rating;
    }
}

class Discipline {
    /**
     * @param {string} name 
     * @param {Lab[]} labs 
     */
    constructor(name = '', labs = []) {
        this.name = name;
        this.labs = labs;
    }
}

class Record {
    /**
     * @param {FIO} fio
     * @param {string} faculty 
     * @param {string} specialty 
     * @param {Discipline[]} disciplines 
     */
    constructor(fio = new Fio(), faculty = '', specialty = '', disciplines = []) {
        this.fio = fio;
        this.faculty = faculty;
        this.specialty = specialty;
        this.disciplines = disciplines;
    }

    toString() {
        return JSON.stringify(this);
    }

    initFromJson(obj) {
        for (let prop in obj) {
            this[prop] = obj[prop];
        }
    }
}

let fio = new Fio('Sinicin', 'Evgeniy', 'Vital\'evich');
let lab = new Lab('Lab_#1', new Date(), 10);
let discipline = new Discipline('Front-end', [lab, lab]);
let record = new Record(fio, 'FAIS', 'Programmer', [discipline, discipline]);
let record2 = new Record();

/**
 * @param {string} name Discipline name
 * @param {Labs[]} name Discipline remaining labs
 */
function appendDisciplineNameLabel(name, labs) {
    let div = document.getElementById('div-disciplines');
    let h3 = document.createElement('h3');
    let ul = document.createElement('ul');
    let font = document.createElement('font');
    
    ul.classList.add('border');
    font.classList.add('black');
    h3.classList.add('red');
    h3.innerText = name;

    labs.forEach(x => {
        let li = document.createElement('li');

        li.innerHTML = '<font class="blue">' + x.name + ' </font>';
        li.innerHTML +=  new Date(x.deliveryDate).toDateString();
        
        ul.appendChild(li);
    });

    font.appendChild(ul);
    h3.appendChild(font);
    div.appendChild(h3);
    document.body.appendChild(div);
}

function onBodyLoad() {
    let fontCurrentDate = document.getElementById('font-current-date');

    fontCurrentDate.innerText = getCurrentDate();
}

/**
 * @param {HTMLElement} input 
 */
function readFile(input) {
    let reader = new FileReader();
    let file = input.files[0];

    let promise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject();

        reader.readAsText(file);
    });

    document.getElementById('div-disciplines').innerHTML = '';

    promise.then(value => {
        record2.initFromJson(JSON.parse(value));
        
        record2.disciplines.forEach(x => {
            let remainingLabs = getRemainingLabs(x.labs);
            console.log(remainingLabs);
            
            appendDisciplineNameLabel(x.name, remainingLabs);
        });
    }).catch(() => alert('READ RECORD FAIL'));
};

function getCurrentDate() {
    return new Date().toDateString();
}

/**
 * @param {Lab[]} labs 
 */
function getRemainingLabs(labs) {
    let currentDate = new Date();

    return labs.filter(x => { return Date.parse(x.deliveryDate) > currentDate; } );
}