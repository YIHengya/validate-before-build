#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

// Colors
const cyan = '\x1b[36m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';

// Get version from package.json
const pkg = require('../package.json');

// Parse args
const args = process.argv.slice(2);
const hasGlobal = args.includes('--global') || args.includes('-g');
const hasLocal = args.includes('--local') || args.includes('-l');
const hasClaude = args.includes('--claude');
const hasOpencode = args.includes('--opencode');
const hasGemini = args.includes('--gemini');
const hasCodex = args.includes('--codex');
const hasCopilot = args.includes('--copilot');
const hasAntigravity = args.includes('--antigravity');
const hasCursor = args.includes('--cursor');
const hasWindsurf = args.includes('--windsurf');
const hasAll = args.includes('--all');
const hasUninstall = args.includes('--uninstall') || args.includes('-u');
const hasHelp = args.includes('--help') || args.includes('-h');

// Runtime selection - can be set by flags or interactive prompt
let selectedRuntimes = [];
if (hasAll) {
  selectedRuntimes = ['claude', 'opencode', 'gemini', 'codex', 'copilot', 'antigravity', 'cursor', 'windsurf'];
} else {
  if (hasOpencode) selectedRuntimes.push('opencode');
  if (hasClaude) selectedRuntimes.push('claude');
  if (hasGemini) selectedRuntimes.push('gemini');
  if (hasCodex) selectedRuntimes.push('codex');
  if (hasCopilot) selectedRuntimes.push('copilot');
  if (hasAntigravity) selectedRuntimes.push('antigravity');
  if (hasCursor) selectedRuntimes.push('cursor');
  if (hasWindsurf) selectedRuntimes.push('windsurf');
}

// WSL + Windows Node.js detection
if (process.platform === 'win32') {
  let isWSL = false;
  try {
    if (process.env.WSL_DISTRO_NAME) {
      isWSL = true;
    } else if (fs.existsSync('/proc/version')) {
      const procVersion = fs.readFileSync('/proc/version', 'utf8').toLowerCase();
      if (procVersion.includes('microsoft') || procVersion.includes('wsl')) {
        isWSL = true;
      }
    }
  } catch {
    // Ignore read errors — not WSL
  }

  if (isWSL) {
    console.error(`
${yellow}⚠ Detected WSL with Windows-native Node.js.${reset}

This causes path resolution issues that prevent correct installation.
Please install a Linux-native Node.js inside WSL:

  curl -fsSL https://fnm.vercel.app/install | bash
  fnm install --lts

Then re-run: npx vbb-cc@latest
`);
    process.exit(1);
  }
}

// Helper to get directory name for a runtime (used for local/project installs)
function getDirName(runtime) {
  if (runtime === 'copilot') return '.github';
  if (runtime === 'opencode') return '.opencode';
  if (runtime === 'gemini') return '.gemini';
  if (runtime === 'codex') return '.codex';
  if (runtime === 'antigravity') return '.agent';
  if (runtime === 'cursor') return '.cursor';
  if (runtime === 'windsurf') return '.windsurf';
  return '.claude';
}

/**
 * Get the global config directory for a runtime
 */
