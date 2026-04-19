---
description: Analyze conversation and extract reusable patterns as skills
---

Analyze the conversation above and extract any patterns worth saving as skills.

## What to Extract

1. **Error Resolution Patterns** — what broke, root cause, what fixed it
2. **Debugging Techniques** — non-obvious steps, tool combinations that worked
3. **Workarounds** — library quirks, API limitations, version-specific fixes
4. **Project-Specific Patterns** — conventions discovered, architecture decisions, integration patterns

## Output Format

For each extracted pattern:

    ## Skill Name
    **What**: Brief description
    **Why**: When to use it
    **How**: Step-by-step explanation
    **Examples**: 2–3 concrete scenarios

## Verification Checklist

Before proposing a skill, confirm:
- Solves a real, recurring problem (not a one-time typo or outage)
- Saves time in future sessions
- Can be applied to new contexts
- Focused — one pattern per skill

## Process

1. Review the conversation for extractable patterns
2. Draft the skill file
3. Ask user to confirm before saving
4. Save confirmed skills to `.claude/skills/learned/`