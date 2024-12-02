import React, { useRef } from 'react';
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

function AboutUs() {

    const testimonials = [
        {id: 1, name: 'Alicia Johnson', text:'This website made finding an internship abroad easy and fun!', career:'Nurse', picture: '/assets/Images/nursing.png', location:'Australia' },
        {id: 2, name: 'Sarah Leona', text:'I felt supported and confident throughout the entire process.', career:'Engineer', picture: '/assets/Images/engineer.png', location:'Sweden' },
        {id: 3, name: 'Merciline Queen', text:'A one-stop solution for all internship needs. Highly recommended!', career:'Manager', picture: '/assets/Images/business.png', location:'South Africa' },
        {id: 4, name: 'Daniella Samindra', text:'The guidance provided here helped me land my dream internship.', career:'Chef', picture: '/assets/Images/chef.png', location: 'Paris' }
    ];

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const {current} = scrollRef;
        const scrollAmount = current.offsetWidth;
        if (direction === 'left') {
            current.scrollLeft -= scrollAmount;
        } else {
            current.scrollLeft += scrollAmount;
        }
    };

    return (
        <>
            {/* Header Section with Background */}
            <div className="relative bg-blue-600 h-64 lg:h-96 w-full flex items-center justify-center">
                {/* Background overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Title */}
                <div className="relative z-10 text-center p-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                        ALL YOU NEED TO KNOW ABOUT
                        <span className="text-blue-300"> INTERNSHIP ABROAD</span>
                    </h1>
                </div>
            </div>

            {/* Vision and Aim Section with Overlap Effect */}
            <div className="relative -mt-20 lg:-mt-28 mx-auto w-full md:w-4/5 lg:w-3/5 p-8 bg-blue-50 rounded-lg shadow-lg my-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4 text-center">OUR VISION</h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">
                    We want to build a website that has everything a student needs to start their journey toward an internship abroad. We believe this process shouldn’t be intimidating, so we’re here to make it easier and help students feel confident along the way.
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4 text-center">OUR AIM</h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                    Our goal is to take the stress out of finding an internship abroad. We provide clear guidance, helpful tools, and resources to support students every step of the way. We’re here to help students move forward with confidence and excitement.
                </p>
            </div>

            {/* Testimonials Section */}
            <div className="my-12 p-6 bg-gray-100 rounded-md shadow-lg mx-auto max-w-7xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-8 text-center">Testimonials</h2>

                <div className="relative flex items-center">
                    <button onClick={() => scroll('left')} aria-label="Scroll Left"
                        className="absolute left-0 z-10 p-4 bg-blue-600 rounded-full text-white hover:bg-blue-300 transition focus:outline-none">
                        <IoIosArrowDropleft size={32} />
                    </button>

                    <div ref={scrollRef} className="flex overflow-x-scroll no-scrollbar space-x-6 snap-mandatory scroll-smooth mx-4 md:mx-8">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="snap-center flex-shrink-0 w-80 sm:w-96 md:w-100 lg:w-120 p-6 bg-gray-100 rounded-md   ">
                                <div className="rounded-md  m-5 w-full h-auto flex flex-col ">
                                    <div className="rounded-full overflow-hidden mr-8">
                                        <img src={testimonial.picture} alt={testimonial.name} className="object-cover w-full h-96"></img>
                                    </div>
                                    <h3 className="mt-4 font-semibold text-blue-600 mx-2">Meet {testimonial.name}</h3>
                                    <p className="text-lg font-semibold text-black mx-2">Internship in {testimonial.location},</p>
                                    <p className="text-lg font-semibold text-black mx-2">Now working as {testimonial.career}</p>
                                    <p className="text-lg font-semibold text-black mx-2">{testimonial.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => scroll('right')} aria-label="Scroll Right"
                        className="absolute right-0 z-10 p-4 bg-blue-600 rounded-full text-white hover:bg-blue-300 transition focus:outline-none">
                       <IoIosArrowDropright size={32} />
                    </button>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
