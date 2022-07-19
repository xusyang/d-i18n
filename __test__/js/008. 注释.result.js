const a =
  /* this is inner block comment @d-i18n-disable */
  '111'
/* this is block comment */

const b = I18N.$fanyi('222')

// this is line comment

const c = I18N.$fanyi('333')

// this is function comment  @d-i18n-disable

function add() {
  const str = '444'
  console.log(str)
}

// this is arrow function comment

const minus = () => {
  const str = I18N.$fanyi('555')
  console.log(str)
  /**
   * 1
   * 2
   * 3
   */

  // this is block statement comment

  {
    console.log(I18N.$fanyi('666'))
  }
}
