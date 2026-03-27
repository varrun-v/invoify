### Approach

## What the App Does

Invoify is a Next.js application that allows users to create, customize, export, and send invoices. It uses React Context for state management, React Hook Form for form handling, and Puppeteer for PDF generation.


## Plan Before Coding

- Understanding the app. i have to checkout what kind of app am i dealing with, the functions and features it offers, what kind of output it gives, think about what kind of people use this app.
- Understanding the codebase. i have to go and fork the repo, then clone it locally, checkout the structure of the code and run it locally.
- Understanding the requirements. i have to read the requirements, the two features that was asked t implement in here. can they be implemented? do i need to change the architecture of the app? do i need to add new features? do i need to remove any features?
- Planning the implementation. i have to use AI to explain me the architecture of th code base and then plan an implementation to add the required features.
- Implementing the feature. check the implementation plan, suggest any changes if needed, then proceed with the implementation.
- Testing the feature. after the implementation is done, test the feature if it works fine, if it beaks other features or not. checkout both changes made in the code as well as the output.


## Where AI Helped vs. Where I Had to Think

first i forked and cloned the repo, then tried to run it locally. i checked out the deployed version, so that i could grasp what the app does, what features and functions does it have and what kind of output it gives. so after using it, i was pretty sure, the app is a web based app that can generate invoices. by then i understood the requirements or the two features asked to be implemented. oh i still wasn't sure what was the second feature because it seemed already implemented. then i had to go though some of the important code structure where the backend and other important pages are located. then now comes the AI part, i asked for the AI to explain the architecture and the structure of the codebase. it helped me summarize what i went through manually which was much easier and faster to understand which logic lies where?. now that i have ran the code locally and have a quite good understanding of the codebase, i had to give the AI the features that were asked to be implemented. first of all, i was pretty sure one of the requirements was already implemented, so i should've raised a question regarding that through mail, but still wanted to confirm it with the AI. so AI confirmed the Tax systems was already implemented and working fine. now i had to check the implementation plan for the one remaining feature, the duplicate invoice feature. read through the plan, gave some suggestions in places that needed to be changed, then proceeded with the implementation. after that checkout if it gave any errors, but the npm run dev was working fine and only about three file changes were made. the modal was newly created, the other frontend and backend files ivoice.ts and invoiceaction.tsx was edited. checked the implementation in browser and it worked successfully. although i saw some changes need to be done, they were'nt mentioned in the requirements and let that be as futureimprovements. i should've checked the code after the implementation was done, but with only one feature to be implemented, i ignored the check. so the remaining part is commit the changes. write the APPROCH.md and commit it too, share the repo link along with loom recorded link.

i actually took some time to write the approach as i encountered a problem with my recorded video. the video has seemed to have froze after a minute in recording, but the audio seems fine. i tried to recover the video frames, but after a long time of debuggig, the video couldn't be recovered.



## What I'd Improve in the Codebase

- I actually saw this. this is not a bug, but a minor inconvience. when i duplicate an invoice, the old generated pdf will still be there instaed of going back to live preview. so that can be improved and fixed.
- I'd also like to see previous invoices list, that could also come help with the duplicate invoice feature.

to deep dive, i've asked the AI to list out improvements that could be done on the codebase. here's what it came up with:

- **Form Context Size:** `InvoiceType` and the form state handled by `react-hook-form` is massive. Deeply nested updates can cause unnecessary re-renders across the app. Splitting this into smaller zustand stores or atom-based state (like Jotai) could yield better performance than bloated React Contexts.
- **PDF Generation Overhead:** Using Puppeteer in a serverless environment (Next.js API routes) to generate PDFs is heavy and can cause timeouts or high memory usage (`@sparticuz/chromium`). Refactoring the PDF generation to run fully client-side using `@react-pdf/renderer` or `jspdf` would heavily reduce server costs and improve absolute latency.
- **Separation of Concerns in Contexts:** `InvoiceContext.tsx` currently mixes state management (saved invoices) with entirely unrelated business logic (like downloading blobs, calling API endpoints, and sending emails). Moving the API calls and blob handling into custom hooks (e.g., `useExportInvoice`) would keep the context purely focused on state.
- **Migrate to Next.js Server Actions:** The app relies on traditional API routes (`/api/invoice/generate`, `/api/invoice/send`) using standard `fetch()` calls. Updating these to App Router Server Actions would provide seamless, end-to-end type safety between the frontend and backend without having to manually serialize strings.
- **Persistent Storage & Authentication:** Right now, drafts and "saved" invoices are only stored in the browser's `localStorage`. Integrating a lightweight database layer (like Supabase, Firebase, or Prisma) with authentication would allow users to access their invoice history seamlessly across desktop and mobile devices.
- **Automated Testing Suite:** There are no testing configurations in the repo (no Vitest, Jest, Playwright, or Cypress). Since this app handles financial calculations (subtotals, compounding taxes, and discounts), adding unit tests for the arithmetic inside `ChargesContext.tsx` and end-to-end tests for the PDF rendering pipeline is critical to prevent regressions.
- **Unified Error Handling:** In several places (like the `catch` blocks of `generatePdf` and `sendPdfToMail`), errors are simply logged to the console natively without presenting a user-facing explanation. Ensuring robust `useToast()` error notifications are tied strictly to React Error Boundaries would vastly improve the app's resilience and User Experience.
