import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  // Animation stages: 'display' (content visible) -> 'exit-content' (text & line fade out) -> 'exit-overlay' (backdrop fades out) -> 'done'
  const [stage, setStage] = useState<'display' | 'exit-content' | 'exit-overlay' | 'done'>('display');

  // Prevent background scrolling and interaction while the welcome animation is active
  useEffect(() => {
    if (stage !== 'done') {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [stage]);

  // Orchestrate timeline:
  // 0.0s - 1.8s: Welcome text and line animate in smoothly, then rest briefly on screen
  // 1.8s - 2.3s: Welcome text and line smoothly fade out
  // 2.3s - 3.0s: Backdrop smoothly fades out, revealing the landing page seamlessly
  // 3.0s+: Animation completed, unmounted cleanly
  useEffect(() => {
    // Step 1: Hold briefly then fade out text and line
    const contentExitTimer = setTimeout(() => {
      setStage('exit-content');
    }, 1800);

    // Step 2: Fade out background overlay to reveal the landing page
    const overlayExitTimer = setTimeout(() => {
      setStage('exit-overlay');
    }, 2300);

    // Step 3: Complete transition, restore all interactions and unmount
    const doneTimer = setTimeout(() => {
      setStage('done');
      onComplete?.();
    }, 3000);

    return () => {
      clearTimeout(contentExitTimer);
      clearTimeout(overlayExitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (stage === 'done') {
    return null;
  }

  const isExitingContent = stage === 'exit-content' || stage === 'exit-overlay';
  const isExitingOverlay = stage === 'exit-overlay';

  return (
    <AnimatePresence>
      {!isExitingOverlay ? (
        <motion.div
          id="welcome-screen"
          key="welcome-backdrop"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#121212] select-none cursor-default overflow-hidden pointer-events-auto"
          aria-live="polite"
          aria-label="Welcome screen"
        >
          {/* Subtle atmospheric vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_70%)]" />

          {/* Centered Welcome Container */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6">
            {/* The word "WELCOME" */}
            <motion.h1
              id="welcome-title"
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              animate={
                isExitingContent
                  ? { opacity: 0, y: -10, filter: 'blur(3px)' }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              transition={{
                duration: isExitingContent ? 0.45 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.35em] sm:tracking-[0.45em] md:tracking-[0.55em] uppercase text-white/95 pl-[0.35em] sm:pl-[0.45em] md:pl-[0.55em] text-center"
            >
              WELCOME
            </motion.h1>

            {/* Thin, subtle horizontal line directly beneath "WELCOME" */}
            <div className="relative mt-4 sm:mt-5 md:mt-6 flex items-center justify-center w-full">
              {/* Primary subtle line */}
              <motion.div
                id="welcome-subtle-line"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  isExitingContent
                    ? { scaleX: 0.6, opacity: 0 }
                    : { scaleX: 1, opacity: 1 }
                }
                transition={{
                  duration: isExitingContent ? 0.4 : 0.8,
                  delay: isExitingContent ? 0 : 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-24 sm:w-32 md:w-44 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent origin-center"
              />

              {/* Brand futuristic purple glow accent at center */}
              <motion.div
                id="welcome-accent-line"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  isExitingContent
                    ? { scaleX: 0, opacity: 0 }
                    : { scaleX: 1, opacity: 0.9 }
                }
                transition={{
                  duration: isExitingContent ? 0.35 : 0.65,
                  delay: isExitingContent ? 0 : 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute w-10 sm:w-14 md:w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent origin-center shadow-[0_0_12px_rgba(168,85,247,0.6)]"
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          id="welcome-screen-fadeout"
          key="welcome-fadeout"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#121212] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};

export { Preloader as WelcomeAnimation };
