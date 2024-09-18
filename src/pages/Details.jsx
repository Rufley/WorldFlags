
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Details = () => {
  const [country, setCountry] = useState([]);
  const [dark, setDark] = useState(false);
  const { name } = useParams();

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  useEffect(() => {
    const getSingleCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${name}`);
        const data = await res.json();
        setCountry(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleCountry();
  }, [name]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="shadow-md py-6 px-3 bg-white dark:bg-gray-700 dark:text-white mb-16">
        <div className="flex container mx-auto">
          <h1 className="font-bold text-xl">Where in the World</h1>
          <div className="ml-auto font-medium">
            <button onClick={darkModeHandler}>
              {dark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </button>
          </div>
        </div>
      </div>
      <section className="container flex mx-auto p-8 pl-0 pr-0"> 
       
        {country.map((country, index) => (
          <div key={country.population} className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen">
            <article>
            
              <img src={country.flags.svg} alt={country.name.common} />
            </article>
            <article>
              <h1 className="mb-8 font-bold text-gray-900 text-4xl lg:text-6xl dark:text-white">{country.name.official}</h1>
              <ul className="my-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-400">
                <li>Capital: {country.capital[0]}</li>
                <li>Population: {country.population.toLocaleString()}</li>
                <li>Region: {country.region}</li>
                <li>Subregion: {country.subregion}</li>
              </ul>
              {country.borders && (
                <>
                  <h3 className="text-gray-900 font-bold text-lg mb-2 dark:text-white">Borders:</h3>
                  <ul className="flex flex-wrap items-start justify-start gap-2">
                    {country.borders.map((border, index) => (
                      <li  key={index} className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-700 dark:text-gray-400 text-gray-700">
                        <Link to={`/${border}`} key={index}>
                          {border}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <div className="mt-10 ">
                <Link to="/" className='bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-700 dark:text-gray-400 text-gray-700'> <ArrowBackIcon/> Back </Link>
              </div>
            </article>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Details;
