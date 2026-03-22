---
name: stitch-designs
description: Expert guidance on using the Stitch MCP server to generate and maintain professional, premium frontend designs for CreviTapas. Integrates project context, extracts design tokens, and generates high-quality React/Tailwind code.
---

# Stitch Design Expert (CreviTapas Edition)

This skill provides expert guidance for crafting effective prompts in **Google Stitch**, integrated via the **StitchMCP** server. It ensures that every UI generation for CreviTapas is professional, high-fidelity, and perfectly aligned with the project's gastronomic theme.

## 1. Core Principles for CreviTapas

*   **Design-Led Development**: Use Stitch to generate UI screens and components before implementation.
*   **Aesthetics First (WOW Factor)**: CreviTapas must feel premium and "alive". Use vibrant colors, smooth transitions, and modern aesthetics (glassmorphism, soft shadows).
*   **Mobile-First Focus**: Since users vote while at the bar, designs must be optimized for smartphones.
*   **Gastronomic Mood**: Use a warm, vibrant palette (terracotta, deep reds, olive greens, golden ambers) that evokes the social atmosphere of a Spanish tapas route.

## 2. StitchMCP Tooling Reference

When executing the design phase, leverage these tools:

*   `mcp_StitchMCP_generate_screen_from_text`: Create a new screen. **Always provide detailed, sensory prompts.**
*   `mcp_StitchMCP_edit_screens`: Refine existing screens using natural language annotations.
*   `mcp_StitchMCP_generate_variants`: Explore different visual directions for the same requirement.
*   `mcp_StitchMCP_get_screen`: Retrieve the underlying code (HTML/CSS) to translate into our React components.

## 3. Expert Prompting Principles

### A. Be Specific and Context-Rich
Generic prompts like "create a login" will fail. Describe the specific "Tapas" context.

**Effective Prompt:**
> "Mobile-first SMS verification screen for CreviTapas. Includes a name field, phone number field with country selector, and a 'Verify via SMS' button. Style: Warm gastronomic theme with a blurred background image of a cozy Spanish tavern. Use a glassmorphic card for the form."

### B. Define Visual Style and Theme
Explicitly specify the CreviTapas design tokens:
- **Palette**: Primary (Tapas Red/Gold), Secondary (Olive Green), Neutral (Cream/Deep Charcoal).
- **Aesthetic**: Premium, Modern, Energetic.
- **Typography**: Clean, readable sans-serif (e.g., Inter or Outfit) with elegant headings.

### C. Structure Functional Requirements
List the interactive logic to help Stitch generate the right components.

**Example for Voting:**
> "Screen for a specific Tapa entry. Features: High-res image header, name of the bar, tapa description, ingredients list, and a prominent 'Vote for this Tapa' button. If the user has already voted, show a 'Voted' state with a checkmark."

## 4. Prompt Structure Template

use this template for comprehensive generations:

```text
[Screen/Component Type] for CreviTapas [User/Context]

Key Features:
- [Feature 1: e.g., QR scanner overlay]
- [Feature 2: e.g., Tapa details with allergen icons]
- [Feature 3: e.g., Counter showing stamps collected]

Visual Style:
- Palette: [Primary/Accent colors]
- Mood: [e.g., Vibrant, celebratory, social]
- Layout: [e.g., Mobile-first, card-based]

Platform: Mobile Web
```

## 5. Iteration Strategies

### Refine via Edit/Annotation
Use `edit_screens` to make precise adjustments without a full regenerate:
- "Make the voting button larger and use a pulsing animation effect."
- "Change the background color to a warmer cream #FDF5E6."
- "Adjust the spacing between the tapas cards to be more compact."

### Progressive Refinement
1. **Initial**: Generate the broad layout (e.g., "Main list of bars").
2. **Follow-up**: Add specific details (e.g., "Add search bar and filter by neighborhood").
3. **Polish**: Add the brand identity (e.g., "Apply the CreviTapas gold/red theme and add micro-interactions to the cards").

## 6. CreviTapas Use Cases

### Tapas Menu / List
> "Responsive list of participating bars for CreviTapas. Each card shows a thumbnail of the tapa, the bar's name, and a 'Voted' badge if applicable. Top navigation has a 'My Votes' shortcut. Style: Modern, clean, high-resolution imagery."

### SMS Verification Flow
> "2-step modal for user identification. Step 1: Input Name and Phone. Step 2: Input 4-digit code. Use a progress indicator. Design: Trustworthy, professional, yet warm."

### Voting Success
> "Fullscreen confirmation overlay for a successful vote. Features a celebratory animation (confetti or glowing tapa icon), a 'Vote Submitted' status bar, and a button to scan the next QR. Mood: Enthusiastic and social."

## 7. Integration with Forge Workflow

In the **Design Phase (Phase 2)**:
1.  **Context Extraction**: Use `get_project` and `list_screens` to see what's already there.
2.  **Stitch Generation**: Use `generate_screen_from_text` for new features defined in the `Investigation Phase`.
3.  **Variant Selection**: Use `generate_variants` to present the user with 3 options and let them pick.
4.  **Handoff**: Once a design is approved, extract the code with `get_screen`. **CRITICAL**: Refactor the generated HTML/CSS into React components following our `frontend-dev-guidelines` (MUI v7, Logic/Presentation split via hooks).

## 8. Anti-Patterns to Avoid

*   ❌ **No Context**: "Create a menu." (Yields a generic restaurant menu, not a contest list).
*   ❌ **Ignoring Mobile**: "Desktop dashboard for voting." (Users vote on their phones at bars).
*   ❌ **Default Styling**: Forgetting to mention "Premium" or "Vibrant" (Yields boring browser-default looks).
*   ❌ **Missing States**: Forgetting to prompt for "Empty states" or "Loading states".

## When to Use
This skill is applicable whenever the Forge process enters the **Design Phase** or when a user requests UI improvements to the CreviTapas frontend.
