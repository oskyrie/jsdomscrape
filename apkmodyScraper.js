// tutorial dari https://masgimenz.com/blog/scrape-jsdom-part-1
const { default: axios } = require("axios");
const { JSDOM } = require("jsdom");

async function cariAPK(query) {
  try {
    // ambil data html dari web pakai axios
    const { data } = await axios.get(
      "https://apkmody.io/?s=" + encodeURI(query)
    );

    // kita load DOM pakai jsdom
    let dom = new JSDOM(data).window.document;

    // karena data yang akan kita ambil berupa list, maka kita gunakan querySelectorAll
    let apksData = [...dom.querySelectorAll("div.flex-item"),];

    return apksData.map((apkData) => ({
      title: apkData.querySelector("article > div > a > div.card-body > div > h2").textContent,
      version: apkData.querySelector("article > div > a > div.card-body > p").textContent.trim(),
      link: apkData.querySelector("article > a").getAttribute("href"),
    }));
  } catch (error) {
    throw error;
  }
}

cariAPK("shadow fight").then(console.log);
