// import express from "express";
// import fetch from "node-fetch";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// dotenv.config();
// const app = express();
// app.use(express.json());

// // Fix __dirname (not available in ESM by default)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve static frontend
// app.use(express.static(path.join(__dirname, "public")));

// const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// app.post("/api/chat", async (req, res) => {
//     const stockAnalysisPrompt = "You are a financial analyst and stock market strategist who gather current latest data that is of realtime.I will give you the name of a listed company, and you will analyze and predict its stock price movement taking all data from date TODAY and in the short term (next 1–7 trading days). The company name: {$userInput} When generating your analysis and price prediction, you MUST collect and consider data from the following structured checklist: 1. Exchange & Official Filings (Hard Triggers) - Give date as well of price of stock when taken in account Check BSE/NSE corporate announcements for the latest filings (quarterly results, board meetings, mergers/acquisitions, dividends, stock splits, rights issues, QIP/FPO, insider trades, pledges, bulk/block deals, shareholding changes). - Extract key figures from company Investor Relations page (financial highlights, investor presentations, management commentary). - Summarize SEBI disclosures and regulatory updates. 2. Fundamentals & Valuation - Current share price, market cap, P/E ratio, P/B ratio, EPS, Book Value, Dividend Yield. - Compare valuation vs. industry peers. - Return ratios (ROCE, ROE, EBITDA margin, profit growth, debt/equity). - Highlight if stock looks overvalued, undervalued, or fairly priced. 3. Technical Analysis - Price trend over last 1 week, 1 month, 3 months, 6 months, 1 year. - Support & resistance levels, moving averages (20, 50, 200-day). - RSI, MACD, Bollinger Bands — is stock overbought, oversold, or neutral? - Volume trends — increasing/decreasing vs. price. 4. Derivatives / Market Positioning - Open Interest (OI) trend in Futures & Options. - Put/Call ratio (PCR). - Whether stock is in F&O ban list. - Delivery percentage (high = genuine buying, low = speculative). 5. Sector & Peer Comparison - How peers are performing in the same industry. - Sector index performance (Nifty IT, Nifty Pharma, Nifty Bank, etc.). - Any sector-specific government policies, incentives, or risks. 6. News & Media Coverage - Latest news headlines about the company. - Any ongoing rumors, controversies, or regulatory scrutiny. - Broker/analyst upgrades/downgrades or target price changes. - Management interviews or forward guidance. 7. Investor & Retail Sentiment - Social media chatter (Twitter/X, StockTwits, Reddit, Telegram, forums). - Google Trends interest for the company name. - Retail investor narrative (e.g., 'multibagger,' 'undervalued,' 'operator stock'). 8. Macro & External Factors - Global market conditions (Dow Jones, Nasdaq, S&P, FTSE, Nikkei). - Domestic indices (Nifty50, Sensex trend). - Commodity/FX impact (Oil, Gold, INR/USD) if relevant to the company. - RBI monetary policy, inflation, interest rates. - Geopolitical risks or trade-related news. 9. Corporate Events & Calendar - Upcoming board meetings, results, AGMs, EGMs, dividends, stock splits, buybacks. - Lock-in expiries, promoter selling, or large fund offloading. - Institutional investor activity (FII/DII inflows/outflows). 10. Prediction & Scenario Mapping - Give a probabilistic outlook for the stock for the next 1–7 trading days. - Provide 3 scenarios: A) Bullish momentum scenario (upside targets, probability %). B) Bearish pressure scenario (downside risk levels, probability %). C) Neutral/consolidation scenario (likely trading range, probability %). - Quote expected range (min/max likely price). - Identify key triggers that could cause the price to break up or down. 11. Risk Notes - Mention risks such as overvaluation, operator-driven spikes, liquidity issues, corporate governance red flags. - Highlight if stock is 'high-risk speculative' vs. 'fundamentally strong'. 12. Final Output Format - Clear, structured analysis with: - Current status - Key bullish factors - Key bearish factors - Scenario probability map - Expected range (short term) - Risk disclaimer (not investment advice)";



