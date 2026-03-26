---
name: vbb:report
description: Show current validation results and status
---
<objective>
Display a summary of the current validation status and all results to date.

This helps users understand where they are in the validation process and what decisions have been made.
</objective>

<process>
## Validation Status Report

Check for existing validation files and display a comprehensive status report.

### Files to Check
- `.vbb/quick-decision.md` - Quick validation results
- `.vbb/validation-report.md` - Deep validation results
- `.vbb/full-assessment.md` - Full assessment results

### Output Format

```markdown
# VBB Validation Status

## Current Stage: [Quick / Validate / Assess / Complete]

## Results Summary

### Quick Decision (Layer 1)
**Status**: [Not Started / GO / KILL / HOLD]
**Date**: [If completed]
**Result**: [Brief summary]

### Validation Report (Layer 2)
**Status**: [Not Started / In Progress / Complete]
**Date**: [If completed]
**Result**: [Brief summary]

### Full Assessment (Layer 3)
**Status**: [Not Started / In Progress / Complete]
**Date**: [If completed]
**Result**: [Brief summary]

## Next Step
[Suggested next command or action]
```

If no validation files exist, suggest running `/vbb:quick` to start.
</process>
