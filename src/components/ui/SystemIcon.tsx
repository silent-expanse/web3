import styled from 'styled-components';

/**
 * SystemIcon — 系统/资源图标渲染
 * icon 为 emoji（如 '⚡'）→ 直接渲染文本；
 * icon 为图片路径（如 '/assets/systems/collector.png'）→ 渲染 <img>。
 * 所有图标统一走此组件，便于从 emoji 迁移到图片装备。
 */
const Img = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: -3px;
  object-fit: contain;
  image-rendering: auto;
  flex-shrink: 0;
  /* 20px 变体由 size prop 覆盖 */
`;

const Emoji = styled.span`
  line-height: 1;
`;

export function SystemIcon({ icon, size }: { icon: string; size?: number }) {
  const isImage = icon.startsWith('/') || icon.startsWith('data:') || icon.startsWith('http');
  if (isImage) {
    return <Img src={icon} alt="" style={size ? { width: size, height: size } : undefined} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />;
  }
  return <Emoji style={size ? { fontSize: size } : undefined}>{icon}</Emoji>;
}
