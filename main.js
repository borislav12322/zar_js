'use strict'

const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
const date = new Date();

function getTime(){
    const hours = (date.getHours() < 10 ? '0': '') + date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0': '') + date.getMinutes();
    const time = hours + ':' + minutes;
    return time;
}




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
    generateLogs,
    
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
    generateLogs,
};

const logs = {
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

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    $tag.classList.add(className);
    if (className){
        $tag.classList.add(className);
    }

    return $tag;
}

function showStartLog(){
    const time = getTime();
    const startLog = logs['start'].replace('[time]', time).replace('[player1]', player1.hero_name).replace('[player2]', player2.hero_name);
    console.log(startLog);
    const el = `<p>${startLog}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
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
// showStartLog();
generateLogs('start', player1, player2)


function enemyAttack(){
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return{
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
};

function playerAttack(){
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

function showResult(){
    if (player1.hp === 0 || player2.hp === 0){
        $fightButton.disabled = true;
        $arenas.appendChild(createReloadButton());
    };
    
    if (player1.hp === 0 && player1.hp < player2.hp){
        $arenas.appendChild(player2.playerWin());
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp){
        $arenas.appendChild(player1.playerWin());
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerWin());
        generateLogs('draw')
    };
};

function generateLogs(type, player1, player2){
    const time = getTime();
    let text;   
    let el;
    const damage = '-' + (100 - player2.hp);

    switch(type){
        case 'start': 
            text = logs[type].replace('[time]', time).replace('[player1]', player1.hero_name).replace('[player2]', player2.hero_name);    
            el = `<p>${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            console.log(text);
            break;
        case 'end':
            text = logs[type][getRandom(logs[type].length - 1)].replace('[playerWins]', player1.hero_name).replace('[playerLose]', player2.hero_name);    
            el = `<p>${time} ${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            console.log(text);
            break;
        case 'hit':
            text = logs[type][getRandom(logs[type].length - 1)].replace('[playerDefence]', player2.hero_name).replace('[playerKick]', player1.hero_name);    
            el = `<p>${time} ${text} ${damage} ${player2.hp}/100 </p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            
            console.log(text);
            break;
        case 'defence':
            text = logs[type][getRandom(logs[type].length - 1)].replace('[playerKick]', player1.hero_name).replace('[playerDefence]', player2.hero_name);    
            el = `<p>${time} ${text} ${damage} ${player2.hp}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            console.log(text);
            break;
        case 'draw':
            text = logs[type];    
            el = `<p>${time} ${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', el);
            console.log(text);
            break;
    }
};

$formFight.addEventListener('submit', function(e){
    e.preventDefault();
    const enemy =  enemyAttack();
    const player = playerAttack();

    if(enemy.defence !== player.hit){
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2);
    }else{
        generateLogs('defence', player1, player2)
    };

    if(player.defence !== enemy.hit){
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1);
    }else{
        generateLogs('defence', player2, player1)
    };

    showResult();
});

