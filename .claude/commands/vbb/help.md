---
name: vbb:help
description: Show available VBB commands and usage guide
---
<objective>
Display the complete VBB command reference.

Output ONLY the reference content below. Do NOT add:
- Project-specific analysis
- Git status or file context
- Next-step suggestions
- Any commentary beyond the reference
</objective>

<process>
Output the complete VBB command reference.

## VBB Commands

### Core Workflow
| Command | Description |
|---------|-------------|
| `/vbb:auto` | **Automated multi-agent analysis** - comprehensive validation in one command |
| `/vbb:quick` | Quick 5-minute validation to filter out bad ideas |
| `/vbb:validate` | Deep validation (30-60 min) with evidence collection |
| `/vbb:assess` | Full assessment with detailed resource analysis |
| `/vbb:report` | Show current validation results |
| `/vbb:status` | Quick status check at a glance |
| `/vbb:export` | Export validated idea to GSD for execution |

### Configuration
| Command | Description |
|---------|-------------|
| `/vbb:settings` | Configure VBB profiles and workflow settings |
| `/vbb:set-profile` | Switch analysis profile (quick/balanced/thorough) |

### Navigation
| Command | Description |
|---------|-------------|
| `/vbb:help` | Show this help reference |

## Quick Start

### Automated Analysis (Recommended)
```
/vbb:auto "Your idea here"
```
Runs 5 specialist agents in parallel:
- **Dependency Validator** - Validates upstream projects (if any)
- **Market Analyst** - Analyzes user need and demand
- **Technical Auditor** - Assesses feasibility
- **Resource Calculator** - Estimates time and skills needed
- **Risk Assessor** - Identifies risks and opportunity cost

Outputs comprehensive analysis in ~10 minutes.

**NEW**: Automatically detects if your idea depends on existing projects (like "add Web UI to InkOS") and validates them first to avoid building on broken foundations.

### Manual Step-by-Step
```
/vbb:quick         → Quick 5-min filter
/vbb:validate      → Deep validation (if quick says GO)
/vbb:assess        → Full assessment (if validate says PROCEED)
/vbb:export        → Export to GSD for execution
```

## Profiles

| Profile | Depth | Research | Time | Use For |
|---------|-------|----------|------|---------|
| `quick` | Shallow | None | ~5 min | Initial filtering |
| `balanced` | Medium | Light | ~15 min | Standard validation |
| `thorough` | Deep | Extensive | ~30 min | Major decisions |

```
/vbb:set-profile quick     # Fast filtering
/vbb:set-profile balanced  # Default
/vbb:set-profile thorough  # Deep dive
```

## Workflow Settings

```
/vbb:settings                          # Show all settings
/vbb:settings --market-research off    # Toggle features
/vbb:settings --format json            # Change output
/vbb:settings --reset                  # Reset to defaults
```

## Output Files

VBB saves results to `.vbb/`:
- `auto-analysis.md` - Automated multi-agent analysis
- `quick-decision.md` - Quick validation result
- `validation-report.md` - Deep validation
- `full-assessment.md` - Full assessment
- `gsd-export.md` - Export brief for GSD
- `config.json` - Your VBB settings
</process>
