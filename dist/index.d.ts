export function useAutoKeyMaker(options?: {
    prefix: string;
    hash: boolean;
}): {
    keyGen: (item: any) => any;
    resetKeyGenerator: () => void;
};
