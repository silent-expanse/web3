# Silent Expanse: Strife 前端开发经验总结

## 一、数据架构：从「手动管理」到「自动轮询」

### 最初的问题模式
```
组件内部 useState + useEffect 手动 fetch
→ 每个组件有自己的数据管理方式
→ 切换页面/账户时数据不同步
→ RPC 调用串行，14 次 RTT
```

### 最终的解决方案
```
TanStack Query (useQuery) + refetchInterval
→ 统一写入 zustand store
→ 所有组件从 store 读取，纯展示
→ Promise.allSettled 并行调用，1 次 RTT
```

### 关键教训
区块链 DApp 的数据天然是"远端状态"，应该用 `useQuery` 这样的声明式方案管理，而不是手动 `useEffect` + `setState`。每 5-15 秒自动轮询比手动刷新更可靠。

---

## 二、合约对接：永远不要假设 ABI 的返回值格式

### 踩过的坑

| 问题 | 原因 | 教训 |
|------|------|------|
| `totemUpgradeCost` 误用 `formatEther` | 以为是 SES(wei)，实际是纯能量值 | **cast call 验证单位，不要猜** |
| `getEpochInfo` 返回 `(epochIndex, emissionWei, bool)` | 误以为是 `(startTime, endTime, bool)` | **先 cast call 看返回值再编码** |
| `getAttackTokenInfo.rate` 未 ÷1e18 | 返回 18 位定点数 | **Solidity 无浮点，全用定点数** |
| `upgradeSystem(uint8)` 覆盖 5 个独立方法 | 误以为每个系统有独立函数 | **读 ABI 确认函数签名再编码** |

### 最佳实践
每个合约方法在写前端逻辑前，先用 `cast call` 在命令行验证返回值。不是「相信 ABI」，是「验证 ABI」。

```bash
# 验证返回值格式和单位
cast call 0xContractAddr "functionName(args)(returnTypes)" args --rpc-url $RPC
```

---

## 三、UI 统一：外层一致、内层灵活

### 最终 UI 规范

| 元素 | 规范 |
|------|------|
| **Panel** | `THEME.card` / `border 1px THEME.border` / `border-radius 8px` / `padding 14px 16px` |
| **SectionTitle** | `0.72rem` / `'Courier New'` / `letter-spacing 2px` / `uppercase` / `color secondary` |
| **StatPill** | `min-height 76px` / flex 居中 / CSS Grid 等宽 |
| **Row** | CSS Grid `repeat(auto-fill, minmax(120px, 1fr))`，禁用 `flex-wrap` |
| **ActionButton** | 三种 variant: `primary` / `danger` / `ghost`，统一 `min-height 36px(桌) 44px(移)` |
| **TxConfirm** | 所有写操作前弹窗确认 |
| **ErrorBanner** | 红色可关闭，放在面板顶部 |
| **LoadOverlay** | 半透明覆盖，放在 `position: relative` 的 Panel 内 |

### 经验
不要在 8 个组件里各写一套 Panel/SectionTitle——只需一份规范，全部复用。后期统一时从"抽公共组件"改为"统一 styled 定义"更高效。

---

## 四、i18n：一次性做好，不要补

### 之前犯的错
- 组件里到处硬编码中文 → i18n 重写时改 165 处
- 重命名 key 后忘记更新组件 → `action.collect_energy` 显示原文
- 添加 key 时只加 ZH 不加 EN → 英文用户看到中文

### 最终方案
- 所有 JSX 文本必须用 `t('key')`，严禁硬编码
- 每个 key 同时维护 ZH + EN 两个版本
- 统一按页面分组管理（`action.*`、`combat.*`、`hud.*` 等）
- 用脚本扫描 `t('key')` vs 定义的差异，CI 中自动检测

### 经验
i18n 是**架构决策**，不是后期任务。一开始就做好比后期补省 10 倍时间。

---

## 五、钱包集成：wagmi v2 + RainbowKit v2

### 关键点

| 要点 | 做法 |
|------|------|
| **账户切换** | `useAccount().address` 变化时调用 `setDisconnected()` 清空旧数据 |
| **合约实例** | `new Contract(addr, abi, signer)` 用 signer 创建，非 provider |
| **RPC fallback** | `fallback([http(url1), http(url2), ...])` 多节点容灾 |
| **主题定制** | `darkTheme()` 覆盖 `colors` + `fonts.body` + `radii` |
| **按钮字体** | 用 `[data-rk] * { font-family: ... !important }` CSS 覆盖 |

### 经验
RainbowKit 的 `ConnectButton` 接管了全部钱包 UI，**不要自己写连接/断开/切换逻辑**，只响应 `useAccount()` 的变化。

---

## 六、工程实践：应该从一开始就做的

| 实践 | 说明 |
|------|------|
| **smoke-test.sh** | 45 个合约方法批量 `cast call` 验证，部署前必须跑一遍 |
| **git commit 粒度** | 每个功能点独立 commit，方便回滚 |
| **SUMMARY.md** | 每个 Session 结束更新，记录"做了什么 + 还剩什么" |
| **todowrite** | 追踪 TODO，完成即更新，不遗漏 |
| **错误分类日志** | `[civPolling] network failure #1` / `contract failure #2` 按类计数，避免刷屏 |

---

## 七、如果再做一个 DApp

1. **先读合约，再写前端** — `cast join --abi` / `cast call` 是所有对接的起点
2. **数据层先于 UI 层** — `useQuery` + store 架构先搭好，组件只消费
3. **i18n 第一行代码就引入** — 不然后面改 165 处
4. **RPC 永远不可靠** — `Promise.allSettled` + 重试 + 错误分类
5. **UI 规范先定再写** — Panel / Row / StatPill 统一后再写业务
6. **不要相信硬编码常量** — 合约常量用 view 函数读取，不要复制到 `.ts`
7. **wagmi v2 的 `useAccount()` 是唯一真相来源** — 不要自己维护 `address`/`connected` 状态
8. **每轮迭代后 git commit** — 即使 MVP，每 30 分钟 commit 一次
