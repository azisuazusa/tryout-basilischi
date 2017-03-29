var request = require('request');

request(process.argv[2], function(error, response, body) {
    var html = (response.headers['content-type'].includes('text/html')) ? ' ' : ' not ';
    console.log('The result is' + html + 'HTML');
    console.log('The title is ' + getTitle(body));
});

function getTitle(body) {
    var reg = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
    var str = body.toString();
    var match = reg.exec(str);
    if (match && match[2]) {
        return match[2];
    }
}
