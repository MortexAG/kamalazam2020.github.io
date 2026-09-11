import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { HERO_DATA } from '../data/rockMediaData';
import { Play, Volume2, VolumeX, Pause, Sparkles, Film, ArrowDown } from 'lucide-react';

interface HeroProps {
  onWatchShowreel: () => void;
  onExploreWork: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWatchShowreel, onExploreWork, onOpenBooking }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Video Stream from Kamal Azam Media Production */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={HERO_DATA.posterUrl}
          className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
        >
          <source src={HERO_DATA.videoMp4} type="video/mp4" />
          <source src={HERO_DATA.videoWebm} type="video/webm" />
          Your browser does not support HTML5 video.
        </video>

        {/* Cinematic Vignette & Deep Gradient Overlay ("grezer down") */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/50 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-[#121212]/90 pointer-events-none" />

        {/* Film grain layer */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Floating Video Media Controls (bottom-left / bottom-right) */}
      <div className="absolute bottom-8 right-6 sm:right-10 z-20 flex items-center space-x-2.5">
        <button
          id="hero-play-pause-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className="p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <button
          id="hero-sound-toggle-btn"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute background video sound" : "Mute background video sound"}
          className="p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#a855f7]" />}
        </button>
      </div>

      {/* Main Hero Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 pb-16">
        {/* Top Signature & Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-col items-center justify-center mb-6"
        >
          <img
            src="/kamal-azam-logo.png"
            alt="Kamal Azam"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain mb-3 drop-shadow-[0_0_30px_rgba(192,132,252,0.45)]"
          />
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium tracking-widest text-[#c084fc] uppercase shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-[#a855f7]" />
            <span>Content Creator & Director</span>
          </div>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.08] drop-shadow-2xl"
        >
          We Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#e879f9]">With Art.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-neutral-300 leading-relaxed font-light"
        >
          Synthesizing cinematic craft with measurable commercial performance. Precision frame craft from principal cinematography to omnichannel social distribution and broadcast campaigns.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            id="hero-watch-showreel-btn"
            onClick={onWatchShowreel}
            className="flex items-center space-x-3 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-[#9333ea] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span>Watch Showreel 2026</span>
          </button>

          <button
            id="hero-explore-work-btn"
            onClick={onExploreWork}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            <Film className="w-4 h-4 text-[#c084fc]" />
            <span>Our Works</span>
          </button>

          <button
            id="hero-book-btn"
            onClick={onOpenBooking}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all duration-200 shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:scale-105 cursor-pointer"
          >
            <span>Book Production</span>
          </button>
        </motion.div>

        {/* Capability Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 font-mono"
        >
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for New Projects</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div>Commercial Campaigns & Films</div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div>Cinema 4K & Social Sprints</div>
        </motion.div>
      </div>

      {/* Down indicator */}
      <button
        onClick={onExploreWork}
        aria-label="Scroll down to services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/50 hover:text-white transition-colors duration-200 animate-bounce cursor-pointer p-2"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
};
