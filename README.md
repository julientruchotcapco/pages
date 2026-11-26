# Pages
A dedicated GitHub public pages repository to host my projects

## Password protection

Everything under `docs/` is public, so each project page is stored **encrypted** (AES-256-GCM, key derived with PBKDF2-SHA256, 600k iterations). The password is never stored in the repo; `docs/auth/config.js` only holds the salt and a hash used to verify the derived key.

- `docs/index.html` is the landing/login page. Any direct load of a project page without a valid session redirects there (`?next=` brings you back after login).
- After login, the derived key (not the password) is kept in `localStorage` (`portfolio_session`) for 7 days. **Sign out** clears it.
- `docs/auth/guard.js` is the shared gate that decrypts and renders the protected pages.

## Updating projects

Plaintext sources live in `private/` (git-ignored):

| Project | Source | Output |
|---|---|---|
| Rationalization | `private/rationalization/` | `docs/rationalization/` |
| AI Architecture | `private/ai-architecture/` | `docs/ai-architecture/` |
| HR Policy Assistant | `private/hr-policy/` (copy of `hr-prototype/dist`) | `docs/hr-policy/` |
| Securitization | `private/securitization/` (copy of the `securitisation-ingestion-system` standalone build, login disabled) | `docs/securitization/` |

Then run (prompts for the password, or reads `PORTFOLIO_PASSWORD`):

```powershell
node tools/protect.mjs
```

App scripts (`libs/assets/*-modules.json.*.js` for HR, `js/*.js` for securitization) are inlined into the encrypted `index.html` and left as empty stubs in `docs/`; only public vendor libraries stay readable.

## Changing the password

Delete `docs/auth/config.js` and run `node tools/protect.mjs` with the new password.
