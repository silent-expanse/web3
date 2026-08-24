import{t as Xn,r as m,j as t,E as Ce,b as s,f as pt,c as qn}from"./framework-Bz0v_qGz.js";import{u as Xe,Q as Zn,b as Qn}from"./query-DWD-fU0i.js";import{k as ea,l as ta,m as na,n as aa,W as ia,c as ra}from"./wagmi-ELwOze5P.js";import{B as sa,C as ke,I as oa,f as Je,g as la,M as Ot,p as ca,i as ut}from"./ethers-BJrJVTNX.js";import{d as ht,R as da,C as mt}from"./rainbowkit-D9nXKzl8.js";import{x as zt,y as pa}from"./viem-BOVCvuR9.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))c(l);new MutationObserver(l=>{for(const p of l)if(p.type==="childList")for(const h of p.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&c(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const p={};return l.integrity&&(p.integrity=l.integrity),l.referrerPolicy&&(p.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?p.credentials="include":l.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function c(l){if(l.ep)return;l.ep=!0;const p=i(l);fetch(l.href,p)}})();const ua={},Ft=e=>{let a;const i=new Set,c=(S,k)=>{const A=typeof S=="function"?S(a):S;if(!Object.is(A,a)){const P=a;a=k??(typeof A!="object"||A===null)?A:Object.assign({},a,A),i.forEach(T=>T(a,P))}},l=()=>a,u={setState:c,getState:l,getInitialState:()=>o,subscribe:S=>(i.add(S),()=>i.delete(S)),destroy:()=>{(ua?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),i.clear()}},o=a=e(c,l,u);return u},ma=e=>e?Ft(e):Ft,Cn={},{useDebugValue:ya}=Xn,{useSyncExternalStoreWithSelector:ga}=ea;let Ht=!1;const fa=e=>e;function ba(e,a=fa,i){(Cn?"production":void 0)!=="production"&&i&&!Ht&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),Ht=!0);const c=ga(e.subscribe,e.getState,e.getServerState||e.getInitialState,a,i);return ya(c),c}const Ut=e=>{(Cn?"production":void 0)!=="production"&&typeof e!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const a=typeof e=="function"?ma(e):e,i=(c,l)=>ba(a,c,l);return Object.assign(i,a),i},ha=e=>e?Ut(e):Ut;let xt=0;const r=ha(e=>({connected:!1,address:null,playerCiv:null,attackTokens:{current:0,max:0,intervalSec:0,ratePerSec:0},pendingEnergy:0,isDestroyed:!1,sesBalance:"0",entryFee:"0.01",enemyCivs:new Map,battleLog:[],battleCount:0,currentAlliance:null,pendingRefund:0,selectedTarget:null,loading:!1,activeAction:null,error:null,lastSyncAt:0,seenBattleCount:0,attackFlashAt:0,density:typeof localStorage<"u"&&localStorage.getItem("ses_density")||"comfortable",toasts:[],attackBeams:[],lastAttackTime:0,lastCollectTime:0,collectRate:0,collectorDurability:{current:0,max:0},moveEta:0,combatBoost:0,pendingCollect:0,shieldDefense:0,attackPower:0,attackEnergyCost:0,speed:0,radarRange:0,marketOrders:[],_allianceMembers:[],_allianceTotemLevel:0,_allianceTotemEnergy:0,_allianceTotemUpgradeCost:0,_allianceIsLeader:!1,_allianceLeader:"",_alliancePendingRefund:0,lastClaimDay:0,currentEpoch:0,epochClaimed:!1,lastDistributedEpoch:0,epochStartTime:0,epochEndTime:0,dailyEmission:0,searchAddress:"",searchResult:null,setConnected:a=>e({connected:!0,address:a}),setDisconnected:()=>e({connected:!1,address:null,playerCiv:null,sesBalance:"0",currentAlliance:null,battleLog:[],enemyCivs:new Map,pendingEnergy:0,isDestroyed:!1,toasts:[],attackBeams:[],lastCollectTime:0,collectRate:0,collectorDurability:{current:0,max:0},moveEta:0,combatBoost:0,pendingCollect:0,shieldDefense:0,attackPower:0,attackEnergyCost:0,speed:0,radarRange:0,marketOrders:[],_allianceMembers:[],_allianceTotemLevel:0,_allianceTotemEnergy:0,_allianceTotemUpgradeCost:0,_allianceIsLeader:!1,_allianceLeader:"",_alliancePendingRefund:0,currentEpoch:0,epochClaimed:!1,lastDistributedEpoch:0,epochStartTime:0,epochEndTime:0,dailyEmission:0,activeAction:null,lastSyncAt:0,seenBattleCount:0,attackFlashAt:0}),setPlayerCiv:a=>e({playerCiv:a}),setAttackTokens:a=>e({attackTokens:a}),setPendingEnergy:a=>e({pendingEnergy:a}),setSESBalance:a=>e({sesBalance:a}),setEntryFee:a=>e({entryFee:a}),addEnemyCiv:(a,i)=>e(c=>{const l=new Map(c.enemyCivs);return l.set(a,i),{enemyCivs:l}}),clearEnemyCivs:()=>e({enemyCivs:new Map}),addBattleLog:a=>e(i=>({battleLog:[a,...i.battleLog].slice(0,100)})),setBattleCount:a=>e({battleCount:a}),setAlliance:a=>e({currentAlliance:a}),setPendingRefund:a=>e({pendingRefund:a}),setSelectedTarget:a=>e({selectedTarget:a}),setLoading:a=>e({loading:a}),setActiveAction:a=>e({activeAction:a}),setError:a=>e({error:a}),markBattlesSeen:()=>e(a=>({seenBattleCount:a.battleLog.length})),triggerAttackFlash:()=>e({attackFlashAt:Date.now()}),setDensity:a=>{try{localStorage.setItem("ses_density",a)}catch{}e({density:a})},addToast:(a,i="info")=>{const c=++xt,l=i==="error"?8e3:3500;e(p=>({toasts:[...p.toasts,{id:c,message:a,type:i,timestamp:Date.now()}]})),setTimeout(()=>{e(p=>({toasts:p.toasts.filter(h=>h.id!==c)}))},l)},addSuccessToast:(a,i)=>{const c=++xt;e(l=>({toasts:[...l.toasts,{id:c,message:a,type:"success",timestamp:Date.now(),txHash:i}]})),setTimeout(()=>{e(l=>({toasts:l.toasts.filter(p=>p.id!==c)}))},6e3)},addErrorToast:a=>{r.getState().addToast(a,"error"),e({error:a})},removeToast:a=>e(i=>({toasts:i.toasts.filter(c=>c.id!==a)})),addAttackBeam:(a,i)=>{const c=++xt;e(l=>({attackBeams:[...l.attackBeams,{id:c,from:a,to:i,timestamp:Date.now()}]})),setTimeout(()=>{e(l=>({attackBeams:l.attackBeams.filter(p=>p.id!==c)}))},600)},clearAttackBeams:()=>e({attackBeams:[]}),setSearchAddress:a=>e({searchAddress:a}),setSearchResult:a=>e({searchResult:a}),claimSES:()=>{const a=Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0).getTime())/864e5);e({lastClaimDay:a})}})),xa={SilentExpanseStrife:{address:"0x58c2400527813f78fc7ed498dd4ec66dc7787e73",description:"Main game entry contract (proxy)"},SES:{address:"0x1491e226292cf61aba5717828540c0f2518301c6",description:"Silent Expanse: Strife Token (ERC-20)"},Alliance:{address:"0x424923b65b9a224a3a96222a6e54b250887ce119",description:"Alliance system"},EnergyMarket:{address:"0x2dc9fff0edf2f4e1495eb8bb9b7ca117c635bf77",description:"Energy order-book marketplace"},DailyMinter:{address:"0x52ca63564e15ed70d012a70ea14d9d2e3701be1d",description:"Daily SES distribution"},AgentRegistry:{address:"0x05f85522651ea88d788f61ad0e2d410054c9e219",description:"AI Agent policy registry"}},_a={contracts:xa},va=_a;function Pe(e){var p;const a=`VITE_${e.replace(/([A-Z])/g,"_$1").toUpperCase()}`,c=typeof import.meta<"u"?(p=import.meta.env)==null?void 0:p[a]:void 0;if(c)return c;const l=va.contracts[e];if(!l)throw new Error(`Unknown contract: ${e}`);return l.address}const _t={},le={INITIAL_ENERGY:2e3,INITIAL_HEALTH:3e3,INITIAL_SCAN_RANGE:1e3,NEWBIE_PROTECTION_SECONDS:86400,BASE_COLLECT:3,COLLECT_BONUS:10,DURABILITY_BASE:86400,DURABILITY_PER_LV:7200,ATK_BASE:900,ATK_RATE:10,DEF_BASE:540,DEF_RATE:6,ATTACK_ENERGY_BASE:5e4,ATTACK_ENERGY_PER_LV:5e4,PLUNDER_RATIO:500,LAST_HIT_BONUS_PERCENT:50,DOWNGRADE_DIVISOR:10,SHIELD_DMG_BONUS:200,SHIELD_HP_BASE:3600,SHIELD_HP_RATE:15,REGEN_BASE:50,REGEN_RATE:1,SHIELD_REGEN_ENERGY_RATIO:1,WEAPON_DUR_BASE:60,WEAPON_DUR_PER_LV:15,SHIELD_DUR_BASE:40,SHIELD_DUR_PER_LV:10,ENGINE_DUR_BASE:30,ENGINE_DUR_PER_LV:6,RADAR_BASE:1e3,RADAR_LINEAR:150,RADAR_QUAD:5,ENGINE_SPEED_BASE:10,ENGINE_SPEED_PER_LV:5,JUMP_COOLDOWN:3600,JUMP_ENERGY_BASE:2e5,JUMP_ENERGY_MAX:165e5,JUMP_ENERGY_PER_SQRT:2e5,JUMP_SES_BASE:10,JUMP_SES_MAX:1e3,JUMP_SES_PER_SQRT:10,JUMP_TRACKING_RADAR_LV:20,TOKEN_BASE_MAX:3,TOKEN_BASE_INTERVAL:3,TOKEN_MAX_CAP:10,TOKEN_MIN_INTERVAL:1,TOKEN_INTERVAL_MS_BASE:300,TOKEN_INTERVAL_REDUCTION:10,UPKEEP_PER_LEVEL:2e3,REPAIR_COST_PER_SEC:1,SHIELD_REPAIR_COST:4,WEAPON_REPAIR_COST:3,ENGINE_REPAIR_COST:5,REBUILD_ENERGY_COST:5e5,REFERRAL_ENERGY_REWARD:150,SES_DECIMALS:18,DAILY_SES_BASE:23050,DAILY_SES_EMISSION:1152575342,SES_GROWTH_BPS:5e3,ANCHOR_BASE_BPS:1e4,ANCHOR_MID_BPS:3e5,ANCHOR_MAX_BPS:6e5,ANCHOR_PIVOT_1:100,ANCHOR_PIVOT_2:1e3,ENTRY_FEE_MIN:10000000000000000n,ENTRY_FEE_MAX:50000000000000000n,FEE_RAMP_UP_TIME:31536e3,ORDER_DELAY_SEC:3,SILENT_EXPANSE:Pe("SilentExpanseStrife"),SES_TOKEN:Pe("SES"),ALLIANCE:Pe("Alliance"),ENERGY_MARKET:Pe("EnergyMarket"),DAILY_MINTER:Pe("DailyMinter"),AGENT_REGISTRY:Pe("AgentRegistry"),CHAIN_ID:Number(typeof import.meta<"u"&&(_t==null?void 0:_t.VITE_CHAIN_ID)||56)},pe={energyCollector:{name:"采集",icon:"/assets/systems/collector.web.png",color:"#44ff88",label:"能量采集"},weapon:{name:"武器",icon:"/assets/systems/weapon.web.png",color:"#ff4444",label:"武器系统"},shield:{name:"护盾",icon:"/assets/systems/shield.web.png",color:"#ffaa00",label:"护盾系统"},radar:{name:"雷达",icon:"/assets/systems/radar.web.png",color:"#4488ff",label:"雷达系统"},engine:{name:"引擎",icon:"/assets/systems/engine.web.png",color:"#ff66cc",label:"引擎系统"}},wa=[{type:"constructor",inputs:[{name:"_sesToken",type:"address",internalType:"address"},{name:"_allianceSystem",type:"address",internalType:"address"},{name:"_battleLogic",type:"address",internalType:"address"},{name:"_movementLogic",type:"address",internalType:"address"},{name:"_adminLogic",type:"address",internalType:"address"},{name:"_gameplayLogic",type:"address",internalType:"address"},{name:"_agentRegistry",type:"address",internalType:"address"}],stateMutability:"nonpayable"},{type:"receive",stateMutability:"payable"},{type:"function",name:"ANCHOR_BASE_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ANCHOR_MAX_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ANCHOR_MID_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ANCHOR_PIVOT_1",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ANCHOR_PIVOT_2",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ATK_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ATK_RATE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ATTACK_ENERGY_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ATTACK_ENERGY_PER_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"BASE_COLLECT",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"COLLECT_BONUS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DAILY_SES_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DAILY_SES_EMISSION",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DEF_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DEF_RATE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DESTRUCTION_RATE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DOWNGRADE_DIVISOR",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DURABILITY_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DURABILITY_PER_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENGINE_DUR_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENGINE_DUR_PER_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENGINE_REPAIR_COST",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENGINE_SPEED_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENGINE_SPEED_PER_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENTRY_FEE_MAX",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ENTRY_FEE_MIN",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"FEE_RAMP_UP_TIME",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"INF_DISTANCE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"INITIAL_ENERGY",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"INITIAL_HEALTH",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"INITIAL_SCAN_RANGE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_COOLDOWN",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_ENERGY_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_ENERGY_MAX",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_ENERGY_PER_SQRT",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_SES_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_SES_MAX",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_SES_PER_SQRT",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"JUMP_TRACKING_RADAR_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"LAST_HIT_BONUS_PERCENT",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MAX_BATTLE_HISTORY",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MAX_HEALTH",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MAX_SAFE_DIST",inputs:[],outputs:[{name:"",type:"int256",internalType:"int256"}],stateMutability:"view"},{type:"function",name:"NEWBIE_PROTECTION_SECONDS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"PLUNDER_RATIO",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"RADAR_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"RADAR_LINEAR",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"RADAR_QUAD",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"REBUILD_ENERGY_COST",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"REFERRAL_ENERGY_REWARD",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"REGEN_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"REGEN_RATE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"REPAIR_COST_PER_SEC",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SES_GROWTH_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_DMG_BONUS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_DUR_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_DUR_PER_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_HP_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_HP_RATE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_REGEN_ENERGY_RATIO",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SHIELD_REPAIR_COST",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SYS_COLLECTOR",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"SYS_ENGINE",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"SYS_RADAR",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"SYS_SHIELD",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"SYS_WEAPON",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"TOKEN_BASE_INTERVAL",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOKEN_BASE_MAX",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOKEN_INTERVAL_MS_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOKEN_INTERVAL_REDUCTION",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOKEN_MAX_CAP",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOKEN_MIN_INTERVAL",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"UPKEEP_PER_LEVEL",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"WEAPON_DUR_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"WEAPON_DUR_PER_LV",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"WEAPON_REPAIR_COST",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"activeCivilizationCount",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"adminLogic",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"agentRegistry",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"allPlayers",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"allianceSystem",inputs:[],outputs:[{name:"",type:"address",internalType:"contract SilentExpanseStrifeAlliance"}],stateMutability:"view"},{type:"function",name:"assistShieldRepair",inputs:[{name:"t",type:"address",internalType:"address"},{name:"a",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"attack",inputs:[{name:"t",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"attackFor",inputs:[{name:"t",type:"address",internalType:"address"},{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"battleLogic",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"cancelMove",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"claimCombatEnergy",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"claimCombatEnergyFor",inputs:[{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"collectEnergy",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"collectEnergyFor",inputs:[{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"createCivilization",inputs:[{name:"name",type:"string",internalType:"string"}],outputs:[],stateMutability:"payable"},{type:"function",name:"createCivilization",inputs:[{name:"name",type:"string",internalType:"string"},{name:"referrer_",type:"address",internalType:"address"}],outputs:[],stateMutability:"payable"},{type:"function",name:"donateToTotem",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"},{name:"amount",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"donateToTotemFor",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"},{name:"amount",type:"uint256",internalType:"uint256"},{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"energyAllowance",inputs:[{name:"",type:"address",internalType:"address"},{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"energyMarket",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"energyReserved",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"feeRecipient",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"gameStartTime",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"gameplayLogic",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"getActivePlayerCount",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getAttackEnergyCost",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getAttackPower",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getAttackTokenInfo",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"tokens",type:"uint256",internalType:"uint256"},{name:"max",type:"uint256",internalType:"uint256"},{name:"interval",type:"uint256",internalType:"uint256"},{name:"rate",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getBattleCount",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getBattleHistory",inputs:[{name:"offset",type:"uint256",internalType:"uint256"},{name:"limit",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"tuple[]",internalType:"struct SilentExpanseStrifeStorage.BattleRecord[]",components:[{name:"attacker",type:"address",internalType:"address"},{name:"defender",type:"address",internalType:"address"},{name:"timestamp",type:"uint256",internalType:"uint256"},{name:"damageDealt",type:"uint256",internalType:"uint256"},{name:"shieldDamage",type:"uint256",internalType:"uint256"},{name:"healthDamage",type:"uint256",internalType:"uint256"},{name:"stolenEnergy",type:"uint256",internalType:"uint256"},{name:"downgradedSystem",type:"string",internalType:"string"},{name:"attackerWon",type:"bool",internalType:"bool"}]}],stateMutability:"view"},{type:"function",name:"getCivilization",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"tuple",internalType:"struct SilentExpanseStrifeStorage.Civilization",components:[{name:"name",type:"string",internalType:"string"},{name:"location",type:"tuple",internalType:"struct SilentExpanseStrifeStorage.Coordinates",components:[{name:"x",type:"int256",internalType:"int256"},{name:"y",type:"int256",internalType:"int256"},{name:"z",type:"int256",internalType:"int256"}]},{name:"energy",type:"uint256",internalType:"uint256"},{name:"health",type:"uint256",internalType:"uint256"},{name:"energyCollectorLv",type:"uint256",internalType:"uint256"},{name:"weaponLv",type:"uint256",internalType:"uint256"},{name:"radarLv",type:"uint256",internalType:"uint256"},{name:"shieldLv",type:"uint256",internalType:"uint256"},{name:"engineLv",type:"uint256",internalType:"uint256"},{name:"scanRange",type:"uint256",internalType:"uint256"},{name:"lastUpdateTime",type:"uint256",internalType:"uint256"},{name:"creationTime",type:"uint256",internalType:"uint256"},{name:"exists",type:"bool",internalType:"bool"},{name:"isRuins",type:"bool",internalType:"bool"},{name:"ruinsTimestamp",type:"uint256",internalType:"uint256"}]}],stateMutability:"view"},{type:"function",name:"getCivilizations",inputs:[{name:"players",type:"address[]",internalType:"address[]"}],outputs:[{name:"",type:"tuple[]",internalType:"struct SilentExpanseStrifeStorage.Civilization[]",components:[{name:"name",type:"string",internalType:"string"},{name:"location",type:"tuple",internalType:"struct SilentExpanseStrifeStorage.Coordinates",components:[{name:"x",type:"int256",internalType:"int256"},{name:"y",type:"int256",internalType:"int256"},{name:"z",type:"int256",internalType:"int256"}]},{name:"energy",type:"uint256",internalType:"uint256"},{name:"health",type:"uint256",internalType:"uint256"},{name:"energyCollectorLv",type:"uint256",internalType:"uint256"},{name:"weaponLv",type:"uint256",internalType:"uint256"},{name:"radarLv",type:"uint256",internalType:"uint256"},{name:"shieldLv",type:"uint256",internalType:"uint256"},{name:"engineLv",type:"uint256",internalType:"uint256"},{name:"scanRange",type:"uint256",internalType:"uint256"},{name:"lastUpdateTime",type:"uint256",internalType:"uint256"},{name:"creationTime",type:"uint256",internalType:"uint256"},{name:"exists",type:"bool",internalType:"bool"},{name:"isRuins",type:"bool",internalType:"bool"},{name:"ruinsTimestamp",type:"uint256",internalType:"uint256"}]}],stateMutability:"view"},{type:"function",name:"getCollectorDurability",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"current",type:"uint256",internalType:"uint256"},{name:"max",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getCombatBoost",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getCompactPlayers",inputs:[{name:"players",type:"address[]",internalType:"address[]"}],outputs:[{name:"",type:"tuple[]",internalType:"struct SilentExpanseStrife.CompactPlayer[]",components:[{name:"player",type:"address",internalType:"address"},{name:"x",type:"int256",internalType:"int256"},{name:"y",type:"int256",internalType:"int256"},{name:"z",type:"int256",internalType:"int256"},{name:"name",type:"string",internalType:"string"},{name:"isRuins",type:"bool",internalType:"bool"},{name:"isMoving",type:"bool",internalType:"bool"},{name:"eta",type:"uint256",internalType:"uint256"}]}],stateMutability:"view"},{type:"function",name:"getCurrentPosition",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"pos",type:"tuple",internalType:"struct SilentExpanseStrifeStorage.Coordinates",components:[{name:"x",type:"int256",internalType:"int256"},{name:"y",type:"int256",internalType:"int256"},{name:"z",type:"int256",internalType:"int256"}]},{name:"isMoving",type:"bool",internalType:"bool"},{name:"eta",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getCurrentShieldHP",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getDistance",inputs:[{name:"a",type:"address",internalType:"address"},{name:"b",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getEnergyCollectRate",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getPendingEnergy",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getShieldDefense",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getSpeed",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getRadarRange",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getEntryFee",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getJumpCount",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getMaxShieldHP",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getPlayerCount",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getPlayers",inputs:[{name:"offset",type:"uint256",internalType:"uint256"},{name:"limit",type:"uint256",internalType:"uint256"}],outputs:[{name:"players",type:"address[]",internalType:"address[]"},{name:"total",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getPositions",inputs:[{name:"players",type:"address[]",internalType:"address[]"}],outputs:[{name:"pos",type:"tuple[]",internalType:"struct SilentExpanseStrifeStorage.Coordinates[]",components:[{name:"x",type:"int256",internalType:"int256"},{name:"y",type:"int256",internalType:"int256"},{name:"z",type:"int256",internalType:"int256"}]},{name:"moving",type:"bool[]",internalType:"bool[]"},{name:"eta",type:"uint256[]",internalType:"uint256[]"}],stateMutability:"view"},{type:"function",name:"getRebirthCount",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getSimpleStatuses",inputs:[{name:"players",type:"address[]",internalType:"address[]"}],outputs:[{name:"",type:"tuple[]",internalType:"struct SilentExpanseStrife.SimpleStatus[]",components:[{name:"player",type:"address",internalType:"address"},{name:"energy",type:"uint256",internalType:"uint256"},{name:"health",type:"uint256",internalType:"uint256"},{name:"collectorLv",type:"uint256",internalType:"uint256"},{name:"weaponLv",type:"uint256",internalType:"uint256"},{name:"shieldLv",type:"uint256",internalType:"uint256"},{name:"radarLv",type:"uint256",internalType:"uint256"},{name:"engineLv",type:"uint256",internalType:"uint256"},{name:"shieldHP",type:"uint256",internalType:"uint256"},{name:"shieldMax",type:"uint256",internalType:"uint256"},{name:"exists",type:"bool",internalType:"bool"},{name:"isRuins",type:"bool",internalType:"bool"}]}],stateMutability:"view"},{type:"function",name:"getUpgradeCost",inputs:[{name:"player",type:"address",internalType:"address"},{name:"system",type:"string",internalType:"string"}],outputs:[{name:"ses",type:"uint256",internalType:"uint256"},{name:"energy",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getUpgradePreview",inputs:[{name:"player",type:"address",internalType:"address"},{name:"system",type:"string",internalType:"string"}],outputs:[{name:"current",type:"uint256",internalType:"uint256"},{name:"next",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"isInRange",inputs:[{name:"scanner",type:"address",internalType:"address"},{name:"target",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"lockEnergyForOrder",inputs:[{name:"s",type:"address",internalType:"address"},{name:"a",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"movementLogic",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"owner",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"pendingCombatEnergy",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"playerIndex",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"rebuildCivilization",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"rebuildCivilizationFor",inputs:[{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"referralCount",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"referrer",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"regenShield",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"renounceOwnership",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"repairAll",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"repairAllFor",inputs:[{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"repairCollector",inputs:[{name:"a",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"repairCollectorFor",inputs:[{name:"p",type:"address",internalType:"address"},{name:"a",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"repairShield",inputs:[{name:"a",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"repairShieldFor",inputs:[{name:"a",type:"uint256",internalType:"uint256"},{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"sesToken",inputs:[],outputs:[{name:"",type:"address",internalType:"contract SilentExpanseStrifeToken"}],stateMutability:"view"},{type:"function",name:"setAdminLogic",inputs:[{name:"_adminLogicAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setAgentRegistry",inputs:[{name:"_agentRegistryAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setEnergyMarket",inputs:[{name:"_energyMarket",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setFeeRecipient",inputs:[{name:"r",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setGameplayLogic",inputs:[{name:"_gameplayLogicAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"settleLockedOrder",inputs:[{name:"f",type:"address",internalType:"address"},{name:"t",type:"address",internalType:"address"},{name:"ta",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"spaceJump",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"spaceJumpFor",inputs:[{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"startMove",inputs:[{name:"x",type:"int256",internalType:"int256"},{name:"y",type:"int256",internalType:"int256"},{name:"z",type:"int256",internalType:"int256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"totalCivilizations",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"totalFeesCollected",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"trackingJump",inputs:[{name:"t",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"unlockEnergyForOrder",inputs:[{name:"s",type:"address",internalType:"address"},{name:"a",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"upgradeSystem",inputs:[{name:"sysId",type:"uint8",internalType:"uint8"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"upgradeSystemFor",inputs:[{name:"sysId",type:"uint8",internalType:"uint8"},{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"upgradeTotem",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"upgradeTotemFor",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"},{name:"p",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"withdrawFees",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"event",name:"AdminLogicSet",inputs:[{name:"logic",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"AgentRegistrySet",inputs:[{name:"registry",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"AllSystemsRepaired",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"cost",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"AttackExecuted",inputs:[{name:"attacker",type:"address",indexed:!0,internalType:"address"},{name:"defender",type:"address",indexed:!0,internalType:"address"},{name:"shieldDmg",type:"uint256",indexed:!1,internalType:"uint256"},{name:"healthDmg",type:"uint256",indexed:!1,internalType:"uint256"},{name:"stolenEnergy",type:"uint256",indexed:!1,internalType:"uint256"},{name:"downgradedSystem",type:"string",indexed:!1,internalType:"string"},{name:"attackerWon",type:"bool",indexed:!1,internalType:"bool"}],anonymous:!1},{type:"event",name:"AttackSoftGated",inputs:[{name:"attacker",type:"address",indexed:!0,internalType:"address"},{name:"defender",type:"address",indexed:!0,internalType:"address"},{name:"reason",type:"string",indexed:!1,internalType:"string"}],anonymous:!1},{type:"event",name:"CivCreated",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"name",type:"string",indexed:!1,internalType:"string"},{name:"x",type:"int256",indexed:!1,internalType:"int256"},{name:"y",type:"int256",indexed:!1,internalType:"int256"},{name:"z",type:"int256",indexed:!1,internalType:"int256"},{name:"fee",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"CivDestroyed",inputs:[{name:"target",type:"address",indexed:!0,internalType:"address"},{name:"attacker",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"CivRebuilt",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"costSES",type:"uint256",indexed:!1,internalType:"uint256"},{name:"costEnergy",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"CollectorRepaired",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"cost",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"CombatEnergyClaimed",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"EnergyCollected",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"EnergyLocked",inputs:[{name:"seller",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"EnergyMarketSet",inputs:[{name:"market",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"EnergyTransferred",inputs:[{name:"from",type:"address",indexed:!0,internalType:"address"},{name:"to",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"EnergyUnlocked",inputs:[{name:"seller",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"FeesWithdrawn",inputs:[{name:"owner",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"GameplayLogicSet",inputs:[{name:"logic",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"MoveCancelled",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"MoveCompleted",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"toX",type:"int256",indexed:!1,internalType:"int256"},{name:"toY",type:"int256",indexed:!1,internalType:"int256"},{name:"toZ",type:"int256",indexed:!1,internalType:"int256"}],anonymous:!1},{type:"event",name:"MoveStarted",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"fromX",type:"int256",indexed:!1,internalType:"int256"},{name:"fromY",type:"int256",indexed:!1,internalType:"int256"},{name:"fromZ",type:"int256",indexed:!1,internalType:"int256"},{name:"toX",type:"int256",indexed:!1,internalType:"int256"},{name:"toY",type:"int256",indexed:!1,internalType:"int256"},{name:"toZ",type:"int256",indexed:!1,internalType:"int256"},{name:"cost",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"OwnershipRenounced",inputs:[{name:"newOwner",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"PolicyViolation",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"reason",type:"string",indexed:!1,internalType:"string"}],anonymous:!1},{type:"event",name:"ShieldRepaired",inputs:[{name:"target",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"cost",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"SpaceJumped",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"jumpCount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"x",type:"int256",indexed:!1,internalType:"int256"},{name:"y",type:"int256",indexed:!1,internalType:"int256"},{name:"z",type:"int256",indexed:!1,internalType:"int256"},{name:"energyCost",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesCost",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"SystemUpgraded",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"system",type:"string",indexed:!1,internalType:"string"},{name:"newLv",type:"uint256",indexed:!1,internalType:"uint256"},{name:"costSES",type:"uint256",indexed:!1,internalType:"uint256"},{name:"costEnergy",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"UpkeepDeducted",inputs:[{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"totalLevel",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"error",name:"E_AlreadyCiv",inputs:[]},{type:"error",name:"E_AlreadyClaimed",inputs:[]},{type:"error",name:"E_AlreadyReferred",inputs:[]},{type:"error",name:"E_AlreadyThere",inputs:[]},{type:"error",name:"E_CivNotFound",inputs:[]},{type:"error",name:"E_DelegatecallFailed",inputs:[{name:"module",type:"string",internalType:"string"}]},{type:"error",name:"E_DurabilityFull",inputs:[]},{type:"error",name:"E_EngineWorn",inputs:[]},{type:"error",name:"E_InsufficientUnlocked",inputs:[]},{type:"error",name:"E_InvalidCiv",inputs:[]},{type:"error",name:"E_InvalidName",inputs:[]},{type:"error",name:"E_InvalidReferrer",inputs:[]},{type:"error",name:"E_InvalidSystem",inputs:[]},{type:"error",name:"E_JumpCooldown",inputs:[]},{type:"error",name:"E_LeaveCooldown",inputs:[]},{type:"error",name:"E_LogicAlreadySet",inputs:[]},{type:"error",name:"E_LowAllowance",inputs:[]},{type:"error",name:"E_LowEnergy",inputs:[]},{type:"error",name:"E_MarketAlreadySet",inputs:[]},{type:"error",name:"E_NoActivePlayers",inputs:[]},{type:"error",name:"E_NoPendingEnergy",inputs:[]},{type:"error",name:"E_NotEnergyMarket",inputs:[]},{type:"error",name:"E_NotInAlliance",inputs:[]},{type:"error",name:"E_NotOwner",inputs:[]},{type:"error",name:"E_NotRuins",inputs:[]},{type:"error",name:"E_PolicyBlocked",inputs:[]},{type:"error",name:"E_RadarTooLow",inputs:[]},{type:"error",name:"E_RateLimited",inputs:[]},{type:"error",name:"E_SameAlliance",inputs:[]},{type:"error",name:"E_SelfReferral",inputs:[]},{type:"error",name:"E_SelfTarget",inputs:[]},{type:"error",name:"E_ShareTooSmall",inputs:[]},{type:"error",name:"E_ShieldFull",inputs:[]},{type:"error",name:"E_TargetNotScanned",inputs:[]},{type:"error",name:"E_TargetProtected",inputs:[]},{type:"error",name:"E_TargetShieldFull",inputs:[]},{type:"error",name:"E_TooFar",inputs:[]},{type:"error",name:"E_UseCreateCiv",inputs:[]},{type:"error",name:"E_WithdrawFailed",inputs:[]},{type:"error",name:"E_WrongAlliance",inputs:[]},{type:"error",name:"E_WrongFee",inputs:[]},{type:"error",name:"E_ZeroAddress",inputs:[]},{type:"error",name:"E_ZeroTotal",inputs:[]}],Ta=[{type:"constructor",inputs:[],stateMutability:"nonpayable"},{type:"function",name:"DAILY_EMISSION",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DEV_FEE_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"EMISSION_DAYS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MARKETING_FEE_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MAX_MINT_PER_TX",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOKEN_DECIMALS",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"TOKEN_NAME",inputs:[],outputs:[{name:"",type:"string",internalType:"string"}],stateMutability:"view"},{type:"function",name:"TOKEN_SYMBOL",inputs:[],outputs:[{name:"",type:"string",internalType:"string"}],stateMutability:"view"},{type:"function",name:"TOTAL_FEE_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOTAL_SUPPLY",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"accruedDevFees",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"accruedMarketingFees",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"allowance",inputs:[{name:"owner",type:"address",internalType:"address"},{name:"spender",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"approve",inputs:[{name:"spender",type:"address",internalType:"address"},{name:"value",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"nonpayable"},{type:"function",name:"authorizedMinters",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"balanceOf",inputs:[{name:"account",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"burn",inputs:[{name:"value",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"burnFrom",inputs:[{name:"from",type:"address",internalType:"address"},{name:"amount",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"decimals",inputs:[],outputs:[{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"view"},{type:"function",name:"devFeeCollector",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"distributeFees",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"getSupplyInfo",inputs:[],outputs:[{name:"total",type:"uint256",internalType:"uint256"},{name:"cap",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getTokenInfo",inputs:[],outputs:[{name:"",type:"string",internalType:"string"},{name:"",type:"string",internalType:"string"},{name:"",type:"uint8",internalType:"uint8"}],stateMutability:"pure"},{type:"function",name:"isLiquidityPool",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"marketingFeeCollector",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"mint",inputs:[{name:"to",type:"address",internalType:"address"},{name:"amount",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"name",inputs:[],outputs:[{name:"",type:"string",internalType:"string"}],stateMutability:"view"},{type:"function",name:"noFeeOnReceive",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"owner",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"poolManager",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"renounceOwnership",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setFeeCollectors",inputs:[{name:"dev",type:"address",internalType:"address"},{name:"marketing",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setLiquidityPool",inputs:[{name:"pool",type:"address",internalType:"address"},{name:"isPool_",type:"bool",internalType:"bool"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setMinter",inputs:[{name:"minter",type:"address",internalType:"address"},{name:"authorized",type:"bool",internalType:"bool"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setNoFeeOnReceive",inputs:[{name:"addr",type:"address",internalType:"address"},{name:"noFee",type:"bool",internalType:"bool"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setPoolManager",inputs:[{name:"_poolManager",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"symbol",inputs:[],outputs:[{name:"",type:"string",internalType:"string"}],stateMutability:"view"},{type:"function",name:"totalSupply",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"transfer",inputs:[{name:"to",type:"address",internalType:"address"},{name:"value",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"nonpayable"},{type:"function",name:"transferFrom",inputs:[{name:"from",type:"address",internalType:"address"},{name:"to",type:"address",internalType:"address"},{name:"value",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"nonpayable"},{type:"function",name:"transferOwnership",inputs:[{name:"newOwner",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"event",name:"Approval",inputs:[{name:"owner",type:"address",indexed:!0,internalType:"address"},{name:"spender",type:"address",indexed:!0,internalType:"address"},{name:"value",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"FeeCollectorsUpdated",inputs:[{name:"dev",type:"address",indexed:!1,internalType:"address"},{name:"marketing",type:"address",indexed:!1,internalType:"address"}],anonymous:!1},{type:"event",name:"FeesDistributed",inputs:[{name:"devAmount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"marketingAmount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"LiquidityPoolSet",inputs:[{name:"pool",type:"address",indexed:!0,internalType:"address"},{name:"isPool",type:"bool",indexed:!1,internalType:"bool"}],anonymous:!1},{type:"event",name:"MintScheduled",inputs:[{name:"to",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"blockNumber",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"MinterSet",inputs:[{name:"minter",type:"address",indexed:!0,internalType:"address"},{name:"authorized",type:"bool",indexed:!1,internalType:"bool"}],anonymous:!1},{type:"event",name:"OwnershipTransferred",inputs:[{name:"previousOwner",type:"address",indexed:!0,internalType:"address"},{name:"newOwner",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"PoolManagerSet",inputs:[{name:"manager",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"Transfer",inputs:[{name:"from",type:"address",indexed:!0,internalType:"address"},{name:"to",type:"address",indexed:!0,internalType:"address"},{name:"value",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"error",name:"ERC20InsufficientAllowance",inputs:[{name:"spender",type:"address",internalType:"address"},{name:"allowance",type:"uint256",internalType:"uint256"},{name:"needed",type:"uint256",internalType:"uint256"}]},{type:"error",name:"ERC20InsufficientBalance",inputs:[{name:"sender",type:"address",internalType:"address"},{name:"balance",type:"uint256",internalType:"uint256"},{name:"needed",type:"uint256",internalType:"uint256"}]},{type:"error",name:"ERC20InvalidApprover",inputs:[{name:"approver",type:"address",internalType:"address"}]},{type:"error",name:"ERC20InvalidReceiver",inputs:[{name:"receiver",type:"address",internalType:"address"}]},{type:"error",name:"ERC20InvalidSender",inputs:[{name:"sender",type:"address",internalType:"address"}]},{type:"error",name:"ERC20InvalidSpender",inputs:[{name:"spender",type:"address",internalType:"address"}]},{type:"error",name:"OwnableInvalidOwner",inputs:[{name:"owner",type:"address",internalType:"address"}]},{type:"error",name:"OwnableUnauthorizedAccount",inputs:[{name:"account",type:"address",internalType:"address"}]},{type:"error",name:"ReentrancyGuardReentrantCall",inputs:[]},{type:"error",name:"SES_CapExceeded",inputs:[]},{type:"error",name:"SES_NotAuthorized",inputs:[]},{type:"error",name:"SES_ZeroAddress",inputs:[]},{type:"error",name:"SES_ZeroAmount",inputs:[]}],Sa=[{type:"function",name:"LEAVE_COOLDOWN",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"LEAVE_COST_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"LEAVE_COST_PER_MEMBER",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MAX_ALLIANCE_NAME",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"MAX_MEMBERS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOTEM_BONUS_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOTEM_COST_BASE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOTEM_COST_SCALE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOTEM_DONATION_MIN_DIVISOR",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"TOTEM_DONATION_TIMEOUT",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"allianceIndex",inputs:[{name:"",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"allianceList",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"bytes32",internalType:"bytes32"}],stateMutability:"view"},{type:"function",name:"allianceMembers",inputs:[{name:"",type:"bytes32",internalType:"bytes32"},{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"alliances",inputs:[{name:"",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"name",type:"string",internalType:"string"},{name:"leader",type:"address",internalType:"address"},{name:"level",type:"uint256",internalType:"uint256"},{name:"memberCount",type:"uint256",internalType:"uint256"},{name:"createdAt",type:"uint256",internalType:"uint256"},{name:"exists",type:"bool",internalType:"bool"},{name:"totemLevel",type:"uint256",internalType:"uint256"},{name:"totemEnergy",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"claimLeaveRefund",inputs:[{name:"",type:"bytes32",internalType:"bytes32"}],outputs:[],stateMutability:"pure"},{type:"function",name:"claimRefund",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"claimedLeaveRefund",inputs:[{name:"",type:"bytes32",internalType:"bytes32"},{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"createAlliance",inputs:[{name:"name",type:"string",internalType:"string"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"disbandAlliance",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"gameContract",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"getAllianceList",inputs:[],outputs:[{name:"",type:"bytes32[]",internalType:"bytes32[]"}],stateMutability:"view"},{type:"function",name:"getAllianceMembers",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"address[]",internalType:"address[]"}],stateMutability:"view"},{type:"function",name:"getLeaveCooldownRemaining",inputs:[{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getMemberCount",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getTotemLevel",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"isDonationActive",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"},{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"isLeader",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"},{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"isLeaveCooldownBlocked",inputs:[{name:"attacker",type:"address",internalType:"address"},{name:"defender",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"joinAlliance",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"kickMember",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"},{name:"member",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"lastLeaver",inputs:[{name:"",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"leaveAlliance",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"leavePenaltyPool",inputs:[{name:"",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"leaveRefundPerMember",inputs:[{name:"",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"memberInfo",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"player",type:"address",internalType:"address"},{name:"joinedAt",type:"uint256",internalType:"uint256"},{name:"contribution",type:"uint256",internalType:"uint256"},{name:"isOnline",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"memberLastDonation",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"pendingRefunds",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"playerAlliance",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bytes32",internalType:"bytes32"}],stateMutability:"view"},{type:"function",name:"recentLeftAlliance",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bytes32",internalType:"bytes32"}],stateMutability:"view"},{type:"function",name:"recentLeftTime",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"recordTotemDonation",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"},{name:"donor",type:"address",internalType:"address"},{name:"energyAmount",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"sesToken",inputs:[],outputs:[{name:"",type:"address",internalType:"contract IERC20"}],stateMutability:"view"},{type:"function",name:"setGameContract",inputs:[{name:"_gameContract",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setSESToken",inputs:[{name:"_tokenAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"totemUpgradeCost",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"transferLeadership",inputs:[{name:"id",type:"bytes32",internalType:"bytes32"},{name:"newLeader",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"upgradeTotem",inputs:[{name:"allianceId",type:"bytes32",internalType:"bytes32"}],outputs:[],stateMutability:"nonpayable"},{type:"event",name:"AllianceCreated",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"},{name:"name",type:"string",indexed:!1,internalType:"string"},{name:"leader",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"AllianceDisbanded",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"}],anonymous:!1},{type:"event",name:"MemberJoined",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"},{name:"player",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"MemberKicked",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"},{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"kickedBy",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"event",name:"MemberLeft",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"},{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"penalty",type:"uint256",indexed:!1,internalType:"uint256"},{name:"refundPerMember",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"SESTokenSet",inputs:[{name:"token",type:"address",indexed:!1,internalType:"address"}],anonymous:!1},{type:"event",name:"TotemDonated",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"},{name:"donor",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"TotemUpgraded",inputs:[{name:"allianceId",type:"bytes32",indexed:!0,internalType:"bytes32"},{name:"newLevel",type:"uint256",indexed:!1,internalType:"uint256"},{name:"cost",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"error",name:"AL_AlreadyExists",inputs:[]},{type:"error",name:"AL_AlreadyInAlliance",inputs:[]},{type:"error",name:"AL_CannotKickSelf",inputs:[]},{type:"error",name:"AL_Full",inputs:[]},{type:"error",name:"AL_InvalidName",inputs:[]},{type:"error",name:"AL_LastMember",inputs:[]},{type:"error",name:"AL_NoRefund",inputs:[]},{type:"error",name:"AL_NotAuthorized",inputs:[]},{type:"error",name:"AL_NotEnoughDonations",inputs:[]},{type:"error",name:"AL_NotEnoughEnergy",inputs:[]},{type:"error",name:"AL_NotFound",inputs:[]},{type:"error",name:"AL_NotLeader",inputs:[]},{type:"error",name:"AL_NotMember",inputs:[]},{type:"error",name:"AL_TokenNotSet",inputs:[]},{type:"error",name:"AL_UseClaimRefund",inputs:[]},{type:"error",name:"AL_ZeroAddress",inputs:[]},{type:"error",name:"SafeERC20FailedOperation",inputs:[{name:"token",type:"address",internalType:"address"}]}],Ea=[{type:"constructor",inputs:[{name:"_sesToken",type:"address",internalType:"address"},{name:"_gameContract",type:"address",internalType:"address"},{name:"_genesisTimestamp",type:"uint256",internalType:"uint256"}],stateMutability:"nonpayable"},{type:"receive",stateMutability:"payable"},{type:"function",name:"DAILY_EMISSION",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"DAY_SECONDS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"claim",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"currentEpoch",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"distribute",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"epochClaimed",inputs:[{name:"",type:"uint256",internalType:"uint256"},{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"epochPlayerCount",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"epochRewardPerPlayer",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"gameContract",inputs:[],outputs:[{name:"",type:"address",internalType:"contract IGameContract"}],stateMutability:"view"},{type:"function",name:"genesisTimestamp",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getEpochInfo",inputs:[{name:"epoch",type:"uint256",internalType:"uint256"}],outputs:[{name:"playerCount",type:"uint256",internalType:"uint256"},{name:"perPlayer",type:"uint256",internalType:"uint256"},{name:"distributed",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"hasClaimed",inputs:[{name:"epoch",type:"uint256",internalType:"uint256"},{name:"player",type:"address",internalType:"address"}],outputs:[{name:"",type:"bool",internalType:"bool"}],stateMutability:"view"},{type:"function",name:"lastDistributedEpoch",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"owner",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"renounceOwnership",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"rescueEth",inputs:[{name:"to",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"sesToken",inputs:[],outputs:[{name:"",type:"address",internalType:"contract SilentExpanseStrifeToken"}],stateMutability:"view"},{type:"function",name:"setGameContract",inputs:[{name:"_gameAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"setSESToken",inputs:[{name:"_newTokenAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"transferOwnership",inputs:[{name:"newOwner",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"event",name:"Claimed",inputs:[{name:"epoch",type:"uint256",indexed:!0,internalType:"uint256"},{name:"player",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"Distributed",inputs:[{name:"epoch",type:"uint256",indexed:!0,internalType:"uint256"},{name:"totalAmount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"playerCount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"perPlayer",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"OwnershipTransferred",inputs:[{name:"previousOwner",type:"address",indexed:!0,internalType:"address"},{name:"newOwner",type:"address",indexed:!0,internalType:"address"}],anonymous:!1},{type:"error",name:"DM_AlreadyClaimed",inputs:[]},{type:"error",name:"DM_AlreadyDistributed",inputs:[]},{type:"error",name:"DM_EpochExpired",inputs:[]},{type:"error",name:"DM_EthNotAccepted",inputs:[]},{type:"error",name:"DM_NoActivePlayers",inputs:[]},{type:"error",name:"DM_NoEthToRescue",inputs:[]},{type:"error",name:"DM_NoReward",inputs:[]},{type:"error",name:"DM_NotActive",inputs:[]},{type:"error",name:"DM_NotDistributedYet",inputs:[]},{type:"error",name:"DM_TooEarly",inputs:[]},{type:"error",name:"DM_ZeroAddress",inputs:[]},{type:"error",name:"OwnableInvalidOwner",inputs:[{name:"owner",type:"address",internalType:"address"}]},{type:"error",name:"OwnableUnauthorizedAccount",inputs:[{name:"account",type:"address",internalType:"address"}]},{type:"error",name:"SafeERC20FailedOperation",inputs:[{name:"token",type:"address",internalType:"address"}]}],ka=[{type:"constructor",inputs:[{name:"_game",type:"address",internalType:"address"},{name:"_ses",type:"address",internalType:"address"}],stateMutability:"nonpayable"},{type:"function",name:"MAX_SWEEP_DEPTH",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"NUM_BUCKETS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"ORDER_DELAY",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"PRICE_SCALE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"SES_FEE_BPS",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"USER_HISTORY_SIZE",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"accruedSesFees",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"amendBidPrice",inputs:[{name:"bidId",type:"uint256",internalType:"uint256"},{name:"newSesPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"amendOrderPrice",inputs:[{name:"orderId",type:"uint256",internalType:"uint256"},{name:"newSesPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"askBucketCount",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"bidBucketCount",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"bidOrders",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"buyer",type:"address",internalType:"address"},{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"remaining",type:"uint256",internalType:"uint256"},{name:"sesPrice",type:"uint256",internalType:"uint256"},{name:"bucketId",type:"uint256",internalType:"uint256"},{name:"createdAt",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"buyEnergy",inputs:[{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"maxUnitPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"cancelBidOrder",inputs:[{name:"bidId",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"cancelOrder",inputs:[{name:"orderId",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"createBidOrder",inputs:[{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"sesPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"createOrder",inputs:[{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"sesPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"feeRecipient",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"fillBidOrder",inputs:[{name:"bidId",type:"uint256",internalType:"uint256"},{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"minUnitPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"fillOrder",inputs:[{name:"orderId",type:"uint256",internalType:"uint256"},{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"maxUnitPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"firstAskBucket",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"game",inputs:[],outputs:[{name:"",type:"address",internalType:"contract ISilentExpanseStrifeEnergy"}],stateMutability:"view"},{type:"function",name:"getActiveBids",inputs:[{name:"offset",type:"uint256",internalType:"uint256"},{name:"limit",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"tuple[]",internalType:"struct EnergyMarket.BidOrder[]",components:[{name:"buyer",type:"address",internalType:"address"},{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"remaining",type:"uint256",internalType:"uint256"},{name:"sesPrice",type:"uint256",internalType:"uint256"},{name:"bucketId",type:"uint256",internalType:"uint256"},{name:"createdAt",type:"uint256",internalType:"uint256"}]}],stateMutability:"view"},{type:"function",name:"getActiveOrders",inputs:[{name:"offset",type:"uint256",internalType:"uint256"},{name:"limit",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"tuple[]",internalType:"struct EnergyMarket.Order[]",components:[{name:"seller",type:"address",internalType:"address"},{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"remaining",type:"uint256",internalType:"uint256"},{name:"sesPrice",type:"uint256",internalType:"uint256"},{name:"bucketId",type:"uint256",internalType:"uint256"},{name:"createdAt",type:"uint256",internalType:"uint256"}]}],stateMutability:"view"},{type:"function",name:"getBestAsk",inputs:[],outputs:[{name:"unitPrice",type:"uint256",internalType:"uint256"},{name:"remaining",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getBestBid",inputs:[],outputs:[{name:"unitPrice",type:"uint256",internalType:"uint256"},{name:"remaining",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getBidCount",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getBidsByBuyer",inputs:[{name:"buyer",type:"address",internalType:"address"}],outputs:[{name:"ids",type:"uint256[]",internalType:"uint256[]"}],stateMutability:"view"},{type:"function",name:"getOrderCount",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getOrdersBySeller",inputs:[{name:"seller",type:"address",internalType:"address"}],outputs:[{name:"ids",type:"uint256[]",internalType:"uint256[]"}],stateMutability:"view"},{type:"function",name:"getUserBidHistory",inputs:[{name:"user",type:"address",internalType:"address"}],outputs:[{name:"ids",type:"uint256[50]",internalType:"uint256[50]"},{name:"count",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"getUserOrderHistory",inputs:[{name:"user",type:"address",internalType:"address"}],outputs:[{name:"ids",type:"uint256[50]",internalType:"uint256[50]"},{name:"count",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"lastBidBucket",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"marketDeployer",inputs:[],outputs:[{name:"",type:"address",internalType:"address"}],stateMutability:"view"},{type:"function",name:"nextBidId",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"nextOrderId",inputs:[],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"orders",inputs:[{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"seller",type:"address",internalType:"address"},{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"remaining",type:"uint256",internalType:"uint256"},{name:"sesPrice",type:"uint256",internalType:"uint256"},{name:"bucketId",type:"uint256",internalType:"uint256"},{name:"createdAt",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"sellEnergy",inputs:[{name:"energyAmount",type:"uint256",internalType:"uint256"},{name:"minUnitPrice",type:"uint256",internalType:"uint256"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"ses",inputs:[],outputs:[{name:"",type:"address",internalType:"contract IERC20"}],stateMutability:"view"},{type:"function",name:"setFeeRecipient",inputs:[{name:"_feeRecipientAddress",type:"address",internalType:"address"}],outputs:[],stateMutability:"nonpayable"},{type:"function",name:"userBidHistory",inputs:[{name:"",type:"address",internalType:"address"},{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"userBidHistoryCursor",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"userOrderHistory",inputs:[{name:"",type:"address",internalType:"address"},{name:"",type:"uint256",internalType:"uint256"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"userOrderHistoryCursor",inputs:[{name:"",type:"address",internalType:"address"}],outputs:[{name:"",type:"uint256",internalType:"uint256"}],stateMutability:"view"},{type:"function",name:"withdrawSesFees",inputs:[],outputs:[],stateMutability:"nonpayable"},{type:"event",name:"BidAmended",inputs:[{name:"bidId",type:"uint256",indexed:!0,internalType:"uint256"},{name:"buyer",type:"address",indexed:!0,internalType:"address"},{name:"oldPrice",type:"uint256",indexed:!1,internalType:"uint256"},{name:"newPrice",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"BidCancelled",inputs:[{name:"bidId",type:"uint256",indexed:!0,internalType:"uint256"}],anonymous:!1},{type:"event",name:"BidCreated",inputs:[{name:"bidId",type:"uint256",indexed:!0,internalType:"uint256"},{name:"buyer",type:"address",indexed:!0,internalType:"address"},{name:"energyAmount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesPrice",type:"uint256",indexed:!1,internalType:"uint256"},{name:"unitPrice",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"BidFilled",inputs:[{name:"bidId",type:"uint256",indexed:!0,internalType:"uint256"},{name:"seller",type:"address",indexed:!0,internalType:"address"},{name:"buyer",type:"address",indexed:!0,internalType:"address"},{name:"energyTransferred",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesPaid",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesFee",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"FeesWithdrawn",inputs:[{name:"to",type:"address",indexed:!0,internalType:"address"},{name:"amount",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"OrderAmended",inputs:[{name:"orderId",type:"uint256",indexed:!0,internalType:"uint256"},{name:"seller",type:"address",indexed:!0,internalType:"address"},{name:"oldPrice",type:"uint256",indexed:!1,internalType:"uint256"},{name:"newPrice",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"OrderCancelled",inputs:[{name:"orderId",type:"uint256",indexed:!0,internalType:"uint256"}],anonymous:!1},{type:"event",name:"OrderCreated",inputs:[{name:"orderId",type:"uint256",indexed:!0,internalType:"uint256"},{name:"seller",type:"address",indexed:!0,internalType:"address"},{name:"energyAmount",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesPrice",type:"uint256",indexed:!1,internalType:"uint256"},{name:"unitPrice",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"event",name:"OrderFilled",inputs:[{name:"orderId",type:"uint256",indexed:!0,internalType:"uint256"},{name:"buyer",type:"address",indexed:!0,internalType:"address"},{name:"seller",type:"address",indexed:!0,internalType:"address"},{name:"energyTransferred",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesPaid",type:"uint256",indexed:!1,internalType:"uint256"},{name:"sesFee",type:"uint256",indexed:!1,internalType:"uint256"}],anonymous:!1},{type:"error",name:"EM_AlreadyInactive",inputs:[]},{type:"error",name:"EM_FeeRecipientUnset",inputs:[]},{type:"error",name:"EM_InactiveBid",inputs:[]},{type:"error",name:"EM_InactiveOrder",inputs:[]},{type:"error",name:"EM_InvalidAmount",inputs:[]},{type:"error",name:"EM_NoFees",inputs:[]},{type:"error",name:"EM_NoLiquidity",inputs:[]},{type:"error",name:"EM_NotBuyer",inputs:[]},{type:"error",name:"EM_NotDeployer",inputs:[]},{type:"error",name:"EM_NotSeller",inputs:[]},{type:"error",name:"EM_PriceTooHigh",inputs:[]},{type:"error",name:"EM_PriceTooLow",inputs:[]},{type:"error",name:"EM_SelfFill",inputs:[]},{type:"error",name:"EM_SweepLimit",inputs:[]},{type:"error",name:"EM_TooEarly",inputs:[]},{type:"error",name:"EM_ZeroAddress",inputs:[]},{type:"error",name:"EM_ZeroEnergy",inputs:[]},{type:"error",name:"EM_ZeroPrice",inputs:[]},{type:"error",name:"ReentrancyGuardReentrantCall",inputs:[]},{type:"error",name:"SafeERC20FailedOperation",inputs:[{name:"token",type:"address",internalType:"address"}]}],Ca=wa,ja=Ta,Aa=Sa,Ma=Ea,We=ka;function ze(){return{provider:null,signer:null,game:null,sesToken:null,alliance:null,dailyMinter:null,isReady:!1,contractUnavailable:!0,error:null}}let jn=null,An=null,be=null,Ve=null;async function Rt(){return be||Ve||(Ve=(async()=>{try{if(!window.ethereum)return be={...ze(),isReady:!0,contractUnavailable:!0},be;const e=new sa(window.ethereum);jn=e;let a=null;try{a=await e.getSigner(),An=a}catch(c){console.warn("[useContract] signer unavailable, read-only mode:",c)}return!!le.SILENT_EXPANSE&&!!le.SES_TOKEN&&!!le.ALLIANCE?a?(be={provider:e,signer:a,game:new ke(le.SILENT_EXPANSE,Ca,a),sesToken:new ke(le.SES_TOKEN,ja,a),alliance:new ke(le.ALLIANCE,Aa,a),dailyMinter:le.DAILY_MINTER?new ke(le.DAILY_MINTER,Ma,a):null,isReady:!0,contractUnavailable:!1,error:null},be):(be={...ze(),isReady:!0,contractUnavailable:!0,error:"Wallet not connected"},be):(be={...ze(),isReady:!0,contractUnavailable:!0},be)}catch(e){return be={...ze(),isReady:!0,error:e instanceof Error?e.message:String(e)},be}})(),Ve)}function Yt(){be=null,jn=null,An=null,Ve=null}let Gt=!1;const It=new Set;function vt(){be&&It.forEach(e=>e(be))}function Na(){var i;if(Gt||typeof window>"u")return;Gt=!0;const e=c=>{if(Yt(),!Array.isArray(c)||c.length===0){be=ze(),vt();return}Rt().then(()=>vt())},a=()=>{Yt(),Rt().then(()=>vt())};(i=window.ethereum)!=null&&i.on&&(window.ethereum.on("accountsChanged",e),window.ethereum.on("chainChanged",a))}function we(){const[e,a]=m.useState(ze);return m.useEffect(()=>{let i=!1;const c=l=>{!i&&l&&a(l)};return It.add(c),Rt().then(c),Na(),()=>{i=!0,It.delete(c)}},[]),e}const Kt="0xcA11bde05977b3631167028862bE2a173976CA11",$a=["function aggregate3((address target, bool allowFailure, bytes callData)[] calls) view returns ((bool success, bytes returnData)[] returnData)"];async function La(e,a,i){if(i===0)return[];try{const c=new oa(We),l=new ke(Kt,$a,e),p=await e.getCode(Kt);if(!p||p==="0x")return null;const h=60,b=[];for(let u=0;u<i;u+=h){const o=Math.min(h,i-u),S=Array.from({length:o},(A,P)=>{const T=u+P;return{target:a,allowFailure:!0,callData:c.encodeFunctionData("orders",[T])}}),k=await l.aggregate3(S);for(let A=0;A<k.length;A++){const P=k[A];if(!P.success||P.returnData==="0x"){b.push(null);continue}try{const T=c.decodeFunctionResult("orders",P.returnData);b.push(T)}catch{b.push(null)}}}return b}catch{return null}}const wt={};function Ra(){const e=we(),a=r(c=>c.connected),i=r(c=>c.address);return Xe({queryKey:["civPolling",i],queryFn:async()=>{var c,l,p;if(!a||!i||!e.game||!e.sesToken)return null;try{const h=e.game,b=e.sesToken,[u,o,S,k,A,P,T,I,B,V,W,v,M,J,z,U]=await Promise.allSettled([h.getCivilization(i),b.balanceOf(i),h.getAttackTokenInfo(i),h.pendingCombatEnergy(i),Promise.allSettled([h.getCurrentShieldHP(i),h.getMaxShieldHP(i)]),h.getEnergyCollectRate(i),h.getCollectorDurability(i),h.getCombatBoost(i),h.getPendingEnergy(i),h.getShieldDefense(i),h.getSpeed(i),h.getRadarRange(i),h.getAttackPower(i),h.getAttackEnergyCost(i),h.getCurrentPosition(i),h.getBattleHistory?h.getBattleHistory(0,20).catch(()=>[]):Promise.resolve([])]),E={};let H=null,Y=null,N=null,x=null,X=null;if(u.status==="fulfilled"){const C=u.value;X={name:String(C.name??""),x:Number(C.x??((c=C.location)==null?void 0:c.x)??0),y:Number(C.y??((l=C.location)==null?void 0:l.y)??0),z:Number(C.z??((p=C.location)==null?void 0:p.z)??0),energy:Number(C.energy??0),health:Number(C.health??0),shieldHP:0,maxShieldHP:0,energyCollectorLv:Number(C.energyCollectorLv??1),weaponLv:Number(C.weaponLv??1),radarLv:Number(C.radarLv??1),shieldLv:Number(C.shieldLv??1),engineLv:Number(C.engineLv??1),scanRange:Number(C.scanRange??1e3),isRuins:!!(C.isRuins??!1),isMoving:!1},E.playerCiv=X,E.isDestroyed=!!(C.isRuins??!1);const K=C.lastUpdateTime;E.lastCollectTime=K?Number(K)*1e3:Date.now()}if(o.status==="fulfilled"){const C=Je(o.value);E.sesBalance=parseFloat(C).toFixed(2)}if(S.status==="fulfilled"){const C=S.value,K=C.ratePerSec??C[3]??0n;E.attackTokens={current:Number(C.current??C[0]??0),max:Number(C.max??C[1]??5),intervalSec:Number(C.intervalSec??C[2]??60),ratePerSec:Number(K)/1e18}}if(k.status==="fulfilled"&&(E.pendingEnergy=Number(k.value)),A.status==="fulfilled"){const[C,K]=A.value;C.status==="fulfilled"&&K.status==="fulfilled"&&(H=Number(C.value),Y=Number(K.value))}if(P.status==="fulfilled"&&(E.collectRate=Number(P.value)/1e6),T.status==="fulfilled"){const C=T.value;E.collectorDurability={current:Number(C[0]),max:Number(C[1])}}if(z.status==="fulfilled"){const C=z.value;N=!!(C[1]??C.isMoving??!1),x=Number(C[2]??C.eta??0)}if(I.status==="fulfilled"&&(E.combatBoost=Number(I.value)),B.status==="fulfilled"&&(E.pendingCollect=Number(B.value)),V.status==="fulfilled"&&(E.shieldDefense=Number(V.value)),W.status==="fulfilled"&&(E.speed=Number(W.value)),v.status==="fulfilled"&&(E.radarRange=Number(v.value)),M.status==="fulfilled"&&(E.attackPower=Number(M.value)),J.status==="fulfilled"&&(E.attackEnergyCost=Number(J.value)),U.status==="fulfilled"){const K=(U.value??[]).map(f=>{const d=f;return{attacker:String(d.attacker??""),defender:String(d.defender??""),timestamp:Number(d.timestamp??0),damageDealt:Number(d.damageDealt??0),shieldDamage:Number(d.shieldDamage??d.shieldDmg??0),healthDamage:Number(d.healthDamage??d.healthDmg??0),stolenEnergy:Number(d.stolenEnergy??0),downgradedSystem:String(d.downgradedSystem??""),won:!!(d.attackerWon??d.won??!1)}}).filter(f=>f.attacker&&f.defender);if(K.length>0){const f=r.getState().battleLog.length;if(E.battleLog=K,E.battleCount=K.length,f>0&&K.length>f){const d=i.toLowerCase(),y=K.slice(0,K.length-f);for(const g of y)if(g.defender.toLowerCase()===d){setTimeout(()=>{const R=g.attacker.slice(0,6)+"..."+g.attacker.slice(-4);r.getState().addToast(`${R} 攻击了你，掠夺 ${g.stolenEnergy} 能量`,"error")},0);break}}}}if(X!==null)H!==null&&Y!==null&&(X.shieldHP=H,X.maxShieldHP=Y),N!==null&&(X.isMoving=N),E.playerCiv=X,E.moveEta=x??0;else if(H!==null||Y!==null||N!==null){const C=r.getState().playerCiv;if(C){const K={...C};H!==null&&(K.shieldHP=H),Y!==null&&(K.maxShieldHP=Y),N!==null&&(K.isMoving=N),E.playerCiv=K}x!==null&&(E.moveEta=x)}if(E.lastSyncAt=Date.now(),r.setState(E),e.dailyMinter){const[C,K,f]=await Promise.allSettled([e.dailyMinter.currentEpoch(),e.dailyMinter.lastDistributedEpoch(),e.dailyMinter.DAILY_EMISSION()]);if(f.status==="fulfilled"&&r.setState({dailyEmission:Number(f.value)/1e18}),C.status==="fulfilled"){const d=Number(C.value),[y,g,R]=await Promise.allSettled([e.dailyMinter.genesisTimestamp(),e.dailyMinter.DAY_SECONDS(),e.dailyMinter.epochClaimed(d,i)]),O=y.status==="fulfilled"?Number(y.value):0,_=g.status==="fulfilled"?Number(g.value):86400;r.setState({currentEpoch:d,lastDistributedEpoch:K.status==="fulfilled"?Number(K.value):0,epochStartTime:O+(d-1)*_,epochEndTime:O+d*_,epochClaimed:R.status==="fulfilled"?R.value:!1})}}return{timestamp:Date.now()}}catch(h){const b=h,u=String((b==null?void 0:b.message)||h||"");let o="unknown";u.includes("Failed to fetch")||u.includes("NetworkError")||u.includes("ERR_NETWORK")?o="network":u.includes("CALL_EXCEPTION")||u.includes("missing revert data")?o="contract":u.includes("nonce too low")||u.includes("already known")?o="nonce":u.includes("timeout")&&(o="timeout"),wt[o]=(wt[o]||0)+1;const S=wt[o];return S<=2?console.warn(`[civPolling] ${o} failure #${S}:`,(b==null?void 0:b.message)||h):(S===10||S%50===0)&&console.warn(`[civPolling] ${o}: ${S} consecutive failures`),null}},refetchInterval:5e3,refetchIntervalInBackground:!1,enabled:a&&!!i&&!!e.game&&!!e.sesToken,meta:{isBackground:!0}})}function Ia(){const e=we(),a=r(c=>c.connected),i=r(c=>c.address);return Xe({queryKey:["alliancePolling",i],queryFn:async()=>{if(!a||!i||!e.alliance)return null;try{const c=await e.alliance.playerAlliance(i);if(!(c&&c!=="0x"+"00".repeat(32)))return r.setState({currentAlliance:null}),{inAlliance:!1};const[p,h,b,u,o]=await Promise.all([e.alliance.alliances(c),e.alliance.getAllianceMembers(c),e.alliance.totemUpgradeCost(c),e.alliance.isLeader(c,i),e.alliance.pendingRefunds(i)]);return r.setState({currentAlliance:{id:c,name:String(p.name??""),memberCount:Number(p.memberCount??p[3]??0),level:Number(p.level??p[2]??1)},_allianceMembers:h.slice(0,20),_allianceTotemLevel:Number(p.totemLevel??p[6]??0),_allianceTotemEnergy:Number(p.totemEnergy??p[7]??0),_allianceTotemUpgradeCost:Number(b),_allianceIsLeader:u,_allianceLeader:String(p.leader??p[1]??""),_alliancePendingRefund:Number(o)}),{inAlliance:!0}}catch{return null}},refetchInterval:1e4,refetchIntervalInBackground:!1,enabled:a&&!!i&&!!e.alliance})}function Pa(){const e=we(),a=r(i=>i.address);return Xe({queryKey:["marketPolling"],queryFn:async()=>{if(!le.ENERGY_MARKET||!e.provider)return null;try{const i=new ke(le.ENERGY_MARKET,We,e.provider),c=Number(await i.getOrderCount()),l=Math.min(c,200),p=[],h=(a||"").toLowerCase();let b=await La(e.provider,le.ENERGY_MARKET,l);if(b)for(let u=0;u<b.length;u++){const o=b[u];if(!o)continue;const S=Number(o.remaining??o[3]??0);if(S<=0)continue;const k=o.seller??o[1]??"",A=typeof k=="string"?k.toLowerCase():"";if(!A)continue;const P=Number(o.energyAmount??o[0]??0),T=Number(o.sesPrice??o[2]??0);p.push({id:u,amount:P,remaining:S,price:Number(T)/1e18/Math.max(P,1),seller:A.slice(0,6)+"..."+A.slice(-4),isMine:A===h})}else for(let u=0;u<l;u++)try{const o=await i.orders(u),S=Number(o.remaining??0);if(S<=0)continue;const k=typeof o.seller=="string"?o.seller.toLowerCase():"";if(!k)continue;const A=Number(o.energyAmount??0),P=Number(o.sesPrice??0);p.push({id:u,amount:A,remaining:S,price:Number(P)/1e18/Math.max(A,1),seller:k.slice(0,6)+"..."+k.slice(-4),isMine:k===h})}catch{}return r.setState({marketOrders:p}),{count:p.length}}catch{return null}},refetchInterval:15e3,refetchIntervalInBackground:!1,enabled:!!le.ENERGY_MARKET&&!!e.provider})}function Ba(){return Ra(),Ia(),Pa(),null}const Da=new Zn({defaultOptions:{queries:{refetchOnWindowFocus:!1,retry:1,staleTime:1e4}}}),Oa=["https://bsc-dataseed1.binance.org","https://bsc-dataseed2.binance.org","https://bsc-dataseed3.binance.org","https://bsc-dataseed4.binance.org","https://bsc-dataseed1.defibit.io","https://bsc-dataseed2.defibit.io"],za=ta({chains:[zt],connectors:[aa()],transports:{[zt.id]:na(Oa.map(e=>pa(e)))}}),Fa={...ht(),colors:{...ht().colors,accentColor:"#00D4AA",accentColorForeground:"#0A0E17",actionButtonBorder:"#1E2A45",actionButtonBorderMobile:"#1E2A45",actionButtonSecondaryBackground:"#131A2B",closeButton:"#8892A8",closeButtonBackground:"#131A2B",connectButtonBackground:"#131A2B",connectButtonBackgroundError:"#FF4757",connectButtonInnerBackground:"#131A2B",connectButtonText:"#E8EDF5",connectButtonTextError:"#FFFFFF",connectionIndicator:"#00D4AA",downloadBottomCardBackground:"#131A2B",downloadTopCardBackground:"#131A2B",error:"#FF4757",generalBorder:"#1E2A45",generalBorderDim:"#1E2A45",menuItemBackground:"#131A2B",modalBackdrop:"rgba(0,0,0,0.7)",modalBackground:"#0A0E17",modalBorder:"#1E2A45",modalText:"#E8EDF5",modalTextDim:"#8892A8",modalTextSecondary:"#8892A8",profileAction:"#131A2B",profileActionHover:"#1E2A45",profileForeground:"#0A0E17",selectedOptionBorder:"#00D4AA",standby:"#FFD93D"},fonts:{body:"'JetBrains Mono','Courier New',monospace"},radii:{...ht().radii,actionButton:"6px",connectButton:"6px",menuButton:"6px",modal:"10px",modalMobile:"10px"}};function Ha({children:e}){return t.jsx(Qn,{client:Da,children:t.jsx(ia,{config:za,children:t.jsx(da,{theme:Fa,modalSize:"compact",children:e})})})}function Ua(e){const[a,i]=m.useState(()=>typeof window<"u"?window.matchMedia(e).matches:!1);return m.useEffect(()=>{const c=window.matchMedia(e),l=p=>i(p.matches);return c.addEventListener("change",l),()=>c.removeEventListener("change",l)},[e]),a}function Ue(){return Ua("(max-width: 767px)")}const Mn={"nav.overview":"总览","nav.actions":"操作","nav.combat":"追踪作战","nav.tech":"系统编译","nav.alliance":"契约联盟","nav.market":"星火市场","nav.leaderboard":"纪元评分榜","nav.links":"友情链接","nav.wallet":"钱包","nav.copy_addr":"复制地址","toast.copied":"已复制","nav.disconnect":"断开连接","lore.splash_title":"沉寂引擎已启动","lore.splash_line1":"先驱者已去。","lore.splash_line2":"最后的文明将继承一切。","lore.protocol_intro":`Strife Protocol：每纪元（≈24h），综合评分最低的竞争者将被沉寂。
注入星火（SES），注册为竞争者。开始你的试炼。`,"lore.splash_btn":"注入星火，加入试炼","lore.footer_quote":"引擎不审判你。它只是读你的代码，然后告诉你：还不够。","lore.engine_status":"沉寂引擎 · 运行中","lore.competitors":"活跃竞争者","lore.silence_count":"已沉寂","lore.epoch_label":"当前纪元","connect.title":"寂灭星河：纷争","connect.subtitle":"— SILENT EXPANSE: STRIFE —","connect.fee_label":"创建费用","connect.fee_hint":"费用随时间线性增长 (0.01 → 0.05 BNB)","connect.pay":"支付 {fee} BNB 创建文明","connect.wallet_connect":"连接钱包","connect.wallet_connecting":"连接中…","connect.no_wallet":"未检测到钱包，请安装 MetaMask","connect.civ_name":"文明名称（1-32 字符）","connect.referrer":"邀请人地址（选填）","connect.referral_bonus":"双方各得 150 能量 + 永久 0.2% 采集加成","connect.tutorial":"新手指南","connect.lang_switch":"EN","connect.name_required":"请输入文明名称","connect.name_too_long":"名称不超过 32 个字符","connect.wallet_required":"请先连接钱包","connect.bad_referrer":"邀请人地址格式不正确","connect.ready_connect":"请点击下方按钮连接钱包","connect.detecting_wallet":"正在检测钱包…","connect.loading_contract":"正在加载合约…","connect.checking_civ":"正在检查文明…","hud.title":"文明状态","hud.location":"当前坐标","hud.combat_res":"追踪资源","hud.attack_token":"追踪次数","hud.pending_energy":"待领能量","hud.tech_systems":"引擎系统","hud.collect_rate":"汲取速率","hud.durability":"耐久","hud.attack_power":"攻击力","hud.shield_hp":"沉寂护盾值","hud.defense":"防御力","hud.scan_range":"探测范围","hud.speed":"跃迁速度","hud.energy":"遗迹能量","hud.health":"文明生命","hud.shield":"沉寂护盾","hud.ses":"星火·SES","hud.attack_token_label":"追踪次数","hud.combat_boost":"跃迁加成","hud.totem_bonus":"契约图腾","hud.pending_label":"待领取","hud.pending_type":"追踪战能","hud.destroyed_title":"文明已被摧毁","hud.destroyed_desc":"你的文明化为废墟。使用 SES 重建。","hud.destroyed_btn":"重建文明","hud.rebuild_cost":"重建消耗大量能量（随重生次数递增）","hud.durability_warn":"采集器耐久 {pct}%","hud.durability_repair":"修复","hud.cost":"消耗","hud.cooldown":"冷却","hud.confirm_attack":"确认攻击","hud.confirm_upgrade":"确认升级","hud.cancel":"取消","hud.target":"目标","hud.in_range":"范围内","hud.out_of_range":"超出范围","hud.error_dismiss":"{msg}（点击关闭）","hud.loading_upgrade":"升级中…","ses.claim":"领取 SES","ses.claimed":"已领取","action.title":"操作","action.ses_balance":"SES 余额","action.collect_rate":"采集速率","action.daily_est":"日发放量","action.collect":"采集能量","action.combat_energy":"战斗能量","action.combat_energy_empty":"空","action.claimed_today":"今日已领","action.distributing":"分发中…","action.distribute":"分发纪元","action.epoch_remaining":"{min}分{sec}秒","action.calculating":"计算中…","action.claim_ses":"领取每日 SES","action.group_collect":"资源生产","action.group_claim":"收益结算","action.group_move":"协议导航","action.group_repair":"系统维护","action.move_input":"导航坐标","action.move_confirm":"确认导航","action.move_invalid":"请输入正确的整数坐标","action.move_cancel":"取消","action.move":"协议导航","action.jump":"追踪跃迁","action.cancel_move":"取消导航","action.repair_shield":"修复沉寂护盾","action.regen_shield":"沉寂护盾再生","action.repair_all":"全系统编译修复","action.moving":"移动中","action.shield_full":"护盾已满","action.jump_confirm":"确认跃迁","action.jump_warn":"跃迁消耗能量与 SES，引擎耐久 -1；跃迁后护盾降至最大值 10% 并进入冷却。","combat.title":"追踪作战中心","combat.search_placeholder":"输入目标文明地址 0x…","combat.search_btn":"追踪扫描","combat.energy":"遗迹能量","combat.health":"文明生命","combat.weapon_lv":"武器 Lv","combat.shield_lv":"沉寂护盾 Lv","combat.distance":"跃迁距离","combat.out_of_range_warn":"目标超出跃迁范围（{range} ls）","combat.attack_btn":"跃迁攻击 {name}","combat.attack_btn_idle":"请先扫描目标","combat.attack_no_energy":"能量不足，无法攻击","combat.attack_out_range":"目标超出攻击范围","combat.attack_in_cd":"跃迁冷却中，请等待","combat.attack_no_token":"追踪次数不足，请等待恢复","combat.attack_cooldown":"（跃迁冷却 {sec}s）","combat.attack_cost":"（{cost}⚡）","combat.confirm_attack":"确认跃迁攻击","combat.confirm_cost":"消耗: {cost} 遗迹能量","combat.confirm_target":"目标文明: {name}","combat.confirm_distance":"跃迁距离: {dist} ls","combat.confirm_cooldown":"引擎冷却: {sec}s","combat.scan_nearby":"雷达扫描附近目标","combat.scan_empty":"范围内无目标","combat.scan_found":"发现 {n} 个目标","combat.power_compare":"我方攻 {atk} vs 对方防 {def}","battle.title":"追踪日志","battle.empty":"暂无追踪记录","upgrade.title":"系统编译","upgrade.collector":"遗迹汲取器","upgrade.weapon":"武器系统","upgrade.shield":"沉寂护盾系统","upgrade.radar":"探测阵列","upgrade.engine":"跃迁引擎","upgrade.collect_rate":"采集速率","upgrade.attack_power":"攻击力","upgrade.defense":"防御力","upgrade.scan_range":"扫描范围","upgrade.speed":"航速","upgrade.cost":"消耗","upgrade.current":"当前","upgrade.after":"升级后","upgrade.gain":"提升","upgrade.recommend_badge":"推荐","upgrade.loading":"⟳ 读取升级数据…","upgrade.unavailable":"无法获取升级数据","upgrade.btn":"⬆ 升级","upgrade.insufficient":"SES 不足，无法升级","upgrade.best_value":"最佳性价比","upgrade.cost_label":"成本","alliance.title":"联盟","alliance.mine":"我的联盟","alliance.available":"可选联盟","alliance.create":"创建联盟","alliance.name":"联盟名称","alliance.join":"加入","alliance.leave":"退出","alliance.disband":"解散","alliance.members":"成员","alliance.people":"人","alliance.totem":"图腾","alliance.totem_pool":"能量池","alliance.totem_bonus_desc":"图腾加成：每盟友 +8 防御 × (1+图腾Lv×0.5%)","alliance.totem_bonus_value":"当前加成 +{val} 防御","alliance.totem_next_bonus":"升级后 +{val} 防御","alliance.donate":"捐献能量","alliance.donate_invalid":"请输入有效能量数量","alliance.totem_need_more":"能量池不足，无法升级图腾","alliance.upgrade_totem":"升级图腾","alliance.refund":"领取退款","alliance.you":"（你）","alliance.no_alliance":"暂无联盟","alliance.leader":"盟主","alliance.member":"成员","alliance.kick":"踢出","alliance.transfer":"转移","alliance.transfer_confirm":"将盟主转移给该成员？","alliance.refund_available":"有 {amt} SES 退款待领取","alliance.not_joined":"未加入联盟","alliance.switch_tab":"切换到「加入」标签查看可选联盟","alliance.level_members":"Lv.{lv} · {count}{unit}","market.title":"能量市场","market.sell_placeholder_energy":"能量数量","market.sell_placeholder_price":"SES 单价","market.sell_label_energy":"卖出能量","market.sell_label_price":"单价","market.sell_unit_price":"SES / ⚡","market.preview_receive":"预计获得","market.your_energy":"你的能量","market.insufficient_energy":"能量不足，无法挂单","market.sell_btn":"挂单卖出","market.buy_btn":"购买","market.cancel_btn":"撤单","market.empty":"暂无挂单","market.buy_no_ses":"SES 不足","market.order_energy":"{amt}⚡","market.order_price":"{price} SES","market.order_you":"（你）","market.energy":"能量","market.ses_balance":"SES 余额","market.create_order":"挂单卖出","market.active_orders":"当前挂单","leaderboard.title":"排行榜","leaderboard.loading":"⟳ 加载中…","leaderboard.empty":"暂无数据","leaderboard.col_rank":"#","leaderboard.col_player":"玩家","leaderboard.col_level":"等级","leaderboard.col_energy":"能量","leaderboard.player_level":"Lv.{lv}","leaderboard.rank":"排名","leaderboard.name":"名称","leaderboard.power":"能量","leaderboard.level":"等级","leaderboard.kills":"击杀","leaderboard.sort_power":"能量","leaderboard.sort_kills":"击杀","mobile.tab_overview":"状态","mobile.tab_actions":"操作","mobile.tab_combat":"作战","mobile.tab_market":"市场","mobile.tab_alliance":"联盟","page.overview":"文明总览","page.actions":"协议面板","page.combat":"追踪作战中心","page.tech":"系统编译","page.alliance":"契约联盟","page.market":"星火市场","page.leaderboard":"纪元评分榜","page.links":"友情链接","general.epoch":"纪元","general.next_epoch":"下个纪元","general.energy":"能量","general.health":"生命","general.loading":"处理中…","general.per_sec":"/s","general.per_hour":"/h","general.ls":"ls","general.ls_h":"ls/h","general.confirm":"确认","general.cancel":"取消","general.close":"关闭","general.creating":"正在创建文明，请确认 MetaMask 交易…","general.back":"← 返回上一步","toast.civ_created":"🌌 文明 {name} 创建成功！","toast.civ_create_failed":"创建文明失败: {msg}","toast.ses_insufficient":"SES 不足: 需要 {need} SES，当前 {have}","toast.energy_insufficient":"能量不足: 需要 {need}⚡，当前 {have}⚡","toast.upgrade_success":"{name} 升级成功！","toast.upgrade_failed":"升级失败: {msg}","toast.attack_energy":"能量不足: 需要 {cost}⚡","toast.attack_failed":"攻击失败: {msg}","toast.collect_success":"⚡ 采集能量 +{amount}","toast.collect_failed":"采集失败: {msg}","toast.claim_combat_success":"📦 战斗能量已领取","toast.claim_combat_failed":"领取失败: {msg}","toast.claim_ses_success":"📅 每日 SES 已领取！","toast.claim_ses_failed":"领取失败: {msg}","toast.move_success":"🚀 到达目标坐标","toast.move_failed":"移动失败: {msg}","toast.jump_success":"🌌 空间跳跃完成！","toast.jump_failed":"跳跃失败: {msg}","toast.rebuild_success":"🌱 文明已重建！","toast.rebuild_failed":"重建失败: {msg}","toast.repair_collector_success":"🔧 采集器已修复","toast.repair_collector_failed":"修复失败: {msg}","toast.repair_shield_success":"🛡️ 护盾已完全修复","toast.repair_shield_failed":"修复失败: {msg}","toast.regen_shield_success":"🛡️ 护盾再生中","toast.regen_shield_failed":"护盾再生失败: {msg}","toast.repair_all_success":"🔧 全系统已修复","toast.repair_all_failed":"修复失败: {msg}","toast.cancel_move_success":"⏹️ 移动已取消","toast.cancel_move_failed":"取消失败: {msg}","toast.alliance_created":"🏰 联盟创建成功！","toast.alliance_create_failed":"创建失败: {msg}","toast.refund_claimed":"💰 退款已领取","toast.refund_failed":"领取失败: {msg}","toast.alliance_joined":"🏰 已加入联盟！","toast.alliance_join_failed":"加入失败: {msg}","toast.alliance_left":"👋 已退出联盟","toast.alliance_leave_failed":"退出失败: {msg}","toast.leadership_transferred":"盟主已转移","toast.leadership_transfer_failed":"转移盟主失败: {msg}","toast.member_kicked":"👢 成员已踢出","toast.member_kick_failed":"踢出失败: {msg}","toast.alliance_disbanded":"🏰 联盟已解散","toast.alliance_disband_failed":"解散失败: {msg}","toast.donate_success":"🔶 图腾捐献成功！","toast.donate_failed":"捐献失败: {msg}","toast.totem_upgrade_success":"🔱 图腾升级成功！","toast.totem_upgrade_failed":"图腾升级失败: {msg}","toast.order_created":"📄 挂单成功（能量已锁定）","toast.order_failed":"挂单失败: {msg}","toast.order_filled":"🛒 买入成功","toast.order_fill_failed":"买入失败: {msg}","toast.order_cancelled":"❌ 撤单成功","toast.order_cancel_failed":"撤单失败: {msg}","toast.contract_unavailable":"{name} 合约不可用，请检查钱包连接","toast.wallet_disconnected":"钱包未连接","toast.attack_success":"攻击成功","toast.distribute_success":"分发成功！可以领取 SES 了","toast.energy_insufficient_short":"能量不足","err.unknown":"未知错误","err.insufficient_gas":"Gas 余额不足，无法支付手续费","err.network":"网络异常，请检查网络连接","err.nonce":"交易过期，请稍后重试","err.timeout":"请求超时，请稍后重试","err.call_failed":"合约调用失败，请稍后重试","err.e_already_civ":"文明已存在","err.e_already_claimed":"今日已领取","err.e_already_there":"已在目标坐标","err.e_civ_not_found":"文明不存在","err.e_durability_full":"耐久已满，无需修复","err.e_engine_worn":"引擎磨损，请先修复","err.e_invalid_name":"文明名称格式不正确","err.e_jump_cooldown":"跃迁冷却中，请稍后再试","err.e_leave_cooldown":"退出冷却中，请稍后再试","err.e_low_allowance":"SES 授权额度不足，请重新授权","err.e_not_ruins":"文明未被摧毁","err.e_policy_blocked":"被安全策略阻止","err.e_radar_too_low":"雷达等级不足，无法跃迁","err.e_rate_limited":"操作过于频繁，请稍后再试","err.e_self_target":"不能攻击自己","err.e_target_protected":"目标受保护","err.e_target_shield_full":"目标护盾已满","err.e_wrong_fee":"支付费用错误","err.em_inactive_order":"订单已失效","err.em_invalid_amount":"订单金额无效","err.em_price_slip":"价格已变动，请重新下单","err.em_self_fill":"不能吃自己的单","err.em_too_early":"订单未到可成交时间","err.dm_distributed":"本纪元已分发","err.dm_too_early":"尚未到分发时间","err.al_exists":"联盟已存在","err.al_in_alliance":"已在联盟中","err.al_kick_self":"不能踢出自己","err.al_full":"联盟已满员","err.al_invalid_name":"联盟名称格式不正确","err.al_last_member":"最后一名成员不能退出","err.al_no_refund":"没有可用退款","err.al_not_leader":"仅盟主可操作","err.al_need_donation":"捐献能量不足","err.al_not_found":"联盟不存在","err.al_not_member":"不是该联盟成员","err.al_use_claim_refund":"请使用领取退款","battle.incoming":"你被攻击了！","battle.filter_all":"全部","battle.filter_out":"我发起","battle.filter_in":"我受到","battle.shield_dmg":"护盾伤害","battle.health_dmg":"生命伤害","battle.stolen":"掠夺","battle.downgrade":"降级","market.slippage_hint":"滑点上浮 {pct}%，成交不高于 {price} SES/⚡","market.total_price":"总价 {price} SES","market.best_price":"最低挂单 {price} SES/⚡","market.precision_warn":"数量大额时单价存在精度截断","market.sort_price":"按价格","market.sort_amount":"按数量","market.my_orders":"我的挂单","market.public_orders":"公共挂单","market.buy_partial_placeholder":"买入数量","market.buy_confirm_title":"确认买入 {amount}⚡","market.buy_confirm_body":"花费 {cost} SES，单价 ≤ {unit} SES/⚡","market.sell_max":"MAX","market.sell_remember":"已为你记住上次卖出参数","alliance.search":"搜索联盟","alliance.view_all":"查看全部（{n}）","alliance.show_less":"收起","alliance.donate_presets":"快捷：","alliance.join_note":"加入后可获图腾防御加成，退出有冷却与能量惩罚","alliance.disband_confirm_ph":"输入联盟名称确认解散","alliance.disband_need_input":"请完整输入联盟名以确认","alliance.leave_note":"退出后将失去图腾加成与部分能量（冷却 {sec}s）","alliance.kick_confirm":"确定踢出 {name}？","connect.char_count":"{cur}/32","connect.name_hint":"1-32 字符，仅字母数字与下划线/连字符","connect.referrer_auto":"已从链接自动填入邀请人","connect.congrats_title":"欢迎加入试炼","connect.congrats_desc":"先采集能量，重建前 30 分钟完成首次升级有额外效率。","connect.congrats_cta":"开始探索","connect.fee_progress":"当前费用为区间 {pct}%（0.01→0.05 BNB 线性增长）","connect.no_civ_title":"该钱包尚未注册文明","connect.no_civ_desc":"支付入场费即可创建你的文明。费用用 {} 显示当前区间进度。","connect.checking":"正在检查…","general.tx_view":"查看交易","general.sync_stale":"数据同步异常，正在重试（最后更新 {sec}s 前）","general.sync_ok":"数据已同步","general.tooltip_newbie":"新手建议：先升级采集器，再考虑武器/雷达。","general.approve_hint":"本次操作需先授权 SES，签一次后长期有效","general.empty_cta":"去发现目标 →","lore.fee_note":"越晚加入成本越高，引擎不会等待","mobile.attack_flash":"命中！","mobile.sync_warning":"同步异常"},Ya={"nav.overview":"Overview","nav.actions":"Actions","nav.combat":"Trace Combat","nav.tech":"System Compile","nav.alliance":"Pact Alliance","nav.market":"Spark Market","nav.leaderboard":"Epoch Board","nav.links":"Links","nav.wallet":"Wallet","nav.copy_addr":"Copy Address","toast.copied":"Copied","nav.disconnect":"Disconnect","lore.splash_title":"The Silent Engine is Active","lore.splash_line1":"The Precursors have ascended.","lore.splash_line2":"The last civilization shall inherit everything.","lore.protocol_intro":`Strife Protocol: every epoch (~24h), the lowest-ranked competitor is silenced.
Inject Spark (SES), register as a contender. Your trial begins.`,"lore.splash_btn":"Inject SES, Join the Strife","lore.footer_quote":"The Engine does not judge you. It reads your code and tells you: not enough.","lore.engine_status":"Silent Engine · Online","lore.competitors":"Active Contenders","lore.silence_count":"Silenced","lore.epoch_label":"Current Epoch","connect.title":"Silent Expanse: Strife","connect.subtitle":"— SILENT EXPANSE: STRIFE —","connect.fee_label":"Entry Fee","connect.fee_hint":"Fee increases linearly (0.01 → 0.05 BNB)","connect.pay":"Pay {fee} BNB to create civilization","connect.wallet_connect":"Connect Wallet","connect.wallet_connecting":"Connecting…","connect.no_wallet":"No wallet detected. Please install MetaMask.","connect.civ_name":"Civilization name (1-32 chars)","connect.referrer":"Referrer address (optional)","connect.referral_bonus":"Both get 150 energy + permanent 0.2% mining bonus","connect.tutorial":"Tutorial","connect.lang_switch":"中","connect.name_required":"Civilization name is required","connect.name_too_long":"Name must be 32 characters or less","connect.wallet_required":"Please connect your wallet first","connect.bad_referrer":"Invalid referrer address format","connect.ready_connect":"Click the button below to connect","connect.detecting_wallet":"Detecting wallet…","connect.loading_contract":"Loading contracts…","connect.checking_civ":"Checking civilization…","hud.title":"Status","hud.location":"Current Coordinates","hud.combat_res":"Trace Assets","hud.attack_token":"Traces","hud.pending_energy":"Pending","hud.tech_systems":"Engine Systems","hud.collect_rate":"Harvest Rate","hud.durability":"Durability","hud.attack_power":"Attack Power","hud.shield_hp":"Silence Shield","hud.defense":"Defense","hud.scan_range":"Scan Range","hud.speed":"Jump Speed","hud.energy":"Expanse Energy","hud.health":"Civ Health","hud.shield":"Silence Shield","hud.ses":"Spark·SES","hud.attack_token_label":"Traces","hud.combat_boost":"Trace Bonus","hud.totem_bonus":"Pact Totem","hud.pending_label":"Pending","hud.pending_type":"Trace Energy","hud.destroyed_title":"Civilization Destroyed","hud.destroyed_desc":"Your civilization is in ruins. Rebuild with SES.","hud.destroyed_btn":"Rebuild","hud.rebuild_cost":"Rebuilding consumes significant energy (scales with rebirths)","hud.durability_warn":"Collector durability {pct}%","hud.durability_repair":"Repair","hud.cost":"Cost","hud.cooldown":"Cooldown","hud.confirm_attack":"Confirm Attack","hud.confirm_upgrade":"Confirm Upgrade","hud.cancel":"Cancel","hud.target":"Target","hud.in_range":"In Range","hud.out_of_range":"Out of Range","hud.error_dismiss":"{msg} (click to dismiss)","hud.loading_upgrade":"Upgrading…","ses.claim":"Claim SES","ses.claimed":"Claimed","action.title":"Actions","action.ses_balance":"SES Balance","action.collect_rate":"Rate","action.daily_est":"Daily","action.collect":"Collect","action.combat_energy":"Combat Energy","action.combat_energy_empty":"Empty","action.claimed_today":"Claimed Today","action.distributing":"Distributing…","action.distribute":"Distribute Epoch","action.epoch_remaining":"{min}m {sec}s","action.calculating":"Calculating…","action.claim_ses":"Claim Daily SES","action.group_collect":"Resource Production","action.group_claim":"Reward Settlement","action.group_move":"Protocol Nav","action.group_repair":"System Maintenance","action.move_input":"Nav Coordinates","action.move_confirm":"Confirm Nav","action.move_invalid":"Please enter valid integer coordinates","action.move_cancel":"Cancel","action.move":"Protocol Nav","action.jump":"Trace Jump","action.cancel_move":"Cancel Nav","action.repair_shield":"Repair Silence Shield","action.regen_shield":"Silence Regenerate","action.repair_all":"Compile Repair All","action.moving":"Moving","action.shield_full":"Shield Full","action.jump_confirm":"Confirm Jump","action.jump_warn":"Jump consumes energy and SES, engine durability -1; shield drops to 10% of max with a cooldown.","combat.title":"Trace Combat","combat.search_placeholder":"Enter target civ address 0x…","combat.search_btn":"Trace Scan","combat.energy":"Expanse Energy","combat.health":"Civ Health","combat.weapon_lv":"Weapon Lv","combat.shield_lv":"Silence Shield Lv","combat.distance":"Jump Distance","combat.out_of_range_warn":"Target out of jump range ({range} ls)","combat.attack_btn":"Trace Attack {name}","combat.attack_btn_idle":"Scan a target first","combat.attack_no_energy":"Not enough energy to attack","combat.attack_out_range":"Target out of range","combat.attack_in_cd":"Jump cooldown, wait a moment","combat.attack_no_token":"No traces left, wait to regenerate","combat.attack_cooldown":"(jump cd {sec}s)","combat.attack_cost":"({cost}⚡)","combat.confirm_attack":"Confirm Trace Attack","combat.confirm_cost":"Cost: {cost} Expanse Energy","combat.confirm_target":"Target Civ: {name}","combat.confirm_distance":"Jump Distance: {dist} ls","combat.confirm_cooldown":"Engine Cooldown: {sec}s","combat.scan_nearby":"Scan Nearby Targets","combat.scan_empty":"No targets in range","combat.scan_found":"Found {n} targets","combat.power_compare":"My ATK {atk} vs Enemy DEF {def}","battle.title":"Trace Log","battle.empty":"No traces yet","upgrade.title":"System Compile","upgrade.collector":"Expanse Harvester","upgrade.weapon":"Weapon System","upgrade.shield":"Silence Shield","upgrade.radar":"Scan Array","upgrade.engine":"Jump Engine","upgrade.collect_rate":"Collect Rate","upgrade.attack_power":"Attack Power","upgrade.defense":"Defense","upgrade.scan_range":"Scan Range","upgrade.speed":"Speed","upgrade.cost":"Cost","upgrade.current":"Current","upgrade.after":"After","upgrade.gain":"Gain","upgrade.recommend_badge":"Recommended","upgrade.loading":"⟳ Loading upgrade data…","upgrade.unavailable":"Unable to load upgrade data","upgrade.btn":"⬆ Upgrade","upgrade.insufficient":"Not enough SES to upgrade","upgrade.best_value":"Best Value","upgrade.cost_label":"Cost","alliance.title":"Alliance","alliance.mine":"My Alliance","alliance.available":"Available Alliances","alliance.create":"Create Alliance","alliance.name":"Alliance Name","alliance.join":"Join","alliance.leave":"Leave","alliance.disband":"Disband","alliance.members":"Members","alliance.people":"","alliance.totem":"Totem","alliance.totem_pool":"Energy Pool","alliance.totem_bonus_desc":"Totem bonus: +8 defense per ally × (1 + totemLv×0.5%)","alliance.totem_bonus_value":"Current: +{val} defense","alliance.totem_next_bonus":"After upgrade: +{val} defense","alliance.donate":"Donate Energy","alliance.donate_invalid":"Enter a valid energy amount","alliance.totem_need_more":"Not enough energy in pool to upgrade totem","alliance.upgrade_totem":"Upgrade Totem","alliance.refund":"Claim Refund","alliance.you":"","alliance.no_alliance":"No Alliance","alliance.leader":"Leader","alliance.member":"Member","alliance.kick":"Kick","alliance.transfer":"Transfer","alliance.transfer_confirm":"Transfer leadership to this member?","alliance.refund_available":"You have {amt} SES refund pending","alliance.not_joined":"Not in an alliance","alliance.switch_tab":'Switch to "Join" tab to see available alliances',"alliance.level_members":"Lv.{lv} · {count}{unit}","market.title":"Energy Market","market.sell_placeholder_energy":"Energy amount","market.sell_placeholder_price":"SES price","market.sell_label_energy":"Sell Energy","market.sell_label_price":"Unit Price","market.sell_unit_price":"SES / ⚡","market.preview_receive":"You receive","market.your_energy":"Your Energy","market.insufficient_energy":"Not enough energy to sell","market.sell_btn":"Create Sell Order","market.buy_btn":"Buy","market.cancel_btn":"Cancel","market.empty":"No orders","market.buy_no_ses":"Not enough SES","market.order_energy":"{amt}⚡","market.order_price":"{price} SES","market.order_you":"(you)","market.energy":"Energy","market.ses_balance":"SES Balance","market.create_order":"Create Sell Order","market.active_orders":"Active Orders","leaderboard.title":"Leaderboard","leaderboard.loading":"⟳ Loading…","leaderboard.empty":"No data","leaderboard.col_rank":"#","leaderboard.col_player":"Player","leaderboard.col_level":"Level","leaderboard.col_energy":"Energy","leaderboard.player_level":"Lv.{lv}","leaderboard.rank":"Rank","leaderboard.name":"Name","leaderboard.power":"Energy","leaderboard.level":"Level","leaderboard.kills":"Kills","leaderboard.sort_power":"Energy","leaderboard.sort_kills":"Kills","mobile.tab_overview":"Status","mobile.tab_actions":"Actions","mobile.tab_combat":"Combat","mobile.tab_market":"Market","mobile.tab_alliance":"Alliance","page.overview":"Overview","page.actions":"Protocol Panel","page.combat":"Trace Combat","page.tech":"System Compile","page.alliance":"Pact Alliance","page.market":"Spark Market","page.leaderboard":"Epoch Board","page.links":"Links","general.epoch":"Epoch","general.next_epoch":"Next Epoch","general.energy":"Energy","general.health":"Health","general.loading":"Loading…","general.per_sec":"/s","general.per_hour":"/h","general.ls":"ls","general.ls_h":"ls/h","general.confirm":"Confirm","general.cancel":"Cancel","general.close":"Close","general.creating":"Creating civilization, please confirm MetaMask transaction…","general.back":"← Back","toast.civ_created":"🌌 Civilization {name} created!","toast.civ_create_failed":"Create failed: {msg}","toast.ses_insufficient":"Insufficient SES: need {need}, have {have}","toast.energy_insufficient":"Insufficient energy: need {need}⚡, have {have}⚡","toast.upgrade_success":"{name} upgraded!","toast.upgrade_failed":"Upgrade failed: {msg}","toast.attack_energy":"Insufficient energy: need {cost}⚡","toast.attack_failed":"Attack failed: {msg}","toast.collect_success":"⚡ Collected +{amount} energy","toast.collect_failed":"Collect failed: {msg}","toast.claim_combat_success":"📦 Combat energy claimed","toast.claim_combat_failed":"Claim failed: {msg}","toast.claim_ses_success":"📅 Daily SES claimed!","toast.claim_ses_failed":"Claim failed: {msg}","toast.move_success":"🚀 Arrived at destination","toast.move_failed":"Move failed: {msg}","toast.jump_success":"🌌 Space jump complete!","toast.jump_failed":"Jump failed: {msg}","toast.rebuild_success":"🌱 Civilization rebuilt!","toast.rebuild_failed":"Rebuild failed: {msg}","toast.repair_collector_success":"🔧 Collector repaired","toast.repair_collector_failed":"Repair failed: {msg}","toast.repair_shield_success":"🛡️ Shield fully repaired","toast.repair_shield_failed":"Repair failed: {msg}","toast.regen_shield_success":"🛡️ Shield regenerating","toast.regen_shield_failed":"Regen failed: {msg}","toast.repair_all_success":"🔧 All systems repaired","toast.repair_all_failed":"Repair failed: {msg}","toast.cancel_move_success":"⏹️ Move cancelled","toast.cancel_move_failed":"Cancel failed: {msg}","toast.alliance_created":"🏰 Alliance created!","toast.alliance_create_failed":"Create failed: {msg}","toast.refund_claimed":"💰 Refund claimed","toast.refund_failed":"Claim failed: {msg}","toast.alliance_joined":"🏰 Joined alliance!","toast.alliance_join_failed":"Join failed: {msg}","toast.alliance_left":"👋 Left alliance","toast.alliance_leave_failed":"Leave failed: {msg}","toast.leadership_transferred":"Leadership transferred","toast.leadership_transfer_failed":"Leadership transfer failed: {msg}","toast.member_kicked":"👢 Member kicked","toast.member_kick_failed":"Kick failed: {msg}","toast.alliance_disbanded":"🏰 Alliance disbanded","toast.alliance_disband_failed":"Disband failed: {msg}","toast.donate_success":"🔶 Donation successful!","toast.donate_failed":"Donation failed: {msg}","toast.totem_upgrade_success":"🔱 Totem upgraded!","toast.totem_upgrade_failed":"Totem upgrade failed: {msg}","toast.order_created":"📄 Sell order created (energy locked)","toast.order_failed":"Order failed: {msg}","toast.order_filled":"🛒 Order filled","toast.order_fill_failed":"Fill failed: {msg}","toast.order_cancelled":"❌ Order cancelled","toast.order_cancel_failed":"Cancel failed: {msg}","toast.contract_unavailable":"{name} contract unavailable. Check wallet connection.","toast.wallet_disconnected":"Wallet not connected","toast.attack_success":"Attack successful","toast.distribute_success":"Distributed! You can claim SES now.","toast.energy_insufficient_short":"Insufficient energy","err.unknown":"Unknown error","err.insufficient_gas":"Insufficient gas funds","err.network":"Network error, check your connection","err.nonce":"Transaction expired, please retry","err.timeout":"Request timed out","err.call_failed":"Contract call failed, try again","err.e_already_civ":"Civilization already exists","err.e_already_claimed":"Already claimed today","err.e_already_there":"Already at destination","err.e_civ_not_found":"Civilization not found","err.e_durability_full":"Durability is full","err.e_engine_worn":"Engine is worn, repair first","err.e_invalid_name":"Invalid name format","err.e_jump_cooldown":"Jump cooldown active","err.e_leave_cooldown":"Leave cooldown active","err.e_low_allowance":"SES allowance insufficient, please approve again","err.e_not_ruins":"Civilization is not destroyed","err.e_policy_blocked":"Blocked by safety policy","err.e_radar_too_low":"Radar level too low","err.e_rate_limited":"Rate limited, try later","err.e_self_target":"Cannot attack yourself","err.e_target_protected":"Target is protected","err.e_target_shield_full":"Target shield is full","err.e_wrong_fee":"Incorrect fee amount","err.em_inactive_order":"Order is inactive","err.em_invalid_amount":"Invalid amount","err.em_price_slip":"Price has slipped, please retry","err.em_self_fill":"Cannot fill your own order","err.em_too_early":"Order not fillable yet","err.dm_distributed":"Already distributed this epoch","err.dm_too_early":"Too early to distribute","err.al_exists":"Alliance already exists","err.al_in_alliance":"Already in an alliance","err.al_kick_self":"Cannot kick yourself","err.al_full":"Alliance is full","err.al_invalid_name":"Invalid alliance name","err.al_last_member":"Cannot leave as last member","err.al_no_refund":"No refund available","err.al_not_leader":"Leader only","err.al_need_donation":"Insufficient donation","err.al_not_found":"Alliance not found","err.al_not_member":"Not a member","err.al_use_claim_refund":"Use Claim Refund instead","battle.incoming":"You were attacked!","battle.filter_all":"All","battle.filter_out":"My Attacks","battle.filter_in":"Incoming","battle.shield_dmg":"Shield DMG","battle.health_dmg":"Health DMG","battle.stolen":"Stolen","battle.downgrade":"Downgraded","market.slippage_hint":"Slippage +{pct}%, capped at {price} SES/⚡","market.total_price":"Total {price} SES","market.best_price":"Best ask {price} SES/⚡","market.precision_warn":"Large amounts may have price precision loss","market.sort_price":"By Price","market.sort_amount":"By Amount","market.my_orders":"My Orders","market.public_orders":"Orders","market.buy_partial_placeholder":"Amount to buy","market.buy_confirm_title":"Confirm buy {amount}⚡","market.buy_confirm_body":"Spend {cost} SES, unit ≤ {unit} SES/⚡","market.sell_max":"MAX","market.sell_remember":"Remembered your last sell amount","alliance.search":"Search alliances","alliance.view_all":"View all ({n})","alliance.show_less":"Collapse","alliance.donate_presets":"Quick:","alliance.join_note":"Joining gives totem defense bonus; leaving has cooldown and penalty","alliance.disband_confirm_ph":"Type alliance name to confirm","alliance.disband_need_input":"Type the full name to confirm","alliance.leave_note":"Leaving forfeits totem bonus and some energy (cooldown {sec}s)","alliance.kick_confirm":"Kick {name}?","connect.char_count":"{cur}/32","connect.name_hint":"1-32 chars, alphanumeric and _/-","connect.referrer_auto":"Auto-filled from referral link","connect.congrats_title":"Welcome to the Trial","connect.congrats_desc":"Collect energy first. The first upgrade within 30 min has bonus efficiency.","connect.congrats_cta":"Start Exploring","connect.fee_progress":"Fee at {pct}% of range (0.01→0.05 BNB linear ramp)","connect.no_civ_title":"No civilization for this wallet","connect.no_civ_desc":"Pay the entry fee to create your civilization. Progress shown in {} below.","connect.checking":"Checking...","general.tx_view":"View tx","general.sync_stale":"Sync hiccup, retrying (last {sec}s ago)","general.sync_ok":"Synced","general.tooltip_newbie":"Tip: upgrade collector first, then weapon/radar.","general.approve_hint":"This requires SES approval — sign once, valid forever.","general.empty_cta":"Find targets →","lore.fee_note":"Later means higher cost — the Engine waits for no one.","mobile.attack_flash":"Hit!","mobile.sync_warning":"Sync issue"},Ga={zh:Mn,en:Ya};function Ka(){if(typeof navigator>"u")return"zh";const e=navigator.languages||[navigator.language||""];for(const a of e){if(a.startsWith("zh"))return"zh";if(a.startsWith("en"))return"en"}return"zh"}let qe=Ka();const Pt=new Set;function Va(){return qe}function Wa(e){qe=e,typeof localStorage<"u"&&localStorage.setItem("ses_lang",e),Pt.forEach(a=>a())}function Ja(){Wa(qe==="zh"?"en":"zh")}function Xa(e){return Pt.add(e),()=>Pt.delete(e)}if(typeof localStorage<"u"){const e=localStorage.getItem("ses_lang");(e==="zh"||e==="en")&&(qe=e)}function L(e,a){let c=Ga[qe][e]||Mn[e]||e;if(a)for(const[l,p]of Object.entries(a))c=c.replace(`{${l}}`,String(p));return c}function qa(e){var l;const a=e;if((l=a.revert)!=null&&l.args&&a.revert.args.length>0)return String(a.revert.args[0]);if(a.reason)return a.reason;const i=a.shortMessage??a.message??"",c=/execution reverted:? ?([^"\n]*)/.exec(i);return c&&c[1]?c[1].trim().split(" ")[0]:null}const Za={E_AlreadyCiv:"err.e_already_civ",E_AlreadyClaimed:"err.e_already_claimed",E_AlreadyThere:"err.e_already_there",E_CivNotFound:"err.e_civ_not_found",E_DurabilityFull:"err.e_durability_full",E_EngineWorn:"err.e_engine_worn",E_InvalidName:"err.e_invalid_name",E_InvalidReferrer:"connect.bad_referrer",E_JumpCooldown:"err.e_jump_cooldown",E_LeaveCooldown:"err.e_leave_cooldown",E_LowAllowance:"err.e_low_allowance",E_LowEnergy:"toast.energy_insufficient_short",E_NoPendingEnergy:"err.e_no_pending",E_NotInAlliance:"err.al_not_member",E_NotRuins:"err.e_not_ruins",E_PolicyBlocked:"err.e_policy_blocked",E_RadarTooLow:"err.e_radar_too_low",E_RateLimited:"err.e_rate_limited",E_SelfTarget:"err.e_self_target",E_ShieldFull:"action.shield_full",E_TargetNotScanned:"combat.attack_out_range",E_TargetProtected:"err.e_target_protected",E_TargetShieldFull:"err.e_target_shield_full",E_TooFar:"combat.attack_out_range",E_WrongFee:"err.e_wrong_fee",EM_InactiveOrder:"err.em_inactive_order",EM_InvalidAmount:"err.em_invalid_amount",EM_PriceTooHigh:"err.em_price_slip",EM_SelfFill:"err.em_self_fill",EM_TooEarly:"err.em_too_early",EM_ZeroEnergy:"market.insufficient_energy",DM_AlreadyClaimed:"ses.claimed",DM_AlreadyDistributed:"err.dm_distributed",DM_NotDistributedYet:"action.distribute",DM_TooEarly:"err.dm_too_early",AL_AlreadyExists:"err.al_exists",AL_AlreadyInAlliance:"err.al_in_alliance",AL_CannotKickSelf:"err.al_kick_self",AL_Full:"err.al_full",AL_InvalidName:"err.al_invalid_name",AL_LastMember:"err.al_last_member",AL_NoRefund:"err.al_no_refund",AL_NotAuthorized:"err.al_not_leader",AL_NotEnoughDonations:"err.al_need_donation",AL_NotFound:"err.al_not_found",AL_NotLeader:"err.al_not_leader",AL_NotMember:"err.al_not_member",AL_UseClaimRefund:"err.al_use_claim_refund"};function Q(e){if(!(e instanceof Error))return{rejected:!1,msg:typeof e=="string"?e:L("err.unknown")};const a=e.code,i=e.message||"";if(a==="ACTION_REJECTED"||/user rejected|User denied|user cancelled/i.test(i))return{rejected:!0,msg:""};if(a==="INSUFFICIENT_FUNDS"||/insufficient funds/i.test(i))return{rejected:!1,msg:L("err.insufficient_gas")};if(/nonce too low|nonce has already been used/i.test(i))return{rejected:!1,msg:L("err.nonce")};if(/timeout/i.test(i))return{rejected:!1,msg:L("err.timeout")};if(a==="NETWORK_ERROR"||/network|Failed to fetch/i.test(i))return{rejected:!1,msg:L("err.network")};const c=qa(e);if(c){const p=Za[c];return p?{rejected:!1,msg:L(p)}:{rejected:!1,msg:c.length<=40?c:c.slice(0,40)+"…"}}return{rejected:!1,msg:e.shortMessage||(i.length>120?i.slice(0,120)+"…":i)}}const Qa={energyCollector:"collector",weapon:"weapon",shield:"shield",radar:"radar",engine:"engine"},ei={energyCollector:0,weapon:1,shield:2,radar:3,engine:4};function Ae(){const e=we();function a(f,d){if(!f)throw new Error(`${d} Contract not available`)}async function i(){if(e.signer)return await e.signer.getAddress();const f=r.getState().address;if(f)return f;throw new Error("Wallet not connected")}const c=m.useCallback(async()=>{a(e.game,"SilentExpanseStrife");const f=await e.game.getEntryFee();return Je(f)},[e]),l=m.useCallback(async(f,d)=>{a(e.game,"SilentExpanseStrife"),a(e.signer,"Signer"),ie("create");try{const y=await e.game.getEntryFee(),g={value:y};let R;if(d){const ne=la(d.trim());R=await e.game["createCivilization(string,address)"](f.trim(),ne,g)}else R=await e.game["createCivilization(string)"](f.trim(),g);await R.wait();const O=await e.signer.getAddress(),_=await e.game.getCivilization(O),F=Me(_),q=await e.game.getCurrentShieldHP(O);return F.shieldHP=Number(q),r.setState({connected:!0,address:O,playerCiv:F,entryFee:Je(y),lastCollectTime:_.lastUpdateTime?Number(_.lastUpdateTime)*1e3:Date.now()}),r.getState().claimSES(),r.getState().addSuccessToast(L("toast.civ_created",{name:f}),R.hash),!0}catch(y){{const g=Q(y);ee(g)||r.getState().addErrorToast(L("toast.civ_create_failed",{msg:g.msg}))}return!1}finally{te()}},[e]),p=m.useCallback(async f=>{const d=r.getState();if(d.playerCiv){a(e.game,"SilentExpanseStrife"),a(e.sesToken,"SES Token"),ie("upgrade");try{const y=e.game,g=e.sesToken,R=await i(),O=await y.getUpgradeCost(R,Qa[f]),_=Number(O.ses)/1e18,F=Number(O.energy),q=parseFloat(d.sesBalance),ne=d.playerCiv.energy;if(q<_){r.setState({loading:!1,error:L("toast.ses_insufficient",{need:_.toFixed(2),have:q.toFixed(2)})});return}if(ne<F){r.setState({loading:!1,error:L("toast.energy_insufficient",{need:F.toLocaleString(),have:ne.toLocaleString()})});return}await g.allowance(R,le.SILENT_EXPANSE)<O.ses&&await(await g.approve(le.SILENT_EXPANSE,Ot)).wait();const xe=await y.upgradeSystem(ei[f]);await xe.wait();const de=await y.getCivilization(R);r.setState({playerCiv:{...d.playerCiv,...Me(de)},sesBalance:Qe(await g.balanceOf(R))}),r.getState().addSuccessToast(L("toast.upgrade_success",{name:pe[f].name}),xe.hash)}catch(y){{const g=Q(y);ee(g)||r.getState().addErrorToast(L("toast.upgrade_failed",{msg:g.msg}))}}finally{te()}}},[e]),h=m.useCallback(async()=>{const f=r.getState();if(!f.playerCiv||!f.selectedTarget)return;const d=r.getState().attackEnergyCost;if(f.attackTokens.current<=0){r.setState({error:L("combat.attack_no_token")});return}if(f.playerCiv.energy<d){r.setState({error:L("toast.attack_energy",{cost:d})});return}r.setState({loading:!0,activeAction:"attack",error:null,lastAttackTime:Date.now()});try{a(e.game,"SilentExpanseStrife"),await(await e.game.attack(f.selectedTarget)).wait();const g=await i(),R=Me(await e.game.getCivilization(g));R.shieldHP=Number(await e.game.getCurrentShieldHP(g)),r.setState({playerCiv:{...f.playerCiv,...R}})}catch(y){{const g=Q(y);ee(g)||r.getState().addErrorToast(L("toast.attack_failed",{msg:g.msg}))}}finally{te()}},[e]),b=m.useCallback(async()=>{if(r.getState().playerCiv){ie("collect");try{a(e.game,"SilentExpanseStrife");const d=await e.game.collectEnergy(),y=await d.wait();let g=0;if(y&&y.logs)try{const F=e.game.interface;for(const q of y.logs)try{const ne=F.parseLog(q);if(ne&&ne.name==="EnergyCollected"){g=Number(ne.args.amount??0);break}}catch{}}catch{}const R=await i(),O=await e.game.getCivilization(R),_=Me(O);_.shieldHP=Number(await e.game.getCurrentShieldHP(R)),r.setState(F=>({playerCiv:F.playerCiv?{...F.playerCiv,..._}:null,lastCollectTime:O.lastUpdateTime?Number(O.lastUpdateTime)*1e3:Date.now()})),r.getState().addSuccessToast(L("toast.collect_success",{amount:g}),d.hash)}catch(d){{const y=Q(d);ee(y)||r.getState().addErrorToast(L("toast.collect_failed",{msg:y.msg}))}}finally{te()}}},[e]),u=m.useCallback(async()=>{if(!(r.getState().pendingEnergy<=0)){ie("claimCombat");try{a(e.game,"SilentExpanseStrife");const d=await e.game.claimCombatEnergy();await d.wait();const y=await i(),g=await e.game.getCivilization(y),R=await e.game.pendingCombatEnergy(y);r.setState({playerCiv:{...r.getState().playerCiv,...Me(g)},pendingEnergy:Number(R)}),r.getState().addSuccessToast(L("toast.claim_combat_success"),d.hash)}catch(d){{const y=Q(d);ee(y)||r.getState().addErrorToast(L("toast.claim_combat_failed",{msg:y.msg}))}}finally{te()}}},[e]),o=m.useCallback(async()=>{ie("distribute");try{a(e.dailyMinter,"DailyMinter");const f=await e.dailyMinter.distribute();await f.wait(),r.getState().addSuccessToast(L("toast.distribute_success"),f.hash)}catch(f){{const d=Q(f);ee(d)||r.getState().addErrorToast(L("toast.claim_ses_failed",{msg:d.msg}))}}finally{te()}},[e]),S=m.useCallback(async()=>{ie("claimSES");try{a(e.dailyMinter,"DailyMinter"),a(e.sesToken,"SES Token");try{await(await e.dailyMinter.distribute()).wait()}catch{}const f=await e.dailyMinter.claim();await f.wait();const d=await i();r.setState({sesBalance:Qe(await e.sesToken.balanceOf(d))}),r.getState().claimSES(),r.getState().addSuccessToast(L("toast.claim_ses_success"),f.hash)}catch(f){{const d=Q(f);ee(d)||r.getState().addErrorToast(L("toast.claim_ses_failed",{msg:d.msg}))}}finally{te()}},[e]),k=m.useCallback(async(f,d,y)=>{ie("move");try{a(e.game,"SilentExpanseStrife");const g=await e.game.startMove(f,d,y);await g.wait(),r.getState().addSuccessToast(L("toast.move_success"),g.hash)}catch(g){{const R=Q(g);ee(R)||r.getState().addErrorToast(L("toast.move_failed",{msg:R.msg}))}}finally{te()}},[e]),A=m.useCallback(async()=>{ie("jump");try{a(e.game,"SilentExpanseStrife");const f=await e.game.spaceJump();await f.wait(),r.getState().addSuccessToast(L("toast.jump_success"),f.hash)}catch(f){{const d=Q(f);ee(d)||r.getState().addErrorToast(L("toast.jump_failed",{msg:d.msg}))}}finally{te()}},[e]),P=m.useCallback(async()=>{ie("rebuild");try{a(e.game,"SilentExpanseStrife");const f=await e.game.rebuildCivilization();await f.wait();const d=await i(),y=await e.game.getCivilization(d),g=Me(y);g.shieldHP=Number(await e.game.getCurrentShieldHP(d)),r.setState({playerCiv:{...r.getState().playerCiv,...g}}),r.getState().addSuccessToast(L("toast.rebuild_success"),f.hash)}catch(f){{const d=Q(f);ee(d)||r.getState().addErrorToast(L("toast.rebuild_failed",{msg:d.msg}))}}finally{te()}},[e]),T=m.useCallback(async f=>{if(r.getState().playerCiv){ie("repairCollector");try{a(e.game,"SilentExpanseStrife");const y=await e.game.repairCollector(f);await y.wait();const g=await i(),R=await e.game.getCollectorDurability(g);r.setState({collectorDurability:{current:Number(R[0]),max:Number(R[1])}}),r.getState().addSuccessToast(L("toast.repair_collector_success"),y.hash)}catch(y){{const g=Q(y);ee(g)||r.getState().addErrorToast(L("toast.repair_collector_failed",{msg:g.msg}))}}finally{te()}}},[e]),I=m.useCallback(async()=>{const f=r.getState();if(!f.playerCiv)return;const d=f.playerCiv.maxShieldHP;if(!(f.playerCiv.shieldHP>=d)){ie("repairShield");try{a(e.game,"SilentExpanseStrife");const y=d-f.playerCiv.shieldHP,g=await e.game.repairShield(y);await g.wait();const R=await i(),O=await e.game.getCurrentShieldHP(R);r.setState(_=>({playerCiv:_.playerCiv?{..._.playerCiv,shieldHP:Number(O)}:null})),r.getState().addSuccessToast(L("toast.repair_shield_success"),g.hash)}catch(y){{const g=Q(y);ee(g)||r.getState().addErrorToast(L("toast.repair_shield_failed",{msg:g.msg}))}}finally{te()}}},[e]),B=m.useCallback(async()=>{if(r.getState().playerCiv){ie("regenShield");try{a(e.game,"SilentExpanseStrife");const d=await e.game.regenShield();await d.wait();const y=await i(),g=await e.game.getCurrentShieldHP(y);r.setState(R=>({playerCiv:R.playerCiv?{...R.playerCiv,shieldHP:Number(g)}:null})),r.getState().addSuccessToast(L("toast.regen_shield_success"),d.hash)}catch(d){{const y=Q(d);ee(y)||r.getState().addErrorToast(L("toast.regen_shield_failed",{msg:y.msg}))}}finally{te()}}},[e]),V=m.useCallback(async()=>{ie("repairAll");try{a(e.game,"SilentExpanseStrife");const f=await e.game.repairAll();await f.wait();const d=await i(),y=await e.game.getCivilization(d);r.setState({playerCiv:{...r.getState().playerCiv,...Me(y)}}),r.getState().addSuccessToast(L("toast.repair_all_success"),f.hash)}catch(f){{const d=Q(f);ee(d)||r.getState().addErrorToast(L("toast.repair_all_failed",{msg:d.msg}))}}finally{te()}},[e]),W=m.useCallback(async()=>{ie("cancelMove");try{a(e.game,"SilentExpanseStrife");const f=await e.game.cancelMove();await f.wait();const d=await i(),y=await e.game.getCurrentPosition(d);r.setState(g=>({playerCiv:g.playerCiv?{...g.playerCiv,x:Number(y.x??y[0]),y:Number(y.y??y[1]),z:Number(y.z??y[2])}:null})),r.getState().addSuccessToast(L("toast.cancel_move_success"),f.hash)}catch(f){{const d=Q(f);ee(d)||r.getState().addErrorToast(L("toast.cancel_move_failed",{msg:d.msg}))}}finally{te()}},[e]),v=m.useCallback(async f=>{if(f.trim()){ie("alliance.create");try{a(e.alliance,"Alliance");const d=await e.alliance.createAlliance(f.trim());await d.wait(),r.getState().addSuccessToast(L("toast.alliance_created"),d.hash)}catch(d){{const y=Q(d);ee(y)||r.getState().addErrorToast(L("toast.alliance_create_failed",{msg:y.msg}))}}finally{te()}}},[e]),M=m.useCallback(async()=>{ie("alliance.refund");try{a(e.alliance,"Alliance"),a(e.sesToken,"SES Token");const f=await e.alliance.claimRefund();await f.wait();const d=await i();r.setState({sesBalance:Qe(await e.sesToken.balanceOf(d)),pendingRefund:0}),r.getState().addSuccessToast(L("toast.refund_claimed"),f.hash)}catch(f){{const d=Q(f);ee(d)||r.getState().addErrorToast(L("toast.refund_failed",{msg:d.msg}))}}finally{te()}},[e]),J=m.useCallback(async f=>{ie("alliance.join");try{a(e.alliance,"Alliance");const d=await e.alliance.joinAlliance(f);await d.wait(),r.getState().addSuccessToast(L("toast.alliance_joined"),d.hash)}catch(d){{const y=Q(d);ee(y)||r.getState().addErrorToast(L("toast.alliance_join_failed",{msg:y.msg}))}}finally{te()}},[e]),z=m.useCallback(async f=>{ie("alliance.leave");try{a(e.alliance,"Alliance");const d=await e.alliance.leaveAlliance(f);await d.wait(),r.setState({currentAlliance:null,_allianceMembers:[],_allianceTotemLevel:0,_allianceTotemEnergy:0,_allianceTotemUpgradeCost:0,_allianceIsLeader:!1,_allianceLeader:""}),r.getState().addSuccessToast(L("toast.alliance_left"),d.hash)}catch(d){{const y=Q(d);ee(y)||r.getState().addErrorToast(L("toast.alliance_leave_failed",{msg:y.msg}))}}finally{te()}},[e]),U=m.useCallback(async(f,d)=>{ie("alliance.kick");try{a(e.alliance,"Alliance");const y=await e.alliance.kickMember(f,d);await y.wait(),r.getState().addSuccessToast(L("toast.member_kicked"),y.hash)}catch(y){{const g=Q(y);ee(g)||r.getState().addErrorToast(L("toast.member_kick_failed",{msg:g.msg}))}}finally{te()}},[e]),E=m.useCallback(async(f,d)=>{ie("alliance.transfer");try{a(e.alliance,"Alliance");const y=await e.alliance.transferLeadership(f,d);await y.wait(),r.getState().addSuccessToast(L("toast.leadership_transferred"),y.hash)}catch(y){{const g=Q(y);ee(g)||r.getState().addErrorToast(L("toast.leadership_transfer_failed",{msg:g.msg}))}}finally{te()}},[e]),H=m.useCallback(async f=>{ie("alliance.disband");try{a(e.alliance,"Alliance");const d=await e.alliance.disbandAlliance(f);await d.wait(),r.setState({currentAlliance:null,_allianceMembers:[],_allianceTotemLevel:0,_allianceTotemEnergy:0,_allianceTotemUpgradeCost:0,_allianceIsLeader:!1,_allianceLeader:""}),r.getState().addSuccessToast(L("toast.alliance_disbanded"),d.hash)}catch(d){{const y=Q(d);ee(y)||r.getState().addErrorToast(L("toast.alliance_disband_failed",{msg:y.msg}))}}finally{te()}},[e]),Y=m.useCallback(async(f,d)=>{ie("alliance.donate");try{a(e.game,"SilentExpanseStrife");const y=await e.game.donateToTotem(f,d);await y.wait(),r.getState().addSuccessToast(L("toast.donate_success"),y.hash)}catch(y){{const g=Q(y);ee(g)||r.getState().addErrorToast(L("toast.donate_failed",{msg:g.msg}))}}finally{te()}},[e]),N=m.useCallback(async f=>{ie("alliance.totem");try{a(e.game,"SilentExpanseStrife");const d=await e.game.upgradeTotem(f);await d.wait(),r.getState().addSuccessToast(L("toast.totem_upgrade_success"),d.hash)}catch(d){{const y=Q(d);ee(y)||r.getState().addErrorToast(L("toast.totem_upgrade_failed",{msg:y.msg}))}}finally{te()}},[e]),x=m.useCallback(()=>{r.setState({error:null})},[]),X=m.useCallback(async(f,d)=>{ie("market.sell");try{if(a(e.signer,"Signer"),!le.ENERGY_MARKET)throw new Error("ENERGY_MARKET address not configured");const g=await new ke(le.ENERGY_MARKET,We,e.signer).createOrder(f,ca(String(d)));if(await g.wait(),e.game){const R=await i(),O=await e.game.getCivilization(R);r.setState({playerCiv:{...r.getState().playerCiv,energy:Number(O.energy??O[2]??0)}})}r.getState().addSuccessToast(L("toast.order_created"),g.hash)}catch(y){{const g=Q(y);ee(g)||r.getState().addErrorToast(L("toast.order_failed",{msg:g.msg}))}}finally{te()}},[e]),C=m.useCallback(async(f,d,y)=>{ie("market.buy");try{a(e.signer,"Signer"),a(e.sesToken,"SES Token");const g=new ke(le.ENERGY_MARKET,We,e.signer),R=await g.orders(f);if(R.remaining===0n)throw new Error("Order already filled");const O=BigInt(R.sesPrice)/BigInt(R.energyAmount),_=y??O*110n/100n,F=BigInt(d)*R.sesPrice/R.energyAmount,q=await i();await e.sesToken.allowance(q,le.ENERGY_MARKET)<F&&await(await e.sesToken.approve(le.ENERGY_MARKET,Ot)).wait();const me=await g.fillOrder(f,d,_);if(await me.wait(),e.game){const xe=await e.game.getCivilization(q);r.setState({playerCiv:{...r.getState().playerCiv,energy:Number(xe.energy??0)},sesBalance:Qe(await e.sesToken.balanceOf(q))})}r.getState().addSuccessToast(L("toast.order_filled"),me.hash)}catch(g){{const R=Q(g);ee(R)||r.getState().addErrorToast(L("toast.order_fill_failed",{msg:R.msg}))}}finally{te()}},[e]),K=m.useCallback(async f=>{ie("market.cancel");try{a(e.signer,"Signer");const y=await new ke(le.ENERGY_MARKET,We,e.signer).cancelOrder(f);await y.wait(),r.getState().addSuccessToast(L("toast.order_cancelled"),y.hash)}catch(d){{const y=Q(d);ee(y)||r.getState().addErrorToast(L("toast.order_cancel_failed",{msg:y.msg}))}}finally{te()}},[e]);return{createCivilization:l,fetchEntryFee:c,upgradeSystem:p,attackTarget:h,collectEnergy:b,claimCombatEnergy:u,claimDailySES:S,distribute:o,startMove:k,spaceJump:A,rebuildCivilization:P,repairCollector:T,repairShield:I,regenShield:B,repairAll:V,cancelMove:W,createAlliance:v,joinAlliance:J,leaveAlliance:z,kickMember:U,transferLeadership:E,disbandAlliance:H,donateToTotem:Y,upgradeTotem:N,claimRefund:M,clearError:x,createEnergyOrder:X,fillEnergyOrder:C,cancelEnergyOrder:K}}function ee(e){return e.rejected}function ie(e){r.setState({loading:!0,error:null,activeAction:e})}function te(){r.setState({loading:!1,activeAction:null})}function Fe(e){var i,c,l;const a=Number(e.shieldLv??1);return{name:String(e.name??""),x:Number(e.x??((i=e.location)==null?void 0:i.x)??0),y:Number(e.y??((c=e.location)==null?void 0:c.y)??0),z:Number(e.z??((l=e.location)==null?void 0:l.z)??0),energy:Number(e.energy??0),health:Number(e.health??0),shieldHP:Number(e.shieldHP??0),maxShieldHP:le.SHIELD_HP_BASE+le.SHIELD_HP_RATE*a*a,energyCollectorLv:Number(e.energyCollectorLv??1),weaponLv:Number(e.weaponLv??1),radarLv:Number(e.radarLv??1),shieldLv:a,engineLv:Number(e.engineLv??1),scanRange:Number(e.scanRange??1e3),isRuins:!!(e.isRuins??!1),isMoving:!1}}function Me(e){return Fe(e)}function Qe(e){const a=typeof e=="bigint"?Number(e)/1e18:Number(e);return isNaN(a)?"0.00":a.toFixed(2)}function he(){const[,e]=m.useState(0);return m.useEffect(()=>Xa(()=>e(i=>i+1)),[]),{t:L,lang:Va,toggleLang:Ja}}const n={bg:"#0A0E17",card:"#131A2B",border:"#1E2A45",text:{primary:"#E8EDF5",secondary:"#8892A8"},accent:{green:"#00D4AA",blue:"#4A90D9",red:"#FF4757",gold:"#FFD93D",shield:"#5F9FFF",violet:"#8844ff",mint:"#44ff88",pink:"#ff66aa",orange:"#ff8844"},button:{primary:"#00D4AA",danger:"#FF4757",ghost:"transparent",ghostBorder:"#1E2A45"},status:{success:"#00D4AA",error:"#FF4757",warning:"#FFD93D",info:"#4A90D9",profit:"#00D4AA",loss:"#FF4757"},radius:{sm:"6px",md:"8px",lg:"12px",pill:"999px"},elevation:{card:"0 1px 3px rgba(0,0,0,0.32), 0 4px 12px rgba(0,0,0,0.24)",modal:"0 12px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)"},space:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},font:{mono:"'JetBrains Mono','Courier New',monospace",display:"'Orbitron','JetBrains Mono',monospace"},blur:{bar:"12px",card:"12px"},type:{h1:"1.35rem",h2:"1.05rem",body:"0.82rem",caption:"0.68rem"},transition:{fast:"150ms ease-out",normal:"300ms ease-out"},alpha:(e,a)=>{const i=parseInt(e.slice(1,3),16),c=parseInt(e.slice(3,5),16),l=parseInt(e.slice(5,7),16);return`rgba(${i},${c},${l},${a})`}},ti=e=>n.alpha(e,.12);function Nn(e){const a=[],i=e===1?90:60;let c=49734321;const l=()=>(c=c*1103515245+12345&2147483647,c/2147483647);for(let p=0;p<i;p++){const h=Math.round(l()*1920),b=Math.round(l()*1080);a.push(`${h}px ${b}px 0 rgba(255,255,255,${e===1?.55:.35})`)}return a.join(",")}const ni=Nn(1),ai=Nn(2),ii=Ce`
  from { background-position: 0 0; }
  to { background-position: 0 -120px; }
