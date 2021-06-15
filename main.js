'use strict'

import {player1, player2} from './players.js';
import {generateLogs, createElement, playerAttack, enemyAttack, showResult} from './utils.js';
import {$formFight, $arenas} from './utils.js';

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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function(e){
    e.preventDefault();
    const enemy =  enemyAttack();
    const player = playerAttack();

    if(enemy.defence !== player.hit){
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);
    }else{
        generateLogs('defence', player1, player2, player.value = 0);
    };

    if(player.defence !== enemy.hit){
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    }else{
        generateLogs('defence', player2, player1, enemy.value = 0);
    };

    showResult();
});