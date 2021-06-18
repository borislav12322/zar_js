'use strict'

import {player1, player2, createPlayer} from './players.js';
import {$formFight, $arenas} from './utils.js';
import {Game, generateLogs} from './game.js';

const game = new Game();

game.start().addEventListener('click', function(){
    $formFight.style.display = 'flex';
    $startButton.style.display = 'none';
})

const $startButton = document.querySelector('.startButton');

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));



generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function(e){
    e.preventDefault();
    const enemy =  game.enemyAttack();
    const player = game.playerAttack();

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
    
    game.showResult();
});