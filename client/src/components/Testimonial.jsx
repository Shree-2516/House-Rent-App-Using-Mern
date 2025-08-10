import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"; // Corrected import to framer-motion

const Testimonial = () => {
    const testimonials = [
        {
            name: "Emma Rodriguez",
            location: "Barcelona, Spain",
            image: assets.testimonial_image_1,
            testimonial:
                "I've booked beautiful properties from various platforms, but the experience with StayVenture was truly exceptional. The booking process was seamless, and the home was even better than the photos!",
        },
        {
            name: "John Smith",
            location: "New York, USA",
            image: assets.testimonial_image_2,
            testimonial:
                "StayVenture made finding my perfect holiday home so much easier. The property was exactly as described and the customer service was fantastic!",
        },
        {
            name: "Ava Johnson",
            location: "Sydney, Australia",
            image: assets.testimonial_image_1,
            testimonial:
                "I highly recommend StayVenture! Their selection of luxury homes is amazing, and I always feel like I'm getting the best deal on my accommodations with excellent service.",
        },
    ];

    return (
        <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44 bg-gray-50">
            {/* Title Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <Title
                    title="What Our Customers Say"
                    subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."
                />
            </motion.div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.2,
                            ease: "easeOut",
                        }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                    >
                        {/* User Info */}
                        <div className="flex items-center gap-3">
                            <img
                                className="w-12 h-12 rounded-full object-cover"
                                src={testimonial.image}
                                alt={testimonial.name}
                            />
                            <div>
                                <p className="text-xl font-semibold">{testimonial.name}</p>
                                <p className="text-gray-500 text-sm">{testimonial.location}</p>
                            </div>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <img
                                        key={i}
                                        src={assets.star_icon}
                                        alt="star-icon"
                                        className="w-5 h-5"
                                    />
                                ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-600 mt-4 text-sm italic leading-relaxed">
                            "{testimonial.testimonial}"
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;