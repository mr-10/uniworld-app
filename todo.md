# UniWorld App — Project TODO

## Phase 1: Core Setup & Data
- [ ] Generate app logo and update branding (app.config.ts, assets)
- [ ] Create university dataset (100+ universities with all required fields)
- [ ] Create scholarships dataset (linked to universities)
- [ ] Set up theme colors (#0A2342, #F4A820, #F5F7FA)
- [ ] Create TypeScript types and interfaces for universities, scholarships, users

## Phase 2: Navigation & Layout
- [ ] Set up bottom tab navigation (5 tabs: Explore, Scholarships, My List, Calendar, Checklist)
- [ ] Create tab icons mapping in icon-symbol.tsx
- [ ] Create ScreenContainer wrapper for all screens
- [ ] Set up stack navigation for each tab
- [ ] Create Onboarding screen (3-step carousel)

## Phase 3: Explore Tab
- [ ] Build Explore screen with search bar
- [ ] Implement advanced filter system (country, tuition, scholarships, ranking, program, language, intake, type, acceptance rate)
- [ ] Build university list component (FlatList)
- [ ] Implement university card with name, flag, ranking, fee range, scholarship count, bookmark icon
- [ ] Add search/filter debouncing and logic
- [ ] Create University Detail screen
- [ ] Add "Save to My List" functionality (AsyncStorage)
- [ ] Add "Add to Compare" functionality

## Phase 4: University Detail & Email Draft
- [ ] Build University Detail screen layout (hero, stats, info sections, scholarships, deadlines, buttons)
- [ ] Implement "Visit Website" button (Linking.openURL)
- [ ] Create Email Draft screen with editable template
- [ ] Implement "Copy Email Address" button
- [ ] Implement "Copy Full Email" button (Clipboard.setStringAsync)
- [ ] Implement "Open in Gmail" button (mailto: deep link)
- [ ] Add placeholder field highlighting and editing

## Phase 5: Scholarships Tab
- [ ] Build Scholarships screen with filter bar
- [ ] Implement scholarship list (FlatList)
- [ ] Add scholarship cards with name, university, amount, deadline, "Days Left" badge
- [ ] Implement color-coded urgency (red < 30 days, orange < 90 days, green later)
- [ ] Add filter functionality (country, amount range, deadline, field)
- [ ] Create Scholarship Detail screen
- [ ] Add bookmark functionality for scholarships

## Phase 6: My List & Comparison
- [ ] Build My List screen with saved universities
- [ ] Add empty state for My List
- [ ] Implement "View Details", "Draft Email", "Remove from List" buttons
- [ ] Create Comparison screen (side-by-side table for up to 3 universities)
- [ ] Highlight best values in comparison table (green background)
- [ ] Add university selection/removal in comparison

## Phase 7: Calendar & Checklist
- [ ] Build Calendar screen with month view
- [ ] Implement color-coded deadline dates (red/orange/green)
- [ ] Add deadline list view below calendar
- [ ] Implement tap-to-view-details functionality
- [ ] Build Checklist screen with document list
- [ ] Implement checkbox functionality for documents
- [ ] Add progress indicator (X of Y documents)
- [ ] Persist checklist state to AsyncStorage

## Phase 8: Polish & Testing
- [ ] Apply consistent spacing and padding across all screens
- [ ] Ensure all buttons have proper press feedback (opacity/scale)
- [ ] Add loading states for data fetching (if any)
- [ ] Verify all navigation flows work end-to-end
- [ ] Test search and filter functionality
- [ ] Test email draft generation and copying
- [ ] Test AsyncStorage persistence (saved universities, bookmarks, checklist)
- [ ] Verify responsive design on different screen sizes
- [ ] Check dark mode support
- [ ] Fix any console errors or warnings

## Phase 9: Onboarding & Launch
- [ ] Implement onboarding skip logic (AsyncStorage flag)
- [ ] Ensure onboarding only shows on first launch
- [ ] Test app launch flow (onboarding → home)
- [ ] Verify app runs on Android without errors
- [ ] Create initial checkpoint for delivery

---

## Feature Checklist

### Feature 1: Global University Database
- [ ] 100+ universities from 13+ countries
- [ ] All required fields: name, country, city, website, email, tuition, scholarships, ranking, programs, language, intake, deadlines, acceptance rate, population, type

### Feature 2: Advanced Search & Filter
- [ ] Keyword search (university name, country, programs)
- [ ] Country/Region filter
- [ ] Tuition fee range slider ($0–$60,000)
- [ ] Scholarship availability toggle
- [ ] World ranking range filter
- [ ] Program/Field filter
- [ ] Language of instruction filter
- [ ] Intake season filter
- [ ] University type filter (Public/Private)
- [ ] Acceptance rate range filter

### Feature 3: Email Draft Generator
- [ ] Pre-written professional template
- [ ] University-specific greeting
- [ ] Placeholder fields: [Your Name], [Your Country], [Desired Program], [Intended Intake Year], [Your Email], [Your Phone]
- [ ] Editable text field
- [ ] Copy Email Address button
- [ ] Copy Full Email button
- [ ] Open in Gmail button (mailto:)

### Feature 4: Scholarship Tracker
- [ ] Scholarship listings across all universities
- [ ] Filter by country, amount range, deadline, field
- [ ] "Days Left" countdown badge
- [ ] Color-coded urgency (red/orange/green)
- [ ] Bookmark scholarships
- [ ] Reminder notifications (optional)

### Feature 5: University Comparison
- [ ] Select up to 3 universities
- [ ] Side-by-side comparison table
- [ ] Highlight best values (green background)
- [ ] All key fields: fees, ranking, scholarships, programs, acceptance rate, intake dates

### Feature 6: Saved/Wishlist
- [ ] Save universities to "My List"
- [ ] Persist to AsyncStorage
- [ ] Bookmark icon on cards
- [ ] Quick access to email draft from My List

### Feature 7: Intake & Deadline Calendar
- [ ] Calendar view showing deadlines for saved universities
- [ ] Color-coded by urgency (red < 30 days, orange < 90 days, green later)
- [ ] Tap date to see universities with deadlines
- [ ] Deadline list view

### Feature 8: Document Checklist
- [ ] General document checklist (passport, transcripts, IELTS/TOEFL, SOP, LOR, CV, financial proof, etc.)
- [ ] Checkboxes for each document
- [ ] Checklist state saved to AsyncStorage
- [ ] Progress indicator

### Feature 9: University Detail Screen
- [ ] Hero banner with name and country flag
- [ ] All data fields displayed
- [ ] List of scholarships offered
- [ ] Map placeholder
- [ ] "Visit Website" button
- [ ] "Draft Inquiry Email" button
- [ ] "Save to My List" button
- [ ] "Add to Compare" button

### Feature 10: Onboarding Screen
- [ ] 3-step carousel (Find universities, Filter by fees & scholarships, Draft inquiry emails)
- [ ] Skip button
- [ ] Only shown on first launch
- [ ] Saved to AsyncStorage

---

## Known Issues & Improvements
(To be updated as development progresses)

