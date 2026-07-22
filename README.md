# AI Companion Chat

> A Next.js + TypeScript front-end that lets users chat with an AI companion powered by an LLM API.

## Status
🚧 In progress — Phase: Setup

## Overview
AI Companion Chat is a front-end web application that provides an intuitive, chat-based interface for interacting with an AI language model. Users can send messages, receive contextual responses, and maintain conversation history in the browser. The project demonstrates core front-end AI engineering skills: API integration, state management, streaming responses, and building responsive, accessible UI components.

## Tech Stack
- Runtime: Node.js (LTS)
- Language: TypeScript
- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS
- State Management: React Context + hooks
- AI tooling: Claude Code (CLI assistant)

## Getting Started

### Prerequisites
- Node.js (LTS) — v24+
- Git
- An API key from an LLM provider (e.g., OpenAI, Anthropic)

### Installation
```bash
git clone <repo-url>
cd <repo-name>
npm install
```

### Running locally
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
.
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── styles/
├── public/
├── README.md
├── CLAUDE.md
├── LICENSE
└── .gitignore
```

## Roadmap
- [x] Phase 1: Setup — repo, tooling, CI conventions
- [ ] Phase 2: Core chat UI and API integration
- [ ] Phase 3: Streaming responses and conversation history
- [ ] Phase 4: Testing and deployment

## Contributing
This is a solo capstone project, but suggestions and issues are welcome.

## License
MIT — see [LICENSE](LICENSE)
