const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // 인증정보를 저장할수있도록 설정
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.cookie("test-cookie", "test-value" , {
    maxAge: 1000 * 60 * 60 * 24, // 쿠키의 유효기간을 1일로 설정
    httpOnly: true, // 자바스크립트에서 쿠키를 접근할 수 없도록 설정
    secure: true, // https에서만 쿠키를 전송하도록 설정
    sameSite: "None", // 크로스 도메인에서 쿠키를 전송하도록 설정
  });
  res.send("쿠키 생성 완료");
});

app.delete("/", (req, res) => {
  res.clearCookie("test-cookie", {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });  // 생성할때 설정한 옵션과 동일하게 설정해야 쿠키가 삭제됨
  res.send("쿠키 삭제 완료");
});

app.listen(3000, () => {
  console.log("서버가 http://localhost:3000 에서 실행중입니다.");
});
