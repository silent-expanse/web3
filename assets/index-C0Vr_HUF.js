import{t as pn,r as h,j as t,E as ge,b as r,f as Oe,c as un}from"./framework-Bz0v_qGz.js";import{u as je,Q as yn,b as mn}from"./query-DWD-fU0i.js";import{k as gn,l as fn,m as bn,n as xn,W as hn,c as vn}from"./wagmi-CiHCTEOf.js";import{B as Tn,C as se,f as Me,g as _n,M as pt,p as wn,i as Sn}from"./ethers-BafU9DwG.js";import{d as Ye,R as En,C as Fe}from"./rainbowkit-BkFBfxCJ.js";import{x as ut,y as Cn}from"./viem-Cw9GBbks.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const p of l)if(p.type==="childList")for(const u of p.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function s(l){const p={};return l.integrity&&(p.integrity=l.integrity),l.referrerPolicy&&(p.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?p.credentials="include":l.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function o(l){if(l.ep)return;l.ep=!0;const p=s(l);fetch(l.href,p)}})();const kn={},yt=e=>{let a;const s=new Set,o=(k,$)=>{const b=typeof k=="function"?k(a):k;if(!Object.is(b,a)){const z=a;a=$??(typeof b!="object"||b===null)?b:Object.assign({},a,b),s.forEach(B=>B(a,z))}},l=()=>a,T={setState:o,getState:l,getInitialState:()=>g,subscribe:k=>(s.add(k),()=>s.delete(k)),destroy:()=>{(kn?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),s.clear()}},g=a=e(o,l,T);return T},Mn=e=>e?yt(e):yt,Vt={},{useDebugValue:jn}=pn,{useSyncExternalStoreWithSelector:An}=gn;let mt=!1;const Nn=e=>e;function $n(e,a=Nn,s){(Vt?"production":void 0)!=="production"&&s&&!mt&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),mt=!0);const o=An(e.subscribe,e.getState,e.getServerState||e.getInitialState,a,s);return jn(o),o}const gt=e=>{(Vt?"production":void 0)!=="production"&&typeof e!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const a=typeof e=="function"?Mn(e):e,s=(o,l)=>$n(a,o,l);return Object.assign(s,a),s},Rn=e=>e?gt(e):gt;let ft=0;const i=Rn(e=>({connected:!1,address:null,playerCiv:null,attackTokens:{current:0,max:0,intervalSec:0,ratePerSec:0},pendingEnergy:0,isDestroyed:!1,sesBalance:"0",entryFee:"0.01",enemyCivs:new Map,battleLog:[],battleCount:0,currentAlliance:null,pendingRefund:0,selectedTarget:null,loading:!1,error:null,toasts:[],attackBeams:[],lastAttackTime:0,lastCollectTime:0,collectRate:0,collectorDurability:{current:0,max:0},moveEta:0,combatBoost:0,pendingCollect:0,shieldDefense:0,attackPower:0,attackEnergyCost:0,speed:0,radarRange:0,marketOrders:[],_allianceMembers:[],_allianceTotemLevel:0,_allianceTotemEnergy:0,_allianceTotemUpgradeCost:0,_allianceIsLeader:!1,_allianceLeader:"",_alliancePendingRefund:0,lastClaimDay:0,currentEpoch:0,epochClaimed:!1,lastDistributedEpoch:0,epochStartTime:0,epochEndTime:0,dailyEmission:0,searchAddress:"",searchResult:null,setConnected:a=>e({connected:!0,address:a}),setDisconnected:()=>e({connected:!1,address:null,playerCiv:null,sesBalance:"0",currentAlliance:null,battleLog:[],enemyCivs:new Map,pendingEnergy:0,isDestroyed:!1,toasts:[],attackBeams:[],lastCollectTime:0,collectRate:0,collectorDurability:{current:0,max:0},moveEta:0,combatBoost:0,pendingCollect:0,shieldDefense:0,attackPower:0,attackEnergyCost:0,speed:0,radarRange:0,marketOrders:[],_allianceMembers:[],_allianceTotemLevel:0,_allianceTotemEnergy:0,_allianceTotemUpgradeCost:0,_allianceIsLeader:!1,_allianceLeader:"",_alliancePendingRefund:0,currentEpoch:0,epochClaimed:!1,lastDistributedEpoch:0,epochStartTime:0,epochEndTime:0,dailyEmission:0}),setPlayerCiv:a=>e({playerCiv:a}),setAttackTokens:a=>e({attackTokens:a}),setPendingEnergy:a=>e({pendingEnergy:a}),setSESBalance:a=>e({sesBalance:a}),setEntryFee:a=>e({entryFee:a}),addEnemyCiv:(a,s)=>e(o=>{const l=new Map(o.enemyCivs);return l.set(a,s),{enemyCivs:l}}),clearEnemyCivs:()=>e({enemyCivs:new Map}),addBattleLog:a=>e(s=>({battleLog:[a,...s.battleLog].slice(0,100)})),setBattleCount:a=>e({battleCount:a}),setAlliance:a=>e({currentAlliance:a}),setPendingRefund:a=>e({pendingRefund:a}),setSelectedTarget:a=>e({selectedTarget:a}),setLoading:a=>e({loading:a}),setError:a=>e({error:a}),addToast:(a,s="info")=>{const o=++ft;e(l=>({toasts:[...l.toasts,{id:o,message:a,type:s,timestamp:Date.now()}]})),setTimeout(()=>{e(l=>({toasts:l.toasts.filter(p=>p.id!==o)}))},3500)},addSuccessToast:a=>{i.getState().addToast(a,"success")},addErrorToast:a=>{i.getState().addToast(a,"error"),e({error:a})},removeToast:a=>e(s=>({toasts:s.toasts.filter(o=>o.id!==a)})),addAttackBeam:(a,s)=>{const o=++ft;e(l=>({attackBeams:[...l.attackBeams,{id:o,from:a,to:s,timestamp:Date.now()}]})),setTimeout(()=>{e(l=>({attackBeams:l.attackBeams.filter(p=>p.id!==o)}))},600)},clearAttackBeams:()=>e({attackBeams:[]}),setSearchAddress:a=>e({searchAddress:a}),setSearchResult:a=>e({searchResult:a}),claimSES:()=>{const a=Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0).getTime())/864e5);e({lastClaimDay:a})}})),Ln={SilentExpanseStrife:{address:"0x58c2400527813f78fc7ed498dd4ec66dc7787e73",description:"Main game entry contract (proxy)"},SES:{address:"0x1491e226292cf61aba5717828540c0f2518301c6",description:"Silent Expanse: Strife Token (ERC-20)"},Alliance:{address:"0x424923b65b9a224a3a96222a6e54b250887ce119",description:"Alliance system"},EnergyMarket:{address:"0x2dc9fff0edf2f4e1495eb8bb9b7ca117c635bf77",description:"Energy order-book marketplace"},DailyMinter:{address:"0x52ca63564e15ed70d012a70ea14d9d2e3701be1d",description:"Daily SES distribution"},AgentRegistry:{address:"0x05f85522651ea88d788f61ad0e2d410054c9e219",description:"AI Agent policy registry"}},In={contracts:Ln},Pn=In;function be(e){var p;const a=`VITE_${e.replace(/([A-Z])/g,"_$1").toUpperCase()}`,o=typeof import.meta<"u"?(p=import.meta.env)==null?void 0:p[a]:void 0;if(o)return o;const l=Pn.contracts[e];if(!l)throw new Error(`Unknown contract: ${e}`);return l.address}const Ge={},V={INITIAL_ENERGY:2e3,INITIAL_HEALTH:3e3,INITIAL_SCAN_RANGE:1e3,NEWBIE_PROTECTION_SECONDS:86400,BASE_COLLECT:3,COLLECT_BONUS:10,DURABILITY_BASE:86400,DURABILITY_PER_LV:7200,ATK_BASE:900,ATK_RATE:10,DEF_BASE:540,DEF_RATE:6,ATTACK_ENERGY_BASE:5e4,ATTACK_ENERGY_PER_LV:5e4,PLUNDER_RATIO:500,LAST_HIT_BONUS_PERCENT:50,DOWNGRADE_DIVISOR:10,SHIELD_DMG_BONUS:200,SHIELD_HP_BASE:3600,SHIELD_HP_RATE:15,REGEN_BASE:50,REGEN_RATE:1,SHIELD_REGEN_ENERGY_RATIO:1,WEAPON_DUR_BASE:60,WEAPON_DUR_PER_LV:15,SHIELD_DUR_BASE:40,SHIELD_DUR_PER_LV:10,ENGINE_DUR_BASE:30,ENGINE_DUR_PER_LV:6,RADAR_BASE:1e3,RADAR_LINEAR:150,RADAR_QUAD:5,ENGINE_SPEED_BASE:10,ENGINE_SPEED_PER_LV:5,JUMP_COOLDOWN:3600,JUMP_ENERGY_BASE:2e5,JUMP_ENERGY_MAX:165e5,JUMP_ENERGY_PER_SQRT:2e5,JUMP_SES_BASE:10,JUMP_SES_MAX:1e3,JUMP_SES_PER_SQRT:10,JUMP_TRACKING_RADAR_LV:20,TOKEN_BASE_MAX:3,TOKEN_BASE_INTERVAL:3,TOKEN_MAX_CAP:10,TOKEN_MIN_INTERVAL:1,TOKEN_INTERVAL_MS_BASE:300,TOKEN_INTERVAL_REDUCTION:10,UPKEEP_PER_LEVEL:2e3,REPAIR_COST_PER_SEC:1,SHIELD_REPAIR_COST:4,WEAPON_REPAIR_COST:3,ENGINE_REPAIR_COST:5,REBUILD_ENERGY_COST:5e5,REFERRAL_ENERGY_REWARD:150,SES_DECIMALS:18,DAILY_SES_BASE:23050,DAILY_SES_EMISSION:1152575342,SES_GROWTH_BPS:5e3,ANCHOR_BASE_BPS:1e4,ANCHOR_MID_BPS:3e5,ANCHOR_MAX_BPS:6e5,ANCHOR_PIVOT_1:100,ANCHOR_PIVOT_2:1e3,ENTRY_FEE_MIN:10000000000000000n,ENTRY_FEE_MAX:50000000000000000n,FEE_RAMP_UP_TIME:31536e3,ORDER_DELAY_SEC:3,SILENT_EXPANSE:be("SilentExpanseStrife"),SES_TOKEN:be("SES"),ALLIANCE:be("Alliance"),ENERGY_MARKET:be("EnergyMarket"),DAILY_MINTER:be("DailyMinter"),AGENT_REGISTRY:be("AgentRegistry"),CHAIN_ID:Number(typeof import.meta<"u"&&(Ge==null?void 0:Ge.VITE_CHAIN_ID)||56)},J={energyCollector:{name:"采集",icon:"/assets/systems/collector.web.png",color:"#44ff88",label:"能量采集"},weapon:{name:"武器",icon:"/assets/systems/weapon.web.png",color:"#ff4444",label:"武器系统"},shield:{name:"护盾",icon:"/assets/systems/shield.web.png",color:"#ffaa00",label:"护盾系统"},radar:{name:"雷达",icon:"/assets/systems/radar.web.png",color:"#4488ff",label:"雷达系统"},engine:{name:"引擎",icon:"/assets/systems/engine.web.png",color:"#ff66cc",label:"引擎系统"}},Bn=[{type:"constructor",inputs:[{name:"_sesToken",type:"address",internalType:"address"},{name:"_allianceSystem",type:"address",internalType:"address"},{name:"_battleLogic",type:"address",internalType:"address"},{name:"_movementLogic",type:"address",internalType:"address"},{name:"_adminLogic",type:"address",internalType:"address"},{name:"_gameplayLogic",type:"address",internalType:"address"},{name:"_agentRegistry",type:"address",internalType:"address"}],stateMutability:"nonpayable"},{type:"receive",stateMutability:"payable"},{type:"function",name:"ANCHOR_BASE_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ANCHOR_MAX_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ANCHOR_MID_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ANCHOR_PIVOT_1",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ANCHOR_PIVOT_2",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ATK_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ATK_RATE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ATTACK_ENERGY_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ATTACK_ENERGY_PER_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"BASE_COLLECT",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"COLLECT_BONUS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DAILY_SES_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DAILY_SES_EMISSION",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DEF_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DEF_RATE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DESTRUCTION_RATE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DOWNGRADE_DIVISOR",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DURABILITY_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DURABILITY_PER_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENGINE_DUR_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENGINE_DUR_PER_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENGINE_REPAIR_COST",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENGINE_SPEED_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENGINE_SPEED_PER_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENTRY_FEE_MAX",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENTRY_FEE_MIN",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"FEE_RAMP_UP_TIME",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"INF_DISTANCE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"INITIAL_ENERGY",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"INITIAL_HEALTH",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"INITIAL_SCAN_RANGE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_COOLDOWN",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_ENERGY_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_ENERGY_MAX",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_ENERGY_PER_SQRT",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_SES_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_SES_MAX",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_SES_PER_SQRT",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_TRACKING_RADAR_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"LAST_HIT_BONUS_PERCENT",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MAX_BATTLE_HISTORY",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MAX_HEALTH",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MAX_SAFE_DIST",inputs:[],outputs:[{name:"",type:"int256",internalType:"int256"}],stateMutability:"view"},{type:"function",name:"NEWBIE_PROTECTION_SECONDS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"PLUNDER_RATIO",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"RADAR_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"RADAR_LINEAR",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"RADAR_QUAD",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"REBUILD_ENERGY_COST",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"REFERRAL_ENERGY_REWARD",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"REGEN_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"REGEN_RATE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"REPAIR_COST_PER_SEC",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SES_GROWTH_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_DMG_BONUS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_DUR_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_DUR_PER_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_HP_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_HP_RATE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_REGEN_ENERGY_RATIO",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_REPAIR_COST",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SYS_COLLECTOR",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"SYS_ENGINE",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"SYS_RADAR",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"SYS_SHIELD",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"SYS_WEAPON",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"TOKEN_BASE_INTERVAL",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOKEN_BASE_MAX",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOKEN_INTERVAL_MS_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOKEN_INTERVAL_REDUCTION",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOKEN_MAX_CAP",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOKEN_MIN_INTERVAL",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"UPKEEP_PER_LEVEL",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"WEAPON_DUR_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"WEAPON_DUR_PER_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"WEAPON_REPAIR_COST",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"activeCivilizationCount",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"adminLogic",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"agentRegistry",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"allPlayers",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"allianceSystem",inputs:[],outputs:[{name:"",type:"address",internalType:"contract SilentExpanseStrifeAlliance"}],stateMutability:"view"},{type:"function",name:"assistShieldRepair",inputs:[{name:"t",type:"address",internalType:"address"},{name:"a",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"attack",inputs:[{name:"t",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"attackFor",inputs:[{name:"t",type:"address",internalType:"address"},{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"battleLogic",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"cancelMove",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"claimCombatEnergy",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"claimCombatEnergyFor",inputs:[{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"collectEnergy",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"collectEnergyFor",inputs:[{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"createCivilization",inputs:[{name:"name",type:"string",internalType:"string"}],outputs:[],stateMutability:"payable"},{type:"function",name:"createCivilization",inputs:[{name:"name",type:"string",internalType:"string"},{name:"referrer_",type:"address",internalType:"address"}],outputs:[],stateMutability:"payable"},{type:"function",name:"donateToTotem",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"},{name:"amount",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"donateToTotemFor",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"},{name:"amount",type:"uint256",internalType:"uint256"},{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"energyAllowance",inputs:[{name:"",type:"address",internalType:"address"},{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"energyMarket",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"energyReserved",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"feeRecipient",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"gameStartTime",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"gameplayLogic",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"getActivePlayerCount",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getAttackEnergyCost",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getAttackPower",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getAttackTokenInfo",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"tokens",type:"uint256",internalType:"uint256"},{name:"max",type:"uint256",internalType:"uint256"},{name:"interval",type:"uint256",internalType:"uint256"},{name:"rate",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getBattleCount",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getBattleHistory",inputs:[{name:"offset",type:"uint256",internalType:"uint256"},{name:"limit",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"tuple[]",internalType:"struct SilentExpanseStrifeStorage.BattleRecord[]",components:[{name:"attacker",type:"address",internalType:"address"},{name:"defender",type:"address",internalType:"address"},{name:"timestamp",type:"uint256",internalType:"uint256"},{name:"damageDealt",type:"uint256",internalType:"uint256"},{name:"shieldDamage",type:"uint256",internalType:"uint256"},{name:"healthDamage",type:"uint256",internalType:"uint256"},{name:"stolenEnergy",type:"uint256",internalType:"uint256"},{name:"downgradedSystem",type:"string",internalType:"string"},{name:"attackerWon",type:"bool",internalType:"bool"}]}],stateMutability:"view"},{type:"function",name:"getCivilization",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"tuple",internalType:"struct SilentExpanseStrifeStorage.Civilization",components:[{name:"name",type:"string",internalType:"string"},{name:"location",type:"tuple",internalType:"struct SilentExpanseStrifeStorage.Coordinates",components:[{name:"x",type:"int256",internalType:"int256"},{name:"y",type:"int256",internalType:"int256"},{name:"z",type:"int256",internalType:"int256"}]},{name:"energy",type:"uint256",internalType:"uint256"},{name:"health",type:"uint256",internalType:"uint256"},{name:"energyCollectorLv",type:"uint256",internalType:"uint256"},{name:"weaponLv",type:"uint256",internalType:"uint256"},{name:"radarLv",type:"uint256",internalType:"uint256"},{name:"shieldLv",type:"uint256",internalType:"uint256"},{name:"engineLv",type:"uint256",internalType:"uint256"},{name:"scanRange",type:"uint256",internalType:"uint256"},{name:"lastUpdateTime",type:"uint256",internalType:"uint256"},{name:"creationTime",type:"uint256",internalType:"uint256"},{name:"exists",type:"bool",internalType:"bool"},{name:"isRuins",type:"bool",internalType:"bool"},{name:"ruinsTimestamp",type:"uint256",internalType:"uint256"}]}],stateMutability:"view"},{type:"function",name:"getCivilizations",inputs:[{name:"players",type:"address[]",internalType:"address[]"}],outputs:[{name:"",type:"tuple[]",internalType:"struct SilentExpanseStrifeStorage.Civilization[]",components:[{name:"name",type:"string",internalType:"string"},{name:"location",type:"tuple",internalType:"struct SilentExpanseStrifeStorage.Coordinates",components:[{name:"x",type:"int256",internalType:"int256"},{name:"y",type:"int256",internalType:"int256"},{name:"z",type:"int256",internalType:"int256"}]},{name:"energy",type:"uint256",internalType:"uint256"},{name:"health",type:"uint256",internalType:"uint256"},{name:"energyCollectorLv",type:"uint256",internalType:"uint256"},{name:"weaponLv",type:"uint256",internalType:"uint256"},{name:"radarLv",type:"uint256",internalType:"uint256"},{name:"shieldLv",type:"uint256",internalType:"uint256"},{name:"engineLv",type:"uint256",internalType:"uint256"},{name:"scanRange",type:"uint256",internalType:"uint256"},{name:"lastUpdateTime",type:"uint256",internalType:"uint256"},{name:"creationTime",type:"uint256",internalType:"uint256"},{name:"exists",type:"bool",internalType:"bool"},{name:"isRuins",type:"bool",internalType:"bool"},{name:"ruinsTimestamp",type:"uint256",internalType:"uint256"}]}],stateMutability:"view"},{type:"function",name:"getCollectorDurability",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"current",type:"uint256",internalType:"uint256"},{name:"max",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getCombatBoost",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getCompactPlayers",inputs:[{name:"players",type:"address[]",internalType:"address[]"}],outputs:[{name:"",type:"tuple[]",internalType:"struct SilentExpanseStrife.CompactPlayer[]",components:[{name:"player",type:"address",internalType:"address"},{name:"x",type:"int256",internalType:"int256"},{name:"y",type:"int256",internalType:"int256"},{name:"z",type:"int256",internalType:"int256"},{name:"name",type:"string",internalType:"string"},{name:"isRuins",type:"bool",internalType:"bool"},{name:"isMoving",type:"bool",internalType:"bool"},{name:"eta",type:"uint256",internalType:"uint256"}]}],stateMutability:"view"},{type:"function",name:"getCurrentPosition",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"pos",type:"tuple",internalType:"struct SilentExpanseStrifeStorage.Coordinates",components:[{name:"x",type:"int256",internalType:"int256"},{name:"y",type:"int256",internalType:"int256"},{name:"z",type:"int256",internalType:"int256"}]},{name:"isMoving",type:"bool",internalType:"bool"},{name:"eta",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getCurrentShieldHP",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getDistance",inputs:[{name:"a",type:"address",internalType:"address"},{name:"b",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getEnergyCollectRate",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getPendingEnergy",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getShieldDefense",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getSpeed",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getRadarRange",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getEntryFee",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getJumpCount",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getMaxShieldHP",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getPlayerCount",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getPlayers",inputs:[{name:"offset",type:"uint256",internalType:"uint256"},{name:"limit",type:"uint256",internalType:"uint256"}],outputs:[{name:"players",type:"address[]",internalType:"address[]"},{name:"total",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getPositions",inputs:[{name:"players",type:"address[]",internalType:"address[]"}],outputs:[{name:"pos",type:"tuple[]",internalType:"struct SilentExpanseStrifeStorage.Coordinates[]",components:[{name:"x",type:"int256",internalType:"int256"},{name:"y",type:"int256",internalType:"int256"},{name:"z",type:"int256",internalType:"int256"}]},{name:"moving",type:"bool[]",internalType:"bool[]"},{name:"eta",type:"uint256[]",internalType:"uint256[]"}],stateMutability:"view"},{type:"function",name:"getRebirthCount",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getSimpleStatuses",inputs:[{name:"players",type:"address[]",internalType:"address[]"}],outputs:[{name:"",type:"tuple[]",internalType:"struct SilentExpanseStrife.SimpleStatus[]",components:[{name:"player",type:"address",internalType:"address"},{name:"energy",type:"uint256",internalType:"uint256"},{name:"health",type:"uint256",internalType:"uint256"},{name:"collectorLv",type:"uint256",internalType:"uint256"},{name:"weaponLv",type:"uint256",internalType:"uint256"},{name:"shieldLv",type:"uint256",internalType:"uint256"},{name:"radarLv",type:"uint256",internalType:"uint256"},{name:"engineLv",type:"uint256",internalType:"uint256"},{name:"shieldHP",type:"uint256",internalType:"uint256"},{name:"shieldMax",type:"uint256",internalType:"uint256"},{name:"exists",type:"bool",internalType:"bool"},{name:"isRuins",type:"bool",internalType:"bool"}]}],stateMutability:"view"},{type:"function",name:"getUpgradeCost",inputs:[{name:"player",type:"address",internalType:"address"},{name:"system",type:"string",internalType:"string"}],outputs:[{name:"ses",type:"uint256",internalType:"uint256"},{name:"energy",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getUpgradePreview",inputs:[{name:"player",type:"address",internalType:"address"},{name:"system",type:"string",internalType:"string"}],outputs:[{name:"current",type:"uint256",internalType:"uint256"},{name:"next",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"isInRange",inputs:[{name:"scanner",type:"address",internalType:"address"},{name:"target",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"lockEnergyForOrder",inputs:[{name:"s",type:"address",internalType:"address"},{name:"a",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"movementLogic",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"owner",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"pendingCombatEnergy",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"playerIndex",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"rebuildCivilization",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"rebuildCivilizationFor",inputs:[{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"referralCount",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"referrer",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"regenShield",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"renounceOwnership",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"repairAll",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"repairAllFor",inputs:[{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"repairCollector",inputs:[{name:"a",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"repairCollectorFor",inputs:[{name:"p",type:"address",internalType:"address"},{name:"a",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"repairShield",inputs:[{name:"a",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"repairShieldFor",inputs:[{name:"a",type:"uint256",internalType:"uint256"},{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"sesToken",inputs:[],outputs:[{name:"",type:"address",internalType:"contract SilentExpanseStrifeToken"}],stateMutability:"view"},{type:"function",name:"setAdminLogic",inputs:[{name:"_adminLogicAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setAgentRegistry",inputs:[{name:"_agentRegistryAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setEnergyMarket",inputs:[{name:"_energyMarket",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setFeeRecipient",inputs:[{name:"r",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setGameplayLogic",inputs:[{name:"_gameplayLogicAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"settleLockedOrder",inputs:[{name:"f",type:"address",internalType:"address"},{name:"t",type:"address",internalType:"address"},{name:"ta",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"spaceJump",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"spaceJumpFor",inputs:[{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"startMove",inputs:[{name:"x",type:"int256",internalType:"int256"},{name:"y",type:"int256",internalType:"int256"},{name:"z",type:"int256",internalType:"int256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"totalCivilizations",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"totalFeesCollected",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"trackingJump",inputs:[{name:"t",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"unlockEnergyForOrder",inputs:[{name:"s",type:"address",internalType:"address"},{name:"a",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"upgradeSystem",inputs:[{name:"sysId",type:"uint8",internalType:"uint8"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"upgradeSystemFor",inputs:[{name:"sysId",type:"uint8",internalType:"uint8"},{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"upgradeTotem",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"upgradeTotemFor",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"},{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"withdrawFees",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"event",name:"AdminLogicSet",inputs:[{name:"logic",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"AgentRegistrySet",inputs:[{name:"registry",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"AllSystemsRepaired",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"cost",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"AttackExecuted",inputs:[{name:"attacker",type:"address",indexed:!0,internalType:"address"},{name:"defender",type:"address",indexed:!0,internalType:"address"},{name:"shieldDmg",type:"uint256",indexed:!1,internalType:"uint256"},{name:"healthDmg",type:"uint256",indexed:!1,internalType:"uint256"},{name:"stolenEnergy",type:"uint256",indexed:!1,internalType:"uint256"},{name:"downgradedSystem",type:"string",indexed:!1,internalType:"string"},{name:"attackerWon",type:"bool",indexed:!1,internalType:"bool"}],anonymous:!1},{type:"event",name:"AttackSoftGated",inputs:[{name:"attacker",type:"address",indexed:!0,internalType:"address"},{name:"defender",type:"address",indexed:!0,internalType:"address"},{name:"reason",type:"string",indexed:!1,internalType:"string"}],anonymous:!1},{type:"event",name:"CivCreated",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"name",type:"string",indexed:!1,internalType:"string"},{name:"x",type:"int256",indexed:!1,internalType:"int256"},{name:"y",type:"int256",indexed:!1,internalType:"int256"},{name:"z",type:"int256",indexed:!1,internalType:"int256"},{name:"fee",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"CivDestroyed",inputs:[{name:"target",type:"address",indexed:!0,internalType:"address"},{name:"attacker",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"CivRebuilt",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"costSES",type:"uint256",indexed:!1,internalType:"uint256"},{name:"costEnergy",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"CollectorRepaired",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"cost",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"CombatEnergyClaimed",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"EnergyCollected",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"EnergyLocked",inputs:[{name:"seller",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"EnergyMarketSet",inputs:[{name:"market",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"EnergyTransferred",inputs:[{name:"from",type:"address",indexed:!0,internalType:"address"},{name:"to",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"EnergyUnlocked",inputs:[{name:"seller",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"FeesWithdrawn",inputs:[{name:"owner",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"GameplayLogicSet",inputs:[{name:"logic",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"MoveCancelled",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"MoveCompleted",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"toX",type:"int256",indexed:!1,internalType:"int256"},{name:"toY",type:"int256",indexed:!1,internalType:"int256"},{name:"toZ",type:"int256",indexed:!1,internalType:"int256"}],anonymous:!1},{type:"event",name:"MoveStarted",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"fromX",type:"int256",indexed:!1,internalType:"int256"},{name:"fromY",type:"int256",indexed:!1,internalType:"int256"},{name:"fromZ",type:"int256",indexed:!1,internalType:"int256"},{name:"toX",type:"int256",indexed:!1,internalType:"int256"},{name:"toY",type:"int256",indexed:!1,internalType:"int256"},{name:"toZ",type:"int256",indexed:!1,internalType:"int256"},{name:"cost",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"OwnershipRenounced",inputs:[{name:"newOwner",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"PolicyViolation",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"reason",type:"string",indexed:!1,internalType:"string"}],anonymous:!1},{type:"event",name:"ShieldRepaired",inputs:[{name:"target",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"cost",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"SpaceJumped",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"jumpCount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"x",type:"int256",indexed:!1,internalType:"int256"},{name:"y",type:"int256",indexed:!1,internalType:"int256"},{name:"z",type:"int256",indexed:!1,internalType:"int256"},{name:"energyCost",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesCost",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"SystemUpgraded",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"system",type:"string",indexed:!1,internalType:"string"},{name:"newLv",type:"uint256",indexed:!1,internalType:"uint256"},{name:"costSES",type:"uint256",indexed:!1,internalType:"uint256"},{name:"costEnergy",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"UpkeepDeducted",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"totalLevel",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"error",name:"E_AlreadyCiv",inputs:[]},{type:"error",name:"E_AlreadyClaimed",inputs:[]},{type:"error",name:"E_AlreadyReferred",inputs:[]},{type:"error",name:"E_AlreadyThere",inputs:[]},{type:"error",name:"E_CivNotFound",inputs:[]},{type:"error",name:"E_DelegatecallFailed",inputs:[{name:"module",type:"string",internalType:"string"}]},{type:"error",name:"E_DurabilityFull",inputs:[]},{type:"error",name:"E_EngineWorn",inputs:[]},{type:"error",name:"E_InsufficientUnlocked",inputs:[]},{type:"error",name:"E_InvalidCiv",inputs:[]},{type:"error",name:"E_InvalidName",inputs:[]},{type:"error",name:"E_InvalidReferrer",inputs:[]},{type:"error",name:"E_InvalidSystem",inputs:[]},{type:"error",name:"E_JumpCooldown",inputs:[]},{type:"error",name:"E_LeaveCooldown",inputs:[]},{type:"error",name:"E_LogicAlreadySet",inputs:[]},{type:"error",name:"E_LowAllowance",inputs:[]},{type:"error",name:"E_LowEnergy",inputs:[]},{type:"error",name:"E_MarketAlreadySet",inputs:[]},{type:"error",name:"E_NoActivePlayers",inputs:[]},{type:"error",name:"E_NoPendingEnergy",inputs:[]},{type:"error",name:"E_NotEnergyMarket",inputs:[]},{type:"error",name:"E_NotInAlliance",inputs:[]},{type:"error",name:"E_NotOwner",inputs:[]},{type:"error",name:"E_NotRuins",inputs:[]},{type:"error",name:"E_PolicyBlocked",inputs:[]},{type:"error",name:"E_RadarTooLow",inputs:[]},{type:"error",name:"E_RateLimited",inputs:[]},{type:"error",name:"E_SameAlliance",inputs:[]},{type:"error",name:"E_SelfReferral",inputs:[]},{type:"error",name:"E_SelfTarget",inputs:[]},{type:"error",name:"E_ShareTooSmall",inputs:[]},{type:"error",name:"E_ShieldFull",inputs:[]},{type:"error",name:"E_TargetNotScanned",inputs:[]},{type:"error",name:"E_TargetProtected",inputs:[]},{type:"error",name:"E_TargetShieldFull",inputs:[]},{type:"error",name:"E_TooFar",inputs:[]},{type:"error",name:"E_UseCreateCiv",inputs:[]},{type:"error",name:"E_WithdrawFailed",inputs:[]},{type:"error",name:"E_WrongAlliance",inputs:[]},{type:"error",name:"E_WrongFee",inputs:[]},{type:"error",name:"E_ZeroAddress",inputs:[]},{type:"error",name:"E_ZeroTotal",inputs:[]}],Dn=[{type:"constructor",inputs:[],stateMutability:"nonpayable"},{type:"function",name:"DAILY_EMISSION",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DEV_FEE_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"EMISSION_DAYS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MARKETING_FEE_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MAX_MINT_PER_TX",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOKEN_DECIMALS",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"TOKEN_NAME",inputs:[],outputs:[{name:"",type:"string",internalType:"string"}],stateMutability:"view"},{type:"function",name:"TOKEN_SYMBOL",inputs:[],outputs:[{name:"",type:"string",internalType:"string"}],stateMutability:"view"},{type:"function",name:"TOTAL_FEE_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOTAL_SUPPLY",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"accruedDevFees",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"accruedMarketingFees",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"allowance",inputs:[{name:"owner",type:"address",internalType:"address"},{name:"spender",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"approve",inputs:[{name:"spender",type:"address",internalType:"address"},{name:"value",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"nonpayable"},{type:"function",name:"authorizedMinters",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"balanceOf",inputs:[{name:"account",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"burn",inputs:[{name:"value",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"burnFrom",inputs:[{name:"from",type:"address",internalType:"address"},{name:"amount",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"decimals",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"devFeeCollector",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"distributeFees",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"getSupplyInfo",inputs:[],outputs:[{name:"total",type:"uint256",internalType:"uint256"},{name:"cap",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getTokenInfo",inputs:[],outputs:[{name:"",type:"string",internalType:"string"},{name:"",type:"string",internalType:"string"},{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"pure"},{type:"function",name:"isLiquidityPool",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"marketingFeeCollector",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"mint",inputs:[{name:"to",type:"address",internalType:"address"},{name:"amount",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"name",inputs:[],outputs:[{name:"",type:"string",internalType:"string"}],stateMutability:"view"},{type:"function",name:"noFeeOnReceive",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"owner",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"poolManager",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"renounceOwnership",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setFeeCollectors",inputs:[{name:"dev",type:"address",internalType:"address"},{name:"marketing",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setLiquidityPool",inputs:[{name:"pool",type:"address",internalType:"address"},{name:"isPool_",type:"bool",internalType:"bool"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setMinter",inputs:[{name:"minter",type:"address",internalType:"address"},{name:"authorized",type:"bool",internalType:"bool"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setNoFeeOnReceive",inputs:[{name:"addr",type:"address",internalType:"address"},{name:"noFee",type:"bool",internalType:"bool"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setPoolManager",inputs:[{name:"_poolManager",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"symbol",inputs:[],outputs:[{name:"",type:"string",internalType:"string"}],stateMutability:"view"},{type:"function",name:"totalSupply",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"transfer",inputs:[{name:"to",type:"address",internalType:"address"},{name:"value",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"nonpayable"},{type:"function",name:"transferFrom",inputs:[{name:"from",type:"address",internalType:"address"},{name:"to",type:"address",internalType:"address"},{name:"value",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"nonpayable"},{type:"function",name:"transferOwnership",inputs:[{name:"newOwner",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"event",name:"Approval",inputs:[{name:"owner",type:"address",indexed:!0,internalType:"address"},{name:"spender",type:"address",indexed:!0,internalType:"address"},{name:"value",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"FeeCollectorsUpdated",inputs:[{name:"dev",type:"address",indexed:!1,internalType:"address"},{name:"marketing",type:"address",indexed:!1,internalType:"address"}],anonymous:!1},{type:"event",name:"FeesDistributed",inputs:[{name:"devAmount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"marketingAmount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"LiquidityPoolSet",inputs:[{name:"pool",type:"address",indexed:!0,internalType:"address"},{name:"isPool",type:"bool",indexed:!1,internalType:"bool"}],anonymous:!1},{type:"event",name:"MintScheduled",inputs:[{name:"to",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"blockNumber",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"MinterSet",inputs:[{name:"minter",type:"address",indexed:!0,internalType:"address"},{name:"authorized",type:"bool",indexed:!1,internalType:"bool"}],anonymous:!1},{type:"event",name:"OwnershipTransferred",inputs:[{name:"previousOwner",type:"address",indexed:!0,internalType:"address"},{name:"newOwner",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"PoolManagerSet",inputs:[{name:"manager",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"Transfer",inputs:[{name:"from",type:"address",indexed:!0,internalType:"address"},{name:"to",type:"address",indexed:!0,internalType:"address"},{name:"value",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"error",name:"ERC20InsufficientAllowance",inputs:[{name:"spender",type:"address",internalType:"address"},{name:"allowance",type:"uint256",internalType:"uint256"},{name:"needed",type:"uint256",internalType:"uint256"}]},{type:"error",name:"ERC20InsufficientBalance",inputs:[{name:"sender",type:"address",internalType:"address"},{name:"balance",type:"uint256",internalType:"uint256"},{name:"needed",type:"uint256",internalType:"uint256"}]},{type:"error",name:"ERC20InvalidApprover",inputs:[{name:"approver",type:"address",internalType:"address"}]},{type:"error",name:"ERC20InvalidReceiver",inputs:[{name:"receiver",type:"address",internalType:"address"}]},{type:"error",name:"ERC20InvalidSender",inputs:[{name:"sender",type:"address",internalType:"address"}]},{type:"error",name:"ERC20InvalidSpender",inputs:[{name:"spender",type:"address",internalType:"address"}]},{type:"error",name:"OwnableInvalidOwner",inputs:[{name:"owner",type:"address",internalType:"address"}]},{type:"error",name:"OwnableUnauthorizedAccount",inputs:[{name:"account",type:"address",internalType:"address"}]},{type:"error",name:"ReentrancyGuardReentrantCall",inputs:[]},{type:"error",name:"SES_CapExceeded",inputs:[]},{type:"error",name:"SES_NotAuthorized",inputs:[]},{type:"error",name:"SES_ZeroAddress",inputs:[]},{type:"error",name:"SES_ZeroAmount",inputs:[]}],On=[{type:"function",name:"LEAVE_COOLDOWN",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"LEAVE_COST_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"LEAVE_COST_PER_MEMBER",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MAX_ALLIANCE_NAME",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MAX_MEMBERS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOTEM_BONUS_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOTEM_COST_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOTEM_COST_SCALE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOTEM_DONATION_MIN_DIVISOR",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOTEM_DONATION_TIMEOUT",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"allianceIndex",inputs:[{name:"",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"allianceList",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"bytes32",internalType:"bytes32"}],stateMutability:"view"},{type:"function",name:"allianceMembers",inputs:[{name:"",type:"bytes32",internalType:"bytes32"},{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"alliances",inputs:[{name:"",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"name",type:"string",internalType:"string"},{name:"leader",type:"address",internalType:"address"},{name:"level",type:"uint256",internalType:"uint256"},{name:"memberCount",type:"uint256",internalType:"uint256"},{name:"createdAt",type:"uint256",internalType:"uint256"},{name:"exists",type:"bool",internalType:"bool"},{name:"totemLevel",type:"uint256",internalType:"uint256"},{name:"totemEnergy",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"claimLeaveRefund",inputs:[{name:"",type:"bytes32",internalType:"bytes32"}],outputs:[],stateMutability:"pure"},{type:"function",name:"claimRefund",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"claimedLeaveRefund",inputs:[{name:"",type:"bytes32",internalType:"bytes32"},{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"createAlliance",inputs:[{name:"name",type:"string",internalType:"string"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"disbandAlliance",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"gameContract",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"getAllianceList",inputs:[],outputs:[{name:"",type:"bytes32[]",internalType:"bytes32[]"}],stateMutability:"view"},{type:"function",name:"getAllianceMembers",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"address[]",internalType:"address[]"}],stateMutability:"view"},{type:"function",name:"getLeaveCooldownRemaining",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getMemberCount",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getTotemLevel",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"isDonationActive",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"},{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"isLeader",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"},{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"isLeaveCooldownBlocked",inputs:[{name:"attacker",type:"address",internalType:"address"},{name:"defender",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"joinAlliance",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"kickMember",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"},{name:"member",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"lastLeaver",inputs:[{name:"",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"leaveAlliance",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"leavePenaltyPool",inputs:[{name:"",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"leaveRefundPerMember",inputs:[{name:"",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"memberInfo",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"player",type:"address",internalType:"address"},{name:"joinedAt",type:"uint256",internalType:"uint256"},{name:"contribution",type:"uint256",internalType:"uint256"},{name:"isOnline",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"memberLastDonation",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"pendingRefunds",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"playerAlliance",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bytes32",internalType:"bytes32"}],stateMutability:"view"},{type:"function",name:"recentLeftAlliance",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bytes32",internalType:"bytes32"}],stateMutability:"view"},{type:"function",name:"recentLeftTime",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"recordTotemDonation",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"},{name:"donor",type:"address",internalType:"address"},{name:"energyAmount",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"sesToken",inputs:[],outputs:[{name:"",type:"address",internalType:"contract IERC20"}],stateMutability:"view"},{type:"function",name:"setGameContract",inputs:[{name:"_gameContract",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setSESToken",inputs:[{name:"_tokenAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"totemUpgradeCost",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"transferLeadership",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"},{name:"newLeader",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"upgradeTotem",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"}],outputs:[],stateMutability:"nonpayable"},{type:"event",name:"AllianceCreated",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"},{name:"name",type:"string",indexed:!1,internalType:"string"},{name:"leader",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"AllianceDisbanded",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"}],anonymous:!1},{type:"event",name:"MemberJoined",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"},{name:"player",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"MemberKicked",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"},{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"kickedBy",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"MemberLeft",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"},{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"penalty",type:"uint256",indexed:!1,internalType:"uint256"},{name:"refundPerMember",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"SESTokenSet",inputs:[{name:"token",type:"address",indexed:!1,internalType:"address"}],anonymous:!1},{type:"event",name:"TotemDonated",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"},{name:"donor",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"TotemUpgraded",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"},{name:"newLevel",type:"uint256",indexed:!1,internalType:"uint256"},{name:"cost",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"error",name:"AL_AlreadyExists",inputs:[]},{type:"error",name:"AL_AlreadyInAlliance",inputs:[]},{type:"error",name:"AL_CannotKickSelf",inputs:[]},{type:"error",name:"AL_Full",inputs:[]},{type:"error",name:"AL_InvalidName",inputs:[]},{type:"error",name:"AL_LastMember",inputs:[]},{type:"error",name:"AL_NoRefund",inputs:[]},{type:"error",name:"AL_NotAuthorized",inputs:[]},{type:"error",name:"AL_NotEnoughDonations",inputs:[]},{type:"error",name:"AL_NotEnoughEnergy",inputs:[]},{type:"error",name:"AL_NotFound",inputs:[]},{type:"error",name:"AL_NotLeader",inputs:[]},{type:"error",name:"AL_NotMember",inputs:[]},{type:"error",name:"AL_TokenNotSet",inputs:[]},{type:"error",name:"AL_UseClaimRefund",inputs:[]},{type:"error",name:"AL_ZeroAddress",inputs:[]},{type:"error",name:"SafeERC20FailedOperation",inputs:[{name:"token",type:"address",internalType:"address"}]}],zn=[{type:"constructor",inputs:[{name:"_sesToken",type:"address",internalType:"address"},{name:"_gameContract",type:"address",internalType:"address"},{name:"_genesisTimestamp",type:"uint256",internalType:"uint256"}],stateMutability:"nonpayable"},{type:"receive",stateMutability:"payable"},{type:"function",name:"DAILY_EMISSION",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DAY_SECONDS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"claim",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"currentEpoch",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"distribute",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"epochClaimed",inputs:[{name:"",type:"uint256",internalType:"uint256"},{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"epochPlayerCount",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"epochRewardPerPlayer",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"gameContract",inputs:[],outputs:[{name:"",type:"address",internalType:"contract IGameContract"}],stateMutability:"view"},{type:"function",name:"genesisTimestamp",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getEpochInfo",inputs:[{name:"epoch",type:"uint256",internalType:"uint256"}],outputs:[{name:"playerCount",type:"uint256",internalType:"uint256"},{name:"perPlayer",type:"uint256",internalType:"uint256"},{name:"distributed",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"hasClaimed",inputs:[{name:"epoch",type:"uint256",internalType:"uint256"},{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"lastDistributedEpoch",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"owner",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"renounceOwnership",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"rescueEth",inputs:[{name:"to",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"sesToken",inputs:[],outputs:[{name:"",type:"address",internalType:"contract SilentExpanseStrifeToken"}],stateMutability:"view"},{type:"function",name:"setGameContract",inputs:[{name:"_gameAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setSESToken",inputs:[{name:"_newTokenAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"transferOwnership",inputs:[{name:"newOwner",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"event",name:"Claimed",inputs:[{name:"epoch",type:"uint256",indexed:!0,internalType:"uint256"},{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"Distributed",inputs:[{name:"epoch",type:"uint256",indexed:!0,internalType:"uint256"},{name:"totalAmount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"playerCount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"perPlayer",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"OwnershipTransferred",inputs:[{name:"previousOwner",type:"address",indexed:!0,internalType:"address"},{name:"newOwner",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"error",name:"DM_AlreadyClaimed",inputs:[]},{type:"error",name:"DM_AlreadyDistributed",inputs:[]},{type:"error",name:"DM_EpochExpired",inputs:[]},{type:"error",name:"DM_EthNotAccepted",inputs:[]},{type:"error",name:"DM_NoActivePlayers",inputs:[]},{type:"error",name:"DM_NoEthToRescue",inputs:[]},{type:"error",name:"DM_NoReward",inputs:[]},{type:"error",name:"DM_NotActive",inputs:[]},{type:"error",name:"DM_NotDistributedYet",inputs:[]},{type:"error",name:"DM_TooEarly",inputs:[]},{type:"error",name:"DM_ZeroAddress",inputs:[]},{type:"error",name:"OwnableInvalidOwner",inputs:[{name:"owner",type:"address",internalType:"address"}]},{type:"error",name:"OwnableUnauthorizedAccount",inputs:[{name:"account",type:"address",internalType:"address"}]},{type:"error",name:"SafeERC20FailedOperation",inputs:[{name:"token",type:"address",internalType:"address"}]}],Fn=[{type:"constructor",inputs:[{name:"_game",type:"address",internalType:"address"},{name:"_ses",type:"address",internalType:"address"}],stateMutability:"nonpayable"},{type:"function",name:"MAX_SWEEP_DEPTH",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"NUM_BUCKETS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ORDER_DELAY",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"PRICE_SCALE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SES_FEE_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"USER_HISTORY_SIZE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"accruedSesFees",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"amendBidPrice",inputs:[{name:"bidId",type:"uint256",internalType:"uint256"},{name:"newSesPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"amendOrderPrice",inputs:[{name:"orderId",type:"uint256",internalType:"uint256"},{name:"newSesPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"askBucketCount",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"bidBucketCount",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"bidOrders",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"buyer",type:"address",internalType:"address"},{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"remaining",type:"uint256",internalType:"uint256"},{name:"sesPrice",type:"uint256",internalType:"uint256"},{name:"bucketId",type:"uint256",internalType:"uint256"},{name:"createdAt",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"buyEnergy",inputs:[{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"maxUnitPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"cancelBidOrder",inputs:[{name:"bidId",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"cancelOrder",inputs:[{name:"orderId",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"createBidOrder",inputs:[{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"sesPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"createOrder",inputs:[{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"sesPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"feeRecipient",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"fillBidOrder",inputs:[{name:"bidId",type:"uint256",internalType:"uint256"},{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"minUnitPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"fillOrder",inputs:[{name:"orderId",type:"uint256",internalType:"uint256"},{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"maxUnitPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"firstAskBucket",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"game",inputs:[],outputs:[{name:"",type:"address",internalType:"contract ISilentExpanseStrifeEnergy"}],stateMutability:"view"},{type:"function",name:"getActiveBids",inputs:[{name:"offset",type:"uint256",internalType:"uint256"},{name:"limit",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"tuple[]",internalType:"struct EnergyMarket.BidOrder[]",components:[{name:"buyer",type:"address",internalType:"address"},{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"remaining",type:"uint256",internalType:"uint256"},{name:"sesPrice",type:"uint256",internalType:"uint256"},{name:"bucketId",type:"uint256",internalType:"uint256"},{name:"createdAt",type:"uint256",internalType:"uint256"}]}],stateMutability:"view"},{type:"function",name:"getActiveOrders",inputs:[{name:"offset",type:"uint256",internalType:"uint256"},{name:"limit",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"tuple[]",internalType:"struct EnergyMarket.Order[]",components:[{name:"seller",type:"address",internalType:"address"},{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"remaining",type:"uint256",internalType:"uint256"},{name:"sesPrice",type:"uint256",internalType:"uint256"},{name:"bucketId",type:"uint256",internalType:"uint256"},{name:"createdAt",type:"uint256",internalType:"uint256"}]}],stateMutability:"view"},{type:"function",name:"getBestAsk",inputs:[],outputs:[{name:"unitPrice",type:"uint256",internalType:"uint256"},{name:"remaining",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getBestBid",inputs:[],outputs:[{name:"unitPrice",type:"uint256",internalType:"uint256"},{name:"remaining",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getBidCount",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getBidsByBuyer",inputs:[{name:"buyer",type:"address",internalType:"address"}],outputs:[{name:"ids",type:"uint256[]",internalType:"uint256[]"}],stateMutability:"view"},{type:"function",name:"getOrderCount",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getOrdersBySeller",inputs:[{name:"seller",type:"address",internalType:"address"}],outputs:[{name:"ids",type:"uint256[]",internalType:"uint256[]"}],stateMutability:"view"},{type:"function",name:"getUserBidHistory",inputs:[{name:"user",type:"address",internalType:"address"}],outputs:[{name:"ids",type:"uint256[50]",internalType:"uint256[50]"},{name:"count",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getUserOrderHistory",inputs:[{name:"user",type:"address",internalType:"address"}],outputs:[{name:"ids",type:"uint256[50]",internalType:"uint256[50]"},{name:"count",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"lastBidBucket",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"marketDeployer",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"nextBidId",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"nextOrderId",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"orders",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"seller",type:"address",internalType:"address"},{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"remaining",type:"uint256",internalType:"uint256"},{name:"sesPrice",type:"uint256",internalType:"uint256"},{name:"bucketId",type:"uint256",internalType:"uint256"},{name:"createdAt",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"sellEnergy",inputs:[{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"minUnitPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"ses",inputs:[],outputs:[{name:"",type:"address",internalType:"contract IERC20"}],stateMutability:"view"},{type:"function",name:"setFeeRecipient",inputs:[{name:"_feeRecipientAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"userBidHistory",inputs:[{name:"",type:"address",internalType:"address"},{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"userBidHistoryCursor",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"userOrderHistory",inputs:[{name:"",type:"address",internalType:"address"},{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"userOrderHistoryCursor",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"withdrawSesFees",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"event",name:"BidAmended",inputs:[{name:"bidId",type:"uint256",indexed:!0,internalType:"uint256"},{name:"buyer",type:"address",indexed:!0,internalType:"address"},{name:"oldPrice",type:"uint256",indexed:!1,internalType:"uint256"},{name:"newPrice",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"BidCancelled",inputs:[{name:"bidId",type:"uint256",indexed:!0,internalType:"uint256"}],anonymous:!1},{type:"event",name:"BidCreated",inputs:[{name:"bidId",type:"uint256",indexed:!0,internalType:"uint256"},{name:"buyer",type:"address",indexed:!0,internalType:"address"},{name:"energyAmount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesPrice",type:"uint256",indexed:!1,internalType:"uint256"},{name:"unitPrice",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"BidFilled",inputs:[{name:"bidId",type:"uint256",indexed:!0,internalType:"uint256"},{name:"seller",type:"address",indexed:!0,internalType:"address"},{name:"buyer",type:"address",indexed:!0,internalType:"address"},{name:"energyTransferred",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesPaid",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesFee",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"FeesWithdrawn",inputs:[{name:"to",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"OrderAmended",inputs:[{name:"orderId",type:"uint256",indexed:!0,internalType:"uint256"},{name:"seller",type:"address",indexed:!0,internalType:"address"},{name:"oldPrice",type:"uint256",indexed:!1,internalType:"uint256"},{name:"newPrice",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"OrderCancelled",inputs:[{name:"orderId",type:"uint256",indexed:!0,internalType:"uint256"}],anonymous:!1},{type:"event",name:"OrderCreated",inputs:[{name:"orderId",type:"uint256",indexed:!0,internalType:"uint256"},{name:"seller",type:"address",indexed:!0,internalType:"address"},{name:"energyAmount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesPrice",type:"uint256",indexed:!1,internalType:"uint256"},{name:"unitPrice",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"OrderFilled",inputs:[{name:"orderId",type:"uint256",indexed:!0,internalType:"uint256"},{name:"buyer",type:"address",indexed:!0,internalType:"address"},{name:"seller",type:"address",indexed:!0,internalType:"address"},{name:"energyTransferred",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesPaid",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesFee",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"error",name:"EM_AlreadyInactive",inputs:[]},{type:"error",name:"EM_FeeRecipientUnset",inputs:[]},{type:"error",name:"EM_InactiveBid",inputs:[]},{type:"error",name:"EM_InactiveOrder",inputs:[]},{type:"error",name:"EM_InvalidAmount",inputs:[]},{type:"error",name:"EM_NoFees",inputs:[]},{type:"error",name:"EM_NoLiquidity",inputs:[]},{type:"error",name:"EM_NotBuyer",inputs:[]},{type:"error",name:"EM_NotDeployer",inputs:[]},{type:"error",name:"EM_NotSeller",inputs:[]},{type:"error",name:"EM_PriceTooHigh",inputs:[]},{type:"error",name:"EM_PriceTooLow",inputs:[]},{type:"error",name:"EM_SelfFill",inputs:[]},{type:"error",name:"EM_SweepLimit",inputs:[]},{type:"error",name:"EM_TooEarly",inputs:[]},{type:"error",name:"EM_ZeroAddress",inputs:[]},{type:"error",name:"EM_ZeroEnergy",inputs:[]},{type:"error",name:"EM_ZeroPrice",inputs:[]},{type:"error",name:"ReentrancyGuardReentrantCall",inputs:[]},{type:"error",name:"SafeERC20FailedOperation",inputs:[{name:"token",type:"address",internalType:"address"}]}],Hn=Bn,Un=Dn,Yn=On,Gn=zn,ze=Fn;function Te(){return{provider:null,signer:null,game:null,sesToken:null,alliance:null,dailyMinter:null,isReady:!1,contractUnavailable:!0,error:null}}let Wt=null,Jt=null,Q=null,ke=null;async function tt(){return Q||ke||(ke=(async()=>{try{if(!window.ethereum)return Q={...Te(),isReady:!0,contractUnavailable:!0},Q;const e=new Tn(window.ethereum);Wt=e;let a=null;try{a=await e.getSigner(),Jt=a}catch(o){console.warn("[useContract] signer unavailable, read-only mode:",o)}return!!V.SILENT_EXPANSE&&!!V.SES_TOKEN&&!!V.ALLIANCE?a?(Q={provider:e,signer:a,game:new se(V.SILENT_EXPANSE,Hn,a),sesToken:new se(V.SES_TOKEN,Un,a),alliance:new se(V.ALLIANCE,Yn,a),dailyMinter:V.DAILY_MINTER?new se(V.DAILY_MINTER,Gn,a):null,isReady:!0,contractUnavailable:!1,error:null},Q):(Q={...Te(),isReady:!0,contractUnavailable:!0,error:"Wallet not connected"},Q):(Q={...Te(),isReady:!0,contractUnavailable:!0},Q)}catch(e){return Q={...Te(),isReady:!0,error:e instanceof Error?e.message:String(e)},Q}})(),ke)}function bt(){Q=null,Wt=null,Jt=null,ke=null}let xt=!1;const nt=new Set;function Ke(){Q&&nt.forEach(e=>e(Q))}function Kn(){var s;if(xt||typeof window>"u")return;xt=!0;const e=o=>{if(bt(),!Array.isArray(o)||o.length===0){Q=Te(),Ke();return}tt().then(()=>Ke())},a=()=>{bt(),tt().then(()=>Ke())};(s=window.ethereum)!=null&&s.on&&(window.ethereum.on("accountsChanged",e),window.ethereum.on("chainChanged",a))}function re(){const[e,a]=h.useState(Te);return h.useEffect(()=>{let s=!1;const o=l=>{!s&&l&&a(l)};return nt.add(o),tt().then(o),Kn(),()=>{s=!0,nt.delete(o)}},[]),e}const Ve={};function Vn(){const e=re(),a=i(o=>o.connected),s=i(o=>o.address);return je({queryKey:["civPolling",s],queryFn:async()=>{var o,l,p;if(!a||!s||!e.game||!e.sesToken)return null;try{const u=e.game,c=e.sesToken,[T,g,k,$,b,z,B,v,P,F,x,S,C,O,L]=await Promise.allSettled([u.getCivilization(s),c.balanceOf(s),u.getAttackTokenInfo(s),u.pendingCombatEnergy(s),Promise.allSettled([u.getCurrentShieldHP(s),u.getMaxShieldHP(s)]),u.getEnergyCollectRate(s),u.getCollectorDurability(s),u.getCombatBoost(s),u.getPendingEnergy(s),u.getShieldDefense(s),u.getSpeed(s),u.getRadarRange(s),u.getAttackPower(s),u.getAttackEnergyCost(s),u.getCurrentPosition(s)]);if(T.status==="fulfilled"){const d=T.value,I={name:String(d.name??""),x:Number(d.x??((o=d.location)==null?void 0:o.x)??0),y:Number(d.y??((l=d.location)==null?void 0:l.y)??0),z:Number(d.z??((p=d.location)==null?void 0:p.z)??0),energy:Number(d.energy??0),health:Number(d.health??0),shieldHP:0,maxShieldHP:0,energyCollectorLv:Number(d.energyCollectorLv??1),weaponLv:Number(d.weaponLv??1),radarLv:Number(d.radarLv??1),shieldLv:Number(d.shieldLv??1),engineLv:Number(d.engineLv??1),scanRange:Number(d.scanRange??1e3),isRuins:!!(d.isRuins??!1),isMoving:!1};i.setState({playerCiv:I,isDestroyed:!!(d.isRuins??!1),lastCollectTime:d.lastUpdateTime?Number(d.lastUpdateTime)*1e3:Date.now()})}if(g.status==="fulfilled"){const d=Me(g.value);i.setState({sesBalance:parseFloat(d).toFixed(2)})}if(k.status==="fulfilled"){const d=k.value,I=d.ratePerSec??d[3]??0n;i.setState({attackTokens:{current:Number(d.current??d[0]??0),max:Number(d.max??d[1]??5),intervalSec:Number(d.intervalSec??d[2]??60),ratePerSec:Number(I)/1e18}})}if($.status==="fulfilled"&&i.setState({pendingEnergy:Number($.value)}),b.status==="fulfilled"){const[d,I]=b.value;d.status==="fulfilled"&&I.status==="fulfilled"&&i.setState(K=>({playerCiv:K.playerCiv?{...K.playerCiv,shieldHP:Number(d.value),maxShieldHP:Number(I.value)}:null}))}if(z.status==="fulfilled"&&i.setState({collectRate:Number(z.value)/1e6}),B.status==="fulfilled"){const d=B.value;i.setState({collectorDurability:{current:Number(d[0]),max:Number(d[1])}})}if(L.status==="fulfilled"){const d=L.value,I=!!(d[1]??d.isMoving??!1),K=Number(d[2]??d.eta??0);i.setState(D=>({playerCiv:D.playerCiv?{...D.playerCiv,isMoving:I}:null,moveEta:K}))}if(v.status==="fulfilled"&&i.setState({combatBoost:Number(v.value)}),P.status==="fulfilled"&&i.setState({pendingCollect:Number(P.value)}),F.status==="fulfilled"&&i.setState({shieldDefense:Number(F.value)}),x.status==="fulfilled"&&i.setState({speed:Number(x.value)}),S.status==="fulfilled"&&i.setState({radarRange:Number(S.value)}),C.status==="fulfilled"&&i.setState({attackPower:Number(C.value)}),O.status==="fulfilled"&&i.setState({attackEnergyCost:Number(O.value)}),e.dailyMinter){const[d,I,K]=await Promise.allSettled([e.dailyMinter.currentEpoch(),e.dailyMinter.lastDistributedEpoch(),e.dailyMinter.DAILY_EMISSION()]);if(K.status==="fulfilled"&&i.setState({dailyEmission:Number(K.value)/1e18}),d.status==="fulfilled"){const D=Number(d.value),[W,_,H]=await Promise.allSettled([e.dailyMinter.genesisTimestamp(),e.dailyMinter.DAY_SECONDS(),e.dailyMinter.epochClaimed(D,s)]),j=W.status==="fulfilled"?Number(W.value):0,q=_.status==="fulfilled"?Number(_.value):86400;i.setState({currentEpoch:D,lastDistributedEpoch:I.status==="fulfilled"?Number(I.value):0,epochStartTime:j+(D-1)*q,epochEndTime:j+D*q,epochClaimed:H.status==="fulfilled"?H.value:!1})}}return{timestamp:Date.now()}}catch(u){const c=String((u==null?void 0:u.message)||u||"");let T="unknown";c.includes("Failed to fetch")||c.includes("NetworkError")||c.includes("ERR_NETWORK")?T="network":c.includes("CALL_EXCEPTION")||c.includes("missing revert data")?T="contract":c.includes("nonce too low")||c.includes("already known")?T="nonce":c.includes("timeout")&&(T="timeout"),Ve[T]=(Ve[T]||0)+1;const g=Ve[T];return g<=2?console.warn(`[civPolling] ${T} failure #${g}:`,(u==null?void 0:u.message)||u):(g===10||g%50===0)&&console.warn(`[civPolling] ${T}: ${g} consecutive failures`),null}},refetchInterval:5e3,enabled:a&&!!s&&!!e.game&&!!e.sesToken,meta:{isBackground:!0}})}function Wn(){const e=re(),a=i(o=>o.connected),s=i(o=>o.address);return je({queryKey:["alliancePolling",s],queryFn:async()=>{if(!a||!s||!e.alliance)return null;try{const o=await e.alliance.playerAlliance(s);if(!(o&&o!=="0x"+"00".repeat(32)))return i.setState({currentAlliance:null}),{inAlliance:!1};const[p,u,c,T,g]=await Promise.all([e.alliance.alliances(o),e.alliance.getAllianceMembers(o),e.alliance.totemUpgradeCost(o),e.alliance.isLeader(o,s),e.alliance.pendingRefunds(s)]);return i.setState({currentAlliance:{id:o,name:String(p.name??""),memberCount:Number(p.memberCount??p[3]??0),level:Number(p.level??p[2]??1)},_allianceMembers:u.slice(0,10),_allianceTotemLevel:Number(p.totemLevel??p[6]??0),_allianceTotemEnergy:Number(p.totemEnergy??p[7]??0),_allianceTotemUpgradeCost:Number(c),_allianceIsLeader:T,_allianceLeader:String(p.leader??p[1]??""),_alliancePendingRefund:Number(g)}),{inAlliance:!0}}catch{return null}},refetchInterval:1e4,enabled:a&&!!s&&!!e.alliance})}function Jn(){const e=re(),a=i(s=>s.address);return je({queryKey:["marketPolling"],queryFn:async()=>{if(!V.ENERGY_MARKET||!e.provider)return null;try{const s=new se(V.ENERGY_MARKET,ze,e.provider),o=[],l=Number(await s.getOrderCount()),p=Math.min(l,200);for(let u=0;u<p;u++)try{const c=await s.orders(u),T=Number(c.remaining??0);if(T<=0)continue;const g=typeof c.seller=="string"?c.seller.toLowerCase():"";if(!g)continue;o.push({id:u,amount:Number(c.energyAmount??0),remaining:T,price:Number(c.sesPrice??0)/1e18/Math.max(Number(c.energyAmount??1),1),seller:g.slice(0,6)+"..."+g.slice(-4),isMine:g===(a||"").toLowerCase()})}catch{}return i.setState({marketOrders:o}),{count:o.length}}catch{return null}},refetchInterval:15e3,enabled:!!V.ENERGY_MARKET&&!!e.provider})}function Xn(){return Vn(),Wn(),Jn(),null}const qn=new yn({defaultOptions:{queries:{refetchOnWindowFocus:!1,retry:1,staleTime:1e4}}}),Zn=["https://bsc-dataseed1.binance.org","https://bsc-dataseed2.binance.org","https://bsc-dataseed3.binance.org","https://bsc-dataseed4.binance.org","https://bsc-dataseed1.defibit.io","https://bsc-dataseed2.defibit.io"],Qn=fn({chains:[ut],connectors:[xn()],transports:{[ut.id]:bn(Zn.map(e=>Cn(e)))}}),ea={...Ye(),colors:{...Ye().colors,accentColor:"#00D4AA",accentColorForeground:"#0A0E17",actionButtonBorder:"#1E2A45",actionButtonBorderMobile:"#1E2A45",actionButtonSecondaryBackground:"#131A2B",closeButton:"#8892A8",closeButtonBackground:"#131A2B",connectButtonBackground:"#131A2B",connectButtonBackgroundError:"#FF4757",connectButtonInnerBackground:"#131A2B",connectButtonText:"#E8EDF5",connectButtonTextError:"#FFFFFF",connectionIndicator:"#00D4AA",downloadBottomCardBackground:"#131A2B",downloadTopCardBackground:"#131A2B",error:"#FF4757",generalBorder:"#1E2A45",generalBorderDim:"#1E2A45",menuItemBackground:"#131A2B",modalBackdrop:"rgba(0,0,0,0.7)",modalBackground:"#0A0E17",modalBorder:"#1E2A45",modalText:"#E8EDF5",modalTextDim:"#8892A8",modalTextSecondary:"#8892A8",profileAction:"#131A2B",profileActionHover:"#1E2A45",profileForeground:"#0A0E17",selectedOptionBorder:"#00D4AA",standby:"#FFD93D"},fonts:{body:"'Courier New', monospace"},radii:{...Ye().radii,actionButton:"6px",connectButton:"6px",menuButton:"6px",modal:"10px",modalMobile:"10px"}};function ta({children:e}){return t.jsx(mn,{client:qn,children:t.jsx(hn,{config:Qn,children:t.jsx(En,{theme:ea,modalSize:"compact",children:e})})})}function na(e){const[a,s]=h.useState(()=>typeof window<"u"?window.matchMedia(e).matches:!1);return h.useEffect(()=>{const o=window.matchMedia(e),l=p=>s(p.matches);return o.addEventListener("change",l),()=>o.removeEventListener("change",l)},[e]),a}function we(){return na("(max-width: 767px)")}const Xt={"nav.overview":"总览","nav.actions":"操作","nav.combat":"追踪作战","nav.tech":"系统编译","nav.alliance":"契约联盟","nav.market":"星火市场","nav.leaderboard":"纪元评分榜","nav.wallet":"钱包","nav.copy_addr":"复制地址","toast.copied":"已复制","nav.disconnect":"断开连接","lore.splash_title":"沉寂引擎已启动","lore.splash_line1":"先驱者已去。","lore.splash_line2":"最后的文明将继承一切。","lore.protocol_intro":`Strife Protocol：每纪元（≈24h），综合评分最低的竞争者将被沉寂。
注入星火（SES），注册为竞争者。开始你的试炼。`,"lore.splash_btn":"注入星火，加入试炼","lore.footer_quote":"引擎不审判你。它只是读你的代码，然后告诉你：还不够。","lore.engine_status":"沉寂引擎 · 运行中","lore.competitors":"活跃竞争者","lore.silence_count":"已沉寂","lore.epoch_label":"当前纪元","connect.title":"寂灭星河：纷争","connect.subtitle":"— SILENT EXPANSE: STRIFE —","connect.fee_label":"创建费用","connect.fee_hint":"费用随时间线性增长 (0.01 → 0.05 BNB)","connect.pay":"支付 {fee} BNB 创建文明","connect.wallet_connect":"连接钱包","connect.wallet_connecting":"连接中…","connect.no_wallet":"未检测到钱包，请安装 MetaMask","connect.civ_name":"文明名称（1-32 字符）","connect.referrer":"邀请人地址（选填）","connect.referral_bonus":"双方各得 150 能量 + 永久 0.2% 采集加成","connect.tutorial":"新手指南","connect.lang_switch":"EN","connect.name_required":"请输入文明名称","connect.name_too_long":"名称不超过 32 个字符","connect.wallet_required":"请先连接钱包","connect.bad_referrer":"邀请人地址格式不正确","connect.ready_connect":"请点击下方按钮连接钱包","connect.detecting_wallet":"正在检测钱包…","connect.loading_contract":"正在加载合约…","connect.checking_civ":"正在检查文明…","hud.title":"文明状态","hud.location":"当前坐标","hud.combat_res":"追踪资源","hud.attack_token":"追踪次数","hud.pending_energy":"待领能量","hud.tech_systems":"引擎系统","hud.collect_rate":"汲取速率","hud.durability":"耐久","hud.attack_power":"攻击力","hud.shield_hp":"沉寂护盾值","hud.defense":"防御力","hud.scan_range":"探测范围","hud.speed":"跃迁速度","hud.energy":"遗迹能量","hud.health":"文明生命","hud.shield":"沉寂护盾","hud.ses":"星火·SES","hud.attack_token_label":"追踪次数","hud.combat_boost":"跃迁加成","hud.totem_bonus":"契约图腾","hud.pending_label":"待领取","hud.pending_type":"追踪战能","hud.destroyed_title":"文明已被摧毁","hud.destroyed_desc":"你的文明化为废墟。使用 SES 重建。","hud.destroyed_btn":"重建文明","hud.rebuild_cost":"重建消耗大量能量（随重生次数递增）","hud.durability_warn":"采集器耐久 {pct}%","hud.durability_repair":"修复","hud.cost":"消耗","hud.cooldown":"冷却","hud.confirm_attack":"确认攻击","hud.confirm_upgrade":"确认升级","hud.cancel":"取消","hud.target":"目标","hud.in_range":"范围内","hud.out_of_range":"超出范围","hud.error_dismiss":"{msg}（点击关闭）","hud.loading_upgrade":"升级中…","ses.claim":"领取 SES","ses.claimed":"已领取","action.title":"操作","action.ses_balance":"SES 余额","action.collect_rate":"采集速率","action.daily_est":"日发放量","action.collect":"采集能量","action.combat_energy":"战斗能量","action.combat_energy_empty":"空","action.claimed_today":"今日已领","action.distributing":"分发中…","action.distribute":"分发纪元","action.epoch_remaining":"{min}分{sec}秒","action.calculating":"计算中…","action.claim_ses":"领取每日 SES","action.group_collect":"资源生产","action.group_claim":"收益结算","action.group_move":"协议导航","action.group_repair":"系统维护","action.move_input":"导航坐标","action.move_confirm":"确认导航","action.move_cancel":"取消","action.move":"协议导航","action.jump":"追踪跃迁","action.cancel_move":"取消导航","action.repair_shield":"修复沉寂护盾","action.regen_shield":"沉寂护盾再生","action.repair_all":"全系统编译修复","action.moving":"移动中","action.shield_full":"护盾已满","action.jump_confirm":"确认跃迁","action.jump_warn":"跃迁消耗能量与 SES，引擎耐久 -1；跃迁后护盾降至最大值 10% 并进入冷却。","combat.title":"追踪作战中心","combat.search_placeholder":"输入目标文明地址 0x…","combat.search_btn":"追踪扫描","combat.energy":"遗迹能量","combat.health":"文明生命","combat.weapon_lv":"武器 Lv","combat.shield_lv":"沉寂护盾 Lv","combat.distance":"跃迁距离","combat.out_of_range_warn":"目标超出跃迁范围（{range} ls）","combat.attack_btn":"跃迁攻击 {name}","combat.attack_btn_idle":"请先扫描目标","combat.attack_no_energy":"能量不足，无法攻击","combat.attack_out_range":"目标超出攻击范围","combat.attack_in_cd":"跃迁冷却中，请等待","combat.attack_no_token":"追踪次数不足，请等待恢复","combat.attack_cooldown":"（跃迁冷却 {sec}s）","combat.attack_cost":"（{cost}⚡）","combat.confirm_attack":"确认跃迁攻击","combat.confirm_cost":"消耗: {cost} 遗迹能量","combat.confirm_target":"目标文明: {name}","combat.confirm_distance":"跃迁距离: {dist} ls","combat.confirm_cooldown":"引擎冷却: {sec}s","battle.title":"追踪日志","battle.empty":"暂无追踪记录","upgrade.title":"系统编译","upgrade.collector":"遗迹汲取器","upgrade.weapon":"武器系统","upgrade.shield":"沉寂护盾系统","upgrade.radar":"探测阵列","upgrade.engine":"跃迁引擎","upgrade.collect_rate":"采集速率","upgrade.attack_power":"攻击力","upgrade.defense":"防御力","upgrade.scan_range":"扫描范围","upgrade.speed":"航速","upgrade.cost":"消耗","upgrade.current":"当前","upgrade.after":"升级后","upgrade.gain":"提升","upgrade.recommend_badge":"推荐","upgrade.loading":"⟳ 读取升级数据…","upgrade.unavailable":"无法获取升级数据","upgrade.btn":"⬆ 升级","upgrade.insufficient":"SES 不足，无法升级","upgrade.best_value":"最佳性价比","upgrade.cost_label":"成本","alliance.title":"联盟","alliance.mine":"我的联盟","alliance.available":"可选联盟","alliance.create":"创建联盟","alliance.name":"联盟名称","alliance.join":"加入","alliance.leave":"退出","alliance.disband":"解散","alliance.members":"成员","alliance.people":"人","alliance.totem":"图腾","alliance.totem_pool":"能量池","alliance.totem_bonus_desc":"图腾加成：每盟友 +8 防御 × (1+图腾Lv×0.5%)","alliance.totem_bonus_value":"当前加成 +{val} 防御","alliance.totem_next_bonus":"升级后 +{val} 防御","alliance.donate":"捐献能量","alliance.donate_invalid":"请输入有效能量数量","alliance.totem_need_more":"能量池不足，无法升级图腾","alliance.upgrade_totem":"升级图腾","alliance.refund":"领取退款","alliance.you":"（你）","alliance.no_alliance":"暂无联盟","alliance.leader":"盟主","alliance.member":"成员","alliance.kick":"踢出","alliance.transfer":"转移","alliance.transfer_confirm":"将盟主转移给该成员？","alliance.refund_available":"有 {amt} SES 退款待领取","alliance.not_joined":"未加入联盟","alliance.switch_tab":"切换到「加入」标签查看可选联盟","alliance.level_members":"Lv.{lv} · {count}{unit}","market.title":"能量市场","market.sell_placeholder_energy":"能量数量","market.sell_placeholder_price":"SES 单价","market.sell_label_energy":"卖出能量","market.sell_label_price":"单价","market.sell_unit_price":"SES / ⚡","market.preview_receive":"预计获得","market.your_energy":"你的能量","market.insufficient_energy":"能量不足，无法挂单","market.sell_btn":"挂单卖出","market.buy_btn":"购买","market.cancel_btn":"撤单","market.empty":"暂无挂单","market.buy_no_ses":"SES 不足","market.order_energy":"{amt}⚡","market.order_price":"{price} SES","market.order_you":"（你）","market.energy":"能量","market.ses_balance":"SES 余额","market.create_order":"挂单卖出","market.active_orders":"当前挂单","leaderboard.title":"排行榜","leaderboard.loading":"⟳ 加载中…","leaderboard.empty":"暂无数据","leaderboard.col_rank":"#","leaderboard.col_player":"玩家","leaderboard.col_level":"等级","leaderboard.col_energy":"能量","leaderboard.player_level":"Lv.{lv}","leaderboard.rank":"排名","leaderboard.name":"名称","leaderboard.power":"能量","leaderboard.level":"等级","leaderboard.kills":"击杀","leaderboard.sort_power":"能量","leaderboard.sort_kills":"击杀","mobile.tab_overview":"状态","mobile.tab_actions":"操作","mobile.tab_combat":"作战","mobile.tab_market":"市场","mobile.tab_alliance":"联盟","page.overview":"文明总览","page.actions":"协议面板","page.combat":"追踪作战中心","page.tech":"系统编译","page.alliance":"契约联盟","page.market":"星火市场","page.leaderboard":"纪元评分榜","general.epoch":"纪元","general.next_epoch":"下个纪元","general.energy":"能量","general.health":"生命","general.loading":"处理中…","general.per_sec":"/s","general.per_hour":"/h","general.ls":"ls","general.ls_h":"ls/h","general.confirm":"确认","general.cancel":"取消","general.close":"关闭","general.creating":"正在创建文明，请确认 MetaMask 交易…","general.back":"← 返回上一步","toast.civ_created":"🌌 文明 {name} 创建成功！","toast.civ_create_failed":"创建文明失败: {msg}","toast.ses_insufficient":"SES 不足: 需要 {need} SES，当前 {have}","toast.energy_insufficient":"能量不足: 需要 {need}⚡，当前 {have}⚡","toast.upgrade_success":"{name} 升级成功！","toast.upgrade_failed":"升级失败: {msg}","toast.attack_energy":"能量不足: 需要 {cost}⚡","toast.attack_failed":"攻击失败: {msg}","toast.collect_success":"⚡ 采集能量 +{amount}","toast.collect_failed":"采集失败: {msg}","toast.claim_combat_success":"📦 战斗能量已领取","toast.claim_combat_failed":"领取失败: {msg}","toast.claim_ses_success":"📅 每日 SES 已领取！","toast.claim_ses_failed":"领取失败: {msg}","toast.move_success":"🚀 到达目标坐标","toast.move_failed":"移动失败: {msg}","toast.jump_success":"🌌 空间跳跃完成！","toast.jump_failed":"跳跃失败: {msg}","toast.rebuild_success":"🌱 文明已重建！","toast.rebuild_failed":"重建失败: {msg}","toast.repair_collector_success":"🔧 采集器已修复","toast.repair_collector_failed":"修复失败: {msg}","toast.repair_shield_success":"🛡️ 护盾已完全修复","toast.repair_shield_failed":"修复失败: {msg}","toast.regen_shield_success":"🛡️ 护盾再生中","toast.regen_shield_failed":"护盾再生失败: {msg}","toast.repair_all_success":"🔧 全系统已修复","toast.repair_all_failed":"修复失败: {msg}","toast.cancel_move_success":"⏹️ 移动已取消","toast.cancel_move_failed":"取消失败: {msg}","toast.alliance_created":"🏰 联盟创建成功！","toast.alliance_create_failed":"创建失败: {msg}","toast.refund_claimed":"💰 退款已领取","toast.refund_failed":"领取失败: {msg}","toast.alliance_joined":"🏰 已加入联盟！","toast.alliance_join_failed":"加入失败: {msg}","toast.alliance_left":"👋 已退出联盟","toast.alliance_leave_failed":"退出失败: {msg}","toast.leadership_transferred":"盟主已转移","toast.leadership_transfer_failed":"转移盟主失败: {msg}","toast.member_kicked":"👢 成员已踢出","toast.member_kick_failed":"踢出失败: {msg}","toast.alliance_disbanded":"🏰 联盟已解散","toast.alliance_disband_failed":"解散失败: {msg}","toast.donate_success":"🔶 图腾捐献成功！","toast.donate_failed":"捐献失败: {msg}","toast.totem_upgrade_success":"🔱 图腾升级成功！","toast.totem_upgrade_failed":"图腾升级失败: {msg}","toast.order_created":"📄 挂单成功（能量已锁定）","toast.order_failed":"挂单失败: {msg}","toast.order_filled":"🛒 买入成功","toast.order_fill_failed":"买入失败: {msg}","toast.order_cancelled":"❌ 撤单成功","toast.order_cancel_failed":"撤单失败: {msg}","toast.contract_unavailable":"{name} 合约不可用，请检查钱包连接","toast.wallet_disconnected":"钱包未连接"},aa={"nav.overview":"Overview","nav.actions":"Actions","nav.combat":"Trace Combat","nav.tech":"System Compile","nav.alliance":"Pact Alliance","nav.market":"Spark Market","nav.leaderboard":"Epoch Board","nav.wallet":"Wallet","nav.copy_addr":"Copy Address","toast.copied":"Copied","nav.disconnect":"Disconnect","lore.splash_title":"The Silent Engine is Active","lore.splash_line1":"The Precursors have ascended.","lore.splash_line2":"The last civilization shall inherit everything.","lore.protocol_intro":`Strife Protocol: every epoch (~24h), the lowest-ranked competitor is silenced.
Inject Spark (SES), register as a contender. Your trial begins.`,"lore.splash_btn":"Inject SES, Join the Strife","lore.footer_quote":"The Engine does not judge you. It reads your code and tells you: not enough.","lore.engine_status":"Silent Engine · Online","lore.competitors":"Active Contenders","lore.silence_count":"Silenced","lore.epoch_label":"Current Epoch","connect.title":"Silent Expanse: Strife","connect.subtitle":"— SILENT EXPANSE: STRIFE —","connect.fee_label":"Entry Fee","connect.fee_hint":"Fee increases linearly (0.01 → 0.05 BNB)","connect.pay":"Pay {fee} BNB to create civilization","connect.wallet_connect":"Connect Wallet","connect.wallet_connecting":"Connecting…","connect.no_wallet":"No wallet detected. Please install MetaMask.","connect.civ_name":"Civilization name (1-32 chars)","connect.referrer":"Referrer address (optional)","connect.referral_bonus":"Both get 150 energy + permanent 0.2% mining bonus","connect.tutorial":"Tutorial","connect.lang_switch":"中","connect.name_required":"Civilization name is required","connect.name_too_long":"Name must be 32 characters or less","connect.wallet_required":"Please connect your wallet first","connect.bad_referrer":"Invalid referrer address format","connect.ready_connect":"Click the button below to connect","connect.detecting_wallet":"Detecting wallet…","connect.loading_contract":"Loading contracts…","connect.checking_civ":"Checking civilization…","hud.title":"Status","hud.location":"Current Coordinates","hud.combat_res":"Trace Assets","hud.attack_token":"Traces","hud.pending_energy":"Pending","hud.tech_systems":"Engine Systems","hud.collect_rate":"Harvest Rate","hud.durability":"Durability","hud.attack_power":"Attack Power","hud.shield_hp":"Silence Shield","hud.defense":"Defense","hud.scan_range":"Scan Range","hud.speed":"Jump Speed","hud.energy":"Expanse Energy","hud.health":"Civ Health","hud.shield":"Silence Shield","hud.ses":"Spark·SES","hud.attack_token_label":"Traces","hud.combat_boost":"Trace Bonus","hud.totem_bonus":"Pact Totem","hud.pending_label":"Pending","hud.pending_type":"Trace Energy","hud.destroyed_title":"Civilization Destroyed","hud.destroyed_desc":"Your civilization is in ruins. Rebuild with SES.","hud.destroyed_btn":"Rebuild","hud.rebuild_cost":"Rebuilding consumes significant energy (scales with rebirths)","hud.durability_warn":"Collector durability {pct}%","hud.durability_repair":"Repair","hud.cost":"Cost","hud.cooldown":"Cooldown","hud.confirm_attack":"Confirm Attack","hud.confirm_upgrade":"Confirm Upgrade","hud.cancel":"Cancel","hud.target":"Target","hud.in_range":"In Range","hud.out_of_range":"Out of Range","hud.error_dismiss":"{msg} (click to dismiss)","hud.loading_upgrade":"Upgrading…","ses.claim":"Claim SES","ses.claimed":"Claimed","action.title":"Actions","action.ses_balance":"SES Balance","action.collect_rate":"Rate","action.daily_est":"Daily","action.collect":"Collect","action.combat_energy":"Combat Energy","action.combat_energy_empty":"Empty","action.claimed_today":"Claimed Today","action.distributing":"Distributing…","action.distribute":"Distribute Epoch","action.epoch_remaining":"{min}m {sec}s","action.calculating":"Calculating…","action.claim_ses":"Claim Daily SES","action.group_collect":"Resource Production","action.group_claim":"Reward Settlement","action.group_move":"Protocol Nav","action.group_repair":"System Maintenance","action.move_input":"Nav Coordinates","action.move_confirm":"Confirm Nav","action.move_cancel":"Cancel","action.move":"Protocol Nav","action.jump":"Trace Jump","action.cancel_move":"Cancel Nav","action.repair_shield":"Repair Silence Shield","action.regen_shield":"Silence Regenerate","action.repair_all":"Compile Repair All","action.moving":"Moving","action.shield_full":"Shield Full","action.jump_confirm":"Confirm Jump","action.jump_warn":"Jump consumes energy and SES, engine durability -1; shield drops to 10% of max with a cooldown.","combat.title":"Trace Combat","combat.search_placeholder":"Enter target civ address 0x…","combat.search_btn":"Trace Scan","combat.energy":"Expanse Energy","combat.health":"Civ Health","combat.weapon_lv":"Weapon Lv","combat.shield_lv":"Silence Shield Lv","combat.distance":"Jump Distance","combat.out_of_range_warn":"Target out of jump range ({range} ls)","combat.attack_btn":"Trace Attack {name}","combat.attack_btn_idle":"Scan a target first","combat.attack_no_energy":"Not enough energy to attack","combat.attack_out_range":"Target out of range","combat.attack_in_cd":"Jump cooldown, wait a moment","combat.attack_no_token":"No traces left, wait to regenerate","combat.attack_cooldown":"(jump cd {sec}s)","combat.attack_cost":"({cost}⚡)","combat.confirm_attack":"Confirm Trace Attack","combat.confirm_cost":"Cost: {cost} Expanse Energy","combat.confirm_target":"Target Civ: {name}","combat.confirm_distance":"Jump Distance: {dist} ls","combat.confirm_cooldown":"Engine Cooldown: {sec}s","battle.title":"Trace Log","battle.empty":"No traces yet","upgrade.title":"System Compile","upgrade.collector":"Expanse Harvester","upgrade.weapon":"Weapon System","upgrade.shield":"Silence Shield","upgrade.radar":"Scan Array","upgrade.engine":"Jump Engine","upgrade.collect_rate":"Collect Rate","upgrade.attack_power":"Attack Power","upgrade.defense":"Defense","upgrade.scan_range":"Scan Range","upgrade.speed":"Speed","upgrade.cost":"Cost","upgrade.current":"Current","upgrade.after":"After","upgrade.gain":"Gain","upgrade.recommend_badge":"Recommended","upgrade.loading":"⟳ Loading upgrade data…","upgrade.unavailable":"Unable to load upgrade data","upgrade.btn":"⬆ Upgrade","upgrade.insufficient":"Not enough SES to upgrade","upgrade.best_value":"Best Value","upgrade.cost_label":"Cost","alliance.title":"Alliance","alliance.mine":"My Alliance","alliance.available":"Available Alliances","alliance.create":"Create Alliance","alliance.name":"Alliance Name","alliance.join":"Join","alliance.leave":"Leave","alliance.disband":"Disband","alliance.members":"Members","alliance.people":"","alliance.totem":"Totem","alliance.totem_pool":"Energy Pool","alliance.totem_bonus_desc":"Totem bonus: +8 defense per ally × (1 + totemLv×0.5%)","alliance.totem_bonus_value":"Current: +{val} defense","alliance.totem_next_bonus":"After upgrade: +{val} defense","alliance.donate":"Donate Energy","alliance.donate_invalid":"Enter a valid energy amount","alliance.totem_need_more":"Not enough energy in pool to upgrade totem","alliance.upgrade_totem":"Upgrade Totem","alliance.refund":"Claim Refund","alliance.you":"","alliance.no_alliance":"No Alliance","alliance.leader":"Leader","alliance.member":"Member","alliance.kick":"Kick","alliance.transfer":"Transfer","alliance.transfer_confirm":"Transfer leadership to this member?","alliance.refund_available":"You have {amt} SES refund pending","alliance.not_joined":"Not in an alliance","alliance.switch_tab":'Switch to "Join" tab to see available alliances',"alliance.level_members":"Lv.{lv} · {count}{unit}","market.title":"Energy Market","market.sell_placeholder_energy":"Energy amount","market.sell_placeholder_price":"SES price","market.sell_label_energy":"Sell Energy","market.sell_label_price":"Unit Price","market.sell_unit_price":"SES / ⚡","market.preview_receive":"You receive","market.your_energy":"Your Energy","market.insufficient_energy":"Not enough energy to sell","market.sell_btn":"Create Sell Order","market.buy_btn":"Buy","market.cancel_btn":"Cancel","market.empty":"No orders","market.buy_no_ses":"Not enough SES","market.order_energy":"{amt}⚡","market.order_price":"{price} SES","market.order_you":"(you)","market.energy":"Energy","market.ses_balance":"SES Balance","market.create_order":"Create Sell Order","market.active_orders":"Active Orders","leaderboard.title":"Leaderboard","leaderboard.loading":"⟳ Loading…","leaderboard.empty":"No data","leaderboard.col_rank":"#","leaderboard.col_player":"Player","leaderboard.col_level":"Level","leaderboard.col_energy":"Energy","leaderboard.player_level":"Lv.{lv}","leaderboard.rank":"Rank","leaderboard.name":"Name","leaderboard.power":"Energy","leaderboard.level":"Level","leaderboard.kills":"Kills","leaderboard.sort_power":"Energy","leaderboard.sort_kills":"Kills","mobile.tab_overview":"Status","mobile.tab_actions":"Actions","mobile.tab_combat":"Combat","mobile.tab_market":"Market","mobile.tab_alliance":"Alliance","page.overview":"Overview","page.actions":"Protocol Panel","page.combat":"Trace Combat","page.tech":"System Compile","page.alliance":"Pact Alliance","page.market":"Spark Market","page.leaderboard":"Epoch Board","general.epoch":"Epoch","general.next_epoch":"Next Epoch","general.energy":"Energy","general.health":"Health","general.loading":"Loading…","general.per_sec":"/s","general.per_hour":"/h","general.ls":"ls","general.ls_h":"ls/h","general.confirm":"Confirm","general.cancel":"Cancel","general.close":"Close","general.creating":"Creating civilization, please confirm MetaMask transaction…","general.back":"← Back","toast.civ_created":"🌌 Civilization {name} created!","toast.civ_create_failed":"Create failed: {msg}","toast.ses_insufficient":"Insufficient SES: need {need}, have {have}","toast.energy_insufficient":"Insufficient energy: need {need}⚡, have {have}⚡","toast.upgrade_success":"{name} upgraded!","toast.upgrade_failed":"Upgrade failed: {msg}","toast.attack_energy":"Insufficient energy: need {cost}⚡","toast.attack_failed":"Attack failed: {msg}","toast.collect_success":"⚡ Collected +{amount} energy","toast.collect_failed":"Collect failed: {msg}","toast.claim_combat_success":"📦 Combat energy claimed","toast.claim_combat_failed":"Claim failed: {msg}","toast.claim_ses_success":"📅 Daily SES claimed!","toast.claim_ses_failed":"Claim failed: {msg}","toast.move_success":"🚀 Arrived at destination","toast.move_failed":"Move failed: {msg}","toast.jump_success":"🌌 Space jump complete!","toast.jump_failed":"Jump failed: {msg}","toast.rebuild_success":"🌱 Civilization rebuilt!","toast.rebuild_failed":"Rebuild failed: {msg}","toast.repair_collector_success":"🔧 Collector repaired","toast.repair_collector_failed":"Repair failed: {msg}","toast.repair_shield_success":"🛡️ Shield fully repaired","toast.repair_shield_failed":"Repair failed: {msg}","toast.regen_shield_success":"🛡️ Shield regenerating","toast.regen_shield_failed":"Regen failed: {msg}","toast.repair_all_success":"🔧 All systems repaired","toast.repair_all_failed":"Repair failed: {msg}","toast.cancel_move_success":"⏹️ Move cancelled","toast.cancel_move_failed":"Cancel failed: {msg}","toast.alliance_created":"🏰 Alliance created!","toast.alliance_create_failed":"Create failed: {msg}","toast.refund_claimed":"💰 Refund claimed","toast.refund_failed":"Claim failed: {msg}","toast.alliance_joined":"🏰 Joined alliance!","toast.alliance_join_failed":"Join failed: {msg}","toast.alliance_left":"👋 Left alliance","toast.alliance_leave_failed":"Leave failed: {msg}","toast.leadership_transferred":"Leadership transferred","toast.leadership_transfer_failed":"Leadership transfer failed: {msg}","toast.member_kicked":"👢 Member kicked","toast.member_kick_failed":"Kick failed: {msg}","toast.alliance_disbanded":"🏰 Alliance disbanded","toast.alliance_disband_failed":"Disband failed: {msg}","toast.donate_success":"🔶 Donation successful!","toast.donate_failed":"Donation failed: {msg}","toast.totem_upgrade_success":"🔱 Totem upgraded!","toast.totem_upgrade_failed":"Totem upgrade failed: {msg}","toast.order_created":"📄 Sell order created (energy locked)","toast.order_failed":"Order failed: {msg}","toast.order_filled":"🛒 Order filled","toast.order_fill_failed":"Fill failed: {msg}","toast.order_cancelled":"❌ Order cancelled","toast.order_cancel_failed":"Cancel failed: {msg}","toast.contract_unavailable":"{name} contract unavailable. Check wallet connection.","toast.wallet_disconnected":"Wallet not connected"},ia={zh:Xt,en:aa};function ra(){if(typeof navigator>"u")return"zh";const e=navigator.languages||[navigator.language||""];for(const a of e){if(a.startsWith("zh"))return"zh";if(a.startsWith("en"))return"en"}return"zh"}let Ae=ra();const at=new Set;function sa(){return Ae}function oa(e){Ae=e,typeof localStorage<"u"&&localStorage.setItem("ses_lang",e),at.forEach(a=>a())}function la(){oa(Ae==="zh"?"en":"zh")}function ca(e){return at.add(e),()=>at.delete(e)}if(typeof localStorage<"u"){const e=localStorage.getItem("ses_lang");(e==="zh"||e==="en")&&(Ae=e)}function E(e,a){let o=ia[Ae][e]||Xt[e]||e;if(a)for(const[l,p]of Object.entries(a))o=o.replace(`{${l}}`,String(p));return o}const da={energyCollector:"collector",weapon:"weapon",shield:"shield",radar:"radar",engine:"engine"},pa={energyCollector:0,weapon:1,shield:2,radar:3,engine:4};function oe(){const e=re();function a(m,f){if(!m)throw new Error(`${f} Contract not available`)}async function s(){if(e.signer)return await e.signer.getAddress();const m=i.getState().address;if(m)return m;throw new Error("Wallet not connected")}const o=h.useCallback(async()=>{a(e.game,"SilentExpanseStrife");const m=await e.game.getEntryFee();return Me(m)},[e]),l=h.useCallback(async(m,f)=>{a(e.game,"SilentExpanseStrife"),a(e.signer,"Signer"),i.setState({loading:!0,error:null});try{const w=await e.game.getEntryFee(),y={value:w};let M;if(f){const A=_n(f.trim());M=await e.game["createCivilization(string,address)"](m.trim(),A,y)}else M=await e.game["createCivilization(string)"](m.trim(),y);await M.wait();const Y=await e.signer.getAddress(),U=await e.game.getCivilization(Y),Z=ce(U),ee=await e.game.getCurrentShieldHP(Y);return Z.shieldHP=Number(ee),i.setState({connected:!0,address:Y,playerCiv:Z,entryFee:Me(w),lastCollectTime:U.lastUpdateTime?Number(U.lastUpdateTime)*1e3:Date.now()}),i.getState().claimSES(),i.getState().addSuccessToast(E("toast.civ_created",{name:m})),!0}catch(w){return i.getState().addErrorToast(E("toast.civ_create_failed",{msg:G(w)})),!1}finally{i.setState({loading:!1})}},[e]),p=h.useCallback(async m=>{const f=i.getState();if(f.playerCiv){a(e.game,"SilentExpanseStrife"),a(e.sesToken,"SES Token"),i.setState({loading:!0,error:null});try{const w=e.game,y=e.sesToken,M=await s(),Y=await w.getUpgradeCost(M,da[m]),U=Number(Y.ses)/1e18,Z=Number(Y.energy),ee=parseFloat(f.sesBalance),A=f.playerCiv.energy;if(ee<U){i.setState({loading:!1,error:E("toast.ses_insufficient",{need:U.toFixed(2),have:ee.toFixed(2)})});return}if(A<Z){i.setState({loading:!1,error:E("toast.energy_insufficient",{need:Z.toLocaleString(),have:A.toLocaleString()})});return}await y.allowance(M,V.SILENT_EXPANSE)<Y.ses&&await(await y.approve(V.SILENT_EXPANSE,pt)).wait(),await(await w.upgradeSystem(pa[m])).wait();const dn=await w.getCivilization(M);i.setState({playerCiv:{...f.playerCiv,...ce(dn)},sesBalance:Ne(await y.balanceOf(M))}),i.getState().addSuccessToast(E("toast.upgrade_success",{name:J[m].name}))}catch(w){i.getState().addErrorToast(E("toast.upgrade_failed",{msg:G(w)}))}finally{i.setState({loading:!1})}}},[e]),u=h.useCallback(async()=>{const m=i.getState();if(!m.playerCiv||!m.selectedTarget)return;const f=i.getState().attackEnergyCost;if(m.attackTokens.current<=0){i.setState({error:E("combat.attack_no_token")});return}if(m.playerCiv.energy<f){i.setState({error:E("toast.attack_energy",{cost:f})});return}i.setState({loading:!0,error:null,lastAttackTime:Date.now()});try{a(e.game,"SilentExpanseStrife"),await(await e.game.attack(m.selectedTarget)).wait();const y=await s(),M=ce(await e.game.getCivilization(y));M.shieldHP=Number(await e.game.getCurrentShieldHP(y)),i.setState({playerCiv:{...m.playerCiv,...M}})}catch(w){i.getState().addErrorToast(E("toast.attack_failed",{msg:G(w)}))}finally{i.setState({loading:!1})}},[e]),c=h.useCallback(async()=>{if(i.getState().playerCiv){i.setState({loading:!0,error:null});try{a(e.game,"SilentExpanseStrife");const w=await(await e.game.collectEnergy()).wait();let y=0;if(w&&w.logs)try{const Z=e.game.interface;for(const ee of w.logs)try{const A=Z.parseLog(ee);if(A&&A.name==="EnergyCollected"){y=Number(A.args.amount??0);break}}catch{}}catch{}const M=await s(),Y=await e.game.getCivilization(M),U=ce(Y);U.shieldHP=Number(await e.game.getCurrentShieldHP(M)),i.setState(Z=>({playerCiv:Z.playerCiv?{...Z.playerCiv,...U}:null,lastCollectTime:Y.lastUpdateTime?Number(Y.lastUpdateTime)*1e3:Date.now()})),i.getState().addSuccessToast(E("toast.collect_success",{amount:y}))}catch(f){i.getState().addErrorToast(E("toast.collect_failed",{msg:G(f)}))}finally{i.setState({loading:!1})}}},[e]),T=h.useCallback(async()=>{if(!(i.getState().pendingEnergy<=0)){i.setState({loading:!0,error:null});try{a(e.game,"SilentExpanseStrife"),await(await e.game.claimCombatEnergy()).wait();const w=await s(),y=await e.game.getCivilization(w),M=await e.game.pendingCombatEnergy(w);i.setState({playerCiv:{...i.getState().playerCiv,...ce(y)},pendingEnergy:Number(M)}),i.getState().addSuccessToast(E("toast.claim_combat_success"))}catch(f){i.getState().addErrorToast(E("toast.claim_combat_failed",{msg:G(f)}))}finally{i.setState({loading:!1})}}},[e]),g=h.useCallback(async()=>{i.setState({loading:!0,error:null});try{a(e.dailyMinter,"DailyMinter"),await(await e.dailyMinter.distribute()).wait(),i.getState().addSuccessToast("分发成功！可以领取 SES 了")}catch(m){i.getState().addErrorToast(E("toast.claim_ses_failed",{msg:G(m)}))}finally{i.setState({loading:!1})}},[e]),k=h.useCallback(async()=>{i.setState({loading:!0,error:null});try{a(e.dailyMinter,"DailyMinter"),a(e.sesToken,"SES Token");try{await(await e.dailyMinter.distribute()).wait()}catch{}await(await e.dailyMinter.claim()).wait();const f=await s();i.setState({sesBalance:Ne(await e.sesToken.balanceOf(f))}),i.getState().claimSES(),i.getState().addSuccessToast(E("toast.claim_ses_success"))}catch(m){i.getState().addErrorToast(E("toast.claim_ses_failed",{msg:G(m)}))}finally{i.setState({loading:!1})}},[e]),$=h.useCallback(async(m,f,w)=>{i.setState({loading:!0,error:null});try{a(e.game,"SilentExpanseStrife"),await(await e.game.startMove(m,f,w)).wait(),i.getState().addSuccessToast(E("toast.move_success"))}catch(y){i.getState().addErrorToast(E("toast.move_failed",{msg:G(y)}))}finally{i.setState({loading:!1})}},[e]),b=h.useCallback(async()=>{i.setState({loading:!0,error:null});try{a(e.game,"SilentExpanseStrife"),await(await e.game.spaceJump()).wait(),i.getState().addSuccessToast(E("toast.jump_success"))}catch(m){i.getState().addErrorToast(E("toast.jump_failed",{msg:G(m)}))}finally{i.setState({loading:!1})}},[e]),z=h.useCallback(async()=>{i.setState({loading:!0,error:null});try{a(e.game,"SilentExpanseStrife"),await(await e.game.rebuildCivilization()).wait();const f=await s(),w=await e.game.getCivilization(f),y=ce(w);y.shieldHP=Number(await e.game.getCurrentShieldHP(f)),i.setState({playerCiv:{...i.getState().playerCiv,...y}}),i.getState().addSuccessToast(E("toast.rebuild_success"))}catch(m){i.getState().addErrorToast(E("toast.rebuild_failed",{msg:G(m)}))}finally{i.setState({loading:!1})}},[e]),B=h.useCallback(async m=>{if(i.getState().playerCiv){i.setState({loading:!0,error:null});try{a(e.game,"SilentExpanseStrife"),await(await e.game.repairCollector(m)).wait();const y=await s(),M=await e.game.getCollectorDurability(y);i.setState({collectorDurability:{current:Number(M[0]),max:Number(M[1])}}),i.getState().addSuccessToast(E("toast.repair_collector_success"))}catch(w){i.getState().addErrorToast(E("toast.repair_collector_failed",{msg:G(w)}))}finally{i.setState({loading:!1})}}},[e]),v=h.useCallback(async()=>{const m=i.getState();if(!m.playerCiv)return;const f=m.playerCiv.maxShieldHP;if(!(m.playerCiv.shieldHP>=f)){i.setState({loading:!0,error:null});try{a(e.game,"SilentExpanseStrife");const w=f-m.playerCiv.shieldHP;await(await e.game.repairShield(w)).wait();const M=await s(),Y=await e.game.getCurrentShieldHP(M);i.setState(U=>({playerCiv:U.playerCiv?{...U.playerCiv,shieldHP:Number(Y)}:null})),i.getState().addSuccessToast(E("toast.repair_shield_success"))}catch(w){i.getState().addErrorToast(E("toast.repair_shield_failed",{msg:G(w)}))}finally{i.setState({loading:!1})}}},[e]),P=h.useCallback(async()=>{if(i.getState().playerCiv){i.setState({loading:!0,error:null});try{a(e.game,"SilentExpanseStrife"),await(await e.game.regenShield()).wait();const w=await s(),y=await e.game.getCurrentShieldHP(w);i.setState(M=>({playerCiv:M.playerCiv?{...M.playerCiv,shieldHP:Number(y)}:null})),i.getState().addSuccessToast(E("toast.regen_shield_success"))}catch(f){i.getState().addErrorToast(E("toast.regen_shield_failed",{msg:G(f)}))}finally{i.setState({loading:!1})}}},[e]),F=h.useCallback(async()=>{i.setState({loading:!0,error:null});try{a(e.game,"SilentExpanseStrife"),await(await e.game.repairAll()).wait();const f=await s(),w=await e.game.getCivilization(f);i.setState({playerCiv:{...i.getState().playerCiv,...ce(w)}}),i.getState().addSuccessToast(E("toast.repair_all_success"))}catch(m){i.getState().addErrorToast(E("toast.repair_all_failed",{msg:G(m)}))}finally{i.setState({loading:!1})}},[e]),x=h.useCallback(async()=>{i.setState({loading:!0,error:null});try{a(e.game,"SilentExpanseStrife"),await(await e.game.cancelMove()).wait();const f=await s(),w=await e.game.getCurrentPosition(f);i.setState(y=>({playerCiv:y.playerCiv?{...y.playerCiv,x:Number(w.x??w[0]),y:Number(w.y??w[1]),z:Number(w.z??w[2])}:null})),i.getState().addSuccessToast(E("toast.cancel_move_success"))}catch(m){i.getState().addErrorToast(E("toast.cancel_move_failed",{msg:G(m)}))}finally{i.setState({loading:!1})}},[e]),S=h.useCallback(async m=>{if(m.trim()){i.setState({loading:!0,error:null});try{a(e.alliance,"Alliance"),await(await e.alliance.createAlliance(m.trim())).wait(),i.getState().addSuccessToast(E("toast.alliance_created"))}catch(f){i.getState().addErrorToast(E("toast.alliance_create_failed",{msg:G(f)}))}finally{i.setState({loading:!1})}}},[e]),C=h.useCallback(async()=>{i.setState({loading:!0,error:null});try{a(e.alliance,"Alliance"),a(e.sesToken,"SES Token"),await(await e.alliance.claimRefund()).wait();const f=await s();i.setState({sesBalance:Ne(await e.sesToken.balanceOf(f)),pendingRefund:0}),i.getState().addSuccessToast(E("toast.refund_claimed"))}catch(m){i.getState().addErrorToast(E("toast.refund_failed",{msg:G(m)}))}finally{i.setState({loading:!1})}},[e]),O=h.useCallback(async m=>{i.setState({loading:!0,error:null});try{a(e.alliance,"Alliance"),await(await e.alliance.joinAlliance(m)).wait(),i.getState().addSuccessToast(E("toast.alliance_joined"))}catch(f){i.getState().addErrorToast(E("toast.alliance_join_failed",{msg:G(f)}))}finally{i.setState({loading:!1})}},[e]),L=h.useCallback(async m=>{i.setState({loading:!0,error:null});try{a(e.alliance,"Alliance"),await(await e.alliance.leaveAlliance(m)).wait(),i.setState({currentAlliance:null,_allianceMembers:[],_allianceTotemLevel:0,_allianceTotemEnergy:0,_allianceTotemUpgradeCost:0,_allianceIsLeader:!1,_allianceLeader:""}),i.getState().addSuccessToast(E("toast.alliance_left"))}catch(f){i.getState().addErrorToast(E("toast.alliance_leave_failed",{msg:G(f)}))}finally{i.setState({loading:!1})}},[e]),d=h.useCallback(async(m,f)=>{i.setState({loading:!0,error:null});try{a(e.alliance,"Alliance"),await(await e.alliance.kickMember(m,f)).wait(),i.getState().addSuccessToast(E("toast.member_kicked"))}catch(w){i.getState().addErrorToast(E("toast.member_kick_failed",{msg:G(w)}))}finally{i.setState({loading:!1})}},[e]),I=h.useCallback(async(m,f)=>{i.setState({loading:!0,error:null});try{a(e.alliance,"Alliance"),await(await e.alliance.transferLeadership(m,f)).wait(),i.getState().addSuccessToast(E("toast.leadership_transferred"))}catch(w){i.getState().addErrorToast(E("toast.leadership_transfer_failed",{msg:G(w)}))}finally{i.setState({loading:!1})}},[e]),K=h.useCallback(async m=>{i.setState({loading:!0,error:null});try{a(e.alliance,"Alliance"),await(await e.alliance.disbandAlliance(m)).wait(),i.setState({currentAlliance:null,_allianceMembers:[],_allianceTotemLevel:0,_allianceTotemEnergy:0,_allianceTotemUpgradeCost:0,_allianceIsLeader:!1,_allianceLeader:""}),i.getState().addSuccessToast(E("toast.alliance_disbanded"))}catch(f){i.getState().addErrorToast(E("toast.alliance_disband_failed",{msg:G(f)}))}finally{i.setState({loading:!1})}},[e]),D=h.useCallback(async(m,f)=>{i.setState({loading:!0,error:null});try{a(e.game,"SilentExpanseStrife"),await(await e.game.donateToTotem(m,f)).wait(),i.getState().addSuccessToast(E("toast.donate_success"))}catch(w){i.getState().addErrorToast(E("toast.donate_failed",{msg:G(w)}))}finally{i.setState({loading:!1})}},[e]),W=h.useCallback(async m=>{i.setState({loading:!0,error:null});try{a(e.game,"SilentExpanseStrife"),await(await e.game.upgradeTotem(m)).wait(),i.getState().addSuccessToast(E("toast.totem_upgrade_success"))}catch(f){i.getState().addErrorToast(E("toast.totem_upgrade_failed",{msg:G(f)}))}finally{i.setState({loading:!1})}},[e]),_=h.useCallback(()=>{i.setState({error:null})},[]),H=h.useCallback(async(m,f)=>{i.setState({loading:!0,error:null});try{if(a(e.signer,"Signer"),!V.ENERGY_MARKET)throw new Error("ENERGY_MARKET address not configured");if(await(await new se(V.ENERGY_MARKET,ze,e.signer).createOrder(m,wn(String(f)))).wait(),e.game){const M=await s(),Y=await e.game.getCivilization(M);i.setState({playerCiv:{...i.getState().playerCiv,energy:Number(Y.energy??Y[2]??0)}})}i.getState().addSuccessToast(E("toast.order_created"))}catch(w){i.getState().addErrorToast(E("toast.order_failed",{msg:G(w)}))}finally{i.setState({loading:!1})}},[e]),j=h.useCallback(async(m,f,w)=>{i.setState({loading:!0,error:null});try{a(e.signer,"Signer"),a(e.sesToken,"SES Token");const y=new se(V.ENERGY_MARKET,ze,e.signer),M=await y.orders(m);if(M.remaining===0n)throw new Error("Order already filled");const Y=BigInt(M.sesPrice)/BigInt(M.energyAmount),U=w??Y*110n/100n,Z=BigInt(f)*M.sesPrice/M.energyAmount,ee=await s();if(await e.sesToken.allowance(ee,V.ENERGY_MARKET)<Z&&await(await e.sesToken.approve(V.ENERGY_MARKET,pt)).wait(),await(await y.fillOrder(m,f,U)).wait(),e.game){const fe=await e.game.getCivilization(ee);i.setState({playerCiv:{...i.getState().playerCiv,energy:Number(fe.energy??0)},sesBalance:Ne(await e.sesToken.balanceOf(ee))})}i.getState().addSuccessToast(E("toast.order_filled"))}catch(y){i.getState().addErrorToast(E("toast.order_fill_failed",{msg:G(y)}))}finally{i.setState({loading:!1})}},[e]),q=h.useCallback(async m=>{i.setState({loading:!0,error:null});try{a(e.signer,"Signer"),await(await new se(V.ENERGY_MARKET,ze,e.signer).cancelOrder(m)).wait(),i.getState().addSuccessToast(E("toast.order_cancelled"))}catch(f){i.getState().addErrorToast(E("toast.order_cancel_failed",{msg:G(f)}))}finally{i.setState({loading:!1})}},[e]);return{createCivilization:l,fetchEntryFee:o,upgradeSystem:p,attackTarget:u,collectEnergy:c,claimCombatEnergy:T,claimDailySES:k,distribute:g,startMove:$,spaceJump:b,rebuildCivilization:z,repairCollector:B,repairShield:v,regenShield:P,repairAll:F,cancelMove:x,createAlliance:S,joinAlliance:O,leaveAlliance:L,kickMember:d,transferLeadership:I,disbandAlliance:K,donateToTotem:D,upgradeTotem:W,claimRefund:C,clearError:_,createEnergyOrder:H,fillEnergyOrder:j,cancelEnergyOrder:q}}function G(e,a="Unknown error"){if(e instanceof Error)return e.message;if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return a}}function ot(e){var s,o,l;const a=Number(e.shieldLv??1);return{name:String(e.name??""),x:Number(e.x??((s=e.location)==null?void 0:s.x)??0),y:Number(e.y??((o=e.location)==null?void 0:o.y)??0),z:Number(e.z??((l=e.location)==null?void 0:l.z)??0),energy:Number(e.energy??0),health:Number(e.health??0),shieldHP:Number(e.shieldHP??0),maxShieldHP:V.SHIELD_HP_BASE+V.SHIELD_HP_RATE*a*a,energyCollectorLv:Number(e.energyCollectorLv??1),weaponLv:Number(e.weaponLv??1),radarLv:Number(e.radarLv??1),shieldLv:a,engineLv:Number(e.engineLv??1),scanRange:Number(e.scanRange??1e3),isRuins:!!(e.isRuins??!1),isMoving:!1}}function ce(e){return ot(e)}function Ne(e){const a=typeof e=="bigint"?Number(e)/1e18:Number(e);return isNaN(a)?"0.00":a.toFixed(2)}function te(){const[,e]=h.useState(0);return h.useEffect(()=>ca(()=>e(s=>s+1)),[]),{t:E,lang:sa,toggleLang:la}}const n={bg:"#0A0E17",card:"#131A2B",border:"#1E2A45",text:{primary:"#E8EDF5",secondary:"#8892A8"},accent:{green:"#00D4AA",blue:"#4A90D9",red:"#FF4757",gold:"#FFD93D",shield:"#5F9FFF"},button:{primary:"#00D4AA",danger:"#FF4757",ghost:"transparent",ghostBorder:"#1E2A45"},status:{success:"#00D4AA",error:"#FF4757",warning:"#FFD93D",info:"#4A90D9"},alpha:(e,a)=>{const s=parseInt(e.slice(1,3),16),o=parseInt(e.slice(3,5),16),l=parseInt(e.slice(5,7),16);return`rgba(${s},${o},${l},${a})`}},ua=e=>n.alpha(e,.12);function qt(e){const a=[],s=e===1?90:60;let o=49734321;const l=()=>(o=o*1103515245+12345&2147483647,o/2147483647);for(let p=0;p<s;p++){const u=Math.round(l()*1920),c=Math.round(l()*1080);a.push(`${u}px ${c}px 0 rgba(255,255,255,${e===1?.55:.35})`)}return a.join(",")}const ya=qt(1),ma=qt(2),ga=ge`
  from { background-position: 0 0; }
  to { background-position: 0 -120px; }
