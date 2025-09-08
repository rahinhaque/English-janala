const loadlesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displaylesson(json.data))

}
const loadLevelWord = (id) => {

    const url = `https://openapi.programming-hero.com/api/level/${id}`
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const removeActive = () => {
                const lessonButtons = document.querySelectorAll(".lesson-btn")
                console.log(lessonButtons)

                lessonButtons.forEach((btn) => btn.classList.remove("active"));
            }
            removeActive()

            const clickBtn = document.getElementById(`lesson-level-${id}`)
            // console.log(clickBtn);
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        })
}







// id
// : 
// 77
// level
// : 
// 1
// meaning
// : 
// "যাওয়া"
// pronunciation
// : 
// "গো"
// word
// : 
// "Go"

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `<div class="text-center col-span-full py-15 ">
            <img class ="mx-auto" src="./assets/alert-error.png"/>
            <p class="font-bangla text-gray-500 py-5">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-semibold text-4xl font-bangla ">নেক্সট Lesson এ যান</h2>
        </div>`;
        return;
    }


    for (let word of words) {
        console.log(word.word);

        const card = document.createElement('div');
        card.innerHTML = `
            <div class="bg-white rounded-md shadow-sm text-center py-10 px-5 space-y-5">
            <h2 class="font-bold text-2xl ">${word.word ? word.word : "Words not found"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>

            <div class="font-semibold text-2xl font-bangla">"${word.meaning ? word.meaning : "words not found yet"} / ${word.pronunciation ? word.pronunciation : "words not found"}</div>
            <div class="flex justify-between items-center">
                <button onClick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10]  hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10]  hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `

        wordContainer.append(card);
    }
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`

    const res = await fetch(url)
    const details = await res.json();
    displayWordsDetails(details.data);
}

// id
// : 
// 3
// level
// : 
// 2
// meaning
// : 
// "সতর্ক"
// partsOfSpeech
// : 
// "adjective"
// points
// : 
// 2
// pronunciation
// : 
// "কশাস"
// sentence
// : 
// "Be cautious while crossing the road."
// synonyms
// : 
// (3) ['careful', 'alert', 'watchful']
// word
// : 
// "Cautious"


const displayWordsDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById('details-container')
    detailsBox.innerHTML = `
         <div>
            <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
        </div>
        <div>
            <h2 class=" font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
        <div>
            <h2 class=" font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>
        <div>
            <h2 class=" font-bold">Synonymes</h2>
            <span class="btn">Sync1</span>
            <span class="btn">Sync1</span>
            <span class="btn">Sync1</span>
        </div>

     `
    document.getElementById('word_modal').showModal();
}

const displaylesson = (lessons) => {
    // 1. Get the container and empty it
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";



    // 2.GEt into every lessons
    for (let lesson of lessons) {
        // 3. create element
        console.log(lesson)
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="lesson-level-${lesson.level_no}" onclick = "loadLevelWord( ${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn flex items-center">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>
        
        `



        // 4. appned into container
        levelContainer.append(btnDiv);
    }





}

loadlesson();