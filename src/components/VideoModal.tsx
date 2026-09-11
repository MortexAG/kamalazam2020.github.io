import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioProject } from '../types';
import { X, Play, ShieldAlert } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  project: PortfolioProject | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#181818] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-[#121212] border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#c084fc] uppercase mb-1">
                  <span>{project.category}</span>
                  <span>•</span>
                  <span>Client: {project.client}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Stage */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <video
                controls
                autoPlay
                playsInline
                poster={project.thumbnail}
                className="w-full h-full object-contain"
              >
                {project.videoUrl && <source src={project.videoUrl} type="video/mp4" />}
                Your browser does not support HTML5 video.
              </video>
            </div>

            {/* Modal Footer Description */}
            <div className="p-6 bg-[#151515] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-neutral-300 font-light leading-relaxed max-w-3xl">
                {project.description}
              </p>
              <div className="flex items-center space-x-3 text-xs font-mono text-neutral-400">
                <span>Production Year: {project.year}</span>
                {project.duration && <span>• Duration: {project.duration}</span>}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
