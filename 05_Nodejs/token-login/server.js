const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const users = [
  {
    user_id: "test",
    password: "1234",
    user_name: "테스트 유저",
    user_info: "테스트 유저입니다.",
  },
];
const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const secretKey = "secretTokenKey"; // JWT 비밀키

app.get("/", (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(accessToken, secretKey);
  if (!payload) {
    return res
      .status(401)
      .json({ success: false, message: "사용자 정보조회 실패" });
  }
  const userInfo = users.find((el) => el.user_id === payload.user_id);
  return res.json(userInfo);
});


app.post("/", (req, res) => {
  const { userId, password } = req.body;
  const userInfo = users.find(
    (user) => user.user_id === userId && user.password === password
  );

  if (!userInfo) {
    return res.status(401).json({ success: false, message: "로그인 실패" });
  }
  const accessToken = jwt.sign(
    { user_id: userInfo.user_id },
    secretKey,
    { expiresIn: 1000 * 60 * 10 } // 10분
  );
  return res.send(accessToken);
});

app.listen(3000, () => {
  console.log("서버실행 http://localhost:3000");
});
