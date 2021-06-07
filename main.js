'use strict'

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    hero_name: 'Sub-zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: 'Sword',
    attack: function () {
        console.log(player1.hero_name + ' Fight');
    },

};

const player2 = {
    player: 2,
    hero_name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'Chain',
    attack: function () {
        console.log(player2.hero_name + ' Fight');
    },

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
    const $player = createElement('div', 'player' + player.player);
    
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

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= Math.ceil(Math.random() * 20);
    $playerLife.style.width = player.hp + '%';

    console.log($playerLife.style.width);

    if (player.hp <= 0){
        $playerLife.style.width = 0 + '%';
    };

    if (player1.hp > 0 && player2.hp < 0){
        $arenas.appendChild(playerWin(player1.hero_name));
        $randomButton.disabled = true;
    } else if (player1.hp < 0 && player2.hp > 0){
        $arenas.appendChild(playerWin(player2.hero_name));
        $randomButton.disabled = true;
    } else if (player1.hp < 0 && player2.hp < 0){
        console.log('Draw');
        $randomButton.disabled = true;
    }
};

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' Wins';
    return $winTitle;
};

$randomButton.addEventListener('click', function () {
    changeHP(player1);
    changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
