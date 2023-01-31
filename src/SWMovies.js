import React, { useState } from 'react'
import MoviesList from './components/MoviesList'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchMoviesHandler() {
    setIsLoading(true)
    setError(null)
    // Note: when using async/await you must use Try/Catch to find errors.
    // If you are not using asynce/await, then .then.catch promise should be used.
    // If using Axios,it would throw an error status, so you wouldn't have to use try/catch
    try {
      const response = await fetch(`https://swapi.dev/api/film/`)
      const data = await response.json()

      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies) // If not restructuring use: data.results
      setIsLoading(false)
    } catch (error) {}
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && <MoviesList movies={movies} />} */}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found No Movies.</p>}
        {isLoading && <p>Loading...</p>}
        {/* {!isLoading ? <MoviesList movies={movies} /> : 'Loading...'} */}
      </section>
    </React.Fragment>
  )
}

export default App
