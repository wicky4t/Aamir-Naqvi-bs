import React, { useEffect, useRef, useState } from 'react';
import VideoThumbnail from "./components/VideoThumbnail";
import { Mail, Instagram, Linkedin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LazyVideo } from './components/LazyVideo';
import { useThrottledMouseTracking } from './hooks/useThrottledMouseTracking';
import { MobileBadgeCarousel } from './components/MobileBadgeCarousel';

// Mobile viewport height handler
function setMobileVH() {
  if (window.innerWidth < 768) {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--mobile-vh', `${vh}px`);
  }
}

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Check if device is mobile
const isMobile = () => window.innerWidth < 768;

// Mobile viewport height helper
const getMobileVH = () => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return window.innerHeight;
  }
  return null;
};
const mobileImages = [
  { src: '/mobile/mbname.png', delay: 0.2, zIndex: 70 },
  { src: '/mobile/7.png', delay: 0.4, zIndex: 20 },
  { src: '/mobile/mb5-6.png', delay: 0.6, zIndex: 30 },
  { src: '/mobile/mb3-4.png', delay: 0.8, zIndex: 40 },
  { src: '/mobile/mb1-2.png', delay: 1.0, zIndex: 50 },
  { src: '/mobile/mbme.png', delay: 1.2, zIndex: 80 },
  { src: '/mobile/mobile bg.png', delay: 0, zIndex: 0 },
];

const desktopImages = [
  { src: '/pc/me.png', delay: 1.5, zIndex: 80, isStatic: false },
  { src: '/pc/me 2.png', delay: 1.4, zIndex: 80, isStatic: false },
  { src: '/pc/5-6.png', delay: 0.6, zIndex: 30, isStatic: false },
  { src: '/pc/3-4.png', delay: 0.8, zIndex: 40, isStatic: false },
  { src: '/pc/1-2.png', delay: 1.0, zIndex: 50, isStatic: false },
  { src: '/pc/7.png', delay: 1.2, zIndex: 60, isStatic: false },
  { src: '/pc/name.png', delay: 0, zIndex: 70, isStatic: false},
]; 

 {/* Desktop Images - Stacked full screen */}
