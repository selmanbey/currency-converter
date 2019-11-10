import React from 'react'
import './Results.css'

const Results = ({ props }) => {
    let { curs, vals, changeBase } = {...props}
  
    return (
      <div className="res-wrapper">
        <p onClick={ e => changeBase(curs.other[0]) }>
          <span>{ vals[curs.other[0]] }</span>
          <span>{ curs.other[0] }</span>
        </p>
        <p onClick={ e => changeBase(curs.other[1]) }>
          <span>{ vals[curs.other[1]] }</span> 
          <span>{ curs.other[1] }</span>
        </p>
      </div>
    )
}

export default Results