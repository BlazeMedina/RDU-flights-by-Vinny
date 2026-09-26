/**
 * RDU flights by Vinny – Cloudflare Worker proxy
 * 
 * This worker forwards requests to the RDU flight API and adds CORS headers
 * so the page can be hosted on GitHub Pages (or anywhere else).
 *
 * Deploy on Cloudflare Workers (free tier is fine).
 */

const RDU_API = 'https://api.framna-rdu.cloud/flights';
const API_KEY = '1fa1d702630d46d98d2ef9a5b960ea74';
const API_VERSION = '150';

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    try {
      const url = new URL(request.url);
      // Pass through the query string (e.g. ?scheduledTimestamp=...)
      const target = RDU_API + (url.search || '');

      const upstream = await fetch(target, {
        method: 'GET',
        headers: {
          'Api-Key': API_KEY,
          'Api-Version': API_VERSION,
          'Content-Type': 'application/json',
          'Referer': 'https://www.rdu.com/',
          'User-Agent': 'RDU-flights-by-Vinny/1.0',
        },
      });

      const body = await upstream.text();

      return new Response(body, {
        status: upstream.status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(request),
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(request),
        },
      });
    }
  },
};

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}