`,ri=Ce`
  from { transform: scale(1.0) translate(0, 0); }
  to { transform: scale(1.08) translate(-14px, -10px); }
`,si=s.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: -1;
  background: #0A0E17; /* 视频/图片加载失败时的兜底底色 */
`,oi=s.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: ${({$opacity:e})=>e};
  /* #85 移动端降级：小屏隐藏视频用静态星云，省流量/电量 */
  @media (max-width: 767px) {
    display: none;
  }
  /* #28 保障 autoplay 策略：video 已 muted+playsInline+poster */
`,li=s.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url('/assets/bg/nebula.jpg');
  background-size: cover;
  background-position: center;
  animation: ${ri} 90s ease-in-out infinite alternate;
  @media (prefers-reduced-motion: reduce) { animation: none; }
`,ci=s.div`
  position: absolute;
  inset: -120px 0 0 0;
  z-index: 1;
  background-image: radial-gradient(${ni}),
    radial-gradient(${ai});
  background-size: 1920px 1080px, 1920px 1080px;
  animation: ${ii} 120s linear infinite;
  pointer-events: none;
  @media (prefers-reduced-motion: reduce) { animation: none; }
`,di=s.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: ${({$dense:e})=>e?"linear-gradient(180deg, rgba(8,12,24,0.92) 0%, rgba(8,12,24,0.72) 45%, rgba(4,6,14,0.95) 100%)":"linear-gradient(180deg, rgba(10,14,23,0.86) 0%, rgba(10,14,23,0.62) 45%, rgba(6,8,18,0.93) 100%)"};
  pointer-events: none;
