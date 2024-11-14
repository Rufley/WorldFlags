


import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Details = () => {
  const [country, setCountry] = useState([]);
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for skeleton loader
  const { name } = useParams();

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  useEffect(() => {
    const getSingleCountry = async () => {
      setLoading(true); 

     
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 100));

      try {
        const fetchCountry = fetch(`https://restcountries.com/v3.1/alpha/${name}`).then(res => res.json());
        
       
        const [data] = await Promise.all([fetchCountry, minLoadingTime]);

        setCountry(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    };
    
    getSingleCountry();
  }, [name]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="shadow-md py-6 bg-white dark:bg-gray-700 dark:text-white">
        <div className="flex container mx-auto px-4">
          <h1 className="font-bold text-xl">Where in the World</h1>
          <div className="ml-auto font-medium">
            <button onClick={darkModeHandler}>
              {dark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto my-8 px-4">
        <Link to="/" className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-700 dark:text-gray-400 text-gray-700">
          <ArrowBackIcon /> Back
        </Link>
      </div>

      <section className="overflow-hidden container flex mx-auto pl-0 pr-0 pb-10 ">
        {loading ? (
          
          <div className="px-4 grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center">
            <div className="w-full animate-pulse">
              <div className="h-[20rem] w-[20rem] bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            </div>
            <div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-md mb-4 w-64"></div>
              <div className="space-y-2 ">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-20"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-60"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-20"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-60"></div>
              </div>
              <div className="mt-8">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-md w-1/4 mb-2"></div>
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="h-6 w-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          
          country.map((country, index) => (
            <div key={country.population} className="px-4 grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center">
              <article className="w-full">
                <img src={country.flags.svg} alt={country.name.common} />
              </article>
              <article>
                <h1 className="mb-8 font-bold text-gray-900 text-4xl xl:text-6xl dark:text-white text-center md:text-left">
                  {country.name.official}
                </h1>
                <ul className="my-4 flex flex-col items-center md:items-start justify-start gap-2 text-slate-700 dark:text-gray-400">
                  <li>Capital: {country.capital}</li>
                  <li>Population: {country.population.toLocaleString()}</li>
                  <li>Region: {country.region}</li>
                  <li>Subregion: {country.subregion}</li>
                </ul>
                {country.borders && (
                  <>
                    <h3 className="text-gray-900 font-bold text-lg mb-2 dark:text-white text-center md:text-left">Borders:</h3>
                    <ul className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                      {country.borders.map((border, index) => (
                        <li
                          key={index}
                          className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-700 dark:text-gray-400 text-gray-700 flex items-center justify-center"
                        >
                          <Link to={`/${border}`} key={index}>
                            {border}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Details;

