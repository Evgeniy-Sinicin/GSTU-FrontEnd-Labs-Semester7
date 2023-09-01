function task1() {
    var fontInit = document.getElementById('font-initial-task1');
    var fontCode = document.getElementById('font-code-task1');
    var fontDivisible = document.getElementById('font-divisible-task1');
    var fontAnswer = document.getElementById('font-answer-task1');
    // var length = Math.round(Math.random() * 10) + 1;
    var length = 10;
    var string = generateRandomString(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var arr = Array.from(string);

    fontInit.innerHTML = arr;

    arr = arr.map(function(x) {
        return Number.parseInt(x.charCodeAt());
    });

    fontCode.innerHTML = arr;

    arr = arr.filter(x => {
        return x % 5;
    });

    fontDivisible.innerHTML = arr;

    arr = arr.map(x => {
        return String.fromCharCode(x);
    });

    fontAnswer.innerHTML = arr;
}

function generateRandomString(length, characters) {
    var result = '';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function task2() {
    var fontInit = document.getElementById('font-initial-task2');
    var fontDivisable = document.getElementById('font-divisible-task2');
    var fontSorted = document.getElementById('font-sorted-task2');
    var minVal = Number.parseInt(document.getElementById('inp-min-task2').value);
    var maxVal = Number.parseInt(document.getElementById('inp-max-task2').value);
    var length = 20;
    var arr = [];

    for (var i = 0; i < length; i++) {
        arr.push(getRandomNumber(minVal, maxVal));
    }

    fontInit.innerHTML = arr;

    arr = arr.filter(x => {
        return !(Number.parseInt(x) % 10);
    });

    fontDivisable.innerHTML = arr;

    arr = arr.sort((a, b) => b - a);

    fontSorted.innerHTML = arr;
}

function onArithmeticMeanInput(val) {
    var fontArithmeticMean = document.getElementById('font-arithmetic-mean-task3');
    var arr = Array.from(String(val).trim().split(' ')).map(Number);

    fontArithmeticMean.innerHTML = arr.reduce(function(sum, current) {
        return sum + current;
    }) / arr.length;
}

function onHarmonicMeanInput(val) {
    var fontHarmonicMean = document.getElementById('font-harmonic-mean-task3');
    var arr = Array.from(String(val).trim().split(' ')).map(Number);

    fontHarmonicMean.innerHTML = arr.length / arr.reduce(function(sum, current) {
        return sum + 1 / current;
    });
}

function task4() {
    var length = 20;
    var names = [
        'Евгений',
        'Александр',
        'Валерия',
        'Юрий',
        'Диана',
        'Иван',
        'Игорь',
        'Станислав',
        'Виталий',
        'Софья'
    ];
    var people = [];

    for (var i = 0; i < length; i++) {
        people.push(new Person(names[getRandomNumber(0, names.length - 1)], getRandomNumber(6, 30)));
    }

    var p = document.getElementById('p-task4');

    p.innerHTML = '';
    people.forEach(x => p.innerHTML += x.greet() + '<br/>');
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return 'Hi! I am <font class="yellow">' + this.name + '</font>. I am <font class="yellow">' + this.age + '</font> years old <font class="yellow">:)</font>';
    }
}