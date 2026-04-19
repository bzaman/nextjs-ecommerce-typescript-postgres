---
description: Decompose component into smaller units
---

Decompose this component into smaller, focused units.

File: $ARGUMENTS

- Identify mixed responsibilities and logic
- Extract reusable utilities, hooks, and sub-components
- Place extracted hooks in `hooks/`, utilities in `utils/`, sub-components alongside the parent or in a co-located folder
- Maintain existing behavior and tests
- Do not change the public API or exported interface of the original component