
import { Link } from '@mui/material'
import React from 'react'

const ThumbDetails= ({name, flags, population, region, capital }) => {
  return (
    <>
    
      <article className="container rounded-lg shadow-lg bg-white dark:bg-gray-700 dark:text-white pb-4 hover:bg-gray-200 dark:hover:bg-gray-600 ">
    <img src={flags.svg} alt={name.common} className='md:h-64 w-full object-cover rounded-tl-lg rounded-tr-lg' />
      <div className="p-4 gap-5  " >
      <h2 className="font-bold mb-4">
              {name.common}
            </h2>
                <ul className="flex flex-col items-start justify-start gap-2 dark:text-gray-400">
              <li>Population: {population.toLocaleString()}</li>
              <li>Region: {region}</li>
              <li>Capital: {capital}</li>
            </ul>
      </div>
  </article>    
  
  </>
  )
}

export default ThumbDetails



// <h3 className="font-bold mb-4">{title}</h3>
// <p className="text-xs pb-2">Population: <span className="text-grey-700 dark:text-gray-300">{population.toLocaleString()}</span></p>
// <p className="text-xs pb-2">Region: <span className="text-grey-700 dark:text-gray-300">{region}</span></p>
// <p className="text-xs ">Capital: <span className="text-grey-700 dark:text-gray-300">{capital}</span></p>