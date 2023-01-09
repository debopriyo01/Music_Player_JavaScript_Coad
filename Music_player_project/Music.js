
// Creting The arrey with the Details of the images :-

var Player_Details = [

    {

        Track_Art: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg',
        Track_Name: 'Good Morning',
        Track_Artist: 'Atom',
        path: "songs\audio-f-25043.mp3"

    },
    {
        Track_Art: 'https://pixlr.com/images/index/remove-bg.webp',
        Track_Name: 'Behaind The Hiils',
        Track_Artist: 'Joathan Roger',
        path: 'songs\ganapathi-thunayaruluka-pagalworldl-4-59026.mp3'

    },

    {

        Track_Art: 'https://media.gettyimages.com/id/536118200/photo/the-capital-city-of-kolkata.jpg?s=612x612&w=0&k=20&c=clbA42tvhyTdlo6nyn-h8XOyLWQWW1SBG9SQLie59Jc=',
        Track_Name: 'Except The shadow',
        Track_Artist: 'Acon',
        path: 'songs\zain-40549.mp3'
    }

];




// String The veribels  from the Details--->
let Now_Playing = window.document.querySelector('.Now_Playing');
let TrackImage = window.document.querySelector('.Track_Art');
let TrackName = window.document.querySelector('.Track_Name');
let TrackArtist = window.document.querySelector('.Track_Artist');

// String The veribels  from the Buttom----->
let prev_button = window.document.querySelector('.prev_button');
let Play_Button = window.document.querySelector('.Play_Button');
let Next_button = window.document.querySelector('.Next_button');



// String The veriebles for The Seek Volumn Button ---->
let Current_time = window.document.querySelector('.Current_time');
let Seek_Slider = window.document.querySelector('.Seek_Slider');
let Total_duretion = window.document.querySelector('.Total_duretion');


// Storing The veriebles  of The button Tag ---->
let Volumn_Up = window.document.querySelector('.Volumn_Up');
let volumn_slider = window.document.querySelector('.volumn_slider');
let Volumn_down = window.document.querySelector('.Volumn_down');


var Track = 0;
var is_Playing = false;


const Audio_Element = document.createElement('audio');

//--> Converting The TotaklDuretionToSecends :-
//--> This funtion needs To call when The Track will be Get Played :-
function Converting_To_Seocends(Duretion){

var min =  ' ' +Math.floor(Duretion/60);//--> Secends to Minits :-
var seocends= ' ' + Math.floor(Duretion-(min*60));// ----> min to sec :-

return min.padStart( 2, '0' ) + ':' + seocends.padStart( 2, '0' );//--> return  The String Into The total_Duretion :-

}

function LoadTrack() {

    var Track_Index = Player_Details[Track]

    //--> Loading The 1st Track :-
    Audio_Element.src = Player_Details[Track].path;
    Audio_Element.load();

    //--> Displaying The Properties :-
    Now_Playing.textContent = `Playing ${Track + 1} of ${Player_Details.length}`;
    TrackImage.innerHTML = '<img src="' + Track_Index.Track_Art + '" />';
    TrackName.innerText = Track_Index.Track_Name;
    TrackArtist.innerText = Track_Index.Track_Artist;

    BgColurChange();// When The New Song will be Loaded The new BG Will be Came Up :-
    
    setTimeout(Seek_Update,100);//--> Evry 1 sec It will called The seek  Update Methode :-

}

function BgColurChange() {


    let color1 = (Math.random() * 100);
    let color2 = (Math.random() * 100);
    let color3 = (Math.random() * 100);
    let colour4 = (Math.random() * 100);

    // Let Call The Body And Put The colour Into The Body :-s

    window.document.body.style.backgroundColor = `rgb(${color1},${color2},${color3},${colour4})`;

}

function PlayOrPause() {

    if (is_Playing) {

        PauseTrack();
    } else {
        PlayTrack();
    }
}
function PlayTrack() {

    Audio_Element.play();
    is_Playing = true;
    Play_Button.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    //--> we are Passing The Duretion  to Convert  The duretion into Secends:-
    Total_duretion.innerText=Converting_To_Seocends(Audio_Element.Total_Duretion);
    
}

function PauseTrack() {


    Audio_Element.pause();
    is_Playing = false;


    Play_Button.innerHTML = '<i class="fa-solid fa-circle-pause"></i> ';

}
function NextTrack() {


    Track++;

    if (Track >= Player_Details.length) {

        Track = 0;
    }
    LoadTrack();
    PlayTrack();
}

function PrevTrack() {

    Track--;

    if (Track <= 0) {

        Track = Player_Details.length - 1;
    }
    LoadTrack();
    PlayTrack();
}


function Seek_To() {

// --> Hear we can be Use The Math.floor() --> To Get Only the int Part :-
    Audio_Element.currentTime=Audio_Element.duration*(Seek_Slider.value/100);
}
function Seek_Update() {

// Hear we need To Set Up The Current Duretion ---->

Current_time.innerText=Converting_To_Seocends(Audio_Element.currentTime);
Seek_Slider.value= Math.floor((Audio_Element.currentTime/Audio_Element.duration)*100);

}
function SetVolumn() {

    // Geting The Volumn Property Will be The Integer Value :-
    Audio_Element.volume =Number.parseInt(volumn_slider.value / 100);
}

function PlayingTheButtons() {

    Play_Button.addEventListener('click', PlayOrPause);
    Next_button.addEventListener('click', NextTrack);
    prev_button.addEventListener('click', PrevTrack);

    // --> Even For Set Up The volumn --->
    volumn_slider.addEventListener('input', SetVolumn);

    //---> Setting The value for The Seek_Update --->
    Seek_Slider.addEventListener('input',Seek_To);

    //---> Thowring an Even Which The Adio Player Will be  fire --> Ended :-s
    Audio_Element.addEventListener('ended',NextTrack);//-->Playing The nextTrack :-

}

LoadTrack();
PlayingTheButtons();

