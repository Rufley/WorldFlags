import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Details from './pages/Details'
import Home from './pages/Home'
import Error from './pages/Error'

function App() {

  return (
    <div className="header" class="w-100%">
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes> 
        <Routes>
            <Route path='/:name' element={<Details/>}></Route>
        </Routes>   
        {/* <Routes>
            <Route path='/*' element={<Error/>}></Route>    ///// try to fix so you can find the right path\\\\\\\
        </Routes>  */}
     </BrowserRouter>
    </div>
  )
}

export default App
