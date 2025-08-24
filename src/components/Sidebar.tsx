import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Book, 
  Code, 
  Database, 
  FileText, 
  Package, 
  Zap,
  ChevronRight,
  Play
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
}

const Sidebar = ({ activeSection, onSectionChange, isOpen }: SidebarProps) => {
  const sections = [
    {
      title: "Getting Started",
      icon: Play,
      items: [
        { id: "introduction", label: "Introduction to Python" },
        { id: "installation", label: "Installation" },
        { id: "first-program", label: "Your First Program" },
      ]
    },
    {
      title: "Basics",
      icon: Book,
      items: [
        { id: "variables", label: "Variables & Data Types" },
        { id: "operators", label: "Operators" },
        { id: "control-flow", label: "Control Flow" },
      ]
    },
    {
      title: "Data Structures",
      icon: Database,
      items: [
        { id: "lists", label: "Lists" },
        { id: "dictionaries", label: "Dictionaries" },
        { id: "sets", label: "Sets & Tuples" },
      ]
    },
    {
      title: "Functions",
      icon: Code,
      items: [
        { id: "functions", label: "Defining Functions" },
        { id: "lambdas", label: "Lambda Functions" },
        { id: "decorators", label: "Decorators" },
      ]
    },
    {
      title: "Advanced",
      icon: Zap,
      items: [
        { id: "classes", label: "Classes & OOP" },
        { id: "modules", label: "Modules & Packages" },
        { id: "error-handling", label: "Error Handling" },
      ]
    }
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <ScrollArea className="h-full py-6 pl-6 pr-6">
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={section.title}>
              <div className="flex items-center space-x-2 mb-3">
                <section.icon className="h-4 w-4 text-accent" />
                <h4 className="font-semibold text-sm text-sidebar-foreground">{section.title}</h4>
              </div>
              <div className="space-y-1 ml-6">
                {section.items.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start h-8 px-2 text-sm"
                    onClick={() => onSectionChange(item.id)}
                  >
                    <ChevronRight className="mr-2 h-3 w-3" />
                    {item.label}
                  </Button>
                ))}
              </div>
              {index < sections.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;