`,pi=s.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0) 52%, rgba(0,0,0,0.62) 100%);
  pointer-events: none;
`,Bt=m.memo(function({variant:a="hero",clip:i="hero",dense:c=!1,videoOpacity:l=1}){const p=i==="ascend"?"/assets/bg/web-bg-ascend.mp4":i==="game"?"/assets/bg/web-bg-game.mp4":"/assets/bg/web-bg-hero.mp4";return t.jsxs(si,{"aria-hidden":"true",children:[t.jsx(li,{}),a==="hero"&&t.jsx(oi,{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:"auto",poster:"/assets/bg/nebula.jpg",src:p,$opacity:l}),t.jsx(ci,{}),t.jsx(di,{$dense:c}),t.jsx(pi,{})]})}),ui=Ce`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`,mi=Ce`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`,yi=s.div`
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
`,gi=s.h1`
  font-size: ${({$mobile:e})=>e?"2.5rem":"4rem"};
  color: ${n.accent.green};
  font-family: 'Courier New', monospace;
  letter-spacing: ${({$mobile:e})=>e?"6px":"12px"};
  text-shadow: 0 0 40px ${n.alpha(n.accent.green,.5)};
  margin-bottom: 8px;
  animation: ${ui} 3s ease-in-out infinite;
  text-align: center;
  word-break: break-word;
`,fi=s.p`
  color: ${n.text.secondary};
  font-size: ${({$mobile:e})=>e?"0.9rem":"1.1rem"};
  font-family: 'Courier New', monospace;
  letter-spacing: ${({$mobile:e})=>e?"3px":"6px"};
  margin-bottom: 24px;
  text-align: center;
`,bi=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  max-width: 520px;
  text-align: center;
