// "Simple" options
var $userTitle = document.querySelector('#newJournalTitle');
var $userText = document.querySelector('#newJournalText');
var $userAuthor = document.querySelector('#newJournalAuthor');
// "Advanced" options
var $advOptions = document.querySelector('#DEMOadvanced'); // Whole "Advanced" options div
var $userArtClass = document.querySelector('#newJournalClass');
var $userTextClass = document.querySelector('#newJournalTextClass');
var $userAuthorClass = document.querySelector('#newJournalAuthorClass');
var $userFooterClass = document.querySelector('#newJournalFooterClass');
// Mode select dropdowns and checks
var $modeSelect = document.querySelector('select.modeSelect');
var $dateSeparator = document.querySelector('#replaceDateChar');
var $dayFormat = document.querySelector('select#newJournalDatetime');
var $hourFormat = document.querySelector('select#newJournalHourFormat');
// Non-element vars
var $date;
var separator = "/";


// Gets the current day and time for <time>
function todayHandle() {
  var today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth()+1).padStart(2, '0');
  const year = String(today.getUTCFullYear());
  const hour = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  var timezone;
  const timezoneHandle = function() {
    let fullOffset = Number(today.getTimezoneOffset());
    let calcOffset = Math.floor(fullOffset / 60);
    let offsetSign = calcOffset<=0?"":"+";
    let offsetHours = offsetSign + String(calcOffset).padStart(2, '0');
    let offsetMinutes = String(fullOffset % 60).padStart(2, '0');
    timezone = offsetHours + ":" + offsetMinutes; // Timezones behind UTC are +; ahead, -
  }();
  $date = [today, day, month, year, hour, minutes, timezone];
};

// Handles the datetime attribute in specific
function getDatetime() {
  return $date[3] + "-" + $date[2] + "-" + $date[1] + " " + $date[4] + ":" + $date[5] + $date[6];
};

// Handles the visible/"readable" date in <time>
function getStringTime() {
  var $dayFormat = document.querySelector('select#newJournalDatetime');
  $dayFormat = String($dayFormat.value);
  const day = $date[1]
  const month = $date[2]
  var year;
  var hour;
  switch (true) {
    case /[\/-]Y{2}$/.test($dayFormat):
    case /^Y{2}[\/-]/.test($dayFormat):
      year = $date[3].slice(-2);
      break;
    default:
      year = $date[3];
  };
  switch (true) {
    case /^D{2}/.test($dayFormat):
      return day + separator + month + separator + year;
      break;
    case /^M{2}/.test($dayFormat):
      return month + separator + day + separator + year;
      break;
    default:
      return year + separator + month + separator + day;
  };
};

// Handles the displayed visible/"readable" hour in <time>
function getHour() {
  const hourFormat = document.querySelector('select#newJournalHourFormat');
  const rawHour = $date[4];
  var AMPM = Number(rawHour) >= 12 ? "PM" : "AM";
  const halfHour = (rawHour%12) || 12;
  if (hourFormat.value === "halfDay") {
    return String(halfHour).padStart(2, '0') + ":" + $date[5] + AMPM;
  } else {
    return rawHour + ":" + $date[5];
  };  
};

// Mode selection
$modeSelect.addEventListener("change", function() {
  switch(true) {
    case this.value === "beginner":
      $advOptions.style.setProperty('display', 'none');
      break;
    case this.value === "advanced":
      $advOptions.style.setProperty('display', '');
  };
  this.value === "beginner" && console.log("Beginner mode selected");
  this.value === "advanced" && console.log("Advanced mode selected");
});
// Separator handle
$dateSeparator.addEventListener("change", function(event) {
  var dateFormat = $dayFormat.value;
  if ($dateSeparator.checked) {
    (/\//.test(dateFormat)) && (separator = "-");
    (/-/.test(dateFormat)) && (separator = "/");
  };
});

// Adds linebreaks
$userText.addEventListener('keyup', function(event) {
  let extraSpace = `<br>
`;
  if (event.key === "Enter") {
    $userText.value += extraSpace;
  };
});

// Checks if all necessary fields in "Simple mode" have information in them before running
function evalForm () {
  switch(true) {
    case $userTitle.value.length === 0:
    case $userText.value.length === 0:
    case $userAuthor.value.length === 0:
      alert("Fill out all the fields before submitting!");
      break;
    default:
      newEntry();
  };
};

// Returns a default value if the optional field is empty
function optionalFieldsHandle(source) {
  if (source.value.length === 0) {
    return source.placeholder;
  } else {
    return source.value;
  };
};

// Creates the journal entry
function newEntry() {
  todayHandle(); // For the date handlers to work correctly
  const entryTemplate = `
  <h1>${$userTitle.value}</h1>
  <section class="${optionalFieldsHandle($userTextClass)}">${$userText.value}
  </section>
  <footer>
  <p class="${optionalFieldsHandle($userFooterClass)}">
    By <span class="${optionalFieldsHandle($userAuthorClass)}">${$userAuthor.value}.</span> <time datetime="${getDatetime()}">${getStringTime()}, ${getHour()}.</time>
  </p>
  </footer>
`;

  const newDemo = document.createElement('article');
  
  newDemo.className = optionalFieldsHandle($userArtClass);
  newDemo.innerHTML = entryTemplate;
  document.querySelector('.journalEntry').innerHTML = newDemo.innerHTML;
  document.querySelector('#DEMOcopypaste').value = newDemo.outerHTML;
};

// Context menu for the user input textarea