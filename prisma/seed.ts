import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ─── Exchanges ──────────────────────────────────────────────

  const binance = await prisma.exchange.upsert({
    where: { slug: "binance" },
    update: {},
    create: {
      slug: "binance",
      name: "Binance",
      logoUrl: "https://cdn.example.com/logos/binance.png",
      affiliateUrl: "https://www.binance.com/register?ref=EXAMPLE",
      description:
        "Binance is the world's largest cryptocurrency exchange by trading volume, offering a wide range of digital assets and trading pairs.",
      foundedYear: 2017,
      headquarters: "Cayman Islands",
      score: 9.5,
      fees: {
        create: {
          spotMakerFee: 0.1,
          spotTakerFee: 0.1,
          futuresMakerFee: 0.02,
          futuresTakerFee: 0.04,
          withdrawalFee: 0.0005,
        },
      },
      offers: {
        create: {
          offerText: "Get 20% off trading fees with our referral link",
          bonusAmount: 100,
          isActive: true,
          expiresAt: new Date("2027-12-31"),
        },
      },
    },
  });

  const coinbase = await prisma.exchange.upsert({
    where: { slug: "coinbase" },
    update: {},
    create: {
      slug: "coinbase",
      name: "Coinbase",
      logoUrl: "https://cdn.example.com/logos/coinbase.png",
      affiliateUrl: "https://www.coinbase.com/join/EXAMPLE",
      description:
        "Coinbase is a leading US-based cryptocurrency exchange known for its ease of use, regulatory compliance, and strong security measures.",
      foundedYear: 2012,
      headquarters: "San Francisco, USA",
      score: 9.0,
      fees: {
        create: {
          spotMakerFee: 0.4,
          spotTakerFee: 0.6,
          futuresMakerFee: 0.02,
          futuresTakerFee: 0.05,
          withdrawalFee: 0.0,
        },
      },
      offers: {
        create: {
          offerText: "Earn $10 in BTC when you sign up and trade $100+",
          bonusAmount: 10,
          isActive: true,
          expiresAt: new Date("2027-06-30"),
        },
      },
    },
  });

  const kraken = await prisma.exchange.upsert({
    where: { slug: "kraken" },
    update: {},
    create: {
      slug: "kraken",
      name: "Kraken",
      logoUrl: "https://cdn.example.com/logos/kraken.png",
      affiliateUrl: "https://www.kraken.com/sign-up?ref=EXAMPLE",
      description:
        "Kraken is one of the oldest and most trusted cryptocurrency exchanges, offering advanced trading features, margin trading, and staking.",
      foundedYear: 2011,
      headquarters: "San Francisco, USA",
      score: 8.8,
      fees: {
        create: {
          spotMakerFee: 0.16,
          spotTakerFee: 0.26,
          futuresMakerFee: 0.02,
          futuresTakerFee: 0.05,
          withdrawalFee: 0.00015,
        },
      },
    },
  });

  const bybit = await prisma.exchange.upsert({
    where: { slug: "bybit" },
    update: {},
    create: {
      slug: "bybit",
      name: "Bybit",
      logoUrl: "https://cdn.example.com/logos/bybit.png",
      affiliateUrl: "https://www.bybit.com/register?ref=EXAMPLE",
      description:
        "Bybit is a fast-growing cryptocurrency derivatives exchange known for its perpetual contracts, copy trading, and competitive fees.",
      foundedYear: 2018,
      headquarters: "Dubai, UAE",
      score: 8.5,
      fees: {
        create: {
          spotMakerFee: 0.1,
          spotTakerFee: 0.1,
          futuresMakerFee: 0.01,
          futuresTakerFee: 0.06,
          withdrawalFee: 0.0002,
        },
      },
      offers: {
        create: {
          offerText: "Up to $30,000 deposit bonus for new users",
          bonusAmount: 30000,
          isActive: true,
          expiresAt: new Date("2027-03-31"),
        },
      },
    },
  });

  const okx = await prisma.exchange.upsert({
    where: { slug: "okx" },
    update: {},
    create: {
      slug: "okx",
      name: "OKX",
      logoUrl: "https://cdn.example.com/logos/okx.png",
      affiliateUrl: "https://www.okx.com/join/EXAMPLE",
      description:
        "OKX is a global cryptocurrency exchange offering spot, derivatives, and DeFi services with a strong focus on Web3 and on-chain trading tools.",
      foundedYear: 2017,
      headquarters: "Seychelles",
      score: 8.7,
      fees: {
        create: {
          spotMakerFee: 0.08,
          spotTakerFee: 0.1,
          futuresMakerFee: 0.02,
          futuresTakerFee: 0.05,
          withdrawalFee: 0.0004,
        },
      },
    },
  });

  console.log(
    `Seeded ${[binance, coinbase, kraken, bybit, okx].length} exchanges`
  );

  // ─── Blog Posts ─────────────────────────────────────────────

  const blogPosts = await Promise.all([
    prisma.blogPost.upsert({
      where: { slug: "best-crypto-exchanges-2026" },
      update: {},
      create: {
        slug: "best-crypto-exchanges-2026",
        title: "Best Crypto Exchanges in 2026: A Comprehensive Guide",
        content:
          "Choosing the right crypto exchange is crucial for your trading journey. In this guide, we compare the top exchanges based on fees, security, features, and user experience. Whether you are a beginner or an advanced trader, this guide will help you find the best platform for your needs.",
        metaTitle: "Best Crypto Exchanges 2026 - Top Picks Compared",
        metaDescription:
          "Compare the best cryptocurrency exchanges of 2026. Detailed analysis of fees, security, and features.",
        category: "guides",
        tags: ["exchanges", "comparison", "2026", "guide"],
        publishedAt: new Date("2026-01-15"),
        aiGenerated: false,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: "how-to-reduce-trading-fees" },
      update: {},
      create: {
        slug: "how-to-reduce-trading-fees",
        title: "How to Reduce Your Crypto Trading Fees: Pro Tips",
        content:
          "Trading fees can eat into your profits significantly over time. Learn how to minimize fees by choosing the right exchange, using maker orders, holding exchange tokens for discounts, and leveraging referral programs. We break down fee structures across major exchanges and share actionable strategies.",
        metaTitle: "Reduce Crypto Trading Fees - Expert Strategies",
        metaDescription:
          "Learn proven strategies to minimize your cryptocurrency trading fees across all major exchanges.",
        category: "tips",
        tags: ["fees", "trading", "tips", "savings"],
        publishedAt: new Date("2026-02-10"),
        aiGenerated: false,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: "crypto-exchange-security-checklist" },
      update: {},
      create: {
        slug: "crypto-exchange-security-checklist",
        title: "Crypto Exchange Security Checklist: Stay Safe in 2026",
        content:
          "Security should be your top priority when choosing a crypto exchange. This checklist covers two-factor authentication, cold storage policies, insurance funds, withdrawal whitelisting, and regulatory compliance. Learn what to look for and how to protect your assets from hacks and scams.",
        metaTitle: "Crypto Exchange Security Checklist 2026",
        metaDescription:
          "Essential security checklist for crypto exchanges. Protect your assets with these proven safety measures.",
        category: "security",
        tags: ["security", "safety", "checklist", "2fa"],
        publishedAt: new Date("2026-03-01"),
        aiGenerated: true,
      },
    }),
  ]);

  console.log(`Seeded ${blogPosts.length} blog posts`);

  console.log("Seeding complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
