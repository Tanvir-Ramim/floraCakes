"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface SlideImage {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface KitchenSliderProps {
  slides: SlideImage[];
  autoplaySpeed?: number;
}

const KitchenSlider = ({
  slides,
  autoplaySpeed = 5000,
}: KitchenSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [animationState, setAnimationState] = useState({
    title: false,
    subtitle: false,
    button: false,
  });
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Reset animations when slide changes
  useEffect(() => {
    // Reset animations
    setAnimationState({
      title: false,
      subtitle: false,
      button: false,
    });

    // Trigger animations sequentially
    const titleTimer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, title: true }));
    }, 300);

    const subtitleTimer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, subtitle: true }));
    }, 800);

    const buttonTimer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, button: true }));
    }, 1300);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(buttonTimer);
    };
  }, [currentSlide]);

  // Reset autoplay timer when slide changes
  useEffect(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }

    autoplayTimerRef.current = setTimeout(() => {
      nextSlide();
    }, autoplaySpeed);

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [currentSlide, autoplaySpeed, nextSlide]);

  // Pause autoplay on hover
  useEffect(() => {
    if (isHovering && autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    } else if (!isHovering) {
      autoplayTimerRef.current = setTimeout(() => {
        nextSlide();
      }, autoplaySpeed);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [isHovering, autoplaySpeed, nextSlide]);

  return (
    <section
      className="relative hidden w-full overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Slides */} hgg
      <div
        className="flex transition-transform duration-500 ease-in-out  md:h-[300px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full relative">
            <Image
              src={slide.src || "/placeholder.svg"}
              //   width={1200}
              //   height={800}
              //   alt={slide.alt}
              //   className="w-full h-full object-cover"
              //   sizes="100vw"
              width={1200}
              height={800}
              alt="Kitchen"
              className="w-full h-auto"
              sizes="100vw"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>

            {/* Text Overlay with Animations */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 md:px-12">
              <div className="max-w-3xl text-center space-y-6">
                <h2
                  className={`text-3xl md:text-5xl font-bold transform transition-all duration-700 ${
                    animationState.title
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  {slide.title}
                </h2>

                <p
                  className={`text-lg md:text-xl hidden md:block transform transition-all duration-700 delay-300 ${
                    animationState.subtitle
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  {slide.subtitle}
                </p>

                <div
                  className={`mt-4 transform transition-all hidden md:block duration-700 delay-600 ${
                    animationState.button
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <a
                    href={slide.buttonLink}
                    className="inline-block bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - only visible on hover */}
      <button
        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-opacity duration-300 ${
          isHovering ? "opacity-70" : "opacity-0"
        }`}
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-opacity duration-300 ${
          isHovering ? "opacity-70" : "opacity-0"
        }`}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Custom Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default KitchenSlider;
