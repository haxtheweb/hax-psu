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
    title: 'Customer Discovery 101',
    type: 'Invent Penn State',
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
    title: 'AA 100',
    type: 'College of Arts and Architecture',
    description: 'Introduction to International Arts course',
    url: 'https://courses.hax.psu.edu/bto108/sites/aa100-su23/',
    captureUrl: 'https://oer.hax.psu.edu/bto108/sites/aa100-su23/',
  },
  {
    title: 'The Sea Voyage',
    type: 'University Libraries',
    description: 'Digital Beaumont & Fletcher',
    url: 'https://tsv-dbfp.libraries.psu.edu',
    captureUrl: 'https://tsv-dbfp.libraries.psu.edu/content/basetext/basetext-act-02/',
  },
  {
    title: 'PHYS 211',
    type: 'Eberly College of Science',
    description: 'Mechanics course',
    url: 'https://oer.hax.psu.edu/lul29/sites/phys211/',
    captureUrl: 'https://oer.hax.psu.edu/lul29/sites/phys211/week-3a-kinematics-of-projectile-motion-and-uniform-circular-motion/uniform-circular-motion',
  },
  {
    title: 'HAX Docs',
    type: 'HAXcellence',
    description: 'Teaching with HAX',
    url: 'https://haxtheweb.org/',
    captureUrl: 'https://haxtheweb.org/ontology',
  },
  {
    title: 'IST 256',
    type: 'Information Sciences & Technology',
    description: 'Programming for the web Course',
    url: 'https://oer.hax.psu.edu/bto108/sites/ist256/',
    captureUrl: 'https://oer.hax.psu.edu/bto108/sites/ist256/',
  },
];
