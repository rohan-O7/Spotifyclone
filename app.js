console.log("Let's write some java script")

let currentsong= new Audio()
// yahan Audio ek constructor hai where we can pause play and load new audio files
// Play the audio: currentsong.play()
// Pause the audio: currentsong.pause()
// Set the current time of the audio: currentsong.currentTime = 30; // jump to 30 seconds
// Adjust volume:

// currentsong.volume = 0.5; // set volume to 50%
// Track duration and time:

// currentsong.duration provides the total duration of the audio.
// currentsong.currentTime gives or sets the current playback position.
// audio ke andar src hota hai

let songs;



function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}




async function GetSongs() {

    let a = await fetch("http://127.0.0.1:3000/52/songs/")
    let response = await a.text();
    // console.log(response)
    let b= document.createElement("div")
    b.innerHTML= response
    let c= b.getElementsByTagName("a")

    let songs=[]
    // console.log(c)
    for (let index = 0; index < c.length; index++) {
        const element = c[index];
        // console.log(element)

        if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("/songs/")[1])
        }
    }

   return songs   

}

// ctrl+f for search bar in css


// split func apko do chiz return karega ap jo input do ge uske baad wala string and uske pehle wala string
// split will return an array which will consist of the part before and the part after  `

async function main(){                  
 
    songs = await GetSongs()
    console.log(songs)

    // getelements by tag name returns all the ul list in array form --->that are descendent of the selected element
    // [0] represents the first ul element present in songlist
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
// song is the value of songs
// it contains all the elements with %20 in it
    songul.innerHTML= songul.innerHTML + 
        
    ` <li>      
    
      <div class="playnow">
            
        <img src="music.svg" class="invert" alt=""> 
      <span class= "huss">
        <div> ${song.replaceAll("%20"," ")} </div>

        <div>Rohan</div>
      </span>
        <span>Play now</span>
        <img src="playbarbutton.svg" class="invert" alt="">
        </div>           
    
    </li>`

    }

    // Attaching an event listener to each song 
    // e targets each of the li element


// --->>this could also havee been done
    // let rishi= document.querySelector(".songlist").getElementsByTagName("li")
    // for (let index = 0; index < rishi.length; index++) {
    //     const element = rishi[index];
    //     console.log(element)
    // }



const playMusic = (track) => {
    console.log(track);
    // let audio = new Audio("/52/songs/"+ track)
    // audio.play();
    // in the commented case if u select 2 songs at a time then they both get played at the same time
    currentsong.src="/52/songs/" + track
    // src mein /52/songs/Baby%20by%20Justin%20Bieber%20Ft.%20Ludacris%20(Downloaded%20from%20phanoxug.com).mp3 ye enter hoga if u click on a particular song
    currentsong.play();
    document.querySelector(".songinfo").innerHTML= track.replaceAll("%20"," ")

// but here current song is one global variable so when its changes everything gets changed
// yahan currentsrc se kam bcz thats another variable so we have to use src only
  
}






  // Add an event listener to previous
  previous.addEventListener("click", () => {
    // currentsong.pause()
    console.log("Previous clicked")
    // indexof func finds the index of the song having the same name
    let index = songs.indexOf(currentsong.src.split("songs/")[1])
    if ((index - 1) >= 0) {
        playMusic(songs[index - 1])
    }
})

// Add an event listener to next
next.addEventListener("click", () => {
    // currentsong.pause()
    console.log("Next clicked")

    let index = songs.indexOf(currentsong.src.split("songs/")[1])
    if ((index + 1) < songs.length) {
        playMusic(songs[index + 1])
        
    }
})





// by harry way
// eventlistener for when u click a song and it plays
// doubt
   Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach((e) => {
                                                                              //here e represents valueof that array
    e.addEventListener("click",(element) => {
        console.log(e.querySelector(".huss").firstElementChild.innerHTML);
        playMusic(e.querySelector(".huss").firstElementChild.innerHTML.trim());
        //document.querySelector(".songtime").innerHTML= "00/00 : 00/00&nbsp&nbsp    "
         
    }
    )
     },


    //  attach an event listener for play next and previous
    // u can directly access the id given to a tag by writing the id name
    // ek class ko ham ek hee bar addeventlistener de sakte hain
    
    play.addEventListener("click",(e) => {
      if(currentsong.paused){
        currentsong.play()
        play.src="pause.svg"
      }
      else{
        currentsong.pause()
        play.src="play.svg"
      }
    }
    )

)


// event listener for time update event
currentsong.addEventListener("timeupdate",(params) => {
//   console.log(currentsong.currentTime,currentsong.duration)
  document.querySelector(".songtime").innerHTML= `${secondsToMinutesSeconds(currentsong.currentTime)} : ${secondsToMinutesSeconds(currentsong.duration)}`
  
  document.querySelector(".circle").style.left= (currentsong.currentTime/currentsong.duration)*100 +"%";
  // ye circle ko move karne ke liye
},


// add eventlistener to seekbar
 document.querySelector(".seekbar").addEventListener("click",(e) => {
    // getbound func---->>>method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
   console.log(e.target.getBoundingClientRect().width,e.offsetX) //now the output will be total width and width of x where u are clicking
//offsetX and only x both are different u need to use offset X to get the exact length
//output is DOMRect {x: 215.6666717529297, y: 563, width: 568.8021240234375, height: 2, top: 563, …} 426 like this

let percent =(e.offsetX/e.target.getBoundingClientRect().width)*100

document.querySelector(".circle").style.left= percent + "%";
currentsong.currentTime= ((currentsong.duration)*percent)/100
 }
 )

)
 
// imp note
// e refers to the event object. This object is automatically passed to event handler functions in JavaScript when an event is triggered. The event object contains details about the event that occurred, such as:

// e.target: The element that triggered the event (in this case, the .seekbar element when clicked).
// e.offsetX: The horizontal position (in pixels) of the click relative to the target element (.seekbar).








// playing the first song
    // var audio= new Audio(songs[0])
    // audio.play();   
    
    // audio.addEventListener("loadeddata",() => {
    //   let duration = audio.duration
    //   console.log(duration,audio.currentSrc,audio.currentTime)      
    // }      
    // )   
    
    
    // end of main function
}


//clear
document.querySelector(".hamburger").addEventListener("click",(e) => {
  let abcd = document.querySelector(".left")
  let abcde = document.querySelector(".right")
  let abcdef = document.querySelector(".playbar")
  abcd.style.left= "1%"
  abcde.style.left= "40%"
  abcdef.style.width="39%"
  let rohan=document.querySelector(".hamburger")
  rohan.style.visibility="hidden"
}
)

// clear
document.querySelector(".close").addEventListener("click",(e) => {
    e.stopPropagation()
  let abcdff = document.querySelector(".left")
  let abcdefff = document.querySelector(".right")
  let abcdeffff = document.querySelector(".playbar")
  abcdff.style.left= "-100%"
  abcdefff.style.left="0%"
  abcdeffff.style.width="90%"
  let rohan=document.querySelector(".hamburger")
  rohan.style.visibility="visible"
  
}
)





range.addEventListener("change",(e) => {
  console.log("Setting volume to ",e.target.value/100)
  
  currentsong.volume = parseInt(e.target.value)/100
  // parseint converts the string into an integer
}
)
//e.target.value is how you get the value of the element (like an input or a slider) that triggered the event.
// e.value doesn't exist, so if you try to use it, it will be undefined.
//e.target will give the value of slider(volume) button when we trigger it



main()