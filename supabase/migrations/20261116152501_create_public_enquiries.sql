/*
# Create public website enquiry storage

1. New Tables
- `website_enquiries`
- `id` (uuid, primary key) uniquely identifies each submitted enquiry.
- `full_name` (text) stores the visitor's name.
- `email` (text) stores the visitor's email address.
- `phone` (text) stores the visitor's optional phone or WhatsApp number.
- `enquiry_type` (text) stores training, landscaping, or general enquiry intent.
- `message` (text) stores the visitor's enquiry message.
- `created_at` (timestamptz) records when the enquiry was submitted.

2. Modified Tables
- None.

3. Security
- Row Level Security is enabled on `website_enquiries`.
- Anonymous and authenticated visitors may insert enquiries because this public website has no sign-in flow.
- No public read, update, or delete access is granted; submissions are intended for internal follow-up only.

4. Important Notes
- The website displays a confirmation after a successful database insert, but does not claim that an email was sent.
- Contact details are accepted only as part of a visitor-initiated enquiry.
*/

CREATE TABLE IF NOT EXISTS public.website_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  enquiry_type text NOT NULL CHECK (enquiry_type IN ('training', 'landscaping', 'general')),
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.website_enquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.website_enquiries TO anon, authenticated;

DROP POLICY IF EXISTS "Public can submit website enquiries" ON public.website_enquiries;
CREATE POLICY "Public can submit website enquiries"
  ON public.website_enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
