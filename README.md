# d-i18n 自动国际化平台

d-i18n 是基于 Typescript 实现的全场景的自动国际化平台，有别于传统的国际化解决方案，它可以让你的项目更加简单、更加快速地集成国际化。大量减少了人力成本，提高了开发效率，以及项目的可维护性和后期运维效率，并支持审计的功能。该项目也符合公司FY23的大方向，组件化的开发思路。

目前该平台可以支持 Vue2.0，Vue3.0（暂不支持 jsx 和 tsx、vue ref 的语法糖），后续会计划支持 react。

该项目是基于CPS项目的国际化需求衍生出来的内部工具，目前还处于开发阶段，暂时不支持外部使用。

## 5大核心模块
* d-i18n-core（已开发80%）: 核心模块，主要负责国际化的数据模型的提取和反向提取。
* d-i18n-cli（规划中）: 工具服务，可以支持命令行的形式使用该工具。
* d-i18n-plugin（规划中）: 插件服务，用于前端开发工具（vscode）的集成，以及打包工具vite的集成。
  1. vscode 插件
  2. vite 插件
* d-i18n-web（规划中）: Web平台服务，支持用户通过web界面对国际化的Keywords进行管理。
* d-i18n-service（规划中）: Web接口服务，为平台提供的接口服务。

## feature

1. 支持注释屏蔽，如果注释中有`@d-i18n-disable-file`, `@d-i18n-disable`，则取消国际化处理。
2. 支持 vue2.0, vue3.0的常规语法，暂不支持 ref 语法糖。
3. v-if, v-show, v-for 指令中的中文不予翻译（如果这些指令中出现中文说明代码不规范，需要重构）
4. value 属性的中文不予翻译（如果这些指令中出现中文说明代码不规范，需要重构）

逆向解析，需要翻译 value

## todo

1. 注释节点与原始片段不一致的问题。
2. 支持console操作集不做翻译，直接输出原始的字符串。
3. Html Attribute属性不做翻译，直接输出原始的字符串。


## bug
1. 反向解析模板字符串出现单引号。

``` vue
<template>
  {{ I18N.$fanyi('中国') }}
  <span>
    {{ I18N.$fanyi('中国') }}
  </span>
  {{ I18N.$fanyi('你好') }}
  <p :title="I18N.$fanyi('中国')"></p>
</template>

<!-- 解析结果 -->
<template>
  '中国'
  <span> '中国' </span>
  '你好'
  <p :title="中国"></p>
</template>
```

1. 反向解析指令内容，如果内容为字符串，指令修改为属性。

``` vue
<template>
  {{ I18N.$fanyi('中国') }}
  <span>
    {{ I18N.$fanyi('中国人') }}
  </span>
  {{ I18N.$fanyi('你好') }}
  <p :title="I18N.$fanyi('中国')"></p>
</template>

<!-- 解析结果 -->
<template>
  中国
  <span> 中国人 </span>
  你好
  <p :title="中国"></p>
</template>

```

3. 解析表达式过程中，语法拼接出现错误

``` vue

<template>
  <p :label="`111${country + province + city}2222`"></p>
</template>


<p  :label=\"I18N.$fanyi(\"111\") + country + province + city + I18N.$fanyi(\"2222\")\"></p>
```


4. 模板字符串格式化出, 首个字符出现分号

``` vue
<layout-panel age="age"> </layout-panel>


<layout-panel :age=";`age`"></layout-panel>
```