`,hi=s.div`
  color: ${n.alpha(n.accent.green,.6)};
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 8px;
  animation: ${mi} 2s ease-in-out infinite;
`,Vt=s.div`
  color: ${n.alpha(n.text.primary,.85)};
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
`,xi=s.div`
  color: ${n.alpha(n.text.secondary,.7)};
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  line-height: 1.5;
  margin-top: 4px;
  max-width: 440px;
  white-space: pre-line;
`,_i=s.div`
  width: 60px;
  height: 1px;
  background: ${n.alpha(n.accent.green,.3)};
  margin: 8px 0 12px;
`,Wt=s.button`
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
`,$n=s.input`
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
`,vi=s($n)`
  font-size: ${({$mobile:e})=>"0.85rem"};
`,wi=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 400px;
`,Ti=s.div`
  color: ${n.accent.red};
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  margin-top: 8px;
  text-align: center;
  padding: 0 16px;
`,Jt=s.div`
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
`,Si=s.p`
  color: ${n.text.secondary};
  font-size: ${({$mobile:e})=>e?"0.75rem":"0.85rem"};
  margin-top: 16px;
  font-family: 'Courier New', monospace;
  text-align: center;
  max-width: 360px;
`,Xt=s.p`
  color: ${n.accent.green};
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 24px;
`,Ei=s.div`
  color: ${n.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  background: ${n.alpha(n.accent.green,.08)};
  border: 1px solid ${n.alpha(n.accent.green,.2)};
  border-radius: 4px;
  padding: 6px 12px;
  text-align: center;
  width: 100%;
`,ki=s.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
  width: 100%;
  max-width: 420px;
