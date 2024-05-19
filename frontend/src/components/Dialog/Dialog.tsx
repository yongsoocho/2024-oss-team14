"use client";

import React, { ReactNode } from "react";
import * as DialogPrimitives from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./style.css";

export const Dialog = ({
  triggerComponent,
  title,
  description,
  children,
  onConfirm,
  confirmButtonTitle,
}: {
  triggerComponent: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  onConfirm: () => void;
  confirmButtonTitle: string;
}) => (
  <DialogPrimitives.Root>
    <DialogPrimitives.Trigger asChild>
      {triggerComponent}
    </DialogPrimitives.Trigger>
    <DialogPrimitives.Portal>
      <DialogPrimitives.Overlay className="DialogOverlay" />
      <DialogPrimitives.Content className="DialogContent">
        <DialogPrimitives.Title className="DialogTitle">
          {title}
        </DialogPrimitives.Title>
        <DialogPrimitives.Description className="DialogDescription">
          {description}
        </DialogPrimitives.Description>
        {children}
        <div
          style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
        >
          <DialogPrimitives.Close asChild>
            <button className="Button green" onClick={() => onConfirm()}>
              {confirmButtonTitle}
            </button>
          </DialogPrimitives.Close>
        </div>
        <DialogPrimitives.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </DialogPrimitives.Close>
      </DialogPrimitives.Content>
    </DialogPrimitives.Portal>
  </DialogPrimitives.Root>
);
