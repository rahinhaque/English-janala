const createElement = (arr) => {
    const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
    console.log(htmlElement);
}

const synonyms = ["Hello", "Hi", "Konnichiwa"];
createElement(synonyms);
