import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
import { useSession } from "@clerk/clerk-expo";
import { useMemo } from "react";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const useSupabase = () => {
  const { session } = useSession();

  // Memoize the Supabase client to prevent re-creation on every render
  // The client will be re-created if the Clerk session changes
  const supabaseClient = useMemo(() => {
    return createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage, // Can be kept for general Supabase storage needs, though not critical for Clerk-managed sessions
        autoRefreshToken: false, // Clerk handles token refreshing
        persistSession: false, // Clerk handles session persistence
        detectSessionInUrl: false,
      },
      global: {
        // Get the custom Supabase token from Clerk for each request
        fetch: async (url, options = {}) => {
          const clerkToken = await session?.getToken({
            template: "supabase",
          });

          const headers = new Headers(options?.headers);
          if (clerkToken) {
            headers.set("Authorization", `Bearer ${clerkToken}`);
          }

          // Call the original fetch with the (potentially) modified headers
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    });
  }, [session]); // Dependency: re-create client if session changes

  return supabaseClient;
};
