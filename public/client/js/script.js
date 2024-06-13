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