import Head from 'next/head'

import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {

  const [ calculator, setCalculator ] = useState({
    bill: "",
    tipPercentage: "",
    numberOfPeople: "",
    tipAmountPerPerson: null,
    totalPerPerson: null
  })

  const validateNumbers = (string) => {
    // The regular expression pattern we want to match against
    const pattern = /^\d+$/;

    // Use the `test` method to check if the string matches the pattern
    return pattern.test(string);
  }

  const calculateTip = (bill, tipPercentage, numberOfPeople) => {
    const total = (bill * (1 + (tipPercentage / 100))) / numberOfPeople
    const tipAmount = (bill * (tipPercentage / 100)) / numberOfPeople

    return [ tipAmount.toFixed(2), total.toFixed(2) ]
  }

  const setBill = (e) => {

    let value = e.target.value
    let bill;

    // avoid parsing an empty string which will result in NaN
    if (validateNumbers(value)) {
      bill = parseInt(value)
    } else {
      bill = ""
    }


    setCalculator({...calculator, bill: bill})
  }

  const setTip = (e) => {
    const value = e.target.id
    const tip = parseInt(value)
    setCalculator({...calculator, tipPercentage: tip})
  }

  const setNumberOfPeople = (e) => {
    let value = e.target.value
    let people;

    if (validateNumbers(value)) {
      people = parseInt(value)
    } else {
      people = ""
    }

    setCalculator({...calculator, numberOfPeople: people})
  }

  const setCustomTip = (e) => {
    let value = e.target.value;
    let customTip;

    if (validateNumbers(value)) {
      customTip = parseInt(value)
    } else {
      customTip = ""
    }

    setCalculator({...calculator, tipPercentage: customTip})
  }

  const resetCalculator = () => {
    setCalculator({...calculator, bill: "", tipPercentage: "", numberOfPeople: "", tipAmountPerPerson: null, totalPerPerson: null})
  }

  useEffect(() => {
    const validBill = Number.isInteger(calculator.bill)
    const validTip = Number.isInteger(calculator.tipPercentage)
    const validNumberOfPeople = Number.isInteger(calculator.numberOfPeople)

    if (validBill && validTip && validNumberOfPeople) {
      const tip = calculateTip(calculator.bill, calculator.tipPercentage, calculator.numberOfPeople)
      setCalculator({...calculator, tipAmountPerPerson: tip[0], totalPerPerson: tip[1]})
    }
  }, [calculator.bill, calculator.tipPercentage, calculator.numberOfPeople])


  return (
    <>
      <Head>
        <title>Tip Calculator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.titlecontainer}>
        <h1 className={styles.title}>SPLI</h1>
        <h1 className={styles.secondtitle}>TTER</h1>
        </div>
        <div className={styles.tipcontainer}>
          <div className={styles.billcontainer}>
              <label className={styles.billlabel}>Bill</label>
              <input className={styles.billInput} placeholder="0" value={calculator.bill} onChange={setBill} pattern="[0-9]*"></input>
            <label className={styles.selectLabel}>Select Tip %</label>
            <div className={styles.tipgroup}>
              <button id="5" onClick={setTip} className={calculator.tipPercentage===5 ? styles.activebutton : ""}>5%</button>
              <button id="10" onClick={setTip} className={calculator.tipPercentage===10 ? styles.activebutton : ""}>10%</button>
              <button id="15" onClick={setTip} className={calculator.tipPercentage===15 ? styles.activebutton : ""}>15%</button>
              <button id="25" onClick={setTip} className={calculator.tipPercentage===25 ? styles.activebutton : ""}>25%</button>
              <button id="50" onClick={setTip} className={calculator.tipPercentage===50 ? styles.activebutton : ""}>50%</button>
              <input placeholder="Custom" onChange={setCustomTip} value={calculator.tipPercentage}></input>
            </div>
            <label className={styles.peoplelabel}>Number of People</label>
            <input className={styles.peopleInput} placeholder="0" value={calculator.numberOfPeople} onChange={setNumberOfPeople} pattern="[0-9]*"></input>
          </div>
          <div className={styles.totalcontainer}>
            <div className={styles.tiprow}>
              <div>
                <div className={styles.whitelabel}>Tip Amount</div>
                <div className={styles.graylabel}>/ person</div>
              </div>
              <label className={styles.rightlabel}>{calculator.tipAmountPerPerson ? calculator.tipAmountPerPerson : "0.00"}</label>
            </div>
            <label className={styles.tiprow}>
              <div>
                <div className={styles.whitelabel}>Total</div>
                <div className={styles.graylabel}>/ person</div>
              </div>
              <label className={styles.rightlabel}>{calculator.totalPerPerson ? calculator.totalPerPerson : "0.00"}</label>
            </label>
            <button className={styles.resetButton} onClick={resetCalculator}>RESET</button>
          </div>
      </div>






  <footer className="attribution">
    Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
    Coded by <a href="#">Salman Hossain</a>.
  </footer>
      </main>
    </>
  )
}
