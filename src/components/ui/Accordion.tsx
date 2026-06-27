import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { cn } from "../lib/axios/cn";
interface AccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
  amount?: number;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  isOpen,
  onToggle,
  children,
  className,
  amount,
}) => {
  return (
    <div
      className={cn(
        `bor der cursor-pointer  border-subtitle rounded px-3 
      `,
        className
      )}
    >
      <button
        onClick={onToggle}
        className="w-full  border-t border-b border-border-color
         py-3 cursor-pointer text-left text-sm font-medium flex justify-between"
      >
        <span className="flex items-center gap-2">
          {" "}
          {title} <span>{isOpen ? "▲" : "▼"}</span>
        </span>
        <span> ${amount} </span>
      </button>

      <AnimatePresence>
        {" "}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
