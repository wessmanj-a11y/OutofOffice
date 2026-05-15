const positions=['Intern','Associate','Supervisor','Manager','Director','VP','CEO'];
const cards=[
{name:'Reply All Disaster',type:'memo',burnout:2,sanity:0,rank:0,flavor:'Your typo reached everyone.'},
{name:'Budget Cuts',type:'memo',burnout:1,sanity:-1,rank:0,flavor:'Do more with less.'},
{name:'Mandatory Overtime',type:'memo',burnout:3,sanity:-1,rank:0,flavor:'Your weekend evaporates.'},
{name:'Mental Health Day',type:'pto',burnout:-3,sanity:3,rank:0,flavor:'You ignore Slack.'},
{name:'Vacation Approved',type:'pto',burnout:-4,sanity:4,rank:0,flavor:'Temporary freedom.'},
{name:'Work From Home',type:'pto',burnout:-1,sanity:2,rank:0,flavor:'Camera off. Soul on.'},
{name:'Promotion Opportunity',type:'position',burnout:1,sanity:0,rank:1,flavor:'More meetings unlocked.'}
];
let game;
function draw(){return {...cards[Math.floor(Math.random()*cards.length)]};}
function start(){game={rank:0,burnout:0,sanity:5,hand:[draw(),draw(),draw(),draw()],log:['Welcome to OUT OF OFFICE'],over:false};render();}
function playCard(i){if(game.over)return;const c=game.hand[i];game.rank=Math.min(positions.length-1,game.rank+c.rank);game.burnout=Math.max(0,game.burnout+c.burnout);game.sanity=Math.max(0,game.sanity+c.sanity);game.log.unshift(c.name+': '+c.flavor);game.hand.splice(i,1);game.hand.push(draw());if(game.rank===positions.length-1){game.over=true;document.getElementById('result').innerHTML='<div class="win">You became CEO.</div>';}else if(game.sanity>=20){game.over=true;document.getElementById('result').innerHTML='<div class="win">You escaped corporate.</div>';}else if(game.burnout>=12){game.over=true;document.getElementById('result').innerHTML='<div class="lose">Burnout consumed you.</div>';}render();}
function render(){document.getElementById('burnout').textContent=game.burnout;document.getElementById('sanity').textContent=game.sanity;document.getElementById('position').textContent=positions[game.rank];document.getElementById('ladder').innerHTML=positions.map((p,i)=>`<div class="${i===game.rank?'active':'rung'}">${p}</div>`).join('');document.getElementById('hand').innerHTML=game.hand.map((c,i)=>`<div class="card ${c.type}" onclick="playCard(${i})"><div><strong>${c.name}</strong><p>${c.flavor}</p></div><div class="chaos">${c.type.toUpperCase()}</div></div>`).join('');document.getElementById('log').innerHTML=game.log.slice(0,8).map(x=>`<p>${x}</p>`).join('');}
document.getElementById('newGame').onclick=()=>{document.getElementById('result').innerHTML='';start();};
start();