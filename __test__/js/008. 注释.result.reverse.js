const a =
  /* this is inner block comment @d-i18n-disable */
  '111'
/* this is block comment */

const b = '222'

// this is line comment

const c = '333'

// this is function comment  @d-i18n-disable

function add() {
  const str = '444'
  console.log(str)
}

// this is arrow function comment

const minus = () => {
  const str = '555'
  console.log(str)
  /**
   * 1
   * 2
   * 3
   */

  // this is block statement comment

  {
    console.log('666')
  }
}
