/**
 * BV 号相关工具。
 *
 * BV 号格式：以 `BV` 开头，后跟 10 位字母或数字，例如 `BV1xx411c7mD`。
 */

/** BV 号匹配正则（不含全局/锚定，便于在任意文本中提取首个匹配）。 */
const BVID_PATTERN = /BV[0-9A-Za-z]{10}/

/**
 * 从任意文本（纯 BV 号、视频链接、夹带 BV 号的文字）中提取首个 BV 号。
 *
 * @returns 命中返回 BV 号字符串，未命中返回 `null`。
 */
export function extractBvid(text: string): string | null {
  if (typeof text !== 'string' || text.length === 0) {
    return null
  }
  const match = text.match(BVID_PATTERN)
  return match ? match[0] : null
}
