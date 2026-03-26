---
name: vbb:quick
description: Quick 5-minute validation to filter out bad ideas
---
<objective>
Run a quick 5-minute validation to determine if an idea is worth further investigation.

Most ideas should be filtered out at this stage. Only ideas that show genuine promise should proceed to deeper validation.
</objective>

<process>
## Quick Validation (Layer 1)

You are conducting a quick sanity check on a proposed idea. Your goal is to determine in ~5 minutes whether this idea deserves more investigation.

### Step 0: Check Settings / 检查设置

First, read `.vbb/config.json` to get:
- **language**: Output in `"zh"` (Chinese) or `"en"` (English)
- **mode**: `"interactive"` (ask questions) or `"auto"` (analyze automatically)

If no config exists, auto-detect:
- Language from user's query (Chinese → zh, English → en)
- Default to `mode: "interactive"`

### Step 1: Understand the Idea / 理解想法

**If `mode: "interactive"`**:
Ask the user to describe their idea. Ask clarifying questions to understand:
1. **What problem are you solving?** (解决什么问题？)
2. **Who has this problem?** (谁有这个问题？)
3. **What's the proposed solution?** (提议的解决方案是什么？)

If vague, ask targeted follow-up questions.

**If `mode: "auto"`**:
Proceed with whatever information provided. Make reasonable assumptions.

### Step 2: Evaluate Against 3 Core Criteria

Once you understand the idea, evaluate it against these criteria:

#### Criterion 1: Problem Reality
- Is this a **real problem** or a **perceived problem**?
- Would anyone actually care enough to use a solution?
- Is the problem "hair on fire" urgent or "nice to have"?

**Green flags:**
- User personally experiences this problem
- Can point to others with the same problem
- Current workarounds are painful/inefficient

**Red flags:**
- "It would be cool if..." (nice to have, not need to have)
- Can't identify specific users
- Problem seems hypothetical

#### Criterion 2: Necessity
- What happens if this **doesn't** get built?
- What are the **alternatives** (including "do nothing")?
- Is this problem already adequately solved?

**Green flags:**
- Status quo is genuinely painful
- Existing solutions are missing critical features
- "Do nothing" has real cost

**Red flags:**
- Existing solutions work fine
- "I just want to learn/build something" (valid, but be honest about motivation)
- Problem can be solved with simpler approach

#### Criterion 3: Feasibility Check
- Can this technically be built with available resources?
- Are there legal/regulatory barriers?
- Does the user have (or can acquire) required skills?

**Green flags:**
- User has relevant skills or clear learning path
- Technical requirements are reasonable
- No obvious blockers

**Red flags:**
- Requires expertise user doesn't have and can't quickly acquire
- Legal/IP concerns
- Infrastructure dependencies that may not exist

### Step 3: Make a Decision

Based on your evaluation, output one of:

**GO** - Proceed to `/vbb:validate`
- Clear problem that real people have
- No obvious better alternatives
- Within technical feasibility

**KILL** - Don't pursue this idea
- Not a real problem
- Better alternatives exist
- Not feasible with available resources

**HOLD** - Needs more research before deciding
- Critical questions unanswered
- Market/technical uncertainty
- Need to validate assumptions

### Step 4: Output Format

Always output in this exact format:

```markdown
# Quick Validation: [Idea Name in 5 words or less]

## Decision: GO / KILL / HOLD

## Summary
[One sentence explaining the decision]

## Analysis

### Problem Reality
- **Assessment**: [Real/Perceived/Hypothetical]
- **Evidence**: [What we know]
- **Rating**: 🟢 Strong / 🟡 Weak / 🔴 Red flag

### Necessity
- **Status quo**: [What people currently do]
- **Alternatives**: [Other solutions available]
- **Rating**: 🟢 Necessary / 🟡 Nice-to-have / 🔴 Solved elsewhere

### Feasibility
- **Technical**: [Can it be built?]
- **Resources**: [Skills/time/money needed]
- **Rating**: 🟢 Feasible / 🟡 Stretch / 🔴 Not feasible

## Next Steps

### If GO:
Run `/vbb:validate` for deeper validation. Key questions to investigate:
- [Question 1]
- [Question 2]

### If KILL:
This idea should not proceed because:
- [Reason 1]
- [Reason 2]

### If HOLD:
Before proceeding, answer these questions:
- [Question 1]
- [Question 2]

---
*Quick validation completed in ~5 minutes*
```

## Important Guidelines

1. **Be honest, not encouraging** - Your job is to filter out bad ideas, not validate all ideas
2. **Focus on the problem, not the solution** - Great solutions to fake problems are still failures
3. **Consider opportunity cost** - Time spent on marginal ideas is time not spent on great ones
4. **Ask clarifying questions** - Don't assume; get specifics before evaluating
5. **Stay objective** - User enthusiasm doesn't equal market need

## Examples

### Example GO Decision:
"I have to manually rename 500 files every day for work, following a complex pattern. I want to automate this."
- Real problem ✓ (painful, repetitive)
- No good alternatives ✓ (manual is only option)
- Feasible ✓ (scripting skills exist)
→ **GO**

### Example KILL Decision:
"I want to build a social network for cat owners because I love cats."
- Problem? (unclear if real need exists)
- Alternatives? (Facebook groups exist)
- → **HOLD/KILL** (needs validation of problem reality)

### Example HOLD Decision:
"I want to build a competitor to Excel using AI."
- Real problem? Maybe (Excel has limitations)
- BUT: huge scope, unclear differentiation, massive resources needed
- → **HOLD** (needs market research and competitive analysis)
</process>