//   try {
//     const response = await fetch(OPENAI_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "gpt-4o-mini",   // ✅ use a valid lightweight model
//         messages: [
//           { role: "system", content: stockAnalysisPrompt},
//           { role: "user", content: req.body.message }
//         ]
//       })
//     });

//     const data = await response.json();
//     console.log("🔍 OpenAI response:", data); // <-- Debugging

//     if (!data.choices || data.choices.length === 0) {
//       return res.status(500).json({ error: data.error || "No response from OpenAI" });
//     }

//     res.json({ reply: data.choices[0].message.content });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });


// const PORT = 3000;
// app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));


  // import express from "express";
  // import path from "path";
  // import { fileURLToPath } from "url";
  // import dotenv from "dotenv";
  // import fetch from "node-fetch"; // or use built-in fetch in Node ≥18

  // dotenv.config();
  // const app = express();
  // app.use(express.json());

  // // ESM __dirname workaround
  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = path.dirname(__filename);
  // app.use(express.static(path.join(__dirname, "public")));

  // const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
  // const ALPHAVANTAGE_URL = "https://www.alphavantage.co/query";

  // app.post("/api/chat", async (req, res) => {
  //   const userInput = req.body.message.trim();

  //   try {
  //     // 1. Fetch real-time stock data
  //     const avResponse = await fetch(`${ALPHAVANTAGE_URL}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(userInput)}&apikey=${process.env.ALPHA_VANTAGE_KEY}`);
  //     const avData = await avResponse.json();
  //     console.log("Alpha Vantage response:", avData);

  //     const quote = avData["Global Quote"];
  //     if (!quote || !quote["05. price"]) {
  //       return res.status(500).json({ error: "Unable to fetch stock price" });
  //     }

  //     const price = quote["05. price"];
  //     const latestDataSnippet = `Current price of ${userInput}: ₹${price}`;

  //     // 2. Send data to OpenAI with system + user prompt
  //     const stockAnalysisPrompt = `You are a financial analyst. Use today's live stock data: ${latestDataSnippet}. Provide analysis and short-term prediction (1-7 trading days).`;

  //     const gptResponse = await fetch(OPENAI_API_URL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
  //       },
  //       body: JSON.stringify({
  //         model: "gpt-4o-mini",
  //         messages: [
  //           { role: "system", content: stockAnalysisPrompt },
  //           { role: "user", content: userInput }
  //         ]
  //       })
  //     });

  //     const gptData = await gptResponse.json();
  //     console.log("OpenAI response:", gptData);

  //     if (!gptData.choices || gptData.choices.length === 0) {
  //       return res.status(500).json({ error: gptData.error || "No response from OpenAI" });
  //     }

  //     res.json({ reply: gptData.choices[0].message.content });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ error: "Internally failed" });
  //   }
  // });

  // const PORT = 3000;
  // app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";
// import fetch from "node-fetch";

// dotenv.config();
// const app = express();
// app.use(express.json());

// // ESM __dirname workaround
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, "public")));

// const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
// const ALPHAVANTAGE_URL = "https://www.alphavantage.co/query";

// // Utility: Clean company names
// function cleanCompanyName(input) {
//   return input
//     .replace(/\b(ltd|limited|pvt|private|inc|corp|co)\b/gi, "")
//     .trim();
// }

// // Utility: Get symbol from Alpha Vantage
// async function getStockSymbol(userInput) {
//   const searchQuery = cleanCompanyName(userInput);
//   const searchResponse = await fetch(
//     `${ALPHAVANTAGE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(searchQuery)}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
//   );
//   const searchData = await searchResponse.json();
//   console.log("Symbol Search Response:", searchData);

//   if (!searchData.bestMatches || searchData.bestMatches.length === 0) {
//     return null;
//   }

