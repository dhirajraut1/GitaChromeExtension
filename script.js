const form = document.querySelector('form');
const slokaContainer = document.querySelector('#sloka-container');

const classes = Array.from({ length: 18 }, (_, index) => index + 1);
const verses = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78];
var gitaObj = {}

for (var i = 0; i < classes.length; i++) {
  gitaObj[classes[i]] = Array.from({ length: verses[i] }, (_, index) => index + 1);
}

console.log(gitaObj)

window.onload = function () {
  var chapterSel = document.getElementById("chapter");
  var slokaSel = document.getElementById("sloka");

  for (var x in gitaObj) {
    chapterSel.options[chapterSel.options.length] = new Option(x, x);
  }

  chapterSel.onchange = function () {
    //empty sloka dropdowns
    slokaSel.length = 1;
    if (this.selectedIndex < 1)
      return;

    //display correct values
    var y = gitaObj[this.value];
    console.log(y)
    for (var i = 1; i <= y.length; i++) {
      slokaSel.options[slokaSel.options.length] = new Option(i, i);
    }
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const chapter = document.querySelector('#chapter').value;
  const sloka = document.querySelector('#sloka').value;
  const url = `https://bhagavadgitaapi.in/slok/${chapter}/${sloka}`;


  //tried code
  // Check if data is already in local storage
  const storedData = localStorage.getItem(`gita${chapter}-${sloka}`);
  if (storedData) {
    // Data is already in local storage
    const data = JSON.parse(storedData);
    const slokaText = data.slok;
    const formattedSloka = slokaText.replace(/\n/g, '<br>');
    const translation = data.siva.et;
    slokaContainer.innerHTML = `
            <h2>||श्रीमद्‍भगवद्‍-गीता ${chapter}.${sloka}||</h2>
            <h3>${formattedSloka}</h3>
            <br>
            <p><strong>Translation:</strong> ${translation}</p>
          `;
  } else {
    // Data is not in local storage, make API request
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Store data in local storage
        localStorage.setItem(`gita${chapter}-${sloka}`, JSON.stringify(data));
        // Use the data as needed
        const slokaText = data.slok;
        const formattedSloka = slokaText.replace(/\n/g, '<br>');
        const translation = data.siva.et;
        slokaContainer.innerHTML = `
            <h2>||श्रीमद्‍भगवद्‍-गीता ${chapter}.${sloka}||</h2>
            <h3>${formattedSloka}</h3>
            <br>
            <p><strong>Translation:</strong> ${translation}</p>
          `;
      })
      .catch(error => console.error(error));
  }

  //

  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => {
  //     const slokaText = data.slok;
  //     const formattedSloka = slokaText.replace(/\n/g, '<br>');
  //     const translation = data.siva.et;
  //     slokaContainer.innerHTML = `
  //           <h2>||श्रीमद्‍भगवद्‍-गीता ${chapter}.${sloka}||</h2>
  //           <h3>${formattedSloka}</h3>
  //           <br>
  //           <p><strong>Translation:</strong> ${translation}</p>
  //         `;
  //   })
  //   .catch(error => console.error(error));
});