const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const KAKAO_REST_API_KEY = "02eec92bcdc6d1a0178b87fd2b4cff05";
const REDIRECT_URI = "http://127.0.0.1:5500";

app.use(
  cors({
    origins: ["http://localhost:5500", "http://127.0.0.1:5500"],
    methods: ["OPTIONS", "POST", "DELETE"],
  })
);

app.use(express.json());

app.post("/kakao/login", (req, res) => {
  const authorizationCode = req.body.authorizationCode;

  axios
    .post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: authorizationCode,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    )
    .then((response) => res.send(response.data.access_token));
});

app.post("/kakao/userinfo", (req, res) => {
  const access_token = req.body.kakao_access_token;

  axios
    .get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
    .then((response) => {
      // console.log(response.data);
      res.send(response.data.properties);
    });
});

app.delete("/kakao/logout", (req, res) => {
  const { kakao_access_token } = req.body;
  axios
    .post("https://kapi.kakao.com/v1/user/logout", {}, {
      headers: {
        Authorization: `Bearer ${kakao_access_token}`,
      },
    })
    .then((response) => res.send('로그아웃 성공'))
    .catch((error) => {
      console.error("로그아웃 실패:", error);
      res.status(500).send("로그아웃 실패");
    });
});

app.listen(3000, () => {
  console.log("서버 열림!");
});
