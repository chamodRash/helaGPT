"use client";

import * as z from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

import { formSchema } from "./constant";
import { MessagesSquare, Send } from "lucide-react";
import Heading from "@/components/Heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/Empty";
import { Loader } from "@/components/Loader";
import UserAvatar from "@/components/UserAvatar";
import AiAvatar from "@/components/AiAvatar";

const ConversationPage = () => {
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

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      // TODO: open Pro Modal
      console.log(`error`, error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="relative h-screen">
      <Heading
        title="Conversation"
        description="Meet your new personal tutor"
        icon={MessagesSquare}
        iconColor="text-zinc-900 dark:text-zinc-50"
        bgColor="bg-zinc-200 dark:bg-zinc-800"
      />
      <div className="h-[92%] md:h-[88%] grid grid-rows-5 lg:grid-rows-6 relative">
        <div className="row-start-1 row-span-4 lg:row-span-5 h-full overflow-y-scroll ">
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
                  "px-4 lg:px-8 py-6 my-1 w-full items-center gap-x-3 lg:gap-x-5 rounded-lg flex",
                  message.role === "user" ? "bg-transparent" : "bg-zinc-800"
                )}>
                {message.role === "user" ? <UserAvatar /> : <AiAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full ">
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
                        className="ml-6 mr-2 w-full !border-none !outline-none focus-visible:!border-none focus-visible:!ring-0 focus-visible:!ring-transparent bg-transparent placeholder:tracking-wide placeholder:text-zinc-600 dark:placeholder:text-zinc-400"
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

export default ConversationPage;
