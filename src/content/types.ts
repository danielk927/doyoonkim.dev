export interface Entry {
  title: string;
  meta?: string;
  when?: string;
  bullets?: string[];
}

export interface Section {
  key: string;
  /** Shown on the in-world sign above the building. */
  sign: string;
  title: string;
  blurb?: string;
  entries: Entry[];
}
