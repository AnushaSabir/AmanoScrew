-- 1. Add KYC columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS kyc_status text DEFAULT 'Pending',
ADD COLUMN IF NOT EXISTS kyc_doc_type text,
ADD COLUMN IF NOT EXISTS kyc_doc_front text,
ADD COLUMN IF NOT EXISTS kyc_doc_back text,
ADD COLUMN IF NOT EXISTS phone text;

-- 2. Create Storage Bucket for KYC Documents
insert into storage.buckets (id, name, public)
values ('kyc-documents', 'kyc-documents', true)
on conflict (id) do nothing;

-- 3. Set up Storage Policies to allow public uploads and reads
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'kyc-documents' );

create policy "Public Insert"
  on storage.objects for insert
  with check ( bucket_id = 'kyc-documents' );