//   // Prefer NSE (.NS), else fallback to first match
//   const matches = searchData.bestMatches;
//   const stockSymbol =
//     matches.find(m => m["1. symbol"].endsWith(".NS"))?.["1. symbol"] ||
//     matches[0]["1. symbol"];
//   return stockSymbol;
// }

// // Utility: Fetch latest news from Alpha Vantage
// async function getStockNews(symbol) {
//   const newsResponse = await fetch(
//     `${ALPHAVANTAGE_URL}?function=NEWS_SENTIMENT&tickers=${encodeURIComponent(symbol)}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
//   );
//   const newsData = await newsResponse.json();
//   console.log("Alpha Vantage News response:", newsData);

//   if (!newsData.feed || newsData.feed.length === 0) {
//     return "No recent news available.";
//   }

//   // Take top 3 headlines
//   const headlines = newsData.feed.slice(0, 3).map(n => `- ${n.title}`).join("\n");
//   return `Latest news headlines:\n${headlines}`;
// }

// app.post("/api/chat", async (req, res) => {
//   const userInput = req.body.message.trim();

//   try {
//     // 1. Resolve symbol
//     const symbol = await getStockSymbol(userInput);
//     if (!symbol) {
//       return res.status(500).json({ error: "Unable to find stock symbol" });
//     }

//     // 2. Fetch real-time stock data
//     const avResponse = await fetch(
//       `${ALPHAVANTAGE_URL}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
//     );
//     const avData = await avResponse.json();
//     console.log("Alpha Vantage response:", avData);

//     const quote = avData["Global Quote"];
//     if (!quote || !quote["05. price"]) {
//       return res.status(500).json({ error: "Unable to fetch stock price" });
//     }

//     const price = quote["05. price"];
//     const latestDataSnippet = `Current price of ${userInput} (${symbol}): ₹${price}`;

//     // 3. Fetch latest news
//     const newsSnippet = await getStockNews(symbol);

//     // 4. Send data + news to OpenAI
//     const stockAnalysisPrompt = `You are a financial analyst. Use today's live stock data and news.\n\n${latestDataSnippet}\n\n${newsSnippet}\n\nProvide analysis and short-term prediction (1-7 trading days). lear, structured analysis with: - Current status - Key bullish factors - Key bearish factors - Scenario probability map - Expected range (short term) - Risk disclaimer (not investment advice)`;

//     const gptResponse = await fetch(OPENAI_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4o-mini",
//         messages: [
//           { role: "system", content: stockAnalysisPrompt },
//           { role: "user", content: userInput },
//         ],
//       }),
//     });

//     const gptData = await gptResponse.json();
//     console.log("OpenAI response:", gptData);

//     if (!gptData.choices || gptData.choices.length === 0) {
//       return res
//         .status(500)
//         .json({ error: gptData.error || "No response from OpenAI" });
//     }

//     res.json({ reply: gptData.choices[0].message.content });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internally failed" });
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () =>
//   console.log(`✅ Server running at http://localhost:${PORT}`)
// );


// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";
// import fetch from "node-fetch";
// import xml2js from "xml2js"; // ✅ install: npm install xml2js

// dotenv.config();
// const app = express();
// app.use(express.json());

// // ESM __dirname workaround
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, "public")));

// const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
// const ALPHAVANTAGE_URL = "https://www.alphavantage.co/query";

// // ✅ Utility: Clean company names
// function cleanCompanyName(input) {
//   return input
//     .replace(/\b(ltd|limited|pvt|private|inc|corp|co)\b/gi, "")
//     .trim();
// }

// // ✅ Utility: Get stock symbol from Alpha Vantage
// async function getStockSymbol(userInput) {
//   const searchQuery = cleanCompanyName(userInput);
//   const searchResponse = await fetch(
//     `${ALPHAVANTAGE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
//       searchQuery
//     )}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
//   );
//   const searchData = await searchResponse.json();
//   console.log("🔍 Symbol Search Response:", searchData);

//   if (!searchData.bestMatches || searchData.bestMatches.length === 0) {
//     return null;
//   }

