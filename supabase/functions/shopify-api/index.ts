import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { endpoint, method = 'GET', body: requestBody } = await req.json();
    
    const SHOPIFY_STORE = Deno.env.get('SHOPIFY_STORE');
    const SHOPIFY_ACCESS_TOKEN = Deno.env.get('SHOPIFY_ACCESS_TOKEN');

    if (!SHOPIFY_STORE || !SHOPIFY_ACCESS_TOKEN) {
      console.error('Missing Shopify credentials');
      return new Response(
        JSON.stringify({ error: 'Shopify credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate endpoint to prevent malicious requests
    if (!endpoint || typeof endpoint !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid endpoint' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Construct the full Shopify API URL
    const apiUrl = `https://${SHOPIFY_STORE}/admin/api/2023-10/${endpoint}`;
    
    console.log(`Making ${method} request to Shopify:`, apiUrl);

    const shopifyResponse = await fetch(apiUrl, {
      method,
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: requestBody ? JSON.stringify(requestBody) : undefined,
    });

    if (!shopifyResponse.ok) {
      const errorText = await shopifyResponse.text();
      console.error(`Shopify API error (${shopifyResponse.status}):`, errorText);
      
      if (shopifyResponse.status === 401 || shopifyResponse.status === 403) {
        return new Response(
          JSON.stringify({ 
            error: 'Authentication failed. Please verify your Shopify credentials.',
            details: errorText 
          }),
          { status: shopifyResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          error: 'Shopify API request failed',
          status: shopifyResponse.status,
          details: errorText 
        }),
        { status: shopifyResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await shopifyResponse.json();
    console.log('Shopify API response received successfully');

    return new Response(
      JSON.stringify(data),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in shopify-api function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