`,fa=ge`
  from { transform: scale(1.0) translate(0, 0); }
  to { transform: scale(1.08) translate(-14px, -10px); }
`,ba=r.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: -1;
  background: #0A0E17; /* 视频/图片加载失败时的兜底底色 */
`,xa=r.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: ${({$opacity:e})=>e};
`,ha=r.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url('/assets/bg/nebula.jpg');
  background-size: cover;
  background-position: center;
  animation: ${fa} 90s ease-in-out infinite alternate;
`,va=r.div`
  position: absolute;
  inset: -120px 0 0 0;
  z-index: 1;
  background-image: radial-gradient(${ya}),
    radial-gradient(${ma});
  background-size: 1920px 1080px, 1920px 1080px;
  animation: ${ga} 120s linear infinite;
  pointer-events: none;
`,Ta=r.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: ${({$dense:e})=>e?"linear-gradient(180deg, rgba(8,12,24,0.88) 0%, rgba(8,12,24,0.62) 45%, rgba(4,6,14,0.92) 100%)":"linear-gradient(180deg, rgba(10,14,23,0.82) 0%, rgba(10,14,23,0.55) 45%, rgba(6,8,18,0.9) 100%)"};
  pointer-events: none;
`,_a=r.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0) 52%, rgba(0,0,0,0.62) 100%);
  pointer-events: none;
`,lt=h.memo(function({variant:a="hero",clip:s="hero",dense:o=!1,videoOpacity:l=1}){const p=s==="ascend"?"/assets/bg/web-bg-ascend.mp4":s==="game"?"/assets/bg/web-bg-game.mp4":"/assets/bg/web-bg-hero.mp4";return t.jsxs(ba,{"aria-hidden":"true",children:[a==="hero"?t.jsx(xa,{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:"auto",poster:"/assets/bg/nebula.jpg",src:p,$opacity:l}):t.jsx(ha,{}),t.jsx(va,{}),t.jsx(Ta,{$dense:o}),t.jsx(_a,{})]})}),wa=ge`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`,Sa=ge`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`,Ea=r.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  pointer-events: auto;
  z-index: 200;
  padding: 24px 16px;
  padding-top: env(safe-area-inset-top, 24px);
  padding-bottom: env(safe-area-inset-bottom, 24px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`,Ca=r.h1`
  font-size: ${({$mobile:e})=>e?"2.5rem":"4rem"};
  color: ${n.accent.green};
  font-family: 'Courier New', monospace;
  letter-spacing: ${({$mobile:e})=>e?"6px":"12px"};
  text-shadow: 0 0 40px ${n.alpha(n.accent.green,.5)};
  margin-bottom: 8px;
  animation: ${wa} 3s ease-in-out infinite;
  text-align: center;
  word-break: break-word;
`,ka=r.p`
  color: ${n.text.secondary};
  font-size: ${({$mobile:e})=>e?"0.9rem":"1.1rem"};
  font-family: 'Courier New', monospace;
  letter-spacing: ${({$mobile:e})=>e?"3px":"6px"};
  margin-bottom: 24px;
  text-align: center;
`,Ma=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  max-width: 520px;
  text-align: center;
`,ja=r.div`
  color: ${n.alpha(n.accent.green,.6)};
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 8px;
  animation: ${Sa} 2s ease-in-out infinite;
`,ht=r.div`
  color: ${n.alpha(n.text.primary,.85)};
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
`,Aa=r.div`
  color: ${n.alpha(n.text.secondary,.7)};
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  line-height: 1.5;
  margin-top: 4px;
  max-width: 440px;
  white-space: pre-line;
`,Na=r.div`
  width: 60px;
  height: 1px;
  background: ${n.alpha(n.accent.green,.3)};
  margin: 8px 0 12px;
`,vt=r.button`
  padding: ${({$mobile:e})=>e?"14px 32px":"16px 48px"};
  font-size: ${({$mobile:e})=>e?"1rem":"1.2rem"};
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: ${n.accent.green};
  background: transparent;
  border: 2px solid ${n.accent.green};
  border-radius: 8px;
  cursor: pointer;
  letter-spacing: 4px;
  transition: all 0.3s ease;
  min-height: 48px;
  -webkit-tap-highlight-color: transparent;
  &:hover { background: ${n.alpha(n.accent.green,.1)}; box-shadow: 0 0 50px ${n.alpha(n.accent.green,.4)}; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:active { background: ${n.alpha(n.accent.green,.2)}; }
`,Zt=r.input`
  padding: 12px 16px;
  font-size: ${({$mobile:e})=>e?"0.95rem":"1rem"};
  font-family: 'Courier New', monospace;
  background: ${n.alpha(n.accent.green,.05)};
  border: 1px solid ${n.alpha(n.accent.green,.3)};
  border-radius: 8px;
  color: ${n.accent.green};
  outline: none;
  width: 100%;
  max-width: 360px;
  text-align: center;
  min-height: ${({$mobile:e})=>e?"44px":"auto"};
  &::placeholder { color: ${n.alpha(n.accent.green,.2)}; }
  &:focus { border-color: ${n.accent.green}; box-shadow: 0 0 20px ${n.alpha(n.accent.green,.2)}; }
`,$a=r(Zt)`
  font-size: ${({$mobile:e})=>"0.85rem"};
`,Ra=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 400px;
`,La=r.div`
  color: ${n.accent.red};
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  margin-top: 8px;
  text-align: center;
  padding: 0 16px;
`,Tt=r.div`
  color: ${n.accent.gold};
  font-size: ${({$mobile:e})=>e?"0.8rem":"0.85rem"};
  font-family: 'Courier New', monospace;
  background: ${n.alpha(n.accent.gold,.1)};
  border: 1px solid ${n.alpha(n.accent.gold,.3)};
  border-radius: 6px;
  padding: 8px 16px;
  text-align: center;
  max-width: 360px;
  width: 100%;
`,Ia=r.p`
  color: ${n.text.secondary};
  font-size: ${({$mobile:e})=>e?"0.75rem":"0.85rem"};
  margin-top: 16px;
  font-family: 'Courier New', monospace;
  text-align: center;
  max-width: 360px;
`,_t=r.p`
  color: ${n.accent.green};
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 24px;
`,Pa=r.div`
  color: ${n.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  background: ${n.alpha(n.accent.green,.08)};
  border: 1px solid ${n.alpha(n.accent.green,.2)};
  border-radius: 4px;
  padding: 6px 12px;
  text-align: center;
  width: 100%;
`,Ba=r.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
  width: 100%;
  max-width: 420px;
`,Da=r.button`
  background: none;
  border: 1px solid ${n.alpha(n.text.secondary,.3)};
  border-radius: 4px;
  color: ${n.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  padding: 4px 12px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  &:hover { color: ${n.accent.green}; border-color: ${n.accent.green}; }
`,Oa=r.a`
  color: ${n.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  text-decoration: none;
  transition: color 0.15s;
  &:hover { color: ${n.accent.green}; text-decoration: underline; }
`,wt=r.div`
  margin-bottom: 24px;
  /* Override RainbowKit button to match Silent Expanse: Strife theme */
  [data-rk] button {
    font-family: 'Courier New', monospace !important;
  }
`;function Qt(){const[e,a]=h.useState(""),[s,o]=h.useState(""),[l,p]=h.useState(!1),[u,c]=h.useState(null),[T,g]=h.useState("0.01"),[k,$]=h.useState(!1),{t:b,toggleLang:z}=te(),B=we(),v=i(H=>H.loading),{address:P,isConnected:F}=vn(),x=re(),{createCivilization:S,fetchEntryFee:C}=oe(),O=P?P.slice(0,4)+"..."+P.slice(-4):"",L=h.useRef(!1),d=h.useRef(P);h.useEffect(()=>{const H=d.current&&P&&d.current!==P;if((L.current&&!F||H)&&i.getState().setDisconnected(),L.current=F,d.current=P,!F||!P||!x.isReady||x.contractUnavailable||!x.game||!x.sesToken)return;let q=!1;$(!0);async function m(){let f;try{f=await x.game.getCivilization(P)}catch{q||$(!1);return}if(!q){if(f!=null&&f.exists){const w=ot(f);i.setState({connected:!0,address:P,playerCiv:w}),Promise.all([x.sesToken.balanceOf(P),x.game.getEntryFee()]).then(async([y,M])=>{i.setState({sesBalance:parseFloat(Me(y)).toFixed(2),entryFee:Me(M)})}).catch(()=>{})}q||$(!1)}}return m(),()=>{q=!0}},[F,P,x.isReady,x.contractUnavailable]),h.useEffect(()=>{C().then(g).catch(()=>{});const H=setInterval(()=>{C().then(g).catch(()=>{})},3e4);return()=>clearInterval(H)},[C]);const I=async()=>{if(!e.trim()){c(b("connect.name_required"));return}if(e.length>32){c(b("connect.name_too_long"));return}if(!P){c(b("connect.wallet_required"));return}const H=s.trim();if(H&&!Sn(H)){c(b("connect.bad_referrer"));return}p(!0),c(null),await S(e.trim(),H||void 0)||p(!1)},K=!F,D=F&&(!x.isReady||x.contractUnavailable||k),W=F&&x.isReady&&!x.contractUnavailable&&!k&&!l,_=l;return t.jsxs(Ea,{children:[t.jsx(lt,{variant:"hero",clip:"hero",dense:!0}),t.jsxs(Ma,{children:[t.jsxs(ja,{children:["◈ ",b("lore.splash_title")," ◈"]}),t.jsx(ht,{children:b("lore.splash_line1")}),t.jsx(ht,{children:b("lore.splash_line2")}),t.jsx(Na,{}),t.jsx(Aa,{children:b("lore.protocol_intro")})]}),t.jsx(Ca,{$mobile:B,children:b("connect.title")}),t.jsx(ka,{$mobile:B,children:b("connect.subtitle")}),t.jsxs(Tt,{$mobile:B,children:[b("connect.fee_label"),": ",t.jsxs("strong",{children:[T," BNB"]})]}),K&&t.jsxs(t.Fragment,{children:[t.jsx(wt,{children:t.jsx(Fe,{})}),t.jsx(Ia,{$mobile:B,children:b("connect.fee_hint")})]}),D&&t.jsx(_t,{children:!x.isReady||x.contractUnavailable?b("connect.loading_contract"):b("connect.checking_civ")}),W&&t.jsxs(Ra,{children:[t.jsx(wt,{children:t.jsx(Fe,{})}),O&&t.jsxs(Pa,{children:["🔗 ",O]}),t.jsx(Zt,{$mobile:B,placeholder:b("connect.civ_name"),value:e,onChange:H=>a(H.target.value),maxLength:32,onKeyDown:H=>H.key==="Enter"&&I(),autoFocus:!0}),t.jsx($a,{$mobile:B,placeholder:b("connect.referrer"),value:s,onChange:H=>o(H.target.value),onKeyDown:H=>H.key==="Enter"&&I()}),t.jsx(Tt,{$mobile:B,children:b("connect.referral_bonus")}),t.jsx(vt,{$mobile:B,onClick:I,disabled:v,children:b("connect.pay",{fee:T})})]}),_&&t.jsxs(t.Fragment,{children:[t.jsx(_t,{children:b("general.creating")}),t.jsxs(vt,{$mobile:B,onClick:()=>p(!1),disabled:v,style:{marginTop:16,fontSize:B?"0.85rem":"0.95rem",animation:"none"},children:["← ",b("general.back")]})]}),u&&t.jsx(La,{children:u}),t.jsxs(Ba,{children:[t.jsx(Da,{onClick:z,children:b("connect.lang_switch")}),t.jsx(Oa,{href:"https://docs.strifelabs.com",target:"_blank",rel:"noopener noreferrer",children:b("connect.tutorial")})]})]})}const za=1e6;function _e(e){return Number.isFinite(e)?e.toExponential(2):"0"}function R(e,a=2){return Number.isFinite(e)?Math.abs(e)>=1e9?(e/1e9).toFixed(a).replace(/\.?0+$/,"")+"B":Math.abs(e)>=1e6?(e/1e6).toFixed(a).replace(/\.?0+$/,"")+"M":Math.abs(e)>=za?(e/1e3).toFixed(a).replace(/\.?0+$/,"")+"K":Number.isInteger(e)?e.toLocaleString():e.toFixed(a).replace(/\.?0+$/,""):"0"}function Ue(e){const a=typeof e=="string"?parseFloat(e):e;return Number.isFinite(a)?R(a):"0"}const Fa=r.div`
  background: ${n.bg};
  border: 1px solid ${n.border};
  border-radius: 6px;
  padding: 6px 10px;
`,Ha=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`,Ua=r.span`
  color: ${n.text.secondary};
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
`,Ya=r.span`
  color: ${({$color:e})=>e||n.accent.green};
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
`,Ga=r.div`
  height: 6px;
  background: ${n.alpha(n.border,.3)};
  border-radius: 3px;
  overflow: hidden;
`,Ka=r.div`
  height: 100%;
  width: ${({$pct:e})=>Math.max(0,Math.min(100,e))}%;
  background: ${({$color:e})=>e||n.accent.green};
  border-radius: 3px;
  transition: width 0.4s ease;
`;function Va({label:e,value:a,max:s,rate:o,color:l,icon:p}){const u=s!==void 0&&s>0,c=u?a/s*100:0;return t.jsxs(Fa,{children:[t.jsxs(Ha,{children:[t.jsxs(Ua,{children:[p||""," ",e]}),t.jsxs("span",{children:[t.jsx(Ya,{$color:l,children:R(a)}),u&&t.jsxs("span",{style:{color:n.text.secondary,fontSize:"0.7rem",fontFamily:"'Courier New', monospace"},children:[" ","/ ",R(s)]}),o&&t.jsx("span",{style:{color:n.text.secondary,fontSize:"0.65rem",fontFamily:"'Courier New', monospace",marginLeft:6},children:o})]})]}),u&&t.jsx(Ga,{children:t.jsx(Ka,{$pct:c,$color:l})})]})}const Wa=r.img`
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.25em;
  object-fit: contain;
  image-rendering: auto;
  flex-shrink: 0;
`,Ja=r.span`
  line-height: 1;
`;function N({icon:e,size:a}){return e.startsWith("/")||e.startsWith("data:")||e.startsWith("http")?t.jsx(Wa,{src:e,alt:"",style:a?{width:a,height:a}:void 0}):t.jsx(Ja,{style:a?{fontSize:a}:void 0,children:e})}const Xa=r.div`
  background: ${n.alpha(n.card,.6)};
  border: 1px solid ${({$warn:e})=>e?n.status.warning:n.border};
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: border-color 0.2s;
  &:hover { border-color: ${({$warn:e})=>e?n.status.warning:n.alpha(n.accent.green,.3)}; }
`,qa=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 4px;
`,Za=r.span`
  color: ${n.text.primary};
  font-size: 0.82rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
`,Qa=r.span`
  color: ${n.text.secondary};
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  background: ${n.alpha(n.text.secondary,.08)};
  border-radius: 3px;
  padding: 1px 6px;
`,ei=r.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`,ti=r.div`
  display: flex;
  gap: 6px;
  margin-top: 10px;
  flex-wrap: wrap;
`;function ni({icon:e,title:a,level:s,levelKey:o="Lv",children:l,bars:p,actions:u,warn:c}){return t.jsxs(Xa,{$warn:c,children:[t.jsxs(qa,{children:[t.jsxs(Za,{children:[t.jsx(N,{icon:e})," ",a]}),s!==void 0&&t.jsxs(Qa,{children:[o,".",s]})]}),t.jsxs(ei,{children:[p==null?void 0:p.map((T,g)=>t.jsx(Va,{...T},g)),l]}),u&&t.jsx(ti,{children:u})]})}const ai={primary:Oe`
    background: ${n.accent.green};
    color: ${n.bg};
    border: none;
    &:hover:not(:disabled) { background: ${n.alpha(n.accent.green,.85)}; }
  `,danger:Oe`
    background: ${n.accent.red};
    color: #fff;
    border: none;
    &:hover:not(:disabled) { background: ${n.alpha(n.accent.red,.85)}; }
  `,ghost:Oe`
    background: transparent;
    color: ${n.text.secondary};
    border: 1px solid ${n.border};
    &:hover:not(:disabled) { background: ${ua(n.border)}; }
  `},ii=r.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 14px;
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  min-height: 36px;
  @media (max-width: 767px) { min-height: 44px; padding: 10px 16px; }
  -webkit-tap-highlight-color: transparent;
  transition: background 0.15s, opacity 0.15s;
  white-space: nowrap;
  ${({$variant:e})=>ai[e]}
  &:disabled { opacity: 0.35; cursor: not-allowed; }
  &:active { opacity: 0.7; }
`;function X({variant:e="ghost",disabled:a,loading:s,icon:o,children:l,onClick:p,title:u,style:c,...T}){return t.jsxs(ii,{$variant:e,disabled:a||s,onClick:p,title:u,style:c,...T,children:[s&&"⟳ ",o&&t.jsx(N,{icon:o}),l]})}const ri=r.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${({$mobile:e})=>e&&Oe`padding: 4px 0;`}
`,$e=r.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: 14px 16px;
`,St=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
`,si=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 10px;
`,Et=r.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
`,oi=r.div`
  color: ${n.accent.green};
  font-size: 1.1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 1px;
`,Ct=r.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
`,de=r.div`
  background: ${({$color:e})=>n.alpha(e,.08)};
  border: 1px solid ${({$color:e})=>n.alpha(e,.18)};
  border-radius: 6px;
  padding: 8px 14px;
  min-height: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 3px;
`,pe=r.div`
  color: ${n.text.secondary};
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2px;
`,ue=r.div`
  color: ${({$color:e})=>e};
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
`,Re=r.div`
  color: ${n.text.secondary};
  font-size: 0.65rem;
  font-family: 'Courier New', monospace;
`;function it(){const{t:e}=te(),a=i(_=>_.playerCiv),s=i(_=>_.address),o=i(_=>_.sesBalance),l=i(_=>_.pendingEnergy),p=i(_=>_.attackTokens),u=i(_=>_.loading),c=i(_=>_.error),T=we(),{clearError:g,rebuildCivilization:k,repairCollector:$}=oe(),b=i(_=>_.collectRate),z=i(_=>_.attackPower),B=i(_=>_.isDestroyed),v=i(_=>_.collectorDurability),P=i(_=>_.combatBoost),F=i(_=>_.shieldDefense),x=i(_=>_.speed),S=i(_=>_.radarRange),C=i(_=>_.currentAlliance),O=i(_=>_._allianceTotemLevel),L=(C==null?void 0:C.memberCount)??0,d=L>1?Math.floor((L-1)*8*(1e4+O*50)/1e4):0,I=F+d,K=s?`${s.slice(0,6)}...${s.slice(-4)}`:"",D=parseFloat(o),W=h.useMemo(()=>{const _=a;return[{key:"energyCollector",icon:J.energyCollector.icon,title:J.energyCollector.name,lv:_.energyCollectorLv,color:J.energyCollector.color,bars:[{label:e("hud.collect_rate"),value:b,rate:R(b,2)+e("general.per_sec"),color:n.accent.green},...v.max>0?[{label:e("hud.durability"),value:v.current,max:v.max,color:n.accent.blue}]:[]]},{key:"weapon",icon:J.weapon.icon,title:J.weapon.name,lv:_.weaponLv,color:J.weapon.color,bars:[{label:e("hud.attack_power"),value:z,color:n.accent.red}]},{key:"shield",icon:J.shield.icon,title:J.shield.name,lv:_.shieldLv,color:J.shield.color,bars:[{label:e("hud.shield"),value:_.shieldHP,max:_.maxShieldHP,color:n.accent.shield},{label:e("hud.defense"),value:I,color:J.shield.color}]},{key:"radar",icon:J.radar.icon,title:J.radar.name,lv:_.radarLv,color:J.radar.color,bars:[{label:e("hud.scan_range"),value:S||_.scanRange,rate:(S||_.scanRange)+e("general.ls"),color:n.accent.blue}]},{key:"engine",icon:J.engine.icon,title:J.engine.name,lv:_.engineLv,color:J.engine.color,bars:[{label:e("hud.speed"),value:x,rate:x+e("general.ls_h"),color:J.engine.color}]}]},[a,b,z,I,x,S,e]);return a?t.jsxs(ri,{$mobile:T,children:[c&&t.jsx("div",{onClick:g,style:{color:n.accent.red,fontSize:"0.78rem",fontFamily:"'Courier New', monospace",padding:"6px 10px",background:n.alpha(n.accent.red,.1),borderRadius:6,cursor:"pointer",textAlign:"center",border:`1px solid ${n.alpha(n.accent.red,.2)}`},children:e("hud.error_dismiss",{msg:c})}),t.jsxs($e,{children:[t.jsx(St,{style:{marginBottom:10},children:t.jsxs("div",{style:{flex:1},children:[t.jsx(oi,{children:a.name}),t.jsx(Ct,{children:K})]})}),t.jsxs(Ct,{style:{color:n.accent.blue,whiteSpace:"nowrap",marginBottom:10},children:[e("hud.location"),": (",_e(a.x),", ",_e(a.y),", ",_e(a.z),")"]}),t.jsxs(St,{children:[t.jsxs(de,{$color:n.accent.gold,children:[t.jsx(pe,{children:e("hud.ses")}),t.jsx(ue,{$color:n.accent.gold,children:Ue(D)})]}),t.jsxs(de,{$color:n.accent.green,children:[t.jsx(pe,{children:e("general.energy")}),t.jsx(ue,{$color:n.accent.green,children:R(a.energy)}),t.jsxs(Re,{children:[R(b,2),e("general.per_sec")]})]}),t.jsxs(de,{$color:n.accent.red,children:[t.jsx(pe,{children:e("general.health")}),t.jsx(ue,{$color:n.accent.red,children:R(a.health)})]}),t.jsxs(de,{$color:n.accent.shield,children:[t.jsx(pe,{children:e("hud.shield")}),t.jsx(ue,{$color:n.accent.shield,children:a.maxShieldHP>0?Math.round(a.shieldHP/a.maxShieldHP*100)+"%":"0%"})]}),t.jsxs(de,{$color:"#8844ff",children:[t.jsx(pe,{children:e("hud.attack_token_label")}),t.jsxs(ue,{$color:"#8844ff",children:[R(p.current,1),"/",p.max]}),t.jsxs(Re,{children:[R(p.ratePerSec,4),e("general.per_sec")]})]}),P>0&&t.jsxs(de,{$color:n.accent.gold,children:[t.jsx(pe,{children:e("hud.combat_boost")}),t.jsxs(ue,{$color:n.accent.gold,children:["+",P,"%"]}),t.jsx(Re,{children:e("hud.totem_bonus")})]}),l>0&&t.jsxs(de,{$color:n.accent.gold,children:[t.jsx(pe,{children:e("hud.pending_label")}),t.jsx(ue,{$color:n.accent.gold,children:R(l)}),t.jsx(Re,{children:e("hud.pending_type")})]})]})]}),B&&t.jsx($e,{children:t.jsxs("div",{style:{textAlign:"center",padding:"16px 8px"},children:[t.jsx(Et,{style:{color:n.accent.red,marginBottom:8},children:e("hud.destroyed_title")}),t.jsx("div",{style:{color:n.text.secondary,fontSize:"0.78rem",marginBottom:12,fontFamily:"'Courier New', monospace"},children:e("hud.destroyed_desc")}),t.jsx(X,{variant:"danger",disabled:u,onClick:()=>!u&&k(),children:e("hud.destroyed_btn")}),t.jsx("div",{style:{color:n.text.secondary,fontSize:"0.68rem",marginTop:8,fontFamily:"'Courier New', monospace"},children:e("hud.rebuild_cost")})]})}),!B&&v.max>0&&v.current<v.max*.3&&t.jsx($e,{style:{borderColor:n.alpha(n.accent.gold,.3)},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8},children:[t.jsx("span",{style:{color:n.accent.gold,fontSize:"0.78rem",fontFamily:"'Courier New', monospace"},children:e("hud.durability_warn",{pct:Math.round(v.current/v.max*100)})}),t.jsx(X,{variant:"ghost",icon:"/assets/systems/collector.web.png",disabled:u,onClick:()=>!u&&$(v.max),children:e("hud.durability_repair")})]})}),t.jsxs($e,{children:[t.jsx(Et,{children:e("hud.tech_systems")}),t.jsx(si,{children:W.map(_=>t.jsx(ni,{icon:_.icon,title:_.title,level:_.lv,bars:_.bars,warn:!1},_.key))})]})]}):null}const li=ge`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,ci=ge`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`,di=r.div`
  display: inline-block;
  width: ${({$size:e})=>e}px;
  height: ${({$size:e})=>e}px;
  border: ${({$size:e})=>Math.max(2,Math.floor(e/8))}px solid rgba(255, 255, 255, 0.08);
  border-top-color: ${({$color:e})=>e};
  border-radius: 50%;
  animation: ${li} 0.8s linear infinite;
