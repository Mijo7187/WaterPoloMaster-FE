/**
 *  For dynamic table height, we iterate trough array of elements whose height we need to subtract
 *  from 100vh, this way we don't care if elements change height on lower resolutions
 */
export const getTableScrollHeight = (idsList: string[] = []) => {
  const tableHeader = document.querySelector('.ant-table-header');
  if (!tableHeader) return;

  const contentWrapperMargins = 40;
  const tablePadding = 20;
  const tableBodyGap = 28;
  let takenHeight =
    contentWrapperMargins +
    tablePadding +
    tableBodyGap +
    tableHeader.clientHeight;

  idsList.forEach((id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const { marginTop, marginBottom } = window.getComputedStyle(element);
    takenHeight +=
      element.clientHeight + parseFloat(marginTop) + parseFloat(marginBottom);
  });

  return takenHeight;
};

/**
 * Sets height to ant-table-container, intended to be used with useOnScreen hook
 * to automatically set table height on screen resize
 */
export const setTableHeight = (
  scrollConfig?: string[],
  overrideHeight?: string,
) => {
  const scrollSize = getTableScrollHeight(scrollConfig);
  const table = document.querySelector('.ant-table-body');

  if (table) {
    if (overrideHeight)
      return (table.className = `ant-table-body tableHeightVH-${overrideHeight}`);
    if (scrollSize)
      return (table.className = `ant-table-body tableHeight-${scrollSize}`);
  }
};
