import { IUser } from "./IUser.js";

export interface IVideo {
  uri?: string;
  title?: string;
  duration?: string;
  user?: IUser;
  tags?: string[];
}
