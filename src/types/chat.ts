
export***REMOVED***interface***REMOVED***Message***REMOVED***{
***REMOVED******REMOVED***id:***REMOVED***string;
***REMOVED******REMOVED***sender_id:***REMOVED***string;
***REMOVED******REMOVED***receiver_id:***REMOVED***string;
***REMOVED******REMOVED***content:***REMOVED***string;
***REMOVED******REMOVED***message_type:***REMOVED***'text'***REMOVED***|***REMOVED***'image'***REMOVED***|***REMOVED***'file'***REMOVED***|***REMOVED***'audio';
***REMOVED******REMOVED***timestamp:***REMOVED***Date;
***REMOVED******REMOVED***is_read:***REMOVED***boolean;
***REMOVED******REMOVED***is_delivered:***REMOVED***boolean;
***REMOVED******REMOVED***reply_to?:***REMOVED***string;
***REMOVED******REMOVED***file_url?:***REMOVED***string;
***REMOVED******REMOVED***file_name?:***REMOVED***string;
***REMOVED******REMOVED***file_size?:***REMOVED***number;
}

export***REMOVED***interface***REMOVED***Conversation***REMOVED***{
***REMOVED******REMOVED***id:***REMOVED***string;
***REMOVED******REMOVED***participants:***REMOVED***string[];
***REMOVED******REMOVED***last_message?:***REMOVED***Message;
***REMOVED******REMOVED***created_at:***REMOVED***Date;
***REMOVED******REMOVED***updated_at:***REMOVED***Date;
***REMOVED******REMOVED***is_group:***REMOVED***boolean;
***REMOVED******REMOVED***group_name?:***REMOVED***string;
***REMOVED******REMOVED***group_avatar?:***REMOVED***string;
}

export***REMOVED***interface***REMOVED***ChatContact***REMOVED***{
***REMOVED******REMOVED***id:***REMOVED***string;
***REMOVED******REMOVED***profile:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***first_name:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***last_name:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***avatar_url?:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***photo_url?:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***phone?:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***is_online:***REMOVED***boolean;
***REMOVED******REMOVED******REMOVED******REMOVED***last_seen?:***REMOVED***Date;
***REMOVED******REMOVED***};
***REMOVED******REMOVED***conversation_id:***REMOVED***string;
***REMOVED******REMOVED***last_message?:***REMOVED***Message;
***REMOVED******REMOVED***unread_count:***REMOVED***number;
}

export***REMOVED***interface***REMOVED***TypingIndicator***REMOVED***{
***REMOVED******REMOVED***user_id:***REMOVED***string;
***REMOVED******REMOVED***conversation_id:***REMOVED***string;
***REMOVED******REMOVED***is_typing:***REMOVED***boolean;
***REMOVED******REMOVED***timestamp:***REMOVED***Date;
}

export***REMOVED***interface***REMOVED***OnlineStatus***REMOVED***{
***REMOVED******REMOVED***user_id:***REMOVED***string;
***REMOVED******REMOVED***is_online:***REMOVED***boolean;
***REMOVED******REMOVED***last_seen:***REMOVED***Date;
}