`,We=r.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({$color:e})=>e};
  margin: 0 2px;
  animation: ${ci} 1.2s ease-in-out infinite;
  animation-delay: ${({$delay:e})=>e}s;
`,pi=r.span`
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
`;function ui({size:e=24,color:a=n.accent.green}){return t.jsx(di,{$size:e,$color:a})}function yi({color:e=n.accent.green}){return t.jsxs(pi,{children:[t.jsx(We,{$delay:0,$color:e}),t.jsx(We,{$delay:.2,$color:e}),t.jsx(We,{$delay:.4,$color:e})]})}const mi=r.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: ${({$transparent:e})=>e?"rgba(0,0,0,0.5)":"rgba(0,0,0,0.75)"};
  border-radius: inherit;
  backdrop-filter: blur(2px);
  z-index: 50;
  pointer-events: auto;
`,gi=r.div`
  color: ${n.accent.green};
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  letter-spacing: 1px;
`;function ct({message:e="处理中",transparent:a,color:s}){return t.jsxs(mi,{$transparent:a,children:[t.jsx(ui,{color:s}),t.jsxs(gi,{style:{color:s||"#00ff88"},children:[e,t.jsx(yi,{color:s})]})]})}const fi=r.div`
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(0, 0, 0, 0.6);
  display: ${({$open:e})=>e?"flex":"none"};
  align-items: center;
  justify-content: center;
  padding: 24px;
