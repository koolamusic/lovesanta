export const BASENAME = 'List';
export const PARAMS = {
  baseName: BASENAME,
  baseView: 'Main',
};

const secrets = {
  BASE_URL: process.env.BASE_URL,
  AIRTABLE_KEY: process.env.AIRTABLE_KEY,
  AIRTABLE_BASE: process.env.AIRTABLE_BASE,
  AIRTABLE_KEY_PUBLIC: process.env.NEXT_PUBLIC_AIRTABLE_KEY,
  AIRTABLE_BASE_PUBLIC: process.env.NEXT_PUBLIC_AIRTABLE_BASE,
};

export interface UserParamsObject {
  label: string;
  value: string;
}

export const FAMILY: UserParamsObject[] = [
  { value: 'blessing', label: 'Blessing' },
  { value: 'bobo', label: 'Bobo' },
  { value: 'bukola', label: 'Bukola' },
  { value: 'chike', label: 'Chike' },
  { value: 'ezinne', label: 'Ezinne' },
  { value: 'joy', label: 'Joy' },
  { value: 'miracle', label: 'Miracle' },
  { value: 'mkpuruoma', label: 'Mkpuruoma' },
  { value: 'nedu', label: 'Nedu' },
  { value: 'princess', label: 'Princess' },
  { value: 'ruth', label: 'Ruth' },
  { value: 'sharon', label: 'Sharon' },
  { value: 'stella', label: 'Stella' },
  { value: 'stephanie', label: 'Stephanie' },
  { value: 'uchechi', label: 'Uchechi' },
  { value: 'winner', label: 'Winner' },
];

export default secrets;
