import type { IDomEditor, IDropPanelMenu } from '@wangeditor-next/editor'
import { parseBilibiliUrl } from '../utils/url'
import { insertBilibiliVideoNode } from '../utils/insert-node'

/** Bilibili 图标（simple-icons 官方 logo，viewBox 居中铺满，不裁切）。 */
const BILIBILI_ICON_SVG =
  '<svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="currentColor" d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .356-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.249-.56.373-.933.373s-.684-.124-.933-.373c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.249-.56.373-.933.373s-.684-.124-.933-.373c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/></svg>'

/** 复用 wangEditor 主题 CSS 变量，保证与编辑器（含暗色主题）一致。 */
const THEME_COLOR = 'var(--w-e-toolbar-color)'
const THEME_BG = 'var(--w-e-toolbar-bg-color)'
const THEME_BORDER = '1px solid var(--w-e-modal-button-border-color)'

/** 批量设置内联样式的小工具，避免逐行 `el.style.xxx = ...` 的冗长重复。 */
function applyStyles(el: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
  Object.assign(el.style, styles)
}

/**
 * 「插入 B站视频」自定义菜单（下拉面板式）。
 *
 * 采用 {@link IDropPanelMenu}：面板**固定显示在工具栏按钮正下方**，与编辑器
 * 选区无关——避免 ModalMenu 因弹窗跟随选区、在已插入视频后定位到视频上的问题。
 *
 * 面板内含一个「视频链接」输入框，用户粘贴受支持的 Bilibili 视频直链并确认后
 * 插入视频节点。校验与解析复用 {@link parseBilibiliUrl}。
 */
export class InsertBilibiliMenu implements IDropPanelMenu {
  readonly title = '插入 B站视频'
  readonly tag = 'button'
  readonly iconSvg = BILIBILI_ICON_SVG
  readonly showDropPanel = true

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

  /** 面板驱动，无需 `exec`。 */
  exec(_editor: IDomEditor, _value: string | boolean): void {
    // do nothing
  }

  /** 构造下拉面板内容 DOM。每次打开都新建，避免状态残留。 */
  getPanelContentElem(editor: IDomEditor): HTMLElement {
    const content = document.createElement('div')
    content.className = 'w-e-bilibili-panel'
    // DropPanel 无 modalWidth，自行约束尺寸；左对齐并继承编辑器主题色。
    applyStyles(content, {
      minWidth: '280px',
      padding: '4px',
      textAlign: 'left',
      boxSizing: 'border-box',
      color: THEME_COLOR,
    })

    const label = document.createElement('label')
    applyStyles(label, { display: 'block', marginBottom: '6px', fontSize: '14px' })
    label.textContent = 'Bilibili 视频链接'

    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'https://www.bilibili.com/video/BV...'
    // 对齐 wangEditor 内置 modal 输入框样式（复用主题变量）；
    // 不抑制 outline，保留浏览器默认聚焦轮廓（可访问性）。
    applyStyles(input, {
      display: 'block',
      width: '100%',
      marginTop: '6px',
      padding: '4.5px 11px',
      border: THEME_BORDER,
      borderRadius: '4px',
      backgroundColor: THEME_BG,
      color: THEME_COLOR,
      boxSizing: 'border-box',
    })
    label.appendChild(input)

    const tip = document.createElement('div')
    applyStyles(tip, { color: '#f5222d', fontSize: '12px', minHeight: '8px', margin: '3px 0' })

    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = '确定'
    // 与输入框一致的描边风格，协调且适配主题。
    applyStyles(button, {
      padding: '5px 16px',
      border: THEME_BORDER,
      borderRadius: '4px',
      backgroundColor: THEME_BG,
      color: THEME_COLOR,
      cursor: 'pointer',
    })

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
      // 排除输入法组合输入：IME 用 Enter 确认候选词时不应误触发提交。
      if (event.key === 'Enter' && !event.isComposing) {
        submit()
      }
    })

    content.appendChild(label)
    content.appendChild(tip)
    content.appendChild(button)
    return content
  }
}