`,bi=r.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 380px;
  backdrop-filter: blur(12px);
`,xi=r.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${n.border};
`,hi=r.div`
  color: ${n.text.primary};
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 1px;
`,vi=r.div`
  color: ${n.text.secondary};
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
  margin-bottom: 16px;
`,Ti=r.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`,_i=r.div`
  color: ${n.alpha(n.text.secondary,.6)};
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  margin-top: 8px;
  text-align: right;
`;function dt({open:e,title:a,icon:s,children:o,gasEstimate:l,loading:p,onConfirm:u,onCancel:c,confirmLabel:T="确认",cancelLabel:g="取消",confirmVariant:k="primary"}){return t.jsx(fi,{$open:e,onClick:c,children:t.jsxs(bi,{onClick:$=>$.stopPropagation(),children:[t.jsx(xi,{children:t.jsxs(hi,{children:[s&&t.jsx(N,{icon:s})," ",a]})}),t.jsx(vi,{children:o}),l&&t.jsxs(_i,{children:["⛽ Gas: ~",l]}),t.jsxs(Ti,{children:[t.jsx(X,{variant:"ghost",onClick:c,disabled:p,children:g}),t.jsx(X,{variant:k,onClick:u,loading:p,children:T})]})]})})}const wi=r.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: ${({$mobile:e})=>e?"10px":"14px 16px"};
  position: relative;
