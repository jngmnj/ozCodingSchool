const form = document.querySelector('#form');
const container = document.querySelector("#container");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData); // formData를 객체로 변환
    // console.log(data);

    // 유효성 검사
    if (data.id < 6) {
        alert('아이디는 6자 이상이어야 합니다.');
        return;
    }
    if (data.password !== data.passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    // 가입완료
    container.innerHTML = `
        <h1>가입완료</h1>
        <p>${data.id}님 환영합니다!</p>
        <br/>
        <h2>가입정보</h2>
        <div>아이디: ${data.id}</div>
        <div>이름: ${data.name}</div>
        <div>전화번호: ${data.phone}</div>
        <div>원하는 직무: ${data.position}</div>
    `;
});