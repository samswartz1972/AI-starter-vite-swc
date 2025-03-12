# Windows 10 Setup Guide

## Detailed Installation Steps

1. **Install Node.js and npm**
   - Download the LTS version from [Node.js official website](https://nodejs.org/)
   - Run the installer and follow the prompts
   - Verify installation by opening Command Prompt and typing:
     ```
     node --version
     npm --version
     ```

2. **Install Git**
   - Download from [Git official website](https://git-scm.com/download/win)
   - Run the installer with default options
   - Verify installation:
     ```
     git --version
     ```

3. **Clone the repository**
   - Open Command Prompt
   - Navigate to the directory where you want to store the project
   - Run:
     ```
     git clone https://github.com/yourusername/social-commerce-platform.git
     cd social-commerce-platform
     ```

4. **Install dependencies**
   ```
   npm install
   ```

5. **Start the development server**
   ```
   npm run dev
   ```

6. **Access the application**
   - Open your browser and navigate to: `http://localhost:5173/`

## Troubleshooting Common Windows Issues

### Port 5173 Already in Use

If port 5173 is already in use, you can specify a different port:

```
npm run dev -- --port 3000
```

This will run the application on port 3000 instead.

### Node.js Memory Issues

If you encounter memory-related errors:

1. Using Command Prompt:
   ```
   set NODE_OPTIONS=--max-old-space-size=4096
   npm run dev
   ```

2. Using PowerShell:
   ```
   $env:NODE_OPTIONS="--max-old-space-size=4096"
   npm run dev
   ```

### Git Authentication Issues

If you encounter authentication issues with Git:

1. Use GitHub Desktop instead: [Download GitHub Desktop](https://desktop.github.com/)
2. Or set up SSH keys: [GitHub SSH Key Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### Vite Hot Module Replacement Not Working

If changes aren't reflecting in the browser:

1. Check your firewall settings
2. Try running with the `--force` flag:
   ```
   npm run dev -- --force
   ```

### Node.js Version Compatibility

This project requires Node.js v16 or higher. If you have an older version:

1. Install NVM for Windows: [NVM-Windows](https://github.com/coreybutler/nvm-windows)
2. Install and use the correct Node.js version:
   ```
   nvm install 16
   nvm use 16
   ```

## Running in Production Mode

To test the production build locally:

```
npm run build
npm run preview
```

This will build the project and serve it on a local server, typically on port 4173.
