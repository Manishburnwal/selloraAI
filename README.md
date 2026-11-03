<p align="center">
  <img src="./assets/banner.svg" alt="SELLORAAI terminal banner" width="100%" />
</p>

<p align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=20&duration=2800&pause=900&color=FF5A1F&center=true&vCenter=true&width=760&lines=%3E+Buyers+discover%2C+purchase+and+download+digital+products;%3E+Sellers+manage+listings+and+sales;%3E+Microservices+%7C+API+Gateway+%7C+Redis+%7C+Docker" alt="Typing animation" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-0a0604?style=for-the-badge&logo=react&logoColor=FF5A1F&labelColor=0a0604&color=FF5A1F" />
  <img src="https://img.shields.io/badge/TypeScript-0a0604?style=for-the-badge&logo=typescript&logoColor=FF5A1F&labelColor=0a0604&color=FF5A1F" />
  <img src="https://img.shields.io/badge/Node.js-0a0604?style=for-the-badge&logo=nodedotjs&logoColor=FF5A1F&labelColor=0a0604&color=FF5A1F" />
  <img src="https://img.shields.io/badge/MongoDB-0a0604?style=for-the-badge&logo=mongodb&logoColor=FF5A1F&labelColor=0a0604&color=FF5A1F" />
  <img src="https://img.shields.io/badge/Redis-0a0604?style=for-the-badge&logo=redis&logoColor=FF5A1F&labelColor=0a0604&color=FF5A1F" />
  <img src="https://img.shields.io/badge/Docker-0a0604?style=for-the-badge&logo=docker&logoColor=FF5A1F&labelColor=0a0604&color=FF5A1F" />
  <img src="https://img.shields.io/badge/AWS-0a0604?style=for-the-badge&logo=amazonaws&logoColor=FF5A1F&labelColor=0a0604&color=FF5A1F" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/services-5-FF5A1F?style=flat-square&labelColor=0a0604" />
  <img src="https://img.shields.io/badge/architecture-microservices-FFB000?style=flat-square&labelColor=0a0604" />
  <img src="https://img.shields.io/badge/cache-redis-FF2D2D?style=flat-square&labelColor=0a0604" />
  <img src="https://img.shields.io/badge/run-docker%20compose-FF8A00?style=flat-square&labelColor=0a0604" />
  <img src="https://img.shields.io/badge/status-open%20source-FF5A1F?style=flat-square&labelColor=0a0604" />
</p>

<p align="center">
  <a href="#-architecture"><code>architecture</code></a> ·
  <a href="#-what-this-project-demonstrates"><code>skills</code></a> ·
  <a href="#-run-it-in-2-minutes"><code>quick-start</code></a> ·
  <a href="#-about-the-author"><code>author</code></a>
</p>

<img src="./assets/divider.svg" width="100%" />

## ✨ The Pitch

Most portfolio projects are single-server CRUD apps. **SELLORAAI is built the way production systems are:** independent services behind an API gateway, Redis caching for performance, everything containerised with Docker, and cloud-ready for AWS.

```ts
// sellorai.config.ts
export const sellorai = {
  type: "full-stack marketplace",
  flow: ["sign up", "browse", "pay", "download"],
  backend: "each concern runs as its own service",
  stack: ["react", "node", "mongodb", "redis", "docker", "aws"],
} as const;
```

<img src="./assets/divider.svg" width="100%" />

## 🎯 What This Project Demonstrates

| Skill | Where to see it |
|---|---|
| **Microservices design** | Separate `auth`, `product`, `order` and `ai` services in `backend/services/` |
| **API Gateway pattern** | Single entry point routing all client traffic in `backend/gateway/` |
| **Authentication & authorization** | JWT-based auth service protecting routes |
| **Caching strategy** | Shared Redis utility in `backend/shared/redis/` used across services |
| **Payment & order workflow** | Order service handling purchase flow and digital download access |
| **TypeScript end to end** | Typed React frontend and Node/Express backend |
| **Modern UI engineering** | React + Shadcn UI component system |
| **DevOps basics** | Docker and Docker Compose for one-command startup, AWS deployment ready |

<img src="./assets/divider.svg" width="100%" />

## 🚀 Features

| | Feature | Details |
|---|---|---|
| 🔐 | **Authentication** | Secure sign-up, login and role-based access |
| 🛍️ | **Marketplace** | Browse and explore digital products |
| 📦 | **Product management** | Sellers create and manage listings |
| 💳 | **Payments** | Purchase flow with payment integration |
| 🧾 | **Orders** | Order creation and purchase history |
| 📥 | **Digital downloads** | Access purchased files after payment |
| ⚡ | **Redis caching** | Faster responses on frequently read data |
| 🤖 | **AI service** | Dedicated, isolated service for AI features |

<img src="./assets/divider.svg" width="100%" />

## 🏛️ Architecture

