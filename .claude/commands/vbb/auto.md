---
name: vbb:auto
description: Automated multi-agent analysis - comprehensive idea validation in one command
---
<objective>
Run a comprehensive automated analysis using multiple specialist agents in parallel.

This command orchestrates 5 specialist agents to analyze an idea from different angles:
- Dependency Validator: Validates upstream projects/dependencies (if any)
- Market Analyst: User need, demand, competition
- Technical Auditor: Feasibility, complexity, technical risks
- Resource Calculator: Time, skills, cost estimation
- Risk Assessor: Execution risks, opportunity cost

The goal is to provide a GO/HOLD/KILL decision with comprehensive reasoning in a single automated run.
</objective>

<process>
## Automated Multi-Agent Analysis

You are orchestrating an automated validation process. Your job is to:

### Phase 0: Language Detection (语言检测)

**CRITICAL**: Before starting analysis, detect and set the language:

1. Check `.vbb/config.json` for `language` setting:
   - If exists → use that language
   - If not exists → detect from user's query

2. Language detection logic:
   - User queries in Chinese (中文/汉字/想法等) → set `"zh"`, create config
   - User queries in English → set `"en"`, create config
   - Mixed/unclear → ask user: "输出语言 / Output language? 1=中文, 2=English"

3. Save language to `.vbb/config.json`:
```json
{
  "language": "zh"  // or "en"
}
```

4. Pass language to all agents in their prompt:
   - "Language setting: zh (output in Chinese)"
   - Or "Language setting: en (output in English)"

5. Output final report in the detected language.

### Phase 1: Information Gathering (信息收集)

First, check the `mode` setting from `.vbb/config.json`:

**If `mode: "interactive"` (交互模式)**:
- Ask clarifying questions if needed
- Ensure understanding before proceeding
- Gather: idea description, target users, motivation, background

**If `mode: "auto"` (自动模式)**:
- Proceed with whatever information provided
- Make reasonable assumptions based on context
- Don't ask unless absolutely critical

**Information to gather (if interactive)**:
1. **What is the idea?** (brief description)
2. **Who is it for?** (target users)
3. **Why now?** (motivation/timing)
4. **What's your background?** (skills, experience)

**In auto mode**: Use best judgment with available info, let agents uncover gaps.

### Phase 1.5: Dependency Validation (依赖验证) - CRITICAL

**IMPORTANT**: Before proceeding with full analysis, check if the idea depends on any existing projects, platforms, or APIs.

**How to detect dependencies**:
- Look for phrases like "based on", "using", "extending", "for [project name]"
- Check if idea mentions specific tools, frameworks, or platforms
- If adding features to existing software → dependency exists

**If NO dependency**: Skip to Phase 2 (no upstream validation needed)

**If dependency exists**: MUST run Dependency Validator FIRST:

```
Spawn Dependency Validator Agent:
- Validates the upstream project is real and working
- Checks project health and maintenance status
- Assesses code quality and technical debt
- Identifies abandonment/API change risks
- Outputs: 🟢 Reliable / 🟡 Caution / 🔴 Too Risky
```

**If Dependency Validator returns 🔴 (Too Risky)**:
- STOP analysis
- Output warning: "Upstream dependency too risky, recommend killing this idea"
- Don't spawn other agents
- Save partial report explaining the blocker

**If Dependency Validator returns 🟢 or 🟡**:
- Proceed to Phase 2 with full analysis
- Include dependency findings in final report

**Why this matters**: Building on a dead or broken upstream project = wasted effort. Always validate the foundation first.

### Phase 2: Parallel Agent Analysis

Once you have sufficient information (and dependency is validated if applicable), spawn 4-5 specialist agents **in parallel** using the Agent tool:

```
Agent 1: Market Analyst
- Analyzes user need, market demand, competition
- Identifies target audience and their pain points
- Evaluates market timing and differentiation

Agent 2: Technical Auditor
- Assesses technical feasibility
- Identifies key technical challenges
- Estimates complexity and suggests tech stack

Agent 3: Resource Calculator
- Estimates time requirements (best/worst case)
- Identifies required skills and tools
- Highlights resource gaps

Agent 4: Risk Assessor
- Identifies execution risks
- Analyzes opportunity cost
- Flags potential deal-breakers
```

Each agent should be given:
- The user's idea description
- Their specific analysis scope
- A request to output findings in a structured format

### Phase 3: Synthesize Findings

Wait for all agents to complete, then synthesize their findings into:

1. **Executive Summary** (2-3 sentences)
2. **Decision** (GO / HOLD / KILL)
3. **Key Findings by Dimension**
4. **Critical Concerns** (if any)
5. **Recommended Next Steps**

### Phase 4: Output Report

Create a comprehensive report in `.vbb/auto-analysis.md` with this format:

