import { extractBvid } from './bvid'

/**
 * 仅支持「视频直链」两种格式（不解析 b23.tv 短码）：
 *
 * - `https://www.bilibili.com/video/BVxxxx`
 * - `https://m.bilibili.com/video/BVxxxx`
 *
 * host 大小写不敏感，允许携带 query / hash（正则不锚定结尾）。
 */
const BILIBILI_VIDEO_URL = /https?:\/\/(?:www\.|m\.)?bilibili\.com\/video\/(BV[0-9A-Za-z]{10})/i

/** {@link parseBilibiliUrl} 的返回结果。 */
export interface ParsedBilibiliUrl {
  /** 是否命中受支持的 Bilibili 视频链接。 */
  matched: boolean
  /** 命中时解析出的 BV 号。 */
  bvid?: string
}

/**
 * 解析一段文本是否为受支持的 Bilibili 视频链接，并提取 BV 号。
 *
 * @param input 待解析文本（通常来自粘贴板或菜单输入框）。
 */
export function parseBilibiliUrl(input: string): ParsedBilibiliUrl {
  if (typeof input !== 'string' || input.length === 0) {
    return { matched: false }
  }

  const match = input.match(BILIBILI_VIDEO_URL)
  if (!match) {
    return { matched: false }
  }

  const bvid = match[1] ?? extractBvid(match[0])
  if (!bvid) {
    return { matched: false }
  }

  return { matched: true, bvid }
}
