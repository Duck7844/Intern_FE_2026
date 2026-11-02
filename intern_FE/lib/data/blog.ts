/* ------------------------------------------------------------------ */
/* Blog / Learning Resources Center – mock data mirrored from Figma    */
/* ------------------------------------------------------------------ */
export type Post = {
  slug: string;
  title: string;
  date: string;
  /** Optional – only the featured post shows it in the 1920 frame */
  readTime?: string;
  excerpt: string;
  cover: string;
  tags: string[];
};

export type BlogCategory = { id: string; label: string };

/** Tabs in the blog toolbar (Figma shows seven, the last one clipped). */
export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "home-buying", label: "Home Buying" },
  { id: "loan-types", label: "Loan Types" },
  { id: "loan-programs", label: "Loan Programs" },
  { id: "mortgage-basics", label: "Mortgage Basics" },
  { id: "refinancing", label: "Refinancing" },
  { id: "calculators", label: "Calculator" },
  { id: "explore-rates", label: "Explore Rates" },
];

const post = (p: Post) => p;

export const FEATURED_POST: Post = post({
  slug: "best-buying-checklist-first-time-home-buyers",
  title: "Your Best Buying Checklist 2023 For First Time Home Buyers",
  date: "Dec 18, 2024",
  readTime: "7 min read",
  excerpt:
    "When it comes to purchasing a home, one of the most critical decisions you will make is selecting the right mortgage. Among the various options available, the 30-year fixed-rate mortgage is widely recognized as the most popular choice among homebuyers.",
  cover: "/images/blog/featured.jpg",
  tags: ["Home Buying", "Mortgage", "Home Buying"],
});

const FIXED_VS_ADJUSTABLE = {
  title: "Fixed vs. Adjustable Rates: What’s Right for You?",
  date: "Dec 10, 2024",
  excerpt:
    "Deciding between fixed and adjustable rates is a crucial part of your mortgage journey. This guide breaks down the pros and cons of each, helping you make the best decision based on your needs.",
  tags: ["Loan Terms", "Mortgage Program"],
};

const RATE_FACTORS = {
  title: "Factors That Affect Your Mortgage Rates",
  excerpt:
    "Did you know your credit score, loan term, and even location can influence your mortgage rates? Discover the key factors lenders consider and tips to secure the lowest possible rate.",
  tags: ["Credit Score", "Loan Terms", "Interest Rates"],
};

export const LATEST_ASIDE_POSTS: Post[] = [
  post({ slug: "fixed-vs-adjustable-rates", cover: "/images/blog/post-01.jpg", ...FIXED_VS_ADJUSTABLE }),
  post({
    slug: "factors-that-affect-mortgage-rates",
    date: "Dec 03, 2024",
    cover: "/images/blog/post-02.jpg",
    ...RATE_FACTORS,
  }),
];

export type BlogRow = {
  id: string;
  title: string;
  href: string;
  posts: Post[];
};

