import { Text } from "./typography/text";

type errorItemType = {
  loc: string[];
  msg: string;
  type: string;
  ctx: {
    msg: string;
  };
};

type ErrorResponseType = {
  detail: errorItemType[];
};

type ResponseErrorProps = {
  errors: (ErrorResponseType | undefined)[];
};

export function ResponseError({ errors }: ResponseErrorProps) {
  const filteredErrors = errors.filter((i) => i) as ErrorResponseType[];

  if (filteredErrors.length === 0) {
    return null;
  }

  return (
    <div>
      {filteredErrors.map((error) => (
        <SingleResponseError error={error} />
      ))}
    </div>
  );
}

function SingleResponseError({ error }: { error: ErrorResponseType }) {
  return (
    <div className="rounded-md bg-red-50 border-2 border-red-500 p-4 flex flex-col gap-2">
      {error?.detail?.map((err) => (
        <Text variant="info" key={err.msg} className="text-red-500">{`- ${err.msg}`}</Text>
      ))}
    </div>
  );
}
