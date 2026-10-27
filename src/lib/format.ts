// "2026-10-27" -> "27/10/2026", sans passer par Date (évite les décalages de fuseau)
export const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
};