export const BLOG_ROWS: BlogRow[] = [
  {
    id: "home-buying",
    title: "Home buying",
    href: "#",
    posts: [
      post({
        slug: "5-essential-tips-first-time-homebuyers",
        title: "5 Essential Tips for First-Time Homebuyers",
        date: "Aug 10, 2024",
        excerpt:
          "Buying your first home is an exciting journey, but it can be overwhelming without the right preparation. From understanding your budget to choosing the right location, these five tips will help you navigate the process with confidence and avoid common pitfalls.",
        cover: "/images/blog/post-14.jpg",
        tags: ["Home Buying", "First-time Homebuyer"],
      }),
      post({
        slug: "ultimate-home-buying-checklist",
        title: "The Ultimate Home Buying Checklist",
        date: "Aug 10, 2024",
        excerpt:
          "A smooth home buying experience starts with being organized. Our comprehensive checklist covers everything from securing pre-approval to finalizing your dream home's purchase, ensuring no detail is overlooked.",
        cover: "/images/blog/post-03.jpg",
        tags: ["Home Buying", "Pre-approval", "Mortgage Program"],
      }),
      post({
        slug: "understanding-down-payments",
        title: "Understanding Down Payments for Your New Home",
        date: "Aug 15, 2024",
        excerpt:
          "The size of your down payment can significantly impact your mortgage terms and monthly payments. Learn how to determine the right amount for your financial situation and the programs available to assist buyers.",
        cover: "/images/blog/post-04.jpg",
        tags: ["Home Buying", "Loan Programs"],
      }),
    ],
  },
  {
    id: "explore-rates",
    title: "Explore rates",
    href: "#",
    posts: [
      post({
        slug: "how-to-find-the-best-mortgage-rates",
        title: "How to Find the Best Mortgage Rates",
        date: "Aug 5, 2024",
        excerpt:
          "Shopping for the best mortgage rates can save you thousands of dollars over the life of your loan. Learn how to compare rates, understand APR, and lock in the best deal for your financial goals.",
        cover: "/images/blog/post-05.jpg",
        tags: ["Interest Rates", "Mortgage Basics", "Explore Rates"],
      }),
      post({ slug: "fixed-vs-adjustable-rates-2", cover: "/images/blog/post-06.jpg", ...FIXED_VS_ADJUSTABLE }),
      post({
        slug: "factors-that-affect-mortgage-rates-2",
        date: "Aug 10, 2024",
        cover: "/images/blog/post-07.jpg",
        ...RATE_FACTORS,
      }),
    ],
  },
  {
    id: "calculators",
    title: "Calculators",
    href: "#",
    posts: [
      post({
        slug: "how-much-home-can-you-afford",
        title: "How Much Home Can You Afford?",
        date: "Oct 20, 2024",
        excerpt:
          "Use our affordability calculator to estimate how much house you can comfortably afford based on your income, expenses, and debt-to-income ratio. Plan confidently for your next big purchase!",
        cover: "/images/blog/post-08.jpg",
        tags: ["Affordability", "Debt-to-Income Ratio"],
      }),
      post({
        slug: "simplify-mortgage-planning-with-calculators",
        title: "Simplify Your Mortgage Planning with Calculators",
        date: "Jul 25, 2024",
        excerpt:
          "Mortgage calculators can take the guesswork out of home financing. Learn how these tools can help you estimate monthly payments, interest savings, and loan terms tailored to your budget.",
        cover: "/images/blog/post-09.jpg",
        tags: ["Mortgage Basics", "Interest Rates"],
      }),
      post({
        slug: "understanding-your-monthly-payments",
        title: "Understanding Your Monthly Payments",
        date: "Sep 24, 2024",
        excerpt:
          "Break down your monthly payments with our mortgage calculator. See how principal, interest, taxes, and insurance work together to form your total payment.",
        cover: "/images/blog/post-10.jpg",
        tags: ["Mortgage Basics", "Loan Terms"],
      }),
    ],
  },
  {
    id: "refinancing",
    title: "Refinancing",
    href: "#",
    posts: [
      post({
        slug: "is-now-the-right-time-to-refinance",
        title: "Is Now the Right Time to Refinance?",
        date: "Dec 10, 2024",
        excerpt:
          "Refinancing can help lower your interest rate or adjust your loan terms, but timing is everything. Learn the key indicators to know when refinancing is the right move for your financial goals.",
        cover: "/images/blog/post-11.jpg",
        tags: ["Refinance", "Interest Rates"],
      }),
      post({
        slug: "refinancing-opportunities",
        // Figma reuses this title with a refinancing excerpt; kept verbatim
        title: "5 Essential Tips for First-Time Homebuyers",
        date: "Aug 10, 2024",
        excerpt:
          "Refinancing isn’t just about lowering rates—it’s an opportunity to consolidate debt, shorten your loan term, or access your home equity. Discover how refinancing can work for you.",
        cover: "/images/blog/post-12.jpg",
        tags: ["Refinance", "Home Equity", "Loan Programs"],
      }),
      post({
        slug: "steps-to-a-smooth-refinancing-process",
        title: "Steps to a Smooth Refinancing Process",
        date: "Oct 9, 2024",
        excerpt:
          "Refinancing doesn’t have to be overwhelming. Follow these simple steps to prepare your application, compare offers, and close your loan with ease.",
        cover: "/images/blog/post-13.jpg",
        tags: ["Refinance", "Pre-approval", "Loan-to-Value Ratio"],
      }),
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Blog header (`re website / heading` – single 64px row)              */
/* ------------------------------------------------------------------ */
export const BLOG_HEADER = {
  nav: [
    { label: "Buy", href: "#" },
    { label: "Rent", href: "#" },
    { label: "Agents", href: "#" },
    { label: "Calculator", href: "#" },
    { label: "Learning Center", href: "/blog" },
    { label: "About us", href: "#" },
  ],
  mortgageSite: { label: "Mortgage website", href: "#" },
  phone: "+1 (408) 532-1278",
  account: [
    { label: "Sign in", href: "#" },
    { label: "Sign up", href: "#" },
  ],
};

/* ------------------------------------------------------------------ */
/* Article detail                                                      */
/* ------------------------------------------------------------------ */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; alt: string; width?: number; height?: number }
  | { type: "list"; ordered?: boolean; items: string[] };

export type Article = Post & {
  summary: string;
  content: ContentBlock[];
};

/** Full article from the detail design (Figma "Understanding the 30-Year Fixed Mortgage"). */
export const FIXED_MORTGAGE_ARTICLE: Article = {
  slug: "understanding-the-30-year-fixed-mortgage",
  title: "Understanding the 30-Year Fixed Mortgage",
  date: "Aug 15, 2024",
  excerpt:
    "When it comes to purchasing a home, one of the most critical decisions you will make is selecting the right mortgage. Among the various options available, the 30-year fixed-rate mortgage is widely recognized as the most popular choice among homebuyers.",
  cover: "/images/blog/articles/30-year-fixed-1.jpg",
  tags: ["Home Buying", "Loan Programs", "Loan Programs", "Credit Score", "Loan Terms"],
  summary:
    "A 30-year fixed mortgage is one of the most popular options for homebuyers due to its stability and predictability. It offers consistent monthly payments and a fixed interest rate throughout the loan term, making it ideal for first-time buyers and those seeking long-term financial planning. This type of loan provides peace of mind by protecting borrowers from fluctuating interest rates. However, several factors influence the affordability of a 30-year fixed mortgage, including the borrower's credit score, the size of the down payment, the property's location, and the type of loan program.",
  content: [
    {
      type: "paragraph",
      text: "When it comes to purchasing a home, one of the most critical decisions you will make is selecting the right mortgage. Among the various options available, the 30-year fixed-rate mortgage is widely recognized as the most popular choice among homebuyers.",
    },
    {
      type: "paragraph",
      text: "This comprehensive guide aims to provide you with an in-depth understanding of what a 30-year fixed mortgage entails, how it functions, and the pros and cons associated with this mortgage option. By delving into these aspects, you will be equipped to make an informed decision when it comes to financing your dream property purchase.",
    },
    { type: "heading", text: "What is a 30-Year Fixed Mortgage?" },
    {
      type: "paragraph",
      text: "A 30-year fixed-rate mortgage refers to a home loan that can be fully paid off over a span of 30 years, provided the borrower makes regular payments as scheduled. The defining feature of a fixed-rate mortgage is that the interest rate remains constant throughout the mortgage term, offering stability and predictability for homeowners. While conventional loans are the most common form of 30-year fixed mortgages, government-insured options such as FHA, USDA, and VA loans are also available to qualified borrowers.",
    },
    {
      type: "paragraph",
      text: "Understanding the Components of a 30-Year Fixed Mortgage: To comprehend the total cost of monthly payments associated with a 30-year fixed mortgage, it is essential to be familiar with its key components:",
    },
    {
      type: "image",
      src: "/images/blog/articles/30-year-fixed-2.jpg",
      alt: "Modern two-storey home with a pergola",
      width: 1400,
      height: 861,
    },
    { type: "heading", text: "Factors That Impact 30-Year Fixed Mortgage Rates" },
    {
      type: "paragraph",
      text: "Several factors contribute to the determination of mortgage rates, which, in turn, affect the overall payment amount. These factors include:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Credit Score: Lenders consider credit scores to assess a borrower's creditworthiness and ability to afford a loan. A higher credit score typically leads to more favorable interest rates.",
        "Down Payment: Larger down payments often result in lower interest rates, as they reduce the loan-to-value ratio and mitigate the lender's risk.",
        "Location: Interest rates may vary based on state laws and regulations governing the housing market. Economic conditions and regional factors can influence mortgage rates.",
        "Loan Type: Different loan types, such as VA loans, FHA loans, and conventional loans, offer varying interest rates. Government-insured loans often have more competitive rates compared to conventional loans.",
      ],
    },
  ],
};

/** Every post that has a detail page. */
export const ALL_POSTS: Post[] = [
  FIXED_MORTGAGE_ARTICLE,
  FEATURED_POST,
  ...LATEST_ASIDE_POSTS,
  ...BLOG_ROWS.flatMap((r) => r.posts),
];

export function getPostBySlug(slug: string): Post | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

/**
 * Returns the article for a slug. Posts without authored content get a
 * generic body built from their excerpt and cover (mock data only).
 */
export function getArticle(slug: string): Article | undefined {
  if (slug === FIXED_MORTGAGE_ARTICLE.slug) return FIXED_MORTGAGE_ARTICLE;
  const post = getPostBySlug(slug);
  if (!post) return undefined;
  return {
    ...post,
    summary: post.excerpt,
    content: [
      { type: "paragraph", text: post.excerpt },
      { type: "heading", text: "What this means for you" },
      {
        type: "paragraph",
        text: "Pacificwide combines real estate and mortgage expertise in one team, so you can move from research to a confident offer without juggling multiple advisors.",
      },
      { type: "image", src: post.cover, alt: "" },
      { type: "heading", text: "Key takeaways" },
      {
        type: "list",
        ordered: true,
        items: Array.from(new Set(post.tags)).map(
          (t) => `${t}: ask your Pacificwide advisor how it applies to your situation.`,
        ),
      },
    ],
  };
}

/** Up to `limit` other posts, preferring ones that share a tag. */
export function getRelatedPosts(slug: string, limit = 6): Post[] {
  const current = getPostBySlug(slug);
  const others = ALL_POSTS.filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, limit);
  const shared = others.filter((p) => p.tags.some((t) => current.tags.includes(t)));
  const rest = others.filter((p) => !shared.includes(p));
  return [...shared, ...rest].slice(0, limit);
}
