"use client";

import * as z from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

import { amountOptions, resolutionOptions, formSchema } from "./constant";

import { Image as imageIcon, Send, Download } from "lucide-react";

import Heading from "@/components/Heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/Empty";
import { Loader } from "@/components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import UserAvatar from "@/components/UserAvatar";
import AiAvatar from "@/components/AiAvatar";

const ImagePage = () => {
  const router = useRouter();
  // const [images, setImages] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  interface Message {
    prompt: string;
    resolution: string;
    amount: string;
    generatedImages: string[];
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/image", values);
      console.log("Response:", res); // Log the entire response

      const imageUrls = res.data.map((image: { url: string }) => image.url);

      // setImages(imageUrls);

      const message: Message = {
        prompt: values.prompt,
        resolution: values.resolution,
        amount: values.amount,
        generatedImages: imageUrls,
      };

      setMessages((oldMessages) => [...oldMessages, message]);
    } catch (error) {
      // TODO: open Pro Modal
      console.log(`error`, error);
    } finally {
      form.reset();
      router.refresh();
    }

    return false;
  };

  return (
    <div className="relative h-screen w-full">
      <Heading
        title="Image Generation"
        description="Meet your new graphic designer"
        icon={imageIcon}
        iconColor="text-zinc-900 dark:text-zinc-50"
        bgColor="bg-zinc-200 dark:bg-zinc-800"
      />
      <div className="h-[84%] md:h-[88%] w-full grid grid-rows-6 relative">
        <div className="message-box w-full !p-0 mx-auto row-span-5 h-full overflow-y-scroll scroll-smooth focus:scroll-auto ">
          {isLoading && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 p-8 rounded-3xl w-11/12 lg:w-10/12 mx-auto flex items-center justify-center bg-zinc-700 z-10">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No images generated" />
          )}
          <div className="w-11/12 lg:w-10/12 mx-auto ">
            {messages.map((message, index) => (
              <div key={index}>
                <div className="px-4 lg:px-8 py-6 my-1 w-full items-center gap-x-3 lg:gap-x-5 rounded-2xl flex bg-transparent">
                  <UserAvatar />
                  {message.prompt}
                </div>
                <div className="px-4 lg:px-8 pt-10 pb-6 my-1 w-full grid grid-cols-[5%_95%] gap-x-2 rounded-2xl bg-zinc-800 overflow-x-hidden">
                  <AiAvatar />
                  <div className="w-full grid grid-cols-fluid gap-5">
                    {message.generatedImages.map((image, index) => (
                      <Card
                        key={index}
                        className="w-48 rounded-lg overflow-hidden">
                        <div className="relative aspect-square">
                          <Image key={index} alt="Image" fill src={image} />
                        </div>
                        <CardFooter className="p-2">
                          <Button
                            onClick={() => window.open(image)}
                            variant="secondary"
                            className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="self-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-11/12 lg:w-10/12 h-16 lg:mt-1 md:mb-0 mx-auto flex items-center justify-between dark:bg-zinc-800 rounded-full border border-zinc-500 dark:border-zinc-950">
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="w-[90%]">
                    <FormControl>
                      <Input
                        className="ml-6 mr-2 w-full !border-0 !outline-0 focus-visible:!border-none focus-visible:!ring-0 focus-visible:!ring-transparent bg-transparent placeholder:tracking-wide placeholder:text-zinc-600 dark:placeholder:text-zinc-400"
                        disabled={isLoading}
                        placeholder="Enter your prompt"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                size={"icon"}
                variant={"outline"}
                className="border-zinc-300 bg-zinc-900 text-zinc-100 hover:text-white hover:bg-zinc-950 dark:border-zinc-950 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:text-white dark:hover:bg-zinc-950 rounded-full w-12 h-12 mr-2 transition"
                disabled={isLoading}>
                <Send />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