function getGlobalDir(runtime) {
  if (runtime === 'opencode') {
    if (process.env.OPENCODE_CONFIG_DIR) {
      return expandTilde(process.env.OPENCODE_CONFIG_DIR);
    }
    if (process.env.XDG_CONFIG_HOME) {
      return path.join(expandTilde(process.env.XDG_CONFIG_HOME), 'opencode');
    }
    return path.join(os.homedir(), '.config', 'opencode');
  }

  if (runtime === 'gemini') {
    if (process.env.GEMINI_CONFIG_DIR) {
      return expandTilde(process.env.GEMINI_CONFIG_DIR);
    }
    return path.join(os.homedir(), '.gemini');
  }

  if (runtime === 'codex') {
    if (process.env.CODEX_HOME) {
      return expandTilde(process.env.CODEX_HOME);
    }
    return path.join(os.homedir(), '.codex');
  }

  if (runtime === 'copilot') {
    if (process.env.COPILOT_CONFIG_DIR) {
      return expandTilde(process.env.COPILOT_CONFIG_DIR);
    }
    return path.join(os.homedir(), '.copilot');
  }

  if (runtime === 'antigravity') {
    if (process.env.ANTIGRAVITY_CONFIG_DIR) {
      return expandTilde(process.env.ANTIGRAVITY_CONFIG_DIR);
    }
    return path.join(os.homedir(), '.gemini', 'antigravity');
  }

  if (runtime === 'cursor') {
    if (process.env.CURSOR_CONFIG_DIR) {
      return expandTilde(process.env.CURSOR_CONFIG_DIR);
    }
    return path.join(os.homedir(), '.cursor');
  }

  if (runtime === 'windsurf') {
    if (process.env.WINDSURF_CONFIG_DIR) {
      return expandTilde(process.env.WINDSURF_CONFIG_DIR);
    }
    return path.join(os.homedir(), '.windsurf');
  }

  // Claude Code
  if (process.env.CLAUDE_CONFIG_DIR) {
    return expandTilde(process.env.CLAUDE_CONFIG_DIR);
  }
  return path.join(os.homedir(), '.claude');
}

const banner = '\n' +
  cyan + '  ╔═════════════════════════════════╗\n' +
  '  ║                                   ║\n' +
  '  ║   VALIDATE BEFORE BUILD           ║\n' +
  '  ║                                   ║\n' +
  '  ║   v' + pkg.version + '                           ║\n' +
  '  ║                                   ║\n' +
  '  ║   Should we build this?           ║\n' +
  '  ║                                   ║\n' +
  '  ╚═══════════════════════════════════╝' + reset + '\n' +
  '\n' +
  '  A decision framework for validating ideas before execution.\n' +
  '  Complements GSD by handling the "should we build this?" phase.\n';

console.log(banner);

if (hasUninstall) {
  console.log('  Mode: Uninstall\n');
}

// Show help if requested
if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx vbb-cc [options]\n\n  ${yellow}Options:${reset}\n    ${cyan}-g, --global${reset}              Install globally (to config directory)\n    ${cyan}-l, --local${reset}               Install locally (to current directory)\n    ${cyan}--claude${reset}                  Install for Claude Code only\n    ${cyan}--opencode${reset}                Install for OpenCode only\n    ${cyan}--gemini${reset}                  Install for Gemini only\n    ${cyan}--codex${reset}                   Install for Codex only\n    ${cyan}--copilot${reset}                 Install for Copilot only\n    ${cyan}--antigravity${reset}             Install for Antigravity only\n    ${cyan}--cursor${reset}                  Install for Cursor only\n    ${cyan}--windsurf${reset}                Install for Windsurf only\n    ${cyan}--all${reset}                     Install for all runtimes\n    ${cyan}-u, --uninstall${reset}           Uninstall VBB (remove all VBB files)\n    ${cyan}-h, --help${reset}                Show this help message\n\n  ${yellow}Examples:${reset}\n    ${dim}# Interactive install (prompts for runtime and location)${reset}\n    npx vbb-cc\n\n    ${dim}# Install for Claude Code globally${reset}\n    npx vbb-cc --claude --global\n\n    ${dim}# Install for all runtimes globally${reset}\n    npx vbb-cc --all --global\n\n    ${dim}# Install to current project only${reset}\n    npx vbb-cc --claude --local\n\n    ${dim}# Uninstall VBB${reset}\n    npx vbb-cc --claude --global --uninstall\n`);
  process.exit(0);
}

/**
 * Expand ~ to home directory
 */
function expandTilde(filePath) {
  if (filePath && filePath.startsWith('~/')) {
    return path.join(os.homedir(), filePath.slice(2));
  }
  return filePath;
}