`,Ci=s.button`
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
`,ji=s.a`
  color: ${n.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  text-decoration: none;
  transition: color 0.15s;
  &:hover { color: ${n.accent.green}; text-decoration: underline; }
`,qt=s.div`
  margin-bottom: 24px;
  /* Override RainbowKit button to match Silent Expanse: Strife theme */
  [data-rk] button {
    font-family: 'Courier New', monospace !important;
  }
`;function Ln(){const[e,a]=m.useState(""),[i,c]=m.useState(""),[l,p]=m.useState(!1),[h,b]=m.useState(null),[u,o]=m.useState("0.01"),[S,k]=m.useState(!1),[A,P]=m.useState(0),[T,I]=m.useState(null),{t:B,toggleLang:V}=he(),W=Ue(),v=r(g=>g.loading),M=e.length,J=M>32?B("connect.name_too_long"):"",{address:z,isConnected:U}=ra(),E=we(),{createCivilization:H,fetchEntryFee:Y}=Ae(),N=z?z.slice(0,4)+"..."+z.slice(-4):"";m.useEffect(()=>{try{const g=new URL(window.location.href),R=g.searchParams.get("ref")||g.searchParams.get("referrer")||g.searchParams.get("invite");R&&ut(R)&&!i&&c(R)}catch{}},[]);const x=m.useRef(!1),X=m.useRef(z);m.useEffect(()=>{const g=X.current&&z&&X.current!==z;if((x.current&&!U||g)&&r.getState().setDisconnected(),x.current=U,X.current=z,!U||!z||!E.isReady||E.contractUnavailable||!E.game||!E.sesToken)return;let O=!1;k(!0);async function _(){let F;try{F=await E.game.getCivilization(z)}catch{O||k(!1);return}if(!O){if(F!=null&&F.exists){const q=Fe(F);r.setState({connected:!0,address:z,playerCiv:q}),Promise.all([E.sesToken.balanceOf(z),E.game.getEntryFee()]).then(async([ne,me])=>{r.setState({sesBalance:parseFloat(Je(ne)).toFixed(2),entryFee:Je(me)})}).catch(()=>{})}O||k(!1)}}return _(),()=>{O=!0}},[U,z,E.isReady,E.contractUnavailable]),m.useEffect(()=>{let g=!1;const R=async()=>{try{const F=await(await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT",{cache:"no-store"})).json();!g&&F.price&&I(parseFloat(F.price))}catch{}};R();const O=setInterval(R,6e4);return()=>{g=!0,clearInterval(O)}},[]),m.useEffect(()=>{const g=O=>{const _=parseFloat(O);return Number.isFinite(_)?Math.min(100,Math.max(0,Math.round((_-.01)/.04*100))):0};Y().then(O=>{o(O),P(g(O))}).catch(()=>{});const R=setInterval(()=>{Y().then(O=>{o(O),P(g(O))}).catch(()=>{})},3e4);return()=>clearInterval(R)},[Y]);const C=async()=>{if(!e.trim()){b(B("connect.name_required"));return}if(e.length>32){b(B("connect.name_too_long"));return}if(!z){b(B("connect.wallet_required"));return}const g=i.trim();if(g&&!ut(g)){b(B("connect.bad_referrer"));return}p(!0),b(null),await H(e.trim(),g||void 0)||p(!1)},K=!U,f=U&&(!E.isReady||E.contractUnavailable||S),d=U&&E.isReady&&!E.contractUnavailable&&!S&&!l,y=l;return t.jsxs(yi,{children:[t.jsx(Bt,{variant:"hero",clip:"hero",dense:!0}),t.jsxs(bi,{children:[t.jsxs(hi,{children:["◈ ",B("lore.splash_title")," ◈"]}),t.jsx(Vt,{children:B("lore.splash_line1")}),t.jsx(Vt,{children:B("lore.splash_line2")}),t.jsx(_i,{}),t.jsx(xi,{children:B("lore.protocol_intro")})]}),t.jsx(gi,{$mobile:W,children:B("connect.title")}),t.jsx(fi,{$mobile:W,children:B("connect.subtitle")}),t.jsxs(Jt,{$mobile:W,children:[B("connect.fee_label"),": ",t.jsxs("strong",{children:[u," BNB"]}),T!=null&&` ≈ $${(parseFloat(u)*T).toFixed(2)}`]}),t.jsx("div",{style:{width:"100%",maxWidth:360,height:4,background:n.alpha(n.accent.gold,.15),borderRadius:2,overflow:"hidden",marginBottom:8},children:t.jsx("div",{style:{width:`${A}%`,height:"100%",background:n.accent.gold,transition:"width 0.5s"}})}),t.jsx("div",{style:{color:n.alpha(n.accent.gold,.7),fontSize:"0.68rem",fontFamily:"'Courier New', monospace",marginBottom:12},children:B("connect.fee_progress",{pct:A})}),K&&t.jsxs(t.Fragment,{children:[t.jsx(qt,{children:t.jsx(mt,{})}),t.jsx(Si,{$mobile:W,children:B("connect.fee_hint")})]}),f&&t.jsx(Xt,{children:!E.isReady||E.contractUnavailable?B("connect.loading_contract"):B("connect.checking_civ")}),d&&t.jsxs(wi,{children:[t.jsx(qt,{children:t.jsx(mt,{})}),N&&t.jsxs(Ei,{children:["🔗 ",N]}),t.jsxs("div",{style:{width:"100%",maxWidth:360},children:[t.jsx($n,{$mobile:W,placeholder:B("connect.civ_name"),value:e,onChange:g=>a(g.target.value),maxLength:32,onKeyDown:g=>g.key==="Enter"&&C(),autoFocus:!0,style:J?{borderColor:n.accent.red}:void 0}),t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:4},children:[t.jsx("span",{style:{color:n.text.secondary,fontSize:"0.68rem",fontFamily:"'Courier New', monospace"},children:B("connect.name_hint")}),t.jsx("span",{style:{color:M>28?n.accent.gold:n.text.secondary,fontSize:"0.68rem",fontFamily:"'Courier New', monospace"},children:B("connect.char_count",{cur:M})})]}),J&&t.jsx("div",{style:{color:n.accent.red,fontSize:"0.7rem",marginTop:4},children:J})]}),t.jsx(vi,{$mobile:W,placeholder:B("connect.referrer"),value:i,onChange:g=>c(g.target.value),onKeyDown:g=>g.key==="Enter"&&C()}),i&&ut(i)&&new URLSearchParams(window.location.search).get("ref")===i&&t.jsx("span",{style:{color:n.accent.green,fontSize:"0.68rem",fontFamily:"'Courier New', monospace"},children:B("connect.referrer_auto")}),t.jsx(Jt,{$mobile:W,children:B("connect.referral_bonus")}),t.jsx(Wt,{$mobile:W,onClick:C,disabled:v||!!J||!e.trim(),children:B("connect.pay",{fee:u})})]}),y&&t.jsxs(t.Fragment,{children:[t.jsx(Xt,{children:B("general.creating")}),t.jsxs(Wt,{$mobile:W,onClick:()=>p(!1),disabled:v,style:{marginTop:16,fontSize:W?"0.85rem":"0.95rem",animation:"none"},children:["← ",B("general.back")]})]}),h&&t.jsx(Ti,{children:h}),t.jsxs(ki,{children:[t.jsx(Ci,{onClick:V,children:B("connect.lang_switch")}),t.jsx(ji,{href:"https://docs.strifelabs.com",target:"_blank",rel:"noopener noreferrer",children:B("connect.tutorial")})]})]})}function Ze(e){const[a,i]=m.useState(()=>Date.now());return m.useEffect(()=>{const c=setInterval(()=>i(Date.now()),e);return()=>clearInterval(c)},[e]),a}const Ai=1e6;function He(e){return Number.isFinite(e)?e.toExponential(2):"0"}function D(e,a=2){return Number.isFinite(e)?Math.abs(e)>=1e9?(e/1e9).toFixed(a).replace(/\.?0+$/,"")+"B":Math.abs(e)>=1e6?(e/1e6).toFixed(a).replace(/\.?0+$/,"")+"M":Math.abs(e)>=Ai?(e/1e3).toFixed(a).replace(/\.?0+$/,"")+"K":Number.isInteger(e)?e.toLocaleString():e.toFixed(a).replace(/\.?0+$/,""):"0"}function gt(e){const a=typeof e=="string"?parseFloat(e):e;return Number.isFinite(a)?D(a):"0"}const Mi=s.div`
  background: ${n.bg};
  border: 1px solid ${n.border};
  border-radius: 6px;
  padding: 6px 10px;
`,Ni=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`,$i=s.span`
  color: ${n.text.secondary};
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
`,Li=s.span`
  color: ${({$color:e})=>e||n.accent.green};
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
`,Ri=s.div`
  height: 6px;
  background: ${n.alpha(n.border,.3)};
  border-radius: 3px;
  overflow: hidden;
`,Ii=s.div`
  height: 100%;
  width: ${({$pct:e})=>Math.max(0,Math.min(100,e))}%;
  background: ${({$color:e})=>e||n.accent.green};
  border-radius: 3px;
  transition: width 0.4s ease;
`;function Pi({label:e,value:a,max:i,rate:c,color:l,icon:p}){const h=i!==void 0&&i>0,b=h?a/i*100:0;return t.jsxs(Mi,{children:[t.jsxs(Ni,{children:[t.jsxs($i,{children:[p||""," ",e]}),t.jsxs("span",{children:[t.jsx(Li,{$color:l,children:D(a)}),h&&t.jsxs("span",{style:{color:n.text.secondary,fontSize:"0.7rem",fontFamily:"'Courier New', monospace"},children:[" ","/ ",D(i)]}),c&&t.jsx("span",{style:{color:n.text.secondary,fontSize:"0.65rem",fontFamily:"'Courier New', monospace",marginLeft:6},children:c})]})]}),h&&t.jsx(Ri,{children:t.jsx(Ii,{$pct:b,$color:l})})]})}const Bi=s.img`
  width: 16px;
  height: 16px;
  vertical-align: -3px;
  object-fit: contain;
  image-rendering: auto;
  flex-shrink: 0;
  /* 20px 变体由 size prop 覆盖 */
`,Di=s.span`
  line-height: 1;
`;function G({icon:e,size:a}){return e.startsWith("/")||e.startsWith("data:")||e.startsWith("http")?t.jsx(Bi,{src:e,alt:"",style:a?{width:a,height:a}:void 0,onError:c=>{c.currentTarget.style.display="none"}}):t.jsx(Di,{style:a?{fontSize:a}:void 0,children:e})}const Oi=s.div`
  background: ${n.alpha(n.card,.6)};
  border: 1px solid ${({$warn:e})=>e?n.status.warning:n.border};
  border-radius: ${n.radius.md};
  padding: ${n.space.md};
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: ${n.elevation.card};
  transition: border-color ${n.transition.fast}, box-shadow ${n.transition.fast};
  &:hover {
    border-color: ${({$warn:e})=>e?n.status.warning:n.alpha(n.accent.green,.32)};
    box-shadow: 0 0 12px ${n.alpha(n.accent.green,.12)}, ${n.elevation.card};
  }
`,zi=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 4px;
`,Fi=s.span`
  color: ${n.text.primary};
  font-size: 0.82rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
`,Hi=s.span`
  color: ${n.text.secondary};
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  background: ${n.alpha(n.text.secondary,.08)};
  border-radius: 3px;
  padding: 1px 6px;
`,Ui=s.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`,Yi=s.div`
  display: flex;
  gap: 6px;
  margin-top: 10px;
  flex-wrap: wrap;
`;function Gi({icon:e,title:a,level:i,levelKey:c="Lv",children:l,bars:p,actions:h,warn:b}){return t.jsxs(Oi,{$warn:b,children:[t.jsxs(zi,{children:[t.jsxs(Fi,{children:[t.jsx(G,{icon:e})," ",a]}),i!==void 0&&t.jsxs(Hi,{children:[c,".",i]})]}),t.jsxs(Ui,{children:[p==null?void 0:p.map((u,o)=>t.jsx(Pi,{...u},o)),l]}),h&&t.jsx(Yi,{children:h})]})}const Ki={primary:pt`
    background: ${n.accent.green};
    color: ${n.bg};
    border: none;
    &:hover:not(:disabled) { background: ${n.alpha(n.accent.green,.92)}; filter: brightness(1.05); }
    &:active:not(:disabled) { background: ${n.alpha(n.accent.green,.82)}; }
  `,danger:pt`
    background: ${n.accent.red};
    color: #fff;
    border: none;
    &:hover:not(:disabled) { background: ${n.alpha(n.accent.red,.92)}; filter: brightness(1.05); }
    &:active:not(:disabled) { background: ${n.alpha(n.accent.red,.82)}; }
  `,ghost:pt`
    background: transparent;
    color: ${n.text.secondary};
    border: 1px solid ${n.border};
    &:hover:not(:disabled) { background: ${ti(n.border)}; border-color: ${n.alpha(n.accent.green,.3)}; }
    &:active:not(:disabled) { background: ${n.alpha(n.border,.25)}; }
  `},Vi=s.button`
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
  transition: background ${n.transition.fast}, opacity ${n.transition.fast}, transform ${n.transition.fast}, filter ${n.transition.fast};
  white-space: nowrap;
  ${({$variant:e})=>Ki[e]}
  &:disabled { opacity: 0.35; cursor: not-allowed; }
  &:active:not(:disabled) { opacity: 0.92; transform: scale(0.98); }
`;function ce({variant:e="ghost",disabled:a,loading:i,icon:c,children:l,onClick:p,title:h,style:b,...u}){return t.jsxs(Vi,{$variant:e,disabled:a||i,onClick:p,title:h,style:b,...u,children:[i&&"⟳ ",c&&t.jsx(G,{icon:c}),l]})}const Wi=Ce`
  0%,100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
`,Ji=s.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${({$mobile:e})=>e&&pt`padding: 4px 0;`}
`,et=s.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: 14px 16px;
`,Zt=s.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
`,Xi=s.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 10px;
`,Qt=s.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
`,qi=s.div`
  color: ${n.accent.green};
  font-size: 1.1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 1px;
`,en=s.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
`,Ne=s.div`
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
`,$e=s.div`
  color: ${n.text.secondary};
  font-size: 0.62rem;
  font-family: ${n.font.mono};
  text-transform: uppercase;
  letter-spacing: 1.4px;
  margin-bottom: 3px;
  opacity: 0.9;
`,Le=s.div`
  color: ${({$color:e})=>e};
  font-size: 1.08rem;
  font-family: ${n.font.mono};
  font-weight: 700;
  line-height: 1.1;
`,tt=s.div`
  color: ${n.text.secondary};
  font-size: 0.62rem;
  font-family: ${n.font.mono};
  opacity: 0.85;
`;function Rn(){const{t:e}=he(),a=r(x=>x.playerCiv),i=r(x=>x.address),c=r(x=>x.sesBalance),l=r(x=>x.pendingEnergy),p=r(x=>x.attackTokens),h=r(x=>x.loading);r(x=>x.activeAction);const b=r(x=>x.error),u=Ue(),{clearError:o,rebuildCivilization:S,repairCollector:k}=Ae(),A=r(x=>x.collectRate),P=r(x=>x.attackPower),T=r(x=>x.isDestroyed),I=r(x=>x.collectorDurability),B=r(x=>x.combatBoost),V=r(x=>x.shieldDefense),W=r(x=>x.speed),v=r(x=>x.radarRange);r(x=>x.pendingCollect),r(x=>x.lastSyncAt),Ze(1e3);const M=r(x=>x.currentAlliance),J=r(x=>x._allianceTotemLevel),z=(M==null?void 0:M.memberCount)??0,U=z>1?Math.floor((z-1)*8*(1e4+J*50)/1e4):0,E=V+U,H=i?`${i.slice(0,6)}...${i.slice(-4)}`:"",Y=parseFloat(c),N=m.useMemo(()=>{const x=a,X=I.max>0&&I.current/I.max<.3,C=x.maxShieldHP>0&&x.shieldHP/x.maxShieldHP<.2;return[{key:"energyCollector",icon:pe.energyCollector.icon,title:pe.energyCollector.name,lv:x.energyCollectorLv,color:pe.energyCollector.color,warn:X,bars:[{label:e("hud.collect_rate"),value:A,rate:D(A,2)+e("general.per_sec"),color:n.accent.green},...I.max>0?[{label:e("hud.durability"),value:I.current,max:I.max,color:X?n.accent.red:n.accent.blue}]:[]]},{key:"weapon",icon:pe.weapon.icon,title:pe.weapon.name,lv:x.weaponLv,color:pe.weapon.color,warn:!1,bars:[{label:e("hud.attack_power"),value:P,color:n.accent.red}]},{key:"shield",icon:pe.shield.icon,title:pe.shield.name,lv:x.shieldLv,color:pe.shield.color,warn:C,bars:[{label:e("hud.shield"),value:x.shieldHP,max:x.maxShieldHP,color:C?n.accent.red:n.accent.shield},{label:e("hud.defense"),value:E,color:pe.shield.color}]},{key:"radar",icon:pe.radar.icon,title:pe.radar.name,lv:x.radarLv,color:pe.radar.color,warn:!1,bars:[{label:e("hud.scan_range"),value:v||x.scanRange,rate:(v||x.scanRange)+e("general.ls"),color:n.accent.blue}]},{key:"engine",icon:pe.engine.icon,title:pe.engine.name,lv:x.engineLv,color:pe.engine.color,warn:!1,bars:[{label:e("hud.speed"),value:W,rate:W+e("general.ls_h"),color:pe.engine.color}]}]},[a,A,P,E,W,v,I,e]);return a?t.jsxs(Ji,{$mobile:u,children:[b&&t.jsx("div",{onClick:o,style:{color:n.accent.red,fontSize:"0.78rem",fontFamily:n.font.mono,padding:"6px 10px",background:n.alpha(n.accent.red,.1),borderRadius:n.radius.sm,cursor:"pointer",textAlign:"center",border:`1px solid ${n.alpha(n.accent.red,.2)}`,animation:`${Wi} 240ms ease-out`},children:e("hud.error_dismiss",{msg:b})}),t.jsxs(et,{children:[t.jsx(Zt,{style:{marginBottom:10},children:t.jsxs("div",{style:{flex:1},children:[t.jsx(qi,{children:a.name}),t.jsx(en,{children:H})]})}),t.jsxs(en,{style:{color:n.accent.blue,whiteSpace:"nowrap",marginBottom:10},children:[e("hud.location"),": (",He(a.x),", ",He(a.y),", ",He(a.z),")"]}),t.jsxs(Zt,{children:[t.jsxs(Ne,{$color:n.accent.gold,children:[t.jsx($e,{children:e("hud.ses")}),t.jsx(Le,{$color:n.accent.gold,children:gt(Y)})]}),t.jsxs(Ne,{$color:n.accent.green,children:[t.jsx($e,{children:e("general.energy")}),t.jsx(Le,{$color:n.accent.green,children:D(a.energy)}),t.jsxs(tt,{children:[D(A,2),e("general.per_sec")]})]}),t.jsxs(Ne,{$color:n.accent.red,children:[t.jsx($e,{children:e("general.health")}),t.jsx(Le,{$color:n.accent.red,children:D(a.health)})]}),t.jsxs(Ne,{$color:n.accent.shield,children:[t.jsx($e,{children:e("hud.shield")}),t.jsx(Le,{$color:n.accent.shield,children:a.maxShieldHP>0?Math.round(a.shieldHP/a.maxShieldHP*100)+"%":"0%"})]}),t.jsxs(Ne,{$color:n.accent.violet,children:[t.jsx($e,{children:e("hud.attack_token_label")}),t.jsxs(Le,{$color:n.accent.violet,children:[D(p.current,1),"/",p.max]}),t.jsxs(tt,{children:[D(p.ratePerSec,4),e("general.per_sec")]})]}),B>0&&t.jsxs(Ne,{$color:n.accent.gold,children:[t.jsx($e,{children:e("hud.combat_boost")}),t.jsxs(Le,{$color:n.accent.gold,children:["+",B,"%"]}),t.jsx(tt,{children:e("hud.totem_bonus")})]}),l>0&&t.jsxs(Ne,{$color:n.accent.gold,children:[t.jsx($e,{children:e("hud.pending_label")}),t.jsx(Le,{$color:n.accent.gold,children:D(l)}),t.jsx(tt,{children:e("hud.pending_type")})]})]})]}),T&&t.jsx(et,{children:t.jsxs("div",{style:{textAlign:"center",padding:"16px 8px"},children:[t.jsx(Qt,{style:{color:n.accent.red,marginBottom:8},children:e("hud.destroyed_title")}),t.jsx("div",{style:{color:n.text.secondary,fontSize:"0.78rem",marginBottom:12,fontFamily:"'Courier New', monospace"},children:e("hud.destroyed_desc")}),t.jsx(ce,{variant:"danger",disabled:h,onClick:()=>!h&&S(),children:e("hud.destroyed_btn")}),t.jsx("div",{style:{color:n.text.secondary,fontSize:"0.68rem",marginTop:8,fontFamily:"'Courier New', monospace"},children:e("hud.rebuild_cost")})]})}),!T&&I.max>0&&I.current<I.max*.3&&t.jsx(et,{style:{borderColor:n.alpha(n.accent.gold,.3)},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8},children:[t.jsx("span",{style:{color:n.accent.gold,fontSize:"0.78rem",fontFamily:"'Courier New', monospace"},children:e("hud.durability_warn",{pct:Math.round(I.current/I.max*100)})}),t.jsx(ce,{variant:"ghost",icon:"/assets/systems/collector.web.png",disabled:h,onClick:()=>!h&&k(I.max),children:e("hud.durability_repair")})]})}),t.jsxs(et,{children:[t.jsx(Qt,{children:e("hud.tech_systems")}),t.jsx(Xi,{children:N.map(x=>t.jsx(Gi,{icon:x.icon,title:x.title,level:x.lv,bars:x.bars,warn:x.warn},x.key))})]})]}):null}const Zi=Ce`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,Qi=Ce`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`,er=s.div`
  display: inline-block;
  width: ${({$size:e})=>e}px;
  height: ${({$size:e})=>e}px;
  border: ${({$size:e})=>Math.max(2,Math.floor(e/8))}px solid rgba(255, 255, 255, 0.08);
  border-top-color: ${({$color:e})=>e};
  border-radius: 50%;
  animation: ${Zi} 0.8s linear infinite;
`,Tt=s.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({$color:e})=>e};
  margin: 0 2px;
  animation: ${Qi} 1.2s ease-in-out infinite;
  animation-delay: ${({$delay:e})=>e}s;
`,tr=s.span`
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
`;function nr({size:e=24,color:a=n.accent.green}){return t.jsx(er,{$size:e,$color:a})}function ar({color:e=n.accent.green}){return t.jsxs(tr,{children:[t.jsx(Tt,{$delay:0,$color:e}),t.jsx(Tt,{$delay:.2,$color:e}),t.jsx(Tt,{$delay:.4,$color:e})]})}const ir=s.div`
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
`,rr=s.div`
  color: ${n.accent.green};
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  letter-spacing: 1px;
`;function Dt({message:e="处理中",transparent:a,color:i}){return t.jsxs(ir,{$transparent:a,children:[t.jsx(nr,{color:i}),t.jsxs(rr,{style:{color:i||"#00ff88"},children:[e,t.jsx(ar,{color:i})]})]})}const sr=s.div`
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(0, 0, 0, 0.6);
  display: ${({$open:e})=>e?"flex":"none"};
  align-items: center;
  justify-content: center;
  padding: 24px;
`,or=s.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 380px;
  backdrop-filter: blur(12px);
