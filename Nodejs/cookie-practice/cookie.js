const setCookieButton = document.querySelector("#set_cookie");
const deleteCookieButton = document.querySelector("#delete_cookie");

// axios의 기본값으로 credentials를 true로 설정합니다.
axios.defaults.withCredentials = true; 

setCookieButton.addEventListener("click", () => {
  axios.get("http://localhost:3000").then((response) => {
    console.log(response);
  });
});

deleteCookieButton.addEventListener("click", () => {
  axios.delete("http://localhost:3000").then((response) => {
    console.log(response);
  });
});