`,Si=r.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`,Ei=r.div`
  position: absolute; inset: 0; z-index: 1; border-radius: 8px; overflow: hidden;
`,Ci=r.div`
  display: flex; gap: 6px; margin-bottom: 12px;
`,Le=r.div`
  flex: 1;
  background: ${({$color:e})=>n.alpha(e,.06)};
  border: 1px solid ${({$color:e})=>n.alpha(e,.15)};
  border-radius: 6px;
  padding: 6px 10px;
  text-align: center;
`,Ie=r.div`
  color: ${n.text.secondary}; font-size: 0.65rem;
  font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;
`,Pe=r.div`
  color: ${({$color:e})=>e}; font-size: 0.88rem;
  font-family: 'Courier New', monospace; font-weight: bold; margin-top: 2px;
`,Be=r.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
`,ne=r.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 6px;
  min-height: 72px;
  background: ${({$color:e})=>n.alpha(e,.04)};
  border: 1px solid ${({$color:e})=>n.alpha(e,.12)};
  border-radius: 6px;
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  opacity: ${({$disabled:e})=>e?.3:1};
  transition: all 0.15s;
  -webkit-tap-highlight-color: transparent;
  font-family: 'Courier New', monospace;
  &:hover:not(:disabled) {
    background: ${({$color:e})=>n.alpha(e,.1)};
    border-color: ${({$color:e})=>n.alpha(e,.3)};
  }
  &:active { opacity: 0.7; }
  @media (max-width: 767px) {
    min-height: 80px;
    padding: 12px 6px;
  }
`,ae=r.span`
  font-size: 1.3rem;
  line-height: 1;
`,ie=r.span`
  color: ${({$color:e})=>e};
  font-size: 0.72rem;
  font-weight: bold;
  text-align: center;
  line-height: 1.2;
`,ye=r.span`
  color: ${({$color:e})=>e};
  font-size: 0.6rem;
  font-family: 'Courier New', monospace;
  background: ${({$color:e})=>n.alpha(e,.12)};
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
`,Je=r.input`
  width: 100%;
  padding: ${({$mobile:e})=>e?"12px 10px":"8px"};
  font-size: ${({$mobile:e})=>e?"0.85rem":"0.8rem"};
  font-family: 'Courier New', monospace;
  background: ${n.bg};
  border: 1px solid ${n.border};
  border-radius: 6px;
  color: ${n.text.primary};
  outline: none;
  min-height: ${({$mobile:e})=>e?"40px":"36px"};
  &:focus { border-color: ${n.accent.green}; }
`,kt=r.div`
  display: flex; gap: 6px; margin-top: 6px;
`,De=r.div`
  color: ${n.text.secondary};
  font-size: 0.65rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 10px 0 4px 0;
  opacity: 0.6;
`,Mt=r.div`
  height: 1px;
  background: ${n.alpha(n.border,.3)};
  margin: 8px 0;
`,ki=r.div`
  color: ${n.accent.red};
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  padding: 6px 10px;
  background: ${n.alpha(n.accent.red,.08)};
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 8px;
  text-align: center;
  border: 1px solid ${n.alpha(n.accent.red,.15)};
`;function en(){const[e,a]=h.useState(!1),[s,o]=h.useState(!1),[l,p]=h.useState(""),[u,c]=h.useState(""),[T,g]=h.useState(""),k=i(A=>A.pendingEnergy),$=i(A=>{var le;return((le=A.playerCiv)==null?void 0:le.isMoving)??!1}),b=i(A=>A.loading),z=i(A=>A.error),B=i(A=>A.sesBalance),v=i(A=>A.playerCiv),P=i(A=>A.collectRate),F=i(A=>A.currentEpoch),x=i(A=>A.epochClaimed),S=i(A=>A.epochEndTime),C=i(A=>A.lastDistributedEpoch),O=i(A=>A.dailyEmission),L=we(),{t:d}=te(),{collectEnergy:I,claimCombatEnergy:K,claimDailySES:D,distribute:W,startMove:_,spaceJump:H,repairShield:j,regenShield:q,repairAll:m,cancelMove:f,clearError:w}=oe(),y=()=>{const A=parseInt(l),le=parseInt(u),fe=parseInt(T);isNaN(A)||isNaN(le)||isNaN(fe)||(_(A,le,fe),a(!1),p(""),c(""),g(""))};v&&v.shieldHP>0;const M=v?v.shieldHP>=(v.maxShieldHP||0)&&v.maxShieldHP>0:!1,Y=i(A=>A.pendingCollect),U=C>=F,Z=S>0?Math.max(0,Math.floor((S*1e3-Date.now())/1e3)):0,ee=Z>0?d("action.epoch_remaining",{min:Math.floor(Z/60),sec:Z%60}):d("action.calculating");return t.jsxs(wi,{$mobile:L,children:[b&&t.jsx(Ei,{children:t.jsx(ct,{message:d("general.loading"),color:n.accent.green,transparent:!0})}),t.jsxs(Si,{children:[t.jsx(N,{icon:"/assets/systems/energy.web.png"})," ",d("action.title")]}),v&&t.jsxs(Ci,{children:[t.jsxs(Le,{$color:n.accent.gold,children:[t.jsx(Ie,{children:d("action.ses_balance")}),t.jsx(Pe,{$color:n.accent.gold,children:Ue(B)})]}),t.jsxs(Le,{$color:n.accent.green,children:[t.jsx(Ie,{children:d("action.collect_rate")}),t.jsxs(Pe,{$color:n.accent.green,children:[R(P,2),d("general.per_sec")]})]}),t.jsxs(Le,{$color:"#8844ff",children:[t.jsx(Ie,{children:d("action.daily_est")}),t.jsxs(Pe,{$color:"#8844ff",children:[O>0?R(O,0):"…"," SES"]})]}),t.jsxs(Le,{$color:n.accent.blue,children:[t.jsxs(Ie,{children:[d("general.epoch")," #",F]}),t.jsx(Pe,{$color:n.accent.blue,children:ee})]})]}),z&&t.jsx(ki,{onClick:w,children:d("hud.error_dismiss",{msg:z})}),t.jsxs(De,{children:[t.jsx(N,{icon:"/assets/systems/energy.web.png"})," ",d("action.group_collect")]}),t.jsx(Be,{children:t.jsxs(ne,{$color:n.accent.green,$disabled:b,onClick:()=>!b&&I(),children:[t.jsx(ae,{children:t.jsx(N,{icon:"/assets/systems/energy.web.png"})}),t.jsx(ie,{$color:n.accent.green,children:d("action.collect")}),Y>0&&t.jsxs(ye,{$color:n.accent.green,children:["~",R(Y)]})]})}),t.jsxs(De,{children:[t.jsx(N,{icon:"/assets/systems/crate.web.png"})," ",d("action.group_claim")]}),t.jsxs(Be,{children:[t.jsxs(ne,{$color:k>0?n.accent.gold:n.text.secondary,$disabled:b||k<=0,onClick:()=>!b&&k>0&&K(),children:[t.jsx(ae,{children:t.jsx(N,{icon:"/assets/systems/crate.web.png"})}),t.jsx(ie,{$color:k>0?n.accent.gold:n.text.secondary,children:d("action.combat_energy")}),k>0&&t.jsx(ye,{$color:n.accent.gold,children:R(k)}),k<=0&&t.jsx(ye,{$color:n.text.secondary,children:d("action.combat_energy_empty")})]}),!U&&t.jsxs(ne,{$color:n.accent.gold,$disabled:b,onClick:()=>!b&&W(),children:[t.jsx(ae,{children:t.jsx(N,{icon:"/assets/systems/distribute.web.png"})}),t.jsx(ie,{$color:n.accent.gold,children:d("action.distribute")}),t.jsx(ye,{$color:n.accent.gold,children:d("action.distributing")})]}),U&&t.jsxs(ne,{$color:x?n.text.secondary:"#8844ff",$disabled:b||x,onClick:()=>!b&&!x&&D(),children:[t.jsx(ae,{children:t.jsx(N,{icon:"/assets/systems/claim.web.png"})}),t.jsx(ie,{$color:x?n.text.secondary:"#8844ff",children:d(x?"action.claimed_today":"action.claim_ses")}),t.jsx(ye,{$color:x?n.text.secondary:n.accent.green,children:x?"✓":ee})]})]}),t.jsx(Mt,{}),t.jsxs(De,{children:[t.jsx(N,{icon:"/assets/systems/engine.web.png"})," ",d("action.group_move")]}),t.jsxs(Be,{children:[e?t.jsxs("div",{style:{gridColumn:"1 / -1"},children:[v&&t.jsxs("div",{style:{color:n.accent.blue,fontSize:"0.68rem",fontFamily:"'Courier New', monospace",marginBottom:6,opacity:.8,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:[d("hud.location"),": (",_e(v.x),", ",_e(v.y),", ",_e(v.z),")"]}),t.jsxs(kt,{children:[t.jsx(Je,{$mobile:L,placeholder:"X",value:l,onChange:A=>p(A.target.value),disabled:b}),t.jsx(Je,{$mobile:L,placeholder:"Y",value:u,onChange:A=>c(A.target.value),disabled:b}),t.jsx(Je,{$mobile:L,placeholder:"Z",value:T,onChange:A=>g(A.target.value),disabled:b})]}),t.jsxs(kt,{children:[t.jsx(X,{variant:"primary",disabled:b,onClick:y,style:{flex:1},children:d("action.move_confirm")}),t.jsx(X,{variant:"ghost",onClick:()=>a(!1),children:d("action.move_cancel")})]})]}):t.jsxs(ne,{$color:n.accent.blue,$disabled:b,onClick:()=>!b&&a(!0),children:[t.jsx(ae,{children:t.jsx(N,{icon:"/assets/systems/engine.web.png"})}),t.jsx(ie,{$color:n.accent.blue,children:d("action.move")})]}),t.jsxs(ne,{$color:"#ff66aa",$disabled:b,onClick:()=>!b&&o(!0),children:[t.jsx(ae,{children:t.jsx(N,{icon:"/assets/systems/jump.web.png"})}),t.jsx(ie,{$color:"#ff66aa",children:d("action.jump")})]}),t.jsxs(ne,{$color:n.accent.red,$disabled:b||e||!$,onClick:()=>!b&&!e&&$&&f(),children:[t.jsx(ae,{children:t.jsx(N,{icon:"/assets/systems/cancel.web.png"})}),t.jsx(ie,{$color:$?n.accent.red:n.text.secondary,children:d("action.cancel_move")}),$&&t.jsx(ye,{$color:n.accent.red,children:d("action.moving")})]})]}),t.jsx(Mt,{}),t.jsxs(De,{children:[t.jsx(N,{icon:"/assets/systems/collector.web.png"})," ",d("action.group_repair")]}),t.jsxs(Be,{children:[t.jsxs(ne,{$color:n.accent.blue,$disabled:b||M,onClick:()=>!b&&!M&&j(),children:[t.jsx(ae,{children:t.jsx(N,{icon:"/assets/systems/shield.web.png"})}),t.jsx(ie,{$color:M?n.text.secondary:n.accent.blue,children:d("action.repair_shield")}),t.jsx(ye,{$color:M?n.text.secondary:n.accent.blue,children:M?d("action.shield_full"):`HP ${(v==null?void 0:v.shieldHP)??0}/${(v==null?void 0:v.maxShieldHP)??0}`})]}),t.jsxs(ne,{$color:n.accent.green,$disabled:b,onClick:()=>!b&&q(),children:[t.jsx(ae,{children:t.jsx(N,{icon:"/assets/systems/regen.web.png"})}),t.jsx(ie,{$color:n.accent.green,children:d("action.regen_shield")})]}),t.jsxs(ne,{$color:"#ff8844",$disabled:b,onClick:()=>!b&&m(),children:[t.jsx(ae,{children:t.jsx(N,{icon:"/assets/systems/collector.web.png"})}),t.jsx(ie,{$color:"#ff8844",children:d("action.repair_all")})]})]}),t.jsx(dt,{open:s,title:d("action.jump"),icon:"/assets/systems/jump.web.png",onConfirm:()=>{H(),o(!1)},onCancel:()=>o(!1),confirmVariant:"primary",confirmLabel:d("action.jump_confirm"),loading:b,children:d("action.jump_warn")})]})}const Mi=r.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: ${({$mobile:e})=>e?"10px":"14px 16px"};
  max-height: ${({$mobile:e})=>e?"none":"300px"};
  overflow-y: auto;
`,ji=r.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
`,jt=r.div`
  padding: 6px 4px;
  border-bottom: 1px solid ${n.alpha(n.border,.3)};
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  &:last-child { border-bottom: none; }
`,Ai=r.span` color: ${n.accent.red}; `,Ni=r.span` color: ${n.accent.shield}; `,$i=r.span` color: ${n.accent.gold}; `,Ri=r.span` color: ${n.accent.green}; `,Li=r.span` color: ${n.text.secondary}; `,Ii=r.span` color: ${n.text.secondary}; font-size: 0.68rem; `;function tn(){const{t:e}=te(),a=i(o=>o.battleLog),s=h.useMemo(()=>a,[a]);return t.jsxs(Mi,{$mobile:!1,children:[t.jsxs(ji,{children:[t.jsx(N,{icon:"/assets/systems/weapon.web.png"})," ",e("battle.title")]}),s.length===0?t.jsx(jt,{style:{color:n.text.secondary,textAlign:"center"},children:e("battle.empty")}):s.slice(0,50).map((o,l)=>t.jsxs(jt,{children:[t.jsxs(Ai,{children:[o.attacker.slice(0,6),"..."]})," → ",t.jsxs(Ni,{children:[o.defender.slice(0,6),"..."]})," | ",t.jsx($i,{children:o.damageDealt})," dmg ",o.won?t.jsx(Ri,{children:"✓"}):t.jsx(Li,{children:"✗"})," ",t.jsx(Ii,{children:new Date(o.timestamp*1e3).toLocaleTimeString()})]},l))]})}const Pi=r.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: ${({$mobile:e})=>e?"10px":"14px 16px"};
  position: relative;
`,Bi=r.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`,Di=r.div`
  display: flex; gap: 4px; margin-bottom: 10px; flex-wrap: wrap;
`,At=r.button`
  background: ${({$active:e})=>e?n.alpha(n.accent.gold,.1):"transparent"};
  border: 1px solid ${({$active:e})=>e?n.accent.gold:n.border};
  border-radius: 4px; padding: 5px 12px; cursor: pointer;
  color: ${({$active:e})=>e?n.accent.gold:n.text.secondary};
  font-family: 'Courier New', monospace; font-size: 0.72rem;
`,Nt=r.input`
  width: 100%; padding: 8px; font-size: 0.8rem; font-family: 'Courier New', monospace;
  background: ${n.bg}; border: 1px solid ${n.border};
  border-radius: 6px; color: ${n.text.primary}; outline: none;
  &:focus { border-color: ${n.accent.gold}; }
`,$t=r.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px; margin-bottom: 4px;
  border: 1px solid ${n.alpha(n.accent.gold,.12)};
  border-radius: 6px; gap: 8px;
  background: ${n.alpha(n.card,.4)};
`,Rt=r.span`
  color: ${n.text.primary}; font-size: 0.82rem; font-family: 'Courier New', monospace; font-weight: bold;
`,Lt=r.span`
  color: ${n.text.secondary}; font-size: 0.7rem; font-family: 'Courier New', monospace;
`,me=r.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 4px 0; font-size: 0.78rem; font-family: 'Courier New', monospace; color: ${n.text.secondary};
`,Oi=r.div`
  position: absolute; inset: 0; z-index: 1; border-radius: 8px; overflow: hidden;
`,zi=r.span`
  flex-shrink: 0;
  font-size: 0.62rem;
  padding: 1px 5px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  ${({$leader:e})=>e?`color: ${n.accent.gold}; border: 1px solid ${n.alpha(n.accent.gold,.5)}; background: ${n.alpha(n.accent.gold,.1)};`:`color: ${n.text.secondary}; border: 1px solid ${n.border};`}
`,It=r.button`
  padding: 2px 8px;
  font-size: 0.65rem;
  font-family: 'Courier New', monospace;
  border-radius: 4px;
  cursor: pointer;
  background: ${({$danger:e})=>e?n.alpha(n.accent.red,.12):"transparent"};
  border: 1px solid ${({$danger:e})=>e?n.alpha(n.accent.red,.5):n.border};
  color: ${({$danger:e})=>e?n.accent.red:n.text.secondary};
  &:hover:not(:disabled) { opacity: 0.8; }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
`,Fi=r.div`
  max-height: 200px; overflow-y: auto; border: 1px solid ${n.alpha(n.border,.4)}; border-radius: 6px; padding: 4px;
`;function nn(){const{t:e}=te(),a=re(),s=we(),o=i(y=>y.address),l=i(y=>y.currentAlliance),p=i(y=>y.loading),u=i(y=>y._allianceMembers),c=i(y=>y._allianceTotemLevel),T=i(y=>y._allianceTotemEnergy),g=i(y=>y._allianceTotemUpgradeCost),k=i(y=>y._allianceIsLeader),$=i(y=>y._allianceLeader),b=i(y=>y._alliancePendingRefund),{createAlliance:z,joinAlliance:B,leaveAlliance:v,kickMember:P,transferLeadership:F,disbandAlliance:x,claimRefund:S,donateToTotem:C,upgradeTotem:O}=oe(),[L,d]=h.useState("mine"),[I,K]=h.useState(""),[D,W]=h.useState(""),[_,H]=h.useState([]),j=h.useCallback(async()=>{if(a.alliance)try{const y=await a.alliance.getAllianceList(),M=[];for(const Y of y.slice(0,20))try{const U=await a.alliance.alliances(Y);M.push({id:Y,name:String(U.name??U[0]??"?"),leader:String(U.leader??U[1]??""),level:Number(U.level??U[2]??1),memberCount:Number(U.memberCount??U[3]??0)})}catch{}H(M)}catch{}},[a]);h.useEffect(()=>{L==="list"&&j()},[L,j]);const q=async()=>{I.trim()&&(await z(I.trim()),K(""),d("mine"))},m=async y=>{await B(y),d("mine")},f=async y=>{await v(y),d("list")},w=async y=>{await x(y),d("list")};return t.jsxs(Pi,{$mobile:s,children:[p&&t.jsx(Oi,{children:t.jsx(ct,{message:e("general.loading"),color:n.accent.gold,transparent:!0})}),t.jsxs(Bi,{children:[t.jsx(N,{icon:"/assets/systems/totem.web.png"})," ",e("alliance.title")]}),t.jsxs(Di,{children:[t.jsx(At,{$active:L==="mine",onClick:()=>d("mine"),children:e("alliance.mine")}),t.jsx(At,{$active:L==="list",onClick:()=>d("list"),children:e("alliance.available")})]}),L==="mine"&&t.jsx(t.Fragment,{children:l?t.jsxs(t.Fragment,{children:[t.jsxs($t,{children:[t.jsx(Rt,{children:l.name}),t.jsxs(Lt,{children:["Lv.",l.level," · ",l.memberCount,e("alliance.people")]})]}),t.jsx("div",{style:{marginBottom:6},children:u.map((y,M)=>{const Y=y===o,U=y.toLowerCase()===$.toLowerCase();return t.jsxs(me,{children:[t.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4,minWidth:0},children:[U&&t.jsx(zi,{$leader:!0,children:e("alliance.leader")}),t.jsxs("span",{style:{color:Y?n.accent.green:n.text.secondary,overflow:"hidden",textOverflow:"ellipsis"},children:[y.slice(0,6),"...",y.slice(-4)]}),Y&&t.jsx("span",{style:{color:n.accent.green},children:e("alliance.you")})]}),k&&!Y&&!U&&t.jsxs("span",{style:{display:"flex",gap:4,flexShrink:0},children:[t.jsx(It,{onClick:()=>{window.confirm(e("alliance.transfer_confirm"))&&F(l.id,y)},disabled:p,children:e("alliance.transfer")}),t.jsx(It,{$danger:!0,onClick:()=>P(l.id,y),disabled:p,children:e("alliance.kick")})]})]},M)})}),t.jsxs(me,{children:[t.jsxs("span",{children:[t.jsx(N,{icon:"/assets/systems/totem.web.png"})," ",e("alliance.totem")," Lv.",c]}),t.jsxs("span",{children:[e("alliance.totem_pool"),": ",R(T)," ",t.jsx(N,{icon:"/assets/systems/energy.web.png"})]})]}),l&&l.memberCount>1&&t.jsxs(me,{style:{flexDirection:"column",alignItems:"flex-start",gap:2},children:[t.jsx("span",{style:{color:n.text.secondary,fontSize:"0.7rem"},children:e("alliance.totem_bonus_desc")}),t.jsx("span",{style:{color:n.accent.green,fontSize:"0.8rem"},children:e("alliance.totem_bonus_value",{val:R(Math.floor((l.memberCount-1)*8*(1e4+c*50)/1e4))})}),k&&t.jsx("span",{style:{color:n.accent.gold,fontSize:"0.75rem"},children:e("alliance.totem_next_bonus",{val:R(Math.floor((l.memberCount-1)*8*(1e4+(c+1)*50)/1e4))})})]}),k&&t.jsxs(me,{children:[t.jsxs("span",{children:[t.jsx(N,{icon:"/assets/systems/arrow.web.png"})," ",e("alliance.upgrade_totem")]}),t.jsxs("span",{style:{color:n.accent.green},children:[R(g)," ",t.jsx(N,{icon:"/assets/systems/energy.web.png"})]})]}),k&&t.jsx(me,{children:t.jsx("span",{style:{color:n.accent.gold},children:e("alliance.leader")})}),t.jsxs(me,{style:{marginTop:6,gap:6},children:[t.jsx(Nt,{placeholder:e("alliance.donate"),value:D,onChange:y=>W(y.target.value),style:{flex:1}}),t.jsx(X,{variant:"primary",onClick:()=>{const y=Number(D);y>0&&(C(l.id,y),W(""))},disabled:p||!(Number(D)>0),children:e("alliance.donate")})]}),k&&t.jsxs(t.Fragment,{children:[t.jsx(X,{variant:"ghost",onClick:()=>O(l.id),disabled:p||T<g,title:T<g?e("alliance.totem_need_more"):void 0,style:{marginTop:6,width:"100%"},children:e("alliance.upgrade_totem")}),T<g&&t.jsxs("div",{style:{color:n.accent.red,fontSize:"0.68rem",marginTop:4,fontFamily:"'Courier New', monospace"},children:[e("alliance.totem_need_more"),"（",R(T)," / ",R(g),"）"]}),t.jsx(X,{variant:"danger",onClick:()=>l&&w(l.id),disabled:p,style:{marginTop:4,width:"100%"},children:e("alliance.disband")})]}),!k&&l.memberCount>1&&t.jsx(X,{variant:"ghost",onClick:()=>l&&f(l.id),disabled:p,style:{marginTop:6,width:"100%"},children:e("alliance.leave")}),b>0&&t.jsxs(X,{variant:"ghost",onClick:()=>S(),disabled:p,style:{marginTop:4,width:"100%"},children:[e("alliance.refund")," (",R(b)," SES)"]})]}):t.jsxs("div",{style:{textAlign:"center",padding:12,color:n.text.secondary},children:[t.jsx(Nt,{placeholder:e("alliance.name"),value:I,onChange:y=>K(y.target.value),style:{marginBottom:8},onKeyDown:y=>y.key==="Enter"&&q()}),t.jsx(X,{variant:"primary",onClick:q,disabled:p||!I.trim(),style:{width:"100%"},children:e("alliance.create")})]})}),L==="list"&&t.jsx(Fi,{children:_.length===0?t.jsx(me,{style:{textAlign:"center",opacity:.6},children:e("alliance.no_alliance")}):_.map(y=>t.jsxs($t,{children:[t.jsxs("div",{children:[t.jsx(Rt,{children:y.name}),t.jsxs(Lt,{children:["Lv.",y.level," · ",y.memberCount,e("alliance.people")]})]}),t.jsx(X,{variant:"ghost",onClick:()=>m(y.id),disabled:p,children:e("alliance.join")})]},y.id))})]})}const Hi=r.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: 14px 16px;
`,Ui=r.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`,Yi=r.input`
  width: 100%;
  padding: 8px 10px;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  background: ${n.bg};
  border: 1px solid ${n.border};
  border-radius: 6px;
  color: ${n.text.primary};
  outline: none;
  &:focus { border-color: ${n.accent.red}; }
`,xe=r.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 0; border-bottom: 1px solid ${n.alpha(n.border,.4)};
  gap: 8px;
  &:last-child { border-bottom: none; }
