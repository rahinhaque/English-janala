const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickedBtn = document.getElementById(
        `lesson-btn-${id}`,
      );
      clickedBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const removeActive = () =>{
  const lessonButton = document.querySelectorAll(".lesson-btn");
  lessonButton.forEach(btn=>  btn.classList.remove("active"))

}

const loadWordDetails=async(id)=>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const detials = await res.json();
  displayWordDetails(detials.data);
}
const displayWordDetails=(word)=>{
  const detialsContainer = document.getElementById("details-container");
  detialsContainer.innerHTML = `


    <div class="div bg-gray-900 px-6 py-5">
    <h2 class="text-2xl font-bold text-white flex items-center gap-2">
      ${word.word} ( <i class="fa-solid fa-microphone-lines text-orange-400 text-lg"></i> : ${word.pronunciation})
    </h2>
  </div>

  <div class="div px-6 py-4 border-b border-gray-100">
    <h2 class="font-bold text-xs uppercase tracking-widest text-orange-500 mb-1">Meaning</h2>
    <p class="text-gray-700 text-sm leading-relaxed">${word.meaning}</p>
  </div>

  <div class="div px-6 py-4 border-b border-gray-100">
    <h2 class="font-bold text-xs uppercase tracking-widest text-orange-500 mb-1">Example Sentence</h2>
    <p class="text-gray-700 text-sm leading-relaxed">${word.sentence}</p>
  </div>

  <div class="div px-6 py-4 flex flex-wrap gap-2 items-center">
    <h2 class="font-bold text-xs uppercase tracking-widest text-orange-500 w-full mb-1">Synonym</h2>
    <span class="btn border border-gray-300 text-gray-700 text-sm px-4 py-1.5 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all cursor-pointer">Sp1</span>
    <span class="btn border border-gray-300 text-gray-700 text-sm px-4 py-1.5 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all cursor-pointer">Sp1</span>
    <span class="btn border border-gray-300 text-gray-700 text-sm px-4 py-1.5 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all cursor-pointer">Sp1</span>
  </div>

  
  `;
  document.getElementById("my_modal_5").showModal();
}

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
  
    <div class="text-center col-span-full space-y-5 p-20">
        <img class="mx-auto" src="assets/alert-error.png" alt="">
        <p class="font-bangla text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-3xl font-bangla">নেক্সট Lesson এ যান</h2>
      </div>
  
  `;
    return;
  }

  words.forEach((word) => {
    // console.log(word);

    // level: 1;
    // meaning: "আগ্রহী";
    // pronunciation: "ইগার";
    // word: "Eager";
    const div = document.createElement("div");
    div.innerHTML = `

   <div class="bg-white rounded-xl shadow-sm text-center space-y-5 px-5 py-10">
        <h2 class="font-bold text-4xl">${word.word ? word.word : "Words not found"}</h2>
        <p class="text-md font-semibold">Meaning /Pronounciation</p>

        <div class="text-2xl">"${word.meaning ? word.meaning : "Meaning not found"}/ ${word.pronunciation ? word.pronunciation : "Pronunciation not found"}"</div>

        <div class="flex justify-between items-center">
 
          <button onclick="loadWordDetails(${word.id})" class="btn border border-none bg-slate-200 rounded-md p-2 hover:bg-cyan-200"><i class="fa-solid fa-info"></i></button>
          <button class="btn border border-none bg-slate-200 rounded-md p-2 hover:bg-cyan-200"><i class="fa-solid fa-volume-high"></i></button>

        </div>
      </div>

  
  `;

    wordContainer.append(div);
  });
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const div = document.createElement("div");
    div.innerHTML = `<div id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="flex lesson-btn items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-semibold text-gray-700 cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all duration-200"><span class="text-indigo-600 text-base"><i class="fa-brands fa-leanpub"></i></span> Lesson -${lesson.level_no}</div>`;

    levelContainer.appendChild(div);
  }
};

loadLessons();
