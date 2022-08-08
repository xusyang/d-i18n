export const consts = {
  /**
   * 引入的 Module
   */
  IMPORT_I18N_PATH: '@/i18n',

  /**
   * 翻译对象
   */
  IMPORT_I18N_OBJ: 'I18N',

  /**
   * 翻译的函数
   */
  JS_I18N_FUNC: '$fanyi',

  /**
   * 翻译的函数
   */
  JS_I18N: '',

  /**
   * 屏蔽所在作用域的翻译功能
   *
   * eg：
   *
   * // @d-i18n-disable，则不进行翻译
   * const country = '中国'
   *
   */
  DISABLE_SCOPE: '@d-i18n-disable',

  /**
   *
   * javascript 源文件内容如下：
   *
   * {
   *    a:1
   * }
   *
   * 这是一个语法错误，故认为地增加了一个 let DI18N_JAVASCRIPT_OBJECT =，进行解决
   *
   */
  FIX_VUE_TEMPLATE_DIRECTIVE_OBJECT: 'let DI18N_JAVASCRIPT_OBJECT = '
}

consts.JS_I18N = `${consts.IMPORT_I18N_OBJ}.${consts.JS_I18N_FUNC}`
