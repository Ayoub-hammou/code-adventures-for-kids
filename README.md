# CodeKids Lab — Learn Programming Through Games

A fun, interactive educational platform where kids learn programming fundamentals through mini-games. Master variables, loops, conditions, and error handling while playing engaging games with multilingual support (English, French, Dutch).

## 🎮 Available Games

1. **Guess the Number** 🎯 - Variables, Conditions, Error Handling
2. **Palindrome Checker** 🔁 - Loops, Conditions
3. **Choose Your Adventure** 🗺️ - Variables, Conditions
4. **4 in a Row** 🔴 - Loops, Conditions
5. **Mastermind** 🎨 - Variables, Loops, Conditions
6. **Rock Paper Scissors** ✊ - Variables, Conditions
7. **Fizz Buzz** 🔢 - Loops, Conditions
8. **Simon Says** 🧠 - Variables, Loops
9. **Safe Calculator** 🧮 - Variables, Error Handling

## 🚀 Getting Started

### Prerequisites

You need **Node.js and npm** installed on your machine. npm comes bundled with Node.js.

#### Installation by Operating System

**🍎 macOS (using Homebrew):**

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js (includes npm)
brew install node

# Verify installation
node --version  # Should show v18 or higher
npm --version   # Should show 9 or higher
```

**🪟 Windows:**

1. Download the installer from [nodejs.org](https://nodejs.org/)
   - Choose the LTS (Long Term Support) version
   - Download the `.msi` file for Windows
2. Run the installer and follow the setup wizard
3. Accept all defaults and click "Install"
4. Restart your computer
5. Open PowerShell or Command Prompt and verify:
   ```bash
   node --version  # Should show v18 or higher
   npm --version   # Should show 9 or higher
   ```

**🐧 Linux:**

```bash
# For Ubuntu/Debian
sudo apt-get update
sudo apt-get install nodejs npm

# For Fedora
sudo dnf install nodejs npm

# Verify installation
node --version  # Should show v18 or higher
npm --version   # Should show 9 or higher
```

### Run Locally

```bash
# Navigate to the project directory
cd code-adventures-for-kids

# Install dependencies
npm install

# Start development server (will watch for changes automatically)
npm run dev

# The app will be available at http://localhost:5173
```

### Build for Production

```bash
# Build the optimized production version
npm run build

# Preview the production build locally
npm run preview
```

---

## 🌐 Hosting on Your Local Network

Once you have the app running locally, you can share it with other machines on the same network:

### Step 1: Find Your Machine's IP Address

**On macOS/Linux:**

```bash
# Find your local IP (usually looks like 192.168.X.X)
ifconfig | grep "inet " | grep -v 127.0.0.1

# Or use this simpler command:
hostname -I  # Linux
ipconfig getifaddr en0  # macOS
```

**On Windows:**

```bash
ipconfig
# Look for "IPv4 Address" under your active connection
```

### Step 2: Run the Dev Server on All Network Interfaces

You need to tell npm to tell the server to listen on all network interfaces:

```bash
npm run dev -- --host 0.0.0.0
# Access from same network: http://YOUR_IP:5173
```

### Step 3: Access from Other Machines

On any other computer or device on the same network, open a browser and visit:

```
http://YOUR_IP:5173
```

**Example:**

- Your machine's IP: `192.168.1.100`
- Access URL from other machines: `http://192.168.1.100:5173`

### Network Firewall

If you can't connect from other machines, your firewall might be blocking the connection:

**On macOS:**

- System Preferences → Security & Privacy → Firewall Options
- Allow incoming connections

**On Windows:**

- Windows Defender Firewall → Allow an app through firewall
- Allow the Node.js or Bun process

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TanStack Router
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **State Management**: TanStack React Query
- **Internationalization**: Custom i18n (EN, FR, NL)
- **Forms**: React Hook Form + Zod validation
- **Server Runtime**: Cloudflare Workers compatible

---

## 📁 Project Structure

```
src/
├── routes/              # Game pages and routes
│   ├── index.tsx       # Home page with game list
│   ├── guess.tsx       # Guess the Number game
│   ├── palindrome.tsx  # Palindrome Checker
│   ├── adventure.tsx   # Choose Your Adventure
│   ├── connect4.tsx    # 4 in a Row
│   ├── mastermind.tsx  # Mastermind
│   ├── rps.tsx         # Rock Paper Scissors
│   ├── fizzbuzz.tsx    # Fizz Buzz
│   ├── simon.tsx       # Simon Says
│   ├── calculator.tsx  # Safe Calculator
│   └── concepts.$concept.tsx  # Concept pages
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── Header.tsx     # Main navigation
│   ├── GameLayout.tsx # Game wrapper component
│   └── Onboarding.tsx # User setup
├── lib/               # Utilities and helpers
│   ├── i18n.tsx      # Internationalization
│   ├── utils.ts      # Helper functions
│   └── error-capture.ts # Error handling
└── styles.css        # Global styles
```

---

## 🎓 Development

### Commands

```bash
# Install dependencies (run once)
npm install

# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

### Adding a New Game

1. Create a new route file in `src/routes/[gamename].tsx`
2. Use the `GameLayout` component for consistent styling
3. Add the game to the games list in `src/routes/index.tsx`
4. Support internationalization using the `useLang()` hook

---

## 🌍 Languages

The app is fully internationalized with support for:

- 🇬🇧 English
- 🇫🇷 French
- 🇳🇱 Dutch

---

## 📝 License

This project is created by Ayoub Hammou. © CodeKids Lab

---

## ❓ Troubleshooting

### "Port already in use"

```bash
# Change the port when running
bun run dev -- --port 3000
npm run dev -- --port 3000
```

### "Can't connect from other machines"

1. Verify both machines are on the same WiFi network
2. Check the firewall (see section above)
3. Ensure you're using the correct IP (not `localhost`)
4. Run server with `--host 0.0.0.0` flag

### "Module not found errors"

```bash
# Clear node_modules and reinstall
rm -rf node_modules
bun install   # or: npm install
```

---

## 🐛 Reporting Issues

If you find any bugs or have suggestions for new games, please create an issue in the project repository.

Happy coding! 🚀
