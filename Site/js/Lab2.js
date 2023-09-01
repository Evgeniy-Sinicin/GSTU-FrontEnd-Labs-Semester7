var _res1 = '';
var _res2 = '';

function isAnagram() {
    var val1 = String(document.getElementById('input-first').value).toLowerCase();
    var val2 = String(document.getElementById('input-second').value).toLowerCase();
    
    var arr1 = Array.from(val1);
    var arr2 = Array.from(val2);

    arr1.sort();
    arr2.sort();

    _res1 = arr1.join('');
    _res2 = arr2.join('');

    var fontAns = document.getElementById('font-answer-anagram');

    if (_res1 == _res2) {
        fontAns.innerHTML = 'True';
        fontAns.classList.remove('red');
        fontAns.classList.add('green');
    }
    else {
        fontAns.innerHTML = 'False';
        fontAns.classList.remove('green');
        fontAns.classList.add('red');
    }
}

function removeVowels(text) {
    var arr1 = Array.from(text);
    var arr2 = [''];

    arr1.forEach(x => {
        if (x != 'a' &&
            x != 'e' &&
            x != 'i' &&
            x != 'o' &&
            x != 'u' &&
            x != 'y' &&
            x != 'A' &&
            x != 'E' &&
            x != 'I' &&
            x != 'O' &&
            x != 'U' &&
            x != 'Y' &&
            x != 'а' &&
            x != 'у' &&
            x != 'о' &&
            x != 'ы' &&
            x != 'и' &&
            x != 'э' &&
            x != 'я' &&
            x != 'ю' &&
            x != 'е' &&
            x != 'ё' &&
            x != 'А' &&
            x != 'У' &&
            x != 'О' &&
            x != 'Ы' &&
            x != 'И' &&
            x != 'Э' &&
            x != 'Я' &&
            x != 'Ю' &&
            x != 'Е' &&
            x != 'Ё') {
            arr2.push(x);
        }
    });

    document.getElementById('font-for-removing-vowels').innerHTML = arr2.join('');
}

function bubbleSort(text) {
    let arr = Array.from(String(text).trim().split(' ')).map(Number);

    for (let i = 0, endI = arr.length - 1; i < endI; i++) {
        let wasSwap = false;

        for (let j = 0, endJ = endI - i; j < endJ; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                wasSwap = true;
            }
        }

        if (!wasSwap) break;
    }

    document.getElementById('font-for-numbers-sort').innerHTML = arr;
}

function sortDates() {
    var div = document.getElementById('dates');
    var datesCount = 5;
    var startDate = new Date(2000, 1, 1);
    var endDate = new Date(2020, 1, 1);
    var dates = [
        new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())),
        new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())),
        new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())),
        new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())),
        new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
    ];

    dates.sort((a, b) => a - b);
    div.innerHTML = '';

    for (let i = 0; i < datesCount; i++) {
        var p = document.createElement('p');

        if (i > 0) {
            p.innerHTML = 'Up Difference ' + getDateDifference(dates[i], dates[i - 1]) + ' ';
        }

        var font = document.createElement('font');
        
        font.innerHTML = dates[i].toDateString();
        font.classList.add('yellow');
        font.classList.add('bold');
        p.appendChild(font);

        if (i < datesCount - 1) {
            p.innerHTML += ' Down Difference ' + getDateDifference(dates[i], dates[i + 1]);
        }

        div.appendChild(p);
    }
}

function getDateDifference(date1, date2) {
    var days = Math.abs(date1.getDate() - date2.getDate());
    var monthes = Math.abs(date1.getMonth() - date2.getMonth());
    var years = Math.abs(date1.getFullYear() - date2.getFullYear());

    return '[Days: ' + days + '; Monthes: ' + monthes + '; Years: ' + years + ']';
}