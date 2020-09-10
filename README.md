# NCTRC-Check-In-App

If you're getting the error:
```
[ERROR] Failed to execute goal com.cosium.code:git-code-format-maven-plugin:2.5:on-pre-commit (default-cli) on project NCTRCBackend: org.eclipse.jgit.api.errors.PatchApplyException: Cannot apply: HunkHeader[4,8->4,8] -> [Help 1]
```
run:
`$ git config --global core.autocrlf true `
