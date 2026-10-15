# Decision log

| Date | Decision | Rationale | Follow-up |
| --- | --- | --- | --- |
| 2026-10-15 | Retain XpeedOPR as a multi-stack helpdesk demonstration. | The repository combines .NET, React, Angular, TypeScript, Docker, and an understandable domain. | Keep maturity boundaries visible in portfolio references. |
| 2026-10-15 | Describe ticket functionality as mock-backed. | The frontend does not yet use a persistent ticket API. | Plan backend ticket integration as a separate feature stream. |
| 2026-10-15 | Treat tracked development signing configuration as a promotion blocker. | Secrets and identity configuration need separate remediation and rotation work. | Create a security/configuration remediation issue before any external deployment. |
| 2026-10-15 | Keep this change documentation-only. | Implementation or configuration changes require targeted testing and review. | Use separate issues for each modernization concern. |
