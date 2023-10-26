import { createContext, useContext, useState } from "react";



type MyContextType = {
    taskViewMode: string;
    setTaskViewMode: React.Dispatch<React.SetStateAction<string>>;
  }

export const TaskViewContext = createContext<MyContextType | undefined>(undefined);

const TaskViewModeProvider = ({children}: {children: React.ReactNode}) => {
    const [taskViewMode, setTaskViewMode] =  useState<string>('Kanban');
    return <TaskViewContext.Provider value={{taskViewMode, setTaskViewMode}}>
        {children}
    </TaskViewContext.Provider>
}

export function useTaskViewContext() : MyContextType {
    const context = useContext(TaskViewContext);
    if (context === undefined) {
      throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
  }
export default TaskViewModeProvider;