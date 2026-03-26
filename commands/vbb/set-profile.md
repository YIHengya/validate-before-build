---
name: vbb:set-profile
description: Switch analysis profile (quick/balanced/thorough)
---
<objective>
Switch VBB analysis profile to change the depth and thoroughness of validation.

Profiles control:
- Whether agents do web research
- How deep the analysis goes
- How long validation takes
</objective>

<process>
## Set Analysis Profile

### Available Profiles

| Profile | Depth | Research | Time | Best For |
|---------|-------|----------|------|----------|
| `quick` | Shallow | None | ~5 min | Initial filtering, low-stakes ideas |
| `balanced` | Medium | Light | ~15 min | Standard validation (default) |
| `thorough` | Deep | Extensive | ~30 min | High-commitment, major projects |

### Step 1: Parse Argument

Get the profile name from argument or prompt user:

```bash
/vbb:set-profile quick
/vbb:set-profile balanced
/vbb:set-profile thorough
```

If no argument provided, show profile options and prompt for choice.

### Step 2: Update Configuration

1. Read `.vbb/config.json` (create if doesn't exist)
2. Update `profile` field
3. Adjust workflow settings based on profile:

#### Quick Profile
```json
{
  "profile": "quick",
  "workflow": {
    "market_research": false,
    "technical_research": false,
    "competitor_analysis": false,
    "parallel_agents": true
  }
}
```

#### Balanced Profile
```json
{
  "profile": "balanced",
  "workflow": {
    "market_research": true,
    "technical_research": true,
    "competitor_analysis": true,
    "parallel_agents": true
  }
}
```

#### Thorough Profile
```json
{
  "profile": "thorough",
  "workflow": {
    "market_research": true,
    "technical_research": true,
    "competitor_analysis": true,
    "parallel_agents": true,
    "deep_dive": true,
    "multiple_sources": true
  }
}
```

### Step 3: Save and Confirm

```markdown
✓ Profile switched to **{profile}**

## What Changed

### Enabled
- [Feature 1 that was enabled]
- [Feature 2 that was enabled]

### Disabled
- [Feature 1 that was disabled]
- [Feature 2 that was disabled]

## New Behavior

- **Analysis depth**: {shallow/medium/deep}
- **Research**: {none/light/extensive}
- **Expected time**: ~{X} minutes

## Next Analysis

Your next `/vbb:auto` or `/vbb:quick` will use the {profile} profile.

To change back: `/vbb:set-profile {previous_profile}`
```

---

## Profile Comparison

### quick vs balanced

| Aspect | quick | balanced |
|--------|-------|----------|
| Market research | ❌ No | ✅ Yes (light) |
| Technical research | ❌ No | ✅ Yes (light) |
| Competitor lookup | ❌ No | ✅ Yes |
| Analysis depth | 🟢 Shallow | 🟡 Medium |
| Time | ~5 min | ~15 min |
| Best for | Quick filter | Standard validation |

### balanced vs thorough

| Aspect | balanced | thorough |
|--------|----------|----------|
| Market research | 🟡 Light | 🟢 Deep (multiple sources) |
| Technical research | 🟡 Light | 🟢 Comprehensive |
| Competitor analysis | 🟡 Basic | 🟢 Full comparison |
| Risk assessment | 🟡 Standard | 🟢 Extensive scenarios |
| Time | ~15 min | ~30 min |
| Best for | Most cases | High-stakes decisions |

---

## Usage Examples

```bash
# Quick check a minor idea
/vbb:set-profile quick
/vbb:auto "Should I add dark mode to my blog?"

# Standard validation
/vbb:set-profile balanced
/vbb:auto "Build a SaaS for freelance designers"

# Major pivot decision
/vbb:set-profile thorough
/vbb:auto "Quit job and build AI writing tool full-time"
```

---

## Tips

1. **Start with quick**: Filter ideas fast, only use thorough on promising ones
2. **Match stakes to depth**: Low-stakes → quick, High-stakes → thorough
3. **Timeboxed decision**: Need to decide today? Use quick. Have a week? Use thorough.
4. **Iterative validation**: quick → if GO, then balanced → if still GO, then thorough
</process>