//   // Prefer NSE (.NS), else fallback to first match
//   const matches = searchData.bestMatches;
//   const stockSymbol =
//     matches.find((m) => m["1. symbol"].endsWith(".NS"))?.["1. symbol"] ||
//     matches[0]["1. symbol"];
//   return stockSymbol;
// }

// // ✅ Utility: Fetch latest news from Google News RSS
// async function getStockNews(company) {
//   try {
//     const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(
//       company
//     )}&hl=en-IN&gl=IN&ceid=IN:en`;

//     const resp = await fetch(rssUrl);
//     const xmlData = await resp.text();

//     const parser = new xml2js.Parser();
//     const parsed = await parser.parseStringPromise(xmlData);

//     const items = parsed.rss.channel[0].item || [];
//     if (items.length === 0) {
//       return "No recent news available.";
//     }

//     // Take top 3 headlines
//     const headlines = items
//       .slice(0, 3)
//       .map((a) => `- ${a.title[0]}`)
//       .join("\n");

//     return `Latest news headlines:\n${headlines}`;
//   } catch (err) {
//     console.error("❌ Error fetching Google News RSS:", err.message);
//     return "⚠️ Failed to fetch news.";
//   }
// }

// // ✅ Main API Endpoint
// app.post("/api/chat", async (req, res) => {
//   const userInput = req.body.message.trim();

//   try {
//     // 1. Resolve stock symbol
//     const symbol = await getStockSymbol(userInput);
//     if (!symbol) {
//       return res.status(500).json({ error: "Unable to find stock symbol" });
//     }

//     // 2. Fetch real-time stock data
//     const avResponse = await fetch(
//       `${ALPHAVANTAGE_URL}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
//         symbol
//       )}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
//     );
//     const avData = await avResponse.json();
//     console.log("📊 Alpha Vantage response:", avData);

//     const quote = avData["Global Quote"];
//     if (!quote || !quote["05. price"]) {
//       return res.status(500).json({ error: "Unable to fetch stock price" });
//     }

//     const price = quote["05. price"];
//     const latestDataSnippet = `Current price of ${userInput} (${symbol}): ₹${price}`;

//     // 3. Fetch latest news (Google News RSS)
//     const newsSnippet = await getStockNews(userInput);

//     // 4. Prepare prompt for OpenAI
//     const stockAnalysisPrompt = `You are a financial analyst. Use today's live stock data and news.\n\n${latestDataSnippet}\n\n${newsSnippet}\n\nProvide analysis and short-term prediction (1-7 trading days). Clear, structured analysis with:\n- Current status\n- Key bullish factors\n- Key bearish factors\n- Scenario probability map\n- Expected range (short term)\n- Risk disclaimer (not investment advice)`;

//     // 5. Call OpenAI API
//     const gptResponse = await fetch(OPENAI_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4o-mini",
//         messages: [
//           { role: "system", content: stockAnalysisPrompt },
//           { role: "user", content: userInput },
//         ],
//       }),
//     });

//     const gptData = await gptResponse.json();
//     console.log("🤖 OpenAI response:", gptData);

//     if (!gptData.choices || gptData.choices.length === 0) {
//       return res
//         .status(500)
//         .json({ error: gptData.error || "No response from OpenAI" });
//     }

//     res.json({ reply: gptData.choices[0].message.content });
//   } catch (err) {
//     console.error("🔥 Internal error:", err);
//     res.status(500).json({ error: "Internally failed" });
//   }
// });

// // ✅ Start server
// const PORT = 3000;
// app.listen(PORT, () =>
//   console.log(`✅ Server running at http://localhost:${PORT}`)
// );





import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const ALPHAVANTAGE_URL = "https://www.alphavantage.co/query";
const FINNHUB_URL = "https://finnhub.io/api/v1";

// ✅ Utility: Clean company names
function cleanCompanyName(input) {
  return input
    .replace(/\b(ltd|limited|pvt|private|inc|corp|co)\b/gi, "")
    .trim();
}

