import { Button } from "@/components/ui/button";
import { Search, Menu, BookOpen } from "lucide-react";

const Header = ({ onMenuToggle }: { onMenuToggle: () => void }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden mr-2"
          onClick={onMenuToggle}
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="gradient-python p-2 rounded-lg shadow-python">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Python Docs</span>
            <span className="text-xs text-muted-foreground">Easy Learning Guide</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" className="relative h-8 w-full justify-start rounded-md bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64">
              <Search className="mr-2 h-4 w-4" />
              <span>Search docs...</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;