`,he=r.span`
  color: ${n.text.primary}; font-size: 0.8rem; font-family: 'Courier New', monospace;
`,ve=r.span`
  color: ${n.text.secondary}; font-size: 0.72rem; font-family: 'Courier New', monospace;
`,Gi=r.div`
  display: flex; gap: 6px; margin-bottom: 8px;
`,Ki=r.div`
  margin-top: 4px;
  color: ${n.accent.red};
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  text-align: center;
  opacity: 0.85;
`,Vi=r.div`
  color: ${n.accent.red};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-align: center;
  padding: 4px 8px;
  margin-top: 6px;
  background: ${n.alpha(n.accent.red,.08)};
  border-radius: 4px;
  border: 1px solid ${n.alpha(n.accent.red,.15)};
`,Wi=3e3;function an(){const{t:e}=te();we();const a=i(j=>j.playerCiv),s=i(j=>j.address),o=i(j=>j.enemyCivs),l=i(j=>j.selectedTarget),p=i(j=>j.lastAttackTime),u=i(j=>j.attackTokens),c=i(j=>j.loading),T=re(),g=i(j=>j.addEnemyCiv),k=i(j=>j.setSelectedTarget),{attackTarget:$}=oe(),b=h.useRef(null),[z,B]=h.useState(""),[v,P]=h.useState(!1),[F,x]=h.useState(null),[S,C]=h.useState(!1),O=Date.now(),L=i(j=>j.attackEnergyCost),d=Math.max(0,Math.ceil((Wi-(O-p))/1e3)),I=l?S?d>0?"combat.attack_in_cd":a&&a.energy<L?"combat.attack_no_energy":u.current<=0?"combat.attack_no_token":null:"combat.attack_out_range":"combat.attack_btn_idle",K=!I&&!c,D=l?o.get(l):void 0,W=(D==null?void 0:D.name)??(l?l.slice(0,6)+"...":""),_=h.useCallback(async()=>{var q,m;const j=(m=(q=b.current)==null?void 0:q.value)==null?void 0:m.trim();if(j){i.setState({loading:!0}),x(null),C(!1);try{if(!T.game)throw new Error("Contract not available");const[f,w,y]=await Promise.all([T.game.getCivilization(j),s?T.game.getDistance(s,j).catch(()=>null):null,s?T.game.isInRange(s,j).catch(()=>!1):!1]);if(f){const M=ot(f);g(j,M)}w!==null&&x(Number(w)),C(!!y),k(j)}catch{k(j)}finally{i.setState({loading:!1})}}},[T,s,g,k]),H=()=>{$(),P(!1)};return t.jsxs(Hi,{children:[t.jsxs(Ui,{children:[t.jsx(N,{icon:"/assets/systems/weapon.web.png"})," ",e("combat.title")]}),t.jsxs(Gi,{children:[t.jsx(Yi,{ref:b,placeholder:e("combat.search_placeholder"),value:z,onChange:j=>B(j.target.value),onKeyDown:j=>j.key==="Enter"&&_()}),t.jsx(X,{variant:"primary",onClick:_,disabled:c||!z.trim(),children:e("combat.search_btn")})]}),l&&D&&t.jsxs("div",{style:{marginBottom:8},children:[t.jsxs(xe,{children:[t.jsx(he,{children:D.name}),t.jsxs(ve,{children:[l.slice(0,6),"...",l.slice(-4)]})]}),t.jsxs(xe,{children:[t.jsx(he,{children:e("combat.energy")}),t.jsx(ve,{children:R(D.energy||0)})]}),t.jsxs(xe,{children:[t.jsx(he,{children:e("combat.health")}),t.jsx(ve,{children:R(D.health||0)})]}),t.jsxs(xe,{children:[t.jsx(he,{children:e("combat.weapon_lv")}),t.jsx(ve,{children:D.weaponLv})]}),t.jsxs(xe,{children:[t.jsx(he,{children:e("combat.shield_lv")}),t.jsx(ve,{children:D.shieldLv})]}),F!==null&&t.jsxs(xe,{children:[t.jsx(he,{children:e("combat.distance")}),t.jsxs(ve,{children:[R(F)," ls"]})]})]}),l&&D&&!S&&F!==null&&t.jsx(Vi,{children:e("combat.out_of_range_warn",{range:R((a==null?void 0:a.scanRange)||0)})}),t.jsxs(X,{variant:"danger",disabled:!K,onClick:()=>P(!0),icon:"/assets/systems/weapon.web.png",style:{width:"100%",marginTop:l?8:0},title:I?e(I):void 0,children:[l?e("combat.attack_btn",{name:W}):e("combat.attack_btn_idle"),l&&d>0&&e("combat.attack_cooldown",{sec:d}),l&&d<=0&&S&&e("combat.attack_cost",{cost:L})]}),I&&l&&S&&t.jsx(Ki,{children:e(I)}),t.jsxs(dt,{open:v,title:e("combat.attack_btn",{name:W}),icon:"/assets/systems/weapon.web.png",onConfirm:H,onCancel:()=>P(!1),confirmVariant:"danger",confirmLabel:e("combat.confirm_attack"),loading:c,children:[e("combat.confirm_cost",{cost:L}),t.jsx("br",{}),e("combat.confirm_target",{name:W}),t.jsx("br",{}),F!==null&&t.jsxs(t.Fragment,{children:[e("combat.confirm_distance",{dist:R(F)}),t.jsx("br",{})]}),d>0&&t.jsxs(t.Fragment,{children:[e("combat.confirm_cooldown",{sec:d}),t.jsx("br",{})]})]})]})}const Ji=r.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: 14px 16px;
  position: relative;
`,Xi=r.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`,qi=r.div`
  position: absolute; inset: 0; z-index: 1; border-radius: 8px; overflow: hidden;
