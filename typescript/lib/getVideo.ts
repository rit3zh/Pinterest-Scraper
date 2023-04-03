import cheerio from "cheerio";
import type { IVideo } from "../typings/index.js";
import got from "got";

async function getVideo(id: string | number) {
  if (!id) throw new Error("No video post id specified");
  const baseURL: string = `https://www.pinterest.com/pin/${id}`;
  const request = await got(baseURL);
  const resolver = request.body;
  const $ = cheerio.load(resolver);
  const data = $("body").find("script[data-test-id='video-snippet']").html();
  const jsonData = JSON.parse(data as string);
  const pwsData = $("body").find("script#__PWS_DATA__").html();
  const _videoObject_ = JSON.parse(pwsData as string);
  const tags =
    _videoObject_?.props?.initialReduxState?.pins[`${id}`]?.pin_join
      ?.visual_annotation;
  const user =
    _videoObject_?.props?.initialReduxState?.pins[`${id}`]?.native_creator;
  var extractor: string = jsonData?.duration?.replace("PT", "");
  var mmhhss: string = extractor.replace(/[0-9]/g, "").toLowerCase();
  const numbers = extractor.replace(/[^0-9]/g, "");

  const returnObject: IVideo = {
    title: jsonData.name,
    user: {
      name: user?.full_name,
      imageURL: user?.image_medium_url,
    },
    duration: `${numbers}${mmhhss}`,
    uri: jsonData?.contentUrl,
    tags,
  };
  return returnObject;
}

export default getVideo;
