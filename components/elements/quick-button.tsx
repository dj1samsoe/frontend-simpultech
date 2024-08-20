"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { PiChatsDuotone } from "react-icons/pi";
import { MdOutlineChromeReaderMode } from "react-icons/md";
import QuickTabs from "./quick-tabs";

export default function QuickButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleToggleOpen = () => {
    if (isOpen) {
      setActiveTab(null); // Reset the active tab when closing
    }
    setIsOpen(!isOpen);
  };

  const handleOpenTabs = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleCloseTabs = () => {
    setActiveTab(null);
  };

  return (
    <div className="relative">
      <Button
        variant={activeTab ? "inactive-toggle" : "default"}
        size={"quick"}
        onClick={handleToggleOpen}
      >
        <BsFillLightningChargeFill size={24} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-0 right-20 space-x-6 flex"
          >
            <motion.div
              initial={{ x: 0 }}
              animate={{
                x: activeTab === "Task" ? 170 : activeTab === "Inbox" ? 80 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <QuickTabs
                className={
                  activeTab === "Task"
                    ? "bg-indicator-primary"
                    : "text-indicator-primary"
                }
                icon={<MdOutlineChromeReaderMode size={24} />}
                tooltipText="Task"
                isActive={activeTab === "Task"}
                open={() => handleOpenTabs("Task")}
                close={handleCloseTabs}
                delay={200}
                dataUrl="/api/task"
                tabName="Task"
              />
            </motion.div>
            <motion.div
              initial={{ x: 0 }}
              animate={{
                x: activeTab === "Inbox" ? 90 : activeTab === "Task" ? 0 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <QuickTabs
                className={
                  activeTab === "Inbox"
                    ? "bg-indicator-secondary"
                    : "text-indicator-secondary"
                }
                icon={<PiChatsDuotone size={24} />}
                tooltipText="Inbox"
                isActive={activeTab === "Inbox"}
                open={() => handleOpenTabs("Inbox")}
                close={handleCloseTabs}
                delay={100}
                dataUrl="/api/inbox"
                tabName="Inbox"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
