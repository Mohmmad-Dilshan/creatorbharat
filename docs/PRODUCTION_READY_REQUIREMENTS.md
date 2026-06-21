# 🇮🇳 CreatorBharat V3 — Complete Production-Ready Requirements
## (Backend, Admin Panel, aur Frontend ke liye Sab Kuch)

Agar hume CreatorBharat V3 ko ek real-world, commercial-grade **SaaS product** ki tarah launch karna hai, toh hume Backend, Admin Panel, aur Frontend teeno me kuch features aur security checks daalne honge. 

Neeche har ek folder aur service ke liye complete requirements ki list di gayi hai.

---

## ⚙️ 1. Backend API Requirements (`creatorbharat-backend/`)

Backend pure application ka heart hai. Isko robust, secure aur scalable banane ke liye hume ye sab implement karna hoga:

### A. Authentication & Security (Suraksha)
1. **JWT in HttpOnly Cookies**: Token ko localStorage me store karne ke bajaye **HttpOnly, Secure, aur SameSite** cookies me save karna chahiye taaki XSS (Cross-Site Scripting) attacks se bacha ja sake.
2. **Email Verification / OTP Login**: Naye registration par email verify karne ke liye verification link ya OTP system (Resend API ya Twilio ke through) integrate karna hoga.
3. **Google OAuth2**: Single-click sign-up/login ke liye Passport.js ya direct Google OAuth client integration.
4. **Rate Limiting**: API routes (specialy `/api/auth/login` aur `/api/auth/register`) par rate limiting lagana (using `express-rate-limit`) taaki brute-force attacks ko roka ja sake.
5. **CORS & Security Headers**: Helmet middleware install karna jo secure HTTP headers set karega, aur strict CORS policy taaki sirf trusted domains (frontend aur admin urls) hi backend ko call kar sakein.

### B. Media & Document Upload (File Management)
1. **Multer Middleware**: Images aur PDF (verification documents) ko incoming requests se parse karne ke liye.
2. **Cloudinary Integration**: Uploaded files ko directly Cloudinary CDN par upload karna aur waha se generated secure URL ko database (PostgreSQL) me save karna.
3. **File Type & Size Validation**: Creator ko 5MB se badi file upload karne se rokna aur check karna ki file sirf JPEG, PNG ya PDF ho.

### C. Live Payments & Escrow System (Razorpay)
1. **Razorpay Route (Marketplace)**: Kyuki ye ek creator marketplace hai, brand jab pay karega, tab paise direct platform ke escrow (holding account) me jayenge. Campaign complete hone par, backend Razorpay Route API call karega jo automatic split karega:
   * **90% Creator's Bank Account** me transfer hoga.
   * **10% Platform Fee** (CreatorBharat Commission) account me capture hoga.
2. **Razorpay Webhooks**: Webhook route (`/api/payments/webhook`) banana jo Razorpay ke events (`payment.captured`, `transfer.processed`, `refund.processed`) ko listen kare. Agar brand pay karte waqt tab close kar de, toh bhi webhook database update kar dega.
3. **Invoice Generator**: Payment successful hone par dynamically dynamic PDF invoice build karna (using `pdfkit` ya `html-pdf`) aur brand ko mail karna.

### D. Real-Time Chat System (WebSockets)
1. **Socket.io Integration**: Express server ke sath `socket.io` attach karna.
2. **Socket Database Sync**: Chat messages ko instant transfer karne ke sath-sath Prisma Client ke through database me instantly insert karna.
3. **Online Status & Unread Count**: Online users ko map me track karna aur read receipts (`message_read` event) set karna.

### E. Transactional Emails (Email Automations)
1. **Resend API / Nodemailer**: Emails send karne ke liye setup.
2. **HTML Templates**: 
   * **Creator Alerts**: "Aapki profile verify ho gayi hai!", "Brand ne aapki application approve kar di hai!"
   * **Brand Alerts**: "Naye creator ne aapki campaign par pitch kiya hai!"

---

## 📊 2. Admin Panel Requirements (`creatorbharat-admin/`)

Admin Panel platform ka control center hai. Ek premium SaaS system ke liye admin ke paas ye features hone chahiye:

### A. Extended Approvals & KYC Queue
1. **Verification Details Modal**: Jab admin approval queue me kisi creator par click kare, toh ek popup modal khule jisme:
   * Creator ki upload ki hui ID (PAN Card, Aadhaar, ya driving license) dikhe.
   * Uske social media profiles ke statistics dikhein.
   * Approve aur Reject (with reason dropdown) ke options hon.
