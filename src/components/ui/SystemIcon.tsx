import styled from 'styled-components';

/**
 * SystemIcon — 系统/资源图标渲染
 * icon 为 emoji（如 '⚡'）→ 直接渲染文本；
 * icon 为图片路径（如 '/assets/systems/collector.png'）→ 渲染 <img>。
 * 所有图标统一走此组件，便于从 emoji 迁移到图片装备。
 */
const Img = styled.img`
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.25em;
  object-fit: contain;
  image-rendering: auto;
  flex-shrink: 0;
`;

const Emoji = styled.span`
  line-height: 1;
`;

export function SystemIcon({ icon, size }: { icon: string; size?: number }) {
  const isImage = icon.startsWith('/') || icon.startsWith('data:') || icon.startsWith('http');
  if (isImage) {
    return <Img src={icon} alt="" style={size ? { width: size, height: size } : undefined} />;
  }
  return <Emoji style={size ? { fontSize: size } : undefined}>{icon}</Emoji>;
}
