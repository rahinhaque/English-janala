const loadlesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displaylesson(json.data))

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
        <button class="btn btn-outline btn-primary flex items-center">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>
        
        `



        // 4. appned into container
        levelContainer.append(btnDiv);
    }





}

loadlesson();