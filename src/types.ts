export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  profileUrl: string;
  createdAt: string;
};

export type CreateUserInput = {
  email: string;
  password: string;
  name: string;
  profileUrl: string;
};

export type Group = {
  id: number;
  name: string;
  ownersId: number;
};

export type CreateGroupInput = {
  name: string;
  ownersId: number;
}

export type IdGroupInput = {
  id: number;
};

export type UidIdGroupInput = {
  id: number;
  userId: number;
};

export type RemoveMemberInput = {
  id: number;
  userId: number;
  ownerId: number | null;
}

export type GroupContent = {
  id: number;
  timestamp: string | null;
  addedByUserId: number;
  groupsId: number;
  movieId: number;
}

export type CreateGroupContentInput = {
  addedByUserId: number;
  groupsId: number;
  movieId: number;
}

export type JoinGroupInput = {
  id: number;
  userId: number;
  ownerId: number;
};