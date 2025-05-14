const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

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

app.use(
  session({
    secret: "session secret", // 세션 암호화 키
    resave: false, // 세션이 수정되지 않아도 매 요청마다 세션을 다시 저장할지 설정
    saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 설정
    name: "session_id", // 세션 쿠키 이름
  })
);

app.get("/", (req, res) => {
  const userInfo = users.find((el) => el.user_id === req.session.user?.user_id);
  return res.json(userInfo);
});

app.delete("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "로그아웃 실패" });
    }
    // destroy() 메서드로 세션을 삭제한 후 쿠키도 삭제
    res.clearCookie("session_id", { path: "/" });
    return res.json({ success: true, message: "로그아웃 성공" });
  });
});

app.post("/", (req, res) => {
  // console.log(req.body);
  const { userId, password } = req.body;
  const userInfo = users.find(
    (user) => user.user_id === userId && user.password === password
  );

  if (!userInfo) {
    return res.status(401).json({ success: false, message: "로그인 실패" });
  }
  req.session.user = userInfo.user_id; // 세션에 사용자 id 저장
  return res.send("로그인 성공! 세션 생성 완료!");
});

app.listen(3000, () => {
  console.log("서버실행 http://localhost:3000");
});
