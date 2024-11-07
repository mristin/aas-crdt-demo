import "./Counter.css"

type Props = {
  value: number
  onIncrement: () => void
  onDecrement: () => void
}

function Counter(
  props: Props
) {
  return (
    <div className="container">
      <input value={props.value} readOnly type="text"/>
      <button onClick={props.onIncrement}>+</button>
      <button onClick={props.onDecrement}>-</button>
    </div>
  )
}

export default Counter