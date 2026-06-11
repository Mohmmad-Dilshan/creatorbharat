/**
 * useMessageLimit.js
 *
 * Message limit rules:
 *   Free user  → max 3 conversations
 *   Pro/Enterprise → unlimited
 *
 * Works for both creator and brand roles.
 */

import { useApp } from '@/core/context';
import { LS } from '@/utils/helpers';

export function useMessageLimit() {
  const { st } = useApp();

  const FREE_LIMIT = 3;
  const isUnlimited = st.isPro;

  // Count current conversations (excluding HQ which is always free)
  const getConversationCount = () => {
    const convs = LS.get('cb_conversations', []);
    return convs.filter(c => !c.isHQ).length;
  };

  const canStartNewConversation = () => {
    if (isUnlimited) return true;
    return getConversationCount() < FREE_LIMIT;
  };

  const getRemainingMessages = () => {
    if (isUnlimited) return Infinity;
    return Math.max(0, FREE_LIMIT - getConversationCount());
  };

  const getLimitInfo = () => ({
    isUnlimited,
    limit: FREE_LIMIT,
    used: getConversationCount(),
    remaining: getRemainingMessages(),
    canStart: canStartNewConversation(),
  });

  return { canStartNewConversation, getRemainingMessages, getLimitInfo, isUnlimited, FREE_LIMIT };
}
