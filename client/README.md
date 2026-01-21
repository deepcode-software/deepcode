# Deepcode Academy Documentation Website

A modern, clean, and minimal documentation website that automatically fetches and renders Markdown lessons from GitHub.

![Deepcode Academy](https://img.shields.io/badge/Built%20with-React-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind-38B2AC?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Powered%20by-Vite-646CFF?style=flat-square&logo=vite)

## ✨ Features

- 📚 **GitHub Integration** - Automatically fetches Markdown documentation from your GitHub repository
- 🎨 **Modern UI** - Clean, minimal design with dark/light mode support
- 🔍 **Powerful Search** - Client-side fuzzy search across all documentation
- 💻 **Syntax Highlighting** - Beautiful code blocks with copy-to-clipboard functionality
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Loading** - Optimized performance with caching and code splitting
- ♿ **Accessible** - Keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- A GitHub repository with Markdown documentation

### Installation

1. **Clone the repository**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure GitHub repository**
   
   Copy `.env.example` to `.env` and update with your repository details:
   ```env
   VITE_GITHUB_REPO_OWNER=your-github-username
   VITE_GITHUB_REPO_NAME=your-repository-name
   VITE_GITHUB_BRANCH=main
   VITE_GITHUB_DOCS_PATH=docs
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to http://localhost:5173/

## 📁 Repository Structure

Your GitHub repository should follow this structure:

```
your-repo/
└── docs/
    ├── python-basics/
    │   ├── introduction.md
    │   ├── variables.md
    │   └── functions.md
    ├── web-development/
    │   ├── html-basics.md
    │   ├── css-styling.md
    │   └── javascript-intro.md
    └── advanced-topics/
        └── algorithms.md
```

The website will automatically:
- Detect courses from folder names (e.g., `python-basics` → "Python Basics")
- List all `.md` files as lessons
- Generate navigation tree
- Create search index

## 📝 Writing Documentation

### Markdown Support

We support **GitHub Flavored Markdown** with additional features:

#### Headings
```markdown
# H1 Heading
## H2 Heading
### H3 Heading
```

Headings automatically get anchor links for direct navigation.

#### Code Blocks

````markdown
```javascript
function hello() {
  console.log('Hello, World!');
}
```
````

Supported languages: JavaScript, Python, HTML, CSS, Bash, and many more.

#### Tables

```markdown
| Feature | Status |
|---------|--------|
| Search  | ✅     |
| Dark Mode | ✅   |
```

#### Images

```markdown
![Alt text](./images/screenshot.png)
```

#### Links

```markdown
[Link text](https://example.com)
[Internal link](./another-lesson.md)
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Fonts

Currently using:
- **Inter** for UI text
- **JetBrains Mono** for code

To change fonts, update `index.css` and `tailwind.config.js`.

### Logo

Replace the logo in `Header.jsx`:

```jsx
<div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg">
  {/* Your logo here */}
</div>
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_GITHUB_REPO_OWNER` | GitHub username or organization | `your-username` |
| `VITE_GITHUB_REPO_NAME` | Repository name | `your-repo` |
| `VITE_GITHUB_BRANCH` | Branch to fetch from | `main` |
| `VITE_GITHUB_DOCS_PATH` | Path to docs folder | `docs` |
| `VITE_GITHUB_TOKEN` | Personal access token (optional, for private repos) | - |

### GitHub API Rate Limits

- **Without authentication**: 60 requests/hour
- **With authentication**: 5,000 requests/hour

For production use, it's recommended to provide a `VITE_GITHUB_TOKEN`.

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### GitHub Pages

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to GitHub Pages
3. Configure base URL in `vite.config.js` if needed

### Other Platforms

The built `dist/` folder can be deployed to:
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting service

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` / `Cmd+K` | Open search |
| `↑` `↓` | Navigate search results |
| `Enter` | Open selected result |
| `Esc` | Close search modal |

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **react-markdown** - Markdown to React components
- **remark-gfm** - GitHub Flavored Markdown support
- **react-syntax-highlighter** - Code syntax highlighting
- **Fuse.js** - Fuzzy search library
- **lucide-react** - Beautiful icon set

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Tips

1. **Cache Strategy**: Content is cached for 24 hours in localStorage. Clear your browser cache if content doesn't update.

2. **Private Repositories**: Add a GitHub Personal Access Token to the `VITE_GITHUB_TOKEN` environment variable.

3. **SEO**: For better SEO, consider implementing server-side rendering with Next.js or Astro.

4. **Performance**: The search index is built on the client side. For large documentation sites, consider pre-building the index at build time.

## 📞 Support

If you encounter any issues or have questions, please:
- Check the [walkthrough documentation](./walkthrough.md)
- Open an issue on GitHub
- Contact support at hello@deepcodeacademy.com

---

**Built with ❤️ for developers by developers**
