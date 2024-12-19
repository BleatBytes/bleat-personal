const $demoTitle = document.querySelector('.journalEntry h1');
const $demoContent = document.querySelector('.journalContent');
const $demoAuthor = document.querySelector('.journalAuthor');
const $demoTime = document.querySelector('.journalFooter time');
const $placeholderText = document.querySelector('#newJournalText');

const pholders = [
    "Had the best breakfast today...",
    "Something great happened!",
    "Did you know that (...)?",
    "Met this new person today...",
    "Here's my opinion on...",
    "Today I found out about...",
    "My best friend said that...",
    "I'm angry about...",
    "I've been sad lately about...",
    "Here's my review of..."
];

var rando;

const randoPholder = function() {
    rando = Number(randoMath(pholders.length, 0));
    $placeholderText.placeholder = pholders[rando];
}();

const randoChoice = async function readJSON() {
    fetch('assets/RandomEntries/RandomEntries.json')
        .then(response => {
            if (!response.ok) {
                $demoTitle.innerHTML = "Something has happened";
                $demoContent.innerHTML = 'Something happened that made the page not load this particular part of it correctly. If this is a repeated occurrence, please <a href="https://github.com/BleatBytes/html-article-builder/issues">let me know</a>';
                $demoAuthor.innerHTML = "By the creator.";
                $demoTime.innerHTML = "Right now.";
                throw new Error (`Couldn't read RandomEntries.json. HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            const fillers = json;
            rando = Number(randoMath(fillers.length, 0));
            $demoTitle.innerHTML = fillers[rando].title;
            $demoContent.innerHTML = fillers[rando].content;
            $demoAuthor.innerHTML = fillers[rando].author;
            $demoTime.innerHTML = fillers[rando].time;
            return fillers;
        })
        .catch(function() {
            this.dataError.true;
        });
}();

const funChange = function() {
    rando = Number(randoMath(1000, 0));
    if (rando === 1) {
        document.querySelector('#newJournalTitle').placeholder = "My new EVIL entry >:)";
        $placeholderText.placeholder = "Had an EVIL day doing EVIL THINGS because I am EVIL FOREVER!!!! >:)"
        document.querySelector('#newJournalAuthor').placeholder = "EVIL John Doe >:)";
        console.log("You've summoned Evil John Doe! He has a 1/1000th chance of appearing. Congrats! >:)");
    };
}();

function randoMath(max, min) {
    const calc = Math.floor(Math.random() * (max - min)) + min;
    return calc;
};

/* Template:
{
    "title": "",
    "content": "",
    "author": "",
    "time": 
},
*/