export const positions = ['Intern','Associate','Supervisor','Manager','Director','VP','CEO'];

export const cards = [
  { id: 'm1', type: 'memo', name: 'Reply All Disaster', rarity: 'Rare', burnout: 2, sanity: 0, rank: 0, flavor: 'Your tiny typo became an enterprise-wide learning moment.' },
  { id: 'm2', type: 'memo', name: 'Budget Cuts', rarity: 'Common', burnout: 1, sanity: -1, rank: 0, flavor: 'Do more with less. Then do even more with even less.' },
  { id: 'm3', type: 'memo', name: 'Mandatory Overtime', rarity: 'Uncommon', burnout: 3, sanity: -1, rank: 0, flavor: 'The weekend was a rumor invented by morale consultants.' },
  { id: 'm4', type: 'memo', name: 'Performance Review Ambush', rarity: 'Rare', burnout: 2, sanity: -2, rank: 0, flavor: 'Great work. Also, here are seventeen surprise concerns.' },
  { id: 'm5', type: 'memo', name: 'Return To Office Mandate', rarity: 'Uncommon', burnout: 2, sanity: -1, rank: 0, flavor: 'Collaboration means commuting to video calls.' },
  { id: 'm6', type: 'memo', name: 'Synergy Workshop', rarity: 'Common', burnout: 1, sanity: 0, rank: 0, flavor: 'A circle of chairs. A bowl of stale mints. No survivors.' },
  { id: 'p1', type: 'pto', name: 'Mental Health Day', rarity: 'Rare', burnout: -3, sanity: 3, rank: 0, flavor: 'You silence notifications and briefly remember birds exist.' },
  { id: 'p2', type: 'pto', name: 'Sick Day', rarity: 'Common', burnout: -2, sanity: 1, rank: 0, flavor: 'A blanket, soup, and one guilty check of email.' },
  { id: 'p3', type: 'pto', name: 'Vacation Approved', rarity: 'Epic', burnout: -4, sanity: 4, rank: 0, flavor: 'The approval email glows like a sacred artifact.' },
  { id: 'p4', type: 'pto', name: 'Work From Home', rarity: 'Uncommon', burnout: -1, sanity: 2, rank: 0, flavor: 'Professional shirt. Pajama pants. Ancient wisdom.' },
  { id: 'p5', type: 'pto', name: 'Calendar Blocked', rarity: 'Common', burnout: -1, sanity: 1, rank: 0, flavor: 'A fake meeting with yourself becomes the only real meeting.' },
  { id: 'r1', type: 'position', name: 'Promotion Opportunity', rarity: 'Uncommon', burnout: 1, sanity: 0, rank: 1, flavor: 'More title. More meetings. Possibly money someday.' },
  { id: 'r2', type: 'position', name: 'Executive Visibility', rarity: 'Rare', burnout: 2, sanity: 0, rank: 2, flavor: 'Leadership saw your name. This is both good and terrible.' },
  { id: 'r3', type: 'position', name: 'Quiet Quit Ritual', rarity: 'Epic', burnout: -2, sanity: 5, rank: 0, flavor: 'You become impossible to emotionally invoice.' }
];

export function drawCard() {
  return { ...cards[Math.floor(Math.random() * cards.length)], instance: crypto.randomUUID() };
}

export function starterHand() {
  return [drawCard(), drawCard(), drawCard(), drawCard()];
}
