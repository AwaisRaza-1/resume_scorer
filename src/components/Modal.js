"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const sizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[90vw]",
};

export default function Modal({
  open = false,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlay = true,
  actions,
}) {
  const sizeClass = sizes[size] || sizes.md;

  const handleOverlayClick = () => {
    if (closeOnOverlay && onClose) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0" onClick={handleOverlayClick} />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.2 }}
            className={`relative w-[92vw] ${sizeClass} rounded-2xl bg-white shadow-2xl border border-border`}
          >
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-bold">{title}</h3>
              <button
                aria-label="Close"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">{children}</div>
            {Array.isArray(actions) && actions.length > 0 && (
              <div className="p-5 pt-0 flex items-center justify-end gap-3">
                {actions.map((a, i) => (
                  <button
                    key={i}
                    onClick={a.onClick}
                    className={
                      a.variant === "primary"
                        ? "bg-primary text-white px-4 py-2 rounded-lg font-semibold"
                        : "border border-border px-4 py-2 rounded-lg font-semibold"
                    }
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
