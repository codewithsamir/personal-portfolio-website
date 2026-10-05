const monthMap: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

type SortableExperience = {
  period?: string;
  order?: number;
  createdAt?: string | Date;
};

export function parseExperienceStartDate(period?: string): number {
  if (!period) return Number.NEGATIVE_INFINITY;

  const normalized = period.replace(/–|—/g, "-").replace(/\s+/g, " ").trim();
  const mainMatch = normalized.match(/([A-Za-z]{3,4})\s+(\d{4})(?:\s*-\s*(?:([A-Za-z]{3,4})\s+(\d{4})|Present))?/i);

  if (mainMatch) {
    const [, startMonthName, startYear] = mainMatch;
    const month = monthMap[startMonthName.slice(0, 3).charAt(0).toUpperCase() + startMonthName.slice(1).toLowerCase()];

    if (typeof month === "number") {
      return new Date(Number(startYear), month, 1).getTime();
    }
  }

  const singleYearMatch = normalized.match(/(\d{4})/);
  if (singleYearMatch) {
    return new Date(Number(singleYearMatch[1]), 0, 1).getTime();
  }

  return Number.NEGATIVE_INFINITY;
}

export function sortExperiencesByLatest<T extends SortableExperience>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aOrder = typeof a.order === "number" ? a.order : Number.MAX_SAFE_INTEGER;
    const bOrder = typeof b.order === "number" ? b.order : Number.MAX_SAFE_INTEGER;

    if (typeof a.order === "number" || typeof b.order === "number") {
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
    }

    const aDate = parseExperienceStartDate(a.period);
    const bDate = parseExperienceStartDate(b.period);

    if (aDate !== bDate) {
      return bDate - aDate;
    }

    const aCreated = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bCreated = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    return bCreated - aCreated;
  });
}
