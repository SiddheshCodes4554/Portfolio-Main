# Portfolio terminal

The Inventor’s Desk console has a typed parser, a public-content command registry, reusable structured output, and a native-dialog PDF viewer. The circuit still controls power; the console starts on, and power cycling or minimizing preserves page-local state. The header GitHub link is removed; verified profile links remain in the console and contact chapter.

## Commands

`help`, `whoami`, `about`, `projects`, `project campusos|aeris|ingress`, `skills`, `education`, `experience`, `achievements`, `resume`, `contact`, `github`, `linkedin`, `ls`, `pwd`, `cd`, `cat`, `echo`, `date`, `clear`, `history`, `theme charcoal|paper`, `coffee`, `exit`.

The virtual tree is `/portfolio` with public `.txt` notes and a `projects` directory. No shell, JavaScript evaluation, real filesystem reads, environment lookup, or visitor-provided HTML is executed. Input is capped at 256 characters, history at 50 commands, and output at 20 results. `date` uses the browser’s clock. Theme and session state last for the current page only.

Enter runs commands; Up/Down recalls history while preserving an unfinished draft. Tab completes a nonempty command, or shows focusable suggestions. Shift+Tab and a subsequent Tab still allow ordinary navigation; Escape dismisses suggestions. Ctrl+L clears output. Ctrl+C cancels an unselected input without intercepting selected text copying. Results scroll when already at the end; otherwise the reading position remains stable with a Latest result button.

## Resume window

`resume` opens the existing public PDF inside a native dialog with an iframe. The modal contains focus, locks background scrolling, supports Escape and Close, and restores the opener’s focus. Download and new-tab links remain visible. A HEAD check handles a missing/wrong-type document; browsers that report no PDF preview capability get explicit fallback instructions. Native PDF zoom, gestures and keyboard behavior vary by browser, so physical mobile-browser testing remains useful. No PDF file or private source was changed.

## Verification

- `npm run test:terminal`: 5 tests cover every advertised command, parsing/quotes, unknown/prototype commands, structured content, predefined virtual paths, actions, themes and completion.
- `npm run test:contact`: 8 pass; `npm run test:lab`: 5 pass.
- Typecheck, lint and production build pass.
- Production Chrome checks: all commands; quick commands; native Enter; history; completion and suggestion dismissal; Ctrl+C/Ctrl+L; minimize/reopen; session persistence; project action selects the matching archive tab; contact scroll/focus; GitHub/LinkedIn destinations and safe new-tab options.
- PDF opens repeatedly, serves the actual public document, includes download/new-tab actions, closes with Escape, restores focus and locks background scrolling. Modal tab containment and simulated missing-PDF fallback checked.
- Manual reading position and Latest result behavior checked. Circuit off/on retains output. No initial input autofocus. Empty-input Tab does not trap focus.
- Screenshots at 1440×900, 1366×768, 1024×768, 768×1024, 430×932, 390×844: no horizontal overflow; hero fits both desktop heights; readable console and viewport-sized PDF dialog.
- Existing postcard mocked success/error, validation, duplicate guard, flip/draft/stamp state, focus/reset and reduced-motion checks pass. Existing marble and arcade keyboard/state/reduced-motion checks pass. Contact infrastructure is unchanged; no real emails sent.

No deployment was performed. Browser checks use desktop Chrome emulation; native PDF presentation and downloads can differ in iOS, Android, Firefox and Safari. Popup blockers may prevent automatic GitHub/LinkedIn opening; the result always includes a direct usable link.
