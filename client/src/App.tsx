import { useState } from 'react'
import ProductCard from "./components/ProductCard";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <ProductCard name="Potato" category="Food" quantity={5} price={2.50}/>
        <ProductCard name="Potato" category="Food" quantity={5} price={2.50}/>
    </div>
  )
}

export default App
