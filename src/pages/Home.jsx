    import React, { useEffect, useState } from 'react'
    import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
    import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
    import { Link } from 'react-router-dom';
    import ThumDetails from '../components/ThumDetails';





    const Home = () => {
        const [dark, setDark] = useState(false);
        const [countris, setCountries] = useState([])
        const [searchText, setSearchText] = useState("")
        const region= [
            
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
                setCountries(data)
                console.log(data)
            }


                async function searchCountry(){
                    try{
                        const res= await fetch(`https://restcountries.com/v3.1/name/${searchText}`)
                        const data = await res.json() 
                        setCountries(data)
                    }catch(error){
                        console.log(error)
                    }
                }

                async function filterByRegion(region){
                    try{
                        const res= await fetch(`https://restcountries.com/v3.1/region/${region}`)
                        const data = await res.json() 
                        setCountries(data)
                    }catch(error){
                        console.log(error)
                    }
                }



            function handleSearchCountry(e) {
                e.preventDefault()
                searchCountry()

            }

            function handleFilterByRegion(e){
                e.preventDefault()
                filterByRegion()
            }


    return (
        

        <div className="  bg-gray-100 dark:bg-gray-800 dark:text-white">
        <div className=" shadow-md py-6 px-3 bg-white dark:bg-gray-700 dark:text-white mb-16">
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
            <div className=" container flex justify-between  mx-auto mb-16 items-center  ">
            
                <form onSubmit={handleSearchCountry}
                    autoComplete="off"
                    className='max-w-4xl md:flex-1'>
                     <input
                        type="text"
                        placeholder="Serch for a country..."
                        required
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="outline-none pl-10 p-2 shadow-md rounded-md w-1/3 dark:bg-gray-700 "
                    />
                </form>
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
            <div className=" container mx-auto grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
                {countris.map( (country,index) =>   <Link to={`${country.cca3}`}  key={index}>
                <ThumDetails
                    {...country}
                    // title={country.name.common }
                    // img_url={country.flags.svg}
                    // population={country.population}  
                    // region={country.region}
                    // capital={country.capital}
                    

                />
                </Link>)}
            </div> 
        </div>
    )
    }

    export default Home

    // .name.common.replace(/\s+/g, ' ')



    // {countris.map( (country, index) => <Link to={{pathname: 'Hello', state: country }} key={index}  >
    // <ThumDetails
    //     title={country.name.common }
    //     img_url={country.flags.svg}
    //     population={country.population}
    //     region={country.region}
    //     capital={country.capital}
        

    // />
    // </Link> )}



// dont tuch 

// import React from 'react'

// const ThumbDetail= ({name, flags, population, region, capital }) => {
//   return (
//     <div className="container rounded-lg shadowllg bg-white dark:bg-gray-700 dark:text-white pb-4">
//       <img src={flags} alt={name} className='h-1/2 2-full rounded-tl-lg rounded-tr-lg ' />
//         <div className="p-4">
//             <h3 className="font-bold mb-4">{name}</h3>
//             <p className="text-xs">population:<span className="text-grey-700 dark:text-gray-300">{population}</span></p>
//             <p className="text-xs">region:<span className="text-grey-700 dark:text-gray-300">{region}</span></p>
//             <p className="text-xs">capital:<span className="text-grey-700 dark:text-gray-300">{capital}</span></p>
//         </div>
//     </div>
//   )
// }

// export default ThumbDetail
// --------------------------------------------------------------



















// const [countris, setCountries] = useState([])
// const [mode, setMode] = useState(true)
// const [toggleBtn, setToggelBtn] = useState('Light Mode')

// useEffect(() =>{
//     getCountris()

// },[])

// const getCountris = async () => {
//     const res = await fetch("https://restcountries.com/v3.1/all")
//     const data = await res.json()
//     setCountries(data)
// }

// const toggleDarkmode = () =>{
//     if(!mode){
//         document.documentElement.classList.add('dark')
//         setToggelBtn
//         setMode(current => current = !current)
//     }
//     if(!mode){
//         document.documentElement.classList.remove('dark')
//         setMode(current => current = !current)
//     }
// }
{/* <button onClick={()=> toggleDarkmode()} dangerouslySetInnerHTML={{__html:toggleBtn}}></button> */}
