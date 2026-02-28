"use client";

import { useState, useCallback, useEffect } from "react";
import { useSupabase } from "./useSupabase";
import { type CoinAction, getCoinReward } from "../coins";

export function useCoins() {
  const supabase = useSupabase();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBalance = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("user_progress")
      .select("dz_coins")
      .eq("user_id", user.id)
      .single();

    if (data) setBalance(data.dz_coins ?? 0);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const earnCoins = useCallback(
    async (action: CoinAction, label?: string) => {
      const amount = getCoinReward(action);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return 0;

      const { error } = await supabase.rpc("grant_coins", {
        p_user_id: user.id,
        p_amount: amount,
        p_description: label || action,
      });

      if (!error) {
        setBalance((prev) => prev + amount);
      }
      return amount;
    },
    [supabase]
  );

  const spendCoins = useCallback(
    async (amount: number, itemId: string) => {
      if (balance < amount) return false;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return false;

      const { error } = await supabase.rpc("spend_coins", {
        p_user_id: user.id,
        p_amount: amount,
        p_item_id: itemId,
      });

      if (!error) {
        setBalance((prev) => prev - amount);
        return true;
      }
      return false;
    },
    [supabase, balance]
  );

  return { balance, loading, earnCoins, spendCoins, fetchBalance };
}
