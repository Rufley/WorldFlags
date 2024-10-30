import React, { useEffect, useState } from 'react'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from 'react-router-dom';
import ThumDetails from '../components/ThumDetails';





const Home = () => {
    const [dark, setDark] = useState(false);
    const [countries, setCountries] = useState([])
    const [searchText, setSearchText] = useState("")
    const [filteredCountries, setFilteredCountries ] = useState(countries)
    const region= [
        {name: "All",},
        {name:"Africa",},
        {name:"America",},
        {name:"Asia",},
        {name:"Europe",},
        {name:"Oceania",},
    ]

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }
    useEffect(() =>{
            getCountris()
        
        },[])
        
        const getCountris = async () => {
            const res = await fetch("https://restcountries.com/v3.1/all")
            const data = await res.json()
            setCountries(sortCountries(data))
            setFilteredCountries(sortCountries(data))
            
        }


            async function filterByRegion(region){
                if( region === "All"){
                    getCountris()
                }else{


                try{
                    const res= await fetch(`https://restcountries.com/v3.1/region/${region}`)
                    const data = await res.json() 
                    setCountries(sortCountries(data))
                    setFilteredCountries(sortCountries(data))
                }catch(error){
                    console.log(error)
                }
                }
            }
            const sortCountries =(data) =>{
                return data.sort((a,b) => a.name.common.localeCompare(b.name.common));
            }



        function handleSearchCountry(e) {
            const text = e.target.value
            setSearchText(text)
            const filtered = countries.filter(country =>country.name.common.toLowerCase().includes(text.toLowerCase()));
            setFilteredCountries(filtered)

        }

        function handleFilterByRegion(e){
            e.preventDefault()
            filterByRegion()
        }


return (
    

    <div className="  bg-gray-100 dark:bg-gray-800 dark:text-white">
    <div className=" shadow-md py-6 px-10 bg-white dark:bg-gray-700 dark:text-white mb-16">
            <div className="flex container mx-auto">
                <h1 className="font-bold text-xl">Where in the World</h1>
                <div className="ml-auto font-medium">
                <button onClick={()=> darkModeHandler()} >
    {
        
        dark && <LightModeOutlinedIcon /> // render sunny when dark is true
    }
    {
        !dark && <DarkModeOutlinedIcon /> // render moon when dark is false
    }
</button>
                
                </div>
            </div>
        </div>
        <div className=" container px-10 mx-auto mb-16 gap-4 sm:grid sm:grid-cols-1 md:flex md:justify-between md:items-center lg:flex lg:justify-between lg:items-center">
        
            <div
                className='max-w-4xl md:flex-1'>
                 <input
                    type="text"
                    placeholder="Serch for a country..."
                    required
                    value={searchText}
                    onInput={handleSearchCountry}
                    className="outline-none pl-10 p-2 shadow-md rounded-md dark:bg-gray-700 "
                />
                </div>
            
            <form onSubmit={handleFilterByRegion}> 
                
                <select  value={region.name} onChange={e => filterByRegion(e.target.value)} className="outline-none ml-auto my-2 p-2 shadow-md rounded-md font-medium dark:bg-gray-700" >
                    {region.map((region, index) => (
                        <option name="hello" value={region.name} key={index}>
                            {region.name }
                        </option>
                    ))}
                </select>
            </form>
        </div>
        <div className=" container px-10 mx-auto grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
            {filteredCountries.map( (country,index) =>   <Link to={`${country.cca3}`}  key={index}>
            <ThumDetails
                {...country}
            />
            </Link>)}
        </div> 
    </div>
)
}

export default Home
