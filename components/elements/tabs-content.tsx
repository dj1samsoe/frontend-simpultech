import { Card, CardHeader, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { ChatMessage } from "@/types/inbox";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ChatList from "./chat-list";
import ChatRoom from "./chat-room";
import { Task } from "@/types/task";
import { Separator } from "../ui/separator";
import { DatePicker } from "../ui/date-picker";
import { FaRegClock } from "react-icons/fa6";
import { ImPencil } from "react-icons/im";
import { updateTaskAction } from "../action/task-action";
import { format } from "date-fns";

interface TaskTabContentProps {
  data: Task[];
}

export function TaskTabContent({ data }: TaskTabContentProps) {
  const [tasks, setTasks] = useState(data);
  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = async (id: string, completed: boolean) => {
    try {
      const result = await updateTaskAction(id, completed);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-[700px] max-h-[600px] rounded-none overflow-y-auto">
      <CardHeader className="fixed top-0 left-0 right-0 z-10 bg-background rounded-t-lg p-4">
        <div className="flex items-center justify-between">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="My Tasks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="my-task" defaultChecked defaultValue="my-task">
                My Tasks
              </SelectItem>
              <SelectItem value="personal">Personal Errands</SelectItem>
              <SelectItem value="urgent">Urgent To-Do</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="default" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "New Task"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-start h-full overflow-y-auto pt-20">
        {tasks.map((task) => (
          <div key={task.id} className="flex flex-col w-full space-y-4">
            <div className="flex flex-col items-start space-y-2">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm max-w-md">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleChange(task.id, !task.completed)}
                    className="accent-neutral-200 rounded-md border border-checked checked:border-checked"
                  />
                  <span
                    className={
                      task.completed
                        ? "line-through font-semibold"
                        : "font-semibold"
                    }
                  >
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  {task.completed === false && (
                    <p className="text-indicator-accent">{task.dueDate}</p>
                  )}
                  <p className="text-theme-secondary">
                    {format(task.date, "dd/MM/yyyy")}
                  </p>
                  <FaChevronDown />
                  <MdOutlineMoreHoriz />
                </div>
              </div>
              {task.completed === false && (
                <>
                  <div className="flex items-center space-x-3 text-sm container mx-auto">
                    <FaRegClock className="text-theme-primary" />
                    <DatePicker
                      initialDate={task.date ? new Date(task.date) : undefined}
                    />
                  </div>
                  <div className="flex items-start space-x-3 text-sm container mx-auto">
                    <ImPencil className="text-theme-primary" />
                    <p className="max-w-lg text-theme-secondary">
                      {task.description}
                    </p>
                  </div>
                </>
              )}
            </div>
            <Separator />
          </div>
        ))}
        {showForm && (
          <div className="flex flex-col space-y-4 w-full text-sm">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm max-w-lg">
                <input type="checkbox" />
                <Input
                  type="text"
                  placeholder="Type Task Title"
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <FaChevronDown />
                <MdOutlineMoreHoriz />
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm container mx-auto">
              <FaRegClock className="text-theme-secondary" />
              <DatePicker
                initialDate={newTask.date ? new Date(newTask.date) : undefined}
              />
            </div>
            <div className="flex items-start space-x-3 text-sm container mx-auto">
              <ImPencil className="text-theme-secondary" />
              <p className="max-w-lg text-theme-secondary">No Description</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// components/inbox-tab-content.tsx
interface InboxTabContentProps {
  data: ChatMessage[];
}

export function InboxTabContent({ data }: InboxTabContentProps) {
  const [isInChatRoom, setIsInChatRoom] = useState(false);
  const [activeGroupName, setActiveGroupName] = useState<string | null>(null);

  const enterChatRoom = (groupName: string) => {
    setActiveGroupName(groupName);
    setIsInChatRoom(true);
  };

  const leaveChatRoom = () => {
    setIsInChatRoom(false);
    setActiveGroupName(null);
  };

  return (
    <Card className="w-[700px] max-h-[600px] rounded-none overflow-auto">
      <AnimatePresence>
        {isInChatRoom ? (
          <ChatRoom
            groupName={activeGroupName}
            chatData={data.filter((chat) => chat.groupName === activeGroupName)}
            leaveChatRoom={leaveChatRoom}
          />
        ) : (
          <ChatList chatData={data} enterChatRoom={enterChatRoom} />
        )}
      </AnimatePresence>
    </Card>
  );
}
