/**
 * 根据 BV 号构造 Bilibili 官方播放器 iframe 的 src。
 *
 * 形如：`https://player.bilibili.com/player.html?bvid=BVxxxx&page=1&high_quality=1&danmaku=0`
 *
 * @param bvid 视频 BV 号。
 */
export function buildPlayerSrc(bvid: string): string {
  const params = new URLSearchParams({
    bvid,
    page: '1',
    high_quality: '1',
    danmaku: '0',
  })
  return `https://player.bilibili.com/player.html?${params.toString()}`
}
