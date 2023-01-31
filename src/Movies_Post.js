import React, { useState, useEffect, useCallback } from 'react'
import MoviesList from './components/MoviesList'
import AddMovie from './components/AddMovie'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    // Note: when using async/await you must use Try/Catch to find errors.
    // If you are not using asynce/await, then .then.catch promise should be used.
    // If using Axios,it would throw an error status, so you wouldn't have to use try/catch
    try {
      const response = await fetch(`https://swapi.dev/api/films/`)
      // Catch error and error message condition
      if (!response.ok) {
        throw new Error('Something went wrong :(') // the string is the 'message'
      }

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
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  // useEffect must be placed after the callback (useCallback)
  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  // Add Movie
  function addMovieHandler(movie) {
    console.log(movie)
  }

  // Clean up inline content
  let content = <p>Found No Movies.</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
