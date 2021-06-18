'use strict'
import { createElement, getTime, $chat, $fightButton, $arenas, $formFight, getRandom} from "./utils.js";
import { player1, player2, Player } from "./players.js";

const ATTACK = ['head', 'body', 'foot'];

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

export const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

export class Game{

    constructor(props){};

    start = () => {
        const $startButton = createElement('button', 'startButton');
        const $arenas = document.querySelector('.arenas');
        $startButton.innerText = 'Start';
        $arenas.appendChild($startButton);
        return $startButton;
    };

    showResult = () => {
        if (player1.hp === 0 || player2.hp === 0){
            $fightButton.disabled = true;
            $arenas.appendChild(createReloadButton());
        };
    
        if (player1.hp === 0 && player1.hp < player2.hp){
            $arenas.appendChild(player2.playerWin(player2.name));
            generateLogs('end', player2, player1);
    
        } else if (player2.hp === 0 && player2.hp < player1.hp){
            $arenas.appendChild(player1.playerWin(player1.name));
            generateLogs('end', player1, player2);
    
        } else if (player1.hp === 0 && player2.hp === 0){
            $arenas.appendChild(playerWin());
            generateLogs('draw')
        };
    };
    
    playerAttack = () => {
        const attack = {};
        for (let item of $formFight){
            if (item.checked && item.name === 'hit'){
                attack.value = getRandom(HIT[item.value]);
                attack.hit = item.value;
            };
    
            if(item.checked && item.name === 'defence'){
                attack.defence = item.value;
            };
            
            item.checked = false;
        }
    
        return attack;
    };
    
    enemyAttack = () => {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];
        return{
            value: getRandom(HIT[hit]),
            hit,
            defence,
        }
    };
};


export const generateLogs = (type, player1, player2, playerValue) => {
    const time = getTime();
    let text;   
    let el;
    const damage = playerValue;

    switch(type){
        case 'start': 
            text = logs[type].replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);    
            el = `<p>${text}</p>`;
            break;
        case 'end':
            text = logs[type][getRandom(logs[type].length - 1) - 1].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);    
            el = `<p>${time} ${text}</p>`;
            break;
        case 'hit':
            text = logs[type][getRandom(logs[type].length - 1) - 1].replace('[playerDefence]', player2.name).replace('[playerKick]', player1.name);    
            el = `<p>${time} ${text} ${damage} ${player2.hp}/100 </p>`;
            break;
        case 'defence':
            text = logs[type][getRandom(logs[type].length - 1) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);    
            el = `<p>${time} ${text} ${damage} ${player2.hp}/100</p>`;
            break;
        case 'draw':
            text = logs[type];    
            el = `<p>${time} ${text}</p>`;
            break;
        default:
            text = 'Error';
            el = `<p>${text}</p>`;
    };
    $chat.insertAdjacentHTML('afterbegin', el);
};



const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap')
    const $buttonReload = createElement('button', 'button');
    $buttonReload.innerText = 'Restart';
    $reloadWrap.appendChild($buttonReload);
    $buttonReload.addEventListener('click', function(){
        window.location.reload();
    });

    return $reloadWrap;
};

