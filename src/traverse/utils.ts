import type { NodePath } from '@babel/traverse'

/**
 *
 * 判断当前节点是否需要翻译, 并不是所有节点都需要翻译
 *
 * eg：
 * 1. obj[key]
 * 2. obj.key
 *
 * 以上这些节点不需要翻译
 */
export function judgeNeedTraslateNode(path: NodePath) {
  const isNeedTraslateNode = !path.findParent(x => {
    return x.isMemberExpression() || x.isObjectProperty()
  })

  return isNeedTraslateNode
}
