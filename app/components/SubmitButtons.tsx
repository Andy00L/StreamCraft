"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { useFormStatus } from "react-dom";

export function SubmitButtons({
  message,
  variation,
}: {
  message: string;
  variation: string;
}) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant={"ghost"} disabled>
          <Loader2 className="animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button size="lg" type="submit">
          {message}
        </Button>
      )}
    </>
  );
}

export function PaymentPageButtons({
  message,
  variation,
}: {
  message: string;
  variation: string;
}) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          className=" w-full text-wrap h-12 flex items-center justify-center rounded-lg drop-shadow  px-8 shadow cursor-pointer active:scale-95 hover:brightness-110 transition-all bg-gradient-to-t "
          variant={"ghost"}
          disabled
        >
          <Loader2 className="animate-spin" />
          Please Wait
        </Button>
      ) : (
        <ColorButton color={variation} message={message} />
      )}
    </>
  );
}

function ColorButton({ color, message }: { color: string; message: string }) {
  if (color === "destructive") {
    return (
      <Button
        variant={"destructive"}
        className=" w-full text-wrap h-12 flex items-center justify-center rounded-lg drop-shadow  px-8 shadow cursor-pointer active:scale-95 hover:brightness-110 transition-all bg-gradient-to-t "
        type="submit"
      >
        {message}
      </Button>
    );
  } else if (color === "secondary") {
    return (
      <Button
        variant={"secondary"}
        className=" w-full text-wrap h-12 flex items-center justify-center rounded-lg drop-shadow  px-8 shadow cursor-pointer active:scale-95 hover:brightness-110 transition-all bg-gradient-to-t "
        type="submit"
      >
        {message}
      </Button>
    );
  } else if (color === "ghost") {
    return (
      <Button
        variant={"ghost"}
        className=" w-full text-wrap h-12 flex items-center justify-center rounded-lg drop-shadow  px-8 shadow cursor-pointer active:scale-95 hover:brightness-110 transition-all bg-gradient-to-t "
        type="submit"
      >
        {message}
      </Button>
    );
  } else {
    return (
      <Button
        variant={"default"}
        className=" w-full text-wrap h-12 flex items-center justify-center rounded-lg drop-shadow  px-8 shadow cursor-pointer active:scale-95 hover:brightness-110 transition-all bg-gradient-to-t "
        type="submit"
      >
        {message}
      </Button>
    );
  }
}
