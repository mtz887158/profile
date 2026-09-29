-- Run in Supabase > SQL Editor. Admin = any signed-in user, so DISABLE public sign-ups.
create table profile(id int primary key default 1 check(id=1), name text, title text, bio text, about text, university text, education text, location text, interests text, learning text, goals text, email text, whatsapp text, cv_url text, avatar_url text);
create table skills(id uuid primary key default gen_random_uuid(), name text not null, icon text, category text, level text, created_at timestamptz default now());
create table projects(id uuid primary key default gen_random_uuid(), name text not null, short_description text, full_description text, technologies text, github_url text, demo_url text, category text, featured boolean default false, image_url text, created_at timestamptz default now());
create table certificates(id uuid primary key default gen_random_uuid(), name text not null, organization text, date text, url text, image_url text, created_at timestamptz default now());
create table youtube_videos(id uuid primary key default gen_random_uuid(), title text not null, description text, url text, date text, category text, image_url text, created_at timestamptz default now());
create table social_links(id uuid primary key default gen_random_uuid(), platform text not null, url text, created_at timestamptz default now());
create table messages(id uuid primary key default gen_random_uuid(), name text not null check(char_length(name)<=100), email text not null check(char_length(email)<=200), message text not null check(char_length(message)<=3000), created_at timestamptz default now());
create table settings(id int primary key default 1 check(id=1), seo_title text, seo_description text);
do $$ declare t text; begin
 foreach t in array array['profile','skills','projects','certificates','youtube_videos','social_links','settings'] loop
  execute format('alter table %I enable row level security',t);
  execute format('create policy "public read" on %I for select using (true)',t);
  execute format('create policy "admin write" on %I for all to authenticated using (true) with check (true)',t);
 end loop; end $$;
alter table messages enable row level security;
create policy "anyone can send" on messages for insert with check (true);
create policy "admin reads" on messages for select to authenticated using (true);
create policy "admin deletes" on messages for delete to authenticated using (true);
insert into storage.buckets(id,name,public) values('images','images',true) on conflict do nothing;
create policy "public view images" on storage.objects for select using (bucket_id='images');
create policy "admin upload images" on storage.objects for insert to authenticated with check (bucket_id='images');
create policy "admin change images" on storage.objects for update to authenticated using (bucket_id='images');
create policy "admin delete images" on storage.objects for delete to authenticated using (bucket_id='images');
-- PLACEHOLDER data: replace from /admin
insert into profile(name,title,bio,about,university,location,learning,goals) values('Moataz Saleh','Software Engineer','[PLACEHOLDER] Write your short introduction in Admin > Profile.','[PLACEHOLDER] Write about yourself.','[PLACEHOLDER] Your university','[PLACEHOLDER] Your city','[PLACEHOLDER] What you are learning','[PLACEHOLDER] Your goals');
insert into settings(id) values(1);
insert into skills(name,category,level) values('C++','Languages','Learning'),('Python','Languages','Learning'),('JavaScript','Web','Learning'),('Git','Tools','Learning');
insert into projects(name,short_description,technologies,category,featured) values('[EXAMPLE] Sample project','Placeholder. Edit or delete in Admin > Projects.','React, Supabase','Web Development',true);
