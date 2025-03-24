// https://dog.ceo/api/breeds/list/all
const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/40";
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all";
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

const header = document.querySelector("#header");
const main = document.querySelector("#main");
const input = document.querySelector("#filter-text"); 
const button = document.querySelector("#filter-button");
const resetBtn = document.querySelector("#filter-reset");
const select = document.querySelector("#filter-select");
const moreBtn = document.querySelector(".btn-more");
const totopBtn = document.querySelector(".btn-totop");

const currentDogs = [];

const makeDogList = (data) => {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("dog-item");
    imgDiv.innerHTML = `<img src="${data}" alt="dog" />`;
    main.appendChild(imgDiv);
}

window.addEventListener("load", function () {
    console.log("load");
    // 강아지 사진 뿌리기
  request1.open("GET", apiRandomDogs);
  request1.addEventListener("load", function () {
    const response = JSON.parse(request1.response);
    response.message.forEach((item) => {
        currentDogs.push(item);
        makeDogList(item);
    });
  });
  request1.send();

  // select 견종 뿌리기 
  request2.open("GET", apiAllBreeds);
  request2.addEventListener("load", function () {
    const response = JSON.parse(request2.response);
    const breeds = Object.keys(response.message);
    breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed;
        option.textContent = breed;
        select.appendChild(option);
    });
  });
    request2.send();
});

button.addEventListener("click", function (e) {
    e.preventDefault()
    main.innerHTML = "";
    let filteredDogs = currentDogs.filter(
      (item) => item.indexOf(input.value) !== -1
    ); 
    input.value = "";
    filteredDogs.forEach((item) => makeDogList(item));
});

resetBtn.addEventListener("click", function () {
    main.innerHTML = "";
    request1.open("GET", apiRandomDogs);
    request1.addEventListener("load", function () {
        const response = JSON.parse(request1.response);
        currentDogs.length = 0;
        response.message.forEach((item) => {
            currentDogs.push(item);
            makeDogList(item);
        });
    });
    request1.send();

});
select.addEventListener("change", function (e) {
    main.innerHTML = "";
    const selectedBreed = e.target.value;
    console.log(selectedBreed);
    
    let filteredDogs = currentDogs.filter((item) => item.indexOf(selectedBreed) !== -1);

    filteredDogs.forEach((item) => makeDogList(item));
});

moreBtn.addEventListener("click", function () {
    request1.open("GET", apiRandomDogs);
    request1.addEventListener("load", function () {
        const response = JSON.parse(request1.response);
        response.message.forEach((item) => {
            currentDogs.push(item);
            makeDogList(item);
        });
    });
    request1.send();
});

window.addEventListener("scroll", function () {
    console.log(window.screenY);
    window.scrollY > 100
      ? totopBtn.classList.add("show")
      : totopBtn.classList.remove("show");
});

totopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});