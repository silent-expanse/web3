import { memo } from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * SpaceBackground — 宇宙战争动态背景层
 * - hero: AI 舰队视频循环（登录/连接屏），营造真实宇宙动态
 * - static: 星云静帧 + CSS 星场漂移（游戏主界面，不干扰操作）
 * 统一暗色蒙版 + 暗角保证 UI 对比度。
 */

/* ─── 确定性星场（box-shadow 多层星点） ─── */
function buildStars(layer: number): string {
  // 用固定种子生成伪随机坐标，保证渲染稳定
  const stars: string[] = [];
  const count = layer === 1 ? 90 : 60;
  const size = layer === 1 ? 1 : 2;
  let seed = 0x2f6e2b1;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < count; i++) {
    const x = Math.round(rand() * 1920);
    const y = Math.round(rand() * 1080);
    stars.push(`${x}px ${y}px 0 rgba(255,255,255,${layer === 1 ? 0.55 : 0.35})`);
  }
  return stars.join(',');
}
const STARS_NEAR = buildStars(1);
const STARS_FAR = buildStars(2);

const drift = keyframes`
  from { background-position: 0 0; }
  to { background-position: 0 -120px; }
`;

const slowPan = keyframes`
  from { transform: scale(1.0) translate(0, 0); }
  to { transform: scale(1.08) translate(-14px, -10px); }
`;

const Bg = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: -1;
  background: #0A0E17; /* 视频/图片加载失败时的兜底底色 */
`;

const Video = styled.video<{ $opacity: number }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: ${({ $opacity }) => $opacity};
  /* #85 移动端降级：小屏隐藏视频用静态星云，省流量/电量 */
  @media (max-width: 767px) {
    display: none;
  }
  /* #28 保障 autoplay 策略：video 已 muted+playsInline+poster */
`;

const Nebula = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url('/assets/bg/nebula.jpg');
  background-size: cover;
  background-position: center;
  animation: ${slowPan} 90s ease-in-out infinite alternate;
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const StarLayer = styled.div`
  position: absolute;
  inset: -120px 0 0 0;
  z-index: 1;
  background-image: radial-gradient(${STARS_NEAR}),
    radial-gradient(${STARS_FAR});
  background-size: 1920px 1080px, 1920px 1080px;
  animation: ${drift} 120s linear infinite;
  pointer-events: none;
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const Scrim = styled.div<{ $dense?: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: ${({ $dense }) =>
    $dense
      ? 'linear-gradient(180deg, rgba(8,12,24,0.88) 0%, rgba(8,12,24,0.62) 45%, rgba(4,6,14,0.92) 100%)'
      : 'linear-gradient(180deg, rgba(10,14,23,0.82) 0%, rgba(10,14,23,0.55) 45%, rgba(6,8,18,0.9) 100%)'};
  pointer-events: none;
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0) 52%, rgba(0,0,0,0.62) 100%);
  pointer-events: none;
`;

interface Props {
  /** hero = 视频循环（登录/连接屏）；static = 星云静帧 + 星场（游戏界面） */
  variant?: 'hero' | 'static';
  /** 视频用哪个片段：hero 登录 / ascend 升腾 / game 平静采集 */
  clip?: 'hero' | 'ascend' | 'game';
  /** 视频不透明度（主界面建议 0.5 左右，不抢操作） */
  videoOpacity?: number;
  /** 蒙版是否更浓（hero 建议 true 保证文字对比度） */
  dense?: boolean;
}

export const SpaceBackground = memo(function SpaceBackground({
  variant = 'hero',
  clip = 'hero',
  dense = false,
  videoOpacity = 1,
}: Props) {
  const src =
    clip === 'ascend'
      ? '/assets/bg/web-bg-ascend.mp4'
      : clip === 'game'
        ? '/assets/bg/web-bg-game.mp4'
        : '/assets/bg/web-bg-hero.mp4';
  const poster = '/assets/bg/nebula.jpg';
  return (
    <Bg aria-hidden="true">
      {/* #85 移动端降级：hero 分支也先渲染 Nebula 作为视频隐藏后的兜底 */}
      <Nebula />
      {variant === 'hero' && (
        <Video autoPlay muted loop playsInline preload="auto" poster={poster} src={src} $opacity={videoOpacity} />
      )}
      <StarLayer />
      <Scrim $dense={dense} />
      <Vignette />
    </Bg>
  );
});
