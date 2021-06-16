'use strict'

import {createElement} from './utils.js';

export class Player{
    constructor(props){
        this.number = props.number;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
        this.selector = `player${this.number}`;
        this.rootSelector = props.rootSelector;
    };

    changeHP = (value) => {
        this.hp -= value;
    
        if (this.hp <= 0){
            this.hp = 0;
        }
        return this.hp;
    };
    
    elHP = () => {
        return document.querySelector(`.${this.selector} .life`);
    };
    
    renderHP = () => {
        return this.elHP().style.width = this.hp + '%';
    };
    
    playerWin = (name) => {
        const $winTitle = createElement('div', 'loseTitle');
        (name) ? $winTitle.innerText = name + ' Wins' : $winTitle.innerText = 'Draw';
        return $winTitle;
    };
};

export const player1 = new Player({
    number: 1,
    name: 'Sub-zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: 'Sword',
    attack: function () {
        console.log(player1.hero_name + ' Fight');
    },
    rootSelector: 'arenas',
});

export const {number, name, hp, img, weapon} = player1;
console.log(number, name, hp, img, weapon);

export const player2 = new Player({
    number: 2,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'Chain',
    attack: function () {
        console.log(player2.hero_name + ' Fight');
    },
    rootSelector: 'arenas',
});

export const createPlayer = ({number, hp, name, img, rootSelector}) => {
    const $player = createElement('div', 'player' + number);
    
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

    $life.style.width = hp + '%';
    $life.innerText = hp;
    $name.innerText = name;
    $img.src = img;

    const $root = document.querySelector(`.${rootSelector}`);
    $root.appendChild($player);
    return $player;
};

export const {number: player2_number, name: hero2_name, hp: hero2_hp, img: hero2_img, weapon: hero2_weapon, rootSelector: rootSelector2} = player2;
console.log(player2_number, hero2_name, hero2_hp, hero2_img, hero2_weapon);


