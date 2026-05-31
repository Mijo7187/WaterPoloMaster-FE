export function setDynamicHeight(
  wrapperId: string,
  idsToSubtract: string[],
  extraMinus = 0,
) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;

  const viewportHeight = window.innerHeight;

  // sabiramo offsetHeight svih prosleđenih elemenata
  const totalToSubtract = idsToSubtract.reduce((acc, id) => {
    const el = document.getElementById(id);
    if (!el) return acc;
    return acc + el.offsetHeight;
  }, 0);
  const finalHeight = viewportHeight - totalToSubtract - extraMinus;
  wrapper.style.maxHeight = `${Math.max(finalHeight, 0)}px`;
  wrapper.style.overflowY = "auto";
}
