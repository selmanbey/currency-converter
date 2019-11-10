import React, { useState, useEffect, useRef } from 'react'
import Form from './components/Form.js'
import Results from './components/Results.js'
import './App.css'

const App = () => {
  const [curs, setCurs] = useState({ base: "EUR", other: ["USD", "JPY"] })
  const [rates, setRates] = useState({ EUR: null, USD: null, JPY: null })
  const [vals, setVals] = useState({ EUR: 0, USD: 0, JPY: 0 })
  const [baseCur, setBaseCur] = useState("EUR")
  const [baseVal, setBaseVal] = useState(1)

  const notifDiv = useRef(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    let newCurs = ["EUR", "USD", "JPY"].reduce( (acc, cur) => {
      cur === baseCur ? acc.base = cur : acc.other.push(cur)
      return acc
    }, { "base": null, "other": [] })

    setCurs(newCurs)
  }, [baseCur])

  useEffect(() => {
    async function fetchRates(curs, setRates) {
      let { base, other } = curs
      let res = await fetch(`https://api.exchangeratesapi.io/latest?base=${ base }`)
      res = await res.json()
      let rates = {
        [base]: 1,
        [other[0]]: res.rates[other[0]],
        [other[1]]: res.rates[other[1]]
      }
      setRates(rates)
    }

    fetchRates(curs, setRates)
  }, [curs])

  useEffect(() => {
    function getExchangeVal(rate) {
      return (baseVal * rate).toFixed(2)
    }
    
    let newVals = {
      [curs.base]: baseVal,
      [curs.other[0]]: getExchangeVal(rates[curs.other[0]]),
      [curs.other[1]]: getExchangeVal(rates[curs.other[1]]),
    }
    setVals(newVals)
  }, [rates, curs, baseVal])
  
  function changeBase(newBaseCur) {
    setBaseCur(newBaseCur)
    setBaseVal(vals[newBaseCur])
  }
  
  function validateValueInput(e) {
    let input = e.target.value === "" ? "0" : e.target.value 
 
    if(input.length > 1 && input[0] === "0") {
      input = input.substr(1)  // inputs shouldn't start with zero
    } 
    
    if(input !== "0" && !parseInt(input)) {
      setMessage("Only numbers please")
      notifDiv.current.style.display = "block"
      setBaseVal(0)
    } else if (input.length > 10) {
      setMessage("Max. 10 characters")
      notifDiv.current.style.display = "block" 
    } else {
      setBaseVal(parseInt(input))
      notifDiv.current.style.display = "none"
      setMessage("")
    }
  }

  return (
    <div className="app-wrapper">
      <main className="app-converter">
        <Form props={{ curs, baseCur, baseVal, setBaseCur, validateValueInput }}/>
        <Results props={{ curs, vals, changeBase }} />
        <div ref={notifDiv} className="app-invalid-input">{ message }</div>
      </main>
    </div>
  );
}

export default App
