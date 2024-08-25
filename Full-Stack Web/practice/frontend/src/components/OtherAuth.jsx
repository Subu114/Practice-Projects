import axios from 'axios'
import React, { useEffect } from 'react'

const OtherAuth = () => {
  useEffect(() => {
    (async() => {
      const response = await axios.get("http://localhost/api/v1/users/login/google")
    })()
  }, [])
  return (
    <div>OtherAuth</div>
  )
}

export default OtherAuth