## Design

Aligns with https://salaryguide.com

### Mobile UX

It's better to use something like Tabs rather than forcing user to scroll (then you can't visually "compare" them)

## Functionality

* [X] Side-by-side compares the positions
* [X] Shows position in details in modal
* [X] Adapted to mobile devices
* [X] Supports more complicated data (for example, 5+ years)
* [X] Validates and sanitizes data
* [X] Highlight compensation for equivalent positions
* [X] Smooth modal opening (100ms)

### Mobile UX

It's better to use something like Tabs rather than forcing user to scroll (then you can't visually "compare" them)

## Tech Stack

TypeScript
React 19
Vite
Tailwind (with similary to https://salaryguide.com/ design palette)

## Code Quality

We're using typescript, linter, prettier, and husky (pre-commit and pre-push hooks) with relatively strict rules to ensure that code is readable, maintainable and prevent potentials errors

TODO: Add tests (jest) for core functionality

## Position Level Mapping

Each positions level finds its best match based on experience requirements and salary range

### Experience formats

For now, we only have one format: "x-y" (such as "0-1", "1-3" etc.)

**Assumption 1:** But what if we have other formats? For example, x+ (1+, 3+) etc.

So we're normalizing data (src/utils/parsers/experience.parser.ts)

"2-4" → { min: 2, max: 4 }
"5+" → { min: 5, max: 10 } (5-year range for "+")
"3" → { min: 3, max: 3 }
Invalid/empty → { min: 0, max: 0 }

### Experience Overlap

We're calculating percentage "overlap" between two experience ranges (src/utils/calculations/experience.ts)

[0-2] and [5-7] = 0% (no overlap)
[2-4] and [3-5] = 33% (partial overlap)
[2-4] and [2-4] = 100% (complete overlap)

### Salary Similarity Calculate

Then we compare salary ranges (median values) and return "similarity" percentage (src/utils/calculations/salary.ts)

50000 and 100000 = 33% similarity
50000 and 60000 = ~82% similarity
50000 and 50000 = 100% similarity

### Match by weight

**Assumption 2:** weight system is optimal for this task

Combines experience and salary metric with "weights" (easy to configure for our needs) (src/utils/match/level.match.ts)

**Assumption 3:** Experience weight is a bit more (60%) than salary (40%)

Match is only happen when "confidence" >= 50%

### Data Validation

**Assumption 3:** We need to filter unrealistic data
Realistic salary range: 60K - 1M

**Assumption 4:** Experience range "+" means 5 years

**Assumption 5:** Minimum confidence: 50%

## Flow

1. Normalize experience strings (if they can be different)
2. Calculate experience "overlap"
3. Calculate salaries "similarity"
4. Apply weights (priority for matching)
5. Return best match by calculated "confidence"

## What would I add with more time

1. Tests for calculations/mappers (that's the core functionality of this app)
2. FIXED: Modals for Level detail works fine, but I would make it more smoother (to improve UX)

## Additional

I added agency logos from internet, just to make it look better
