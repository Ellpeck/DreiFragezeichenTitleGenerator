let data;
$.getJSON("data.json", function (result) {
    data = result;
    generate();
});

$("#new").on('click', function () {
    generate();
})

function generate() {
    let result = data.nouns[Math.floor(Math.random() * data.nouns.length)];
    let appendSuffix = false;

    // replace prefixes
    if (result.indexOf("[prefixes]") > 0) {
        let prefix = data.prefixes[Math.floor(Math.random() * data.prefixes.length)];
        result = result.replace("[prefixes]", prefix);
    }

    // replace adjectives
    if (result.indexOf("[adjectives") > 0) {
        let value = "";
        if (Math.random() <= 0.5) {
            let adjective = data.adjectives[Math.floor(Math.random() * data.adjectives.length)];
            value = `${adjective}$1 `;
        } else {
            appendSuffix = true;
        }
        result = result.replace(/\[adjectives(?:\+(.*))?\]/, value);
    }

    // append suffix
    if (appendSuffix) {
        let suffix = data.suffixes[Math.floor(Math.random() * data.suffixes.length)];
        result += suffix;
    }

    $("#title").html(`und ${result}`);
}