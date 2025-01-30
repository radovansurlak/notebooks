const makeIDGenerator = () => {
  let count = 0;
  const ids: string[] = [];

  function generateId() {
    count += 1;
    const id = "A" + count;
    ids.push(id);
    return id;
  }

  function getIds() {
    return ids;
  }

  return { generateId, getIds };
};

export default makeIDGenerator;