`,lr=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${n.border};
`,cr=s.div`
  color: ${n.text.primary};
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 1px;
`,dr=s.div`
  color: ${n.text.secondary};
  font-size: 0.8rem;
  font-family: ${n.font.mono};
  line-height: 1.6;
  margin-bottom: 16px;
  strong { color: ${n.accent.gold}; font-weight: 700; }
  em { color: ${n.accent.red}; font-style: normal; }
  b { color: ${n.text.primary}; }
`,pr=s.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`,ur=s.div`
  color: ${n.alpha(n.text.secondary,.6)};
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  margin-top: 8px;
  text-align: right;
`;function Ie({open:e,title:a,icon:i,children:c,gasEstimate:l,loading:p,onConfirm:h,onCancel:b,confirmLabel:u="确认",cancelLabel:o="取消",confirmVariant:S="primary"}){const k=m.useRef(null);return m.useEffect(()=>{if(!e)return;const A=T=>{if(T.key==="Escape"&&b(),T.key==="Tab"&&k.current){const I=k.current.querySelectorAll("button:not([disabled]), [href]");if(I.length===0)return;const B=I[0],V=I[I.length-1];T.shiftKey&&document.activeElement===B?(T.preventDefault(),V.focus()):!T.shiftKey&&document.activeElement===V&&(T.preventDefault(),B.focus())}};document.addEventListener("keydown",A);const P=document.body.style.overflow;return document.body.style.overflow="hidden",setTimeout(()=>{var I,B;const T=(I=k.current)==null?void 0:I.querySelectorAll("button");(B=T==null?void 0:T[T.length-1])==null||B.focus()},30),()=>{document.removeEventListener("keydown",A),document.body.style.overflow=P}},[e,b]),t.jsx(sr,{$open:e,ref:k,role:"dialog","aria-modal":"true","aria-label":a,"aria-busy":p?"true":void 0,onClick:b,children:t.jsxs(or,{onClick:A=>A.stopPropagation(),children:[t.jsx(lr,{children:t.jsxs(cr,{id:"txconfirm-title",children:[i&&t.jsx(G,{icon:i})," ",a]})}),t.jsx(dr,{children:c}),l&&t.jsxs(ur,{children:["⛽ Gas: ~",l]}),t.jsxs(pr,{children:[t.jsx(ce,{variant:"ghost",onClick:b,disabled:p,children:o}),t.jsx(ce,{variant:S,onClick:h,loading:p,"aria-label":u,children:u})]})]})})}const mr=s.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: ${({$mobile:e})=>e?"10px":"14px 16px"};
  position: relative;
`,yr=s.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`,gr=s.div`
  position: absolute; inset: 0; z-index: 1; border-radius: 8px; overflow: hidden;
`,fr=s.div`
  display: flex; gap: 6px; margin-bottom: 12px;
`,nt=s.div`
  flex: 1;
  background: ${({$color:e})=>n.alpha(e,.06)};
  border: 1px solid ${({$color:e})=>n.alpha(e,.15)};
  border-radius: 6px;
  padding: 6px 10px;
  text-align: center;
`,at=s.div`
  color: ${n.text.secondary}; font-size: 0.65rem;
  font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;
`,it=s.div`
  color: ${({$color:e})=>e}; font-size: 0.88rem;
  font-family: 'Courier New', monospace; font-weight: bold; margin-top: 2px;
`,rt=s.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
`,Te=s.button`
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
`,Se=s.span`
  font-size: 1.3rem;
  line-height: 1;
`,Ee=s.span`
  color: ${({$color:e})=>e};
  font-size: 0.72rem;
  font-weight: bold;
  text-align: center;
  line-height: 1.2;
`,Re=s.span`
  color: ${({$color:e})=>e};
  font-size: 0.6rem;
  font-family: 'Courier New', monospace;
  background: ${({$color:e})=>n.alpha(e,.12)};
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
`,St=s.input`
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
`,tn=s.div`
  display: flex; gap: 6px; margin-top: 6px;
`,st=s.div`
  color: ${n.text.secondary};
  font-size: 0.65rem;
  font-family: ${n.font.mono};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 12px 0 6px 0;
  padding-left: 6px;
  border-left: 2px solid ${n.alpha(n.accent.green,.5)};
  opacity: 0.9;
`,nn=s.div`
  height: 1px;
  background: ${n.alpha(n.border,.3)};
  margin: 8px 0;
`,br=s.div`
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
`;function In(){const[e,a]=m.useState(!1),[i,c]=m.useState(!1),[l,p]=m.useState(""),[h,b]=m.useState(""),[u,o]=m.useState(""),[S,k]=m.useState(""),A=r(j=>j.pendingEnergy),P=r(j=>{var oe;return((oe=j.playerCiv)==null?void 0:oe.isMoving)??!1}),T=r(j=>j.loading),I=r(j=>j.activeAction),B=I!==null&&["collect","claimCombat","distribute","claimSES","move","jump","repairShield","regenShield","repairAll","cancelMove"].includes(I),V=r(j=>j.error),W=r(j=>j.sesBalance),v=r(j=>j.playerCiv),M=r(j=>j.collectRate),J=r(j=>j.currentEpoch),z=r(j=>j.epochClaimed),U=r(j=>j.epochEndTime),E=r(j=>j.lastDistributedEpoch),H=r(j=>j.dailyEmission),Y=Ue(),{t:N}=he(),{collectEnergy:x,claimCombatEnergy:X,claimDailySES:C,distribute:K,startMove:f,spaceJump:d,repairShield:y,regenShield:g,repairAll:R,cancelMove:O,clearError:_}=Ae(),F=()=>{const j=parseInt(l),oe=parseInt(h),Z=parseInt(u);if(isNaN(j)||isNaN(oe)||isNaN(Z)){k(N("action.move_invalid"));return}k(""),f(j,oe,Z),a(!1),p(""),b(""),o("")};v&&v.shieldHP>0;const q=v?v.shieldHP>=(v.maxShieldHP||0)&&v.maxShieldHP>0:!1,ne=r(j=>j.pendingCollect),me=r(j=>j.lastSyncAt),xe=r(j=>j.collectorDurability),de=Ze(1e3),ve=(()=>{if(!ne)return 0;if(!me||!M)return ne;const j=Math.max(0,(de-me)/1e3),oe=M*j,Z=ne+oe;return xe.max>0&&xe.current<=0?Math.min(Z,ne):Z})(),$=E>=J,se=U>0?Math.max(0,Math.floor((U*1e3-Date.now())/1e3)):0,_e=se>0?N("action.epoch_remaining",{min:Math.floor(se/60),sec:se%60}):N("action.calculating");return t.jsxs(mr,{$mobile:Y,children:[B&&t.jsx(gr,{children:t.jsx(Dt,{message:N("general.loading"),color:n.accent.green,transparent:!0})}),t.jsxs(yr,{children:[t.jsx(G,{icon:"/assets/systems/energy.web.png"})," ",N("action.title")]}),v&&t.jsxs(fr,{children:[t.jsxs(nt,{$color:n.accent.gold,children:[t.jsx(at,{children:N("action.ses_balance")}),t.jsx(it,{$color:n.accent.gold,children:gt(W)})]}),t.jsxs(nt,{$color:n.accent.green,children:[t.jsx(at,{children:N("action.collect_rate")}),t.jsxs(it,{$color:n.accent.green,children:[D(M,2),N("general.per_sec")]})]}),t.jsxs(nt,{$color:n.accent.violet,children:[t.jsx(at,{children:N("action.daily_est")}),t.jsxs(it,{$color:n.accent.violet,children:[H>0?D(H,0):"…"," SES"]})]}),t.jsxs(nt,{$color:n.accent.blue,children:[t.jsxs(at,{children:[N("general.epoch")," #",J]}),t.jsx(it,{$color:n.accent.blue,children:_e})]})]}),v&&v.energyCollectorLv<=2&&t.jsx("div",{style:{color:n.alpha(n.accent.green,.85),fontSize:"0.7rem",fontFamily:"'Courier New', monospace",background:n.alpha(n.accent.green,.08),border:`1px dashed ${n.alpha(n.accent.green,.25)}`,borderRadius:6,padding:"6px 10px",marginBottom:10},children:N("general.tooltip_newbie")}),V&&t.jsx(br,{onClick:_,children:N("hud.error_dismiss",{msg:V})}),t.jsxs(st,{children:[t.jsx(G,{icon:"/assets/systems/energy.web.png"})," ",N("action.group_collect")]}),t.jsx(rt,{children:t.jsxs(Te,{$color:n.accent.green,$disabled:T,onClick:()=>!T&&x(),children:[t.jsx(Se,{children:t.jsx(G,{icon:"/assets/systems/energy.web.png"})}),t.jsx(Ee,{$color:n.accent.green,children:N("action.collect")}),ve>0&&t.jsxs(Re,{$color:n.accent.green,children:["~",D(Math.floor(ve))]})]})}),t.jsxs(st,{children:[t.jsx(G,{icon:"/assets/systems/crate.web.png"})," ",N("action.group_claim")]}),t.jsxs(rt,{children:[t.jsxs(Te,{$color:A>0?n.accent.gold:n.text.secondary,$disabled:T||A<=0,onClick:()=>!T&&A>0&&X(),children:[t.jsx(Se,{children:t.jsx(G,{icon:"/assets/systems/crate.web.png"})}),t.jsx(Ee,{$color:A>0?n.accent.gold:n.text.secondary,children:N("action.combat_energy")}),A>0&&t.jsx(Re,{$color:n.accent.gold,children:D(A)}),A<=0&&t.jsx(Re,{$color:n.text.secondary,children:N("action.combat_energy_empty")})]}),!$&&t.jsxs(Te,{$color:n.accent.gold,$disabled:T,onClick:()=>!T&&K(),children:[t.jsx(Se,{children:t.jsx(G,{icon:"/assets/systems/distribute.web.png"})}),t.jsx(Ee,{$color:n.accent.gold,children:N("action.distribute")}),t.jsx(Re,{$color:n.accent.gold,children:N("action.distributing")})]}),$&&t.jsxs(Te,{$color:z?n.text.secondary:n.accent.violet,$disabled:T||z,onClick:()=>!T&&!z&&C(),children:[t.jsx(Se,{children:t.jsx(G,{icon:"/assets/systems/claim.web.png"})}),t.jsx(Ee,{$color:z?n.text.secondary:n.accent.violet,children:N(z?"action.claimed_today":"action.claim_ses")}),t.jsx(Re,{$color:z?n.text.secondary:n.accent.green,children:z?"✓":_e})]})]}),t.jsx(nn,{}),t.jsxs(st,{children:[t.jsx(G,{icon:"/assets/systems/engine.web.png"})," ",N("action.group_move")]}),t.jsxs(rt,{children:[e?t.jsxs("div",{style:{gridColumn:"1 / -1"},children:[v&&t.jsxs("div",{style:{color:n.accent.blue,fontSize:"0.68rem",fontFamily:"'Courier New', monospace",marginBottom:6,opacity:.8,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:[N("hud.location"),": (",He(v.x),", ",He(v.y),", ",He(v.z),")"]}),t.jsxs(tn,{children:[t.jsx(St,{$mobile:Y,placeholder:"X",value:l,onChange:j=>p(j.target.value),onFocus:j=>Y&&setTimeout(()=>j.target.scrollIntoView({behavior:"smooth",block:"center"}),150),disabled:T}),t.jsx(St,{$mobile:Y,placeholder:"Y",value:h,onChange:j=>b(j.target.value),onFocus:j=>Y&&setTimeout(()=>j.target.scrollIntoView({behavior:"smooth",block:"center"}),150),disabled:T}),t.jsx(St,{$mobile:Y,placeholder:"Z",value:u,onChange:j=>o(j.target.value),onFocus:j=>Y&&setTimeout(()=>j.target.scrollIntoView({behavior:"smooth",block:"center"}),150),disabled:T})]}),S&&t.jsx("div",{style:{color:n.accent.red,fontSize:"0.68rem",fontFamily:"'Courier New', monospace",marginTop:4},children:S}),t.jsxs(tn,{children:[t.jsx(ce,{variant:"primary",disabled:T,onClick:F,style:{flex:1},children:N("action.move_confirm")}),t.jsx(ce,{variant:"ghost",onClick:()=>{a(!1),k("")},children:N("action.move_cancel")})]})]}):t.jsxs(Te,{$color:n.accent.blue,$disabled:T,onClick:()=>!T&&a(!0),children:[t.jsx(Se,{children:t.jsx(G,{icon:"/assets/systems/engine.web.png"})}),t.jsx(Ee,{$color:n.accent.blue,children:N("action.move")})]}),t.jsxs(Te,{$color:n.accent.pink,$disabled:T,onClick:()=>!T&&c(!0),children:[t.jsx(Se,{children:t.jsx(G,{icon:"/assets/systems/jump.web.png"})}),t.jsx(Ee,{$color:n.accent.pink,children:N("action.jump")})]}),t.jsxs(Te,{$color:n.accent.red,$disabled:T||e||!P,onClick:()=>!T&&!e&&P&&O(),children:[t.jsx(Se,{children:t.jsx(G,{icon:"/assets/systems/cancel.web.png"})}),t.jsx(Ee,{$color:P?n.accent.red:n.text.secondary,children:N("action.cancel_move")}),P&&t.jsx(Re,{$color:n.accent.red,children:N("action.moving")})]})]}),t.jsx(nn,{}),t.jsxs(st,{children:[t.jsx(G,{icon:"/assets/systems/collector.web.png"})," ",N("action.group_repair")]}),t.jsxs(rt,{children:[t.jsxs(Te,{$color:n.accent.blue,$disabled:T||q,onClick:()=>!T&&!q&&y(),children:[t.jsx(Se,{children:t.jsx(G,{icon:"/assets/systems/shield.web.png"})}),t.jsx(Ee,{$color:q?n.text.secondary:n.accent.blue,children:N("action.repair_shield")}),t.jsx(Re,{$color:q?n.text.secondary:n.accent.blue,children:q?N("action.shield_full"):`HP ${(v==null?void 0:v.shieldHP)??0}/${(v==null?void 0:v.maxShieldHP)??0}`})]}),t.jsxs(Te,{$color:n.accent.green,$disabled:T,onClick:()=>!T&&g(),children:[t.jsx(Se,{children:t.jsx(G,{icon:"/assets/systems/regen.web.png"})}),t.jsx(Ee,{$color:n.accent.green,children:N("action.regen_shield")})]}),t.jsxs(Te,{$color:n.accent.orange,$disabled:T,onClick:()=>!T&&R(),children:[t.jsx(Se,{children:t.jsx(G,{icon:"/assets/systems/collector.web.png"})}),t.jsx(Ee,{$color:n.accent.orange,children:N("action.repair_all")})]})]}),t.jsx(Ie,{open:i,title:N("action.jump"),icon:"/assets/systems/jump.web.png",onConfirm:()=>{d(),c(!1)},onCancel:()=>c(!1),confirmVariant:"primary",confirmLabel:N("action.jump_confirm"),loading:T,children:N("action.jump_warn")})]})}const hr=s.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: ${({$mobile:e})=>e?"10px":"14px 16px"};
  max-height: ${({$mobile:e})=>e?"none":"360px"};
  overflow-y: auto;
`,xr=s.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
  display: flex; align-items: center; gap: 8px;
`,_r=s.div`
  display: flex; gap: 4px; margin-bottom: 8px;
`,Et=s.button`
  padding: 4px 10px;
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${({$active:e})=>e?n.accent.green:n.border};
  background: ${({$active:e})=>e?n.alpha(n.accent.green,.12):"transparent"};
  color: ${({$active:e})=>e?n.accent.green:n.text.secondary};
`,vr=s.div`
  padding: 7px 6px;
  border-bottom: 1px solid ${n.alpha(n.border,.3)};
  font-size: 0.76rem;
  font-family: 'Courier New', monospace;
  &:nth-child(even) { background: ${n.alpha(n.border,.08)}; }
  &:last-child { border-bottom: none; }
  &:hover { background: ${n.alpha(n.accent.green,.06)}; }
`,wr=s.div`
  color: ${n.text.secondary};
  text-align: center;
  padding: 20px 12px;
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
`;s.button`
  margin-top: 8px;
  padding: 6px 14px;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid ${n.accent.green};
  background: transparent;
  color: ${n.accent.green};
  &:hover { background: ${n.alpha(n.accent.green,.1)}; }
`;const Tr=s.span` color: ${n.status.loss}; `,Sr=s.span` color: ${n.accent.shield}; `,an=s.span` color: ${n.status.profit}; `,Er=s.span` color: ${n.status.success}; `,rn=s.span` color: ${n.text.secondary}; `,kr=s.span` color: ${n.text.secondary}; font-size: 0.68rem; `,ot=s.span` color: ${n.text.secondary}; font-size: 0.7rem; `;function Pn(){const{t:e}=he(),a=r(o=>o.battleLog),i=r(o=>o.address),c=we(),[l,p]=m.useState("all"),h=r(o=>o.enemyCivs),b=o=>{var S;return((S=h.get(o))==null?void 0:S.name)??o.slice(0,6)+"..."},u=m.useMemo(()=>{const o=(i||"").toLowerCase();return l==="out"?a.filter(S=>S.attacker.toLowerCase()===o):l==="in"?a.filter(S=>S.defender.toLowerCase()===o):a},[a,i,l]);return m.useEffect(()=>{if(!c.game||u.length===0||!i)return;const o=new Set;for(const k of u.slice(0,20))!h.has(k.attacker)&&k.attacker.toLowerCase()!==i.toLowerCase()&&o.add(k.attacker),!h.has(k.defender)&&k.defender.toLowerCase()!==i.toLowerCase()&&o.add(k.defender);if(o.size===0||o.size>6)return;const S=[...o];c.game.getCivilizations(S).then(k=>{k.forEach((A,P)=>{const T=S[P];if(A&&!r.getState().enemyCivs.has(T))try{const B={name:String(A.name??""),x:0,y:0,z:0,energy:Number(A.energy??0),health:Number(A.health??0),shieldHP:0,maxShieldHP:0,energyCollectorLv:1,weaponLv:1,radarLv:1,shieldLv:1,engineLv:1,scanRange:1e3,isRuins:!1,isMoving:!1};r.getState().addEnemyCiv(T,B)}catch{}})}).catch(()=>{})},[c.game,u,i,h]),t.jsxs(hr,{$mobile:!1,children:[t.jsxs(xr,{children:[t.jsx(G,{icon:"/assets/systems/weapon.web.png"})," ",e("battle.title")]}),a.length>0&&t.jsxs(_r,{children:[t.jsx(Et,{$active:l==="all",onClick:()=>p("all"),children:e("battle.filter_all")}),t.jsx(Et,{$active:l==="out",onClick:()=>p("out"),children:e("battle.filter_out")}),t.jsx(Et,{$active:l==="in",onClick:()=>p("in"),children:e("battle.filter_in")})]}),u.length===0?t.jsxs(wr,{children:[(a.length===0,e("battle.empty")),a.length===0&&t.jsxs(t.Fragment,{children:[t.jsx("br",{}),t.jsx(ot,{children:e("general.empty_cta")})]})]}):u.slice(0,50).map((o,S)=>{const k=(i||"").toLowerCase(),A=o.attacker.toLowerCase()===k,P=o.defender.toLowerCase()===k;return t.jsx(vr,{children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",gap:6,alignItems:"center"},children:[t.jsxs("span",{children:[t.jsx(Tr,{title:o.attacker,children:b(o.attacker)})," → ",t.jsx(Sr,{title:o.defender,children:b(o.defender)})," | ",t.jsx(an,{children:o.damageDealt})," dmg",o.shieldDamage>0&&t.jsxs(t.Fragment,{children:[" ",t.jsxs(ot,{children:["(🛡 ",o.shieldDamage]})]}),o.healthDamage>0&&t.jsx(t.Fragment,{children:t.jsxs(ot,{children:[" ❤ ",o.healthDamage]})}),(o.shieldDamage>0||o.healthDamage>0)&&t.jsx(ot,{children:")"}),o.stolenEnergy>0&&t.jsxs(t.Fragment,{children:[" ",t.jsxs(an,{children:["+",D(o.stolenEnergy),"⚡"]})]}),o.downgradedSystem&&t.jsxs(t.Fragment,{children:[" ",t.jsxs(rn,{children:["↓",o.downgradedSystem]})]})," ",o.won?t.jsx(Er,{children:"✓"}):t.jsx(rn,{children:"✗"}),P&&t.jsx("span",{style:{color:n.accent.red,fontSize:"0.68rem",marginLeft:4},children:e("battle.incoming")}),A&&o.won&&t.jsx("span",{style:{color:n.accent.green,fontSize:"0.68rem",marginLeft:4},children:"won"})]}),t.jsx(kr,{children:new Date(o.timestamp*1e3).toLocaleTimeString()})]})},`${o.attacker}-${o.defender}-${o.timestamp}-${S}`)})]})}const Cr=s.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: ${({$mobile:e})=>e?"10px":"14px 16px"};
  position: relative;
`,jr=s.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`,Ar=s.div`
  display: flex; gap: 4px; margin-bottom: 10px; flex-wrap: wrap;
`,lt=s.button`
  background: ${({$active:e})=>e?n.alpha(n.accent.gold,.1):"transparent"};
  border: 1px solid ${({$active:e})=>e?n.accent.gold:n.border};
  border-radius: 4px; padding: 5px 12px; cursor: pointer;
  color: ${({$active:e})=>e?n.accent.gold:n.text.secondary};
  font-family: 'Courier New', monospace; font-size: 0.72rem;
`,ct=s.input`
  width: 100%; padding: 8px; font-size: 0.8rem; font-family: 'Courier New', monospace;
  background: ${n.bg}; border: 1px solid ${n.border};
  border-radius: 6px; color: ${n.text.primary}; outline: none;
  &:focus { border-color: ${n.accent.gold}; }
`,sn=s.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px; margin-bottom: 4px;
  border: 1px solid ${n.alpha(n.accent.gold,.12)};
  border-radius: 6px; gap: 8px;
  background: ${n.alpha(n.card,.4)};
`,on=s.span`
  color: ${n.text.primary}; font-size: 0.82rem; font-family: 'Courier New', monospace; font-weight: bold;
`,ln=s.span`
  color: ${n.text.secondary}; font-size: 0.7rem; font-family: 'Courier New', monospace;
`,je=s.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 4px 0; font-size: 0.78rem; font-family: 'Courier New', monospace; color: ${n.text.secondary};
`,Mr=s.div`
  position: absolute; inset: 0; z-index: 1; border-radius: 8px; overflow: hidden;
`,Nr=s.span`
  flex-shrink: 0;
  font-size: 0.62rem;
  padding: 1px 5px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  ${({$leader:e})=>e?`color: ${n.accent.gold}; border: 1px solid ${n.alpha(n.accent.gold,.5)}; background: ${n.alpha(n.accent.gold,.1)};`:`color: ${n.text.secondary}; border: 1px solid ${n.border};`}
`,kt=s.button`
  padding: 4px 10px;
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  border-radius: 4px;
  cursor: pointer;
  background: ${({$danger:e})=>e?n.alpha(n.accent.red,.12):"transparent"};
  border: 1px solid ${({$danger:e})=>e?n.alpha(n.accent.red,.5):n.border};
  color: ${({$danger:e})=>e?n.accent.red:n.text.secondary};
  &:hover:not(:disabled) { opacity: 0.8; }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
  min-height: 32px;
  @media (max-width: 767px) { min-height: 36px; }
`,$r=s.div`
  max-height: 240px; overflow-y: auto; border: 1px solid ${n.alpha(n.border,.4)}; border-radius: 6px; padding: 4px;
`,Lr=s.div`
  display: flex; gap: 4px; margin-top: 6px; flex-wrap: wrap;
`,Rr=s.button`
  padding: 3px 8px;
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  border-radius: 4px;
  cursor: pointer;
  background: ${n.alpha(n.accent.green,.08)};
  border: 1px solid ${n.alpha(n.accent.green,.25)};
  color: ${n.accent.green};
  &:hover { background: ${n.alpha(n.accent.green,.15)}; }
`;function Bn(){const{t:e}=he(),a=we(),i=Ue(),c=r(w=>w.address),l=r(w=>w.currentAlliance),p=r(w=>w.loading),h=r(w=>w.activeAction),b=h!==null&&h.startsWith("alliance."),u=r(w=>w._allianceMembers),o=r(w=>w._allianceTotemLevel),S=r(w=>w._allianceTotemEnergy),k=r(w=>w._allianceTotemUpgradeCost),A=r(w=>w._allianceIsLeader),P=r(w=>w._allianceLeader),T=r(w=>w._alliancePendingRefund),I=r(w=>{var ae;return((ae=w.playerCiv)==null?void 0:ae.energy)??0}),{createAlliance:B,joinAlliance:V,leaveAlliance:W,kickMember:v,transferLeadership:M,disbandAlliance:J,claimRefund:z,donateToTotem:U,upgradeTotem:E}=Ae(),[H,Y]=m.useState("mine"),[N,x]=m.useState(""),[X,C]=m.useState(""),[K,f]=m.useState([]),[d,y]=m.useState(!1),[g,R]=m.useState(""),[O,_]=m.useState("members"),[F,q]=m.useState(null),[ne,me]=m.useState(""),[xe,de]=m.useState(!1),[ve,$]=m.useState(!1),se=m.useCallback(async()=>{if(a.alliance)try{const w=await a.alliance.getAllianceList(),ae=[];for(const ye of w.slice(0,30))try{const ue=await a.alliance.alliances(ye);ae.push({id:ye,name:String(ue.name??ue[0]??"?"),leader:String(ue.leader??ue[1]??""),level:Number(ue.level??ue[2]??1),memberCount:Number(ue.memberCount??ue[3]??0)})}catch{}f(ae)}catch{}},[a]);m.useEffect(()=>{H==="list"&&se()},[H,se]);const _e=async()=>{N.trim()&&(await B(N.trim()),x(""),Y("mine"))},j=async w=>{await V(w),Y("mine")},oe=async()=>{l&&(await W(l.id),$(!1),Y("list"))},Z=async()=>{l&&ne===l.name&&(await J(l.id),de(!1),me(""),Y("list"))},re=m.useMemo(()=>{const w=g.trim().toLowerCase();let ae=K;return w&&(ae=ae.filter(ye=>ye.name.toLowerCase().includes(w))),[...ae].sort((ye,ue)=>O==="members"?ue.memberCount-ye.memberCount:ue.level-ye.level)},[K,g,O]),ge=d?u:u.slice(0,10),fe=m.useMemo(()=>{const w=I;return[{label:"1K",value:Math.min(1e3,w)},{label:"5K",value:Math.min(5e3,w)},{label:"25%",value:Math.floor(w*.25)},{label:"MAX",value:w}]},[I]);return t.jsxs(Cr,{$mobile:i,children:[b&&t.jsx(Mr,{children:t.jsx(Dt,{message:e("general.loading"),color:n.accent.gold,transparent:!0})}),t.jsxs(jr,{children:[t.jsx(G,{icon:"/assets/systems/totem.web.png"})," ",e("alliance.title")]}),t.jsxs(Ar,{children:[t.jsx(lt,{$active:H==="mine",onClick:()=>Y("mine"),children:e("alliance.mine")}),t.jsx(lt,{$active:H==="list",onClick:()=>Y("list"),children:e("alliance.available")})]}),H==="mine"&&t.jsx(t.Fragment,{children:l?t.jsxs(t.Fragment,{children:[t.jsxs(sn,{children:[t.jsx(on,{children:l.name}),t.jsxs(ln,{children:["Lv.",l.level," · ",l.memberCount,e("alliance.people")]})]}),t.jsxs("div",{style:{marginBottom:6},children:[ge.map((w,ae)=>{const ye=w===c,ue=w.toLowerCase()===P.toLowerCase();return t.jsxs(je,{children:[t.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4,minWidth:0},children:[t.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:n.accent.green,boxShadow:`0 0 4px ${n.alpha(n.accent.green,.6)}`,flexShrink:0,opacity:.9},title:"在线"}),ue&&t.jsx(Nr,{$leader:!0,children:e("alliance.leader")}),t.jsxs("span",{style:{color:ye?n.accent.green:n.text.secondary,overflow:"hidden",textOverflow:"ellipsis"},children:[w.slice(0,6),"...",w.slice(-4)]}),ye&&t.jsx("span",{style:{color:n.accent.green},children:e("alliance.you")})]}),A&&!ye&&!ue&&t.jsxs("span",{style:{display:"flex",gap:4,flexShrink:0},children:[t.jsx(kt,{onClick:()=>{window.confirm(e("alliance.transfer_confirm"))&&M(l.id,w)},disabled:p,children:e("alliance.transfer")}),t.jsx(kt,{$danger:!0,onClick:()=>q({id:l.id,member:w}),disabled:p,children:e("alliance.kick")})]})]},ae)}),u.length>10&&t.jsx(je,{style:{justifyContent:"center"},children:t.jsx(kt,{onClick:()=>y(w=>!w),children:d?e("alliance.show_less"):e("alliance.view_all",{n:u.length})})})]}),t.jsxs(je,{children:[t.jsxs("span",{children:[t.jsx(G,{icon:"/assets/systems/totem.web.png"})," ",e("alliance.totem")," Lv.",o]}),t.jsxs("span",{children:[e("alliance.totem_pool"),": ",D(S)," ",t.jsx(G,{icon:"/assets/systems/energy.web.png"})]})]}),l&&l.memberCount>1&&t.jsxs(je,{style:{flexDirection:"column",alignItems:"flex-start",gap:2},children:[t.jsx("span",{style:{color:n.text.secondary,fontSize:"0.7rem"},children:e("alliance.totem_bonus_desc")}),t.jsx("span",{style:{color:n.accent.green,fontSize:"0.8rem"},children:e("alliance.totem_bonus_value",{val:D(Math.floor((l.memberCount-1)*8*(1e4+o*50)/1e4))})}),A&&t.jsx("span",{style:{color:n.accent.gold,fontSize:"0.75rem"},children:e("alliance.totem_next_bonus",{val:D(Math.floor((l.memberCount-1)*8*(1e4+(o+1)*50)/1e4))})})]}),A&&t.jsxs(je,{children:[t.jsxs("span",{children:[t.jsx(G,{icon:"/assets/systems/arrow.web.png"})," ",e("alliance.upgrade_totem")]}),t.jsxs("span",{style:{color:n.accent.green},children:[D(k)," ",t.jsx(G,{icon:"/assets/systems/energy.web.png"})]})]}),A&&t.jsx(je,{children:t.jsx("span",{style:{color:n.accent.gold},children:e("alliance.leader")})}),t.jsxs(je,{style:{marginTop:6,gap:6},children:[t.jsx(ct,{placeholder:e("alliance.donate"),value:X,onChange:w=>C(w.target.value.replace(/[^0-9]/g,"").slice(0,10)),style:{flex:1},inputMode:"numeric"}),t.jsx(ce,{variant:"primary",onClick:()=>{const w=Number(X);w>0&&(U(l.id,w),C(""))},disabled:p||!(Number(X)>0),children:e("alliance.donate")})]}),t.jsxs(Lr,{children:[t.jsx("span",{style:{color:n.text.secondary,fontSize:"0.68rem",fontFamily:"'Courier New', monospace",alignSelf:"center"},children:e("alliance.donate_presets")}),fe.map(w=>t.jsx(Rr,{onClick:()=>C(String(w.value)),disabled:p||w.value<=0,children:w.label},w.label))]}),A&&t.jsxs(t.Fragment,{children:[t.jsx(ce,{variant:"ghost",onClick:()=>E(l.id),disabled:p||S<k,title:S<k?e("alliance.totem_need_more"):void 0,style:{marginTop:6,width:"100%"},children:e("alliance.upgrade_totem")}),S<k&&t.jsxs("div",{style:{color:n.accent.red,fontSize:"0.68rem",marginTop:4,fontFamily:"'Courier New', monospace"},children:[e("alliance.totem_need_more"),"（",D(S)," / ",D(k),"）"]}),t.jsx(ce,{variant:"danger",onClick:()=>{me(""),de(!0)},disabled:p,style:{marginTop:4,width:"100%"},children:e("alliance.disband")})]}),!A&&l.memberCount>1&&t.jsxs(t.Fragment,{children:[t.jsx(ce,{variant:"ghost",onClick:()=>$(!0),disabled:p,style:{marginTop:6,width:"100%"},children:e("alliance.leave")}),t.jsx("div",{style:{color:n.text.secondary,fontSize:"0.68rem",fontFamily:"'Courier New', monospace",marginTop:4,textAlign:"center"},children:e("alliance.leave_note",{sec:86400})})]}),T>0&&t.jsxs(ce,{variant:"ghost",onClick:()=>z(),disabled:p,style:{marginTop:4,width:"100%"},children:[e("alliance.refund")," (",D(T)," SES)"]}),t.jsx(Ie,{open:!!F,title:e("alliance.kick"),onConfirm:()=>{F&&(v(F.id,F.member),q(null))},onCancel:()=>q(null),confirmVariant:"danger",confirmLabel:e("alliance.kick"),loading:p,children:F&&e("alliance.kick_confirm",{name:F.member.slice(0,6)+"..."})}),t.jsx(Ie,{open:xe,title:e("alliance.disband"),onConfirm:Z,onCancel:()=>{de(!1),me("")},confirmVariant:"danger",confirmLabel:e("alliance.disband"),loading:p,children:t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[t.jsx("span",{children:e("alliance.disband_confirm_ph")}),t.jsx(ct,{placeholder:l.name,value:ne,onChange:w=>me(w.target.value)}),ne!==l.name&&t.jsx("span",{style:{color:n.accent.red,fontSize:"0.68rem"},children:e("alliance.disband_need_input")})]})}),t.jsx(Ie,{open:ve,title:e("alliance.leave"),onConfirm:oe,onCancel:()=>$(!1),confirmVariant:"danger",confirmLabel:e("alliance.leave"),loading:p,children:e("alliance.leave_note",{sec:86400})})]}):t.jsxs("div",{style:{textAlign:"center",padding:12,color:n.text.secondary},children:[t.jsx("div",{style:{color:n.text.secondary,fontSize:"0.7rem",marginBottom:6},children:e("alliance.join_note")}),t.jsx(ct,{placeholder:e("alliance.name"),value:N,onChange:w=>x(w.target.value),style:{marginBottom:8},onKeyDown:w=>w.key==="Enter"&&_e()}),t.jsx(ce,{variant:"primary",onClick:_e,disabled:p||!N.trim(),style:{width:"100%"},children:e("alliance.create")})]})}),H==="list"&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{style:{display:"flex",gap:4,marginBottom:6},children:[t.jsx(ct,{placeholder:e("alliance.search"),value:g,onChange:w=>R(w.target.value),style:{flex:1}}),t.jsx(lt,{$active:O==="members",onClick:()=>_("members"),children:"人数"}),t.jsx(lt,{$active:O==="level",onClick:()=>_("level"),children:"等级"})]}),t.jsx("div",{style:{color:n.text.secondary,fontSize:"0.68rem",marginBottom:4},children:e("alliance.join_note")}),t.jsx($r,{children:re.length===0?t.jsx(je,{style:{justifyContent:"center",opacity:.6,padding:12},children:e("alliance.no_alliance")}):re.map(w=>t.jsxs(sn,{children:[t.jsxs("div",{style:{minWidth:0},children:[t.jsx(on,{children:w.name}),t.jsxs(ln,{children:["Lv.",w.level," · ",w.memberCount,e("alliance.people")]})]}),t.jsx(ce,{variant:"ghost",onClick:()=>j(w.id),disabled:p,children:e("alliance.join")})]},w.id))})]})]})}const Ir=s.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: 14px 16px;
`,Pr=s.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`,Br=s.input`
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
`,Be=s.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 0; border-bottom: 1px solid ${n.alpha(n.border,.4)};
  gap: 8px;
  &:last-child { border-bottom: none; }
