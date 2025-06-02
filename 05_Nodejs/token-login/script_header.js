const form = document.querySelector("form");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginButton = document.querySelector("#login");
const logoutButton = document.querySelector("#logout");
const main = document.querySelector("main");

axios.defaults.withCredentials = true; // 쿠키를 포함한 요청을 보낼 수 있도록 설정

let accessToken = null;

const login = () => {
  const userId = usernameInput.value;
  const password = passwordInput.value;

  return axios
    .post("http://localhost:3000", { userId, password })
    .then((res) => {
      console.log(res.data);
      accessToken = res.data;
      // return res.data;
    });
};

const logout = () => {
  return (accessToken = null);
};

const getUserInfo = () => {
  return axios.get("http://localhost:3000", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const renderUserInfo = (user) => {
  usernameInput.value = "";
  passwordInput.value = "";

  form.style.display = "none";
  main.style.display = "block";

  userId.textContent = user.user_id;
  userName.textContent = user.user_name;
  userInfo.textContent = user.user_info;
  loginStatus.textContent = "로그인 상태";
};

const renderLoginForm = () => {
  form.style.display = "flex";
  main.style.display = "none";

  userId.textContent = "";
  userName.textContent = "";
  userInfo.textContent = "";
  loginStatus.textContent = "";
};

form.addEventListener("submit", (e) => e.preventDefault());
loginButton.addEventListener("click", () => {
  login()
    .then(() => getUserInfo())
    .then((response) => renderUserInfo(response.data));
});
logoutButton.addEventListener("click", () => {
  logout();
  renderLoginForm();
});

const userId = document.querySelector("#user_id");
const userName = document.querySelector("#user_name");
const userInfo = document.querySelector("#user_info");
const loginStatus = document.querySelector("#login_status");
