"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchStaff,
  inviteStaff,
  revokeInvite,
  resendInvite,
  removeStaff,
  type StaffUser,
  type StaffInvite,
} from "@/lib/api";

/**
 * Staff management hook - fetches users/invites and provides invite/revoke/resend actions.
 * Uses apiFetch for consistent auth handling.
 */
export function useStaff() {
  const [users, setUsers] = useState<StaffUser[]>([]);
  const [invites, setInvites] = useState<StaffInvite[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const hasLoaded = useRef(false);
  const load = useCallback(async () => {
    if (!hasLoaded.current) setInitialLoading(true);
    try {
      const data = await fetchStaff();
      setUsers(data.users);
      setInvites(data.invites);
    } finally {
      hasLoaded.current = true;
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const invite = useCallback(async (email: string) => {
    setLoading(true);
    try {
      await inviteStaff(email);
      await load();
      return "";
    } catch (e) {
      return e instanceof Error ? e.message : "Failed to invite";
    } finally {
      setLoading(false);
    }
  }, [load]);

  const revoke = useCallback(async (id: string) => {
    await revokeInvite(id);
    await load();
  }, [load]);

  const resend = useCallback(async (inviteId: string) => {
    await resendInvite(inviteId);
  }, []);

  const remove = useCallback(async (userId: string) => {
    await removeStaff(userId);
    await load();
  }, [load]);

  return { users, invites, loading, initialLoading, invite, revoke, resend, remove, refresh: load };
}
