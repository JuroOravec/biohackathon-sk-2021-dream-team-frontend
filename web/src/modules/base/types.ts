import type { Location } from 'vue-router';

export enum BaseRoute {
  HOME = 'base:home',
  MICROBIOME = 'base:microbiome',
  MICROBIOME_SKIN = 'base:microbiome-skin',
  PRIVACY_POLICY = 'base:privacy-policy',
  UNKNOWN = 'base:unknown',
  ROOT = 'base:root',
}

export interface ListMenuSection {
  groupId: string;
  sectionId: string;
  title: string;
  to?: Location & { name: string };
  listeners?: Record<string, (...args: any[]) => void>;
  iconAppend?: string;
}
