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