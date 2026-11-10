// Legal texts will be supplied by the owner and must be reproduced VERBATIM.
// Only markup may change: section headings become "## ", bullets become "- ".
// Until they arrive the pages show a placeholder — do not write your own terms.

export const legalUpdated = "PLACEHOLDER";

const PRIVACY: string | null = null;
const TERMS: string | null = null;

// "At a glance" cards are a site summary, not part of the documents.
// Fill them only after the documents arrive, from what they actually say.
export const privacy = {
  title: "Privacy Policy",
  current: "privacy",
  body: PRIVACY,
  glance: null as [string, string][] | null,
  other: { to: "/terms", label: "Terms of Use" },
};

export const terms = {
  title: "Terms of Use",
  current: "terms",
  body: TERMS,
  glance: null as [string, string][] | null,
  other: { to: "/privacy", label: "Privacy Policy" },
};
