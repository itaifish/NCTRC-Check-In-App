# NCTRC-Check-In-App

If you're getting the error:
```
[ERROR] Failed to execute goal com.cosium.code:git-code-format-maven-plugin:2.5:on-pre-commit (default-cli) on project NCTRCBackend: org.eclipse.jgit.api.errors.PatchApplyException: Cannot apply: HunkHeader[4,8->4,8] -> [Help 1]
```
run:
`$ git config --global core.autocrlf true `

Notes:
====
https://javalin.io/tutorials/javalin-java-10-google-guice

OAuth

Keystore Files:
====
HTTPS: In order to get https/ssl connection working, which is required for HIPPA complicance, you need to put a keystore.jks file in the resources/keystore folder. The easiest way to generate this jks file is following this tutorial: https://community.letsencrypt.org/t/tutorial-java-keystores-jks-with-lets-encrypt/34754/7. 

dynamodb: in keystore/database/ create a database.properties file with the following content:
```
accessKeyId=[access_key_id_text_here]
secretAccessKey=[secret_access_key_text_here]
```
replacing [access_key_id_text_here] and [secret_access_key_text_here] with the corresponding values for your dynamodb user account
