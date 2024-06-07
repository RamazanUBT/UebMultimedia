const audioFiles = [
  "SeaAudios/SeaAudio1.mp3",
  "SeaAudios/SeaAudio2.mp3",
  "SeaAudios/SeaAudio3.mp3",
  "SeaAudios/SeaAudio4.mp3",
];

let isPlaying = false;
let currentAudio = "";

function toggleRandomAudio() {
  4;
  const audio = document.getElementById("myAudio");
  const audioSource = document.getElementById("audioSource");
  const button = document.getElementById("audioButton");

  if (isPlaying) {
    audio.pause();
    button.textContent = "Play Random Audio";
    isPlaying = false;
  } else {
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const randomAudio = audioFiles[randomIndex];
    if (currentAudio !== randomAudio) {
      audioSource.src = randomAudio;
      currentAudio = randomAudio;
      audio.load();
    }
    audio.play();
    button.textContent = "Pause Audio";
    isPlaying = true;
  }
}
