'use strict'

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $reloadButton = document.querySelector('.reloadWrap .button')

const player1 = {
    player_number: 1,
    hero_name: 'Sub-zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: 'Sword',
    attack: function () {
        console.log(player1.hero_name + ' Fight');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
};

const player2 = {
    player_number: 2,
    hero_name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'Chain',
    attack: function () {
        console.log(player2.hero_name + ' Fight');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,    
};


function createElement(tag, className) {
    const $tag = document.createElement(tag);
    $tag.classList.add(className);
    if (className){
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(player) {
    const $player = createElement('div', 'player' + player.player_number);
    
    const $progressBar = createElement('div', 'progressbar')

    const $character = createElement('div', 'character')

    $player.appendChild($progressBar);
    $player.appendChild($character);

    const $life = createElement('div', 'life');

    const $name = createElement('div', 'name');

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    const $img = createElement('img');

    $character.appendChild($img);

    $life.style.width = player.hp + '%';
    $life.innerText = player.hp;
    $name.innerText = player.hero_name;
    $img.src = player.img;

    return $player;
};



function getRandom(damage) {
    const randomDamage = Math.ceil(Math.random() * damage);
    return randomDamage;
}

function changeHP(damage) {
    this.hp -= damage;

    if (this.hp <= 0){
        this.hp = 0;
    }
    return this.hp;
};

function elHP() {
    return document.querySelector('.player' + this.player_number + ' .life');
};

function renderHP(player) {
    return player.elHP().style.width = this.hp + '%';
};

function createReloadButton(){
    const $reloadWrap = createElement('div', 'reloadWrap')
    const $buttonReload = createElement('button', 'button');
    $buttonReload.innerText = 'Restart';
    $reloadWrap.appendChild($buttonReload);
    return $reloadWrap;

    
};

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name){
    $winTitle.innerText = name + ' Wins';
}   else{
    $winTitle.innerText = 'Draw';
}
    return $winTitle;
};


$randomButton.addEventListener('click', function () {
    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));
    player1.elHP();
    player2.elHP();
    player1.renderHP.call(player1, player1);
    player2.renderHP.call(player2, player2);

    console.log();
    if (player1.hp === 0 || player2.hp === 0){
        $randomButton.disabled = true;
        $arenas.appendChild(createReloadButton());
        
    }
    
    if (player1.hp === 0 && player1.hp < player2.hp){
        $arenas.appendChild(playerWin(player2.hero_name));
    } else if (player2.hp === 0 && player2.hp < player1.hp){
        $arenas.appendChild(playerWin(player1.hero_name));
    } else if (player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerWin());
    }
});


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));



$reloadButton.addEventListener('click', function(){
    window.location.reload();
});
