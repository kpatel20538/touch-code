# Touch Code

An attempt to make mobile-only code editor with web tech

Demo the expirmental app at 
https://touch-code.vercel.app

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Todo


 - [x] Edit Mode (May reconsider if conflicts with text select or text rendering)
 - Command Mode
    - [x] Text Select (Need Scroll Locking to be usable)
    - [ ] Copy/Cut/Paste
    - [ ] Casing Commands
    - [ ] Snippets
    - [ ] Find/Replace
    - [ ] Undo/Redo
 - Refactor Text Buffer into a Normal Form
    - [ ] Lines Numbers
    - [ ] Symbol Table
    - [ ] Syntax Highlight
    - [ ] Code Folding
    - [ ] Multi-width
    - [ ] Wrap Text Option
 - File & Buffer Management
    - [ ] New/Open/Save/Close
    - [ ] Multiple Editors (Tabs?)
 - Active Questions
    - Can I lift and shift CPU intensive state managment to web worker?
      - If so, what should I sending as messages (actions-objects?, RPCs for non-ui operations? state? state-patches?)
      - How costly is message serialization/transfer vs state management, and what tools do I have to mitigate that cost?
      - Do I need split state managment between a fast and delayed to meet a frame rate goal, or can that be controlled by operaitons?
    - When does a VDOM become prohibtively expensive (if ever)?
    - Can WASM binaries be used to execute code in an offline context?
      - If so, can I use off-the-shelf WASM binaries, like [Pyodide](https://github.com/pyodide/pyodide)?
    - What class of reducers can be lifted into a [CRDT](https://slides.com/ai/crdt) machine? (That is, can this be a collaberative app?)
    - What parts of this project can be repackaged as Web Component?