2. **KYC Status Update**: database me status `PENDING` se `VERIFIED` ya `REJECTED` update ho aur creator ko automatic notification email jaye.

### B. Access Controls & User Management (Bans & Suspensions)
1. **Suspend/Ban Button**: Har user (Creator ya Brand) ki row ke aage "Block" ya "Suspend" button ho.
2. **Active Status Check**: Block karne par database user schema me `status: "BANNED"` ho jaye aur backend auth middleware active checks lagaye jo banned users ka JWT token instantly invalidate kar de.

### C. Campaign Escrow & Dispute Resolution Panel
1. **Dispute Manager**: Agar brand aur creator ke beech kisi deliverable ko lekar jhagda (dispute) hota hai, toh admin panel me ek portal ho jaha admin dono ki chat aur uploads dekh sake.
2. **Manual Funds Release**: Admin button daba kar manually funds creator ko release kar sake ya fir brand ko refund de sake (via Razorpay Transfer/Refund API).

### D. Analytics & Graph Dashboard
1. **Recharts / Chart.js**: Visual representation ke liye.
2. **Metric Cards & Graphs**:
   * **Total Revenue Graph**: Mahine bhar ka revenue chart.
   * **User Growth**: Creators vs Brands onboarding rate.
   * **Active Campaigns**: Count and list of currently active campaigns.

### E. Admin Activity Logs (Audit Trail)
1. **Audit Logs Table**: Database me table (`AdminLog`) jo record kare ki kaunse admin ne kis creator ko verify kiya, kis brand ko ban kiya, aur kab dispute solve kiya.

---

## 💻 3. Frontend Client Requirements (`creator-bharat-v3/`)

Frontend client (creators aur brands ke liye website) ko dynamic backend database se connect karne ke liye ye steps pure karne honge:

### A. Authentication & User Session Flows
1. **Global Context/Redux Setup**: Auth state (`user`, `isAuthenticated`, `token`) ko react Context API ya Redux Toolkit me centralize karna.
2. **Auto-Login**: Application load hone par cookie/localStorage se JWT fetch karke backend par `/api/auth/me` ko call karna aur session restore karna.
3. **Form Validations (Zod / React Hook Form)**: Login, Register, aur Profile forms par client-side validations add karna taaki empty data submit na ho.

### B. Media & Profile Editors
1. **File Upload Handlers**: Dropzone elements add karna avatar upload karne ke liye. File select hote hi frontend backend ke `/api/uploads/image` par Multipart API request bhejega aur response me mila URL preview me show karega.
2. **Onboarding Stepper Integration**: Creator onboarding form ke transitions ko local storage ke bajaye backend API endpoints (`PUT /api/creators/me`) se update karna taaki browser reload hone par progress loose na ho.

### C. Live Discovery Directory & Filter Search
1. **URL Query Sync**: Creators page ya Campaigns page par filters lagate waqt (Niche, Platform, Followers count) URL params update hon (e.g. `?niche=tech&city=Mumbai`).
2. **API Search Query**: Jab user search bar me type kare ya filters badle, toh background me backend ko dynamic query strings ke sath `GET` request jaye.

### D. Real-Time Chat & Chat UI Updates
1. **Socket.io Client**: Client script load karke `socket.connect()` call karna.
2. **Chat Window Listeners**: Naye messages aane par chat container automatically scroll down ho, audio tone play ho aur dynamic green dot active check show ho.
3. **Instant Notifications Counter**: Header bar me unread messages ka badge count dikhana jo socket event trigger hone par increment ho sake.

### E. Razorpay Payment SDK Load
1. **Razorpay Script Injector**: Dynamically script `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>` inject karna.
2. **Pricing Modal Action**: "Pay Now" par click karne par backend order generation API ko hit karna, order object aate hi Razorpay dynamic modal launch karna, aur transaction details backend verify API par post karna.

---

## 📊 Summary of Tech Stack Integration

| Feature | Frontend Tech | Backend Tech | Database Table / Model |
| :--- | :--- | :--- | :--- |
| **Media Uploads** | `react-dropzone` + Axios FormData | `multer` + `cloudinary` SDK | `Creator.photo`, `Brand.logo` |
| **Realtime Chat** | `socket.io-client` | `socket.io` + Node HTTP | `Message` (Sender, Receiver, Text) |
| **Escrow Payments**| Razorpay Checkout JS | Razorpay Node SDK (Routes API) | `Payment` (Transaction ID, Status) |
| **Emails** | Toast notifications / Axios | `resend` SDK | `User.isVerified` |
| **Visual Charts** | `recharts` | Summary Aggregations APIs | Aggregations (Prisma GroupBy / Raw Query) |
