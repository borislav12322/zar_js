'use strict'

const $arenas = document.querySelector('.arenas');
// const $fightButton = document.querySelector('.button');
// const $formFight = document.querySelector('.control');



function chooseElement(selector){
    return document.querySelector(selector)
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player_number: 1,
    hero_name: 'Sub-zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: 'Sword',
    attack: function () {
        console.log(player1.hero_name + ' Fight');
    },
    changeHP,
    elHP,
    renderHP,
    playerWin,
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
    changeHP,
    elHP,
    renderHP,
    playerWin,    
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

function changeHP(value) {
    this.hp -= value;

    if (this.hp <= 0){
        this.hp = 0;
    }
    return this.hp;
};

function elHP() {
    return document.querySelector('.player' + this.player_number + ' .life');
};

function renderHP(player) {
    return this.elHP().style.width = this.hp + '%';
};

function createReloadButton(){
    const $reloadWrap = createElement('div', 'reloadWrap')
    const $buttonReload = createElement('button', 'button');
    $buttonReload.innerText = 'Restart';
    $reloadWrap.appendChild($buttonReload);
    $buttonReload.addEventListener('click', function(){
        window.location.reload();
    });
    return $reloadWrap;
};

function playerWin() {
    const $winTitle = createElement('div', 'loseTitle');
    if (this.hero_name){
    $winTitle.innerText = this.hero_name + ' Wins';
}   else{
    $winTitle.innerText = 'Draw';
}
    return $winTitle;
};

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack(){
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return{
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
    
};

chooseElement('.control').addEventListener('submit', function(e){
    e.preventDefault();
    const enemy =  enemyAttack();

    const attack = {};
    for (let item of chooseElement('.control')){
        if (item.checked && item.name === 'hit'){
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        };

        if(item.checked && item.name === 'defence'){
            attack.defence = item.value;
        };

        if(attack.hit === enemy.defence){
            attack.value = 0;
        };

        if(enemy.hit === attack.defence){
            enemy.value = 0;
        };
        
        item.checked = false;
    }

    console.log('####: a ', attack);
    console.log('####: e ', enemy);
    

    // player1.changeHP(enemy.value);
    // player2.changeHP(attack.value);
    console.log('My Hero life is ' ,player1.changeHP(enemy.value));
    console.log('Enemy Hero life is ' ,player2.changeHP(attack.value));
    player1.elHP();
    player2.elHP();
    player1.renderHP();
    player2.renderHP();

    
    if (player1.hp === 0 || player2.hp === 0){
        chooseElement('.button').disabled = true;
        $arenas.appendChild(createReloadButton());
    };
    
    if (player1.hp === 0 && player1.hp < player2.hp){
        $arenas.appendChild(player2.playerWin());
    } else if (player2.hp === 0 && player2.hp < player1.hp){
        $arenas.appendChild(player1.playerWin());
    } else if (player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerWin());
    };

});