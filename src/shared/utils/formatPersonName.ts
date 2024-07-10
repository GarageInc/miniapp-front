export function formatPersonName({
  firstName,
  lastName,
  username,
}: {
  firstName: string;
  lastName: string;
  username: string;
}) {
  return firstName || lastName
    ? [firstName, lastName].filter(Boolean).join(" ")
    : username;
}
