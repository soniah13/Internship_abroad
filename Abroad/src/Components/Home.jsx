import React, { useEffect, useState } from 'react'

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
        return name.replace(/ _/g, ' ');
    };

    const flags = flagImages.map((src) => ({
        src, name:extractCountryName(src)
    }));
    //console.log(flags);

    useEffect(() => {
        setShuffledFlags(flags);
    },[]);
    // Function to shuffle the array
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const generateRandomColour = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

    // Set interval to shuffle the array every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setShuffledFlags((prevFlags) => shuffleArray(prevFlags));
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const handleScroll = () => {
        const newColorMap = {};
        shuffledFlags.forEach((flag, index) => {
            newColorMap[index] = generateRandomColour();
        });
        setColourMap(newColorMap);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[shuffledFlags])

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };


    const handleUser = (userType) => {
        setUserType(userType);
        localStorage.setItem('userType', userType);
    };


    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/src/assets/Images/Road.jpg)' }}>
            <div className="absolute inset-0 bg-black opacity-20"></div>

            <div className="flex flex-col md:flex-row justify-center items-center h-1/2 p-4 md:p-32 space-y-1 md:space-y-0 md:space-x-4">
                <div className="grid grid-cols-6 md:grid-cols-5 gap-x-0 gap-y-0 justify-center md:w-1/2">
                    {shuffledFlags.map((flag, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img src={flag.src} alt={`${flag.name} flag`} className="w-20 h-12 object-cover rounded-lg shadow-lg" />
                            <span className="text-sm font-semibold mt-1" style={{ color: colourMap[index] }}>{flag.name}</span>
                        </div>
                    ))}
                </div>
                
                <div className="flex flex-col items-center justify-center md:w-1/2 p-8 text-center">
                    <div className="z-10 text-white text-center mb-10">
                        <h1 className="text-4xl font-bold text-white mb-8">WELCOME TO INTERNSHIP ABROAD</h1>
                        <p className="text-lg mt-4">Please select your role to continue:</p>
                    </div>

                    <div className="relative w-3/4 mb-4">
                        <input
                            type="text"
                            placeholder="Search for internships..."
                            value={searchText}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 mb-4 bg-blue-100 rounded-l border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 pr-12"
                        />
                        <button
                            className="absolute inset-y-0 right-0 flex items-center px-4 rounded-r bg-blue-600 text-white h-3/4"
                            type="button"
                        >
                            Search
                        </button>
                    </div>

                    {/* Student and Employer Cards Section */}
                    <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg mt-4">
                        {/* Student Card */}
                        <div className="bg-white rounded-lg shadow-lg text-center p-4">
                            <img src="/src/assets/Images/student.png" alt="student" className="w-24 h-24 object-cover rounded-full mx-auto mb-2" />
                            <h2 className="text-md font-semibold text-gray-900 mb-1">Are you a Student?</h2>
                            <p className="text-sm text-sky-400 mb-2">Discover amazing internship!</p>
                            <button onClick={() => handleUser('student')} className="bg-blue-600 text-white py-1 px-2 rounded-md text-sm hover:bg-blue-300">
                                Proceed as Student
                            </button>
                        </div>

                        {/* Employer Card */}
                        <div className="bg-white rounded-lg shadow-lg text-center p-4">
                            <img src="/src/assets/Images/employer.jpg" alt="employer" className="w-24 h-24 object-cover rounded-full mx-auto mb-2" />
                            <h2 className="text-md font-semibold text-gray-900 mb-1">Are you an Employer?</h2>
                            <p className="text-sm text-sky-400 mb-2">Connect with talented students!</p>
                            <button onClick={() => handleUser('employer')} className="bg-blue-600 text-white py-1 px-2 rounded-md text-sm hover:bg-blue-300">
                                Proceed as Employer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
