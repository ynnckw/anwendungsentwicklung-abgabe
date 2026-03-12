export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
export type Hemisphere = 'N' | 'S';

export const SEASONS: Season[] = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];

// bestimmt die Hemisphäre über die geografische Breite
export const getHemisphereForLatitude = (latitude: number): Hemisphere => (latitude < 0 ? 'S' : 'N');

export type GetSeasonForMonthOptions = {
  latitude?: number;
  hemisphere?: Hemisphere;
};

// ordnet einen Monat einer meteorologischen Jahreszeit zu
export const getSeasonForMonth = (
  year: number,
  month: number,
  options?: GetSeasonForMonthOptions,
): { season: Season; seasonYear: number } => {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}`);
  }

  const hemisphere: Hemisphere =
    options?.hemisphere ?? (typeof options?.latitude === 'number' ? getHemisphereForLatitude(options.latitude) : 'N');

  let season: Season;
  if ([3, 4, 5].includes(month)) season = 'SPRING';
  else if ([6, 7, 8].includes(month)) season = 'SUMMER';
  else if ([9, 10, 11].includes(month)) season = 'AUTUMN';
  else season = 'WINTER';

  // Januar und Februar zählen noch zur Wintersaison des Vorjahres
  const seasonYear = season === 'WINTER' && (month === 1 || month === 2) ? year - 1 : year;

  if (hemisphere === 'N') {
    return { season, seasonYear };
  }

  // kehrt die Jahreszeiten für die Südhalbkugel um
  const inverted: Record<Season, Season> = {
    SPRING: 'AUTUMN',
    SUMMER: 'WINTER',
    AUTUMN: 'SPRING',
    WINTER: 'SUMMER',
  };

  return { season: inverted[season], seasonYear };
};