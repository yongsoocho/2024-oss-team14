"use client";

import React, { ReactNode } from "react";
import * as DialogPrimitives from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./style.css";
import { Button } from "@radix-ui/themes";
import { useLoading } from "@/hooks/useLoading";
import { css } from "@emotion/react";

export const Dialog = ({
  triggerComponent,
  title,
  description,
  children,
  onConfirm,
  confirmButtonTitle,
  closeOnConfirm = false,
}: {
  triggerComponent: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  onConfirm: () => Promise<void>;
  confirmButtonTitle: string;
  closeOnConfirm?: boolean;
}) => {
  const [loading, startLoading] = useLoading();
  const handleClick = async () => {
    await startLoading(onConfirm());
  };

  return (
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
          {closeOnConfirm === true ? (
            <DialogPrimitives.Close asChild>
              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  color="cyan"
                  variant="soft"
                  onClick={handleClick}
                  loading={loading}
                  style={{ padding: "8px", borderRadius: "8pxc" }}
                >
                  {confirmButtonTitle}
                </Button>
              </div>
            </DialogPrimitives.Close>
          ) : (
            <div
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="cyan"
                variant="soft"
                onClick={handleClick}
                loading={loading}
                style={{ padding: "8px", borderRadius: "8pxc" }}
              >
                {confirmButtonTitle}
              </Button>
            </div>
          )}

          <DialogPrimitives.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </DialogPrimitives.Close>
        </DialogPrimitives.Content>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
};
