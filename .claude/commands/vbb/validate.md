---
name: vbb:validate
description: Deep validation (30-60 min) with evidence collection
---
<objective>
Run a deep validation (30-60 minutes) to collect evidence and test assumptions.

This layer should only be reached after `/vbb:quick` returns GO.
</objective>

<process>
## Deep Validation (Layer 2)

Guide the user through evidence collection and assumption testing.

### Validation Areas

#### 1. Market/User Validation
- Who specifically has this problem?
- How many people have this problem?
- How intense is the pain?

#### 2. Solution Validation
- What are current workarounds?
- Why are they inadequate?
- What would make a solution 10x better?

#### 3. Evidence Collection
- Suggest specific research methods
- Help gather real-world data
- Test core assumptions

### Decision
Output one of:
- **PROCEED**: Strong evidence, move to `/vbb:assess` or execution
- **PIVOT**: Core idea valid but needs significant changes
- **KILL**: Evidence doesn't support the idea

## Output Format

```markdown
# Validation Report: [Idea Name]

## Decision: PROCEED / PIVOT / KILL

## Evidence Summary
### User Problem
- [Evidence gathered]

### Market Size
- [Evidence gathered]

### Competitive Landscape
- [Evidence gathered]

## Assumptions Tested
| Assumption | Status | Evidence |
|------------|--------|----------|
| ... | Validated/Invalidated | ... |

## Risks Identified
[Critical risks that could derail the project]

## Recommendation
[Clear next steps based on decision]
```
</process>
