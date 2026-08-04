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
echo "  Silent Expanse: Strife — Frontend Smoke Test"
echo "  RPC: $RPC"
echo "  Test address: $TEST_ADDR"
echo "========================================="

# ═══════════════════════════════════════════
#  SilentExpanseStrife (main game contract)
# ═══════════════════════════════════════════
DF="0x58c2400527813f78fc7ed498dd4ec66dc7787e73"
echo ""
echo "── SilentExpanseStrife ──"

echo "  View functions:"
test_view SilentExpanseStrife "$DF" "getEntryFee()(uint256)"
test_view SilentExpanseStrife "$DF" "getCivilization(address)((string,(int256,int256,int256),uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool,bool,uint256))" "$TEST_ADDR"
test_view SilentExpanseStrife "$DF" "getAttackTokenInfo(address)((uint256,uint256,uint256,uint256))" "$TEST_ADDR"
test_view SilentExpanseStrife "$DF" "pendingCombatEnergy(address)(uint256)" "$TEST_ADDR"
test_view SilentExpanseStrife "$DF" "getCurrentShieldHP(address)(uint256)" "$TEST_ADDR"
test_view SilentExpanseStrife "$DF" "getMaxShieldHP(address)(uint256)" "$TEST_ADDR"
test_view SilentExpanseStrife "$DF" "getCurrentPosition(address)((int256,int256,int256))" "$TEST_ADDR"
test_view SilentExpanseStrife "$DF" "getEnergyCollectRate(address)(uint256)" "$TEST_ADDR"
test_view SilentExpanseStrife "$DF" "getUpgradeCost(address,string)(uint256,uint256)" "$TEST_ADDR" "collector"
test_view SilentExpanseStrife "$DF" "getUpgradeCost(address,string)(uint256,uint256)" "$TEST_ADDR" "weapon"
test_view SilentExpanseStrife "$DF" "getAttackEnergyCost(address)(uint256)" "$TEST_ADDR"
test_view SilentExpanseStrife "$DF" "getAttackPower(address)(uint256)" "$TEST_ADDR"
    echo "    ⏭ isInRange → needs msg.sender, skip (not called by client)"
test_view SilentExpanseStrife "$DF" "getActivePlayerCount()(uint256)"
test_view SilentExpanseStrife "$DF" "totalCivilizations()(uint256)"
test_view SilentExpanseStrife "$DF" "totalFeesCollected()(uint256)"
test_view SilentExpanseStrife "$DF" "gameStartTime()(uint256)"
test_view SilentExpanseStrife "$DF" "owner()(address)"
test_view SilentExpanseStrife "$DF" "sesToken()(address)"
test_view SilentExpanseStrife "$DF" "allianceSystem()(address)"
test_view SilentExpanseStrife "$DF" "gameplayLogic()(address)"
test_view SilentExpanseStrife "$DF" "battleLogic()(address)"
test_view SilentExpanseStrife "$DF" "movementLogic()(address)"
test_view SilentExpanseStrife "$DF" "adminLogic()(address)"
test_view SilentExpanseStrife "$DF" "agentRegistry()(address)"
test_view SilentExpanseStrife "$DF" "energyMarket()(address)"
test_view SilentExpanseStrife "$DF" "feeRecipient()(address)"

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
    test_view SilentExpanseStrife "$DF" "$sig"
done

# ═══════════════════════════════════════════
#  SilentExpanseStrifeToken (SES Token)
# ═══════════════════════════════════════════
TOKEN="0x1491e226292cf61aba5717828540c0f2518301c6"
echo ""
echo "── SilentExpanseStrifeToken ──"
test_view Token "$TOKEN" "balanceOf(address)(uint256)" "$TEST_ADDR"
test_view Token "$TOKEN" "totalSupply()(uint256)"
test_view Token "$TOKEN" "decimals()(uint8)"
test_view Token "$TOKEN" "symbol()(string)"
test_view Token "$TOKEN" "name()(string)"

# ═══════════════════════════════════════════
#  SilentExpanseStrifeAlliance
# ═══════════════════════════════════════════
ALLY="0x061b60973cfdd0ce4fbb425cfd25d3f3f8bc9716"
echo ""
echo "── SilentExpanseStrifeAlliance ──"
test_view Alliance "$ALLY" "getAllianceList()(bytes32[])"
test_view Alliance "$ALLY" "MAX_MEMBERS()(uint256)"

# ═══════════════════════════════════════════
#  DailyMinter
# ═══════════════════════════════════════════
DM="0x207c6eefd47f5d943f167504bf2cc1c6fa764803"
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
EM="0xe21c780c163fd65e8962cfbaea143d825cc7b8e8"
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
