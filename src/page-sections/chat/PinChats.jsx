import Typography from '@mui/material/Typography'; // CUSTOM ICON COMPONENT

import PushPin from '@/icons/PushPin'; // CUSTOM COMPONENTS

import ChatItem from './chat-item/ChatItem';
import FlexBox from '@/components/flexbox/FlexBox'; // CUSTOM DUMMY DATA

import { PIN_CHATS } from '@/__fakeData__/chats';
export default function PinChats() {
  return <div>
      <FlexBox alignItems="center" gap={1} px={3} mb={1}>
        <PushPin sx={{
        fontSize: 19,
        color: 'grey.500'
      }} />
        <Typography variant="body2" fontWeight={500} color="text.secondary">
          Pinned
        </Typography>
      </FlexBox>

      {PIN_CHATS.map(item => <ChatItem id={item.id} key={item.id} name={item.name} time={item.time} image={item.image} lastMsg={item.lastMsg} unseenMsg={item.unseenMsg} lastMsgSeen={item.lastMsgSeen} isLastMsgIncoming={item.isLastMsgIncoming} />)}
    </div>;
}