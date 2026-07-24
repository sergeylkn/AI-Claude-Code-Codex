export function json<T>(data: T, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" }
  });
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unexpected error";
}
