import React, { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {

  if (props.text === "positive") {
    return (
      <tr><td>{props.text}</td><td>{props.value}%</td></tr>
    )
  }
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.total} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive} />
        </tbody>
      </table>

    </div>
  )
}

const App = () => {
  //save clicks on each button to its own state

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let total = good + bad + neutral;
  let average = ((good - bad) / (total));
  let positive = (good / total) * 100;

  const handleGood = () => {
    setGood(good => good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral => neutral + 1)
  }

  const handleBad = () => {
    setBad(bad => bad + 1)
  }

  return (

    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />

    </div >
  )
}

export default App;
