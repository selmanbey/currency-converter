import React from 'react'
import './Form.css'

const Form = ({ props }) => {
    let { curs, baseCur, baseVal, setBaseCur, validateValueInput } = {...props}
  
    return (
      <form className="form-wrapper">
      <select name="currency" onChange={ e => setBaseCur(e.target.value) } value={baseCur}>
          <option value={ curs.base }>{ curs.base }</option>
          <option value={ curs.other[0] }>{ curs.other[0] }</option>
          <option value={ curs.other[1] }>{ curs.other[1] }</option>
        </select>
      <input type="text" pattern="/([0-9])/" value={ baseVal } onChange={ e => validateValueInput(e) }/>
    </form>
    )
}

export default Form