"use client";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { default as Worker } from "../../../public/browser-error.png";
import { default as Logo } from "../../../public/grass-white.png";
import { ImageRequest } from "./ImageRequest";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export function GeneratedContent() {
  const [message, setMessage] = useState("");
  async function postImage(formData: FormData) {
    noStore();
    const plan = "0";
    const prompt = formData.get("prompt") as string;

    await fetch(
      `http://127.0.0.1:8080/api/home?keyword=${prompt}&subscription=${plan}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.image_url);
      })
      .catch((error) => {
        console.error("Error fetchinh the data: ", error);
        setMessage(Worker.src);
      });
  }

  return (
    <div className="pt-8 sm:pt-10 pb-16 container mx-auto max-w-6xl px-5 mb-32 sm:mb-0">
      <form action={postImage}>
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-10 md:mb-15">
          <div className="flex flex-col gap-y-2">
            <Label>Prompt</Label>
            <Input
              placeholder="A brave and powerfull man walking in the forest."
              name="prompt"
              type="text"
              required
            />
          </div>
        </div>

        <CreationBottomBar />
      </form>

      <div className="mx-auto w-3/5 mt-36 flex flex-col gap-y-5">
        {message ? (
          <div>
            <Carousel>
              <CarouselContent>
                <CarouselItem className="flex justify-center">
                  <div className="relative h-100 w-100">
                    <Image
                      className="rounded-sm"
                      src={message}
                      width={350}
                      height={350}
                      loading="lazy"
                      alt=" ai generated"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ) : (
          <div>
            <Carousel>
              <CarouselContent>
                <CarouselItem className="flex justify-center">
                  <Image src={Logo} alt="Logo" />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}
