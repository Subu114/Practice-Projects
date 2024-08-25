// import './App.css';

// function navigate(url) {
//   window.location.href = url;
// }

// async function oauth() {
//   try {
//     const response = await fetch("http://localhost:8000/request");
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     console.log(data)
//     console.log("NAIVGATING TO data . url : ", data.url)
//     setTimeout(() => {
//       navigate(data.url);
      
//     }, 0);
//   } catch (error) {
//     console.error("ERROR:", error.message);
//   }
// }

// function App() {
//   return (
//     <>
//       <h1>GOOGLE AUTH TRY</h1>
//       <button onClick={oauth}>
//         <img width={50} height={50} src='https://cdn.freebiesupply.com/logos/large/2x/google-icon-logo-png-transparent.png' alt='Google Icon' />
//       </button>
//     </>
//   );
// }

// export default App;


import React, { useEffect } from 'react';
import './App.css';

function navigate(url) {
  window.location.href = url;
}

async function oauth() {
  try {
    const response = await fetch("http://localhost:8000/request");
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    console.log("NAIVGATING TO data.url:", data.url);
    setTimeout(() => {
      navigate(data.url);
    }, 0);
  } catch (error) {
    console.error("ERROR:", error.message);
  }
}

function handleRedirect() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    fetch(`http://localhost:8000/oauth?code=${code}`)
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('session_token', data.access_token);
          console.log("Session token set in local storage.");
          console.log("User data:", data.user);
        } else {
          console.error("Failed to obtain access token.");
        }
      })
      .catch(error => console.error("Error:", error));
  }
}

function App() {
  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <>
      <h1>GOOGLE AUTH TRY</h1>
      <button onClick={oauth}>
        <img width={50} height={50} src='https://cdn.freebiesupply.com/logos/large/2x/google-icon-logo-png-transparent.png' alt='Google Icon' />
      </button>
    </>
  );
}

export default App;
