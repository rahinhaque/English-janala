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
            const removeActive=()=>{
                const lessonButtons = document.querySelectorAll(".lesson-btn")
                console.log(lessonButtons)

                lessonButtons.forEach((btn)=> btn.classList.remove("active"));
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
        console.log(word.word );

        const card = document.createElement('div');
        card.innerHTML = `
            <div class="bg-white rounded-md shadow-sm text-center py-10 px-5 space-y-5">
            <h2 class="font-bold text-2xl ">${word.word ? word.word: "Words not found"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>

            <div class="font-semibold text-2xl font-bangla">"${word.meaning ? word.meaning : "words not found yet"} / ${word.pronunciation ? word.pronunciation : "words not found"}</div>
            <div class="flex justify-between items-center">
                <button onClick="my_modal_5.showModal()" class="btn bg-[#1A91FF10]  hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10]  hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `

        wordContainer.append(card);
    }
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