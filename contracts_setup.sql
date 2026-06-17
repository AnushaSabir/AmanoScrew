-- Make buyer_id and seller_id optional to allow inviting users
ALTER TABLE public.contracts ALTER COLUMN buyer_id DROP NOT NULL;
ALTER TABLE public.contracts ALTER COLUMN seller_id DROP NOT NULL;

-- Add counterparty details for invitations
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS counterparty_email text;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS counterparty_phone text;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS counterparty_name text;
