const { createClient } = require('@supabase/supabase-js')
const supabase = createClient('https://yykulehsdovqmshnzsvz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5a3VsZWhzZG92cW1zaG56c3Z6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTAzNzc1OCwiZXhwIjoyMDc2NjEzNzU4fQ.PnYPz7Odh_TGq4mUzGGAQ32T3ZbUdI4z-JoQ7gd87F0')

async function run() {
  const vendors = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      email: 'demo1@jlpweds.local',
      business_name: 'Demo DJ Services',
      slug: 'demo-dj-services',
      seo_title: 'Demo DJ Services - JLPweds',
      seo_description: 'Wedding DJ services Ambedkar Nagar',
      verified: true,
      status: 'approved',
      rating: 4.8,
      review_count: 12
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      email: 'demo2@jlpweds.local',
      business_name: 'Demo Photographer',
      slug: 'demo-photographer',
      seo_title: 'Demo Photographer - JLPweds',
      seo_description: 'Professional wedding photography services',
      verified: true,
      status: 'approved',
      rating: 4.9,
      review_count: 25
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      email: 'demo3@jlpweds.local',
      business_name: 'Demo Makeup Artist',
      slug: 'demo-makeup-artist',
      seo_title: 'Demo Makeup Artist - JLPweds',
      seo_description: 'Bridal makeup services',
      verified: false,
      status: 'pending',
      rating: 4.5,
      review_count: 8
    },
    {
      id: '44444444-4444-4444-4444-444444444444',
      email: 'demo4@jlpweds.local',
      business_name: 'Demo Tent & Decor',
      slug: 'demo-tent-decor',
      seo_title: 'Demo Tent & Decor - JLPweds',
      seo_description: 'Tent and wedding decoration',
      verified: true,
      status: 'approved',
      rating: 4.7,
      review_count: 5
    }
  ]

  for (const v of vendors) {
    const { data, error } = await supabase.from('vendors').upsert(v)
    if (error) console.error('error:', error)
    else console.log('seeded', v.slug)
  }
}
run()
