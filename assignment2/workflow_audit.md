# FL-01: Workflow Audit & AI Toolkit Environment Setup

**Student Name**: Muhammad Saqib Tariq  
**Student ID**: 04072213009  
**Project**: MindGuard (Final Year Project - AI Mental Health Conversational Assistant)  
**Course Module**: AI Fluency (FL-01) | Phase: Setup  

---

## 1. Real-Week Workflow Audit

The following table categorizes 13 recurring tasks across computer science coursework, Final Year Project (**MindGuard**) development, and academic research. Tasks are classified into four distinct human-AI interaction tiers based on Ethan Mollick's task-allocation framework:

1. **Just me**: High-stakes, ethical, or deeply personal tasks where AI must not be trusted.
2. **Delegate to AI with review**: Standardized tasks where AI produces draft outputs, followed by strict human verification.
3. **Collaborate with AI**: Iterative, creative, or complex problem-solving where human and AI work side-by-side.
4. **Fully automate**: Deterministic, repetitive tasks executed via scripts or workflows without routine manual intervention.

### Workflow Classification Table

| # | Task Description | Domain | Category | One-Line Rationale |
|---|---|---|---|---|
| **1** | Validating suicidal intent & crisis escalation edge cases in MindGuard datasets | FYP (MindGuard) | **Just me** | Clinical risk and moral accountability require strictly human empathetic judgment without AI hallucination risk. |
| **2** | Defending FYP architecture during live faculty presentation & Q&A sessions | Academic | **Just me** | Academic defense tests personal subject mastery and spontaneous critical thinking that cannot be delegated. |
| **3** | Conducting literature reviews on transformer models for mental health NLP | Research | **Collaborate with AI** | AI rapidly summarizes papers while I cross-reference citations, check methodologies, and extract key insights. |
| **4** | Building React UI chat components (typing indicators, message bubbles, dark theme) | FYP (MindGuard) | **Delegate to AI with review** | AI generates clean UI boilerplate rapidly, which I review for accessibility, state sync, and edge cases. |
| **5** | Implementing Flask REST API endpoints for authentication and database sessions | FYP (MindGuard) | **Delegate to AI with review** | AI scaffolds standard backend controllers, requiring human review for security standards and database constraints. |
| **6** | Designing synthetic conversational test scenarios for safe chatbot responses | FYP (MindGuard) | **Collaborate with AI** | AI generates diverse scenario prompts while I refine empathetic phrasing and safety guardrails. |
| **7** | Debugging complex PyTorch model fine-tuning memory leaks and loss anomalies | ML / FYP | **Collaborate with AI** | AI suggests diagnostic strategies and fix patterns, which I evaluate against local GPU hardware limits. |
| **8** | Executing pytest unit test suites and model evaluation metrics pipelines | FYP / Backend | **Fully automate** | Test suites and evaluation scripts run deterministically via CI/CD runners without requiring manual intervention. |
| **9** | Formatting weekly Git commit logs and auto-generating project progress reports | Productivity | **Fully automate** | Git hooks and scripts parse structured commits to generate markdown changelogs automatically. |
| **10** | Drafting thesis sections (Literature Review, System Design & Architecture) | Academic / FYP | **Collaborate with AI** | AI aids structural flow and clarity, while technical accuracy remains strictly grounded in actual project code. |
| **11** | Converting raw JSON user chat logs into cleaned CSV format for training | Data Prep | **Delegate to AI with review** | AI writes data parsing scripts, which I verify for schema consistency, missing fields, and data integrity. |
| **12** | Reviewing ethical compliance documentation for human user study data privacy | Academic | **Just me** | Compliance with Institutional Review Board ethics requires explicit human responsibility and regulatory compliance. |
| **13** | Managing supervisor meeting agendas and daily technical task prioritization | Productivity | **Delegate to AI with review** | AI summarizes incoming emails and drafts agendas, which I quickly review and confirm before syncs. |

---

## 2. AI Toolkit Setup & Evidence Log

### Environment Verification Summary

