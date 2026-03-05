const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btn = document.createElement("button");
    btn.className =
      "flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-semibold text-gray-700 cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all duration-200";
    btn.innerHTML = `<span class="text-indigo-600 text-base"><i class="fa-brands fa-leanpub"></i></span> Lesson -${lesson.level_no}`;
    levelContainer.appendChild(btn);
  }
};

loadLessons();
