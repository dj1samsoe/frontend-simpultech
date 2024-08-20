"use client";
import { ChatRoomProps } from "@/types/inbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { CardHeader, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";

export default function ChatRoom({
  groupName,
  chatData,
  leaveChatRoom,
}: ChatRoomProps) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col rounded-lg overflow-hidden"
    >
      <CardHeader className="fixed top-0 left-0 right-0 z-10 bg-background rounded-t-lg">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={leaveChatRoom}>
            <FaArrowLeft size={24} />
          </Button>
          <div className="flex flex-col items-start">
            <h1 className="text-lg font-semibold text-theme-primary line-clamp-1">
              {groupName}
            </h1>
            <p className="text-xs text-theme-secondary">3 Participants</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-start h-full my-10 p-4 overflow-y-auto">
        {chatData.map((item, index) => (
          <div key={item.group_id} className="flex flex-col w-full text-sm">
            {item.messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col w-full mb-4 ${
                  message.name === "You"
                    ? "items-end text-left"
                    : "items-start text-left"
                }`}
              >
                {/* Check if the current message has id = 2, and add a separator after it */}
                {message.id === 2 && (
                  <div className="container mx-auto my-4">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <Separator className="h-[2px] bg-theme-secondary" />
                      <p className="text-center font-semibold">
                        Today {message.date}
                      </p>
                      <Separator className="h-[2px] bg-theme-secondary" />
                    </div>
                  </div>
                )}

                {/* Check if this is the "Obaidullah Amarkhil" message and add a "New Message" separator before it */}
                {message.name === "Obaidullah Amarkhil" && (
                  <div className="container mx-auto my-4">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <Separator className="h-[2px] bg-indicator-accent" />
                      <p className="text-center font-semibold text-indicator-accent">
                        New Message
                      </p>
                      <Separator className="h-[2px] bg-indicator-accent" />
                    </div>
                  </div>
                )}
                <span
                  className={`font-bold ${
                    message.name === "Obaidullah Amarkhil"
                      ? "text-chats-accent-foreground"
                      : message.name !== "You"
                      ? "text-chats-primary-foreground"
                      : "text-chats-secondary-foreground"
                  }`}
                >
                  {message.name}
                </span>
                <div className="flex gap-2 items-start">
                  {message.name !== "You" ? (
                    <>
                      <div
                        className={`max-w-md px-4 py-2 rounded-lg shadow flex flex-col space-y-2 items-start ${
                          message.name === "You"
                            ? "bg-chats-secondary-background text-theme-secondary"
                            : message.name === "Obaidullah Amarkhil"
                            ? "bg-chats-accent-background text-theme-secondary"
                            : "bg-chats-primary-background text-theme-secondary"
                        } `}
                      >
                        {message.body}
                        <div className="text-xs text-theme-secondary">
                          {message.time}
                        </div>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost">
                            <MdOutlineMoreHoriz />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align={"start"} className="p-0 w-32">
                          <div className="flex flex-col items-start w-full">
                            <Button
                              variant="ghost"
                              className="text-theme-primary w-full !justify-start"
                            >
                              Edit
                            </Button>
                            <Separator />
                            <Button
                              variant="ghost"
                              className="text-indicator-accent w-full !justify-start"
                            >
                              Delete
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </>
                  ) : (
                    <>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost">
                            <MdOutlineMoreHoriz />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align={"end"} className="p-0 w-32">
                          <div className="flex flex-col items-start w-full">
                            <Button
                              variant="ghost"
                              className="text-theme-primary w-full !justify-start"
                            >
                              Edit
                            </Button>
                            <Separator />
                            <Button
                              variant="ghost"
                              className="text-indicator-accent w-full !justify-start"
                            >
                              Delete
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <div
                        className={`max-w-md px-4 py-2 rounded-lg shadow flex flex-col space-y-2 items-start ${
                          message.name === "You"
                            ? "bg-chats-secondary-background text-theme-secondary"
                            : message.name === "Obaidullah Amarkhil"
                            ? "bg-chats-accent-background text-theme-secondary"
                            : "bg-chats-primary-background text-theme-secondary"
                        } `}
                      >
                        {message.body}
                        <div className="text-xs text-theme-secondary">
                          {message.time}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </CardContent>
      <CardFooter className="gap-3 fixed bottom-0 left-0 right-0 bg-background p-3 rounded-b-lg">
        <Input placeholder="Type a new message" className="border" />
        <Button variant={"default"}>Send</Button>
      </CardFooter>
    </motion.div>
  );
}
