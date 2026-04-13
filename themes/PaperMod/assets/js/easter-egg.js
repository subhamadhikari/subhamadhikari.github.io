// Easter Egg: Press Ctrl+I to play music
let audioPlayer;
let isPlaying = false;

document.addEventListener("DOMContentLoaded", function () {
  console.log("Easter egg script loaded! Press Ctrl+I");

  // Create audio element
  audioPlayer = new Audio("/audio/linkinpark-lofi.mp3");
  audioPlayer.loop = true;
  audioPlayer.volume = 0.3;

  audioPlayer.addEventListener("error", function () {
    console.error("Audio file not found! Check: /audio/linkinpark-lofi.mp3");
  });

  // Listen for Ctrl+I
  document.addEventListener("keydown", function (e) {
    // Check if Ctrl+I is pressed (Cmd+I on Mac)
    if ((e.ctrlKey || e.metaKey) && e.key === "i") {
      e.preventDefault(); // Prevent browser default behavior
      console.log("Ctrl+I pressed!");
      triggerEasterEgg();
    }
  });
});

function triggerEasterEgg() {
  if (!isPlaying) {
    // Play music
    audioPlayer
      .play()
      .then(() => {
        console.log("Music playing!");
        isPlaying = true;
        showNotification("🎵 Lo-fi mode activated • Press Ctrl+I to stop");
        document.body.classList.add("lofi-mode");
        createMusicControl();
      })
      .catch((err) => {
        console.error("Play failed:", err);
        showNotification("❌ Could not play audio");
      });
  } else {
    // Stop music
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    document.body.classList.remove("lofi-mode");
    removeNotification();
    console.log("Music stopped!");
  }
}

function showNotification(message) {
  // Remove existing notification if any
  const existing = document.querySelector(".easter-egg-notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = "easter-egg-notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function createMusicControl() {
  // Remove existing control if any
  const existing = document.querySelector(".music-control");
  if (existing) existing.remove();

  const control = document.createElement("div");
  control.className = "music-control";
  control.innerHTML = "🎵 <span>Playing • Ctrl+I to stop</span>";
  control.onclick = triggerEasterEgg;
  document.body.appendChild(control);
}

function removeNotification() {
  const control = document.querySelector(".music-control");
  if (control) control.remove();
}
