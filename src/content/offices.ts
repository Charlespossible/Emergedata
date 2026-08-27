import type { Office } from './types';

/**
 * The 2025 profile lists only the Abuja HQ, while its own body text claims a presence
 * spanning five states in Nigeria. The sources disagree about which five.
 *
 * Evidence as of 2026-08-28 — the live site at emergedata.com.ng/about contradicts itself
 * within a single page:
 *   - Its prose says "Our head office is situated in Abuja with additional offices in
 *     Plateau, Anambra, Kano, and Lagos states."
 *   - Its own locations list says "Abuja, Kano, Borno, Niger, Lagos".
 *   - Its contact page publishes the Abuja street address and no other.
 *
 * Only Abuja, Kano and Lagos appear in both. Borno and Niger (seeded below, from the 2024
 * PDF) appear in one; Plateau and Anambra appear in the other and are not seeded at all.
 *
 * So every non-HQ entry stays `published: false`, and the count of states is unresolved.
 * Flip one to true only once the client confirms that specific street address is current
 * and may be published (plan §9.2).
 */
export const offices: Office[] = [
  {
    state: 'Abuja (HQ)',
    address: '22 Aguiyi Ironsi Street, Maitama, Abuja, FCT, Nigeria',
    isHq: true,
    published: true,
    phone: '+234 802 7982900',
  },
  {
    state: 'Kano',
    address: '45C Murtala Mohammed Way, Sabon Gari, Kano State',
    published: false,
  },
  {
    state: 'Borno',
    address: 'Office 13, Zakat Plaza, Sir Kashim Ibrahim Way, Maiduguri, Borno State',
    published: false,
  },
  {
    state: 'Niger',
    address: '7, Landmark Complex, Paiko Road, Minna, Niger State',
    published: false,
  },
  {
    state: 'Lagos',
    address: '78B Adeola Odeku Street, Ajao Estate, Lagos State',
    published: false,
  },
];

export const publishedOffices = offices.filter((office) => office.published);

export const headquarters = offices.find((office) => office.isHq)!;
