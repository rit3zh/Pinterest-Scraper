export interface IPinUser {
  username?: string;
  profileName?: string;
  imageURL?: string;
  bannerURL?: string | undefined;
  followers?: string | number;
  following?: string | number;
  aboutMe?: string;
  userId?: string | number;
  lastPinSavedAt?: string;
  locale?: string;
  pinCount?: string | number;
  boardCount?: string | number;
}
