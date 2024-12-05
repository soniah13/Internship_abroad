import React, { useEffect, useState } from 'react'


function Home({}) {
    const flagImages = [
        '/assets/Images/Flags/Algeria.png','/assets/Images/Flags/Argentina.png','/assets/Images/Flags/Australia.png',
        '/assets/Images/Flags/Austria.png','/assets/Images/Flags/Belgium.png', '/assets/Images/Flags/Botswana.png',
        '/assets/Images/Flags/Brazil.png','/assets/Images/Flags/Cameroon.png', '/assets/Images/Flags/Canada.png',
        '/assets/Images/Flags/China.png','/assets/Images/Flags/Costa Rica.png','/assets/Images/Flags/Denmark.png',
        '/assets/Images/Flags/Egypt.png','/assets/Images/Flags/Ethiopia.png', '/assets/Images/Flags/Finland.png',
        '/assets/Images/Flags/France.png','/assets/Images/Flags/Germany.png', '/assets/Images/Flags/Ghana.png',
        '/assets/Images/Flags/Honduras.png', '/assets/Images/Flags/Iceland.png', '/assets/Images/Flags/Indonesia.png',
        '/assets/Images/Flags/Ireland.png','/assets/Images/Flags/Israel.png','/assets/Images/Flags/Italy.png',
        '/assets/Images/Flags/Japan.png','/assets/Images/Flags/Kenya.png', '/assets/Images/Flags/Liberia.png',
        '/assets/Images/Flags/Libya.png','/assets/Images/Flags/Madagascar.png', '/assets/Images/Flags/Malaysia.png',
        '/assets/Images/Flags/Maldives.png','/assets/Images/Flags/Mexico.png','/assets/Images/Flags/Morocco.png',
        '/assets/Images/Flags/Namibia.png', '/assets/Images/Flags/Netherlands.png','/assets/Images/Flags/New Zealand.png',
        '/assets/Images/Flags/Norway.png', '/assets/Images/Flags/Pakistan.png','/assets/Images/Flags/Panama.png',
        '/assets/Images/Flags/Peru.png', '/assets/Images/Flags/Qatar.png', '/assets/Images/Flags/Rusia.png',
         '/assets/Images/Flags/Rwanda.png', '/assets/Images/Flags/Saudia Arabia.png', '/assets/Images/Flags/Senegal.png',
         '/assets/Images/Flags/Seychelles.png', '/assets/Images/Flags/Singapore.png','/assets/Images/Flags/South Africa.png',
         '/assets/Images/Flags/Spain.png','/assets/Images/Flags/Sweden.png','/assets/Images/Flags/Switzerland.png',
         '/assets/Images/Flags/Tanzania.png', '/assets/Images/Flags/Turkey.png','/assets/Images/Flags/UK.png',
         '/assets/Images/Flags/USA.png','/assets/Images/Flags/Uganda.png', '/assets/Images/Flags/Vietnam.png',
         '/assets/Images/Flags/Zambia.png','/assets/Images/Flags/Singapore.png','/assets/Images/Flags/Hong Kong.png'
      ];
      

      const [shuffledFlags, setShuffledFlags] = useState([]);
      const [colourMap, setColourMap] = useState({});


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
  
  
      return (
          <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/assets/Images/lost.png)' }}>
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
                    <div
                        className="z-10 rounded-lg p-8"
                        style={{
                        backgroundColor: "rgba(13, 42, 89, 0.4)", // Semi-transparent dark blue
                        backdropFilter: "blur(8px)", // Frosted glass effect
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for separation
                        }}
                    >
                        <p className="text-white text-lg leading-relaxed mb-4">
                        Are you a student hoping to graduate ready to broaden your horizons, see beyond your set environment, and explore the world?
                        </p>
                        <p className="text-white text-lg leading-relaxed">Here at Internship Abroad, you can: </p>
                        
                        <ul className="list-disc list-inside mt-2 text-xl text-white">
                            <li><strong>Identify Internship</strong></li>
                            <li><strong>Apply for Internship</strong></li>
                            <li><strong>Keep record of documents</strong></li>
                            <li><strong>Learn what you're missing</strong></li>
                        </ul>
                       
                    </div>
                    </div>
              </div>
          </div>
      );
  }
  
  export default Home;