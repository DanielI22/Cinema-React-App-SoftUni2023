import './styles/global.css'
import MovieCard from './components/MovieCard';
import { useState } from 'react';

function App() {

  const [name, setName] = useState("Test");
  function onClick() {
    if(name==="Test") {
      setName("NewName");
    }
    else {
      setName("Test");
    }
  }
  return (
    <div>
      <MovieCard 
        title = {name}
        genre="Comedy" 
        posterURL="https://media.istockphoto.com/id/911590226/vector/movie-time-vector-illustration-cinema-poster-concept-on-red-round-background-composition-with.jpg?s=2048x2048&w=is&k=20&c=F9qz8jEdNbZJ27nesDGqihT8MysRhZZjzv7IEPWJ0GY="
        onClick={onClick}
      />
    </div>
  )
}

export default App
