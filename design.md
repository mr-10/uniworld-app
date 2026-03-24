# UniWorld App — Design Plan

## Design Philosophy

**UniWorld** is a professional, trustworthy university discovery platform for serious students worldwide. The design prioritizes clarity, efficiency, and accessibility. Every interaction should feel intentional and guide users toward their goal: finding the right university and drafting inquiry emails.

**Target Users:** International students aged 16-25 searching for universities, comparing options, and preparing applications.

---

## Color Scheme

| Element | Color | Usage |
|---------|-------|-------|
| **Primary** | #0A2342 (Deep Navy) | Headers, buttons, key UI elements |
| **Accent** | #F4A820 (Gold) | Highlights, badges, CTAs |
| **Background** | #F5F7FA (Light Gray) | Screen backgrounds |
| **Surface** | White | Cards, elevated surfaces |
| **Text Primary** | #11181C (Dark Gray) | Body text, headings |
| **Text Secondary** | #687076 (Muted Gray) | Subtitles, metadata |
| **Success** | #22C55E (Green) | Positive states, best values |
| **Warning** | #F59E0B (Orange) | Urgent deadlines (90+ days) |
| **Danger** | #EF4444 (Red) | Critical deadlines (< 30 days) |

---

## Screen List

### Tab 1: Explore (🔍)
**Purpose:** Search and filter universities globally.

**Key Sections:**
- Search bar (keyword: university name, country, program)
- Filter panel (collapsible):
  - Country / Region
  - Tuition fee range (slider: $0–$60,000)
  - Scholarship availability (toggle)
  - World ranking range (Top 50, 100, 500)
  - Program / Field of study
  - Language of instruction
  - Intake season
  - University type (Public/Private)
  - Acceptance rate range
- University list (FlatList):
  - Each card shows: name, country flag, ranking badge, fee range, scholarship count, bookmark icon
  - Tap card → University Detail screen

### Tab 2: Scholarships (🎓)
**Purpose:** Browse and filter scholarships across all universities.

**Key Sections:**
- Filter bar:
  - Country
  - Amount range (slider)
  - Deadline (upcoming first)
  - Field of study
- Scholarship list (FlatList):
  - Each card shows: name, university, amount (USD), deadline, "Days Left" countdown badge, bookmark icon
  - Color-coded urgency: Red (< 30 days), Orange (< 90 days), Green (later)
  - Tap card → Scholarship detail with university link

### Tab 3: My List (❤️)
**Purpose:** View saved universities and quick access to email drafts.

**Key Sections:**
- Empty state (if no saved universities)
- Saved universities list (FlatList):
  - Each card shows: name, country flag, ranking, fee range, scholarship count
  - Buttons: "View Details", "Draft Email", "Remove from List"

### Tab 4: Calendar (📅)
**Purpose:** Visualize application deadlines for saved universities.

**Key Sections:**
- Calendar view (month view):
  - Color-coded dates: Red (< 30 days), Orange (< 90 days), Green (later)
  - Tap date → Show universities with deadlines that day
- Deadline list view (below calendar):
  - Upcoming deadlines sorted chronologically
  - Each item shows: university name, deadline date, days left

### Tab 5: Checklist (📋)
**Purpose:** Track application document preparation.

**Key Sections:**
- Document checklist:
  - Passport
  - Transcripts
  - IELTS/TOEFL scores
  - Statement of Purpose (SOP)
  - Letters of Recommendation (LOR)
  - CV / Resume
  - Financial proof
  - Health insurance documents
  - Visa documents
- Each item: checkbox, label, (optional) notes field
- Progress indicator: "X of Y documents completed"

---

## University Detail Screen

**Purpose:** Show comprehensive information about a single university.

**Layout (top to bottom):**

1. **Hero Banner**
   - University name (large, bold)
   - Country flag emoji
   - World ranking badge (e.g., "QS Rank: #45")

2. **Quick Stats Row**
   - Tuition fee (undergraduate & postgraduate)
   - Acceptance rate
   - Student population

3. **Key Information Sections**
   - Official website (link button)
   - Admission email (highlighted, with copy button)
   - Location (city, country)
   - University type (Public/Private)
   - Language of instruction

4. **Programs Offered**
   - Scrollable list of faculties/programs

5. **Scholarships Section**
   - List of scholarships offered by this university
   - Each scholarship: name, amount, deadline, eligibility

6. **Intake & Deadlines**
   - Available intake seasons (Fall, Spring, Summer)
   - Application deadlines for each intake

7. **Action Buttons**
   - "Draft Inquiry Email" (primary, gold)
   - "Save to My List" (secondary)
   - "Add to Compare" (secondary)
   - "Visit Website" (tertiary)

---

## Email Draft Screen

**Purpose:** Generate and customize inquiry emails.

**Layout:**

1. **Email Preview**
   - To: [university admission email]
   - Subject: [auto-generated]
   - Full email body (editable text field)

