score = 0;
cross = true;

audio = new Audio('378300__13fpanska_krug_antonin__fish-in-river.wav');
audiogo = new Audio('268942__robinhood76__05637-small-fairy-hit-moan.wav');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        fish = document.querySelector('.fish');
        fish.classList.add('animateFish');
        setTimeout(() => {
            fish.classList.remove('animateFish')
        }, 700);
    }
    if (e.keyCode == 39) {
        fish = document.querySelector('.fish');
        fishX = parseInt(window.getComputedStyle(fish, null).getPropertyValue('left'));
        fish.style.left = fishX + 112 + "px";
    }
    if (e.keyCode == 37) {
        fish = document.querySelector('.fish');
        fishX = parseInt(window.getComputedStyle(fish, null).getPropertyValue('left'));
        fish.style.left = (fishX - 112) + "px";
    }
}

setInterval(() => {
    fish = document.querySelector('.fish');
    gameOver = document.querySelector('.gameOver');
    shark = document.querySelector('.shark');

    dx = parseInt(window.getComputedStyle(fish, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(fish, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(shark, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(shark, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        cross=false;
        shark.classList.remove('sharkAni')
        
        audiogo.play();
        fish.innerHTML=`
        <style> .fish{opacity:0;}</style>`
        gameOver.classList.add('restart');
        restart = document.querySelector('.restart');
       restart.innerHTML=`<br><div class="end">Oops!! You couldn't save the fishy :(</div><br><button class="playagain" onClick="window.location.reload()">Play Again</button>
       <style>
       .playagain{
        font-size: 25px;
        color: #54212f;
        font-weight: bold;
        
        right: 45px;
        top: 31px;
        border: 2px solid black;
        padding: 10px;
        font-family: 'Ubuntu', sans-serif;
        border-radius: 10px;
    }
       
       </style>`

        
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(shark, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            shark. style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Sharks Encountered: " + score
}



