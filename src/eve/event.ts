import { Message } from "src/chat/entities/message.model";
import { User } from "src/chat/entities/user.model";

 export class UserJoinedEvent {
  constructor(public readonly roomId: string, public readonly userId: string) {}
}

export class MessageSentEvent {
  constructor(
    public readonly roomId: string,
    public readonly message:Message,
    public readonly userId: User,
  ) {}
}