/**
 * Recursive copy with directory creation
 */
function copyFolderRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Remove VBB files from a directory
 */
function uninstallVBB(targetDir) {
  const failures = [];

  // Remove commands/vbb
  const vbbCommandsDir = path.join(targetDir, 'commands', 'vbb');
  if (fs.existsSync(vbbCommandsDir)) {
    try {
      fs.rmSync(vbbCommandsDir, { recursive: true, force: true });
      console.log(`  ${green}✓${reset} Removed commands/vbb`);
    } catch (e) {
      failures.push('commands/vbb');
    }
  }

  // Remove agents/vbb-*.md
  const agentsDir = path.join(targetDir, 'agents');
  if (fs.existsSync(agentsDir)) {
    let removed = 0;
    for (const file of fs.readdirSync(agentsDir)) {
      if (file.startsWith('vbb-') && file.endsWith('.md')) {
        try {
          fs.unlinkSync(path.join(agentsDir, file));
          removed++;
        } catch (e) {
          failures.push(`agents/${file}`);
        }
      }
    }
    if (removed > 0) {
      console.log(`  ${green}✓${reset} Removed ${removed} VBB agents`);
    }
  }

  // Remove skills/vbb-* (for Codex, Copilot, etc.)
  const skillsDir = path.join(targetDir, 'skills');
  if (fs.existsSync(skillsDir)) {
    let removed = 0;
    for (const file of fs.readdirSync(skillsDir)) {
      if (file.startsWith('vbb-')) {
        const skillPath = path.join(skillsDir, file);
        if (fs.statSync(skillPath).isDirectory()) {
          try {
            fs.rmSync(skillPath, { recursive: true, force: true });
            removed++;
          } catch (e) {
            failures.push(`skills/${file}`);
          }
        }
      }
    }
    if (removed > 0) {
      console.log(`  ${green}✓${reset} Removed ${removed} VBB skills`);
    }
  }

  return failures;
}

/**
 * Install VBB for a specific runtime
 */
