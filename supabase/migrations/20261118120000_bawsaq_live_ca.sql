-- BAWSAQ CA registry. Public visitors can read addresses; only a service key can edit them.
create table if not exists public.bawsaq_ca (
  slug text primary key check (slug in (
    'official', 'maze-bank', 'fleeca-bank', 'burger-shot',
    'cluckin-bell', 'up-n-atom', 'sprunk'
  )),
  mint text check (mint is null or mint ~ '^[1-9A-HJ-NP-Za-km-z]{32,44}$'),
  updated_at timestamptz not null default now()
);

insert into public.bawsaq_ca (slug, mint) values
  ('official', null), ('maze-bank', null), ('fleeca-bank', null),
  ('burger-shot', null), ('cluckin-bell', null), ('up-n-atom', null),
  ('sprunk', null)
on conflict (slug) do nothing;

alter table public.bawsaq_ca enable row level security;
drop policy if exists "BAWSAQ public CA read" on public.bawsaq_ca;
create policy "BAWSAQ public CA read" on public.bawsaq_ca
  for select to anon, authenticated using (true);
revoke all on public.bawsaq_ca from anon, authenticated;
grant select (slug, mint, updated_at) on public.bawsaq_ca to anon, authenticated;

create or replace view public.bawsaq_public_platform_reward_token
  with (security_invoker = true) as
select mint, false as rewards_enabled, updated_at
from public.bawsaq_ca
where slug = 'official' and mint is not null;

create or replace view public.bawsaq_public_commodities
  with (security_invoker = true) as
select
  stock.slug, stock.name, stock.symbol, stock.category,
  stock.description, stock.image_source_url, stock.sort_order,
  stock.image_source_url as image_url,
  true as image_cached,
  ca.mint,
  ca.updated_at,
  null::text as metadata_uri,
  null::text as launch_signature,
  null::text as routing_signature,
  null::timestamptz as launched_at,
  'UNAVAILABLE'::text as status,
  false as pairing_available,
  false as launch_pair_available,
  null::numeric as price_usd,
  null::numeric as market_cap_usd,
  null::numeric as liquidity_usd,
  null::numeric as volume_24h_usd,
  null::numeric as price_change_24h,
  null::text as preferred_pair_address,
  null::timestamptz as market_updated_at,
  null::integer as portfolios_using,
  null::text as lifetime_bought_raw,
  null::text as lifetime_distributed_raw,
  null::integer as decimals,
  null::text as token_program,
  null::timestamptz as route_checked_at
from (values
  ('maze-bank','ChatGTA','CGTA','banking','Vice City conversational AI.','/BAWSAQ/assets/stocks/gta-six/chatgta.png',1),
  ('fleeca-bank','Clawde','CLAW','banking','Careful reasoning for the city.','/BAWSAQ/assets/stocks/gta-six/clawde.png',2),
  ('burger-shot','Geminight','GEMI','food','Multimodal AI for Vice City.','/BAWSAQ/assets/stocks/gta-six/geminight.png',3),
  ('cluckin-bell','Grockstar','GROK','food','Real-time intelligence for the city.','/BAWSAQ/assets/stocks/gta-six/grockstar.png',4),
  ('up-n-atom','DeepStreet','DEEP','food','Accessible reasoning across the coast.','/BAWSAQ/assets/stocks/gta-six/deepstreet.png',5),
  ('sprunk','La Llama','LLMA','drinks','Open models from garages to servers.','/BAWSAQ/assets/stocks/gta-six/la-llama.png',6)
) as stock(slug,name,symbol,category,description,image_source_url,sort_order)
left join public.bawsaq_ca ca on ca.slug = stock.slug;

grant select on public.bawsaq_public_platform_reward_token to anon, authenticated;
grant select on public.bawsaq_public_commodities to anon, authenticated;
notify pgrst, 'reload schema';
