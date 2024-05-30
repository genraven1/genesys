import {createClient} from "@supabase/supabase-js";

export const supabase = createClient("REACT_APP_SUPABASE_URL", "REACT_APP_SUPABASE_KEY");