import { useEffect, useRef } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/utils/supabase/client';

export type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

interface UseRealtimeTableOptions {
  table: string;
  filter?: string;
  event?: RealtimeEvent;
  onEvent: (payload: { eventType: string; new: Record<string, unknown>; old: Record<string, unknown> }) => void;
  enabled?: boolean;
}

export function useRealtimeTable({
  table,
  filter,
  event = '*',
  onEvent,
  enabled = true,
}: UseRealtimeTableOptions) {
  const channelRef = useRef<RealtimeChannel | null>(null);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  useEffect(() => {
    if (!enabled) return;

    const supabase = getSupabaseClient();
    const channelName = `realtime-${table}${filter ? `-${filter}` : ''}`;

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes' as any,
        {
          event,
          schema: 'public',
          table,
          ...(filter ? { filter } : {}),
        },
        (payload: any) => {
          onEventRef.current({
            eventType: payload.eventType,
            new: payload.new ?? {},
            old: payload.old ?? {},
          });
        }
      )
      .subscribe((status: string) => {
        if (status === 'SUBSCRIBED') {
          console.log(`[Realtime] Subscribed to ${table}${filter ? ` (filter: ${filter})` : ''}`);
        } else if (status === 'CHANNEL_ERROR') {
          console.warn(`[Realtime] Channel error for ${table}`);
        }
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
      channelRef.current = null;
    };
  }, [table, filter, event, enabled]);
}
