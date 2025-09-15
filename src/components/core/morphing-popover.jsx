"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext, useState } from "react";

const MorphingPopoverContext = createContext();

export function MorphingPopover({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MorphingPopoverContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MorphingPopoverContext.Provider>
  );
}

export function MorphingPopoverTrigger({ children, asChild = false }) {
  const { setIsOpen } = useContext(MorphingPopoverContext);

  if (asChild) {
    return React.cloneElement(children, {
      onClick: () => setIsOpen(true),
    });
  }

  return (
    <button onClick={() => setIsOpen(true)}>
      {children}
    </button>
  );
}

export function MorphingPopoverContent({ children, className = "" }) {
  const { isOpen, setIsOpen } = useContext(MorphingPopoverContext);

  // Prevent body scroll when popover is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Popover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`absolute bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-[90vh] overflow-y-auto ${className}`}
            style={{
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '12px'
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
