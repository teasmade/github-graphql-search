// import { useState } from 'react'
import './App.css'
import { RepoProvider } from "./contexts/RepoProvider"
import ReposList from "./components/ReposList"
import FavoritesList from "./components/FavoritesList"


function App() {

  return (
    <>
      <RepoProvider>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <ReposList />
          </div>
        <div>
          <FavoritesList />
          </div>
        </div>        
      </RepoProvider>
    </>
  )
}

export default App
