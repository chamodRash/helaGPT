"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { formSchema } from "./constant";
import { MessagesSquare, Send } from "lucide-react";
import Heading from "@/components/Heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };

      const newMessage = [...messages];

      const response = await axios.post("@/app/[locale]/api/conversation", {
        messages: newMessage,
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
      <div className="h-[92%] md:h-[88%] grid grid-rows-6">
        <div className="row-start-1 row-span-5 h-full">
          <div>
            {messages.map((message) => (
              <div key={message.content}>{message.content}</div>
            ))}
          </div>
        </div>
        <div className="row-start-6 h-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-11/12 h-16 -mt-4 md:mt-1 md:mb-0 mx-auto flex items-center justify-between dark:bg-zinc-800 rounded-full border border-zinc-500 dark:border-zinc-950">
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
