'use strict'


// Task 0

const player1 = {
    hero_name: 'Sub-zero',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: 'Sword',
    attack: function () {
        console.log(player1.hero_name + ' Fight');
    },

}

const player2 = {
    hero_name: 'Scorpion',
    hp: 20,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'Chain',
    attack: function () {
        console.log(player2.hero_name + ' Fight');
    },

}

// Task 1

// function createPlayer(playerClass, hero_name, lifes){
//     const $player = document.createElement('div');
//     $player.classList.add(playerClass);

//     const $root = document.querySelector('.arenas');
//     $root.appendChild($player);

//     const $progressBar = document.createElement('div');
//     $progressBar.classList.add('progressbar');

//     const $character = document.createElement('div');
//     $character.classList.add('character');

//     $player.appendChild($progressBar);
//     $player.appendChild($character);

//     const $life = document.createElement('div');
//     $life.classList.add('life');

//     const $name = document.createElement('div');
//     $name.classList.add('name');

//     $progressBar.appendChild($life);
//     $progressBar.appendChild($name);

//     const $img = document.createElement('img');
//     $img.classList.add('img');

//     $character.appendChild($img);

//     $life.style.width = '100%';
//     $life.innerText = lifes;
//     $name.innerText = hero_name;
//     $img.src = 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif';


// };


// createPlayer('player1', 'Sub-zero', 100);
// createPlayer('player2', 'Scorpion', 40);


// Task 3 Задание со звездочкой

function createPlayer(playerClass, player) {
    const $player = document.createElement('div');
    $player.classList.add(playerClass);

    const $root = document.querySelector('.arenas');
    $root.appendChild($player);

    const $progressBar = document.createElement('div');
    $progressBar.classList.add('progressbar');

    const $character = document.createElement('div');
    $character.classList.add('character');

    $player.appendChild($progressBar);
    $player.appendChild($character);

    const $life = document.createElement('div');
    $life.classList.add('life');

    const $name = document.createElement('div');
    $name.classList.add('name');

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    const $img = document.createElement('img');
    $img.classList.add('img');

    $character.appendChild($img);

    $life.style.width = player.hp + '%';
    $life.innerText = player.hp;
    $name.innerText = player.hero_name;
    $img.src = player.img;
};


createPlayer('player1', player1);
createPlayer('player2', player2);







