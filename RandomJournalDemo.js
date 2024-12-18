const $demoTitle = document.querySelector('.journalEntry h1');
const $demoContent = document.querySelector('.journalContent');
const $demoAuthor = document.querySelector('.journalAuthor');
const $demoTime = document.querySelector('.journalFooter time');

const randoChoice = async function readJSON() {
    fetch('RandomEntries.json')
        .then(response => {
            if (!response.ok) {
                $demoTitle.innerHTML = "Something has happened";
                $demoContent.innerHTML = 'Something happened that made the page not load this particular part of it correctly. If this is a repeated occurrence, please <a href="https://github.com/BleatBytes/html-article-builder/issues">let me know</a>';
                $demoAuthor.innerHTML = "By the creator.";
                $demoTime.innerHTML = "Right now.";
                throw new Error ("Couldn't read RandomEntries.json. HTTP error " + response.status);
            }
            return response.json();
        })
        .then(json => {
            const fillers = json;
            const rando = Number(randoMath(fillers.length, 0));

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

function randoMath(max, min) {
    const calc = Math.floor(Math.random() * (max - min)) + min;
    console.log(calc);
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