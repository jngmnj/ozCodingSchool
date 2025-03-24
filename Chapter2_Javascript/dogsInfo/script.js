// https://dog.ceo/api/breeds/list/all
const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/100";
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all";
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

// request.open("GET", "https://dog.ceo/api/breeds/list/all");
// request.send();



const header = document.querySelector("#header");
const main = document.querySelector("#main");
const input = document.querySelector("#filter-text"); 
const button = document.querySelector("#filter-button");
const select = document.querySelector("#filter-select");

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

select.addEventListener("change", function (e) {
    main.innerHTML = "";
    const selectedBreed = e.target.value;
    console.log(selectedBreed);
    
    let filteredDogs = currentDogs.filter((item) => item.indexOf(selectedBreed) !== -1);

    filteredDogs.forEach((item) => makeDogList(item));
});