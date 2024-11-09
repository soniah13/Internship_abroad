import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Home({setUserType}) {
    const flagImages = [
        '/src/assets/Images/Flags/Algeria.png','/src/assets/Images/Flags/Argentina.png','/src/assets/Images/Flags/Australia.png',
        '/src/assets/Images/Flags/Austria.png','/src/assets/Images/Flags/Belgium.png', '/src/assets/Images/Flags/Botswana.png',
        '/src/assets/Images/Flags/Brazil.png','/src/assets/Images/Flags/Cameroon.png', '/src/assets/Images/Flags/Canada.png',
        '/src/assets/Images/Flags/China.png','/src/assets/Images/Flags/Costa Rica.png','/src/assets/Images/Flags/Denmark.png',
        '/src/assets/Images/Flags/Egypt.png','/src/assets/Images/Flags/Ethopia.png', '/src/assets/Images/Flags/Finland.png',
        '/src/assets/Images/Flags/France.png','/src/assets/Images/Flags/Germany.png', '/src/assets/Images/Flags/Ghana.png',
        '/src/assets/Images/Flags/Honduras.png', '/src/assets/Images/Flags/Iceland.png', '/src/assets/Images/Flags/Indonesia.png',
        '/src/assets/Images/Flags/Ireland.png','/src/assets/Images/Flags/Israel.png','/src/assets/Images/Flags/Italy.png',
        '/src/assets/Images/Flags/Japan.png','/src/assets/Images/Flags/Kenya.png', '/src/assets/Images/Flags/Liberia.png',
        '/src/assets/Images/Flags/Libya.png','/src/assets/Images/Flags/Madagascar.png', '/src/assets/Images/Flags/Malaysia.png',
        '/src/assets/Images/Flags/Maldives.png','/src/assets/Images/Flags/Mexico.png','/src/assets/Images/Flags/Morocco.png',
        '/src/assets/Images/Flags/Namibia.png', '/src/assets/Images/Flags/Netherlands.png','/src/assets/Images/Flags/New Zealand.png',
        '/src/assets/Images/Flags/Norway.png', '/src/assets/Images/Flags/Pakistan.png','/src/assets/Images/Flags/Panama.png',
        '/src/assets/Images/Flags/Peru.png', '/src/assets/Images/Flags/Qatar.png', '/src/assets/Images/Flags/Rusia.png',
         '/src/assets/Images/Flags/Rwanda.png', '/src/assets/Images/Flags/Saudia Arabia.png', '/src/assets/Images/Flags/Senegal.png',
         '/src/assets/Images/Flags/Seychelles.png', '/src/assets/Images/Flags/Singapore.png','/src/assets/Images/Flags/South Africa.png',
         '/src/assets/Images/Flags/Spain.png','/src/assets/Images/Flags/Sweden.png','/src/assets/Images/Flags/Switzerland.png',
         '/src/assets/Images/Flags/Tanzania.png', '/src/assets/Images/Flags/Turkey.png','/src/assets/Images/Flags/UK.png',
         '/src/assets/Images/Flags/USA.png','/src/assets/Images/Flags/Uganda.png', '/src/assets/Images/Flags/Vietnam.png',
         '/src/assets/Images/Flags/Zambia.png','/src/assets/Images/Flags/Singapore.png','/src/assets/Images/Flags/Hong Kong.png'
      ];

      const [shuffledFlags, setShuffledFlags] = useState([]);
      const [colourMap, setColourMap] = useState({});
      const [searchText, setSearchText] = useState('');
  
      const extractCountryName = (filePath) => {
          const nameWithExtension = filePath.split('/').pop();
          const name = nameWithExtension.split('.')[0];
          return name.replace(/_/g, ' '); // Fixed the regex to replace underscores
      };
  
      const flags = flagImages.map((src) => ({
          src, name: extractCountryName(src)
      }));
  
      useEffect(() => {
          setShuffledFlags(flags);
      }, []);
  
      const shuffleArray = (array) => {
          const newArray = [...array];
          for (let i = newArray.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          }
          return newArray;
      };
  
      const generateRandomColour = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  
      useEffect(() => {
          const interval = setInterval(() => {
              setShuffledFlags((prevFlags) => shuffleArray(prevFlags));
          }, 30000);
  
          return () => clearInterval(interval);
      }, []);
  
      const handleScroll = () => {
          const newColorMap = {};
          shuffledFlags.forEach((_, index) => {
              newColorMap[index] = generateRandomColour();
          });
          setColourMap(newColorMap);
      };
  
      useEffect(() => {
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
      }, [shuffledFlags]);
  
      const handleInputChange = (e) => {
          setSearchText(e.target.value);
      };
  
      const handleUser = (userType) => {
          setUserType(userType);
          localStorage.setItem('userType', userType);
      };
  
      return (
          <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/src/assets/Images/lost.png)' }}>
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="flex flex-col md:flex-row justify-center items-center h-1/2 p-4 md:p-48 space-y-1 md:space-y-0 md:space-x-4">
                  <div className="grid grid-cols-6 md:grid-cols-6 gap-x-0 gap-y-0 justify-center md:w-1/2">
                      {shuffledFlags.map((flag, index) => (
                          <div key={index} className="z-10 flex flex-col items-center">
                              <img src={flag.src} alt={`${flag.name} flag`} className="w-20 h-12 object-cover rounded-lg shadow-lg" />
                              <span className="text-sm font-semibold mt-1" style={{ color: colourMap[index] }}>{flag.name}</span>
                          </div>
                      ))}
                  </div>
  
                  <div className="flex flex-col items-center justify-center md:w-1/2 p-8 text-center">
                      <h1 className="z-10 text-4xl font-bold text-white mb-8">WELCOME TO INTERNSHIP ABROAD</h1>
                      
                  </div>
              </div>
          </div>
      );
  }
  
  export default Home;