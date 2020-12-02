const { AIRTABLE_KEY, AIRTABLE_BASE } = process.env
// const endpoint = process.env.NEXT_PUBLIC_API_URL;

export const BASENAME = 'List'
export const PARAMS = {
    baseName: BASENAME,
    baseView: 'Main'
};


export default {
    AIRTABLE_KEY,
    AIRTABLE_BASE,
}


export const FAMILY = [
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
