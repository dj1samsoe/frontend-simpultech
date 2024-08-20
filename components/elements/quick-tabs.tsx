"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useState, useEffect } from "react";
import { InboxTabContent, TaskTabContent } from "./tabs-content";
import { ImSpinner2 } from "react-icons/im";

interface QuickTabsProps {
  className?: string;
  icon: React.ReactNode;
  tooltipText: string;
  isActive: boolean;
  open: () => void;
  close: () => void;
  delay?: number;
  dataUrl: string;
  tabName: string;
}

export default function QuickTabs({
  className,
  icon,
  tooltipText,
  isActive,
  open,
  close,
  delay = 0,
  dataUrl,
  tabName,
}: QuickTabsProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setTimeout(() => setIsPopoverOpen(true), delay);
    } else {
      setIsPopoverOpen(false);
    }
    return () => clearTimeout(timer);
  }, [isActive, delay]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(dataUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setData(data);
      setIsLoading(false);
    };

    fetchData();
  }, [dataUrl]);

  return (
    <Popover onOpenChange={(isOpen) => (isOpen ? open() : close())}>
      <PopoverTrigger>
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                variant={isActive ? "active-quick" : "inactive-quick"}
                size={"quick"}
                className={className}
              >
                {icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{tooltipText}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      {isPopoverOpen && (
        <PopoverContent
          side={"top"}
          sideOffset={10}
          align={"end"}
          className="h-full"
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center w-[700px] h-[600px]">
              <ImSpinner2 className="animate-spin" />
              <p className="ml-2 text-sm text-gray-500">Loading...</p>
            </div>
          ) : (
            <>
              {tabName === "Task" && <TaskTabContent data={data} />}
              {tabName === "Inbox" && <InboxTabContent data={data} />}
            </>
          )}
        </PopoverContent>
      )}
    </Popover>
  );
}
