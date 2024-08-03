import puppeteer from "puppeteer";

export async function GET(request: Request) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://vidsrc.cc/v2/embed/movie/385687");
    await page.waitForSelector(".fa-play");
    await page.click(".fa-play");
    await page.waitForSelector("#b-player");

    const iframeElement = await page.$("#b-player");
    const iframe = await iframeElement?.contentFrame();
    //...
    const src = iframe
      ? await page.evaluate(".jw-video", (el: any) => {
          if (el) {
            const src = el?.getAttribute("src");
            return src;
          } else {
            return "Nothing Found, Muhaha";
          }
        })
      : "Nothing Found...";
    console.log(src);
    return new Response(JSON.stringify({ source: src }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
