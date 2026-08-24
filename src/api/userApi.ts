import { supabase } from "@/utils/auth/supabase";

export async function getUserFavorites(user_id: string | null) {
  const { data, error } = await supabase
    .from("favorites")
    .select("mal_id")
    .eq("user_id", user_id);

  if (error) {
    throw error;
  }

  return data;
}

export async function addFavorites(animeId: number, userId: string) {
  const { data, error } = await supabase.from("favorites").insert([
    {
      user_id: userId,
      mal_id: animeId,
    },
  ]);

  if (error) {
    throw error;
  }

  return data;
}

export async function removeFavorites(animeId: number) {
  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("mal_id", animeId);

  if (error) {
    throw error;
  }

  return data;
}
