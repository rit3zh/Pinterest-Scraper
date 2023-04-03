import got from "got";
import cheerio from "cheerio";
import type { IPosts } from "../typings/index.js";
/**
 * @default
 * @description There's a separate function for fetching video post information. This function only supports images.
 */
async function getPost(id: number | string) {
  if (!id) throw new Error("Specify a post id.");

  const request = await got(`https://www.pinterest.com/pin/${id}`);
  const body = request.body;
  const $ = cheerio.load(body);
  const isOfficialUser =
    $("body")
      .find(".feh")
      .find(".Jea")
      .find(".qiB")
      .has(`div[data-test-id="official-user-attribution"]`)
      .html() === null
      ? false
      : true;

  if (isOfficialUser) {
    const username = $("body")
      .find(".feh")
      .find(".Jea")
      .find(".qiB")
      .find(".Wk9")
      .find(".tBJ")
      .text();

    const followers = $("body")
      .find(".feh")
      .find(".Jea")
      .find(".qiB")
      .find(".JME")
      .find("div")
      .last()
      .text()
      .split(" ")[0]
      .trim();
    const urlPath = $("body")
      .find(".feh")
      .find(".Jea")
      .find(".qiB")
      .find("a")
      .attr("href");
    const url = `https://www.pinterest.com${urlPath}`;
    const image = $("body")
      .find(".feh")
      .find(".Jea")
      .find(".qiB")
      .find("a")
      .find(".XiG")
      .find("img")
      .attr("src");
    const allTags: string[] = [];

    $("body")
      .find(".feh")
      .find(".Jea")
      .find(".KS5")
      .find(".XbT")
      .find(".C9q")
      .each((_, element) => {
        const $tags = $(element).text();
        allTags.push($tags);
      });
    const post = $("body").find(".feh").find(".CCY").find("img").attr("src");
    const object: IPosts = {
      tags: allTags,
      post,
      username,
      followers,
      image,
      url,
    };
    return object;
  } else {
    const username = $("body")
      .find(".feh")
      .find(".Jea")
      .find(".qiB")
      .find(`div[data-test-id="username"]`)
      .find(".tBJ")
      .html();

    const urlPath = $("body")
      .find(".feh")
      .find(".Jea")
      .find(".qiB")
      .find("a")
      .attr("href");
    const url = `https://www.pinterest.com${urlPath}`;

    const image = $("body")
      .find(".feh")
      .find(".Jea")
      .find(".qiB")
      .find("a")
      .find(".XiG")
      .find("img")
      .attr("src");

    const followers = $("body")
      .find(".feh")
      .find(".Jea")
      .find(".qiB")
      .find("div[data-test-id='user-follower-count']")
      .text()
      .split(" ")[0]
      .trim();

    const post = $("body").find(".feh").find(".CCY").find("img").attr("src");
    const allTags: string[] = [];

    $("body")
      .find(".feh")
      .find(".Jea")
      .find(".KS5")
      .find(".XbT")
      .find(".C9q")
      .each((_, element) => {
        const $tags = $(element).text();
        allTags.push($tags);
      })
      .html();
    const object: IPosts = {
      tags: allTags,
      post,
      username: username as string,
      followers,
      url,
      image,
    };
    return object;
  }
}
export default getPost;
