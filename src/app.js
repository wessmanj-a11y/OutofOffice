const positions=['Intern','Associate','Supervisor','Manager','Director','VP','CEO'];
const personas=[
{name:'Intern Prodigy',icon:'🧑‍💻',power:'Draw 1 extra card after two PTO cards.',need:0},
{name:'Spreadsheet Adept',icon:'📊',power:'Position cards give +1 Sanity.',need:2},
{name:'Meeting Mage',icon:'🧙‍♂️',power:'Memo damage reduced by 1.',need:4},
{name:'Director of Chaos',icon:'🔥',power:'Combos trigger twice as hard.',need:7},
{name:'Out Of Office Ascended',icon:'🌌',power:'Win by surviving one more turn.',need:10}
];
const cards=[
{name:'Reply All Disaster',type:'memo',rarity:'Rare',icon:'📧💥',burnout:2,sanity:0,rank:0,tags:['email','chaos'],flavor:'Your typo reached everyone.'},
{name:'Budget Cuts',type:'memo',rarity:'Common',icon:'✂️📉',burnout:1,sanity:-1,rank:0,tags:['budget','chaos'],flavor:'Do more with less, then less with nothing.'},
{name:'Mandatory Overtime',type:'memo',rarity:'Uncommon',icon:'🌙🖨️',burnout:3,sanity:-1,rank:0,tags:['overtime','chaos'],flavor:'Your weekend evaporates.'},
{name:'Mental Health Day',type:'pto',rarity:'Rare',icon:'🧠🌤️',burnout:-3,sanity:3,rank:0,tags:['pto','heal'],flavor:'You ignore Slack and remember birds exist.'},
{name:'Vacation Approved',type:'pto',rarity:'Epic',icon:'🏖️✅',burnout:-4,sanity:4,rank:0,tags:['pto','heal'],flavor:'The approval email glows like treasure.'},
{name:'Work From Home',type:'pto',rarity:'Uncommon',icon:'🏠🩳',burnout:-1,sanity:2,rank:0,tags:['pto','remote'],flavor:'Camera off. Soul on.'},
{name:'Promotion Opportunity',type:'position',rarity:'Uncommon',icon:'🪜💼',burnout:1,sanity:0,rank:1,tags:['career'],flavor:'More title. More meetings.'},
{name:'Executive Visibility',type:'position',rarity:'Rare',icon:'👁️🏢',burnout:2,sanity:0,rank:2,tags:['career'],flavor:'Leadership saw your name.'},
{name:'LinkedIn Thought Leader',type:'position',rarity:'Epic',icon:'📣🦚',burnout:1,sanity:2,rank:1,tags:['career','social'],flavor:'You post humbled and gain power.'},
{name:'Quiet Quit Ritual',type:'pto',rarity:'Epic',icon:'🕯️🚪',burnout:-2,sanity:5,rank:0,tags:['pto','remote'],flavor:'You become impossible to emotionally invoice.'}
];
let game;
function draw(){return {...cards[Math.floor(Math.random()*cards.length)]};}
function start(){game={rank:0,burnout:0,sanity:5,xp:0,persona:0,rival:{rank:1,burnout:0,sanity:6},hand:[draw(),draw(),draw(),draw(),draw()],played:[],log:['Choose cards to build combos, evolve your Persona, then End Turn.'],over:false};document.getElementById('result').innerHTML='';document.getElementById('pack').innerHTML='';render();}
function combo(){const names=game.played.slice(-2).map(c=>c.name);const tags=game.played.flatMap(c=>c.tags);let bonus='None';if(names.includes('Work From Home')&&names.includes('Quiet Quit Ritual')){game.sanity+=4;game.burnout=Math.max(0,game.burnout-2);bonus='Ghost Employee';}
else if(tags.filter(t=>t==='career').length>=2){game.rank=Math.min(positions.length-1,game.rank+1);game.xp+=2;bonus='Career Ascension';}
else if(tags.filter(t=>t==='pto').length>=2){game.sanity+=2;game.xp+=1;bonus='PTO Chain';}
else if(tags.filter(t=>t==='chaos').length>=2){game.rival.burnout+=3;bonus='Corporate Death Spiral';}
document.getElementById('combo').textContent=bonus;if(bonus!=='None')game.log.unshift('COMBO: '+bonus+' triggered.');}
function evolve(){while(game.persona<personas.length-1&&game.xp>=personas[game.persona+1].need){game.persona++;game.log.unshift('PERSONA EVOLVED: '+personas[game.persona].name);}}
function check(){if(game.rank>=positions.length-1){game.over=true;document.getElementById('result').innerHTML='<div class="win">You reached CEO final form.</div>';}else if(game.sanity>=24){game.over=true;document.getElementById('result').innerHTML='<div class="win">You escaped the rat race.</div>';}else if(game.burnout>=12){game.over=true;document.getElementById('result').innerHTML='<div class="lose">Burnout consumed you.</div>';}else if(game.rival.rank>=positions.length-1){game.over=true;document.getElementById('result').innerHTML='<div class="lose">The Corporate Machine reached CEO before you.</div>';}}
function playCard(i){if(game.over)return;const c=game.hand[i];let burn=c.burnout;if(c.type==='memo'&&game.persona>=2)burn=Math.min(0,burn-1);game.rank=Math.min(positions.length-1,game.rank+c.rank);game.burnout=Math.max(0,game.burnout+burn);game.sanity=Math.max(0,game.sanity+c.sanity+(c.type==='position'&&game.persona>=1?1:0));game.xp+=c.rarity==='Epic'?2:c.rarity==='Rare'?1:0;game.played.push(c);game.log.unshift(c.name+': '+c.flavor);game.hand.splice(i,1);combo();evolve();check();render();}
function endTurn(){if(game.over)return;game.hand.push(draw());const move=Math.random();if(move>.62){game.rival.rank=Math.min(positions.length-1,game.rival.rank+1);game.log.unshift('Rival played Promotion Ladder Scam.');}else if(move>.32){game.burnout+=2;game.log.unshift('Rival played Emergency Alignment Meeting.');}else{game.rival.sanity+=2;game.log.unshift('Rival played Delegation Shield.');}game.played=[];document.getElementById('combo').textContent='None';check();render();}
function openPack(){const pulls=[draw(),draw(),draw()];game.hand.push(...pulls);document.getElementById('pack').innerHTML=pulls.map(c=>cardHtml(c,-1)).join('');game.log.unshift('Opened a booster pack: '+pulls.map(c=>c.name).join(', '));render();}
function cardHtml(c,i){return `<article class="card ${c.type} ${c.rarity.toLowerCase()}" ${i>=0?`onclick="playCard(${i})"`:''}><div class="cardTop"><span>${c.type.toUpperCase()}</span><b>${c.rarity}</b></div><div class="art"><div class="icon">${c.icon}</div><div class="glitch"></div></div><h2>${c.name}</h2><p>${c.flavor}</p><div class="stats"><span>🔥 ${c.burnout>0?'+':''}${c.burnout}</span><span>🧠 ${c.sanity>0?'+':''}${c.sanity}</span><span>🪜 ${c.rank>0?'+':''}${c.rank}</span></div></article>`;}
function render(){const p=personas[game.persona];document.getElementById('burnout').textContent=game.burnout;document.getElementById('sanity').textContent=game.sanity;document.getElementById('rivalPosition').textContent=positions[game.rival.rank];document.getElementById('rivalStats').textContent='Burnout '+game.rival.burnout+' • Sanity '+game.rival.sanity;document.getElementById('persona').innerHTML=`<div class="personaCard"><div class="personaIcon">${p.icon}</div><div><h2>${p.name} Lv.${game.persona+1}</h2><p>${p.power}</p><b>XP ${game.xp}</b></div></div>`;document.getElementById('ladder').innerHTML=positions.map((x,i)=>`<div class="${i===game.rank?'active':i===game.rival.rank?'rival':'rung'}">${x}</div>`).join('');document.getElementById('hand').innerHTML=game.hand.map((c,i)=>cardHtml(c,i)).join('');document.getElementById('log').innerHTML=game.log.slice(0,10).map(x=>`<p>${x}</p>`).join('');}
document.getElementById('newGame').onclick=start;document.getElementById('endTurn').onclick=endTurn;document.getElementById('openPack').onclick=openPack;start();