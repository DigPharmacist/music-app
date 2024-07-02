let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let backwardBtn = document.getElementById("backwardBtn");
let forwardBtn = document.getElementById("forwardBtn");
const songImg = document.querySelector(".song-img");
const songTitle = document.querySelector("h1");
const songArtist = document.querySelector("p");


// Define an array of songs with their metadata
let songs = [
    {
        title: "One Love",
        artist: "Bob Marley",
        source: "assets/music/BOB MARLEY =ONE LOVE.mp3",
        image: "assets/img/israel-palacio-Y20JJ_ddy9M-unsplash.jpg"
    },
    {
        title: "Feel Good",
        artist: "Mohbad",
        source: "assets/music/Mohbad-–-Feel-Good.mp3",
        image: "assets/img/Mohbad-2-e1696031126827.jpg"
    },

    {
        title: "Celebrate Me",
        artist: "Patoranking",
        source: "assets/music/Patoranking_Celebrate_Me_9jaflaver.com_.mp3",
        image: "assets/img/Patoranking_00005-2.jpg"
    },

    {
        title: "Calm Down",
        artist: "Rema",
        source: "assets/music/Rema-Calm-Down-New-Song-(TrendyBeatz.com).mp3",
        image: "assets/img/images.jfif"
    },

    {
        title: "Nara",
        artist: "Tim-Godfrey-Ft.-Travis-Greene",
        source: "assets/music/Tim-Godfrey-Ft.-Travis-Greene-Nara.mp3",
        image: "assets/img/download.jfif"
    },

    // Add more songs as needed
];


let currentSongIndex = 0; // Track the current song index

// Function to initialize the music player with the first song
function initializePlayer() {
    loadSong(currentSongIndex);
}

// Function to load a new song based on index
function loadSong(index) {
    song.src = songs[index].source;
    songImg.src = songs[index].image; // Update the dynamically created image source
    songTitle.textContent = songs[index].title;
    songArtist.textContent = songs[index].artist;
    song.load(); // Load the new song
}


song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;

}
song.addEventListener("timeupdate", function() {
    progress.value = song.currentTime;
});

// Progress bar interaction
progress.oninput = function() {
    song.currentTime = progress.value;
}

let isRepeat = false; // Track repeat mode
let isShuffle = false; // Track shuffle mode

function toggleRepeatShuffle() {
    const repeatShuffleIcon = document.getElementById("repeatShuffleIcon");

    if (isRepeat) {
        // Currently in repeat mode, toggle to normal mode
        isRepeat = false;
        repeatShuffleIcon.classList.remove("fa-undo-alt"); // Change icon to repeat mode
        repeatShuffleIcon.classList.add("fa-redo"); // Change icon to repeat mode
    } else {
        // Currently not in repeat mode, toggle to repeat mode
        isRepeat = true;
        repeatShuffleIcon.classList.remove("fa-redo"); // Change icon to repeat mode
        repeatShuffleIcon.classList.add("fa-undo-alt"); // Change icon to repeat mode
    }
}



function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

song.onended = function() {
    if (isRepeat) {
        // Restart the current song
        song.currentTime = 0;
        song.play();
    } else {
        // Increment current song index
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        playPause(); // Start playing the new song automatically
    }
};

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime;
    }, 500);
}
progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}
// Backward button functionality
backwardBtn.onclick = function() {
    currentSongIndex--; // Move to the previous song
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1; // Wrap around to the last song
    }
    loadSong(currentSongIndex);
    playPause(); // Optionally, start playing the new song automatically
}

// Forward button functionality
forwardBtn.onclick = function() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playPause(); // Optionally, start playing the new song automatically
}


initializePlayer();