```mermaid
%%{init: {'theme':'base','themeVariables':{'primaryColor':'#1a0d08','primaryTextColor':'#ffe8d6','primaryBorderColor':'#ff5a1f','lineColor':'#ff8a00','secondaryColor':'#2a1710','tertiaryColor':'#0a0604','clusterBkg':'#0f0805','clusterBorder':'#ff5a1f'}}}%%
flowchart TB
    U["👤 Users"] --> F["Frontend<br/>React + TypeScript + Shadcn UI"]
    F --> G["API Gateway"]

    G --> A["Auth Service"]
    G --> P["Product Service"]
    G --> O["Order Service"]
    G --> AI["AI Service"]

    A --> M[("MongoDB")]
    P --> M
    O --> M

    A --> R[("Redis Cache")]
    P --> R
    O --> R

    O --> PG["Payment Provider"]

    subgraph Backend["Backend: Dockerised Microservices"]
        G
        A
        P
        O
        AI
    end
```

### Services

| Service | Responsibility |
|---|---|
| **Gateway** | Single entry point; routes and forwards API requests |
| **Auth** | Registration, login, tokens, authorization |
| **Product** | Product listings and seller catalogue |
| **Order** | Purchases, order state, download access |
| **AI** | Isolated service for AI-related features |
| **Shared / Redis** | Reusable Redis connection utility shared by services |

### 🧩 Design Decisions

- **Why microservices?** Each domain (auth, products, orders, AI) can be developed, deployed and scaled independently.
- **Why an API Gateway?** The frontend talks to one endpoint, which keeps cross-cutting concerns in one place and hides internal service layout.
- **Why Redis?** Reduces repeated database reads on hot paths and speeds up responses.
- **Why Docker Compose?** The whole system starts with one command, so anyone can run it locally.

<img src="./assets/divider.svg" width="100%" />

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React.js, TypeScript, Shadcn UI |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB |
| **Cache** | Redis |
| **Architecture** | Microservices, API Gateway, REST APIs |
| **DevOps** | Docker, Docker Compose |
| **Cloud** | AWS |

<img src="./assets/divider.svg" width="100%" />

## 📂 Project Structure

```bash
SELLORAAI/
├── backend/
│   ├── gateway/              # API Gateway (single entry point)
│   ├── services/
│   │   ├── auth/             # Authentication & authorization
│   │   ├── product/          # Product catalogue
│   │   ├── order/            # Orders, payments, downloads
│   │   └── ai/               # AI-related features
│   ├── shared/
│   │   └── redis/redis.js    # Shared Redis connection
│   ├── docker-compose.yml
│   └── package.json
├── frontend/                 # React + TypeScript client
├── assets/                   # Animated README banner and divider
└── README.md
```

<img src="./assets/divider.svg" width="100%" />

## ⚡ Run It in 2 Minutes

**Prerequisites:** Docker and Docker Compose (Node.js 18+ if running without Docker).

```bash
# 1. Clone
git clone <YOUR_REPOSITORY_URL>
cd SELLORAAI

# 2. Add environment variables (see below)

# 3. Start the whole backend
cd backend
docker compose up --build

# 4. Start the frontend (new terminal)
cd frontend
npm install
npm run dev
```

What a healthy boot looks like:

```text
$ docker compose up --build
[ OK ] gateway · auth · product · order · ai
[ OK ] redis cache connected · mongodb ready
[ >> ] sellorai is live → http://localhost:5173
```

<details>
<summary><b>🔧 Environment variables</b></summary>

Create `.env` files for the frontend and each backend service:

```env
PORT=
MONGODB_URI=
JWT_SECRET=
REDIS_URL=
PAYMENT_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

Variables may differ per service. Never commit secrets to the repository.
</details>

<details>
<summary><b>🧑‍💻 Run without Docker</b></summary>

```bash
cd backend
npm install
npm run dev        # start each service via its dev script
```

Requires local MongoDB and Redis instances.
</details>

<img src="./assets/divider.svg" width="100%" />

## 🗺️ Roadmap

- [x] Microservices architecture with API Gateway
- [x] Authentication and authorization
- [x] Product and order management
- [x] Redis caching layer
- [x] Dockerised setup
- [ ] Automated tests and CI pipeline (GitHub Actions)
- [ ] API documentation (Swagger / OpenAPI)
- [ ] Rate limiting and centralised logging
- [ ] AI-powered product recommendations and search
- [ ] Full AWS deployment (ECS / EC2) with IaC

<img src="./assets/divider.svg" width="100%" />

## 📚 What I Learned

- Splitting a monolith into services with clear boundaries and a gateway in front.
- Where caching helps, and how to share a Redis layer across services.
- Securing a multi-service system with centralised authentication.
- Packaging and running multi-container apps with Docker Compose.

<img src="./assets/divider.svg" width="100%" />

## 👨‍💻 About the Author

**Your Name**: Full-Stack Developer (React, Node.js, TypeScript)

I build scalable web applications and enjoy designing backend systems that are modular and maintainable.

📧 your.email@example.com  
💼 [LinkedIn](https://linkedin.com/in/your-profile)  
🌐 [Portfolio](https://your-portfolio.com)  
🐙 [GitHub](https://github.com/your-username)

> 🟢 **Open to full-stack / backend roles.** Feel free to reach out!

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:FFB000,50:FF5A1F,100:FF2D2D&height=120&section=footer" width="100%" />
</p>

<p align="center">
  ⭐ If you found this project interesting, please consider starring the repo!
</p>