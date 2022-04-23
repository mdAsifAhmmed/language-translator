const fromText = document.querySelector(".from-text")
const toText = document.querySelector(".from-to")
const exchangeIcon = document.querySelector(".exchange")
const selectTag = document.querySelectorAll("select")
const translatorBtn = document.querySelector(".translator-btn")
const icons = document.querySelectorAll(".row i")

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {

        let selected;

        if (id == 0 && country_code == "en-GB") {
            selected = "selected"
        } else if (id == 1 && country_code == "bn-IN") {
            selected = "selected"
        }
        // country code cuntry selected
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option) // adding option tag inside select tag

    }
})

exchangeIcon.addEventListener('click', () => {
    // exchange textarea values
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;
    // exchange select Language values
    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value
    selectTag[1].value = tempLang
})

translatorBtn.addEventListener('click', () => {
    let text = fromText.value;
    translateFrom = selectTag[0].value // geeting fromSelect tar value
    translateTo = selectTag[1].value // getting toSelect tag value
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...")
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            toText.value = data.responseData.translatedText;
            toText.setAttribute("placeholder", "Translation")
        })
})

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            // if you click copy icon and right now textarea value copy and if you click diferent textarea then copy textarea value
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value)
            } else {
                navigator.clipboard.writeText(toText.value)
            }
        } else {
            // if you Writing any text from textarea and this textarea text to spoken
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = selectTag[1].value
            }
            speechSynthesis.speak(utterance)
        }
    })
})