
"use client";


import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}
const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div

      className={`@container container mx-auto  md:p y-5 sm:p y-3 p y-2 ${className}`}

    >
      {children}
    </div>
  );
};

export default Container;
