const positions=['Intern','Associate','Supervisor','Manager','Director','VP','CEO'];
const cards=[
{name:'Reply All Disaster',type:'memo',rarity:'Rare',icon:'📧💥',burnout:2,sanity:0,rank:0,flavor:'Your typo reached everyone. Legal replied with “interesting.”'},
{name:'Budget Cuts',type:'memo',rarity:'Common',icon:'✂️📉',burnout:1,sanity:-1,rank:0,flavor:'Do more with less, then less with nothing.'},
{name:'Mandatory Overtime',type:'memo',rarity:'Uncommon',icon:'🌙🖨️',burnout:3,sanity:-1,rank:0,flavor:'Your weekend evaporates into a spreadsheet fog.'},
{name:'Performance Review Ambush',type:'memo',rarity:'Rare',icon:'📋🪤',burnout:2,sanity:-2,rank:0,flavor:'Great work. Also, seventeen surprise concerns.'},
{name:'Return To Office Mandate',type:'memo',rarity:'Uncommon',icon:'🚗📹',burnout:2,sanity:-1,rank:0,flavor:'Commute two hours to join a video call.'},
{name:'Synergy Workshop',type:'memo',rarity:'Common',icon:'🤝🌀',burnout:1,sanity:-1,rank:0,flavor:'A circle of chairs. A bowl of mints. No escape.'},
{name:'Printer Blood Oath',type:'memo',rarity:'Epic',icon:'🖨️🩸',burnout:4,sanity:-2,rank:0,flavor:'The copier demands tribute and jams anyway.'},
{name:'Surprise Reorg',type:'memo',rarity:'Epic',icon:'🏢🎲',burnout:3,sanity:-2,rank:0,flavor:'Your boss now reports to someone named Blade.'},
{name:'Mental Health Day',type:'pto',rarity:'Rare',icon:'🧠🌤️',burnout:-3,sanity:3,rank:0,flavor:'You ignore Slack and briefly remember birds exist.'},
{name:'Vacation Approved',type:'pto',rarity:'Epic',icon:'🏖️✅',burnout:-4,sanity:4,rank:0,flavor:'The approval email glows like a sacred artifact.'},
{name:'Work From Home',type:'pto',rarity:'Uncommon',icon:'🏠🩳',burnout:-1,sanity:2,rank:0,flavor:'Camera off. Soul on. Pants theoretical.'},
{name:'Sick Day',type:'pto',rarity:'Common',icon:'🤒🍲',burnout:-2,sanity:1,rank:0,flavor:'Soup, blanket, and one guilty email check.'},
{name:'Calendar Blocked',type:'pto',rarity:'Common',icon:'📆🛡️',burnout:-1,sanity:1,rank:0,flavor:'A fake meeting with yourself becomes sacred ground.'},
{name:'PTO Ninja Vanish',type:'pto',rarity:'Legendary',icon:'🥷🌴',burnout:-5,sanity:5,rank:0,flavor:'You disappear so completely HR studies the footage.'},
{name:'Promotion Opportunity',type:'position',rarity:'Uncommon',icon:'🪜💼',burnout:1,sanity:0,rank:1,flavor:'More title. More meetings. Money allegedly pending.'},
{name:'Executive Visibility',type:'position',rarity:'Rare',icon:'👁️🏢',burnout:2,sanity:0,rank:2,flavor:'Leadership saw your name. This is both good and terrible.'},
{name:'LinkedIn Thought Leader',type:'position',rarity:'Epic',icon:'📣🦚',burnout:1,sanity:2,rank:1,flavor:'You post “humbled” and gain unnatural power.'},
{name:'Nepotism Hire',type:'position',rarity:'Legendary',icon:'👑🍼',burnout:0,sanity:-1,rank:2,flavor:'No skills detected. Promotion probability astronomical.'},
{name:'Quiet Quit Ritual',type:'pto',rarity:'Epic',icon:'🕯️🚪',burnout:-2,sanity:5,rank:0,flavor:'You become impossible to emotionally invoice.'}
];
let game;
function draw(){return {...cards[Math.floor(Math.random()*cards.length)]};}
function start(){game={rank:0,burnout:0,sanity:5,hand:[draw(),draw(),draw(),draw()],log:['Welcome to OUT OF OFFICE'],over:false};document.getElementById('result').innerHTML='';render();}
function playCard(i){if(game.over)return;const c=game.hand[i];game.rank=Math.min(positions.length-1,game.rank+c.rank);game.burnout=Math.max(0,game.burnout+c.burnout);game.sanity=Math.max(0,game.sanity+c.sanity);game.log.unshift(c.name+': '+c.flavor);game.hand.splice(i,1);game.hand.push(draw());if(game.rank===positions.length-1){game.over=true;document.getElementById('result').innerHTML='<div class="win">You became CEO. Your inbox becomes your final form.</div>';}else if(game.sanity>=20){game.over=true;document.getElementById('result').innerHTML='<div class="win">You escaped the rat race. Out of office forever.</div>';}else if(game.burnout>=12){game.over=true;document.getElementById('result').innerHTML='<div class="lose">Burnout consumed you. The printer remembers your name.</div>';}render();}
function render(){document.getElementById('burnout').textContent=game.burnout;document.getElementById('sanity').textContent=game.sanity;document.getElementById('position').textContent=positions[game.rank];document.getElementById('ladder').innerHTML=positions.map((p,i)=>`<div class="${i===game.rank?'active':'rung'}">${p}</div>`).join('');document.getElementById('hand').innerHTML=game.hand.map((c,i)=>`<article class="card ${c.type} ${c.rarity.toLowerCase()}" onclick="playCard(${i})"><div class="cardTop"><span>${c.type.toUpperCase()}</span><b>${c.rarity}</b></div><div class="art"><div class="icon">${c.icon}</div><div class="glitch"></div></div><h2>${c.name}</h2><p>${c.flavor}</p><div class="stats"><span>🔥 ${c.burnout>0?'+':''}${c.burnout}</span><span>🧠 ${c.sanity>0?'+':''}${c.sanity}</span><span>🪜 ${c.rank>0?'+':''}${c.rank}</span></div></article>`).join('');document.getElementById('log').innerHTML=game.log.slice(0,8).map(x=>`<p>${x}</p>`).join('');}
document.getElementById('newGame').onclick=start;
start();