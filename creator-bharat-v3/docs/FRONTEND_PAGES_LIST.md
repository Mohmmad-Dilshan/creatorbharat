# CreatorBharat Frontend Pages Architecture

This document provides a comprehensive list of all pages currently implemented in the CreatorBharat v3 frontend, categorized by their user role and access level.

---

## 1. Public Pages (Available to all visitors)
| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `HomePage` | Cinematic landing page with Hero, Map, and Features. |
| `/about` | `AboutPage` | Platform philosophy, vision, and timeline. |
| `/contact` | `ContactPage` | Multi-channel support (Creator/Brand inquiries). |
| `/pricing` | `PricingPage` | SaaS subscription plans and feature comparison. |
| `/faq` | `FAQPage` | Frequently asked questions with categories. |
| `/rate-calc` | `RateCalcPage` | Creator Value Intelligence (Market leverage tool). |
| `/leaderboard` | `LeaderboardPage` | Elite Rankings: High-fidelity performance tracking for top creators. |

## 2. Creator Ecosystem (Creator Role)
| Route | Component | Description |
| :--- | :--- | :--- |
| `/dashboard` | `DashboardPage` | Central hub for creators (Stats, Active campaigns). |
| `/creator/:id` | `CreatorProfilePage` | Dynamic public profile / Smart Media Kit. |
| `/wallet` | `WalletPage` | Earnings, Payouts, and Transaction history. |
| `/applications` | `ApplicationsPage` | Track applied campaign status and milestones. |
| `/creator-score` | `CreatorScorePage` | Trust score and performance analytics. |
| `/settings` | `SettingsPage` | Profile customization and account security. |
| `/saved` | `SavedPage` | Campaigns or resources saved by the creator. |
| `/monetization` | `MonetizationPage` | Ad revenue and marketplace settings. |

## 3. Brand & Marketplace (Brand Role)
| Route | Component | Description |
| :--- | :--- | :--- |
| `/brand-dashboard` | `BrandDashboardPage` | Management hub for brand campaigns. |
| `/creators` | `CreatorsPage` | Discovery engine with filters to find creators. |
| `/campaigns` | `CampaignsPage` | List of active and historical campaigns. |
| `/campaign-builder` | `CampaignBuilderPage` | Step-by-step wizard to launch new campaigns. |
| `/compare` | `ComparePage` | Side-by-side creator comparison tool. |

## 4. Authentication & Onboarding
| Route | Component | Description |
| :--- | :--- | :--- |
| `/login` | `LoginPage` | Unified entry for Creators and Brands. |
| `/apply` | `ApplyPage` | Creator onboarding / Verification request. |
| `/brand-register` | `BrandRegisterPage` | Business account creation for companies. |
| `/forgot-password`| `ForgotPasswordPage` | Credential recovery flow. |

## 5. Content & Legal
| Route | Component | Description |
| :--- | :--- | :--- |
| `/blog` | `BlogPage` | Industry insights and platform updates. |
| `/blog/:id` | `BlogArticlePage` | Detailed article view with reading metrics. |
| `/privacy` | `PrivacyPage` | Data protection and "Bharat Promise". |
| `/terms` | `TermsPage` | Service agreements and platform rules. |
| `/creator-guidelines`| `CreatorGuidelinesPage`| Operating code for professional collaborations. |

---
*Last Updated: May 2026*
