import fs from 'fs'
import path from 'path'

export function readFile(filePath: string, basePath?: string): Promise<string> {
  filePath = path.join(basePath || __dirname, filePath)
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

export function writeFile(filePath: string, result: string, basePath?: string) {
  fs.writeFileSync(path.join(basePath || __dirname, filePath), result)
}

export function filePathWithResult(
  filePath: string,
  prefix: string = 'result'
) {
  return filePath.replace(/\.(vue|js|tsx|jsx)$/, '.' + prefix + '.$1')
}

export function unFilePathWithResult(filePath: string) {
  return filePath.replace(/(\.result)\.(vue|js|tsx|jsx)$/, '.$2')
}

export function isNeedTraslate(str: string): boolean {
  return !!(str && /[\u{4E00}-\u{9FFF}]/gmu.test(str))
}

/**
 *
 * 判断是否为原始Html的属性值，排除了实验性的属性值、废弃的属性值
 *
 * @returns
 */
export function isRawHtmlAttribute(attr: string): boolean {
  const attrs =
    'accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,data,data-*,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,enctype,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,integrity,inputmode,ismap,itemprop,keytype,kind,label,lang,list,loop,low,max,maxlength,minlength,media,method,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,role,rows,rowspan,sandbox,scope,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,tabindex,target,translate,type,usemap,width,wrap'
  return attrs.split(',').includes(attr)
}