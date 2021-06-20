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
    
};

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