function installForRuntime(runtime, isGlobal) {
  const configDir = isGlobal ? getGlobalDir(runtime) : path.join(process.cwd(), getDirName(runtime));
  const isCodex = runtime === 'codex';
  const isCopilot = runtime === 'copilot';
  const isAntigravity = runtime === 'antigravity';
  const isCursor = runtime === 'cursor';
  const isWindsurf = runtime === 'windsurf';
  const isOpencode = runtime === 'opencode';

  const runtimeLabels = {
    claude: 'Claude Code',
    opencode: 'OpenCode',
    gemini: 'Gemini',
    codex: 'Codex',
    copilot: 'Copilot',
    antigravity: 'Antigravity',
    cursor: 'Cursor',
    windsurf: 'Windsurf'
  };

  const runtimeLabel = runtimeLabels[runtime] || runtime;
  const locationLabel = isGlobal ? configDir : `./${getDirName(runtime)}`;

  console.log(`  Installing for ${cyan}${runtimeLabel}${reset} to ${cyan}${locationLabel}${reset}\n`);

  // Create target directory
  fs.mkdirSync(configDir, { recursive: true });

  // Get source directory (where this script is located)
  const src = path.join(__dirname, '..');

  // Track installation failures
  const failures = [];

  // Uninstall first to clean up old files
  uninstallVBB(configDir);

  if (isCodex || isCopilot || isAntigravity || isCursor || isWindsurf) {
    // For Codex, Copilot, Antigravity, Cursor, Windsurf: install as skills
    const skillsDir = path.join(configDir, 'skills');
    fs.mkdirSync(skillsDir, { recursive: true });

    const vbbSrc = path.join(src, 'commands', 'vbb');
    const vbbDest = path.join(skillsDir, 'vbb');

    copyFolderRecursive(vbbSrc, vbbDest);

    // Create SKILL.md for each command
    const commands = fs.readdirSync(vbbSrc);
    let installedCount = 0;
    for (const cmd of commands) {
      if (cmd.endsWith('.md')) {
        const cmdName = cmd.replace('.md', '');
        const skillDir = path.join(skillsDir, `vbb-${cmdName}`);
        fs.mkdirSync(skillDir, { recursive: true });

        const skillContent = fs.readFileSync(path.join(vbbSrc, cmd), 'utf8');
        fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillContent);
        installedCount++;
      }
    }

    if (installedCount > 0) {
      console.log(`  ${green}✓${reset} Installed ${installedCount} skills to skills/`);
    } else {
      failures.push('skills/vbb-*');
    }
  } else if (isOpencode) {
    // OpenCode: install as commands in command/ directory
    const commandDir = path.join(configDir, 'command');
    fs.mkdirSync(commandDir, { recursive: true });

    const vbbSrc = path.join(src, 'commands', 'vbb');
    const vbbDest = path.join(commandDir, 'vbb');
    copyFolderRecursive(vbbSrc, vbbDest);

    // Rename .md files to .opencode files
    for (const file of fs.readdirSync(vbbDest)) {
      if (file.endsWith('.md')) {
        const oldPath = path.join(vbbDest, file);
        const newPath = path.join(vbbDest, file.replace('.md', '.opencode'));
        fs.renameSync(oldPath, newPath);
      }
    }

    const commandFiles = fs.readdirSync(vbbDest);
    if (commandFiles.length > 0) {
      console.log(`  ${green}✓${reset} Installed ${commandFiles.length} commands to command/vbb/`);
    } else {
      failures.push('command/vbb');
    }
  } else {
    // Claude Code & Gemini: nested structure in commands/ directory
    const commandsDir = path.join(configDir, 'commands');
    fs.mkdirSync(commandsDir, { recursive: true });

    const vbbSrc = path.join(src, 'commands', 'vbb');
    const vbbDest = path.join(commandsDir, 'vbb');
    copyFolderRecursive(vbbSrc, vbbDest);

    const commandFiles = fs.readdirSync(vbbDest);
    if (commandFiles.length > 0) {
      console.log(`  ${green}✓${reset} Installed ${commandFiles.length} commands to commands/vbb/`);
    } else {
      failures.push('commands/vbb');
    }
  }

  // Copy agents to agents directory
  const agentsSrc = path.join(src, 'agents');
  if (fs.existsSync(agentsSrc)) {
    const agentsDest = path.join(configDir, 'agents');
    fs.mkdirSync(agentsDest, { recursive: true });

    // Remove old VBB agents
    if (fs.existsSync(agentsDest)) {
      for (const file of fs.readdirSync(agentsDest)) {
        if (file.startsWith('vbb-') && file.endsWith('.md')) {
          fs.unlinkSync(path.join(agentsDest, file));
        }
      }
    }

    // Copy new agents
    const agentFiles = fs.readdirSync(agentsSrc);
    for (const file of agentFiles) {
      if (file.endsWith('.md')) {
        fs.copyFileSync(path.join(agentsSrc, file), path.join(agentsDest, file));
      }
    }

    if (agentFiles.length > 0) {
      console.log(`  ${green}✓${reset} Installed ${agentFiles.length} agents to agents/`);
    }
  }

  console.log();
  return failures;
}

/**
 * Prompt user for input
 */
function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

/**
 * Main installation flow
 */
