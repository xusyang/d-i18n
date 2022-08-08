import { parse } from '@babel/parser'
import type { NodePath } from '@babel/traverse'
import fs from 'fs'

export function readFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export function writeFile(filePath: string, result: string) {
  fs.writeFileSync(filePath, result)
}

export function filePathWithResult(
  filePath: string,
  prefix: string = 'result'
) {
  if (prefix)
    return filePath.replace(/\.(vue|js|tsx|jsx)$/, '.' + prefix + '.$1')
  else {
    return filePath.replace(/\.(vue|js|tsx|jsx)$/, '.$1')
  }
}

export function unFilePathWithResult(filePath: string) {
  return filePath.replace(/(\.result)\.(vue|js|tsx|jsx)$/, '.$2')
}

export function isNeedTraslateText(str: string): boolean {
  return !!(str && /[\u{4E00}-\u{9FFF}]/gmu.test(str))
}

export function isClearQuoat(str: string) {
  return str.replace(/['"]/g, '')
}

/**
 * 是否需要翻译当前节点
 */
export function isNeedTraslateNode(path: NodePath) {
  /**
   * return ture
   *
   * obj[`我的祖国`] key不做防疫
   */
  const result = !path.findParent(x => {
    return x.isMemberExpression()
  })
  return result
}

/**
 *
 * 判断是否为原始Html的属性值，排除了实验性的属性值、废弃的属性值
 *
 * @returns
 */
export function isRawHtmlAttribute(attr: string): boolean {
  const attrs =
    'value,accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,contenteditable,contextmenu,controls,coords,crossorigin,data,data-*,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,enctype,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,integrity,inputmode,ismap,itemprop,keytype,kind,lang,list,loop,low,max,maxlength,minlength,media,method,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,role,rows,rowspan,sandbox,scope,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,tabindex,target,translate,type,usemap,width,wrap'

  /**
   * 移除的attr/src
   *
   * title
   * label
   * content
   */
  return attrs.split(',').includes(attr)
}

/**
 * 判断是否是一个字符串节点
 *
 * TODO 如何优雅的来判断代码片段是一个 expression or static text node
 *
 */
export function isStringLiteral(code: string) {
  try {
    return parse(code).program.body.length === 0
  } catch (error) {
    return false
  }
}
