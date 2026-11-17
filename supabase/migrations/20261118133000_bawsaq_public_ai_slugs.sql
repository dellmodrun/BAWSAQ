-- Public AI-company routes, while preserving the existing internal CA keys.
-- Existing clients can continue reading bawsaq_public_commodities until they refresh.
create or replace view public.bawsaq_public_commodities_v2
  with (security_invoker = true) as
select
  case v.slug
    when 'maze-bank' then 'chatgta'
    when 'fleeca-bank' then 'clawde'
    when 'burger-shot' then 'geminight'
    when 'cluckin-bell' then 'grockstar'
    when 'up-n-atom' then 'deepstreet'
    when 'sprunk' then 'la-llama'
  end as slug,
  v.name, v.symbol, v.category, v.description, v.image_source_url,
  v.sort_order, v.image_url, v.image_cached, v.mint, v.updated_at,
  v.metadata_uri, v.launch_signature, v.routing_signature, v.launched_at,
  v.status, v.pairing_available, v.launch_pair_available, v.price_usd,
  v.market_cap_usd, v.liquidity_usd, v.volume_24h_usd,
  v.price_change_24h, v.preferred_pair_address, v.market_updated_at,
  v.portfolios_using, v.lifetime_bought_raw, v.lifetime_distributed_raw,
  v.decimals, v.token_program, v.route_checked_at
from public.bawsaq_public_commodities v;

grant select on public.bawsaq_public_commodities_v2 to anon, authenticated;
notify pgrst, 'reload schema';
