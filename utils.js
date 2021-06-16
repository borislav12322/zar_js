'use strict'

export const $chat = document.querySelector('.chat');
export const date = new Date();
export const $formFight = document.querySelector('.control');
export const $fightButton = document.querySelector('.button');
export const $arenas = document.querySelector('.arenas');




export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    $tag.classList.add(className);
    if (className){
        $tag.classList.add(className);
    }
    return $tag;
};

export const getTime = () => {
    const hours = (date.getHours() < 10 ? '0': '') + date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0': '') + date.getMinutes();
    const time = hours + ':' + minutes;
    return time;
};

export const getRandom = (damage) => Math.ceil(Math.random() * damage);