`,De=s.span`
  color: ${n.text.primary}; font-size: 0.8rem; font-family: 'Courier New', monospace;
`,Oe=s.span`
  color: ${n.text.secondary}; font-size: 0.72rem; font-family: 'Courier New', monospace;
`,Dr=s.div`
  display: flex; gap: 6px; margin-bottom: 8px;
`,Or=s.div`
  margin-top: 4px;
  color: ${n.accent.red};
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  text-align: center;
  opacity: 0.85;
`,zr=s.div`
  color: ${n.accent.red};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-align: center;
  padding: 4px 8px;
  margin-top: 6px;
  background: ${n.alpha(n.accent.red,.08)};
  border-radius: 4px;
  border: 1px solid ${n.alpha(n.accent.red,.15)};
`,Fr=s.div`
  color: ${n.accent.red};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-align: center;
  padding: 4px 8px;
  margin-bottom: 6px;
  background: ${n.alpha(n.accent.red,.06)};
  border-radius: 4px;
`,Hr=s.div`
  margin-top: 8px;
  border: 1px solid ${n.alpha(n.border,.4)};
  border-radius: 6px;
  max-height: 220px;
  overflow-y: auto;
  background: ${n.alpha(n.bg,.3)};
`,Ur=s.div`
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  padding: 6px 10px; border-bottom: 1px solid ${n.alpha(n.border,.25)};
  font-size: 0.75rem; font-family: 'Courier New', monospace;
  &:last-child { border-bottom: none; }
  &:hover { background: ${n.alpha(n.accent.green,.04)}; }
`,Yr=le.ORDER_DELAY_SEC*1e3;function Dn(){const{t:e}=he();Ue();const a=r($=>$.playerCiv),i=r($=>$.address),c=r($=>$.enemyCivs),l=r($=>$.selectedTarget),p=r($=>$.lastAttackTime),h=r($=>$.attackTokens),b=r($=>$.loading),u=r($=>$.attackPower),o=we(),S=r($=>$.addEnemyCiv),k=r($=>$.setSelectedTarget),{attackTarget:A}=Ae(),P=m.useRef(null),[T,I]=m.useState(""),[B,V]=m.useState(!1),[W,v]=m.useState(null),[M,J]=m.useState(!1),[z,U]=m.useState(""),[E,H]=m.useState(null),[Y,N]=m.useState(!1),[x,X]=m.useState(null),[C,K]=m.useState(null),f=Ze(250),d=r($=>$.attackEnergyCost),y=Math.max(0,Math.ceil((Yr-(f-p))/1e3)),g=l?M?y>0?"combat.attack_in_cd":a&&a.energy<d?"combat.attack_no_energy":h.current<=0?"combat.attack_no_token":null:"combat.attack_out_range":"combat.attack_btn_idle",R=!g&&!b,O=l?c.get(l):void 0,_=(O==null?void 0:O.name)??(l?l.slice(0,6)+"...":""),F=m.useRef(l);F.current=l,m.useEffect(()=>{if(!l)return;let $=!1,se;return se=setInterval(async()=>{var oe,Z,re,ge,fe,w;const j=F.current;if(!(!j||!o.game||!i))try{const[ae,ye,ue,ft,bt]=await Promise.allSettled([o.game.getCivilization(j),o.game.getDistance(i,j),o.game.isInRange(i,j),(re=(Z=(oe=o.game).getShieldDefense)==null?void 0:Z.call(oe,j))==null?void 0:re.catch(()=>null),(w=(fe=(ge=o.game).getCurrentShieldHP)==null?void 0:fe.call(ge,j))==null?void 0:w.catch(()=>null)]);if($)return;if(ae.status==="fulfilled"&&ae.value){const Jn=Fe(ae.value);S(j,Jn)}ye.status==="fulfilled"&&ye.value!==null&&v(Number(ye.value)),ue.status==="fulfilled"&&J(!!ue.value),ft.status==="fulfilled"&&ft.value!=null&&X(Number(ft.value)),bt.status==="fulfilled"&&bt.value!=null&&K(Number(bt.value))}catch{}},1e4),()=>{$=!0,se&&clearInterval(se)}},[l,o.game,i,S]),m.useEffect(()=>{!B||!l||!o.game||!i||(async()=>{var $,se,_e,j,oe,Z;try{const[re,ge,fe,w,ae]=await Promise.allSettled([o.game.getCivilization(l),o.game.getDistance(i,l),o.game.isInRange(i,l),(_e=(se=($=o.game).getShieldDefense)==null?void 0:se.call($,l))==null?void 0:_e.catch(()=>null),(Z=(oe=(j=o.game).getCurrentShieldHP)==null?void 0:oe.call(j,l))==null?void 0:Z.catch(()=>null)]);re.status==="fulfilled"&&re.value&&S(l,Fe(re.value)),ge.status==="fulfilled"&&ge.value!==null&&v(Number(ge.value)),fe.status==="fulfilled"&&J(!!fe.value),w.status==="fulfilled"&&w.value!=null&&X(Number(w.value)),ae.status==="fulfilled"&&ae.value!=null&&K(Number(ae.value))}catch{}})()},[B,l,o.game,i,S]);const q=m.useCallback(async()=>{var se,_e;const $=((_e=(se=P.current)==null?void 0:se.value)==null?void 0:_e.trim())??T.trim();if($){if(!ut($)){U(e("connect.bad_referrer"));return}if(i&&$.toLowerCase()===i.toLowerCase()){U(e("err.e_self_target"));return}r.setState({loading:!0}),v(null),J(!1),U(""),X(null),K(null);try{if(!o.game)throw new Error("Contract not available");const[j,oe,Z]=await Promise.all([o.game.getCivilization($),i?o.game.getDistance(i,$).catch(()=>null):null,i?o.game.isInRange(i,$).catch(()=>!1):!1]),re=j,ge=!!((re==null?void 0:re.exists)??re);if((!ge||re.name===""||re!=null&&re.isRuins)&&U(e("err.e_civ_not_found")),j){const fe=Fe(j);S($,fe)}oe!==null&&v(Number(oe)),J(!!Z),k($),ge||k(null)}catch(j){const oe=j instanceof Error?j.message:String(j);U(oe.slice(0,80)),k($)}finally{r.setState({loading:!1})}}},[o,i,T,S,k,e]),ne=m.useCallback(async()=>{if(!(!o.game||!i)){N(!0),H(null);try{const[$]=await o.game.getPlayers(0,40),se=($??[]).filter(Z=>Z.toLowerCase()!==i.toLowerCase()).slice(0,40);if(se.length===0){H([]);return}const _e=await o.game.getCivilizations(se),j=await Promise.allSettled(se.map(Z=>o.game.getDistance(i,Z).catch(()=>null))),oe=[];for(let Z=0;Z<se.length;Z++){const re=se[Z],ge=_e[Z];if(!ge||ge.isRuins||!ge.exists)continue;const fe=Fe(ge),w=j[Z],ae=w.status==="fulfilled"&&w.value!=null?Number(w.value):1/0,ye=Number.isFinite(ae)&&ae<=((a==null?void 0:a.scanRange)??(a==null?void 0:a.radarLv),1e3);!Number.isFinite(ae)||!(ae<=((a==null?void 0:a.scanRange)??0)||await o.game.isInRange(i,re).catch(()=>!1))&&ae>((a==null?void 0:a.scanRange)??1e3)&&!ye||(oe.push({addr:re,name:fe.name||re.slice(0,6)+"...",energy:fe.energy,health:fe.health,weaponLv:fe.weaponLv,shieldLv:fe.shieldLv,dist:ae}),S(re,fe))}oe.sort((Z,re)=>Z.dist-re.dist),H(oe.slice(0,10))}catch{H([])}finally{N(!1)}}},[o.game,i,a,S]),me=$=>{k($.addr),v($.dist),i&&o.game?o.game.isInRange(i,$.addr).then(se=>J(!!se)).catch(()=>J(!0)):J(!0),I($.addr),P.current&&(P.current.value=$.addr)},xe=()=>{A(),V(!1)},de=Number.isFinite(u)?D(u):"—",ve=x!=null?D(x):"…";return t.jsxs(Ir,{children:[t.jsxs(Pr,{children:[t.jsx(G,{icon:"/assets/systems/weapon.web.png"})," ",e("combat.title")]}),t.jsxs(Dr,{children:[t.jsx(Br,{ref:P,placeholder:e("combat.search_placeholder"),value:T,onChange:$=>I($.target.value),onKeyDown:$=>$.key==="Enter"&&q()}),t.jsx(ce,{variant:"primary",onClick:q,disabled:b||!T.trim(),children:e("combat.search_btn")})]}),z&&t.jsx(Fr,{children:z}),t.jsxs("div",{style:{display:"flex",gap:6,marginBottom:8},children:[t.jsx(ce,{variant:"ghost",onClick:ne,disabled:b||Y||!i,icon:"/assets/systems/radar.web.png",children:e(Y?"upgrade.loading":"combat.scan_nearby")}),E!==null&&t.jsx("span",{style:{color:n.text.secondary,fontSize:"0.7rem",fontFamily:"'Courier New', monospace",alignSelf:"center"},children:E.length===0?e("combat.scan_empty"):e("combat.scan_found",{n:E.length})})]}),E!==null&&E.length>0&&t.jsx(Hr,{children:E.map($=>t.jsxs(Ur,{children:[t.jsxs("span",{style:{flex:1,minWidth:0},children:[t.jsx("span",{style:{color:n.text.primary,fontWeight:"bold"},children:$.name})," ",t.jsxs("span",{style:{color:n.text.secondary},children:[$.addr.slice(0,6),"...",$.addr.slice(-4)]}),t.jsxs("span",{style:{marginLeft:6,color:n.accent.blue},children:[D($.dist)," ls"]})]}),t.jsxs("span",{style:{color:n.text.secondary,fontSize:"0.68rem"},children:["⚔ ",$.weaponLv," 🛡 ",$.shieldLv]}),t.jsx(ce,{variant:"ghost",onClick:()=>me($),disabled:b,children:"锁定"})]},$.addr))}),l&&O&&t.jsxs("div",{style:{marginBottom:8},children:[t.jsxs(Be,{children:[t.jsx(De,{children:O.name}),t.jsxs(Oe,{children:[l.slice(0,6),"...",l.slice(-4)]})]}),t.jsxs(Be,{children:[t.jsx(De,{children:e("combat.energy")}),t.jsx(Oe,{children:D(O.energy||0)})]}),t.jsxs(Be,{children:[t.jsx(De,{children:e("combat.health")}),t.jsx(Oe,{children:D(O.health||0)})]}),t.jsxs(Be,{children:[t.jsx(De,{children:e("combat.weapon_lv")}),t.jsx(Oe,{children:O.weaponLv})]}),t.jsxs(Be,{children:[t.jsx(De,{children:e("combat.shield_lv")}),t.jsx(Oe,{children:O.shieldLv})]}),W!==null&&t.jsxs(Be,{children:[t.jsx(De,{children:e("combat.distance")}),t.jsxs(Oe,{children:[D(W)," ls"]})]})]}),l&&O&&!M&&W!==null&&t.jsx(zr,{children:e("combat.out_of_range_warn",{range:D((a==null?void 0:a.scanRange)||0)})}),t.jsxs(ce,{variant:"danger",disabled:!R,onClick:()=>V(!0),icon:"/assets/systems/weapon.web.png",style:{width:"100%",marginTop:l?8:0},title:g?e(g):void 0,children:[l?e("combat.attack_btn",{name:_}):e("combat.attack_btn_idle"),l&&y>0&&e("combat.attack_cooldown",{sec:y}),l&&y<=0&&M&&e("combat.attack_cost",{cost:d})]}),g&&l&&M&&t.jsx(Or,{children:e(g)}),!g&&l&&M&&u>0&&x!=null&&t.jsxs("div",{style:{color:n.text.secondary,fontSize:"0.68rem",fontFamily:"'Courier New', monospace",textAlign:"center",marginTop:4},children:[e("combat.power_compare",{atk:de,def:ve}),C!=null&&` · 护盾 ${D(C)}`]}),t.jsxs(Ie,{open:B,title:e("combat.attack_btn",{name:_}),icon:"/assets/systems/weapon.web.png",onConfirm:xe,onCancel:()=>V(!1),confirmVariant:"danger",confirmLabel:e("combat.confirm_attack"),loading:b,children:[e("combat.confirm_cost",{cost:d}),t.jsx("br",{}),e("combat.confirm_target",{name:_}),t.jsx("br",{}),W!==null&&t.jsxs(t.Fragment,{children:[e("combat.confirm_distance",{dist:D(W)}),t.jsx("br",{})]}),y>0&&t.jsxs(t.Fragment,{children:[e("combat.confirm_cooldown",{sec:y}),t.jsx("br",{})]}),u>0&&x!=null&&t.jsxs(t.Fragment,{children:[e("combat.power_compare",{atk:de,def:ve}),t.jsx("br",{})]}),C!=null&&t.jsxs(t.Fragment,{children:["对方护盾 ",D(C),t.jsx("br",{})]})]})]})}const Gr=s.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: 14px 16px;
  position: relative;
`,Kr=s.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`,Vr=s.div`
  position: absolute; inset: 0; z-index: 1; border-radius: 8px; overflow: hidden;
`,Wr=s.div`
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
`,Jr=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 6px;
`,Xr=s.span`
  color: ${n.text.primary};
  font-size: 0.82rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`,qr=s.span`
  color: ${({$color:e})=>e};
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  background: ${({$color:e})=>n.alpha(e,.12)};
  border-radius: 3px;
  padding: 1px 6px;
`,Zr=s.span`
  color: ${({$color:e})=>e};
  font-size: 0.6rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${({$color:e})=>n.alpha(e,.15)};
  border-radius: 3px;
  padding: 2px 6px;
  border: 1px solid ${({$color:e})=>n.alpha(e,.3)};
`,Qr=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,Ct=s.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`,jt=s.div`
  color: ${n.text.secondary};
  font-size: 0.6rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,At=s.div`
  color: ${({$color:e,$next:a})=>a?e:n.text.primary};
  font-size: ${({$next:e})=>e?"0.9rem":"0.82rem"};
  font-family: 'Courier New', monospace;
  font-weight: bold;
`,es=s.span`
  color: ${n.text.secondary};
  font-size: 0.9rem;
  opacity: 0.4;
`,ts=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`,ns=s.div`
  flex: 1;
  height: 6px;
  background: ${n.alpha(n.border,.3)};
  border-radius: 3px;
  overflow: hidden;
`,as=s.div`
  height: 100%;
  width: ${({$pct:e})=>Math.min(e,100)}%;
  background: ${({$color:e})=>e};
  border-radius: 3px;
  transition: width 0.3s;
`,is=s.span`
  color: ${({$affordable:e})=>e?n.accent.green:n.accent.red};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
`,rs=s.span`
  color: ${n.accent.blue};
  font-size: 0.62rem;
  font-family: 'Courier New', monospace;
  background: ${n.alpha(n.accent.blue,.1)};
  border-radius: 3px;
  padding: 1px 5px;
  margin-left: 4px;
`,ss=s.span`
  color: ${n.text.secondary};
  font-size: 0.65rem;
  font-family: 'Courier New', monospace;
  opacity: 0.6;
`,os=s.div`
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
`,ls={energyCollector:"collector",weapon:"weapon",shield:"shield",radar:"radar",engine:"engine"};function On(){var W,v;const{t:e}=he(),a=r(M=>M.playerCiv),i=r(M=>M.loading),l=r(M=>M.activeAction)==="upgrade",p=r(M=>M.error),h=parseFloat(r(M=>M.sesBalance)),b=r(M=>M.address),u=we(),{upgradeSystem:o,clearError:S}=Ae(),[k,A]=m.useState(null),{data:P,isFetching:T}=Xe({queryKey:["upgradeCosts",b,a==null?void 0:a.energyCollectorLv,a==null?void 0:a.weaponLv,a==null?void 0:a.shieldLv,a==null?void 0:a.radarLv,a==null?void 0:a.engineLv],queryFn:async()=>{if(!u.game||!b)return null;const M=["collector","weapon","shield","radar","engine"],J=await Promise.all(M.map(E=>u.game.getUpgradeCost(b,E))),z=await Promise.all(M.map(E=>u.game.getUpgradePreview(b,E))),U={};return M.forEach((E,H)=>{U[E]={ses:Number(J[H].ses)/1e18,energy:Number(J[H].energy),curValue:Number(z[H].current),nextValue:Number(z[H].next)}}),U},enabled:!!u.game&&!!b,staleTime:1e4,refetchInterval:15e3}),I=m.useMemo(()=>{if(!a||!P)return[];const M=["energyCollector","weapon","shield","radar","engine"],J=[a.energyCollectorLv,a.weaponLv,a.shieldLv,a.radarLv,a.engineLv];return M.map((z,U)=>{const E=J[U],H=pe[z],Y=ls[z],N=P[Y];if(!N)return null;const x=z==="energyCollector"?1e6:1,X=N.curValue/x,C=N.nextValue/x,K=C-X,f=z==="energyCollector"?`+${le.DURABILITY_PER_LV}s 耐久`:void 0;return{key:z,lv:E,name:H.name,icon:H.icon,color:H.color,sysName:Y,value:X,nextValue:C,gain:K,subGain:f}}).filter(z=>z!==null).filter(z=>!isNaN(z.gain)&&z.lv<999).sort((z,U)=>U.gain-z.gain)},[a,P]);if(!a||I.length===0)return null;const B=()=>{k&&o(k),A(null)},V=k?I.find(M=>M.key===k):null;return t.jsxs(Gr,{children:[t.jsxs(Kr,{children:[t.jsx(G,{icon:"/assets/systems/shield.web.png"})," ",e("nav.tech")]}),l&&t.jsx(Vr,{children:t.jsx(Dt,{message:e("upgrade.btn"),color:n.accent.green,transparent:!0})}),p&&t.jsx(os,{onClick:S,children:e("hud.error_dismiss",{msg:p})}),!P&&!T&&u.game&&b&&t.jsx("div",{style:{color:n.text.secondary,fontSize:"0.75rem",textAlign:"center",padding:12},children:e("upgrade.unavailable")}),T&&t.jsx("div",{style:{color:n.text.secondary,fontSize:"0.75rem",textAlign:"center",padding:12},children:e("upgrade.loading")}),P&&I.map((M,J)=>{const z=P[M.sysName],U=z.ses,E=z.energy,H=a.energy??0,Y=h>=U&&(E===0||H>=E),N=h>0?h/U*100:0,x=h<U?e("upgrade.insufficient"):E>0&&H<E?e("toast.energy_insufficient_short"):null;return t.jsxs(Wr,{$color:M.color,$highlight:J===0,$affordable:Y,children:[t.jsxs(Jr,{children:[t.jsxs(Xr,{children:[t.jsx(G,{icon:M.icon})," ",M.name,t.jsxs(qr,{$color:M.color,children:["Lv.",M.lv]})]}),J===0&&t.jsx(Zr,{$color:M.color,children:e("upgrade.recommend_badge")})]}),t.jsxs(Qr,{children:[t.jsxs(Ct,{children:[t.jsx(jt,{children:e("upgrade.current")}),t.jsx(At,{$color:n.text.primary,children:D(M.value)})]}),t.jsx(es,{children:"→"}),t.jsxs(Ct,{children:[t.jsx(jt,{children:e("upgrade.after")}),t.jsx(At,{$color:M.color,$next:!0,children:D(M.nextValue)})]}),t.jsxs(Ct,{children:[t.jsx(jt,{children:e("upgrade.gain")}),t.jsx(At,{$color:M.color,$next:!0,children:M.key==="energyCollector"&&M.gain===0?M.subGain??`+${D(M.gain)}`:`+${D(M.gain)}`})]})]}),t.jsxs(ts,{children:[t.jsx(ns,{children:t.jsx(as,{$color:Y?n.accent.green:n.accent.red,$pct:N})}),t.jsxs(is,{$affordable:Y,children:[gt(h)," / ",D(U,2)," SES",E>0&&t.jsxs(rs,{children:[t.jsx(G,{icon:"/assets/systems/energy.web.png"}),D(E)]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[T&&t.jsx(ss,{children:"⟳"}),t.jsx(ce,{variant:"primary",disabled:i||!Y,onClick:()=>A(M.key),title:x??void 0,children:e("upgrade.btn")})]})]}),!Y&&x&&t.jsx("div",{style:{color:n.accent.red,fontSize:"0.68rem",fontFamily:"'Courier New', monospace",marginTop:6,textAlign:"center"},children:x}),Y&&U>0&&t.jsx("div",{style:{color:n.text.secondary,fontSize:"0.62rem",fontFamily:"'Courier New', monospace",marginTop:4,opacity:.7,textAlign:"center"},children:e("general.approve_hint")})]},M.key)}),t.jsx(Ie,{open:!!k,title:`${e("hud.confirm_upgrade")} ${V?V.name:""}`,icon:"/assets/systems/arrow.web.png",onConfirm:B,onCancel:()=>A(null),confirmVariant:"primary",confirmLabel:e("hud.confirm_upgrade"),loading:l,children:V&&t.jsxs(t.Fragment,{children:[e("upgrade.btn")," ",V.name," Lv.",V.lv," → ",V.lv+1,t.jsx("br",{}),P?`${e("hud.cost")}: ${D(Number(((W=P[V.sysName])==null?void 0:W.ses)??0),2)} SES${Number(((v=P[V.sysName])==null?void 0:v.energy)??0)>0?` + ${D(Number(P[V.sysName].energy))} 能量`:""}`:""]})})]})}const Mt=s.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: 14px 16px;
`,Nt=s.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`,cn=s.div`
  display: flex; align-items: center; gap: 8px;
  padding: 6px 4px; border-bottom: 1px solid ${n.alpha(n.border,.3)};
  font-size: 0.78rem; font-family: 'Courier New', monospace;
  &:last-child { border-bottom: none; }
  &:hover { background: ${n.alpha(n.accent.green,.03)}; }
`,dn=s.span`
  width: 24px; text-align: center; font-weight: bold; flex-shrink: 0;
  color: ${({$top:e})=>e?n.accent.gold:n.text.secondary};
  font-size: ${({$top:e})=>e?"0.85rem":"0.75rem"};
`,pn=s.span`
  flex: 1; color: ${n.text.primary}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
`,un=s.span`
  color: ${n.accent.green}; font-weight: bold; text-align: right;
`,mn=s.span`
  color: ${n.text.secondary}; font-size: 0.68rem; text-align: right; min-width: 60px;
`;function zn(){const{t:e}=he(),a=we(),i=r(b=>b.address),c=r(b=>b.playerCiv),{data:l,isFetching:p}=Xe({queryKey:["leaderboard"],queryFn:async()=>{if(!a.game)throw new Error("Contract not available");const[b]=await a.game.getPlayers(0,50);return!b||b.length===0?[]:(await a.game.getSimpleStatuses(b)).map(o=>({player:String(o.player??""),energy:Number(o.energy??0),health:Number(o.health??0),collectorLv:Number(o.collectorLv??o[3]??1),weaponLv:Number(o.weaponLv??o[4]??1),shieldLv:Number(o.shieldLv??o[5]??1),radarLv:Number(o.radarLv??o[6]??1),engineLv:Number(o.engineLv??o[7]??1),shieldHP:Number(o.shieldHP??0),shieldMax:Number(o.shieldMax??0),exists:!!(o.exists??o[10]??!1),isRuins:!!(o.isRuins??o[11]??!1)})).filter(o=>o.exists&&!o.isRuins)},enabled:!!a.game,refetchInterval:3e4}),h=m.useMemo(()=>{const b=l??[];return c&&i&&!b.some(u=>u.player.toLowerCase()===i.toLowerCase())&&b.push({player:i,energy:c.energy,health:c.health,collectorLv:c.energyCollectorLv,weaponLv:c.weaponLv,shieldLv:c.shieldLv,radarLv:c.radarLv,engineLv:c.engineLv,shieldHP:c.shieldHP,shieldMax:c.maxShieldHP,exists:!0,isRuins:!1}),b.sort((u,o)=>o.energy-u.energy),b.slice(0,20)},[l,c,i]);return!l&&p?t.jsxs(Mt,{children:[t.jsxs(Nt,{children:[t.jsx(G,{icon:"/assets/systems/trophy.web.png"})," ",e("nav.leaderboard")]}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6},children:Array.from({length:5}).map((b,u)=>t.jsx("div",{style:{height:28,background:n.alpha(n.border,.35),borderRadius:4,animation:"pulse 1.2s ease-in-out infinite",opacity:.6-u*.08}},u))})]}):!l||l.length===0?t.jsxs(Mt,{children:[t.jsxs(Nt,{children:[t.jsx(G,{icon:"/assets/systems/trophy.web.png"})," ",e("nav.leaderboard")]}),t.jsxs("div",{style:{color:n.text.secondary,textAlign:"center",padding:12,fontSize:"0.78rem",lineHeight:1.6},children:[t.jsx("div",{style:{fontSize:"1.6rem",marginBottom:6},children:"🏆"}),e("leaderboard.empty"),t.jsx("div",{style:{fontSize:"0.68rem",opacity:.7,marginTop:4},children:e("general.empty_cta")})]})]}):t.jsxs(Mt,{children:[t.jsxs(Nt,{children:[t.jsx(G,{icon:"/assets/systems/trophy.web.png"})," ",e("nav.leaderboard")]}),t.jsxs(cn,{style:{color:n.text.secondary,fontSize:"0.68rem",borderBottom:`1px solid ${n.border}`},children:[t.jsx(dn,{children:e("leaderboard.col_rank")}),t.jsx(pn,{children:e("leaderboard.col_player")}),t.jsx(mn,{children:e("leaderboard.col_level")}),t.jsx(un,{children:e("leaderboard.col_energy")})]}),h.map((b,u)=>{const o=i&&b.player.toLowerCase()===i.toLowerCase(),S=Math.round((b.collectorLv+b.weaponLv+b.shieldLv+b.radarLv+b.engineLv)/5);return t.jsxs(cn,{style:o?{background:n.alpha(n.accent.green,.05)}:void 0,children:[t.jsx(dn,{$top:u<3,children:u===0?"🥇":u===1?"🥈":u===2?"🥉":u+1}),t.jsxs(pn,{style:o?{color:n.accent.green}:void 0,children:[o?"⭐ ":"",b.player.slice(0,6),"...",b.player.slice(-4)]}),t.jsx(mn,{children:e("leaderboard.player_level",{lv:S})}),t.jsx(un,{children:D(b.energy)})]},b.player)})]})}const cs=s.div`
  background: ${n.card};
  border: 1px solid ${n.border};
  border-radius: 8px;
  padding: 14px 16px;
