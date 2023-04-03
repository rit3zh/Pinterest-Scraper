export interface IAuthor {
  displayName?: string;
  username?: string;
  id?: number | string;
  avatarURL?: string;
}
export interface IBoard {
  name?: string;
  description?: string;
  followersCount?: number;
  boardURL?: string;
  id?: string | number;
  sectionsCount?: number;
  createdAt?: string;
  coverURL?: string;
  lastUpdatedAt?: string;
  pinCounts?: number;
  author?: IAuthor;
}
