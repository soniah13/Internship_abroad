import React, { useEffect, useState } from 'react'

function Home() {
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
         '/src/assets/Images/Flags/Tanzania.png', '/src/assets/Images/Flags/Turkey.png','/src/assets/Images/Flags/U.K.png',
         '/src/assets/Images/Flags/USA.png','/src/assets/Images/Flags/Uganda.png', '/src/assets/Images/Flags/Vietnam.png',
         '/src/assets/Images/Flags/Zambia.png','/src/assets/Images/Flags/flag.png','/src/assets/Images/Flags/Hong Kong.png'
      ];

      const [shuffledFlags, setShuffledFlags] = useState(flagImages);

    // Function to shuffle the array
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Set interval to shuffle the array every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setShuffledFlags((prevFlags) => shuffleArray(prevFlags));
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center items-center h-screen p-4 md:p-8">
            <div className="relative w-full max-w-7xl grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-4 place-items-center">
                
                {/* Render Shuffled Flag Cards */}
                {shuffledFlags.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt="flag"
                        className="w-36 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32 lg:w-56 lg:h-36 object-cover rounded-lg shadow-lg"
                    />
                ))}

                {/* Central Welcome Message */}
                <div className="absolute inset-0 flex justify-center items-center z-10">
                    <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-white flex justify-center items-center shadow-lg border border-gray-200">
                        <div className="text-center text-sm sm:text-lg md:text-xl lg:text-4xl font-bold">
                            Welcome to<br />
                            <span className="text-5xl text-blue-600">INTERNSHIP ABROAD</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
