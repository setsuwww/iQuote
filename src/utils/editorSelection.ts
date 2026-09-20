let savedRange: Range | null = null;

export const saveSelection = () => {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return;
  }

  const range = selection.getRangeAt(0);

  if (range.collapsed) {
    return;
  }

  savedRange = range.cloneRange();
};

export const restoreSelection = () => {
  if (!savedRange) {
    return false;
  }

  const selection = window.getSelection();

  if (!selection) {
    return false;
  }

  selection.removeAllRanges();
  selection.addRange(savedRange);

  return true;
};

export const clearSavedSelection = () => {
  savedRange = null;
};

export const getSavedRange = () => {
  return savedRange;
};
