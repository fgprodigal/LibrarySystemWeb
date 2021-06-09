export default function (initialState) {
  const { userRole } = initialState;

  return {
    isAdmin: () => userRole == 2,
    testFilter: () => false,
  };
}
