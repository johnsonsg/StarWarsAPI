import { useState } from 'react'

export default initialVal => {
  const [value, setValue] = useState(initialVal)
  const increment = () => {
    setValue(value + 1)
  }
  return [value, increment]
}