`,Zi=r.div`
  background: ${({$highlight:e,$color:a})=>e?n.alpha(a,.06):n.alpha(a,.02)};
  border: 1px solid ${({$highlight:e,$color:a})=>e?a:n.alpha(a,.12)};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: border-color 0.2s, background 0.2s;
  opacity: ${({$affordable:e})=>e?1:.55};
  &:hover {
    border-color: ${({$color:e})=>n.alpha(e,.4)};
    background: ${({$color:e})=>n.alpha(e,.08)};
  }
`,Qi=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 6px;
`,er=r.span`
  color: ${n.text.primary};
  font-size: 0.82rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`,tr=r.span`
  color: ${({$color:e})=>e};
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  background: ${({$color:e})=>n.alpha(e,.12)};
  border-radius: 3px;
  padding: 1px 6px;
`,nr=r.span`
  color: ${({$color:e})=>e};
  font-size: 0.6rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${({$color:e})=>n.alpha(e,.15)};
  border-radius: 3px;
  padding: 2px 6px;
  border: 1px solid ${({$color:e})=>n.alpha(e,.3)};
`,ar=r.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,Xe=r.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`,qe=r.div`
  color: ${n.text.secondary};
  font-size: 0.6rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Ze=r.div`
  color: ${({$color:e,$next:a})=>a?e:n.text.primary};
  font-size: ${({$next:e})=>e?"0.9rem":"0.82rem"};
  font-family: 'Courier New', monospace;
  font-weight: bold;
`,ir=r.span`
  color: ${n.text.secondary};
  font-size: 0.9rem;
  opacity: 0.4;
`,rr=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`,sr=r.div`
  flex: 1;
  height: 6px;
  background: ${n.alpha(n.border,.3)};
  border-radius: 3px;
  overflow: hidden;
`,or=r.div`
  height: 100%;
  width: ${({$pct:e})=>Math.min(e,100)}%;
  background: ${({$color:e})=>e};
  border-radius: 3px;
  transition: width 0.3s;
`,lr=r.span`
  color: ${({$affordable:e})=>e?n.accent.green:n.accent.red};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
`,cr=r.span`
  color: ${n.accent.blue};
  font-size: 0.62rem;
  font-family: 'Courier New', monospace;
  background: ${n.alpha(n.accent.blue,.1)};
  border-radius: 3px;
  padding: 1px 5px;
  margin-left: 4px;
`,dr=r.span`
  color: ${n.text.secondary};
  font-size: 0.65rem;
  font-family: 'Courier New', monospace;
  opacity: 0.6;
`,pr=r.div`
  color: ${n.accent.red};
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  padding: 6px 10px;
  background: ${n.alpha(n.accent.red,.08)};
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 8px;
  text-align: center;
  border: 1px solid ${n.alpha(n.accent.red,.15)};
`,ur={energyCollector:"collector",weapon:"weapon",shield:"shield",radar:"radar",engine:"engine"};function rt(){var P,F;const{t:e}=te(),a=i(x=>x.playerCiv),s=i(x=>x.loading),o=i(x=>x.error),l=parseFloat(i(x=>x.sesBalance)),p=i(x=>x.address),u=re(),{upgradeSystem:c,clearError:T}=oe(),[g,k]=h.useState(null),{data:$,isFetching:b}=je({queryKey:["upgradeCosts",p,a==null?void 0:a.energyCollectorLv,a==null?void 0:a.weaponLv,a==null?void 0:a.shieldLv,a==null?void 0:a.radarLv,a==null?void 0:a.engineLv],queryFn:async()=>{if(!u.game||!p)return null;const x=["collector","weapon","shield","radar","engine"],S=await Promise.all(x.map(L=>u.game.getUpgradeCost(p,L))),C=await Promise.all(x.map(L=>u.game.getUpgradePreview(p,L))),O={};return x.forEach((L,d)=>{O[L]={ses:Number(S[d].ses)/1e18,energy:Number(S[d].energy),curValue:Number(C[d].current),nextValue:Number(C[d].next)}}),O},enabled:!!u.game&&!!p,staleTime:1e4,refetchInterval:15e3}),z=h.useMemo(()=>{if(!a||!$)return[];const x=["energyCollector","weapon","shield","radar","engine"],S=[a.energyCollectorLv,a.weaponLv,a.shieldLv,a.radarLv,a.engineLv];return x.map((C,O)=>{const L=S[O],d=J[C],I=ur[C],K=$[I];if(!K)return null;const D=C==="energyCollector"?1e6:1,W=K.curValue/D,_=K.nextValue/D,H=_-W,j=C==="energyCollector"?`+${V.DURABILITY_PER_LV}s 耐久`:void 0;return{key:C,lv:L,name:d.name,icon:d.icon,color:d.color,sysName:I,value:W,nextValue:_,gain:H,subGain:j}}).filter(C=>C!==null).filter(C=>!isNaN(C.gain)&&C.lv<999).sort((C,O)=>O.gain-C.gain)},[a,$]);if(!a||z.length===0)return null;const B=()=>{g&&c(g),k(null)},v=g?z.find(x=>x.key===g):null;return t.jsxs(Ji,{children:[t.jsxs(Xi,{children:[t.jsx(N,{icon:"/assets/systems/shield.web.png"})," ",e("nav.tech")]}),s&&t.jsx(qi,{children:t.jsx(ct,{message:e("upgrade.btn"),color:n.accent.green,transparent:!0})}),o&&t.jsx(pr,{onClick:T,children:e("hud.error_dismiss",{msg:o})}),!$&&!b&&u.game&&p&&t.jsx("div",{style:{color:n.text.secondary,fontSize:"0.75rem",textAlign:"center",padding:12},children:e("upgrade.unavailable")}),b&&t.jsx("div",{style:{color:n.text.secondary,fontSize:"0.75rem",textAlign:"center",padding:12},children:e("upgrade.loading")}),$&&z.map((x,S)=>{const C=$[x.sysName],O=C.ses,L=C.energy,d=l>=O,I=l>0?l/O*100:0;return t.jsxs(Zi,{$color:x.color,$highlight:S===0,$affordable:d,children:[t.jsxs(Qi,{children:[t.jsxs(er,{children:[t.jsx(N,{icon:x.icon})," ",x.name,t.jsxs(tr,{$color:x.color,children:["Lv.",x.lv]})]}),S===0&&t.jsx(nr,{$color:x.color,children:e("upgrade.recommend_badge")})]}),t.jsxs(ar,{children:[t.jsxs(Xe,{children:[t.jsx(qe,{children:e("upgrade.current")}),t.jsx(Ze,{$color:n.text.primary,children:R(x.value)})]}),t.jsx(ir,{children:"→"}),t.jsxs(Xe,{children:[t.jsx(qe,{children:e("upgrade.after")}),t.jsx(Ze,{$color:x.color,$next:!0,children:R(x.nextValue)})]}),t.jsxs(Xe,{children:[t.jsx(qe,{children:e("upgrade.gain")}),t.jsx(Ze,{$color:x.color,$next:!0,children:x.key==="energyCollector"&&x.gain===0?x.subGain??`+${R(x.gain)}`:`+${R(x.gain)}`})]})]}),t.jsxs(rr,{children:[t.jsx(sr,{children:t.jsx(or,{$color:d?n.accent.green:n.accent.red,$pct:I})}),t.jsxs(lr,{$affordable:d,children:[Ue(l)," / ",R(O,2)," SES",L>0&&t.jsxs(cr,{children:[t.jsx(N,{icon:"/assets/systems/energy.web.png"}),R(L)]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[b&&t.jsx(dr,{children:"⟳"}),t.jsx(X,{variant:"primary",disabled:s||!d,onClick:()=>k(x.key),title:d?void 0:e("upgrade.insufficient"),children:e("upgrade.btn")})]})]})]},x.key)}),t.jsx(dt,{open:!!g,title:`${e("hud.confirm_upgrade")} ${v?v.name:""}`,icon:"/assets/systems/arrow.web.png",onConfirm:B,onCancel:()=>k(null),confirmVariant:"primary",confirmLabel:e("hud.confirm_upgrade"),loading:s,children:v&&t.jsxs(t.Fragment,{children:[e("upgrade.btn")," ",v.name," Lv.",v.lv," → ",v.lv+1,t.jsx("br",{}),$?`${e("hud.cost")}: ${R(Number(((P=$[v.sysName])==null?void 0:P.ses)??0),2)} SES${Number(((F=$[v.sysName])==null?void 0:F.energy)??0)>0?` + ${R(Number($[v.sysName].energy))} 能量`:""}`:""]})})]})}const Qe=r.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: 14px 16px;
`,et=r.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`,Pt=r.div`
  display: flex; align-items: center; gap: 8px;
  padding: 6px 4px; border-bottom: 1px solid ${n.alpha(n.border,.3)};
  font-size: 0.78rem; font-family: 'Courier New', monospace;
  &:last-child { border-bottom: none; }
  &:hover { background: ${n.alpha(n.accent.green,.03)}; }
