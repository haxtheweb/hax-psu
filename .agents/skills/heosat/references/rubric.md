# Higher Education Open Source Assessment Tool (HEOSAT)

> A guided maturity assessment for open source software projects in higher education and edtech.

Rubric version: **2026.07 enhanced guidance edition**
Source: <https://locusplex.us/HEOSAT/assets/js/heosat.js> (extracted 2026-09-30)

## Maturity scale

Every question is scored on this 6-level scale (0-5):

- **0 — Not present**
- **1 — Ad hoc / emerging**
- **2 — Documented**
- **3 — Practiced consistently**
- **4 — Measured and improving**
- **5 — Leading / exemplary**

## Contents

- 1. Legal & Licensing (LL1, LL2, LL3, LL4, LL5)
- 2. Governance & Decision-Making (GV1, GV2, GV3, GV4, GV5)
- 3. Community Engagement (CE1, CE2, CE3, CE4, CE5)
- 4. Documentation & Onboarding (DO1, DO2, DO3, DO4, DO5)
- 5. Project Operations & Roadmap (PO1, PO2, PO3, PO4, PO5)
- 6. Security & Risk Management (SR1, SR2, SR3, SR4, SR5)
- 7. Accessibility, Standards & Interoperability (AS1, AS2, AS3, AS4, AS5)
- 8. Adoption, Impact & Institutional Fit (AI1, AI2, AI3, AI4, AI5)
- 9. Financial & Organizational Sustainability (FS1, FS2, FS3, FS4, FS5)

## 1. Legal & Licensing

Licensing clarity, copyright provenance, and reuse obligations.

### LL1 — The project is distributed with a clearly identified Open Source Initiative (OSI) Approved Open Source License ®.

An OSI-approved license is the legal foundation that tells users, contributors, institutions, and vendors what they may do with the software. The Open Source Definition <https://opensource.org/osd> and OSI Approved Licenses <https://opensource.org/licenses> provide trusted, reviewed standards for permissions to use, study, modify, and redistribute software.

Higher education perspective. Colleges and universities need licensing clarity for procurement, counsel review, technology transfer, research compliance, and downstream sharing with partners. Clear licensing lowers adoption friction for edtech and research software.

What good looks like. A mature project names the license on the website, in the repository, in package metadata, and in release artifacts, and avoids custom ambiguous terms.

**Evidence to look for:**

- LICENSE or COPYING file
- License named in README and website
- Package metadata includes license
- Release archives include the license

**Learn more:**

