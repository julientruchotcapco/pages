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
| HR Policy Assistant | `private/hr-policy/` (copy of `hr-prototype/dist`) | `docs/hr-policy/` |
| Securitization | login-enabled standalone build copied into `docs/securitization/` | re-keyed in place |

Then run (prompts for the password, or reads `PORTFOLIO_PASSWORD`):

```powershell
node tools/protect.mjs
```

For securitization, build `securitisation-ingestion-system/standalone-build` with `loginEnabled = true`, copy the output into `docs/securitization/` (including `js/login.js`), and run the tool with the same password as that build. It re-encrypts the payloads with the portfolio key and swaps in the portfolio loader.

## Changing the password

Delete `docs/auth/config.js`, provide fresh securitization build output, and run `node tools/protect.mjs` with the new password.
