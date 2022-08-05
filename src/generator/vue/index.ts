import { SFCDescriptor } from '@vue/compiler-sfc'
import { isElement, isInterpolation, isText } from '../../types/index'
import { AttributeNode, TemplateChildNode } from '@vue/compiler-core'

function generateVueSfcTemplate(descriptor: SFCDescriptor) {
  if (descriptor.template) {
    descriptor.template.content = generateVueSfcTemplateChildren(
      descriptor.template.ast.children
    )
  }
}

function generateVueSfcTemplateChildren(children: TemplateChildNode[]) {
  const result = children.reduce((prev, curr) => {
    let code = ''
    if (isElement(curr)) {
      let propsContent = ''
      let childrenContent = ''

      if (curr.children.length > 0) {
        childrenContent = generateVueSfcTemplateChildren(curr.children)
      }

      if (curr.props.length > 0) {
        propsContent = generateVueSfcTemplateProps(
          curr.props as AttributeNode[]
        )
      }

      if (curr.isSelfClosing) {
        code = `<${curr.tag} ${propsContent} />`
      } else {
        if (!!childrenContent.trim()) {
          code = `<${curr.tag} ${propsContent}>
            ${childrenContent}
          </${curr.tag}>`
        } else {
          code = `<${curr.tag} ${propsContent}></${curr.tag}>`
        }
      }
    } else if (isInterpolation(curr)) {
      code += curr.loc.source
    } else if (isText(curr)) {
      code += curr.loc.source
    }
    return prev + ' ' + code
  }, '')

  return result
}

function generateVueSfcTemplateProps(props: AttributeNode[]) {
  const result = props.reduce((prev, curr) => {
    return prev + ' ' + curr.loc.source
  }, ' ')
  return result
}

/**
 * 生成 vue sfc
 * @param descriptor
 * @returns
 */
export function generateVueSfc(descriptor: SFCDescriptor) {
  // 1. 转换 sfc template 'custon ast' to content
  generateVueSfcTemplate(descriptor)

  // 2. 生成 sfc
  const { template, script, scriptSetup, styles, customBlocks } = descriptor
  const blocks = [template, script, scriptSetup, ...styles, ...customBlocks]

  return blocks.reduce((result, block) => {
    if (block?.type) {
      result += `<${block.type} ${Object.entries(block.attrs)
        .map(([key, value]) => {
          if (value === true) {
            return `${key}`
          } else {
            return `${key}="${value}"`
          }
        })
        .join(' ')}>
         ${block.content}
        </${block.type}>`
      result += '\n\n'
    }
    return result
  }, '')
}
