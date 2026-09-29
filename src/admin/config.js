// One entry per admin page. Add a field here and the form + table update automatically.
// type: text | textarea | bool | image
export const schemas = {
  skills: { title: 'Skills', label: 'name', fields: [['name', 'Name', 'text', 1], ['icon', 'Icon (emoji)', 'text'], ['category', 'Category', 'text'], ['level', 'Level', 'text']] },
  projects: { title: 'Projects', label: 'name', fields: [['name', 'Project name', 'text', 1], ['short_description', 'Short description', 'text'], ['full_description', 'Full description', 'textarea'], ['technologies', 'Technologies (comma separated)', 'text'], ['category', 'Category (e.g. Web Development)', 'text'], ['github_url', 'GitHub URL', 'text'], ['demo_url', 'Live demo URL', 'text'], ['featured', 'Featured', 'bool'], ['image_url', 'Image', 'image']] },
  certificates: { title: 'Certificates', label: 'name', fields: [['name', 'Certificate name', 'text', 1], ['organization', 'Issuing organization', 'text'], ['date', 'Date', 'text'], ['url', 'Certificate URL', 'text'], ['image_url', 'Image', 'image']] },
  youtube_videos: { title: 'YouTube', label: 'title', fields: [['title', 'Video title', 'text', 1], ['description', 'Description', 'textarea'], ['url', 'YouTube URL', 'text', 1], ['date', 'Date', 'text'], ['category', 'Category', 'text'], ['image_url', 'Thumbnail', 'image']] },
  social_links: { title: 'Social Links', label: 'platform', fields: [['platform', 'Platform (YouTube, GitHub, LinkedIn, Instagram, Facebook...)', 'text', 1], ['url', 'URL', 'text', 1]] },
}
export const singles = {
  profile: { title: 'Profile', fields: [['name', 'Name', 'text'], ['title', 'Job title', 'text'], ['avatar_url', 'Profile picture', 'image'], ['bio', 'Short intro (hero)', 'textarea'], ['about', 'About section', 'textarea'], ['education', 'Education', 'text'], ['university', 'University', 'text'], ['location', 'Location', 'text'], ['interests', 'Career interests', 'textarea'], ['learning', 'Currently learning', 'textarea'], ['goals', 'Goals', 'textarea'], ['email', 'Email', 'text'], ['whatsapp', 'Phone / WhatsApp', 'text'], ['cv_url', 'CV download link', 'text']] },
  settings: { title: 'Settings (SEO)', fields: [['seo_title', 'Page title', 'text'], ['seo_description', 'Meta description', 'textarea']] },
}
