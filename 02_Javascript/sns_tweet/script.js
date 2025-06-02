/* -----------------------------------------------------------------------------*/
// <요구사항>
// 1. input에 트윗을 입력하고 '게시'버튼을 누르면 트윗이 생성되어야 합니다.
// 2. 생성된 트윗은 게시글, 좋아요 버튼, 좋아요 카운트하는 요소를 포함해야 합니다.
// 3. input에 아무것도 입력되어 있지 않으면 트윗이 생성되지 않아야 합니다. (if문)
// 4. 좋아요 버튼을 클릭하면 좋아요 카운트가 1씩 증가해야 합니다.
// 5. styles.css 파일을 보고 새롭게 생성한 요소에 class를 추가하면 미리 작성해둔 스타일이 적용됩니다.
// 6. 스타일은 마음껏 수정해도 좋습니다.
/* -----------------------------------------------------------------------------*/
// 트윗 게시 버튼 요소
const postTweet = document.querySelector("#postTweet");
postTweet.addEventListener("click", function () {
  const tweetInput = document.querySelector("#tweetInput");
  const tweetsContainer = document.querySelector("#tweets_container");

  if (!tweetInput.value) {
    alert("트윗을 입력해주세요.");
    return;
  }
  const tweet = document.createElement("div");
  tweet.classList.add("tweet");
  // 보안상 안좋다고함
  // tweet.innerHTML = `
  //   <p class="tweet-text">${tweetInput.value}</p>
  //   <button class="like-button">좋아요</button>
  //   <span class="like-counter">0</span>
  // `;
  const tweetText = document.createElement("p");
  tweetText.classList.add("tweet-text");
  tweetText.textContent = tweetInput.value;
  
  const likeButton = document.createElement("button");
  likeButton.classList.add("like-button");
  likeButton.textContent = "좋아요";
  likeButton.addEventListener("click", function () {
    const likeCounter = tweet.querySelector(".like-counter");
    likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
  });

  tweet.appendChild(tweetText);
  
  // tweetsContainer.appendChild(tweet);
  tweetsContainer.prepend(tweet); // 맨앞에 추가
});
