export function normalizeTree(parentId: number, rawData: any[]) {
  const root = rawData.filter((x: any) => x.parentId === parentId)
  root.forEach((item: any) => {
    item.children = normalizeTree(item.id, rawData)
    if (item.children.length <= 0) delete item.children
  })
  return root
}
