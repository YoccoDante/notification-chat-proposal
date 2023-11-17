import { MessageModel } from "./messageModel";

export type ChatModel = {
    id: number;
    messages: MessageModel[];
}