`,ds=s.div`
  color: ${n.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`,$t=s.input`
  width: 100%; padding: 8px; font-size: 0.78rem; font-family: 'Courier New', monospace;
  background: ${n.bg}; border: 1px solid ${n.border};
  border-radius: 6px; color: ${n.text.primary}; outline: none;
  &:focus { border-color: ${n.accent.green}; }
`,ps=s.div`
  display: flex; align-items: center; gap: 6px; margin-bottom: 4px;
`,yn=s.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 6px 0; border-bottom: 1px solid ${n.alpha(n.border,.3)};
  font-size: 0.75rem; font-family: 'Courier New', monospace;
  &:last-child { border-bottom: none; }
`,gn=s.span` color: ${n.accent.red}; `,fn=s.span` color: ${n.accent.green}; `,bn=s.div`
  display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px;
`,hn=s.label`
  display: flex; align-items: center; gap: 6px;
  color: ${n.text.secondary}; font-size: 0.72rem;
  font-family: 'Courier New', monospace; font-weight: bold;
  letter-spacing: 0.5px;
`,xn=s.span`
  margin-left: auto; color: ${n.alpha(n.text.secondary,.6)};
  font-size: 0.68rem; font-weight: normal;
`,us=s.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 10px; margin-bottom: 8px;
  border: 1px dashed ${({$valid:e})=>e?n.alpha(n.accent.green,.5):n.border};
  border-radius: 6px;
  background: ${n.alpha(n.bg,.4)};
`,ms=s.span`
  display: flex; align-items: center; gap: 6px;
  color: ${n.text.secondary}; font-size: 0.75rem;
  font-family: 'Courier New', monospace;
`,ys=s.span`
  color: ${n.accent.green}; font-size: 0.9rem; font-weight: bold;
  font-family: 'Courier New', monospace;
`,_n=s.div`
  color: ${n.accent.red}; font-size: 0.7rem;
  font-family: 'Courier New', monospace; margin: -4px 0 8px;
`,dt=s.div`
  color: ${n.text.secondary};
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  margin: -2px 0 8px;
  opacity: 0.85;
`,gs=s.div`
  display: flex; gap: 4px; margin-bottom: 6px; flex-wrap: wrap;
`,vn=s.button`
  padding: 4px 8px;
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${({$active:e})=>e?n.accent.gold:n.border};
  background: ${({$active:e})=>e?n.alpha(n.accent.gold,.12):"transparent"};
  color: ${({$active:e})=>e?n.accent.gold:n.text.secondary};
`,Lt=s.div`
  color: ${n.text.secondary};
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 10px 0 4px;
  opacity: 0.7;
`;function Fn(){const{t:e}=he(),a=r(_=>_.sesBalance),i=r(_=>_.loading),c=r(_=>_.activeAction),l=c!==null&&c.startsWith("market."),p=r(_=>_.marketOrders),{createEnergyOrder:h,fillEnergyOrder:b,cancelEnergyOrder:u}=Ae(),[o,S]=m.useState(()=>{try{return localStorage.getItem("ses_sell_amt")??"5000"}catch{return"5000"}}),[k,A]=m.useState(()=>{try{return localStorage.getItem("ses_sell_price")??"0.010"}catch{return"0.010"}}),[P,T]=m.useState("price"),[I,B]=m.useState(null),[V,W]=m.useState(""),v=r(_=>{var F;return((F=_.playerCiv)==null?void 0:F.energy)??0});m.useEffect(()=>{try{localStorage.setItem("ses_sell_amt",o)}catch{}},[o]),m.useEffect(()=>{try{localStorage.setItem("ses_sell_price",k)}catch{}},[k]);const M=async()=>{const _=Number(o),F=parseFloat(k);!_||isNaN(F)||await h(_,F)},J=_=>{const F=_.replace(/[^0-9]/g,"").slice(0,10);S(F)},z=_=>{const F=_.replace(/[^0-9.]/g,"").replace(/(\..*)\./g,"$1").slice(0,10);A(F)},U=Number(o),E=parseFloat(k),H=!isNaN(U)&&!isNaN(E)&&U>0&&E>0?U*E:null,Y=H!==null&&U<=v&&U>0&&E>0,N=U>1e6,{myOrders:x,publicOrders:X,bestPrice:C}=m.useMemo(()=>{var xe;const _=p.filter(de=>de.isMine),q=[...p.filter(de=>!de.isMine)].sort((de,ve)=>P==="price"?de.price-ve.price:ve.amount-de.amount),ne=[..._].sort((de,ve)=>de.price-ve.price),me=((xe=q[0])==null?void 0:xe.price)??null;return{myOrders:ne,publicOrders:q,bestPrice:me}},[p,P]),K=parseFloat(a),f=_=>{B(_);const F=_.remaining>0?_.remaining:_.amount,q=_.price>0?Math.floor(K/_.price):F,ne=Math.min(F,Math.max(1,q));W(String(Math.max(1,Math.min(F,ne||F))))},d=async()=>{if(!I)return;const _=Number(V);if(!_||_<=0||_>I.remaining)return;const F=I.price*_;K<F||(await b(I.id,_),B(null),W(""))},y=I?I.price*(Number(V)||0):0,g=I?I.price*1.1:0,R=I?Number(V)>0&&Number(V)<=I.remaining&&K>=y:!1,O=async _=>{await u(_.id)};return t.jsxs(cs,{children:[t.jsxs(ds,{children:[t.jsx(G,{icon:"/assets/systems/ses.web.png"})," ",e("market.title")]}),t.jsxs(bn,{children:[t.jsxs(hn,{children:[t.jsx(G,{icon:"/assets/systems/energy.web.png"})," ",e("market.sell_label_energy"),t.jsxs(xn,{children:[e("market.your_energy"),": ",D(v)]})]}),t.jsxs("div",{style:{display:"flex",gap:6},children:[t.jsx($t,{placeholder:e("market.sell_placeholder_energy"),value:o,onChange:_=>J(_.target.value),inputMode:"numeric"}),t.jsx(ce,{variant:"ghost",onClick:()=>S(String(Math.floor(v))),disabled:v<=0,children:e("market.sell_max")})]})]}),t.jsxs(bn,{children:[t.jsxs(hn,{children:[t.jsx(G,{icon:"/assets/systems/ses.web.png"})," ",e("market.sell_label_price"),t.jsx(xn,{children:e("market.sell_unit_price")})]}),t.jsx($t,{placeholder:e("market.sell_placeholder_price"),value:k,onChange:_=>z(_.target.value),inputMode:"decimal"})]}),t.jsxs(us,{$valid:!!Y,children:[t.jsxs(ms,{children:[t.jsx(G,{icon:"/assets/systems/ses.web.png"})," ",e("market.preview_receive")]}),t.jsx(ys,{children:H!==null?D(H):"—"})]}),H!==null&&t.jsxs(dt,{children:[e("market.total_price",{price:D(H,4)})," · ",e("market.slippage_hint",{pct:"10",price:D(E*1.1,4)})]}),N&&H!==null&&t.jsx(dt,{style:{color:n.accent.gold},children:e("market.precision_warn")}),H!==null&&!Y&&t.jsx(_n,{children:e("market.insufficient_energy")}),t.jsx(ce,{variant:"primary",onClick:M,disabled:i||!Y,loading:l&&c==="market.sell",style:{width:"100%"},children:e("market.sell_btn")}),C!=null&&t.jsx(dt,{style:{marginTop:8},children:e("market.best_price",{price:D(C,4)})}),t.jsxs("div",{style:{marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsx(Lt,{style:{margin:0},children:e("market.active_orders")}),t.jsxs(gs,{children:[t.jsx(vn,{$active:P==="price",onClick:()=>T("price"),children:e("market.sort_price")}),t.jsx(vn,{$active:P==="amount",onClick:()=>T("amount"),children:e("market.sort_amount")})]})]}),t.jsxs("div",{style:{maxHeight:320,overflowY:"auto"},children:[x.length>0&&t.jsxs(t.Fragment,{children:[t.jsxs(Lt,{children:[t.jsx(G,{icon:"/assets/systems/arrow.web.png"})," ",e("market.my_orders")," · ",x.length]}),x.map(_=>t.jsxs(yn,{children:[t.jsxs("div",{style:{flex:1},children:[t.jsx(gn,{children:e("market.order_energy",{amt:D(_.remaining)})}),t.jsxs("span",{style:{color:n.text.secondary,fontSize:"0.66rem"},children:[" / ",D(_.amount)]})," @ ",t.jsx(fn,{children:e("market.order_price",{price:D(_.price,4)})}),t.jsxs("div",{style:{fontSize:"0.65rem",color:n.text.secondary},children:[_.seller," ",e("market.order_you")]})]}),t.jsx(ce,{variant:"danger",onClick:()=>O(_),disabled:i,children:e("market.cancel_btn")})]},`mine-${_.id}`))]}),t.jsxs(Lt,{children:[e("market.public_orders")," · ",X.length]}),X.length===0&&x.length===0?t.jsxs("div",{style:{textAlign:"center",padding:16,color:n.text.secondary,lineHeight:1.6},children:[t.jsx("div",{style:{fontSize:"1.4rem"},children:"📊"}),t.jsx("div",{children:e("market.empty")}),t.jsx("div",{style:{fontSize:"0.68rem",opacity:.7,marginTop:4},children:e("general.empty_cta")})]}):X.length===0?t.jsx(ps,{style:{justifyContent:"center",color:n.text.secondary,padding:12},children:e("market.empty")}):X.map(_=>t.jsxs(yn,{children:[t.jsxs("div",{style:{flex:1},children:[t.jsx(gn,{children:e("market.order_energy",{amt:D(_.remaining)})}),t.jsxs("span",{style:{color:n.text.secondary,fontSize:"0.66rem"},children:[" / ",D(_.amount)]})," @ ",t.jsx(fn,{children:e("market.order_price",{price:D(_.price,4)})}),t.jsx("div",{style:{fontSize:"0.65rem",color:n.text.secondary},children:_.seller})]}),t.jsx(ce,{variant:"primary",onClick:()=>f(_),disabled:i,title:K<_.price*(_.remaining>0?_.remaining:_.amount)?e("market.buy_no_ses"):void 0,children:e("market.buy_btn")})]},`${_.id}`))]}),t.jsx(Ie,{open:!!I,title:I?e("market.buy_confirm_title",{amount:Number(V)||0}):e("market.buy_btn"),icon:"/assets/systems/ses.web.png",onConfirm:d,onCancel:()=>{B(null),W("")},confirmVariant:"primary",confirmLabel:e("market.buy_btn"),loading:i,children:I&&t.jsx(t.Fragment,{children:t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[t.jsxs("label",{style:{color:n.text.secondary,fontSize:"0.75rem"},children:[e("market.buy_partial_placeholder")," (max ",D(I.remaining),")"]}),t.jsx($t,{value:V,onChange:_=>W(_.target.value.replace(/[^0-9]/g,"").slice(0,10)),inputMode:"numeric",placeholder:e("market.buy_partial_placeholder")}),t.jsx("div",{style:{color:K<y?n.accent.red:n.accent.green,fontSize:"0.78rem"},children:e("market.buy_confirm_body",{cost:D(y,4),unit:D(g,4)})}),!R&&Number(V)>0&&t.jsx(_n,{children:K<y?e("market.buy_no_ses"):`数量需 1–${D(I.remaining)}`}),t.jsx(dt,{children:e("market.slippage_hint",{pct:"10",price:D(g,4)})})]})})})]})}const fs=[{name:"BNB Chain",url:"https://www.bnbchain.org/",desc:"BNB Smart Chain 官方"},{name:"BscScan",url:"https://bscscan.com/address/0x58c2400527813f78fc7ed498dd4ec66dc7787e73",desc:"合约验证"},{name:"PancakeSwap",url:"https://pancakeswap.finance/",desc:"SES 交易"},{name:"YouTube",url:"https://www.youtube.com/",desc:"测试友链"},{name:"Strife Docs",url:"https://docs.strifelabs.com/",desc:"官方文档 12 语言"},{name:"GitHub",url:"https://github.com/silent-expanse/web3",desc:"MIT 开源"}],bs=s.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`,wn=s.p`
  color: ${n.text.secondary};
  font-size: 0.82rem;
  line-height: 1.7;
  code { background: ${n.alpha(n.card,.6)}; padding: 1px 5px; border-radius: 3px; font-size: 0.76rem; }
  a { color: ${n.accent.green}; }
`,hs=s.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`,xs=s.a`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  background: ${n.alpha(n.card,.6)};
  border: 1px solid ${n.border};
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.15s, transform 0.15s;
  &:hover { border-color: ${n.accent.green}; transform: translateY(-1px); }
`,_s=s.span`
  color: ${n.text.primary};
  font-weight: 700;
  font-size: 0.92rem;
`,vs=s.span`
  color: ${n.text.secondary};
  font-size: 0.78rem;
`,ws=s.span`
  color: ${n.alpha(n.accent.green,.7)};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  word-break: break-all;
`,Ts=s.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border: 1px dashed ${n.alpha(n.accent.green,.4)};
  border-radius: 20px;
  background: ${n.alpha(n.accent.green,.08)};
  color: ${n.accent.green};
  font-size: 0.82rem;
  text-decoration: none;
  width: fit-content;
  &:hover { background: ${n.alpha(n.accent.green,.14)}; }
`;function Hn(){he();const[e,a]=m.useState(fs);return m.useEffect(()=>{fetch("/links.json",{cache:"no-store"}).then(i=>i.ok?i.json():null).then(i=>{Array.isArray(i)&&i.length&&a(i)}).catch(()=>{})},[]),t.jsxs(bs,{children:[t.jsxs(wn,{children:["与 BSC / GameFi / AI 生态互换流量，申请请邮件 ",t.jsx("a",{href:"mailto:strifelabs@proton.me?subject=友情链接交换申请",children:"strifelabs@proton.me"}),"（回链锚文本 ",t.jsx("code",{children:"Silent Expanse: Strife"})," → ",t.jsx("code",{children:"https://strifelabs.com/"}),"）。数据源 ",t.jsx("a",{href:"/links.json",target:"_blank",rel:"noopener",children:"/links.json"})," 与首页 ",t.jsx("code",{children:"#links"})," 同源，",t.jsx("code",{children:"prerender"})," 后对爬虫一致。"]}),t.jsx(hs,{children:e.filter(i=>!i.url.startsWith("mailto:")).map(i=>t.jsxs(xs,{href:i.url,target:"_blank",rel:"noopener",children:[t.jsxs(_s,{children:[i.name," ↗"]}),t.jsx(vs,{children:i.desc}),t.jsx(ws,{children:i.url.replace(/^https?:\/\//,"")})]},i.name+i.url))}),t.jsx(Ts,{href:"mailto:strifelabs@proton.me?subject=友情链接交换申请-来自strifelabs.com",children:"＋ 虚位以待 · 申请交换"}),t.jsxs(wn,{style:{fontSize:"0.74rem",opacity:.8},children:["提示：友链为 ",t.jsx("code",{children:"dofollow"}),"（不加 ",t.jsx("code",{children:"nofollow"}),"）才可互换权重，定期巡检 404 即下线。"]})]})}const Ss=s.nav`
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
  backdrop-filter: blur(${n.blur.bar});
  -webkit-backdrop-filter: blur(${n.blur.bar});
  pointer-events: auto;
  z-index: 150;
  padding: 0 0 env(safe-area-inset-bottom, 0px) 0;
`,Es=s.button`
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
  color: ${({$active:e,$color:a})=>e?a:"#6a7d94"};
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
`,ks=s.span`
  font-size: 1.2rem;
  line-height: 1;
`,Cs={hud:"/assets/systems/radar.web.png",actions:"/assets/systems/energy.web.png",combat:"/assets/systems/weapon.web.png",market:"/assets/systems/ses.web.png",alliance:"/assets/systems/totem.web.png",links:"/assets/systems/arrow.web.png"},js={hud:n.accent.green,actions:n.accent.blue,combat:n.accent.red,market:n.accent.gold,alliance:n.accent.gold,links:n.accent.green};function As({activeTab:e,onTabChange:a}){const{t:i}=he(),c=r(o=>o.battleLog),l=r(o=>o.seenBattleCount),p=r(o=>o._alliancePendingRefund),h=r(o=>o.pendingEnergy),b=["hud","actions","combat","market","alliance","links"],u={hud:i("mobile.tab_overview"),actions:i("mobile.tab_actions"),combat:i("mobile.tab_combat"),market:i("mobile.tab_market"),alliance:i("mobile.tab_alliance"),links:i("nav.links")};return t.jsx(Ss,{children:b.map(o=>{const S=e===o,k=o==="combat"&&c.length>l||o==="alliance"&&p>0||o==="actions"&&h>0;return t.jsxs(Es,{$active:S,$color:js[o],onClick:()=>{o==="combat"&&!S&&r.getState().markBattlesSeen(),a(S?null:o)},"aria-label":u[o],children:[t.jsx(ks,{children:t.jsx(G,{icon:Cs[o]})}),u[o],k&&!S&&t.jsx(Ms,{})]},o)})})}const Ms=s.span`
  position: absolute;
  top: 6px;
  right: 50%;
  transform: translateX(16px);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${n.accent.green};
  box-shadow: 0 0 6px ${n.alpha(n.accent.green,.6)};
`,Ns=Ce`
  from { transform: translateX(120%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
`,$s=s.div`
  position: absolute;
  top: 80px;
  right: 12px;
  z-index: 300;
  display: flex;
  flex-direction: column;
  gap: 6px;
  pointer-events: none;
  max-width: min(320px, 80vw);
  @media (max-width: 767px) {
    left: 12px;
    right: 12px;
    top: 56px;
    max-width: none;
    align-items: stretch;
  }
`,Ls=s.div`
  pointer-events: auto;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  animation: ${Ns} 0.3s ease-out;
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
`,Rs=s.button`
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
`,Is=s.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  word-break: break-all;
`,Ps=s.a`
  color: ${n.accent.gold};
  font-size: 0.7rem;
  margin-left: 8px;
  text-decoration: underline;
  white-space: nowrap;
  flex-shrink: 0;
  &:hover { opacity: 0.8; }
`;function Bs({t:e}){const a=r(b=>b.removeToast),[i,c]=m.useState(!1),{t:l}=he(),p=e.txHash?`https://bscscan.com/tx/${e.txHash}`:null,h=async b=>{b.stopPropagation();try{await navigator.clipboard.writeText(e.message),c(!0),setTimeout(()=>c(!1),1500)}catch{try{const u=document.createElement("textarea");u.value=e.message,document.body.appendChild(u),u.select(),document.execCommand("copy"),document.body.removeChild(u),c(!0),setTimeout(()=>c(!1),1500)}catch{}}};return t.jsx(Ls,{$type:e.type,onClick:()=>a(e.id),title:"点击关闭",children:t.jsxs(Is,{children:[t.jsxs("span",{children:[e.type==="success"&&"✓ ",e.type==="error"&&"✕ ",e.type==="info"&&"ℹ ",e.message]}),p&&t.jsx(Ps,{href:p,target:"_blank",rel:"noopener noreferrer",onClick:b=>b.stopPropagation(),children:l("general.tx_view")}),t.jsx(Rs,{onClick:h,title:l("nav.copy_addr"),children:l(i?"toast.copied":"nav.copy_addr")})]})})}function yt(){const e=r(a=>a.toasts);return e.length===0?null:t.jsx($s,{"aria-live":"polite","aria-atomic":"true",children:e.map(a=>t.jsx(Bs,{t:a},a.id))})}function Un(){const e=r(l=>l.lastSyncAt),a=Ze(2e3),{t:i}=he();if(!e)return null;const c=Math.floor((a-e)/1e3);return c<20?null:t.jsx("div",{style:{background:n.alpha(n.accent.red,.12),borderBottom:`1px solid ${n.alpha(n.accent.red,.25)}`,color:n.accent.red,fontSize:"0.72rem",fontFamily:"'Courier New', monospace",textAlign:"center",padding:"4px 8px"},children:i("general.sync_stale",{sec:c})})}function Yn(){const e=r(c=>c.attackFlashAt),[a,i]=m.useState(!1);return m.useEffect(()=>{if(!e)return;i(!0);const c=setTimeout(()=>i(!1),400);return()=>clearTimeout(c)},[e]),a?t.jsx("div",{style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:400,background:`radial-gradient(ellipse at center, ${n.alpha(n.accent.green,.25)} 0%, transparent 70%)`,animation:"flash 380ms ease-out"}}):null}function Ds(){const{t:e}=he();return t.jsx("div",{style:{margin:12,padding:12,background:n.alpha(n.accent.red,.1),border:`1px solid ${n.alpha(n.accent.red,.3)}`,borderRadius:8,color:n.accent.red,fontFamily:"'Courier New', monospace",fontSize:"0.8rem",textAlign:"center"},children:e("toast.contract_unavailable",{name:"SilentExpanseStrife"})})}function Os({size:e=18}){const a=r(o=>o.epochStartTime),i=r(o=>o.epochEndTime),c=Ze(1e3);if(!a||!i)return null;const l=(i-a)*1e3,p=c-a*1e3,h=Math.min(1,Math.max(0,p/l)),b=(e-2)/2,u=2*Math.PI*b;return t.jsxs("svg",{width:e,height:e,style:{display:"inline-block",verticalAlign:"middle"},children:[t.jsx("circle",{cx:e/2,cy:e/2,r:b,fill:"none",stroke:n.alpha(n.border,.5),strokeWidth:1.5}),t.jsx("circle",{cx:e/2,cy:e/2,r:b,fill:"none",stroke:n.accent.green,strokeWidth:1.5,strokeDasharray:u,strokeDashoffset:u*(1-h),strokeLinecap:"round",transform:`rotate(-90 ${e/2} ${e/2})`,style:{transition:"stroke-dashoffset 1s linear"}})]})}const zs=[{id:"overview",label:"nav.overview",icon:"/assets/systems/radar.web.png"},{id:"actions",label:"nav.actions",icon:"/assets/systems/energy.web.png"},{id:"combat",label:"nav.combat",icon:"/assets/systems/weapon.web.png"},{id:"tech",label:"nav.tech",icon:"/assets/systems/shield.web.png"},{id:"alliance",label:"nav.alliance",icon:"/assets/systems/totem.web.png"},{id:"market",label:"nav.market",icon:"/assets/systems/ses.web.png"},{id:"leaderboard",label:"nav.leaderboard",icon:"/assets/systems/engine.web.png"},{id:"links",label:"nav.links",icon:"/assets/systems/arrow.web.png"}],Tn=s.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
  background: ${n.bg};
  overflow: hidden;
`,Fs=s.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 16px;
  padding-top: calc(env(safe-area-inset-top, 0px) + 8px);
  background: ${n.alpha(n.card,.8)};
  backdrop-filter: blur(${n.blur.bar});
  -webkit-backdrop-filter: blur(${n.blur.bar});
  border-bottom: 1px solid ${n.border};
  flex-shrink: 0;
  min-height: 56px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    overflow-x: visible;
    row-gap: 6px;
  }
`,Hs=s.span`
  color: ${n.accent.green};
  font-size: 1.05rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
`,Us=s.span`
  color: ${n.text.secondary};
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  flex-shrink: 0;
`,Ye=s.div`
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
`,Ge=s.span`
  color: ${n.text.secondary};
  font-size: 0.75rem;
`,Ke=s.span`
  color: ${({$color:e})=>e};
  font-size: 0.88rem;
  font-weight: bold;
`,Ys=s.button`
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
`,Gs=s.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,Ks=s.nav`
  width: 180px;
  flex-shrink: 0;
  background: ${n.alpha(n.card,.5)};
  border-right: 1px solid ${n.border};
  padding: 8px 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`,Vs=s.button`
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
`,Ws=s.a`
  color: ${n.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.78rem;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.15s;
  &:hover { color: ${n.accent.green}; text-decoration: underline; }
`,Sn=s.button`
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
`,Js=s.span`
  font-size: 1rem;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
`,Xs=s.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px 20px;
`,qs=Ce`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`,Zs=s.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${qs} 150ms ease-out;
  @media (prefers-reduced-motion: reduce) { animation: none; }
`,En=s.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
  background: ${n.bg};
  overflow: hidden;
`,Qs=s.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 56px 10px 70px;
  @media (max-width: 767px) {
    padding-bottom: calc(70px + env(safe-area-inset-bottom, 0px));
  }
`,eo=s.h2`
  color: ${n.text.primary};
  font-size: 1.1rem;
  font-family: ${n.font.display};
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0 0 4px 0;
`,to=s.div`
  height: 1px;
  background: ${n.border};
  margin: 0 0 12px 0;
`,no={overview:"page.overview",actions:"page.actions",combat:"page.combat",tech:"page.tech",alliance:"page.alliance",market:"page.market",leaderboard:"page.leaderboard",links:"page.links"},ao={overview:"/assets/systems/radar.web.png",actions:"/assets/systems/energy.web.png",combat:"/assets/systems/weapon.web.png",tech:"/assets/systems/shield.web.png",alliance:"/assets/systems/totem.web.png",market:"/assets/systems/ses.web.png",leaderboard:"/assets/systems/trophy.web.png",links:"/assets/systems/arrow.web.png"};function io(){const[e,a]=m.useState(()=>{const v=typeof window<"u"?window.location.hash.slice(1):"";return["overview","actions","combat","tech","alliance","market","leaderboard","links"].includes(v)?v:"overview"});m.useEffect(()=>{const v=()=>{const M=window.location.hash.slice(1);["overview","actions","combat","tech","alliance","market","leaderboard","links"].includes(M)&&a(M)};return window.addEventListener("hashchange",v),()=>window.removeEventListener("hashchange",v)},[]);const i=m.useCallback(v=>{a(v);try{window.location.hash=v}catch{}},[]),c=r(v=>v.density),l=r(v=>v.playerCiv),p=r(v=>v.address),h=r(v=>v.sesBalance),b=r(v=>v.loading),u=r(v=>v.epochClaimed),{t:o,toggleLang:S}=he(),{claimDailySES:k}=Ae(),A=we(),P=r(v=>v.collectRate),T=r(v=>v.currentEpoch);r(v=>v.epochEndTime);const I=b||u;if(!l)return t.jsxs(Tn,{children:[t.jsx(Ln,{}),t.jsx(yt,{})]});const B=p?`${p.slice(0,6)}...${p.slice(-4)}`:"",V=l.maxShieldHP>0?Math.round(l.shieldHP/l.maxShieldHP*100):0,W=()=>{const v=(()=>{switch(e){case"overview":return t.jsx(Rn,{});case"actions":return t.jsx(In,{});case"combat":return t.jsxs(t.Fragment,{children:[t.jsx(Dn,{}),t.jsx(Pn,{})]});case"tech":return t.jsx(On,{});case"alliance":return t.jsx(Bn,{});case"market":return t.jsx(Fn,{});case"leaderboard":return t.jsx(zn,{});case"links":return t.jsx(Hn,{})}})();return t.jsxs(t.Fragment,{children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[t.jsxs(eo,{children:[t.jsx(G,{icon:ao[e]})," ",o(no[e])]}),e==="overview"&&T>0&&t.jsxs("span",{style:{color:n.text.secondary,fontSize:"0.7rem",fontFamily:n.font.mono,opacity:.8,display:"inline-flex",alignItems:"center",gap:4},children:[t.jsx(Os,{size:14}),o("general.epoch")," #",T]})]}),t.jsx(to,{}),v]})};return t.jsxs(Tn,{children:[t.jsx(Bt,{variant:"hero",clip:"game",dense:!0,videoOpacity:.5}),t.jsx(Yn,{}),t.jsx(Un,{}),t.jsxs(Fs,{children:[t.jsx(Hs,{children:l.name}),t.jsx(Us,{children:B}),t.jsx(mt,{}),t.jsxs(Ye,{$color:n.accent.gold,children:[t.jsx(Ge,{children:t.jsx(G,{icon:"/assets/systems/ses.web.png"})}),t.jsx(Ke,{$color:n.accent.gold,children:gt(h)})]}),t.jsxs(Ye,{$color:n.accent.green,children:[t.jsx(Ge,{children:t.jsx(G,{icon:"/assets/systems/energy.web.png"})}),t.jsx(Ke,{$color:n.accent.green,children:D(l.energy)})]}),t.jsxs(Ye,{$color:n.accent.mint,children:[t.jsxs(Ge,{children:[t.jsx(G,{icon:"/assets/systems/energy.web.png"}),"/s"]}),t.jsx(Ke,{$color:n.accent.mint,children:P})]}),t.jsxs(Ye,{$color:n.accent.red,children:[t.jsx(Ge,{children:t.jsx(G,{icon:"/assets/systems/heart.web.png"})}),t.jsx(Ke,{$color:n.accent.red,children:D(l.health)})]}),t.jsxs(Ye,{$color:n.accent.shield,children:[t.jsx(Ge,{children:t.jsx(G,{icon:"/assets/systems/shield.web.png"})}),t.jsxs(Ke,{$color:n.accent.shield,children:[V,"%"]})]}),t.jsxs(Ys,{$canClaim:!u,onClick:()=>!I&&k(),disabled:I,children:[t.jsx(G,{icon:"/assets/systems/ses.web.png"})," ",o(u?"ses.claimed":"ses.claim")]}),t.jsx(Ws,{href:"https://docs.strifelabs.com",target:"_blank",children:o("connect.tutorial")}),t.jsx(Sn,{onClick:S,children:o("connect.lang_switch")}),t.jsx(Sn,{onClick:()=>r.getState().setDensity(c==="compact"?"comfortable":"compact"),title:c==="compact"?"切换至舒适视图":"切换至紧凑视图",children:c==="compact"?"⟡":"◎"})]}),t.jsxs(Gs,{children:[t.jsx(Ks,{children:zs.map(v=>t.jsxs(Vs,{$active:e===v.id,"aria-current":e===v.id?"page":void 0,onClick:()=>i(v.id),children:[t.jsx(Js,{children:t.jsx(G,{icon:v.icon})}),o(v.label)]},v.id))}),t.jsx(Xs,{children:t.jsxs(Zs,{children:[A.contractUnavailable&&A.isReady&&t.jsx(Ds,{}),W()]},e)})]}),t.jsx(yt,{}),t.jsxs(Gn,{children:[t.jsx(Kn,{children:o("lore.footer_quote")}),t.jsxs(Vn,{children:[o("lore.epoch_label")," #",T||"—"," · ",o("lore.engine_status")]}),t.jsxs(Wn,{children:["v0.1.0 · ","5ee95a0"]})]})]})}const Gn=s.div`
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
  @media (max-width: 767px) {
    padding: 6px 12px;
    min-height: 36px;
    font-size: 0.72rem;
  }
`,Kn=s.span`
  color: ${n.alpha(n.text.secondary,.78)};
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  font-style: italic;
`,Vn=s.span`
  color: ${n.alpha(n.accent.green,.6)};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
  white-space: nowrap;
`,Wn=s.span`
  color: ${n.alpha(n.text.secondary,.5)};
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  white-space: nowrap;
`;function ro(){const{t:e}=he(),a=r(u=>u.currentEpoch),i=r(u=>u.connected),c=r(u=>u.playerCiv);r(u=>u.address),r(u=>u.sesBalance),r(u=>u.selectedTarget),r(u=>u.battleLog),r(u=>u.currentAlliance),r(u=>u.loading),r(u=>u.collectRate);const[l,p]=m.useState("hud"),[h,b]=m.useState(i);return m.useEffect(()=>{i!==h&&(b(i),i||p("hud"))},[i,h]),i?t.jsxs(En,{children:[t.jsx(Bt,{variant:"hero",clip:"game",dense:!0,videoOpacity:.4}),t.jsx(Yn,{}),t.jsx(Un,{}),t.jsx(yt,{}),c&&t.jsxs(oo,{children:[t.jsx(co,{children:c.name}),t.jsx(lo,{children:t.jsx(mt,{})})]}),t.jsxs(Qs,{children:[l==="hud"&&t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[t.jsx(Rn,{}),t.jsx(On,{}),t.jsx(zn,{})]}),l==="actions"&&t.jsx(In,{}),l==="combat"&&t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[t.jsx(Dn,{}),t.jsx(Pn,{})]}),l==="market"&&t.jsx(Fn,{}),l==="alliance"&&t.jsx(Bn,{}),l==="links"&&t.jsx(Hn,{}),l==="hud"&&null]}),t.jsx(As,{activeTab:l,onTabChange:p}),t.jsxs(Gn,{children:[t.jsx(Kn,{children:e("lore.footer_quote")}),t.jsxs(Vn,{children:[e("lore.epoch_label")," #",a||"—"," · ",e("lore.engine_status")]}),t.jsxs(Wn,{children:["v0.1.0 · ","5ee95a0"]})]})]}):t.jsxs(En,{children:[t.jsx(Ln,{}),t.jsx(yt,{})]})}function so(){const e=Ue(),a=r(l=>l.sesBalance),[i,c]=m.useState(!1);return m.useEffect(()=>{const l=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];let p=0;const h=b=>{b.key===l[p]?(p++,p===l.length&&(c(!0),setTimeout(()=>c(!1),2500),r.getState().addToast("◈ 沉默引擎共鸣 ◈","success"),p=0)):p=b.key===l[0]?1:0};return window.addEventListener("keydown",h),()=>window.removeEventListener("keydown",h)},[]),m.useEffect(()=>{if(a==="888.00"||a==="888"){c(!0);const l=setTimeout(()=>c(!1),2e3);return()=>clearTimeout(l)}},[a]),i&&(document.documentElement.style.filter="hue-rotate(90deg)",setTimeout(()=>{document.documentElement.style.filter=""},2e3)),e?t.jsx(ro,{}):t.jsx(io,{})}const oo=s.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 130;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(${n.blur.bar});
  -webkit-backdrop-filter: blur(${n.blur.bar});
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  padding: 6px 10px;
  padding-top: calc(env(safe-area-inset-top, 0px) + 6px);
  flex-shrink: 0;
`,lo=s.div`
  flex-shrink: 0;
  margin-left: auto;
  display: flex;
  align-items: center;
`;s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  flex: 1;
  min-width: 0;
  &::-webkit-scrollbar { display: none; }
`;s.div`
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
`;s.div`
  color: #446688;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
`;s.div`
  color: ${({$color:e})=>e||n.accent.green};
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
`;const co=s.div`
  color: ${n.accent.green};
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
`;function po(){return Ba(),t.jsx(so,{})}function uo(){return t.jsx(Ha,{children:t.jsx(po,{})})}var kn;if(typeof window<"u"&&((kn=window.ethereum)!=null&&kn.setMaxListeners))try{window.ethereum.setMaxListeners(30)}catch{}qn.createRoot(document.getElementById("root")).render(t.jsx(uo,{}));