`,Bt=r.span`
  width: 24px; text-align: center; font-weight: bold; flex-shrink: 0;
  color: ${({$top:e})=>e?n.accent.gold:n.text.secondary};
  font-size: ${({$top:e})=>e?"0.85rem":"0.75rem"};
`,Dt=r.span`
  flex: 1; color: ${n.text.primary}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
`,Ot=r.span`
  color: ${n.accent.green}; font-weight: bold; text-align: right;
`,zt=r.span`
  color: ${n.text.secondary}; font-size: 0.68rem; text-align: right; min-width: 60px;
`;function st(){const{t:e}=te(),a=re(),s=i(c=>c.address),o=i(c=>c.playerCiv),{data:l,isFetching:p}=je({queryKey:["leaderboard"],queryFn:async()=>{if(!a.game)throw new Error("Contract not available");const[c]=await a.game.getPlayers(0,50);return!c||c.length===0?[]:(await a.game.getSimpleStatuses(c)).map(g=>({player:String(g.player??""),energy:Number(g.energy??0),health:Number(g.health??0),collectorLv:Number(g.collectorLv??g[3]??1),weaponLv:Number(g.weaponLv??g[4]??1),shieldLv:Number(g.shieldLv??g[5]??1),radarLv:Number(g.radarLv??g[6]??1),engineLv:Number(g.engineLv??g[7]??1),shieldHP:Number(g.shieldHP??0),shieldMax:Number(g.shieldMax??0),exists:!!(g.exists??g[10]??!1),isRuins:!!(g.isRuins??g[11]??!1)})).filter(g=>g.exists&&!g.isRuins)},enabled:!!a.game,refetchInterval:3e4}),u=h.useMemo(()=>{const c=l??[];return o&&s&&!c.some(T=>T.player.toLowerCase()===s.toLowerCase())&&c.push({player:s,energy:o.energy,health:o.health,collectorLv:o.energyCollectorLv,weaponLv:o.weaponLv,shieldLv:o.shieldLv,radarLv:o.radarLv,engineLv:o.engineLv,shieldHP:o.shieldHP,shieldMax:o.maxShieldHP,exists:!0,isRuins:!1}),c.sort((T,g)=>g.energy-T.energy),c.slice(0,20)},[l,o,s]);return!l&&p?t.jsxs(Qe,{children:[t.jsxs(et,{children:[t.jsx(N,{icon:"/assets/systems/trophy.web.png"})," ",e("nav.leaderboard")]}),t.jsx("div",{style:{color:n.text.secondary,textAlign:"center",padding:20,fontSize:"0.78rem"},children:e("leaderboard.loading")})]}):!l||l.length===0?t.jsxs(Qe,{children:[t.jsxs(et,{children:[t.jsx(N,{icon:"/assets/systems/trophy.web.png"})," ",e("nav.leaderboard")]}),t.jsx("div",{style:{color:n.text.secondary,textAlign:"center",padding:20,fontSize:"0.78rem"},children:e("leaderboard.empty")})]}):t.jsxs(Qe,{children:[t.jsxs(et,{children:[t.jsx(N,{icon:"/assets/systems/trophy.web.png"})," ",e("nav.leaderboard")]}),t.jsxs(Pt,{style:{color:n.text.secondary,fontSize:"0.68rem",borderBottom:`1px solid ${n.border}`},children:[t.jsx(Bt,{children:e("leaderboard.col_rank")}),t.jsx(Dt,{children:e("leaderboard.col_player")}),t.jsx(zt,{children:e("leaderboard.col_level")}),t.jsx(Ot,{children:e("leaderboard.col_energy")})]}),u.map((c,T)=>{const g=s&&c.player.toLowerCase()===s.toLowerCase(),k=Math.round((c.collectorLv+c.weaponLv+c.shieldLv+c.radarLv+c.engineLv)/5);return t.jsxs(Pt,{style:g?{background:n.alpha(n.accent.green,.05)}:void 0,children:[t.jsx(Bt,{$top:T<3,children:T===0?"🥇":T===1?"🥈":T===2?"🥉":T+1}),t.jsxs(Dt,{style:g?{color:n.accent.green}:void 0,children:[g?"⭐ ":"",c.player.slice(0,6),"...",c.player.slice(-4)]}),t.jsx(zt,{children:e("leaderboard.player_level",{lv:k})}),t.jsx(Ot,{children:R(c.energy)})]},c.player)})]})}const yr=r.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: 14px 16px;
`,mr=r.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`,Ft=r.input`
  width: 100%; padding: 8px; font-size: 0.78rem; font-family: 'Courier New', monospace;
  background: ${n.bg}; border: 1px solid ${n.border};
  border-radius: 6px; color: ${n.text.primary}; outline: none;
  &:focus { border-color: ${n.accent.green}; }
`,gr=r.div`
  display: flex; align-items: center; gap: 6px; margin-bottom: 4px;
`,fr=r.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 5px 0; border-bottom: 1px solid ${n.alpha(n.border,.3)};
  font-size: 0.75rem; font-family: 'Courier New', monospace;
  &:last-child { border-bottom: none; }
`,br=r.span` color: ${n.accent.red}; `,xr=r.span` color: ${n.accent.green}; `,Ht=r.div`
  display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px;
`,Ut=r.label`
  display: flex; align-items: center; gap: 6px;
  color: ${n.text.secondary}; font-size: 0.72rem;
  font-family: 'Courier New', monospace; font-weight: bold;
  letter-spacing: 0.5px;
`,Yt=r.span`
  margin-left: auto; color: ${n.alpha(n.text.secondary,.6)};
  font-size: 0.68rem; font-weight: normal;
`,hr=r.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 10px; margin-bottom: 8px;
  border: 1px dashed ${({$valid:e})=>e?n.alpha(n.accent.green,.5):n.border};
  border-radius: 6px;
  background: ${n.alpha(n.bg,.4)};
`,vr=r.span`
  display: flex; align-items: center; gap: 6px;
  color: ${n.text.secondary}; font-size: 0.75rem;
  font-family: 'Courier New', monospace;
`,Tr=r.span`
  color: ${n.accent.green}; font-size: 0.9rem; font-weight: bold;
  font-family: 'Courier New', monospace;
`,_r=r.div`
  color: ${n.accent.red}; font-size: 0.7rem;
  font-family: 'Courier New', monospace; margin: -4px 0 8px;
`;function rn(){const{t:e}=te(),a=i(S=>S.sesBalance);i(S=>S.address);const s=i(S=>S.loading),o=i(S=>S.marketOrders),{createEnergyOrder:l,fillEnergyOrder:p,cancelEnergyOrder:u}=oe(),[c,T]=h.useState("5000"),[g,k]=h.useState("0.010"),$=i(S=>{var C;return((C=S.playerCiv)==null?void 0:C.energy)??0}),b=async()=>{const S=Number(c),C=parseFloat(g);!S||isNaN(C)||await l(S,C)},z=Number(c),B=parseFloat(g),v=!isNaN(z)&&!isNaN(B)&&z>0&&B>0?z*B:null,P=v!==null&&z<=$,F=async S=>{const C=S.remaining>0?S.remaining:S.amount,O=S.price*C;parseFloat(a)<O||await p(S.id,C)},x=async S=>{await u(S.id)};return t.jsxs(yr,{children:[t.jsxs(mr,{children:[t.jsx(N,{icon:"/assets/systems/ses.web.png"})," ",e("market.title")]}),t.jsxs(Ht,{children:[t.jsxs(Ut,{children:[t.jsx(N,{icon:"/assets/systems/energy.web.png"})," ",e("market.sell_label_energy"),t.jsxs(Yt,{children:[e("market.your_energy"),": ",R($)]})]}),t.jsx(Ft,{placeholder:e("market.sell_placeholder_energy"),value:c,onChange:S=>T(S.target.value)})]}),t.jsxs(Ht,{children:[t.jsxs(Ut,{children:[t.jsx(N,{icon:"/assets/systems/ses.web.png"})," ",e("market.sell_label_price"),t.jsx(Yt,{children:e("market.sell_unit_price")})]}),t.jsx(Ft,{placeholder:e("market.sell_placeholder_price"),value:g,onChange:S=>k(S.target.value)})]}),t.jsxs(hr,{$valid:P,children:[t.jsxs(vr,{children:[t.jsx(N,{icon:"/assets/systems/ses.web.png"})," ",e("market.preview_receive")]}),t.jsx(Tr,{children:v!==null?R(v):"—"})]}),v!==null&&!P&&t.jsx(_r,{children:e("market.insufficient_energy")}),t.jsx(X,{variant:"primary",onClick:b,disabled:s||!P,style:{width:"100%"},children:e("market.sell_btn")}),t.jsx("div",{style:{marginTop:10,maxHeight:280,overflowY:"auto"},children:o.length===0?t.jsx(gr,{style:{justifyContent:"center",color:n.text.secondary,padding:16},children:e("market.empty")}):o.map((S,C)=>t.jsxs(fr,{children:[t.jsxs("div",{style:{flex:1},children:[t.jsx(br,{children:e("market.order_energy",{amt:R(S.amount)})})," @ ",t.jsx(xr,{children:e("market.order_price",{price:R(S.price,4)})}),t.jsxs("div",{style:{fontSize:"0.65rem",color:n.text.secondary},children:[S.seller,S.isMine?` ${e("market.order_you")}`:""]})]}),t.jsx("div",{style:{display:"flex",gap:4},children:S.isMine?t.jsx(X,{variant:"danger",onClick:()=>x(S),disabled:s,children:e("market.cancel_btn")}):(()=>{const O=S.remaining>0?S.remaining:S.amount,L=parseFloat(a)<S.price*O;return t.jsx(X,{variant:"primary",onClick:()=>F(S),disabled:s||L,title:L?e("market.buy_no_ses"):void 0,children:e("market.buy_btn")})})()})]},`${S.id}-${C}`))})]})}const wr=r.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.85);
  border-top: 1px solid rgba(0, 255, 136, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  pointer-events: auto;
  z-index: 150;
  padding: 0 0 env(safe-area-inset-bottom, 0px) 0;
`,Sr=r.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex: 1 1 0%;
  min-width: 0;
  height: 100%;
  background: transparent;
  border: none;
  border-top: 2px solid ${({$active:e,$color:a})=>e?a:"transparent"};
  color: ${({$active:e,$color:a})=>e?a:"#446688"};
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s, border-color 0.15s;
  padding: 4px 0;
  min-height: 44px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:active {
    opacity: 0.7;
  }
`,Er=r.span`
  font-size: 1.2rem;
  line-height: 1;
`,Cr={hud:"/assets/systems/radar.web.png",actions:"/assets/systems/energy.web.png",combat:"/assets/systems/weapon.web.png",market:"/assets/systems/ses.web.png",alliance:"/assets/systems/totem.web.png"},kr={hud:n.accent.green,actions:n.accent.blue,combat:n.accent.red,market:n.accent.gold,alliance:n.accent.gold};function Mr({activeTab:e,onTabChange:a}){const{t:s}=te(),o=i(c=>c.battleLog),l=i(c=>c.currentAlliance),p=["hud","actions","combat","market","alliance"],u={hud:s("mobile.tab_overview"),actions:s("mobile.tab_actions"),combat:s("mobile.tab_combat"),market:s("mobile.tab_market"),alliance:s("mobile.tab_alliance")};return t.jsx(wr,{children:p.map(c=>{const T=e===c,g=c==="combat"&&o.length>0||c==="alliance"&&l!==null;return t.jsxs(Sr,{$active:T,$color:kr[c],onClick:()=>a(T?null:c),"aria-label":u[c],children:[t.jsx(Er,{children:t.jsx(N,{icon:Cr[c]})}),u[c],g&&!T&&t.jsx(jr,{})]},c)})})}const jr=r.span`
  position: absolute;
  top: 6px;
  right: 50%;
  transform: translateX(16px);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${n.accent.green};
  box-shadow: 0 0 6px ${n.alpha(n.accent.green,.6)};
`,Ar=ge`
  from { transform: translateX(120%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
`,Nr=r.div`
  position: absolute;
  top: 80px;
  right: 12px;
  z-index: 300;
  display: flex;
  flex-direction: column;
  gap: 6px;
  pointer-events: none;
  max-width: min(320px, 80vw);
`,$r=r.div`
  pointer-events: auto;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  animation: ${Ar} 0.3s ease-out;
  border: 1px solid;

  ${({$type:e})=>{switch(e){case"success":return`
          color: ${n.accent.green};
          background: ${n.alpha(n.accent.green,.1)};
          border-color: ${n.alpha(n.accent.green,.3)};
        `;case"error":return`
          color: ${n.accent.red};
          background: ${n.alpha(n.accent.red,.1)};
          border-color: ${n.alpha(n.accent.red,.3)};
        `;case"info":default:return`
          color: ${n.accent.blue};
          background: ${n.alpha(n.accent.blue,.1)};
          border-color: ${n.alpha(n.accent.blue,.3)};
        `}}}
`,Rr=r.button`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid ${n.alpha(n.accent.blue,.4)};
  background: ${n.alpha(n.accent.blue,.15)};
  color: ${n.accent.blue};
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  &:hover {
    background: ${n.alpha(n.accent.blue,.3)};
  }
  &:active {
    transform: scale(0.95);
  }
`,Lr=r.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  word-break: break-all;
`;function Ir({t:e}){const a=i(u=>u.removeToast),[s,o]=h.useState(!1),{t:l}=te(),p=async u=>{u.stopPropagation();try{await navigator.clipboard.writeText(e.message),o(!0),setTimeout(()=>o(!1),1500)}catch{try{const c=document.createElement("textarea");c.value=e.message,document.body.appendChild(c),c.select(),document.execCommand("copy"),document.body.removeChild(c),o(!0),setTimeout(()=>o(!1),1500)}catch{}}};return t.jsx($r,{$type:e.type,onClick:()=>a(e.id),title:"点击关闭",children:t.jsxs(Lr,{children:[t.jsxs("span",{children:[e.type==="success"&&"✓ ",e.type==="error"&&"✕ ",e.type==="info"&&"ℹ ",e.message]}),t.jsx(Rr,{onClick:p,title:l("nav.copy_addr"),children:l(s?"toast.copied":"nav.copy_addr")})]})})}function He(){const e=i(a=>a.toasts);return e.length===0?null:t.jsx(Nr,{children:e.map(a=>t.jsx(Ir,{t:a},a.id))})}const Pr=[{id:"overview",label:"nav.overview",icon:"/assets/systems/radar.web.png"},{id:"actions",label:"nav.actions",icon:"/assets/systems/energy.web.png"},{id:"combat",label:"nav.combat",icon:"/assets/systems/weapon.web.png"},{id:"tech",label:"nav.tech",icon:"/assets/systems/shield.web.png"},{id:"alliance",label:"nav.alliance",icon:"/assets/systems/totem.web.png"},{id:"market",label:"nav.market",icon:"/assets/systems/ses.web.png"},{id:"leaderboard",label:"nav.leaderboard",icon:"/assets/systems/engine.web.png"}],Gt=r.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
  background: ${n.bg};
  overflow: hidden;
`,Br=r.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 16px;
  padding-top: calc(env(safe-area-inset-top, 0px) + 8px);
  background: ${n.alpha(n.card,.8)};
  border-bottom: 1px solid ${n.border};
  flex-shrink: 0;
  min-height: 56px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`,Dr=r.span`
  color: ${n.accent.green};
  font-size: 1.05rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
`,Or=r.span`
  color: ${n.text.secondary};
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  flex-shrink: 0;
`,Se=r.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background: ${({$color:e})=>n.alpha(e,.1)};
  border: 1px solid ${({$color:e})=>n.alpha(e,.2)};
  border-radius: 4px;
  padding: 4px 10px;
  white-space: nowrap;
  flex-shrink: 0;
  font-family: 'Courier New', monospace;
`,Ee=r.span`
  color: ${n.text.secondary};
  font-size: 0.75rem;
`,Ce=r.span`
  color: ${({$color:e})=>e};
  font-size: 0.88rem;
  font-weight: bold;
`,zr=r.button`
  background: ${({$canClaim:e})=>e?n.alpha(n.accent.gold,.15):"transparent"};
  border: 1px solid ${({$canClaim:e})=>e?n.alpha(n.accent.gold,.4):n.border};
  border-radius: 4px;
  color: ${({$canClaim:e})=>e?n.accent.gold:n.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.76rem;
  padding: 4px 10px;
  cursor: ${({$canClaim:e})=>e?"pointer":"default"};
  white-space: nowrap;
  flex-shrink: 0;
  &:hover { background: ${({$canClaim:e})=>e?n.alpha(n.accent.gold,.25):"transparent"}; }
`,Fr=r.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,Hr=r.nav`
  width: 180px;
  flex-shrink: 0;
  background: ${n.alpha(n.card,.5)};
  border-right: 1px solid ${n.border};
  padding: 8px 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`,Ur=r.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: ${({$active:e})=>e?n.accent.green:n.text.secondary};
  background: ${({$active:e})=>e?n.alpha(n.accent.green,.08):"transparent"};
  border: none;
  border-left: 3px solid ${({$active:e})=>e?n.accent.green:"transparent"};
  cursor: pointer;
  text-align: left;
  transition: background 0.1s, color 0.1s;
  &:hover { background: ${n.alpha(n.accent.green,.04)}; color: ${n.text.primary}; }
  -webkit-tap-highlight-color: transparent;
`,Yr=r.a`
  color: ${n.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.78rem;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.15s;
  &:hover { color: ${n.accent.green}; text-decoration: underline; }
`,Gr=r.button`
  background: none;
  border: 1px solid ${n.alpha(n.text.secondary,.3)};
  border-radius: 3px;
  color: ${n.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.72rem;
  padding: 4px 8px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.15s, border-color 0.15s;
  &:hover { color: ${n.accent.green}; border-color: ${n.accent.green}; }
`,Kr=r.span`
  font-size: 1rem;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
`,Vr=r.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px 20px;
`,Wr=r.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Kt=r.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
  background: ${n.bg};
  overflow: hidden;
`,Jr=r.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 80px 10px 70px;
`,Xr=r.div`
  color: ${n.text.primary};
  font-size: 1.1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 4px;
`,qr=r.div`
  height: 1px;
  background: ${n.border};
  margin: 0 0 12px 0;
`,Zr={overview:"page.overview",actions:"page.actions",combat:"page.combat",tech:"page.tech",alliance:"page.alliance",market:"page.market",leaderboard:"page.leaderboard"},Qr={overview:"/assets/systems/radar.web.png",actions:"/assets/systems/energy.web.png",combat:"/assets/systems/weapon.web.png",tech:"/assets/systems/shield.web.png",alliance:"/assets/systems/totem.web.png",market:"/assets/systems/ses.web.png",leaderboard:"/assets/systems/trophy.web.png"};function es(){const[e,a]=h.useState("overview"),s=i(v=>v.playerCiv),o=i(v=>v.address),l=i(v=>v.sesBalance),p=i(v=>v.loading),u=i(v=>v.epochClaimed),{t:c,toggleLang:T}=te(),{claimDailySES:g}=oe(),k=i(v=>v.collectRate),$=p||u;if(!s)return t.jsxs(Gt,{children:[t.jsx(Qt,{}),t.jsx(He,{})]});const b=o?`${o.slice(0,6)}...${o.slice(-4)}`:"",z=s.maxShieldHP>0?Math.round(s.shieldHP/s.maxShieldHP*100):0,B=()=>{const v=(()=>{switch(e){case"overview":return t.jsx(it,{});case"actions":return t.jsx(en,{});case"combat":return t.jsxs(t.Fragment,{children:[t.jsx(an,{}),t.jsx(tn,{})]});case"tech":return t.jsx(rt,{});case"alliance":return t.jsx(nn,{});case"market":return t.jsx(rn,{});case"leaderboard":return t.jsx(st,{})}})();return t.jsxs(t.Fragment,{children:[t.jsxs(Xr,{children:[t.jsx(N,{icon:Qr[e]})," ",c(Zr[e])]}),t.jsx(qr,{}),v]})};return t.jsxs(Gt,{children:[t.jsx(lt,{variant:"hero",clip:"game",dense:!0,videoOpacity:.5}),t.jsxs(Br,{children:[t.jsx(Dr,{children:s.name}),t.jsx(Or,{children:b}),t.jsx(Fe,{}),t.jsxs(Se,{$color:n.accent.gold,children:[t.jsx(Ee,{children:t.jsx(N,{icon:"/assets/systems/ses.web.png"})}),t.jsx(Ce,{$color:n.accent.gold,children:Ue(l)})]}),t.jsxs(Se,{$color:n.accent.green,children:[t.jsx(Ee,{children:t.jsx(N,{icon:"/assets/systems/energy.web.png"})}),t.jsx(Ce,{$color:n.accent.green,children:R(s.energy)})]}),t.jsxs(Se,{$color:"#44ff88",children:[t.jsxs(Ee,{children:[t.jsx(N,{icon:"/assets/systems/energy.web.png"}),"/s"]}),t.jsx(Ce,{$color:"#44ff88",children:k})]}),t.jsxs(Se,{$color:n.accent.red,children:[t.jsx(Ee,{children:t.jsx(N,{icon:"/assets/systems/heart.web.png"})}),t.jsx(Ce,{$color:n.accent.red,children:R(s.health)})]}),t.jsxs(Se,{$color:n.accent.shield,children:[t.jsx(Ee,{children:t.jsx(N,{icon:"/assets/systems/shield.web.png"})}),t.jsxs(Ce,{$color:n.accent.shield,children:[z,"%"]})]}),t.jsxs(zr,{$canClaim:!u,onClick:()=>!$&&g(),disabled:$,children:[t.jsx(N,{icon:"/assets/systems/ses.web.png"})," ",c(u?"ses.claimed":"ses.claim")]}),t.jsx(Yr,{href:"https://docs.strifelabs.com",target:"_blank",children:c("connect.tutorial")}),t.jsx(Gr,{onClick:T,children:c("connect.lang_switch")})]}),t.jsxs(Fr,{children:[t.jsx(Hr,{children:Pr.map(v=>t.jsxs(Ur,{$active:e===v.id,onClick:()=>a(v.id),children:[t.jsx(Kr,{children:t.jsx(N,{icon:v.icon})}),c(v.label)]},v.id))}),t.jsx(Vr,{children:t.jsx(Wr,{children:B()})})]}),t.jsx(He,{}),t.jsxs(sn,{children:[t.jsx(on,{children:c("lore.footer_quote")}),t.jsxs(ln,{children:[c("lore.epoch_label")," #","—"," · ",c("lore.engine_status")]}),t.jsxs(cn,{children:["v0.1.0 · ","74d1f15"]})]})]})}const sn=r.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  padding: 10px 20px;
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 10px);
  background: ${n.alpha(n.card,.75)};
  border-top: 1px solid ${n.alpha(n.accent.green,.16)};
  min-height: 48px;
`,on=r.span`
  color: ${n.alpha(n.text.secondary,.78)};
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  font-style: italic;
`,ln=r.span`
  color: ${n.alpha(n.accent.green,.6)};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
  white-space: nowrap;
`,cn=r.span`
  color: ${n.alpha(n.text.secondary,.5)};
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  white-space: nowrap;
`;function ts(){const{t:e}=te(),a=i(c=>c.connected),s=i(c=>c.playerCiv);i(c=>c.address),i(c=>c.sesBalance),i(c=>c.selectedTarget),i(c=>c.battleLog),i(c=>c.currentAlliance),i(c=>c.loading),i(c=>c.collectRate);const[o,l]=h.useState(null),[p,u]=h.useState(a);return h.useEffect(()=>{a!==p&&(u(a),a||l(null))},[a,p]),a?t.jsxs(Kt,{children:[t.jsx(lt,{variant:"hero",clip:"game",dense:!0,videoOpacity:.4}),t.jsx(He,{}),s&&t.jsxs(as,{children:[t.jsx(rs,{children:s.name}),t.jsx(is,{children:t.jsx(Fe,{})})]}),t.jsxs(Jr,{children:[o==="hud"&&t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[t.jsx(it,{}),t.jsx(rt,{}),t.jsx(st,{})]}),o==="actions"&&t.jsx(en,{}),o==="combat"&&t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[t.jsx(an,{}),t.jsx(tn,{})]}),o==="market"&&t.jsx(rn,{}),o==="alliance"&&t.jsx(nn,{}),o===null&&t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[t.jsx(it,{}),t.jsx(rt,{}),t.jsx(st,{})]})]}),t.jsx(Mr,{activeTab:o,onTabChange:l}),t.jsxs(sn,{children:[t.jsx(on,{children:e("lore.footer_quote")}),t.jsxs(ln,{children:[e("lore.epoch_label")," #","—"," · ",e("lore.engine_status")]}),t.jsxs(cn,{children:["v0.1.0 · ","74d1f15"]})]})]}):t.jsxs(Kt,{children:[t.jsx(Qt,{}),t.jsx(He,{})]})}function ns(){return we()?t.jsx(ts,{}):t.jsx(es,{})}const as=r.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 130;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  padding: 6px 10px;
  padding-top: calc(env(safe-area-inset-top, 0px) + 6px);
  flex-shrink: 0;
`,is=r.div`
  flex-shrink: 0;
  margin-left: auto;
  display: flex;
  align-items: center;
`;r.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  flex: 1;
  min-width: 0;
  &::-webkit-scrollbar { display: none; }
`;r.div`
  flex-shrink: 0;
  min-width: 62px;
  min-height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid ${({$color:e})=>e||"rgba(0,255,136,0.15)"};
  border-radius: 4px;
  padding: 4px 8px;
  white-space: nowrap;
  text-align: center;
`;r.div`
  color: #446688;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
`;r.div`
  color: ${({$color:e})=>e||n.accent.green};
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
`;const rs=r.div`
  color: ${n.accent.green};
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
`;function ss(){return Xn(),t.jsx(ns,{})}function os(){return t.jsx(ta,{children:t.jsx(ss,{})})}un.createRoot(document.getElementById("root")).render(t.jsx(os,{}));
