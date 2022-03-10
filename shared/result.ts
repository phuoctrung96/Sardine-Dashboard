export interface Failure<FailureValueType> {
  failureValue: FailureValueType;
}

interface Success<SuccessValueType> {
  successValue: SuccessValueType;
}

export type Result<SuccessValueType, FailureValueType> = Failure<FailureValueType> | Success<SuccessValueType>;
export const isFailure = (result: Result<unknown, unknown>): result is Failure<unknown> => "failureValue" in result;

export const getSuccessResult = <ReturnValueType>(result: Success<ReturnValueType>): ReturnValueType => result.successValue;
export const getFailureResult = <T = Error>(result: Failure<T>): T => result.failureValue;

export const createSuccess = <ValueType>(successValue: ValueType): Success<ValueType> => ({ successValue });

export const createFailure = <T = Error>(failureValue: T): Failure<T> => ({ failureValue });
