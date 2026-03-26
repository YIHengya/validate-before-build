---
name: vbb:settings
description: Configure VBB profiles and workflow settings
---
<objective>
Display and manage VBB configuration settings.

Show current settings and allow modification of:
- Language (中文/English)
- Analysis profile (depth/thoroughness)
- Workflow toggles (market research, technical research)
- Output preferences
- Agent model assignments
</objective>

<process>
## VBB Settings Management

### Step 1: Check for Existing Config

First, check if `.vbb/config.json` exists. If not, create default config.

**Important**: Detect user's language preference from their initial query.
- If user queries in Chinese → default to `"zh"`
- If user queries in English → default to `"en"`

### Step 2: Display Current Settings

Show current configuration in a clear table format:

```markdown
# VBB Settings / VBB 配置

## Location: `.vbb/config.json`
## 位置: `.vbb/config.json`

---

## Mode / 模式

**Current / 当前**: `{mode}`

| Mode | 模式 | Description / 描述 |
|------|------|-------------------|
| `interactive` (default) | 交互模式 | 分析过程中询问澄清问题，需要确认 |
| `auto` | 自动模式 | 自动分析，最少打扰，基于推断继续 |

**说明 / Description**:
- **interactive**: 会问你澄清问题，确保理解正确 / Will ask clarifying questions
- **auto**: 自动推断，直接输出分析结果 / Auto-analyze with minimal prompts

## Language / 语言

**Current / 当前**: `{language}`

| Language | 语言 | Description / 描述 |
|----------|------|-------------------|
| `zh` | 中文 | 输出中文报告（默认）|
| `en` | English | Output in English |

## Analysis Profile / 分析配置

**Current / 当前**: `{profile}`

| Profile | Description | Use When | 用途 |
|---------|-------------|----------|------|
| `quick` | 快速分析 | Initial filtering | 初步筛选 |
| `balanced` | 标准深度 | Most scenarios | 大多数情况 |
| `thorough` | 深度分析 | Major decisions | 重大决策 |

## Workflow Settings / 工作流设置

| Setting | Current | Options | Description / 描述 |
|---------|---------|---------|-------------------|
| `workflow.market_research` | `{value}` | true/false | 市场调研 / Enable market research |
| `workflow.technical_research` | `{value}` | true/false | 技术调研 / Enable technical research |
| `workflow.competitor_analysis` | `{value}` | true/false | 竞品分析 / Deep competitor analysis |
| `workflow.parallel_agents` | `{value}` | true/false | 并行分析 / Run agents in parallel |

## Output Preferences / 输出偏好

| Setting | Current | Options | Description / 描述 |
|---------|---------|---------|-------------------|
| `output.format` | `{value}` | markdown/json | 输出格式 / Output format |
| `output.verbose` | `{value}` | true/false | 详细模式 / Include details |

## Agent Model Configuration / Agent 模型配置

| Agent | Model | Provider |
|-------|-------|----------|
| market-analyst | `{model}` | {provider} |
| technical-auditor | `{model}` | {provider} |
| resource-calculator | `{model}` | {provider} |
| risk-assessor | `{model}` | {provider} |

*Set to "inherit" to use current runtime's model / 设为 "inherit" 使用当前运行时模型*

---

## How to Change Settings / 如何修改设置

### Set Mode / 设置模式
```
/vbb:settings --mode interactive    # 交互模式（默认）
/vbb:settings --mode auto           # 自动模式
```

### Set Language / 设置语言
```
/vbb:settings --language zh    # 中文
/vbb:settings --language en    # English
```

### Change Profile / 切换配置
```
/vbb:set-profile quick
/vbb:set-profile balanced
/vbb:set-profile thorough
```

### Toggle Workflows / 切换工作流
```
/vbb:settings --market-research on
/vbb:settings --market-research off
```

### Reset to Defaults / 重置默认
```
/vbb:settings --reset
```

### Interactive Mode / 交互模式
```
/vbb:settings --interactive
```
Prompts you through each setting / 逐步引导设置

---

### Step 3: Handle User Modifications

If user provides flags, update the config:
- `--mode interactive|auto`: Set analysis mode (设置分析模式)
- `--language zh|en`: Set language (设置语言)
- `--profile <name>`: Change analysis profile
- `--market-research on|off`: Toggle market research
- `--technical-research on|off`: Toggle technical research
- `--format markdown|json`: Change output format
- `--verbose on|off`: Toggle verbosity
- `--reset`: Reset to defaults
- `--interactive`: Interactive configuration

### Step 4: Save and Confirm

After making changes, save to `.vbb/config.json` and display confirmation:

**If language is zh (中文)**:
```
✓ 设置已更新

模式: {mode}
语言: 中文 (zh)
配置: {profile}
市场调研: {启用/禁用}
...
```

**If language is en (English)**:
```
✓ Settings updated

Mode: {mode}
Language: English (en)
Profile: {profile}
Market research: {enabled/disabled}
...
```

---

## Default Configuration / 默认配置

```json
{
  "mode": "interactive",
  "language": "zh",
  "profile": "balanced",
  "workflow": {
    "market_research": true,
    "technical_research": true,
    "competitor_analysis": true,
    "parallel_agents": true
  },
  "output": {
    "format": "markdown",
    "verbose": true,
    "save_path": ".vbb/"
  },
  "agents": {
    "market_analyst": {
      "model": "inherit",
      "provider": "inherit"
    },
    "technical_auditor": {
      "model": "inherit",
      "provider": "inherit"
    },
    "resource_calculator": {
      "model": "inherit",
      "provider": "inherit"
    },
    "risk_assessor": {
      "model": "inherit",
      "provider": "inherit"
    },
    "orchestrator": {
      "model": "inherit",
      "provider": "inherit"
    }
  }
}
```

---

## Language Behavior / 语言行为

### Auto-Detection / 自动检测
- **Chinese queries** → Default to `zh` (中文输出)
- **English queries** → Default to `en` (English output)
- **Mixed/M unclear** → Prompt user to choose

### Override / 手动覆盖
Set language explicitly:
```
/vbb:settings --language en    # Force English
/vbb:settings --language zh    # 强制中文
```

### Agent Language / Agent 语言
All agents will read the language setting and output reports in the selected language.

所有 Agent 会读取语言设置，并以选定语言输出报告。
</process>
