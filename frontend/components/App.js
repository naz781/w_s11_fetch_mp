import React,{useEffect,useState} from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'


export default function App() {
  const [dogs, setDogs] = useState([])
  const [curentDogId, setCurrentDog] = useState(null)

  useEffect(() => {getDogs()},[])

const getDogs =  () => {
    fetch('/api/dogs')
    .then(res => {
      if(!res.ok)throw new Error("Problem GETing dogs")
        return res.json()})
    .then(dogs => setDogs(dogs))
    .catch(err => console.error(err))
  }
  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList 
          dogs={dogs} getDogs={getDogs} setCurrentDog={setCurrentDog}/>} />
        <Route path="/form" element={<DogForm 
          dog={curentDogId && dogs.find(dog => dog.id === curentDogId)}
          getDogs={getDogs} reset = {() => setCurrentDog(null)}
        />} />
      </Routes>
    </div>
  )
}