- [Open Source Definition](https://opensource.org/osd)
- [OSI Approved Licenses](https://opensource.org/licenses)
- [Producing Open Source Software](https://producingoss.com/)
- [OSS Watch Openness Rating](https://oss-watch.ac.uk/apps/openness/)

### LL2 — Every repository and distributed artifact includes license and copyright notices.

Selecting a license is not enough; the license must travel with the code. Copyright and license notices preserve legal provenance when software is forked, mirrored, packaged, embedded, or redistributed.

Higher education perspective. Higher education projects often move between labs, grant teams, campuses, vendors, and foundations. Notices help future maintainers, counsel, and adopters understand rights and obligations after original staff or funding changes.

What good looks like. A mature project includes LICENSE/COPYING files, copyright statements, SPDX identifiers where appropriate, and license notices in release packages and documentation.

**Evidence to look for:**

- LICENSE/COPYING files in each repo
- Copyright headers or REUSE metadata
- SPDX identifiers
- Release artifacts contain notices

**Learn more:**

- [SPDX License List](https://spdx.org/licenses/)
- [REUSE Specification](https://reuse.software/spec/)
- [OSI Approved Licenses](https://opensource.org/licenses)
- [Producing Open Source Software](https://producingoss.com/)

### LL3 — The project documents third-party dependencies and their licenses.

Open source projects inherit obligations from the libraries, frameworks, fonts, images, and build tools they use. Dependency license documentation prevents accidental incompatibility and makes reuse safer.

Higher education perspective. Campus IT and edtech procurement teams increasingly require software bills of materials, dependency inventories, and compliance evidence before adoption. This is especially important for projects distributed to multiple institutions.

What good looks like. A mature project maintains dependency manifests, reviews license compatibility, documents exceptions, and uses automated tools to detect changes.

**Evidence to look for:**

- Dependency manifest or SBOM
- Automated license scan results
- Policy for acceptable dependency licenses
- Review notes for major dependency changes

**Learn more:**

- [SPDX License List](https://spdx.org/licenses/)
- [OpenSSF Best Practices Badge Program](https://www.bestpractices.dev/)
- [OpenSSF Scorecard](https://securityscorecards.dev/)
- [REUSE Specification](https://reuse.software/spec/)

### LL4 — The project has a documented contributor licensing or contribution agreement policy.

Projects need to know that contributions can legally be included and redistributed. Contributor licensing policies clarify whether inbound contributions are accepted under the project license, a Developer Certificate of Origin, or a contributor agreement.

Higher education perspective. Universities may have employment, student work, grant, and technology transfer rules that affect contribution rights. A documented policy helps contributors and their institutions participate confidently.

What good looks like. A mature project states contribution licensing expectations in CONTRIBUTING.md, uses DCO or CLA processes only when needed, and avoids surprising contributors.

**Evidence to look for:**

- CONTRIBUTING.md licensing section
- DCO/CLA records if used
- Pull request attestation process
- Institutional contribution guidance

**Learn more:**

- [Producing Open Source Software](https://producingoss.com/)
- [Open Source Guides](https://opensource.guide/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)
- [Open Source Definition](https://opensource.org/osd)

### LL5 — The project explains trademark, name, logo, and brand usage expectations.

Licenses govern code, but project names, logos, and marks often have separate rules. Clear brand guidance prevents confusion about official releases, services, endorsements, and compatible distributions.

Higher education perspective. Edtech projects are frequently adopted by campuses and implemented by vendors. Trademark clarity helps institutions identify trusted sources while allowing a healthy service ecosystem.

What good looks like. A mature project documents acceptable use of names and logos, distinguishes community and vendor offerings, and explains how official releases are identified.

**Evidence to look for:**

- Trademark or brand policy
- Logo usage guidance
- Release authenticity guidance
- Vendor or partner listing criteria

**Learn more:**

- [Producing Open Source Software](https://producingoss.com/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)
- [Open Source Guides](https://opensource.guide/)

## 2. Governance & Decision-Making

Transparent authority, participation, and project stewardship.

### GV1 — The project has a public governance model describing roles, authority, and decision-making processes.

Governance turns a code repository into a durable community. Clear roles and decision rules reduce uncertainty, prevent bottlenecks, and make it possible for new contributors to earn trust.

Higher education perspective. Higher education projects often span multiple institutions. Public governance helps campuses, funders, vendors, and contributors understand how priorities are set and how participation leads to influence.

What good looks like. A mature project publishes maintainership roles, voting or consensus rules, escalation paths, and processes for adding or retiring leaders.

**Evidence to look for:**

- Governance document
- Maintainer roster
- Decision records
- Documented role definitions

**Learn more:**

- [Producing Open Source Software](https://producingoss.com/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [OSS Watch Openness Rating](https://oss-watch.ac.uk/apps/openness/)

### GV2 — The project records significant technical and community decisions in public venues.

Public decision records create institutional memory and make project direction understandable to people who were not in the room. This supports transparency and continuity.

Higher education perspective. Academic and campus projects experience frequent staff, student, and funding turnover. Decision records reduce knowledge loss and help new institutional adopters evaluate project direction.

What good looks like. A mature project uses issue discussions, meeting notes, RFCs, architectural decision records, or mailing list archives for major decisions.

**Evidence to look for:**

- Meeting minutes
- Architecture decision records
- RFC or proposal process
- Public issue discussions

**Learn more:**

- [Producing Open Source Software](https://producingoss.com/)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)

### GV3 — The project has a defined process for adding, reviewing, and removing maintainers or committers.

Maintainer processes protect project quality while making leadership renewal possible. Without them, projects become dependent on informal personal networks.

Higher education perspective. Many higher education projects (even commercially supported) begin in or are adopted by one lab, an individual department, or a single campus. A transparent maintainer pathway helps them become multi-institutional assets rather than single-site projects.

What good looks like. A mature project explains eligibility, nomination, review, responsibilities, and offboarding for maintainers.

**Evidence to look for:**

- Maintainer policy
- Committer list
- Nomination or review records
- Offboarding process

**Learn more:**

- [Producing Open Source Software](https://producingoss.com/)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [Open Source Guides](https://opensource.guide/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)

### GV4 — The project has policies for conflicts of interest, vendor participation, and institutional influence.

Open projects benefit from institutional and commercial participation, but unmanaged influence can erode trust. Conflict policies clarify how decisions remain community-serving.

Higher education perspective. Edtech ecosystems often include campuses, foundations, vendors, and funders. Clear participation rules help ensure that no single stakeholder can quietly capture project direction.

What good looks like. A mature project discloses affiliations, documents voting limits or recusal expectations, and treats vendor participation as welcome but transparent.

**Evidence to look for:**

- Conflict of interest policy
- Affiliation disclosures
- Vendor participation guidelines
- Meeting minutes showing recusals when needed

**Learn more:**

- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)
- [Producing Open Source Software](https://producingoss.com/)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)

### GV5 — The project periodically reviews governance effectiveness and updates policies.

Governance that worked for a small founding team may not work for a multi-institutional community. Periodic review keeps authority, participation, and accountability aligned with project reality.

Higher education perspective. Universities and funders increasingly look for evidence that software communities can sustain themselves beyond a single grant or champion. Governance review demonstrates stewardship.

What good looks like. A mature project schedules governance reviews, invites community input, and publishes changes with rationale.

**Evidence to look for:**

- Governance review notes
- Community survey results
- Updated governance versions
- Board or steering committee minutes

**Learn more:**

- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)

## 3. Community Engagement

Welcoming participation, communication, and community health.

### CE1 — The project identifies its target users, contributors, adopters, and stakeholder communities.

Community work is more effective when a project knows who it serves. Clear audience definitions guide documentation, roadmap choices, outreach, and support expectations.

Higher education perspective. Higher education edtech may serve faculty, students, instructional designers, registrars, researchers, accessibility staff, and IT teams. Naming these groups prevents the project from optimizing only for developers.

What good looks like. A mature project documents stakeholder groups and uses them to shape roadmap, support, and engagement practices.

**Evidence to look for:**

- Persona or stakeholder documentation
- Community strategy
- Adoption materials by audience
- Roadmap linked to user needs

**Learn more:**

- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [Open Source Guides](https://opensource.guide/)

### CE2 — The project provides welcoming contribution pathways for non-code and code contributors.

Successful open source projects need more than code. Documentation, design, testing, accessibility review, translation, training, governance, and user support are all valuable contributions.

Higher education perspective. Higher education communities include many domain experts who may not be software developers. Recognizing non-code contribution invites faculty, librarians, students, instructional designers, and administrators into the project.

What good looks like. A mature project lists contribution types, labels beginner-friendly issues, and explains how contributors can help regardless of technical role.

**Evidence to look for:**

- CONTRIBUTING.md
- Good first issue labels
- Non-code contribution guide
- Contributor recognition records

**Learn more:**

- [All Contributors Specification](https://allcontributors.org/)
- [Open Source Guides](https://opensource.guide/)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [Producing Open Source Software](https://producingoss.com/)

### CE3 — The project has public communication channels with clear participation norms.

Public communication channels make support, collaboration, and community knowledge visible. Participation norms help keep discussions productive and welcoming.

Higher education perspective. Campus adopters need to know where to ask questions, report problems, and connect with peers. Public channels reduce dependency on private emails and vendor-only support paths.

What good looks like. A mature project maintains listed channels, moderates them consistently, and archives important knowledge in searchable places.

**Evidence to look for:**

- Website channel list
- Forum, mailing list, chat, or issue tracker links
- Moderation guidelines
- Archived discussions

**Learn more:**

- [Producing Open Source Software](https://producingoss.com/)
- [Open Source Guides](https://opensource.guide/)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [Contributor Covenant](https://www.contributor-covenant.org/)

### CE4 — The project has a code of conduct and an incident response process.

A code of conduct sets expectations for respectful collaboration, but it is only meaningful when paired with reporting and response procedures. This supports psychological safety and community trust.

Higher education perspective. Higher education projects often include students, staff, faculty, vendors, and international participants with different power relationships. Clear conduct processes help institutions participate responsibly.

What good looks like. A mature project publishes conduct standards, reporting contacts, response procedures, and periodic maintainer training or review.

**Evidence to look for:**

- CODE_OF_CONDUCT.md
- Reporting contacts
- Incident response process
- Moderator or maintainer training notes

**Learn more:**

- [Contributor Covenant](https://www.contributor-covenant.org/)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [Open Source Guides](https://opensource.guide/)

### CE5 — The project measures and responds to community health indicators.

Community health is observable through contributor activity, responsiveness, diversity of participation, retention, and governance load. Measurement helps maintainers identify risks before they become crises.

Higher education perspective. Funders and campuses increasingly ask whether projects have broad enough participation to sustain adoption. Community metrics provide evidence while also guiding improvement.

What good looks like. A mature project tracks selected metrics, discusses them publicly, and uses them to improve onboarding, support, and governance.

**Evidence to look for:**

- Community dashboard
- Contributor activity reports
- Response time metrics
- Survey results and actions

**Learn more:**

- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)

## 4. Documentation & Onboarding

Usable knowledge for adopters, users, administrators, and contributors.

### DO1 — The project has clear installation, configuration, and upgrade documentation.

Installation and upgrade documentation determine whether interested adopters can become successful users. Poor operational documentation creates hidden support burden and adoption risk.

Higher education perspective. Campus IT teams need to estimate effort, infrastructure, staffing, integration, and lifecycle costs before adopting edtech. Clear documentation supports responsible institutional decision-making.

What good looks like. A mature project provides tested install guides, configuration references, upgrade paths, and known limitations for supported environments.

**Evidence to look for:**

- Install guide
- Configuration reference
- Upgrade guide
- Supported platform matrix

**Learn more:**

- [Diátaxis Documentation Framework](https://diataxis.fr/)
- [Write the Docs Guide](https://www.writethedocs.org/guide/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [OSS Watch Openness Rating](https://oss-watch.ac.uk/apps/openness/)

### DO2 — The project provides end-user documentation appropriate to its primary audiences.

User documentation converts software capability into actual impact. It reduces support load, improves adoption, and helps users understand how the software fits their workflows.

Higher education perspective. In higher education, users may include faculty, students, advisors, researchers, and administrative staff. Documentation must match their context, not just developer assumptions.

What good looks like. A mature project provides task-based guides, tutorials, screenshots or examples, and version-aware documentation.

**Evidence to look for:**

- User guides
- Tutorials
- FAQs
- Versioned documentation site

**Learn more:**

- [Diátaxis Documentation Framework](https://diataxis.fr/)
- [Write the Docs Guide](https://www.writethedocs.org/guide/)
- [EDUCAUSE Open Source resources](https://library.educause.edu/topics/information-technology-management-and-leadership/open-source-software)

### DO3 — The project documents contributor onboarding, development environment setup, and review workflows.

Contributor onboarding reduces the time between interest and useful participation. It also makes development practices consistent and easier to review.

Higher education perspective. Student workers, graduate assistants, campus developers, and vendor partners often contribute for limited periods. Strong onboarding preserves continuity despite turnover.

What good looks like. A mature project includes development setup, coding standards, tests, review expectations, and communication norms in a contributor guide.

**Evidence to look for:**

- CONTRIBUTING.md
- Developer setup guide
- Coding standards
- Pull request template

**Learn more:**

- [Producing Open Source Software](https://producingoss.com/)
- [Open Source Guides](https://opensource.guide/)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [Write the Docs Guide](https://www.writethedocs.org/guide/)

### DO4 — The project maintains architecture and integration documentation.

Architecture documentation helps contributors reason about the system and helps adopters assess fit, extensibility, and operational risk.

Higher education perspective. Edtech rarely stands alone. Campuses need to understand identity, LMS, SIS, data, analytics, accessibility, and privacy integrations before adoption.

What good looks like. A mature project documents major components, data flows, APIs, extension points, deployment models, and integration assumptions.

**Evidence to look for:**

- Architecture overview
- API documentation
- Integration guides
- Data flow diagrams

**Learn more:**

- [OpenAPI Specification](https://www.openapis.org/)
- [1EdTech Standards](https://www.1edtech.org/standards)
- [Diátaxis Documentation Framework](https://diataxis.fr/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)

### DO5 — Documentation is maintained as part of the release and contribution process.

Documentation becomes unreliable when it is treated as separate from development. Keeping docs in the workflow ensures users and adopters receive accurate guidance.

Higher education perspective. Campus adoption decisions often depend on documentation accuracy. Out-of-date docs increase support costs and can create failed implementations.

What good looks like. A mature project reviews documentation changes with code changes, versions docs with releases, and assigns ownership for critical docs.

**Evidence to look for:**

- Documentation review checklist
- Docs included in PR process
- Versioned docs
- Release notes with documentation updates

**Learn more:**

- [Write the Docs Guide](https://www.writethedocs.org/guide/)
- [Diátaxis Documentation Framework](https://diataxis.fr/)
- [Producing Open Source Software](https://producingoss.com/)
- [OpenSSF Best Practices Badge Program](https://www.bestpractices.dev/)

## 5. Project Operations & Roadmap

Planning, release management, and operational transparency.

### PO1 — The project publishes a roadmap or planning process that communicates priorities and timelines.

A roadmap helps contributors and adopters understand where the project is going and how to align their own work. Even when dates change, transparent priorities build trust.

Higher education perspective. Campuses need to plan budgets, integrations, upgrades, and training. Roadmap visibility helps institutions decide whether a project aligns with academic and operational needs.

What good looks like. A mature project publishes priorities, decision criteria, expected releases, and opportunities for community input.

**Evidence to look for:**

- Public roadmap
- Planning meeting notes
- Milestone board
- Prioritization criteria

**Learn more:**

- [Producing Open Source Software](https://producingoss.com/)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)

### PO2 — The project uses a public issue tracker with triage, labels, and response expectations.

Issue trackers are where user needs, bugs, feature requests, and maintenance work become visible. Triage practices prevent reports from disappearing into a backlog.

Higher education perspective. Institutional adopters need confidence that problems can be reported, tracked, prioritized, and resolved transparently across organizations.

What good looks like. A mature project labels issues, distinguishes support from bugs, documents response expectations, and closes or updates stale work.

**Evidence to look for:**

- Public issue tracker
- Labels and templates
- Triage notes
- Response time goals

**Learn more:**

- [Producing Open Source Software](https://producingoss.com/)
- [Open Source Guides](https://opensource.guide/)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [OSS Watch Openness Rating](https://oss-watch.ac.uk/apps/openness/)

### PO3 — The project follows a predictable release process with changelogs and versioning.

Releases are the interface between development and adoption. Predictable versioning and changelogs help users understand risk, compatibility, and upgrade urgency.

Higher education perspective. Campus environments require change control, training, maintenance windows, and vendor coordination. Clear release practices make edtech safer to operate.

What good looks like. A mature project uses semantic or documented versioning, publishes changelogs, signs or verifies releases where possible, and documents upgrade impact.

**Evidence to look for:**

- Release checklist
- Changelog
- Versioning policy
- Release artifacts

**Learn more:**

- [Producing Open Source Software](https://producingoss.com/)
- [OpenSSF Best Practices Badge Program](https://www.bestpractices.dev/)
- [Supply-chain Levels for Software Artifacts](https://slsa.dev/)
- [OSS Watch Openness Rating](https://oss-watch.ac.uk/apps/openness/)

### PO4 — The project has defined support channels and support boundaries.

Support expectations protect both users and maintainers. Clear boundaries explain what the community can provide and where paid, institutional, or vendor support may be needed.

Higher education perspective. Higher education adopters often require operational support beyond community help. Transparent boundaries allow campuses to plan staffing and service contracts responsibly.

What good looks like. A mature project distinguishes community support, professional services, security reporting, and institutional escalation paths.

**Evidence to look for:**

- Support policy
- Forum or help desk links
- Service provider list
- Security contact

**Learn more:**

- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)
- [Producing Open Source Software](https://producingoss.com/)

### PO5 — The project tracks maintainership capacity and bus factor risks.

A project can appear active while depending on too few people. Tracking maintainership capacity reveals risks to review, release, security, and governance work.

Higher education perspective. Grant-funded and campus-born software often depends on a small number of champions. Institutions need evidence that critical knowledge and responsibility are distributed.

What good looks like. A mature project monitors maintainer workload, documents responsibilities, cross-trains contributors, and recruits successors.

**Evidence to look for:**

- Maintainer roster
- CODEOWNERS or ownership map
- Review load metrics
- Succession plans

**Learn more:**

- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [Producing Open Source Software](https://producingoss.com/)

## 6. Security & Risk Management

Vulnerability handling, supply chain risk, and operational trust.

### SR1 — The project has a documented security policy and private vulnerability reporting process.

Security issues require a safe way to report, coordinate, fix, and disclose vulnerabilities. A public-only bug process can expose users before fixes are available.

Higher education perspective. Edtech systems often handle student, employee, research, or identity data. Campuses need confidence that vulnerabilities can be reported and managed responsibly.

What good looks like. A mature project publishes SECURITY.md, reporting contacts, disclosure timelines, supported versions, and acknowledgement practices.

**Evidence to look for:**

- SECURITY.md
- Security contact
- Disclosure process
- Supported versions list

**Learn more:**

- [OpenSSF Best Practices Badge Program](https://www.bestpractices.dev/)
- [OpenSSF Scorecard](https://securityscorecards.dev/)
- [OWASP Software Assurance Maturity Model](https://owaspsamm.org/)

### SR2 — The project uses automated testing, dependency scanning, and continuous integration.

Automation catches regressions, insecure dependencies, and build failures early. It raises baseline quality and reduces reliance on individual memory.

Higher education perspective. Campus deployments need reliable upgrades and evidence of operational discipline. Automated checks support institutional risk review and service continuity.

What good looks like. A mature project runs tests and scans on pull requests, blocks unsafe changes where appropriate, and publishes build status.

**Evidence to look for:**

- CI configuration
- Test results
- Dependency scan reports
- Build badges

**Learn more:**

- [OpenSSF Best Practices Badge Program](https://www.bestpractices.dev/)
- [OpenSSF Scorecard](https://securityscorecards.dev/)
- [OWASP Software Assurance Maturity Model](https://owaspsamm.org/)
- [Producing Open Source Software](https://producingoss.com/)

### SR3 — The project manages software supply chain integrity for releases.

Users need confidence that release artifacts correspond to reviewed source code and have not been tampered with. Supply chain practices reduce risk from compromised builds, dependencies, or accounts.

Higher education perspective. Higher education institutions increasingly require provenance, SBOMs, and artifact verification for software used in critical academic and administrative systems.

What good looks like. A mature project signs or verifies releases, protects build credentials, documents provenance, and considers SBOM publication.

**Evidence to look for:**

- Signed releases or checksums
- SBOM
- Protected CI secrets
- Provenance records

**Learn more:**

- [Supply-chain Levels for Software Artifacts](https://slsa.dev/)
- [SPDX License List](https://spdx.org/licenses/)
- [OpenSSF Scorecard](https://securityscorecards.dev/)
- [OpenSSF Best Practices Badge Program](https://www.bestpractices.dev/)

### SR4 — The project documents privacy, data handling, and compliance-relevant practices.

Software that processes personal, student, or research data must explain what data it collects, stores, transmits, and logs. Privacy documentation turns hidden risk into reviewable information.

Higher education perspective. Higher education systems may implicate FERPA, GDPR, accessibility, research ethics, data retention, and local institutional policies. Clear data handling documentation is central to edtech adoption.

What good looks like. A mature project documents data flows, retention settings, logging practices, administrative controls, and privacy-relevant configuration.

**Evidence to look for:**

- Privacy documentation
- Data flow diagrams
- Configuration for retention/logging
- Compliance notes

**Learn more:**

- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [EDUCAUSE Open Source resources](https://library.educause.edu/topics/information-technology-management-and-leadership/open-source-software)
- [OWASP Software Assurance Maturity Model](https://owaspsamm.org/)
- [1EdTech Standards](https://www.1edtech.org/standards)

### SR5 — The project has an incident response and post-incident learning process.

Incidents are inevitable in mature software operations. A response process reduces confusion, coordinates communication, and captures lessons that improve the project.

Higher education perspective. Campuses need to know who will communicate about outages, vulnerabilities, data exposure, and upgrade urgency. Post-incident learning supports institutional trust.

What good looks like. A mature project defines severity, roles, communication channels, timelines, and retrospective practices.

**Evidence to look for:**

- Incident response plan
- Severity definitions
- Communication templates
- Post-incident reviews

**Learn more:**

- [OWASP Software Assurance Maturity Model](https://owaspsamm.org/)
- [OpenSSF Best Practices Badge Program](https://www.bestpractices.dev/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)

## 7. Accessibility, Standards & Interoperability

Inclusive design and higher education ecosystem fit.

### AS1 — The project follows accessibility standards and includes accessibility in testing and release review.

Accessibility is a core quality attribute, not an optional feature. Designing and testing for accessibility ensures software can be used by people with diverse needs.

Higher education perspective. Higher education has strong legal, ethical, and mission-based obligations to provide accessible learning and administrative technology. Accessibility affects adoption, procurement, and student success.

What good looks like. A mature project references WCAG, tests key workflows, documents known issues, and includes accessibility review in release processes.

**Evidence to look for:**

- Accessibility statement
- WCAG test results
- Keyboard/screen reader checks
- Known accessibility issues

**Learn more:**

- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [EDUCAUSE Open Source resources](https://library.educause.edu/topics/information-technology-management-and-leadership/open-source-software)
- [OpenSSF Best Practices Badge Program](https://www.bestpractices.dev/)

### AS2 — The project supports relevant education technology standards and documents interoperability.

Interoperability prevents lock-in and allows software to participate in a broader ecosystem. Standards reduce custom integration costs and make adoption more feasible.

Higher education perspective. Campuses depend on LMSs, SISs, identity platforms, repositories, analytics systems, and learning tools working together. Edtech standards are often central to procurement decisions.

What good looks like. A mature project documents supported standards, certification status if applicable, APIs, data formats, and integration examples.

**Evidence to look for:**

- Standards support matrix
- API docs
- Integration examples
- Certification evidence where relevant

**Learn more:**

- [1EdTech Standards](https://www.1edtech.org/standards)
- [OpenAPI Specification](https://www.openapis.org/)
- [EDUCAUSE Open Source resources](https://library.educause.edu/topics/information-technology-management-and-leadership/open-source-software)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)

### AS3 — The project provides APIs, export options, or data portability mechanisms.

Data portability preserves user and institutional control. APIs and export options make migration, analysis, archiving, and integration possible.

Higher education perspective. Higher education institutions seek to avoid vendor lock-in and preserve stewardship of academic, research, and student data. Portability supports digital sovereignty and long-term control.

What good looks like. A mature project provides documented APIs, bulk export/import, stable schemas, and migration guidance.

**Evidence to look for:**

- API reference
- Export/import tools
- Data schema documentation
- Migration guide

**Learn more:**

- [OpenAPI Specification](https://www.openapis.org/)
- [1EdTech Standards](https://www.1edtech.org/standards)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [EDUCAUSE Open Source resources](https://library.educause.edu/topics/information-technology-management-and-leadership/open-source-software)

### AS4 — The project supports localization, internationalization, or adaptation for diverse institutional contexts when relevant.

Open source projects can serve global communities only when language, locale, policy, and institutional variation are considered. Adaptability expands participation and adoption.

Higher education perspective. Higher education is international. Projects used across regions may need multilingual interfaces, local policy configuration, and culturally appropriate documentation.

What good looks like. A mature project externalizes strings, documents localization workflows, welcomes translation contributions, and avoids hard-coded institutional assumptions.

**Evidence to look for:**

- Localization files
- Translation workflow
- Locale configuration
- International contributor guidance

**Learn more:**

- [Open Source Guides](https://opensource.guide/)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)

### AS5 — The project documents supported platforms, browsers, devices, and deployment environments.

Compatibility documentation helps adopters understand whether software will work in their environment and what tradeoffs may exist.

Higher education perspective. Campuses operate diverse infrastructure and user devices. Clear support matrices reduce failed pilots and support surprises.

What good looks like. A mature project publishes tested environments, minimum versions, deprecation timelines, and compatibility notes.

**Evidence to look for:**

- Support matrix
- Browser/device testing notes
- Deprecation policy
- Deployment examples

**Learn more:**

- [Write the Docs Guide](https://www.writethedocs.org/guide/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [OpenSSF Best Practices Badge Program](https://www.bestpractices.dev/)

## 8. Adoption, Impact & Institutional Fit

Evidence that the project solves real higher education needs.

### AI1 — The project describes its value proposition and use cases for higher education stakeholders.

A project needs to explain the problems it solves and for whom. A clear value proposition helps potential adopters assess fit and helps contributors prioritize meaningful work.

Higher education perspective. Higher education decision-makers include academic, administrative, technical, financial, and compliance stakeholders. Use cases help each group understand relevance.

What good looks like. A mature project publishes use cases, benefits, limitations, and stakeholder-specific adoption materials.

**Evidence to look for:**

- Use case pages
- Adoption guide
- Stakeholder briefs
- Demo materials

**Learn more:**

- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [EDUCAUSE Open Source resources](https://library.educause.edu/topics/information-technology-management-and-leadership/open-source-software)

### AI2 — The project provides evidence of adoption, deployments, or community use.

Adoption evidence demonstrates that software is useful beyond its founding team. It also helps potential users find peers and implementation examples.

Higher education perspective. Campuses often prefer to learn from other institutions before adopting edtech. Public adoption evidence supports peer validation and reduces perceived risk.

What good looks like. A mature project maintains adopter lists, case studies, testimonials, usage statistics, or implementation stories with permission.

**Evidence to look for:**

- Adopter list
- Case studies
- Usage metrics
- Conference presentations

**Learn more:**

- [OSS Watch Openness Rating](https://oss-watch.ac.uk/apps/openness/)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)

### AI3 — The project supports evaluation, pilots, and procurement due diligence.

Even open source software must be evaluated. Materials for pilots and due diligence help organizations understand requirements, costs, risks, and responsibilities.

Higher education perspective. Campus procurement and governance often require accessibility, security, privacy, support, hosting, and integration reviews. Projects that prepare these materials are easier to adopt.

What good looks like. A mature project provides pilot guidance, technical requirements, risk documentation, and implementation planning materials.

**Evidence to look for:**

- A current and completed HEOSAT report
- Pilot checklist
- Technical requirements
- Risk and compliance notes
- Implementation plan template

**Learn more:**

- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [EDUCAUSE Open Source resources](https://library.educause.edu/topics/information-technology-management-and-leadership/open-source-software)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)

### AI4 — The project documents implementation services, hosting options, or support partners when available.

Service ecosystem information helps adopters understand how to operationalize the software. It also creates sustainable opportunities for vendors and institutions to contribute back.

Higher education perspective. Many institutions lack internal capacity to deploy and maintain every edtech system. Clear service options make open source adoption more feasible without undermining community governance.

What good looks like. A mature project lists community, institutional, foundation, and commercial support options transparently.

**Evidence to look for:**

- Service provider list
- Hosting documentation
- Support boundaries
- Partner participation policy

**Learn more:**

- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)

### AI5 — The project collects user feedback and uses it to improve product direction.

Feedback loops ensure the project remains aligned with real user needs rather than only maintainer assumptions. They also reveal adoption barriers.

Higher education perspective. In education, workflows differ across institutions, disciplines, and user roles. Structured feedback helps projects serve diverse contexts.

What good looks like. A mature project uses surveys, user groups, advisory boards, usability testing, and issue analysis to shape priorities.

**Evidence to look for:**

- User survey results
- Advisory group notes
- Usability testing records
- Roadmap changes linked to feedback

**Learn more:**

- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [EDUCAUSE Open Source resources](https://library.educause.edu/topics/information-technology-management-and-leadership/open-source-software)

## 9. Financial & Organizational Sustainability

Resources, continuity, and stewardship beyond initial development.

### FS1 — The project identifies current and needed resources for maintenance, governance, support, and growth.

Software sustainability depends on more than feature development. Projects need resources for maintenance, security, documentation, community management, infrastructure, and governance.

Higher education perspective. Academic projects often receive funding to build software but not to sustain it. Making resource needs explicit helps institutions and funders plan realistic support.

What good looks like. A mature project documents roles, effort, infrastructure costs, and resource gaps for ongoing operations.

**Evidence to look for:**

- Sustainability plan
- Budget or resource model
- Role inventory
- Maintenance backlog

**Learn more:**

- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)

### FS2 — The project has a funding, membership, sponsorship, or institutional support model.

A funding model connects project value to the resources needed to maintain it. Without one, projects may become dependent on unpaid labor or short-term grants.

Higher education perspective. Higher education open source often relies on a mix of institutional membership, grants, foundation support, commercial services, and community contributions. A transparent model helps adopters understand how to support shared infrastructure.

What good looks like. A mature project explains how funding is received, governed, spent, and connected to community priorities.

**Evidence to look for:**

- Funding model
- Membership or sponsorship materials
- Budget transparency
- Grant or institutional commitments

**Learn more:**

- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [Apereo Incubation](https://www.apereo.org/programs/software-incubation)

### FS3 — The project has a plan for post-grant or post-founder continuity.

Many projects fail when founding funding or leadership ends. Continuity planning protects users, contributors, and institutional investments.

Higher education perspective. Research and edtech projects often begin with grants, faculty champions, or campus initiatives. A transition plan helps move from project launch to ongoing service stewardship.

What good looks like. A mature project identifies successor maintainers, institutional homes, archival plans, funding paths, and minimum maintenance commitments.

**Evidence to look for:**

- Continuity plan
- Succession plan
- Institutional home agreement
- Archival or deprecation plan

**Learn more:**

- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [Producing Open Source Software](https://producingoss.com/)

### FS4 — The project maintains transparent infrastructure ownership and operational dependencies.

Projects depend on domains, repositories, package registries, CI systems, cloud accounts, credentials, and communication platforms. Hidden ownership creates continuity and security risks.

Higher education perspective. Campus-born projects often use individual accounts or grant-funded infrastructure. Institutional adoption requires confidence that operational assets are controlled responsibly.

What good looks like. A mature project documents who owns key assets, how access is managed, and what happens when maintainers change roles.

**Evidence to look for:**

- Infrastructure inventory
- Access control records
- Domain and account ownership documentation
- Backup and recovery notes

**Learn more:**

- [OpenSSF Best Practices Badge Program](https://www.bestpractices.dev/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)

### FS5 — The project periodically assesses sustainability risks and publishes improvement priorities.

Sustainability is a continuing practice. Regular assessment helps projects identify weak points in governance, funding, community, security, and operations.

Higher education perspective. Institutions and funders benefit from transparent signals that projects know their risks and are actively improving them. This makes investment and adoption easier to justify.

What good looks like. A mature project conducts periodic assessments, shares findings at an appropriate level, and tracks improvement actions.

**Evidence to look for:**

- Assessment results
- Risk register
- Improvement roadmap
- Board or steering review notes

**Learn more:**

- [OSS Watch Openness Rating](https://oss-watch.ac.uk/apps/openness/)
- [It Takes a Village Guidebook](https://itav.lyrasis.org/guidebook/)
- [Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/)
- [CHAOSS Metrics Models](https://chaoss.community/kb/metrics-models/)

## Attribution

HEOSAT is adapted from and inspired by OSS Watch's Open Source Openness Rating. Except where otherwise noted, HEOSAT guidance content is made available under a Creative Commons Attribution-ShareAlike 4.0 International License.

- [OSS Watch Open Source Openness Rating](https://oss-watch.ac.uk/apps/openness/) — Original openness rating framework and Creative Commons Attribution-ShareAlike 4.0 licensing reference.
- [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/) — License used for adapted HEOSAT guidance content unless otherwise noted.
- [Open Source Initiative — The Open Source Definition](https://opensource.org/osd) — Reference definition for open source licensing and open source freedoms.
- [Open Source Initiative — OSI Approved Licenses](https://opensource.org/licenses) — Reference list for OSI Approved Open Source Licenses.
- [Karl Fogel, Producing Open Source Software](https://producingoss.com/) — Influence on governance, contribution practices, project operations, and community sustainability guidance.
- [Ithaka S+R and Apereo — Sustaining Open Source Software in the Research Enterprise](https://sr.ithaka.org/publications/sustaining-open-source-software-in-the-research-enterprise/) — Influence on higher education, research software, institutional adoption, and sustainability guidance.
- [Ithaka S+R and Apereo — Practical Guide for Sustaining Open Source Software](https://sr.ithaka.org/publications/practical-guide-for-sustaining-open-source-software/) — Influence on sustainability planning, stakeholder alignment, and project improvement practices.
- [LYRASIS — It Takes a Village](https://www.lyrasis.org/programs/Pages/It-Takes-a-Village.aspx) — Influence on community-supported sustainability models for open source and open infrastructure.
- [CHAOSS Community](https://chaoss.community/) — Influence on community health, contributor experience, and open source metrics guidance.
- [OpenSSF Best Practices Badge Program](https://www.bestpractices.dev/) — Influence on security, release, and project quality best practices.
- [SPDX](https://spdx.dev/) — Influence on licensing metadata, dependency documentation, and SBOM practices.

