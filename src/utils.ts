export function trimTime(lengthMs: number): string {
    if (lengthMs < 1_000) return `${lengthMs} мсек.`
    if (lengthMs < 60_000) return `${lengthMs / 1_000} сек.`
    return `${lengthMs / 60_000} мин.`
}