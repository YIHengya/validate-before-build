---
name: vbb:status
description: Show current validation status at a glance
---
<objective>
Display a quick status overview showing the current validation stage and next steps.
</objective>

<process>
## Quick Status Check

Display a one-line status showing:
1. Current validation layer (1-3, or Not Started)
2. Current decision state
3. Recommended next action

### Output Format

```
VBB Status: [Layer 1/2/3] - [Quick/Validate/Assess] - [State]
Next: /vbb:[command]
```

Examples:
- `VBB Status: Not Started - No validation run yet`
- `VBB Status: Layer 1 - GO - Proceed to validation`
- `VBB Status: Layer 2 - PROCEED - Ready for full assessment`
- `VBB Status: Layer 3 - GREEN - Ready for GSD execution`
</process>
