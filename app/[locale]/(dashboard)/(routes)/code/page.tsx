"use client";

import * as z from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import ReactMarkdown from "react-markdown";

import { formSchema } from "./constant";
import { Code, Send } from "lucide-react";
import Heading from "@/components/Heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/Empty";
import { Loader } from "@/components/Loader";
import UserAvatar from "@/components/UserAvatar";
import AiAvatar from "@/components/AiAvatar";

const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const config = {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      const options = {
        // Your options here, for example:
        duration: 500,
        smooth: true,
      };

      // animateScroll.scrollToBottom(options);

      form.reset();
    } catch (error: any) {
      // TODO: open Pro Modal
      console.log(`error`, error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="relative h-screen w-full">
      <Heading
        title="Code Generation"
        description="Meet your new code buddy"
        icon={Code}
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
            <Empty label="No conversation found" />
          )}
          <div className="w-11/12 lg:w-10/12 mx-auto flex flex-col justify-end">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "px-4 lg:px-8 py-6 my-1 w-full items-center gap-x-3 lg:gap-x-5 rounded-2xl flex",
                  message.role === "user" ? "bg-transparent" : "bg-zinc-800"
                )}>
                {message.role === "user" ? <UserAvatar /> : <AiAvatar />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-5 bg-gray-100 dark:bg-black/20 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code
                        className="dark:bg-black/30 rounded-md p-0.5 px-2"
                        {...props}
                      />
                    ),
                  }}
                  className="text-sm">
                  {message.content || ""}
                </ReactMarkdown>
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

export default CodePage;
