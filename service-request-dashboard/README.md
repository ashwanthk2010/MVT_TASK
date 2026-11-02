# Smart Service Request Management Dashboard

An internal admin portal for managing customer service requests — login, dashboard analytics, full service request CRUD, status workflow, and responsive UI for desktop, tablet and mobile.

**Stack:** React 19 + TypeScript + Vite, Material UI (MUI v9), Redux Toolkit, React Router DOM, Recharts, MUI X Date Pickers.

## Getting Started

```bash
npm install
npm run dev       # starts the dev server (default: http://localhost:5173)
npm run build      # type-checks and produces a production build in dist/
npm run preview    # serves the production build locally
npm run lint       # runs oxlint
```

## Demo Login

```
Email:    admin@example.com
Password: Admin@123
```

Authentication is mocked (no backend). Checking **Remember Me** stores only the email (never the password) in `localStorage` so it's pre-filled on your next visit. The authenticated session itself is kept in `sessionStorage`, so refreshing the dashboard keeps you logged in, but closing the browser tab clears it.

## Project Structure

```
src/
  app/            Redux store + typed hooks
  features/       Redux slices (auth, serviceRequest, dashboard, snackbar)
  services/       Mock "API" layer (in-memory data + simulated network delay)
  mock/            Seed data generator for service requests
  types/           Shared TypeScript interfaces
  utils/           Validators, date helpers, status-transition rules, storage helpers
  theme/           Centralized MUI theme + status/priority color maps
  layouts/         App shell (header, sidebar, main layout)
  routes/          Route guards (protected / public-only) + route table
  pages/           One component per screen (Login, Dashboard, Listing, Add, Details, Edit)
  components/
    common/        Reusable UI: snackbar, dialogs, chips, skeletons, empty states
    dashboard/      Stat cards, charts, recent requests/activities
    serviceRequest/ Filters, table, form, attachment upload, timeline, status control
```

## Redux Architecture

Four slices, as required:

- **authSlice** — `user`, `isAuthenticated`, `rememberMe`, `loading`, `error`. `loginUser` and `submitForgotPassword` are `createAsyncThunk`s; session/remember-me state is synced to `sessionStorage`/`localStorage` as a side effect of the thunk, and read back into the slice's `initialState` on app load.
- **serviceRequestSlice** — matches the required `ServiceRequestState` shape (`requests`, `selectedRequest`, `loading`, `submitting`, `error`, `totalRecords`). Thunks: `fetchServiceRequests` (search/filter/sort/paginate), `fetchServiceRequestById`, `createServiceRequest`, `updateServiceRequest`, `deleteServiceRequest`, `updateRequestStatus` — each with pending/fulfilled/rejected handling.
- **dashboardSlice** — statistics, monthly chart data, status distribution, recent requests/activities, all derived server-side (in the mock service layer) from the same in-memory request data used by `serviceRequestSlice`, via `fetchDashboardStatistics`.
- **snackbarSlice** — a single global snackbar (`open`, `message`, `severity`), driven by a `useSnackbar()` hook so any component can call `notify(message, severity)`.

All components use the typed `useAppDispatch`/`useAppSelector` hooks (`src/app/hooks.ts`). No component mutates Redux state directly — every write goes through a thunk that calls into `src/services/*`, which owns the single in-memory "database" and encodes the business rules (status transition table, edit-lock on terminal statuses, duplicate-ID generation, etc.).

## Component Structure Notes

- Screens in `pages/` are thin: they wire Redux state/thunks to presentational components and own only page-local UI state (dialogs open/closed, pagination, filters).
- `RequestForm` is shared between Add and Edit screens (`mode="create" | "edit"`), with validation and business-rule differences (e.g. past-date check only applies on create) parameterized by `mode`.
- The service request status workflow (`utils/statusTransitions.ts`) is a single source of truth consumed by both the status-update UI and the mock service layer, so the UI and the "backend" can never disagree on what transitions are legal.

## Completed Functionality

- Login with validation, show/hide password, Remember Me, Forgot Password dialog, protected routes, persisted session across refresh, logout.
- Dashboard: 6 live stat cards, monthly bar chart (6 months, Recharts), status-distribution donut chart, recent requests table, recent activities feed, refresh button, loading skeletons, empty states.
- Service Request Listing: dynamic search (ID/customer), status/priority/service-type/date-range filters (combinable), sortable by date, pagination (5/10/20), add/view/edit/delete actions, mobile card layout.
- Add/Edit Service Request: full field set and validation per spec, image attachments (max 3, 5 MB each, previewed), unsaved-changes confirmation on cancel, reset confirmation, duplicate-submit guard.
- Service Request Details: full info, customer info, attachment gallery with lightbox preview, timeline, status update control (only legal next statuses shown, reason required for cancel/reject), edit/delete actions.
- Status workflow exactly as specified, including terminal-status lock on Edit.
- Global snackbar (success/error/warning/info) for every CRUD/auth operation.
- Fully responsive at all required breakpoints (320–1440px); verified with Playwright at 375px (no horizontal overflow, cards replace tables, collapsible/temporary sidebar).

## Known Limitations

- There is no real backend — all data lives in an in-memory array seeded on load and reset on page refresh (by design, per the assignment's "mock API" allowance).
- Attachments are stored as base64 data URLs in memory, not uploaded anywhere.
- The production bundle is a single ~375 KB gzipped chunk; code-splitting by route was left out to keep the codebase easy to review for this assignment, but would be the first optimization in a real deployment.
