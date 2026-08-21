import React from 'react';

/**
 * MarketingShell — 与 packages/client/index.html 内的 #seo-shell 保持 1:1
 * 作用：作为 prerender 的单一数据源，build 时通过 react-dom/server 渲染为静态 HTML 注入 dist/index.html。
 * 保持 GitHub Pages 纯静态部署不变（仍是 cp -r dist → gh-pages），只多一步 `vite build && prerender`。
 *
 * 如需改文案，只改此文件，build 后的 HTML 自动同步，无需手写 HTML。
 */
export function MarketingShell() {
  return (
    <div id="seo-shell">
      <nav className="seo-nav" aria-label="主导航">
        <strong>Silent Expanse: Strife</strong>
        <span style={{ color: '#5a6a84' }}>寂灭星河：纷争 · BNB Chain 全链游戏</span>
        <div className="seo-nav-links">
          <a href="#about">世界观</a>
          <a href="#gameplay">玩法</a>
          <a href="#economy">经济</a>
          <a href="#agent">AI Agent</a>
          <a href="#faq">FAQ</a>
          <a href="https://docs.strifelabs.com" target="_blank" rel="noopener noreferrer">文档</a>
          <a href="https://github.com/silent-expanse/web3" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </nav>

      <header className="seo-hero">
        <p style={{ color: '#00D4AA', letterSpacing: '3px', fontSize: '0.78rem', fontFamily: "'Courier New',monospace", marginBottom: '10px' }}>FULLY ON-CHAIN 3D MMO SLG · BNB CHAIN</p>
        <h1>Silent Expanse: <span>Strife</span> — 寂灭星河：纷争</h1>
        <p className="tagline">
          “宇宙就是一座黑暗森林，每个文明都是带枪的猎人。”—— 刘慈欣。受《三体》黑暗森林法则启发的
          <strong>完全链上 3D 宇宙 MMO SLG</strong>：无限程序生成太空，文明创建、科技升级、能量采集、掠夺与联盟。人类巡逻、AI 代打。
        </p>
        <div className="cta">
          <a className="seo-btn seo-btn-primary" href="https://strifelabs.com/">进入游戏</a>
          <a className="seo-btn seo-btn-ghost" href="https://docs.strifelabs.com">查看文档</a>
          <a className="seo-btn seo-btn-ghost" href="https://github.com/silent-expanse/web3/blob/main/WHITEPAPER.md">白皮书</a>
        </div>
        <p style={{ marginTop: '10px', color: '#5a6a84', fontSize: '0.76rem', fontFamily: "'Courier New',monospace" }}>合约已部署 BNB Chain 主网 · 已开源验证 · 支持 AI Agent 托管</p>
      </header>

      <div className="seo-grid" role="list">
        <div className="seo-card" role="listitem"><h3>无限宇宙 · 真随机坐标</h3><p>每个文明随机投放于 3D 坐标，空间跳跃、追踪跳跃、巡航三种移动，跳跃冷却 1 小时，发现即风险。</p></div>
        <div className="seo-card" role="listitem"><h3>五大系统 · 无上限升级</h3><p>采集/武器/护盾/雷达/引擎，锚定 1→60 天 SES 价值的升级曲线，多倍率差异化成长。</p></div>
        <div className="seo-card" role="listitem"><h3>掠夺与生存</h3><p>攻击消耗能量与 Token 限速，5% 基础掠夺 + 武器等级加成，击杀掉级甚至摧毁文明，可重建。</p></div>
        <div className="seo-card" role="listitem"><h3>AI Agent 代打</h3><p>Python SDK + 策略引擎（balanced/aggressive/defensive/farmer），YAML 策略 + 链上 AgentRegistry 围栏，私钥永不离线。</p></div>
      </div>

      <section className="seo-section" id="about">
        <h2>世界观：黑暗森林</h2>
        <p>没有安全区。联盟最多 100 人，退出有 SES 违约金与 24 小时冷却。图腾捐赠提升全盟防御。以隐藏和威慑求生，而非和平。</p>
        <ul>
          <li>文明初始：能量 2000、生命 3000、护盾 3615、雷达 1000 ls，24h 新人保护</li>
          <li>采集器耐久与推荐奖励：每推荐一人 +0.2% 采集速率</li>
          <li>移动、战斗、建造全部为链上交易，可被区块浏览器验证</li>
        </ul>
      </section>

      <section className="seo-section" id="gameplay">
        <h2>玩法：采集 · 战斗 · 移动 · 联盟</h2>
        <p>升级、采集、攻击、修理、跳跃、巡航、联盟与图腾构成分工。攻防公式 <code>atk=900+10·Lv²</code>、<code>def=540+6·Lv²</code> 保证数值可推演。能量市场为订单簿锁定-结算模式，防超卖与抢跑。</p>
        <table className="seo-table"><thead><tr><th>系统</th><th>效果</th><th>成本倍率</th></tr></thead><tbody><tr><td>采集器</td><td>速率 N² 增长</td><td>×1</td></tr><tr><td>武器</td><td>攻击 N² 增长</td><td>×4</td></tr><tr><td>护盾</td><td>HP N² 增长</td><td>×4</td></tr><tr><td>雷达</td><td>范围线性+N²</td><td>×8</td></tr><tr><td>引擎</td><td>速度线性</td><td>×16</td></tr></tbody></table>
        <p>更多公式见 <a href="https://docs.strifelabs.com/docs/guide/civilization">文明与升级</a>、<a href="https://docs.strifelabs.com/docs/guide/battle">战斗</a>、<a href="https://docs.strifelabs.com/docs/guide/movement">移动</a>。</p>
      </section>

      <section className="seo-section" id="economy">
        <h2>经济：SES 42069 亿 · 10 年线性释放</h2>
        <p>每日释放 11.5 亿 SES，经 DailyMinter 按 epoch 分发，玩家须在 epoch 结束前创建文明方可领取，逾期销毁。入场费首年 0.01→0.05 BNB（BNB Chain 燃料远低于 ETH），累计至 feeRecipient。</p>
        <table className="seo-table"><thead><tr><th>合约</th><th>地址（BSC）</th></tr></thead><tbody>
          <tr><td>Game</td><td>0xa5959273f87c7a555193fa2b9e81e0526cd357aa</td></tr>
          <tr><td>SES Token</td><td>0x0c01d8500b8b819eb4459233d9bcc2e7c6a27109</td></tr>
          <tr><td>DailyMinter</td><td>0x207c6eefd47f5d943f167504bf2cc1c6fa764803</td></tr>
          <tr><td>EnergyMarket</td><td>0xe21c780c163fd65e8962cfbaea143d825cc7b8e8</td></tr>
        </tbody></table>
        <p>SES 用途：升级/跳跃/重建燃烧，联盟退出分配，能量市场与 DEX 交易（PancakeSwap 2.5% 税：1% 开发者 +1.5% 市场）。详见 <a href="https://docs.strifelabs.com/docs/economy/ses-overview">SES 概览</a>。</p>
      </section>

      <section className="seo-section" id="agent">
        <h2>AI Agent：人类巡逻、机器战斗</h2>
        <p>四档预设：<strong>aggressive</strong> 高频掠夺、<strong>balanced</strong> 均衡、<strong>defensive</strong> 防守、<strong>farmer</strong> 纯种田。策略引擎每 tick 决策，熔断器拦截异常，Telegram/Discord 报告。两层安全：本地 YAML“怎么玩” + 链上 AgentRegistry“最多能玩多少”。</p>
        <p>快速开始：<code>pip install web3 pyyaml requests websockets</code> → <code>ses --rpc $RPC --account alice status</code> → <code>ses run --strategy balanced</code>。源码见 <a href="https://github.com/silent-expanse/web3/tree/main/packages/agent">packages/agent</a>。</p>
      </section>

      <section className="seo-section" id="faq">
        <h2>FAQ</h2>
        <p><strong>Q: 需要多少入场费？</strong> 首日 0.01 BNB，365 天内线性涨至 0.05 BNB（BNB 成本远低于 ETH），均进入合约 feeRecipient。</p>
        <p><strong>Q: 被击杀会怎样？</strong> 能量被掠、随机系统掉一级，全体 1 级则文明摧毁，需消耗能量与 SES 重建。</p>
        <p><strong>Q: 怎么获得 SES？</strong> 每日通过 DailyMinter 领取当期 epoch，或在能量市场/DEX 购买。</p>
        <p><strong>Q: 是否开源？</strong> 9 合约已在 BscScan 验证，仓库 MIT 开源，含 177 Tests。</p>
        <p>完整 FAQ：<a href="https://docs.strifelabs.com/docs/reference/faq">docs/reference/faq</a> · 术语：<a href="https://docs.strifelabs.com/docs/reference/glossary">glossary</a></p>
      </section>

      <section className="seo-section" id="docs">
        <h2>文档与白皮书</h2>
        <ul>
          <li><a href="https://docs.strifelabs.com/docs/quickstart/install-wallet">安装钱包</a> · <a href="https://docs.strifelabs.com/docs/quickstart/connect-bsc">连接 BSC</a> · <a href="https://docs.strifelabs.com/docs/quickstart/create-civ">创建文明</a> · <a href="https://docs.strifelabs.com/docs/quickstart/get-ses">获取 SES</a></li>
          <li><a href="https://github.com/silent-expanse/web3/blob/main/WHITEPAPER.md">WHITEPAPER.md</a> · <a href="https://github.com/silent-expanse/web3/blob/main/SPECIFICATION.md">SPECIFICATION.md</a> · <a href="https://github.com/silent-expanse/web3/blob/main/SECURITY_AUDIT_V10.md">SECURITY_AUDIT_V10.md</a></li>
          <li>AI 内容入口：<a href="/llms.txt">/llms.txt</a> · <a href="/llms-full.txt">/llms-full.txt</a> · <a href="/sitemap.xml">/sitemap.xml</a></li>
        </ul>
      </section>

      <footer className="seo-foot">
        <span>© 2026 Strife Labs · Built on BNB Chain · <a href="https://strifelabs.com">strifelabs.com</a> · <a href="https://docs.strifelabs.com">docs.strifelabs.com</a></span>
        <span><a href="https://x.com/strifeonchain">X</a> · <a href="https://t.me/strifelabs">Telegram</a> · <a href="mailto:strifelabs@proton.me">Email</a> · <a href="https://github.com/silent-expanse/web3">GitHub</a></span>
      </footer>
    </div>
  );
}
