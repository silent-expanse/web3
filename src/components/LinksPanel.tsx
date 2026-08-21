import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { THEME } from '../theme';
import { useI18n } from '../hooks/useI18n';

interface LinkItem {
  name: string;
  url: string;
  desc: string;
}

const FALLBACK: LinkItem[] = [
  { name: 'BNB Chain', url: 'https://www.bnbchain.org/', desc: 'BNB Smart Chain 官方' },
  { name: 'BscScan', url: 'https://bscscan.com/address/0x58c2400527813f78fc7ed498dd4ec66dc7787e73', desc: '合约验证' },
  { name: 'PancakeSwap', url: 'https://pancakeswap.finance/', desc: 'SES 交易' },
  { name: 'YouTube', url: 'https://www.youtube.com/', desc: '测试友链' },
  { name: 'Strife Docs', url: 'https://docs.strifelabs.com/', desc: '官方文档 12 语言' },
  { name: 'GitHub', url: 'https://github.com/silent-expanse/web3', desc: 'MIT 开源' },
];

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
const Intro = styled.p`
  color: ${THEME.text.secondary};
  font-size: 0.82rem;
  line-height: 1.7;
  code { background: ${THEME.alpha(THEME.card, 0.6)}; padding: 1px 5px; border-radius: 3px; font-size: 0.76rem; }
  a { color: ${THEME.accent.green}; }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`;
const Card = styled.a`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  background: ${THEME.alpha(THEME.card, 0.6)};
  border: 1px solid ${THEME.border};
  border-radius: 8px;
  text-decoration: none;
  transition: border-color 0.15s, transform 0.15s;
  &:hover { border-color: ${THEME.accent.green}; transform: translateY(-1px); }
`;
const CardName = styled.span`
  color: ${THEME.text.primary};
  font-weight: 700;
  font-size: 0.92rem;
`;
const CardDesc = styled.span`
  color: ${THEME.text.secondary};
  font-size: 0.78rem;
`;
const CardUrl = styled.span`
  color: ${THEME.alpha(THEME.accent.green, 0.7)};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  word-break: break-all;
`;
const Apply = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border: 1px dashed ${THEME.alpha(THEME.accent.green, 0.4)};
  border-radius: 20px;
  background: ${THEME.alpha(THEME.accent.green, 0.08)};
  color: ${THEME.accent.green};
  font-size: 0.82rem;
  text-decoration: none;
  width: fit-content;
  &:hover { background: ${THEME.alpha(THEME.accent.green, 0.14)}; }
`;

export function LinksPanel() {
  const { t } = useI18n();
  const [links, setLinks] = useState<LinkItem[]>(FALLBACK);

  useEffect(() => {
    fetch('/links.json', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then((data: LinkItem[] | null) => { if (Array.isArray(data) && data.length) setLinks(data); })
      .catch(() => {});
  }, []);

  return (
    <Wrap>
      <Intro>
        与 BSC / GameFi / AI 生态互换流量，申请请邮件 <a href="mailto:strifelabs@proton.me?subject=友情链接交换申请">strifelabs@proton.me</a>（回链锚文本 <code>Silent Expanse: Strife</code> → <code>https://strifelabs.com/</code>）。数据源 <a href="/links.json" target="_blank" rel="noopener">/links.json</a> 与首页 <code>#links</code> 同源，<code>prerender</code> 后对爬虫一致。
      </Intro>
      <Grid>
        {links.filter(l => !l.url.startsWith('mailto:')).map(l => (
          <Card key={l.name + l.url} href={l.url} target="_blank" rel="noopener">
            <CardName>{l.name} ↗</CardName>
            <CardDesc>{l.desc}</CardDesc>
            <CardUrl>{l.url.replace(/^https?:\/\//, '')}</CardUrl>
          </Card>
        ))}
      </Grid>
      <Apply href="mailto:strifelabs@proton.me?subject=友情链接交换申请-来自strifelabs.com">＋ 虚位以待 · 申请交换</Apply>
      <Intro style={{ fontSize: '0.74rem', opacity: 0.8 }}>
        提示：友链为 <code>dofollow</code>（不加 <code>nofollow</code>）才可互换权重，定期巡检 404 即下线。
      </Intro>
    </Wrap>
  );
}
