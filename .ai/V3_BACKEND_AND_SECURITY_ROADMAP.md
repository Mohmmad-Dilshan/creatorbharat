# CreatorBharat V3 — Backend, Speed & Security Roadmap

This document outlines key server-side architectures, API optimizations, and security policies required to make the platform fast, secure, and easy to manage from the admin panel.

---

## ⚡ 1. Speed & Performance (Instant Load Times)

### A. Response Compression
*   **Action:** Enable GZIP/Brotli compression for all Express API responses.
*   **Why:** Large JSON payloads (such as creator lists containing milestones, niche arrays, and ratings) can reach up to 100kB. Compression reduces payloads by ~75%, saving network bandwidth and making page loading much faster on mobile connections.
*   **Implementation:**
    ```javascript
    const compression = require('compression');
    app.use(compression());
    ```

### B. In-Memory API Caching (Redis or Node-Cache)
*   **Action:** Add a caching layer on read-heavy public endpoints (`/api/creators`, `/api/campaigns`, `/api/blog`).
*   **Why:** Database lookups for public directories are heavy. Caching them for 5–10 minutes reduces database CPU usage to nearly zero and drops API response time from 300ms down to less than 15ms.
*   **Implementation:**
    - Use `apicache` middleware:
      ```javascript
      const apicache = require('apicache');
      const cache = apicache.middleware;
      router.get('/', cache('10 minutes'), async (req, res) => { ... });
      ```
    - **Cache Invalidation:** Automatically clear cache on write/update actions (e.g., when a creator updates details via `PUT /api/creators/me`).

---

## 🔒 2. Security & Safety (Anti-Spam & Data Protection)

### A. Strict vs. Flexible Rate Limiting
*   **Current State:** There is a single rate limit (`max: 200` requests per 15 minutes) applied globally.
*   **Problem:** Legitimate users browsing the directory can easily hit the limit, while attackers can still spam OTPs (SMS costs money).
*   **Solution:** Split rate limiting into targeted middlewares:
    1.  **Auth & OTP Rate Limiter:** Apply strict limits on login, register, and OTP sending (`max: 5` requests per minute).
    2.  **Public Browse Rate Limiter:** Allow higher limits for standard browsing pages (`max: 600` requests per 15 minutes).

### B. Restrict CORS Origin
*   **Current State:** `origin: '*'` allows any website to make API calls to the server.
*   **Solution:** Secure backend CORS to only allow requests from authorized client origins:
    ```javascript
    const allowedOrigins = [
      'https://creatorbharat.com',
      'https://admin.creatorbharat.com',
      'http://localhost:5173'
    ];
    app.use(cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Blocked by CORS policy'));
        }
      }
    }));
    ```

---

## 🛠️ 3. Admin Control & Data Integrity (Easy Management)

### A. Request Validation Schemas (Zod or Joi)
*   **Action:** Implement schema validation middlewares for all incoming request payloads.
*   **Why:** Prevents dirty, malformed, or malicious payloads from hitting the database, eliminating prisma/postgresql exceptions that crash the server.
*   **Implementation:**
    ```javascript
    const { z } = require('zod');
    const registerSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      phone: z.string().length(10),
    });
    // Validate request body inside router
    ```

### B. Admin Audit Logging
*   **Action:** Keep a database ledger of administrative actions (approving creators, deleting campaigns, updating platform stats).
*   **Why:** If multiple admins are running the platform, it is crucial to know who authorized what changes.
*   **Implementation:**
    - Create an `AuditLog` model in Prisma:
      ```prisma
      model AuditLog {
        id        String   @id @default(uuid())
        adminId   String
        action    String   // e.g., "CREATOR_VERIFY"
        targetId  String   // Creator ID
        changes   Json     // old vs new state
        createdAt DateTime @default(now())
      }
      ```