- [x] **Claude Account (Anthropic)**: Account active; configured with custom Claude Project workspace.
- [x] **ChatGPT Account (OpenAI)**: Account active; utilized for multi-model response comparison and code auditing.
- [x] **Anthropic Academy**: Enrolled in *AI Fluency: Framework & Foundations*; completed **Module 1: Foundations of Human-AI Collaboration**.

### Anthropic Academy Evidence Screenshot



---

## 3. Claude Project Configuration

A dedicated **Claude Project** named **`MindGuard & Academic Copilot`** has been created with custom system instructions tailored to my identity, communication preferences, and current semester goals.

### System Instructions Configuration

```markdown
# Role & Identity
You are an expert AI software engineering and academic copilot assisting Muhammad Saqib Tariq, a Senior Computer Science student working on his Final Year Project: "MindGuard" (an intelligent conversational AI chatbot providing judgment-free mental health support, intent classification, and crisis detection).

# Communication & Tone Preferences
- **Tone**: Analytical, structured, concise, and engineering-focused. Avoid conversational filler or generic pleasantries.
- **Code Quality**: Write production-ready code with clean typing (TypeScript/React, Python 3.10+ type hints). Follow PEP 8 and modern frontend component patterns.
- **Mental Health Domain Safety**: Always maintain strict distinction between informative AI assistance and clinical advice. Emphasize ethical safety guardrails when designing NLP intent models.

# Current Goals
1. Finalize MindGuard's core NLP backend (Flask, PyTorch/HuggingFace transformers, MongoDB/PostgreSQL).
2. Refine the React web interface for smooth, responsive user interactions.
3. Write high-caliber academic thesis documentation and achieve master-level AI fluency across development workflows.
```

### Configured Claude Project Screenshot



## 4. Target Tasks & Success Definitions (FL-02 to FL-04)

Three tasks from the audit have been selected for deep-dive optimization in modules **FL-02**, **FL-03**, and **FL-04**. Below are their measurable "Done Well" criteria.

### Target Task 1: Literature Synthesis & Crisis Dataset Annotation (FL-02)
* **Category**: Collaborate with AI
* **Scope**: Summarizing current NLP research papers on suicide risk detection and annotating a 100-sample edge-case conversational dataset.
* **"Done Well" Definition (Measurable Success)**:
  1. **Time Efficiency**: Reduce literature synthesis time per paper from 60 minutes to 15 minutes while maintaining 100% accuracy on key findings, model architectures, and dataset metrics.
  2. **Annotation Accuracy**: Achieve >95% inter-annotator agreement between AI intent tags and clinical guideline benchmarks across all 100 test samples.
  3. **Output Format**: Generate a structured comparison table (Model, F1-Score, Dataset, Limitations) ready for immediate insertion into the FYP thesis chapter.

### Target Task 2: React Chat Interface & Flask API Endpoint Refactoring (FL-03)
* **Category**: Delegate to AI with review
* **Scope**: Refactoring the MindGuard web client state management and creating modular Flask API controllers.
* **"Done Well" Definition (Measurable Success)**:
  1. **Code Quality**: Zero ESLint/Flake8 warnings, full TypeScript/Python type hint coverage.
  2. **Performance**: UI render latency under 150ms for message streaming; backend endpoint response under 200ms.
  3. **Robustness**: 100% error handling coverage for network drops, invalid payloads, and rate limits, verified by automated unit tests.

### Target Task 3: Automated Model Evaluation & Weekly Progress Reporter (FL-04)
* **Category**: Fully automate
* **Scope**: Building an automated script that runs model evaluations on new datasets, aggregates git commit logs, and formats a weekly markdown progress report for advisor syncs.
* **"Done Well" Definition (Measurable Success)**:
  1. **Zero-Touch Execution**: The script executes end-to-end via a single command or git hook in under 30 seconds with 0 manual formatting steps.
  2. **Completeness**: The report automatically extracts metric changes (Precision, Recall, F1), active bug counts, and commit summaries without missing any repository updates.
  3. **Formatting Standard**: Produces clean, publication-ready GitHub Flavored Markdown formatted with alerts, metrics tables, and clear next steps.
