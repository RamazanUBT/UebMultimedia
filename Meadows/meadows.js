const audioFiles = [
  "meadowsAudios/meadowSound1.mp3",
  "meadowsAudios/meadowSound2.mp3",
  "meadowsAudios/meadowSound3.mp3",
  "meadowsAudios/meadowSound4.mp3",
  "meadowsAudios/meadowSound5.mp3",
];

let isPlaying = false;
let currentAudio = "";

function toggleRandomAudio() {
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
