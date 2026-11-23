// Single source of truth for the "Examples" showcase on hax.psu.edu.
// Consumed by:
//   - src/hax-psu.js (renders the thumbnails / CTAs)
//   - scripts/screenshot.mjs (build-time thumbnail capture)
//
// `url` is the click target; `captureUrl` is the live URL to screenshot.
// Keeping this in one place means the build script and the component
// can never drift. Free of Node-only imports so it bundles into the browser.
export const examples = [
  {
    title: 'Learn to Flourish Hub',
    type: 'Health and Human Development',
    description: 'Learn to Flourish',
    url: 'https://flourish.hhd.psu.edu/',
    captureUrl: 'https://flourish.hhd.psu.edu/',
  },
  {
    title: 'Customer Discovery 101',
    type: 'Invent Penn State LaunchBox',
    description: 'Launchbox',
    url: 'https://customerdiscovery101.launchbox.psu.edu/',
    captureUrl: 'https://customerdiscovery101.launchbox.psu.edu/',
    // older HAX build hydrates slower; give it a longer render wait than the
    // 10s default cap so we don't capture a blank loading frame.
    settle: 15000,
  },
  {
    title: 'Eberly OER Courses',
    type: 'Eberly College of Science',
    description: 'Office of Digital Learning',
    url: 'https://oer.courses.science.psu.edu/',
    captureUrl: 'https://oer.courses.science.psu.edu/',
  },
  {
    title: 'The Sea Voyage',
    type: 'University Libraries',
    description: 'Digital Beaumont & Fletcher',
    url: 'https://tsv-dbfp.libraries.psu.edu',
    captureUrl: 'https://tsv-dbfp.libraries.psu.edu/content/basetext/basetext-act-02/',
  },
  {
    title: 'AA 100',
    type: 'College of Arts and Architecture',
    description: 'Introduction to International Arts course',
    url: 'https://courses.hax.psu.edu/bto108/sites/aa100-su23/',
    captureUrl: 'https://oer.hax.psu.edu/bto108/sites/aa100-su23/',
  },
  {
    title: 'IST 256',
    type: 'Information Sciences and Technology',
    description: 'Programming for the web Course',
    url: 'https://oer.hax.psu.edu/bto108/sites/ist256/',
    captureUrl: 'https://oer.hax.psu.edu/bto108/sites/ist256/',
  },
];
