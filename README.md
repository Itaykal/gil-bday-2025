# 🎂 EPIC BIRTHDAY BLESSING 🎂

The most unhinged, chaotic, and absolutely legendary birthday website you'll ever deploy.

## ✨ What This Is

A React-based birthday celebration website featuring:
- 🎊 Confetti explosion
- 🌈 Rainbow gradient backgrounds with smooth animations
- 💫 Floating emojis everywhere
- 🎂 Interactive animated cake with VINE BOOM sounds
- 👑 Gen-Z certified nerdy chaotic blessings
- 🔥 Maximum chaos energy
- ✨ Framer Motion powered animations
- 🎮 Each letter animates individually on load
- 🌀 Spring physics on all interactions
- 📱 Fully responsive for mobile

## 🚀 Quick Start

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add the vine boom sound (already done if you downloaded this):**
   - The vine boom sound is already in `public/vine-boom.mp3`
   - If you want to replace it, download from https://www.myinstants.com/en/instant/vine-boom-sound-70972/
   - Or run:
     ```bash
     curl -o public/vine-boom.mp3 "https://www.myinstants.com/media/sounds/vine-boom.mp3"
     ```

### Local Development

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

## 🌐 Deploy to GitHub Pages

### One-Time Setup

1. **Create a GitHub repository** for this project (if you haven't already)

2. **Important**: Update the `base` path in `vite.config.js`:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/YOUR-REPO-NAME/', // Change this to your actual repo name!
   })
   ```

3. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - birthday chaos incoming"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```

### Deploy

Just run:

```bash
npm run deploy
```

This will:
- Build your site
- Create a `gh-pages` branch (if it doesn't exist)
- Push the built files to that branch

### Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** > **Pages**
3. Under "Source", select the `gh-pages` branch
4. Click **Save**
5. Wait a minute or two, then visit: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## 🎨 Customization

Want to personalize it? All text content is now in one easy-to-edit file!

### In `src/content.json`: ⭐ EDIT THIS FILE

This JSON file contains ALL the text for easy customization:

```json
{
  "title": "HAPPY BIRTHDAY",           // Main title
  "blessings": [...],                   // The chaotic blessing badges
  "wishesTitle": "MAY YOUR YEAR...",   // Title above wishes
  "wishes": [...],                      // Birthday wishes list
  "cakeHint": "(click the cake...)",   // Hint text under cake
  "secretMessage": {                    // What shows after 5 clicks
    "title": "...",
    "lines": [...]
  },
  "footer": {                           // Bottom text
    "main": "HAPPY BIRTHDAY 🎂",
    "subtitle": "..."
  },
  "atla": {                             // ATLA easter egg content
    "title": "...",
    "quotes": [...],
    "elements": [...],
    ...
  }
}
```

Just edit this file to completely customize all the text!

### In `src/App.css`:

- Colors, animations, timing - go wild!
- Adjust emoji sizes and positions

### In `index.html`:

- Change the page title

### Vine Boom Sound

- Replace `public/vine-boom.mp3` with any sound effect you want
- Just make sure it's named `vine-boom.mp3`

## 🎭 Features

- **Confetti**: Infinite confetti because why not
- **Framer Motion Animations**: Smooth spring physics on everything
  - Title letters animate in one by one
  - Main content spins in from offscreen
  - Blessings pop in with bouncy animations
  - Wishes slide in from alternating sides
  - Hover effects on every interactive element
- **Interactive cake**: Click it 5 times to unlock a secret message + VINE BOOM sound
- **Floating emojis**: 20+ emojis floating up the screen at random
- **Spinning corner emojis**: Smooth rotation animations
- **Letter-by-letter animations**: Each character in the title is individually animated and hoverable
- **Responsive**: Works perfectly on mobile (the chaos is universal)

## 📱 Mobile Friendly

The site is fully responsive and looks great on phones, tablets, and desktops. The chaos transcends device boundaries.

## 🎵 Audio

**VINE BOOM**: Each cake click triggers a satisfying vine boom sound effect (using the `use-sound` library). Click it 5 times for the secret message!

## 🥚 Easter Eggs

**Avatar: The Last Airbender Secret**:
- **Desktop**: Type "yipyip" anywhere on the page
- **Mobile**: Tap the top-left corner emojis (🎉✨🎂) 3 times
- Unlocks a special ATLA-themed birthday message with the four elements!
- Click the close button or click outside to dismiss

## 🧠 The Chaos Level

This website operates at maximum chaos capacity. It includes:
- Comic Sans MS font (the choice of legends)
- Excessive emojis (there's no such thing as too many)
- Gen-Z slang (no cap fr fr)
- Chaotic animations (everything moves)
- Glitter and confetti (obviously)
- Hidden secrets (gotta click that cake)

## 📝 License

Do whatever you want with this. Copy it, modify it, make it even more chaotic. The world needs more unhinged birthday websites.

## 💖 Credits

Made with maximum chaos energy and zero chill.

---

**Remember**: The base path in `vite.config.js` MUST match your repository name, or the deployment won't work properly on GitHub Pages!
