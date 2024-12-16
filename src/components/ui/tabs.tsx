'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

import { cn } from '@/lib/utils';

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

interface TabsProps {
  children: ReactNode;
  defaultValue: string;
}

export function Tabs({ children, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

export function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider');
  }

  return context;
}

interface TabsListProps {
  children: ReactNode;
}

export function TabsList({ children }: TabsListProps) {
  return <div className="flex border-b border-gray-200">{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();

  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        'hover:opacity-75 px-4 py-2 text-sm font-medium cursor-pointer',
        isActive
          ? 'bg-white shadow-md rounded-t-md border-b-2 border-teal-500 text-teal-500'
          : 'text-gray-500',
      )}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
}

export function TabsContent({ value, children }: TabsContentProps) {
  const { activeTab } = useTabsContext();

  if (activeTab !== value) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-b-md border-x border-b border-gray-200 p-4">
      {children}
    </div>
  );
}
