'use strict'

import {generateLogs} from './utils.js';

export const player1 = {
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
    generateLogs,
};

export const {player_number, hero_name, hp, img, weapon} = player1;
console.log(player_number, hero_name, hp, img, weapon);

export const player2 = {
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
    generateLogs,
};

export const {player_number: player2_number, hero_name: hero2_name, hp: hero2_hp, img: hero2_img, weapon: hero2_weapon} = player2;
console.log(player2_number, hero2_name, hero2_hp, hero2_img, hero2_weapon);

function changeHP(value){
    this.hp -= value;

    if (this.hp <= 0){
        this.hp = 0;
    }
    return this.hp;
};

function elHP() {
    return document.querySelector('.player' + this.player_number + ' .life');
};

function renderHP() {
    return this.elHP().style.width = this.hp + '%';
};

function playerWin()  {
    const $winTitle = createElement('div', 'loseTitle');
    if (this.hero_name){
    $winTitle.innerText = this.hero_name + ' Wins';
}   else{
    $winTitle.innerText = 'Draw';
}
    return $winTitle;
};