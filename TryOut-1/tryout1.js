var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;
    var allWords = regex(data);
    allWords = allWords.trim();
    allWords = allWords.split(" ");
    console.log("Jumlah semua kata: " + allWords.length);
    console.log("Jumlah kata yang unik: " + countUniqueWords(allWords).length);
    countDuplicateWords(countUniqueWords(allWords), allWords);
    console.log("Ada " + isNumeric(countUniqueWords(allWords)).length + " angka: " + isNumeric(countUniqueWords(allWords)));
    console.log("Jumlah semua angka: " + addUniqueNumbers(isNumeric(countUniqueWords(allWords))));
});

function regex(data) {
    return data.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,"");
}

function countUniqueWords(data) {
    let unique = [...new Set(data.map(item => item))];
    return unique;
}

function countDuplicateWords(data, allWords) {
    console.log("Jumlah kata yang unik dan jumlahnya masing-masing: ");
    var count = 0;
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < allWords.length; j++) {
            if (data[i] == allWords[j]) {
                count++;
            }
        }
        console.log(data[i] + ": " + count);
        count = 0;
    }
}

function isNumeric(data) {
    var number = [];
    for (var i = 0; i < data.length; i++) {
        if (!isNaN(parseFloat(data[i])) && isFinite(data[i])) {
            number.push(data[i]);
        }
    }
    return number;
}

function addUniqueNumbers(data) {
    var result = 0;
    for (var i = 0; i < data.length; i++) {
        result = result + parseInt(data[i]);
    }
    return result;
}
