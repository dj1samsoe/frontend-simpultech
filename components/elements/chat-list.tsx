"use client";
import { ChatListProps } from "@/types/inbox";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaRegUser } from "react-icons/fa6";
import { CardHeader, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { formatDate } from "date-fns";

export default function ChatList({ chatData, enterChatRoom }: ChatListProps) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <CardHeader>
        <div className="flex items-center justify-between rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-border">
          <Input placeholder="Search" />
          <Button variant="ghost" size="icon">
            <SearchIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-start h-full overflow-y-auto">
        {chatData.map((message, index) => (
          <div
            key={index}
            className="flex flex-col w-full items-start space-y-3 cursor-pointer hover:bg-theme-foreground/50 transition-all p-2 rounded-md"
            onClick={() => enterChatRoom(message.groupName)}
          >
            <div className="flex items-end justify-between w-full">
              <div className="flex items-start">
                <div className="flex items-center">
                  <div className="p-4 rounded-full bg-theme-foreground text-neutral-800">
                    <FaRegUser size={16} />
                  </div>
                  <div className="p-4 rounded-full bg-theme-primary text-white -translate-x-5">
                    <FaRegUser size={16} />
                  </div>
                </div>
                <div className="flex flex-col space-y-2 items-start">
                  <div className="flex items-center space-x-2">
                    <h1 className="font-medium text-theme-primary leading-none">
                      {message.groupName}
                    </h1>
                    <p className="text-xs text-theme-secondary">
                      {formatDate(message.messages[0].date, "dd/MM/yyyy")}{" "}
                      {formatDate(message.messages[0].time, "HH:mm")}
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-sm font-semibold text-theme-secondary">
                      {message.messages[0].name} :
                    </p>

                    <p className="text-sm text-theme-secondary">
                      {message.messages[0].body.slice(0, 20)}...
                    </p>
                  </div>
                </div>
              </div>
              {message.messages[0].is_new === true && (
                <span className="w-2 h-2 rounded-full bg-indicator-accent -translate-y-2"></span>
              )}
            </div>
            <Separator />
          </div>
        ))}
      </CardContent>
    </motion.div>
  );
}
