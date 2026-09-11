import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_PROJECTS } from '../data/rockMediaData';
import { PortfolioProject } from '../types';
import { Play, Clock, ArrowUpRight } from 'lucide-react';

interface WorkPortfolioProps {
  onPlayVideo: (project: PortfolioProject) => void;
  onOpenBooking: () => void;
}

export const WorkPortfolio: React.FC<WorkPortfolioProps> = ({ onPlayVideo, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Commercial Ads', 'Podcasts', 'Documentaries', 'Brand Films', '2D Animation'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="our-work" className="py-24 sm:py-32 bg-[#101010] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#a855f7] font-mono font-semibold mb-2">
              Selected Works
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-white font-display">
              Our Work
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-neutral-400 max-w-md">
            A showcase of TV campaigns, luxury fashion visuals, podcast episodes, and cinematic documentaries produced across Cairo, Dubai, and global markets.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white border-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden bg-[#181818] border border-white/10 hover:border-[#a855f7]/80 transition-all duration-400 flex flex-col"
              >
                {/* Thumbnail Container */}
                <div
                  className="relative aspect-video w-full overflow-hidden cursor-pointer"
                  onClick={() => onPlayVideo(project)}
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Play Button Overlay with pulsing ring */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-115 group-hover:bg-[#9333ea] group-hover:border-[#a855f7] shadow-2xl">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  {project.duration && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-mono text-white/90 flex items-center space-x-1 border border-white/10">
                      <Clock className="w-3 h-3 text-[#c084fc]" />
                      <span>{project.duration}</span>
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#a855f7] border border-white/10">
                    {project.category}
                  </div>
                </div>

                {/* Metadata Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
                      <span>Client: {project.client}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#c084fc] transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-400 font-light line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => onPlayVideo(project)}
                      className="text-xs uppercase font-semibold tracking-wider text-[#a855f7] hover:text-[#c084fc] transition-colors inline-flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Watch Reel</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={onOpenBooking}
                      className="text-xs text-neutral-400 hover:text-white transition-colors"
                    >
                      Request Similar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
