---
name: conventional-commits-guidelines
description: Create commits following Strict Conventional Commits format with emojis, enforcing clear scope inference, concise subjects, and detailed bodies. Use when making git commits to ensure consistency across the project.
---

# Conventional Commits Guidelines

⚠️ **IMPORTANT: All commits MUST be GPG-signed.**

**Agent Workflow:**
1. Create commits with `--no-gpg-sign` (sandbox limitation)
2. **Always alert user** to sign commits manually after committing
3. Provide signing command in the alert

**Follow these rules strictly for every commit.**

---

## Commit Message Format

```
<type>(<scope>): <emoji> <subject>

[optional body]

[optional footer]
```

---

## Type & Emoji Mapping

| Type | Emoji | Usage |
|------|-------|-------|
| `feat` | ✨ | New feature |
| `fix` | 🐛 | Bug fix |
| `docs` | 📝 | Documentation |
| `style` | 💄 | Formatting, semicolons, whitespace (no logic) |
| `refactor` | ♻️ | Code restructuring (no feature/fix) |
| `test` | ✅ | Tests added or updated |
| `chore` | 🔧 | Dependencies, tooling, build setup |
| `perf` | ⚡ | Performance improvement |
| `ci` | 👷 | CI/CD changes |

**Breaking Changes:** Use `!` before the colon: `feat(api)!: ✨`

---

## Scope Rules

**Generic scopes** (infer from project structure or module):
- `core` - Core utilities, auth, database, env
- `api` - API endpoints, route handlers
- `ui` - Components, styles, shared UI
- `lib` - Utility functions, helpers
- `config` - Configuration files
- `auth` - Authentication-specific logic
- `deps` - Dependency updates
- `types` - Type definitions
- `routing` - Routing setup, middleware
- `hook` - Custom React hooks

**Choose one scope per commit. If multiple scopes, the commit addresses a single primary module.**

---

## Subject Line Rules

- **Max 50 characters** (strict)
- **Imperative mood** (e.g., "add" not "adds" or "added")
- **Present tense**
- **Lowercase** (except names/acronyms)
- **No period** at the end
- **Be specific:** Avoid "update files", "fix bug", "improve code"

### Good Examples
- `feat(auth): ✨ add email verification flow`
- `fix(api): 🐛 prevent race condition in user creation`
- `docs(core): 📝 add environment setup guide`

### Bad Examples
- ❌ `feat(auth): ✨ Updates authentication` (generic, not imperative)
- ❌ `fix(api): 🐛 fixed request handling.` (period, past tense)
- ❌ `feat(core): ✨ Add multiple features and fix issues` (multiple topics)

---

## Body (Mandatory for Complex Logic)

**When to include:**
- Algorithmic changes
- Bug fixes with non-obvious solutions
- Refactoring that changes behavior
- New feature with multiple steps

**Rules:**
- **Explain the "why"**, not the "what" (the code shows what changed)
- **Max 72 characters per line**
- Use **bullet points** for multiple changes
- Be concise but thorough

### Example
```
feat(api): ✨ implement request rate limiting

Add rate limiter middleware to prevent abuse:
- Token bucket algorithm with 100 reqs/min per user
- Uses Redis for distributed rate limiting
- Breaks requests exceeding limit with 429 status

Motivation: Production incidents showed unauthenticated 
endpoints vulnerable to brute force attacks.
```

---

## Footer (Optional but Encouraged)

**Issue References:**
```
Closes #123
Fixes #456
Resolves #789
```

**Breaking Changes:**
```
BREAKING CHANGE: <description of what changed>

Migration path:
- Users must update ...
- API endpoint changed from ...
```

### Example
```
fix(auth): 🐛 fix session timeout behavior

Correct session TTL from milliseconds to seconds per spec.
Tests now pass with proper timing.

BREAKING CHANGE: Session.expiresAt now returns seconds, not milliseconds.

Migration: Multiply stored timestamps by 1000 when comparing with Date.now().

Closes #234
```

---

## Checklist Before Committing

- ✅ Type is valid (feat, fix, docs, etc.)
- ✅ Scope is one of the generic scopes
- ✅ Emoji matches the type
- ✅ Subject ≤ 50 chars, lowercase, imperative, no period
- ✅ Subject is specific (not "update", "fix", "improve")
- ✅ Body explains "why" (if complex)
- ✅ Body lines ≤ 72 chars
- ✅ Footer references issues or breaking changes (if needed)

## Post-Commit Checklist (Agent)

- ✅ **Alert user** that commit is unsigned
- ✅ **Provide signing command** (`git commit --amend --no-edit -S`)
- ✅ **Show commit hash and message** for reference

---

## Helper: Generate a Commit (Agent)

**Always use `--no-gpg-sign` in sandboxed environment:**

```bash
git commit --no-gpg-sign -m "TYPE(scope): EMOJI message"
# Or with body:
git commit --no-gpg-sign -m "TYPE(scope): EMOJI message" -m "Body here"
```

**Then immediately alert user to sign the commit.**

### Alternative: Interactive Tool

For manual commits, use `commitizen`:
```bash
npm install -D commitizen cz-conventional-changelog
npx cz commit
```

---

## GPG Signing (Important — Do Not Skip)

**All commits MUST be GPG-signed** to maintain security and code verification.

### Why Agent Uses `--no-gpg-sign`

The sandboxed environment cannot access GPG keys or prompt for passphrases. Therefore:
- Agent creates commits **without GPG signing**
- Agent **must alert user immediately** after each commit
- User signs commits manually using commands below

### How to Sign Commits Manually

**After agent creates commits, run in your terminal:**

```bash
# Sign the last commit
git commit --amend --no-edit -S

# Sign multiple recent commits (rebase from origin/main)
git rebase --exec 'git commit --amend --no-edit -S' origin/main

# Sign all commits since a specific commit
git rebase --exec 'git commit --amend --no-edit -S' <commit-hash>
```

**After signing, force-push (if already pushed unsigned commits):**
```bash
git push --force-with-lease origin main
```

### Agent Alert Template

**After creating any commit, the agent MUST display:**

```
✅ Commit created: <commit-hash> <message>

⚠️  ACTION REQUIRED: This commit is NOT GPG-signed.

Sign it now by running:
  git commit --amend --no-edit -S

Or sign multiple commits:
  git rebase --exec 'git commit --amend --no-edit -S' origin/main
```

### Verify Your Commits Are Signed

```bash
git log --pretty=format:"%h %G? %s" -5
# Output legend:
# G = good signature (signed correctly) ✅
# X = bad signature (corrupted) ❌
# N = no signature (unsigned) ⚠️
```

### Optional: Configure GPG Cache (Reduces Passphrase Prompts)

To avoid entering your GPG passphrase repeatedly:

```bash
# Edit GPG agent config
echo "default-cache-ttl 34560000" >> ~/.gnupg/gpg-agent.conf
echo "max-cache-ttl 34560000" >> ~/.gnupg/gpg-agent.conf

# Restart GPG agent
gpgconf --kill all
gpgconf --launch gpg-agent
```

After this, sign one commit and enter your passphrase — it will be cached for ~400 days.