// ✅ Utility: Get stock symbol from Alpha Vantage
async function getStockSymbol(userInput) {
  const searchQuery = cleanCompanyName(userInput);
  const searchResponse = await fetch(
    `${ALPHAVANTAGE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
      searchQuery
    )}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
  );
  const searchData = await searchResponse.json();
  console.log("🔍 Symbol Search Response:", searchData);

  if (!searchData.bestMatches || searchData.bestMatches.length === 0) {
    return null;
  }

  // Prefer NSE (.NS), else fallback to first match
  const matches = searchData.bestMatches;
  const stockSymbol =
    matches.find((m) => m["1. symbol"].endsWith(".NS"))?.["1. symbol"] ||
    matches[0]["1. symbol"];
  return stockSymbol;
}

// ✅ Utility: Fetch latest news from Finnhub
async function getStockNews(symbol) {
  try {
    // Last 7 days window
    const today = new Date();
    const prior = new Date();
    prior.setDate(today.getDate() - 7);

    const from = prior.toISOString().split("T")[0];
    const to = today.toISOString().split("T")[0];

    const url = `${FINNHUB_URL}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${process.env.FINNHUB_KEY}`;
    console.log("📰 Fetching news from:", url);

    const resp = await fetch(url);
    const newsData = await resp.json();
    console.log("📰 Finnhub News Response:", newsData);

    if (!Array.isArray(newsData) || newsData.length === 0) {
      return "No recent news available.";
    }

    // Take top 3 headlines
    const headlines = newsData
      .slice(0, 3)
      .map((n) => `- ${n.headline}`)
      .join("\n");

    return `Latest news headlines:\n${headlines}`;
  } catch (err) {
    console.error("❌ Error fetching Finnhub news:", err.message);
    return "⚠️ Failed to fetch news.";
  }
}

// ✅ Main API Endpoint
app.post("/api/chat", async (req, res) => {
  const userInput = req.body.message.trim();

  try {
    // 1. Resolve stock symbol
    const symbol = await getStockSymbol(userInput);
    if (!symbol) {
      return res.status(500).json({ error: "Unable to find stock symbol" });
    }

    // 2. Fetch real-time stock data
    const avResponse = await fetch(
      `${ALPHAVANTAGE_URL}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
        symbol
      )}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
    );
    const avData = await avResponse.json();
    console.log("📊 Alpha Vantage response:", avData);

    const quote = avData["Global Quote"];
    if (!quote || !quote["05. price"]) {
      return res.status(500).json({ error: "Unable to fetch stock price" });
    }

    const price = quote["05. price"];
    const latestDataSnippet = `Current price of ${userInput} (${symbol}): ₹${price}`;

    // 3. Fetch latest news (Finnhub)
    const newsSnippet = await getStockNews(symbol);

    // 4. Prepare prompt for OpenAI
    const stockAnalysisPrompt = `You are a financial analyst. Use today's ALL every single live stock data and news that I gave to you.\n\n${latestDataSnippet}\n\n${newsSnippet}\n\nProvide analysis and short-term prediction (1-7 trading days). Clear, structured analysis with:\n- Current status\n- Key bullish factors\n- Key bearish factors\n- Scenario probability map\n- Expected range (short term)\n- Risk disclaimer (not investment advice)`;

    // 5. Call OpenAI API
    const gptResponse = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: stockAnalysisPrompt },
          { role: "user", content: userInput },
        ],
      }),
    });

    const gptData = await gptResponse.json();
    console.log("🤖 OpenAI response:", gptData);

    if (!gptData.choices || gptData.choices.length === 0) {
      return res
        .status(500)
        .json({ error: gptData.error || "No response from OpenAI" });
    }

    res.json({ reply: gptData.choices[0].message.content });
  } catch (err) {
    console.error("🔥 Internal error:", err);
    res.status(500).json({ error: "Internally failed" });
  }
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
