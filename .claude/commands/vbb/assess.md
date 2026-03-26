---
name: vbb:assess
description: Full assessment with detailed resource analysis
---
<objective>
Run a full assessment with detailed resource and risk analysis.

This is the deepest validation layer, reserved for ideas that have passed previous filters.
</objective>

<process>
## Full Assessment (Layer 3)

Comprehensive analysis covering resources, timeline, risks, and execution strategy.

### Assessment Areas

#### 1. Resource Analysis
- **Time**: Realistic timeline with buffers
- **Skills**: Required capabilities vs available
- **Budget**: Costs to build and maintain
- **Tools/Infrastructure**: Technical dependencies

#### 2. Risk Analysis
- Technical risks
- Market risks
- Execution risks
- Opportunity cost (what else could you do with these resources?)

#### 3. Success Criteria
- What does "done" look like?
- How will you measure success?
- What are the leading indicators?

#### 4. Go-to-Market (if applicable)
- How will users discover this?
- What's the distribution strategy?
- What's the retention/engagement plan?

### Decision
Output one of:
- **GREEN**: Ready to execute - high confidence, acceptable risks
- **YELLOW**: Proceed with caution - significant risks or unknowns
- **RED**: Do not execute - risks too high or resources insufficient

## Output Format

```markdown
# Full Assessment: [Idea Name]

## Decision: GREEN / YELLOW / RED

## Resource Requirements
| Resource | Estimate | Available | Gap |
|----------|----------|-----------|-----|
| Time | ... | ... | ... |
| Skills | ... | ... | ... |
| Budget | ... | ... | ... |

## Risk Matrix
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| ... | High/Med/Low | High/Med/Low | ... |

## Success Criteria
- [Specific, measurable outcomes]

## Timeline
[Phased breakdown with realistic estimates]

## Recommendation
[Clear execution recommendation or reason to stop]
```
</process>
