"use client";


import Input from "../ui/input/Input";

import React from "react";

type OrderInstructionsProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export default function OrderInstructions({ onChange }: OrderInstructionsProps) {
 

  return (
    <div className="mt-8">
      {/* Cake Section */}
      <section  className="space-y-2">
        <Input onChange={onChange} label="Cake Message" name="cakeMessage" />
        <Input onChange={onChange} label="Note" name="note" />
      </section>
      <h3 className="font-medium mb-2">Order special instructions</h3>
      <textarea
     
        onChange={onChange}
        name="orderInstructions"
        className="w-full h-32 resize-none focus:outline-none text-subtitle text-sm  rounded-md border border-border-color p-2"
        placeholder="Add any special instructions or notes about your order here"
      />
    </div>
  );
}
