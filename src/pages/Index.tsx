import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import DocSection from "@/components/DocSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background dark">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={sidebarOpen}
        />
        
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <div className="flex-1 md:ml-0">
          <DocSection section={activeSection} />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="gradient-python p-1.5 rounded shadow-python">
                <div className="w-4 h-4 bg-primary-foreground rounded-sm" />
              </div>
              <span className="text-sm text-muted-foreground">
                Python Documentation © 2024
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Built with ❤️ for Python developers
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
