import { UserModel } from "./userModel";

export type MessageModel = {
    sender: UserModel;
    content: string;
  }