import * as Sentry from "@sentry/react";
import { Failure, getFailureResult } from "sardine-dashboard-typescript-definitions";

interface ErrorWithResponse {
  response: {
    status: number;
  };
}

interface ErrorWithResponseData {
  response: {
    data: string;
  };
}

export interface ErrorWithResponseDataErrorObject {
  response: {
    data: {
      error: string;
    };
  };
}

interface ErrorWithMessage {
  message: string;
}

export const isErrorWithResponseData = (error: unknown): error is ErrorWithResponseData =>
  error !== undefined &&
  error !== null &&
  (error as ErrorWithResponseData).response !== undefined &&
  (error as ErrorWithResponseData).response.data !== undefined &&
  typeof (error as ErrorWithResponseData).response.data === "string";

export const isErrorWithResponseDataObject = (error: unknown): error is ErrorWithResponseDataErrorObject =>
  error !== undefined &&
  error !== null &&
  (error as ErrorWithResponseDataErrorObject).response !== undefined &&
  (error as ErrorWithResponseDataErrorObject).response.data !== undefined &&
  typeof (error as ErrorWithResponseDataErrorObject).response.data === "object" &&
  "error" in (error as ErrorWithResponseDataErrorObject).response.data &&
  typeof (error as ErrorWithResponseDataErrorObject).response.data.error === "string";

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
  error !== undefined &&
  error !== null &&
  (error as ErrorWithMessage).message !== undefined &&
  typeof (error as ErrorWithMessage).message === "string";

export const isErrorWithResponseStatus = (error: unknown): error is ErrorWithResponse => {
  if (error && (error as ErrorWithResponse).response !== undefined) {
    return "status" in (error as ErrorWithResponse).response && typeof (error as ErrorWithResponse).response.status === "number";
  }
  return false;
};

export const isErrorWithStatusCode = ({ error, statusCode }: { error: unknown; statusCode: number }): boolean =>
  isErrorWithResponseStatus(error) && (error as ErrorWithResponse).response.status === statusCode;

// Use when you don't know the error type.
// If the error is a string, it will be returned as is.
export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }
  if (isErrorWithMessage(error)) {
    return error.message;
  }
  return "Error";
};

// We are using Sentry for error tracking now.
// In the future, we might want to other error tracking systems. Also, Sentry API might change.
// To handle such changes, we wrap Sentry.captureException.
export const captureException = (err: unknown): void => {
  Sentry.captureException(err);
};

export const captureFailure = (failure: Failure<unknown>): void => {
  captureException(getFailureResult(failure));
};
