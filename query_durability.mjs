import { createPublicClient, http } from 'viem';
import { bsc } from 'viem/chains';
import { readFileSync } from 'fs';

const GAME = '0x58c2400527813f78fc7ed498dd4ec66dc7787e73';
const ADDR = '0x21443f009885c2d5ba98855bF4a9Db3908F83286';

const client = createPublicClient({ chain: bsc, transport: http('https://bsc-dataseed1.binance.org') });
const abi = JSON.parse(readFileSync('src/abis/SilentExpanseStrife.json'));

async function callView(name, args = []) {
  const f = abi.find(x => x.type === 'function' && x.name === name);
  try {
    return await client.readContract({ address: GAME, abi: [f], functionName: name, args });
  } catch (e) {
    return 'REVERT: ' + (e.shortMessage || e.message || String(e));
  }
}

console.log('addr:', ADDR);
console.log('getCollectorDurability:', await callView('getCollectorDurability', [ADDR]));
const civ = await callView('getCivilization', [ADDR]);
if (typeof civ === 'object' && civ) {
  const f = abi.find(x => x.type === 'function' && x.name === 'getCivilization');
  console.log('fields:', f.outputs.map(o => o.name));
  console.log('civ:', civ);
}
