-- Create saved_threads table
create table saved_threads (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  thread_id uuid not null references events(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(user_id, thread_id)
);

-- Enable RLS
alter table saved_threads enable row level security;

-- Policy: Users can insert their own saved threads
create policy "Users can save threads"
  on saved_threads
  for insert
  with check (auth.uid() = user_id);

-- Policy: Users can delete their own saved threads
create policy "Users can unsave threads"
  on saved_threads
  for delete
  using (auth.uid() = user_id);

-- Policy: Users can only read their own saved threads
create policy "Users can view their saved threads"
  on saved_threads
  for select
  using (auth.uid() = user_id);

-- Create index for faster queries
create index idx_saved_threads_user_id on saved_threads(user_id);
create index idx_saved_threads_thread_id on saved_threads(thread_id);
