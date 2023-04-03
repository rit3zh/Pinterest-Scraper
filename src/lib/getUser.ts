import got from "got";
import cheerio from "cheerio";
import type { IPinUser as IUser } from "../typings/index.js";
/**
 * @default
 *
 * @message This is case sensitive. Make sure to pass the exact pinterest username.
 */
async function getUser(username: string) {
  if (!username) throw new Error("Specify a username.");
  if (typeof username !== "string")
    throw new Error("You can only pass a string as username.");
  const baseURL: string = `https://www.pinterest.com/${username}/`;
  const request = await got(baseURL);
  const resolver = request.body;
  const $ = cheerio.load(resolver);
  const pwsData = $("body").find("script#__PWS_DATA__").html();
  const jsonData = JSON.parse(pwsData as string);
  const user =
    jsonData?.props?.initialReduxState?.resources?.UserResource[
      `field_set_key="unauth_profile",is_mobile_fork=true,username="${username}"`
    ]?.data;
  const banner = user?.profile_cover?.images?.originals?.url || "";
  const time = user?.last_pin_save_time;
  const date = new Date(time);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.toLocaleString("default", { year: "numeric" });
  const returnObject: IUser = {
    username: user?.username,
    aboutMe: user?.about,
    boardCount: user?.board_count,
    followers: user?.follower_count,
    following: user?.following_count,
    imageURL: user?.image_xlarge_url,
    bannerURL: banner,
    lastPinSavedAt: `${day} ${month}, ${year}`,
    locale: user?.locale,
    pinCount: user?.pin_count,
    profileName: user?.full_name,
    userId: user?.id,
  };

  return returnObject as IUser;
}
export default getUser;
