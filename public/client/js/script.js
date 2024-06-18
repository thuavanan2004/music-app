// Aplayer 
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  const dataAudio = aplayer.getAttribute("data-audio");
  const dataSong = aplayer.getAttribute("data-song");
  const dataAvatar = aplayer.getAttribute("data-avatar");
  const dataSinger = aplayer.getAttribute("data-singer");
  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [{
      name: dataSinger,
      artist: dataSong,
      url: dataAudio,
      cover: dataAvatar,
    }],
    autoplay: true
  });
  const avatar = document.querySelector(".singer-detail .inner-avatar");

  ap.on('play', function () {
    avatar.style.animationPlayState = "running";
  });

  ap.on('pause', function () {
    avatar.style.animationPlayState = "paused";
  })
}
// End Aplayer 
// Button like 
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");
    const status = buttonLike.classList.contains("active");
    const statusCurrent = status ? "dislike" : "like";

    fetch(`/songs/feelings/${statusCurrent}/${idSong}`, {
        method: "PATCH"
      })
      .then(response => response.json())
      .then(data => {
        if (data.code == 200) {
          const elementNumber = buttonLike.querySelector(".inner-number");
          elementNumber.innerHTML = data.like
          buttonLike.classList.toggle("active");
        }
      })
  })

  // fetch("/songs/")
}
// End Button like 
// Button Favorite 
const buttonFavorite = document.querySelector("[button-favorite]");
if (buttonFavorite) {
  buttonFavorite.addEventListener("click", () => {
    const idSong = buttonFavorite.getAttribute("button-favorite");
    const status = buttonFavorite.classList.contains("active");
    const statusCurrent = status ? "unfavorite" : "favorite";
    fetch(`/songs/favorite/${statusCurrent}/${idSong}`, {
        method: "PATCH"
      })
      .then(response => response.json())
      .then(data => {
        if (data.code == 200) {
          buttonFavorite.classList.toggle("active")
        }
      })
  })
}
// End Button Favorite 
// Search Suggest 
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  input.addEventListener("keyup", () => {
    const keyword = input.value;
    fetch(`/search/suggest?keyword=${keyword}`)
      .then(response => response.json())
      .then(data => {
        if (data.code == 200) {
          const songs = data.songs;
          const innerSuggest = boxSearch.querySelector(".inner-suggest");
          const innerList = boxSearch.querySelector(".inner-list");
          boxSearch.classList.add("is-collapse")
          if (songs.length > 0) {
            const htmlsArray = songs.map(item => `
              <a class="inner-item" href="/songs/detail/${item.slug}">
                <div class="inner-image">
                  <img src="${item.avatar}">
                </div>
                <div class="inner-info">
                  <div class="inner-title">${item.title}</div>
                  <div class="inner-singer">
                    <i class="fa-solid fa-microphone-lines"></i> ${item.singer.fullName}
                  </div>
                  </div>
              </a>
            `);
            innerList.innerHTML = htmlsArray.join("");
            innerSuggest.classList.add("show");

            innerList.querySelectorAll('.inner-item').forEach(item => {
              item.addEventListener('mousedown', (e) => {
                e.preventDefault();
              });
            });
          } else {
            innerList.innerHTML = "";
            innerSuggest.classList.remove("show");
            boxSearch.classList.remove("is-collapse")
          }
        }
      })
  })
  input.addEventListener("blur", () => {
    const innerSuggest = boxSearch.querySelector(".inner-suggest");
    innerSuggest.classList.remove("show");
    boxSearch.classList.remove("is-collapse");
  });

  input.addEventListener("focus", () => {
    if (input.value.trim() !== "") {
      boxSearch.classList.add("is-collapse");
      const innerSuggest = boxSearch.querySelector(".inner-suggest");
      innerSuggest.classList.add("show");
    }
  });
}
// End Search Suggest 