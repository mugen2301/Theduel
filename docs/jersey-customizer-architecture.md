# Jersey Customizer Architecture

The customizer is structured as a production design system, not a single canvas component. The UI state is normalized, printable layers are explicit, and the export payload is shaped for ERP, artwork review, and factory job cards.

## Route

```text
/customizer
```

## File Structure

```text
src/
|-- app/
|   `-- customizer/
|       `-- page.tsx
|-- components/
|   `-- customizer/
|       |-- customizer-shell.tsx
|       |-- panels/
|       |   |-- artwork-panel.tsx
|       |   |-- layer-panel.tsx
|       |   |-- panel.tsx
|       |   |-- product-setup-panel.tsx
|       |   |-- quantity-matrix-panel.tsx
|       |   `-- roster-panel.tsx
|       `-- preview/
|           `-- canvas-preview.tsx
`-- lib/
    `-- customizer/
        |-- canvas-adapter.ts
        |-- data.ts
        |-- reducer.ts
        `-- types.ts
```

## State Model

The customizer state is intentionally split into:

- Product setup: jersey type, collar type, active side
- Visual customization: colors, selected font
- Layer stack: printable and non-printable canvas layers
- Assets: uploaded logos and references
- Roster: player names, numbers, sizes, per-player quantities
- Quantity matrix: bulk order size breakdown
- ERP notes: production notes and artwork instructions

## Layer Management

Every printable element is a `DesignLayer` with:

- Stable ID
- Layer kind
- Side: front, back, left sleeve, right sleeve
- Transform: position, scale, rotation, dimensions
- Visibility and lock state
- z-index
- ERP code
- Print technique
- Optional linked uploaded asset

This gives the ERP enough information to generate:

- Artwork review tasks
- Print placement checks
- Job card metadata
- Production-stage instructions
- Reorder-ready design records

## Canvas Engine

The current UI uses React Konva for the live design surface:

- Draggable logo and text objects
- Transform handles for scale and rotation
- Front, back, left sleeve, and right sleeve views
- Zoom controls
- Drop-zone based logo placement
- Active layer selection
- Layer inspector controls

The canvas remains driven by normalized `DesignLayer` records. Konva is the rendering and interaction layer; it is not the source of truth. This keeps ERP export, saved drafts, and future print-file generation stable even if the rendering engine changes later.

## Export Payload

`createErpExport(state)` produces:

```text
designId
designName
product.jerseyType
product.collarType
colors
roster
quantityMatrix
assets
printableLayers
productionNotes
revision
exportedAt
```

The backend should store both:

- Normalized ERP export payload
- Konva canvas JSON plus SVG/PNG preview artifacts

## Upload Flow

Production upload flow should be:

```text
Frontend requests signed R2 upload URL
Laravel validates user, design, and file type
Frontend uploads asset directly to Cloudflare R2
Frontend confirms upload with Laravel
Laravel stores asset metadata and attaches it to design layers
Artwork team approves or rejects each asset
```

## Next Production Steps

- Replace local object URLs with signed R2 upload.
- Add Konva JSON and high-resolution PNG/SVG export.
- Add layer transform controls for position, scale, rotate, align, duplicate, delete.
- Add template masks for each jersey type and size range.
- Add artwork preflight checks for file type, DPI, transparency, and color mode.
- Save design drafts through Laravel API.
- Generate PDF job cards for ERP production.
