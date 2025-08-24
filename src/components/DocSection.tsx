import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocSectionProps {
  section: string;
}

const DocSection = ({ section }: DocSectionProps) => {
  const content = {
    introduction: {
      title: "Introduction to Python",
      subtitle: "Welcome to the world of Python programming",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Python is a high-level, interpreted programming language known for its simplicity and readability. 
            It's perfect for beginners and powerful enough for professional development.
          </p>
          
          <Card className="p-6 gradient-code border-border">
            <h3 className="font-semibold mb-3 text-accent">Why Choose Python?</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Badge variant="secondary" className="mr-2 px-2 py-1">✓</Badge>
                Easy to learn and read
              </li>
              <li className="flex items-center">
                <Badge variant="secondary" className="mr-2 px-2 py-1">✓</Badge>
                Versatile - web development, data science, AI
              </li>
              <li className="flex items-center">
                <Badge variant="secondary" className="mr-2 px-2 py-1">✓</Badge>
                Large community and libraries
              </li>
              <li className="flex items-center">
                <Badge variant="secondary" className="mr-2 px-2 py-1">✓</Badge>
                Cross-platform compatibility
              </li>
            </ul>
          </Card>
        </div>
      )
    },
    variables: {
      title: "Variables & Data Types",
      subtitle: "Learn how to store and work with data in Python",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Variables in Python are containers for storing data values. Python has several built-in data types.
          </p>
          
          <Card className="p-4 bg-muted">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-semibold">Example: Basic Variables</h4>
              <Button size="sm" variant="outline" className="h-6 px-2">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <pre className="text-sm text-foreground overflow-x-auto">
{`# String
name = "Python"

# Integer  
age = 30

# Float
price = 19.99

# Boolean
is_active = True

# List
fruits = ["apple", "banana", "orange"]

# Dictionary
person = {"name": "Alice", "age": 25}`}
            </pre>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2 text-accent">String Operations</h4>
              <pre className="text-sm code-block">
{`name = "Python"
print(name.upper())  # PYTHON
print(name.lower())  # python
print(len(name))     # 6`}
              </pre>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-semibold mb-2 text-accent">Number Operations</h4>
              <pre className="text-sm code-block">
{`x = 10
y = 3
print(x + y)   # 13
print(x / y)   # 3.333...
print(x ** y)  # 1000`}
              </pre>
            </Card>
          </div>
        </div>
      )
    },
    functions: {
      title: "Defining Functions",
      subtitle: "Create reusable blocks of code",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Functions allow you to organize code into reusable blocks. They make your code more modular and easier to maintain.
          </p>
          
          <Card className="p-4 bg-muted">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-semibold">Basic Function Syntax</h4>
              <Button size="sm" variant="outline" className="h-6 px-2">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <pre className="text-sm text-foreground overflow-x-auto">
{`def greet(name):
    """Simple greeting function"""
    return f"Hello, {name}!"

# Call the function
message = greet("World")
print(message)  # Hello, World!`}
            </pre>
          </Card>

          <Card className="p-4 bg-muted">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-sm font-semibold">Functions with Default Parameters</h4>
              <Button size="sm" variant="outline" className="h-6 px-2">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <pre className="text-sm text-foreground overflow-x-auto">
{`def calculate_area(length, width=1):
    """Calculate area with default width"""
    return length * width

# Different ways to call
print(calculate_area(5))      # 5 (uses default width=1)
print(calculate_area(5, 3))   # 15`}
            </pre>
          </Card>
        </div>
      )
    }
  };

  const currentContent = content[section as keyof typeof content] || content.introduction;

  return (
    <main className="flex-1 py-6 px-6">
      <div className="max-w-4xl">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold gradient-python bg-clip-text text-transparent">
            {currentContent.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {currentContent.subtitle}
          </p>
        </div>
        
        {currentContent.content}
        
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Was this section helpful?
            </p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <ExternalLink className="mr-2 h-3 w-3" />
                Edit on GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DocSection;