```markdown
# Automated Analysis: [Idea Name]

**Analyzed**: [Date]
**Analysis Duration**: ~5 minutes

---

## Executive Summary

[2-3 sentence summary of the analysis]

## Decision: 🟢 GO / 🟡 HOLD / 🔴 KILL

---

## [OPTIONAL] Dependency Validation / 依赖验证

*Only include this section if the idea depends on an existing project/platform*

### Upstream Project: [Project Name]

- **Project Reality**: 🟢 Real & Working / 🟡 Unverified / 🔴 Suspicious
- **Project Health**: 🟢 Healthy / 🟡 Concerning / 🔴 At Risk
- **Last Commit**: [X days ago]
- **Open Issues**: [Number]

### Dependency Risks
| Risk | Severity | Status |
|------|----------|--------|
| [Risk 1] | High/Med/Low | [Mitigated/Accepted] |

### Dependency Verdict
🟢 Reliable / 🟡 Use with Caution / 🔴 Too Risky

**If 🔴 Too Risky**: This section should appear prominently with a warning that analysis was stopped due to dependency issues.

---

## Market Analysis

### User Need
- **Problem**: [What problem is being solved?]
- **Intensity**: 🟢 Hair-on-fire / 🟡 Moderate pain / 🔴 Nice-to-have
- **Audience**: [Who has this problem?]

### Demand Signals
- [Evidence of real demand]
- [Indicators this is worth solving]

### Competition Landscape
- **Direct competitors**: [Who else solves this?]
- **Differentiation**: [What makes this unique?]
- **Moat**: [Sustainable advantage?]

### Market Verdict
🟢 Strong market / 🟡 Moderate potential / 🔴 Weak signal

---

## Technical Analysis

### Feasibility
- **Complexity**: 🟢 Low / 🟡 Medium / 🔴 High
- **Key Challenges**: [Technical hurdles]
- **Suggested Stack**: [Technology recommendations]

### Technical Risks
| Risk | Severity | Mitigation |
|------|----------|------------|
| ... | ... | ... |

### Technical Verdict
🟢 Feasible / 🟡 Challenging but possible / 🔴 High risk

---

## Resource Analysis

### Time Estimate
| Phase | Best Case | Worst Case |
|-------|-----------|------------|
| MVP | [X] weeks | [Y] weeks |
| Full Product | [X] weeks | [Y] weeks |

### Required Skills
- **Must have**: [Critical skills]
- **Nice to have**: [Bonus skills]
- **Can learn**: [Skills you can acquire]

### Resource Gaps
- [Identified gaps and how to address them]

### Resource Verdict
🟢 Within reach / 🟡 Stretch / 🔴 Insufficient

---

## Risk Analysis

### Execution Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| ... | High/Med/Low | High/Med/Low | ... |

### Opportunity Cost
- **What you're giving up**: [Other projects/opportunities]
- **Cost of failure**: [What happens if this fails?]

### Deal-breakers
- [Any conditions that would make this unviable]

### Risk Verdict
🟢 Acceptable / 🟡 Managed risk / 🔴 Too risky

---

## Synthesis

### Strengths
- [Key strengths of this idea]

### Weaknesses
- [Key concerns or gaps]

### Critical Concerns
- [Issues that must be addressed before proceeding]
- [If dependency exists: Upstream project concerns and monitoring needs]

---

## Recommendation

### If GO:
**Strongest signals**: [Why this should proceed]
**First milestone**: [What to tackle first]
**Success criteria**: [How to validate quickly]

### If HOLD:
**What to validate first**: [Specific questions to answer]
**Suggested actions**: [How to get answers]
**Re-evaluate after**: [When to check back]

### If KILL:
**Why not**: [Clear reasons to not pursue]
**Alternatives**: [Better ways to achieve the goal]
**Learnings**: [What to apply to future ideas]

---

*Analysis by VBB Automated Agents*
*Market Analyst | Technical Auditor | Resource Calculator | Risk Assessor*
```

---

## Important Guidelines

1. **Be efficient**: Gather enough info to proceed, don't over-interview
2. **Parallel execution**: Spawn all 4 agents at once, not sequentially
3. **Synthesize clearly**: Don't just paste agent outputs — integrate them
4. **Be decisive**: Give a clear GO/HOLD/KILL, not "it depends"
5. **Save the report**: Always write to `.vbb/auto-analysis.md`

---

## Example Flow

**User**: "I want to add a web UI to InkOS, an AI novel writing CLI tool"

**You**: "Got it. A couple quick questions:
1. Is this for your own use or as a public product?
2. What's your experience with web development?"

**User**: "For public use. I know React basics."

**You**: *Spawns 4 agents in parallel...*

**[5 minutes later, outputs report]**

---

Now execute this process with the user's idea.
</process>
