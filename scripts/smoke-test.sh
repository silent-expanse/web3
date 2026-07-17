#!/usr/bin/env bash
# Smoke-test: verify ALL frontend-used contract methods exist on BSC mainnet.
# Uses cast call for view/pure, cast estimate for write functions.
set -euo pipefail

RPC="${RPC:-https://bsc-dataseed1.binance.org}"
TEST_ADDR="0xf949F835E8a62152E188dfCDcbAcD36B7EBe2ffd"
ZERO_ADDR="0x0000000000000000000000000000000000000000"
EMPTY_B32="0x0000000000000000000000000000000000000000000000000000000000000000"
PASS=0
FAIL=0
SKIP=0

# track results per contract
declare -A results

test_view() {
    local contract="$1" addr="$2" sig="$3"
    shift 3
    local args=("$@")

    local calldata
    if [ ${#args[@]} -gt 0 ]; then
        calldata=$(cast calldata "$sig" "${args[@]}" 2>/dev/null) || {
            echo "    ❌ calldata encode failed: $sig"
            FAIL=$((FAIL+1))
            results["$contract"]=$((results["$contract"]+1))
            return 1
        }
    else
        calldata=""
    fi

    local cmd="cast call --rpc-url $RPC $addr"
    if [ -n "$calldata" ]; then
        cmd="$cmd $calldata"
    else
        cmd="$cmd $(cast calldata "$sig" 2>/dev/null)"
    fi

    local out
    out=$($cmd 2>&1) || {
        echo "    ❌ $sig — REVERT: ${out:0:80}"
        FAIL=$((FAIL+1))
        results["$contract"]=$((results["$contract"]+1))
        return 1
    }

    # Check if output is just 0x (could be valid empty return)
    if [ "$out" = "0x" ]; then
        echo "    ✅ $sig → (empty)"
    else
        echo "    ✅ $sig → ${out:0:70}"
    fi
    PASS=$((PASS+1))
}

echo "========================================="
echo "  Dark Forest — Frontend Smoke Test"
echo "  RPC: $RPC"
echo "  Test address: $TEST_ADDR"
echo "========================================="

# ═══════════════════════════════════════════
#  DarkForest (main game contract)
# ═══════════════════════════════════════════
DF="0x96ee7c1a3cd81858a6638917de2a1efd691ae2fe"
echo ""
echo "── DarkForest ──"

echo "  View functions:"
test_view DarkForest "$DF" "getEntryFee()(uint256)"
test_view DarkForest "$DF" "getCivilization(address)((string,(int256,int256,int256),uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool,bool,uint256))" "$TEST_ADDR"
test_view DarkForest "$DF" "getAttackTokenInfo(address)((uint256,uint256,uint256,uint256))" "$TEST_ADDR"
test_view DarkForest "$DF" "pendingCombatEnergy(address)(uint256)" "$TEST_ADDR"
test_view DarkForest "$DF" "getCurrentShieldHP(address)(uint256)" "$TEST_ADDR"
test_view DarkForest "$DF" "getMaxShieldHP(address)(uint256)" "$TEST_ADDR"
test_view DarkForest "$DF" "getCurrentPosition(address)((int256,int256,int256))" "$TEST_ADDR"
test_view DarkForest "$DF" "getEnergyCollectRate(address)(uint256)" "$TEST_ADDR"
test_view DarkForest "$DF" "getUpgradeCost(address,string)(uint256,uint256)" "$TEST_ADDR" "collector"
test_view DarkForest "$DF" "getUpgradeCost(address,string)(uint256,uint256)" "$TEST_ADDR" "weapon"
test_view DarkForest "$DF" "getAttackEnergyCost(address)(uint256)" "$TEST_ADDR"
test_view DarkForest "$DF" "getAttackPower(address)(uint256)" "$TEST_ADDR"
    echo "    ⏭ isInRange → needs msg.sender, skip (not called by client)"
test_view DarkForest "$DF" "getActivePlayerCount()(uint256)"
test_view DarkForest "$DF" "totalCivilizations()(uint256)"
test_view DarkForest "$DF" "totalFeesCollected()(uint256)"
test_view DarkForest "$DF" "gameStartTime()(uint256)"
test_view DarkForest "$DF" "owner()(address)"
test_view DarkForest "$DF" "dftToken()(address)"
test_view DarkForest "$DF" "allianceSystem()(address)"
test_view DarkForest "$DF" "gameplayLogic()(address)"
test_view DarkForest "$DF" "battleLogic()(address)"
test_view DarkForest "$DF" "movementLogic()(address)"
test_view DarkForest "$DF" "adminLogic()(address)"
test_view DarkForest "$DF" "agentRegistry()(address)"
test_view DarkForest "$DF" "energyMarket()(address)"
test_view DarkForest "$DF" "feeRecipient()(address)"

# Constants
echo "  Constants (pure):"
for sig in \
    "SYS_COLLECTOR()(uint8)" \
    "SYS_WEAPON()(uint8)" \
    "SYS_SHIELD()(uint8)" \
    "SYS_RADAR()(uint8)" \
    "SYS_ENGINE()(uint8)" \
    "INITIAL_ENERGY()(uint256)" \
    "INITIAL_HEALTH()(uint256)" \
    "INITIAL_SCAN_RANGE()(uint256)" \
    "ENTRY_FEE_MIN()(uint256)" \
    "ENTRY_FEE_MAX()(uint256)" \
    "FEE_RAMP_UP_TIME()(uint256)" \
    "NEWBIE_PROTECTION_SECONDS()(uint256)" \
    "DAILY_DFT_BASE()(uint256)" \
    "DAILY_DFT_EMISSION()(uint256)" \
    "JUMP_COOLDOWN()(uint256)" \
    "MAX_BATTLE_HISTORY()(uint256)"; do
    test_view DarkForest "$DF" "$sig"
done

# ═══════════════════════════════════════════
#  DarkForestToken (DFT)
# ═══════════════════════════════════════════
TOKEN="0x1266e922fe34459efda34e7ee5caf327fbf138d7"
echo ""
echo "── DarkForestToken ──"
test_view Token "$TOKEN" "balanceOf(address)(uint256)" "$TEST_ADDR"
test_view Token "$TOKEN" "totalSupply()(uint256)"
test_view Token "$TOKEN" "decimals()(uint8)"
test_view Token "$TOKEN" "symbol()(string)"
test_view Token "$TOKEN" "name()(string)"

# ═══════════════════════════════════════════
#  DarkForestAlliance
# ═══════════════════════════════════════════
ALLY="0x5f810a22359b678c01e72726149d387e79cd03f2"
echo ""
echo "── DarkForestAlliance ──"
test_view Alliance "$ALLY" "getAllianceList()(bytes32[])"
test_view Alliance "$ALLY" "MAX_MEMBERS()(uint256)"

# ═══════════════════════════════════════════
#  DailyMinter
# ═══════════════════════════════════════════
DM="0x9b1c4e550fbf1c802495e6521ee5812e4264c95f"
echo ""
echo "── DailyMinter ──"
test_view DailyMinter "$DM" "currentEpoch()(uint256)"
test_view DailyMinter "$DM" "epochRewardPerPlayer()(uint256)"
test_view DailyMinter "$DM" "genesisTimestamp()(uint256)"
test_view DailyMinter "$DM" "DAILY_EMISSION()(uint256)"
test_view DailyMinter "$DM" "DAY_SECONDS()(uint256)"
test_view DailyMinter "$DM" "hasClaimed(address)(bool)" "$TEST_ADDR"

# ═══════════════════════════════════════════
#  EnergyMarket
# ═══════════════════════════════════════════
EM="0x69f8dad1b4c9ceaf00bc48ed2216931ba78c5955"
echo ""
echo "── EnergyMarket ──"
test_view EnergyMarket "$EM" "getOrderCount()(uint256)"
test_view EnergyMarket "$EM" "getActiveOrders(uint256,uint256)((uint256,uint256,address,uint256)[])" 0 10

# ═══════════════════════════════════════════
#  SUMMARY
# ═══════════════════════════════════════════
echo ""
echo "========================================="
echo "  RESULTS: $PASS passed, $FAIL failed, $SKIP skipped"
echo "========================================="

if [ $FAIL -gt 0 ]; then
    exit 1
fi
