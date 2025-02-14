console.log("Lets write some javascript")
let currentsong = new Audio();
async function getsongs(){

    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
        
    }
    return songs
}

const playMusic = (track) => {
    // let audio = new Audio("/songs/" + track);
    currentsong.src = "/songs/" + track
    currentsong.play();
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() {
    
    let songs = await getsongs();  // Assume getsongs() is your function to fetch the songs
    console.log(songs);
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `
                        <li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div class="songname">${song.replaceAll("%20"," ")}</div>
                                <div class="songsource">Maanas</div>
                            </div>
                            <div class="playNow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                        </li>`;
    }
    // Get the button element by its ID
    // const playButton = document.getElementById('playButton');

    // Add a click event listener to the button
    // playButton.addEventListener('click', function() {
    //     var audio = new Audio(songs[0]);  // Create a new Audio object with the song URL
    //     audio.play().catch(error => {
    //         console.log('Playback failed:', error);
    //     });
    //     audio.addEventListener("loadeddata", () => {
    //         console.log(audio.duration , audio.currentSrc , audio.currentTime);
    //     })
    // })

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click" , element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    playButton.addEventListener("click" , () =>{
        if(currentsong.paused){
            currentsong.play()
            playButton.classList.remove("fa-circle-play");
            playButton.classList.add("fa-circle-pause");
        }
        else{
            currentsong.pause()
            playButton.classList.remove("fa-circle-pause");
            playButton.classList.add("fa-circle-play");
        }
    })
}


main();