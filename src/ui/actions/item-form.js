import { itemForm } from '../utils/action-types';

const { SUBMIT, SHOW_FORM, HIDE_FORM, LOADING, FINISHED_SUBMIT, FAILED_SUBMIT, DUPLICATE_SUBMIT } = itemForm;

// These actions are called from containers
export function handleShowForm() {
  return { type: SHOW_FORM };
}

export function handleHideForm() {
  return { type: HIDE_FORM };
}

// These actions are called from containers and caught from saga
export function handleSubmit(info) {
  return { type: SUBMIT, info };
}

// These actions are called from saga
export function loadingSubmit() {
  return ({ type: LOADING });
}

export function finishedSubmit() {
  return ({ type: FINISHED_SUBMIT });
}

export function failedSubmit() {
  return ({ type: FAILED_SUBMIT });
}

export function duplicateSubmit(duplicates) {
  return ({ type: DUPLICATE_SUBMIT, duplicates });
}
