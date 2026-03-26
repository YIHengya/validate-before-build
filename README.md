# VBB - Validation Before Build

> **Should we build this?** — A decision framework for validating ideas before execution.

Complements [GSD](https://github.com/gsd-build/get-shit-done) by handling the "should we build this?" phase that GSD assumes is already decided.

## Why VBB?

GSD is excellent at executing once you've decided what to build. But it doesn't help you answer:

- Is this a real problem?
- Will anyone care if I solve it?
- Do I have the resources to pull this off?
- What am I not seeing that could kill this project?

VBB fills this gap with a **3-layer progressive validation framework**:

```
Layer 1: Quick (5 min)
   ↓ Filter out 80% of bad ideas
Layer 2: Validate (30-60 min)
   ↓ Test assumptions with evidence
Layer 3: Assess (1-2 hours)
   ↓ Full resource and risk analysis
   ↓
   GSD Execution
```

## Installation

```bash
npx vbb-cc@latest
```

Follow the prompts to select your runtime and installation location.

### Supported Runtimes

- Claude Code (`/vbb:*` commands)
- OpenCode (`/vbb-*` commands)
- Gemini CLI (`/vbb:*` commands)
- Codex (`$vbb-*` skills)
- Copilot (`/vbb:*` commands)
- Antigravity (`$vbb-*` skills)
- Cursor (`/vbb-*` skills)
- Windsurf (`/vbb-*` skills)

## Commands

| Command | Purpose | Time |
|---------|---------|------|
| `/vbb:help` | Show all commands | - |
| `/vbb:quick` | Quick 5-min validation | ~5 min |
| `/vbb:validate` | Deep validation with evidence | ~30-60 min |
| `/vbb:assess` | Full resource/risk assessment | ~1-2 hours |
| `/vbb:report` | Show validation results | - |
| `/vbb:status` | Quick status check | - |
| `/vbb:export` | Export to GSD for execution | - |

## Usage Example

```bash
# 1. Quick validation - does this idea warrant more time?
/vbb:quick

# 2. If GO, gather evidence and test assumptions
/vbb:validate

# 3. If still positive, full resource and risk analysis
/vbb:assess

# 4. Export to GSD for execution planning
/vbb:export
```

## Decision Framework

### Layer 1: Quick Check
- Problem reality: Real or perceived?
- Necessity: What happens if we don't build it?
- Feasibility: Can we technically do this?

**Decision**: GO / KILL / HOLD

### Layer 2: Validation
- User/market validation
- Solution validation
- Evidence collection
- Assumption testing

**Decision**: PROCEED / PIVOT / KILL

### Layer 3: Assessment
- Resource analysis (time, skills, budget)
- Risk analysis (technical, market, execution)
- Success criteria
- Go-to-market strategy

**Decision**: GREEN / YELLOW / RED

## Output Files

VBB stores validation results in `.vbb/`:

- `quick-decision.md` - Layer 1 results
- `validation-report.md` - Layer 2 results
- `full-assessment.md` - Layer 3 results
- `gsd-export.md` - Export brief for GSD

## Philosophy

> "The best way to have a good idea is to have lots of ideas." — Linus Pauling

But not all ideas deserve execution. VBB helps you:

1. **Fail fast** — Kill bad ideas in 5 minutes, not 5 weeks
2. **Validate smart** - Focus evidence gathering on critical assumptions
3. **Decide clear** - Explicit GO/KILL decisions at each layer
4. **Bridge to execution** - Seamless handoff to GSD when validated

## License

MIT

---

**VBB: Don't build things nobody wants.**
