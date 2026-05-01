const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function supabaseFetch(endpoint: string, options: RequestInit = {}) {
    const url = `${supabaseUrl}/rest/v1/${endpoint}`;

    const headers = {
        'Content-Type': 'application/json',
        'apikey': supabaseKey!,
        'Authorization': `Bearer ${supabaseKey!}`,
        'Prefer': 'return=representation', // Returns the object after insertion
        ...options.headers,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Supabase API error');
    }

    return response.json();
}