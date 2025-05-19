const kakaoLoginBtn = document.querySelector("#kakao");
const naverLoginBtn = document.querySelector("#naver");

const main = document.querySelector("main");
const userImg = document.querySelector("img");
const userName = document.querySelector("#user_name");
const logoutBtn = document.querySelector("#logout");

const KAKAO_REST_API_KEY = "02eec92bcdc6d1a0178b87fd2b4cff05";
const REDIRECT_URI = "http://127.0.0.1:5500";
// kakao login
let kakao_access_token = "";

kakaoLoginBtn.addEventListener("click", () => {
  location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
});

const renderUser = (imgUrl, nickname) => {
  userImg.src = imgUrl;
  userName.innerText = nickname;
  logoutBtn.style.display = "block";
  main.style.display = "block";
};

const deleteUserInfo = () => {
  userImg.src = "";
  userName.innerText = "";
  logoutBtn.style.display = "none";
  main.style.display = "none";
};

window.onload = () => {
  const url = new URL(location.href);
  const urlParams = url.searchParams;
  const authorizationCode = urlParams.get("code");

  if (!authorizationCode) {
    console.log("No authorization code");
    return;
  }
  axios
    .post("http://localhost:3000/kakao/login", { authorizationCode })
    .then((res) => {
      kakao_access_token = res.data;
      axios
        .post("http://localhost:3000/kakao/userinfo", { kakao_access_token })
        .then((res) => {
          const user = res.data;
          renderUser(user.profile_image, user.nickname);
        });
    });
};

logoutBtn.addEventListener("click", () => {
  axios
    .delete("http://localhost:3000/kakao/logout", {
      data: { kakao_access_token },
    })
    .then((res) => {
      deleteUserInfo();
      kakao_access_token = "";
      console.log(res.data);
    });
});
