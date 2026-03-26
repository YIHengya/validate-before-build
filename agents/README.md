# VBB Agents

This directory contains agent definitions for VBB (Validation Before Build).

Agents are specialized sub-agents that handle specific validation tasks.

## Agent Structure

Each agent file follows this format:

```markdown
---
name: vbb-[agent-name]
description: Brief description of what this agent does
---

<objective>
What this agent accomplishes
</objective>

<context>
What information this agent needs
</context>

<process>
Step-by-step instructions for the agent
</process>
```

## Available Agents

*(To be added - agents will be created as validation workflows are defined)*

- `vbb-researcher` - Research validation questions
- `vbb-analyst` - Analyze validation evidence
- `vbb-assessor` - Full assessment specialist
