# Design direction

## Status and principles

The visual system is exploratory and expected to evolve through visual experiments. These principles guide decisions; they do not fix fonts, colour values, breakpoints or component styling. The existing starter page remains unchanged in this foundation phase.

Prioritise clear choices, readable content and visible pricing. Use restraint and hierarchy to make the garments and customer artwork the focus. Keep visual decisions independent of business rules so a redesign does not require rewriting the shopping or designer logic.

## Typography

Explore large condensed display type alongside smaller technical typography, reflecting existing brand work. Reserve expressive display treatments for short headings. Use highly legible text for product details, controls, prices and instructions. Avoid long passages in all caps or condensed fonts. Establish a small, reusable type scale once experiments establish a direction; do not add font dependencies now.

## Colour

Use a charcoal/off-black/grey/off-white foundation. Most colour should come from garments and artwork. Use semantic colour roles for text, surfaces, borders, focus and feedback as the system develops, rather than scattering literal values through components. Validate contrast for each supported state. Do not rely on colour alone to communicate selection, availability or errors.

## Spacing and layout

Use intentional negative space to separate decisions and establish hierarchy. Develop a consistent spacing scale rather than adjusting every component independently. Balance editorial breathing room with efficient shopping interactions.

Use aligned columns, predictable content widths and subtle grid/geometric elements where useful. Avoid ornamental structure that competes with garments. Let content determine layout and breakpoints; do not lock the experience to one desktop composition.

## Product imagery

Garment imagery is a primary visual element. Prefer consistent framing, useful angles and backgrounds that support comparison. Preserve garment proportions and show print placement clearly. Distinguish visual mockups from production guarantees; screen colour and a preview must not imply exact physical reproduction. Provide meaningful alternative text for informative images and empty alternatives for decoration. Reserve image space to prevent layout shifts and use appropriately sized assets.

## Motion

Movement should explain change, guide attention or provide feedback. Possible experiments include scroll reveals, subtle parallax, text reveals, garment movement/rotation, hover image scaling and refined page transitions. None is a requirement to animate every page.

Keep shopping, Print Lab and checkout immediately usable. Avoid scroll hijacking, delayed controls or motion that obscures prices and instructions. Respect `prefers-reduced-motion`, supply static alternatives, and keep content available when animation is disabled. Hover effects must have appropriate keyboard and touch behaviour. Choose animation tooling after initial visual experiments; install no animation library in this phase.

## Accessibility

Target WCAG 2.2 AA in future implementation. Use semantic HTML, logical headings, labelled controls, visible keyboard focus and a predictable tab order. Maintain text contrast of at least 4.5:1 for normal text and 3:1 for large text; ensure meaningful controls and focus indicators have adequate contrast. Support zoom, text resizing and reflow without losing content or actions.

Provide clear validation and recovery guidance. Announce meaningful asynchronous state changes without overwhelming assistive technology. Future artwork positioning must offer keyboard-accessible controls and numerical adjustments rather than requiring dragging alone. Selection, quantity, print locations and pricing must remain understandable outside any visual preview.

## Responsive and mobile behaviour

Design for narrow screens and touch from the outset. Keep controls comfortably tappable and prevent horizontal overflow. Preserve pricing, selected options and the next action when layouts reflow. Do not depend on hover. The future designer should adapt its controls and preview to small screens without removing essential editing capabilities. Test representative narrow and wide layouts, keyboard interaction, zoom and reduced motion after meaningful UI changes.
