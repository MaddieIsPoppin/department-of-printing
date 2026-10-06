# Shared UI components

Add reusable presentation primitives here when a requested interface needs them. No components are implemented in the foundation phase.

- Use small typed props and composition; preserve semantic HTML and accessibility.
- Receive business data through props rather than embedding products, prices or supplier rules.
- Keep feature-specific UI with its owning feature or route until it has a real shared use.
- Keep styling aligned with the evolving [design principles](../../docs/DESIGN.md).
- Add a client boundary only when the component needs browser interaction.

See [architecture](../../docs/ARCHITECTURE.md) before introducing additional shared layers.
