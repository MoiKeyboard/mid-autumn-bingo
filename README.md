<div align="center">
  <h1>🏮 Mid-Autumn Festival Bingo Microsite</h1>
  <p>A modern, containerized React microsite featuring a digital 9-square Bingo Card for festival minigames.</p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/React-18.2-blue.svg?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.0-purple.svg?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TypeScript-5.2-blue.svg?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TensorFlow.js-4.17-orange.svg?style=for-the-badge&logo=tensorflow" alt="TensorFlow.js" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED.svg?style=for-the-badge&logo=docker" alt="Docker" />
</div>

<br />

## 📖 Overview

Built for the **Mid-Autumn Festival 2026**, this interactive microsite gamifies the festival experience. Players must complete a digital Bingo Card by participating in 5 physical (offline) games and 4 digital (online) games directly on their mobile devices.

### ✨ Key Features

- **📱 Offline First & Stateless**: No backend database required. User progress is securely saved in the browser's `localStorage`, preventing data loss upon accidental reloads.
- **🧠 Edge AI Vision**: The "Moon Photo Hunt" utilizes a client-side **TensorFlow.js MobileNet V3** model to verify photos instantly within the browser, ensuring privacy and eliminating server compute costs.
- **🎨 Premium Aesthetics**: Designed with modern UI/UX principles featuring a dark glassmorphism theme, smooth micro-animations, and vibrant gold accents.
- **🐳 Cloud-Ready**: Fully containerized using a multi-stage Docker build with Nginx, ready for zero-config deployment to GCP Cloud Run.

---

## 🎮 The Minigames

The Bingo grid features 9 minigames. Players must complete any row, column, or diagonal to win.

### 🌐 Online Games (Auto-stamped)
1. **Tangram Puzzle**: A drag-and-drop geometric puzzle to assemble a lantern silhouette.
2. **Festival Quiz**: A multiple-choice trivia challenge about Mid-Autumn lore.
3. **Find the Pair**: A classic memory matching card game.
4. **Moon Photo Hunt**: An AI-powered scavenger hunt that uses device cameras to detect round or jade-colored objects.

### 🎪 Offline Games (Admin-stamped)
*Completed in person and stamped via an Admin PIN.*
1. **Lantern Riddles**
2. **Mooncake Dice**
3. **Pot Pitching**
4. **Chopstick Transfer**
5. **Shuttlecock Kick**

---

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) (Recommended)
- [Node.js 18+](https://nodejs.org/) (For local development)

### Running with Docker

1. **Build the image:**
   ```bash
   docker build -t mid-autumn-bingo .
   ```
2. **Run the container:**
   ```bash
   docker run -p 8080:8080 mid-autumn-bingo
   ```
3. Open `http://localhost:8080` in your browser.

### Running with Node.js (Development)

```bash
npm install
npm run dev
```

---

## ☁️ Deployment (GCP Cloud Run)

This application features a fully automated, **Zero-Secrets CI/CD Pipeline** powered by GitHub Actions and Google Cloud Workload Identity Federation (WIF).

### How it works
1. **Push to `main`**: Any code pushed to the `main` branch automatically triggers the `.github/workflows/deploy.yml` pipeline.
2. **Zero-Trust Auth**: The pipeline securely authenticates to Google Cloud using a hardcoded WIF Provider, eliminating the need to store sensitive Service Account JSON keys in GitHub Secrets.
3. **Build & Push**: The Docker container is built and pushed to the `asia-southeast1` Artifact Registry.
4. **Deploy**: The latest image is instantly rolled out to the serverless Cloud Run instance.

No manual `gcloud` commands or secret management required!

## 🛠️ Development Architecture

- `src/games/`: Contains the individual React components for each online minigame.
- `src/utils/vision.ts`: Houses the TensorFlow.js MobileNet V3 integration logic.
- `src/components/AdminPinModal.tsx`: Manages the secure PIN entry for offline games.
- `Dockerfile`: Multi-stage build process compiling the Vite app and serving it via lightweight Nginx Alpine.

<div align="center">
  <p>Built for the Mid-Autumn Festival 2026</p>
</div>

---

## 🤝 Contributing

Contributions are always welcome! Since this is an open-source project, please feel free to fork the repository, open a pull request, or submit issues if you find bugs or want to add new minigames.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
