export function useAutoKeyMaker(options = { prefix: "", hash: false }) {
  const { prefix, hash } = options;
  const memoizedKeys = new Map();
  const itemCache = new Map();
  let counter = 0; // Counter for generating incremental keys

  const resetKeyGenerator = () => {
    memoizedKeys.clear();
    itemCache.clear();
    counter = 0; // Reset the counter
  };

  const generateKey = (item) => {
    if (!hash) {
      const key = `${prefix}${counter}`;
      counter++; // Increment the counter after generating the key
      return key;
    }

    const key = customHash(JSON.stringify(item));
    return `${prefix || "autoKey_"}${key}`; // Fallback to "autoKey_" if prefix is not provided
  };

  if (typeof options !== "object" || options === null) {
    throw new Error("Options must be an object.");
  }

  if (typeof prefix !== "string" && !hash) {
    // Only enforce prefix as string if hash is false
    throw new Error("Prefix must be a string.");
  }

  function customHash(s) {
    if (!s) return 0;

    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      const charCode = s.charCodeAt(i);
      hash = (hash << 5) + hash + charCode;
      hash = hash & 0x7fffffff;
    }
    return hash;
  }

  return {
    keyGen: (item) => {
      if (typeof item !== "object" || item === null) {
        throw new Error("Item must be an object.");
      }

      const key = generateKey(item);

      // Check if the key exists in the memoized keys
      if (memoizedKeys.has(key)) {
        return memoizedKeys.get(key);
      }

      // Generate the key if not found in memoized keys
      const newItemKey = key;

      // Set the generated key in memoized keys
      memoizedKeys.set(key, newItemKey);

      // Cache the item with its key
      itemCache.set(item, newItemKey);

      return newItemKey;
    },
    resetKeyGenerator,
  };
}
