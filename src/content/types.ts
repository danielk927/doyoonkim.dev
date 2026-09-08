export interface Entry {
  title: string;
  meta?: string;
  when?: string;
  bullets?: string[];
}

export interface Section {
  key: string;
  title: string;
  blurb?: string;
  entries: Entry[];
}
