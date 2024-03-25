export interface NewUserProps {
  displayName: string;
  email: string;
  password: string;
}

export interface CSVUser {
  legacyId: string;
  name: string;
  active: string;
  admin: string;
  audioCurator: string;
  videoCurator: string;
  imageCurator: string;
  contentEditor: string;
  contentReporter: string;
  contentContributor: string;
  biography: string;
  emailAddress: string;
  authorSite: string;
  twitterAddress: string;
  facebook: string;
  linkedin: string;
}
export interface RealTimeUser {
  bio: string;
  contactEmail: string;
  legacyId: number;
  legacyUrl: string;
  twitter: string;
  uid: string;
}