<div className="hidden md:block">
  {desktopImages.map((img, index) => (
    <div
      key={index}
      className="desktop-image fixed inset-0 w-full h-full z-[${img.zIndex}] hero-image-layer"
      style={{
        animation: `slideUp 1s ease-out ${img.delay}s forwards`,
        transform: 'translateY(100vh)',
      }}
    >
      <img
         { src: '/pc/me.png', delay: 1.5, zIndex: 80, isStatic: false },
  { src: '/pc/me 2.png', delay: 1.4, zIndex: 80, isStatic: false },
  { src: '/pc/5-6.png', delay: 0.6, zIndex: 30, isStatic: false },
  { src: '/pc/3-4.png', delay: 0.8, zIndex: 40, isStatic: false },
  { src: '/pc/1-2.png', delay: 1.0, zIndex: 50, isStatic: false },
  { src: '/pc/7.png', delay: 1.2, zIndex: 60, isStatic: false },
  { src: '/pc/name.png', delay: 0, zIndex: 70, isStatic: false},
        alt={`Desktop layer ${index + 1}`}
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>


function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showContact, setShowContact] = React.useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const portfolioSectionRef = useRef<HTMLDivElement>(null);
  const fixedBackgroundRef = useRef<HTMLDivElement>(null);
  const mobileImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [mobileVH, setMobileVH] = useState<number | null>(null);


  
  // Handle mobile viewport height
  useEffect(() => {
    // Initialize mobile viewport height
    setMobileVH();
    
    const updateMobileVH = () => {
      if (window.innerWidth < 768) {
        setMobileVH(window.innerHeight);
        // Also update CSS custom property
        setMobileVH();
      } else {
        setMobileVH(null);
      }
    };

    window.addEventListener('resize', updateMobileVH);
    window.addEventListener('orientationchange', updateMobileVH);
    // Also listen for viewport changes (URL bar hide/show)
    window.addEventListener('scroll', setMobileVH);

    return () => {
      window.removeEventListener('resize', updateMobileVH);
      window.removeEventListener('orientationchange', updateMobileVH);
      window.removeEventListener('scroll', setMobileVH);
    };
  }, []);
  

// Desktop downward scroll animation
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Kill any existing triggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  if (portfolioSectionRef.current) {
    // Only desktop images, no exclusions
    const animatableDesktopElements = desktopImagesRef.current.filter(el => el);

    // Timeline for downward movement 
    const desktopTl = gsap.timeline({
      scrollTrigger: {
        trigger: portfolioSectionRef.current,
       start: "top bottom",
          end: "top 70%",
        scrub: true, // scroll-driven smooth animation
         markers: true,
      }
    });

    animatableDesktopElements.forEach(element => {
      desktopTl.to(element, { y: 50, ease: "power1.out" }, 0); // move down by 50px
    });

    // Section parallax
    gsap.to(portfolioSectionRef.current, {
      y: -900,
      scrollTrigger: {
        trigger: portfolioSectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Show/hide contact section
    ScrollTrigger.create({
      trigger: portfolioSectionRef.current,
      start: "center bottom",
      fastScrollEnd: true,
      onEnter: () => setShowContact(true),
      onLeaveBack: () => setShowContact(false),
    });
  }

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);

  return ( 
    <div className="relative">
   
  
<div
  ref={fixedBackgroundRef}
  className="fixed inset-0 bg-center bg-no-repeat z-[-1] 
             bg-cover 
             sm:bg-cover 
             max-sm:bg-cover max-sm:bg-center"
  style={{
    backgroundImage: `url('/pc/bg.png')`,
    backgroundAttachment: 'fixed',
    backgroundSize: window.innerWidth < 640 ? 'cover' : 'cover'
  }}
>

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/0" />
</div>
 
      {/* Main Hero Section */}
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden bg-transparent"
        style={{
          minHeight: window.innerWidth < 768 ? 'calc(var(--mobile-vh) * 100)' : '100vh',
          height: window.innerWidth < 768 ? 'calc(var(--mobile-vh) * 100)' : '100vh'
        }}
      >
        {/* Mobile Images - Stacked full screen */}
        <div className="md:hidden">
          {mobileImages.map((img, index) => (
            <div
              key={index}
              ref={(el) => (mobileImagesRef.current[index] = el)}
              className="hero-image-layer fixed inset-0 w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: img.zIndex,
                animation: `slideUp 1s ease-out ${img.delay}s forwards`,
                transform: 'translateY(100vh)',
              }}
            >
              <img
                src={img.src}
                alt={`Mobile layer ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Desktop Images - Stacked full screen */}
        <div className="hidden md:block">
          {desktopImages.map((img, index) => (
            <div
              key={index}
              ref={(el) => (desktopImagesRef.current[index] = el)}
              className="hero-image-layer fixed inset-0 w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: img.zIndex,
                animation: `slideUp 1s ease-out ${img.delay}s forwards`,
                transform: 'translateY(100vh)',
                      }}
            > 
              <img
                src={img.src}
                alt={`Desktop layer ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Section */}
      <div 
        ref={portfolioSectionRef} 
        className="relative w-full bg-[#f0f0f0] z-[100] rounded-t-[3rem] rounded-b-[3rem] opacity-100"
        style={{ 
          minHeight: window.innerWidth < 768 ? 'calc(var(--mobile-vh) * 100)' : '100vh',
          zIndex: 9999 
        }}
      >

        <div className="container mx-auto px-6 py-20">
          <div className="relative text-center mb-16 z-20">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bosenAlt text-black/90 mb-6 tracking-tight">
              PORTFOLIO
            </h2>
            <p className="text-xl md:text-2xl text-black/60 max-w-3xl mx-auto leading-relaxed">
              Visual stories that shape brands and captivate audiences worldwide
            </p>
          </div>
          
  {/* Show Reel Section */}
          <div className="relative mb-20 z-20">
            <h3 className="text-3xl md:text-4xl font-bosenAlt text-black/80 mb-8 text-center tracking-tight">
              SHOW REEL
            </h3>
            <div className="max-w-4xl mx-auto">
              <VideoThumbnail
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                title="SHOW REEL"
                isShowreel={true}
                thumbnailIndex={1}
              />
            </div>
          </div>

{/* 3x3 Grid of 16:9 Videos */}
<div className="relative mb-20 z-30">
  <h3 className="text-3xl md:text-4xl font-bosenAlt text-black/80 mb-8 text-center tracking-tight">
    FEATURED WORK
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
    {[
      "https://ia600904.us.archive.org/35/items/portfolio_202508/Outworking%20everyone%20isn%E2%80%99t%20that%20hard%20v1.mp4",
      "https://ia600904.us.archive.org/35/items/portfolio_202508/What%20is%20the%20most%20normal%20episode%20of%20Family%20Guy%20v3.mp4",
"https://ia600904.us.archive.org/35/items/portfolio_202508/Never%20running%20out%20of%20things%20to%20say%20is%20easy%2C%20actually%20isn%27t%C2%A0that%C2%A0hard%20v1.mp4",
      "https://ia600904.us.archive.org/35/items/portfolio_202508/sample1_V1.mp4",
      "https://ia600904.us.archive.org/35/items/portfolio_202508/The%20entire%20history%20of%20Thomas%20Shelby%20v2_1.mp4",
      "https://ia600904.us.archive.org/35/items/portfolio_202508/WOLF%27S%20LAIR%20WHAT%20AI%20FOUND%20IN%20THIS%20HIDDEN%20NAZI%20BUNKER%20FROM%20WORLD%20WAR%20II%20IS%20TERRIFYING.mp4",
      "https://ia800906.us.archive.org/16/items/flirting-with-women-isnt-that-hard-v-1/Flirting%20with%20women%20isn%27t%20that%20hard%20v1.mp4",
      "https://ia600904.us.archive.org/35/items/portfolio_202508/Young%20Actresses%20Who%20Tragically%20Passed%20Away.mp4",
      "https://ia601002.us.archive.org/33/items/sample-1-1/sample1%20%281%29.mp4",
    ].map((url, i) => (
      <VideoThumbnail
        key={i}
        src={url}
        title={`PROJECT ${String(i + 1).padStart(2, "0")}`}
        isShowreel={false}
        thumbnailIndex={i + 2} // Start from 2 since showreel uses 1
      />
    ))}
  </div>
</div>

{/* 6x4 Grid of 9:16 Videos */}
<div className="relative mb-20 z-30">
  <h3 className="text-3xl md:text-4xl font-bosenAlt text-black/80 mb-8 text-center tracking-tight">
    SOCIAL CONTENT
  </h3>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
    {[
      "https://ia801704.us.archive.org/11/items/inkuuuu/inkuuuu.mp4",
      "https://ia600902.us.archive.org/33/items/part-1-shorts/Inklwell%20media%20reel%201%20v3.mp4",
   "https://ia601005.us.archive.org/0/items/profolio-m-gaya-2/portfolio%20m%20gaya.mp4",
      "https://ia801002.us.archive.org/18/items/shorts-2-part/Mj%20real_2.mp4",
   "https://ia601005.us.archive.org/0/items/profolio-m-gaya-2/profolio%20m%20gaya2.mp4",
      "https://ia801007.us.archive.org/2/items/inkwell-media-video-1-v-2/inkwell%20media%20video%201%20v2.mp4",
       "https://ia601005.us.archive.org/0/items/profolio-m-gaya-2/sample.mp4",
      "https://ia800902.us.archive.org/33/items/part-1-shorts/Inkwell%20media%20v2%20FINAL.mp4",
      "https://ia600902.us.archive.org/33/items/part-1-shorts/Inkwell%20Media%20ki%20videooo.mp4",
      "https://ia801002.us.archive.org/18/items/shorts-2-part/mj%20realtyyyyy2.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
    ].map((url, i) => (
      <VideoThumbnail
        key={i}
        src={url}
        title={`SOCIAL ${String(i + 1).padStart(2, "0")}`}
        aspectRatio="vertical"
        thumbnailIndex={i + 11} // Start from 11 (after the 9 featured work videos + showreel)
      />
    ))}
  </div> 
</div>


        </div>
      </div>


     {/* Contact Section */}
      {showContact && (
        <div
          id="contact-section"
          className={`fixed bottom-0 left-0 right-0 w-full overflow-hidden flex flex-col items-center justify-center z-30 bg-transparent opacity-0 animate-fade-in-delayed`}
          style={{
            height: window.innerWidth < 768 ? 'calc(var(--mobile-vh) * 100)' : '100vh',
            animationDelay: '0.2s', 
            animationFillMode: 'forwards',
            pointerEvents: 'auto'
          }}
        > 
         {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl font-bosenAlt text-[#181f22] text-center mb-0 tracking-wide">
            LET'S START A CONVERSATION
          </h2>

         {/* Subheading */}
<p className="text-[#181f22] text-1xl md:text-4xl lg:text-4xl ibm-font mb-8 text-center">
  Drop me a message, let's make something users will love.
</p>

<div className="space-y-10 text-center">
            {/* Email */}
            <div className="flex flex-col items-center gap-2">
              <Mail className="text-[#181f22] w-8 h-8" />
              <a
                href="https://mail.google.com/mail/?view=cm&to=broskiagency@gmail.com" target="_blank"
                className="text-[#181f22] font-bosenAlt text-xl md:text-xl lg:text-2xl tracking-wide hover:text-blue-500 transition-colors duration-200"
              >
                BROSKIAGENCY@GMAIL.COM
              </a>
              <p className="text-[#181f22] text-xl md:text-1xl lg:text-2xl ibm-font mb-0 text-center">
  Let's create something that actually works.
</p>
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col items-center gap-0">
              <Linkedin className="text-[#181f22] w-8 h-8" />
              <a
                href="https://www.linkedin.com/in/aamir-naqvi/"
                target="_blank"
                rel="noopener noreferrer"
  className="text-[#181f22] font-bosenAlt text-xl md:text-xl lg:text-2xl tracking-wide hover:text-blue-500 transition-colors duration-200"
              >
                LINKEDIN
              </a>
              <p className="text-[#181f22] text-xl md:text-1xl lg:text-2xl ibm-font mb-0 text-center">
               Explore my work and journey
              </p>
            </div>

            {/* Instagram */}
            <div className="flex flex-col items-center gap-2">
              <Instagram className="text-[#181f22] w-8 h-8" />
              <a
                href="https://www.instagram.com/aamir.naqvii/"
                target="_blank"
                rel="noopener noreferrer"
                  className="text-[#181f22] font-bosenAlt text-xl md:text-xl lg:text-2xl tracking-wide hover:text-blue-500 transition-colors duration-200"
              >
                INSTAGRAM
              </a>
           <p className="text-[#181f22] text-xl md:text-1xl lg:text-2xl ibm-font mb-0 text-center">
                Tap in for visuals with purpose. - follow the flow.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