2. **Action Buttons**
   - "Copy Email Address" (copy to clipboard)
   - "Copy Full Email" (copy entire email)
   - "Open in Gmail" (deep link: mailto:)
   - "Back" (close modal)

3. **Placeholder Fields**
   - [Your Name]
   - [Your Country]
   - [Desired Program]
   - [Intended Intake Year]
   - [Your Email Address]
   - [Your Phone Number]

---

## Comparison Screen

**Purpose:** Side-by-side comparison of up to 3 universities.

**Layout:**

1. **University Selection**
   - Show 3 selected universities (or fewer)
   - Option to remove and add different universities

2. **Comparison Table**
   - Rows: Tuition (UG), Tuition (PG), Ranking, Acceptance Rate, Student Population, Scholarships, Programs, Intake Dates
   - Columns: University 1, University 2, University 3
   - Highlight best value in each row (green background for lowest fee, highest ranking, etc.)

---

## Onboarding Screen

**Purpose:** Introduce app features on first launch.

**3-Step Carousel:**

1. **Step 1: "Find Universities Worldwide"**
   - Illustration: globe icon
   - Text: "Explore 100+ universities from across the globe"

2. **Step 2: "Filter by Fees & Scholarships"**
   - Illustration: filter icon
   - Text: "Find universities that match your budget and scholarship needs"

3. **Step 3: "Instantly Draft Your Inquiry Email"**
   - Illustration: email icon
   - Text: "Generate professional inquiry emails ready to send"

**Navigation:**
- "Skip" button (always visible)
- "Next" / "Get Started" button
- Dot indicators (current step)

---

## Navigation Structure

**Bottom Tab Navigation (5 tabs):**

```
┌─────────────────────────────────────┐
│  Explore  Scholarships  My List     │
│  Calendar  Checklist                │
└─────────────────────────────────────┘
```

**Stack Navigation (within each tab):**
- Explore → University Detail → Email Draft
- Scholarships → Scholarship Detail → University Detail
- My List → University Detail → Email Draft
- Calendar → Deadline Detail → University Detail
- Checklist (no sub-screens)

---

## Key User Flows

### Flow 1: Discover and Save University
1. User opens Explore tab
2. Filters by country, tuition, scholarships
3. Taps university card
4. Views University Detail screen
5. Taps "Save to My List" → saved to AsyncStorage
6. Bookmark icon updates to filled state

### Flow 2: Draft and Send Inquiry Email
1. User on University Detail screen
2. Taps "Draft Inquiry Email"
3. Email Draft screen opens with pre-filled template
4. User customizes placeholders ([Your Name], etc.)
5. Taps "Copy Full Email"
6. Taps "Open in Gmail" → mailto: link opens default email app
7. User pastes email and sends

### Flow 3: Compare Universities
1. User on Explore or My List
2. Taps "Add to Compare" on 3 universities
3. Taps "Compare" button
4. Comparison screen shows side-by-side table
5. User reviews best values (highlighted in green)

### Flow 4: Track Deadlines
1. User saves universities to My List
2. Opens Calendar tab
3. Sees color-coded deadlines (red/orange/green)
4. Taps a date to see which universities have deadlines
5. Can tap to view University Detail or draft email

### Flow 5: Prepare Documents
1. User opens Checklist tab
2. Checks off documents as they prepare them
3. Progress indicator updates
4. Checklist state persists in AsyncStorage

---

## Component Hierarchy

```
App
├── Onboarding (if first launch)
├── TabNavigation
│   ├── ExploreStack
│   │   ├── ExploreScreen
│   │   ├── UniversityDetailScreen
│   │   └── EmailDraftScreen
│   ├── ScholarshipsStack
│   │   ├── ScholarshipsScreen
│   │   └── ScholarshipDetailScreen
│   ├── MyListStack
│   │   ├── MyListScreen
│   │   └── UniversityDetailScreen
│   ├── CalendarStack
│   │   ├── CalendarScreen
│   │   └── DeadlineDetailScreen
│   └── ChecklistStack
│       └── ChecklistScreen
└── ComparisonScreen (modal)
```

---

## Accessibility & Usability

- **One-handed usage:** All interactive elements within thumb reach (bottom 2/3 of screen)
- **Clear hierarchy:** Primary actions (gold), secondary actions (navy), tertiary (text-only)
- **Readable typography:** System fonts, 16px minimum for body text
- **Sufficient contrast:** All text meets WCAG AA standards
- **Feedback:** Tap feedback, loading states, success/error messages
- **Persistent state:** Saved universities, bookmarks, checklist progress saved to AsyncStorage

---

## Performance Considerations

- **Data loading:** Static JSON file with 100+ universities (no network calls needed)
- **List rendering:** Use FlatList with `maxToRenderPerBatch` and `updateCellsBatchingPeriod` for smooth scrolling
- **Search:** Debounce search input (300ms) to avoid excessive filtering
- **Storage:** AsyncStorage for saved universities, bookmarks, checklist state
- **Notifications:** Expo Notifications for scholarship deadline reminders (optional)

