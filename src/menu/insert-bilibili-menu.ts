import type { IDomEditor, IModalMenu } from '@wangeditor-next/editor'
import { parseBilibiliUrl } from '../utils/url'
import { insertBilibiliVideoNode } from '../utils/insert-node'

/** Bilibili「电视」图标（toolbar 按钮）。 */
const BILIBILI_ICON_SVG =
  '<svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M306 105.7c10.5 10.4 18.9 22.4 25.4 36.3h361.2c6.5-13.9 14.9-25.9 25.4-36.3 16.6-16.6 36.7-24.9 60.3-24.9 23.6 0 43.7 8.3 60.3 24.9 16.6 16.6 24.9 36.7 24.9 60.3 0 16.7-4.4 31.9-13.1 45.4h28.2c46.9 0 86.9 16.6 120 49.7 33.1 33.1 49.7 73.1 49.7 120v347c0 46.9-16.6 86.9-49.7 120-33.1 33.1-73.1 49.7-120 49.7H146.5c-46.9 0-86.9-16.6-120-49.7C-6.6 814.9-23.2 774.9-23.2 728V381c0-46.9 16.6-86.9 49.7-120 33.1-33.1 73.1-49.7 120-49.7h28.2c-8.7-13.5-13.1-28.7-13.1-45.4 0-23.6 8.3-43.7 24.9-60.3 16.6-16.6 36.7-24.9 60.3-24.9 23.6 0 43.7 8.3 60.3 24.9zm-159.5 178c-26.9 0-49.7 9.4-68.4 28.1S50 353.3 50 381v347c0 27.7 9.4 50.5 28.1 69.2s41.5 28.1 68.4 28.1h731c26.9 0 49.7-9.4 68.4-28.1S974 755.7 974 728V381c0-27.7-9.4-50.5-28.1-69.2s-41.5-28.1-68.4-28.1h-731zm165 138c11.7 0 21.7 4.1 30 12.4l78 78h138l78-78c8.3-8.3 18.3-12.4 30-12.4 11.7 0 21.7 4.1 30 12.4 8.3 8.3 12.4 18.3 12.4 30s-4.1 21.7-12.4 30l-26 26h26c11.7 0 21.7 4.1 30 12.4 8.3 8.3 12.4 18.3 12.4 30s-4.1 21.7-12.4 30-18.3 12.4-30 12.4-21.7-4.1-30-12.4l-78-78h-138l-78 78c-8.3 8.3-18.3 12.4-30 12.4z"/></svg>'

/**
 * 「插入 B站视频」自定义菜单（弹窗式）。
 *
 * 点击后弹出一个含「视频链接」输入框的面板，用户粘贴受支持的 Bilibili
 * 视频直链并确认后插入视频节点。校验与解析复用 {@link parseBilibiliUrl}。
 */
export class InsertBilibiliMenu implements IModalMenu {
  readonly title = '插入 B站视频'
  readonly tag = 'button'
  readonly iconSvg = BILIBILI_ICON_SVG
  readonly showModal = true
  readonly modalWidth = 300

  /** void 菜单：返回值无意义。 */
  getValue(_editor: IDomEditor): string | boolean {
    return ''
  }

  isActive(_editor: IDomEditor): boolean {
    return false
  }

  isDisabled(_editor: IDomEditor): boolean {
    return false
  }

  /** 弹窗驱动，无需 `exec`。 */
  exec(_editor: IDomEditor, _value: string | boolean): void {
    // do nothing
  }

  /** 弹窗定位锚点：不依赖选区节点，返回 null。 */
  getModalPositionNode(_editor: IDomEditor): null {
    return null
  }

  /** 构造弹窗内容 DOM。每次打开都新建，避免状态残留。 */
  getModalContentElem(editor: IDomEditor): HTMLElement {
    const content = document.createElement('div')
    content.className = 'w-e-bilibili-modal'

    const label = document.createElement('label')
    label.style.display = 'block'
    label.style.marginBottom = '8px'
    label.style.fontSize = '14px'
    label.textContent = 'Bilibili 视频链接'

    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'https://www.bilibili.com/video/BV...'
    input.style.width = '100%'
    input.style.boxSizing = 'border-box'
    input.style.marginTop = '4px'
    label.appendChild(input)

    const tip = document.createElement('div')
    tip.style.color = '#f5222d'
    tip.style.fontSize = '12px'
    tip.style.minHeight = '16px'
    tip.style.margin = '4px 0'

    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = '确定'
    button.style.cursor = 'pointer'

    const submit = (): void => {
      const { matched, bvid } = parseBilibiliUrl(input.value.trim())
      if (!matched || !bvid) {
        tip.textContent = '请输入有效的 Bilibili 视频链接'
        return
      }
      tip.textContent = ''
      insertBilibiliVideoNode(editor, bvid)
      editor.hidePanelOrModal()
    }

    button.addEventListener('click', submit)
    input.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        submit()
      }
    })

    content.appendChild(label)
    content.appendChild(tip)
    content.appendChild(button)
    return content
  }
}
