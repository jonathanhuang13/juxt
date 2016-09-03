import { itemForm } from '../constants/actionTypes';

const { SUBMIT, SHOW_FORM, HIDE_FORM, LOADING, FINISHED_SUBMIT } = itemForm;

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