async function main() {
  let isGlobal = hasGlobal;
  let isLocal = hasLocal;

  // If no runtime or location specified, prompt interactively
  if (selectedRuntimes.length === 0) {
    console.log(`  ${yellow}Select runtime(s):${reset}`);
    console.log(`  ${dim}Separate multiple choices with commas (e.g., 1,3,5)${reset}\n`);
    console.log(`  1. Claude Code`);
    console.log(`  2. OpenCode`);
    console.log(`  3. Gemini CLI`);
    console.log(`  4. Codex`);
    console.log(`  5. Copilot CLI`);
    console.log(`  6. Antigravity`);
    console.log(`  7. Cursor`);
    console.log(`  8. Windsurf`);
    console.log(`  9. All runtimes\n`);

    const runtimeAnswer = await prompt('  Enter choice [1-9]: ');
    const choices = runtimeAnswer.split(',').map(c => c.trim());

    const runtimeMap = {
      '1': 'claude', '2': 'opencode', '3': 'gemini', '4': 'codex',
      '5': 'copilot', '6': 'antigravity', '7': 'cursor', '8': 'windsurf', '9': 'all'
    };

    for (const choice of choices) {
      if (runtimeMap[choice] === 'all') {
        selectedRuntimes = ['claude', 'opencode', 'gemini', 'codex', 'copilot', 'antigravity', 'cursor', 'windsurf'];
        break;
      } else if (runtimeMap[choice]) {
        selectedRuntimes.push(runtimeMap[choice]);
      }
    }

    console.log();
  }

  if (!isGlobal && !isLocal) {
    console.log(`  ${yellow}Select installation location:${reset}\n`);
    console.log(`  1. Global (all projects)`);
    console.log(`  2. Local (current project only)\n`);

    const locationAnswer = await prompt('  Enter choice [1-2]: ');
    isGlobal = locationAnswer === '1';
    isLocal = locationAnswer === '2';
    console.log();
  }

  // If both flags are set, prefer global
  if (isGlobal && isLocal) {
    isLocal = false;
  }

  // Install for each selected runtime
  const allFailures = [];
  for (const runtime of selectedRuntimes) {
    if (hasUninstall) {
      const configDir = isGlobal ? getGlobalDir(runtime) : path.join(process.cwd(), getDirName(runtime));
      const runtimeLabels = {
        claude: 'Claude Code',
        opencode: 'OpenCode',
        gemini: 'Gemini',
        codex: 'Codex',
        copilot: 'Copilot',
        antigravity: 'Antigravity',
        cursor: 'Cursor',
        windsurf: 'Windsurf'
      };
      console.log(`  Uninstalling from ${cyan}${runtimeLabels[runtime]}${reset}...`);
      const failures = uninstallVBB(configDir);
      allFailures.push(...failures);
      console.log();
    } else {
      const failures = installForRuntime(runtime, isGlobal);
      allFailures.push(...failures);
    }
  }

  // Summary
  if (allFailures.length > 0) {
    console.log(`  ${yellow}⚠ Some components failed to install:${reset}`);
    for (const failure of allFailures) {
      console.log(`    - ${failure}`);
    }
    console.log();
  }

  if (hasUninstall) {
    console.log(`  ${green}✓ VBB uninstalled successfully${reset}\n`);
  } else {
    console.log(`  ${green}✓ VBB installed successfully${reset}\n`);

    // Show installed commands dynamically
    const installedCommands = [];
    for (const runtime of selectedRuntimes) {
      const configDir = isGlobal ? getGlobalDir(runtime) : path.join(process.cwd(), getDirName(runtime));
      const vbbCommandsDir = path.join(configDir, 'commands', 'vbb');
      if (fs.existsSync(vbbCommandsDir)) {
        const files = fs.readdirSync(vbbCommandsDir);
        for (const file of files) {
          if (file.endsWith('.md')) {
            const cmdName = file.replace('.md', '');
            if (!installedCommands.includes(cmdName)) {
              installedCommands.push(cmdName);
            }
          }
        }
      }
    }

    if (installedCommands.length > 0) {
      console.log(`  ${dim}Available commands:${reset}`);
      for (const cmd of installedCommands.sort()) {
        console.log(`  ${cyan}/vbb:${cmd}${reset}`);
      }
      console.log();
    }
  }
}

// Run main
main().catch(err => {
  console.error(`${yellow}Error:${reset}`, err.message);
  process.exit(1);
});
