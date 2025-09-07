# AI Chatbot with Canvas Code Editing

An **interactive AI-powered chatbot** with a **canvas feature for code block editing**, built using **Vercel's AI SDK** and the **Gemini model**. This project enables users to chat with an AI assistant and edit code in real-time within interactive code blocks.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Demo](#demo)
- [Features](#features)
- [Upcoming Features](#upcoming-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Project Overview
This project combines an AI chatbot and an **interactive code editor** on a canvas to provide:
- Natural language AI responses.
- Code suggestions, explanations, and corrections.
- Real-time code block editing with a canvas interface.
- Syntax-highlighted code blocks with multi-language support.

Powered by **Vercel AI SDK** and the **Gemini model**, the chatbot offers intelligent code assistance and general conversation capabilities.

---

## Demo
![Chatbot Demo](./assets/demo.png)  
*Screenshot of the chatbot interface with code block canvas editor.*

---

## Features

### ✅ Current Features
- **AI Chatbot**: Engages users in intelligent conversations.
- **Canvas Code Block Editing**: Interactive editing of code within the chat.
- **Syntax Highlighting**: Code blocks display properly with language-specific syntax.
- **Streaming Responses**: AI answers are streamed in real-time.
- **Multi-language Code Support**: Supports multiple programming languages in code blocks.
- **Vercel AI SDK Integration**: Leveraging Gemini model for accurate responses.

### 🚀 Upcoming Features
- **Authentication**: User login for personalized chat sessions.
- **Chat Storage**: Save chat history for future reference.
- **Chat Session Management**: Manage multiple sessions per user.
- **Enhanced Code Execution**: Execute code directly within the canvas editor.

---

## Tech Stack
- **Frontend**: React.js, TypeScript, Tailwind CSS
- **AI SDK**: [Vercel AI SDK](https://vercel.com/docs/ai)
- **AI Model**: Gemini
- **Code Editing**: Canvas-based code editor
- **Syntax Highlighting**: `react-syntax-highlighter`
- **Deployment**: Vercel

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-chatbot-canvas.git
cd ai-chatbot-canvas

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
